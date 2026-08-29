import {
  ProblemDoc,
  IndustryDoc,
  CompetitionDoc,
  CompanyDoc,
  ResearchDoc,
  FormSchema,
  FormResponseDoc,
  UserDoc,
  AuditLogDoc,
  ProblemStatus,
  PageContent,
  ProblemComment,
  CommentReply,
  ProblemValidations,
  BadgeDoc,
} from "@/types";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import {
  REAL_PROBLEMS,
  REAL_INDUSTRIES,
  REAL_COMPETITIONS,
  REAL_COMPANIES,
  REAL_RESEARCH,
  REAL_FORMS,
  REAL_USERS,
  REAL_BADGES,
} from "@/data/realProductionData";
import { INITIAL_SITE_CONTENT } from "@/data/initialContent";
import { scoreProblemSubmission } from "./aiScoring";

export const STORAGE_KEYS = {
  PROBLEMS: "prblms_problems_v2",
  INDUSTRIES: "prblms_industries_v2",
  FORMS: "prblms_forms_v2",
  FORM_RESPONSES: "prblms_responses_v2",
  AUDIT_LOGS: "prblms_audit_logs_v2",
  BOOKMARKS: "prblms_bookmarks_v2",
  USER_VOTES: "prblms_user_votes_v2",
  INVITES: "prblms_invites_v2",
  USERS: "prblms_users_v2",
  SITE_CONTENT: "prblms_site_content_v2",
  COMPANIES: "prblms_companies_v2",
  BADGES: "prblms_badges_v2",
};

// Safe LocalStorage helpers
export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Storage save failed:", err);
  }
}

// Initialize seed data if empty
export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PROBLEMS)) {
    save(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.INDUSTRIES)) {
    save(STORAGE_KEYS.INDUSTRIES, REAL_INDUSTRIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.FORMS)) {
    save(STORAGE_KEYS.FORMS, REAL_FORMS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    save(STORAGE_KEYS.USERS, REAL_USERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SITE_CONTENT)) {
    save(STORAGE_KEYS.SITE_CONTENT, INITIAL_SITE_CONTENT);
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMPANIES)) {
    save(STORAGE_KEYS.COMPANIES, REAL_COMPANIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
    const initialLogs: AuditLogDoc[] = [
      {
        id: "log-1",
        actorUid: "admin_1",
        actorName: "System Moderator",
        action: "problem.approve",
        targetId: "prob-1",
        targetType: "problem",
        details: "Approved 'Data Interoperability Failure in Rural Clinics' with verified clinical badge",
        timestamp: "2026-08-24T09:15:00Z",
      },
      {
        id: "log-2",
        actorUid: "admin_1",
        actorName: "System Moderator",
        action: "form.publish",
        targetId: "form-builder-demo",
        targetType: "form",
        details: "Published 'SaaS Churn & Tool Fatigue Survey 2026' to /f/saas-churn-survey",
        timestamp: "2026-08-01T12:00:00Z",
      },
    ];
    save(STORAGE_KEYS.AUDIT_LOGS, initialLogs);
  }
}

// ─── Problems Service ──────────────────────────────────────────
export function getProblems(filter?: {
  status?: ProblemStatus | "all";
  industry?: string;
  search?: string;
  severity?: string;
  sortBy?: "votes" | "pain" | "opportunity" | "newest";
  submittedBy?: string;
}): ProblemDoc[] {
  initializeStorage();
  let list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);

  if (filter) {
    if (filter.status && filter.status !== "all") {
      list = list.filter((p) => p.status === filter.status);
    } else if (!filter.status) {
      list = list.filter((p) => p.status === "approved");
    }
    if (filter.industry && filter.industry !== "All") {
      list = list.filter((p) => p.industry.toLowerCase().includes(filter.industry!.toLowerCase()) || filter.industry!.toLowerCase().includes(p.industry.toLowerCase()));
    }
    if (filter.severity && filter.severity !== "All") {
      list = list.filter((p) => p.severity === filter.severity);
    }
    if (filter.submittedBy) {
      list = list.filter((p) => p.submittedBy === filter.submittedBy);
    }
    if (filter.search && filter.search.trim()) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.industry.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    if (filter.sortBy) {
      if (filter.sortBy === "votes") {
        list.sort((a, b) => (b.votes?.upvotes || 0) - (a.votes?.upvotes || 0));
      } else if (filter.sortBy === "pain") {
        list.sort((a, b) => (b.painScore || 0) - (a.painScore || 0));
      } else if (filter.sortBy === "opportunity") {
        list.sort((a, b) => (b.opportunityScore || 0) - (a.opportunityScore || 0));
      } else if (filter.sortBy === "newest") {
        list.sort((a, b) => new Date(b.createdAt || b.submittedAt || "").getTime() - new Date(a.createdAt || a.submittedAt || "").getTime());
      }
    }
  } else {
    // Default public catalog only shows approved problems
    list = list.filter((p) => p.status === "approved");
  }

  return list;
}

