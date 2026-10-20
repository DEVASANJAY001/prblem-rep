import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
  limit,
} from "firebase/firestore";
import { db } from "../config";
import { ProblemDoc, ProblemStatus, AIScores, ProblemComment, CommentReply, ProblemValidations, EvidenceDocument, UserStartupNotes, StartupModeConfig } from "@/types";
import { scoreProblemSubmission } from "@/lib/aiScoring";
import {
  getProblems as getLocalProblems,
  getProblemById as getLocalProblemById,
  saveProblem as saveLocalProblem,
  updateProblemStatus as updateLocalProblemStatus,
  updateFullProblemInStorage,
  deleteProblemFromStorage,
  voteProblem as voteLocalProblem,
  incrementProblemViews as incrementLocalProblemViews,
  toggleLocalValidation,
  recordLocalInterest,
  generateNextProblemId,
  getDeletedProblemIds,
  markFirestoreSynced,
  STORAGE_KEYS,
} from "@/lib/storage";
import { REAL_PROBLEMS } from "@/data/realProductionData";
import { swrCache } from "@/lib/swrCache";
import { cleanIndustryName } from "@/lib/algorithms/domainIntelligence";

const PROBLEMS_COLLECTION = "problems";

// Multi-tab real-time synchronization (BroadcastChannel only — no storage event listener)
// IMPORTANT: The window "storage" event listener has been intentionally REMOVED.
// Previously it called notifyQueryStreams() which triggered computeMergedProblems() which
// called saveLocalProblem(), which fired another storage event → infinite Firestore read/write loop.
// Cross-tab sync is handled by the Firestore onSnapshot listeners themselves (same real-time data).
const syncChannel =
  typeof window !== "undefined" && typeof BroadcastChannel !== "undefined"
    ? new BroadcastChannel("prblms_sync_channel")
    : null;

// BroadcastChannel: Only notify OTHER tabs, not self. A flag prevents the originating tab
// from re-triggering its own listeners when it receives its own broadcast message back.
let _isBroadcastingSelf = false;

if (syncChannel) {
  syncChannel.onmessage = (event) => {
    // Skip if this tab originated the event (prevents self-loop on same-tab BroadcastChannel echo)
    if (_isBroadcastingSelf) return;
    if (event.data?.type?.startsWith("PROBLEM_")) {
      notifyQueryStreams();
    }
  };
}

export function broadcastSyncEvent(payload: { type: string; problemId?: string; status?: string }) {
  try {
    _isBroadcastingSelf = true;
    syncChannel?.postMessage(payload);
    // Allow next-tick broadcast messages from other tabs through
    setTimeout(() => { _isBroadcastingSelf = false; }, 100);
  } catch { _isBroadcastingSelf = false; }
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Multiplexed Listener Registry (Prevents Duplicate Firestore Reads)
// ─────────────────────────────────────────────────────────────────────────────
interface StreamSubscription<T> {
  unsubscribe: () => void;
  listeners: Set<(data: T) => void>;
  latestData: T | null;
  teardownTimer?: any;
}

const docStreams = new Map<string, StreamSubscription<ProblemDoc | null>>();
const queryStreams = new Map<string, StreamSubscription<ProblemDoc[]>>();

/**
 * Strips undefined values to produce a clean delta payload for Firestore
 */
/**
 * Strips undefined values to produce a clean delta payload for Firestore
 */
function cleanDeltaPayload<T extends Record<string, any>>(obj: T): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      clean[key] = value;
    }
  }
  return clean;
}

/**
 * Deeply sanitizes an object tree to ensure zero undefined values reach Firestore,
 * while preserving FieldValue sentinels (serverTimestamp, increment, etc.) and Date objects.
 */
export function sanitizeForFirestore<T>(data: T): T {
  if (data === null || data === undefined) {
    return null as any;
  }
  if (Array.isArray(data)) {
    return data
      .filter((item) => item !== undefined)
      .map((item) => sanitizeForFirestore(item)) as any;
  }
  if (typeof data === "object") {
    // If it's a Firestore FieldValue or Date, preserve it intact
    if (
      (data as any)._methodName ||
      typeof (data as any).isEqual === "function" ||
      (data as any).constructor?.name === "FieldValue" ||
      data instanceof Date
    ) {
      return data;
    }
    const cleanObj: Record<string, any> = {};
    for (const [key, val] of Object.entries(data)) {
      if (val !== undefined) {
        cleanObj[key] = sanitizeForFirestore(val);
      }
    }
    return cleanObj as any;
  }
  return data;
}

// In-memory cache of latest Firestore documents for instant merging
let latestFirestoreDocs: ProblemDoc[] = [];

/**
 * Silently saves a problem to localStorage WITHOUT dispatching a "storage" event.
 * Standard localStorage.setItem() dispatches a "storage" event on OTHER tabs, but
 * saveLocalProblem() internally also triggers our own storage listener if called from
 * within an onSnapshot handler. This helper bypasses that by using the storage module
 * directly and preventing the cross-tab event from reaching our own listener.
 */
function _saveLocalSilent(problem: ProblemDoc): void {
  try {
    saveLocalProblem(problem);
  } catch (e) {
    // Silent fallback - never let a storage error break the Firestore sync
  }
}

/**
 * Robustly merges authoritative Cloud Firestore documents with local problems.
 * Ensures newly submitted problems (pending review) and offline mutations
 * are NEVER dropped when Firestore returns documents.
 *
 * Firestore-first strategy: when Firestore has returned a non-empty snapshot,
 * it is treated as authoritative. Local problems NOT in the Firestore snapshot
 * are only kept if they are fresh pending-only submissions (no cloud ID yet),
 * i.e. problems the current user just submitted that haven't been synced yet.
 * Problems deleted directly from the Firebase console will be purged from local
 * cache on the next snapshot, eliminating stale ghost entries.
 */
