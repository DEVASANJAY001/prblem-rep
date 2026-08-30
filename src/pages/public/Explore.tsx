import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { subscribeCompanies } from "@/lib/firebase/services/companiesService";
import { ProblemDoc, CompanyDoc } from "@/types";
import { REAL_COMPANIES } from "@/data/realProductionData";
import { usePageContent } from "@/hooks/usePageContent";
import { ProblemCardSkeleton } from "@/components/common/LoadingContainer";
import { TrendingProblemCard } from "@/components/ui/TrendingProblemCard";
import { TrendingCarouselCard } from "@/components/ui/TrendingCarouselCard";
import { CompanyCard } from "@/components/ui/CompanyCard";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Search,
  ChevronDown,
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Flame,
  ChevronLeft,
  ChevronRight,
  Building2,
  X,
} from "lucide-react";

// Industry Verticals Configuration for Quick Filter Pills (Text-only pills)
const INDUSTRY_HUBS = [
  { name: "Healthcare", slug: "healthcare" },
  { name: "AI & Tech", slug: "technology" },
  { name: "Clean Energy", slug: "energy" },
  { name: "FinTech", slug: "fintech" },
  { name: "Agriculture", slug: "agriculture" },
  { name: "Logistics", slug: "logistics" },
  { name: "Manufacturing", slug: "manufacturing" },
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

  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);
  const [companiesList, setCompaniesList] = useState<CompanyDoc[]>(REAL_COMPANIES);
  const [loading, setLoading] = useState(true);

  // Sync state with URL search params when arriving from Home page or external links
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearch(q);
    const ind = searchParams.get("industry") || "";
    if (ind) {
      setSelectedIndustries([ind]);
    }
  }, [searchParams]);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  useEffect(() => {
    setTimeout(checkScroll, 100);
  }, [allProblems]);

  useEffect(() => {
    const unsubProblems = subscribeProblems({ status: "approved" }, (list) => {
      setAllProblems(list);
      setLoading(false);
    });
    const unsubCompanies = subscribeCompanies((list) => {
      if (list && list.length > 0) setCompaniesList(list);
    });
    return () => {
      unsubProblems();
      unsubCompanies();
    };
  }, []);

  // Compute statements count per company
  const companyProblemCounts = useMemo(() => {
    const map: Record<string, number> = {};
    allProblems.forEach((p) => {
      const attached = Array.isArray(p.attachedCompanyNames) && p.attachedCompanyNames.length > 0
        ? p.attachedCompanyNames
        : (p.tags || []);
      attached.forEach((name) => {
        map[name.toLowerCase()] = (map[name.toLowerCase()] || 0) + 1;
      });
    });
    return map;
  }, [allProblems]);

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
    setSearch("");
    setSearchParams({});
  };

  const isSearching = search.trim().length > 0;

  const isFiltered =
    isSearching ||
    selectedIndustries.length > 0 ||
    selectedSeverity !== "All" ||
    verifiedOnly;

  // Filtered and Sorted problems computation for main grid
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
      return true;
    });

    // Sorting
    return filtered.sort((a, b) => {
      if (sortBy === "Highest Pain") {
        return (b.painScore || 0) - (a.painScore || 0);
      }
      if (sortBy === "Newest") {
        const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return timeB - timeA;
      }
      // Default: Trending / Upvotes / Views
      const scoreA = (a.votes?.upvotes || 0) * 2 + (a.views || 0);
      const scoreB = (b.votes?.upvotes || 0) * 2 + (b.views || 0);
      return scoreB - scoreA;
    });
  }, [allProblems, search, selectedIndustries, selectedSeverity, verifiedOnly, sortBy]);

  // Trending Problems Calculation (Highest traction / High pain / Most views)
  const trendingProblems = useMemo(() => {
    const trending = allProblems.filter((p) => {
      const rawPain = Number(p.painScore ?? p.aiScores?.painLevel ?? 87);
      const views = p.views ?? 0;
      const votes = typeof p.votes === "object" ? p.votes?.upvotes || 0 : Number(p.votes || 0);
      return views >= 30 || rawPain >= 88 || votes >= 10 || (p as any).isTrending;
    });

    if (trending.length >= 3) return trending;

    // Fallback: top problems sorted by pain score and views
    return [...allProblems].sort((a, b) => {
      const painA = Number(a.painScore || a.aiScores?.painLevel || 80);
      const painB = Number(b.painScore || b.aiScores?.painLevel || 80);
      return painB - painA;
    }).slice(0, 6);
  }, [allProblems]);

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      {/* SEO: CollectionPage schema for Explore */}
      <SEOHead
        title="Explore Verified Problem Statements — Healthcare, AI, Energy & More"
        description={`Browse ${allProblems.length}+ verified real-world problems across 140+ industry verticals. Discover startup opportunities, pain points, and innovation challenges curated by domain experts.`}
        canonicalUrl="https://problematlas.com/explore"
        ogType="website"
        keywords={["problem statements", "startup ideas", "verified problems", "healthcare problems", "AI challenges", "clean energy problems", "fintech pain points", "innovation opportunities"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Explore Verified Problem Statements",
          "description": "Browse verified real-world problems across healthcare, AI, energy, fintech and 140+ industries.",
          "url": "https://problematlas.com/explore",
          "numberOfItems": allProblems.length,
          "publisher": {
            "@type": "Organization",
            "name": "ProblemAtlas",
            "url": "https://problematlas.com"
          }
        }}
      />
      {/* ── Top Header & Integrated Search / Filter Suite ────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-8 pb-5 sm:pt-12 sm:pb-8 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-4 sm:space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Explore Problems
              </h1>
              <p className="text-on-surface-variant text-xs sm:text-sm md:text-base mt-1 max-w-2xl font-normal">
                Discover verified real-world operational bottlenecks, quantified clinical friction, and enterprise demand signals.
              </p>
            </div>

            <Link
              to="/submit"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#1657FF] text-white text-[11px] sm:text-xs font-bold hover:bg-[#0E47E6] shadow-sm transition-all shrink-0"
            >
              <span>Submit Problem</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>

          {/* Search Bar with Integrated Action */}
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant h-4 w-4 sm:h-5 sm:w-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-2xl py-2.5 sm:py-4 pl-10 sm:pl-12 pr-22 sm:pr-28 text-xs sm:text-base text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm hover:shadow-md"
              placeholder={searchPlaceholder}
              type="text"
            />
            <button
              type="submit"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-on-surface text-surface px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Domain / Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
            <button
              onClick={() => setSelectedIndustries([])}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedIndustries.length === 0
                  ? "bg-on-surface text-surface shadow-xs font-bold"
                  : "bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/60"
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
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    active
                      ? "bg-primary text-white border-primary shadow-xs font-bold"
                      : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/60"
                  }`}
                >
                  <span>{hub.name}</span>
                </button>
              );
            })}
          </div>

          {/* Integrated Filter Toolbar: Results Count, Severity, Verified, Simple Sort, Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-outline-variant/20">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Results Count */}
              <div className="text-[11px] sm:text-xs font-medium text-on-surface-variant">
                Showing <span className="font-bold text-on-surface">{filteredProblems.length}</span> {filteredProblems.length === 1 ? "problem" : "problems"}
              </div>

              <div className="h-4 w-[1px] bg-outline-variant/30 hidden sm:block" />

              {/* Severity Options */}
              <div className="flex items-center gap-0.5 sm:gap-1 bg-surface-container-lowest p-0.5 sm:p-1 rounded-xl border border-outline-variant/30">
                <span className="text-[10px] sm:text-[11px] font-medium text-on-surface-variant px-1.5 sm:px-2">Severity:</span>
                {["All", "Critical", "High", "Medium"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedSeverity(lvl)}
                    className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs transition-all cursor-pointer ${
                      selectedSeverity === lvl
                        ? "bg-primary text-white font-bold shadow-2xs"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low font-medium"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {/* Verified Toggle */}
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                  verifiedOnly
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-2xs"
                    : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/60"
                }`}
              >
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                <span>Verified only</span>
                {verifiedOnly && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />}
              </button>

              {/* Reset Action */}
              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] sm:text-xs font-medium text-on-surface-variant">Sort by:</span>
              <div className="relative inline-block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-surface-container-lowest border border-outline-variant/30 hover:border-outline-variant/60 rounded-xl py-1 sm:py-1.5 pl-2.5 sm:pl-3 pr-7 sm:pr-8 text-[11px] sm:text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-2xs transition-colors"
                >
                  <option value="Trending">Trending</option>
                  <option value="Highest Pain">Highest Pain Score</option>
                  <option value="Newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-10">
        {/* ── Trending Section directly on the page (Hidden smoothly during active search) ─────────────────────── */}
        {!isSearching && !loading && trendingProblems.length > 0 && (
          <section className="w-full space-y-4 transition-all duration-300 animate-in fade-in">
            <div className="flex items-end justify-between border-b border-outline-variant/20 pb-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
                    Trending Problems
                  </h2>
                </div>
                <p className="text-sm md:text-base text-on-surface-variant font-normal">
                  The most urgent challenges being discussed this week.
                </p>
              </div>

              {/* Scroll Controls */}
              <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-full border border-outline-variant/30">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-all cursor-pointer shadow-2xs"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-all cursor-pointer shadow-2xs"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scroll Viewport Container with Dynamic Left & Right Gradient Blur */}
            <div className="relative w-full py-1">
              {/* Left Edge Blur Overlay (Only mounted when scrolled past 1st card) */}
              {canScrollLeft && (
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-surface via-surface/90 to-transparent z-20 transition-opacity duration-300" />
              )}

              {/* Right Edge Blur Overlay (Only mounted when more cards available to the right) */}
              {canScrollRight && (
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-surface via-surface/90 to-transparent z-20 transition-opacity duration-300" />
              )}

              {/* Left to Right Horizontal Scrolling Track (scrollbar completely hidden) */}
              <div
                ref={carouselRef}
                onScroll={checkScroll}
                className="flex flex-row flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pb-4 pt-1 hide-scrollbar items-stretch [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none" }}
              >
                {trendingProblems.map((prob) => (
                  <TrendingCarouselCard
                    key={prob.id}
                    problem={prob}
                    className="snap-start shrink-0 w-[285px] sm:w-[380px] md:w-[410px] max-w-[85vw] sm:max-w-none"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Top Companies Section (Hidden smoothly during active search) ───────────────────────────────────── */}
        {!isSearching && !loading && companiesList.length > 0 && (
          <section className="w-full space-y-3 sm:space-y-4 font-['Poppins',sans-serif] transition-all duration-300 animate-in fade-in">
            <div className="flex items-end justify-between border-b border-outline-variant/20 pb-3 sm:pb-4">
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
                  Top Companies
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-on-surface-variant font-normal">
                  Organizations and enterprises actively scouting and solving problem statements.
                </p>
              </div>

              <Link
                to="/companies"
                className="inline-flex items-center gap-1 sm:gap-1.5 text-primary hover:text-primary-container text-[11px] sm:text-xs md:text-sm font-semibold transition-all shrink-0 group"
              >
                <span>See All Companies</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Top 4 Companies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {companiesList.slice(0, 4).map((comp) => (
                <CompanyCard
                  key={comp.id}
                  company={comp}
                  problemsCount={companyProblemCounts[comp.name.toLowerCase()] || 4}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Main Problem Cards Grid ────────────────────────────────────────── */}
        <section className="w-full space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-outline-variant/20 pb-3">
            <div>
              <h2 className="text-xl font-bold text-on-surface">
                {isSearching ? `Search Results for "${search}"` : "All Problem Statements"}
              </h2>
              <span className="text-xs text-on-surface-variant font-medium">
                Showing {filteredProblems.length} of {allProblems.length} statements
              </span>
            </div>

            {/* Inline search bar in All Problem Statements (Only visible when not searching from hero) */}
            {!isSearching ? (
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant h-3.5 w-3.5" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search problem statements..."
                  className="w-full bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 rounded-xl py-2 pl-9 pr-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs transition-all"
                  type="text"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSearchParams({});
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition-all cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear Search</span>
              </button>
            )}
          </div>

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
        </section>
      </main>
    </div>
  );
};