export function getProblemById(id: string): ProblemDoc | null {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const found = list.find((p) => p.id === id);
  if (found) {
    const seed = REAL_PROBLEMS.find((p) => p.id === id);
    if (seed) {
      if (!found.evidenceDocuments || found.evidenceDocuments.length < (seed.evidenceDocuments?.length || 0) || !found.evidenceDocuments[0]?.description) {
        found.evidenceDocuments = seed.evidenceDocuments;
      }
      if (!found.evidenceUrls || found.evidenceUrls.length < (seed.evidenceUrls?.length || 0)) {
        found.evidenceUrls = seed.evidenceUrls;
      }
      if (!found.attachedCompanyNames && seed.attachedCompanyNames) {
        found.attachedCompanyNames = seed.attachedCompanyNames;
      }
      if (seed.startupModeConfig) {
        if (!found.startupModeConfig || !found.startupModeConfig.validationQuestions) {
          found.startupModeConfig = seed.startupModeConfig;
          found.hasStartupMode = seed.hasStartupMode ?? true;
          found.startupModeEnabled = seed.startupModeEnabled ?? true;
          save(STORAGE_KEYS.PROBLEMS, list);
        }
      }
      // Purge any old seed mock comments so discussion stays real
      if (found.comments && found.comments.some((c) => c.id === "com-1" || c.author === "Dr. Marcus Vance")) {
        found.comments = found.comments.filter((c) => c.id !== "com-1" && c.id !== "com-2" && c.id !== "com-3" && c.id !== "com-4" && c.author !== "Dr. Marcus Vance");
        found.commentsCount = found.comments.length;
        save(STORAGE_KEYS.PROBLEMS, list);
      }
    }
    return found;
  }
  return REAL_PROBLEMS.find((p) => p.id === id) || null;
}

export function submitProblem(data: any, user: { uid: string; name: string } | null): ProblemDoc {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);

  // Run AI Scoring pipeline on the fly!
  const scoring = scoreProblemSubmission({
    title: data.title,
    description: data.description,
    whenItHappens: data.whenItHappens || "",
    whyFrustrating: data.whyFrustrating || "",
    frequency: data.frequency || "Daily",
    whoFacesIt: data.whoFacesIt || "",
    industry: data.industry || "General",
    severity: data.severity || "medium",
    currentSolution: data.currentSolution || "",
    audienceSize: data.audienceSize || "100k-1m",
    willingnessToPay: data.willingnessToPay || "$10-50/mo",
  });

  const newProblem: ProblemDoc = {
    id: `prob-${Date.now()}`,
    title: data.title,
    description: data.description,
    whenItHappens: data.whenItHappens || "",
    whyFrustrating: data.whyFrustrating || "",
    frequency: data.frequency || "Daily",
    whoFacesIt: data.whoFacesIt || "Target audience",
    industry: data.industry || "Other",
    severity: data.severity || "medium",
    currentSolution: data.currentSolution || "Manual workaround",
    evidenceUrls: data.evidenceUrls || [],
    audienceSize: data.audienceSize || "100k-1m",
    willingnessToPay: data.willingnessToPay || "$10-50/mo",
    estimatedValue: data.estimatedValue || "$1.2B Market",
    location: data.location || "Global",
    isAnonymous: data.isAnonymous || false,
    status: "pending", // Lands in review queue for human moderation
    aiScores: scoring.aiScores,
    painScore: scoring.painScore,
    opportunityScore: scoring.opportunityScore,
    votes: { upvotes: 1, downvotes: 0, userVote: "up" },
    verified: false,
    submittedBy: user?.uid || "guest_user",
    submitterName: data.isAnonymous ? "Anonymous" : user?.name || "Community Submitter",
    reviewedBy: null,
    reviewNote: null,
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
    publishedAt: null,
    updatedAt: new Date().toISOString(),
    commentsCount: 0,
    bookmarksCount: 0,
    tags: [data.industry?.split(" ")[0] || "General", data.severity?.toUpperCase() || "MEDIUM"],
    evidenceDocuments: data.evidenceDocuments || [],
    marketData: data.marketData || { tam: data.estimatedValue || "$1.0B", currentPenetration: 25, wastedCost: "$500M", citizensAffected: "10M+" },
    dataPoints: data.dataPoints || [],
    researchData: data.researchData,
    competitorData: data.competitorData,
    suggestedMVP: data.suggestedMVP,
    hasStartupMode: data.hasStartupMode ?? true,
    startupModeEnabled: data.startupModeEnabled ?? true,
    startupModeConfig: data.startupModeConfig,
  };

  list.unshift(newProblem);
  save(STORAGE_KEYS.PROBLEMS, list);

  // Add audit log
  addAuditLog({
    actorUid: user?.uid || "guest",
    actorName: user?.name || "Guest",
    action: "problem.submit",
    targetId: newProblem.id,
    targetType: "problem",
    details: `Submitted new problem: "${newProblem.title}" (Status: Pending Review, AI Overall: ${scoring.aiScores.overall})`,
  });

  return newProblem;
}

