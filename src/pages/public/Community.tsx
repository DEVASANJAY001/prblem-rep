import React, { useState, useEffect } from "react";
import { subscribeLeaderboard } from "@/lib/firebase/services/usersService";
import { UserDoc } from "@/types";
import {
  Trophy,
  Award,
  Crown,
  Medal,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Users,
} from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";

export const Community: React.FC = () => {
  const [activeTime, setActiveTime] = useState("All Time");
  const [usersList, setUsersList] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeLeaderboard((list) => {
      setUsersList(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const sortedUsers = [...usersList].sort(
    (a, b) => (b.counts?.problemsApproved || 0) * 100 + (b.counts?.votes || 0) - ((a.counts?.problemsApproved || 0) * 100 + (a.counts?.votes || 0))
  );

  const top1 = sortedUsers[0] || {
    name: "Dr. Elena Rostova",
    role: "Domain Expert",
    headline: "Chief of Clinical Supply Chain",
    photoURL: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=240&auto=format&fit=crop&q=80",
    counts: { problemsApproved: 12, votes: 890, comments: 145 },
  };

  const top2 = sortedUsers[1] || {
    name: "System Master Admin",
    role: "Founding Architect",
    headline: "Lead Moderator",
    photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
    counts: { problemsApproved: 18, votes: 1420, comments: 310 },
  };

  const top3 = sortedUsers[2] || {
    name: "David Miller",
    role: "Agritech Specialist",
    headline: "Soil Carbon Researcher",
    photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    counts: { problemsApproved: 8, votes: 620, comments: 85 },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Header & Time Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
            Community Leaderboard
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            Top problem hunters, domain specialists, and startup builders ranked by verified impact.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Tabs */}
          <div className="flex rounded-full border border-zinc-200 bg-white p-1 text-xs font-bold dark:border-zinc-800 dark:bg-zinc-900">
            {["All Time", "This Month", "This Week"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTime(t)}
                className={`rounded-full px-3.5 py-1.5 transition-colors cursor-pointer ${
                  activeTime === t
                    ? "bg-[#1657FF] text-white"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 items-end max-w-4xl mx-auto pt-4">
        {/* #2 Rank */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900 flex flex-col items-center">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-black text-zinc-800">
            2
          </span>
          <div className="mt-3">
            <UserAvatar src={top2.photoURL || undefined} name={top2.name} size="xl" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-zinc-950 dark:text-white">{top2.name}</h3>
          <span className="text-[11px] text-zinc-400 font-medium">{top2.headline || top2.role}</span>
          <div className="mt-3 rounded-full bg-zinc-100 px-3 py-1 text-xs font-mono font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            {((top2.counts?.problemsApproved || 0) * 100 + (top2.counts?.votes || 0)).toLocaleString()} pts
          </div>
        </div>

        {/* #1 Winner Podium (Taller & Gold Highlight) */}
        <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-b from-amber-50/50 via-white to-white p-8 text-center shadow-md dark:border-amber-900/60 dark:from-amber-950/20 dark:via-zinc-900 dark:to-zinc-900 flex flex-col items-center -translate-y-2">
          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs mb-1">
            <Crown className="h-4 w-4 fill-amber-400" />
            <span>Top Problem Solver</span>
          </div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-amber-950 shadow-xs">
            1
          </span>
          <div className="mt-3 ring-4 ring-amber-300 rounded-full">
            <UserAvatar src={top1.photoURL || undefined} name={top1.name} size="2xl" />
          </div>
          <h3 className="mt-3 text-base font-black text-zinc-950 dark:text-white">{top1.name}</h3>
          <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{top1.headline || top1.role}</span>
          <div className="mt-3 rounded-full bg-amber-100 px-4 py-1 text-xs font-mono font-black text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
            {((top1.counts?.problemsApproved || 0) * 100 + (top1.counts?.votes || 0)).toLocaleString()} pts
          </div>
        </div>

        {/* #3 Rank */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900 flex flex-col items-center">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-xs font-black text-white">
            3
          </span>
          <div className="mt-3">
            <UserAvatar src={top3.photoURL || undefined} name={top3.name} size="xl" />
          </div>
          <h3 className="mt-3 text-sm font-bold text-zinc-950 dark:text-white">{top3.name}</h3>
          <span className="text-[11px] text-zinc-400 font-medium">{top3.headline || top3.role}</span>
          <div className="mt-3 rounded-full bg-zinc-100 px-3 py-1 text-xs font-mono font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            {((top3.counts?.problemsApproved || 0) * 100 + (top3.counts?.votes || 0)).toLocaleString()} pts
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 text-[11px] font-black uppercase tracking-wider text-zinc-400 dark:border-zinc-800">
              <th className="pb-3 pl-2">Rank</th>
              <th className="pb-3">User</th>
              <th className="pb-3">Role</th>
              <th className="pb-3 text-right">Problems Verified</th>
              <th className="pb-3 text-right">Votes</th>
              <th className="pb-3 text-right pr-2">Impact Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
            {sortedUsers.map((u, idx) => (
              <tr key={u.uid || idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                <td className="py-4 pl-2 font-mono font-bold text-zinc-400">#{idx + 1}</td>
                <td className="py-4 flex items-center gap-3">
                  <UserAvatar src={u.photoURL || undefined} name={u.name} size="sm" />
                  <span className="font-bold text-zinc-900 dark:text-white">{u.name}</span>
                </td>
                <td className="py-4 text-zinc-500">{u.headline || u.role}</td>
                <td className="py-4 text-right font-mono text-zinc-700 dark:text-zinc-300">
                  {u.counts?.problemsApproved || 0}
                </td>
                <td className="py-4 text-right font-mono text-zinc-700 dark:text-zinc-300">
                  {u.counts?.votes || 0}
                </td>
                <td className="py-4 text-right pr-2 font-mono font-bold text-[#1657FF]">
                  {((u.counts?.problemsApproved || 0) * 100 + (u.counts?.votes || 0)).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