export function computeMergedProblems(
  filter: { status?: "approved" | "pending" | "rejected" | "all"; industry?: string } = {},
  firestoreDocs: ProblemDoc[] = latestFirestoreDocs
): ProblemDoc[] {
  const deletedIds = getDeletedProblemIds();
  const localList = getLocalProblems({
    status: "all",
    industry: filter.industry,
  });

  const firestoreHasData = firestoreDocs.length > 0;
  // Build a fast lookup set of IDs present in the Firestore snapshot
  const firestoreIdSet = new Set(firestoreDocs.map((fd) => fd.id));

  const map = new Map<string, ProblemDoc>();

  // 1. Seed with local problems — but ONLY keep locals that either:
  //    a) Also exist in Firestore (will be merged/overwritten in step 2), OR
  //    b) Are fresh pending-only submissions not yet synced to Firestore
  //       (status === "pending" AND no createdAtServer field, meaning the
  //        Firestore write may still be in-flight or failed).
  //    When Firestore has no data yet (cold start / offline), keep everything locally.
  for (const lp of localList) {
    if (!lp || !lp.id || deletedIds.has(lp.id)) continue;

    if (!firestoreHasData) {
      // Offline / cold start — trust local cache fully
      map.set(lp.id, lp);
    } else if (firestoreIdSet.has(lp.id)) {
      // Will be merged with Firestore data in step 2
      map.set(lp.id, lp);
    } else if (lp.status === "pending" && lp.createdAt) {
      // Fresh pending submission not yet confirmed in Firestore snapshot.
      // Keep it if it was created within the last 5 minutes (in-flight / queued write).
      const age = Date.now() - new Date(lp.createdAt).getTime();
      if (age < 5 * 60 * 1000) {
        map.set(lp.id, lp);
      } else {
        // Old pending problem not in Firestore — it was deleted externally
        deleteProblemFromStorage(lp.id);
      }
    } else {
      // Problem exists locally but NOT in Firestore snapshot → it was deleted
      // from Firebase console or another tab. Silently remove from local cache.
      deleteProblemFromStorage(lp.id);
    }
  }

  // 2. Merge Firestore documents (authoritative cloud state)
  // NOTE: saveLocalProblem() is NOT called here intentionally — calling it inside onSnapshot
  // fires a localStorage "storage" event which previously triggered notifyQueryStreams() again,
  // creating an infinite read/write loop. Firestore listeners handle real-time updates directly.

  // Defense-in-depth: if a doc is in Firestore, it was never actually deleted — clear it
  // from the stale deleted-IDs list so it shows correctly in every browser session.
  const staleDeletesToClear = Array.from(firestoreIdSet).filter(id => deletedIds.has(id));
  if (staleDeletesToClear.length > 0) {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.DELETED_PROBLEMS) || "[]") as string[];
      const cleaned = current.filter(id => !staleDeletesToClear.includes(id));
      localStorage.setItem(STORAGE_KEYS.DELETED_PROBLEMS, JSON.stringify(cleaned));
      // Remove from in-memory set so the loop below is unaffected
      staleDeletesToClear.forEach(id => deletedIds.delete(id));
    } catch {}
  }

  for (const fd of firestoreDocs) {
    if (fd && fd.id && !deletedIds.has(fd.id)) {
      const local = map.get(fd.id);
      if (!local) {
        map.set(fd.id, fd);
        // Persist to local storage silently (no event dispatching)
        _saveLocalSilent(fd);
      } else {
        const localTs = new Date(local.updatedAt || local.createdAt || 0).getTime();
        const firestoreTs = new Date(fd.updatedAt || fd.createdAt || 0).getTime();
        // If Firestore is newer or equal, take Firestore data merged with local fields
        if (firestoreTs >= localTs) {
          map.set(fd.id, { ...local, ...fd });
          _saveLocalSilent({ ...local, ...fd });
        } else {
          // Local update is newer (e.g. status transition just made by admin)
          map.set(fd.id, { ...fd, ...local });
        }
      }
    }
  }

  let merged = Array.from(map.values());

  // 3. Apply status filter
  if (filter.status && filter.status !== "all") {
    merged = merged.filter((p) => p.status === filter.status);
  }

  // 4. Apply industry filter
  if (filter.industry && filter.industry !== "All" && filter.industry !== "all") {
    const indLower = filter.industry.toLowerCase();
    merged = merged.filter(
      (p) =>
        p.industry?.toLowerCase().includes(indLower) ||
        indLower.includes(p.industry?.toLowerCase() || "")
    );
  }

  return merged;
}

/**
 * Broadcasts data changes across all active multiplexed query streams (Admin review queue, Explore, Dashboard)
 */
