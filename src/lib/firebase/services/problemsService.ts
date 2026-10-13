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
  orderBy,
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
import { retryWithBackoff } from "@/lib/resilience";
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
} from "@/lib/storage";
import { REAL_PROBLEMS } from "@/data/realProductionData";
import { swrCache } from "@/lib/swrCache";

const PROBLEMS_COLLECTION = "problems";

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

/**
 * Broadcasts data changes across all active multiplexed query streams (Admin review queue, Explore, Dashboard)
 */
export function notifyQueryStreams(): void {
  for (const [key, stream] of queryStreams.entries()) {
    try {
      const filter = JSON.parse(key);
      const updatedList = getLocalProblems({
        status: filter.status || "all",
        industry: filter.industry,
      });
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
): Promise<{ success: boolean; problemId: string; aiScores: AIScores }> {
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
  // Sequential clean IDs matching prob-1, prob-2, prob-7 standard (no raw UUIDs in URLs)
  const id = generateNextProblemId();

  // Default newly submitted problem statements to "pending" so the administrator
  // receives it in the review queue to moderate and approve.
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
  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, id);
      const firestorePayload = sanitizeForFirestore({
        ...newProblem,
        createdAtServer: serverTimestamp(),
      });
      await setDoc(problemRef, firestorePayload);
      console.log(`[Firebase Firestore] Problem ${id} successfully stored in collection '${PROBLEMS_COLLECTION}' with status: '${resolvedStatus}'`);
    }
  } catch (error) {
    console.error("Firestore createProblem error:", error);
  }

  return { success: true, problemId: id, aiScores };
}

