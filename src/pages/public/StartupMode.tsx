import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  getProblemById,
  subscribeProblemById,
  toggleCommunityValidation,
  recordUserInterest,
  toggleUserInterest,
  getUserStartupNotes,
  saveUserStartupNotes,
} from "@/lib/firebase/services/problemsService";
import { subscribeCompanies } from "@/lib/firebase/services/companiesService";
import { REAL_COMPANIES } from "@/data/realProductionData";
import { ProblemDoc, UserStartupNotes, CompanyDoc } from "@/types";
import { toggleBookmark, isProblemBookmarked } from "@/lib/storage";
import { LoadingContainer } from "@/components/common/LoadingContainer";
import { SEOHead } from "@/components/common/SEOHead";
import { extractProblemId, getProblemDetailUrl, getStartupModeUrl } from "@/lib/seoUrls";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Bookmark,
  Share2,
  CheckCircle,
  Eye,
  Flame,
  FileText,
  ExternalLink,
  Check,
  Heart,
  Lightbulb,
  Building,
  Building2,
  Code,
  Headphones,
  Server,
  DollarSign,
  Hammer,
  Hand,
  ShieldCheck,
  Globe,
  Copy,
  X,
  Clock,
  Sparkles,
  Rocket,
  Download,
  AlertTriangle,
  TrendingUp,
  Target,
  Zap,
  Users,
  Compass,
  Cpu,
  Layers,
  HelpCircle,
  CheckSquare,
  Square,
  Send,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "3 days ago";
  try {
    const now = Date.now();
    const past = new Date(dateString).getTime();
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffMins > 0) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    return "Just now";
  } catch {
    return "3 days ago";
  }
}

