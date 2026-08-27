import type { Timestamp } from "firebase/firestore";

// ─────────────────────────────────────────────────────────────
// Roles
// ─────────────────────────────────────────────────────────────
export type UserRole = "user" | "moderator" | "admin";

// ─────────────────────────────────────────────────────────────
// users/{uid}
// ─────────────────────────────────────────────────────────────
export interface UserDoc {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
  role: UserRole;
  bio?: string;
  badges: string[];
  counts: {
    problemsSubmitted: number;
    problemsApproved: number;
    votes: number;
    comments: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────────────────────────
// problems/{id}
// ─────────────────────────────────────────────────────────────
export type ProblemStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "needs_info";

export type ProblemSeverity = "minor" | "medium" | "major" | "critical";

export interface AIScores {
  clarity: number;
  originality: number;
  marketSize: number;
  painLevel: number;
  urgency: number;
  existingCompetition: number;
  technicalFeasibility: number;
  socialImpact: number;
  businessPotential: number;
  aiConfidence: number;
  overall: number;
}

export interface ProblemDoc {
  id: string;
  title: string;
  description: string;
  whenItHappens: string;
  whyFrustrating: string;
  frequency: string;
  whoFacesIt: string;
  industry: string;
  severity: ProblemSeverity;
  currentSolution: string;
  evidenceUrls: string[];
  audienceSize: string;
  willingnessToPay: string;
  estimatedValue: string;
  location: string;
  isAnonymous: boolean;
  status: ProblemStatus;
  aiScores: AIScores | null;
  painScore: number | null;
  opportunityScore: number | null;
  votes: {
    upvotes: number;
    downvotes: number;
  };
  verified: boolean;
  submittedBy: string; // uid
  reviewedBy: string | null; // uid of admin
  reviewNote: string | null;
  submittedAt: Timestamp;
  reviewedAt: Timestamp | null;
  publishedAt: Timestamp | null;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────────────────────────
// Dynamic Form Engine — forms/{id}
// ─────────────────────────────────────────────────────────────
export type FieldType =
  | "short_text"
  | "long_text"
  | "single_select"
  | "multi_select"
  | "checkbox"
  | "file_upload"
  | "rating"
  | "date"
  | "section_break";

export interface FormFieldSchema {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
  order: number;
}

export type FormStatus = "draft" | "published" | "closed";

export interface FormSchema {
  id: string;
  title: string;
  description?: string;
  slug: string; // public URL: /f/[slug]
  fields: FormFieldSchema[];
  requiresAuth: boolean;
  allowAnonymous: boolean;
  status: FormStatus;
  createdBy: string; // uid
  responseCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────────────────────────
// form_responses/{id}
// ─────────────────────────────────────────────────────────────
export interface FormResponseDoc {
  id: string;
  formId: string;
  respondentUid: string | null;
  answers: Record<string, string | string[] | number | boolean | null>;
  submittedAt: Timestamp;
}

// ─────────────────────────────────────────────────────────────
// industries/{slug}
// ─────────────────────────────────────────────────────────────
export interface IndustryDoc {
  slug: string;
  name: string;
  icon: string;
  description: string;
  problemCount: number;
}

// ─────────────────────────────────────────────────────────────
// competitions/{id}
// ─────────────────────────────────────────────────────────────
export type CompetitionStatus = "draft" | "open" | "closed" | "completed";

export interface CompetitionDoc {
  id: string;
  title: string;
  companyId: string;
  rewardAmount: number;
  deadline: Timestamp;
  status: CompetitionStatus;
  counts: {
    submissions: number;
    views: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────────────────────────
// companies/{id}
// ─────────────────────────────────────────────────────────────
export interface CompanyDoc {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  industry: string;
  verified: boolean;
  createdAt: Timestamp;
}

// ─────────────────────────────────────────────────────────────
// research/{id}
// ─────────────────────────────────────────────────────────────
export type ResearchType =
  | "paper"
  | "article"
  | "report"
  | "dataset"
  | "other";

export interface ResearchDoc {
  id: string;
  title: string;
  type: ResearchType;
  url: string;
  relatedProblemIds: string[];
  source: string;
  createdAt: Timestamp;
}

// ─────────────────────────────────────────────────────────────
// votes/{id}
// ─────────────────────────────────────────────────────────────
export type VoteType = "upvote" | "downvote";

export interface VoteDoc {
  id: string;
  problemId: string;
  uid: string;
  type: VoteType;
  createdAt: Timestamp;
}

// ─────────────────────────────────────────────────────────────
// audit_logs/{id}
// ─────────────────────────────────────────────────────────────
export type AuditAction =
  | "problem.approve"
  | "problem.reject"
  | "problem.needs_info"
  | "problem.merge"
  | "user.role_change"
  | "form.publish"
  | "form.close"
  | "invite.create"
  | "invite.use";

export interface AuditLogDoc {
  id: string;
  actorUid: string;
  action: AuditAction;
  targetId: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  timestamp: Timestamp;
}

// ─────────────────────────────────────────────────────────────
// admin_invites/{token} — for invite-only admin registration
// ─────────────────────────────────────────────────────────────
export interface AdminInviteDoc {
  token: string;
  createdBy: string; // uid
  used: boolean;
  usedBy: string | null;
  expiresAt: Timestamp;
  createdAt: Timestamp;
}
