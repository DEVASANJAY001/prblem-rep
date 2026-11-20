import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Compass,
  CheckCircle2,
  AlertOctagon,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Flame,
  Zap,
  DollarSign,
  FileSearch,
  Users,
  Layers,
  Sparkles,
} from "lucide-react";

export const ProblemDiscoveryGuide: React.FC = () => {
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "The Problem Discovery Framework for Founders (From Friction to First Revenue)",
      description:
        "A comprehensive guide for early-stage founders to identify, validate, and verify high-severity B2B and consumer problems before writing a single line of code.",
      author: {
        "@type": "Organization",
        name: "Stuckhere Research Group",
      },
      publisher: {
        "@type": "Organization",
        name: "Stuckhere",
        url: "https://stuckhere.davns.com",
      },
      mainEntityOfPage: "https://stuckhere.davns.com/guides/problem-discovery-framework",
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Discover and Validate Real Market Problems",
      description:
        "Step-by-step diagnostic framework to evaluate whether a problem has commercial willingness-to-pay.",
      step: [
        {
          "@type": "HowToStep",
          name: "Identify Workflow Drag and Broken Workarounds",
          text: "Shadow end-users to identify where spreadsheets, copy-paste routines, and manual email threads patch broken software.",
        },
        {
          "@type": "HowToStep",
          name: "Extract Empirical Evidence of Loss",
          text: "Quantify dollar leakage, regulatory compliance risk, or labor hours wasted per billing cycle.",
        },
        {
          "@type": "HowToStep",
          name: "Audit Incumbent Solution Failures",
          text: "Analyze why current enterprise ERPs, SaaS tools, or internal custom tools leave the problem unsolved.",
        },
        {
          "@type": "HowToStep",
          name: "Execute Willingness-to-Pay Testing",
          text: "Secure signed letters of intent (LOIs), pilot deposit agreements, or pre-orders before engineering product architecture.",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the primary reason early-stage startups fail?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "According to CB Insights historical startup autopsies, 42% of failed startups cite 'No Market Need' as the number one cause of failure — solving problems that users do not care enough or have no budget to pay for.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between a Vitamin, Painkiller, and Surgery problem?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Vitamins are 'nice-to-have' productivity enhancements with high churn. Painkillers alleviate immediate, recurrent operational friction with clear ROI. Surgery problems address mission-critical compliance, security, or direct revenue leakage where failure threatens the organization's existence.",
          },
        },
      ],
    },
  ];

  const severityLevels = [
    {
      level: "Level 1",
      name: "Nuisance / Cosmetic Drag",
      description: "Minor visual or subjective inconvenience. Users complain, but nobody pays to fix it.",
      badge: "Avoid (Low TAM)",
      badgeColor: "bg-surface-container text-on-surface-variant",
    },
    {
      level: "Level 2",
      name: "Repetitive Workflow Friction",
      description: "Hours wasted every week on manual data transfer, spreadsheet stitching, or duplicate entry.",
      badge: "SaaS Opportunity",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    },
    {
      level: "Level 3",
      name: "Compliance & Regulatory Risk",
      description: "Failing audit requirements, HIPAA/GDPR violations, or statutory reporting fines.",
      badge: "High Urgency",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    },
    {
      level: "Level 4",
      name: "Quantifiable Direct Revenue Leak",
      description: "Dropped shopping carts, billing discrepancy leakage, delayed customer onboarding invoices.",
      badge: "Definite WTP",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    },
    {
      level: "Level 5",
      name: "Existential / System Outage Risk",
      description: "Unplanned factory downtime, cold-chain pharmaceutical spoilage, cybersecurity breaches.",
      badge: "Surgery Tier",
      badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
    },
  ];

  const validationLadder = [
    {
      step: "01",
      icon: Users,
      title: "Shadow the Operator, Not the Executive",
      description:
        "Executives purchase software based on marketing claims; operators live with the real friction. Shadow nurses, logistics dispatchers, accountants, and engineers during their peak hour of stress. Look for what they print out, write on Post-it notes, or copy into Excel.",
    },
    {
      step: "02",
      icon: FileSearch,
      title: "Collect Empirical Evidence of Economic Loss",
      description:
        "Anecdotes do not constitute validation. Extract real metrics: 'We lose 14 hours per technician per week reconciling part numbers' or 'We incurred $42,000 in demurrage penalties last quarter due to container misrouting.'",
    },
    {
      step: "03",
      icon: Layers,
      title: "Map the Broken Incumbent Workarounds",
      description:
        "If they are not actively trying to solve the problem today using spreadsheets, Zapier scripts, or hiring junior temp staff, the pain is not severe enough. The existence of a painful, hacked-together workaround is the greatest indicator of market demand.",
    },
    {
      step: "04",
      icon: DollarSign,
      title: "Test Willingness to Pay Before Code",
      description:
        "Never accept 'That sounds like a great idea!' as customer validation. Test commercial reality with a non-binding Letter of Intent (LOI), a refundable pilot deposit, or access to historical invoice logs for an initial audit.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-surface font-body-md text-on-surface">
      <SEOHead
        title="The Problem Discovery Framework for Founders | Stuckhere"
        description="The definitive guide for founders to discover, validate, and mathematically score real-world B2B and enterprise problems before writing code."
        canonicalUrl="https://stuckhere.davns.com/guides/problem-discovery-framework"
        keywords={[
          "problem discovery framework",
          "startup idea validation",
          "how to find startup problems to solve",
          "vitamin vs painkiller vs surgery",
          "b2b customer discovery",
          "startup willingness to pay",
        ]}
        jsonLd={jsonLdData}
      />

      {/* Hero Section */}
      <section className="relative w-full pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-8 border-b border-outline-variant/20 overflow-hidden bg-gradient-to-b from-surface via-surface-container-lowest/60 to-surface">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Compass className="w-3.5 h-3.5" />
            <span>Founder Validation Playbook</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-on-surface tracking-tight leading-[1.12]">
            From Friction to First Revenue: The Problem Discovery Guide
          </h1>

          <p className="mt-6 text-sm sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            The definitive blueprint for early-stage builders. Learn how to identify severe industry bottlenecks, reject false positive customer interviews, and validate commercial willingness-to-pay.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explore?filter=startup_mode"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary/90 transition-all active:scale-95"
            >
              <span>Browse Startup Blueprints</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/methodology"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface font-semibold text-sm transition-all"
            >
              <span>View Verification Algorithm</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CB Insights Reality Check Callout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 -mt-6 relative z-20">
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-md flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
            <AlertOctagon className="w-7 h-7 text-rose-500" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">The 42% Reality</span>
            <h3 className="text-lg sm:text-xl font-extrabold text-on-surface mt-1">
              "Building Something Nobody Wants" is Still the #1 Cause of Death
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              Founders frequently fall in love with a solution or a novel technology (AI, blockchain, mobile app) before verifying if the target customer experiences severe, budget-authorized pain. True startup velocity begins with painful, recurrent industry friction.
            </p>
          </div>
        </div>
      </section>

      {/* The 5 Levels of Problem Severity */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            The 5 Levels of Problem Severity
          </h2>
          <p className="mt-3 text-sm text-on-surface-variant">
            Not all problems are worth building for. Classify the severity of the bottleneck to determine its pricing power and switching velocity.
          </p>
        </div>

        <div className="space-y-4">
          {severityLevels.map((item) => (
            <div
              key={item.level}
              className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded-md bg-primary/10 shrink-0 mt-0.5">
                  {item.level}
                </span>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-on-surface">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full self-start md:self-center shrink-0 ${item.badgeColor}`}>
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* The 4-Step Validation Ladder */}
      <section className="w-full bg-surface-container-lowest/80 py-16 sm:py-24 border-y border-outline-variant/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Methodology</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1">
              The 4-Step Problem Validation Ladder
            </h2>
            <p className="mt-3 text-sm sm:text-base text-on-surface-variant">
              Follow this rigorous progression before deploying capital, hiring developers, or drafting patent applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {validationLadder.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-6 sm:p-8 rounded-2xl bg-surface border border-outline-variant/30 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded-md bg-primary/10">
                        Step {step.step}
                      </span>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-on-surface mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vitamin vs Painkiller vs Surgery Comparison */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Vitamin vs. Painkiller vs. Surgery
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Why product classification dictates your sales cycle, customer acquisition cost, and retention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vitamin */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-on-surface-variant" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-1">Vitamin (Nice-to-Have)</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              "It would be nice if our dashboard had better dark mode themes."
            </p>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>• Low willingness to pay</li>
              <li>• Discretionary budget; cut first in downturns</li>
              <li>• High churn rate (&gt;3% monthly)</li>
              <li>• Difficult B2B enterprise procurement</li>
            </ul>
          </div>

          {/* Painkiller */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-primary/40 shadow-xs relative">
            <span className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider">
              Optimal
            </span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-1">Painkiller (Workflow Fix)</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              "Our operations team spends 30 hours a week reconciling carrier freight bills."
            </p>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>• Direct operational labor savings (ROI &gt; 5x)</li>
              <li>• Strong internal champion among practitioners</li>
              <li>• 30–60 day sales cycle</li>
              <li>• Low churn (&lt;1% monthly)</li>
            </ul>
          </div>

          {/* Surgery */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-rose-500/30">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4">
              <Flame className="w-5 h-5 text-rose-500" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-1">Surgery (Existential)</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              "If we fail this ISO audit next month, our manufacturing license will be suspended."
            </p>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>• Executive board-level budget authorization</li>
              <li>• Inelastic pricing power</li>
              <li>• Immediate switching urgency</li>
              <li>• Very sticky multi-year contracts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-14 px-4 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Stop Guessing. Build for Verified Demand.
          </h2>
          <p className="text-xs sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
            Stuckhere tracks thousands of verified industry bottlenecks with documented pain severity scores, TAM estimates, and practitioner evidence.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm shadow-md hover:bg-white/95 transition-all"
            >
              <span>Explore Problem Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};