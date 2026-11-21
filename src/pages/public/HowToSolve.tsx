import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Compass,
  Rocket,
  CheckCircle2,
  Users,
  Code2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  Zap,
  Target,
  FileCheck2,
  BarChart3,
  Flame,
  Layers,
  HelpCircle,
} from "lucide-react";

export const HowToSolve: React.FC = () => {
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Solve Problems on Stuckhere: The 5-Step Solver Roadmap",
      description:
        "The step-by-step human-centered guide for founders, hackathon participants, and engineers to build viable solutions from verified problem statements.",
      step: [
        {
          "@type": "HowToStep",
          name: "Select a High-Pain Statement (Pain Score ≥ 80)",
          text: "Filter the Stuckhere registry for validated bottlenecks with high recurrence and documented willingness-to-pay.",
        },
        {
          "@type": "HowToStep",
          name: "Deconstruct the Failed Incumbent Workaround",
          text: "Analyze why current spreadsheets, temp staff, or legacy ERP plugins fail to resolve the core friction.",
        },
        {
          "@type": "HowToStep",
          name: "Activate AI Solver Copilot & Startup Mode",
          text: "Generate technical architecture blueprints, interview scripts, and 14-day rapid prototype milestones.",
        },
        {
          "@type": "HowToStep",
          name: "Conduct Non-Leading Customer Discovery",
          text: "Interview 3 practitioners using Mom Test techniques to verify unit economics and daily operational drag.",
        },
        {
          "@type": "HowToStep",
          name: "Build and Submit Your Solution",
          text: "Publish your working prototype on the problem statement to attract enterprise pilot sponsors and early adopters.",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need to be an expert in the industry to solve a problem on Stuckhere?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Many of the most successful solutions are built by engineers and founders who bring fresh software or AI automation techniques to domain practitioners who are stuck using manual tools.",
          },
        },
        {
          "@type": "Question",
          name: "What is Startup Mode on Stuckhere?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Startup Mode is an interactive founder workspace attached to verified problems. It provides venture theses, ICP definition tools, white-space competitor teardowns, and auto-saving validation checklists.",
          },
        },
      ],
    },
  ];

  const solverSteps = [
    {
      step: "01",
      icon: Flame,
      title: "Pick a Problem with Inelastic Pain (Pain Score ≥ 80)",
      description:
        "Startups die when they solve cosmetic nuisances. On Stuckhere, every problem has an algorithmic Pain Score (0–100). Filter for problems with scores ≥ 80: these represent hourly operational drag, regulatory compliance penalties, or direct revenue leaks where buyers already have allocated budget.",
      tag: "Step 1: Selection",
      actionText: "Browse Pain Score ≥ 80",
      actionUrl: "/explore?sort=pain_score_desc",
    },
    {
      step: "02",
      icon: Layers,
      title: "Deconstruct the Broken Incumbent Workarounds",
      description:
        "Do not invent a workflow from scratch. Look at the 'Current Solution' field on the problem dossier. If they are using color-coded spreadsheets, Zapier scripts, or hiring junior contractors to manually retype invoices, that is your exact MVP blueprint. Software simply automates and secures what the spreadsheet attempted to do.",
      tag: "Step 2: Diagnosis",
      actionText: "Read Workaround Teardown Guide",
      actionUrl: "/learn/incumbent-workaround-teardown",
    },
    {
      step: "03",
      icon: Bot,
      title: "Activate the AI Solver Copilot & Startup Mode",
      description:
        "Every verified problem page features an AI Problem Solver Copilot. Open it to instantly generate a recommended tech stack (Next.js, FastAPI, Cloud Firestore, AI models), a 5-question customer interview script, and a 14-day sprint roadmap. Then open Startup Mode to customize your venture thesis and track validation milestones.",
      tag: "Step 3: Architecture",
      actionText: "Explore Startup Mode Blueprints",
      actionUrl: "/explore?filter=startup_mode",
    },
    {
      step: "04",
      icon: Users,
      title: "Shadow 3 Practitioners (The Mom Test)",
      description:
        "Never pitch your solution during discovery. Reach out to the exact job titles listed under 'Who Faces It'. Ask them: 'Walk me through the last time this broke.' 'How much time did you waste?' 'What did you pay to patch it?' If their answers confirm the metrics in the problem dossier, you have greenlit market demand.",
      tag: "Step 4: Validation",
      actionText: "View Interview Framework",
      actionUrl: "/learn/operator-shadowing-protocol",
    },
    {
      step: "05",
      icon: Rocket,
      title: "Deploy a 14-Day Prototype & Connect with Enterprises",
      description:
        "Build the single core painkiller feature in under 14 days. Connect with companies attached to the problem statement or post your solution back to the discussion thread. Solvers who publish verified prototypes receive direct pilot introductions and community backing.",
      tag: "Step 5: Launch",
      actionText: "Browse Verified Challenges",
      actionUrl: "/explore",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-surface font-body-md text-on-surface">
      <SEOHead
        title="How to Solve Problems — The Complete Solver Roadmap | Stuckhere"
        description="The human-made step-by-step guide for founders, engineers, and researchers to turn verified problem statements into viable products and enterprise pilots."
        canonicalUrl="https://stuckhere.davns.com/how-to-solve"
        keywords={[
          "how to solve problem statements",
          "startup problem solver guide",
          "hackathon solver playbook",
          "mvp development roadmap",
          "customer discovery framework",
        ]}
        jsonLd={jsonLdData}
      />

      {/* Hero Header */}
      <section className="relative w-full pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-8 border-b border-outline-variant/20 overflow-hidden bg-gradient-to-b from-surface via-surface-container-lowest/60 to-surface">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Compass className="w-3.5 h-3.5" />
            <span>Human-Centered Solver Playbook</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-on-surface tracking-tight leading-[1.12]">
            How to Build Solutions for Real-World Problems
          </h1>

          <p className="mt-6 text-sm sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Stop guessing what customers will pay for. Follow this 5-stage roadmap to transform verified industry friction into a high-growth startup or pilot contract.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explore?filter=startup_mode"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary/90 transition-all active:scale-95"
            >
              <span>Explore Solver Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface font-semibold text-sm transition-all"
            >
              <span>Visit Academy Tutorials</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The 5-Step Roadmap */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">The Solver Lifecycle</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1">
            5 Stages From Problem to First Pilot
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant">
            A practical, battle-tested framework engineered to eliminate guesswork and validate real buyer willingness-to-pay.
          </p>
        </div>

        <div className="space-y-6">
          {solverSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary/40 transition-all flex flex-col md:flex-row items-start gap-6"
              >
                <div className="flex items-center gap-4 md:flex-col md:items-center shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-xs font-mono font-bold text-outline">
                    STAGE {step.step}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                    {step.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-on-surface">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-normal">
                    {step.description}
                  </p>
                  <div className="pt-2">
                    <Link
                      to={step.actionUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      <span>{step.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Solver Tooling Ecosystem */}
      <section className="w-full bg-surface-container-lowest/80 py-16 sm:py-24 border-y border-outline-variant/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Integrated Tools</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1">
              Everything You Need to Build Fast
            </h2>
            <p className="mt-3 text-sm sm:text-base text-on-surface-variant">
              Stuckhere equips every problem statement with native solver tooling to accelerate your development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-outline-variant/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-on-surface">AI Solver Copilot</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Generates recommended tech stacks, non-leading interview scripts, and cold outreach email templates right on every problem page.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-outline-variant/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-on-surface">Interactive Startup Mode</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                A private founder workspace to draft value propositions, map competitor whitespace, and auto-sync 14-day validation milestones.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-outline-variant/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-on-surface">Enterprise Challenge Sourcing</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct connections to enterprise innovation teams, hospital networks, and national hackathon programs seeking verified prototypes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-14 px-4 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Solve Your First Problem?
          </h2>
          <p className="text-xs sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
            Choose from over 1,500+ verified problem statements across 25+ global industries.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm shadow-md hover:bg-white/95 transition-all"
            >
              <span>Explore Verified Problems</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
