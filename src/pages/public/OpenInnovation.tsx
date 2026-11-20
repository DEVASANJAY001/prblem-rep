import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Globe,
  Building2,
  Trophy,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  Cpu,
  HeartPulse,
  Truck,
  Leaf,
  Briefcase,
  HelpCircle,
} from "lucide-react";

export const OpenInnovation: React.FC = () => {
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "The Open Innovation & Enterprise Challenge Standard",
      description:
        "How global enterprises, health systems, and hackathon networks publish verified operational bottlenecks for founders, researchers, and student problem solvers.",
      author: {
        "@type": "Organization",
        name: "Stuckhere Research Group",
      },
      publisher: {
        "@type": "Organization",
        name: "Stuckhere",
        url: "https://stuckhere.davns.com",
      },
      mainEntityOfPage: "https://stuckhere.davns.com/open-innovation",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an Open Innovation challenge on Stuckhere?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An Open Innovation challenge is an authenticated operational bottleneck submitted by an enterprise, hospital system, or public institution. It includes background context, current workaround failures, and pilot deployment opportunities for solvers who create viable solutions.",
          },
        },
        {
          "@type": "Question",
          name: "How does Stuckhere support national hackathons like Smart India Hackathon (SIH)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stuckhere catalogs verified problem statements from national hackathons, ministries, and enterprise accelerators, providing teams with deep industry context, market sizing, and competitor teardowns to build commercially viable prototypes.",
          },
        },
      ],
    },
  ];

  const tracks = [
    {
      icon: HeartPulse,
      title: "Healthcare & Clinical Systems",
      description:
        "EHR interoperability, nurse documentation fatigue, medical device alert storms, and cold-chain vaccine temperature excursions.",
      count: "180+ Problem Statements",
    },
    {
      icon: Truck,
      title: "Supply Chain & Logistics",
      description:
        "Freight audit reconciliation errors, cross-border customs documentation lag, autonomous warehouse handoffs, and cold-chain telemetry.",
      count: "140+ Problem Statements",
    },
    {
      icon: Cpu,
      title: "AI & Data Governance",
      description:
        "Regulatory compliance audit hallucination filters, synthetic training data contamination, edge model latency, and private LLM fine-tuning.",
      count: "125+ Problem Statements",
    },
    {
      icon: Leaf,
      title: "CleanTech & Energy Grid",
      description:
        "Interconnection queue transmission modeling, battery thermal runaway detection, carbon offset verification, and industrial heat electrification.",
      count: "95+ Problem Statements",
    },
  ];

  const enterprisePillars = [
    {
      number: "01",
      title: "Friction Extraction & Scrubbing",
      description:
        "Enterprise operators submit real internal pain points. Our team cleanses proprietary data and anonymizes sensitive intellectual property while maintaining technical clarity.",
    },
    {
      number: "02",
      title: "Algorithmic Pain Indexing",
      description:
        "Every statement receives a 0–100 Pain Score based on frequency, financial severity, workaround failure, and switching urgency.",
    },
    {
      number: "03",
      title: "Global Solver Swarm Activation",
      description:
        "Thousands of student engineers, startup founders, and research fellows build prototypes and venture-backed solutions specifically targeted at verified criteria.",
    },
    {
      number: "04",
      title: "Direct Pilot & Vendor Onboarding",
      description:
        "Enterprises review verified community submissions, schedule technical demos, and award pilot deployment contracts or grants.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-surface font-body-md text-on-surface">
      <SEOHead
        title="Open Innovation & Enterprise Challenges | Stuckhere"
        description="Connect real enterprise operational bottlenecks with thousands of verified founders, researchers, and hackathon teams."
        canonicalUrl="https://stuckhere.davns.com/open-innovation"
        keywords={[
          "open innovation challenges",
          "enterprise problem statements",
          "hackathon problem statements",
          "smart india hackathon problem statements",
          "corporate innovation challenge",
          "startup pilot opportunities",
        ]}
        jsonLd={jsonLdData}
      />

      {/* Hero Header */}
      <section className="relative w-full pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-8 border-b border-outline-variant/20 overflow-hidden bg-gradient-to-b from-surface via-surface-container-lowest/60 to-surface">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Globe className="w-3.5 h-3.5" />
            <span>Open Innovation Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-on-surface tracking-tight leading-[1.12]">
            Connecting Enterprise Friction With World-Class Solvers
          </h1>

          <p className="mt-6 text-sm sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            The bridge between internal corporate bottlenecks and thousands of hungry founders, university engineers, and hackathon participants.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary/90 transition-all active:scale-95"
            >
              <span>Explore Verified Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface font-semibold text-sm transition-all"
            >
              <span>Post an Enterprise Challenge</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Pillars for Enterprises */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            How Open Innovation Works on Stuckhere
          </h2>
          <p className="mt-3 text-sm sm:text-base text-on-surface-variant">
            From friction discovery to sandbox pilots in 4 streamlined stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {enterprisePillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded-md bg-primary/10">
                    Stage {pillar.number}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-on-surface mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Industry Challenge Tracks */}
      <section className="w-full bg-surface-container-lowest/80 py-16 sm:py-24 border-y border-outline-variant/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Key Focus Areas</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1">
              Active Challenge Tracks
            </h2>
            <p className="mt-3 text-sm sm:text-base text-on-surface-variant">
              Explore the sectors with the highest concentration of authenticated enterprise problem dossiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.title}
                  className="p-6 sm:p-8 rounded-2xl bg-surface border border-outline-variant/30 flex items-start gap-5 hover:border-primary/40 transition-all"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-on-surface">
                        {track.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-primary px-2 py-0.5 rounded-full bg-primary/10 shrink-0">
                        {track.count}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {track.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hackathons & Research Acceleration */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-surface-container-lowest to-surface-container border border-outline-variant/30 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Academic & Hackathon Partners</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Fueling Hackathons with Authentic Industry Need
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Hackathons often produce toy projects because participants lack exposure to real enterprise software workflows. Stuckhere collaborates with major hackathons (including Smart India Hackathon tracks, University AI hackathons, and corporate accelerators) to supply verified problem statements with unit economic data and API integration specs.
              </p>
              <div className="pt-2">
                <Link
                  to="/competitions"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                >
                  <span>Explore Competition & Hackathon Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="w-full md:w-64 p-6 rounded-2xl bg-surface border border-outline-variant/30 text-center space-y-3">
              <Trophy className="w-10 h-10 text-amber-500 mx-auto" />
              <div className="text-2xl font-black text-on-surface">500+</div>
              <div className="text-xs text-on-surface-variant font-medium">
                Student & Founder Teams Activated Across Global Competitions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-14 px-4 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Launch Your Enterprise Challenge
          </h2>
          <p className="text-xs sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
            Partner with Stuckhere to crowdsource innovative prototypes and discover top engineering talent solving your highest-priority operational problems.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm shadow-md hover:bg-white/95 transition-all"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-all"
            >
              <span>View Challenge Catalog</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};