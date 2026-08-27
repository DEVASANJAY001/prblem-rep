import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { REAL_COMPETITIONS } from "@/data/realProductionData";
import { LoadingContainer } from "@/components/common/LoadingContainer";
import {
  Search,
  Trophy,
  Clock,
  Users,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const Competitions: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Competitions");
  const [search, setSearch] = useState("");
  const [competitionsList, setCompetitionsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial fallback data
    setCompetitionsList(REAL_COMPETITIONS);

    // 2. Real-time Firestore subscription
    try {
      if (db && typeof collection === "function") {
        const colRef = collection(db, "competitions");
        const unsubscribe = onSnapshot(
          colRef,
          (snapshot) => {
            if (!snapshot.empty) {
              const list: any[] = [];
              snapshot.forEach((d) => list.push(d.data()));
              setCompetitionsList(list);
            }
            setLoading(false);
          },
          (err) => {
            console.warn("Competitions Firestore fetch (using fallback):", err.message);
            setLoading(false);
          }
        );
        return () => unsubscribe();
      }
    } catch (e) {
      setLoading(false);
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
          Competitions
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Participate in challenges. Solve real problems. Win rewards.
        </p>

        {/* Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search competitions..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-10 pr-3 text-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>

          <select className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <option>All Status ▾</option>
            <option>Open</option>
            <option>Upcoming</option>
            <option>Completed</option>
          </select>

          <select className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <option>All Categories ▾</option>
            <option>Healthcare</option>
            <option>Agriculture</option>
            <option>AI</option>
            <option>Energy</option>
          </select>

          <select className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <option>Sort by: Ending Soon ▾</option>
            <option>Sort by: Prize (High to Low)</option>
          </select>
        </div>

        {/* Status Tab Pills */}
        <div className="mt-6 flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800 text-xs font-bold">
          {["All Competitions", "Open", "Upcoming", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-3.5 py-1.5 transition-colors ${
                activeTab === tab
                  ? "bg-[#1657FF] text-white"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Competition Cards */}
      {loading ? (
        <LoadingContainer
          message="Fetching active competitions & problem bounties from Cloud Firestore..."
          submessage="Retrieving live prize pools, deadlines, and participant telemetry."
          minHeight="min-h-[300px]"
        />
      ) : competitionsList.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
          No competitions available currently.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {competitionsList.map((comp) => (
            <div
              key={comp.id}
              className="card-hover-lift group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Top Banner Image with Status Pill */}
              <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
                <img
                  src={comp.sponsorLogo || comp.banner || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80"}
                  alt={comp.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <span
                className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase shadow-sm ${
                  comp.status === "OPEN"
                    ? "bg-emerald-500 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {comp.status}
              </span>

              <h3 className="absolute bottom-3 left-3 right-3 text-sm font-extrabold text-white line-clamp-2">
                {comp.title}
              </h3>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-1">
                  {comp.subtitle}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                  {comp.description}
                </p>
              </div>

              {/* Prize Pool & Participants */}
              <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-medium">Price Pool</span>
                    <strong className="text-sm font-black text-zinc-900 dark:text-white">{comp.prizePool}</strong>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-zinc-400 block font-medium">Participants</span>
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{comp.participants.split(" ")[0]}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block font-medium">Time Left</span>
                    <span className="text-xs font-bold text-rose-500">{comp.timeLeft}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {comp.tags.map((t) => (
                    <span key={t} className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

      {/* Bottom Organize Competition Banner */}
      <div className="rounded-3xl border border-amber-100 bg-[#FFFDF5] p-8 dark:border-amber-950 dark:bg-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-zinc-950 dark:text-white">
            Want to organize a competition?
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Create challenges, engage innovators and solve real-world problems.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Trophy className="h-10 w-10 text-amber-500" />
        </div>
      </div>
    </div>
  );
};
