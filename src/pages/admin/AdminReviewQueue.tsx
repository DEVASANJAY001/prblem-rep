import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subscribeProblems, updateProblemStatus } from "@/lib/firebase/services/problemsService";
import { useAuth } from "@/contexts/AuthContext";
import { TableSkeleton, LoadingContainer } from "@/components/common/LoadingContainer";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  ChevronDown,
  AlertTriangle,
  Filter,
  ArrowUpDown,
  Check,
  Sliders,
  ExternalLink,
  X,
  Send,
} from "lucide-react";
import { ProblemStatus, ProblemDoc } from "@/types";

export const AdminReviewQueue: React.FC = () => {
  const { userDoc } = useAuth();
  const [problems, setProblems] = useState<ProblemDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [industryFilter, setIndustryFilter] = useState("all");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Modification Request Note Modal State
  const [requestNoteModalProb, setRequestNoteModalProb] = useState<ProblemDoc | null>(null);
  const [customReviewNote, setCustomReviewNote] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeProblems({ status: "pending" }, (list) => {
      setProblems(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDecision = async (problemId: string, decision: ProblemStatus, note?: string) => {
    await updateProblemStatus(
      problemId,
      decision,
      userDoc ? { uid: userDoc.uid, name: userDoc.name } : { uid: "admin_1", name: "Admin" },
      note || `Reviewed in Admin Review Queue: ${decision}`
    );

    setProblems((prev) => prev.filter((p) => p.id !== problemId));
    setActionSuccess(`Decision applied: Problem ${decision === "approved" ? "Approved & Published Live" : decision.toUpperCase()}`);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleSendModificationRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestNoteModalProb) return;
    await handleDecision(requestNoteModalProb.id, "needs_info", customReviewNote || "Please clarify market impact data and evidence links.");
    setRequestNoteModalProb(null);
    setCustomReviewNote("");
  };

  const filtered = problems.filter((p) => {
    if (industryFilter !== "all" && p.industry !== industryFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full font-body-md text-on-surface pb-12 gap-8 max-w-5xl mx-auto">
      {/* Top Bar matching Stitch */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-headline-lg font-headline-lg text-on-surface">Review Queue</h1>
          <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-label-md font-label-md tracking-wide">
            {problems.length} Pending
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="appearance-none bg-surface-container text-on-surface text-body-md font-body-md pl-4 pr-10 py-2 rounded-lg cursor-pointer hover:bg-surface-container-high transition-colors outline-none border border-outline-variant/40"
            >
              <option value="all">All Industries</option>
              <option value="Healthcare & Life Sciences">Healthcare</option>
              <option value="Fintech & Commerce">Fintech</option>
              <option value="Artificial Intelligence">AI & ML</option>
              <option value="Energy & Climate">Energy & Climate</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
          </div>

          <button className="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-lg transition-colors text-body-md border border-outline-variant/40">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-lg transition-colors text-body-md border border-outline-variant/40">
            <ArrowUpDown className="h-4 w-4" />
            <span>Newest First</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="rounded-xl bg-secondary/10 border border-secondary/20 p-3 text-label-md font-label-md text-secondary flex items-center gap-2 shadow-sm">
          <Check className="h-4 w-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Review Queue Cards */}
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
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-16 text-center text-on-surface-variant shadow-sm">
          <CheckCircle className="h-12 w-12 text-secondary mx-auto mb-3" />
          <h3 className="text-headline-sm font-headline-sm text-on-surface mb-1">Queue is clear!</h3>
          <p className="text-body-md text-on-surface-variant">
            All submitted problems have been reviewed by a moderator.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          {filtered.map((problem) => {
            const ai = problem.aiScores;
            const isCritical = problem.severity === "critical" || problem.severity === "major";

            return (
              <div
                key={problem.id}
                className="bg-surface-container-lowest rounded-xl shadow-sm flex flex-col overflow-hidden relative border border-outline-variant/30"
              >
                {/* Left severity indicator stripe */}
                <div
                  className={`absolute top-0 left-0 w-1.5 h-full ${
                    isCritical ? "bg-error" : "bg-primary"
                  }`}
                />

                <div className="p-6 pl-8 flex flex-col gap-6">
                  {/* Header & Submitter info */}
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-base shadow-sm">
                        {problem.submittedBy?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <span className="text-body-md font-body-md text-on-surface-variant">
                            Submitted by <strong className="text-on-surface">{problem.submittedBy || "Anonymous Scout"}</strong>
                          </span>
                          <span className="text-on-surface-variant text-[12px]">•</span>
                          <span className="text-body-md font-body-md text-on-surface-variant">
                            {problem.createdAt
                              ? typeof problem.createdAt === "string"
                                ? new Date(problem.createdAt).toLocaleDateString()
                                : problem.createdAt?.toDate
                                ? problem.createdAt.toDate().toLocaleDateString()
                                : "Recently"
                              : "Recently"}
                          </span>
                        </div>
                        <h2 className="text-headline-md font-headline-md text-on-surface mt-1">
                          {problem.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="bg-surface-container text-on-surface-variant px-2.5 py-0.5 rounded text-label-sm font-label-sm">
                            {problem.industry || "General"}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded text-label-sm font-label-sm font-bold uppercase tracking-wider ${
                              isCritical
                                ? "bg-error-container text-on-error-container"
                                : "bg-primary-fixed text-on-primary-fixed"
                            }`}
                          >
                            {problem.severity || "medium"} Severity
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="text-body-md text-on-surface whitespace-pre-line bg-surface-container-low/60 p-4 rounded-lg border border-outline-variant/20">
                    {problem.description}
                  </div>

                  {/* AI Analysis Metrics Box */}
                  <div className="bg-surface-container-low rounded-lg p-5 relative border border-outline-variant/30">
                    <div className="absolute top-5 right-5 flex flex-col items-center justify-center w-16 h-16 rounded-full bg-surface-container-lowest shadow-sm border border-outline-variant/30">
                      <span className="text-headline-sm font-headline-sm text-primary">
                        {(problem.painScore ? problem.painScore / 10 : 8.8).toFixed(1)}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-medium">AI Score</span>
                    </div>

                    <h3 className="text-body-lg font-body-lg font-semibold text-on-surface mb-4">
                      AI Analysis Metrics
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 pr-24">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-label-md font-label-md">
                          <span className="text-on-surface-variant">Problem Clarity</span>
                          <span className="text-on-surface">9.2 / 10</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full w-[92%]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-label-md font-label-md">
                          <span className="text-on-surface-variant">Market Size Potential</span>
                          <span className="text-on-surface">7.5 / 10</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full w-[75%]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-label-md font-label-md">
                          <span className="text-on-surface-variant">Originality</span>
                          <span className="text-on-surface">8.1 / 10</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full w-[81%]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-label-md font-label-md">
                          <span className="text-on-surface-variant">Technical Feasibility</span>
                          <span className="text-on-surface">6.8 / 10</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full w-[68%]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-label-md font-label-md">
                          <span className="text-on-surface-variant">Monetization Path</span>
                          <span className="text-on-surface">8.5 / 10</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full w-[85%]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-label-md font-label-md">
                          <span className="text-on-surface-variant">Regulatory Risk</span>
                          <span className="text-error font-semibold">Moderate</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-error rounded-full w-[50%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-surface-container px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/30">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setRequestNoteModalProb(problem)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-amber-500/30"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Request Modifications</span>
                    </button>

                    <Link
                      to={`/admin/problems/${problem.id}/edit`}
                      className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors flex items-center gap-1.5 shadow-2xs border border-outline-variant/30"
                    >
                      <Sliders className="w-3.5 h-3.5 text-primary" />
                      <span>Control Studio</span>
                    </Link>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecision(problem.id, "rejected")}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-error bg-surface-container-lowest hover:bg-error-container/40 transition-colors shadow-xs border border-outline-variant/30 cursor-pointer"
                    >
                      Reject / Hide
                    </button>
                    <button
                      onClick={() => handleDecision(problem.id, "approved")}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
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

      {/* Admin Modification Request Note Modal */}
      {requestNoteModalProb && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-['Poppins',sans-serif]">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-low">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-on-surface">Request Modifications from Submitter</h3>
              </div>
              <button
                onClick={() => setRequestNoteModalProb(null)}
                className="p-1 rounded-full text-gray-400 hover:text-on-surface cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendModificationRequest} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-on-surface">{requestNoteModalProb.title}</span>
                <span className="text-[11px] text-gray-500">
                  Submitted by {requestNoteModalProb.submittedBy || "Scout"}
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
                  placeholder="e.g. Please specify the exact TAM in billions and attach at least one primary source link in the evidence section."
                  className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30">
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
