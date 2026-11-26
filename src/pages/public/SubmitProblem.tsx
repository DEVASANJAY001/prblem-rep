import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { createProblem } from "@/lib/firebase/services/problemsService";
import { BulkProblemImportModal } from "@/components/admin/AdminBulkProblemImportModal";
import { subscribeCredits } from "@/lib/firebase/services/creditsService";
import { recordUserSubmission } from "@/lib/storage";
import { getProblemDetailUrl } from "@/lib/seoUrls";
import { SEOHead } from "@/components/common/SEOHead";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { EvidenceDocument, ProblemSeverity, CreditSourceDoc, StartupSolutionGap, StartupDirection } from "@/types";
import confetti from "canvas-confetti";
import { HumanVerification } from "@/components/common/HumanVerification";
import { executeRecaptcha } from "@/lib/recaptcha";
import { CreditSourceBadge } from "@/components/ui/CreditSourceBadge";
import {
  CheckCircle,
  Upload,
  FileSpreadsheet,
  ArrowRight,
  ArrowLeft,
  FileText,
  Building2,
  Users,
  DollarSign,
  ShieldCheck,
  Search,
  Plus,
  X,
  ExternalLink,
  Rocket,
  Code,
  Zap,
  Globe,
  Layers,
  BarChart3,
  Check,
  AlertCircle,
  Clock,
  Briefcase,
  HelpCircle,
  Eye,
  Sliders,
  Sparkles,
  ChevronRight,
  Hash,
  Activity,
  Info,
} from "lucide-react";

