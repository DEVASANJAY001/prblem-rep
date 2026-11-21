import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProblemDoc } from "@/types";
import { getStartupModeUrl } from "@/lib/seoUrls";
import {
  Bot,
  Sparkles,
  Rocket,
  Code2,
  Users,
  Calendar,
  Send,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Layers,
  FileText,
} from "lucide-react";

interface SolverCopilotProps {
  problem: ProblemDoc;
}

type SolverMode = "architecture" | "interview" | "sprint" | "outreach";

export const SolverCopilot: React.FC<SolverCopilotProps> = ({ problem }) => {
  const [activeMode, setActiveMode] = useState<SolverMode>("architecture");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const industry = problem.industry || "Enterprise SaaS";
  const personas = problem.whoFacesIt || "Domain Practitioners & Operators";

  // Mode 1: Technical Architecture Blueprint
  const architectureBlueprint = {
    title: `Recommended Tech Stack for ${problem.title}`,
    description: `A battle-tested, high-speed architecture tailored for ${industry} compliance, real-time data ingestion, and rapid 14-day prototype deployment.`,
    frontend: "Next.js 15 (App Router) + Tailwind CSS + Lucide Icons for responsive high-density operator dashboards.",
    backend: "FastAPI (Python) or Node.js / Serverless Cloud Functions with bi-directional WebSockets for live status feeds.",
    database: "Cloud Firestore / Supabase (PostgreSQL) with Row-Level Security (RLS) for tenant isolation.",
    aiModel: "Claude 3.5 Sonnet / Gemini 1.5 Pro via structured JSON output for document parsing & automated triage.",
    integrations: "Custom webhook connectors & CSV/Excel auto-parsing parser to ingest existing legacy spreadsheets.",
    compliance: industry.toLowerCase().includes("health")
      ? "HIPAA BAA readiness, end-to-end encryption at rest (AES-256), and audit log telemetry."
      : "SOC2 Type II controls, RBAC session enforcement, and automated backup snapshots.",
  };

  // Mode 2: Customer Discovery Interview Script (Mom Test Framework)
  const interviewScript = [
    {
      q: `1. "Walk me through the last time you dealt with ${problem.title.toLowerCase()}."`,
      goal: "Forces them to recall concrete reality rather than giving polite theoretical opinions.",
    },
    {
      q: `2. "What was the hardest or most painful part of dealing with that?"`,
      goal: "Extracts the exact emotional and operational friction point they hate the most.",
    },
    {
      q: `3. "How are you solving or hacking around this right now?"`,
      goal: "Reveals their current workaround (spreadsheets, temp staff, Zapier, manual phone calls).",
    },
    {
      q: `4. "What happens if this isn't solved for your team over the next 6 months?"`,
      goal: "Diagnoses problem level (Nuisance vs. Direct Revenue Leak vs. Regulatory Fines).",
    },
    {
      q: `5. "Who on your team has budget authority to purchase software to fix this?"`,
      goal: "Identifies the real economic buyer vs. end-user operator.",
    },
  ];

  // Mode 3: 14-Day Rapid MVP Sprint Plan
  const sprintMilestones = [
    {
      days: "Days 1–3",
      phase: "Friction Validation & Wireframing",
      task: `Interview 3 verified ${personas}. Build a 3-screen interactive Figma prototype addressing only the single most painful bottleneck.`,
    },
    {
      days: "Days 4–8",
      phase: "Core Painkiller Development",
      task: "Develop the core automation loop: Ingest legacy data format -> Execute automated parser -> Output reconciled report. Do not build authentication or billing yet.",
    },
    {
      days: "Days 9–11",
      phase: "Operator Live Shadowing",
      task: "Have 2 practitioners test the tool on real historical dummy data. Measure time saved vs. their manual spreadsheet.",
    },
    {
      days: "Days 12–14",
      phase: "Pilot Proposal & LOI Closing",
      task: `Present results to department leadership. Request a 30-day paid sandbox pilot ($500–$2,000/mo) based on demonstrated time savings.`,
    },
  ];

  // Mode 4: Pilot Outreach Email Template
  const outreachEmail = `Subject: Quick question about ${problem.title.toLowerCase()} at {{Company}}

Hi {{FirstName}},

I noticed your team manages ${industry.toLowerCase()} operations at {{Company}}.

We recently analyzed data from over 40+ practitioners who reported losing several hours weekly due to:
"${problem.description.slice(0, 140)}..."

We've engineered a lightweight prototype designed specifically to eliminate this manual drag and prevent workflow bottlenecks.

Would you be open to a 10-minute feedback call next Tuesday? I'd love to share our benchmark data and see if our workflow matches what your operators experience.

Best regards,
{{YourName}}
Founder, Stuckhere Solver Swarm`;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const q = customPrompt.toLowerCase();
      let answer = "";
      if (q.includes("pricing") || q.includes("charge") || q.includes("cost") || q.includes("business model")) {
        answer = `💡 **Recommended Pricing Strategy for this Problem**:
Based on verified willingness-to-pay (${problem.willingnessToPay || "$500–$2,000/mo"}), adopt a value-metric model:
• **Starter Pilot**: $499/month for up to 3 operators, covering core automated ingestion.
• **Team Tier**: $1,250/month with compliance audit trails and ERP/EHR integration.
• **Enterprise**: Custom annual contract ($15,000–$35,000/yr) with dedicated SLA and custom webhook connectors.`;
      } else if (q.includes("competitor") || q.includes("existing") || q.includes("alternative")) {
        answer = `🔍 **Competitive Differentiation Angle**:
Incumbent solutions fail here because they are either:
1. Too bloated and expensive for mid-market practitioners.
2. Rely on brittle manual copy-pasting into spreadsheets.
Your competitive advantage must be **zero-friction setup**: parse their existing spreadsheet format in under 60 seconds without requiring an IT overhaul.`;
      } else {
        answer = `🎯 **Actionable Solver Strategy for "${customPrompt}"**:
1. **Focus on the Core Wedge**: Do not build a full-featured platform. Solve the exact step in the workflow where data gets stuck or corrupted.
2. **First Milestone**: Target ${personas} directly with a working loom video or 3-minute interactive demo.
3. **Pilot Conversion**: Offer a 14-day zero-risk trial using their actual historical data.`;
      }
      setCustomAnswer(answer);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="w-full rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs overflow-hidden space-y-6 p-6 sm:p-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-on-surface">
                AI Problem Solver Copilot
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Active Agent
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Automated technical blueprints, discovery interview scripts, and 14-day sprint roadmaps.
            </p>
          </div>
        </div>

        <Link
          to={getStartupModeUrl(problem)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-xs hover:bg-primary/90 transition-all shrink-0 self-start sm:self-center"
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>Open Full Startup Workspace</span>
        </Link>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/20 pb-3">
        {[
          { id: "architecture", label: "Tech Architecture", icon: Code2 },
          { id: "interview", label: "Interview Script", icon: Users },
          { id: "sprint", label: "14-Day Sprint", icon: Calendar },
          { id: "outreach", label: "Pilot Outreach Email", icon: Send },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMode(tab.id as SolverMode)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary text-on-primary shadow-xs"
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Tech Architecture Blueprint */}
      {activeMode === "architecture" && (
        <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-on-surface text-sm sm:text-base">
              {architectureBlueprint.title}
            </h4>
            <button
              onClick={() => handleCopy(JSON.stringify(architectureBlueprint, null, 2), "arch")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-medium text-on-surface transition-all"
            >
              {copiedKey === "arch" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === "arch" ? "Copied" : "Copy Blueprint"}</span>
            </button>
          </div>

          <p className="text-on-surface-variant leading-relaxed">
            {architectureBlueprint.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 space-y-1.5">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                Frontend & UI Stack
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {architectureBlueprint.frontend}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 space-y-1.5">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                Backend API & Queues
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {architectureBlueprint.backend}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 space-y-1.5">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                Database & Security RLS
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {architectureBlueprint.database}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 space-y-1.5">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                AI / Automated Parsing Pipeline
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {architectureBlueprint.aiModel}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 text-xs space-y-1">
            <span className="font-bold text-on-surface flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Compliance & Security Requirement:</span>
            </span>
            <p className="text-on-surface-variant leading-relaxed">
              {architectureBlueprint.compliance}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Customer Discovery Interview Script */}
      {activeMode === "interview" && (
        <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-on-surface text-sm sm:text-base">
                Customer Discovery Script (The Mom Test)
              </h4>
              <p className="text-xs text-on-surface-variant">
                Targeting: <strong className="text-on-surface">{personas}</strong>
              </p>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  interviewScript.map((s) => `${s.q}\n(Goal: ${s.goal})`).join("\n\n"),
                  "interview"
                )
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-medium text-on-surface transition-all"
            >
              {copiedKey === "interview" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === "interview" ? "Copied" : "Copy Questions"}</span>
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {interviewScript.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface border border-outline-variant/30 space-y-1">
                <p className="font-bold text-on-surface text-xs sm:text-sm">
                  {item.q}
                </p>
                <p className="text-[11px] text-primary font-medium">
                  🎯 Purpose: {item.goal}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: 14-Day Sprint Roadmap */}
      {activeMode === "sprint" && (
        <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-on-surface text-sm sm:text-base">
              14-Day Rapid Prototype Sprint
            </h4>
            <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
              Zero-to-Pilot
            </span>
          </div>

          <div className="space-y-3">
            {sprintMilestones.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surface border border-outline-variant/30 flex items-start gap-4">
                <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold shrink-0">
                  {m.days}
                </span>
                <div className="flex-1 space-y-0.5">
                  <h5 className="font-bold text-on-surface text-xs sm:text-sm">
                    {m.phase}
                  </h5>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {m.task}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Pilot Outreach Email */}
      {activeMode === "outreach" && (
        <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-on-surface text-sm sm:text-base">
              Cold Pilot Proposal Email
            </h4>
            <button
              onClick={() => handleCopy(outreachEmail, "outreach")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-medium text-on-surface transition-all"
            >
              {copiedKey === "outreach" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === "outreach" ? "Copied" : "Copy Email"}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 font-mono text-xs whitespace-pre-line leading-relaxed text-on-surface">
            {outreachEmail}
          </div>
        </div>
      )}

      {/* Interactive Custom Question Bar */}
      <div className="pt-4 border-t border-outline-variant/20 space-y-3">
        <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask Copilot: e.g. How should I price this? What are the biggest competitor flaws?"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-surface text-xs text-on-surface placeholder:text-outline border border-outline-variant/30 focus:outline-none focus:border-primary transition-all"
          />
          <button
            type="submit"
            disabled={isGenerating || !customPrompt.trim()}
            className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-xs hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-1.5 shrink-0"
          >
            <span>{isGenerating ? "Analyzing..." : "Ask Agent"}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Question Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-outline">Quick Prompts:</span>
          {[
            "What business model works best?",
            "How do I beat existing spreadsheets?",
            "What compliance gotchas should I avoid?",
          ].map((promptText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCustomPrompt(promptText);
              }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-primary transition-all"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Custom Answer Output */}
        {customAnswer && (
          <div className="p-4 rounded-xl bg-surface border border-primary/30 text-xs sm:text-sm space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Solver Intelligence Response</span>
            </div>
            <div className="text-on-surface-variant whitespace-pre-line leading-relaxed">
              {customAnswer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
