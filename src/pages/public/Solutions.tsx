import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Rocket,
  TrendingUp,
  Building2,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const Solutions: React.FC = () => {
  const solutions = [
    {
      id: "founders",
      icon: Rocket,
      title: "For Early-Stage Founders & Solvers",
      subtitle: "Stop building products looking for problems. Start with verified demand.",
      description:
        "Building a startup takes years of your life. ProblemAtlas helps you start with a verified, quantified bottleneck where customers already feel intense friction and have demonstrated budget for solutions.",
      benefits: [
        "Discover real problems with verified buyer willingness-to-pay signals",
        "Pre-calculated Total Addressable Market (TAM) and economic loss metrics",
        "Competitor whitespace analysis revealing what existing tools miss",
        "Interactive Startup Mode canvas for rapid 14-day MVP scoping",
      ],
      ctaText: "Browse Problem Catalog",
      ctaLink: "/explore",
    },
    {
      id: "investors",
      icon: TrendingUp,
      title: "For Venture Capital & Accelerators",
      subtitle: "Validate market urgency with empirical telemetry before deploying capital.",
      description:
        "Evaluate pitch decks against live practitioner consensus. Confirm whether a founder's thesis addresses a critical daily bleeding point or a low-urgency 'nice-to-have' feature.",
      benefits: [
        "Objective 0–100 pain severity scoring across 140+ verticals",
        "Live telemetry on user recurrence frequency and daily operational drag",
        "Macro industry friction maps identifying emerging white-space categories",
        "Real-time validation votes from verified industry practitioners",
      ],
      ctaText: "Explore Industry Maps",
      ctaLink: "/industries",
    },
    {
      id: "enterprises",
      icon: Building2,
      title: "For Enterprise & Health Systems",
      subtitle: "Surface internal friction and scout targeted commercial solutions.",
      description:
        "Document complex operational bottlenecks across departments. Connect with specialized engineering teams and venture-backed startups ready to deploy custom pilots.",
      benefits: [
        "Standardized 10-point problem dossier framework for internal teams",
        "Confidential or public problem distribution to global solver networks",
        "Direct connection to founders building solutions in your sector",
        "Continuous practitioner telemetry on workflow bottlenecks",
      ],
      ctaText: "Get in Touch with Our Team",
      ctaLink: "/contact",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      <SEOHead
        title="Solutions — Problem Intelligence for Founders, VCs & Enterprise"
        description="Explore ProblemAtlas solutions for early-stage founders, venture investors, and enterprise innovation teams."
        canonicalUrl="https://problematlas.com/solutions"
        ogType="website"
        keywords={["solutions", "startup ideation", "venture validation", "enterprise problem scouting", "pain score analysis"]}
      />

      {/* ── Top Header Section ───────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-8 pb-5 sm:pt-12 sm:pb-8 border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-primary">
            <Link to="/" className="hover:underline text-on-surface-variant">Home</Link>
            <span>/</span>
            <span className="text-on-surface font-bold">Solutions</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Tailored Solutions
              </h1>
              <p className="text-on-surface-variant text-xs sm:text-sm md:text-base mt-1 sm:mt-2 max-w-2xl font-normal leading-relaxed">
                Whether you are founding your next company, evaluating market opportunities, or mapping enterprise bottlenecks, ProblemAtlas provides actionable problem intelligence.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-primary text-white text-[11px] sm:text-xs font-bold hover:bg-primary-container shadow-sm transition-all shrink-0"
            >
              <span>Explore The Atlas</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Solutions Cards ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-8 shadow-xs flex flex-col justify-between space-y-4 sm:space-y-6"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-on-surface">
                      {s.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-medium text-primary mt-0.5 sm:mt-1">
                      {s.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {s.description}
                  </p>

                  <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                    {s.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-on-surface">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/20">
                  <Link
                    to={s.ctaLink}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-xs transition-all w-full justify-center"
                  >
                    <span>{s.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
