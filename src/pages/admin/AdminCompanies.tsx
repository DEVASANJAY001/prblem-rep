import React, { useState, useEffect } from "react";
import {
  subscribeCompanies,
  createCompany,
  updateCompanyDetails,
  toggleCompanyVisibility,
  deleteCompany,
} from "@/lib/firebase/services/companiesService";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { CompanyDoc } from "@/types";
import {
  Building2,
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Globe,
  X,
  Sparkles,
  ShieldCheck,
  Filter,
} from "lucide-react";

export const AdminCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "hidden">("all");

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createLogoUrl, setCreateLogoUrl] = useState("");
  const [createWebsite, setCreateWebsite] = useState("");
  const [createIndustry, setCreateIndustry] = useState("Healthcare & Biotech");
  const [createDescription, setCreateDescription] = useState("");
  const [createVerified, setCreateVerified] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Modal State
  const [editingCompany, setEditingCompany] = useState<CompanyDoc | null>(null);
  const [editName, setEditName] = useState("");
  const [editLogoUrl, setEditLogoUrl] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [editIndustry, setEditIndustry] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editVerified, setEditVerified] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const unsubscribe = subscribeCompanies((list) => {
      setCompanies(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;

    setIsSubmitting(true);
    const logo =
      createLogoUrl.trim() ||
      `https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop&crop=faces`;

    await createCompany({
      name: createName.trim(),
      logoUrl: logo,
      website: createWebsite.trim() || "https://example.com",
      industry: createIndustry,
      description: createDescription.trim(),
      verified: createVerified,
    });

    setIsSubmitting(false);
    setIsCreateOpen(false);
    setCreateName("");
    setCreateLogoUrl("");
    setCreateWebsite("");
    setCreateDescription("");
    showToast("Company created successfully!");
  };

  const handleOpenEdit = (comp: CompanyDoc) => {
    setEditingCompany(comp);
    setEditName(comp.name);
    setEditLogoUrl(comp.logoUrl);
    setEditWebsite(comp.website);
    setEditIndustry(comp.industry);
    setEditDescription(comp.description || "");
    setEditVerified(comp.verified ?? true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany || !editName.trim()) return;

    setIsUpdating(true);
    await updateCompanyDetails(editingCompany.id, {
      name: editName.trim(),
      logoUrl: editLogoUrl.trim(),
      website: editWebsite.trim(),
      industry: editIndustry,
      description: editDescription.trim(),
      verified: editVerified,
    });

    setIsUpdating(false);
    setEditingCompany(null);
    showToast("Company updated successfully!");
  };

  const handleToggleHide = async (id: string, currentlyHidden?: boolean) => {
    await toggleCompanyVisibility(id);
    showToast(currentlyHidden ? "Company is now public and visible" : "Company has been hidden from public");
  };

  const handleDelete = async (comp: CompanyDoc) => {
    if (window.confirm(`Are you sure you want to permanently delete "${comp.name}"?`)) {
      await deleteCompany(comp.id);
      showToast(`Deleted ${comp.name}`);
    }
  };

  const filtered = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      (c.website && c.website.toLowerCase().includes(search.toLowerCase()));

    const matchesIndustry = industryFilter === "all" || c.industry === industryFilter;

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? !c.hidden
        : Boolean(c.hidden);

    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const activeCount = companies.filter((c) => !c.hidden).length;
  const hiddenCount = companies.filter((c) => c.hidden).length;

  return (
    <div className="flex flex-col w-full font-['Poppins',sans-serif] text-on-surface pb-12 gap-6 max-w-7xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 shadow-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Command Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-on-surface">Companies & Ventures</h1>
              <span className="bg-surface-container text-on-surface-variant px-2.5 py-0.5 rounded-full text-xs font-bold">
                {companies.length} Total
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Manage enterprise solvers, bounty sponsors, and ecosystem venture partners.
            </p>
          </div>
        </div>

        {/* Global Action: Add Company */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2.5 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company name, industry, or domain..."
            className="w-full bg-surface-container-low rounded-xl pl-9 pr-4 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "all" ? "bg-white text-on-surface shadow-2xs" : "text-gray-500 hover:text-on-surface"
            }`}
          >
            All ({companies.length})
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "active" ? "bg-white text-emerald-700 shadow-2xs" : "text-gray-500 hover:text-on-surface"
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setStatusFilter("hidden")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              statusFilter === "hidden" ? "bg-white text-amber-700 shadow-2xs" : "text-gray-500 hover:text-on-surface"
            }`}
          >
            Hidden ({hiddenCount})
          </button>
        </div>

        {/* Industry Filter */}
        <div className="relative">
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary cursor-pointer pr-8"
          >
            <option value="all">All Industries</option>
            {REAL_INDUSTRIES.map((ind) => (
              <option key={ind.id} value={ind.name}>
                {ind.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Companies Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-gray-500">Loading companies registry...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 text-center flex flex-col items-center gap-3">
          <Building2 className="w-10 h-10 text-gray-400" />
          <h3 className="text-sm font-bold text-on-surface">No companies found</h3>
          <p className="text-xs text-on-surface-variant">Try adjusting your search terms or create a new company.</p>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="mt-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Company
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((company) => {
            const isHidden = Boolean(company.hidden);

            return (
              <div
                key={company.id}
                className={`bg-surface-container-lowest rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all shadow-2xs hover:shadow-md ${
                  isHidden ? "border-amber-400/40 bg-amber-50/10 opacity-75" : "border-outline-variant/30"
                }`}
              >
                {/* Card Top: Logo (Square), Name, Industry & Verified */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Square Logo */}
                      <div className="w-12 h-12 rounded-xl border border-outline-variant/40 bg-surface-container flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                        {company.logoUrl ? (
                          <img
                            src={company.logoUrl}
                            alt={company.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as any).src = "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop";
                            }}
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-on-surface truncate">{company.name}</h3>
                          {company.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" aria-label="Verified Enterprise" />
                          )}
                        </div>
                        <span className="text-[11px] text-gray-500 font-medium truncate">{company.industry}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    {isHidden ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                        Hidden
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {company.description && (
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>
                  )}

                  {/* Website link */}
                  {company.website && (
                    <a
                      href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1.5 font-medium truncate mt-0.5"
                    >
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{company.website.replace(/^https?:\/\//, "")}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 text-gray-400" />
                    </a>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
                  <span className="text-[11px] text-gray-400 font-mono">ID: {company.id}</span>

                  <div className="flex items-center gap-1.5">
                    {/* Toggle Visibility */}
                    <button
                      onClick={() => handleToggleHide(company.id, company.hidden)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        isHidden
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                      }`}
                      title={isHidden ? "Unhide Company" : "Hide from Public"}
                    >
                      {isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    {/* Edit Company */}
                    <button
                      onClick={() => handleOpenEdit(company)}
                      className="p-2 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant transition-all cursor-pointer"
                      title="Edit Company Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Company */}
                    <button
                      onClick={() => handleDelete(company)}
                      className="p-2 rounded-xl bg-surface-container hover:bg-rose-100 hover:text-rose-700 text-on-surface-variant transition-all cursor-pointer"
                      title="Delete Company"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── CREATE COMPANY MODAL ────────────────────────────────────────── */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-low">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">Create New Enterprise Partner</h3>
                  <p className="text-[11px] text-on-surface-variant">
                    Add a verified company or venture solver to the directory.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-on-surface cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="p-6 flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Company Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  placeholder="e.g. Apex Health Systems"
                  className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Square Logo URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Logo URL (Square Image)
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-outline-variant/40 bg-surface-container flex items-center justify-center overflow-hidden shrink-0">
                    {createLogoUrl ? (
                      <img src={createLogoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="url"
                    value={createLogoUrl}
                    onChange={(e) => setCreateLogoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or logo link"
                    className="flex-1 bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Website Link */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Company Website Link
                </label>
                <input
                  type="text"
                  value={createWebsite}
                  onChange={(e) => setCreateWebsite(e.target.value)}
                  placeholder="https://apexhealth.io"
                  className="w-full bg-surface-container-low rounded-xl px-4 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Industry & Verified */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Industry</label>
                  <select
                    value={createIndustry}
                    onChange={(e) => setCreateIndustry(e.target.value)}
                    className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  >
                    {REAL_INDUSTRIES.map((ind) => (
                      <option key={ind.id} value={ind.name}>
                        {ind.name}
                      </option>
                    ))}
                    <option value="General Industry">General Industry</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Verified Badge</label>
                  <button
                    type="button"
                    onClick={() => setCreateVerified(!createVerified)}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border ${
                      createVerified
                        ? "bg-primary/10 text-primary border-primary/30"
                        : "bg-surface-container text-gray-400 border-outline-variant/30"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{createVerified ? "Verified ✓" : "Unverified"}</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Description / Focus Areas</label>
                <textarea
                  rows={2}
                  value={createDescription}
                  onChange={(e) => setCreateDescription(e.target.value)}
                  placeholder="Brief description of enterprise focus, procurement goals, or venture mandate..."
                  className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Submit & Cancel */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary-container text-white flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Creating..." : "Create Company"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EDIT COMPANY MODAL ──────────────────────────────────────────── */}
      {editingCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-low">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">Edit Company Details</h3>
                  <p className="text-[11px] text-on-surface-variant">
                    Modify name, square logo, website link, and industry tags.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingCompany(null)}
                className="p-1 rounded-full text-gray-400 hover:text-on-surface cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Company Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Square Logo URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Logo URL (Square Image)
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-outline-variant/40 bg-surface-container flex items-center justify-center overflow-hidden shrink-0">
                    {editLogoUrl ? (
                      <img src={editLogoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="url"
                    value={editLogoUrl}
                    onChange={(e) => setEditLogoUrl(e.target.value)}
                    className="flex-1 bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Website Link */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">
                  Company Website Link
                </label>
                <input
                  type="text"
                  value={editWebsite}
                  onChange={(e) => setEditWebsite(e.target.value)}
                  className="w-full bg-surface-container-low rounded-xl px-4 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Industry & Verified */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Industry</label>
                  <select
                    value={editIndustry}
                    onChange={(e) => setEditIndustry(e.target.value)}
                    className="bg-surface-container-low rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  >
                    {REAL_INDUSTRIES.map((ind) => (
                      <option key={ind.id} value={ind.name}>
                        {ind.name}
                      </option>
                    ))}
                    <option value="General Industry">General Industry</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Verified Badge</label>
                  <button
                    type="button"
                    onClick={() => setEditVerified(!editVerified)}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border ${
                      editVerified
                        ? "bg-primary/10 text-primary border-primary/30"
                        : "bg-surface-container text-gray-400 border-outline-variant/30"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{editVerified ? "Verified ✓" : "Unverified"}</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Description</label>
                <textarea
                  rows={2}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Submit & Cancel */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary-container text-white flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
