import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Target,
  Compass,
  Zap,
  Award,
  Globe,
  Database,
  Building2,
  Flame,
  Check,
  TrendingUp,
  Lightbulb,
  HeartHandshake,
  FileCheck,
  Layers,
  Scale,
  Clock,
} from "lucide-react";

export const About: React.FC = () => {
  const verificationPoints = [
    {
      title: "Specific Operational Trigger",
      desc: "Every verified statement isolates the exact workflow step, regulatory event, or physical bottleneck where friction occurs, avoiding vague generalities.",
    },
    {
      title: "Empirical Source Citation",
      desc: "Mandatory grounding in verifiable public records, academic clinical trials, SEC 10-K disclosures, government audit benchmarks, or peer-reviewed literature.",
    },
    {
      title: "Measurable Economic Loss",
      desc: "Quantified calculation of annual financial waste, lost labor hours, regulatory penalties, or material inefficiency borne by affected parties.",
    },
    {
      title: "Identifiable Stakeholders",
      desc: "Explicit mapping of who absorbs the friction (e.g. ICU triage nurses, cold-chain logistics dispatchers, cloud security engineers) and who holds budget authority.",
    },
    {
      title: "Documented Failed Workarounds",
      desc: "Analysis of existing manual band-aids, spreadsheets, or legacy tooling that have proven incapable of permanently resolving the root issue.",
    },
    {
      title: "Non-Confidential & Open Record",
      desc: "Strict editorial screening ensuring submissions contain zero proprietary corporate secrets, non-public trade secrets, or NDA-protected IP.",
    },
    {
      title: "Realistic Technical Horizon",
      desc: "Confirmation that solving the problem does not violate laws of physics and is addressable within currently available or emerging technology frontiers.",
    },
    {
      title: "Regulatory & Compliance Guardrails",
      desc: "Clear notation of governing statutory bodies (FDA, HIPAA, FAA, GDPR, SEC, EPA) that dictate acceptable solution architectures.",
    },
    {
      title: "Standardized Ontology Tagging",
      desc: "Rigorous classification into primary and secondary domains, cross-cutting technologies, and sub-vertical taxonomies for instant discoverability.",
    },
    {
      title: "Independent Consensus Review",
      desc: "Dual-blind review conducted by domain chairs and verified industry practitioners before publication into the canonical index.",
    },
  ];

  const coreValues = [
    {
      icon: Target,
      title: "Radical Empirical Grounding",
      desc: "We reject brainstorming in an ivory tower. Innovation begins by observing, measuring, and ruthlessly documenting verified friction points—not dreaming up synthetic products in a vacuum.",
    },
    {
      icon: Award,
      title: "100% Solver IP Ownership",
      desc: "Solvers retain 100% ownership of whatever they build. Stuckhere claims 0% equity, 0% licensing royalties, and 0% intellectual property rights over software or companies launched to solve cataloged problems.",
    },
    {
      icon: Globe,
      title: "Open Knowledge Commons",
      desc: "Humanity's most urgent unsolved challenges should not be hidden behind expensive enterprise paywalls. Our baseline catalog is permanently free, open, and globally indexable.",
    },
    {
      icon: HeartHandshake,
      title: "Democratizing Market Clarity",
      desc: "A solo indie engineer in Nairobi or Buenos Aires should have the exact same clarity on Fortune 500 operational friction as a multi-billion dollar Silicon Valley corporate incubator.",
    },
  ];

  const lifecycleStages = [
    {
      step: "01",
      title: "Empirical Harvesting",
      desc: "We continuously ingest operational pain signals from academic repositories, industry SEC filings, clinical workflow audits, and frontline professional submissions across 140+ industry domains.",
    },
    {
      step: "02",
      title: "10-Point Rigorous Audit",
      desc: "Each candidate problem passes through our algorithmic veracity screening and human domain moderator panel to ensure trigger specificity, evidence integrity, and non-confidentiality.",
    },
    {
      step: "03",
      title: "Pain Indexing & Quantification",
      desc: "Our multi-factor algorithm computes an objective Pain Score (1–100), measuring financial waste, human labor friction, regulatory urgency, and demographic scale to prioritize urgent challenges.",
    },
    {
      step: "04",
      title: "Founder & Solver Matchmaking",
      desc: "Builders use Startup Mode to translate verified problems into validated business canvases, customer personas, addressable market TAMs, and enterprise pilot connections.",
    },
  ];

  const impactMetrics = [
    { value: "14,200+", label: "Verified Problems", sub: "Screened against 10-point standards" },
    { value: "140+", label: "Industry Sectors", sub: "From Healthcare to Quantum Tech" },
    { value: "89,400+", label: "Active Innovators", sub: "Engineers, researchers, and founders" },
    { value: "$42.8M+", label: "Quantified Friction", sub: "Annual economic waste benchmarked" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface selection:bg-primary/15 selection:text-primary">
      {/* SEO: AboutPage + Organization schema */}
      <SEOHead
        title="About Stuckhere — The World's Open Problem Intelligence Platform"
        description="Learn how Stuckhere maps, quantifies, and verifies humanity's most urgent unsolved problems across 140+ industries to empower founders, researchers, and solvers."
        canonicalUrl="https://stuckhere.com/about"
        ogType="website"
        keywords={[
          "about stuckhere",
          "problem intelligence platform",
          "startup idea validation",
          "open problem registry",
          "10 point verification standard",
          "empirical innovation",
          "solver IP rights",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Stuckhere",
          "description": "Stuckhere is the world's open problem intelligence registry mapping verified real-world friction points.",
          "url": "https://stuckhere.com/about",
          "mainEntity": {
            "@type": "Organization",
            "name": "Stuckhere",
            "url": "https://stuckhere.com",
            "logo": "https://stuckhere.com/icon.svg",
            "foundingDate": "2024",
            "description": "Open problem intelligence platform empowering founders to solve verified real-world challenges.",
            "knowsAbout": [
              "Problem Statement Verification",
              "Startup Venture Modeling",
              "Enterprise Problem Scouting",
              "Domain Innovation Taxonomy"
            ]
          }
        }}
      />

      {/* ── Top Hero Header Section ───────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-4 sm:space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-on-surface font-bold">Company</span>
            <span>/</span>
            <span className="text-primary font-bold">About Us</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Problem-First Innovation Movement</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
                We Don&apos;t Start With Ideas. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
                  We Start With Problems.
                </span>
              </h1>
              <p className="text-on-surface-variant text-sm sm:text-base md:text-lg font-normal leading-relaxed">
                Stuckhere is the world&apos;s open problem registry. We systematically catalog, empirically verify, and mathematically score humanity&apos;s most urgent operational bottlenecks, clinical hurdles, and technological friction points so founders and researchers solve what actually matters.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Explore Verified Problems</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs sm:text-sm font-bold hover:border-primary/50 hover:bg-surface-container-high transition-all cursor-pointer"
              >
                <span>Submit Friction Point</span>
              </Link>
            </div>
          </div>

          {/* Quick Impact Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-outline-variant/20">
            {impactMetrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30 shadow-2xs space-y-1"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-on-surface">
                  {m.label}
                </div>
                <div className="text-[11px] text-on-surface-variant font-normal">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content Container ────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">
        {/* ── Section: The Genesis & Why We Exist ───────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Compass className="w-4 h-4" />
              <span>The Problem with Problem Discovery</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
              Why do 42% of startups fail? <br />
              <span className="text-rose-600 font-bold">They build what nobody needs.</span>
            </h2>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Every year, over $300 billion in venture capital and hundreds of millions of precious engineering hours are incinerated building solutions for synthetic, hallucinated problems. Technologists brainstorm clever software in vacuum rooms without ever asking frontline workers where the friction actually lives.
            </p>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Meanwhile, oncology nurses spend 3.8 hours per shift re-keying EHR medication records. Independent grid operators manually balance volatile renewables via outdated spreadsheet macros. Smallholder farmers lose 30% of yields to unindexed cold-chain logistics dropouts.
            </p>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-semibold text-on-surface">
              Stuckhere was founded to invert this broken paradigm. We bridge the chasm between real-world operational agony and global entrepreneurial talent.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-10 shadow-xs space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-on-surface">
                  The Paradigm Shift
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs sm:text-sm text-rose-950 dark:text-rose-200 space-y-1">
                    <div className="font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
                      <span>✕ The Old Way: &ldquo;Solution-First&rdquo;</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      Invent a clever technology, look for someone willing to buy it, spend 18 months in customer discovery, pivot 4 times, and run out of capital.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 space-y-1">
                    <div className="font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>✓ The Stuckhere Way: &ldquo;Problem-First&rdquo;</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      Browse verified friction points with quantified economic waste, proven demand, identified buyers, and empirical benchmarks before writing a line of code.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                <span>Empirically Audited Registry</span>
                <span className="font-bold text-primary">Zero Guesswork</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section: The 4-Stage Problem Lifecycle ───────────────────────── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Layers className="w-4 h-4" />
              <span>How Stuckhere Works</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              The Problem Intelligence Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              How raw operational friction is harvested, verified, quantified, and matched with world-class problem solvers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {lifecycleStages.map((stage, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-xs flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-extrabold text-primary/30 group-hover:text-primary transition-colors font-mono">
                      {stage.step}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section: The 10-Point Verification Standard ──────────────────── */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-12 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/20 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="w-4 h-4" />
                <span>Editorial Quality Control</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                The 10-Point Verification Standard
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Every problem dossier published in Stuckhere must survive our comprehensive verification audit before receiving the verified badge.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Empirically Screened</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {verificationPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 flex items-start gap-3.5 hover:bg-surface-container-low transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-on-surface">
                    {point.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-normal">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section: Our Core Values ──────────────────────────────────────── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Award className="w-4 h-4" />
              <span>Our Foundational Ethics</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Principles We Refuse to Compromise
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              The moral and intellectual foundation guiding the Stuckhere registry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 shadow-xs flex items-start gap-5 hover:border-primary/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Section: Who We Serve ────────────────────────────────────────── */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-low/50 p-6 sm:p-12 space-y-8">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Built for the Global Innovation Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Whether you are an ambitious indie founder or a Fortune 500 R&amp;D director, Stuckhere anchors your work in empirical reality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-on-surface">Founders &amp; Startups</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Skip 6 months of customer discovery. Start directly with verified operational pain, buyer personas, and market sizing data.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-on-surface">Academic Researchers</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct grant applications and doctoral dissertations toward urgent industrial challenges with quantified economic urgency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-on-surface">Enterprises &amp; Industry</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Publish high-friction operational challenges, fund private bounties, and scout external talent capable of solving persistent bottlenecks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-on-surface">Frontline Practitioners</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Give voice to the broken software and physical processes in your daily work. Let the global developer community build your fix.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section: Global Call to Action ───────────────────────────────── */}
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-surface-container-lowest p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-on-surface">
              Ready to Solve Something That Matters?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Join thousands of innovators who have left synthetic brainstorming behind. Explore verified problem statements across 140+ industries today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/explore"
              className="px-6 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-hover shadow-md transition-all cursor-pointer"
            >
              Start Exploring
            </Link>
            <Link
              to="/contact"
              className="px-5 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs sm:text-sm font-bold hover:border-primary/50 transition-all cursor-pointer"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
