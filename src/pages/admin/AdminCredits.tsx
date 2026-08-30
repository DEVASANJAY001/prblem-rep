import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  getCredits,
  saveCredit,
  deleteCredit,
  toggleCreditActive,
  reorderCredits,
  getProblems,
} from "@/lib/storage";
import {
  saveCreditToFirestore,
  deleteCreditFromFirestore,
  toggleCreditActiveInFirestore,
  subscribeCredits,
  reorderCreditsInFirestore,
} from "@/lib/firebase/services/creditsService";
import { CreditSourceDoc } from "@/types";
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  LayoutGrid,
  List,
  Layers,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Search,
  Tag,
  Globe,
  HelpCircle,
  X,
  FileText,
} from "lucide-react";

export const AdminCredits: React.FC = () => {
  const [credits, setCredits] = useState<CreditSourceDoc[]>([]);
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Platform Challenge");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Real problem count per credit
  const problems = useMemo(() => getProblems({ includeUnapproved: true }), [credits]);
  const creditUsageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    problems.forEach((p) => {
      const sources = p.credits || p.psFrom || [];
      sources.forEach((s) => {
        const key = s.trim().toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
      });
    });
    return counts;
  }, [problems]);

  useEffect(() => {
    const unsubscribe = subscribeCredits((list) => {
      setCredits(list);
    }, true);
    return () => unsubscribe();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setName("");
    setCategory("Platform Challenge");
    setDescription("");
    setWebsiteUrl("");
    setLogoUrl("");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (credit: CreditSourceDoc) => {
    setEditingId(credit.id);
    setName(credit.name);
    setCategory(credit.category || "Platform Challenge");
    setDescription(credit.description || "");
    setWebsiteUrl(credit.websiteUrl || "");
    setLogoUrl(credit.logoUrl || "");
    setIsActive(credit.isActive !== false);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = editingId || `cred-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now().toString().slice(-4)}`;

    const newDoc: CreditSourceDoc = {
      id,
      name: name.trim(),
      category: category.trim() || "General",
      description: description.trim(),
      websiteUrl: websiteUrl.trim(),
      logoUrl: logoUrl.trim(),
      isActive,
      order: editingId ? credits.find((c) => c.id === editingId)?.order : credits.length + 1,
      createdAt: editingId ? (credits.find((c) => c.id === editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveCreditToFirestore(newDoc);
    setNotice(editingId ? `Credit "${name}" updated successfully.` : `Credit "${name}" created successfully.`);
    setTimeout(() => setNotice(null), 4000);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, creditName: string) => {
    if (window.confirm(`Are you sure you want to delete the credit source "${creditName}"? Existing problems using this credit will still retain the text.`)) {
      await deleteCreditFromFirestore(id);
      setNotice(`Credit source "${creditName}" deleted.`);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    await toggleCreditActiveInFirestore(id, currentState);
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= credits.length) return;

    const reordered = [...credits];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    const orderedIds = reordered.map((c) => c.id);
    await reorderCreditsInFirestore(orderedIds);
  };

  // Categories list
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    credits.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [credits]);

  const filteredCredits = useMemo(() => {
    return credits.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = categoryFilter === "all" || c.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [credits, searchQuery, categoryFilter]);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto font-['Poppins',sans-serif] space-y-6 animate-fade-in">
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1">
            <Tag className="w-4 h-4" />
            <span>Problem Intelligence Taxonomies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Credits & 3rd Party Sources
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mt-1">
            Manage origin credits, hackathon platforms, ministry challenges, and 3rd-party innovation programs available in problem statements.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Credit Source</span>
        </button>
      </div>

      {/* ── Toast Notice ────────────────────────────────────────────────────── */}
      {notice && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-emerald-500 hover:text-emerald-800">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Controls Bar (Search, Category Filter, Layout Switcher) ─────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <div className="flex items-center gap-3 flex-1 flex-wrap sm:flex-nowrap">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search credits by name, category..."
              className="w-full pl-9.5 pr-4 py-2 bg-gray-50 rounded-xl text-xs sm:text-sm text-gray-900 outline-none border border-gray-200 focus:bg-white focus:border-primary transition-all"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-gray-50 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 outline-none border border-gray-200 cursor-pointer focus:bg-white"
          >
            <option value="all">All Categories ({credits.length})</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Layout Mode Toggles */}
        <div className="flex items-center gap-1 self-end sm:self-auto bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setLayoutMode("grid")}
            className={`p-1.5 rounded-lg transition-all ${
              layoutMode === "grid" ? "bg-white text-primary shadow-2xs" : "text-gray-500 hover:text-gray-900"
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayoutMode("list")}
            className={`p-1.5 rounded-lg transition-all ${
              layoutMode === "list" ? "bg-white text-primary shadow-2xs" : "text-gray-500 hover:text-gray-900"
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Credits List / Grid ─────────────────────────────────────────────── */}
      {filteredCredits.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-gray-200 flex flex-col items-center gap-3">
          <Tag className="w-10 h-10 text-gray-300" />
          <h3 className="text-base font-bold text-gray-800">No Credit Sources Found</h3>
          <p className="text-xs text-gray-500 max-w-md">
            No credit sources matched your current search or category filter. You can add a new credit source using the button above.
          </p>
        </div>
      ) : layoutMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredCredits.map((cred, idx) => {
            const usageCount = creditUsageCounts[cred.name.trim().toLowerCase()] || 0;
            return (
              <div
                key={cred.id}
                className={`bg-white rounded-2xl sm:rounded-3xl border p-5 transition-all duration-300 flex flex-col justify-between gap-4 relative group shadow-2xs hover:shadow-md ${
                  cred.isActive !== false ? "border-gray-200/80" : "border-gray-200/40 opacity-70 bg-gray-50/50"
                }`}
              >
                {/* Top Section */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {cred.category || "Credit"}
                    </span>

                    <div className="flex items-center gap-1">
                      {/* Active Status Badge */}
                      <button
                        onClick={() => handleToggleActive(cred.id, cred.isActive !== false)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                          cred.isActive !== false
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                        title="Toggle Active in Dropdowns"
                      >
                        {cred.isActive !== false ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Disabled</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <span>{cred.name}</span>
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                      {cred.description || "No description provided for this attribution source."}
                    </p>
                  </div>
                </div>

                {/* Bottom Metadata & Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                    <span>
                      <strong className="text-gray-900">{usageCount}</strong> problems tagged
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Move Up/Down */}
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, "up")}
                      className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === filteredCredits.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => openEditModal(cred)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"
                      title="Edit Credit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(cred.id, cred.name)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-error hover:bg-error/10 transition-all cursor-pointer"
                      title="Delete Credit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Mode */
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-gray-600">
              <thead className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-3.5">Credit Source</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Description</th>
                  <th className="px-4 py-3.5 text-center">Usage</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredCredits.map((cred, idx) => {
                  const usageCount = creditUsageCounts[cred.name.trim().toLowerCase()] || 0;
                  return (
                    <tr key={cred.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-4 font-bold text-gray-900 whitespace-nowrap">
                        {cred.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {cred.category || "Credit"}
                        </span>
                      </td>
                      <td className="px-4 py-4 max-w-xs truncate text-gray-500">
                        {cred.description || "—"}
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-gray-800">
                        {usageCount}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleToggleActive(cred.id, cred.isActive !== false)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer ${
                            cred.isActive !== false ? "bg-emerald-50 text-emerald-700" : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {cred.isActive !== false ? "Active" : "Disabled"}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => openEditModal(cred)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(cred.id, cred.name)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-error hover:bg-error/10 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Add / Edit Modal ───────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {editingId ? "Edit Credit Source" : "Create New Credit Source"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Set attribution source details to populate in the public problem creation form dropdown.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Credit Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-900 flex justify-between">
                  <span>Credit / Platform Name <span className="text-error">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Smart India Hackathon (SIH), Unstop, Hack2skill..."
                  className="w-full bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 outline-none border border-gray-200 focus:bg-white focus:border-primary transition-all"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-900">Category / Type</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Hackathon Platform, Innovation Challenge, Government / Ministry, Corporate RFP..."
                  className="w-full bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 outline-none border border-gray-200 focus:bg-white focus:border-primary transition-all"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-900">Description / Background Note</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief note about the hackathon program, organization, or attribution context..."
                  className="w-full bg-gray-50 rounded-xl p-3 text-xs sm:text-sm text-gray-900 outline-none border border-gray-200 focus:bg-white focus:border-primary transition-all"
                />
              </div>

              {/* Website / Portal URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-900">Official Website URL (Optional)</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 outline-none border border-gray-200 focus:bg-white focus:border-primary transition-all"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-primary rounded accent-primary cursor-pointer"
                />
                <label htmlFor="isActiveToggle" className="text-xs font-semibold text-gray-800 cursor-pointer">
                  Show in Public Problem Creation Dropdown (Active)
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-container transition-all shadow-xs cursor-pointer"
                >
                  {editingId ? "Update Credit" : "Create Credit Source"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
