import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getProblemById, getUserStartupNotes, saveUserStartupNotes } from "@/lib/firebase/services/problemsService";
import { ProblemDoc, UserStartupNotes } from "@/types";
import { LoadingContainer } from "@/components/common/LoadingContainer";
import { UserAvatar } from "@/components/ui/UserAvatar";
import {
  ArrowLeft,
  ChevronRight,
  Lightbulb,
  Check,
  CheckCircle,
  Code,
  Headphones,
  Server,
  Building,
  Mail,
  Copy,
  Save,
  Users,
  Rocket,
  Clock,
  Sparkles,
} from "lucide-react";

export const StartupMode: React.FC = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const { user, userDoc } = useAuth();
  const userId = userDoc?.uid || user?.uid || "guest";

  const [problem, setProblem] = useState<ProblemDoc | null>(null);
  const [loading, setLoading] = useState(true);

  // Guided Worksheet Form State
  const [selectedSegments, setSelectedSegments] = useState<string[]>([
    "Rural Clinic Admins",
  ]);
  const [customSegment, setCustomSegment] = useState("");
  const [isAddingSegment, setIsAddingSegment] = useState(false);

  const [valueProposition, setValueProposition] = useState("");
  const [selectedDirection, setSelectedDirection] = useState<string>("software");

  const [validationChecklist, setValidationChecklist] = useState({
    talkedToUsers: false,
    paysWorkaround: false,
    frequencyVerified: false,
  });

  const [savedNotes, setSavedNotes] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  useEffect(() => {
    if (!problemId) {
      setLoading(false);
      return;
    }
    let isMounted = true;
    getProblemById(problemId).then(async (p) => {
      if (isMounted) {
        setProblem(p);
        setLoading(false);

        // Load previously saved notes for this user
        const saved = await getUserStartupNotes(problemId, userId);
        if (saved && isMounted) {
          if (saved.valueProposition !== undefined) setValueProposition(saved.valueProposition);
          if (saved.selectedSegments && saved.selectedSegments.length > 0) setSelectedSegments(saved.selectedSegments);
          if (saved.selectedDirection) setSelectedDirection(saved.selectedDirection);
          if (saved.validationChecklist) setValidationChecklist(saved.validationChecklist);
          if (saved.savedAt) setLastSavedTime(saved.savedAt);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [problemId, userId]);

  const toggleSegment = (seg: string) => {
    setSelectedSegments((prev) =>
      prev.includes(seg) ? prev.filter((s) => s !== seg) : [...prev, seg]
    );
  };

  const handleAddCustomSegment = () => {
    if (customSegment.trim()) {
      setSelectedSegments((prev) => [...prev, customSegment.trim()]);
      setCustomSegment("");
      setIsAddingSegment(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!problemId) return;
    setSavingNotes(true);
    const now = new Date().toISOString();
    const notesPayload: UserStartupNotes = {
      problemId,
      userId,
      valueProposition,
      selectedSegments,
      selectedDirection,
      validationChecklist,
      savedAt: now,
    };
    await saveUserStartupNotes(notesPayload);
    setSavingNotes(false);
    setSavedNotes(true);
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
        <p className="mt-2 text-sm text-on-surface-variant">The problem dossier could not be located.</p>
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
        <h2 className="text-xl md:text-2xl font-bold text-on-surface">Startup Mode Not Activated</h2>
        <p className="mt-2 text-xs md:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
          This problem statement does not currently have an active startup modeling canvas enabled.
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

  const availableSegments =
    problem.startupModeConfig?.targetSegments && problem.startupModeConfig.targetSegments.length > 0
      ? problem.startupModeConfig.targetSegments
      : ["Rural Clinic Admins", "Local Specialists", "EMS Providers", "Independent Pharmacists"];

  const avgWtp =
    problem.startupModeConfig?.avgWillingnessToPay ||
    problem.willingnessToPay ||
    "$150/mo per practitioner";

  const valPropPlaceholder =
    problem.startupModeConfig?.valuePropositionDraft ||
    "Draft your initial value proposition here... e.g. 'A lightweight PDF parser that categorizes incoming faxes and maps them to EHR FHIR schemas for rural clinic administrators.'";

  const solutionsGaps =
    problem.startupModeConfig?.existingSolutionsGaps &&
    problem.startupModeConfig.existingSolutionsGaps.length > 0
      ? problem.startupModeConfig.existingSolutionsGaps
      : problem.competitorData && problem.competitorData.length > 0
        ? problem.competitorData.map((c) => ({
            name: c.solution,
            description: c.pros,
            weaknessType: "Weakness",
            weakness: c.cons,
          }))
        : [
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
          ];

  const directions =
    problem.startupModeConfig?.directionsToExplore &&
    problem.startupModeConfig.directionsToExplore.length > 0
      ? problem.startupModeConfig.directionsToExplore
      : [
          {
            type: "software",
            title: "Software Approach",
            description: "Automated HL7 translation & cloud FHIR bridge.",
          },
          {
            type: "service",
            title: "Service-Based",
            description: "Managed interoperability and compliance consulting.",
          },
          {
            type: "hardware",
            title: "Hardware Approach",
            description: "Plug-and-play local edge caching appliance.",
          },
        ];

  const tamValue = problem.marketData?.tam || problem.estimatedValue || "$1.5B";
  const penetrationValue = problem.marketData?.currentPenetration || 35;

  const painScore = problem.painScore
    ? problem.painScore <= 10
      ? (problem.painScore * 10).toFixed(0)
      : problem.painScore.toFixed(0)
    : "92";
  const painDecimal = (Number(painScore) / 10).toFixed(1);

  const oppScore = problem.opportunityScore
    ? problem.opportunityScore <= 10
      ? (problem.opportunityScore * 10).toFixed(0)
      : problem.opportunityScore.toFixed(0)
    : "85";
  const oppDecimal = (Number(oppScore) / 10).toFixed(1);

  const industry = problem.industry || "Healthcare & Life Sciences";

  return (
    <div className="relative min-h-screen bg-background font-['Poppins',sans-serif] text-on-background">
      <main className="w-full">
        <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 py-8 lg:py-12 flex flex-col gap-8">
          {/* ── Breadcrumb & Back Button ──────────────────────────────────── */}
          <div className="flex flex-col gap-3">
            <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-on-surface-variant flex-wrap">
              <Link to="/explore" className="hover:text-primary transition-colors">
                Explore
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="hover:text-primary transition-colors">{industry}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to={`/problem/${problem.id}`} className="hover:text-primary transition-colors truncate max-w-[200px]">
                {problem.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-on-surface font-semibold">Startup Mode</span>
            </nav>

            <Link
              to={`/problem/${problem.id}`}
              className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-primary hover:text-primary-container transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Problem</span>
            </Link>
          </div>

          {/* ── Top Header Block ──────────────────────────────────────────── */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xs border border-outline-variant/40 p-6 lg:p-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex flex-col gap-2.5 max-w-3xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
                    {industry.split("&")[0].trim()}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    Open
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Verified
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight leading-snug">
                  {problem.title}
                </h1>
                <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-normal">
                  {problem.description}
                </p>
              </div>

              {/* Score Badges */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex flex-col items-center justify-center h-16 w-16 rounded-2xl bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 shadow-2xs">
                  <span className="text-lg font-bold leading-none">{painDecimal}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5">Pain</span>
                </div>
                <div className="flex flex-col items-center justify-center h-16 w-16 rounded-2xl bg-blue-500/10 text-blue-700 border border-blue-500/20 shadow-2xs">
                  <span className="text-lg font-bold leading-none">{oppDecimal}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5">Opp</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2-Column Grid: Main Content (2 Cols) + Sidebar (1 Col) ──── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column (Left 2/3) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* 1. Why This Could Be a Business */}
              <section className="bg-surface-container-lowest rounded-2xl shadow-2xs border border-outline-variant/40 p-6 lg:p-8 flex flex-col gap-6">
                <h2 className="text-lg md:text-xl font-bold text-on-surface">
                  Here's what the data tells us — is there a business here?
                </h2>
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex gap-4 w-full md:w-auto">
                    <div className="flex-1 min-w-[120px] bg-surface-container rounded-xl p-4 border border-outline-variant/20">
                      <span className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Pain Score
                      </span>
                      <span className="text-xl font-extrabold text-on-surface">
                        {painDecimal}
                        <span className="text-on-surface-variant text-sm font-normal">/10</span>
                      </span>
                    </div>
                    <div className="flex-1 min-w-[120px] bg-surface-container rounded-xl p-4 border border-outline-variant/20">
                      <span className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                        Opp Score
                      </span>
                      <span className="text-xl font-extrabold text-on-surface">
                        {oppDecimal}
                        <span className="text-on-surface-variant text-sm font-normal">/10</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-semibold text-on-surface">Market Penetration</span>
                      <span className="text-xs font-bold text-primary">{penetrationValue}%</span>
                    </div>
                    <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-1000"
                        style={{ width: `${penetrationValue}%` }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Who Might Pay (Target Segments) */}
              <section className="bg-surface-container-lowest rounded-2xl shadow-2xs border border-outline-variant/40 p-6 lg:p-8 flex flex-col gap-4">
                <h2 className="text-lg md:text-xl font-bold text-on-surface">
                  Which of these segments would you focus on first?
                </h2>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {availableSegments.map((seg) => {
                    const active = selectedSegments.includes(seg);
                    return (
                      <button
                        key={seg}
                        onClick={() => toggleSegment(seg)}
                        className={`px-4 py-2 rounded-full border text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                          active
                            ? "bg-primary text-white border-primary shadow-xs"
                            : "border-outline-variant/50 bg-surface text-on-surface hover:bg-surface-container"
                        }`}
                      >
                        {seg}
                        {active && <Check className="inline-block w-3.5 h-3.5 ml-1.5 stroke-[3]" />}
                      </button>
                    );
                  })}

                  {isAddingSegment ? (
                    <div className="inline-flex items-center gap-2">
                      <input
                        type="text"
                        value={customSegment}
                        onChange={(e) => setCustomSegment(e.target.value)}
                        placeholder="Segment name..."
                        className="px-3 py-1.5 rounded-full border border-primary text-xs outline-none bg-surface"
                        autoFocus
                      />
                      <button
                        onClick={handleAddCustomSegment}
                        className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingSegment(true)}
                      className="px-4 py-2 rounded-full border border-dashed border-outline-variant text-on-surface-variant text-xs md:text-sm font-semibold hover:border-primary hover:text-primary transition-colors cursor-pointer"
                    >
                      + Add Custom
                    </button>
                  )}
                </div>
              </section>

              {/* 3. What Value Could Be Provided (Value Prop) */}
              <section className="bg-surface-container-lowest rounded-2xl shadow-2xs border border-outline-variant/40 p-6 lg:p-8 flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4 flex-col sm:flex-row">
                  <h2 className="text-lg md:text-xl font-bold text-on-surface">
                    What's the smallest version of value someone would pay for here?
                  </h2>
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-xs min-w-[220px]">
                    <span className="flex items-center gap-1 font-bold text-primary mb-1">
                      <Lightbulb className="w-4 h-4" /> Insight
                    </span>
                    <p className="text-on-surface-variant font-normal">
                      Average willingness-to-pay identified: <strong className="text-on-surface font-semibold">{avgWtp}</strong>.
                    </p>
                  </div>
                </div>

                <textarea
                  value={valueProposition}
                  onChange={(e) => setValueProposition(e.target.value)}
                  className="w-full min-h-[140px] p-4 rounded-xl border border-outline-variant/40 bg-surface text-on-surface text-xs md:text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-y transition-all font-normal"
                  placeholder={valPropPlaceholder}
                />
              </section>

              {/* 4. Existing Solutions & Gaps */}
              <section className="bg-surface-container-lowest rounded-2xl shadow-2xs border border-outline-variant/40 p-6 lg:p-8 flex flex-col gap-6">
                <h2 className="text-lg md:text-xl font-bold text-on-surface">
                  Existing Solutions & Gaps
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {solutionsGaps.map((gap, idx) => (
                    <div key={idx} className="border border-outline-variant/40 rounded-xl p-4 bg-surface flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-on-surface-variant" />
                        <h3 className="text-xs md:text-sm font-bold text-on-surface">{gap.name}</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant font-normal">
                        {gap.description}
                      </p>
                      <div className="mt-auto pt-3 border-t border-outline-variant/30">
                        <span className="text-[10px] font-bold text-error uppercase tracking-wider">
                          {gap.weaknessType || "Weakness / Gap"}
                        </span>
                        <p className="text-xs text-on-surface mt-0.5 font-normal">
                          {gap.weakness}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Possible Directions to Explore */}
              <section className="bg-surface-container-lowest rounded-2xl shadow-2xs border border-outline-variant/40 p-6 lg:p-8 flex flex-col gap-6">
                <h2 className="text-lg md:text-xl font-bold text-on-surface">
                  Possible Directions to Explore
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {directions.map((dir, idx) => {
                    const isSelected = selectedDirection === dir.type || (idx === 0 && !selectedDirection);
                    const DirIcon =
                      dir.type === "software"
                        ? Code
                        : dir.type === "service"
                        ? Headphones
                        : Server;

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedDirection(dir.type)}
                        className={`border rounded-xl p-4 cursor-pointer transition-all relative overflow-hidden bg-surface ${
                          isSelected
                            ? "border-primary ring-2 ring-primary/20 shadow-xs"
                            : "border-outline-variant/40 hover:border-primary/50"
                        }`}
                      >
                        <DirIcon className="w-5 h-5 text-primary mb-2" />
                        <h3 className="text-xs md:text-sm font-bold text-on-surface">{dir.title}</h3>
                        <p className="text-xs text-on-surface-variant mt-1 font-normal leading-relaxed">
                          {dir.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Sidebar Column (Right 1/3) */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Market Snapshot */}
              <section className="bg-surface-container-lowest rounded-2xl shadow-2xs border border-outline-variant/40 p-6">
                <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-4">
                  Market Snapshot
                </h3>
                <div className="flex flex-col gap-3.5">
                  <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                    <span className="text-xs text-on-surface-variant font-medium">Total Addressable Market</span>
                    <span className="text-base font-bold text-on-surface">{tamValue}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                    <span className="text-xs text-on-surface-variant font-medium">Penetration</span>
                    <span className="text-base font-bold text-on-surface">{penetrationValue}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-on-surface-variant font-medium">Demand Signal</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                      High
                    </span>
                  </div>
                </div>
              </section>

              {/* Questions to Validate */}
              <section className="bg-surface-container-lowest rounded-2xl shadow-2xs border border-outline-variant/40 p-6">
                <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-4">
                  Questions to Validate
                </h3>
                <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={validationChecklist.talkedToUsers}
                      onChange={(e) =>
                        setValidationChecklist({
                          ...validationChecklist,
                          talkedToUsers: e.target.checked,
                        })
                      }
                      className="mt-0.5 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary"
                    />
                    <span className="text-xs md:text-sm text-on-surface font-normal group-hover:text-primary transition-colors">
                      Talked to 10 practitioners?
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={validationChecklist.paysWorkaround}
                      onChange={(e) =>
                        setValidationChecklist({
                          ...validationChecklist,
                          paysWorkaround: e.target.checked,
                        })
                      }
                      className="mt-0.5 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary"
                    />
                    <span className="text-xs md:text-sm text-on-surface font-normal group-hover:text-primary transition-colors">
                      Do they currently pay for a workaround?
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={validationChecklist.frequencyVerified}
                      onChange={(e) =>
                        setValidationChecklist({
                          ...validationChecklist,
                          frequencyVerified: e.target.checked,
                        })
                      }
                      className="mt-0.5 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary"
                    />
                    <span className="text-xs md:text-sm text-on-surface font-normal group-hover:text-primary transition-colors">
                      Frequency of occurrence verified?
                    </span>
                  </label>
                </div>
              </section>

              {/* Risks & Challenges */}
              <section className="bg-surface-container-lowest rounded-2xl shadow-2xs border border-outline-variant/40 p-6">
                <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-4">
                  Risks & Challenges
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="p-3 border border-outline-variant/30 rounded-xl bg-error-container/20 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-on-surface">Budget constraints</span>
                      <span className="text-[10px] uppercase font-bold text-error px-2 py-0.5 rounded-full bg-error/10">
                        High
                      </span>
                    </div>
                  </div>

                  <div className="p-3 border border-outline-variant/30 rounded-xl bg-surface-container flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-on-surface">Technical legacy debt</span>
                      <span className="text-[10px] uppercase font-bold text-outline px-2 py-0.5 rounded-full bg-outline/10">
                        Med
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* ── Sticky Bottom Action Bar ──────────────────────────────────── */}
        <div className="sticky bottom-0 w-full bg-surface/95 backdrop-blur-md border-t border-outline-variant/30 py-4 z-40 mt-8 shadow-md">
          <div className="max-w-[1280px] mx-auto px-4 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 order-2 sm:order-1">
              <Link
                to={`/problem/${problem.id}`}
                className="bg-surface border border-outline-variant/40 text-on-surface text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-surface-container transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Problem</span>
              </Link>

              {lastSavedTime && (
                <div className="hidden md:flex items-center gap-1.5 text-[11px] text-on-surface-variant/80 font-medium">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>
                    Saved {new Date(lastSavedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/community")}
                className="flex items-center gap-2.5 border border-outline-variant/40 bg-surface px-4 py-2 rounded-xl hover:bg-surface-container transition-colors cursor-pointer"
              >
                <div className="flex items-center -space-x-1.5">
                  <UserAvatar name="Sarah Jenkins" size="xs" />
                  <UserAvatar name="Dr Ahmed" size="xs" />
                  <div className="w-5 h-5 rounded-full border border-white bg-surface-variant flex items-center justify-center text-[9px] font-bold text-on-surface-variant">
                    +3
                  </div>
                </div>
                <span className="text-xs font-semibold text-on-surface">Find Others Interested</span>
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
                  <Save className="w-4 h-4" />
                )}
                <span>
                  {savingNotes
                    ? "Saving..."
                    : savedNotes
                    ? "Notes Saved!"
                    : "Save Notes"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
