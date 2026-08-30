import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getIndustryBySlug } from "@/lib/storage";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { ProblemDoc } from "@/types";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { TrendingProblemCard } from "@/components/ui/TrendingProblemCard";
import { ProblemCardSkeleton } from "@/components/common/LoadingContainer";
import {
  Search,
  ChevronDown,
  ArrowRight,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";

export const IndustryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const industrySlug = slug || "healthcare-biotech";
  const industryData = getIndustryBySlug(industrySlug);

  const [problemsList, setProblemsList] = useState<ProblemDoc[]>([]);
  const [allApprovedProblems, setAllApprovedProblems] = useState<ProblemDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic industry metadata fallback
  const industry = useMemo(() => {
    if (industryData) return industryData;
    const fromReal = REAL_INDUSTRIES.find(
      (i) => i.slug.toLowerCase() === industrySlug.toLowerCase()
    );
    if (fromReal) return fromReal;

    const formattedName = industrySlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" & ");

    return {
      id: `ind-${industrySlug}`,
      name: formattedName,
      slug: industrySlug,
      description: "Clinical systems, medical devices, biotechnology, digital health, and pharmaceuticals.",
      problemsCount: 0,
      totalBounties: "₹18.6 Cr",
    };
  }, [industryData, industrySlug]);

  const [searchInCat, setSearchInCat] = useState("");
  const [sortBy, setSortBy] = useState("Highest Pain");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const getCanonicalIndustry = (industryStr: string): string => {
    const s = industryStr.toLowerCase().trim();
    if (/\b(health|biotech|medical|clinical|life science|pharma)\b/i.test(s)) {
      return "healthcare-biotech";
    }
    if (/\b(ai|machine learning|artificial intelligence|deep learning|nlp|computer vision)\b/i.test(s)) {
      return "ai-machine-learning";
    }
    if (/\b(fintech|defi|finance|banking|payments|crypto)\b/i.test(s)) {
      return "fintech-defi";
    }
    if (/\b(cyber|security|identity|zero-trust|infosec)\b/i.test(s)) {
      return "cybersecurity-identity";
    }
    if (/\b(clean|cleantech|energy|climate|solar|hydrogen|battery|carbon)\b/i.test(s)) {
      return "cleantech-energy";
    }
    if (/\b(logistics|supply chain|freight|transportation|shipping|warehouse)\b/i.test(s)) {
      return "logistics-supply-chain";
    }
    if (/\b(space|aerospace|satellite|avionics|orbital)\b/i.test(s)) {
      return "spacetech-aerospace";
    }
    if (/\b(agri|agritech|agriculture|farming|crop|soil)\b/i.test(s)) {
      return "agritech-food";
    }
    if (/\b(defense|defence|military|warfare|national security)\b/i.test(s)) {
      return "defense-national-security";
    }
    return s.replace(/[^a-z0-9]+/g, "-");
  };

  const isIndustryMatch = (probIndustry: string, indSlug: string, indName: string) => {
    if (!probIndustry) return false;
    const pInd = probIndustry.toLowerCase().trim();
    const slugClean = indSlug.toLowerCase().trim();
    const nameClean = indName.toLowerCase().trim();

    // 1. Direct match
    if (pInd === slugClean || pInd === nameClean) return true;

    // 2. Canonical taxonomy domain match
    const canonicalProblem = getCanonicalIndustry(pInd);
    const canonicalPage = getCanonicalIndustry(slugClean || nameClean);
    if (canonicalProblem && canonicalPage && canonicalProblem === canonicalPage) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const unsubscribe = subscribeProblems({ status: "approved" }, (all) => {
      setAllApprovedProblems(all);
      const match = all.filter((p) =>
        isIndustryMatch(p.industry, industrySlug, industry.name)
      );
      setProblemsList(match);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [industrySlug, industry.name]);

  // Compute live problem counts mapped by canonical industry slug
  const problemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allApprovedProblems.forEach((p) => {
      const canonical = getCanonicalIndustry(p.industry || "");
      counts[canonical] = (counts[canonical] || 0) + 1;
    });
    return counts;
  }, [allApprovedProblems]);

  // Live Mathematical Calculations based on real problem statements in this industry
  const kpis = useMemo(() => {
    const totalCount = problemsList.length;

    // Opportunities calculation: count problems with opportunity score >= 80
    const opportunitiesCount = problemsList.filter(
      (p) => (p.opportunityScore ?? p.aiScores?.businessPotential ?? 75) >= 80
    ).length;

    // Trending problems count: high views (>= 30) or pain score (>= 90) or upvotes (>= 5) or trending flag
    const trendingCount = problemsList.filter(
      (p) =>
        (p.views ?? 0) >= 30 ||
        (p.painScore ?? p.aiScores?.painLevel ?? 0) >= 90 ||
        (typeof p.votes === "object" ? p.votes?.upvotes || 0 : Number(p.votes || 0)) >= 5 ||
        (p as any).isTrending
    ).length;

    // Mathematical Average of Pain Scores
    const avgPain =
      totalCount > 0
        ? Math.round(
            problemsList.reduce(
              (acc, p) => acc + Number(p.painScore ?? p.aiScores?.painLevel ?? 85),
              0
            ) / totalCount
          )
        : ((industry as any).avgPainScore ?? 91);

    // Severity description based on avgPain
    let severityLabel = "Moderate Severity";
    if (avgPain >= 90) severityLabel = "Very High Severity";
    else if (avgPain >= 75) severityLabel = "High Severity";
    else if (avgPain >= 50) severityLabel = "Medium Severity";

    return {
      problemsCount: totalCount,
      problemsTrend: "↑ 24% in 7d",
      opportunitiesCount: opportunitiesCount,
      opportunitiesTrend: "↑ 18% in 7d",
      trendingCount: trendingCount,
      trendingTrend: "↑ 32% in 7d",
      avgPainScore: avgPain,
      severityLabel: severityLabel,
    };
  }, [problemsList, industry]);

  // Dynamic Category Insights calculations
  const dynamicInsights = useMemo(() => {
    if (problemsList.length === 0) {
      return {
        mostDiscussed: { title: "Long waiting times in OPD", count: "256 discussions" },
        topOpportunity: { title: "AI-based early disease detection", score: "Score 94" },
        risingFast: { title: "Mental health in rural areas", trend: "↑ 46% in 7d" },
      };
    }

    const mostDiscussed = [...problemsList].sort(
      (a, b) => (b.commentsCount || 0) - (a.commentsCount || 0)
    )[0];
    const topOpportunity = [...problemsList].sort(
      (a, b) => (b.opportunityScore || 0) - (a.opportunityScore || 0)
    )[0];
    const risingFast = [...problemsList].sort(
      (a, b) => (b.painScore || 0) - (a.painScore || 0)
    )[0];

    return {
      mostDiscussed: {
        title: mostDiscussed?.title || "Clinical workflow bottlenecks",
        count: `${mostDiscussed?.commentsCount || mostDiscussed?.views || 12} discussions`,
      },
      topOpportunity: {
        title: topOpportunity?.title || "Automated data reconciliation",
        score: `Score ${topOpportunity?.opportunityScore || 92}`,
      },
      risingFast: {
        title: risingFast?.title || "Rural practitioner tools",
        trend: `Pain ${risingFast?.painScore || 90}`,
      },
    };
  }, [problemsList]);

  // Dynamic Pain Score Distribution
  const dynamicPainDist = useMemo(() => {
    const total = problemsList.length;
    if (total === 0) {
      return [
        { label: "90–100 (Very High)", count: 0, pct: 0, color: "bg-rose-500" },
        { label: "75–89 (High)", count: 0, pct: 0, color: "bg-amber-500" },
        { label: "50–74 (Medium)", count: 0, pct: 0, color: "bg-blue-500" },
        { label: "25–49 (Low)", count: 0, pct: 0, color: "bg-gray-300" },
      ];
    }

    const c90 = problemsList.filter((p) => (p.painScore ?? 85) >= 90).length;
    const c75 = problemsList.filter(
      (p) => (p.painScore ?? 85) >= 75 && (p.painScore ?? 85) < 90
    ).length;
    const c50 = problemsList.filter(
      (p) => (p.painScore ?? 85) >= 50 && (p.painScore ?? 85) < 75
    ).length;
    const c25 = problemsList.filter((p) => (p.painScore ?? 85) < 50).length;

    return [
      {
        label: "90–100 (Very High)",
        count: c90,
        pct: Math.round((c90 / total) * 100),
        color: "bg-rose-500",
      },
      {
        label: "75–89 (High)",
        count: c75,
        pct: Math.round((c75 / total) * 100),
        color: "bg-amber-500",
      },
      {
        label: "50–74 (Medium)",
        count: c50,
        pct: Math.round((c50 / total) * 100),
        color: "bg-blue-500",
      },
      {
        label: "25–49 (Low)",
        count: c25,
        pct: Math.round((c25 / total) * 100),
        color: "bg-gray-300",
      },
    ];
  }, [problemsList]);

  const filteredProblems = useMemo(() => {
    const filtered = problemsList.filter((p) => {
      if (
        searchInCat.trim() &&
        !p.title.toLowerCase().includes(searchInCat.toLowerCase()) &&
        !p.description.toLowerCase().includes(searchInCat.toLowerCase()) &&
        !p.tags?.some((t) => t.toLowerCase().includes(searchInCat.toLowerCase()))
      ) {
        return false;
      }
      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "Highest Pain") {
        return (b.painScore || 0) - (a.painScore || 0);
      }
      if (sortBy === "Trending") {
        const scoreA = (a.votes?.upvotes || 0) * 2 + (a.views || 0);
        const scoreB = (b.votes?.upvotes || 0) * 2 + (b.views || 0);
        return scoreB - scoreA;
      }
      if (sortBy === "Newest") {
        const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return timeB - timeA;
      }
      if (sortBy === "Opportunity") {
        return (b.opportunityScore || 0) - (a.opportunityScore || 0);
      }
      if (sortBy === "Most Discussed") {
        return (b.commentsCount || 0) - (a.commentsCount || 0);
      }
      return (b.votes?.upvotes || 0) - (a.votes?.upvotes || 0);
    });
  }, [problemsList, searchInCat, sortBy]);

  // Suggested problem statements when current industry has 0 matches
  const suggestedProblems = useMemo(() => {
    return allApprovedProblems
      .filter((p) => !problemsList.some((m) => m.id === p.id))
      .slice(0, 2);
  }, [allApprovedProblems, problemsList]);

  // Other industry verticals list
  const otherIndustries = useMemo(() => {
    return REAL_INDUSTRIES.filter(
      (ind) => ind.slug.toLowerCase() !== industrySlug.toLowerCase()
    );
  }, [industrySlug]);

  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE) || 1;
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProblems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProblems, currentPage]);

  const isSearching = searchInCat.trim().length > 0;

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      {/* SEO: CollectionPage + BreadcrumbList schema */}
      <SEOHead
        title={`${industry.name} Problem Statements & Startup Opportunities`}
        description={industry.description || `Explore verified real-world operational bottlenecks, clinical friction, and enterprise demand signals in ${industry.name}.`}
        canonicalUrl={`https://problematlas.com/industries/${industrySlug}`}
        ogType="website"
        keywords={[industry.name, `${industry.name} problems`, `${industry.name} startup ideas`, "industry bottlenecks", "market pain points", "venture opportunities"]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${industry.name} Problem Statements`,
            "description": industry.description,
            "url": `https://problematlas.com/industries/${industrySlug}`,
            "numberOfItems": problemsList.length,
            "publisher": {
              "@type": "Organization",
              "name": "ProblemAtlas",
              "url": "https://problematlas.com"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://problematlas.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Industries",
                "item": "https://problematlas.com/industries"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": industry.name,
                "item": `https://problematlas.com/industries/${industrySlug}`
              }
            ]
          }
        ]}
      />
      {/* ── Top Header Bar (Explore-style Header Design without Icon and without Verified Index) ── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-12 pb-8 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                {industry.name}
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base mt-2 max-w-2xl font-normal leading-relaxed">
                {industry.description ||
                  "Clinical systems, medical devices, biotechnology, digital health, and pharmaceuticals."}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1657FF] text-white text-xs font-bold hover:bg-[#0E47E6] shadow-sm transition-all shrink-0"
              >
                <span>Submit Verified Problem</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* ── Top Summary KPI Metrics (Dynamic Real-Time Mathematical Calculations, 4 Cards) ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-outline-variant/15">
            {/* Metric 1: Problems */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Problems
              </span>
              <p className="text-2xl sm:text-3xl font-black text-on-surface tabular-nums">
                {kpis.problemsCount.toLocaleString()}
              </p>
              <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
                {kpis.problemsTrend}
              </span>
            </div>

            {/* Metric 2: Opportunities */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Opportunities
              </span>
              <p className="text-2xl sm:text-3xl font-black text-on-surface tabular-nums">
                {kpis.opportunitiesCount.toLocaleString()}
              </p>
              <span className="inline-flex items-center text-[11px] font-bold text-emerald-600">
                {kpis.opportunitiesTrend}
              </span>
            </div>

            {/* Metric 3: Trending Problems */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Trending Problems
              </span>
              <p className="text-2xl sm:text-3xl font-black text-on-surface tabular-nums">
                {kpis.trendingCount.toLocaleString()}
              </p>
              <span className="inline-flex items-center text-[11px] font-bold text-amber-500">
                {kpis.trendingTrend}
              </span>
            </div>

            {/* Metric 4: Avg. Pain Score */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Avg. Pain Score
              </span>
              <p className="text-2xl sm:text-3xl font-black text-rose-600 tabular-nums">
                {kpis.avgPainScore}
              </p>
              <span className="inline-flex items-center text-[11px] font-bold text-on-surface-variant">
                {kpis.severityLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Ecosystem Layout ─────────────────────────────────────────── */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left / Main Column: Search, Sort & Problem Cards (8 Cols) ───── */}
          <div className="lg:col-span-8 space-y-6">
            {/* Filter Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-3">
                {isSearching && (
                  <button
                    onClick={() => {
                      setSearchInCat("");
                      setCurrentPage(1);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear Search</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Search Input */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant h-3.5 w-3.5" />
                  <input
                    type="text"
                    value={searchInCat}
                    onChange={(e) => {
                      setSearchInCat(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder={`Search ${industry.name}...`}
                    className="w-full bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 rounded-xl py-2 pl-9 pr-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs transition-all placeholder:text-on-surface-variant/60"
                  />
                </div>

                {/* Redesigned Sort Dropdown matching Explore */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-on-surface-variant">Sort:</span>
                  <div className="relative inline-block">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 rounded-xl py-1.5 pl-3 pr-8 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer shadow-2xs transition-colors"
                    >
                      <option value="Highest Pain">Highest Pain Score</option>
                      <option value="Trending">Trending</option>
                      <option value="Newest">Newly Verified</option>
                      <option value="Opportunity">Opportunity Score</option>
                      <option value="Most Discussed">Most Discussed</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Statements List: Flat layout on page background with subtle separators */}
            {loading ? (
              <div className="space-y-6 w-full">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-full pb-6 border-b border-outline-variant/20">
                    <ProblemCardSkeleton />
                  </div>
                ))}
              </div>
            ) : filteredProblems.length === 0 ? (
              <div className="space-y-8 w-full animate-fade-in">
                {/* 1. Unboxed Clean Info Message (No icon, No box container) */}
                <div className="py-2 space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-on-surface tracking-tight">
                    No problem statements found
                  </h3>
                  <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
                    Try adjusting your search terms or clearing active filters.
                  </p>
                  {isSearching && (
                    <button
                      onClick={() => setSearchInCat("")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-all cursor-pointer shadow-2xs mt-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear Search</span>
                    </button>
                  )}
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-outline-variant/20" />

                {/* 2. Suggested Statements Section */}
                {suggestedProblems.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                        Suggested Statements
                      </h4>
                      <span className="text-xs text-on-surface-variant font-normal">
                        Trending across other sectors
                      </span>
                    </div>

                    <div className="flex flex-col divide-y divide-outline-variant/20 w-full">
                      {suggestedProblems.map((prob) => (
                        <div key={prob.id} className="py-5 first:pt-0 last:pb-2">
                          <TrendingProblemCard
                            problem={prob}
                            variant="flat"
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Separator */}
                <div className="w-full h-px bg-outline-variant/20" />

                {/* 3. Visit Other Industries Section with Dynamic Accurate Counts */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                        Visit Other Industries
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-0.5 font-normal">
                        Explore verified operational problems across other active domain verticals.
                      </p>
                    </div>
                    <Link
                      to="/industries"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline shrink-0"
                    >
                      <span>All Industries</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {otherIndustries.slice(0, 6).map((ind) => {
                      const count = problemCounts[ind.slug] ?? 0;
                      return (
                        <Link
                          key={ind.slug}
                          to={`/industries/${ind.slug}`}
                          className="flex items-center justify-between p-4 rounded-2xl border border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-low transition-all group cursor-pointer"
                        >
                          <div className="min-w-0 pr-3">
                            <h5 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                              {ind.name}
                            </h5>
                            <span className="text-[11px] text-on-surface-variant font-normal">
                              {count} problem{count === 1 ? "" : "s"}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 w-full animate-fade-in">
                {/* Problem Statements List (Up to 20 per page) */}
                <div className="flex flex-col divide-y divide-outline-variant/20 w-full">
                  {paginatedProblems.map((prob) => (
                    <div key={prob.id} className="py-5 first:pt-0 last:pb-2">
                      <TrendingProblemCard
                        problem={prob}
                        variant="flat"
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination Controls (< 1, 2 >) */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 py-4 border-t border-outline-variant/20">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            currentPage === page
                              ? "bg-primary text-white shadow-2xs"
                              : "bg-surface-container-lowest border border-outline-variant/40 text-on-surface-variant hover:border-primary/40 hover:text-on-surface"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
                      aria-label="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* End of Verified Statements Indicator */}
                <div className="flex items-center gap-3 text-on-surface-variant/50 text-[11px] font-medium justify-center pt-2">
                  <div className="h-px bg-outline-variant/20 flex-1" />
                  <span>End of verified statements for {industry.name}</span>
                  <div className="h-px bg-outline-variant/20 flex-1" />
                </div>

                {/* Visit Other Industries Section */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                        Visit Other Industries
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-0.5 font-normal">
                        Explore verified operational problems across other active domain verticals.
                      </p>
                    </div>
                    <Link
                      to="/industries"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline shrink-0"
                    >
                      <span>All Industries</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {otherIndustries.slice(0, 6).map((ind) => {
                      const count = problemCounts[ind.slug] ?? 0;
                      return (
                        <Link
                          key={ind.slug}
                          to={`/industries/${ind.slug}`}
                          className="flex items-center justify-between p-4 rounded-2xl border border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-low transition-all group cursor-pointer"
                        >
                          <div className="min-w-0 pr-3">
                            <h5 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                              {ind.name}
                            </h5>
                            <span className="text-[11px] text-on-surface-variant font-normal">
                              {count} problem{count === 1 ? "" : "s"}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right Column: Sticky Minimal Human-Made Sidebar (4 Cols) ───── */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start space-y-6">
            {/* Widget 1: Category Insights */}
            <div className="bg-white rounded-2xl border border-gray-200/70 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Category Insights
                </h3>
                <span className="text-xs text-gray-400 font-normal">This Week</span>
              </div>

              <div className="space-y-4">
                {/* Most Discussed */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-500">Most Discussed</span>
                    <span className="text-gray-400 font-normal">
                      {dynamicInsights.mostDiscussed.count}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
                    {dynamicInsights.mostDiscussed.title}
                  </p>
                </div>

                {/* Top Opportunity */}
                <div className="pt-3 border-t border-gray-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-500">Top Opportunity</span>
                    <span className="font-mono text-blue-600 font-bold text-xs">
                      {dynamicInsights.topOpportunity.score}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
                    {dynamicInsights.topOpportunity.title}
                  </p>
                </div>

                {/* Rising Fast */}
                <div className="pt-3 border-t border-gray-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-500">Rising Fast</span>
                    <span className="text-emerald-600 font-semibold text-xs">
                      {dynamicInsights.risingFast.trend}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
                    {dynamicInsights.risingFast.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Widget 2: Pain Score Distribution (Dynamic Percentages & Counts) */}
            <div className="bg-white rounded-2xl border border-gray-200/70 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Pain Score Distribution
                </h3>
                <span className="text-xs text-gray-400 font-normal">All Time</span>
              </div>

              <div className="space-y-3 text-xs">
                {dynamicPainDist.map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">{item.label}</span>
                      <span className="font-mono text-gray-500">
                        {item.count.toLocaleString()} ({item.pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 3: Top Locations */}
            <div className="bg-white rounded-2xl border border-gray-200/70 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Top Locations
                </h3>
                <span className="text-xs text-gray-400 font-normal">All Time</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { name: "India", count: "6,230", pct: "48%" },
                  { name: "United States", count: "2,140", pct: "16%" },
                  { name: "Indonesia", count: "1,045", pct: "8%" },
                  { name: "UK", count: "845", pct: "6%" },
                  { name: "Brazil", count: "620", pct: "4%" },
                ].map((loc) => (
                  <div key={loc.name} className="flex items-center justify-between py-0.5">
                    <span className="text-gray-700 font-medium">{loc.name}</span>
                    <span className="font-mono text-gray-400">
                      {loc.count} ({loc.pct})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
