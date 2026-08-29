import React from "react";
import { getProblems, getIndustries } from "@/lib/storage";
import { BarChart3, TrendingUp, Brain, PieChart, Activity, DollarSign } from "lucide-react";

export const AdminAnalytics: React.FC = () => {
  const problems = getProblems();
  const industries = getIndustries();

  const avgPain = Math.round(problems.reduce((acc, p) => acc + (p.painScore || 0), 0) / (problems.length || 1)) || 91;
  const avgOpp = Math.round(problems.reduce((acc, p) => acc + (p.opportunityScore || 0), 0) / (problems.length || 1)) || 88;

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-200/80 pb-5">
        <h1 className="text-2xl font-black text-zinc-950 tracking-tight">Platform Analytics & Intelligence</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Quantitative diagnostic distributions, submission velocity, and sector concentration.
        </p>
      </div>

      {/* Metric Cards (White Theme) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Mean Pain Severity</span>
          <p className="mt-2 text-3xl font-black text-rose-600 tabular-nums">{avgPain} / 100</p>
          <span className="text-[11px] text-zinc-500 mt-1 block">Across all reviewed problems</span>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Mean Opportunity Score</span>
          <p className="mt-2 text-3xl font-black text-emerald-600 tabular-nums">{avgOpp} / 100</p>
          <span className="text-[11px] text-zinc-500 mt-1 block">Commercial viability index</span>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Bounties Active</span>
          <p className="mt-2 text-3xl font-black text-[#1657FF] tabular-nums">₹2.8 Cr</p>
          <span className="text-[11px] text-zinc-500 mt-1 block">Funded by partner companies</span>
        </div>
      </div>

      {/* Sector Breakdown */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Sector Concentration</h3>
        <div className="space-y-4">
          {industries.map((ind) => {
            const count = ind.problemCount || ind.problemsCount || 0;
            const pct = Math.min(100, Math.round((count / 350) * 100));
            return (
              <div key={ind.slug} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-800 font-bold">{ind.name}</span>
                  <span className="font-mono text-zinc-500 font-semibold">{count} problems ({pct}%)</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                  <div className="h-full bg-[#1657FF] rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
