import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subscribeProblems, updateProblemStatus } from "@/lib/firebase/services/problemsService";
import { ProblemDoc } from "@/types";
import {
  BarChart2,
  PlusCircle,
  TrendingUp,
  Building2,
  MessageSquare,
  FileText,
  Award,
  Check,
  X,
  ArrowUp,
} from "lucide-react";

export const AdminOverview: React.FC = () => {
  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeProblems({ status: "all" }, (list) => {
      setAllProblems(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const pending = allProblems.filter((p) => p.status === "pending");
  const approved = allProblems.filter((p) => p.status === "approved");

  const handleQuickApprove = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    await updateProblemStatus(id, "approved", "admin_quick", "Quick approved from dashboard overview");
  };

  const handleQuickReject = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    await updateProblemStatus(id, "rejected", "admin_quick", "Quick rejected from dashboard overview");
  };

  return (
    <div className="flex flex-col w-full font-body-md text-on-surface">
      {/* Metric Cards Grid matching Stitch */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {/* Problems Metric */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-label-md uppercase tracking-widest">Problems Total</span>
            <BarChart2 className="h-5 w-5 text-outline" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">{allProblems.length}</span>
            <span className="font-label-sm text-secondary flex items-center gap-0.5 font-bold">
              <ArrowUp className="h-3.5 w-3.5" /> +12%
            </span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-surface-container overflow-hidden rounded-full">
            <div className="h-full bg-primary-container w-[75%]" />
          </div>
        </div>

        {/* Pending Review Queue */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-label-md uppercase tracking-widest">Pending Review</span>
            <PlusCircle className="h-5 w-5 text-outline" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-error">+{pending.length}</span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-surface-container overflow-hidden rounded-full">
            <div className="h-full bg-error w-[40%]" />
          </div>
        </div>

        {/* Trending Problem Card */}
        <div className="bg-primary-container text-on-primary-container rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-md uppercase tracking-widest opacity-80">Trending Category</span>
            <TrendingUp className="h-5 w-5 text-on-primary-container" />
          </div>
          <div className="relative z-10">
            <span className="font-headline-md text-headline-md block mb-1 text-white">AI & Automation</span>
            <span className="font-label-sm opacity-80 text-white/90">Highest engagement score this week</span>
          </div>
        </div>

        {/* Industries Metric */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-label-md uppercase tracking-widest">Industries</span>
            <Building2 className="h-5 w-5 text-outline" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">142</span>
            <span className="font-label-sm text-secondary font-semibold">Active Hubs</span>
          </div>
        </div>

        {/* Community Posts */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-label-md uppercase tracking-widest">Community Posts</span>
            <MessageSquare className="h-5 w-5 text-outline" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">89.4k</span>
          </div>
        </div>

        {/* Research Papers */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-label-md uppercase tracking-widest">Research Papers</span>
            <FileText className="h-5 w-5 text-outline" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">2,104</span>
          </div>
        </div>

        {/* Active Badges */}
        <Link to="/admin/badges" className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-label-md uppercase tracking-widest">Active Badges</span>
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">14</span>
            <span className="font-label-sm text-primary font-semibold">Credentials</span>
          </div>
        </Link>
      </div>

      {/* Recent Submissions Card Section */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="p-6 border-b border-surface-container flex justify-between items-center">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Submissions</h2>
          <Link to="/admin/review-queue" className="text-primary font-label-md hover:underline font-semibold">
            View All ({pending.length})
          </Link>
        </div>

        {pending.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant">
            <Check className="h-8 w-8 text-secondary mx-auto mb-2" />
            <p className="font-label-md text-label-md text-on-surface">All submissions are reviewed!</p>
            <p className="text-body-md text-outline mt-1">New user submitted pain points will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-surface-container">
            {pending.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 px-6 hover:bg-surface-container-low transition-colors group"
              >
                <div className="flex flex-col gap-1 w-1/2 min-w-0 pr-4">
                  <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                    {p.title}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                    Submitter: {p.submitterName || "Anonymous User"}
                  </span>
                </div>

                <div className="w-1/4 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm font-semibold">
                    {p.industry || "General"}
                  </span>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleQuickApprove(p.id, e)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                    title="Approve Problem"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => handleQuickReject(p.id, e)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-error/10 text-error hover:bg-error/20 transition-colors"
                    title="Reject Problem"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
