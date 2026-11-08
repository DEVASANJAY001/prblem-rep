import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Compass,
  Sparkles,
  ArrowRight,
  Database,
  BookOpen,
  FileSpreadsheet,
  Clock,
  ShieldCheck,
  Building2,
  Lightbulb,
  Users,
} from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";

export const Research: React.FC = () => {
  const upcomingHighlights = [
    {
      icon: BookOpen,
      title: "Peer-Reviewed Scientific Proof",
      description: "Empirical studies, academic papers, and clinical trials directly backing verified real-world problems.",
      tag: "Academic Literature",
    },
    {
      icon: Database,
      title: "Calibrated Telemetry Datasets",
      description: "Open-access benchmark metrics, sensor telemetry, and quantitative datasets across 140+ industries.",
      tag: "Open Data",
    },
    {
      icon: FileSpreadsheet,
      title: "Interactive In-App Reader Studio",
      description: "Distraction-free reading experience with real-time reading progress, session timers, and APA citation exports.",
      tag: "Research Studio",
    },
  ];

  const platformHubs = [
    {
      title: "Home Page",
      path: "/",
      description: "The world's open problem intelligence platform with live problem tickers.",
      icon: Home,
    },
    {
      title: "Explore Problem Statements",
      path: "/explore",
      description: "Browse hundreds of verified, evidence-backed real-world problem statements.",
      icon: Compass,
    },
    {
      title: "Startup Mode & Blueprints",
      path: "/explore?filter=startup_mode",
      description: "Turn verified problems into venture blueprints with TAM modeling and MVP specs.",
      icon: Lightbulb,
    },
    {
      title: "Submit a Problem Dossier",
      path: "/submit",
      description: "Submit an empirical industry problem with telemetry data and market sizing.",
      icon: ShieldCheck,
    },
    {
      title: "Problem Categories & Industries",
      path: "/industries",
      description: "Explore problems categorized across Healthcare, AI, FinTech, Energy, and more.",
      icon: Building2,
    },
    {
      title: "Community & Solvers",
      path: "/community",
      description: "Join founders, researchers, and engineers building solutions for high-impact problems.",
      icon: Users,
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface selection:bg-primary/20 selection:text-primary">
      {/* SEO: Research Coming Soon */}
      <SEOHead
        title="Research & Open Datasets — Getting Ready | Stuckhere"
        description="We are curating peer-reviewed empirical papers, clinical benchmark telemetry, and calibrated open datasets. Research & Open Datasets is getting ready and will be available soon."
        canonicalUrl="https://stuckhere.davns.com/research"
        ogType="website"
      />

      {/* ── Top Ambient Light Background & Hero ────────────────────────────── */}
      <div className="relative w-full flex-1 flex flex-col justify-between overflow-hidden">
        {/* Ambient background glow circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 w-full relative z-10">
          <div className="flex items-center justify-between gap-3 pb-6 border-b border-outline-variant/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-on-surface font-bold">Research & Open Datasets</span>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-outline-variant/40 bg-surface text-xs font-bold text-on-surface hover:text-primary hover:border-primary/50 transition-all shadow-2xs"
            >
              <Home className="w-3.5 h-3.5 text-primary" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>

        {/* Center Coming Soon Showcase */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative z-10 text-center space-y-6 sm:space-y-8 flex-1 flex flex-col justify-center items-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider animate-in fade-in zoom-in-95 duration-300">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <Clock className="w-3.5 h-3.5" />
            <span>Getting Ready • Will Bring Soon</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.15]">
              Research & Open Datasets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
                Is Getting Ready
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed font-normal">
              We are currently cataloging peer-reviewed scientific papers, clinical telemetry benchmarks, and calibrated open datasets to give every problem statement undeniable empirical backing.
            </p>
          </div>

          {/* Primary Home Navigation & Call-to-Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface text-sm font-bold hover:border-primary/50 hover:bg-surface-container-high transition-all cursor-pointer shadow-2xs"
            >
              <Compass className="w-4 h-4 text-primary" />
              <span>Explore Verified Problems</span>
            </Link>
          </div>

          {/* Feature Teasers: What's Coming */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 w-full text-left">
            {upcomingHighlights.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-xs space-y-2.5 transition-all hover:border-primary/40 hover:bg-surface-container-low"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant uppercase tracking-wider">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-on-surface">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Ecosystem Navigation Hubs ────────────────────────────── */}
        <div className="w-full bg-surface-container-lowest border-t border-outline-variant/20 py-8 relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Visit Other Active Platform Hubs</span>
              </span>

              <Link
                to="/"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Go to Stuckhere Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {platformHubs.map((hub, idx) => {
                const Icon = hub.icon;
                return (
                  <Link
                    key={idx}
                    to={hub.path}
                    className="p-3 rounded-xl border border-outline-variant/30 bg-surface hover:border-primary/50 hover:bg-surface-container-low transition-all text-left flex flex-col justify-between group shadow-2xs"
                  >
                    <div className="space-y-1.5">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                        {hub.title}
                      </h4>
                      <p className="text-[10px] text-on-surface-variant line-clamp-2 leading-relaxed">
                        {hub.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
