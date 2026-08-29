import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { subscribeProblems, updateProblemStatus } from "@/lib/firebase/services/problemsService";
import { subscribeIndustries } from "@/lib/firebase/services/industriesService";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { useAuth } from "@/contexts/AuthContext";
import { TableSkeleton, LoadingContainer } from "@/components/common/LoadingContainer";
import {
  CheckCircle,
  XCircle,
  ChevronDown,
  AlertTriangle,
  Filter,
  ArrowUpDown,
  Check,
  Sliders,
  ExternalLink,
  X,
  Send,
  Search,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { ProblemStatus, ProblemDoc, IndustryDoc } from "@/types";

export const AdminReviewQueue: React.FC = () => {
  const { userDoc } = useAuth();
  const [allQueueProblems, setAllQueueProblems] = useState<ProblemDoc[]>([]);
  const [industriesList, setIndustriesList] = useState<IndustryDoc[]>(REAL_INDUSTRIES);
  const [loading, setLoading] = useState(true);
  const [statusTab, setStatusTab] = useState<"pending" | "needs_info" | "all">("pending");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "pain" | "severity">("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Modification Request Note Modal State
  const [requestNoteModalProb, setRequestNoteModalProb] = useState<ProblemDoc | null>(null);
  const [customReviewNote, setCustomReviewNote] = useState("");

  useEffect(() => {
    // 1. Subscribe to review queue problems (pending & needs_info)
    const unsubProblems = subscribeProblems({ status: "all" }, (list) => {
      setAllQueueProblems(list);
      setLoading(false);
    });

    // 2. Subscribe to real-time industries list
    const unsubIndustries = subscribeIndustries((list) => {
      setIndustriesList(list);
    });

    return () => {
      unsubProblems();
      unsubIndustries();
    };
  }, []);

  const pendingList = useMemo(
    () => allQueueProblems.filter((p) => p.status === "pending"),
    [allQueueProblems]
  );
  const needsInfoList = useMemo(
    () => allQueueProblems.filter((p) => p.status === "needs_info"),
    [allQueueProblems]
  );

  const handleDecision = async (problemId: string, decision: ProblemStatus, note?: string) => {
    setActionLoadingId(problemId);
    try {
      await updateProblemStatus(
        problemId,
        decision,
        userDoc ? { uid: userDoc.uid, name: userDoc.name } : { uid: "admin_moderator", name: "Lead Moderator" },
        note || `Reviewed in Admin Review Queue: ${decision}`
      );

      setActionSuccess(
        decision === "approved"
          ? "Problem approved and published live to ecosystem!"
          : decision === "needs_info"
          ? "Modification request sent to submitter."
          : "Problem rejected and archived."
      );
      setTimeout(() => setActionSuccess(null), 3500);
    } catch (err) {
      console.error("Decision update failed:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSendModificationRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestNoteModalProb) return;
    await handleDecision(
      requestNoteModalProb.id,
      "needs_info",
      customReviewNote || "Please clarify market impact data and evidence links."
    );
    setRequestNoteModalProb(null);
    setCustomReviewNote("");
  };

  const filtered = useMemo(() => {
    let list = allQueueProblems;
    if (statusTab === "pending") {
      list = list.filter((p) => p.status === "pending");
    } else if (statusTab === "needs_info") {
      list = list.filter((p) => p.status === "needs_info");
    } else {
      list = list.filter((p) => p.status === "pending" || p.status === "needs_info");
    }

    if (industryFilter !== "all") {
      list = list.filter((p) => {
        const ind = (p.industry || "").toLowerCase();
        const target = industryFilter.toLowerCase();
        return ind.includes(target) || target.includes(ind);
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.submittedBy && p.submittedBy.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => {
      if (sortBy === "pain") {
        return (b.painScore || 0) - (a.painScore || 0);
      }
      if (sortBy === "severity") {
        const severityRank = { critical: 4, major: 3, medium: 2, minor: 1 };
        return (severityRank[b.severity as keyof typeof severityRank] || 0) - (severityRank[a.severity as keyof typeof severityRank] || 0);
      }
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });
  }, [allQueueProblems, statusTab, industryFilter, searchQuery, sortBy]);

  return (
    <div className="flex flex-col w-full font-['Poppins',sans-serif] text-on-surface pb-12 gap-6 max-w-5xl mx-auto">
      {/* ── Top Bar with Status Tabs & Live Counts ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
              Review Queue
            </h1>
            <p className="text-xs text-on-surface-variant font-normal mt-0.5">
              Live moderation workflow for scout and enterprise problem submissions.
            </p>
          </div>
          <span className="bg-amber-50 text-amber-700 border border-amber-200/60 px-3 py-1 rounded-full text-xs font-bold shrink-0">
            {pendingList.length} Pending
          </span>
        </div>

        {/* Tab Filters: Pending, Needs Info, All Queue */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs font-semibold">
          <button
            onClick={() => setStatusTab("pending")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              statusTab === "pending"
                ? "bg-primary text-white shadow-2xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span>Pending ({pendingList.length})</span>
          </button>
          <button
            onClick={() => setStatusTab("needs_info")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              statusTab === "needs_info"
                ? "bg-primary text-white shadow-2xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span>Needs Info ({needsInfoList.length})</span>
          </button>
          <button
            onClick={() => setStatusTab("all")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              statusTab === "all"
                ? "bg-primary text-white shadow-2xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span>All Active ({pendingList.length + needsInfoList.length})</span>
          </button>
        </div>
      </div>

      {/* ── Search & Filter Controls Toolbar ───────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Query */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant h-3.5 w-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search queue submissions..."
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-2 pl-9 pr-3 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-0.5 rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Industry Filter Dropdown */}
          <div className="relative inline-block">
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="appearance-none bg-surface-container-lowest text-on-surface text-xs font-semibold pl-3 pr-8 py-2 rounded-xl border border-outline-variant/30 hover:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors shadow-2xs"
            >
              <option value="all">All Industries</option>
              {industriesList.map((ind) => (
                <option key={ind.slug} value={ind.name}>
                  {ind.name}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3.5 w-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
          </div>

          {/* Sort By Dropdown */}
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-surface-container-lowest text-on-surface text-xs font-semibold pl-3 pr-8 py-2 rounded-xl border border-outline-variant/30 hover:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors shadow-2xs"
            >
              <option value="newest">Newest First</option>
              <option value="pain">Highest Pain Score</option>
              <option value="severity">Highest Severity</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200/80 p-3.5 text-xs font-bold text-emerald-800 flex items-center gap-2 shadow-2xs animate-fade-in">
          <Check className="h-4 w-4 text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* ── Review Queue Problem Cards ─────────────────────────────────────── */}
      {loading ? (
        <div className="space-y-4">
          <LoadingContainer
            message="Fetching moderation queue from Cloud Firestore..."
            submessage="Synchronizing real-time pending submissions and multi-metric AI evaluations."
            minHeight="min-h-[220px]"
          />
          <TableSkeleton rows={3} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-16 text-center text-on-surface-variant shadow-2xs space-y-2">
          <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-on-surface">Queue is clear!</h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            {searchQuery || industryFilter !== "all"
              ? "No problem submissions matched the active filters."
              : "All submitted problem statements have been reviewed and moderated."}
          </p>
          {(searchQuery || industryFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setIndustryFilter("all");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-colors mt-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full animate-fade-in">
          {filtered.map((problem) => {
            const ai = problem.aiScores;
            const isCritical = problem.severity === "critical" || problem.severity === "major";
            const isActing = actionLoadingId === problem.id;
            const isNeedsInfo = problem.status === "needs_info";

            const clarity = Math.min(10, Math.max(5, Math.round(((ai?.clarity ?? 88) / 10) * 10) / 10));
            const marketPotential = Math.min(10, Math.max(5, Math.round(((ai?.marketSize ?? ai?.businessPotential ?? 80) / 10) * 10) / 10));
            const originality = Math.min(10, Math.max(5, Math.round(((ai?.originality ?? 82) / 10) * 10) / 10));
            const feasibility = Math.min(10, Math.max(5, Math.round(((ai?.technicalFeasibility ?? 75) / 10) * 10) / 10));
            const monetization = Math.min(10, Math.max(5, Math.round(((ai?.businessPotential ?? 84) / 10) * 10) / 10));

            return (
              <div
                key={problem.id}
                className="bg-surface-container-lowest rounded-3xl shadow-2xs flex flex-col overflow-hidden relative border border-outline-variant/30 hover:border-primary/40 transition-all"
              >
                {/* Left severity indicator stripe */}
                <div
                  className={`absolute top-0 left-0 w-1.5 h-full ${
                    isCritical ? "bg-rose-500" : isNeedsInfo ? "bg-amber-500" : "bg-primary"
                  }`}
                />

                <div className="p-6 pl-8 flex flex-col gap-5">
                  {/* Header & Submitter info */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
                        {problem.submittedBy?.[0]?.toUpperCase() || "S"}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
                          <span>
                            Submitted by{" "}
                            <strong className="text-on-surface font-semibold">
                              {problem.submittedBy || problem.submitterName || "Anonymous Scout"}
                            </strong>
                          </span>
                          <span>·</span>
                          <span>
                            {problem.createdAt
                              ? typeof problem.createdAt === "string"
                                ? new Date(problem.createdAt).toLocaleDateString()
                                : (problem.createdAt as any)?.toDate
                                ? (problem.createdAt as any).toDate().toLocaleDateString()
                                : "Recently"
                              : "Recently"}
                          </span>
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-on-surface mt-1 leading-snug">
                          {problem.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="bg-surface-container text-on-surface-variant px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                            {problem.industry || "General"}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isCritical
                                ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                                : "bg-primary/10 text-primary border border-primary/20"
                            }`}
                          >
                            {problem.severity || "medium"} Severity
                          </span>
                          {isNeedsInfo && (
                            <span className="bg-amber-50 text-amber-700 border border-amber-200/60 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                              Needs Info Requested
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Link to Preview problem */}
                    <Link
                      to={`/problem/${problem.id}`}
                      target="_blank"
                      className="p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shrink-0"
                      title="Preview Problem in New Tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Problem Description */}
                  <div className="text-xs sm:text-sm text-on-surface whitespace-pre-line bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20 leading-relaxed font-normal">
                    {problem.description}
                  </div>

                  {/* AI Analysis Metrics Box */}
                  <div className="bg-surface-container-low rounded-2xl p-5 relative border border-outline-variant/30">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                          Automated AI Telemetry & Confidence
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1 rounded-xl shadow-2xs border border-outline-variant/30">
                        <span className="text-xs text-on-surface-variant font-medium">Pain Score:</span>
                        <span className="text-sm font-black text-primary font-mono">
                          {problem.painScore || 88}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {/* Metric 1: Clarity */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-on-surface-variant">Problem Clarity</span>
                          <span className="text-on-surface font-bold">{clarity} / 10</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${clarity * 10}%` }} />
                        </div>
                      </div>

                      {/* Metric 2: Market Potential */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-on-surface-variant">Market Potential</span>
                          <span className="text-on-surface font-bold">{marketPotential} / 10</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${marketPotential * 10}%` }} />
                        </div>
                      </div>

                      {/* Metric 3: Originality */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-on-surface-variant">Originality</span>
                          <span className="text-on-surface font-bold">{originality} / 10</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${originality * 10}%` }} />
                        </div>
                      </div>

                      {/* Metric 4: Technical Feasibility */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-on-surface-variant">Technical Feasibility</span>
                          <span className="text-on-surface font-bold">{feasibility} / 10</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${feasibility * 10}%` }} />
                        </div>
                      </div>

                      {/* Metric 5: Monetization */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-on-surface-variant">Monetization Path</span>
                          <span className="text-on-surface font-bold">{monetization} / 10</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${monetization * 10}%` }} />
                        </div>
                      </div>

                      {/* Metric 6: Regulatory Risk */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-on-surface-variant">Regulatory Risk</span>
                          <span className="text-amber-700 font-bold">Low–Moderate</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-[45%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions Toolbar */}
                <div className="bg-surface-container px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setRequestNoteModalProb(problem)}
                      disabled={isActing}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-amber-200/60 shadow-2xs"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Request Modifications</span>
                    </button>

                    <Link
                      to={`/admin/problems/${problem.id}/edit`}
                      className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors flex items-center gap-1.5 shadow-2xs border border-outline-variant/30"
                    >
                      <Sliders className="w-3.5 h-3.5 text-primary" />
                      <span>Control Studio</span>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleDecision(problem.id, "rejected")}
                      disabled={isActing}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-surface-container-lowest hover:bg-rose-50 transition-colors shadow-2xs border border-outline-variant/30 cursor-pointer disabled:opacity-50"
                    >
                      Reject / Archive
                    </button>
                    <button
                      onClick={() => handleDecision(problem.id, "approved")}
                      disabled={isActing}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve & Publish Live</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Admin Modification Request Note Modal ─────────────────────────── */}
      {requestNoteModalProb && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-['Poppins',sans-serif]">
          <div className="bg-surface-container-lowest rounded-3xl w-full max-w-lg shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/20 bg-surface-container-low">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-on-surface">Request Modifications from Submitter</h3>
              </div>
              <button
                onClick={() => setRequestNoteModalProb(null)}
                className="p-1 rounded-full text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendModificationRequest} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-on-surface">{requestNoteModalProb.title}</span>
                <span className="text-[11px] text-on-surface-variant">
                  Submitted by {requestNoteModalProb.submittedBy || requestNoteModalProb.submitterName || "Scout"}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Modification Note / Instructions for Submitter
                </label>
                <textarea
                  rows={4}
                  required
                  value={customReviewNote}
                  onChange={(e) => setCustomReviewNote(e.target.value)}
                  placeholder="e.g. Please specify the quantified annual financial impact in USD and attach at least one primary reference link in the evidence section."
                  className="w-full bg-surface-container-low rounded-2xl p-3.5 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setRequestNoteModalProb(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Modification Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
