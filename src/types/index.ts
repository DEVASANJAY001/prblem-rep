// ─────────────────────────────────────────────────────────────
// User & Auth Types
// ─────────────────────────────────────────────────────────────
export type UserRole = "user" | "moderator" | "admin";

export interface UserDoc {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
  role: UserRole;
  bio?: string;
  headline?: string;
  badges: string[];
  counts: {
    problemsSubmitted: number;
    problemsApproved: number;
    votes: number;
    comments: number;
    bountiesWon?: number;
  };
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt?: string;
}

// ─────────────────────────────────────────────────────────────
// Problem Types
// ─────────────────────────────────────────────────────────────
export type ProblemStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "needs_info"
  | "open"
  | "in_progress"
  | "solved";

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
  summaryFeedback?: string;
  keyRisks?: string[];
  suggestedAngles?: string[];
}

export interface CommentReply {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
  likes: number;
  likedBy?: string[];
  liked?: boolean;
  authorUid?: string;
  uid?: string;
}

export interface ProblemComment {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
  likes: number;
  likedBy?: string[];
  liked?: boolean;
  authorUid?: string;
  authorName?: string;
  authorPhotoURL?: string | null;
  content?: string;
  problemId?: string;
  upvotes?: number;
  pinned?: boolean;
  hidden?: boolean;
  createdAt?: string;
  replies?: CommentReply[];
  isInterestedCompany?: boolean;
  companyName?: string;
  companyLogoUrl?: string;
}

export interface ProblemValidations {
  faceCount: number;
  greatCount: number;
  payCount: number;
  buildCount: number;
  userValidations?: Record<string, ("face" | "great" | "pay" | "build")[]>;
}

export interface EvidenceDocument {
  title: string;
  description?: string;
  size?: string;
  pages?: string;
  url: string;
  type?: "pdf" | "link" | "doc" | string;
}

export interface StartupSolutionGap {
  name: string;
  description: string;
  weaknessType?: "Weakness" | "Gap" | string;
  weakness?: string;
}

export interface StartupDirection {
  type: "software" | "service" | "hardware" | "hybrid" | string;
  title: string;
  description: string;
  pros?: string;
  cons?: string;
  techStack?: string[];
}

export interface StartupModeConfig {
  enabled: boolean;
  thesis?: string;
  targetSegments?: string[];
  avgWillingnessToPay?: string;
  valuePropositionDraft?: string;
  existingSolutionsGaps?: StartupSolutionGap[];
  directionsToExplore?: StartupDirection[];
  validationQuestions?: string[];
  discoveryInterviewPrompt?: string;
  complianceStandards?: string[];
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
  estimatedValue?: string;
  location?: string;
  isAnonymous: boolean;
  status: ProblemStatus;
  aiScores: AIScores | null;
  painScore: number;
  opportunityScore: number;
  votes: {
    upvotes: number;
    downvotes: number;
    userVote?: "up" | "down" | null;
  };
  verified: boolean;
  submittedBy: string;
  submittedByUid?: string;
  submitterName?: string;
  reviewedBy: string | null;
  reviewedByUid?: string;
  reviewNote: string | null;
  adminReviewNote?: string;
  createdAt?: string;
  submittedAt: string;
  reviewedAt: string | null;
  publishedAt: string | null;
  updatedAt: string;
  commentsCount?: number;
  bookmarksCount?: number;
  tags?: string[];
  views?: number;
  interestedCount?: number;
  interestedUsers?: string[];
  validations?: ProblemValidations;
  evidenceDocuments?: EvidenceDocument[];
  dataPoints?: Array<{ metric: string; label: string }>;
  researchData?: { keyFindings: string[]; methodology: string; academicReferences: string[] };
  competitorData?: Array<{ solution: string; pros: string; cons: string }>;
  suggestedMVP?: { coreFeatures: string[]; technicalRequirements: string; complianceStandards?: string[] };
  marketData?: { tam: string; currentPenetration: number; wastedCost: string; citizensAffected: string };
  comments?: ProblemComment[];
  hasStartupMode?: boolean;
  startupModeEnabled?: boolean;
  startupModeConfig?: StartupModeConfig;
  attachedCompanyNames?: string[];
  attachedCompanyIds?: string[];
  psFrom?: string[];
  psFromCustom?: string;
  credits?: string[];
  creditsCustom?: string;
}

// ─────────────────────────────────────────────────────────────
// Credits & 3rd Party Attribution Source Types
// ─────────────────────────────────────────────────────────────
export interface CreditSourceDoc {
  id: string;
  name: string;
  category?: string; // e.g. "Platform Challenge", "Hackathon Platform", "Government / Ministry", "Corporate Innovation", "Individual Research"
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  isActive: boolean;
  order?: number;
  createdAt: string;
  updatedAt?: string;
}

