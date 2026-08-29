import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { IndustryDoc, ProblemDoc } from "@/types";
import {
  Search,
  ArrowRight,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

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

export const Industries: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Most Problems");
  const [industriesList, setIndustriesList] = useState<IndustryDoc[]>(REAL_INDUSTRIES);
  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial fallback data
    setIndustriesList(REAL_INDUSTRIES);

    // 2. Real-time Firestore subscription for industries
    let unsubIndustries = () => {};
    try {
      if (db && typeof collection === "function") {
        const colRef = collection(db, "industries");
        unsubIndustries = onSnapshot(
          colRef,
          (snapshot) => {
            if (!snapshot.empty) {
              const list: IndustryDoc[] = [];
              snapshot.forEach((d) => list.push(d.data() as IndustryDoc));
              setIndustriesList(list);
            }
            setLoading(false);
          },
          (err) => {
            console.warn("Industries Firestore fetch (using fallback):", err.message);
            setLoading(false);
          }
        );
      }
    } catch (e) {
      setLoading(false);
    }

    // 3. Subscribe to real problems to calculate live counts per industry
    const unsubProblems = subscribeProblems({ status: "approved" }, (list) => {
      setAllProblems(list);
    });

    return () => {
      unsubIndustries();
      unsubProblems();
    };
  }, []);

  // Compute live problem counts mapped by canonical industry slug
  const problemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allProblems.forEach((p) => {
      const canonical = getCanonicalIndustry(p.industry || "");
      counts[canonical] = (counts[canonical] || 0) + 1;
    });
    return counts;
  }, [allProblems]);

  const filtered = useMemo(() => {
    const list = industriesList.filter((i) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        i.name.toLowerCase().includes(q) ||
        (i.description && i.description.toLowerCase().includes(q))
      );
    });

    return list.sort((a, b) => {
      const countA = problemCounts[a.slug] ?? a.problemsCount ?? 0;
      const countB = problemCounts[b.slug] ?? b.problemsCount ?? 0;

      if (sortBy === "Most Problems") {
        return countB - countA;
      }
      if (sortBy === "Alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [industriesList, search, sortBy, problemCounts]);

  const isSearching = search.trim().length > 0;

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      {/* ── Top Hero Header Section (Matching Explore / Home Design) ─────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-12 pb-8 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Industry Verticals
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base mt-2 max-w-2xl font-normal leading-relaxed">
                Discover verified real-world operational bottlenecks, clinical friction, and enterprise demand signals categorized by domain sector.
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
          <div className="w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant h-5 w-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-2xl py-4 pl-12 pr-28 text-sm md:text-base text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm hover:shadow-md placeholder:text-on-surface-variant/60"
              placeholder="Search industries, sectors, or domains..."
              type="text"
            />
            {isSearching && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-surface-container-low text-on-surface-variant hover:text-on-surface px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Toolbar: Results Count & Sort Dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/20">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
              <span>Showing</span>
              <span className="text-primary font-bold">{filtered.length}</span>
              <span>industry verticals</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-on-surface-variant">Sort:</span>
              <div className="relative inline-block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 rounded-xl py-1.5 pl-3 pr-8 text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer shadow-2xs transition-colors"
                >
                  <option value="Most Problems">Most Problems</option>
                  <option value="Alphabetical">Alphabetical (A–Z)</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Industries Content (Clean Minimal Human-Made Cards Grid) ────── */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-10 space-y-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-2xl bg-surface-container/40 border border-outline-variant/20 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="space-y-6 w-full py-12 max-w-xl mx-auto text-center animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-on-surface">
                No industry verticals found
              </h3>
              <p className="text-sm text-on-surface-variant font-normal">
                No sectors matched &ldquo;{search}&rdquo;. Try a different keyword or browse all domain categories.
              </p>
            </div>
            <button
              onClick={() => setSearch("")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-all cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-in">
            {filtered.map((ind) => {
              const count = problemCounts[ind.slug] ?? 0;

              return (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  className="flex items-center justify-between p-4 rounded-2xl border border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-low transition-all group cursor-pointer"
                >
                  <div className="min-w-0 pr-3">
                    <h5 className="text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate">
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
        )}

        {/* ── Bottom Request / Addition Banner ───────────────────────────────── */}
        <div className="rounded-3xl border border-outline-variant/30 bg-surface-container-low p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-on-surface">
              Don&apos;t see your industry listed?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant font-normal leading-relaxed">
              Submit a verified operational problem from your specialized sector or request an index addition.
            </p>
          </div>
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shadow-sm shrink-0"
          >
            <span>Submit a Problem</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};