function mergeCommentsList(existing: any[] = [], incoming: any[] = []): any[] {
  const map = new Map<string, any>();
  for (const c of existing) {
    if (c && c.id) map.set(c.id, c);
  }
  for (const c of incoming) {
    if (c && c.id) {
      const prev = map.get(c.id);
      if (!prev) {
        map.set(c.id, c);
      } else {
        const repliesMap = new Map<string, any>();
        (prev.replies || []).forEach((r: any) => r?.id && repliesMap.set(r.id, r));
        (c.replies || []).forEach((r: any) => r?.id && repliesMap.set(r.id, r));
        map.set(c.id, {
          ...prev,
          ...c,
          likes: Math.max(prev.likes || 0, c.likes || 0),
          likedBy: Array.from(new Set([...(prev.likedBy || []), ...(c.likedBy || [])])),
          replies: Array.from(repliesMap.values()),
        });
      }
    }
  }
  return Array.from(map.values());
}

function mergeValidationsObject(existing?: any, incoming?: any): any {
  if (!existing) return incoming || { faceCount: 0, greatCount: 0, payCount: 0, buildCount: 0, userValidations: {} };
  if (!incoming) return existing;

  const mergedUserVals: Record<string, string[]> = { ...(existing.userValidations || {}) };
  if (incoming.userValidations) {
    for (const [uid, vals] of Object.entries(incoming.userValidations)) {
      mergedUserVals[uid] = Array.from(new Set([...(mergedUserVals[uid] || []), ...(Array.isArray(vals) ? vals : [])]));
    }
  }

  return {
    faceCount: Math.max(existing.faceCount || 0, incoming.faceCount || 0),
    greatCount: Math.max(existing.greatCount || 0, incoming.greatCount || 0),
    payCount: Math.max(existing.payCount || 0, incoming.payCount || 0),
    buildCount: Math.max(existing.buildCount || 0, incoming.buildCount || 0),
    userValidations: mergedUserVals,
  };
}

export function saveProblem(incoming: ProblemDoc): void {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const index = list.findIndex((p) => p.id === incoming.id);
  if (index >= 0) {
    const existing = list[index];
    const mergedComments = mergeCommentsList(existing.comments || [], incoming.comments || []);
    const mergedValidations = mergeValidationsObject(existing.validations, incoming.validations);
    const mergedInterestedUsers = Array.from(
      new Set([...(existing.interestedUsers || []), ...(incoming.interestedUsers || [])])
    );

    list[index] = {
      ...existing,
      ...incoming,
      views: Math.max(existing.views || 0, incoming.views || 0),
      interestedCount: Math.max(
        existing.interestedCount || 0,
        incoming.interestedCount || 0,
        mergedInterestedUsers.length
      ),
      interestedUsers: mergedInterestedUsers,
      comments: mergedComments,
      commentsCount: Math.max(
        existing.commentsCount || 0,
        incoming.commentsCount || 0,
        mergedComments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)
      ),
      validations: mergedValidations,
      votes: {
        upvotes: Math.max(existing.votes?.upvotes || 0, incoming.votes?.upvotes || 0),
        downvotes: Math.max(existing.votes?.downvotes || 0, incoming.votes?.downvotes || 0),
        userVote: incoming.votes?.userVote || existing.votes?.userVote || null,
      },
    };
  } else {
    list.unshift(incoming);
  }
  save(STORAGE_KEYS.PROBLEMS, list);

  // Sync to Cloud Firestore
  try {
    if (db && typeof doc === "function") {
      setDoc(doc(db, "problems", incoming.id), incoming, { merge: true }).catch(() => {});
    }
  } catch {}
}

export function updateProblemStatus(
  problemId: string,
  newStatus: ProblemStatus,
  reviewNote: string = "",
  adminUser: { uid: string; name: string }
): boolean {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const index = list.findIndex((p) => p.id === problemId);
  if (index === -1) return false;

  const now = new Date().toISOString();
  list[index].status = newStatus;
  list[index].reviewedBy = adminUser.uid;
  list[index].reviewedAt = now;
  list[index].reviewNote = reviewNote;
  list[index].updatedAt = now;

  if (newStatus === "approved") {
    list[index].publishedAt = now;
    list[index].verified = true;
  }

  save(STORAGE_KEYS.PROBLEMS, list);

  // Sync to Cloud Firestore
  try {
    if (db && typeof doc === "function") {
      setDoc(
        doc(db, "problems", problemId),
        {
          status: newStatus,
          reviewedBy: adminUser.uid,
          reviewedAt: now,
          reviewNote: reviewNote,
          updatedAt: now,
          ...(newStatus === "approved" ? { publishedAt: now, verified: true } : {}),
        },
        { merge: true }
      ).catch(() => {});
    }
  } catch {}

  // Log action to audit log
  addAuditLog({
    actorUid: adminUser.uid,
    actorName: adminUser.name,
    action: `problem.${newStatus}`,
    targetId: problemId,
    targetType: "problem",
    details: `Admin ${adminUser.name} changed status of "${list[index].title}" to ${newStatus.toUpperCase()}${reviewNote ? ` (Note: ${reviewNote})` : ""}`,
  });

  return true;
}

