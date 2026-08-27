import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { LoadingContainer } from "@/components/common/LoadingContainer";
import { IndustryDoc } from "@/types";
import {
  Search,
  Heart,
  Leaf,
  Landmark,
  GraduationCap,
  Car,
  Zap,
  ShoppingBag,
  ArrowRight,
  PlusCircle,
  Building2,
  Bot,
  ShieldCheck,
  Scale,
  Hammer,
  Coffee,
  Globe,
  Layers,
  Sparkles,
  Activity,
} from "lucide-react";

// Dynamic Icon Map
const ICON_MAP: Record<string, any> = {
  Activity,
  Heart,
  Leaf,
  Bot,
  Zap,
  GraduationCap,
  Building2,
  Car,
  ShoppingBag,
  ShieldCheck,
  Scale,
  Landmark,
  Hammer,
  Coffee,
  Globe,
  Layers,
  Sparkles,
};

export const Industries: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [industriesList, setIndustriesList] = useState<IndustryDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial fallback data
    setIndustriesList(REAL_INDUSTRIES);

    // 2. Real-time Firestore subscription
    try {
      if (db && typeof collection === "function") {
        const colRef = collection(db, "industries");
        const unsubscribe = onSnapshot(
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
        return () => unsubscribe();
      }
    } catch (e) {
      setLoading(false);
    }
  }, []);

  const filtered = industriesList.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    (i.description && i.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
          Industries
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Browse problems by industry and discover verified friction in your domain.
        </p>

        {/* Search Input */}
        <div className="mt-5 max-w-md">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search industries..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 shadow-xs focus:border-[#1657FF] focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>
      </div>

      {/* Sector Cards Grid */}
      {loading ? (
        <LoadingContainer
          message="Fetching industry verticals & mapped telemetry from Cloud Firestore..."
          submessage="Synchronizing real-world domain categories and bounty distributions."
          minHeight="min-h-[300px]"
        />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
          No industries matching "{search}"
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ind) => {
            const Icon = ICON_MAP[ind.icon] || Building2;
            return (
              <div
                key={ind.slug}
                onClick={() => navigate(`/industries/${ind.slug}`)}
                className="card-hover-lift group cursor-pointer rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:border-[#1657FF]/40"
              >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-xs"
                  style={{ backgroundColor: ind.color || "#1657FF" }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                  {ind.weeklyTrend || "↑ 24% this week"}
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-white group-hover:text-[#1657FF] transition-colors">
                {ind.name}
              </h3>
              <p className="mt-1 text-xs text-zinc-500 font-medium">
                {(ind.problemCount || 12840).toLocaleString()} Problems
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs font-semibold text-[#1657FF] dark:border-zinc-800">
                <span>Explore sector hub</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Bottom Request Banner */}
      <div className="rounded-2xl border border-zinc-200/80 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-6 sm:p-8 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Don&apos;t see your industry listed?
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            Submit a problem from your specialized sector or request an index addition.
          </p>
        </div>
        <Link
          to="/submit"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#1657FF] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0E47E6] transition-all shrink-0"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Submit a Problem</span>
        </Link>
      </div>
    </div>
  );
};