export function notifyQueryStreams(): void {
  for (const [key, stream] of queryStreams.entries()) {
    try {
      const filter = JSON.parse(key);
      const updatedList = computeMergedProblems(filter, latestFirestoreDocs);
      stream.latestData = updatedList;
      swrCache.set(`query_${key}`, updatedList, 300_000);
      stream.listeners.forEach((cb) => cb(updatedList));
    } catch {
      // ignore JSON parse or callback error
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Create Problem (Single Atomic Write to Firestore & Local Registry)
// ─────────────────────────────────────────────────────────────────────────────
export async function createProblem(
  problemData: {
    title: string;
    description: string;
    industry: string;
    severity: "minor" | "medium" | "major" | "critical";
    submittedByUid: string;
    submittedByName: string;
    submitterUsername?: string;
    whenItHappens?: string;
    whoFacesIt?: string;
    whyFrustrating?: string;
    frequency?: string;
    currentSolution?: string;
    location?: string;
    audienceSize?: string;
    willingnessToPay?: string;
    estimatedValue?: string;
    marketData?: {
      tam?: string;
      currentPenetration?: number;
      wastedCost?: string;
      citizensAffected?: string;
    };
    evidenceDocuments?: EvidenceDocument[];
    evidenceUrls?: string[];
    evidenceLinks?: string[];
    dataPoints?: { metric: string; label: string }[];
    researchData?: {
      keyFindings?: string[];
      methodology?: string;
      academicReferences?: string[];
    };
    competitorData?: { solution: string; pros: string; cons: string }[];
    suggestedMVP?: {
      coreFeatures?: string[];
      technicalRequirements?: string;
      complianceStandards?: string[];
    };
    hasStartupMode?: boolean;
    startupModeEnabled?: boolean;
    startupModeConfig?: StartupModeConfig;
    psFrom?: string[];
    psFromCustom?: string;
    aiScores?: AIScores;
    status?: ProblemStatus;
  }
): Promise<{ success: boolean; problemId: string; aiScores: AIScores; storedInFirestore?: boolean; firestoreError?: string | null }> {
  const scored = scoreProblemSubmission({
    title: problemData.title,
    description: problemData.description,
    whenItHappens: problemData.whenItHappens || "Frequent operational workflows",
    whyFrustrating: problemData.whyFrustrating || problemData.description,
    frequency: problemData.frequency || "Daily",
    whoFacesIt: problemData.whoFacesIt || "Industry practitioners & teams",
    industry: problemData.industry,
    severity: problemData.severity,
    currentSolution: problemData.currentSolution || "Manual workarounds",
    audienceSize: problemData.audienceSize || "100k-1m",
    willingnessToPay: problemData.willingnessToPay || "$50-200/mo",
  });

  const aiScores = {
    ...scored.aiScores,
    ...(problemData.aiScores || {}),
    suggestedAngles:
      problemData.aiScores?.suggestedAngles && problemData.aiScores.suggestedAngles.length > 0
        ? problemData.aiScores.suggestedAngles
        : scored.aiScores.suggestedAngles,
    keyRisks:
      problemData.aiScores?.keyRisks && problemData.aiScores.keyRisks.length > 0
        ? problemData.aiScores.keyRisks
        : scored.aiScores.keyRisks,
  };
  const now = new Date().toISOString();
  // Ensure unique ID with timestamp suffix to avoid multi-user collision in Firestore
  const rawId = generateNextProblemId();
  const id = `${rawId}-${Date.now().toString(36).slice(-4)}`;

  // Default newly submitted problem statements to "pending" so admin can review and approve
  const resolvedStatus: ProblemStatus = problemData.status || "pending";

  const newProblem: ProblemDoc = {
    id,
    title: problemData.title,
    description: problemData.description,
    industry: problemData.industry,
    severity: problemData.severity,
    painScore: scored.painScore,
    opportunityScore: scored.opportunityScore,
    aiScores,
    votes: { upvotes: 0, downvotes: 0 },
    validations: { faceCount: 0, greatCount: 0, payCount: 0, buildCount: 0, userValidations: {} },
    views: 1,
    interestedCount: 1,
    interestedUsers: [problemData.submittedByUid],
    comments: [],
    status: resolvedStatus,
    submittedBy: problemData.submittedByName,
    submittedByName: problemData.submittedByName,
    submitterName: problemData.submittedByName,
    submitterUsername: problemData.submitterUsername || "",
    authorDisplayName: problemData.submittedByName,
    authorUsername: problemData.submitterUsername || "",
    submittedByUid: problemData.submittedByUid,
    whenItHappens: problemData.whenItHappens || "",
    whoFacesIt: problemData.whoFacesIt || "",
    whyFrustrating: problemData.whyFrustrating || "",
    frequency: problemData.frequency || "",
    currentSolution: problemData.currentSolution || "",
    location: problemData.location || "Global",
    audienceSize: problemData.audienceSize || "",
    willingnessToPay: problemData.willingnessToPay || "",
    estimatedValue: problemData.estimatedValue || problemData.marketData?.tam || "$1.0B",
    marketData: {
      tam: problemData.marketData?.tam || "$1.0B",
      currentPenetration: problemData.marketData?.currentPenetration ?? 25,
      wastedCost: problemData.marketData?.wastedCost || "$250M",
      citizensAffected: problemData.marketData?.citizensAffected || "5M+",
    },
    evidenceDocuments: problemData.evidenceDocuments || [],
    evidenceUrls: problemData.evidenceUrls || problemData.evidenceLinks || [],
    dataPoints: problemData.dataPoints || [],
    researchData: {
      keyFindings: problemData.researchData?.keyFindings || [],
      methodology: problemData.researchData?.methodology || "",
      academicReferences: problemData.researchData?.academicReferences || [],
    },
    competitorData: problemData.competitorData || [],
    suggestedMVP: {
      coreFeatures: problemData.suggestedMVP?.coreFeatures || [],
      technicalRequirements: problemData.suggestedMVP?.technicalRequirements || "",
      complianceStandards: problemData.suggestedMVP?.complianceStandards || [],
    },
    hasStartupMode: problemData.hasStartupMode ?? true,
    startupModeEnabled: problemData.startupModeEnabled ?? problemData.hasStartupMode ?? true,
    startupModeConfig: problemData.startupModeConfig,
    psFrom: problemData.psFrom || ["Own Thinking"],
    psFromCustom: problemData.psFromCustom || "",
    commentsCount: 0,
    bookmarksCount: 0,
    createdAt: now,
    submittedAt: now,
    updatedAt: now,
    verified: resolvedStatus === "approved",
    // Explicit null defaults so Firestore never rejects undefined values
    isAnonymous: false,
    reviewedBy: null,
    reviewedByUid: null,
    reviewNote: null,
    reviewedAt: null,
    publishedAt: resolvedStatus === "approved" ? now : null,
  };

  // 1. Persist locally first and warm SWR cache immediately for zero-lag reading
  saveLocalProblem(newProblem);
  swrCache.set(`doc_${id}`, newProblem);
  swrCache.set(`problem_${id}`, newProblem, 300_000);

  const existingDocStream = docStreams.get(id);
  if (existingDocStream) {
    existingDocStream.latestData = newProblem;
    existingDocStream.listeners.forEach((l) => l(newProblem));
  }

  // Notify any active query listeners (e.g. Admin Review Queue and Admin Overview)
  notifyQueryStreams();

  // 2. Persist directly to Cloud Firestore collection 'problems'
  let storedInFirestore = false;
  let firestoreError: string | null = null;

  if (db && typeof doc === "function") {
    try {
      const problemRef = doc(db, PROBLEMS_COLLECTION, id);
      const firestorePayload = sanitizeForFirestore({
        ...newProblem,
        createdAtServer: serverTimestamp(),
      });
      const writePromise = setDoc(problemRef, firestorePayload, { merge: true })
        .then(() => {
          storedInFirestore = true;
          console.log(`[Firebase Firestore] Problem ${id} saved with status '${resolvedStatus}' to Cloud Firestore collection 'problems'`);
        })
        .catch((err) => {
          firestoreError = err?.message || String(err);
          console.warn("[Firebase Firestore] Write rejected by Cloud:", firestoreError);
        });

      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3500));
      await Promise.race([writePromise, timeoutPromise]);
    } catch (error: any) {
      firestoreError = error?.message || String(error);
      console.warn("Firestore createProblem async notice:", error);
    }
  }

  broadcastSyncEvent({ type: "PROBLEM_CREATED", problemId: id });
  return { success: true, problemId: id, aiScores, storedInFirestore, firestoreError };
}

// Helper to synchronously sync storage, SWR cache (memory & sessionStorage), and notify multiplexed stream listeners
// NOTE: Uses _saveLocalSilent to avoid the storage→notifyQueryStreams→onSnapshot feedback loop.
function syncProblemCache(problem: ProblemDoc): void {
  if (!problem || !problem.id) return;
  _saveLocalSilent(problem);
  swrCache.set(`problem_${problem.id}`, problem, 300_000);
  const stream = docStreams.get(problem.id);
  if (stream) {
    stream.latestData = problem;
    stream.listeners.forEach((cb) => cb(problem));
  }
  // Notify query streams ONCE (no further chain reactions since we removed the storage event listener)
  notifyQueryStreams();
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Optimized Read with Local-First & In-Memory SWR Cache (0 Duplicates)
// ─────────────────────────────────────────────────────────────────────────────
export async function getProblemById(idOrSlug: string): Promise<ProblemDoc | null> {
  const local = getLocalProblemById(idOrSlug);
  const targetId = local ? local.id : idOrSlug;

  // 1. Check active stream latest data
  const cachedStream = docStreams.get(targetId);
  if (cachedStream && cachedStream.latestData) {
    return cachedStream.latestData;
  }

  // 2. Query Cloud Firestore directly as authoritative cloud platform
  try {
    if (db && typeof doc === "function") {
      const ref = doc(db, PROBLEMS_COLLECTION, targetId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const live = snap.data() as ProblemDoc;
        saveLocalProblem(live);
        swrCache.set(`problem_${targetId}`, live, 300_000);
        return live;
      }
    }
  } catch (error) {
    console.warn("Firestore getProblemById network notice, using local fallback:", error);
  }

  // 3. Fallback to local storage if Firestore is offline or still initializing
  if (local) {
    swrCache.set(`problem_${targetId}`, local, 300_000);
    return local;
  }

  return null;
}

/**
 * Granular Module Update (Writes ONLY the specified module to Firestore)
 */
export async function updateProblemModule<K extends keyof ProblemDoc>(
  problemId: string,
  moduleKey: K,
  moduleData: ProblemDoc[K]
): Promise<boolean> {
  // 1. Optimistically update local storage
  updateFullProblemInStorage(problemId, { [moduleKey]: moduleData });
  const updated = getLocalProblemById(problemId);
  if (updated) {
    syncProblemCache(updated);
  } else {
    swrCache.invalidate(`problem_${problemId}`);
  }

  notifyQueryStreams();
  broadcastSyncEvent({ type: "PROBLEM_UPDATED", problemId });

  // 2. Direct field-level atomic write to Firestore (0 duplicate field writes)
  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      const writePromise = setDoc(
        problemRef,
        sanitizeForFirestore({
          [moduleKey]: moduleData,
          updatedAt: new Date().toISOString(),
          updatedAtServer: serverTimestamp(),
        }),
        { merge: true }
      ).catch((err) => {
        console.warn(`[Firebase Firestore] updateProblemModule(${moduleKey}) queued/deferred:`, err.message);
      });
      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1500));
      await Promise.race([writePromise, timeoutPromise]);
      return true;
    }
  } catch (error) {
    console.warn(`Firestore updateProblemModule(${moduleKey}) error:`, error);
  }
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Multiplexed Shared Problem Detail Listener (0 Duplicate Reads)
// ─────────────────────────────────────────────────────────────────────────────
export function subscribeProblemById(
  idOrSlug: string,
  callback: (problem: ProblemDoc | null) => void
): () => void {
  // Resolve slug or alias to canonical ID if available locally
  const localData = getLocalProblemById(idOrSlug);
  const id = localData ? localData.id : idOrSlug;

  // 1. Instantly emit cached data (0ms latency, zero layout shift)
  const streamData = docStreams.get(id)?.latestData;
  const swrData = swrCache.get<ProblemDoc>(`problem_${id}`);
  const initial = streamData || swrData || localData || null;

  if (initial) {
    if (!swrData) {
      swrCache.set(`problem_${id}`, initial, 300_000);
    }
    callback(initial);
  } else {
    callback(null);
  }

  if (!db || typeof doc !== "function") {
    return () => {};
  }

  let stream = docStreams.get(id);

  if (stream) {
    // If stream is pending teardown, cancel it immediately
    if (stream.teardownTimer) {
      clearTimeout(stream.teardownTimer);
      stream.teardownTimer = undefined;
    }
    stream.listeners.add(callback);
    if (stream.latestData) {
      callback(stream.latestData);
    }
  } else {
    const isCachedFresh = swrCache.has(`problem_${id}`);
    const listeners = new Set<(problem: ProblemDoc | null) => void>();
    listeners.add(callback);

    let unsubscribeFirestore = () => {};

    // Only open a per-doc listener if there is NO fresh data already available from the
    // collection query snapshot. When a user navigates from /explore → /problem/:id, the
    // collection listener has already seeded SWR with this document — opening a second
    // listener is wasteful. We only need the per-doc listener for direct deep links where
    // the collection snapshot hasn't loaded yet.
    if (!isCachedFresh) {
      try {
        const ref = doc(db, PROBLEMS_COLLECTION, id);
        unsubscribeFirestore = onSnapshot(
          ref,
          (snap) => {
            if (snap.exists()) {
              const data = snap.data() as ProblemDoc;
              _saveLocalSilent(data);
              swrCache.set(`problem_${id}`, data, 300_000);
              const currentStream = docStreams.get(id);
              if (currentStream) {
                currentStream.latestData = data;
                currentStream.listeners.forEach((cb) => cb(data));
              }
            } else {
              const localFallback = getLocalProblemById(id);
              if (localFallback) {
                swrCache.set(`problem_${id}`, localFallback, 300_000);
                const currentStream = docStreams.get(id);
                if (currentStream && !currentStream.latestData) {
                  currentStream.latestData = localFallback;
                  currentStream.listeners.forEach((cb) => cb(localFallback));
                }
              }
            }
          },
          (err) => {
            console.warn("Problem detail snapshot warning:", err.message);
          }
        );
      } catch (err) {
        console.warn("Problem detail onSnapshot init error:", err);
      }
    }

    stream = {
      unsubscribe: unsubscribeFirestore,
      listeners,
      latestData: initial,
    };
    docStreams.set(id, stream);
  }

  // Teardown with 120-second keepalive debounce across route transitions
  return () => {
    const currentStream = docStreams.get(id);
    if (currentStream) {
      currentStream.listeners.delete(callback);
      if (currentStream.listeners.size === 0) {
        if (currentStream.teardownTimer) {
          clearTimeout(currentStream.teardownTimer);
        }
        currentStream.teardownTimer = setTimeout(() => {
          if (currentStream.listeners.size === 0) {
            try {
              currentStream.unsubscribe();
            } catch (e) {
              console.warn("Doc snapshot unsubscribe notice:", e);
            }
            docStreams.delete(id);
          }
        }, 120_000);
      }
    }
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Multiplexed Query Subscription (0 Duplicate Reads)
// ─────────────────────────────────────────────────────────────────────────────
export function subscribeProblems(
  filter: { status?: "approved" | "pending" | "rejected" | "all"; industry?: string; pageLimit?: number } = {},
  callback: (problems: ProblemDoc[]) => void
): () => void {
  // Stable query cache key
  const queryKey = JSON.stringify({
    status: filter.status || "all",
    industry: filter.industry || "",
    limit: filter.pageLimit || 100,
  });

  // 1. Immediately emit authoritative merged state with 0ms latency
  const streamData = queryStreams.get(queryKey)?.latestData;
  const initial = streamData || computeMergedProblems(filter, latestFirestoreDocs);
  callback(initial);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  let stream = queryStreams.get(queryKey);

  if (stream) {
    // If stream is pending teardown, cancel it immediately
    if (stream.teardownTimer) {
      clearTimeout(stream.teardownTimer);
      stream.teardownTimer = undefined;
    }
    stream.listeners.add(callback);
    callback(stream.latestData || initial);
  } else {
    const colRef = collection(db, PROBLEMS_COLLECTION);
    const listeners = new Set<(problems: ProblemDoc[]) => void>();
    listeners.add(callback);

    // Build query constraints safely without requiring composite index
    const constraints: Parameters<typeof query>[1][] = [];
    if (filter.status && filter.status !== "all") {
      constraints.push(where("status", "==", filter.status));
    }
    constraints.push(limit(filter.pageLimit || 150));

    const q = query(colRef, ...constraints);

    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: false },
      (snapshot) => {
        // Skip metadata-only snapshots (e.g. cache→network transitions) to avoid spurious writes
        if (snapshot.metadata.fromCache && !snapshot.empty) return;
        const firestoreDocs: ProblemDoc[] = [];
        if (!snapshot.empty) {
          snapshot.forEach((d) => {
            const data = d.data() as ProblemDoc;
            if (data && data.id) {
              if (data.industry && data.industry.includes("&")) {
                data.industry = cleanIndustryName(data.industry);
              }
              firestoreDocs.push(data);
            }
          });
        }
        
        latestFirestoreDocs = firestoreDocs;

        // Mark that Firestore has delivered at least one real snapshot.
        // After this point, REAL_PROBLEMS seed data will NEVER be re-injected into
        // localStorage — preventing phantom hardcoded problems appearing in browsers
        // that haven't received this session's snapshot yet.
        markFirestoreSynced();

        const mergedList = computeMergedProblems(filter, firestoreDocs);

        // 1. Cache full query list in SWR (Memory LRU + SessionStorage)
        swrCache.set(`query_${queryKey}`, mergedList, 300_000);

        // 2. Batch-seed EVERY individual problem into SWR cache
        // Enables instant 0ms, 0-read opening of /problem/:id and /startup-mode/:id!
        swrCache.setMany(mergedList, "problem_", 300_000);

        // 3. Fan out updates to any active per-doc stream (docStreams).
        // When a user is on /problem/:id without an active per-doc Firestore listener
        // (because SWR was fresh at load time), they still receive real-time updates
        // pushed from admin edits, other users' actions, etc. via this collection stream.
        firestoreDocs.forEach((updatedDoc) => {
          const docStream = docStreams.get(updatedDoc.id);
          if (docStream && docStream.listeners.size > 0) {
            _saveLocalSilent(updatedDoc);
            swrCache.set(`problem_${updatedDoc.id}`, updatedDoc, 300_000);
            docStream.latestData = updatedDoc;
            docStream.listeners.forEach((cb) => cb(updatedDoc));
          }
        });

        const currentStream = queryStreams.get(queryKey);
        if (currentStream) {
          currentStream.latestData = mergedList;
          currentStream.listeners.forEach((cb) => cb(mergedList));
        }
      },
      (err) => {
        console.warn("Problems Firestore snapshot notice (using local-first fallback):", err.message);
        // Resilient fallback on error (e.g. quota limit reached): emit local cache so UI is never stuck!
        const fallback = computeMergedProblems(filter, latestFirestoreDocs);
        const currentStream = queryStreams.get(queryKey);
        if (currentStream) {
          currentStream.latestData = fallback;
          currentStream.listeners.forEach((cb) => cb(fallback));
        }
      }
    );

    stream = { unsubscribe, listeners, latestData: initial.length > 0 ? initial : null };
    queryStreams.set(queryKey, stream);
  }

  // Teardown with 120-second keepalive debounce across route transitions
  return () => {
    const currentStream = queryStreams.get(queryKey);
    if (currentStream) {
      currentStream.listeners.delete(callback);
      if (currentStream.listeners.size === 0) {
        if (currentStream.teardownTimer) {
          clearTimeout(currentStream.teardownTimer);
        }
        currentStream.teardownTimer = setTimeout(() => {
          if (currentStream.listeners.size === 0) {
            try {
              currentStream.unsubscribe();
            } catch (e) {
              console.warn("Query snapshot unsubscribe notice:", e);
            }
            queryStreams.delete(queryKey);
          }
        }, 120_000);
      }
    }
  };
}

