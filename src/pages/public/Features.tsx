import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Compass,
  ShieldCheck,
  BarChart3,
  Rocket,
  Building2,
  Users,
  Check,
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
} from "lucide-react";

export const Features: React.FC = () => {
  const features = [
    {
      title: "Verifiable Problem Dossiers",
      tagline: "Primary-source backed operational challenges",
      description:
        "Every problem listed in the Atlas must specify a distinct trigger point, impacted role, and evidence link from clinical audits, financial filings, or domain practitioner reports.",
      benefits: [
        "10-point AI diagnostic heuristic screening",
        "Empirical references and primary documentation links",
        "Clear demarcation between real pain vs imaginary feature requests",
      ],
      exampleTitle: "Healthcare Example",
      exampleText: "Rural clinics losing 3.2 hours daily reconciling non-standardized EHR patient records across disjointed regional health systems.",
    },
    {
      title: "0–100 Pain Scoring & Sizing",
      tagline: "Mathematical prioritization of real demand",
      description:
        "Algorithmic indexing evaluating recurrence frequency, financial loss per event, and total addressable stakeholders so builders focus on high-urgency bottlenecks.",
      benefits: [
        "Objective pain score based on verified user reports",
        "Annual economic loss estimators per organization",
        "Demographic and geographic impact telemetry",
      ],
      exampleTitle: "Fintech Example",
      exampleText: "Cross-border supply chain contractors losing 4.8% of invoice values to multi-intermediary FX clearing delays.",
    },
    {
      title: "Startup Mode & Venture Thesis",
      tagline: "From raw friction to actionable MVP scope",
      description:
        "Instantly transform any problem dossier into a venture blueprint. Generates target Ideal Customer Profiles (ICP), competitor whitespace radars, and 2-week MVP boundaries.",
      benefits: [
        "Pre-structured buyer persona and willingness-to-pay profile",
        "Competitor whitespace analysis identifying unserved gaps",
        "Concrete minimum viable scope to test within 14 days",
      ],
      exampleTitle: "Venture Blueprint",
      exampleText: "Directly view existing workarounds, calculate switching hurdles, and export a 1-page executive pitch deck draft.",
    },
    {
      title: "Crowd Validation Telemetry",
      tagline: "Live practitioner voting consensus",
      description:
        "Real-time validation signals from domain specialists who experience the problem first-hand, currently pay for hacky workarounds, or are actively building solutions.",
      benefits: [
        "Role-verified practitioner votes ('I Face This Daily')",
        "Willingness-to-pay commitment tracking",
        "Community discussion threads and workaround sharing",
      ],
      exampleTitle: "Consensus Signal",
      exampleText: "94% practitioner consensus with 48 domain professionals confirming active budget allocation for solutions.",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      <SEOHead
        title="Platform Features — ProblemAtlas Problem Intelligence"
        description="Discover how ProblemAtlas structures, verifies, and quantifies real-world problems for founders, researchers, and enterprise teams."
        canonicalUrl="https://problematlas.com/features"
        ogType="website"
        keywords={["features", "problem intelligence", "startup validation tools", "pain scoring", "venture thesis builder"]}
      />

      {/* ── Top Header Section ───────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-8 pb-5 sm:pt-12 sm:pb-8 border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-primary">
            <Link to="/" className="hover:underline text-on-surface-variant">Home</Link>
            <span>/</span>
            <span className="text-on-surface font-bold">Features</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Platform Features
              </h1>
              <p className="text-on-surface-variant text-xs sm:text-sm md:text-base mt-1 sm:mt-2 max-w-2xl font-normal leading-relaxed">
                A structured problem intelligence suite designed to help innovators discover, quantify, and build solutions for genuine real-world challenges.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-primary text-white text-[11px] sm:text-xs font-bold hover:bg-primary-container shadow-sm transition-all shrink-0"
            >
              <span>Explore Problem Catalog</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Feature Cards ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-8 shadow-xs flex flex-col justify-between space-y-4 sm:space-y-6"
            >
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary">
                    {f.tagline}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-on-surface mt-0.5 sm:mt-1">
                    {f.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {f.description}
                </p>

                {/* Checklist */}
                <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                  {f.benefits.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-on-surface">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Example Box */}
              <div className="rounded-xl bg-surface-container-low/70 p-4 border border-outline-variant/20 space-y-1">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  {f.exampleTitle}
                </span>
                <p className="text-xs text-on-surface-variant italic leading-relaxed">
                  "{f.exampleText}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Callout ──────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-on-surface">Ready to explore real problem dossiers?</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">Browse verified bottlenecks across 140+ industries or submit an operational pain point.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/explore"
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-sm transition-all"
            >
              Browse Catalog
            </Link>
            <Link
              to="/submit"
              className="px-5 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-all"
            >
              Submit a Problem
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
