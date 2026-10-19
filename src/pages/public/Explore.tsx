import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { subscribeCompanies } from "@/lib/firebase/services/companiesService";
import { ProblemDoc, CompanyDoc, IndustryDoc } from "@/types";
import { REAL_COMPANIES, REAL_INDUSTRIES } from "@/data/realProductionData";
import { usePageContent } from "@/hooks/usePageContent";
import { ProblemCardSkeleton } from "@/components/common/LoadingContainer";
import { TrendingProblemCard } from "@/components/ui/TrendingProblemCard";
import { TrendingCarouselCard } from "@/components/ui/TrendingCarouselCard";
import { CompanyCard } from "@/components/ui/CompanyCard";
import { SEOHead } from "@/components/common/SEOHead";
import { ExploreDomainsModal } from "@/components/explore/ExploreDomainsModal";
import { computeDomainIntelligence } from "@/lib/algorithms/domainIntelligence";
import { subscribeIndustries } from "@/lib/firebase/services/industriesService";
import { EmptySearchIllustration } from "@/components/common/VectorIllustrations";
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
  { name: "AI", slug: "ai" },
  { name: "Clean Energy", slug: "clean-energy" },
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
  const [industriesList, setIndustriesList] = useState<IndustryDoc[]>([]);
  const [showDomainsModal, setShowDomainsModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Admin CMS custom overrides for explore domains
  const popularSlugsOverride = getField<string[]>("domains_config", "popular_domains", []);
  const trendingSlugsOverride = getField<string[]>("domains_config", "trending_domains", []);

  // Real-time Intelligence Algorithm combining problem metrics, velocity, and admin configuration
  const domainIntelligence = useMemo(() => {
    return computeDomainIntelligence(industriesList, allProblems, {
      popularSlugs: Array.isArray(popularSlugsOverride)
        ? popularSlugsOverride.map((s) => s.toLowerCase().trim())
        : [],
      trendingSlugs: Array.isArray(trendingSlugsOverride)
        ? trendingSlugsOverride.map((s) => s.toLowerCase().trim())
        : [],
    });
  }, [industriesList, allProblems, popularSlugsOverride, trendingSlugsOverride]);

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

  const scrollRaf = useRef<number | null>(null);
  const checkScroll = () => {
    if (scrollRaf.current) return;
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = null;
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 15);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
      }
    });
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
    const unsubIndustries = subscribeIndustries((list) => {
      if (list) setIndustriesList(list);
    });
    return () => {
      unsubProblems();
      unsubCompanies();
      unsubIndustries();
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
  const isDomainSelected = selectedIndustries.length > 0;
  const shouldHideOtherSections = isSearching || isDomainSelected;

  const isFiltered =
    isSearching ||
    isDomainSelected ||
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
        !selectedIndustries.some((ind) => {
          const lowerInd = ind.toLowerCase().trim();
          const pInd = p.industry.toLowerCase().trim();
          if (lowerInd === "ai") {
            return pInd === "ai" || pInd.startsWith("ai ") || pInd.endsWith(" ai") || pInd.includes("artificial intelligence");
          }
          return pInd.includes(lowerInd) || lowerInd.includes(pInd);
        })
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

  // Suggested problem statements randomly picked from different industries when 0 results match
  const suggestedProblems = useMemo(() => {
    if (filteredProblems.length > 0 || allProblems.length === 0) return [];

    // Filter problems that don't match the current filtered set or selected industry
    const pool = allProblems.filter((p) => {
      if (selectedIndustries.length > 0) {
        return !selectedIndustries.some((ind) =>
          p.industry.toLowerCase().includes(ind.toLowerCase())
        );
      }
      return true;
    });

    const candidates = pool.length > 0 ? pool : allProblems;

    // Group by industry to ensure diverse representation across different sectors
    const industryGroups: Record<string, ProblemDoc[]> = {};
    candidates.forEach((p) => {
      const ind = p.industry || "General";
      if (!industryGroups[ind]) industryGroups[ind] = [];
      industryGroups[ind].push(p);
    });

    const selected: ProblemDoc[] = [];
    const industries = Object.keys(industryGroups).sort(() => 0.5 - Math.random());

    for (const ind of industries) {
      const probs = industryGroups[ind];
      const randomProb = probs[Math.floor(Math.random() * probs.length)];
      if (randomProb && !selected.some((s) => s.id === randomProb.id)) {
        selected.push(randomProb);
      }
      if (selected.length >= 4) break;
    }

    // Fallback if less than 4
    if (selected.length < 4) {
      for (const p of candidates) {
        if (!selected.some((s) => s.id === p.id)) {
          selected.push(p);
        }
        if (selected.length >= 4) break;
      }
    }

    return selected;
  }, [allProblems, filteredProblems.length, selectedIndustries]);

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      {/* SEO: CollectionPage schema for Explore */}
      <SEOHead
        title="Explore Verified Problem Statements — Healthcare, AI, Energy & More"
        description={`Browse ${allProblems.length}+ verified real-world problems across 140+ industry verticals. Discover startup opportunities, pain points, and innovation challenges curated by domain experts.`}
        canonicalUrl="https://stuckhere.com/explore"
        ogType="website"
        keywords={["problem statements", "startup ideas", "verified problems", "healthcare problems", "AI challenges", "clean energy problems", "fintech pain points", "innovation opportunities"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Explore Verified Problem Statements",
          "description": "Browse verified real-world problems across healthcare, AI, energy, fintech and 140+ industries.",
          "url": "https://stuckhere.com/explore",
          "numberOfItems": allProblems.length,
          "publisher": {
            "@type": "Organization",
            "name": "Stuckhere",
            "url": "https://stuckhere.com"
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

          {/* Domain / Category Filter Area */}
          <div className="space-y-1.5 w-full">
            {/* Top Bar above domains: Left 'X selected', Right 'See all →' with uniform spacing and padding */}
            <div className="flex items-center justify-between px-0.5 min-h-[18px]">
              <div className="flex items-center">
                {selectedIndustries.length > 0 ? (
                  <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-on-surface-variant font-medium">
                    <span>{selectedIndustries.length} selected</span>
                    <button
                      type="button"
                      onClick={() => setSelectedIndustries([])}
                      className="p-0 text-red-500 hover:text-red-700 transition-colors cursor-pointer inline-flex items-center justify-center"
                      aria-label="Remove selected domain"
                      title="Clear selected domains"
                    >
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                ) : (
                  <span className="invisible text-[11px] sm:text-xs select-none pointer-events-none" aria-hidden="true">
                    0 selected
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowDomainsModal(true)}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer group"
              >
                <span>See all</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Sticky 'All Domains' + Separation Line + Borderless Horizontally Scrolling Other Domains with generous spacing */}
            <div className="relative flex items-center w-full overflow-hidden bg-transparent py-1">
              {/* Sticky All Domains */}
              <div className="sticky left-0 z-20 flex items-center bg-surface shrink-0 pr-3">
                <button
                  type="button"
                  onClick={() => setSelectedIndustries([])}
                  className={`px-2.5 py-1 text-[11px] sm:text-xs whitespace-nowrap transition-all cursor-pointer bg-transparent border-none ${
                    selectedIndustries.length === 0
                      ? "text-primary font-bold underline underline-offset-4 decoration-2 decoration-primary"
                      : "text-on-surface-variant hover:text-on-surface hover:text-primary font-medium"
                  }`}
                >
                  All Domains
                </button>
                {/* Separation Line between All Domains and other domains */}
                <div className="h-4 w-[1px] bg-outline-variant/50 ml-3" />
              </div>

              {/* Other domains left to right scrolling with generous spacing */}
              <div className="flex items-center gap-5 sm:gap-6 overflow-x-auto py-1 pl-3 pr-6 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {domainIntelligence.allDomains.map((hub) => {
                  const active = selectedIndustries.includes(hub.name);
                  return (
                    <button
                      key={hub.slug}
                      type="button"
                      onClick={() => handleIndustryToggle(hub.name)}
                      className={`py-1 text-[11px] sm:text-xs whitespace-nowrap transition-all cursor-pointer bg-transparent border-none ${
                        active
                          ? "text-primary font-bold underline underline-offset-4 decoration-2 decoration-primary"
                          : "text-on-surface-variant hover:text-on-surface hover:text-primary font-medium"
                      }`}
                    >
                      <span>{hub.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Integrated Filter Toolbar: Results Count, Severity, Verified, Simple Sort, Reset */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-outline-variant/20">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {/* Results Count */}
              <div className="text-[11px] sm:text-xs font-medium text-on-surface-variant">
                Showing <span className="font-bold text-on-surface">{filteredProblems.length}</span> {filteredProblems.length === 1 ? "problem" : "problems"}
              </div>

              <div className="h-4 w-[1px] bg-outline-variant/30 hidden sm:block" />

              {/* Severity Options */}
              <div className="flex items-center gap-0.5 sm:gap-1 bg-surface-container-lowest p-0.5 sm:p-1 rounded-xl border border-outline-variant/30 overflow-x-auto max-w-full">
                <span className="text-[10px] sm:text-[11px] font-medium text-on-surface-variant px-1.5 sm:px-2 shrink-0">Severity:</span>
                {["All", "Critical", "High", "Medium"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedSeverity(lvl)}
                    className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs transition-all cursor-pointer shrink-0 ${
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
                className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border text-[11px] sm:text-xs font-medium transition-all cursor-pointer shrink-0 ${
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
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline transition-all cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2 w-full sm:w-auto pt-1 sm:pt-0">
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
        {/* ── Trending Section directly on the page (Hidden smoothly during active search or when domain is selected) ─────────────────────── */}
        {!shouldHideOtherSections && !loading && trendingProblems.length > 0 && (
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
              {/* Left Edge Blur Overlay */}
              <div
                className={`pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-surface via-surface/90 to-transparent z-20 transition-opacity duration-300 ${
                  canScrollLeft ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Right Edge Blur Overlay */}
              <div
                className={`pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-surface via-surface/90 to-transparent z-20 transition-opacity duration-300 ${
                  canScrollRight ? "opacity-100" : "opacity-0"
                }`}
              />

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

        {/* ── Top Companies Section (Hidden smoothly during active search or when domain is selected) ───────────────────────────────────── */}
        {!shouldHideOtherSections && !loading && companiesList.length > 0 && (
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
                {isSearching
                  ? `Search Results for "${search}"`
                  : isDomainSelected
                  ? `${selectedIndustries.join(", ")} Problems`
                  : "All Problem Statements"}
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
            <div className="space-y-6 sm:space-y-8 w-full animate-fade-in">
              <div className="w-full max-w-md mx-auto text-center py-2 sm:py-4 space-y-3 bg-transparent">
                {/* Fade-in Vector Illustration */}
                <div className="animate-in fade-in duration-500 ease-out">
                  <EmptySearchIllustration className="w-36 h-24 sm:w-44 sm:h-28 mx-auto" />
                </div>

                {/* Heading & Subtitle directly on page background */}
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
                    No problem statements found
                  </h3>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant max-w-xs mx-auto leading-relaxed font-normal">
                    Try adjusting your keywords, expanding industry selection, or clearing active filters.
                  </p>
                </div>

                {/* Reset Filters Action Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-xs group"
                  >
                    <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-90" />
                    <span>Reset Filters</span>
                  </button>
                </div>
              </div>

              {/* ── Suggested Statements Across Diverse Industries ─────────────────── */}
              {suggestedProblems.length > 0 && (
                <div className="w-full space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-outline-variant/20 pb-3 gap-1">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
                        Suggested Problem Statements
                      </h4>
                      <p className="text-xs text-on-surface-variant font-normal">
                        Explore verified operational challenges trending across other sectors
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-primary">
                      Randomly curated from diverse industries
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-fade-in">
                    {suggestedProblems.map((prob) => (
                      <TrendingProblemCard key={prob.id} problem={prob} className="w-full h-full" />
                    ))}
                  </div>
                </div>
              )}
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

      {/* Explore All Domains Intelligence Popup */}
      <ExploreDomainsModal
        isOpen={showDomainsModal}
        onClose={() => setShowDomainsModal(false)}
        popularDomains={domainIntelligence.popularDomains}
        trendingDomains={domainIntelligence.trendingDomains}
        allDomains={domainIntelligence.allDomains}
        domainStats={domainIntelligence.domainStats}
        selectedIndustries={selectedIndustries}
        onSelectIndustry={handleIndustryToggle}
        onClearSelection={() => setSelectedIndustries([])}
      />
    </div>
  );
};