/**
 * Pushes ONLY locally created / user-submitted problems to Firestore.
 * Does NOT re-upload baseline REAL_PROBLEMS that are already in Firestore.
 * This prevents mass writes on every sync button press.
 * Only writes problems whose IDs are NOT already present in Firestore.
 */
export async function syncAllProblemsToFirebase(): Promise<{ success: boolean; count: number; skipped: number; error?: string }> {
  const { writeBatch, getDocs: getDocsInner } = await import("firebase/firestore");
  if (!db || typeof doc !== "function") {
    return { success: true, count: 0, skipped: 0 };
  }

  // Step 1: Get current Firestore document IDs to avoid re-writing existing docs
  let existingFirestoreIds = new Set<string>();
  try {
    const snap = await getDocsInner(collection(db, PROBLEMS_COLLECTION));
    snap.forEach((d) => existingFirestoreIds.add(d.id));
  } catch (err) {
    console.warn("[syncAllProblemsToFirebase] Could not fetch existing IDs, proceeding cautiously:", err);
    // If we can't check, abort to avoid mass duplicate writes
    return { success: false, count: 0, skipped: 0, error: "Could not verify existing Firestore docs" };
  }

  // Step 2: Only sync problems NOT already in Firestore (new user submissions)
  const allLocal = getLocalProblems({ status: "all" });
  const toSync = allLocal.filter((p) => p && p.id && !existingFirestoreIds.has(p.id));
  const skipped = allLocal.length - toSync.length;

  if (toSync.length === 0) {
    console.log(`[syncAllProblemsToFirebase] All ${allLocal.length} problems already in Firestore. Nothing to sync.`);
    return { success: true, count: 0, skipped };
  }

  // Step 3: Batch write only the new problems
  const BATCH_SIZE = 400;
  let count = 0;
  let errorMsg: string | undefined;

  for (let i = 0; i < toSync.length; i += BATCH_SIZE) {
    const chunk = toSync.slice(i, i + BATCH_SIZE);
    const batch = writeBatch(db);
    for (const prob of chunk) {
      const probRef = doc(db, PROBLEMS_COLLECTION, prob.id);
      batch.set(
        probRef,
        sanitizeForFirestore({ ...prob, updatedAtServer: serverTimestamp() }),
        { merge: true }
      );
      count++;
    }
    try {
      await batch.commit();
      console.log(`[syncAllProblemsToFirebase] Synced batch ${i / BATCH_SIZE + 1}: ${chunk.length} new problems`);
    } catch (err: any) {
      console.warn(`Error committing sync batch (offset ${i}):`, err);
      errorMsg = err?.message || String(err);
      break; // Stop on first batch error to avoid quota exhaustion
    }
  }

  return { success: !errorMsg, count, skipped, error: errorMsg };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Zero-Read Atomic Mutations
// ─────────────────────────────────────────────────────────────────────────────
export async function updateProblemStatus(
  problemId: string,
  newStatus: ProblemStatus,
  adminUser: { uid: string; name: string },
  reviewNote?: string
): Promise<boolean> {
  const reviewedAt = new Date().toISOString();
  const publishedAt = newStatus === "approved" ? reviewedAt : null;

  updateLocalProblemStatus(problemId, newStatus, reviewNote, adminUser);
  const updatedProb = getLocalProblemById(problemId);
  if (updatedProb) {
    updatedProb.status = newStatus;
    updatedProb.reviewedBy = adminUser.name;
    updatedProb.reviewedByUid = adminUser.uid;
    updatedProb.reviewedAt = reviewedAt;
    updatedProb.reviewNote = reviewNote || "";
    updatedProb.verified = newStatus === "approved";
    if (newStatus === "approved") {
      updatedProb.publishedAt = publishedAt;
    }
    saveLocalProblem(updatedProb);
    syncProblemCache(updatedProb);
  }
  notifyQueryStreams();

  if (db && typeof doc === "function") {
    try {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      const updatePayload: Record<string, any> = {
        ...(updatedProb ? sanitizeForFirestore(updatedProb) : {}),
        status: newStatus,
        reviewedBy: adminUser.name,
        reviewedByUid: adminUser.uid,
        reviewedAt,
        reviewNote: reviewNote || "",
        verified: newStatus === "approved",
        updatedAt: reviewedAt,
      };
      if (newStatus === "approved") {
        updatePayload.publishedAt = publishedAt;
      }
      const updatePromise = setDoc(problemRef, sanitizeForFirestore(updatePayload), { merge: true })
        .then(() => {
          console.log(`[Firebase Firestore] Problem ${problemId} status updated to '${newStatus}' by admin ${adminUser.name}`);
        })
        .catch((err) => {
          console.warn("[Firebase Firestore] Status update queued/deferred by SDK:", err.message);
        });

      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1500));
      await Promise.race([updatePromise, timeoutPromise]);
      broadcastSyncEvent({ type: "PROBLEM_STATUS_CHANGED", problemId, status: newStatus });
      return true;
    } catch (error) {
      console.warn("Firestore updateProblemStatus async notice:", error);
    }
  }

  broadcastSyncEvent({ type: "PROBLEM_STATUS_CHANGED", problemId, status: newStatus });
  return true;
}

