import React from "react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";
import { ShieldCheck, Check, ArrowRight, Sparkles, Compass, Users, Target } from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";

export const About: React.FC = () => {
  const { getField, loading } = usePageContent("about");
  const headline = getField("mission", "mission_headline", "Mapping the World's Unsolved Problems");
  const body = getField(
    "mission",
    "mission_body",
    "ProblemAtlas is dedicated to accelerating human progress by categorizing, quantifying, and distributing the most urgent real-world problems to founders, researchers, and builders."
  );

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      {/* SEO: AboutPage + Organization schema */}
      <SEOHead
        title="About ProblemAtlas — Mapping the World's Unsolved Problems"
        description="ProblemAtlas is dedicated to accelerating human progress by categorizing, quantifying, and distributing the most urgent real-world problems to founders, researchers, and builders."
        canonicalUrl="https://problematlas.com/about"
        ogType="website"
        keywords={["about problematlas", "problem intelligence", "startup incubator", "open problem registry", "innovation framework"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About ProblemAtlas",
          "description": "ProblemAtlas is the open problem intelligence platform categorizing and quantifying real-world problems for founders and researchers.",
          "url": "https://problematlas.com/about",
          "mainEntity": {
            "@type": "Organization",
            "name": "ProblemAtlas",
            "url": "https://problematlas.com",
            "description": "Open problem intelligence platform.",
            "founder": {
              "@type": "Organization",
              "name": "ProblemAtlas Core Team"
            }
          }
        }}
      />

      {/* ── Top Header Section ───────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-8 pb-5 sm:pt-12 sm:pb-8 border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-primary">
            <Link to="/" className="hover:underline text-on-surface-variant">Home</Link>
            <span>/</span>
            <span className="text-on-surface font-bold">About Us</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                {loading ? "About ProblemAtlas" : headline}
              </h1>
              <p className="text-on-surface-variant text-xs sm:text-sm md:text-base mt-1 sm:mt-2 max-w-2xl font-normal leading-relaxed">
                Every great innovation starts with a problem — not a product. We are building the open problem registry for humanity.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-primary text-white text-[11px] sm:text-xs font-bold hover:bg-primary-container shadow-sm transition-all shrink-0"
            >
              <span>Explore The Catalog</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 sm:py-12 space-y-6 sm:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {/* Mission Card */}
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-8 shadow-xs space-y-3 sm:space-y-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-base sm:text-xl font-bold text-on-surface">Our Core Mission</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {body}
            </p>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Countless brilliant developers and founders waste years building solutions for non-existent problems. We eliminate the guesswork by anchoring entrepreneurial talent to empirically verified friction points.
            </p>
          </div>

          {/* Verification Standard Card */}
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-8 shadow-xs space-y-3 sm:space-y-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-base sm:text-xl font-bold text-on-surface">The 10-Point Verification Standard</h2>
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-2 text-xs text-on-surface leading-relaxed">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Specific Operational Trigger:</strong> Identifying exact workflow events where friction occurs and who absorbs the economic cost.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-on-surface leading-relaxed">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Empirical Evidence Requirement:</strong> Backed by primary sources, government filings, audit benchmarks, or clinical reports.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-on-surface leading-relaxed">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Human Editorial Review:</strong> Expert domain moderators review every submission before catalog publication.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-on-surface">Have a verified problem to contribute?</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">Submit an operational bottleneck and help builders focus on what matters.</p>
          </div>
          <Link
            to="/submit"
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-sm transition-all shrink-0"
          >
            Submit Friction Point
          </Link>
        </div>
      </div>
    </div>
  );
};
