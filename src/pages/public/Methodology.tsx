import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Scale,
  Brain,
  FileCheck2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

export const Methodology: React.FC = () => {
  const faqSchema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does Stuckhere verify real-world problem statements?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every problem statement undergoes a 10-point empirical diagnostic protocol. Submissions must prove primary documentation from clinical trials, corporate filings, regulatory audit penalties, or verified practitioner surveys demonstrating recurrent financial or operational loss.",
          },
        },
        {
          "@type": "Question",
          name: "How is the 0–100 Pain Score calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pain Score is calculated using a multi-factor heuristic: Recurrence Frequency (30%), Financial or Regulatory Severity (30%), Failure Rate of Existing Incumbent Workarounds (25%), and Urgency of Switching (15%).",
          },
        },
        {
          "@type": "Question",
          name: "How does Stuckhere estimate Total Addressable Market (TAM) for problems?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TAM is estimated using bottom-up sizing: multiplying verified total impacted organizations globally by demonstrated annual willingness-to-pay or economic inefficiency loss metrics.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Stuckhere Problem Verification & Pain Scoring Methodology",
      description:
        "The empirical 10-point diagnostic protocol, pain scoring algorithm, and market validation framework powering Stuckhere's open problem registry.",
      author: {
        "@type": "Organization",
        name: "Stuckhere Research Group",
      },
      publisher: {
        "@type": "Organization",
        name: "Stuckhere",
        url: "https://stuckhere.davns.com",
      },
      mainEntityOfPage: "https://stuckhere.davns.com/methodology",
    },
  ];

  const verificationPillars = [
    {
      number: "01",
      icon: FileCheck2,
      title: "Primary-Source Empirical Evidence",
      description:
        "We reject speculative feature requests. Submissions must link to verifiable audits, regulatory enforcement actions, clinical trial journals, financial 10-K filings, or authenticated practitioner reports proving recurrent loss.",
    },
    {
      number: "02",
      icon: Scale,
      title: "Workaround Failure Teardowns",
      description:
        "A problem only qualifies if incumbent solutions (spreadsheets, ERP plug-ins, manual labor workarounds) demonstrably fail or create downstream bottlenecks that practitioners actively hate.",
    },
    {
      number: "03",
      icon: BarChart3,
      title: "Bottom-Up Quantified Economic Drag",
      description:
        "Every dossier must model quantified unit economics: hours lost per technician weekly, percentage revenue leaked per invoice batch, or compliance fines incurred annually per operational facility.",
    },
    {
      number: "04",
      icon: Brain,
      title: "Peer & Practitioner Telemetry",
      description:
        "Problems are validated through anonymous practitioner consensus. Verified domain professionals confirm daily operational friction, willingness-to-pay thresholds, and switching urgency.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-surface font-body-md text-on-surface">
      <SEOHead
        title="Problem Verification & Pain Scoring Methodology | Stuckhere"
        description="Learn how Stuckhere evaluates, validates, and mathematically scores real-world problem statements through our 10-point empirical verification protocol."
        canonicalUrl="https://stuckhere.davns.com/methodology"
        keywords={[
          "problem verification methodology",
          "pain score calculation",
          "startup idea validation framework",
          "TAM calculation for problem statements",
          "empirical problem discovery",
          "B2B market sizing",
        ]}
        jsonLd={faqSchema}
      />

      {/* Hero Header */}
      <section className="relative w-full pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-8 border-b border-outline-variant/20 overflow-hidden bg-gradient-to-b from-surface via-surface-container-lowest/60 to-surface">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Open Intelligence Standard</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-on-surface tracking-tight leading-[1.12]">
            How We Separate Real Pain From Speculative Ideas
          </h1>

          <p className="mt-6 text-sm sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            The mathematical models, empirical diagnostic heuristics, and practitioner telemetry behind the world’s open registry of verified problem statements.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary/90 transition-all active:scale-95"
            >
              <span>Explore Verified Registry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/guides/problem-discovery-framework"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface font-semibold text-sm transition-all"
            >
              <span>Founder Discovery Guide</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            The 4 Pillars of Empirical Problem Verification
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant">
            Every statement listed in Stuckhere must satisfy all four diagnostic filters before receiving an approved status badge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {verificationPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded-md bg-primary/10">
                      Phase {pillar.number}
                    </span>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-on-surface mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mathematical Formula of Pain Score */}
      <section className="w-full bg-surface-container-lowest/80 py-16 sm:py-24 border-y border-outline-variant/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Algorithmic Indexing</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                The 0–100 Pain Score Algorithm
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Rather than relying on subjective opinions or hype, Stuckhere computes an algorithmic severity score for every bottleneck based on four weighted dimensions:
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-on-surface">
                    <strong>Recurrence Frequency (30%)</strong>: Is this an hourly crisis, weekly annoyance, or annual audit friction?
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-on-surface">
                    <strong>Direct Economic Severity (30%)</strong>: Does this cause measurable revenue loss, regulatory fines, or critical asset spoilage?
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-on-surface">
                    <strong>Workaround Failure Index (25%)</strong>: How inadequate, manual, or brittle are existing tools and spreadsheets?
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-on-surface">
                    <strong>Willingness to Pay Urgency (15%)</strong>: Do practitioners demonstrate an allocated budget and intent to deploy a solution?
                  </p>
                </div>
              </div>
            </div>

            {/* Formula Visual Box */}
            <div className="flex-1 w-full bg-surface-container rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-outline-variant/40 shadow-sm font-mono text-xs sm:text-sm">
              <div className="text-xs uppercase text-on-surface-variant font-bold tracking-widest mb-4">
                Diagnostic Formula
              </div>
              <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 text-primary font-bold leading-relaxed mb-4">
                PainScore = (0.30 × F) + (0.30 × S) + (0.25 × W) + (0.15 × U)
              </div>
              <div className="space-y-2 text-[11px] sm:text-xs text-on-surface-variant">
                <p>• <strong>F (Frequency)</strong>: Normalized daily recurrence index (1–100)</p>
                <p>• <strong>S (Severity)</strong>: Normalized revenue or compliance loss (1–100)</p>
                <p>• <strong>W (Workaround Failure)</strong>: Incumbent deficiency coefficient (1–100)</p>
                <p>• <strong>U (Urgency)</strong>: Validated willingness-to-pay velocity (1–100)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Common questions regarding our verification pipeline, TAM sizing, and scoring integrity.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
            <h3 className="text-sm sm:text-base font-bold text-on-surface mb-2">
              Who verifies community-submitted problem statements?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Submissions undergo dual verification: first by our automated 10-point diagnostic screening heuristics that filter low-context or promotional claims, followed by verification from accredited domain practitioners and moderators before publication.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
            <h3 className="text-sm sm:text-base font-bold text-on-surface mb-2">
              How is the Total Addressable Market (TAM) derived?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              We employ a bottom-up methodology. We identify the global population of exact operational roles or enterprise entities facing the friction, multiplied by the validated annual willingness-to-pay or economic waste per entity documented in the primary evidence.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
            <h3 className="text-sm sm:text-base font-bold text-on-surface mb-2">
              Can a problem's pain score change over time?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Yes. As new practitioners vote, attach evidence, or report newly released commercial solutions, the algorithmic score dynamically adjusts to reflect changing market realities and competitive saturation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-14 px-4 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Build With Verified Market Demand?
          </h2>
          <p className="text-xs sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
            Stop guessing what customers need. Explore thousands of empirical problem dossiers indexed by pain score, TAM, and founder thesis.
          </p>
          <div className="pt-2">
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