export async function voteProblem(
  problemId: string,
  voteType: "up" | "down",
  userUid: string = "guest"
): Promise<{ upvotes: number; downvotes: number; userVote: "up" | "down" | null }> {
  const result = voteLocalProblem(problemId, voteType, userUid);
  const updatedProb = getLocalProblemById(problemId);
  if (updatedProb) syncProblemCache(updatedProb);

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      // Use atomic increment() to prevent concurrent-write race conditions.
      // Writing absolute values (e.g., result.upvotes) would cause two simultaneous
      // voters to overwrite each other's counts. increment() is server-evaluated.
      const delta = result.userVote === voteType ? 1 : -1;
      await updateDoc(problemRef, {
        [`votes.${voteType}votes`]: increment(delta),
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.warn("Firestore voteProblem sync deferred");
  }

  return result;
}

export async function addComment(
  problemId: string,
  user: { uid: string; name: string; photoURL?: string | null; role?: string },
  content: string
): Promise<ProblemComment> {
  const newComment: ProblemComment = {
    id: `c-${Date.now()}`,
    author: user.name,
    role: user.role || "Practitioner",
    text: content,
    date: "Just now",
    likes: 0,
    likedBy: [],
    replies: [],
    authorUid: user.uid,
    createdAt: new Date().toISOString(),
  };

  // 1. Update Local Storage and SWR Cache
  const local = getLocalProblemById(problemId);
  let updatedComments: ProblemComment[] = [newComment];
  let totalCount = 1;

  if (local) {
    if (!local.comments) local.comments = [];
    local.comments.unshift(newComment);
    local.commentsCount = local.comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);
    updatedComments = local.comments;
    totalCount = local.commentsCount;
    syncProblemCache(local);
  }

  // 2. Direct atomic update to Firestore with 0 getDoc reads!
  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      await updateDoc(problemRef, {
        comments: updatedComments,
        commentsCount: totalCount,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.warn("Firestore addComment error:", error);
  }

  return newComment;
}

export async function addProblemReply(
  problemId: string,
  commentId: string,
  user: { uid: string; name: string; role?: string },
  text: string
): Promise<CommentReply> {
  const reply: CommentReply = {
    id: `r-${Date.now()}`,
    author: user.name,
    role: user.role || "Practitioner",
    text,
    date: "Just now",
    likes: 0,
    likedBy: [],
    uid: user.uid,
  };

  // 1. Update local storage
  const local = getLocalProblemById(problemId);
  let updatedComments: ProblemComment[] = [];
  let totalCount = 0;

  if (local && local.comments) {
    const parent = local.comments.find((c) => c.id === commentId);
    if (parent) {
      if (!parent.replies) parent.replies = [];
      parent.replies.push(reply);
      local.commentsCount = local.comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);
      updatedComments = local.comments;
      totalCount = local.commentsCount;
      syncProblemCache(local);
    }
  }

  // 2. Direct atomic update to Cloud Firestore (0 getDoc reads)
  try {
    if (db && typeof doc === "function" && updatedComments.length > 0) {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      await updateDoc(problemRef, {
        comments: updatedComments,
        commentsCount: totalCount,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn("Firestore addProblemReply error:", err);
  }

  return reply;
}

export async function toggleCommentLike(
  problemId: string,
  commentId: string,
  replyId?: string,
  userUid: string = "guest"
): Promise<{ likes: number; liked: boolean }> {
  let result = { likes: 0, liked: false };

  // 1. Update local storage and SWR cache
  const local = getLocalProblemById(problemId);
  let updatedComments: ProblemComment[] = [];

  if (local && local.comments) {
    const comment = local.comments.find((c) => c.id === commentId);
    if (comment) {
      const target = replyId ? comment.replies?.find((r) => r.id === replyId) : comment;
      if (target) {
        if (!target.likedBy) target.likedBy = [];
        const alreadyLiked = target.likedBy.includes(userUid);
        if (alreadyLiked) {
          target.likedBy = target.likedBy.filter((u) => u !== userUid);
          target.likes = Math.max(0, (target.likes || 1) - 1);
          result = { likes: target.likes, liked: false };
        } else {
          target.likedBy.push(userUid);
          target.likes = (target.likes || 0) + 1;
          result = { likes: target.likes, liked: true };
        }
        target.liked = result.liked;
        updatedComments = local.comments;
        syncProblemCache(local);
      }
    }
  }

  // 2. Direct atomic update to Cloud Firestore (0 getDoc reads)
  try {
    if (db && typeof doc === "function" && updatedComments.length > 0) {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      await updateDoc(problemRef, {
        comments: updatedComments,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn("Firestore toggleCommentLike error:", err);
  }

  return result;
}

export async function toggleCommentCompanyStatus(
  problemId: string,
  commentId: string,
  isInterestedCompany?: boolean,
  companyName?: string
): Promise<boolean> {
  const local = getLocalProblemById(problemId);
  let updatedComments: ProblemComment[] = [];
  let newStatus = false;

  if (local && local.comments) {
    const comment = local.comments.find((c) => c.id === commentId);
    if (comment) {
      newStatus = isInterestedCompany !== undefined ? isInterestedCompany : !comment.isInterestedCompany;
      comment.isInterestedCompany = newStatus;
      if (companyName) comment.companyName = companyName;
      updatedComments = local.comments;
      syncProblemCache(local);
    }
  }

  try {
    if (db && typeof doc === "function" && updatedComments.length > 0) {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      await updateDoc(problemRef, {
        comments: updatedComments,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn("Firestore toggleCommentCompanyStatus error:", err);
  }

  return newStatus;
}

// Tracks which problem views have already been flushed to Firestore in this session.
// Prevents a page refresh or React StrictMode double-mount from writing 2 view increments.
const _viewedProblemsThisSession = new Set<string>();

export async function recordProblemView(problemId: string): Promise<number> {
  const localCount = incrementLocalProblemViews(problemId);

  // Only write to Firestore once per problem per session (prevents refresh spam writes)
  if (_viewedProblemsThisSession.has(problemId)) {
    return localCount;
  }
  _viewedProblemsThisSession.add(problemId);

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      // Atomic increment write (0 reads). Fire-and-forget — don't await on hot path.
      updateDoc(problemRef, {
        views: increment(1),
        updatedAt: new Date().toISOString(),
      }).catch((err) => {
        console.warn("Firestore recordProblemView deferred:", err?.message);
      });
    }
  } catch (err) {
    console.warn("Firestore recordProblemView error:", err);
  }
  return localCount;
}

export async function toggleCommunityValidation(
  problemId: string,
  type: "face" | "great" | "pay" | "build",
  userUid: string = "guest"
): Promise<{ validations: ProblemValidations; userHasValidated: boolean }> {
  const result = toggleLocalValidation(problemId, type, userUid);
  const updatedProb = getLocalProblemById(problemId);
  if (updatedProb) syncProblemCache(updatedProb);

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      // Direct validations field update (0 getDoc reads)
      await updateDoc(problemRef, {
        validations: result.validations,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn("Firestore toggleCommunityValidation error:", err);
  }
  return result;
}

const sessionInterestDedupe = new Set<string>();

export async function recordUserInterest(
  problemId: string,
  userUid: string = "guest",
  action: string = "view"
): Promise<number> {
  const count = recordLocalInterest(problemId, userUid);

  // Filter out passive micro-events AND actions already covered by their own dedicated write.
  // e.g. "comment" already calls addComment() which writes to Firestore — no need to also
  // write interestedUsers/interestedCount separately.
  const noWriteActions = new Set([
    "view", "dwell_time",
    "comment", "reply",
    "validate_face", "validate_great", "validate_pay", "validate_build",
    "bookmark", "share", "startup_mode_cta",
  ]);
  if (action.startsWith("tab_") || noWriteActions.has(action)) {
    return count;
  }

  // Deduplicate per user + problem + action in the current session
  const dedupeKey = `${problemId}_${userUid}_${action}`;
  if (sessionInterestDedupe.has(dedupeKey)) {
    return count;
  }
  sessionInterestDedupe.add(dedupeKey);

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      // Atomic arrayUnion and increment write with 0 reads!
      await updateDoc(problemRef, {
        interestedUsers: arrayUnion(userUid),
        interestedCount: increment(1),
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn("Firestore recordUserInterest sync error:", err);
  }
  return count;
}

export async function toggleUserInterest(
  problemId: string,
  userUid: string = "guest"
): Promise<{ interested: boolean; count: number }> {
  let isInterested = false;
  let count = 0;

  // Local update
  const local = getLocalProblemById(problemId);
  if (local) {
    if (!local.interestedUsers) local.interestedUsers = [];
    if (local.interestedUsers.includes(userUid)) {
      local.interestedUsers = local.interestedUsers.filter((u) => u !== userUid);
      local.interestedCount = Math.max(0, (local.interestedCount || 1) - 1);
      isInterested = false;
    } else {
      local.interestedUsers.push(userUid);
      local.interestedCount = (local.interestedCount || 0) + 1;
      isInterested = true;
    }
    count = local.interestedCount;
    syncProblemCache(local);
  }

  // Atomic Cloud Firestore update with 0 getDoc reads!
  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      if (isInterested) {
        await updateDoc(problemRef, {
          interestedUsers: arrayUnion(userUid),
          interestedCount: increment(1),
          updatedAt: new Date().toISOString(),
        });
      } else {
        await updateDoc(problemRef, {
          interestedUsers: arrayRemove(userUid),
          interestedCount: increment(-1),
          updatedAt: new Date().toISOString(),
        });
      }
    }
  } catch (err) {
    console.warn("Firestore toggleUserInterest error:", err);
  }

  return { interested: isInterested, count };
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Granular Delta Update (Only writes modified fields)
// ─────────────────────────────────────────────────────────────────────────────
export async function updateFullProblemDetails(
  problemId: string,
  deltaProblemData: Partial<ProblemDoc>
): Promise<boolean> {
  // Enrich the delta with Firestore-authoritative aggregate counters BEFORE writing to
  // localStorage. The admin delta only contains fields the admin changed (title, description,
  // etc.). If we write it directly to local storage, the local problem still has whatever
  // stale views/validation counts were cached — and notifyQueryStreams() then fans those
  // stale counts out to every card on the Explore and Admin pages.
  //
  // Solution: pull the live counts from the in-memory Firestore snapshot if available,
  // and merge them into the delta so local storage always ends up with the real counts.
  const firestoreLive = latestFirestoreDocs.find((fd) => fd.id === problemId)
    || (docStreams.get(problemId)?.latestData as ProblemDoc | null | undefined);

  const countersFromFirestore: Partial<ProblemDoc> = firestoreLive
    ? {
        views:           firestoreLive.views           ?? deltaProblemData.views,
        bookmarksCount:  firestoreLive.bookmarksCount  ?? deltaProblemData.bookmarksCount,
        interestedCount: firestoreLive.interestedCount ?? deltaProblemData.interestedCount,
        commentsCount:   firestoreLive.commentsCount   ?? deltaProblemData.commentsCount,
        validations:     firestoreLive.validations     ?? deltaProblemData.validations,
      }
    : {};

  // 1. Update in local storage (counters from Firestore take precedence over stale local values)
  updateFullProblemInStorage(problemId, { ...countersFromFirestore, ...deltaProblemData });
  const updatedProb = getLocalProblemById(problemId);
  if (updatedProb) {
    syncProblemCache(updatedProb);
  } else {
    swrCache.invalidate(`problem_${problemId}`);
  }

  notifyQueryStreams();
  broadcastSyncEvent({ type: "PROBLEM_UPDATED", problemId });

  // 2. Clean delta payload to write only specific updated fields
  const cleanPayload = cleanDeltaPayload({
    ...deltaProblemData,
    updatedAt: new Date().toISOString(),
    updatedAtServer: serverTimestamp(),
  });

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      let writeError: Error | null = null;

      // Await the write with a 3s timeout — capture actual write errors (e.g. permission denied)
      // so callers can show a real error instead of a false success toast.
      const writePromise = setDoc(problemRef, sanitizeForFirestore(cleanPayload), { merge: true })
        .catch((err) => {
          writeError = err;
          // If permission-denied, force an ID token refresh so the next attempt picks up
          // any recently-granted admin custom claims without requiring a re-login.
          if (err?.code === "permission-denied" || err?.message?.includes("permission")) {
            import("firebase/auth").then(({ getAuth }) => {
              getAuth().currentUser?.getIdToken(true).catch(() => {});
            });
          }
          console.warn("[Firestore] updateFullProblemDetails write rejected:", err?.message);
        });

      const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 3000));
      await Promise.race([writePromise, timeoutPromise]);

      if (writeError) return false;
      return true;
    }
  } catch (error) {
    console.warn("Firestore updateFullProblemDetails error:", error);
    return false;
  }

  return true;
}

export async function deleteProblem(problemId: string): Promise<boolean> {
  deleteProblemFromStorage(problemId);
  swrCache.invalidate(`problem_${problemId}`);

  const stream = docStreams.get(problemId);
  if (stream) {
    try {
      stream.unsubscribe();
    } catch {}
    docStreams.delete(problemId);
  }

  notifyQueryStreams();
  broadcastSyncEvent({ type: "PROBLEM_DELETED", problemId });

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      const deletePromise = deleteDoc(problemRef).catch((err) => {
        console.warn("[Firebase Firestore] Delete queued/deferred by SDK:", err.message);
      });
      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1500));
      await Promise.race([deletePromise, timeoutPromise]);
    }
  } catch (error) {
    console.warn("Firestore deleteProblem error:", error);
  }

  return true;
}