// Helper to synchronously sync storage, SWR cache (memory & sessionStorage), and notify multiplexed stream listeners
function syncProblemCache(problem: ProblemDoc): void {
  if (!problem || !problem.id) return;
  saveLocalProblem(problem);
  swrCache.set(`problem_${problem.id}`, problem, 300_000);
  const stream = docStreams.get(problem.id);
  if (stream) {
    stream.latestData = problem;
    stream.listeners.forEach((cb) => cb(problem));
  }
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

  // 2. Check SWR cache (Tier 1 Memory LRU + Tier 2 SessionStorage)
  const cachedSWR = swrCache.get<ProblemDoc | null>(`problem_${targetId}`);
  if (cachedSWR) {
    return cachedSWR;
  }

  if (local) {
    swrCache.set(`problem_${targetId}`, local, 300_000);
    return local;
  }

  // 3. Fallback to SWR fetcher with 5-minute TTL (300_000ms)
  return swrCache.fetch<ProblemDoc | null>(
    `problem_${targetId}`,
    async () => {
      try {
        if (db && typeof doc === "function") {
          const ref = doc(db, PROBLEMS_COLLECTION, targetId);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const live = snap.data() as ProblemDoc;
            saveLocalProblem(live);
            return live;
          }
        }
      } catch (error) {
        console.warn("Firestore getProblemById fallback:", error);
      }
      return null;
    },
    300_000 // 5 minutes SWR TTL
  );
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

  // 2. Direct field-level atomic write to Firestore (0 duplicate field writes)
  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      await updateDoc(problemRef, {
        [moduleKey]: moduleData,
        updatedAt: new Date().toISOString(),
        updatedAtServer: serverTimestamp(),
      });
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

    // Only attach new Firestore onSnapshot listener if NOT already fresh in SWR cache
    // (This guarantees 0 Firestore reads when navigating from /explore to /problem/:id)
    if (!isCachedFresh) {
      try {
        const ref = doc(db, PROBLEMS_COLLECTION, id);
        unsubscribeFirestore = onSnapshot(
          ref,
          (snap) => {
            if (snap.exists()) {
              const data = snap.data() as ProblemDoc;
              saveLocalProblem(data);
              swrCache.set(`problem_${id}`, data, 300_000);
              const currentStream = docStreams.get(id);
              if (currentStream) {
                currentStream.latestData = data;
                currentStream.listeners.forEach((cb) => cb(data));
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

  // 1. Immediately emit from in-flight stream, SWR cache, or local storage
  const streamData = queryStreams.get(queryKey)?.latestData;
  const swrQueryData = swrCache.get<ProblemDoc[]>(`query_${queryKey}`);
  const local = getLocalProblems({
    status: filter.status || "all",
    industry: filter.industry,
  });

  const initial = streamData || swrQueryData || (local.length > 0 ? local : []);
  if (initial && initial.length > 0) {
    callback(initial);
  } else {
    callback(local);
  }

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
    if (stream.latestData) {
      callback(stream.latestData);
    }
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
      (snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((d) => {
            const data = d.data() as ProblemDoc;
            if (data && data.id) {
              saveLocalProblem(data);
            }
          });
        }
        const mergedList = getLocalProblems({
          status: filter.status || "all",
          industry: filter.industry,
        });

        // 1. Cache full query list in SWR (Memory LRU + SessionStorage)
        swrCache.set(`query_${queryKey}`, mergedList, 300_000);

        // 2. Batch-seed EVERY individual problem into SWR cache
        // Enables instant 0ms, 0-read opening of /problem/:id and /startup-mode/:id!
        swrCache.setMany(mergedList, "problem_", 300_000);

        const currentStream = queryStreams.get(queryKey);
        if (currentStream) {
          currentStream.latestData = mergedList;
          currentStream.listeners.forEach((cb) => cb(mergedList));
        }
      },
      (err) => {
        console.warn("Problems Firestore snapshot notice:", err.message);
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
 * Pushes all baseline and locally created problem statements directly to Firestore
 */
export async function syncAllProblemsToFirebase(): Promise<{ success: boolean; count: number }> {
  const { writeBatch } = await import("firebase/firestore");
  const problems = getLocalProblems({ status: "all" });
  if (!db || typeof doc !== "function") {
    return { success: true, count: problems.length };
  }

  // Firestore write batches are limited to 500 operations each.
  // Split into chunks and commit in parallel for maximum throughput.
  const BATCH_SIZE = 400;
  let count = 0;

  for (let i = 0; i < problems.length; i += BATCH_SIZE) {
    const chunk = problems.slice(i, i + BATCH_SIZE);
    const batch = writeBatch(db);
    for (const prob of chunk) {
      const probRef = doc(db, PROBLEMS_COLLECTION, prob.id);
      batch.set(
        probRef,
        { ...prob, updatedAtServer: serverTimestamp() },
        { merge: true }
      );
      count++;
    }
    try {
      await batch.commit();
    } catch (err) {
      console.warn(`Error committing sync batch (offset ${i}):`, err);
    }
  }

  return { success: true, count };
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

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      const updatePayload: Record<string, any> = {
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
      await updateDoc(problemRef, sanitizeForFirestore(updatePayload));
      console.log(`[Firebase Firestore] Problem ${problemId} status updated to '${newStatus}' by admin ${adminUser.name}`);
      return true;
    }
  } catch (error) {
    console.error("Firestore updateProblemStatus error:", error);
    // Return false so callers can surface an error toast instead of silently failing
    return false;
  }

  // Local-only update succeeded (no db configured)
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

export async function recordProblemView(problemId: string): Promise<number> {
  const localCount = incrementLocalProblemViews(problemId);
  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      // Atomic increment write (0 reads)
      await updateDoc(problemRef, {
        views: increment(1),
        updatedAt: new Date().toISOString(),
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

  // Filter out passive micro-events from triggering cloud writes
  if (action.startsWith("tab_") || action === "dwell_time" || action === "view") {
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
  // 1. Update in local storage
  updateFullProblemInStorage(problemId, deltaProblemData);
  const updatedProb = getLocalProblemById(problemId);
  if (updatedProb) {
    syncProblemCache(updatedProb);
  } else {
    swrCache.invalidate(`problem_${problemId}`);
  }

  // 2. Clean delta payload to write only specific updated fields
  const cleanPayload = cleanDeltaPayload({
    ...deltaProblemData,
    updatedAt: new Date().toISOString(),
    updatedAtServer: serverTimestamp(),
  });

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      await updateDoc(problemRef, cleanPayload);
      return true;
    }
  } catch (error) {
    console.warn("Firestore updateFullProblemDetails error:", error);
  }

  return true;
}

export async function deleteProblem(problemId: string): Promise<boolean> {
  deleteProblemFromStorage(problemId);
  swrCache.invalidate(`problem_${problemId}`);

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      await deleteDoc(problemRef);
      return true;
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

export async function seedAllDefaultProblemsToFirestore(): Promise<void> {
  // Use setDoc with merge:true to skip serial getDoc pre-reads.
  // This is idempotent — existing docs are untouched on fields not in the payload,
  // and it eliminates N sequential reads that previously made seeding O(N) in latency.
  const { writeBatch } = await import("firebase/firestore");
  if (!db || typeof doc !== "function") return;

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
    }
  } catch (err) {
    console.warn("Firestore problem seeding completed with local mirror:", err);
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

