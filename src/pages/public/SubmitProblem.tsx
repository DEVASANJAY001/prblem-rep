import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { createProblem } from "@/lib/firebase/services/problemsService";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { EvidenceDocument, ProblemSeverity } from "@/types";
import confetti from "canvas-confetti";
import { UserAvatar } from "@/components/ui/UserAvatar";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Building2,
  Users,
  DollarSign,
  ShieldCheck,
  Search,
  TrendingUp,
  Sparkles,
  Plus,
  X,
  ExternalLink,
  Rocket,
  Code,
  Zap,
  Globe,
  Layers,
  BarChart3,
  Lightbulb,
  Check,
  AlertCircle,
  Clock,
  Briefcase,
  HelpCircle,
  Eye,
  Sliders,
  Flame,
  FileCheck2,
  RotateCcw,
} from "lucide-react";

export const SubmitProblem: React.FC = () => {
  const navigate = useNavigate();
  const { user, userDoc } = useAuth();

  const [activeTab, setActiveTab] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedProblemId, setSubmittedProblemId] = useState<string | null>(null);

  // ── Tab 1: Core Overview & Operational Narrative ─────────────────────────
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("Healthcare & Biotech");
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
  const [customSubmitterName, setCustomSubmitterName] = useState("");
  const [submitterRole, setSubmitterRole] = useState("");

  // ── Tab 2: Evidence & Statistical Data Points ─────────────────────────────
  const [dataPoints, setDataPoints] = useState<Array<{ metric: string; label: string }>>([]);
  const [newMetric, setNewMetric] = useState("");
  const [newMetricLabel, setNewMetricLabel] = useState("");

  const [evidenceDocuments, setEvidenceDocuments] = useState<EvidenceDocument[]>([]);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocDesc, setNewDocDesc] = useState("");
  const [newDocUrl, setNewDocUrl] = useState("");
  const [newDocSize, setNewDocSize] = useState("1.8 MB");
  const [newDocPages, setNewDocPages] = useState("8 pages");

  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [newEvidenceUrl, setNewEvidenceUrl] = useState("");

  // ── Tab 3: Market Telemetry & Impact ──────────────────────────────────────
  const [tam, setTam] = useState("");
  const [currentPenetration, setCurrentPenetration] = useState(0);
  const [wastedCost, setWastedCost] = useState("");
  const [citizensAffected, setCitizensAffected] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [willingnessToPay, setWillingnessToPay] = useState("");

  // ── Tab 4: Research & Competitors ─────────────────────────────────────────
  const [keyFindings, setKeyFindings] = useState<string[]>([]);
  const [newFinding, setNewFinding] = useState("");

  const [researchMethodology, setResearchMethodology] = useState("");

  const [academicReferences, setAcademicReferences] = useState<string[]>([]);
  const [newRef, setNewRef] = useState("");

  const [competitors, setCompetitors] = useState<Array<{ solution: string; pros: string; cons: string }>>([]);
  const [newCompName, setNewCompName] = useState("");
  const [newCompPros, setNewCompPros] = useState("");
  const [newCompCons, setNewCompCons] = useState("");

  // ── Tab 5: Suggested MVP & Tech Specs ─────────────────────────────────────
  const [mvpFeatures, setMvpFeatures] = useState<string[]>([]);
  const [newMvpFeature, setNewMvpFeature] = useState("");

  const [technicalRequirements, setTechnicalRequirements] = useState("");

  // ── Tab 6: Startup Mode & Venture Blueprint ───────────────────────────────
  const [hasStartupMode, setHasStartupMode] = useState(false);
  const [startupTargetSegments, setStartupTargetSegments] = useState<string[]>([]);
  const [newSegment, setNewSegment] = useState("");
  const [startupWillingnessToPay, setStartupWillingnessToPay] = useState("");
  const [startupValueProp, setStartupValueProp] = useState("");
  const [startupSolutionsGaps, setStartupSolutionsGaps] = useState<
    Array<{ name: string; description: string; weaknessType: "Weakness" | "Gap"; weakness: string }>
  >([]);
  const [newGapName, setNewGapName] = useState("");
  const [newGapDesc, setNewGapDesc] = useState("");
  const [newGapWeakness, setNewGapWeakness] = useState("");
  const [newGapType, setNewGapType] = useState<"Weakness" | "Gap">("Weakness");

  const [startupDirections, setStartupDirections] = useState<
    Array<{ type: string; title: string; description: string }>
  >([]);
  const [newDirType, setNewDirType] = useState("Direction 1");
  const [newDirTitle, setNewDirTitle] = useState("");
  const [newDirDesc, setNewDirDesc] = useState("");



  // Load Example Template
  const loadExampleTemplate = () => {
    setTitle("Data Interoperability Failure in Rural Clinics");
    setDescription("Rural healthcare providers lack a unified system to access patient records across different local specialists, causing delayed treatments and duplicate lab tests.");
    setIndustry("Healthcare & Life Sciences");
    setSeverity("critical");
    setLocation("Rural United States");
    setWhenItHappens("During patient intake, emergency transfers, and multi-specialty referrals when records must cross independent EHR vendor silos.");
    setWhoFacesIt("Rural clinic administrators, primary care physicians, regional specialists, and ER triage teams.");
    setWhyFrustrating("Staff must spend hours manually tracking down, printing, and scanning faxed documents, which frequently contain unreadable handwriting or missing pages.");
    setFrequency("Daily");
    setCurrentSolution("Legacy thermal fax machines, paper courier delivery, and phone calls between medical records clerks.");
    
    setDataPoints([
      { metric: "64%", label: "Rural clinics still relying on manual fax transfers daily" },
      { metric: "4.2 hrs", label: "Average clinical record latency per transferred patient" },
    ]);
    setEvidenceDocuments([
      {
        title: "CMS Interoperability Standards & Policy Guidelines",
        description: "Official empirical survey and benchmark dataset detailing technical and logistical friction across 4,500+ rural clinics.",
        size: "2.4 MB",
        pages: "12 pages",
        url: "https://www.healthit.gov",
        type: "pdf",
      },
    ]);
    setEvidenceUrls([
      "https://www.ruralhealthinfo.org/research/ehr-interoperability-barriers",
      "https://www.healthit.gov/topic/interoperability/fhir-api-mandates",
    ]);

    setTam("$4.2B");
    setCurrentPenetration(35);
    setWastedCost("$1.5B");
    setCitizensAffected("46 million");
    setAudienceSize("4,500+ clinics & 28,000 specialists");
    setWillingnessToPay("$150/mo per practitioner");

    setKeyFindings([
      "Current legacy EHRs charge proprietary licensing fees for FHIR export endpoints.",
      "Rural clinical staff experience 22% burnout attributed solely to missing record fax tracking.",
    ]);
    setResearchMethodology("Multi-center field survey conducted with 120 rural clinic operations directors, cross-referenced with CMS ONC audit logs.");
    setAcademicReferences([
      '"The Digital Divide in Healthcare Information Exchange", Journal of Rural Health (2023).',
      '"Evaluating the Impact of Information Blocking Directives", Health Affairs (2024).',
    ]);
    setCompetitors([
      {
        solution: "Epic Care Everywhere",
        pros: "Seamless real-time synchronization if both healthcare networks are on modern Epic infrastructure.",
        cons: "Prohibitively expensive setup costs for independent community practices, zero offline resilience.",
      },
      {
        solution: "Legacy Thermal Fax (Status Quo)",
        pros: "Universal adoption across 99% of rural facilities without requiring modern IT infrastructure.",
        cons: "Zero structured parsing, manual re-entry required, massive HIPAA audit exposure and high delay.",
      },
    ]);

    setMvpFeatures([
      "Universal bidirectional FHIR API translator bridge with automated HL7 v2 parser.",
      "Offline-first encrypted SQLite record cache for unstable rural broadband connectivity.",
      "Lightweight web triage portal for specialist referrals without requiring proprietary EHR installations.",
    ]);
    setTechnicalRequirements("SOC2 Type II compliance, HIPAA BAA readiness, robust integration with national HIE networks (Carequality, CommonWell), under 200ms parse latency.");

    setHasStartupMode(true);
    setStartupTargetSegments([
      "Rural Clinic Admins",
      "Local Specialists",
      "EMS Providers",
      "Independent Pharmacists",
    ]);
    setStartupWillingnessToPay("$150/mo per practitioner");
    setStartupValueProp("A lightweight PDF parser and FHIR bridge that categorizes incoming faxes and maps them to EHR endpoints without costly vendor lock-in.");
    setStartupSolutionsGaps([
      {
        name: "Epic Care Everywhere",
        description: "Comprehensive EHR network for large health systems.",
        weaknessType: "Weakness",
        weakness: "Prohibitive $50k+ implementation cost for small regional clinics.",
      },
      {
        name: "Direct Secure Messaging",
        description: "Encrypted email for clinical data.",
        weaknessType: "Gap",
        weakness: "Unstructured PDFs still require manual clinical data transcription.",
      },
    ]);
    setStartupDirections([
      {
        type: "Direction 1: AI Automation",
        title: "Automated Fax-to-FHIR Pipeline",
        description: "Build an AI vision pipeline that ingests fax PDFs, parses clinical tables, and writes directly into local EHR schemas.",
      },
      {
        type: "Direction 2: Offline First",
        title: "Edge-Device Sync Appliance",
        description: "Hardware micro-appliance deployed on-premise in rural clinics with satellite internet caching.",
      },
    ]);
  };

  // ── Form Submission Handler ───────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Please provide at least a Problem Title and Core Issue Summary.");
      setActiveTab(1);
      return;
    }

    setSubmitting(true);
    setError(null);

    const authorName = isAnonymous
      ? "Anonymous Scout"
      : customSubmitterName.trim() || userDoc?.name || user?.displayName || "Practitioner Submitter";

    const effectiveIndustry = isCustomIndustry && customIndustry.trim() ? customIndustry.trim() : industry;

    try {
      const res = await createProblem({
        title: title.trim(),
        description: description.trim(),
        industry: effectiveIndustry,
        severity,
        location: location.trim() || "Global",
        submittedByUid: userDoc?.uid || user?.uid || "member",
        submittedByName: authorName,
        whenItHappens: whenItHappens.trim(),
        whoFacesIt: whoFacesIt.trim(),
        whyFrustrating: whyFrustrating.trim(),
        frequency,
        currentSolution: currentSolution.trim(),
        audienceSize: audienceSize.trim(),
        willingnessToPay: willingnessToPay.trim(),
        estimatedValue: tam.trim(),
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
        },
        hasStartupMode,
        startupModeEnabled: hasStartupMode,
        startupModeConfig: {
          enabled: hasStartupMode,
          targetSegments: startupTargetSegments,
          avgWillingnessToPay: startupWillingnessToPay.trim(),
          valuePropositionDraft: startupValueProp.trim(),
          existingSolutionsGaps: startupSolutionsGaps,
          directionsToExplore: startupDirections,
        },
      });

      if (res.success && res.problemId) {
        setSubmittedProblemId(res.problemId);
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore canvas confetti errors
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

  // ── Success State Modal / Overlay ─────────────────────────────────────────
  if (submittedProblemId) {
    return (
      <div className="w-full min-h-screen bg-surface py-16 px-4 md:px-8 font-['Poppins',sans-serif] text-on-surface flex items-center justify-center animate-fade-in">
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-xl border border-outline-variant/30 text-center flex flex-col items-center gap-6">
          <div className="w-18 h-18 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full self-center">
              Dossier Live in Community Index
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-on-surface">
              Problem Statement Published!
            </h2>
            <p className="text-sm text-on-surface-variant max-w-lg mx-auto">
              Your empirical problem dossier has been scored by the AI Engine and recorded. Practitioners and founders can now validate and build solutions.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-surface-container/40 rounded-2xl border border-outline-variant/20 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-outline">Pain Score</span>
              <p className="text-lg font-black text-orange-600">{severity === "critical" ? "9.4" : severity === "major" ? "8.6" : "7.2"}/10</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-outline">Opportunity</span>
              <p className="text-lg font-black text-emerald-600">8.0/10</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-bold text-outline">Market TAM</span>
              <p className="text-lg font-black text-primary">{tam || "$1.0B"}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
            <button
              onClick={() => navigate(`/problem/${submittedProblemId}`)}
              className="w-full sm:flex-1 bg-primary text-white py-3.5 px-6 rounded-xl text-xs md:text-sm font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Published Problem</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {hasStartupMode && (
              <button
                onClick={() => navigate(`/startup-mode/${submittedProblemId}`)}
                className="w-full sm:flex-1 bg-surface hover:bg-primary/5 text-primary border border-primary py-3.5 px-6 rounded-xl text-xs md:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Launch Startup Mode</span>
                <Rocket className="w-4 h-4 text-primary" />
              </button>
            )}
          </div>

          <button
            onClick={() => {
              setSubmittedProblemId(null);
              setActiveTab(1);
              setTitle("");
              setDescription("");
            }}
            className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer mt-2"
          >
            + Submit Another Problem Statement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-surface py-8 md:py-10 px-4 md:px-8 lg:px-12 font-['Poppins',sans-serif] text-on-surface">
      {/* ── TOP HERO HEADER & BREADCRUMBS ─────────────────────────────────── */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200/60 mb-8">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
            <Link to="/explore" className="hover:text-primary transition-colors">
              Explore
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-primary font-bold">Submit Problem Statement</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-on-surface tracking-tight">
            Problem Intelligence Studio
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant max-w-3xl">
            Draft and structure an empirical, evidence-backed problem dossier with market sizing, research citations, and startup venture blueprints.
          </p>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={loadExampleTemplate}
            className="px-4 py-2.5 rounded-xl bg-surface-container/60 hover:bg-surface-container text-on-surface-variant hover:text-on-surface text-xs font-bold border border-outline-variant/30 flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
            title="Pre-fill form with real verified Healthcare Interoperability problem"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Load Example Template</span>
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <span>Publish Problem</span>
                <Rocket className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── MAIN FULL-PAGE STUDIO ───────────────────────────────── */}
      <div className="w-full flex flex-col gap-6">
        {/* Section Navigation Tab Bar */}
        <div className="w-full bg-surface-container-lowest p-1.5 rounded-2xl border border-outline-variant/30 shadow-2xs flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 1, label: "1. Core Narrative", icon: FileText },
            { id: 2, label: "2. Evidence & Data", icon: BarChart3 },
            { id: 3, label: "3. Market & Impact", icon: DollarSign },
            { id: 4, label: "4. Research & Rivals", icon: Search },
            { id: 5, label: "5. MVP Specs", icon: Code },
            { id: 6, label: "6. Startup Mode", icon: Rocket },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50"
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? "text-white" : "text-gray-400"}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            {/* ── TAB 1: CORE PROBLEM & OPERATIONAL NARRATIVE ───────────────── */}
            {activeTab === 1 && (
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Module 1
                  </span>
                  <h2 className="text-xl font-bold text-on-surface">
                    Problem Overview & Operational Context
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Define the core bottleneck, who experiences the friction, and what happens during day-to-day operations.
                  </p>
                </div>

                {/* Problem Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                    <span>Problem Statement Title <span className="text-error">*</span></span>
                    <span className="text-[10px] text-outline font-normal">Clear, specific, and domain-focused</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Data Interoperability Failure in Rural Community Clinics"
                    className="w-full bg-surface-container/40 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/30"
                  />
                </div>

                {/* Core Issue Summary */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                    <span>Core Issue & High-Level Pitch <span className="text-error">*</span></span>
                    <span className="text-[10px] text-outline font-normal">2-3 sentences explaining the root conflict</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Rural healthcare providers lack a unified system to access patient records across different local specialists, causing treatment latency and medical errors..."
                    className="w-full bg-surface-container/40 rounded-xl p-3.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/30 font-normal leading-relaxed"
                  />
                </div>

                {/* Industry & Severity Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-on-surface">Target Industry</label>
                      <button
                        type="button"
                        onClick={() => setIsCustomIndustry(!isCustomIndustry)}
                        className="text-[10px] text-primary font-bold hover:underline cursor-pointer"
                      >
                        {isCustomIndustry ? "Choose from list" : "+ Enter Custom Industry"}
                      </button>
                    </div>
                    {isCustomIndustry ? (
                      <input
                        type="text"
                        value={customIndustry}
                        onChange={(e) => setCustomIndustry(e.target.value)}
                        placeholder="e.g. Quantum Cryptography, Ocean Cleanup..."
                        className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                      />
                    ) : (
                      <select
                        value={industry}
                        onChange={(e) => {
                          if (e.target.value === "__custom__") {
                            setIsCustomIndustry(true);
                          } else {
                            setIndustry(e.target.value);
                          }
                        }}
                        className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30 cursor-pointer"
                      >
                        {REAL_INDUSTRIES.map((ind) => {
                          const name = typeof ind === "string" ? ind : ind.name;
                          return (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          );
                        })}
                        <option value="__custom__">+ Other / Custom Industry...</option>
                      </select>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Geographic Scope / Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Rural United States, Global, EMEA"
                      className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>

                {/* Problem Severity Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface">Severity & Operational Impact Level</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(["minor", "medium", "major", "critical"] as ProblemSeverity[]).map((sev) => (
                      <button
                        key={sev}
                        type="button"
                        onClick={() => setSeverity(sev)}
                        className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer capitalize text-xs font-bold ${
                          severity === sev
                            ? sev === "critical"
                              ? "bg-rose-50 border-rose-500 text-rose-700 dark:bg-rose-950/40"
                              : sev === "major"
                              ? "bg-orange-50 border-orange-500 text-orange-700 dark:bg-orange-950/40"
                              : "bg-primary/10 border-primary text-primary"
                            : "bg-surface-container/20 border-outline-variant/30 text-on-surface-variant hover:bg-surface-container/50"
                        }`}
                      >
                        <span>{sev}</span>
                        <span className="text-[10px] font-normal opacity-80">
                          {sev === "critical" ? "Life/Mission threat" : sev === "major" ? "High economic cost" : sev === "medium" ? "Moderate delay" : "Minor nuisance"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5-Questions Operational Narrative Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-200/60">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">When It Happens (Trigger)</label>
                    <textarea
                      rows={2}
                      value={whenItHappens}
                      onChange={(e) => setWhenItHappens(e.target.value)}
                      placeholder="During patient triage, emergency transfers, and multi-specialist referrals..."
                      className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Who Faces It (Stakeholders)</label>
                    <textarea
                      rows={2}
                      value={whoFacesIt}
                      onChange={(e) => setWhoFacesIt(e.target.value)}
                      placeholder="Rural clinic administrators, triage doctors, regional specialists, patients..."
                      className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Why It's Frustrating (Friction)</label>
                    <textarea
                      rows={2}
                      value={whyFrustrating}
                      onChange={(e) => setWhyFrustrating(e.target.value)}
                      placeholder="Manual fax re-entry wastes 4+ hours per transfer, leading to duplicate testing..."
                      className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Current Workarounds (Status Quo)</label>
                    <textarea
                      rows={2}
                      value={currentSolution}
                      onChange={(e) => setCurrentSolution(e.target.value)}
                      placeholder="Legacy thermal fax machines, paper courier delivery, unencrypted email PDFs..."
                      className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>

                {/* Submitter Attribution & Privacy */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-on-surface">Submitter Attribution & Privacy</h4>
                      <p className="text-[11px] text-on-surface-variant">Choose how your name and verified status appear on this problem statement.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(!isAnonymous)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer self-start sm:self-auto ${
                        isAnonymous
                          ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40"
                          : "bg-primary/10 text-primary border-primary/20"
                      }`}
                    >
                      {isAnonymous ? "Anonymous Scout Mode" : "Public Practitioner Attribution"}
                    </button>
                  </div>

                  {!isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-on-surface">Display Name</label>
                        <input
                          type="text"
                          value={customSubmitterName}
                          onChange={(e) => setCustomSubmitterName(e.target.value)}
                          placeholder={userDoc?.name || user?.displayName || "Your Name"}
                          className="w-full bg-surface-container/40 rounded-xl px-3.5 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-on-surface">Professional Role / Title</label>
                        <input
                          type="text"
                          value={submitterRole}
                          onChange={(e) => setSubmitterRole(e.target.value)}
                          placeholder="e.g. Clinical Director, Systems Engineer"
                          className="w-full bg-surface-container/40 rounded-xl px-3.5 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(2)}
                    className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Evidence & Data</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 2: EVIDENCE & STATISTICAL DATA POINTS ─────────────────── */}
            {activeTab === 2 && (
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Module 2
                  </span>
                  <h2 className="text-xl font-bold text-on-surface">
                    Key Statistical Data Points & Evidence
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Back your problem statement with empirical numbers, whitepapers, benchmarks, and external links.
                  </p>
                </div>

                {/* Key Statistical Data Points Builder */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                    <span>Key Statistical Data Points</span>
                    <span className="text-[10px] text-outline font-normal">Highlighted metrics displayed on problem dossier</span>
                  </label>

                  {dataPoints.length === 0 ? (
                    <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                      No statistical data points added yet. Use the inputs below to add empirical metrics.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dataPoints.map((dp, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl border border-outline-variant/30 bg-surface flex items-center justify-between gap-3 shadow-2xs"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-black text-primary font-mono shrink-0">
                              {dp.metric}
                            </span>
                            <span className="text-xs text-on-surface font-medium leading-snug">
                              {dp.label}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDataPoints(dataPoints.filter((_, i) => i !== idx))}
                            className="text-gray-400 hover:text-error transition-colors p-1 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Stat Input */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-1">
                    <input
                      type="text"
                      value={newMetric}
                      onChange={(e) => setNewMetric(e.target.value)}
                      placeholder="Metric (e.g. 64% or 4.2 hrs)"
                      className="w-full sm:w-1/3 bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                    />
                    <input
                      type="text"
                      value={newMetricLabel}
                      onChange={(e) => setNewMetricLabel(e.target.value)}
                      placeholder="Label (e.g. Clinics using fax daily)"
                      className="w-full sm:flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
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
                      className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Metric</span>
                    </button>
                  </div>
                </div>

                {/* Supporting Documents Builder */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200/60">
                  <label className="text-xs font-bold text-on-surface">Supporting Documents & Policy PDFs</label>
                  {evidenceDocuments.length === 0 ? (
                    <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                      No documents attached yet. Add whitepapers, reports or datasets below.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {evidenceDocuments.map((doc, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-outline-variant/30 bg-surface flex items-start justify-between gap-3 shadow-2xs"
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-on-surface truncate">{doc.title}</span>
                              <span className="text-[11px] text-on-surface-variant line-clamp-1">{doc.description}</span>
                              <div className="flex items-center gap-2 text-[10px] text-outline mt-1 font-mono">
                                <span>{doc.size || "1.5 MB"}</span>
                                <span>·</span>
                                <span>{doc.pages || "8 pages"}</span>
                                <span>·</span>
                                <span className="text-primary truncate">{doc.url}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEvidenceDocuments(evidenceDocuments.filter((_, i) => i !== idx))}
                            className="text-gray-400 hover:text-error transition-colors p-1 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Document inputs */}
                  <div className="p-3.5 rounded-2xl bg-surface-container/20 border border-dashed border-gray-300 flex flex-col gap-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={newDocTitle}
                        onChange={(e) => setNewDocTitle(e.target.value)}
                        placeholder="Document Title (e.g. CMS Rule 91-A Report)"
                        className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                      />
                      <input
                        type="text"
                        value={newDocUrl}
                        onChange={(e) => setNewDocUrl(e.target.value)}
                        placeholder="Download / Reference URL"
                        className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                      />
                    </div>
                    <input
                      type="text"
                      value={newDocDesc}
                      onChange={(e) => setNewDocDesc(e.target.value)}
                      placeholder="Short summary of dataset or research content"
                      className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newDocSize}
                          onChange={(e) => setNewDocSize(e.target.value)}
                          placeholder="Size (e.g. 2.4 MB)"
                          className="w-24 bg-surface-container/40 rounded-xl px-2.5 py-1.5 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                        <input
                          type="text"
                          value={newDocPages}
                          onChange={(e) => setNewDocPages(e.target.value)}
                          placeholder="Pages"
                          className="w-24 bg-surface-container/40 rounded-xl px-2.5 py-1.5 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (newDocTitle.trim()) {
                            setEvidenceDocuments([
                              ...evidenceDocuments,
                              {
                                title: newDocTitle.trim(),
                                description: newDocDesc.trim() || "Official benchmark dataset and research report.",
                                url: newDocUrl.trim() || "https://example.com",
                                size: newDocSize.trim() || "1.5 MB",
                                pages: newDocPages.trim() || "8 pages",
                                type: "pdf",
                              },
                            ]);
                            setNewDocTitle("");
                            setNewDocDesc("");
                            setNewDocUrl("");
                          }
                        }}
                        className="bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-primary-container cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Document</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* External Links */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-gray-200/60">
                  <label className="text-xs font-bold text-on-surface">External Evidence Links</label>
                  <div className="flex flex-wrap gap-2">
                    {evidenceUrls.map((url, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-surface-container/40 border border-outline-variant/30 text-xs font-medium text-primary flex items-center gap-2"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="max-w-[200px] truncate">{url}</span>
                        <button
                          type="button"
                          onClick={() => setEvidenceUrls(evidenceUrls.filter((_, i) => i !== idx))}
                          className="text-gray-400 hover:text-error cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newEvidenceUrl}
                      onChange={(e) => setNewEvidenceUrl(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newEvidenceUrl.trim()) {
                          setEvidenceUrls([...evidenceUrls, newEvidenceUrl.trim()]);
                          setNewEvidenceUrl("");
                        }
                      }}
                      className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(1)}
                    className="text-on-surface-variant text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-surface-container cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(3)}
                    className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Market & Impact</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 3: MARKET TELEMETRY & FINANCIAL IMPACT ─────────────────── */}
            {activeTab === 3 && (
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Module 3
                  </span>
                  <h2 className="text-xl font-bold text-on-surface">
                    Market Telemetry & Financial Impact
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Estimate market TAM, penetration hurdles, economic waste, and willingness to pay.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Total Addressable Market (TAM)</label>
                    <input
                      type="text"
                      value={tam}
                      onChange={(e) => setTam(e.target.value)}
                      placeholder="e.g. $4.2B"
                      className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-bold text-primary outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Annual Economic Waste</label>
                    <input
                      type="text"
                      value={wastedCost}
                      onChange={(e) => setWastedCost(e.target.value)}
                      placeholder="e.g. $1.5B"
                      className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-bold text-orange-600 outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Citizens / Users Affected</label>
                    <input
                      type="text"
                      value={citizensAffected}
                      onChange={(e) => setCitizensAffected(e.target.value)}
                      placeholder="e.g. 46 million patients"
                      className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Audience / Organization Count</label>
                    <input
                      type="text"
                      value={audienceSize}
                      onChange={(e) => setAudienceSize(e.target.value)}
                      placeholder="e.g. 4,500+ community practices"
                      className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>

                {/* Penetration Slider */}
                <div className="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container/30 border border-outline-variant/20">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-on-surface">Estimated Market Penetration</span>
                    <span className="text-primary font-mono">{currentPenetration}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={currentPenetration}
                    onChange={(e) => setCurrentPenetration(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer h-2 bg-surface-container rounded-lg"
                  />
                  <span className="text-[10px] text-on-surface-variant font-normal">
                    Indicates how much of the target market currently uses existing solutions vs unserved gap.
                  </span>
                </div>

                {/* Willingness to Pay */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Estimated Willingness to Pay</label>
                  <input
                    type="text"
                    value={willingnessToPay}
                    onChange={(e) => setWillingnessToPay(e.target.value)}
                    placeholder="e.g. $150/mo per practitioner or $5,000/yr per clinic"
                    className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(2)}
                    className="text-on-surface-variant text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-surface-container cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(4)}
                    className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Research & Competitors</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 4: RESEARCH & COMPETITOR MATRIX ────────────────────────── */}
            {activeTab === 4 && (
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Module 4
                  </span>
                  <h2 className="text-xl font-bold text-on-surface">
                    Research Methodology & Competitor Matrix
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Detail academic findings and evaluate why current commercial competitors fail.
                  </p>
                </div>

                {/* Key Findings Builder */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-bold text-on-surface">Key Research Findings (Bullet Points)</label>
                  {keyFindings.length === 0 ? (
                    <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                      No key research findings added yet. Add empirical insights below.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {keyFindings.map((finding, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-surface border border-outline-variant/30 flex items-start justify-between gap-2 shadow-2xs"
                        >
                          <div className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span className="text-xs text-on-surface">{finding}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setKeyFindings(keyFindings.filter((_, i) => i !== idx))}
                            className="text-gray-400 hover:text-error p-0.5 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFinding}
                      onChange={(e) => setNewFinding(e.target.value)}
                      placeholder="Add key empirical insight..."
                      className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFinding.trim()) {
                          setKeyFindings([...keyFindings, newFinding.trim()]);
                          setNewFinding("");
                        }
                      }}
                      className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                    >
                      Add Finding
                    </button>
                  </div>
                </div>

                {/* Research Methodology */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <label className="text-xs font-bold text-on-surface">Research Methodology & Sampling</label>
                  <textarea
                    rows={2}
                    value={researchMethodology}
                    onChange={(e) => setResearchMethodology(e.target.value)}
                    placeholder="How was this data collected and cross-verified?..."
                    className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>

                {/* Competitors Matrix Builder */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200/60">
                  <label className="text-xs font-bold text-on-surface">Existing Solutions & Competitor Gaps</label>
                  {competitors.length === 0 ? (
                    <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                      No competitors added yet. Add incumbent or alternative solutions below.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {competitors.map((comp, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-surface border border-outline-variant/30 shadow-2xs flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-on-surface">{comp.solution}</span>
                            <button
                              type="button"
                              onClick={() => setCompetitors(competitors.filter((_, i) => i !== idx))}
                              className="text-gray-400 hover:text-error cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex flex-col gap-1 text-[11px]">
                            <p className="text-emerald-600 font-medium leading-relaxed">
                              <span className="font-bold">Pros:</span> {comp.pros}
                            </p>
                            <p className="text-rose-600 font-medium leading-relaxed">
                              <span className="font-bold">Cons:</span> {comp.cons}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Competitor */}
                  <div className="p-3.5 rounded-2xl bg-surface-container/20 border border-dashed border-gray-300 flex flex-col gap-2.5">
                    <input
                      type="text"
                      value={newCompName}
                      onChange={(e) => setNewCompName(e.target.value)}
                      placeholder="Incumbent / Competitor Name (e.g. Epic Care Everywhere)"
                      className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={newCompPros}
                        onChange={(e) => setNewCompPros(e.target.value)}
                        placeholder="Key Advantage / Pros"
                        className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                      />
                      <input
                        type="text"
                        value={newCompCons}
                        onChange={(e) => setNewCompCons(e.target.value)}
                        placeholder="Critical Flaw / Cons"
                        className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (newCompName.trim()) {
                          setCompetitors([
                            ...competitors,
                            {
                              solution: newCompName.trim(),
                              pros: newCompPros.trim() || "Standard incumbent market presence.",
                              cons: newCompCons.trim() || "High friction and cost.",
                            },
                          ]);
                          setNewCompName("");
                          setNewCompPros("");
                          setNewCompCons("");
                        }
                      }}
                      className="self-end bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-primary-container cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Competitor</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(3)}
                    className="text-on-surface-variant text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-surface-container cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(5)}
                    className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to MVP Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 5: SUGGESTED MVP & TECHNICAL SPECS ─────────────────────── */}
            {activeTab === 5 && (
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Module 5
                  </span>
                  <h2 className="text-xl font-bold text-on-surface">
                    Suggested MVP Scope & Technical Architecture
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Outline the minimal viable solution features and necessary security/compliance constraints.
                  </p>
                </div>

                {/* MVP Features Builder */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-bold text-on-surface">Core MVP Feature Requirements</label>
                  {mvpFeatures.length === 0 ? (
                    <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                      No core MVP features added yet. Add key technical capabilities below.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {mvpFeatures.map((feat, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-surface border border-outline-variant/30 flex items-start justify-between gap-2 shadow-2xs"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs text-on-surface">{feat}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setMvpFeatures(mvpFeatures.filter((_, i) => i !== idx))}
                            className="text-gray-400 hover:text-error p-0.5 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMvpFeature}
                      onChange={(e) => setNewMvpFeature(e.target.value)}
                      placeholder="Add MVP core feature (e.g. Automated FHIR endpoint mapper)..."
                      className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newMvpFeature.trim()) {
                          setMvpFeatures([...mvpFeatures, newMvpFeature.trim()]);
                          setNewMvpFeature("");
                        }
                      }}
                      className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                    >
                      Add Feature
                    </button>
                  </div>
                </div>

                {/* Technical Requirements */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <label className="text-xs font-bold text-on-surface">Technical, Security & Compliance Requirements</label>
                  <textarea
                    rows={3}
                    value={technicalRequirements}
                    onChange={(e) => setTechnicalRequirements(e.target.value)}
                    placeholder="e.g. SOC2 Type II compliance, HIPAA BAA readiness, low-latency sync over 3G..."
                    className="w-full bg-surface-container/40 rounded-xl p-3.5 text-xs text-on-surface outline-none border border-outline-variant/30 leading-relaxed font-normal"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(4)}
                    className="text-on-surface-variant text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-surface-container cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(6)}
                    className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Startup Mode Builder</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 6: STARTUP MODE & VENTURE WORKSPACE ────────────────────── */}
            {activeTab === 6 && (
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                      Module 6 · Venture Studio
                    </span>
                    {/* Startup Mode Master Switch */}
                    <button
                      type="button"
                      onClick={() => setHasStartupMode(!hasStartupMode)}
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        hasStartupMode
                          ? "bg-primary text-white shadow-xs"
                          : "bg-surface-container text-on-surface-variant border border-outline-variant/30"
                      }`}
                    >
                      <Rocket className="w-3.5 h-3.5" />
                      <span>{hasStartupMode ? "Startup Mode Enabled" : "Startup Mode Disabled"}</span>
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-on-surface">
                    Startup Mode & Venture Economics Builder
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Equip founders and builders with initial hypotheses, target buyer segments, and value proposition drafts.
                  </p>
                </div>

                {hasStartupMode ? (
                  <div className="flex flex-col gap-6">
                    {/* Target Customer Segments */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-xs font-bold text-on-surface">
                        Which of these segments would a founder focus on first?
                      </label>
                      {startupTargetSegments.length === 0 ? (
                        <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                          No customer segments added yet. Add target personas below.
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {startupTargetSegments.map((seg, idx) => (
                            <div
                              key={idx}
                              className="px-3.5 py-1.5 rounded-full bg-surface-container/60 border border-outline-variant/30 text-xs font-bold text-on-surface flex items-center gap-2 shadow-2xs"
                            >
                              <span>{seg}</span>
                              <button
                                type="button"
                                onClick={() => setStartupTargetSegments(startupTargetSegments.filter((_, i) => i !== idx))}
                                className="text-gray-400 hover:text-error cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSegment}
                          onChange={(e) => setNewSegment(e.target.value)}
                          placeholder="Add customer segment (e.g. Rural Clinic Admins)..."
                          className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newSegment.trim()) {
                              setStartupTargetSegments([...startupTargetSegments, newSegment.trim()]);
                              setNewSegment("");
                            }
                          }}
                          className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                        >
                          + Add Segment
                        </button>
                      </div>
                    </div>

                    {/* Value Proposition Draft */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                        <span>Smallest Version of Value (Initial Value Proposition)</span>
                        <span className="text-[10px] text-outline font-normal">Willingness-to-pay hypothesis</span>
                      </label>
                      <textarea
                        rows={3}
                        value={startupValueProp}
                        onChange={(e) => setStartupValueProp(e.target.value)}
                        placeholder="A lightweight PDF parser that categorizes incoming faxes and maps them directly to EHR endpoints without custom integration fees..."
                        className="w-full bg-surface-container/40 rounded-xl p-3.5 text-xs text-on-surface outline-none border border-outline-variant/30 leading-relaxed font-normal"
                      />
                    </div>

                    {/* Willingness to pay benchmark */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface">Average Willingness-to-Pay Benchmark</label>
                      <input
                        type="text"
                        value={startupWillingnessToPay}
                        onChange={(e) => setStartupWillingnessToPay(e.target.value)}
                        placeholder="e.g. $150/mo per practitioner"
                        className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                      />
                    </div>

                    {/* Existing Solution Gaps Builder */}
                    <div className="flex flex-col gap-3 pt-2">
                      <label className="text-xs font-bold text-on-surface">Weaknesses & Gaps in Incumbents</label>
                      {startupSolutionsGaps.length === 0 ? (
                        <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                          No incumbent weaknesses or gaps added yet. Add vulnerabilities below.
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2.5">
                          {startupSolutionsGaps.map((gap, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 shadow-2xs flex items-start justify-between gap-3"
                            >
                              <div className="flex flex-col gap-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-on-surface">{gap.name}</span>
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                      gap.weaknessType === "Weakness"
                                        ? "bg-orange-100 text-orange-700 dark:bg-orange-950/50"
                                        : "bg-purple-100 text-purple-700 dark:bg-purple-950/50"
                                    }`}
                                  >
                                    {gap.weaknessType}
                                  </span>
                                </div>
                                <span className="text-[11px] text-on-surface-variant line-clamp-1">{gap.description}</span>
                                <p className="text-xs text-rose-600 font-medium mt-0.5">
                                  <span className="font-bold">Vulnerability:</span> {gap.weakness}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setStartupSolutionsGaps(startupSolutionsGaps.filter((_, i) => i !== idx))}
                                className="text-gray-400 hover:text-error p-1 cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Gap */}
                      <div className="p-3.5 rounded-2xl bg-surface-container/20 border border-dashed border-gray-300 flex flex-col gap-2.5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={newGapName}
                            onChange={(e) => setNewGapName(e.target.value)}
                            placeholder="Solution Name (e.g. Epic)"
                            className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                          />
                          <input
                            type="text"
                            value={newGapDesc}
                            onChange={(e) => setNewGapDesc(e.target.value)}
                            placeholder="Description"
                            className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                          />
                          <select
                            value={newGapType}
                            onChange={(e) => setNewGapType(e.target.value as any)}
                            className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                          >
                            <option value="Weakness">Weakness</option>
                            <option value="Gap">Gap</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          value={newGapWeakness}
                          onChange={(e) => setNewGapWeakness(e.target.value)}
                          placeholder="Specific Vulnerability / Reason why it fails..."
                          className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newGapName.trim()) {
                              setStartupSolutionsGaps([
                                ...startupSolutionsGaps,
                                {
                                  name: newGapName.trim(),
                                  description: newGapDesc.trim() || "Incumbent solution in market.",
                                  weaknessType: newGapType,
                                  weakness: newGapWeakness.trim() || "High costs and proprietary friction.",
                                },
                              ]);
                              setNewGapName("");
                              setNewGapDesc("");
                              setNewGapWeakness("");
                            }
                          }}
                          className="self-end bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-primary-container cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Incumbent Gap</span>
                        </button>
                      </div>
                    </div>

                    {/* Directions to Explore */}
                    <div className="flex flex-col gap-3 pt-2 border-t border-gray-200/60">
                      <label className="text-xs font-bold text-on-surface">Possible Directions to Explore</label>
                      {startupDirections.length === 0 ? (
                        <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                          No exploration directions added yet. Add venture angles below.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {startupDirections.map((dir, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 shadow-2xs flex flex-col gap-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                  {dir.type}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setStartupDirections(startupDirections.filter((_, i) => i !== idx))}
                                  className="text-gray-400 hover:text-error cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="text-xs font-bold text-on-surface">{dir.title}</span>
                              <span className="text-[11px] text-on-surface-variant leading-relaxed">
                                {dir.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="p-3.5 rounded-2xl bg-surface-container/20 border border-dashed border-gray-300 flex flex-col gap-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={newDirType}
                            onChange={(e) => setNewDirType(e.target.value)}
                            placeholder="Tag (e.g. Direction 3: Hardware)"
                            className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                          />
                          <input
                            type="text"
                            value={newDirTitle}
                            onChange={(e) => setNewDirTitle(e.target.value)}
                            placeholder="Direction Title"
                            className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                          />
                        </div>
                        <input
                          type="text"
                          value={newDirDesc}
                          onChange={(e) => setNewDirDesc(e.target.value)}
                          placeholder="Brief technical angle or venture rationale..."
                          className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newDirTitle.trim()) {
                              setStartupDirections([
                                ...startupDirections,
                                {
                                  type: newDirType.trim() || "Direction",
                                  title: newDirTitle.trim(),
                                  description: newDirDesc.trim() || "Venture exploration angle.",
                                },
                              ]);
                              setNewDirTitle("");
                              setNewDirDesc("");
                            }
                          }}
                          className="self-end bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-primary-container cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Venture Direction</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-surface-container/20 border border-dashed border-gray-300 text-center flex flex-col items-center gap-2">
                    <Rocket className="w-8 h-8 text-gray-400 opacity-50" />
                    <h3 className="text-sm font-bold text-on-surface">Startup Mode Is Disabled</h3>
                    <p className="text-xs text-on-surface-variant max-w-md">
                      Enable Startup Mode above to attach venture unit economics, buyer segments, and draft hypotheses to this problem dossier.
                    </p>
                    <button
                      type="button"
                      onClick={() => setHasStartupMode(true)}
                      className="mt-2 text-xs font-bold text-primary hover:underline"
                    >
                      Enable Startup Mode
                    </button>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t border-gray-200/60">
                  <button
                    type="button"
                    onClick={() => setActiveTab(5)}
                    className="text-on-surface-variant text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-surface-container cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary text-white text-xs md:text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>Publishing Problem Dossier...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Verified Problem Statement</span>
                        <Rocket className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  };