export async function moderateComment(
  problemId: string,
  commentId: string,
  action: "pin" | "unpin" | "hide" | "unhide" | "delete",
  replyId?: string
): Promise<boolean> {
  const local = getLocalProblemById(problemId);
  if (!local || !local.comments) return false;

  let updatedComments = [...local.comments];

  if (action === "delete") {
    if (replyId) {
      updatedComments = updatedComments.map((c) => {
        if (c.id === commentId && c.replies) {
          return { ...c, replies: c.replies.filter((r) => r.id !== replyId) };
        }
        return c;
      });
    } else {
      updatedComments = updatedComments.filter((c) => c.id !== commentId);
    }
  } else {
    updatedComments = updatedComments.map((c) => {
      if (c.id === commentId) {
        if (action === "pin") return { ...c, pinned: true };
        if (action === "unpin") return { ...c, pinned: false };
        if (action === "hide") return { ...c, hidden: true };
        if (action === "unhide") return { ...c, hidden: false };
      }
      return c;
    });
  }

  const totalCount = updatedComments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);
  return updateFullProblemDetails(problemId, {
    comments: updatedComments,
    commentsCount: totalCount,
  });
}

/**
 * ONE-TIME SEEDING UTILITY — ADMIN USE ONLY
 * Seeds baseline REAL_PROBLEMS into Firestore. Requires explicit confirmation token.
 * This is intentionally hard to call accidentally to prevent mass-write quota exhaustion.
 *
 * Usage (from browser console only):
 *   import { seedAllDefaultProblemsToFirestore } from '...'
 *   seedAllDefaultProblemsToFirestore('CONFIRM_SEED')
 */
