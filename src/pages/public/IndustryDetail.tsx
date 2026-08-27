import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getIndustryBySlug } from "@/lib/storage";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { ProblemDoc } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import {
  Heart,
  Search,
  SlidersHorizontal,
  ChevronDown,
  MessageSquare,
  Bookmark,
  Share2,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowRight,
  Sparkles,
  Shield,
  Layers,
  Crown,
  Building2,
  Zap,
  Leaf,
  Bot,
  GraduationCap,
  Car,
  ShoppingCart,
  ShieldCheck,
  Scale,
  Landmark,
  Hammer,
  Coffee,
  Globe,
  ArrowUpRight,
  Flame,
  Trophy,
} from "lucide-react";

// Dynamic Icon Mapper
const ICON_MAP: Record<string, any> = {
  Activity,
  Heart,
  Leaf,
  Bot,
  Zap,
  GraduationCap,
  Building2,
  Car,
  ShoppingCart,
  ShieldCheck,
  Scale,
  Landmark,
  Hammer,
  Coffee,
  Globe,
  Layers,
  Sparkles,
};

export const IndustryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const industrySlug = slug || "healthcare";
  const industryData = getIndustryBySlug(industrySlug);

  const [problemsList, setProblemsList] = useState<ProblemDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Formulation based on slug
  const industry = industryData || {
    name: industrySlug.charAt(0).toUpperCase() + industrySlug.slice(1).replace("-", " "),
    slug: industrySlug,
    icon: "Activity",
    description: `Explore real-world problems in ${industrySlug.replace("-", " ")} faced by operational teams, customers, and practitioners.`,
    problemCount: problemsList.length || 128,
    weeklyTrend: "↑ 24% this week",
    opportunityCount: 23,
    trendingCount: 12,
    avgPainScore: 91,
    marketSize: "$4.2B",
    color: "#1657FF",
    subcategories: [],
  };

  const IconComponent = ICON_MAP[industry.icon] || Building2;

  const [activeSubcategory, setActiveSubcategory] = useState("All Problems");
  const [searchInCat, setSearchInCat] = useState("");
  const [sortBy, setSortBy] = useState("Pain Score");
  const [followed, setFollowed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const unsubscribe = subscribeProblems({ status: "approved" }, (all) => {
      const match = all.filter(
        (p) =>
          p.industry.toLowerCase().includes(industrySlug.toLowerCase()) ||
          industrySlug.toLowerCase().includes(p.industry.toLowerCase()) ||
          p.industry.toLowerCase().includes(industry.name.toLowerCase())
      );
      setProblemsList(match.length > 0 ? match : all);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [industrySlug, industry.name]);

  // Subcategories
  const subcategories = [
    { name: "All Problems", count: problemsList.length },
    { name: "Core Operations", count: Math.max(1, Math.floor(problemsList.length * 0.4)) },
    { name: "Automation & AI", count: Math.max(1, Math.floor(problemsList.length * 0.3)) },
    { name: "Compliance & Security", count: Math.max(1, Math.floor(problemsList.length * 0.2)) },
  ];

  const filteredProblems = useMemo(() => {
    return problemsList.filter((p) => {
      if (searchInCat.trim() && !p.title.toLowerCase().includes(searchInCat.toLowerCase()) && !p.description.toLowerCase().includes(searchInCat.toLowerCase())) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "Pain Score") return (b.painScore || 0) - (a.painScore || 0);
      if (sortBy === "Opportunity") return (b.opportunityScore || 0) - (a.opportunityScore || 0);
      if (sortBy === "Most Discussed") return (b.commentsCount || 0) - (a.commentsCount || 0);
      return (b.votes?.upvotes || 0) - (a.votes?.upvotes || 0);
    });
  }, [problemsList, searchInCat, activeSubcategory, sortBy]);

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#090D16] min-h-screen py-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ── 1. Industry Header Bar ──────────────────────────────────── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/80 pb-6 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md"
              style={{ backgroundColor: industry.color || "#1657FF" }}
            >
              <IconComponent className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
                  {industry.name}
                </h1>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400">
                  Verified Index
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                {industry.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFollowed(!followed)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-xs ${
                followed
                  ? "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                  : "bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
              }`}
            >
              {followed ? "Following Index ✓" : "+ Follow Industry"}
            </button>
            <Link
              to="/submit"
              className="rounded-xl bg-[#1657FF] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0E47E6] transition-all hover:scale-[1.02]"
            >
              Submit Problem
            </Link>
          </div>
        </div>

        {/* ── 2. Top Summary KPI Formulations Bar (5 Key Metrics) ────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {/* Tile 1: Problems */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Problems</span>
            <p className="mt-1 text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tabular-nums">
              {(industry.problemCount || 12840).toLocaleString()}
            </p>
            <span className="mt-1.5 inline-flex items-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              {industry.weeklyTrend || "↑ 24% this week"}
            </span>
          </div>

          {/* Tile 2: Opportunities */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Opportunities</span>
            <p className="mt-1 text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tabular-nums">
              {(industry.opportunityCount || 2341).toLocaleString()}
            </p>
            <span className="mt-1.5 inline-flex items-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              ↑ 18% this week
            </span>
          </div>

          {/* Tile 3: Trending Problems */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Trending Problems</span>
            <p className="mt-1 text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tabular-nums">
              {industry.trendingCount || 92}
            </p>
            <span className="mt-1.5 inline-flex items-center text-[11px] font-bold text-amber-500">
              ↑ 32% this week
            </span>
          </div>

          {/* Tile 4: Avg. Pain Score */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Avg. Pain Score</span>
            <p className="mt-1 text-2xl sm:text-3xl font-black text-rose-600 tabular-nums">
              {industry.avgPainScore || 91}
            </p>
            <span className="mt-1.5 inline-flex items-center text-[11px] font-bold text-zinc-500">
              Very High Severity
            </span>
          </div>

          {/* Tile 5: Est. Market Size */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Est. Market Size</span>
            <p className="mt-1 text-2xl sm:text-3xl font-black text-[#1657FF] tabular-nums">
              {industry.marketSize || "₹18.6 Cr"}
            </p>
            <span className="mt-1.5 inline-flex items-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              High Potential
            </span>
          </div>
        </div>

        {/* ── 3. Main 3-Column Ecosystem Layout ──────────────────────── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* ── Left Column: Subcategories & Upgrade Card (3 Cols) ──── */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-1">
              <span className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                Subcategories
              </span>
              <div className="space-y-0.5">
                {subcategories.map((sub) => {
                  const isActive = activeSubcategory === sub.name;
                  return (
                    <button
                      key={sub.name}
                      onClick={() => setActiveSubcategory(sub.name)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#EEF4FF] text-[#1657FF] font-bold dark:bg-blue-950/50 dark:text-blue-400"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                      }`}
                    >
                      <span className="truncate">{sub.name}</span>
                      <span className="font-mono text-[11px] text-zinc-400 ml-2">
                        {typeof sub.count === "number" ? sub.count.toLocaleString() : sub.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Unlock More Power Pro Card */}
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 space-y-3 dark:border-blue-950 dark:from-blue-950/40 dark:to-indigo-950/20">
              <div className="flex items-center gap-2 text-[#1657FF]">
                <Crown className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Unlock More Power</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Get advanced insights, AI reports, customer TAM diagnostics, and downloadable datasets.
              </p>
              <Link
                to="/community"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#1657FF] py-2.5 text-xs font-bold text-white shadow hover:bg-[#0E47E6] transition-colors"
              >
                <span>Upgrade to Pro</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* ── Center Column: Search, Sort & Problem Rows (6 Cols) ─── */}
          <div className="lg:col-span-6 space-y-4">
            {/* Search & Sort Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchInCat}
                  onChange={(e) => setSearchInCat(e.target.value)}
                  placeholder={`Search in ${industry.name} problems...`}
                  className="w-full rounded-2xl border border-zinc-200/80 bg-white pl-10 pr-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#1657FF] focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 shadow-xs"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-zinc-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-zinc-200/80 bg-white px-3 py-2 text-xs font-bold text-zinc-800 focus:border-[#1657FF] focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 shadow-xs"
                >
                  <option value="Pain Score">Pain Score</option>
                  <option value="Opportunity">Opportunity Score</option>
                  <option value="Most Discussed">Most Discussed</option>
                  <option value="Votes">Most Upvoted</option>
                </select>
              </div>
            </div>

            {/* Problem Cards List */}
            <div className="space-y-3">
              {filteredProblems.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/problem/${p.id}`)}
                  className="card-hover-lift group cursor-pointer rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-3 transition-all"
                >
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-[#1657FF] transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(p.tags || [p.industry]).map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono font-bold">
                      <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md dark:bg-rose-950/40">
                        Pain {p.painScore}
                      </span>
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md dark:bg-emerald-950/40">
                        Opp {p.opportunityScore}
                      </span>
                      <span className="flex items-center gap-1 text-zinc-500 font-sans font-medium text-[11px]">
                        <MessageSquare className="h-3 w-3" />
                        <span>{p.commentsCount || p.comments?.length || 0}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination (< Previous 1 2 3 ... 214 Next >) */}
            <div className="flex items-center justify-between border-t border-zinc-200/80 pt-4 text-xs font-semibold text-zinc-500 dark:border-zinc-800">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs"
              >
                &lt; Previous
              </button>

              <div className="flex items-center gap-1">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-7 w-7 rounded-lg text-xs font-bold transition-colors ${
                      currentPage === page
                        ? "bg-[#1657FF] text-white"
                        : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-1 text-zinc-400">...</span>
                <button
                  onClick={() => setCurrentPage(214)}
                  className="h-7 px-2 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300"
                >
                  214
                </button>
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs"
              >
                Next &gt;
              </button>
            </div>
          </div>

          {/* ── Right Column: Category Insights & Distributions (3 Cols) ─ */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Widget 1: Category Insights */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  Category Insights
                </h3>
                <span className="text-[11px] font-semibold text-zinc-400">This Week ▾</span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Most Discussed</span>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">Long waiting times in OPD</p>
                  <span className="text-[11px] text-zinc-500">256 discussions</span>
                </div>

                <div className="border-t border-zinc-100 pt-2.5 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Top Opportunity</span>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">AI-based early disease detection</p>
                  <span className="text-[11px] font-mono font-bold text-[#1657FF]">Opportunity Score 94</span>
                </div>

                <div className="border-t border-zinc-100 pt-2.5 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Rising Fast</span>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">Mental health in rural areas</p>
                  <span className="text-[11px] font-bold text-emerald-600">↑ 46% this week</span>
                </div>
              </div>
            </div>

            {/* Widget 2: Pain Score Distribution */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  Pain Score Distribution
                </h3>
                <span className="text-[11px] font-semibold text-zinc-400">All Time ▾</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-rose-600 font-bold">90-100 (Very High)</span>
                    <span className="font-mono text-zinc-600 dark:text-zinc-400">5,124 (40%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: "40%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-amber-600 font-bold">75-89 (High)</span>
                    <span className="font-mono text-zinc-600 dark:text-zinc-400">4,832 (38%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "38%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-blue-600 font-bold">50-74 (Medium)</span>
                    <span className="font-mono text-zinc-600 dark:text-zinc-400">2,341 (18%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "18%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-zinc-500">25-49 (Low)</span>
                    <span className="font-mono text-zinc-600 dark:text-zinc-400">421 (4%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-zinc-400 rounded-full" style={{ width: "4%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 3: Top Locations */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  Top Locations
                </h3>
                <span className="text-[11px] font-semibold text-zinc-400">All Time ▾</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { name: "India", count: "6,230", pct: "48%" },
                  { name: "United States", count: "2,140", pct: "16%" },
                  { name: "Indonesia", count: "1,045", pct: "8%" },
                  { name: "UK", count: "845", pct: "6%" },
                  { name: "Brazil", count: "620", pct: "4%" },
                ].map((loc) => (
                  <div key={loc.name} className="flex items-center justify-between font-medium">
                    <span className="text-zinc-800 dark:text-zinc-200">{loc.name}</span>
                    <span className="font-mono text-zinc-500 dark:text-zinc-400">
                      {loc.count} ({loc.pct})
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