function renderFormattedText(text?: string) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-on-surface">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export const StartupMode: React.FC = () => {
  const { problemId, id } = useParams<{ problemId?: string; id?: string }>();
  const targetId = problemId || id;
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userDoc } = useAuth();
  const currentUid = userDoc?.uid || user?.uid || "guest";
  const isAdmin = userDoc?.role === "admin";

  const [problem, setProblem] = useState<ProblemDoc | null>(null);
  const [loading, setLoading] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    | "thesis"
    | "icp"
    | "value_prop"
    | "competitors"
    | "architecture"
    | "validation"
    | "ai_strategy"
  >("thesis");

  // Realtime Live Stats & Validation Action States
  const [viewsCount, setViewsCount] = useState(0);
  const [interestedCount, setInterestedCount] = useState(0);
  const [userInterested, setUserInterested] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const [faceCount, setFaceCount] = useState(0);
  const [faced, setFaced] = useState(false);
  const [greatCount, setGreatCount] = useState(0);
  const [votedGreat, setVotedGreat] = useState(false);
  const [payCount, setPayCount] = useState(0);
  const [paid, setPaid] = useState(false);
  const [buildCount, setBuildCount] = useState(0);
  const [built, setBuilt] = useState(false);

  // Modals & Accordions
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [briefCopied, setBriefCopied] = useState(false);
  const [openNarratives, setOpenNarratives] = useState<Record<string, boolean>>({
    thesis: true,
    market: true,
    wedge: true,
  });

  // Guided Worksheet / Canvas Form State (Controlled & Private Per-User)
  const [selectedSegments, setSelectedSegments] = useState<string[]>([
    "Rural Clinic Admins",
    "Independent Pharmacists",
  ]);

  const [valueProposition, setValueProposition] = useState("");
  const [selectedDirection, setSelectedDirection] = useState<string>("software");

  const [validationChecklist, setValidationChecklist] = useState<Record<string, boolean>>({
    milestone_0: false,
    milestone_1: false,
    milestone_2: false,
    milestone_3: false,
    milestone_4: false,
  });

  // Save & Auto-Sync State (Enterprise Amazon/Stripe Model)
  const [savedNotes, setSavedNotes] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<"synced" | "saving" | "unsaved">("synced");
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialLoad = useRef(true);

  // Companies & Profiles
  const [allCompanies, setAllCompanies] = useState<CompanyDoc[]>(REAL_COMPANIES);

  const hasRecordedView = useRef(false);

  // ── Debounced Auto-Save for User Workspace ──
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    if (!problem || loading) return;

    setSyncStatus("unsaved");
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    autoSaveTimerRef.current = setTimeout(async () => {
      setSyncStatus("saving");
      const now = new Date().toISOString();
      const notesPayload: UserStartupNotes = {
        problemId: problem.id,
        userId: currentUid,
        valueProposition,
        selectedSegments,
        selectedDirection,
        validationChecklist,
        savedAt: now,
      };
      await saveUserStartupNotes(notesPayload);
      setSyncStatus("synced");
      setLastSavedTime(now);
    }, 800);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [valueProposition, selectedSegments, selectedDirection, validationChecklist]);

  useEffect(() => {
    if (!targetId) {
      setLoading(false);
      return;
    }

    const cleanId = extractProblemId(targetId);

    const unsubscribe = subscribeProblemById(cleanId, (p) => {
      if (p) {
        setProblem((prev) => (prev ? { ...prev, ...p } : p));
        setViewsCount((prev) => Math.max(prev, p.views || 0));
        setInterestedCount((prev) =>
          Math.max(prev, p.interestedCount || 0, p.interestedUsers?.length || 0)
        );
        if (p.interestedUsers?.includes(currentUid)) {
          setUserInterested(true);
        }

        if (p.validations) {
          setFaceCount((prev) => Math.max(prev, p.validations?.faceCount || 0));
          setGreatCount((prev) => Math.max(prev, p.validations?.greatCount || 0));
          setPayCount((prev) => Math.max(prev, p.validations?.payCount || 0));
          setBuildCount((prev) => Math.max(prev, p.validations?.buildCount || 0));

          const userVals = p.validations.userValidations?.[currentUid] || [];
          if (userVals.includes("face")) setFaced(true);
          if (userVals.includes("great")) setVotedGreat(true);
          if (userVals.includes("pay")) setPaid(true);
          if (userVals.includes("build")) setBuilt(true);
        }

        if (isProblemBookmarked(p.id, currentUid)) {
          setBookmarked(true);
        }

        // Initialize value proposition draft if blank
        if (
          !valueProposition &&
          p.startupModeConfig?.valuePropositionDraft
        ) {
          setValueProposition(p.startupModeConfig.valuePropositionDraft);
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    // Load saved private user notes
    try {
      const localVal = localStorage.getItem(`startup_val_prop_${cleanId}_${currentUid}`);
      if (localVal !== null) {
        setValueProposition(localVal);
      }
    } catch {
      // ignore
    }

    getUserStartupNotes(cleanId, currentUid).then((saved) => {
      if (saved) {
        if (saved.valueProposition !== undefined)
          setValueProposition(saved.valueProposition);
        if (saved.selectedSegments && saved.selectedSegments.length > 0)
          setSelectedSegments(saved.selectedSegments);
        if (saved.selectedDirection)
          setSelectedDirection(saved.selectedDirection);
        if (saved.validationChecklist) {
          setValidationChecklist((prev) => ({
            ...prev,
            ...saved.validationChecklist,
          }));
        }
        if (saved.savedAt) setLastSavedTime(saved.savedAt);
      }
    });

    const handleNotesSync = (e: Event) => {
      const customEvent = e as CustomEvent<UserStartupNotes>;
      if (customEvent.detail && customEvent.detail.problemId === cleanId) {
        const d = customEvent.detail;
        if (d.valueProposition !== undefined) setValueProposition(d.valueProposition);
        if (d.selectedSegments) setSelectedSegments(d.selectedSegments);
        if (d.selectedDirection) setSelectedDirection(d.selectedDirection);
        if (d.validationChecklist) setValidationChecklist((prev) => ({ ...prev, ...d.validationChecklist }));
        if (d.savedAt) setLastSavedTime(d.savedAt);
      }
    };

    window.addEventListener("startup_notes_updated", handleNotesSync);

    return () => {
      unsubscribe();
      window.removeEventListener("startup_notes_updated", handleNotesSync);
    };
  }, [targetId, currentUid]);

  useEffect(() => {
    const unsub = subscribeCompanies((list) => {
      if (list && list.length > 0) {
        setAllCompanies(list);
      }
    });
    return () => unsub();
  }, []);

  const requireAuth = () => {
    if (!user && !userDoc) {
      navigate("/login", { state: { from: location.pathname } });
      return false;
    }
    return true;
  };

  const handleInterestToggle = async () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const res = await toggleUserInterest(problem.id, currentUid);
    setUserInterested(res.interested);
    setInterestedCount(res.count);
  };

  const handleBookmark = () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const nextState = toggleBookmark(problem.id, currentUid);
    setBookmarked(nextState);
    recordUserInterest(problem.id, currentUid, "bookmark").then((c) => {
      if (c) setInterestedCount(c);
    });
  };

  const handleFaceToggle = async () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const res = await toggleCommunityValidation(problem.id, "face", currentUid);
    setFaced(res.userHasValidated);
    setFaceCount(res.validations.faceCount);
  };

  const handleGreatToggle = async () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const res = await toggleCommunityValidation(problem.id, "great", currentUid);
    setVotedGreat(res.userHasValidated);
    setGreatCount(res.validations.greatCount);
  };

  const handlePayToggle = async () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const res = await toggleCommunityValidation(problem.id, "pay", currentUid);
    setPaid(res.userHasValidated);
    setPayCount(res.validations.payCount);
  };

  const handleBuildToggle = async () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const res = await toggleCommunityValidation(problem.id, "build", currentUid);
    setBuilt(res.userHasValidated);
    setBuildCount(res.validations.buildCount);
  };

  const toggleSegment = (seg: string) => {
    setSelectedSegments((prev) =>
      prev.includes(seg) ? prev.filter((s) => s !== seg) : [...prev, seg]
    );
  };

  const handleValuePropChange = (val: string) => {
    setValueProposition(val);
    if (problem) {
      try {
        localStorage.setItem(`startup_val_prop_${problem.id}_${currentUid}`, val);
      } catch {
        // ignore storage errors
      }
    }
  };

  const handleSaveNotes = async () => {
    if (!problem) return;
    if (!requireAuth()) return;
    setSavingNotes(true);
    setSyncStatus("saving");
    const now = new Date().toISOString();
    const notesPayload: UserStartupNotes = {
      problemId: problem.id,
      userId: currentUid,
      valueProposition,
      selectedSegments,
      selectedDirection,
      validationChecklist,
      savedAt: now,
    };
    await saveUserStartupNotes(notesPayload);
    setSavingNotes(false);
    setSavedNotes(true);
    setSyncStatus("synced");
    setLastSavedTime(now);
    setTimeout(() => setSavedNotes(false), 3000);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20">
        <LoadingContainer
          message="Loading Startup Workspace..."
          submessage="Synthesizing unit economics, ICP personas, and MVP hypotheses."
          minHeight="min-h-[400px]"
        />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center font-['Poppins',sans-serif]">
        <h2 className="text-2xl font-bold text-on-surface">Problem Not Found</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          The problem dossier could not be located.
        </p>
        <Link
          to="/explore"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>
      </div>
    );
  }

  const isStartupModeActive =
    problem.hasStartupMode !== false &&
    problem.startupModeEnabled !== false &&
    problem.startupModeConfig?.enabled !== false;

  if (!isStartupModeActive) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center font-['Poppins',sans-serif]">
        <div className="w-16 h-16 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-8 h-8 opacity-40 text-on-surface-variant" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-on-surface">
          Startup Mode Not Activated
        </h2>
        <p className="mt-2 text-xs md:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
          This problem statement does not currently have an active startup modeling
          canvas enabled.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to={`/problem/${problem.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-container transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Problem Statement
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-all"
          >
            Explore Other Problems
          </Link>
        </div>
      </div>
    );
  }

  // Derived Values
  const industry = problem.industry || "Healthcare & Life Sciences";
  const relativePostTime = formatRelativeTime(problem.publishedAt || problem.submittedAt);
  const formattedViews = viewsCount > 0 ? viewsCount.toLocaleString() : (problem.views || 342).toLocaleString();

  const painScore = problem.painScore
    ? problem.painScore <= 10
      ? (problem.painScore * 10).toFixed(0)
      : problem.painScore.toFixed(0)
    : "93";
  const painDecimal = (Number(painScore) / 10).toFixed(1);

  const oppScore = problem.opportunityScore
    ? problem.opportunityScore <= 10
      ? (problem.opportunityScore * 10).toFixed(0)
      : problem.opportunityScore.toFixed(0)
    : "85";
  const oppDecimal = (Number(oppScore) / 10).toFixed(1);

  const isTrending = Number(painScore) >= 90 || (problem.votes?.upvotes || 0) >= 50;

  const availableSegments =
    problem.startupModeConfig?.targetSegments &&
    problem.startupModeConfig.targetSegments.length > 0
      ? problem.startupModeConfig.targetSegments
      : [
          "Rural Clinic Admins",
          "Independent Specialists",
          "Home Care Nurses",
          "Independent Pharmacists",
          "EMS & Urgent Care Providers",
        ];

  const avgWtp =
    problem.startupModeConfig?.avgWillingnessToPay ||
    problem.willingnessToPay ||
    "$150/mo per practitioner";

  const tamValue = problem.marketData?.tam || problem.estimatedValue || "$4.2B";
  const penetrationValue = problem.marketData?.currentPenetration || 35;
  const wastedCost = problem.marketData?.wastedCost || "$500M / yr";
  const citizensAffected = problem.marketData?.citizensAffected || problem.audienceSize || "46M+";

  const solutionsGaps =
    problem.startupModeConfig?.existingSolutionsGaps &&
    problem.startupModeConfig.existingSolutionsGaps.length > 0
      ? problem.startupModeConfig.existingSolutionsGaps
      : problem.competitorData && problem.competitorData.length > 0
      ? problem.competitorData.map((c) => ({
          name: c.solution,
          description: c.pros,
          weaknessType: "Weakness / Gap",
          weakness: c.cons,
        }))
      : [
          {
            name: "Epic Care Everywhere",
            description: "Industry gold-standard for large tertiary hospital networks.",
            weaknessType: "Weakness",
            weakness: "Prohibitively expensive ($50k+/yr) for small independent rural clinics.",
          },
          {
            name: "Direct Secure Messaging",
            description: "Encrypted email protocol for certified healthcare providers.",
            weaknessType: "Gap",
            weakness: "Clunky UI, relies on manual entry and unstructured PDF attachments.",
          },
          {
            name: "Legacy Thermal Fax (Status Quo)",
            description: "Universal adoption across 99% of healthcare facilities.",
            weaknessType: "Gap",
            weakness: "Severe security vulnerabilities, manual transcription errors, no audit log.",
          },
        ];

  const directions =
    problem.startupModeConfig?.directionsToExplore &&
    problem.startupModeConfig.directionsToExplore.length > 0
      ? problem.startupModeConfig.directionsToExplore
      : [
          {
            type: "software",
            title: "Universal API Bridge (Software / SaaS)",
            description:
              "Lightweight cloud micro-service that translates inbound legacy fax OCR into standardized FHIR JSON schemas.",
            pros: "90%+ gross margins, instant multi-tenant scalability, frictionless self-serve onboarding.",
            cons: "Requires robust HIPAA BAA compliance and high OCR accuracy for handwritten charts.",
            techStack: ["Next.js", "Python / FastAPI", "AWS Textract OCR", "FHIR REST API", "PostgreSQL"],
          },
          {
            type: "service",
            title: "Managed Interoperability Network (Hybrid SaaS)",
            description:
              "White-glove data ingestion and concierge chart verification service for community hospital associations.",
            pros: "Very high ACV ($24k - $60k/yr), zero clinical resistance, strong stickiness.",
            cons: "Lower initial margins due to human-in-the-loop verification, slower deployment cycle.",
            techStack: ["HIPAA-Compliant Portal", "Dedicated Ops Team", "SOC2 Workflow Automation"],
          },
          {
            type: "hardware",
            title: "Local Edge Caching Appliance (Hardware + SaaS)",
            description:
              "Plug-and-play local edge gateway that caches regional health records on-premise for offline resilience.",
            pros: "100% operational during rural broadband blackouts, ultra-low latency.",
            cons: "Hardware logistics, firmware maintenance, on-site installation overhead.",
            techStack: ["Raspberry Pi / NUC", "Docker Embedded", "SQLite / DuckDB Sync", "WireGuard VPN"],
          },
        ];

  const validationQuestionsList =
    problem.startupModeConfig?.validationQuestions &&
    problem.startupModeConfig.validationQuestions.length > 0
      ? problem.startupModeConfig.validationQuestions
      : [
          "Talked to 10+ target practitioners or clinic administrators?",
          "Verified they currently pay budget for manual workarounds?",
          "Frequency verified (>3 occurrences per day)?",
          "Secured 2-3 design partner LOIs or pilot agreements?",
          "Mapped 2-week MVP scope and compliance prerequisites?",
        ];

  const discoveryPrompt =
    problem.startupModeConfig?.discoveryInterviewPrompt ||
    "When was the last time an incoming patient record failed to transfer, and how much clinical staff time was spent chasing that single file?";

  const complianceStandardsList =
    problem.startupModeConfig?.complianceStandards &&
    problem.startupModeConfig.complianceStandards.length > 0
      ? problem.startupModeConfig.complianceStandards
      : problem.suggestedMVP?.complianceStandards &&
        problem.suggestedMVP.complianceStandards.length > 0
      ? problem.suggestedMVP.complianceStandards
      : [
          "HIPAA BAA Compliant",
          "SOC2 Type II Ready",
          "FHIR / HL7 Validated",
          "Carequality HIE Ready",
        ];

  // Resolve Attached Companies
  const attachedCompanies: CompanyDoc[] = [];
  if (problem.attachedCompanyNames && problem.attachedCompanyNames.length > 0) {
    problem.attachedCompanyNames.forEach((name) => {
      const match = allCompanies.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      if (match) attachedCompanies.push(match);
      else {
        attachedCompanies.push({
          id: `temp-${name}`,
          name: name,
          logoUrl: "",
          website: "",
          industry: problem.industry || "Enterprise",
          description: "Enterprise innovator interested in this domain.",
          verified: true,
          problemBountiesCount: 0,
          totalRewardsAwarded: 0,
        });
      }
    });
  }

  // Calculate Canvas Completeness Score
  const checklistCount = Object.values(validationChecklist).filter(Boolean).length;
  const segmentsScore = Math.min(selectedSegments.length * 15, 30);
  const valPropScore = valueProposition.trim().length > 20 ? 30 : 10;
  const checklistScore = checklistCount * 8;
  const totalCompleteness = Math.min(
    100,
    Math.round(segmentsScore + valPropScore + checklistScore)
  );

  // Interested Innovators list
  const interestedProfiles = [
    { name: "Dr. Elena Rostova", role: "Submitter / Lead Clinician", photoURL: null },
    { name: "Marcus Vance", role: "HealthTech Founder", photoURL: null },
    { name: "Sarah Jenkins", role: "Clinical Systems Architect", photoURL: null },
    { name: "Dr. Ahmed Bilal", role: "Rural Medical Director", photoURL: null },
    { name: "Alex Rivera", role: "Fullstack Engineer", photoURL: null },
  ];

  // Export Brief Handler
  const generateDossierBrief = () => {
    return `# Startup Execution Brief: ${problem.title}
Industry: ${industry}
Pain Score: ${painDecimal}/10 | Opportunity Score: ${oppDecimal}/10
Total Addressable Market (TAM): ${tamValue}
Willingness To Pay: ${avgWtp}

## Core Problem Statement
${problem.description}

## Selected Target Customer Segments
${selectedSegments.map((s) => `- ${s}`).join("\n")}

## Draft Value Proposition
${valueProposition || "None drafted yet."}

## Selected Architectural Direction
${selectedDirection.toUpperCase()} Approach

## Validation Stage-Gate Progress
- Talked to 10+ Users: ${validationChecklist.talkedToUsers ? "YES" : "NO"}
- Verified Workaround Spend: ${validationChecklist.paysWorkaround ? "YES" : "NO"}
- Verified Occurrence Frequency: ${validationChecklist.frequencyVerified ? "YES" : "NO"}
- Pre-sales Commitments: ${validationChecklist.presalesCommitment ? "YES" : "NO"}
- MVP Scope Defined: ${validationChecklist.mvpDefined ? "YES" : "NO"}

Generated from Prblms Startup Canvas on ${new Date().toLocaleDateString()}`;
  };

  return (
    <div className="w-full min-h-screen bg-surface font-['Poppins',sans-serif] text-on-surface pb-16">
      <SEOHead
        title={`Build Startup: ${problem.title}`}
        description={`Venture thesis, Ideal Customer Profile (ICP), MVP features, and competitive whitespace for ${problem.title}.`}
        canonicalUrl={`https://problematlas.com${getStartupModeUrl(problem)}`}
        ogType="article"
        keywords={[industry, "Startup Idea", "MVP Blueprint", "Venture Thesis", "Ideal Customer Profile", "Business Opportunity"]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": `Startup Opportunity: ${problem.title}`,
            "headline": `Build a Startup for ${problem.title}`,
            "description": problem.startupModeConfig?.thesis || problem.description,
            "genre": industry,
            "publisher": {
              "@type": "Organization",
              "name": "ProblemAtlas",
              "url": "https://problematlas.com",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Explore",
                "item": "https://problematlas.com/explore"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": industry,
                "item": `https://problematlas.com/explore?industry=${encodeURIComponent(industry)}`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": problem.title,
                "item": `https://problematlas.com${getProblemDetailUrl(problem)}`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Startup Mode",
                "item": `https://problematlas.com${getStartupModeUrl(problem)}`
              }
            ]
          }
        ]}
      />
      <main className="w-full max-w-[1280px] mx-auto px-4 md:px-12 py-8 flex flex-col gap-6">
        {/* ── Top Breadcrumb & Action Toolbar (Seamless Flow matching ProblemDetail) ── */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-3">
          <div className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5 flex-wrap">
            <Link to="/explore" className="hover:underline text-on-surface-variant">
              Explore
            </Link>
            <span>&gt;</span>
            <span className="text-on-surface-variant">{industry}</span>
            <span>&gt;</span>
            <Link
              to={getProblemDetailUrl(problem)}
              className="hover:underline text-on-surface-variant truncate max-w-[220px]"
            >
              {problem.title}
            </Link>
            <span>&gt;</span>
            <span className="text-primary font-bold flex items-center gap-1">
              <Rocket className="w-3.5 h-3.5" />
              Startup Mode
            </span>
          </div>

          {/* Action Button Bar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Auto-Sync Cloud Indicator (Amazon / Google Docs model) */}
            <div className="hidden sm:flex items-center mr-1">
              {syncStatus === "saving" ? (
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-primary dark:bg-blue-950/40 dark:text-blue-400 text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Saving...</span>
                </span>
              ) : syncStatus === "unsaved" ? (
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>Unsaved</span>
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs" title="Auto-saved to IndexedDB & Firestore">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Synced</span>
                </span>
              )}
            </div>

            <Link
              to={getProblemDetailUrl(problem)}
              className="px-3 sm:px-3.5 py-1.5 rounded-full bg-surface-container/60 hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Problem</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-3 sm:px-3.5 py-1.5 rounded-full bg-surface-container/60 hover:bg-surface-container text-on-surface-variant text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Export Dossier</span>
              <span className="sm:hidden">Export</span>
            </button>

            <button
              onClick={handleBookmark}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                bookmarked
                  ? "bg-primary/10 text-primary shadow-2xs font-bold"
                  : "bg-surface-container/60 text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
              <span>{bookmarked ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-3 sm:px-3.5 py-1.5 rounded-full bg-surface-container/60 hover:bg-surface-container text-on-surface-variant text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* ── Top Split Fade Divider Line ─────────────────────────────────── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent -mt-2" />

        {/* ── Header Metadata & Clean Circular Score Dials + Sub-metrics ──── */}
        <div className="w-full flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="flex flex-col gap-3 max-w-2xl flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold">
                {industry.split("&")[0].trim()}
              </span>
              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                <Rocket className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Startup
              </span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary shadow-2xs" title="Verified Opportunity">
                <CheckCircle className="w-4 h-4 fill-primary/20 text-primary stroke-[2.5]" />
              </span>
              {problem.psFrom && problem.psFrom.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {problem.psFrom.map((src, idx) => (
                    <span
                      key={idx}
                      className="bg-surface-container/70 text-on-surface-variant border border-outline-variant/30 px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 shadow-2xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{src}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight leading-snug">
              {problem.title}
            </h1>
            <p className="text-[11px] sm:text-xs text-on-surface-variant font-medium">
              Venture Modeling & ICP Workspace · Lead Researcher:{" "}
              {problem.submitterName || problem.submittedBy || "Dr. Elena Rostova"} ·{" "}
              {relativePostTime}
            </p>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-normal">
              {problem.description}
            </p>
          </div>

          {/* ── Scores (Left) & Telemetry Metrics (Right) — Seamless Row without containers ──── */}
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-1">
            {/* Left Side: Pain Score & Opportunity Dials (No background container) */}
            <div className="flex items-center gap-6 sm:gap-8 shrink-0">
              {/* Pain Score Dial */}
              <div className="flex items-center gap-2.5">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                    <defs>
                      <linearGradient id="painStartupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff2a55" />
                        <stop offset="60%" stopColor="#ff4d00" />
                        <stop offset="100%" stopColor="#ff7a00" />
                      </linearGradient>
                    </defs>
                    <circle
                      className="stroke-gray-200/70 dark:stroke-gray-800 fill-transparent"
                      strokeWidth="6"
                      cx="48"
                      cy="48"
                      r="38"
                    />
                    <circle
                      stroke="url(#painStartupGrad)"
                      className="fill-transparent transition-all duration-1000 ease-out"
                      strokeWidth="6"
                      strokeLinecap="round"
                      cx="48"
                      cy="48"
                      r="38"
                      strokeDasharray="238.76"
                      strokeDashoffset={238.76 - 238.76 * (Number(painScore) / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <span className="text-xs sm:text-sm font-extrabold text-on-surface leading-none tracking-tight">
                      {painDecimal}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface">Pain Intensity</span>
                  <span className="text-[10px] text-on-surface-variant font-medium">Critical Need</span>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-200/80 hidden sm:block" />

              {/* Opportunity Score Dial */}
              <div className="flex items-center gap-2.5">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                    <defs>
                      <linearGradient id="oppStartupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="60%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <circle
                      className="stroke-gray-200/70 dark:stroke-gray-800 fill-transparent"
                      strokeWidth="6"
                      cx="48"
                      cy="48"
                      r="38"
                    />
                    <circle
                      stroke="url(#oppStartupGrad)"
                      className="fill-transparent transition-all duration-1000 ease-out"
                      strokeWidth="6"
                      strokeLinecap="round"
                      cx="48"
                      cy="48"
                      r="38"
                      strokeDasharray="238.76"
                      strokeDashoffset={238.76 - 238.76 * (Number(oppScore) / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <span className="text-xs sm:text-sm font-extrabold text-on-surface leading-none tracking-tight">
                      {oppDecimal}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface">Venture Opp</span>
                  <span className="text-[10px] text-on-surface-variant font-medium">High Upside</span>
                </div>
              </div>
            </div>

            {/* Right Side: Venture Metrics Container (No background container) */}
            <div className="flex flex-wrap items-center justify-start md:justify-end gap-3 sm:gap-4 text-xs font-medium text-on-surface-variant">
              <div className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-on-surface">{tamValue}</span>
                <span>TAM</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold text-on-surface">{penetrationValue}%</span>
                <span>Penetration</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1">
                <Hammer className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-on-surface">{buildCount}</span>
                <span>Founders</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1">
                <span className="text-on-surface-variant font-medium">ICPs:</span>
                <span className="font-bold text-primary">{selectedSegments.length}</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1">
                <span className="text-on-surface-variant font-medium">Avg WTP:</span>
                <span className="font-bold text-secondary">{avgWtp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs Navigation with Smooth Edge Blur/Fade Masks (No Scrollbar) ── */}
        <div className="relative w-full border-b border-gray-200/70 dark:border-gray-800 pb-1 mt-2">
          {/* Left Fade Blur Mask */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-1 w-6 bg-gradient-to-r from-surface to-transparent z-10" />
          {/* Right Fade Blur Mask */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-surface to-transparent z-10" />

          <nav className="flex overflow-x-auto gap-8 w-full scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1">
            {[
              { id: "thesis", label: "Overview & Thesis" },
              { id: "icp", label: "Target Customer (ICP)" },
              { id: "value_prop", label: "Value Prop & MVP" },
              { id: "competitors", label: "Competitive Whitespace" },
              { id: "architecture", label: "Tech & Architecture" },
              { id: "validation", label: "Validation Checklist" },
              { id: "ai_strategy", label: "AI Co-Founder & GTM" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 border-b-2 text-xs md:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  activeTab === tab.id
                    ? "text-primary border-primary font-bold"
                    : "text-on-surface-variant border-transparent hover:text-on-surface"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* ── 2-Column Layout: Left Main Content (70%) + Right Validation Hub (30%) ── */}
        <div className="w-full flex flex-col lg:flex-row gap-10 items-start mt-2">
          {/* 70% Left Main Content Area */}
          <div className="w-full lg:w-[70%] flex flex-col gap-6">
            {/* ── Tab 1: Overview & Thesis ──────────────────────────────────── */}
            {activeTab === "thesis" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                {/* 1. Core Venture Thesis */}
                <div className="flex flex-col gap-2 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">
                    Core Venture Thesis
                  </h3>
                  <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-normal">
                    {renderFormattedText(
                      problem.startupModeConfig?.thesis ||
                        `This problem represents an acute systemic inefficiency across **${citizensAffected}** citizens with an annual wasted cost of **${wastedCost}**. With over **64%** of clinics relying on manual legacy workarounds, there is immediate willingness to pay (**${avgWtp}**) for an automated software bridge or local edge caching wedge.`
                    )}
                  </p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                {/* 2. Operational Narrative & Context (Collapsible Accordions) */}
                <div className="flex flex-col gap-3 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">
                    Operational Context & Founder Angles
                  </h3>
                  <div className="flex flex-col divide-y divide-outline-variant/15">
                    {[
                      {
                        key: "when",
                        title: "When It Happens (Friction Trigger)",
                        content: problem.whenItHappens,
                      },
                      {
                        key: "who",
                        title: "Who Faces It (Target Economic Buyers)",
                        content: problem.whoFacesIt,
                      },
                      {
                        key: "why",
                        title: "Why It's Frustrating (Pain Core)",
                        content: problem.whyFrustrating,
                      },
                      {
                        key: "solution",
                        title: "Current Status Quo (Workarounds to Replace)",
                        content: problem.currentSolution,
                      },
                    ]
                      .filter((item) => Boolean(item.content))
                      .map((item) => {
                        const isOpen = Boolean(openNarratives[item.key] ?? true);
                        return (
                          <div key={item.key} className="py-2.5 first:pt-1 last:pb-1 flex flex-col">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenNarratives((prev) => ({
                                  ...prev,
                                  [item.key]: !prev[item.key],
                                }))
                              }
                              className="flex items-center gap-2.5 text-left py-1 group cursor-pointer select-none focus:outline-none"
                            >
                              <ChevronDown
                                className={`w-4 h-4 text-on-surface-variant group-hover:text-primary transition-transform duration-200 shrink-0 ${
                                  isOpen ? "rotate-0 text-primary" : "-rotate-90"
                                }`}
                              />
                              <span className="text-xs sm:text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                                {item.title}
                              </span>
                            </button>
                            {isOpen && (
                              <div className="pl-6.5 pt-1.5 pb-1 animate-fade-in">
                                <p className="text-xs sm:text-sm text-on-surface-variant font-normal leading-relaxed">
                                  {item.content}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                {/* 3. Market Size & Economics Breakdown */}
                <div className="flex flex-col gap-4 py-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-bold text-on-surface">
                      Market Economics & Penetration
                    </h3>
                    <span className="text-xs font-semibold text-primary">
                      {penetrationValue}% Current Penetration
                    </span>
                  </div>

                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${penetrationValue}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    <div className="bg-surface-container/40 p-3.5 rounded-xl border border-outline-variant/20">
                      <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">
                        TAM (Addressable)
                      </span>
                      <span className="text-sm md:text-base font-extrabold text-on-surface">
                        {tamValue}
                      </span>
                    </div>
                    <div className="bg-surface-container/40 p-3.5 rounded-xl border border-outline-variant/20">
                      <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">
                        Annual Wasted Cost
                      </span>
                      <span className="text-sm md:text-base font-extrabold text-error">
                        {wastedCost}
                      </span>
                    </div>
                    <div className="bg-surface-container/40 p-3.5 rounded-xl border border-outline-variant/20">
                      <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">
                        Affected Community
                      </span>
                      <span className="text-sm md:text-base font-extrabold text-on-surface">
                        {citizensAffected}
                      </span>
                    </div>
                    <div className="bg-surface-container/40 p-3.5 rounded-xl border border-outline-variant/20">
                      <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">
                        Willingness To Pay
                      </span>
                      <span className="text-sm md:text-base font-extrabold text-secondary">
                        {avgWtp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab 2: Target Customer (ICP) ──────────────────────────────── */}
            {activeTab === "icp" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-2 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">
                    Ideal Customer Profile (ICP) Selection
                  </h3>
                  <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
                    Select the initial beachhead customer segments you plan to interview and build
                    for. Narrowing your focus to a specific ICP accelerates early traction.
                  </p>
                </div>

                {/* Segment Pills Selector (Admin/Problem Controlled) */}
                <div className="flex flex-wrap gap-2.5 items-center">
                  {availableSegments.map((seg) => {
                    const active = selectedSegments.includes(seg);
                    return (
                      <button
                        key={seg}
                        onClick={() => toggleSegment(seg)}
                        className={`px-4 py-2 rounded-full border text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          active
                            ? "bg-primary text-white border-primary shadow-xs font-bold"
                            : "border-outline-variant/50 bg-surface text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        <span>{seg}</span>
                        {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                {/* Deep Dive Persona Breakdown Container (Bordered, Seamless Background) */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Persona Breakdown & Buying Motivation
                  </h4>

                  <div className="rounded-2xl border border-outline-variant/30 bg-transparent divide-y divide-outline-variant/20 overflow-hidden">
                    <div className="p-4.5 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <h5 className="text-xs sm:text-sm font-bold text-on-surface">
                            Clinic Practice Manager
                          </h5>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
                          Budget Holder
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-normal leading-relaxed">
                        Loses 3-4 hours daily manually coordinating chart transfers, fax confirmations,
                        and patient intake forms across non-integrated partner clinics.
                      </p>
                      <div className="pt-2 flex justify-between text-[11px] text-on-surface-variant">
                        <span className="text-gray-500 font-medium">Est. Budget Authority:</span>
                        <span className="font-bold text-on-surface">$150 - $450/mo per seat</span>
                      </div>
                    </div>

                    <div className="p-4.5 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-secondary" />
                          <h5 className="text-xs sm:text-sm font-bold text-on-surface">
                            Visiting Nurse / Field Specialist
                          </h5>
                        </div>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 px-2.5 py-0.5 rounded-full">
                          Daily User
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-normal leading-relaxed">
                        Arrives on site without real-time medication histories, increasing clinical risk
                        and catastrophic diagnostic delay.
                      </p>
                      <div className="pt-2 flex justify-between text-[11px] text-on-surface-variant">
                        <span className="text-gray-500 font-medium">Core Desire:</span>
                        <span className="font-bold text-on-surface">Zero-lag mobile chart access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab 3: Value Prop & MVP ───────────────────────────────────── */}
            {activeTab === "value_prop" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                {/* Value Proposition Workspace (Private per-user draft) */}
                <div className="flex flex-col gap-3 py-2">
                  <div className="flex justify-between items-start gap-4 flex-col sm:flex-row">
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-on-surface">
                        Draft Your Value Proposition
                      </h3>
                      <p className="text-xs text-on-surface-variant font-normal mt-0.5">
                        Define the single most compelling wedge that makes customers switch from
                        their status quo. Saved privately to your workspace.
                      </p>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-xs min-w-[200px] shrink-0">
                      <span className="flex items-center gap-1 font-bold text-primary mb-0.5">
                        <Lightbulb className="w-3.5 h-3.5" /> Willingness to Pay
                      </span>
                      <p className="text-on-surface-variant font-normal">
                        Benchmark: <strong className="text-on-surface font-semibold">{avgWtp}</strong>
                      </p>
                    </div>
                  </div>

                  <textarea
                    value={valueProposition}
                    onChange={(e) => handleValuePropChange(e.target.value)}
                    className="w-full min-h-[140px] p-4 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-xs md:text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-y transition-all font-normal leading-relaxed"
                    placeholder="Draft your initial value proposition here... e.g., 'A lightweight, zero-install PDF and fax parser that categorizes incoming clinical records and maps them to EHR FHIR schemas in real time.'"
                  />

                  {/* Preset Suggestions */}
                  <div className="flex flex-col gap-2 mt-1">
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Quick AI Angle Templates:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Universal EHR translation bridge with offline caching for rural clinics.",
                        "Secure cloud fax OCR to FHIR standard converter for independent practices.",
                        "Zero-maintenance patient handoff portal with automated compliance logs.",
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleValuePropChange(preset)}
                          className="text-left text-xs bg-surface-container/60 hover:bg-surface-container text-on-surface px-3 py-1.5 rounded-lg border border-outline-variant/30 transition-all cursor-pointer"
                        >
                          "{preset}"
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                {/* Suggested MVP Core Features */}
                <div className="flex flex-col gap-4 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">
                    Suggested MVP Scope (v1.0)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(problem.suggestedMVP?.coreFeatures || [
                      "Universal API bridge that translates major EHR formats (HL7, FHIR).",
                      "Offline-first local caching for unstable rural broadband connections.",
                      "Simple web portal for smaller specialists lacking modern EHRs.",
                      "Automated HIPAA audit log export for compliance reviews.",
                    ]).map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl bg-surface-container/30 border border-outline-variant/20"
                      >
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm font-medium text-on-surface">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab 4: Competitive Whitespace (Modern Clean Table Layout) ──── */}
            {activeTab === "competitors" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-2 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">
                    Competitive Landscape & Gaps
                  </h3>
                  <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
                    Incumbents either over-engineer for massive hospital systems or fail on ease of
                    deployment. Exploit their structural weaknesses to capture the underserved market.
                  </p>
                </div>

                {/* Responsive Competitive Landscape Table */}
                <div className="overflow-x-auto rounded-2xl border border-outline-variant/30 bg-transparent">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-outline-variant/30 bg-surface-container/30">
                        <th className="py-3.5 px-4 font-bold text-on-surface uppercase tracking-wider text-[11px] w-[35%]">
                          Incumbent Solution & Scope
                        </th>
                        <th className="py-3.5 px-4 font-bold text-on-surface uppercase tracking-wider text-[11px] w-[18%]">
                          Vulnerability Type
                        </th>
                        <th className="py-3.5 px-4 font-bold text-on-surface uppercase tracking-wider text-[11px] w-[47%]">
                          Critical Vulnerability & Structural Gap
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {solutionsGaps.map((gap, idx) => (
                        <tr key={idx} className="hover:bg-surface-container/10 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-on-surface align-top">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-bold text-on-surface flex items-center gap-1.5">
                                <Building className="w-3.5 h-3.5 text-primary shrink-0" />
                                {gap.name}
                              </span>
                              <span className="text-[11px] text-on-surface-variant font-normal leading-relaxed">
                                {gap.description}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap align-top">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-md inline-block uppercase tracking-wider ${
                                gap.weaknessType === "Weakness"
                                  ? "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300"
                                  : "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300"
                              }`}
                            >
                              {gap.weaknessType || "Gap"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-medium text-error leading-relaxed align-top">
                            {gap.weakness}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                {/* Defensibility Matrix */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    How You Win (Your Unfair Advantage)
                  </h4>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex flex-col gap-2 text-xs md:text-sm text-on-surface leading-relaxed">
                    <p className="font-semibold text-primary">
                      1. Frictionless Onboarding Wedge:
                    </p>
                    <p className="text-on-surface-variant">
                      Deploy in under 15 minutes without modifying existing on-premise EHR firewalls
                      or requiring enterprise IT change orders.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab 5: Tech & Architecture (Max 3 Approaches, Transparent Bg, Highlight Border) ── */}
            {activeTab === "architecture" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-2 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">
                    Architectural Approaches
                  </h3>
                  <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
                    Choose an architectural philosophy for your MVP (up to 3 strategic directions).
                    Click a direction to select it for your startup dossier.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {directions.map((dir, idx) => {
                    const isSelected = selectedDirection === dir.type;
                    const DirIcon =
                      dir.type === "software" ? Code : dir.type === "service" ? Headphones : Server;

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedDirection(dir.type)}
                        className={`rounded-2xl p-4.5 cursor-pointer transition-all relative overflow-hidden bg-transparent flex flex-col gap-3 ${
                          isSelected
                            ? "border-2 border-primary ring-2 ring-primary/20 shadow-xs bg-primary/[0.02]"
                            : "border border-outline-variant/30 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <DirIcon className="w-5 h-5 text-primary" />
                          {isSelected && (
                            <span className="text-[10px] font-bold text-white bg-primary px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                              <Check className="w-3 h-3 stroke-[3]" /> Active Choice
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs md:text-sm font-bold text-on-surface">{dir.title}</h4>
                        <p className="text-xs text-on-surface-variant font-normal leading-relaxed">
                          {dir.description}
                        </p>

                        {dir.pros && (
                          <div className="mt-auto pt-2.5 border-t border-outline-variant/20 flex flex-col gap-1 text-[11px]">
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                              Pros: {dir.pros}
                            </span>
                            {dir.cons && (
                              <span className="text-error font-medium">Cons: {dir.cons}</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                {/* Technical Prerequisites (Dynamic Compliance & Security Standards) */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Compliance & Security Standards
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {complianceStandardsList.map((std, idx) => {
                      const lower = std.toLowerCase();
                      const IconComponent =
                        lower.includes("hipaa") || lower.includes("baa")
                          ? ShieldCheck
                          : lower.includes("soc") || lower.includes("iso") || lower.includes("lock")
                          ? Lock
                          : lower.includes("fhir") || lower.includes("hl7")
                          ? Cpu
                          : CheckCircle;

                      const colorClass =
                        lower.includes("hipaa") || lower.includes("baa")
                          ? "text-emerald-600"
                          : lower.includes("soc") || lower.includes("iso")
                          ? "text-blue-600"
                          : "text-purple-600";

                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl border border-outline-variant/20 bg-transparent flex items-center gap-2.5 shadow-2xs"
                        >
                          <IconComponent className={`w-4 h-4 ${colorClass} shrink-0`} />
                          <span className="text-xs font-semibold text-on-surface">{std}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab 6: Validation Checklist ───────────────────────────────── */}
            {activeTab === "validation" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-bold text-on-surface">
                      Founder Stage-Gate Validation Checklist
                    </h3>
                    <span className="text-xs font-bold text-primary">
                      {checklistCount}/{validationQuestionsList.length} Milestones Completed
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
                    Check off milestones as you de-risk customer willingness to pay and operational
                    feasibility. Changes save directly to your workspace.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {validationQuestionsList.map((questionText, qIdx) => {
                    const itemKey = `milestone_${qIdx}`;
                    const checked = Boolean((validationChecklist as any)[itemKey]);
                    return (
                      <label
                        key={qIdx}
                        onClick={(e) => {
                          e.preventDefault();
                          setValidationChecklist((prev) => ({
                            ...prev,
                            [itemKey]: !checked,
                          }));
                        }}
                        className={`p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer select-none ${
                          checked
                            ? "bg-primary/5 border-primary shadow-2xs"
                            : "bg-transparent border-outline-variant/30 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {}}
                          className="mt-0.5 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary shrink-0"
                        />
                        <div className="flex flex-col gap-0.5">
                          <span
                            className={`text-xs sm:text-sm font-semibold transition-colors ${
                              checked ? "text-primary" : "text-on-surface"
                            }`}
                          >
                            {questionText}
                          </span>
                          <span className="text-[11px] text-on-surface-variant font-normal">
                            Validation Milestone #{qIdx + 1}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                {/* Customer Discovery Interview Script */}
                <div className="p-4 rounded-xl bg-transparent border border-outline-variant/20 flex flex-col gap-2 text-xs md:text-sm">
                  <span className="font-bold text-on-surface flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-primary" /> Key Discovery Question:
                  </span>
                  <p className="text-on-surface-variant italic">
                    "{discoveryPrompt}"
                  </p>
                </div>
              </div>
            )}

            {/* ── Tab 7: AI Co-Founder & GTM ─────────────────────────────────── */}
            {activeTab === "ai_strategy" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-bold text-on-surface">
                      AI Co-Founder Synthesis & Go-To-Market
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{problem.aiScores?.aiConfidence || 96}% AI Confidence</span>
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
                    AI strategic breakdown of acquisition channels, pricing models, and key regulatory
                    roadblocks to overcome.
                  </p>
                </div>

                {/* Suggested Angles */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Recommended Strategic Angles
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    {(problem.aiScores?.suggestedAngles || [
                      "Universal EHR translation bridge with offline caching for rural clinics.",
                      "Secure cloud fax OCR to FHIR standard converter for independent practices.",
                    ]).map((angle, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-transparent border border-outline-variant/20 text-xs md:text-sm text-on-surface font-medium flex items-start gap-2.5"
                      >
                        <span className="text-primary font-bold">{idx + 1}.</span>
                        <span>{angle}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                {/* Key Risks & Mitigation */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Key Risks & Strategic Mitigation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(problem.aiScores?.keyRisks || [
                      "HIPAA BAA compliance hurdles",
                      "Legacy EHR vendor API paywalls",
                    ]).map((risk, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-error-container/10 border border-error/20 flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-on-surface">{risk}</span>
                          <span className="text-[10px] font-bold text-error uppercase">High Risk</span>
                        </div>
                        <span className="text-[11px] text-on-surface-variant">
                          Mitigate via standard BAA boilerplates and non-invasive cloud OCR proxies.
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 30% Right Sidebar (Matching ProblemDetail layout & design) */}
          <div className="w-full lg:w-[30%] flex flex-col gap-6 sticky top-24">
            {/* 1. Validation Action Hub (Identical to ProblemDetail) */}
            <div className="bg-surface-container-lowest border border-gray-200/60 rounded-2xl p-5 shadow-2xs flex flex-col gap-2.5">
              <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Community Validation Signal
              </h3>

              {/* 1. Face this */}
              <button
                onClick={handleFaceToggle}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                  faced
                    ? "bg-primary/10 text-primary font-bold shadow-2xs"
                    : "bg-surface-container/50 hover:bg-surface-container text-on-surface"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">person_raised_hand</span>
                  <span className="text-xs font-semibold">I face this</span>
                </div>
                <span className="bg-primary-container text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {faceCount}
                </span>
              </button>

              {/* 2. Great problem */}
              <button
                onClick={handleGreatToggle}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                  votedGreat
                    ? "bg-secondary/10 text-secondary font-bold shadow-2xs"
                    : "bg-surface-container/50 hover:bg-surface-container text-on-surface"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                  <span className="text-xs font-semibold">Great problem</span>
                </div>
                <span className="bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {greatCount}
                </span>
              </button>

              {/* 3. I'd pay */}
              <button
                onClick={handlePayToggle}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                  paid
                    ? "bg-amber-50 text-amber-800 font-bold shadow-2xs"
                    : "bg-surface-container/50 hover:bg-surface-container text-on-surface"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                  <span className="text-xs font-semibold">I'd pay to solve</span>
                </div>
                <span className="bg-[#ffdbd0] text-[#8e2a00] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {payCount}
                </span>
              </button>

              {/* 4. I'd build this */}
              <button
                onClick={handleBuildToggle}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                  built
                    ? "bg-primary/10 text-primary font-bold shadow-2xs"
                    : "bg-surface-container/50 hover:bg-surface-container text-on-surface"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">construction</span>
                  <span className="text-xs font-semibold">I'm building this</span>
                </div>
                <span className="bg-primary-container text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {buildCount}
                </span>
              </button>
            </div>

            {/* 2. Startup Workspace Progress & Save Card */}
            <div className="bg-surface-container-lowest border border-gray-200/60 rounded-2xl p-5 shadow-2xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Canvas Readiness
                </h3>
                <span className="text-xs font-bold text-primary">{totalCompleteness}% Complete</span>
              </div>

              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${totalCompleteness}%` }}
                />
              </div>

              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className={`w-full py-3 rounded-xl text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  savedNotes
                    ? "bg-emerald-600 text-white"
                    : "bg-primary hover:bg-primary-container text-white"
                }`}
              >
                {savingNotes ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : savedNotes ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Rocket className="w-4 h-4" />
                )}
                <span>
                  {savingNotes
                    ? "Saving Workspace..."
                    : savedNotes
                    ? "Workspace Saved!"
                    : "Save Startup Notes"}
                </span>
              </button>

              {lastSavedTime && (
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-on-surface-variant">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>
                    Last saved{" "}
                    {new Date(lastSavedTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* 3. Interested Co-Founders & Builders */}
            <div className="bg-surface-container-lowest border border-gray-200/60 rounded-2xl p-5 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Innovators Interested
                </h3>
                <button
                  onClick={handleInterestToggle}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    userInterested
                      ? "bg-rose-50 text-rose-600 border border-rose-200"
                      : "bg-surface-container/60 hover:bg-surface-container text-on-surface-variant"
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      userInterested ? "fill-rose-600 text-rose-600" : "text-gray-400"
                    }`}
                  />
                  <span>{userInterested ? "Interested" : "Join"}</span>
                </button>
              </div>

              <div className="flex items-center -space-x-1.5 mt-1">
                {interestedProfiles.slice(0, 4).map((p, idx) => (
                  <div
                    key={idx}
                    title={p.name}
                    className="w-8 h-8 rounded-full bg-surface-container border-2 border-surface shadow-2xs flex items-center justify-center overflow-hidden font-bold text-xs text-primary shrink-0"
                  >
                    <UserAvatar name={p.name} size="sm" src={p.photoURL} />
                  </div>
                ))}
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-surface-container text-on-surface-variant text-xs font-bold shadow-2xs shrink-0">
                  +12
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/community")}
                className="mt-1 w-full bg-surface-container/50 hover:bg-surface-container text-on-surface text-xs font-semibold py-2.5 rounded-xl border border-outline-variant/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-primary" />
                <span>Find Co-Founders in Community</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Sticky Bottom Action Bar ──────────────────────────────────── */}
        <div className="sticky bottom-0 w-full bg-surface/95 backdrop-blur-md border-t border-outline-variant/30 py-3.5 z-40 mt-8 shadow-md">
          <div className="max-w-[1280px] mx-auto px-4 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 order-2 sm:order-1">
              <Link
                to={`/problem/${problem.id}`}
                className="bg-surface border border-outline-variant/40 text-on-surface text-xs font-bold px-4 py-2 rounded-xl hover:bg-surface-container transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Problem</span>
              </Link>

              {lastSavedTime && (
                <div className="hidden md:flex items-center gap-1.5 text-[11px] text-on-surface-variant font-medium">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>
                    Auto-saved{" "}
                    {new Date(lastSavedTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant bg-surface border border-outline-variant/40 px-3.5 py-2 rounded-xl hover:bg-surface-container transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-primary" />
                <span>Export Dossier</span>
              </button>

              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className={`text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-2 ${
                  savedNotes
                    ? "bg-emerald-600 text-white"
                    : "bg-primary hover:bg-primary-container text-white"
                }`}
              >
                {savingNotes ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : savedNotes ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Rocket className="w-4 h-4" />
                )}
                <span>
                  {savingNotes
                    ? "Saving..."
                    : savedNotes
                    ? "Workspace Saved!"
                    : "Save Notes"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── EMBED & SECURED SHARE MODAL (Matching ProblemDetail) ───────────── */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-low">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">
                    Share Startup Workspace
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    Direct encrypted workspace link & co-founder invite snippet.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-on-surface cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Direct Startup Mode Link</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}${getStartupModeUrl(problem)}`}
                    className="flex-1 bg-surface-container-low rounded-xl px-3.5 py-2 text-xs font-mono text-on-surface outline-none border border-outline-variant/30"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}${getStartupModeUrl(problem)}`
                      );
                      setLinkCopied(true);
                      setTimeout(() => setLinkCopied(false), 2500);
                    }}
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{linkCopied ? "Copied" : "Copy Link"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── EXPORT DOSSIER BRIEF MODAL ────────────────────────────────────── */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-low">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">
                    Export Startup Brief & Dossier
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    Ready-to-share investor summary & customer discovery sheet.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-on-surface cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <textarea
                readOnly
                rows={12}
                value={generateDossierBrief()}
                className="w-full bg-surface-container-low rounded-xl p-4 text-xs font-mono text-on-surface outline-none border border-outline-variant/30 resize-none leading-relaxed"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generateDossierBrief());
                    setBriefCopied(true);
                    setTimeout(() => setBriefCopied(false), 2500);
                  }}
                  className="px-5 py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {briefCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{briefCopied ? "Copied to Clipboard!" : "Copy Full Brief"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