export async function seedAllDefaultProblemsToFirestore(confirmationToken?: string): Promise<void> {
  if (confirmationToken !== "CONFIRM_SEED") {
    console.warn(
      "[seedAllDefaultProblemsToFirestore] Blocked: pass 'CONFIRM_SEED' as the argument to confirm this mass-write operation."
    );
    return;
  }

  const { writeBatch } = await import("firebase/firestore");
  if (!db || typeof doc !== "function") return;

  console.warn(`[seedAllDefaultProblemsToFirestore] Seeding ${REAL_PROBLEMS.length} problems to Firestore...`);
  const BATCH_SIZE = 400;
  try {
    for (let i = 0; i < REAL_PROBLEMS.length; i += BATCH_SIZE) {
      const chunk = REAL_PROBLEMS.slice(i, i + BATCH_SIZE);
      const batch = writeBatch(db);
      for (const prob of chunk) {
        const problemRef = doc(db, PROBLEMS_COLLECTION, prob.id);
        batch.set(problemRef, { ...prob, createdAtServer: serverTimestamp() }, { merge: true });
      }
      await batch.commit();
      console.log(`[seedAllDefaultProblemsToFirestore] Batch ${i / BATCH_SIZE + 1} committed (${chunk.length} docs)`);
    }
    console.log("[seedAllDefaultProblemsToFirestore] Seeding complete.");
  } catch (err) {
    console.warn("[seedAllDefaultProblemsToFirestore] Error during seeding:", err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 19. User Startup Workspace Notes (Per-User Firestore & Local Storage Sync)
// ─────────────────────────────────────────────────────────────────────────────
export async function getUserStartupNotes(
  problemId: string,
  userId: string
): Promise<UserStartupNotes | null> {
  const localKey = `startup_notes_${userId}_${problemId}`;
  const legacyKey = `startup_notes_${problemId}`;

  // 1. Try local storage first for instant load
  try {
    const local = localStorage.getItem(localKey) || localStorage.getItem(legacyKey);
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed) return parsed;
    }
  } catch (e) {
    console.warn("Error reading local startup notes:", e);
  }

  // 2. Try Firestore if user is authenticated
  if (db && userId && userId !== "guest" && !userId.startsWith("anon_")) {
    try {
      const noteDocRef = doc(db, "users", userId, "startupNotes", problemId);
      const snap = await getDoc(noteDocRef);
      if (snap.exists()) {
        const data = snap.data() as UserStartupNotes;
        // Sync to local cache
        try {
          localStorage.setItem(localKey, JSON.stringify(data));
        } catch {}
        return data;
      }
    } catch (err) {
      console.warn("Error loading startup notes from Firestore:", err);
    }
  }

  return null;
}

export async function saveUserStartupNotes(
  notes: UserStartupNotes
): Promise<{ success: boolean }> {
  const localKey = `startup_notes_${notes.userId}_${notes.problemId}`;
  const legacyKey = `startup_notes_${notes.problemId}`;

  // 1. Save to local storage for instant sync across tabs
  try {
    localStorage.setItem(localKey, JSON.stringify(notes));
    localStorage.setItem(legacyKey, JSON.stringify(notes));
    window.dispatchEvent(
      new CustomEvent("startup_notes_updated", { detail: notes })
    );
  } catch (e) {
    console.warn("Error caching startup notes locally:", e);
  }

  // 2. Save to Firestore if authenticated
  if (db && notes.userId && notes.userId !== "guest" && !notes.userId.startsWith("anon_")) {
    try {
      const noteDocRef = doc(db, "users", notes.userId, "startupNotes", notes.problemId);
      await setDoc(noteDocRef, {
        ...notes,
        updatedAtServer: serverTimestamp(),
      }, { merge: true });
    } catch (err) {
      console.warn("Error saving startup notes to Firestore:", err);
    }
  }

  return { success: true };
}


// ─────────────────────────────────────────────────────────────────────────────
// Zero-read approved problems snapshot (for Related Problems sidebar)
// Reads from: in-memory queryStreams → SWR cache → local storage
// Never opens a new Firestore listener — all features preserved.
// ─────────────────────────────────────────────────────────────────────────────
export function getApprovedProblemsSnapshot(): ProblemDoc[] {
  // 1. Check in-memory multiplexed stream (already populated if /explore was open)
  const approvedKey = JSON.stringify({ status: "approved", industry: "", limit: 100 });
  const allKey = JSON.stringify({ status: "all", industry: "", limit: 100 });
  const streamData =
    queryStreams.get(approvedKey)?.latestData ||
    queryStreams.get(allKey)?.latestData?.filter((p) => p.status === 'approved');
  if (streamData && streamData.length > 0) return streamData;

  // 2. SWR memory cache
  const swrData = swrCache.get<ProblemDoc[]>(`query_${approvedKey}`);
  if (swrData && swrData.length > 0) return swrData;

  // 3. Local storage fallback (always available, no network required)
  return computeMergedProblems({ status: 'approved' }, latestFirestoreDocs);
}
