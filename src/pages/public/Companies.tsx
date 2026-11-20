import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { fetchCompaniesBatch } from "@/lib/firebase/services/companiesService";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { CompanyDoc, ProblemDoc } from "@/types";
import { REAL_COMPANIES } from "@/data/realProductionData";
import { CompanyCard } from "@/components/ui/CompanyCard";
import { TrendingProblemCard } from "@/components/ui/TrendingProblemCard";
import { ProblemCardSkeleton } from "@/components/common/LoadingContainer";
import {
  Search,
  Building2,
  PlusCircle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ArrowDown,
  Loader2,
  Filter,
  CheckCircle2,
  X,
} from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";

// Industry filter pills (Text-only matching Explore)
const INDUSTRY_HUBS = [
  { name: "Healthcare", slug: "healthcare" },
  { name: "AI & Tech", slug: "technology" },
  { name: "Clean Energy", slug: "energy" },
  { name: "FinTech", slug: "fintech" },
  { name: "Agriculture", slug: "agriculture" },
  { name: "Logistics", slug: "logistics" },
  { name: "Manufacturing", slug: "manufacturing" },
];

const PAGE_SIZE = 16;

export const Companies: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCompany = searchParams.get("company") || "";

  const [search, setSearch] = useState("");
  const [companySort, setCompanySort] = useState("Most Statements");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>(initialCompany);

  const [companiesList, setCompaniesList] = useState<CompanyDoc[]>([]);
  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  // Sync search param when selectedCompany changes
  useEffect(() => {
    if (initialCompany && initialCompany !== selectedCompany) {
      setSelectedCompany(initialCompany);
    }
  }, [initialCompany]);

  const loadInitialBatch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchCompaniesBatch(PAGE_SIZE, null, 0);
      setCompaniesList(res.companies);
      setLastDoc(res.lastDoc);
      setHasMore(res.hasMore);
    } catch (err) {
      console.warn("Companies initial batch fetch fallback:", err);
      const fallback = REAL_COMPANIES.slice(0, PAGE_SIZE);
      setCompaniesList(fallback);
      setHasMore(REAL_COMPANIES.length > PAGE_SIZE);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialBatch();

    const unsubProblems = subscribeProblems({ status: "approved" }, (list) => {
      setAllProblems(list);
    });

    return () => {
      unsubProblems();
    };
  }, [loadInitialBatch]);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const res = await fetchCompaniesBatch(PAGE_SIZE, lastDoc, companiesList.length);
      setCompaniesList((prev) => {
        const seen = new Set(prev.map((c) => c.id || c.name.toLowerCase()));
        const nextUnique = res.companies.filter((c) => !seen.has(c.id || c.name.toLowerCase()));
        return [...prev, ...nextUnique];
      });
      setLastDoc(res.lastDoc);
      setHasMore(res.hasMore);
    } catch (err) {
      console.warn("Failed to load more companies:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Compute statements attached per company
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

  const handleSelectCompany = (companyName: string) => {
    if (selectedCompany.toLowerCase() === companyName.toLowerCase()) {
      setSelectedCompany("");
      setSearchParams({});
    } else {
      setSelectedCompany(companyName);
      setSearchParams({ company: companyName });
      // Smooth scroll down to the statements section
      const statementsEl = document.getElementById("company-statements-section");
      if (statementsEl) {
        statementsEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedIndustries([]);
    setSelectedCompany("");
    setSearchParams({});
  };

  // Filtered and sorted companies list
  const filteredCompanies = useMemo(() => {
    const list = companiesList.filter((c) => {
      if (c.hidden) return false;
      if (
        search.trim() &&
        !c.name.toLowerCase().includes(search.toLowerCase()) &&
        !c.industry.toLowerCase().includes(search.toLowerCase()) &&
        !c.description?.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (
        selectedIndustries.length > 0 &&
        !selectedIndustries.some((ind) =>
          c.industry.toLowerCase().includes(ind.toLowerCase())
        )
      ) {
        return false;
      }
      return true;
    });

    return list.sort((a, b) => {
      const countA = companyProblemCounts[a.name.toLowerCase()] || 0;
      const countB = companyProblemCounts[b.name.toLowerCase()] || 0;
      if (companySort === "Most Statements") return countB - countA;
      if (companySort === "Name A-Z") return a.name.localeCompare(b.name);
      if (companySort === "Verified") return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
      return 0;
    });
  }, [companiesList, search, selectedIndustries, companySort, companyProblemCounts]);

  // Filtered problem statements based on selected company
  const filteredCompanyProblems = useMemo(() => {
    if (!selectedCompany) return allProblems;

    return allProblems.filter((p) => {
      const attached = Array.isArray(p.attachedCompanyNames) && p.attachedCompanyNames.length > 0
        ? p.attachedCompanyNames
        : (p.tags || []);

      const indLower = (p.industry || "").toLowerCase();
      const selLower = selectedCompany.toLowerCase();

      return (
        attached.some((name) => name.toLowerCase() === selLower) ||
        p.title.toLowerCase().includes(selLower) ||
        p.description.toLowerCase().includes(selLower) ||
        (selLower.includes("health") && indLower.includes("health")) ||
        (selLower.includes("google") && (indLower.includes("tech") || indLower.includes("ai")))
      );
    });
  }, [allProblems, selectedCompany]);

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      {/* SEO: ItemList schema for corporate / partner directory */}
      <SEOHead
        title="Partner Companies & Enterprise Innovation Scouts"
        description="Explore organizations, enterprises, and research labs actively scouting and solving verified problem statements on Stuckhere."
        canonicalUrl="https://stuckhere.davns.com/companies"
        ogType="website"
        keywords={["enterprise problem statements", "company challenges", "innovation scouting", "corporate startup programs", "enterprise demand signals"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Partner Companies & Enterprise Scouts",
          "description": "Organizations actively scouting and posting verified real-world operational problems.",
          "url": "https://stuckhere.com/companies",
          "numberOfItems": companiesList.length,
          "itemListElement": companiesList.slice(0, 10).map((c, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": c.name,
            "description": c.description || `${c.name} in ${c.industry}`
          }))
        }}
      />
      {/* ── Top Hero Header Section (Matching Explore / Home Design) ─────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-8 pb-5 sm:pt-12 sm:pb-8 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-4 sm:space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Explore Companies
              </h1>
              <p className="text-on-surface-variant text-xs sm:text-sm md:text-base mt-1 max-w-2xl font-normal">
                Discover verified real-world operational bottlenecks, quantified clinical friction, and enterprise demand signals categorized by partner companies.
              </p>
            </div>

            <Link
              to="/submit"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-primary text-white text-[11px] sm:text-xs font-bold hover:bg-primary-container shadow-sm transition-all shrink-0"
            >
              <PlusCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Submit Problem</span>
            </Link>
          </div>

          {/* Search Input */}
          <div className="w-full relative">
            <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant h-4 w-4 sm:h-5 sm:w-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-2xl py-2.5 sm:py-4 pl-10 sm:pl-12 pr-4 text-xs sm:text-base text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm hover:shadow-md"
              placeholder="Search partner companies by name, sector, or keywords..."
              type="text"
            />
          </div>

          {/* Industry Category Filter Pills (Text-only) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <button
              onClick={() => setSelectedIndustries([])}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
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

          {/* Filter Status & Simple Sort Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/20 text-xs">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 font-semibold text-on-surface-variant">
                <span>Total Companies :</span>
                <span className="text-primary font-bold">{filteredCompanies.length}</span>
              </div>

              {selectedCompany && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-semibold">
                  <span>Filtered by: <strong>{selectedCompany}</strong></span>
                  <button
                    onClick={() => handleSelectCompany("")}
                    className="hover:text-primary-container cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {(search || selectedIndustries.length > 0 || selectedCompany) && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Simple Minimalist Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-on-surface-variant">Sort:</span>
              <div className="relative inline-block">
                <select
                  value={companySort}
                  onChange={(e) => setCompanySort(e.target.value)}
                  className="appearance-none bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 rounded-xl py-1.5 pl-3 pr-8 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer shadow-2xs transition-colors"
                >
                  <option value="Most Statements">Most Statements</option>
                  <option value="Name A-Z">Name (A-Z)</option>
                  <option value="Verified">Verified First</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ──────────────────────────────────────────────── */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-12">
        {/* 1. All Partner Companies Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-on-surface">
              Select a Company to View Statements
            </h2>
            <span className="text-xs text-on-surface-variant font-medium">
              Click any company card to filter statements below
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="h-44 bg-surface-container-low rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="text-center py-16 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 space-y-4">
              <Building2 className="w-10 h-10 text-on-surface-variant/40 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-on-surface">No partner companies found</h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                  No organizations match your current search and industry criteria in the loaded batch.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface text-xs font-semibold hover:bg-surface-container cursor-pointer transition-colors shadow-2xs"
                >
                  Reset Filters
                </button>
                {hasMore && (
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-all cursor-pointer shadow-sm disabled:opacity-60"
                  >
                    {loadingMore ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <ArrowDown className="w-3.5 h-3.5" />
                    )}
                    <span>Fetch Next 16 from Database</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredCompanies.map((comp) => {
                  const isSelected =
                    selectedCompany.toLowerCase() === comp.name.toLowerCase();
                  return (
                    <div
                      key={comp.id}
                      className={`relative rounded-3xl transition-all duration-300 ${
                        isSelected
                          ? "ring-3 ring-primary shadow-xl scale-[1.02]"
                          : ""
                      }`}
                    >
                      <CompanyCard
                        company={comp}
                        problemsCount={
                          companyProblemCounts[comp.name.toLowerCase()] || 4
                        }
                        onClick={() => handleSelectCompany(comp.name)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* ── Paginated "Load More" Control with Vector Arrow ────────────── */}
              {hasMore && (
                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 hover:border-primary/50 text-xs sm:text-sm font-bold text-on-surface hover:text-primary transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.99]"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
                        <span>Fetching next 16 companies...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More Companies</span>
                        <span className="text-[11px] text-on-surface-variant font-normal">
                          (Showing {filteredCompanies.length})
                        </span>
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                        </div>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-on-surface-variant/70 mt-2 flex items-center gap-1.5">
                    <span>Fetched in batches of 16 to minimize Firestore read operations</span>
                  </p>
                </div>
              )}

              {!hasMore && filteredCompanies.length > 0 && (
                <div className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-on-surface-variant">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>All {filteredCompanies.length} enterprise partners loaded</span>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 2. Company-Wise Problem Statements Section */}
        <section id="company-statements-section" className="space-y-4 pt-4 border-t border-outline-variant/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight">
                {selectedCompany
                  ? `${selectedCompany} Problem Statements`
                  : "All Verified Problem Statements Across Companies"}
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant font-normal mt-0.5">
                {selectedCompany
                  ? `Active clinical, operational, and technical challenges associated with ${selectedCompany}.`
                  : "Browse real-world problem statements attached to enterprise partners and solvers."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-on-surface-variant font-medium">
                Showing {filteredCompanyProblems.length} statements
              </span>
              {selectedCompany && (
                <button
                  onClick={() => handleSelectCompany("")}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  View All Companies
                </button>
              )}
            </div>
          </div>

          {filteredCompanyProblems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 space-y-4 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                No problem statements currently listed for {selectedCompany}
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Be the first to document and submit a validated problem statement for {selectedCompany}.
              </p>
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Problem Statement</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full animate-fade-in">
              {filteredCompanyProblems.map((prob) => (
                <TrendingProblemCard
                  key={prob.id}
                  problem={prob}
                  className="w-full h-full"
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