// ─────────────────────────────────────────────────────────────
// Dynamic Form Engine Types
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
  description?: string;
}

export type FormStatus = "draft" | "published" | "closed";

export interface FormSchema {
  id: string;
  title: string;
  description?: string;
  slug: string; // public URL: /f/:slug
  category?: string;
  fields: FormFieldSchema[];
  requiresAuth: boolean;
  allowAnonymous: boolean;
  status: FormStatus | string;
  createdBy: string;
  createdByUid?: string;
  responseCount: number;
  responsesCount?: number;
  settings?: any;
  createdAt: any;
  updatedAt: any;
}

export interface FormResponseDoc {
  id: string;
  formId: string;
  respondentUid: string | null;
  respondentName?: string | null;
  respondentEmail?: string | null;
  answers: Record<string, any>;
  submittedAt: any;
}

// ─────────────────────────────────────────────────────────────
// Ecosystem Types
// ─────────────────────────────────────────────────────────────
export interface IndustryDoc {
  id?: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  problemCount?: number;
  problemsCount?: number;
  totalBounties?: string;
  trendingProblem?: string;
  color?: string;
  order?: number;
  hidden?: boolean;
  weeklyTrend?: string;
  opportunityCount?: number;
  trendingCount?: number;
  avgPainScore?: number;
  marketSize?: string;
  subcategories?: Array<{ name: string; count: number }>;
}

export interface CompetitionDoc {
  id: string;
  title: string;
  companyId?: string;
  companyName?: string;
  companyLogo?: string;
  sponsor?: string;
  sponsorLogo?: string;
  description: string;
  rewardAmount?: number;
  prize?: string;
  deadline: string;
  daysLeft?: number;
  problemId?: string;
  status: "open" | "closed" | "evaluating" | "active" | string;
  category?: string;
  submissionCount?: number;
  participantsCount?: number;
  verified?: boolean;
  tags?: string[];
}

export interface CompanyDoc {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  industry: string;
  website: string;
  verified: boolean;
  problemBountiesCount: number;
  totalRewardsAwarded: number;
  hidden?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResearchDoc {
  id: string;
  title: string;
  type: "paper" | "article" | "report" | "dataset";
  url: string;
  relatedProblemIds: string[];
  source: string;
  author: string;
  year: number;
  readTime: string;
  summary: string;
}

export interface StartupBrief {
  problemId: string;
  problemTitle: string;
  industry: string;
  executiveSummary: string;
  solutionHypotheses: {
    name: string;
    model: "B2B SaaS" | "Marketplace" | "API / Infrastructure" | "Hardware + IoT";
    description: string;
    targetBuyer: string;
    feasibilityScore: number;
  }[];
  targetICP: {
    persona: string;
    coreJobToBeDone: string;
    keyBudgetOwner: string;
    currentWorkaroundCost: string;
  };
  marketSize: {
    tam: string;
    sam: string;
    som: string;
    rationale: string;
  };
  monetization: {
    pricingStrategy: string;
    estimatedACV: string;
    projectedLTVCAC: string;
  };
  gtmRoadmap: {
    phase: string;
    milestone: string;
    keyActions: string[];
  }[];
  competitorMatrix: {
    competitor: string;
    theirWeakness: string;
    ourUnfairAdvantage: string;
  }[];
}

export interface AuditLogDoc {
  id: string;
  actorUid: string;
  actorName: string;
  action: string;
  targetId: string;
  targetType: "problem" | "form" | "user" | "invite" | "system" | string;
  details: string;
  timestamp: string;
}

export interface AdminInviteDoc {
  token: string;
  createdBy: string;
  used: boolean;
  usedBy: string | null;
  expiresAt: string;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────
// App Controller / Site Content CMS Types
// ─────────────────────────────────────────────────────────────
export type ContentFieldType = "text" | "textarea" | "tag_list" | "select";

export interface ContentField {
  fieldId: string;
  label: string;
  type: ContentFieldType;
  value: string | string[];
  options?: string[];
  helpText?: string;
}

export interface ContentSection {
  sectionId: string;
  sectionLabel: string;
  icon?: string;
  fields: ContentField[];
}

export interface PageContent {
  pageId: string;
  pageName: string;
  path: string;
  icon?: string;
  sections: ContentSection[];
  status: "draft" | "published";
  updatedBy: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────
// User Startup Workspace Notes
// ─────────────────────────────────────────────────────────────
export interface UserStartupNotes {
  problemId: string;
  userId: string;
  valueProposition: string;
  selectedSegments: string[];
  selectedDirection: string;
  validationChecklist: Record<string, boolean>;
  savedAt: string;
}


