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
} from "@/lib/storage";
import { REAL_PROBLEMS } from "@/data/realProductionData";

const PROBLEMS_COLLECTION = "problems";

// ─────────────────────────────────────────────────────────────────────────────
// Shared Multiplexed Listener Registry (Prevents Duplicate Firestore Reads)
// ─────────────────────────────────────────────────────────────────────────────
interface StreamSubscription<T> {
  unsubscribe: () => void;
  listeners: Set<(data: T) => void>;
  latestData: T | null;
}

const docStreams = new Map<string, StreamSubscription<ProblemDoc | null>>();
const queryStreams = new Map<string, StreamSubscription<ProblemDoc[]>>();

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

// ─────────────────────────────────────────────────────────────────────────────
// 1. Create Problem (Single Atomic Write)
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
  const id = `prob-${Date.now()}`;

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
    status: "pending",
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
      complianceStandards: problemData.suggestedMVP?.complianceStandards,
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
    verified: false,
  };

  // 1. Persist locally first
  saveLocalProblem(newProblem);

  // 2. Persist to Firestore (1 write operation)
  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, id);
      await setDoc(problemRef, {
        ...newProblem,
        createdAtServer: serverTimestamp(),
      });
    }
  } catch (error) {
    console.warn("Firestore createProblem error:", error);
  }

  return { success: true, problemId: id, aiScores };
}

import { swrCache } from "@/lib/swrCache";

// ─────────────────────────────────────────────────────────────────────────────
// 2. Optimized Read with Local-First & In-Memory SWR Cache (0 Duplicates)
// ─────────────────────────────────────────────────────────────────────────────
export async function getProblemById(id: string): Promise<ProblemDoc | null> {
  const cachedStream = docStreams.get(id);
  if (cachedStream && cachedStream.latestData) {
    return cachedStream.latestData;
  }

  return swrCache.fetch<ProblemDoc | null>(
    `problem_${id}`,
    async () => {
      const local = getLocalProblemById(id);
      if (local) return local;

      try {
        if (db && typeof doc === "function") {
          const ref = doc(db, PROBLEMS_COLLECTION, id);
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
    20_000 // 20s in-memory SWR TTL
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

  // 2. Invalidate SWR cache for this problem
  swrCache.invalidate(`problem_${problemId}`);

  // 3. Direct field-level atomic write to Firestore (0 duplicate field writes)
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
  id: string,
  callback: (problem: ProblemDoc | null) => void
): () => void {
  // Always emit local data immediately
  const initial = getLocalProblemById(id);
  callback(initial);

  if (!db || typeof doc !== "function") {
    return () => {};
  }

  let stream = docStreams.get(id);
  if (!stream) {
    const ref = doc(db, PROBLEMS_COLLECTION, id);
    const listeners = new Set<(problem: ProblemDoc | null) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as ProblemDoc;
          saveLocalProblem(data);
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

    stream = { unsubscribe, listeners, latestData: initial };
    docStreams.set(id, stream);
  } else {
    stream.listeners.add(callback);
    if (stream.latestData) {
      callback(stream.latestData);
    }
  }

  return () => {
    const currentStream = docStreams.get(id);
    if (currentStream) {
      currentStream.listeners.delete(callback);
      if (currentStream.listeners.size === 0) {
        currentStream.unsubscribe();
        docStreams.delete(id);
      }
    }
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Multiplexed Query Subscription (0 Duplicate Reads)
// ─────────────────────────────────────────────────────────────────────────────
export function subscribeProblems(
  filter: { status?: "approved" | "pending" | "rejected" | "all"; industry?: string } = {},
  callback: (problems: ProblemDoc[]) => void
): () => void {
  const local = getLocalProblems({
    status: filter.status === "all" ? undefined : filter.status,
    industry: filter.industry,
  });
  callback(local);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  const queryKey = `${filter.status || "all"}_${filter.industry || "all"}`;
  let stream = queryStreams.get(queryKey);

  if (!stream) {
    const colRef = collection(db, PROBLEMS_COLLECTION);
    const listeners = new Set<(problems: ProblemDoc[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      colRef,
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
          status: filter.status === "all" ? undefined : filter.status,
          industry: filter.industry,
        });
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

    stream = { unsubscribe, listeners, latestData: local };
    queryStreams.set(queryKey, stream);
  } else {
    stream.listeners.add(callback);
    if (stream.latestData) {
      callback(stream.latestData);
    }
  }

  return () => {
    const currentStream = queryStreams.get(queryKey);
    if (currentStream) {
      currentStream.listeners.delete(callback);
      if (currentStream.listeners.size === 0) {
        currentStream.unsubscribe();
        queryStreams.delete(queryKey);
      }
    }
  };
}

/**
 * Pushes all baseline and locally created problem statements directly to Firestore
 */
export async function syncAllProblemsToFirebase(): Promise<{ success: boolean; count: number }> {
  const problems = getLocalProblems({ status: "all" });
  let count = 0;
  if (!db || typeof doc !== "function" || typeof setDoc !== "function") {
    return { success: true, count: problems.length };
  }

  for (const prob of problems) {
    try {
      const probRef = doc(db, PROBLEMS_COLLECTION, prob.id);
      await setDoc(
        probRef,
        {
          ...prob,
          updatedAtServer: serverTimestamp(),
        },
        { merge: true }
      );
      count++;
    } catch (err) {
      console.warn(`Error syncing problem ${prob.id} to Firestore:`, err);
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
  updateLocalProblemStatus(problemId, newStatus, reviewNote, adminUser);

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      // Direct partial update (0 preliminary reads)
      await updateDoc(problemRef, {
        status: newStatus,
        reviewedBy: adminUser.name,
        reviewedByUid: adminUser.uid,
        reviewedAt: new Date().toISOString(),
        reviewNote: reviewNote || "",
        verified: newStatus === "approved",
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.warn("Firestore updateProblemStatus error:", error);
  }

  return true;
}

export async function voteProblem(
  problemId: string,
  voteType: "up" | "down",
  userUid: string = "guest"
): Promise<{ upvotes: number; downvotes: number; userVote: "up" | "down" | null }> {
  const result = voteLocalProblem(problemId, voteType, userUid);

  try {
    if (db && typeof doc === "function") {
      const problemRef = doc(db, PROBLEMS_COLLECTION, problemId);
      // Direct field update (0 preliminary reads)
      await updateDoc(problemRef, {
        "votes.upvotes": result.upvotes,
        "votes.downvotes": result.downvotes,
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

  // 1. Update Local Storage
  const local = getLocalProblemById(problemId);
  let updatedComments: ProblemComment[] = [newComment];
  let totalCount = 1;

  if (local) {
    if (!local.comments) local.comments = [];
    local.comments.unshift(newComment);
    local.commentsCount = local.comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);
    updatedComments = local.comments;
    totalCount = local.commentsCount;
    saveLocalProblem(local);
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
      saveLocalProblem(local);
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

  // 1. Update local storage
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
        saveLocalProblem(local);
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
      saveLocalProblem(local);
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
  } catch (err) {}
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
    saveLocalProblem(local);
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
  try {
    if (db && typeof doc === "function") {
      for (const prob of REAL_PROBLEMS) {
        const problemRef = doc(db, PROBLEMS_COLLECTION, prob.id);
        const snap = await getDoc(problemRef);
        if (!snap.exists()) {
          await setDoc(problemRef, {
            ...prob,
            createdAtServer: serverTimestamp(),
          });
        }
      }
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

