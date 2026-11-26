import React, { useState } from "react";
import { SmartLink as Link } from "@/components/common/SmartLink";
import {
  ArrowUp,
  Sparkles,
  Send,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Layers,
  ExternalLink,
  BookOpen,
  Compass,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(() => {
    try {
      return localStorage.getItem("stuckhere_newsletter_subscribed") === "true";
    } catch {
      return false;
    }
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    try {
      localStorage.setItem("stuckhere_newsletter_subscribed", "true");
      localStorage.setItem("stuckhere_newsletter_email", email.trim());
    } catch {
      // ignore localStorage errors
    }

    setSubscribed(true);
    setStatusMessage("You are subscribed to the Weekly Problem Dispatch.");
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20 font-['Poppins',sans-serif] text-on-surface relative overflow-hidden transition-colors">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-24 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none blur-2xl" />

      {/* ── TOP DISPATCH / NEWSLETTER STRIP ───────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-10 border-b border-outline-variant/15">
        <div className="rounded-3xl bg-surface-container-low/60 border border-outline-variant/30 p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden shadow-2xs">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wide border border-primary/20">
              <Sparkles className="w-3 h-3" />
              <span>Weekly Intelligence Dispatch</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-on-surface tracking-tight">
              Stay ahead of verified market pain points
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Curated empirical problem dossiers, structural market waste figures, and venture gap alerts delivered directly to your inbox.
            </p>
          </div>

          {/* Subscribe Form */}
          <div className="w-full lg:w-auto shrink-0">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>Subscribed to Problem Intelligence updates</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  required
                  className="w-full sm:w-72 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-surface border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all shadow-2xs"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            {statusMessage && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1.5 font-medium animate-fade-in">
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN NAVIGATION COLUMNS ───────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10">
        {/* Brand & Mission Column (spans 2 on large screens) */}
        <div className="col-span-2 flex flex-col gap-5 sm:pr-6">
          <Link to="/" className="inline-flex items-center gap-2.5 group w-fit">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-blue-700 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-on-surface flex items-center">
              Stuck<span className="text-primary ml-0.5">here</span>
            </span>
          </Link>

          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-sm">
            The open empirical problem registry and intelligence studio. We index verified industry failure modes, quantify operational friction, and draft high-conviction blueprints for venture builders.
          </p>

          {/* Operational Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 w-fit text-[11px] font-semibold text-on-surface-variant">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Registry Systems Operational</span>
          </div>

          {/* Social & Community Links */}
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://github.com/DEVASANJAY001/prblem-rep"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"
              title="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"
              title="X / Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"
              title="LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://davns.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DAVNS Industries"
              className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all text-xs font-black"
              title="DAVNS Industries"
            >
              D
            </a>
          </div>
        </div>

        {/* Column 1: Registry & Product */}
        <div className="flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Registry
          </h4>
          <nav className="flex flex-col gap-2.5">
            <Link to="/explore" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Problem Catalog
            </Link>
            <Link to="/industries" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Industry Verticals
            </Link>
            <Link to="/research" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Research & Evidence
            </Link>
            <Link to="/methodology" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Scoring Methodology
            </Link>
            <Link to="/solutions" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Solutions Matrix
            </Link>
            <Link to="/features" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Product Features
            </Link>
          </nav>
        </div>

        {/* Column 2: Academy & Frameworks */}
        <div className="flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <span>Academy</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">8 Tracks</span>
          </h4>
          <nav className="flex flex-col gap-2.5">
            <Link to="/learn" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Academy Home
            </Link>
            <Link to="/guides/problem-discovery-framework" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Discovery Framework
            </Link>
            <Link to="/learn/problem-discovery-and-validation" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Problem Discovery
            </Link>
            <Link to="/learn/market-sizing-and-opportunity" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Market Sizing
            </Link>
            <Link to="/learn/ai-for-builders" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              AI for Builders
            </Link>
            <Link to="/learn/startup-fundamentals" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Startup Fundamentals
            </Link>
          </nav>
        </div>

        {/* Column 3: Community & Ventures */}
        <div className="flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <span>Ecosystem</span>
            <span className="px-1.5 py-0.2 rounded-full bg-primary/10 text-primary text-[10px] font-bold">Live</span>
          </h4>
          <nav className="flex flex-col gap-2.5">
            <Link to="/community" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Forums & Feed
            </Link>
            <Link to="/submit" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all flex items-center gap-1">
              <span>Submit Problem</span>
              <span className="text-[10px] font-bold px-1 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400">Studio</span>
            </Link>
            <Link to="/open-innovation" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Open Innovation
            </Link>
            <Link to="/competitions" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Competitions
            </Link>
            <Link to="/companies" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Industry Partners
            </Link>
            <Link to="/saved" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Saved Dossiers
            </Link>
          </nav>
        </div>

        {/* Column 4: Governance & Legal */}
        <div className="flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
            Governance
          </h4>
          <nav className="flex flex-col gap-2.5">
            <Link to="/about" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              About Collective
            </Link>
            <Link to="/contact" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Contact & Inquiries
            </Link>
            <Link to="/privacy" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-xs sm:text-sm text-on-surface-variant hover:text-primary hover:translate-x-0.5 transition-all">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>

      {/* ── BOTTOM COLOPHON ───────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-6 border-t border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
        <div className="flex items-center gap-2 flex-wrap text-center sm:text-left">
          <span>
            A{" "}
            <a
              href="https://davns.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-on-surface hover:text-primary underline transition-colors"
            >
              DAVNS Industries
            </a>{" "}
            Innovation Platform
          </span>
          <span className="hidden sm:inline opacity-40">·</span>
          <span>© 2026 Stuckhere. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 text-[11px] text-on-surface-variant/80">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>WCAG 2.1 AA</span>
            </span>
            <span>·</span>
            <span>RFC-4180 Ingestion</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            title="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
