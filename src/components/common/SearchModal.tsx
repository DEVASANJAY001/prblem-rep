import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProblems } from "@/lib/storage";
import { getProblemDetailUrl } from "@/lib/seoUrls";
import { ProblemDoc } from "@/types";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  PlusCircle,
  FileText,
  Activity,
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAllProblems(getProblems({ status: "approved" }));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickSuggestions = [
    "Sustainable energy solutions",
    "Mental health for students",
    "Traffic management in urban cities",
    "Smart agriculture disease prediction",
    "Hospital management & OPD waiting time",
    "Practical AI education for students",
    "Waste management & segregation",
    "Water conservation in agriculture",
  ];

  const trendingSearches = [
    "AI healthcare",
    "Smart agriculture",
    "Electric vehicles",
    "Water conservation",
    "Fintech solutions",
    "Remote education",
    "Cybersecurity",
    "E-waste management",
  ];

  const recentSearches = [
    "College attendance system",
    "Farmers crop prediction",
    "Renewable energy storage",
    "Hospital management system",
    "Waste segregation solution",
  ];

  const filteredResults = query.trim()
    ? allProblems.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.industry.toLowerCase().includes(query.toLowerCase())
      )
    : allProblems.slice(0, 5);

  const handleSelectProblem = (prob: ProblemDoc) => {
    onClose();
    navigate(getProblemDetailUrl(prob));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/60 p-4 pt-16 backdrop-blur-sm sm:p-6 sm:pt-20">
      <div
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-zinc-200 px-4 py-3.5 dark:border-zinc-800">
          <Search className="h-5 w-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, industries, people, companies, research..."
            autoFocus
            className="ml-3 flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100"
          />
          <div className="flex items-center gap-2">
            <span className="hidden rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800 sm:inline">
              Press ↵
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* 3-Column Discovery Grid */}
        <div className="grid grid-cols-1 divide-y divide-zinc-100 dark:divide-zinc-800 md:grid-cols-12 md:divide-x md:divide-y-0 text-xs">
          {/* Col 1: Quick Suggestions (3 cols) */}
          <div className="p-4 md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Quick Suggestions
            </h4>
            <div className="space-y-1.5">
              {quickSuggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setQuery(item);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg p-1.5 text-left text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80 transition-colors"
                >
                  <Search className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                  <span className="truncate">{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Top Results (5 cols) */}
          <div className="p-4 md:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Top Results
              </h4>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/explore?q=${encodeURIComponent(query)}`);
                }}
                className="text-[11px] font-semibold text-primary hover:underline"
              >
                View all results
              </button>
            </div>

            <div className="space-y-2">
              {filteredResults.map((prob) => (
                <div
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className="cursor-pointer rounded-xl border border-zinc-100 bg-zinc-50/70 p-3 hover:border-primary/30 hover:bg-primary/5 dark:border-zinc-800 dark:bg-zinc-950/50 transition-all"
                >
                  <h5 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {prob.title}
                  </h5>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="rounded bg-zinc-200/70 px-1.5 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 font-medium">
                        {prob.industry.split(" ")[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-zinc-400">Pain <strong className="text-rose-500">{prob.painScore}</strong></span>
                      <span className="text-zinc-400">Opp <strong className="text-emerald-500">{prob.opportunityScore}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Trending & Recent Searches (4 cols) */}
          <div className="p-4 md:col-span-4 space-y-5">
            {/* Trending */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Trending Searches
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {trendingSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(`/explore?q=${encodeURIComponent(item)}`);
                    }}
                    className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-[11px] text-zinc-700 hover:border-primary hover:text-primary dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            <div className="space-y-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Recent Searches
                </h4>
                <button type="button" className="text-[10px] text-zinc-400 hover:text-zinc-600">
                  Clear all
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(`/explore?q=${encodeURIComponent(item)}`);
                    }}
                    className="flex w-full items-center gap-2 rounded-md py-1 text-left text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-zinc-200 text-[11px]"
                  >
                    <Clock className="h-3 w-3 text-zinc-400" />
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/80 text-xs">
          <div className="flex items-center gap-2 text-zinc-500">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Can&apos;t find what you&apos;re looking for? Submit a problem and help the community.</span>
          </div>
          <button
            onClick={() => {
              onClose();
              navigate("/submit");
            }}
            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-primary/90 transition-all"
          >
            <span>Submit a Problem</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
