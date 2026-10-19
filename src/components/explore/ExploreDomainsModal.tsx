import React, { useState, useMemo, useCallback } from "react";
import { IndustryDoc } from "@/types";
import { DomainStats, sanitizeAndSeparateIndustries } from "@/lib/algorithms/domainIntelligence";
import {
  X,
  Search,
  Check,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

interface ExploreDomainsModalProps {
  isOpen: boolean;
  onClose: () => void;
  popularDomains: IndustryDoc[];
  trendingDomains?: IndustryDoc[];
  allDomains: IndustryDoc[];
  domainStats: Record<string, DomainStats>;
  selectedIndustries: string[];
  onSelectIndustry: (industryName: string) => void;
  onClearSelection: () => void;
}

// Optimized, memoized Popular Domain Card
const PopularCard = React.memo<{
  ind: IndustryDoc;
  isSelected: boolean;
  stats?: DomainStats;
  onClick: (name: string) => void;
}>(({ ind, isSelected, stats, onClick }) => {
  const problemCount = stats?.problemCount || ind.problemCount || ind.problemsCount || 0;

  return (
    <button
      type="button"
      onClick={() => onClick(ind.name)}
      className={`group flex flex-col p-3 rounded-xl text-left transition-colors cursor-pointer relative overflow-hidden bg-transparent border ${
        isSelected
          ? "border-primary text-primary font-bold shadow-xs ring-1 ring-primary/40"
          : "border-outline-variant/30 hover:border-primary/60 text-on-surface"
      }`}
    >
      <div className="flex items-center justify-between w-full mb-1">
        <span className={`text-xs truncate pr-1 ${isSelected ? "font-bold text-primary" : "font-medium"}`}>
          {ind.name}
        </span>
        {isSelected && (
          <span className="w-3.5 h-3.5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
            <Check className="w-2 h-2 stroke-[3]" />
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant">
        <span>{problemCount} {problemCount === 1 ? "problem" : "problems"}</span>
        {stats?.criticalCount ? (
          <span className="text-rose-500 font-semibold">• {stats.criticalCount} crit</span>
        ) : null}
      </div>
    </button>
  );
});
PopularCard.displayName = "PopularCard";

// Optimized, memoized All Domain Card
const AllDomainCard = React.memo<{
  ind: IndustryDoc;
  isSelected: boolean;
  stats?: DomainStats;
  onClick: (name: string) => void;
}>(({ ind, isSelected, stats, onClick }) => {
  const problemCount = stats?.problemCount || ind.problemCount || ind.problemsCount || 0;

  return (
    <button
      type="button"
      onClick={() => onClick(ind.name)}
      className={`group flex items-center justify-between p-3 rounded-xl text-left transition-colors cursor-pointer bg-transparent border ${
        isSelected
          ? "border-primary text-primary font-bold shadow-xs ring-1 ring-primary/40"
          : "border-outline-variant/30 hover:border-primary/60 text-on-surface"
      }`}
    >
      <div className="flex flex-col truncate pr-2">
        <span className={`text-xs truncate ${isSelected ? "font-bold text-primary" : "font-medium"}`}>
          {ind.name}
        </span>
        <span className="text-[10px] text-on-surface-variant">
          {problemCount} {problemCount === 1 ? "problem" : "problems"}
        </span>
      </div>
      {isSelected ? (
        <span className="w-3.5 h-3.5 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
          <Check className="w-2 h-2 stroke-[3]" />
        </span>
      ) : (
        <span className="text-on-surface-variant/40 group-hover:text-primary transition-colors text-xs">
          →
        </span>
      )}
    </button>
  );
});
AllDomainCard.displayName = "AllDomainCard";

const ExploreDomainsModalComponent: React.FC<ExploreDomainsModalProps> = ({
  isOpen,
  onClose,
  popularDomains,
  allDomains,
  domainStats,
  selectedIndustries,
  onSelectIndustry,
  onClearSelection,
}) => {
  const [search, setSearch] = useState("");

  const cleanPopular = useMemo(() => sanitizeAndSeparateIndustries(popularDomains || []), [popularDomains]);
  const cleanAll = useMemo(() => sanitizeAndSeparateIndustries(allDomains || []), [allDomains]);

  // Fast O(1) set lookup for selected industries
  const selectedSet = useMemo(() => new Set(selectedIndustries), [selectedIndustries]);

  const handleDomainClick = useCallback((name: string) => {
    onSelectIndustry(name);
  }, [onSelectIndustry]);

  const filterQuery = search.toLowerCase().trim();

  const filteredPopular = useMemo(() => {
    if (!filterQuery) return cleanPopular;
    return cleanPopular.filter(
      (ind) =>
        ind.name.toLowerCase().includes(filterQuery) ||
        ind.slug.toLowerCase().includes(filterQuery)
    );
  }, [cleanPopular, filterQuery]);

  const filteredAll = useMemo(() => {
    if (!filterQuery) return cleanAll;
    return cleanAll.filter(
      (ind) =>
        ind.name.toLowerCase().includes(filterQuery) ||
        ind.slug.toLowerCase().includes(filterQuery)
    );
  }, [cleanAll, filterQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/50 transition-opacity duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden transform-gpu will-change-transform animate-in fade-in zoom-in-95 duration-150 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header (Solid background for high performance) */}
        <div className="flex flex-col gap-3 p-5 sm:p-6 border-b border-outline-variant/20 bg-surface-container-lowest">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-on-surface">
                Explore by Domain
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Select domain verticals to filter verified challenges and problem statements
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full pt-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search domains or sectors..."
              className="w-full bg-surface-container-high/40 rounded-xl py-2 pl-9 pr-8 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all border border-transparent focus:border-primary/30"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Body: Scrollable Sections */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 overscroll-contain">
          {/* Section 1: Popular Domains */}
          {filteredPopular.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface">
                  Popular Domains
                </h3>
              </div>

              {/* Simple border lines, no background */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {filteredPopular.map((ind) => (
                  <PopularCard
                    key={`pop-${ind.slug}`}
                    ind={ind}
                    isSelected={selectedSet.has(ind.name)}
                    stats={domainStats[ind.slug]}
                    onClick={handleDomainClick}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Separator line below Popular section */}
          {filteredPopular.length > 0 && (
            <div className="border-b border-outline-variant/20 pt-1" />
          )}

          {/* Section 2: All Domains */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface">
                All Domains ({filteredAll.length})
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {filteredAll.map((ind) => (
                <AllDomainCard
                  key={`all-${ind.slug}`}
                  ind={ind}
                  isSelected={selectedSet.has(ind.name)}
                  stats={domainStats[ind.slug]}
                  onClick={handleDomainClick}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Modal Footer (Solid background for high performance) */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-t border-outline-variant/20 bg-surface-container-lowest">
          <div className="flex items-center gap-2">
            {selectedIndustries.length > 0 ? (
              <button
                type="button"
                onClick={onClearSelection}
                className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters ({selectedIndustries.length})</span>
              </button>
            ) : (
              <span className="text-xs text-on-surface-variant font-medium">
                Showing all domains
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-on-surface text-surface text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Done</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExploreDomainsModal = React.memo(ExploreDomainsModalComponent);
