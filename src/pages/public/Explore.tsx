import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { ProblemDoc } from "@/types";
import { usePageContent } from "@/hooks/usePageContent";
import { ProblemCardSkeleton } from "@/components/common/LoadingContainer";
import { TrendingProblemCard } from "@/components/ui/TrendingProblemCard";
import {
  Search,
  ChevronDown,
  Check,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  Heart,
  Bot,
  Leaf,
  Building2,
  DollarSign,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

// Industry Verticals Configuration for Quick Filter Pills
const INDUSTRY_HUBS = [
  { name: "Healthcare", slug: "healthcare", icon: Heart, color: "#E11D48" },
  { name: "AI & Tech", slug: "technology", icon: Bot, color: "#1657FF" },
  { name: "Clean Energy", slug: "energy", icon: Leaf, color: "#059669" },
  { name: "FinTech", slug: "fintech", icon: Building2, color: "#7C3AED" },
  { name: "Agriculture", slug: "agriculture", icon: Leaf, color: "#16A34A" },
  { name: "Logistics", slug: "logistics", icon: Building2, color: "#D97706" },
  { name: "Manufacturing", slug: "manufacturing", icon: Building2, color: "#4F46E5" },
];

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialIndustry = searchParams.get("industry") || "";

  const { getField } = usePageContent("explore");
  const searchPlaceholder = getField(
    "header",
    "search_placeholder",
    "Search verified problems, industries, or pain points..."
  );

  const [search, setSearch] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("Trending");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    initialIndustry ? [initialIndustry] : []
  );
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [bountyOnly, setBountyOnly] = useState<boolean>(false);

  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeProblems({ status: "approved" }, (list) => {
      setAllProblems(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleIndustryToggle = (ind: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(search ? { q: search } : {});
  };

  const handleResetFilters = () => {
    setSelectedIndustries([]);
    setSelectedSeverity("All");
    setVerifiedOnly(false);
    setBountyOnly(false);
    setSearch("");
    setSearchParams({});
  };

  const isFiltered =
    search.trim() !== "" ||
    selectedIndustries.length > 0 ||
    selectedSeverity !== "All" ||
    verifiedOnly ||
    bountyOnly;

  // Filtered and Sorted problems computation
  const filteredProblems = useMemo(() => {
    const filtered = allProblems.filter((p) => {
      if (
        search.trim() &&
        !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.description.toLowerCase().includes(search.toLowerCase()) &&
        !p.industry.toLowerCase().includes(search.toLowerCase()) &&
        !p.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      ) {
        return false;
      }
      if (
        selectedIndustries.length > 0 &&
        !selectedIndustries.some((ind) =>
          p.industry.toLowerCase().includes(ind.toLowerCase())
        )
      ) {
        return false;
      }
      if (selectedSeverity !== "All" && p.severity !== selectedSeverity.toLowerCase()) {
        return false;
      }
      if (verifiedOnly && !p.verified) {
        return false;
      }
      if (bountyOnly && !p.willingnessToPay && !p.estimatedValue) {
        return false;
      }
      return true;
    });

    // Sorting
    return filtered.sort((a, b) => {
      if (sortBy === "Highest Pain") {
        return (b.painScore || 0) - (a.painScore || 0);
      }
      if (sortBy === "Newest") {
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
      }
      // Default: Trending / Upvotes
      return (b.upvotes || 0) - (a.upvotes || 0);
    });
  }, [allProblems, search, selectedIndustries, selectedSeverity, verifiedOnly, bountyOnly, sortBy]);

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      {/* ── Top Header & Integrated Search / Filter Suite ────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-12 pb-10 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-md text-xs font-bold mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Open Problem Registry • {allProblems.length}+ Verified Problems</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Explore Problems
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base mt-1 max-w-2xl font-normal">
                Discover verified real-world operational bottlenecks, quantified clinical friction, and enterprise demand signals.
              </p>
            </div>

            <Link
              to="/submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1657FF] text-white text-xs font-bold hover:bg-[#0E47E6] shadow-sm transition-all shrink-0"
            >
              <span>Submit Verified Problem</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Search Bar with Integrated Action */}
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant h-5 w-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-2xl py-4 pl-12 pr-28 text-sm md:text-base text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm hover:shadow-md"
              placeholder={searchPlaceholder}
              type="text"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-on-surface text-surface px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Industry Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <button
              onClick={() => setSelectedIndustries([])}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedIndustries.length === 0
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              All Domains
            </button>
            {INDUSTRY_HUBS.map((hub) => {
              const active = selectedIndustries.includes(hub.name);
              const Icon = hub.icon;
              return (
                <button
                  key={hub.slug}
                  onClick={() => handleIndustryToggle(hub.name)}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    active
                      ? "bg-primary/10 border-primary text-primary font-bold shadow-xs"
                      : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-on-surface"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: hub.color }} />
                  <span>{hub.name}</span>
                </button>
              );
            })}
          </div>

          {/* Integrated Filter Toolbar: Severity, Verified, Bounty, Sort & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/20">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              {/* Severity Options */}
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
                <span className="text-[11px] font-semibold text-on-surface-variant px-2">Severity:</span>
                {["All", "Critical", "High", "Medium"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedSeverity(lvl)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      selectedSeverity === lvl
                        ? "bg-primary text-white shadow-2xs font-semibold"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {/* Verified Toggle Pill */}
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  verifiedOnly
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold shadow-2xs"
                    : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Only</span>
                {verifiedOnly && <Check className="w-3 h-3 stroke-[3]" />}
              </button>

              {/* Bounty Toggle Pill */}
              <button
                onClick={() => setBountyOnly(!bountyOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  bountyOnly
                    ? "bg-amber-50 border-amber-300 text-amber-700 font-semibold shadow-2xs"
                    : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                <span>Bounty Attached</span>
                {bountyOnly && <Check className="w-3 h-3 stroke-[3]" />}
              </button>

              {/* Reset Action */}
              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-on-surface-variant">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-surface-container-lowest border border-outline-variant/40 rounded-xl py-1.5 pl-3 pr-8 text-xs font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer shadow-2xs"
                >
                  <option value="Trending">Trending</option>
                  <option value="Highest Pain">Highest Pain Score</option>
                  <option value="Newest">Newly Verified</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Problem Cards Grid ──────────────────────────────────────────────── */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full">
                <ProblemCardSkeleton />
              </div>
            ))}
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4 max-w-2xl mx-auto p-8">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Search className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No problem statements found</h3>
            <p className="text-sm text-gray-500 font-normal">
              Try adjusting your keywords, expanding industry selection, or clearing active filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-fade-in">
            {filteredProblems.map((prob) => (
              <TrendingProblemCard key={prob.id} problem={prob} className="w-full h-full" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
