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
  // ISO string in client/localStorage; Firestore Timestamp when read from Firestore
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
}

export type BadgeTier = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "legendary";
export type BadgeCategory = "submission" | "research" | "venture" | "community" | "special";
export type BadgeTaskType =
  | "problems_submitted"
  | "solutions_built"
  | "votes_received"
  | "evidence_attached"
  | "tam_modeled"
  | "comments_posted"
  | "critical_problems"
  | "bounties_joined"
  | "manual_award";

export interface BadgeDoc {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  category: BadgeCategory;
  tier: BadgeTier;
  taskType: BadgeTaskType;
  taskThreshold: number;
  taskDescription: string;
  isActive: boolean;
  color?: string;
  awardedCount?: number;
  createdAt: Timestamp | string;
  updatedAt?: Timestamp | string;
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

// AIScores — aligned with aiScoring.ts output (the single source of truth).
// Previously firebase.ts had stale/incorrect field names causing silent data mismatches.
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
  summaryFeedback?: string;
  keyRisks?: string[];
  suggestedAngles?: string[];
}

export interface EvidenceDocument {
  title: string;
  description?: string;
  size?: string;
  pages?: string;
  url: string;
  type?: "pdf" | "link" | "doc" | string;
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
  evidenceDocuments?: EvidenceDocument[];
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
  submittedBy: string;
  reviewedBy: string | null;
  reviewNote: string | null;
  // ISO string in client; Firestore Timestamp when read from Firestore
  submittedAt: Timestamp | string;
  reviewedAt: Timestamp | string | null;
  publishedAt: Timestamp | string | null;
  updatedAt: Timestamp | string;
}

// ─────────────────────────────────────────────────────────────
// Dynamic Form Engine -- forms/{id}
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
  slug: string;
  fields: FormFieldSchema[];
  requiresAuth: boolean;
  allowAnonymous: boolean;
  status: FormStatus;
  createdBy: string;
  responseCount: number;
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
}

// ─────────────────────────────────────────────────────────────
// form_responses/{id}
// ─────────────────────────────────────────────────────────────
export interface FormResponseDoc {
  id: string;
  formId: string;
  respondentUid: string | null;
  answers: Record<string, string | string[] | number | boolean | null>;
  submittedAt: Timestamp | string;
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
  deadline: Timestamp | string;
  status: CompetitionStatus;
  counts: {
    submissions: number;
    views: number;
  };
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
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
  createdAt: Timestamp | string;
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
  createdAt: Timestamp | string;
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
  createdAt: Timestamp | string;
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
  timestamp: Timestamp | string;
}

// ─────────────────────────────────────────────────────────────
// admin_invites/{token}
// ─────────────────────────────────────────────────────────────
export interface AdminInviteDoc {
  token: string;
  createdBy: string;
  used: boolean;
  usedBy: string | null;
  expiresAt: Timestamp | string;
  createdAt: Timestamp | string;
}
