import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getProblemById,
  subscribeProblemById,
  updateFullProblemDetails,
  deleteProblem,
  moderateComment,
} from "@/lib/firebase/services/problemsService";
import { subscribeCompanies } from "@/lib/firebase/services/companiesService";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { useAuth } from "@/contexts/AuthContext";
import { ProblemDoc, ProblemComment, CompanyDoc, ProblemStatus, EvidenceDocument } from "@/types";
import { REAL_INDUSTRIES, REAL_COMPANIES } from "@/data/realProductionData";
import {
  Save,
  Trash2,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Building2,
  FileText,
  MessageSquare,
  Search,
  Plus,
  X,
  Pin,
  EyeOff,
  Eye,
  Check,
  DollarSign,
  TrendingUp,
  Globe,
  Sliders,
  ShieldCheck,
  Sparkles,
  Rocket,
  Code,
  Headphones,
  Server,
  Zap,
} from "lucide-react";

interface AdminProblemDetailEditorProps {
  problemId?: string;
  onClose?: () => void;
  onSaved?: () => void;
  isEmbedded?: boolean;
}

export const AdminProblemDetailEditor: React.FC<AdminProblemDetailEditorProps> = ({
  problemId: propId,
  onClose,
  onSaved,
  isEmbedded = false,
}) => {
  const { id: routeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userDoc, user } = useAuth();
  const problemId = propId || routeId;

  const [problem, setProblem] = useState<ProblemDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [activeTab, setActiveTab] = useState<
    | "header_scores"
    | "description_market"
    | "evidence"
    | "discussion"
    | "research"
    | "competitors"
    | "suggested_mvp"
    | "companies_solvers"
    | "startup_mode"
    | "related"
  >("header_scores");

  // Registered Companies List
  const [availableCompanies, setAvailableCompanies] = useState<CompanyDoc[]>([]);

  // Local Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("Healthcare & Biotech");
  const [status, setStatus] = useState<ProblemStatus>("approved");
  const [verified, setVerified] = useState(true);
  const [severity, setSeverity] = useState<"minor" | "medium" | "major" | "critical">("major");
  const [painScore, setPainScore] = useState(90);
  const [opportunityScore, setOpportunityScore] = useState(85);
  const [submitterName, setSubmitterName] = useState("");
  const [location, setLocation] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [willingnessToPay, setWillingnessToPay] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [adminReviewNote, setAdminReviewNote] = useState("");

  // Description & Issue details
  const [whenItHappens, setWhenItHappens] = useState("");
  const [whyFrustrating, setWhyFrustrating] = useState("");
  const [whoFacesIt, setWhoFacesIt] = useState("");
  const [frequency, setFrequency] = useState("");
  const [currentSolution, setCurrentSolution] = useState("");

  // Market Size & Impact
  const [tam, setTam] = useState("");
  const [currentPenetration, setCurrentPenetration] = useState(0);
  const [wastedCost, setWastedCost] = useState("");
  const [citizensAffected, setCitizensAffected] = useState("");

  // Evidence
  const [evidenceDocuments, setEvidenceDocuments] = useState<EvidenceDocument[]>([]);
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<{ metric: string; label: string }[]>([]);

  // Research
  const [keyFindings, setKeyFindings] = useState<string[]>([]);
  const [researchMethodology, setResearchMethodology] = useState("");
  const [academicReferences, setAcademicReferences] = useState<string[]>([]);

  // Competitors
  const [competitors, setCompetitors] = useState<{ solution: string; pros: string; cons: string }[]>([]);

  // Suggested MVP
  const [mvpFeatures, setMvpFeatures] = useState<string[]>([]);
  const [technicalRequirements, setTechnicalRequirements] = useState("");

  // Companies Interested / Solvers
  const [selectedCompanyNames, setSelectedCompanyNames] = useState<string[]>([]);
  const [customSolverTags, setCustomSolverTags] = useState<string[]>([]);

  // Comments
  const [comments, setComments] = useState<ProblemComment[]>([]);
  const [newAdminComment, setNewAdminComment] = useState("");

  // 9. Startup Mode Controller
  const [startupModeEnabled, setStartupModeEnabled] = useState(true);
  const [startupThesis, setStartupThesis] = useState("");
  const [startupTargetSegments, setStartupTargetSegments] = useState<string[]>([
    "Rural Clinic Admins",
    "Local Specialists",
    "EMS Providers",
    "Independent Pharmacists",
  ]);
  const [newStartupSegment, setNewStartupSegment] = useState("");
  const [isAddingStartupSegment, setIsAddingStartupSegment] = useState(false);
  const [startupWillingnessToPay, setStartupWillingnessToPay] = useState("$150/mo per practitioner");
  const [startupValueProp, setStartupValueProp] = useState("");
  const [startupSolutionsGaps, setStartupSolutionsGaps] = useState<
    Array<{ name: string; description: string; weaknessType: string; weakness: string }>
  >([
    {
      name: "Epic Care Everywhere",
      description: "Industry standard for large enterprise hospital networks.",
      weaknessType: "Weakness",
      weakness: "Prohibitively expensive for independent rural clinics.",
    },
    {
      name: "Direct Secure Messaging",
      description: "Secure encrypted email protocol for certified healthcare providers.",
      weaknessType: "Gap",
      weakness: "Clunky UI, relies on manual entry and non-standard attachments.",
    },
  ]);
  const [startupDirections, setStartupDirections] = useState<
    Array<{
      type: "software" | "service" | "hardware" | "hybrid" | string;
      title: string;
      description: string;
      pros?: string;
      cons?: string;
      techStack?: string[];
    }>
  >([
    {
      type: "software",
      title: "Software Approach",
      description: "Automated HL7 translation & cloud FHIR bridge.",
      pros: "90%+ gross margins, instant multi-tenant scalability.",
      cons: "Requires robust HIPAA BAA compliance.",
      techStack: ["Next.js", "Python / FastAPI", "FHIR REST API"],
    },
    {
      type: "service",
      title: "Service-Based",
      description: "Managed interoperability and compliance consulting.",
      pros: "Very high ACV ($24k - $60k/yr), zero clinical resistance.",
      cons: "Lower initial margins, slower onboarding cycle.",
      techStack: ["HIPAA-Compliant Portal", "Dedicated Ops Team"],
    },
    {
      type: "hardware",
      title: "Hardware Approach",
      description: "Plug-and-play local edge caching appliance.",
      pros: "100% operational during rural broadband blackouts.",
      cons: "Hardware logistics, firmware maintenance overhead.",
      techStack: ["Raspberry Pi / NUC", "Docker Embedded", "SQLite / DuckDB Sync"],
    },
  ]);
  const [startupValidationQuestions, setStartupValidationQuestions] = useState<string[]>([
    "Talked to 10+ target practitioners or clinic administrators?",
    "Verified they currently pay budget for manual workarounds?",
    "Frequency verified (>3 occurrences per day)?",
    "Secured 2-3 design partner LOIs or pilot agreements?",
    "Mapped 2-week MVP scope and compliance prerequisites?",
  ]);
  const [newStartupValidationQuestion, setNewStartupValidationQuestion] = useState("");
  const [discoveryInterviewPrompt, setDiscoveryInterviewPrompt] = useState(
    "When was the last time an incoming patient record failed to transfer, and how much clinical staff time was spent chasing that single file?"
  );
  const [startupComplianceStandards, setStartupComplianceStandards] = useState<string[]>([
    "HIPAA BAA Compliant",
    "SOC2 Type II Ready",
    "FHIR / HL7 Validated",
    "Carequality HIE Ready",
  ]);
  const [customStartupStandard, setCustomStartupStandard] = useState("");

  const [aiConfidence, setAiConfidence] = useState<number>(96);
  const [aiSuggestedAngles, setAiSuggestedAngles] = useState<string[]>([
    "Universal EHR translation bridge with offline caching for rural clinics.",
    "Secure cloud fax OCR to FHIR standard converter for independent practices.",
  ]);
  const [newSuggestedAngle, setNewSuggestedAngle] = useState("");
  const [aiKeyRisks, setAiKeyRisks] = useState<string[]>([
    "HIPAA BAA compliance hurdles",
    "Legacy EHR vendor API paywalls",
  ]);
  const [newKeyRisk, setNewKeyRisk] = useState("");

  // Load problem details & subscribe live
  useEffect(() => {
    if (!problemId) return;

    // Load available companies
    const unsubCompanies = subscribeCompanies((list) => {
      setAvailableCompanies(list);
    });

    const unsubscribe = subscribeProblemById(problemId, (prob) => {
      if (prob) {
        setProblem(prob);
        setTitle(prob.title || "");
        setDescription(prob.description || "");
        setIndustry(prob.industry || "Healthcare & Biotech");
        setStatus(prob.status || "approved");
        setVerified(prob.verified ?? true);
        setSeverity(prob.severity || "major");
        setPainScore(prob.painScore || 90);
        setOpportunityScore(prob.opportunityScore || 85);
        setSubmitterName(prob.submitterName || prob.submittedBy || "System Admin");
        setLocation(prob.location || "Global");
        setAudienceSize(prob.audienceSize || "");
        setWillingnessToPay(prob.willingnessToPay || "");
        setEstimatedValue(prob.estimatedValue || "");
        setAdminReviewNote(prob.reviewNote || prob.adminReviewNote || "");

        setWhenItHappens(prob.whenItHappens || "");
        setWhyFrustrating(prob.whyFrustrating || "");
        setWhoFacesIt(prob.whoFacesIt || "");
        setFrequency(prob.frequency || "");
        setCurrentSolution(prob.currentSolution || "");

        // Market Data
        setTam(prob.marketData?.tam || prob.estimatedValue || "$1.0B");
        setCurrentPenetration(prob.marketData?.currentPenetration || 25);
        setWastedCost(prob.marketData?.wastedCost || "$500M");
        setCitizensAffected(prob.marketData?.citizensAffected || "10M+");

        // Evidence
        setEvidenceDocuments(prob.evidenceDocuments || []);
        setEvidenceUrls(prob.evidenceUrls || []);
        setDataPoints(prob.dataPoints || []);

        // Research
        setKeyFindings(prob.researchData?.keyFindings || []);
        setResearchMethodology(prob.researchData?.methodology || "");
        setAcademicReferences(prob.researchData?.academicReferences || []);

        // Competitors
        setCompetitors(prob.competitorData || []);

        // Suggested MVP
        setMvpFeatures(prob.suggestedMVP?.coreFeatures || []);
        setTechnicalRequirements(prob.suggestedMVP?.technicalRequirements || "");

        // Companies
        if (prob.attachedCompanyNames !== undefined) {
          setSelectedCompanyNames(prob.attachedCompanyNames);
          setCustomSolverTags((prob.tags || []).filter((t) => !prob.attachedCompanyNames?.includes(t)));
        } else {
          const registeredMatches = (prob.tags || []).filter((t) =>
            availableCompanies.some((c) => c.name.toLowerCase() === t.toLowerCase()) ||
            REAL_COMPANIES.some((c) => c.name.toLowerCase() === t.toLowerCase())
          );
          setSelectedCompanyNames(registeredMatches);
          setCustomSolverTags((prob.tags || []).filter((t) => !registeredMatches.includes(t)));
        }

        // Comments
        setComments(prob.comments || []);

        // Startup Mode Config
        const isStartupActive =
          prob.hasStartupMode !== false &&
          prob.startupModeEnabled !== false &&
          prob.startupModeConfig?.enabled !== false;
        setStartupModeEnabled(isStartupActive);

        if (prob.startupModeConfig) {
          if (prob.startupModeConfig.thesis) {
            setStartupThesis(prob.startupModeConfig.thesis);
          }
          if (prob.startupModeConfig.targetSegments && prob.startupModeConfig.targetSegments.length > 0) {
            setStartupTargetSegments(prob.startupModeConfig.targetSegments);
          }
          if (prob.startupModeConfig.avgWillingnessToPay) {
            setStartupWillingnessToPay(prob.startupModeConfig.avgWillingnessToPay);
          }
          if (prob.startupModeConfig.valuePropositionDraft) {
            setStartupValueProp(prob.startupModeConfig.valuePropositionDraft);
          }
          if (prob.startupModeConfig.existingSolutionsGaps && prob.startupModeConfig.existingSolutionsGaps.length > 0) {
            setStartupSolutionsGaps(prob.startupModeConfig.existingSolutionsGaps.map(s => ({
              name: s.name,
              description: s.description,
              weaknessType: s.weaknessType || "Weakness",
              weakness: s.weakness || "",
            })));
          }
          if (prob.startupModeConfig.directionsToExplore && prob.startupModeConfig.directionsToExplore.length > 0) {
            setStartupDirections(prob.startupModeConfig.directionsToExplore);
          }
          if (prob.startupModeConfig.validationQuestions && prob.startupModeConfig.validationQuestions.length > 0) {
            setStartupValidationQuestions(prob.startupModeConfig.validationQuestions);
          }
          if (prob.startupModeConfig.discoveryInterviewPrompt) {
            setDiscoveryInterviewPrompt(prob.startupModeConfig.discoveryInterviewPrompt);
          }
          if (prob.startupModeConfig.complianceStandards && prob.startupModeConfig.complianceStandards.length > 0) {
            setStartupComplianceStandards(prob.startupModeConfig.complianceStandards);
          }
        }

        // AI Scores & Strategy
        if (prob.aiScores) {
          if (prob.aiScores.aiConfidence !== undefined) setAiConfidence(prob.aiScores.aiConfidence);
          if (prob.aiScores.suggestedAngles && prob.aiScores.suggestedAngles.length > 0) {
            setAiSuggestedAngles(prob.aiScores.suggestedAngles);
          }
          if (prob.aiScores.keyRisks && prob.aiScores.keyRisks.length > 0) {
            setAiKeyRisks(prob.aiScores.keyRisks);
          }
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      unsubCompanies();
    };
  }, [problemId]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveAll = async () => {
    if (!problemId || !problem) return;
    setSaving(true);

    const fullCurrentState: Partial<ProblemDoc> = {
      title,
      description,
      industry,
      status,
      verified,
      severity,
      painScore: Number(painScore),
      opportunityScore: Number(opportunityScore),
      aiScores: {
        ...(problem.aiScores || {
          clarity: 90,
          originality: 85,
          marketSize: 88,
          painLevel: 90,
          urgency: 85,
          existingCompetition: 80,
          technicalFeasibility: 85,
          socialImpact: 90,
          businessPotential: 88,
          aiConfidence: 96,
          overall: 88,
        }),
        aiConfidence: Number(aiConfidence) || 96,
        suggestedAngles: aiSuggestedAngles,
        keyRisks: aiKeyRisks,
        painLevel: Number(painScore),
        businessPotential: Number(opportunityScore),
        overall: Math.round((Number(painScore) + Number(opportunityScore)) / 2),
      },
      submitterName,
      location,
      audienceSize,
      willingnessToPay,
      estimatedValue,
      whenItHappens,
      whyFrustrating,
      whoFacesIt,
      frequency,
      currentSolution,
      marketData: {
        tam,
        currentPenetration: Number(currentPenetration),
        wastedCost,
        citizensAffected,
      },
      evidenceDocuments,
      evidenceUrls,
      dataPoints,
      researchData: {
        keyFindings,
        methodology: researchMethodology,
        academicReferences,
      },
      competitorData: competitors,
      suggestedMVP: {
        coreFeatures: mvpFeatures,
        technicalRequirements,
        complianceStandards: startupComplianceStandards,
      },
      comments,
      commentsCount: comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0),
      attachedCompanyNames: selectedCompanyNames,
      tags: Array.from(new Set([...selectedCompanyNames, ...customSolverTags])),
      reviewNote: adminReviewNote,
      adminReviewNote: adminReviewNote,
      reviewedBy: userDoc?.name || user?.displayName || "Admin Moderator",
      reviewedAt: new Date().toISOString(),
      hasStartupMode: startupModeEnabled,
      startupModeEnabled: startupModeEnabled,
      startupModeConfig: {
        enabled: startupModeEnabled,
        thesis: startupThesis.trim(),
        targetSegments: startupTargetSegments,
        avgWillingnessToPay: startupWillingnessToPay,
        valuePropositionDraft: startupValueProp,
        existingSolutionsGaps: startupSolutionsGaps,
        directionsToExplore: startupDirections.slice(0, 3),
        validationQuestions: startupValidationQuestions,
        discoveryInterviewPrompt: discoveryInterviewPrompt,
        complianceStandards: startupComplianceStandards,
      },
    };

    // Calculate granular delta so we ONLY write fields that were modified
    const delta: Partial<ProblemDoc> = {};
    for (const [key, value] of Object.entries(fullCurrentState)) {
      const originalValue = (problem as any)[key];
      if (JSON.stringify(value) !== JSON.stringify(originalValue)) {
        (delta as any)[key] = value;
      }
    }

    if (Object.keys(delta).length === 0) {
      setSaving(false);
      showToast("No changes detected. Everything is up to date!", "success");
      return;
    }

    const success = await updateFullProblemDetails(problemId, delta);
    setSaving(false);

    if (success) {
      showToast(`Updated ${Object.keys(delta).length} modified module(s) live!`, "success");
      if (onSaved) onSaved();
    } else {
      showToast("Failed to save changes. Check connection.", "error");
    }
  };

  const handleDeleteProblem = async () => {
    if (!problemId) return;
    if (window.confirm(`Are you sure you want to permanently delete "${title}"? This cannot be undone.`)) {
      await deleteProblem(problemId);
      showToast("Problem deleted.", "success");
      if (onClose) onClose();
      else navigate("/admin/problems");
    }
  };

  const handleCommentAction = async (commentId: string, action: "pin" | "unpin" | "hide" | "unhide" | "delete", replyId?: string) => {
    if (!problemId) return;
    await moderateComment(problemId, commentId, action, replyId);
    showToast(`Comment action '${action}' applied.`, "success");
  };

  const handleAddAdminComment = async () => {
    if (!newAdminComment.trim() || !problemId) return;
    const commentObj: ProblemComment = {
      id: `c-admin-${Date.now()}`,
      author: `${userDoc?.name || "System Admin"} (Official)`,
      role: "Platform Moderator",
      text: newAdminComment.trim(),
      date: "Just now",
      likes: 0,
      pinned: true,
      replies: [],
    };
    const updated = [commentObj, ...comments];
    setComments(updated);
    setNewAdminComment("");
    await updateFullProblemDetails(problemId, {
      comments: updated,
      commentsCount: updated.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0),
    });
    showToast("Official admin note pinned to discussion feed.", "success");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16 w-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-gray-500">Loading problem control studio...</span>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-gray-900">Problem Statement Not Found</h3>
        <p className="text-xs text-gray-500 mt-1">ID: {problemId}</p>
        <button
          onClick={() => (onClose ? onClose() : navigate("/admin/problems"))}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold"
        >
          Return to Registry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 font-['Poppins',sans-serif] text-on-surface">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-xs font-bold text-white shadow-xl flex items-center gap-2 animate-bounce ${
            toast.type === "success" ? "bg-emerald-600" : "bg-rose-600"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header Command Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (onClose ? onClose() : navigate("/admin/problems"))}
            className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
            title="Back to Problems"
          >
            <ArrowLeft className="w-4 h-4 text-on-surface" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono text-outline uppercase font-bold">
                Control Studio
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-[11px] font-mono text-primary font-bold">
                ID: {problem.id}
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-on-surface truncate max-w-xl">
              {title || "Untitled Problem"}
            </h1>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
          <Link
            to={`/problem/${problem.id}`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </Link>
          <button
            onClick={handleDeleteProblem}
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{saving ? "Saving Live..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs matching Public Detail Structure */}
      <div className="w-full flex overflow-x-auto gap-2 border-b border-outline-variant/30 pb-2 hide-scrollbar">
        {[
          { id: "header_scores", label: "1. Header & Scores", icon: Sliders },
          { id: "description_market", label: "2. Description & Market Impact", icon: FileText },
          { id: "evidence", label: "3. Evidence & Docs", icon: ShieldCheck },
          { id: "discussion", label: `4. Discussion (${comments.length})`, icon: MessageSquare },
          { id: "research", label: "5. Research", icon: Search },
          { id: "competitors", label: "6. Competitors", icon: TrendingUp },
          { id: "suggested_mvp", label: "7. Suggested MVP", icon: Sparkles },
          { id: "companies_solvers", label: "8. Companies Interested", icon: Building2 },
          { id: "startup_mode", label: "9. Startup Mode Controller", icon: Rocket },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Tab 1: Header, Badges & AI Scores ────────────────────────── */}
      {activeTab === "header_scores" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Main Attributes */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Core Identification & Status
            </h3>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">Problem Statement Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. Data Interoperability Failure in Rural Clinics"
              />
            </div>

            {/* Short Subtitle / Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">Short Subtitle / Summary</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                placeholder="High level overview of the friction and operational impact..."
              />
            </div>

            {/* Industry, Status & Verified Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Industry Label</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3 py-2.5 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                >
                  {REAL_INDUSTRIES.map((ind) => (
                    <option key={ind.id} value={ind.name}>
                      {ind.name}
                    </option>
                  ))}
                  <option value="General Industry">General Industry</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Problem Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProblemStatus)}
                  className="bg-surface-container-low rounded-xl px-3 py-2.5 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary capitalize"
                >
                  <option value="approved">Open / Approved (Live)</option>
                  <option value="in_progress">In Progress</option>
                  <option value="solved">Solved</option>
                  <option value="pending">Pending Review</option>
                  <option value="needs_info">Action Required (Changes Requested)</option>
                  <option value="rejected">Rejected / Hidden</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Verified Badge</label>
                <button
                  type="button"
                  onClick={() => setVerified(!verified)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    verified
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-surface-container text-outline border border-outline-variant/30"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${verified ? "text-primary" : "text-outline"}`} />
                  <span>{verified ? "Verified ✓" : "Unverified"}</span>
                </button>
              </div>
            </div>

            {/* Admin Review Note (Shown prominently when action is requested or reviewed) */}
            <div className="flex flex-col gap-1.5 pt-1">
              <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Admin Review Note / Modification Request Note (Visible to Submitter)</span>
              </label>
              <textarea
                rows={2}
                value={adminReviewNote}
                onChange={(e) => setAdminReviewNote(e.target.value)}
                className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
                placeholder="e.g. Please clarify the quantified annual wasted cost and attach primary evidence link..."
              />
            </div>

            {/* Severity, Submitter & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="bg-surface-container-low rounded-xl px-3 py-2.5 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary capitalize"
                >
                  <option value="critical">Critical</option>
                  <option value="major">Major</option>
                  <option value="medium">Medium</option>
                  <option value="minor">Minor</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Submitter Name</label>
                <input
                  type="text"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Dr. Elena Rostova"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Location Scope</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. North America, Global"
                />
              </div>
            </div>
          </div>

          {/* Scores Control Card */}
          <div className="flex flex-col gap-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Scoring Dials & Weights
            </h3>

            {/* Pain Score */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-error flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Pain Score (1-100)
                </span>
                <span className="font-mono text-sm">{painScore} / 100</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={painScore}
                onChange={(e) => setPainScore(Number(e.target.value))}
                className="accent-[#ff2a55] cursor-pointer w-full"
              />
            </div>

            {/* Opportunity Score */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-secondary flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Opportunity Score (1-100)
                </span>
                <span className="font-mono text-sm">{opportunityScore} / 100</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={opportunityScore}
                onChange={(e) => setOpportunityScore(Number(e.target.value))}
                className="accent-secondary cursor-pointer w-full"
              />
            </div>

            <div className="p-4 bg-surface-container-low rounded-xl text-xs space-y-2 mt-2">
              <span className="font-bold text-on-surface block">Live Telemetry Totals:</span>
              <div className="flex justify-between text-on-surface-variant">
                <span>Real Views:</span>
                <span className="font-mono font-bold text-on-surface">{problem.views || 0}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Face this Validations:</span>
                <span className="font-mono font-bold text-on-surface">{problem.validations?.faceCount || 0}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Building Count:</span>
                <span className="font-mono font-bold text-on-surface">{problem.validations?.buildCount || 0}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Interested Founders:</span>
                <span className="font-mono font-bold text-on-surface">{problem.interestedCount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: Description & Market Impact ───────────────────────── */}
      {activeTab === "description_market" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Detailed Narrative Section */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Operational Narrative & Context
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">When It Happens</label>
                <textarea
                  rows={2}
                  value={whenItHappens}
                  onChange={(e) => setWhenItHappens(e.target.value)}
                  className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Daily during clinical handoffs..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Who Faces It</label>
                <textarea
                  rows={2}
                  value={whoFacesIt}
                  onChange={(e) => setWhoFacesIt(e.target.value)}
                  className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Rural clinic administrators, ER doctors..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Why It's Frustrating</label>
                <textarea
                  rows={3}
                  value={whyFrustrating}
                  onChange={(e) => setWhyFrustrating(e.target.value)}
                  className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Explain why current methods fail and create costly bottlenecks..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Current Solution / Workarounds</label>
                <textarea
                  rows={3}
                  value={currentSolution}
                  onChange={(e) => setCurrentSolution(e.target.value)}
                  className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Manual thermal faxing, Excel spreadsheets, paper charts..."
                />
              </div>
            </div>
          </div>

          {/* Market Size & Impact Cards */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span>Market Size & Financial Impact</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Total Addressable Market (TAM)</label>
                <input
                  type="text"
                  value={tam}
                  onChange={(e) => setTam(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. $4.2B"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Current Market Penetration (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={currentPenetration}
                  onChange={(e) => setCurrentPenetration(Number(e.target.value))}
                  className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 35"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Wasted Annual Cost</label>
                <input
                  type="text"
                  value={wastedCost}
                  onChange={(e) => setWastedCost(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-bold text-error outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. $1.5B"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Citizens / People Affected</label>
                <input
                  type="text"
                  value={citizensAffected}
                  onChange={(e) => setCitizensAffected(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 46 million"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Audience Size Description</label>
                <input
                  type="text"
                  value={audienceSize}
                  onChange={(e) => setAudienceSize(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 120,000+ medical practices globally"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Willingness to Pay</label>
                <input
                  type="text"
                  value={willingnessToPay}
                  onChange={(e) => setWillingnessToPay(e.target.value)}
                  className="bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. $150/mo per practitioner"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 3: Evidence & Documents ─────────────────────────────── */}
      {activeTab === "evidence" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Documents Repeater */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Evidence & Supporting Documents ({evidenceDocuments.length}/5 max)</span>
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Attach official whitepapers, governmental standards, clinical reports, or PDF guidelines (max 5).
                </p>
              </div>
              <button
                type="button"
                disabled={evidenceDocuments.length >= 5}
                onClick={() => {
                  if (evidenceDocuments.length < 5) {
                    setEvidenceDocuments([
                      ...evidenceDocuments,
                      {
                        title: "New Supporting Report",
                        description: "Key findings, regulatory guidelines, or empirical data from this document.",
                        size: "1.5 MB",
                        pages: "10 pages",
                        url: "https://",
                        type: "pdf",
                      },
                    ]);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  evidenceDocuments.length >= 5
                    ? "bg-surface-container text-outline cursor-not-allowed opacity-60"
                    : "bg-primary/10 hover:bg-primary/20 text-primary cursor-pointer"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{evidenceDocuments.length >= 5 ? "Max 5 Reached" : "Add Document"}</span>
              </button>
            </div>

            {evidenceDocuments.length === 0 ? (
              <div className="p-6 rounded-xl bg-surface-container-low border border-dashed border-outline-variant/40 text-center text-xs text-on-surface-variant">
                No supporting documents attached yet. Click "+ Add Document" above (up to 5 documents).
              </div>
            ) : (
              evidenceDocuments.slice(0, 5).map((doc, idx) => (
                <div key={idx} className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-3 relative border border-outline-variant/20 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                    <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Document #{idx + 1}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {doc.url && doc.url !== "https://" && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant text-[11px] font-bold flex items-center gap-1 transition-colors"
                          title="Open and test link"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Test Link</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setEvidenceDocuments(evidenceDocuments.filter((_, i) => i !== idx))}
                        className="p-1 text-gray-400 hover:text-error hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Remove Document"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    {/* Document Title */}
                    <div className="sm:col-span-6">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Document Title</label>
                      <input
                        type="text"
                        value={doc.title}
                        onChange={(e) => {
                          const copy = [...evidenceDocuments];
                          copy[idx].title = e.target.value;
                          setEvidenceDocuments(copy);
                        }}
                        placeholder="e.g. Rural Health Info Hub Report 2023"
                        className="w-full bg-surface-container rounded-lg px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {/* URL / Link */}
                    <div className="sm:col-span-6">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">URL / Web Link</label>
                      <input
                        type="url"
                        value={doc.url}
                        onChange={(e) => {
                          const copy = [...evidenceDocuments];
                          copy[idx].url = e.target.value;
                          setEvidenceDocuments(copy);
                        }}
                        placeholder="https://www.ruralhealthinfo.org"
                        className="w-full bg-surface-container rounded-lg px-3 py-2 text-xs font-mono text-on-surface outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-12">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Document Description / Context</label>
                      <input
                        type="text"
                        value={doc.description || ""}
                        onChange={(e) => {
                          const copy = [...evidenceDocuments];
                          copy[idx].description = e.target.value;
                          setEvidenceDocuments(copy);
                        }}
                        placeholder="Brief summary explaining what empirical proof or standard this document provides..."
                        className="w-full bg-surface-container rounded-lg px-3 py-2 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    {/* Size, Pages/Source, Type */}
                    <div className="sm:col-span-4">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Size</label>
                      <input
                        type="text"
                        value={doc.size || ""}
                        onChange={(e) => {
                          const copy = [...evidenceDocuments];
                          copy[idx].size = e.target.value;
                          setEvidenceDocuments(copy);
                        }}
                        placeholder="e.g. 2.4 MB"
                        className="w-full bg-surface-container rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Pages / Source</label>
                      <input
                        type="text"
                        value={doc.pages || ""}
                        onChange={(e) => {
                          const copy = [...evidenceDocuments];
                          copy[idx].pages = e.target.value;
                          setEvidenceDocuments(copy);
                        }}
                        placeholder="e.g. 12 pages or HealthIT.gov"
                        className="w-full bg-surface-container rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Type</label>
                      <select
                        value={doc.type || "pdf"}
                        onChange={(e) => {
                          const copy = [...evidenceDocuments];
                          copy[idx].type = e.target.value as any;
                          setEvidenceDocuments(copy);
                        }}
                        className="w-full bg-surface-container rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-medium"
                      >
                        <option value="pdf">PDF Document</option>
                        <option value="link">Web Link / Portal</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* External Evidence URLs Section */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span>External Evidence URLs ({evidenceUrls.length}/5 max)</span>
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Direct hyperlinks to public regulatory rules, news investigations, benchmark articles, and verified data repositories (max 5).
                </p>
              </div>
              <button
                type="button"
                disabled={evidenceUrls.length >= 5}
                onClick={() => {
                  if (evidenceUrls.length < 5) {
                    setEvidenceUrls([...evidenceUrls, "https://"]);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  evidenceUrls.length >= 5
                    ? "bg-surface-container text-outline cursor-not-allowed opacity-60"
                    : "bg-primary/10 hover:bg-primary/20 text-primary cursor-pointer"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{evidenceUrls.length >= 5 ? "Max 5 Reached" : "Add URL"}</span>
              </button>
            </div>

            {evidenceUrls.length === 0 ? (
              <div className="p-6 rounded-xl bg-surface-container-low border border-dashed border-outline-variant/40 text-center text-xs text-on-surface-variant">
                No external evidence URLs added yet. Click "+ Add URL" above to add citations (up to 5 URLs).
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {evidenceUrls.slice(0, 5).map((url, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-surface-container-low rounded-xl flex items-center gap-2.5 border border-outline-variant/20"
                  >
                    <span className="text-[11px] font-bold text-primary w-7 text-center shrink-0 bg-surface-container py-1 rounded-md">
                      #{idx + 1}
                    </span>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        const copy = [...evidenceUrls];
                        copy[idx] = e.target.value;
                        setEvidenceUrls(copy);
                      }}
                      placeholder="https://www.healthit.gov/topic/interoperability"
                      className="flex-1 bg-surface-container text-xs font-mono text-on-surface px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-primary"
                    />
                    {url && url !== "https://" && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant transition-colors cursor-pointer shrink-0"
                        title="Open link in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setEvidenceUrls(evidenceUrls.filter((_, i) => i !== idx))}
                      className="p-2 text-gray-400 hover:text-error hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Remove URL"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Key Data Points */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                  Key Statistical Data Points ({dataPoints.length})
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  High-impact quantified metrics highlighting problem scale and severity.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDataPoints([...dataPoints, { metric: "75%", label: "New statistic label" }])}
                className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Data Point
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dataPoints.map((dp, idx) => (
                <div key={idx} className="p-3 bg-surface-container-low rounded-xl flex items-center gap-3 relative border border-outline-variant/20">
                  <input
                    type="text"
                    value={dp.metric}
                    onChange={(e) => {
                      const copy = [...dataPoints];
                      copy[idx].metric = e.target.value;
                      setDataPoints(copy);
                    }}
                    className="w-24 bg-surface-container font-black text-sm text-primary px-3 py-2 rounded-lg text-center outline-none focus:ring-1 focus:ring-primary"
                    placeholder="64%"
                  />
                  <input
                    type="text"
                    value={dp.label}
                    onChange={(e) => {
                      const copy = [...dataPoints];
                      copy[idx].label = e.target.value;
                      setDataPoints(copy);
                    }}
                    className="flex-1 bg-surface-container text-xs text-on-surface px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Metric explanation..."
                  />
                  <button
                    type="button"
                    onClick={() => setDataPoints(dataPoints.filter((_, i) => i !== idx))}
                    className="p-1.5 text-gray-400 hover:text-error hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 4: Discussion & Comment Moderation ──────────────────── */}
      {activeTab === "discussion" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Post Official Admin Note */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
              <Pin className="w-4 h-4 text-primary" />
              <span>Pin Official Admin Response / Practitioner Note</span>
            </h3>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={newAdminComment}
                onChange={(e) => setNewAdminComment(e.target.value)}
                placeholder="Post verified clinical/industry update or moderation notice..."
                className="flex-1 bg-surface-container-low rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleAddAdminComment}
                className="px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-container transition-all cursor-pointer shrink-0"
              >
                Pin Comment
              </button>
            </div>
          </div>

          {/* Comment List */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              All User Comments & Branches ({comments.length})
            </h3>

            {comments.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center italic">
                No user comments currently posted for this problem statement.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {comments.map((c) => (
                  <div key={c.id} className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-on-surface">{c.author}</span>
                        <span className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          {c.role}
                        </span>
                        {c.pinned && (
                          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                            PINNED
                          </span>
                        )}
                        {c.hidden && (
                          <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            HIDDEN
                          </span>
                        )}
                      </div>

                      {/* Comment Actions */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCommentAction(c.id, c.pinned ? "unpin" : "pin")}
                          className="px-2.5 py-1 rounded-lg bg-surface-container text-xs font-semibold hover:bg-surface-container-high text-on-surface-variant flex items-center gap-1"
                        >
                          <Pin className="w-3 h-3" />
                          <span>{c.pinned ? "Unpin" : "Pin"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCommentAction(c.id, c.hidden ? "unhide" : "hide")}
                          className="px-2.5 py-1 rounded-lg bg-surface-container text-xs font-semibold hover:bg-surface-container-high text-on-surface-variant flex items-center gap-1"
                        >
                          {c.hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{c.hidden ? "Unhide" : "Hide"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCommentAction(c.id, "delete")}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed">{c.text}</p>

                    {/* Replies */}
                    {c.replies && c.replies.length > 0 && (
                      <div className="ml-4 pl-4 border-l-2 border-outline-variant/50 flex flex-col gap-2 mt-2">
                        {c.replies.map((r) => (
                          <div key={r.id} className="p-2.5 bg-surface-container rounded-lg flex items-center justify-between gap-3">
                            <div className="flex-1">
                              <span className="text-[11px] font-bold text-on-surface mr-2">{r.author}</span>
                              <span className="text-[11px] text-on-surface-variant">{r.text}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCommentAction(c.id, "delete", r.id)}
                              className="text-gray-400 hover:text-error cursor-pointer"
                              title="Delete reply"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Tab 5: Research & Methodology ───────────────────────────── */}
      {activeTab === "research" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Key Findings */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                Research Key Findings ({keyFindings.length})
              </h3>
              <button
                type="button"
                onClick={() => setKeyFindings([...keyFindings, "New research key finding..."])}
                className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Finding
              </button>
            </div>

            {keyFindings.map((finding, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={finding}
                  onChange={(e) => {
                    const copy = [...keyFindings];
                    copy[idx] = e.target.value;
                    setKeyFindings(copy);
                  }}
                  className="flex-1 bg-surface-container-low rounded-xl px-4 py-2 text-xs text-on-surface"
                />
                <button
                  type="button"
                  onClick={() => setKeyFindings(keyFindings.filter((_, i) => i !== idx))}
                  className="text-gray-400 hover:text-error cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Methodology */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Research Methodology Narrative
            </h3>
            <textarea
              rows={4}
              value={researchMethodology}
              onChange={(e) => setResearchMethodology(e.target.value)}
              className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
              placeholder="Describe sampling size, practitioner interviews, data sets analyzed..."
            />
          </div>

          {/* Academic References */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                Academic & Industry Citations ({academicReferences.length})
              </h3>
              <button
                type="button"
                onClick={() => setAcademicReferences([...academicReferences, '"Paper Title", Journal (2025).'])}
                className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Reference
              </button>
            </div>

            {academicReferences.map((ref, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={ref}
                  onChange={(e) => {
                    const copy = [...academicReferences];
                    copy[idx] = e.target.value;
                    setAcademicReferences(copy);
                  }}
                  className="flex-1 bg-surface-container-low rounded-xl px-4 py-2 text-xs font-serif text-on-surface italic"
                />
                <button
                  type="button"
                  onClick={() => setAcademicReferences(academicReferences.filter((_, i) => i !== idx))}
                  className="text-gray-400 hover:text-error cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 6: Competitors ──────────────────────────────────────── */}
      {activeTab === "competitors" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                Existing Competitor Solutions ({competitors.length})
              </h3>
              <button
                type="button"
                onClick={() =>
                  setCompetitors([
                    ...competitors,
                    { solution: "New Competitor Solution", pros: "Known benefit...", cons: "Main pain point / why inadequate..." },
                  ])
                }
                className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Competitor
              </button>
            </div>

            {competitors.map((comp, idx) => (
              <div key={idx} className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-3 relative">
                <button
                  type="button"
                  onClick={() => setCompetitors(competitors.filter((_, i) => i !== idx))}
                  className="absolute top-3 right-3 text-gray-400 hover:text-error cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="pr-6">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Solution Name</label>
                  <input
                    type="text"
                    value={comp.solution}
                    onChange={(e) => {
                      const copy = [...competitors];
                      copy[idx].solution = e.target.value;
                      setCompetitors(copy);
                    }}
                    className="w-full bg-surface-container rounded-lg px-3 py-1.5 text-xs font-bold text-on-surface"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-emerald-600 uppercase">Pros / Benefits</label>
                    <textarea
                      rows={2}
                      value={comp.pros}
                      onChange={(e) => {
                        const copy = [...competitors];
                        copy[idx].pros = e.target.value;
                        setCompetitors(copy);
                      }}
                      className="w-full bg-surface-container rounded-lg p-2.5 text-xs text-on-surface"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-rose-600 uppercase">Cons / Deficiencies</label>
                    <textarea
                      rows={2}
                      value={comp.cons}
                      onChange={(e) => {
                        const copy = [...competitors];
                        copy[idx].cons = e.target.value;
                        setCompetitors(copy);
                      }}
                      className="w-full bg-surface-container rounded-lg p-2.5 text-xs text-on-surface"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 7: Suggested MVP ─────────────────────────────────────── */}
      {activeTab === "suggested_mvp" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Core Features */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                Core MVP Features ({mvpFeatures.length})
              </h3>
              <button
                type="button"
                onClick={() => setMvpFeatures([...mvpFeatures, "New core feature module..."])}
                className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Feature
              </button>
            </div>

            {mvpFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => {
                    const copy = [...mvpFeatures];
                    copy[idx] = e.target.value;
                    setMvpFeatures(copy);
                  }}
                  className="flex-1 bg-surface-container-low rounded-xl px-4 py-2 text-xs text-on-surface"
                />
                <button
                  type="button"
                  onClick={() => setMvpFeatures(mvpFeatures.filter((_, i) => i !== idx))}
                  className="text-gray-400 hover:text-error cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Technical Architecture & Compliance */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Technical Requirements, Architecture & Compliance Standards
            </h3>
            <textarea
              rows={4}
              value={technicalRequirements}
              onChange={(e) => setTechnicalRequirements(e.target.value)}
              className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. SOC2 Type II compliance, HIPAA BAA readiness, HL7 FHIR API integrations..."
            />
          </div>
        </div>
      )}

      {/* ── Tab 8: Companies Interested / Solvers ────────────────────── */}
      {activeTab === "companies_solvers" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                  Select Registered Companies Interested or Solving This
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Pick from the platform's registered corporate innovators or add custom tags.
                </p>
              </div>
            </div>

            {/* Registered Companies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {availableCompanies.map((comp) => {
                const isSelected = selectedCompanyNames.includes(comp.name);
                return (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCompanyNames(selectedCompanyNames.filter((n) => n !== comp.name));
                      } else {
                        setSelectedCompanyNames([...selectedCompanyNames, comp.name]);
                      }
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 border-primary text-primary font-bold shadow-2xs"
                        : "bg-surface-container-low border-outline-variant/30 text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CompanyLogo name={comp.name} logoUrl={comp.logoUrl} size="md" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-tight">{comp.name}</span>
                        <span className="text-[10px] text-on-surface-variant">{comp.industry}</span>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isSelected ? "bg-primary text-white" : "border border-outline-variant"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Solver / Company Tags */}
            <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-2">
              <label className="text-xs font-bold text-on-surface">Additional Custom Solver Tags</label>
              <div className="flex flex-wrap gap-2">
                {customSolverTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-surface-container text-on-surface px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => setCustomSolverTags(customSolverTags.filter((_, i) => i !== idx))}
                      className="text-gray-400 hover:text-error cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 9: Startup Mode Controller ────────────────────────── */}
      {activeTab === "startup_mode" && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* Master Enable/Disable Control Card */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              startupModeEnabled
                ? "bg-surface-container-lowest border-primary/30 shadow-xs"
                : "bg-surface-container-low border-outline-variant/40"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    startupModeEnabled
                      ? "bg-primary text-white shadow-sm"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                      Startup Mode Interactive Canvas
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        startupModeEnabled
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : "bg-gray-500/10 text-gray-500 border border-gray-500/20"
                      }`}
                    >
                      {startupModeEnabled ? "ACTIVE & PUBLISHED" : "DISABLED"}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {startupModeEnabled
                      ? "Public users and founders can access the venture-building workspace at /startup-mode/:id to draft hypotheses and evaluate unit economics."
                      : "Startup Mode is currently disabled for public users. All data below is safely preserved and will be instantly restored upon re-enabling."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStartupModeEnabled(!startupModeEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  startupModeEnabled
                    ? "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                    : "bg-primary hover:bg-primary-container text-white shadow-sm"
                }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>{startupModeEnabled ? "Disable Startup Mode" : "Enable Startup Mode"}</span>
              </button>
            </div>
          </div>

          {/* Configuration Form (Available even if disabled so admin can prepare data before publishing) */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-6">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
              <div>
                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Startup Workspace Configuration Data
                </h4>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Configure ICP personas, value proposition blueprints, existing competitor gaps, MVP directions, and AI Co-Founder strategy.
                </p>
              </div>
            </div>

            {/* 1. Core Venture Thesis */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                <span>Core Venture Thesis</span>
                <span className="text-[10px] text-primary font-bold">Use **bold** to format key metrics</span>
              </label>
              <textarea
                rows={3}
                value={startupThesis}
                onChange={(e) => setStartupThesis(e.target.value)}
                placeholder="This problem represents an acute systemic inefficiency across **46 million** citizens with an annual wasted cost of **$1.5B**..."
                className="bg-surface-container rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-normal leading-relaxed"
              />
            </div>

            {/* 2. Target Segments */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Target Customer Segments ({startupTargetSegments.length})
              </label>
              <div className="flex flex-wrap gap-2 items-center">
                {startupTargetSegments.map((seg, idx) => (
                  <span
                    key={idx}
                    className="bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>{seg}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setStartupTargetSegments(
                          startupTargetSegments.filter((_, i) => i !== idx)
                        )
                      }
                      className="text-primary hover:text-error cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                {isAddingStartupSegment ? (
                  <div className="inline-flex items-center gap-1.5">
                    <input
                      type="text"
                      value={newStartupSegment}
                      onChange={(e) => setNewStartupSegment(e.target.value)}
                      placeholder="Segment name..."
                      className="px-3 py-1 bg-surface-container rounded-full text-xs text-on-surface outline-none border border-primary"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newStartupSegment.trim()) {
                          e.preventDefault();
                          setStartupTargetSegments([
                            ...startupTargetSegments,
                            newStartupSegment.trim(),
                          ]);
                          setNewStartupSegment("");
                          setIsAddingStartupSegment(false);
                        }
                        if (e.key === "Escape") setIsAddingStartupSegment(false);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newStartupSegment.trim()) {
                          setStartupTargetSegments([
                            ...startupTargetSegments,
                            newStartupSegment.trim(),
                          ]);
                          setNewStartupSegment("");
                        }
                        setIsAddingStartupSegment(false);
                      }}
                      className="px-2.5 py-1 bg-primary text-white rounded-full text-xs font-bold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingStartupSegment(true)}
                    className="px-3 py-1.5 rounded-full border border-dashed border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary text-xs font-semibold transition-colors cursor-pointer"
                  >
                    + Add Segment
                  </button>
                )}
              </div>
            </div>

            {/* 3. Willingness to Pay & Value Prop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5 md:col-span-1">
                <label className="text-xs font-bold text-on-surface">
                  Average Willingness to Pay
                </label>
                <input
                  type="text"
                  value={startupWillingnessToPay}
                  onChange={(e) => setStartupWillingnessToPay(e.target.value)}
                  placeholder="e.g. $150/mo per practitioner"
                  className="bg-surface-container rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold text-on-surface">
                  Default Value Proposition Draft
                </label>
                <textarea
                  rows={2}
                  value={startupValueProp}
                  onChange={(e) => setStartupValueProp(e.target.value)}
                  placeholder="e.g. A lightweight PDF parser that categorizes incoming faxes and maps them to EHR FHIR schemas..."
                  className="bg-surface-container rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-normal"
                />
              </div>
            </div>

            {/* 4. Existing Solutions & Gaps */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Existing Solutions & Gaps ({startupSolutionsGaps.length})
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setStartupSolutionsGaps([
                      ...startupSolutionsGaps,
                      {
                        name: "New Incumbent Tool",
                        description: "Description of how users currently attempt solving this...",
                        weaknessType: "Weakness",
                        weakness: "Key flaw, prohibitive pricing, or missing integration...",
                      },
                    ])
                  }
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Solution Gap
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {startupSolutionsGaps.map((sol, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col gap-2 relative"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setStartupSolutionsGaps(
                          startupSolutionsGaps.filter((_, i) => i !== idx)
                        )
                      }
                      className="absolute top-2.5 right-2.5 text-gray-400 hover:text-error cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      value={sol.name}
                      onChange={(e) => {
                        const copy = [...startupSolutionsGaps];
                        copy[idx].name = e.target.value;
                        setStartupSolutionsGaps(copy);
                      }}
                      placeholder="Solution Name (e.g. Epic Care Everywhere)"
                      className="bg-surface-container-high rounded-lg px-2.5 py-1 text-xs font-bold text-on-surface outline-none"
                    />
                    <textarea
                      rows={2}
                      value={sol.description}
                      onChange={(e) => {
                        const copy = [...startupSolutionsGaps];
                        copy[idx].description = e.target.value;
                        setStartupSolutionsGaps(copy);
                      }}
                      placeholder="Brief description of current tool..."
                      className="bg-surface-container-high rounded-lg p-2 text-xs text-on-surface-variant outline-none"
                    />
                    <div className="pt-2 border-t border-outline-variant/20 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <select
                          value={sol.weaknessType}
                          onChange={(e) => {
                            const copy = [...startupSolutionsGaps];
                            copy[idx].weaknessType = e.target.value;
                            setStartupSolutionsGaps(copy);
                          }}
                          className="text-[10px] font-bold text-error bg-surface-container-highest px-2 py-0.5 rounded-md outline-none uppercase"
                        >
                          <option value="Weakness">Weakness</option>
                          <option value="Gap">Gap</option>
                        </select>
                        <span className="text-[10px] text-on-surface-variant">
                          Why does this fail?
                        </span>
                      </div>
                      <input
                        type="text"
                        value={sol.weakness}
                        onChange={(e) => {
                          const copy = [...startupSolutionsGaps];
                          copy[idx].weakness = e.target.value;
                          setStartupSolutionsGaps(copy);
                        }}
                        placeholder="e.g. Prohibitively expensive for independent clinics..."
                        className="bg-surface-container-high rounded-lg px-2.5 py-1 text-xs text-on-surface outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Directions to Explore (Max 3) */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Architectural Directions ({startupDirections.length}/3 Approaches)
                </label>
                {startupDirections.length < 3 && (
                  <button
                    type="button"
                    onClick={() =>
                      setStartupDirections([
                        ...startupDirections,
                        {
                          type: "software",
                          title: "New Venture Angle",
                          description: "Technical architecture description...",
                          pros: "High scalability and fast implementation.",
                          cons: "Market education and integration friction.",
                          techStack: ["React", "FastAPI", "PostgreSQL"],
                        },
                      ])
                    }
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Direction
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {startupDirections.map((dir, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col gap-2 relative"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setStartupDirections(
                          startupDirections.filter((_, i) => i !== idx)
                        )
                      }
                      className="absolute top-2.5 right-2.5 text-gray-400 hover:text-error cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <select
                        value={dir.type}
                        onChange={(e) => {
                          const copy = [...startupDirections];
                          copy[idx].type = e.target.value;
                          setStartupDirections(copy);
                        }}
                        className="text-[10px] font-bold uppercase text-primary bg-surface-container-highest px-2 py-0.5 rounded outline-none"
                      >
                        <option value="software">Software</option>
                        <option value="service">Service</option>
                        <option value="hardware">Hardware</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      value={dir.title}
                      onChange={(e) => {
                        const copy = [...startupDirections];
                        copy[idx].title = e.target.value;
                        setStartupDirections(copy);
                      }}
                      placeholder="Title (e.g. Software Approach)"
                      className="bg-surface-container-high rounded-lg px-2.5 py-1 text-xs font-bold text-on-surface outline-none"
                    />
                    <textarea
                      rows={2}
                      value={dir.description}
                      onChange={(e) => {
                        const copy = [...startupDirections];
                        copy[idx].description = e.target.value;
                        setStartupDirections(copy);
                      }}
                      placeholder="Description..."
                      className="bg-surface-container-high rounded-lg p-2 text-xs text-on-surface-variant outline-none font-normal"
                    />
                    <input
                      type="text"
                      value={dir.pros || ""}
                      onChange={(e) => {
                        const copy = [...startupDirections];
                        copy[idx].pros = e.target.value;
                        setStartupDirections(copy);
                      }}
                      placeholder="Pros (e.g. 90% gross margins)"
                      className="bg-surface-container-high rounded-lg px-2 py-1 text-[11px] text-emerald-700 outline-none"
                    />
                    <input
                      type="text"
                      value={dir.cons || ""}
                      onChange={(e) => {
                        const copy = [...startupDirections];
                        copy[idx].cons = e.target.value;
                        setStartupDirections(copy);
                      }}
                      placeholder="Cons (e.g. Requires BAA)"
                      className="bg-surface-container-high rounded-lg px-2 py-1 text-[11px] text-error outline-none"
                    />
                    <input
                      type="text"
                      value={(dir.techStack || []).join(", ")}
                      onChange={(e) => {
                        const copy = [...startupDirections];
                        copy[idx].techStack = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                        setStartupDirections(copy);
                      }}
                      placeholder="Tech Stack (comma-separated)"
                      className="bg-surface-container-high rounded-lg px-2 py-1 text-[10px] font-mono text-on-surface outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Compliance & Security Standards */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-outline-variant/20">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Compliance & Security Standards
              </label>
              <p className="text-[11px] text-on-surface-variant">
                Click chips to toggle standard compliance badges for this startup problem.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "HIPAA BAA Compliant",
                  "SOC2 Type II Ready",
                  "FHIR / HL7 Validated",
                  "Carequality HIE Ready",
                  "GDPR & Privacy Shield",
                  "ISO 27001 Certified",
                  "PCI-DSS Level 1",
                  "FedRAMP Moderate",
                  "Zero Trust Encryption (AES-256)",
                ].map((preset) => {
                  const isSelected = startupComplianceStandards.includes(preset);
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setStartupComplianceStandards(
                            startupComplianceStandards.filter((s) => s !== preset)
                          );
                        } else {
                          setStartupComplianceStandards([
                            ...startupComplianceStandards,
                            preset,
                          ]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-xs font-bold"
                          : "bg-surface-container text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high"
                      }`}
                    >
                      <span>{preset}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={customStartupStandard}
                  onChange={(e) => setCustomStartupStandard(e.target.value)}
                  placeholder="Add custom compliance standard..."
                  className="flex-1 bg-surface-container rounded-xl px-3 py-2 text-xs text-on-surface outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customStartupStandard.trim()) {
                      e.preventDefault();
                      if (!startupComplianceStandards.includes(customStartupStandard.trim())) {
                        setStartupComplianceStandards([
                          ...startupComplianceStandards,
                          customStartupStandard.trim(),
                        ]);
                      }
                      setCustomStartupStandard("");
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customStartupStandard.trim()) {
                      if (!startupComplianceStandards.includes(customStartupStandard.trim())) {
                        setStartupComplianceStandards([
                          ...startupComplianceStandards,
                          customStartupStandard.trim(),
                        ]);
                      }
                      setCustomStartupStandard("");
                    }
                  }}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  + Add Standard
                </button>
              </div>
            </div>

            {/* 7. Validation Stage-Gate Checklist & Discovery Prompt */}
            <div className="flex flex-col gap-3 pt-2 border-t border-outline-variant/20">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Founder Validation Questions & Discovery Script
              </label>

              <div className="flex flex-col gap-2">
                {startupValidationQuestions.map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-surface-container p-2.5 rounded-xl">
                    <span className="text-xs font-bold text-primary">{idx + 1}.</span>
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => {
                        const copy = [...startupValidationQuestions];
                        copy[idx] = e.target.value;
                        setStartupValidationQuestions(copy);
                      }}
                      className="flex-1 bg-surface-container-high px-2.5 py-1 text-xs text-on-surface rounded-lg outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setStartupValidationQuestions(startupValidationQuestions.filter((_, i) => i !== idx))}
                      className="text-gray-400 hover:text-error"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newStartupValidationQuestion}
                  onChange={(e) => setNewStartupValidationQuestion(e.target.value)}
                  placeholder="New discovery milestone question..."
                  className="flex-1 bg-surface-container rounded-xl px-3 py-2 text-xs text-on-surface outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newStartupValidationQuestion.trim()) {
                      setStartupValidationQuestions([...startupValidationQuestions, newStartupValidationQuestion.trim()]);
                      setNewStartupValidationQuestion("");
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold cursor-pointer"
                >
                  + Add Question
                </button>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-xs font-bold text-on-surface">Discovery Interview Script Prompt</label>
                <textarea
                  rows={2}
                  value={discoveryInterviewPrompt}
                  onChange={(e) => setDiscoveryInterviewPrompt(e.target.value)}
                  placeholder="Discovery interview question..."
                  className="bg-surface-container rounded-xl p-3 text-xs text-on-surface outline-none"
                />
              </div>
            </div>

            {/* 8. AI Co-Founder & GTM Strategy (Controlled by Admin) */}
            <div className="flex flex-col gap-3 pt-2 border-t border-outline-variant/20">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  AI Co-Founder Synthesis & Confidence Control
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-on-surface-variant">
                    AI Confidence Score:
                  </span>
                  <div className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-xl">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={aiConfidence}
                      onChange={(e) => setAiConfidence(Number(e.target.value))}
                      className="w-12 bg-transparent text-xs font-bold text-on-surface outline-none text-right"
                    />
                    <span className="text-xs font-bold text-on-surface">%</span>
                  </div>
                </div>
              </div>

              <label className="text-xs font-bold text-on-surface mt-1">
                Suggested Strategic Angles ({aiSuggestedAngles.length})
              </label>
              <div className="flex flex-col gap-2">
                {aiSuggestedAngles.map((angle, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-surface-container p-2.5 rounded-xl">
                    <span className="text-xs font-bold text-primary">{idx + 1}.</span>
                    <input
                      type="text"
                      value={angle}
                      onChange={(e) => {
                        const copy = [...aiSuggestedAngles];
                        copy[idx] = e.target.value;
                        setAiSuggestedAngles(copy);
                      }}
                      className="flex-1 bg-surface-container-high px-2.5 py-1 text-xs text-on-surface rounded-lg outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setAiSuggestedAngles(aiSuggestedAngles.filter((_, i) => i !== idx))}
                      className="text-gray-400 hover:text-error"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSuggestedAngle}
                  onChange={(e) => setNewSuggestedAngle(e.target.value)}
                  placeholder="Add strategic go-to-market angle..."
                  className="flex-1 bg-surface-container rounded-xl px-3 py-2 text-xs text-on-surface outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newSuggestedAngle.trim()) {
                      setAiSuggestedAngles([...aiSuggestedAngles, newSuggestedAngle.trim()]);
                      setNewSuggestedAngle("");
                    }
                  }}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  + Add Angle
                </button>
              </div>

              <label className="text-xs font-bold text-on-surface mt-2">
                Key Regulatory & Technical Risks ({aiKeyRisks.length})
              </label>
              <div className="flex flex-col gap-2">
                {aiKeyRisks.map((risk, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-error-container/20 border border-error/20 p-2.5 rounded-xl">
                    <span className="text-xs font-bold text-error">{idx + 1}.</span>
                    <input
                      type="text"
                      value={risk}
                      onChange={(e) => {
                        const copy = [...aiKeyRisks];
                        copy[idx] = e.target.value;
                        setAiKeyRisks(copy);
                      }}
                      className="flex-1 bg-transparent px-2 py-0.5 text-xs text-on-surface rounded outline-none font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setAiKeyRisks(aiKeyRisks.filter((_, i) => i !== idx))}
                      className="text-gray-400 hover:text-error"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKeyRisk}
                  onChange={(e) => setNewKeyRisk(e.target.value)}
                  placeholder="Add key regulatory or technical risk..."
                  className="flex-1 bg-surface-container rounded-xl px-3 py-2 text-xs text-on-surface outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newKeyRisk.trim()) {
                      setAiKeyRisks([...aiKeyRisks, newKeyRisk.trim()]);
                      setNewKeyRisk("");
                    }
                  }}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  + Add Risk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Footer Bar */}
      <div className="sticky bottom-6 w-full flex items-center justify-between bg-surface-container-lowest/90 backdrop-blur-md p-4 rounded-2xl border border-outline-variant/40 shadow-xl z-20">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-on-surface-variant">
            Status: <strong className="text-on-surface capitalize">{status}</strong>
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-xs font-semibold text-on-surface-variant">
            Industry: <strong className="text-on-surface">{industry}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => (onClose ? onClose() : navigate("/admin/problems"))}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {saving ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{saving ? "Saving All..." : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