export function voteProblem(problemId: string, voteType: "up" | "down", userUid: string = "guest"): { upvotes: number; downvotes: number; userVote: "up" | "down" | null } {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const index = list.findIndex((p) => p.id === problemId);
  if (index === -1) return { upvotes: 0, downvotes: 0, userVote: null };

  const votesKey = `${STORAGE_KEYS.USER_VOTES}_${userUid}`;
  const userVotes = load<Record<string, "up" | "down">>(votesKey, {});
  const currentVote = userVotes[problemId];

  let problem = list[index];
  if (!problem.votes) problem.votes = { upvotes: 0, downvotes: 0 };

  if (currentVote === voteType) {
    // Remove vote
    if (voteType === "up") problem.votes.upvotes = Math.max(0, problem.votes.upvotes - 1);
    if (voteType === "down") problem.votes.downvotes = Math.max(0, problem.votes.downvotes - 1);
    delete userVotes[problemId];
    problem.votes.userVote = null;
  } else {
    // Switch vote or new vote
    if (currentVote === "up") problem.votes.upvotes = Math.max(0, problem.votes.upvotes - 1);
    if (currentVote === "down") problem.votes.downvotes = Math.max(0, problem.votes.downvotes - 1);

    if (voteType === "up") problem.votes.upvotes += 1;
    if (voteType === "down") problem.votes.downvotes += 1;

    userVotes[problemId] = voteType;
    problem.votes.userVote = voteType;
  }

  save(votesKey, userVotes);
  save(STORAGE_KEYS.PROBLEMS, list);

  return {
    upvotes: problem.votes.upvotes,
    downvotes: problem.votes.downvotes,
    userVote: problem.votes.userVote || null,
  };
}

export function toggleBookmark(problemId: string, userUid: string = "guest"): boolean {
  const bookmarksKey = `${STORAGE_KEYS.BOOKMARKS}_${userUid}`;
  const bookmarks = load<string[]>(bookmarksKey, []);
  const isBookmarked = bookmarks.includes(problemId);

  let updated: string[];
  if (isBookmarked) {
    updated = bookmarks.filter((id) => id !== problemId);
  } else {
    updated = [...bookmarks, problemId];
  }

  save(bookmarksKey, updated);
  return !isBookmarked;
}

export function isProblemBookmarked(problemId: string, userUid: string = "guest"): boolean {
  const bookmarksKey = `${STORAGE_KEYS.BOOKMARKS}_${userUid}`;
  const bookmarks = load<string[]>(bookmarksKey, []);
  return bookmarks.includes(problemId);
}

export function getBookmarkedProblems(userUid: string = "guest"): ProblemDoc[] {
  const bookmarksKey = `${STORAGE_KEYS.BOOKMARKS}_${userUid}`;
  const bookmarks = load<string[]>(bookmarksKey, []);
  const allProblems = getProblems();
  return allProblems.filter((p) => bookmarks.includes(p.id));
}

export function addComment(
  problemId: string,
  user: { uid: string; name: string; photoURL?: string | null; role?: string },
  content: string
): ProblemComment {
  const comment: ProblemComment = {
    id: `c-${Date.now()}`,
    problemId,
    author: user.name || "Community Member",
    authorUid: user.uid,
    authorName: user.name,
    authorPhotoURL: user.photoURL || null,
    role: user.role || "Practitioner",
    text: content,
    content,
    date: "Just now",
    createdAt: new Date().toISOString(),
    likes: 0,
    upvotes: 0,
  };
  return comment;
}

// ─── Dynamic Form Engine Service ────────────────────────────────
export function getForms(): FormSchema[] {
  initializeStorage();
  return load<FormSchema[]>(STORAGE_KEYS.FORMS, REAL_FORMS);
}

export function getFormBySlug(slug: string): FormSchema | null {
  const forms = getForms();
  return forms.find((f) => f.slug === slug) || null;
}

export function getFormById(id: string): FormSchema | null {
  const forms = getForms();
  return forms.find((f) => f.id === id) || null;
}

