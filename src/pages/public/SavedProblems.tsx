import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProblemDoc } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { getBookmarkedProblems, STORAGE_KEYS, load } from "@/lib/storage";
import { TrendingProblemCard } from "@/components/ui/TrendingProblemCard";
import { ProblemCardSkeleton } from "@/components/common/LoadingContainer";
import {
  Bookmark,
  Search,
  ChevronDown,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// Industry Verticals for quick filtering
const INDUSTRY_HUBS = [
  { name: "Healthcare", slug: "healthcare" },
  { name: "AI & Tech", slug: "technology" },
  { name: "Clean Energy", slug: "energy" },
  { name: "FinTech", slug: "fintech" },
  { name: "Agriculture", slug: "agriculture" },
  { name: "Logistics", slug: "logistics" },
  { name: "Manufacturing", slug: "manufacturing" },
];

export const SavedProblems: React.FC = () => {
  const { user, userDoc } = useAuth();
  const currentUid = userDoc?.uid || user?.uid || "guest";

  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  // Subscribe to problems
  useEffect(() => {
    const unsubscribe = subscribeProblems({ status: "all" }, (list) => {
      setAllProblems(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Get bookmarked problems
  const savedProblems = useMemo(() => {
    const bookmarksKey = `${STORAGE_KEYS.BOOKMARKS}_${currentUid}`;
    const bookmarks = load<string[]>(bookmarksKey, []);
    return allProblems.filter((p) => bookmarks.includes(p.id));
  }, [allProblems, currentUid]);

  const handleIndustryToggle = (ind: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );
  };

  const handleResetFilters = () => {
    setSelectedIndustries([]);
    setSelectedSeverity("All");
    setVerifiedOnly(false);
    setSearch("");
  };

  const isFiltered =
    search.trim() !== "" ||
    selectedIndustries.length > 0 ||
    selectedSeverity !== "All" ||
    verifiedOnly;

  // Filtered and Sorted saved problems computation
  const filteredSavedProblems = useMemo(() => {
    const filtered = savedProblems.filter((p) => {
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
      return true;
    });

    // Sorting
    return filtered.sort((a, b) => {
      if (sortBy === "Highest Pain") {
        return (b.painScore || 0) - (a.painScore || 0);
      }
      if (sortBy === "Trending") {
        const scoreA = (a.upvotes || 0) * 2 + (a.views || 0);
        const scoreB = (b.upvotes || 0) * 2 + (b.views || 0);
        return scoreB - scoreA;
      }
      // Default: Newest
      return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    });
  }, [savedProblems, search, selectedIndustries, selectedSeverity, verifiedOnly, sortBy]);

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      {/* ── Top Header & Integrated Filter Suite ────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-12 pb-8 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-md text-xs font-bold mb-2">
                <Bookmark className="h-3.5 w-3.5 fill-primary" />
                <span>Personal Library • {savedProblems.length} Saved Statements</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Saved Problems
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base mt-1 max-w-2xl font-normal">
                Quickly review and track all problem statements, market pain dossiers, and venture signals you have bookmarked.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-sm transition-all shrink-0"
            >
              <span>Explore More Problems</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Search Bar with Integrated Action */}
          <div className="w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant h-5 w-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-2xl py-4 pl-12 pr-4 text-sm md:text-base text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm hover:shadow-md"
              placeholder="Search your saved problems by keywords, pain points, or tags..."
              type="text"
            />
          </div>

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
              return (
                <button
                  key={hub.slug}
                  onClick={() => handleIndustryToggle(hub.name)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    active
                      ? "bg-primary/10 border-primary text-primary font-bold shadow-2xs"
                      : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-on-surface"
                  }`}
                >
                  <span>{hub.name}</span>
                </button>
              );
            })}
          </div>

          {/* Integrated Filter Toolbar: Results Count, Severity, Verified, Simple Sort, Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/20">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              {/* Shows Result: X Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-semibold text-on-surface-variant">
                <span>Saved Results :</span>
                <span className="text-primary font-bold">{filteredSavedProblems.length}</span>
              </div>

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

            {/* Redesigned Simple Sort Control */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-on-surface-variant">Sort:</span>
              <div className="relative inline-block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 rounded-xl py-1.5 pl-3 pr-8 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer shadow-2xs transition-colors"
                >
                  <option value="Newest">Newly Saved</option>
                  <option value="Highest Pain">Highest Pain Score</option>
                  <option value="Trending">Trending</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Saved Cards Grid ────────────────────────────────────────── */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-on-surface">
            Your Bookmarked Statements
          </h2>
          <span className="text-xs text-on-surface-variant font-medium">
            Showing {filteredSavedProblems.length} of {savedProblems.length} saved
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full">
                <ProblemCardSkeleton />
              </div>
            ))}
          </div>
        ) : filteredSavedProblems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4 max-w-2xl mx-auto p-8">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Bookmark className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {savedProblems.length === 0 ? "No saved problem statements yet" : "No matching saved problems"}
            </h3>
            <p className="text-sm text-gray-500 font-normal max-w-md mx-auto">
              {savedProblems.length === 0
                ? "Click the bookmark icon on any problem statement across Explore, Trending, or Problem Details to save it to your library."
                : "Try adjusting your search terms or clearing active filters to view your saved items."}
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              {savedProblems.length === 0 ? (
                <Link
                  to="/explore"
                  className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <span>Explore Problems</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-sm"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-fade-in">
            {filteredSavedProblems.map((prob) => (
              <TrendingProblemCard key={prob.id} problem={prob} className="w-full h-full" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
