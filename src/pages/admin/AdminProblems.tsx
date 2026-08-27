import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  subscribeProblems,
  updateProblemStatus,
  createProblem,
  deleteProblem,
} from "@/lib/firebase/services/problemsService";
import { useAuth } from "@/contexts/AuthContext";
import { TableSkeleton } from "@/components/common/LoadingContainer";
import { AdminProblemDetailEditor } from "./AdminProblemDetailEditor";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  EyeOff,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sliders,
  CheckCircle2,
  X,
  Flame,
  TrendingUp,
  AlertTriangle,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { ProblemStatus, ProblemDoc } from "@/types";

export const AdminProblems: React.FC = () => {
  const { userDoc } = useAuth();
  const navigate = useNavigate();

  const [problems, setProblems] = useState<ProblemDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states (Explore-style system)
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"pain" | "opportunity" | "newest" | "views">("pain");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingProblemId, setEditingProblemId] = useState<string | null>(null);

  // New Problem Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newIndustry, setNewIndustry] = useState("Healthcare & Biotech");
  const [newSeverity, setNewSeverity] = useState<"minor" | "medium" | "major" | "critical">("major");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeProblems({ status: "all" }, (list) => {
      setProblems(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Filter and Sort problems
  const filtered = problems
    .filter((p) => {
      // Status filter
      if (statusFilter !== "all") {
        if (statusFilter === "open" && p.status !== "approved" && p.status !== "open") return false;
        if (statusFilter === "pending" && p.status !== "pending") return false;
        if (statusFilter === "solved" && p.status !== "solved") return false;
        if (statusFilter === "in_progress" && p.status !== "in_progress") return false;
        if (statusFilter === "rejected" && p.status !== "rejected") return false;
      }
      // Industry filter
      if (selectedIndustry !== "all") {
        const ind = p.industry?.toLowerCase() || "";
        const target = selectedIndustry.toLowerCase();
        if (!ind.includes(target) && !target.includes(ind)) return false;
      }
      // Severity filter
      if (severityFilter !== "all") {
        if (p.severity !== severityFilter) return false;
      }
      // Search keyword
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = p.title?.toLowerCase().includes(q);
        const matchesDesc = p.description?.toLowerCase().includes(q);
        const matchesInd = p.industry?.toLowerCase().includes(q);
        const matchesId = p.id?.toLowerCase().includes(q);
        const matchesTags = p.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesInd && !matchesId && !matchesTags) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "pain") return (b.painScore || 0) - (a.painScore || 0);
      if (sortBy === "opportunity") return (b.opportunityScore || 0) - (a.opportunityScore || 0);
      if (sortBy === "views") return (b.views || 0) - (a.views || 0);
      return new Date(b.createdAt || b.submittedAt || 0).getTime() - new Date(a.createdAt || a.submittedAt || 0).getTime();
    });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuickStatus = async (id: string, newStatus: ProblemStatus) => {
    await updateProblemStatus(
      id,
      newStatus,
      userDoc ? { uid: userDoc.uid, name: userDoc.name } : { uid: "admin", name: "Admin" },
      "Status update from Admin Problems controller"
    );
  };

  const handleDeleteSingle = async (problem: ProblemDoc) => {
    if (window.confirm(`Permanently delete "${problem.title}"? This cannot be undone.`)) {
      await deleteProblem(problem.id);
    }
  };

  const handleDirectCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    setCreating(true);
    const res = await createProblem({
      title: newTitle,
      description: newDesc,
      industry: newIndustry,
      severity: newSeverity,
      submittedByUid: userDoc?.uid || "admin_direct",
      submittedByName: `${userDoc?.name || "Admin"} (Verified)`,
    });

    await updateProblemStatus(
      res.problemId,
      "approved",
      userDoc ? { uid: userDoc.uid, name: userDoc.name } : { uid: "admin", name: "Admin" },
      "Directly created and approved by Administrator"
    );

    setCreating(false);
    setIsCreateOpen(false);
    setNewTitle("");
    setNewDesc("");
    // Automatically launch control studio on newly created problem
    setEditingProblemId(res.problemId);
  };

  // If a problem is currently opened in the Control Studio editor:
  if (editingProblemId) {
    return (
      <div className="w-full max-w-7xl mx-auto pb-12">
        <AdminProblemDetailEditor
          problemId={editingProblemId}
          onClose={() => setEditingProblemId(null)}
          onSaved={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto font-['Poppins',sans-serif] text-on-surface pb-12">
      {/* ── Top Header & Title Bar ────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase">
              Control Panel
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              {problems.length} total registered statements
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-on-surface tracking-tight mt-1">
            Problem Statements Control System
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Search, filter, manage, and edit every single data point, score, and discussion thread.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2.5 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Problem</span>
          </button>
        </div>
      </div>

      {/* ── Explore-Style Keyword Search & Filtering Suite ─────────────────── */}
      <div className="flex flex-col gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs">
        {/* Search Input + Severity & Sort Dropdowns */}
        <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl text-xs md:text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-on-surface-variant"
              placeholder="Search by problem title, keyword, ID, or tag..."
              type="text"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto">
            {/* Severity Filter */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-bold text-on-surface-variant">Severity:</span>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:ring-1 focus:ring-primary capitalize"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="major">Major</option>
                <option value="medium">Medium</option>
                <option value="minor">Minor</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-bold text-on-surface-variant">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="pain">Highest Pain Score</option>
                <option value="opportunity">Highest Opportunity</option>
                <option value="newest">Most Recent</option>
                <option value="views">Most Views</option>
              </select>
            </div>
          </div>
        </div>

        {/* Industry Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 hide-scrollbar">
          <span className="text-[11px] font-bold text-on-surface-variant shrink-0 mr-1">
            Industry:
          </span>
          <button
            onClick={() => setSelectedIndustry("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedIndustry === "all"
                ? "bg-primary text-white shadow-2xs"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            All Industries
          </button>
          {REAL_INDUSTRIES.map((ind) => {
            const isSelected = selectedIndustry === ind.name;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(isSelected ? "all" : ind.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white shadow-2xs"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {ind.name}
              </button>
            );
          })}
        </div>

        {/* Status Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-outline-variant/20">
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
            {[
              { id: "all", label: "All Statements", count: problems.length },
              {
                id: "open",
                label: "Open / Approved",
                count: problems.filter((p) => p.status === "approved" || p.status === "open").length,
              },
              {
                id: "in_progress",
                label: "In Progress",
                count: problems.filter((p) => p.status === "in_progress").length,
              },
              {
                id: "solved",
                label: "Solved",
                count: problems.filter((p) => p.status === "solved").length,
              },
              {
                id: "pending",
                label: "Pending Review",
                count: problems.filter((p) => p.status === "pending").length,
              },
              {
                id: "rejected",
                label: "Rejected / Hidden",
                count: problems.filter((p) => p.status === "rejected").length,
              },
            ].map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-primary text-white" : "bg-surface-container text-outline"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-xl border border-primary/20">
              <span className="text-xs font-bold text-primary">{selectedIds.length} selected</span>
              <button
                onClick={() => {
                  selectedIds.forEach((id) => handleQuickStatus(id, "approved"));
                  setSelectedIds([]);
                }}
                className="px-2 py-0.5 bg-secondary text-white rounded-lg text-[11px] font-bold"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  selectedIds.forEach((id) => handleQuickStatus(id, "rejected"));
                  setSelectedIds([]);
                }}
                className="px-2 py-0.5 bg-rose-600 text-white rounded-lg text-[11px] font-bold"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Problem Statements Data Table ─────────────────────────────────── */}
      <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs overflow-hidden flex flex-col border border-outline-variant/30">
        {/* Table Header */}
        <div className="grid grid-cols-[48px_minmax(280px,_1fr)_160px_130px_70px_70px_100px_170px] items-center gap-4 px-6 py-3.5 bg-surface-container-low text-[11px] text-outline font-bold uppercase tracking-wider border-b border-outline-variant/20">
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={filtered.length > 0 && selectedIds.length === filtered.length}
              className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant bg-surface-container cursor-pointer accent-primary"
            />
          </div>
          <div>Title & Statement Details</div>
          <div>Industry</div>
          <div>Status & Badge</div>
          <div className="text-center">Pain</div>
          <div className="text-center">Opp</div>
          <div>Views</div>
          <div className="text-right">Actions & Control</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col w-full divide-y divide-outline-variant/20">
          {loading ? (
            <div className="p-6">
              <TableSkeleton rows={6} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-500 opacity-60" />
              <span className="text-sm font-bold text-on-surface">No problem statements match active filters</span>
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setSelectedIndustry("all");
                  setSeverityFilter("all");
                }}
                className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filtered.map((prob) => {
              const isSelected = selectedIds.includes(prob.id);
              const pain = (prob.painScore ? prob.painScore / 10 : 7.5).toFixed(1);
              const opp = (prob.opportunityScore ? prob.opportunityScore / 10 : 8.0).toFixed(1);
              const isApproved = prob.status === "approved" || prob.status === "open";
              const isPending = prob.status === "pending";
              const isSolved = prob.status === "solved";
              const isInProgress = prob.status === "in_progress";

              return (
                <div
                  key={prob.id}
                  className={`grid grid-cols-[48px_minmax(280px,_1fr)_160px_130px_70px_70px_100px_170px] items-center gap-4 px-6 py-4 hover:bg-surface-container-low transition-colors group ${
                    isSelected ? "bg-primary/5" : ""
                  }`}
                >
                  {/* Select Checkbox */}
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleRow(prob.id)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant bg-surface-container cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Title & Identification */}
                  <div className="flex flex-col gap-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProblemId(prob.id)}
                        className="text-xs md:text-sm text-on-surface font-bold truncate text-left hover:text-primary transition-colors cursor-pointer"
                      >
                        {prob.title}
                      </button>
                      {prob.verified && (
                        <span title="Verified" className="shrink-0 text-primary">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-on-surface-variant font-normal">
                      <span className="font-mono text-outline font-semibold">ID: {prob.id}</span>
                      <span>·</span>
                      <span className="truncate max-w-[200px]">{prob.description}</span>
                    </div>
                  </div>

                  {/* Industry Label */}
                  <div>
                    <span className="bg-surface-container text-on-surface px-2.5 py-1 rounded-full text-xs font-semibold truncate block w-fit max-w-[150px]">
                      {prob.industry || "General"}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${
                        isApproved
                          ? "bg-secondary/10 text-secondary"
                          : isSolved
                          ? "bg-emerald-100 text-emerald-800"
                          : isInProgress
                          ? "bg-blue-100 text-blue-800"
                          : isPending
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isApproved
                            ? "bg-secondary"
                            : isSolved
                            ? "bg-emerald-600"
                            : isInProgress
                            ? "bg-blue-600"
                            : isPending
                            ? "bg-amber-500"
                            : "bg-rose-600"
                        }`}
                      />
                      <span>{prob.status || "Open"}</span>
                    </span>
                  </div>

                  {/* Pain Score */}
                  <div className="flex justify-center">
                    <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-error/10 text-error text-xs font-bold">
                      {pain}
                    </span>
                  </div>

                  {/* Opportunity Score */}
                  <div className="flex justify-center">
                    <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-secondary/10 text-secondary text-xs font-bold">
                      {opp}
                    </span>
                  </div>

                  {/* Real Views & Interactions */}
                  <div className="flex flex-col text-xs font-medium text-on-surface-variant">
                    <span className="font-bold text-on-surface">{prob.views || 0} views</span>
                    <span className="text-[10px] text-gray-400">
                      {prob.validations?.faceCount || 0} validations
                    </span>
                  </div>

                  {/* Action Buttons: Manage / Edit Control, Live Preview, Delete */}
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Primary Manage & Control Button */}
                    <button
                      onClick={() => setEditingProblemId(prob.id)}
                      className="px-2.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                      title="Open Complete Problem Control Studio"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Manage</span>
                    </button>

                    {/* View Live Link */}
                    <Link
                      to={`/problem/${prob.id}`}
                      target="_blank"
                      className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
                      title="View Public Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {/* Delete Single */}
                    <button
                      onClick={() => handleDeleteSingle(prob)}
                      className="p-1.5 text-gray-400 hover:text-error hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Problem"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Create New Problem Modal ───────────────────────────────────────── */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-on-surface">Create New Problem Statement</h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDirectCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Problem Statement Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Subsurface Hydrogen Pipeline Micro-Leaks..."
                  className="bg-surface-container-low rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Description & Issue Details</label>
                <textarea
                  required
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Operational context, severity, and workflow disruption..."
                  className="bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Industry</label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  >
                    {REAL_INDUSTRIES.map((ind) => (
                      <option key={ind.id} value={ind.name}>
                        {ind.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Initial Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary capitalize"
                  >
                    <option value="critical">Critical</option>
                    <option value="major">Major</option>
                    <option value="medium">Medium</option>
                    <option value="minor">Minor</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {creating ? "Creating & Opening Studio..." : "Create Problem Statement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