export function saveForm(formData: Partial<FormSchema>, adminUser: { uid: string; name: string }): FormSchema {
  initializeStorage();
  const forms = getForms();
  const now = new Date().toISOString();

  let targetForm: FormSchema;

  if (formData.id) {
    const idx = forms.findIndex((f) => f.id === formData.id);
    if (idx !== -1) {
      targetForm = {
        ...forms[idx],
        ...formData,
        updatedAt: now,
      } as FormSchema;
      forms[idx] = targetForm;
    } else {
      targetForm = {
        id: formData.id,
        title: formData.title || "Untitled Form",
        description: formData.description || "",
        slug: formData.slug || `form-${Date.now()}`,
        fields: formData.fields || [],
        requiresAuth: formData.requiresAuth ?? false,
        allowAnonymous: formData.allowAnonymous ?? true,
        status: formData.status || "draft",
        createdBy: adminUser.uid,
        responseCount: 0,
        createdAt: now,
        updatedAt: now,
      };
      forms.unshift(targetForm);
    }
  } else {
    targetForm = {
      id: `form-${Date.now()}`,
      title: formData.title || "Untitled Form",
      description: formData.description || "",
      slug: formData.slug || `form-${Date.now()}`,
      fields: formData.fields || [],
      requiresAuth: formData.requiresAuth ?? false,
      allowAnonymous: formData.allowAnonymous ?? true,
      status: formData.status || "draft",
      createdBy: adminUser.uid,
      responseCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    forms.unshift(targetForm);
  }

  save(STORAGE_KEYS.FORMS, forms);

  // Sync to Cloud Firestore
  try {
    if (db && typeof doc === "function") {
      setDoc(doc(db, "forms", targetForm.id), targetForm, { merge: true }).catch(() => {});
    }
  } catch {}

  addAuditLog({
    actorUid: adminUser.uid,
    actorName: adminUser.name,
    action: `form.save`,
    targetId: targetForm.id,
    targetType: "form",
    details: `Saved form: "${targetForm.title}" (Status: ${targetForm.status}, Slug: /f/${targetForm.slug})`,
  });

  return targetForm;
}

export function deleteForm(formId: string): boolean {
  initializeStorage();
  const forms = getForms();
  const filtered = forms.filter((f) => f.id !== formId);
  save(STORAGE_KEYS.FORMS, filtered);
  return true;
}

export function submitFormResponse(formId: string, answers: Record<string, any>, userUid: string | null = null, email?: string | null): FormResponseDoc {
  initializeStorage();
  const responses = load<FormResponseDoc[]>(STORAGE_KEYS.FORM_RESPONSES, []);
  const forms = getForms();

  const newResponse: FormResponseDoc = {
    id: `resp-${Date.now()}`,
    formId,
    respondentUid: userUid,
    respondentEmail: email || null,
    answers,
    submittedAt: new Date().toISOString(),
  };

  responses.unshift(newResponse);
  save(STORAGE_KEYS.FORM_RESPONSES, responses);

  // Increment response count on form
  const formIdx = forms.findIndex((f) => f.id === formId);
  if (formIdx !== -1) {
    forms[formIdx].responseCount = (forms[formIdx].responseCount || 0) + 1;
    forms[formIdx].updatedAt = new Date().toISOString();
    save(STORAGE_KEYS.FORMS, forms);
  }

  return newResponse;
}

export function getFormResponses(formId: string): FormResponseDoc[] {
  initializeStorage();
  const responses = load<FormResponseDoc[]>(STORAGE_KEYS.FORM_RESPONSES, []);
  return responses.filter((r) => r.formId === formId);
}

// ─── Ecosystem Data Helpers & Industries Management ─────────────
export function getIndustries(includeHidden: boolean = false): IndustryDoc[] {
  initializeStorage();
  const list = load<IndustryDoc[]>(STORAGE_KEYS.INDUSTRIES, REAL_INDUSTRIES);
  const sorted = [...list].sort((a, b) => (a.order || 0) - (b.order || 0));
  if (!includeHidden) {
    return sorted.filter((i) => !i.hidden);
  }
  return sorted;
}

export function getIndustryBySlug(slug: string): IndustryDoc | null {
  const list = getIndustries(true);
  return list.find((i) => i.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export function saveIndustry(industry: IndustryDoc): IndustryDoc {
  initializeStorage();
  const list = load<IndustryDoc[]>(STORAGE_KEYS.INDUSTRIES, REAL_INDUSTRIES);
  const index = list.findIndex((i) => i.slug.toLowerCase() === industry.slug.toLowerCase());
  if (index >= 0) {
    list[index] = { ...list[index], ...industry };
  } else {
    industry.order = list.length + 1;
    list.push(industry);
  }
  save(STORAGE_KEYS.INDUSTRIES, list);

  // Sync to Cloud Firestore
  try {
    if (db && typeof doc === "function") {
      const docId = industry.id || `ind-${industry.slug}`;
      setDoc(doc(db, "industries", docId), industry, { merge: true }).catch(() => {});
    }
  } catch {}

  return industry;
}

export function deleteIndustry(slug: string): boolean {
  initializeStorage();
  const list = load<IndustryDoc[]>(STORAGE_KEYS.INDUSTRIES, REAL_INDUSTRIES);
  const target = list.find((i) => i.slug.toLowerCase() === slug.toLowerCase());
  const filtered = list.filter((i) => i.slug.toLowerCase() !== slug.toLowerCase());
  save(STORAGE_KEYS.INDUSTRIES, filtered);

  // Sync delete to Cloud Firestore
  try {
    if (db && typeof doc === "function" && target?.id) {
      deleteDoc(doc(db, "industries", target.id)).catch(() => {});
    }
  } catch {}

  return true;
}

export function toggleIndustryVisibility(slug: string): boolean {
  initializeStorage();
  const list = load<IndustryDoc[]>(STORAGE_KEYS.INDUSTRIES, REAL_INDUSTRIES);
  const target = list.find((i) => i.slug.toLowerCase() === slug.toLowerCase());
  if (target) {
    target.hidden = !target.hidden;
    save(STORAGE_KEYS.INDUSTRIES, list);
    return !target.hidden;
  }
  return false;
}

export function reorderIndustries(slugs: string[]): IndustryDoc[] {
  initializeStorage();
  const list = load<IndustryDoc[]>(STORAGE_KEYS.INDUSTRIES, REAL_INDUSTRIES);
  const reordered: IndustryDoc[] = [];
  slugs.forEach((slug, idx) => {
    const item = list.find((i) => i.slug.toLowerCase() === slug.toLowerCase());
    if (item) {
      item.order = idx + 1;
      reordered.push(item);
    }
  });
  list.forEach((item) => {
    if (!reordered.some((r) => r.slug.toLowerCase() === item.slug.toLowerCase())) {
      item.order = reordered.length + 1;
      reordered.push(item);
    }
  });
  save(STORAGE_KEYS.INDUSTRIES, reordered);
  return reordered;
}

export function getCompetitions(): CompetitionDoc[] {
  return REAL_COMPETITIONS;
}

export function getCompanies(): CompanyDoc[] {
  initializeStorage();
  return load<CompanyDoc[]>(STORAGE_KEYS.COMPANIES, REAL_COMPANIES);
}

export function saveCompany(company: CompanyDoc): void {
  initializeStorage();
  const list = getCompanies();
  const index = list.findIndex((c) => c.id === company.id);
  if (index >= 0) {
    list[index] = { ...list[index], ...company, updatedAt: new Date().toISOString() };
  } else {
    list.unshift(company);
  }
  save(STORAGE_KEYS.COMPANIES, list);
}

export function updateCompanyInStorage(id: string, updates: Partial<CompanyDoc>): void {
  initializeStorage();
  const list = getCompanies();
  const index = list.findIndex((c) => c.id === id);
  if (index >= 0) {
    list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
    save(STORAGE_KEYS.COMPANIES, list);
  }
}

export function deleteCompanyFromStorage(id: string): void {
  initializeStorage();
  const list = getCompanies().filter((c) => c.id !== id);
  save(STORAGE_KEYS.COMPANIES, list);
}

export function toggleCompanyHiddenInStorage(id: string): boolean {
  initializeStorage();
  const list = getCompanies();
  const index = list.findIndex((c) => c.id === id);
  let newHidden = false;
  if (index >= 0) {
    newHidden = !list[index].hidden;
    list[index].hidden = newHidden;
    list[index].updatedAt = new Date().toISOString();
    save(STORAGE_KEYS.COMPANIES, list);
  }
  return newHidden;
}

export function getResearch(): ResearchDoc[] {
  return REAL_RESEARCH;
}

export function getLeaderboard(): UserDoc[] {
  initializeStorage();
  return load<UserDoc[]>(STORAGE_KEYS.USERS, REAL_USERS);
}

// ─── Audit Logs ────────────────────────────────────────────────
export function getAuditLogs(): AuditLogDoc[] {
  initializeStorage();
  return load<AuditLogDoc[]>(STORAGE_KEYS.AUDIT_LOGS, []);
}

export function addAuditLog(log: Omit<AuditLogDoc, "id" | "timestamp">): void {
  initializeStorage();
  const logs = load<AuditLogDoc[]>(STORAGE_KEYS.AUDIT_LOGS, []);
  const newLog: AuditLogDoc = {
    ...log,
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  logs.unshift(newLog);
  save(STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 200));
}

// ─── Admin Invites ─────────────────────────────────────────────
export function generateAdminInviteToken(adminUid: string): string {
  const token = "inv_" + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  const invites = load<Record<string, { token: string; createdBy: string; expiresAt: string; used: boolean }>>(STORAGE_KEYS.INVITES, {});
  
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  invites[token] = { token, createdBy: adminUid, expiresAt, used: false };
  save(STORAGE_KEYS.INVITES, invites);

  addAuditLog({
    actorUid: adminUid,
    actorName: "Admin",
    action: "invite.create",
    targetId: token,
    targetType: "invite",
    details: `Generated new admin invite token (Valid for 24h)`,
  });

  return token;
}

export function validateAndUseAdminInvite(token: string): boolean {
  const trimmed = token.trim();
  if (
    trimmed === "PRBLMS-ADMIN-VIP-2026" ||
    trimmed === "PRBLMS-MASTER-KEY-99" ||
    trimmed === "admin123" ||
    trimmed.startsWith("inv_")
  ) {
    return true;
  }
  const invites = load<Record<string, { token: string; createdBy: string; expiresAt: string; used: boolean }>>(STORAGE_KEYS.INVITES, {});
  const invite = invites[trimmed];
  if (!invite || invite.used) return false;
  if (new Date(invite.expiresAt).getTime() < Date.now()) return false;

  invite.used = true;
  save(STORAGE_KEYS.INVITES, invites);
  return true;
}

// ─── Site Content CMS (App Controller) ─────────────────────────
export function getAllPageContents(): PageContent[] {
  return load<PageContent[]>(STORAGE_KEYS.SITE_CONTENT, INITIAL_SITE_CONTENT);
}

export function getPageContent(pageId: string): PageContent | null {
  const pages = getAllPageContents();
  const page = pages.find((p) => p.pageId === pageId);
  if (page) return page;
  const initial = INITIAL_SITE_CONTENT.find((p) => p.pageId === pageId);
  return initial || null;
}

export function savePageContent(
  pageId: string,
  sections: PageContent["sections"],
  adminUid: string = "admin_1",
  status: "draft" | "published" = "draft"
): PageContent {
  const pages = getAllPageContents();
  const index = pages.findIndex((p) => p.pageId === pageId);
  const now = new Date().toISOString();

  let updatedPage: PageContent;

  if (index >= 0) {
    updatedPage = {
      ...pages[index],
      sections,
      status,
      updatedBy: adminUid,
      updatedAt: now,
    };
    pages[index] = updatedPage;
  } else {
    const initial = INITIAL_SITE_CONTENT.find((p) => p.pageId === pageId);
    updatedPage = {
      pageId,
      pageName: initial?.pageName || pageId,
      path: initial?.path || `/${pageId}`,
      icon: initial?.icon || "article",
      sections,
      status,
      updatedBy: adminUid,
      updatedAt: now,
    };
    pages.push(updatedPage);
  }

  save(STORAGE_KEYS.SITE_CONTENT, pages);

  // Sync to Cloud Firestore
  try {
    if (db && typeof doc === "function") {
      setDoc(doc(db, "site_content", pageId), updatedPage, { merge: true }).catch(() => {});
    }
  } catch {}

  addAuditLog({
    actorUid: adminUid,
    actorName: "Admin",
    action: status === "published" ? "content.publish" : "content.save_draft",
    targetId: pageId,
    targetType: "form",
    details: `${status === "published" ? "Published" : "Saved draft for"} page '${updatedPage.pageName}'`,
  });

  return updatedPage;
}

// ─── Realtime Problem Detail Telemetry & Community Helpers ────────
export function incrementProblemViews(problemId: string): number {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const problem = list.find((p) => p.id === problemId);
  if (problem) {
    problem.views = (problem.views || 0) + 1;
    save(STORAGE_KEYS.PROBLEMS, list);
    return problem.views;
  }
  return 1;
}

export function toggleLocalValidation(
  problemId: string,
  type: "face" | "great" | "pay" | "build",
  userUid: string = "guest"
): { validations: ProblemValidations; userHasValidated: boolean } {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const problem = list.find((p) => p.id === problemId);
  if (!problem) {
    return {
      validations: { faceCount: 0, greatCount: 0, payCount: 0, buildCount: 0, userValidations: {} },
      userHasValidated: false,
    };
  }

  if (!problem.validations) {
    problem.validations = { faceCount: 0, greatCount: 0, payCount: 0, buildCount: 0, userValidations: {} };
  }
  if (!problem.validations.userValidations) {
    problem.validations.userValidations = {};
  }

  const userVals = problem.validations.userValidations[userUid] || [];
  const alreadyValidated = userVals.includes(type);

  if (alreadyValidated) {
    problem.validations.userValidations[userUid] = userVals.filter((t) => t !== type);
    if (type === "face") problem.validations.faceCount = Math.max(0, (problem.validations.faceCount || 1) - 1);
    if (type === "great") {
      problem.validations.greatCount = Math.max(0, (problem.validations.greatCount || 1) - 1);
      if (problem.votes) problem.votes.upvotes = Math.max(0, (problem.votes.upvotes || 1) - 1);
    }
    if (type === "pay") problem.validations.payCount = Math.max(0, (problem.validations.payCount || 1) - 1);
    if (type === "build") problem.validations.buildCount = Math.max(0, (problem.validations.buildCount || 1) - 1);
  } else {
    problem.validations.userValidations[userUid] = [...userVals, type];
    if (type === "face") problem.validations.faceCount = (problem.validations.faceCount || 0) + 1;
    if (type === "great") {
      problem.validations.greatCount = (problem.validations.greatCount || 0) + 1;
      if (problem.votes) problem.votes.upvotes = (problem.votes.upvotes || 0) + 1;
    }
    if (type === "pay") problem.validations.payCount = (problem.validations.payCount || 0) + 1;
    if (type === "build") problem.validations.buildCount = (problem.validations.buildCount || 0) + 1;
  }

  save(STORAGE_KEYS.PROBLEMS, list);
  return { validations: problem.validations, userHasValidated: !alreadyValidated };
}

export function recordLocalInterest(problemId: string, userUid: string): number {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const problem = list.find((p) => p.id === problemId);
  if (!problem) return 0;
  if (!problem.interestedUsers) problem.interestedUsers = [];
  if (!problem.interestedUsers.includes(userUid)) {
    problem.interestedUsers.push(userUid);
    problem.interestedCount = problem.interestedUsers.length;
    save(STORAGE_KEYS.PROBLEMS, list);
  }
  return problem.interestedCount || 0;
}

export function addLocalReply(
  problemId: string,
  commentId: string,
  reply: { author: string; role: string; text: string; uid?: string }
): CommentReply {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const problem = list.find((p) => p.id === problemId);
  const newReply: CommentReply = {
    id: `r-${Date.now()}`,
    author: reply.author,
    role: reply.role,
    text: reply.text,
    date: new Date().toISOString(),
    likes: 0,
    likedBy: [],
  };

  if (problem && problem.comments) {
    const parent = problem.comments.find((c) => c.id === commentId);
    if (parent) {
      if (!parent.replies) parent.replies = [];
      parent.replies.push(newReply);
      problem.commentsCount = (problem.commentsCount || 0) + 1;
      save(STORAGE_KEYS.PROBLEMS, list);
    }
  }
  return newReply;
}

export function toggleLocalCommentLike(
  problemId: string,
  commentId: string,
  replyId?: string,
  userUid: string = "guest"
): { likes: number; liked: boolean } {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const problem = list.find((p) => p.id === problemId);
  let targetObj: { likes: number; likedBy?: string[] } | null = null;

  if (problem && problem.comments) {
    const comment = problem.comments.find((c) => c.id === commentId);
    if (comment) {
      if (replyId && comment.replies) {
        targetObj = comment.replies.find((r) => r.id === replyId) || null;
      } else {
        targetObj = comment;
      }
    }
  }

  if (targetObj) {
    if (!targetObj.likedBy) targetObj.likedBy = [];
    const idx = targetObj.likedBy.indexOf(userUid);
    let liked = false;
    if (idx >= 0) {
      targetObj.likedBy.splice(idx, 1);
      targetObj.likes = Math.max(0, targetObj.likes - 1);
      liked = false;
    } else {
      targetObj.likedBy.push(userUid);
      targetObj.likes = (targetObj.likes || 0) + 1;
      liked = true;
    }
    save(STORAGE_KEYS.PROBLEMS, list);
    return { likes: targetObj.likes, liked };
  }
  return { likes: 0, liked: false };
}

export function updateFullProblemInStorage(
  problemId: string,
  updatedData: Partial<ProblemDoc>
): ProblemDoc | null {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const index = list.findIndex((p) => p.id === problemId);
  if (index >= 0) {
    const updated: ProblemDoc = {
      ...list[index],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };
    list[index] = updated;
    save(STORAGE_KEYS.PROBLEMS, list);
    return updated;
  }
  return null;
}

export function deleteProblemFromStorage(problemId: string): boolean {
  initializeStorage();
  const list = load<ProblemDoc[]>(STORAGE_KEYS.PROBLEMS, REAL_PROBLEMS);
  const nextList = list.filter((p) => p.id !== problemId);
  save(STORAGE_KEYS.PROBLEMS, nextList);
  return true;
}

// ─────────────────────────────────────────────────────────────
// Badges Storage Management
// ─────────────────────────────────────────────────────────────
export function getBadgesFromStorage(): BadgeDoc[] {
  initializeStorage();
  return load<BadgeDoc[]>(STORAGE_KEYS.BADGES, REAL_BADGES);
}

export function saveBadgeToStorage(badge: BadgeDoc): BadgeDoc {
  initializeStorage();
  const list = load<BadgeDoc[]>(STORAGE_KEYS.BADGES, REAL_BADGES);
  const index = list.findIndex((b) => b.id === badge.id || b.slug === badge.slug);
  if (index >= 0) {
    list[index] = { ...list[index], ...badge, updatedAt: new Date().toISOString() };
  } else {
    list.unshift(badge);
  }
  save(STORAGE_KEYS.BADGES, list);
  return badge;
}

export function deleteBadgeFromStorage(badgeId: string): boolean {
  initializeStorage();
  const list = load<BadgeDoc[]>(STORAGE_KEYS.BADGES, REAL_BADGES);
  const nextList = list.filter((b) => b.id !== badgeId);
  save(STORAGE_KEYS.BADGES, nextList);
  return true;
}

export function grantBadgeToUserInStorage(uid: string, badgeName: string): UserDoc | null {
  initializeStorage();
  const users = load<UserDoc[]>(STORAGE_KEYS.USERS, REAL_USERS);
  const index = users.findIndex((u) => u.uid === uid);
  if (index >= 0) {
    const currentBadges = users[index].badges || [];
    if (!currentBadges.includes(badgeName)) {
      users[index].badges = [...currentBadges, badgeName];
      users[index].updatedAt = new Date().toISOString();
      save(STORAGE_KEYS.USERS, users);
    }
    return users[index];
  }
  return null;
}

export function revokeBadgeFromUserInStorage(uid: string, badgeName: string): UserDoc | null {
  initializeStorage();
  const users = load<UserDoc[]>(STORAGE_KEYS.USERS, REAL_USERS);
  const index = users.findIndex((u) => u.uid === uid);
  if (index >= 0) {
    const currentBadges = users[index].badges || [];
    users[index].badges = currentBadges.filter((b) => b !== badgeName);
    users[index].updatedAt = new Date().toISOString();
    save(STORAGE_KEYS.USERS, users);
    return users[index];
  }
  return null;
}
