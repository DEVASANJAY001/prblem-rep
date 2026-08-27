import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subscribeResearch } from "@/lib/firebase/services/researchService";
import { ResearchDoc } from "@/types";
import {
  Search,
  BookOpen,
  FileText,
  Download,
  Star,
  ArrowRight,
  SlidersHorizontal,
  Layers,
  Database,
  Cpu,
  Heart,
  Leaf,
  GraduationCap,
  Zap,
} from "lucide-react";

export const Research: React.FC = () => {
  const [search, setSearch] = useState("");
  const [researchList, setResearchList] = useState<ResearchDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeResearch((list) => {
      setResearchList(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const trendingTopics = [
    { name: "Artificial Intelligence", count: "1,240 Papers", icon: Cpu, color: "text-purple-600 bg-purple-50" },
    { name: "Healthcare Technology", count: "980 Papers", icon: Heart, color: "text-blue-600 bg-blue-50" },
    { name: "Sustainable Energy", count: "875 Papers", icon: Zap, color: "text-amber-500 bg-amber-50" },
    { name: "Smart Agriculture", count: "642 Papers", icon: Leaf, color: "text-emerald-600 bg-emerald-50" },
    { name: "Education Technology", count: "580 Papers", icon: GraduationCap, color: "text-rose-600 bg-rose-50" },
  ];

  const filtered = researchList.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    (r.summary && r.summary.toLowerCase().includes(search.toLowerCase())) ||
    (r.source && r.source.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
          Research & Open Datasets
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Explore peer-reviewed research papers, clinical reports, and empirical datasets backing verified problems.
        </p>

        {/* Filter Row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search research papers, topics, datasets..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-10 pr-3 text-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Trending Topics Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {trendingTopics.map((topic, i) => {
          const Icon = topic.icon;
          return (
            <div
              key={i}
              onClick={() => setSearch(topic.name.split(" ")[0])}
              className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-xs hover:border-zinc-300 transition-all dark:border-zinc-800 dark:bg-zinc-900 cursor-pointer"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${topic.color} dark:bg-zinc-800 shrink-0`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{topic.name}</h2>
                <span className="text-[10px] text-zinc-400 font-medium">{topic.count}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Research List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400">
                  {item.type.toUpperCase()}
                </span>
                <span className="text-xs text-zinc-400">·</span>
                <span className="text-xs text-zinc-500 font-medium">
                  {item.source} {item.year ? `• ${item.year}` : ""} {item.readTime ? `• ${item.readTime}` : ""}
                </span>
              </div>

              <h2 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                {item.title}
              </h2>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>

              {item.author && (
                <p className="text-[11px] text-zinc-400 font-medium pt-1">
                  Author: <span className="text-zinc-600 dark:text-zinc-300">{item.author}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-[#1657FF] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0E47E6] transition-all"
              >
                <span>Read Research</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