export const SubmitProblem: React.FC = () => {
  const navigate = useNavigate();
  const { user, userDoc, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedProblemId, setSubmittedProblemId] = useState<string | null>(null);
  const [storedInFirestore, setStoredInFirestore] = useState<boolean>(false);
  const [firestoreNotice, setFirestoreNotice] = useState<string | null>(null);
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [adminDirectPublish, setAdminDirectPublish] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);

  // ── Tab 1: Core Narrative ──────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("Healthcare");
  const [customIndustry, setCustomIndustry] = useState("");
  const [isCustomIndustry, setIsCustomIndustry] = useState(false);
  const [severity, setSeverity] = useState<ProblemSeverity>("major");
  const [location, setLocation] = useState("Global");
  const [whenItHappens, setWhenItHappens] = useState("");
  const [whoFacesIt, setWhoFacesIt] = useState("");
  const [whyFrustrating, setWhyFrustrating] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [currentSolution, setCurrentSolution] = useState("");

  // Submitter Attribution
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [customSubmitterName, setCustomSubmitterName] = useState(
    userDoc?.displayName || userDoc?.name || user?.displayName || ""
  );
  const [submitterRole, setSubmitterRole] = useState("");

  useEffect(() => {
    if (userDoc?.displayName || userDoc?.name || user?.displayName) {
      setCustomSubmitterName((prev) => prev || userDoc?.displayName || userDoc?.name || user?.displayName || "");
    }
  }, [userDoc, user]);

  // Credits & Origin
  const [psFrom, setPsFrom] = useState<string[]>(["Own Thinking"]);
  const [psFromCustom, setPsFromCustom] = useState("");
  const [availableCredits, setAvailableCredits] = useState<CreditSourceDoc[]>([]);
  const [selectedCreditDropdown, setSelectedCreditDropdown] = useState("");

  useEffect(() => {
    const unsub = subscribeCredits((list) => {
      setAvailableCredits(list.filter((c) => c.isActive !== false));
    }, false);
    return () => unsub();
  }, []);

  // ── Tab 2: Evidence & Documents ─────────────────────────────────────
  const [dataPoints, setDataPoints] = useState<Array<{ metric: string; label: string }>>([]);
  const [newMetric, setNewMetric] = useState("");
  const [newMetricLabel, setNewMetricLabel] = useState("");

  const [evidenceDocuments, setEvidenceDocuments] = useState<EvidenceDocument[]>([]);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocDesc, setNewDocDesc] = useState("");
  const [newDocUrl, setNewDocUrl] = useState("");

  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [newEvidenceUrl, setNewEvidenceUrl] = useState("");

  // ── Tab 3: Market Telemetry ─────────────────────────────────────────
  const [tam, setTam] = useState("");
  const [currentPenetration, setCurrentPenetration] = useState(0);
  const [wastedCost, setWastedCost] = useState("");
  const [citizensAffected, setCitizensAffected] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [willingnessToPay, setWillingnessToPay] = useState("");

  // ── Tab 4: Research & Competitors ───────────────────────────────────
  const [keyFindings, setKeyFindings] = useState<string[]>([]);
  const [newFinding, setNewFinding] = useState("");
  const [researchMethodology, setResearchMethodology] = useState("");
  const [academicReferences, setAcademicReferences] = useState<string[]>([]);
  const [newRef, setNewRef] = useState("");
  const [competitors, setCompetitors] = useState<Array<{ solution: string; pros: string; cons: string }>>([]);
  const [newCompName, setNewCompName] = useState("");
  const [newCompPros, setNewCompPros] = useState("");
  const [newCompCons, setNewCompCons] = useState("");

  // ── Tab 5: Suggested MVP ───────────────────────────────────────────
  const [mvpFeatures, setMvpFeatures] = useState<string[]>([]);
  const [newMvpFeature, setNewMvpFeature] = useState("");
  const [technicalRequirements, setTechnicalRequirements] = useState("");

  // ── Tab 6: Startup Mode Blueprint ──────────────────────────────────
  const [hasStartupMode, setHasStartupMode] = useState(false);
  const [startupThesis, setStartupThesis] = useState("");
  const [startupTargetSegments, setStartupTargetSegments] = useState<string[]>([]);
  const [newSegment, setNewSegment] = useState("");
  const [startupWillingnessToPay, setStartupWillingnessToPay] = useState("");
  const [startupValueProp, setStartupValueProp] = useState("");
  const [startupSolutionsGaps, setStartupSolutionsGaps] = useState<StartupSolutionGap[]>([]);
  const [newGapName, setNewGapName] = useState("");
  const [newGapDesc, setNewGapDesc] = useState("");
  const [newGapWeakness, setNewGapWeakness] = useState("");
  const [newGapType, setNewGapType] = useState<"Weakness" | "Gap">("Weakness");

  const [startupDirections, setStartupDirections] = useState<StartupDirection[]>([]);
  const [newDirType, setNewDirType] = useState<string>("software");
  const [newDirTitle, setNewDirTitle] = useState("");
  const [newDirDesc, setNewDirDesc] = useState("");
  const [newDirPros, setNewDirPros] = useState("");
  const [newDirCons, setNewDirCons] = useState("");
  const [newDirTechStack, setNewDirTechStack] = useState("");

  const [startupValidationQuestions, setStartupValidationQuestions] = useState<string[]>([]);
  const [newValidationQuestion, setNewValidationQuestion] = useState("");
  const [discoveryInterviewPrompt, setDiscoveryInterviewPrompt] = useState("");

  const [startupComplianceStandards, setStartupComplianceStandards] = useState<string[]>([
    "SOC2 Type II",
    "ISO 27001",
    "GDPR Data Privacy",
    "HIPAA Healthcare Security",
    "PCI-DSS Payment Card Standard",
  ]);
  const [customStandard, setCustomStandard] = useState("");

  const [suggestedAngles, setSuggestedAngles] = useState<string[]>([]);
  const [newSuggestedAngle, setNewSuggestedAngle] = useState("");
  const [keyRisks, setKeyRisks] = useState<string[]>([]);
  const [newKeyRisk, setNewKeyRisk] = useState("");

  // ── Dynamic Rigor Health Score Calculation ──────────────────────────
  const rigorScore = useMemo(() => {
    let score = 0;
    // 1. Narrative (up to 30)
    if (title.trim().length >= 10) score += 10;
    if (description.trim().length >= 40) score += 10;
    if (whoFacesIt.trim() && whyFrustrating.trim()) score += 10;

    // 2. Evidence (up to 25)
    if (dataPoints.length > 0) score += 10;
    if (evidenceUrls.length > 0 || evidenceDocuments.length > 0) score += 10;
    if (dataPoints.length >= 2) score += 5;

    // 3. Telemetry (up to 25)
    if (tam.trim()) score += 10;
    if (wastedCost.trim() || citizensAffected.trim()) score += 10;
    if (willingnessToPay.trim()) score += 5;

    // 4. Solutions / Startup Blueprint (up to 20)
    if (competitors.length > 0 || mvpFeatures.length > 0) score += 10;
    if (hasStartupMode && startupThesis.trim()) score += 10;

    return Math.min(100, score);
  }, [
    title,
    description,
    whoFacesIt,
    whyFrustrating,
    dataPoints,
    evidenceUrls,
    evidenceDocuments,
    tam,
    wastedCost,
    citizensAffected,
    willingnessToPay,
    competitors,
    mvpFeatures,
    hasStartupMode,
    startupThesis,
  ]);

  // Modules metadata
  const MODULES = [
    { id: 1, label: "Narrative", subtitle: "Problem & Context", icon: FileText },
    { id: 2, label: "Evidence", subtitle: "Data & Citations", icon: BarChart3 },
    { id: 3, label: "Market", subtitle: "TAM & Waste", icon: DollarSign },
    { id: 4, label: "Rivals", subtitle: "Prior Workarounds", icon: Search },
    { id: 5, label: "Solution", subtitle: "MVP Requirements", icon: Code },
    { id: 6, label: "Venture", subtitle: "Startup Blueprint", icon: Rocket },
  ];

  // ── Form Submission Handler ─────────────────────────────────────────
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Please provide at least a Problem Title and Core Narrative Summary.");
      setActiveTab(1);
      return;
    }

    setSubmitting(true);
    setError(null);

    if (!isHumanVerified) {
      await executeRecaptcha("submit_problem");
      setIsHumanVerified(true);
    }

    const authorName = isAnonymous
      ? "Anonymous Scout"
      : customSubmitterName.trim() || userDoc?.name || user?.displayName || "Community Contributor";

    const effectiveIndustry = isCustomIndustry && customIndustry.trim() ? customIndustry.trim() : industry;

    try {
      const res = await createProblem({
        title: title.trim(),
        description: description.trim(),
        industry: effectiveIndustry,
        severity,
        location: location.trim() || "Global",
        submittedByUid: userDoc?.uid || user?.uid || "community",
        submittedByName: authorName,
        submitterUsername: isAnonymous ? undefined : userDoc?.username || undefined,
        whenItHappens: whenItHappens.trim(),
        whoFacesIt: whoFacesIt.trim(),
        whyFrustrating: whyFrustrating.trim(),
        frequency,
        currentSolution: currentSolution.trim(),
        audienceSize: audienceSize.trim(),
        willingnessToPay: willingnessToPay.trim(),
        estimatedValue: tam.trim(),
        psFrom: psFrom.length > 0 ? psFrom : ["Own Thinking"],
        psFromCustom: psFromCustom.trim(),
        marketData: {
          tam: tam.trim() || "$1.0B",
          currentPenetration,
          wastedCost: wastedCost.trim() || "$500M",
          citizensAffected: citizensAffected.trim() || "10M+",
        },
        evidenceDocuments,
        evidenceUrls,
        evidenceLinks: evidenceUrls,
        dataPoints,
        researchData: {
          keyFindings,
          methodology: researchMethodology.trim(),
          academicReferences,
        },
        competitorData: competitors,
        suggestedMVP: {
          coreFeatures: mvpFeatures,
          technicalRequirements: technicalRequirements.trim(),
          complianceStandards: startupComplianceStandards,
        },
        hasStartupMode,
        startupModeEnabled: hasStartupMode,
        startupModeConfig: {
          enabled: hasStartupMode,
          thesis: startupThesis.trim(),
          targetSegments: startupTargetSegments,
          avgWillingnessToPay: startupWillingnessToPay.trim(),
          valuePropositionDraft: startupValueProp.trim(),
          existingSolutionsGaps: startupSolutionsGaps,
          directionsToExplore: startupDirections.slice(0, 3),
          validationQuestions: startupValidationQuestions,
          discoveryInterviewPrompt: discoveryInterviewPrompt.trim(),
          complianceStandards: startupComplianceStandards,
        },
        aiScores: {
          suggestedAngles: suggestedAngles.filter(Boolean),
          keyRisks: keyRisks.filter(Boolean),
          aiConfidence: 96,
        } as any,
        status: isAdmin && adminDirectPublish ? "approved" : "pending",
      });

      if (res.success && res.problemId) {
        setSubmittedProblemId(res.problemId);
        setStoredInFirestore(!!res.storedInFirestore);
        setFirestoreNotice(res.firestoreError || null);
        recordUserSubmission(res.problemId, userDoc?.uid || user?.uid || "guest");
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {
          // ignore confetti errors
        }
      } else {
        setError("Failed to create problem statement. Please check required fields and try again.");
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      setError(err?.message || "An unexpected error occurred while saving the problem dossier.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success / Acknowledgement Screen ────────────────────────────────
  if (submittedProblemId) {
    return (
      <div className="w-full min-h-[85vh] bg-surface flex items-center justify-center py-16 px-4 font-['Poppins',sans-serif] text-on-surface animate-fade-in">
        <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl p-8 sm:p-10 shadow-2xl border border-outline-variant/30 flex flex-col items-center gap-6 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-700 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400 stroke-[2.2]" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-on-surface tracking-tight">Dossier Registered!</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
              Your problem statement has been encrypted, assigned ID <span className="font-mono font-bold text-primary">{submittedProblemId}</span>, and indexed.
            </p>
          </div>

          <div className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-on-surface-variant">Review Status</span>
              <span className="inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                {isAdmin && adminDirectPublish ? "Approved & Live" : "Pending Curator Review"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-outline-variant/20 pt-2.5">
              <span className="font-semibold text-on-surface-variant">Attribution</span>
              <span className="font-bold text-on-surface truncate max-w-[200px]">
                {isAnonymous ? "Anonymous Scout" : customSubmitterName || "Community Contributor"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-outline-variant/20 pt-2.5">
              <span className="font-semibold text-on-surface-variant">Live Public Dossier</span>
              <a
                href={getProblemDetailUrl(submittedProblemId, title)}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>View Dossier</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <a
              href={getProblemDetailUrl(submittedProblemId, title)}
              className="flex-1 bg-primary hover:bg-primary-container text-white py-3 px-5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Preview Live Page</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                setSubmittedProblemId(null);
                setActiveTab(1);
                setTitle("");
                setDescription("");
              }}
              className="flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/40 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-surface py-5 sm:py-8 md:py-10 px-3 sm:px-6 md:px-8 lg:px-10 font-['Poppins',sans-serif] text-on-surface">
      <SEOHead
        title="Problem Intelligence Studio — Submit Empirical Problem Dossiers"
        description="Submit empirical industry problem dossiers with market sizing, research papers, and startup blueprints to Stuckhere Open Registry."
        canonicalUrl="https://stuckhere.davns.com/submit"
        ogType="website"
      />

      {/* ── STUDIO COMMAND HEADER ────────────────────────────────────── */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-outline-variant/20 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-bold text-on-surface-variant">
            <Link to="/explore" className="hover:text-primary transition-colors">
              Registry
            </Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span className="text-primary font-bold">Dossier Studio</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-on-surface tracking-tight">
            Problem Intelligence Studio
          </h1>
          <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
            Structure high-conviction, evidence-backed problem dossiers. Quantify market pain, catalog failure modes of prior workarounds, and draft startup blueprints.
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={() => setIsBulkModalOpen(true)}
            className="group flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface text-xs font-bold shadow-2xs transition-all cursor-pointer"
            title="Import an entire spreadsheet or paste rows via RFC-4180 CSV engine"
          >
            <Upload className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span>Bulk Upload (CSV / Paste)</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileInspectorOpen(!mobileInspectorOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-xs font-bold text-on-surface"
          >
            <Eye className="w-3.5 h-3.5 text-secondary" />
            <span>{mobileInspectorOpen ? "Hide Inspector" : "Inspector"}</span>
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSubmit()}
            className="bg-primary hover:bg-primary-container text-white px-4 sm:px-5 py-2 rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{submitting ? "Publishing..." : "Submit Problem Dossier"}</span>
          </button>
        </div>
      </div>

      {/* ── TWO-COLUMN STUDIO WORKBENCH ARCHITECTURE ────────────────── */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ── LEFT: EDITORIAL WORKBENCH (7 cols) ─────────────────────── */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
          {/* Segmented Investigative Stepper */}
          <div className="w-full bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/20 flex items-center gap-1 overflow-x-auto no-scrollbar scrollbar-none shadow-2xs">
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              const isActive = activeTab === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveTab(mod.id)}
                  className={`flex-1 min-w-[95px] sm:min-w-0 py-2 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none ${
                    isActive
                      ? "bg-surface-container-lowest text-primary shadow-xs border border-outline-variant/30 font-extrabold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-primary" : "opacity-60"}`} />
                  <span className="truncate">{mod.label}</span>
                </button>
              );
            })}
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-error/10 border border-error/25 text-error text-xs flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Form Card Container */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            {/* ── MODULE 1: CORE NARRATIVE ────────────────────────────── */}
            {activeTab === 1 && (
              <div className="bg-surface-container-lowest p-5 sm:p-7 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-5 animate-fade-in">
                <div className="border-b border-outline-variant/20 pb-3">
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">
                    1. Core Narrative & Operational Context
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Define the core bottleneck in objective, falsifiable terms without pitching a solution prematurely.
                  </p>
                </div>

                {/* Problem Title */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-primary" />
                      <span>Problem Title</span>
                      <span className="text-error font-mono">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-on-surface-variant">{title.length}/140</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={140}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Rural Healthcare Clinics Cannot Share Patient Records Across EHR Silos"
                    className="w-full bg-surface-container-low rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-on-surface outline-none border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/60"
                  />
                </div>

                {/* Core Summary Description */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      <span>Objective Problem Description</span>
                      <span className="text-error font-mono">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-on-surface-variant">{description.length}/1200</span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    maxLength={1200}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what goes wrong, why current tools fail, and the quantifiable consequence of leaving this problem unsolved..."
                    className="w-full bg-surface-container-low rounded-xl p-3.5 text-xs sm:text-sm text-on-surface outline-none border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y placeholder:text-on-surface-variant/60 leading-relaxed"
                  />
                </div>

                {/* Industry & Severity Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-secondary" />
                      <span>Target Industry Sector</span>
                    </label>
                    {!isCustomIndustry ? (
                      <select
                        value={industry}
                        onChange={(e) => {
                          if (e.target.value === "__custom__") {
                            setIsCustomIndustry(true);
                          } else {
                            setIndustry(e.target.value);
                          }
                        }}
                        className="w-full bg-surface-container-low rounded-xl px-3.5 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30 focus:border-primary cursor-pointer"
                      >
                        {REAL_INDUSTRIES.map((ind) => (
                          <option key={ind.name} value={ind.name}>
                            {ind.name}
                          </option>
                        ))}
                        <option value="__custom__">+ Enter Custom Industry...</option>
                      </select>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={customIndustry}
                          onChange={(e) => setCustomIndustry(e.target.value)}
                          placeholder="e.g. Maritime Robotics"
                          className="w-full bg-surface-container-low rounded-xl px-3.5 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30 focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setIsCustomIndustry(false)}
                          className="px-2.5 py-2.5 rounded-xl bg-surface-container text-xs text-on-surface hover:bg-surface-container-high"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-secondary" />
                      <span>Severity & Operational Impact</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
                      {(["minor", "medium", "major", "critical"] as ProblemSeverity[]).map((sev) => {
                        const isSelected = severity === sev;
                        return (
                          <button
                            key={sev}
                            type="button"
                            onClick={() => setSeverity(sev)}
                            className={`py-1.5 text-[11px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                              isSelected
                                ? sev === "critical"
                                  ? "bg-rose-600 text-white shadow-2xs"
                                  : sev === "major"
                                  ? "bg-amber-600 text-white shadow-2xs"
                                  : "bg-primary text-white shadow-2xs"
                                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                            }`}
                          >
                            {sev}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Submitter Attribution & Geography */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-outline-variant/20">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-on-surface-variant" />
                      <span>Who Faces It</span>
                    </label>
                    <input
                      type="text"
                      value={whoFacesIt}
                      onChange={(e) => setWhoFacesIt(e.target.value)}
                      placeholder="e.g. Clinical IT Directors"
                      className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-on-surface-variant" />
                      <span>Frequency</span>
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30 cursor-pointer"
                    >
                      <option value="Hourly">Hourly / Continuous</option>
                      <option value="Daily">Daily Operational</option>
                      <option value="Weekly">Weekly Cycle</option>
                      <option value="Monthly">Monthly Closing</option>
                      <option value="Seasonal">Seasonal / Event-Driven</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-on-surface-variant" />
                      <span>Geography / Jurisdiction</span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Global or EU/US"
                      className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── MODULE 2: EVIDENCE & DATA POINTS ─────────────────────── */}
            {activeTab === 2 && (
              <div className="bg-surface-container-lowest p-5 sm:p-7 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-6 animate-fade-in">
                <div className="border-b border-outline-variant/20 pb-3">
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">
                    2. Empirical Evidence & Statistical Data Points
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Dossiers with quantified telemetry and verified citations receive significantly higher ranking and visibility.
                  </p>
                </div>

                {/* Key Numeric Metrics */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                    <span>Key Metrics & Statistical Proof</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={newMetric}
                      onChange={(e) => setNewMetric(e.target.value)}
                      placeholder="Metric value (e.g. 64% or $2.1M)"
                      className="w-full sm:w-1/3 bg-surface-container-low rounded-xl px-3.5 py-2 text-xs font-bold text-primary outline-none border border-outline-variant/30"
                    />
                    <input
                      type="text"
                      value={newMetricLabel}
                      onChange={(e) => setNewMetricLabel(e.target.value)}
                      placeholder="Context label (e.g. of clinic referrals require duplicate lab tests)"
                      className="w-full sm:w-2/3 bg-surface-container-low rounded-xl px-3.5 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newMetric.trim() && newMetricLabel.trim()) {
                          setDataPoints([...dataPoints, { metric: newMetric.trim(), label: newMetricLabel.trim() }]);
                          setNewMetric("");
                          setNewMetricLabel("");
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shrink-0 hover:bg-primary-container cursor-pointer transition-all flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Metric</span>
                    </button>
                  </div>

                  {dataPoints.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {dataPoints.map((dp, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <span className="font-mono font-extrabold text-primary text-sm block">{dp.metric}</span>
                            <span className="text-[11px] text-on-surface-variant truncate block">{dp.label}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDataPoints(dataPoints.filter((_, i) => i !== idx))}
                            className="p-1 hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-error transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Evidence URLs */}
                <div className="space-y-3 pt-3 border-t border-outline-variant/20">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-secondary" />
                    <span>Evidence Links, Audits & Regulatory Filings</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newEvidenceUrl}
                      onChange={(e) => setNewEvidenceUrl(e.target.value)}
                      placeholder="https://... (Report, industry whitepaper, audit PDF, or news investigation)"
                      className="flex-1 bg-surface-container-low rounded-xl px-3.5 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newEvidenceUrl.trim()) {
                          setEvidenceUrls([...evidenceUrls, newEvidenceUrl.trim()]);
                          setNewEvidenceUrl("");
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-bold text-on-surface shrink-0 cursor-pointer"
                    >
                      Add URL
                    </button>
                  </div>

                  {evidenceUrls.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {evidenceUrls.map((url, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs font-mono text-primary max-w-xs truncate"
                        >
                          <span className="truncate">{url}</span>
                          <button
                            type="button"
                            onClick={() => setEvidenceUrls(evidenceUrls.filter((_, idx) => idx !== i))}
                            className="text-on-surface-variant hover:text-error ml-1 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── MODULE 3: MARKET & IMPACT ────────────────────────────── */}
            {activeTab === 3 && (
              <div className="bg-surface-container-lowest p-5 sm:p-7 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-5 animate-fade-in">
                <div className="border-b border-outline-variant/20 pb-3">
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">
                    3. Market Telemetry & Economic Waste
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Estimate the aggregate addressable scale, friction costs, and economic incentives to solve this problem.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Total Addressable Market (TAM)</span>
                    </label>
                    <input
                      type="text"
                      value={tam}
                      onChange={(e) => setTam(e.target.value)}
                      placeholder="e.g. $4.8B"
                      className="w-full bg-surface-container-low rounded-xl px-3.5 py-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 outline-none border border-outline-variant/30 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Annual Economic Waste / Inefficiency</span>
                    </label>
                    <input
                      type="text"
                      value={wastedCost}
                      onChange={(e) => setWastedCost(e.target.value)}
                      placeholder="e.g. $1.2B per year"
                      className="w-full bg-surface-container-low rounded-xl px-3.5 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 outline-none border border-outline-variant/30 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      <span>Affected Scale (Users / Companies)</span>
                    </label>
                    <input
                      type="text"
                      value={citizensAffected}
                      onChange={(e) => setCitizensAffected(e.target.value)}
                      placeholder="e.g. 18,000 independent clinics"
                      className="w-full bg-surface-container-low rounded-xl px-3.5 py-2.5 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-secondary" />
                      <span>Target Buyer Willingness to Pay</span>
                    </label>
                    <input
                      type="text"
                      value={willingnessToPay}
                      onChange={(e) => setWillingnessToPay(e.target.value)}
                      placeholder="e.g. $450 - $1,200/mo per provider"
                      className="w-full bg-surface-container-low rounded-xl px-3.5 py-2.5 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── MODULE 4: RIVALS & PRIOR WORKAROUNDS ─────────────────── */}
            {activeTab === 4 && (
              <div className="bg-surface-container-lowest p-5 sm:p-7 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-5 animate-fade-in">
                <div className="border-b border-outline-variant/20 pb-3">
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">
                    4. Prior Workarounds & Competitor Flaws
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Why do incumbent solutions and DIY hacks fail? Documenting past failures is critical to avoid repeating them.
                  </p>
                </div>

                {/* Add Competitor */}
                <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20 space-y-3">
                  <span className="text-xs font-bold text-on-surface block">Add Existing Incumbent or Workaround</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={newCompName}
                      onChange={(e) => setNewCompName(e.target.value)}
                      placeholder="Incumbent name (e.g. Fax machines)"
                      className="bg-surface-container-lowest rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                    />
                    <input
                      type="text"
                      value={newCompPros}
                      onChange={(e) => setNewCompPros(e.target.value)}
                      placeholder="Why people still use it (Pros)"
                      className="bg-surface-container-lowest rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <input
                      type="text"
                      value={newCompCons}
                      onChange={(e) => setNewCompCons(e.target.value)}
                      placeholder="Why it breaks (Core Cons)"
                      className="bg-surface-container-lowest rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (newCompName.trim()) {
                        setCompetitors([
                          ...competitors,
                          { solution: newCompName.trim(), pros: newCompPros.trim(), cons: newCompCons.trim() },
                        ]);
                        setNewCompName("");
                        setNewCompPros("");
                        setNewCompCons("");
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all cursor-pointer"
                  >
                    + Add Workaround
                  </button>
                </div>

                {competitors.length > 0 && (
                  <div className="space-y-2">
                    {competitors.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-on-surface block">{c.solution}</span>
                          <span className="text-[11px] text-emerald-600 block">Pros: {c.pros || "None listed"}</span>
                          <span className="text-[11px] text-rose-600 block">Flaws: {c.cons || "Unspecified"}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCompetitors(competitors.filter((_, idx) => idx !== i))}
                          className="text-on-surface-variant hover:text-error p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── MODULE 5: MVP SPECS & REQUIREMENTS ──────────────────── */}
            {activeTab === 5 && (
              <div className="bg-surface-container-lowest p-5 sm:p-7 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-5 animate-fade-in">
                <div className="border-b border-outline-variant/20 pb-3">
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">
                    5. Minimum Viable Product (MVP) Blueprint
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    What are the essential, non-negotiable features required to deliver 80% of the relief with minimum engineering?
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-primary" />
                    <span>Core Feature Checklist</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMvpFeature}
                      onChange={(e) => setNewMvpFeature(e.target.value)}
                      placeholder="e.g. Automated HL7 / FHIR data parsing bridge"
                      className="flex-1 bg-surface-container-low rounded-xl px-3.5 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newMvpFeature.trim()) {
                          setMvpFeatures([...mvpFeatures, newMvpFeature.trim()]);
                          setNewMvpFeature("");
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all cursor-pointer"
                    >
                      Add Feature
                    </button>
                  </div>

                  {mvpFeatures.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {mvpFeatures.map((feat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-medium text-on-surface"
                        >
                          <Check className="w-3.5 h-3.5 text-primary" />
                          <span>{feat}</span>
                          <button
                            type="button"
                            onClick={() => setMvpFeatures(mvpFeatures.filter((_, idx) => idx !== i))}
                            className="text-on-surface-variant hover:text-error ml-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 pt-3 border-t border-outline-variant/20">
                  <label className="text-xs font-bold text-on-surface">Technical & Architecture Constraints</label>
                  <textarea
                    rows={3}
                    value={technicalRequirements}
                    onChange={(e) => setTechnicalRequirements(e.target.value)}
                    placeholder="e.g. Must run on-premise without cloud sync due to patient health data compliance. Latency < 200ms."
                    className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>
              </div>
            )}

            {/* ── MODULE 6: STARTUP MODE BLUEPRINT ────────────────────── */}
            {activeTab === 6 && (
              <div className="bg-surface-container-lowest p-5 sm:p-7 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-purple-600" />
                      <span>6. Startup Mode Venture Blueprint</span>
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      Attach commercial hypotheses, target customer personas, and venture spinout logic.
                    </p>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-on-surface bg-surface-container px-3 py-1.5 rounded-xl border border-outline-variant/30 select-none">
                    <input
                      type="checkbox"
                      checked={hasStartupMode}
                      onChange={(e) => setHasStartupMode(e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 accent-purple-600 cursor-pointer"
                    />
                    <span>Enable Startup Mode</span>
                  </label>
                </div>

                {hasStartupMode ? (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-on-surface">Venture Investment Thesis</label>
                      <textarea
                        rows={3}
                        value={startupThesis}
                        onChange={(e) => setStartupThesis(e.target.value)}
                        placeholder="Why does this problem represent a venture-scale opportunity? What structural market shift makes now the right time?"
                        className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-on-surface">Primary Buyer ICP Segment</label>
                        <input
                          type="text"
                          value={newSegment}
                          onChange={(e) => setNewSegment(e.target.value)}
                          placeholder="e.g. Regional Clinic Networks with 5-20 sites"
                          className="w-full bg-surface-container-low rounded-xl px-3.5 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-on-surface">Value Proposition One-Liner</label>
                        <input
                          type="text"
                          value={startupValueProp}
                          onChange={(e) => setStartupValueProp(e.target.value)}
                          placeholder="e.g. Cut referral transfer delays from 48h to 2 minutes"
                          className="w-full bg-surface-container-low rounded-xl px-3.5 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-surface-container-low border border-dashed border-outline-variant/40 text-center flex flex-col items-center gap-2">
                    <Rocket className="w-8 h-8 text-on-surface-variant/40" />
                    <h3 className="text-xs font-bold text-on-surface">Startup Mode Is Optional</h3>
                    <p className="text-[11px] text-on-surface-variant max-w-sm">
                      Enable Startup Mode above if you are investigating this problem as a commercial venture.
                    </p>
                    <button
                      type="button"
                      onClick={() => setHasStartupMode(true)}
                      className="mt-1 px-4 py-1.5 rounded-lg bg-purple-600/10 text-purple-600 text-xs font-bold hover:bg-purple-600/20 cursor-pointer"
                    >
                      Turn On Startup Blueprint
                    </button>
                  </div>
                )}

                {/* Admin Publishing Control */}
                {isAdmin && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="font-bold text-on-surface">Admin Publishing Bypass</span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-xs select-none">
                      <input
                        type="checkbox"
                        checked={adminDirectPublish}
                        onChange={(e) => setAdminDirectPublish(e.target.checked)}
                        className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                      />
                      <span>Publish Directly (Bypass Review)</span>
                    </label>
                  </div>
                )}

                {/* Human Verification */}
                <div className="pt-2">
                  <HumanVerification
                    action="submit_problem"
                    onVerify={() => {
                      setIsHumanVerified(true);
                      setError(null);
                    }}
                    onExpire={() => setIsHumanVerified(false)}
                    label="I verify this dossier represents empirical real-world evidence"
                  />
                </div>
              </div>
            )}

            {/* Bottom Stepper Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                disabled={activeTab === 1}
                onClick={() => setActiveTab(Math.max(1, activeTab - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container disabled:opacity-30 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Module</span>
              </button>

              {activeTab < 6 ? (
                <button
                  type="button"
                  onClick={() => setActiveTab(Math.min(6, activeTab + 1))}
                  className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-bold text-on-surface flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <span>Next: {MODULES[activeTab]?.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleSubmit()}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-4 h-4" />
                  <span>{submitting ? "Publishing..." : "Submit Problem Statement"}</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── RIGHT: LIVE DOSSIER INSPECTOR & RIGOR METER (5 cols, sticky) ── */}
        <div
          className={`lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-4 ${
            mobileInspectorOpen ? "block" : "hidden lg:block"
          }`}
        >
          {/* Rigor Meter Widget */}
          <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-on-surface">
                  Dossier Rigor Meter
                </span>
              </div>
              <span className="text-sm font-black font-mono text-primary">{rigorScore}/100</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  rigorScore >= 75
                    ? "bg-emerald-600"
                    : rigorScore >= 45
                    ? "bg-primary"
                    : "bg-amber-500"
                }`}
                style={{ width: `${rigorScore}%` }}
              />
            </div>

            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              {rigorScore >= 80 ? (
                <span className="text-emerald-600 font-semibold">
                  ✓ High-conviction dossier with quantified evidence and market validation.
                </span>
              ) : rigorScore >= 50 ? (
                <span>
                  Good foundation. Add <strong className="text-on-surface">telemetry metrics</strong> or <strong className="text-on-surface">incumbent flaws</strong> to unlock top ranking.
                </span>
              ) : (
                <span>
                  Draft stage. Complete the <strong className="text-on-surface">title</strong>, <strong className="text-on-surface">description</strong>, and <strong className="text-on-surface">who faces it</strong>.
                </span>
              )}
            </p>
          </div>

          {/* Live Preview Card */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-outline-variant/30 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-secondary" />
                <span>Live Public Preview</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase">
                {isCustomIndustry && customIndustry ? customIndustry : industry}
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <h3 className="text-sm font-black text-on-surface leading-snug line-clamp-2">
                {title.trim() || "Untitled Problem Dossier"}
              </h3>
              <p className="text-[11px] text-on-surface-variant line-clamp-3 leading-relaxed">
                {description.trim() || "Enter an objective problem summary on the left to see the live dossier formatted here..."}
              </p>
            </div>

            {/* Metrics pills if present */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-outline-variant/15 text-[11px]">
              <div className="p-2 rounded-xl bg-surface-container-low">
                <span className="text-[10px] text-on-surface-variant block">Target TAM</span>
                <span className="font-mono font-bold text-emerald-600">{tam || "Not estimated"}</span>
              </div>
              <div className="p-2 rounded-xl bg-surface-container-low">
                <span className="text-[10px] text-on-surface-variant block">Severity</span>
                <span className="font-bold capitalize text-on-surface">{severity}</span>
              </div>
            </div>

            {/* Attribution footer */}
            <div className="flex items-center justify-between pt-2 text-[10px] text-on-surface-variant border-t border-outline-variant/20">
              <span>Author: {isAnonymous ? "Anonymous Scout" : customSubmitterName || "Community"}</span>
              <span>{location || "Global"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BULK PROBLEM IMPORT MODAL (CSV & PASTE) ─────────────────── */}
      <BulkProblemImportModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        isAdmin={isAdmin}
      />
    </div>
  );
};
