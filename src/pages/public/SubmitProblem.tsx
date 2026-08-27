import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { createProblem } from "@/lib/firebase/services/problemsService";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import confetti from "canvas-confetti";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  FileText,
  Building,
  Users,
  DollarSign,
  ShieldCheck,
  Search,
  TrendingUp,
  Sparkles,
  Plus,
  X,
  ExternalLink,
} from "lucide-react";
import { ProblemSeverity } from "@/types";

export const SubmitProblem: React.FC = () => {
  const navigate = useNavigate();
  const { user, userDoc } = useAuth();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Step 1: Core Problem & Operational Narrative
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("Healthcare & Biotech");
  const [severity, setSeverity] = useState<ProblemSeverity>("major");
  const [location, setLocation] = useState("Global");
  const [whenItHappens, setWhenItHappens] = useState("");
  const [whoFacesIt, setWhoFacesIt] = useState("");
  const [whyFrustrating, setWhyFrustrating] = useState("");
  const [currentSolution, setCurrentSolution] = useState("");

  // Step 2: Market Size & Financial Impact
  const [tam, setTam] = useState("$1.0B");
  const [currentPenetration, setCurrentPenetration] = useState(25);
  const [wastedCost, setWastedCost] = useState("$250M");
  const [citizensAffected, setCitizensAffected] = useState("5M+");
  const [audienceSize, setAudienceSize] = useState("");
  const [willingnessToPay, setWillingnessToPay] = useState("");

  // Step 3: Evidence, Research & Competitors
  const [evidenceDocuments, setEvidenceDocuments] = useState<
    { title: string; size: string; pages: string; url: string; type: "pdf" | "link" }[]
  >([]);
  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [dataPoints, setDataPoints] = useState<{ metric: string; label: string }[]>([
    { metric: "60%", label: "Affected teams experiencing operational delay" },
  ]);
  const [keyFindings, setKeyFindings] = useState<string[]>([
    "Current legacy systems lack interoperable APIs and create severe bottlenecks.",
  ]);
  const [researchMethodology, setResearchMethodology] = useState("");
  const [academicReferences, setAcademicReferences] = useState<string[]>([]);
  const [newRef, setNewRef] = useState("");
  const [competitors, setCompetitors] = useState<{ solution: string; pros: string; cons: string }[]>([]);

  // Step 4: Suggested MVP
  const [mvpFeatures, setMvpFeatures] = useState<string[]>([
    "Unified integration bridge with automated format normalizer.",
    "Real-time diagnostic alerts and audit logs.",
  ]);
  const [technicalRequirements, setTechnicalRequirements] = useState("");

  const [submittedProblemId, setSubmittedProblemId] = useState<string | null>(null);

  const handleAddDoc = () => {
    setEvidenceDocuments([
      ...evidenceDocuments,
      { title: "Supporting Report", size: "2.0 MB", pages: "10 pages", url: "https://", type: "pdf" },
    ]);
  };

  const handleAddCompetitor = () => {
    setCompetitors([
      ...competitors,
      { solution: "Legacy incumbent tool", pros: "Wide market brand recognition", cons: "Prohibitively expensive and siloed" },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please provide at least a title and core issue description.");
      return;
    }

    setSubmitting(true);
    const result = await createProblem({
      title: title.trim(),
      description: description.trim(),
      industry,
      severity,
      submittedByUid: userDoc?.uid || user?.uid || "anon_" + Date.now(),
      submittedByName: userDoc?.name || user?.displayName || "Anonymous Scout",
      location,
      whenItHappens,
      whoFacesIt,
      whyFrustrating,
      currentSolution,
      audienceSize,
      willingnessToPay,
      estimatedValue: tam,
      marketData: {
        tam,
        currentPenetration: Number(currentPenetration),
        wastedCost,
        citizensAffected,
      },
      evidenceDocuments,
      evidenceUrls: newUrl ? [...evidenceUrls, newUrl] : evidenceUrls,
      dataPoints,
      researchData: {
        keyFindings,
        methodology: researchMethodology,
        academicReferences: newRef ? [...academicReferences, newRef] : academicReferences,
      },
      competitorData: competitors,
      suggestedMVP: {
        coreFeatures: mvpFeatures,
        technicalRequirements,
      },
    });

    setSubmitting(false);
    setSubmittedProblemId(result.problemId);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
  };

  // ── Confirmation Screen ──────────────────────────────────────────────
  if (submittedProblemId) {
    return (
      <div className="flex flex-col w-full items-center justify-center min-h-[calc(100vh-16rem)] py-16 px-4 font-['Poppins',sans-serif] text-on-surface">
        <div className="bg-surface-container-lowest rounded-2xl w-full max-w-[500px] p-8 shadow-xl flex flex-col items-center gap-6 overflow-hidden border border-outline-variant/30 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="h-8 w-8" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-2xl font-black text-on-surface">
              Problem Statement Submitted!
            </h1>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your problem statement has been submitted to the Admin Review Queue with live 10-point AI diagnostics. You can track status or make updates in your Dashboard.
            </p>
          </div>

          {/* Details Card */}
          <div className="w-full bg-surface-container-low rounded-xl p-4 flex flex-col gap-2 text-left border border-outline-variant/30">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-primary font-mono">ID: {submittedProblemId}</span>
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px]">
                Pending Admin Review
              </span>
            </div>
            <p className="text-xs font-bold text-on-surface line-clamp-2 mt-1">{title}</p>
            <span className="text-[11px] text-gray-500">{industry} · {severity} severity</span>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-3 mt-1">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-primary text-white py-2.5 px-4 rounded-xl text-xs font-bold hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
            >
              Go to My Submissions
            </button>
            <button
              onClick={() => {
                setSubmittedProblemId(null);
                setStep(1);
                setTitle("");
                setDescription("");
              }}
              className="flex-1 bg-surface-container text-on-surface border border-outline-variant/30 py-2.5 px-4 rounded-xl text-xs font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Submit Another
            </button>
          </div>

          <Link to="/explore" className="text-xs font-bold text-primary hover:underline">
            Back to Explore Problems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-surface py-12 md:py-16 px-4 font-['Poppins',sans-serif] text-on-surface">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
        {/* Wizard Header & Progress Bar */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-bold text-outline uppercase tracking-wider">
            <span>Submit a Verified Problem Statement</span>
            <span>Step {step} of 4</span>
          </div>

          {/* Stepper Bar */}
          <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden flex">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Step Labels */}
          <div className="flex justify-between text-xs font-bold text-on-surface-variant px-1 pt-1">
            <button onClick={() => setStep(1)} className={`cursor-pointer ${step === 1 ? "text-primary font-bold" : "opacity-60"}`}>
              1. Core & Narrative
            </button>
            <button onClick={() => setStep(2)} className={`cursor-pointer ${step === 2 ? "text-primary font-bold" : "opacity-60"}`}>
              2. Market & Impact
            </button>
            <button onClick={() => setStep(3)} className={`cursor-pointer ${step === 3 ? "text-primary font-bold" : "opacity-60"}`}>
              3. Evidence & Research
            </button>
            <button onClick={() => setStep(4)} className={`cursor-pointer ${step === 4 ? "text-primary font-bold" : "opacity-60"}`}>
              4. Suggested MVP
            </button>
          </div>
        </div>

        {/* Wizard Form Container */}
        <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 md:p-10 flex flex-col gap-6 border border-outline-variant/30">
          {/* ── STEP 1: Core Problem & Operational Narrative ───────────────── */}
          {step === 1 && (
            <div className="flex flex-col gap-5 animate-fade-in">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg md:text-xl font-black text-on-surface">
                  1. Problem Overview & Operational Context
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Describe the exact operational friction, stakeholders affected, and why existing solutions fail.
                </p>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Problem Title <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Fragmented patient medical records across incompatible EHR architectures"
                  className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Core Issue Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Core Issue Summary <span className="text-error">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the fundamental bottleneck and its negative consequences..."
                  className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Industry, Severity & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Industry</label>
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
                  </select>
                </div>

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
                  <label className="text-xs font-bold text-on-surface">Geographic Scope</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. North America, Global"
                    className="bg-surface-container-low rounded-xl px-3 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Operational Narrative */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-outline-variant/20">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">When It Happens</label>
                  <input
                    type="text"
                    value={whenItHappens}
                    onChange={(e) => setWhenItHappens(e.target.value)}
                    placeholder="e.g. When patients are transferred between regional health systems..."
                    className="bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Who Faces It</label>
                  <input
                    type="text"
                    value={whoFacesIt}
                    onChange={(e) => setWhoFacesIt(e.target.value)}
                    placeholder="e.g. ER physicians, trauma surgeons, clinical nurses..."
                    className="bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Why It's Frustrating</label>
                  <textarea
                    rows={2}
                    value={whyFrustrating}
                    onChange={(e) => setWhyFrustrating(e.target.value)}
                    placeholder="Explain why current proprietary paywalls or manual methods cause catastrophic friction..."
                    className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Current Solutions / Workarounds</label>
                  <textarea
                    rows={2}
                    value={currentSolution}
                    onChange={(e) => setCurrentSolution(e.target.value)}
                    placeholder="e.g. Hospital staff faxing paper charts or relying on patient memory..."
                    className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Market Size & Financial Impact ─────────────────────── */}
          {step === 2 && (
            <div className="flex flex-col gap-5 animate-fade-in">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg md:text-xl font-black text-on-surface">
                  2. Market Size & Financial Impact
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Quantify the economic waste, total market size, and willingness to pay.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Total Addressable Market (TAM)</label>
                  <input
                    type="text"
                    value={tam}
                    onChange={(e) => setTam(e.target.value)}
                    placeholder="e.g. $14.2B"
                    className="bg-surface-container-low rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Annual Wasted Cost</label>
                  <input
                    type="text"
                    value={wastedCost}
                    onChange={(e) => setWastedCost(e.target.value)}
                    placeholder="e.g. $500M"
                    className="bg-surface-container-low rounded-xl px-3 py-2.5 text-xs font-bold text-error outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Citizens / People Affected</label>
                  <input
                    type="text"
                    value={citizensAffected}
                    onChange={(e) => setCitizensAffected(e.target.value)}
                    placeholder="e.g. 10M+"
                    className="bg-surface-container-low rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Estimated Market Penetration (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={currentPenetration}
                    onChange={(e) => setCurrentPenetration(Number(e.target.value))}
                    className="bg-surface-container-low rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Audience Size Description</label>
                  <input
                    type="text"
                    value={audienceSize}
                    onChange={(e) => setAudienceSize(e.target.value)}
                    placeholder="e.g. 6,200+ hospitals and 1.2M emergency physicians globally"
                    className="bg-surface-container-low rounded-xl px-3 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Willingness to Pay</label>
                  <input
                    type="text"
                    value={willingnessToPay}
                    onChange={(e) => setWillingnessToPay(e.target.value)}
                    placeholder="e.g. $15,000 - $80,000/yr per hospital facility"
                    className="bg-surface-container-low rounded-xl px-3 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Evidence, Research & Competitors ───────────────────── */}
          {step === 3 && (
            <div className="flex flex-col gap-5 animate-fade-in">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg md:text-xl font-black text-on-surface">
                  3. Evidence, Research & Competitor Landscape
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Add supporting evidence links, key research findings, and existing alternative solutions.
                </p>
              </div>

              {/* Supporting Document Repeater */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Supporting Documents ({evidenceDocuments.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddDoc}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Document
                  </button>
                </div>

                {evidenceDocuments.map((doc, idx) => (
                  <div key={idx} className="p-3 bg-surface-container-low rounded-xl flex items-center gap-3">
                    <input
                      type="text"
                      value={doc.title}
                      onChange={(e) => {
                        const copy = [...evidenceDocuments];
                        copy[idx].title = e.target.value;
                        setEvidenceDocuments(copy);
                      }}
                      placeholder="Document Title"
                      className="flex-1 bg-surface-container rounded-lg px-3 py-1.5 text-xs text-on-surface"
                    />
                    <input
                      type="text"
                      value={doc.url}
                      onChange={(e) => {
                        const copy = [...evidenceDocuments];
                        copy[idx].url = e.target.value;
                        setEvidenceDocuments(copy);
                      }}
                      placeholder="https://..."
                      className="flex-1 bg-surface-container rounded-lg px-3 py-1.5 text-xs text-on-surface"
                    />
                    <button
                      type="button"
                      onClick={() => setEvidenceDocuments(evidenceDocuments.filter((_, i) => i !== idx))}
                      className="text-gray-400 hover:text-error"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Evidence URL Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">External Evidence URL</label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://www.healthit.gov/topic/interoperability"
                  className="bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Methodology */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Research Methodology</label>
                <textarea
                  rows={2}
                  value={researchMethodology}
                  onChange={(e) => setResearchMethodology(e.target.value)}
                  placeholder="e.g. Interviews with 45 hospital IT directors across 6 states..."
                  className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Competitors List */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Competitor Solutions ({competitors.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCompetitor}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Competitor
                  </button>
                </div>

                {competitors.map((comp, idx) => (
                  <div key={idx} className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-2 relative">
                    <button
                      type="button"
                      onClick={() => setCompetitors(competitors.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 text-gray-400 hover:text-error"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      value={comp.solution}
                      onChange={(e) => {
                        const copy = [...competitors];
                        copy[idx].solution = e.target.value;
                        setCompetitors(copy);
                      }}
                      placeholder="Solution name (e.g. Epic Care Everywhere)"
                      className="bg-surface-container rounded-lg px-3 py-1.5 text-xs font-bold text-on-surface"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={comp.pros}
                        onChange={(e) => {
                          const copy = [...competitors];
                          copy[idx].pros = e.target.value;
                          setCompetitors(copy);
                        }}
                        placeholder="Pros..."
                        className="bg-surface-container rounded-lg px-3 py-1 text-xs text-secondary"
                      />
                      <input
                        type="text"
                        value={comp.cons}
                        onChange={(e) => {
                          const copy = [...competitors];
                          copy[idx].cons = e.target.value;
                          setCompetitors(copy);
                        }}
                        placeholder="Cons..."
                        className="bg-surface-container rounded-lg px-3 py-1 text-xs text-error"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 4: Suggested MVP & Final Review ───────────────────────── */}
          {step === 4 && (
            <div className="flex flex-col gap-5 animate-fade-in">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg md:text-xl font-black text-on-surface">
                  4. Suggested MVP & Compliance
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Outline what a minimal viable solution needs to prove initial traction.
                </p>
              </div>

              {/* Core MVP Features */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Core MVP Features ({mvpFeatures.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setMvpFeatures([...mvpFeatures, "New core feature module..."])}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
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

              {/* Technical Requirements */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Technical Architecture & Compliance Requirements
                </label>
                <textarea
                  rows={3}
                  value={technicalRequirements}
                  onChange={(e) => setTechnicalRequirements(e.target.value)}
                  placeholder="e.g. HIPAA BAA readiness, HL7 FHIR API v4 conformance, SOC2 Type II..."
                  className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Pre-Submission Summary Review */}
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex flex-col gap-2 mt-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Submission Summary Preview
                </span>
                <p className="text-xs font-bold text-on-surface">{title || "Untitled Problem Statement"}</p>
                <span className="text-[11px] text-on-surface-variant">
                  {industry} · {severity} severity · TAM: {tam} · Wasted Cost: {wastedCost}
                </span>
              </div>
            </div>
          )}

          {/* Navigation & Submit Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <Link
                to="/explore"
                className="text-xs font-bold text-on-surface-variant hover:text-on-surface"
              >
                Cancel
              </Link>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-2.5 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{submitting ? "Submitting..." : "Submit Problem Statement"}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
