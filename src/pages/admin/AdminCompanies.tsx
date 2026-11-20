import React, { useState, useEffect, useMemo } from "react";
import {
  subscribeCompanies,
  createCompany,
  updateCompanyDetails,
  toggleCompanyVisibility,
  deleteCompany,
} from "@/lib/firebase/services/companiesService";
import { subscribeIndustries } from "@/lib/firebase/services/industriesService";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { CompanyDoc, IndustryDoc } from "@/types";
import { CompanyLogo, normalizeLogoUrl, resolveCompanyLogo } from "@/components/ui/CompanyLogo";
import { SearchableIndustrySelect } from "@/components/ui/SearchableIndustrySelect";
import { AdminBulkCompanyImportModal } from "@/components/admin/AdminBulkCompanyImportModal";
import { exportCompaniesToCsv, downloadCsvFile } from "@/lib/csv/companyCsvHelper";
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
  Upload,
  Download,
  Maximize2,
  Minimize2,
  Check,
  RotateCcw,
} from "lucide-react";

export const AdminCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyDoc[]>([]);
  const [industries, setIndustries] = useState<IndustryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "hidden">("all");

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateFullscreen, setIsCreateFullscreen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createLogoUrl, setCreateLogoUrl] = useState("");
  const [createWebsite, setCreateWebsite] = useState("");
  const [createIndustry, setCreateIndustry] = useState("Healthcare");
  const [createDescription, setCreateDescription] = useState("");
  const [createVerified, setCreateVerified] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Modal State
  const [editingCompany, setEditingCompany] = useState<CompanyDoc | null>(null);
  const [isEditFullscreen, setIsEditFullscreen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editLogoUrl, setEditLogoUrl] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [editIndustry, setEditIndustry] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editVerified, setEditVerified] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Bulk Modal State
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const unsubCompanies = subscribeCompanies((list) => {
      setCompanies(list);
      setLoading(false);
    });
    const unsubIndustries = subscribeIndustries((list) => {
      setIndustries(list);
    });
    return () => {
      unsubCompanies();
      unsubIndustries();
    };
  }, []);

  // Compute live available industries combining Firestore industries, company industries & defaults
  const availableIndustries = useMemo(() => {
    const map = new Map<string, { name: string; icon?: string; color?: string }>();

    // 1. Live added industries from Firestore / storage
    industries.forEach((ind) => {
      if (ind && ind.name && !ind.hidden) {
        map.set(ind.name.trim().toLowerCase(), {
          name: ind.name.trim(),
          icon: ind.icon,
          color: ind.color,
        });
      }
    });

    // 2. Also ensure industries already on existing companies exist
    companies.forEach((c) => {
      if (c.industry && c.industry.trim()) {
        const key = c.industry.trim().toLowerCase();
        if (!map.has(key)) {
          map.set(key, { name: c.industry.trim(), color: "#1657FF" });
        }
      }
    });

    // 3. Fallback to REAL_INDUSTRIES if empty
    if (map.size === 0) {
      REAL_INDUSTRIES.forEach((ind) => {
        map.set(ind.name.trim().toLowerCase(), {
          name: ind.name.trim(),
          icon: ind.icon,
          color: ind.color,
        });
      });
    }

    // Always ensure "General Industry" is present
    if (!map.has("general industry")) {
      map.set("general industry", { name: "General Industry", color: "#6B7280" });
    }

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [industries, companies]);

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;

    setIsSubmitting(true);
    const logo = resolveCompanyLogo(createLogoUrl.trim(), createName.trim(), createWebsite.trim());

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
    // Pre-resolve so user immediately sees the valid direct logo instead of placeholders or article URLs
    const resolved = resolveCompanyLogo(comp.logoUrl, comp.name, comp.website);
    setEditLogoUrl(resolved || comp.logoUrl);
    setEditWebsite(comp.website);
    setEditIndustry(comp.industry);
    setEditDescription(comp.description || "");
    setEditVerified(comp.verified ?? true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany || !editName.trim()) return;

    setIsUpdating(true);
    const resolvedLogo = resolveCompanyLogo(editLogoUrl.trim(), editName.trim(), editWebsite.trim());

    await updateCompanyDetails(editingCompany.id, {
      name: editName.trim(),
      logoUrl: resolvedLogo || editLogoUrl.trim(),
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

        {/* Global Action: Add Company, Bulk Upload, Export */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              const exported = exportCompaniesToCsv(companies);
              downloadCsvFile(`prblms-companies-export-${new Date().toISOString().slice(0, 10)}.csv`, exported);
              showToast(`Exported ${companies.length} companies to CSV!`);
            }}
            title="Export all companies as a CSV spreadsheet"
            className="px-3.5 py-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 rounded-xl text-xs font-semibold text-on-surface flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => setIsBulkModalOpen(true)}
            title="Upload CSV / Excel file or paste companies in bulk"
            className="px-3.5 py-2 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/70 text-xs font-bold text-primary shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-primary" />
            <span>Bulk Upload (CSV / Excel)</span>
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Company</span>
          </button>
        </div>
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
            {availableIndustries.map((ind) => (
              <option key={ind.name} value={ind.name}>
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
                      {/* Square Logo using CompanyLogo */}
                      <CompanyLogo
                        name={company.name}
                        logoUrl={company.logoUrl}
                        website={company.website}
                        size="lg"
                      />

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

      {/* ── CREATE COMPANY MODAL (Full Screen Studio) ────────────────── */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div
            className={`bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col transition-all duration-300 ${
              isCreateFullscreen
                ? "w-full h-full rounded-none"
                : "w-full max-w-5xl max-h-[92vh] h-[850px]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-low shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-on-surface">Create New Enterprise Partner</h3>
                    <span className="rounded-full bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 text-[11px] font-bold text-primary border border-primary/20">
                      Partner Directory
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Add a verified company, bounty sponsor, or venture solver to the ecosystem directory.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateFullscreen(!isCreateFullscreen)}
                  title={isCreateFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors hidden sm:inline-flex cursor-pointer"
                >
                  {isCreateFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body: 2-column studio layout */}
            <form onSubmit={handleCreateCompany} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-y-auto">
                {/* Left Column: Form Controls (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
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
                      placeholder="e.g. Nvidia, Google Health, Stripe"
                      className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                    />
                  </div>

                  {/* Square Logo URL */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-on-surface">
                        Logo URL (Square Image)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const auto = resolveCompanyLogo(createLogoUrl, createName, createWebsite);
                          if (auto) {
                            setCreateLogoUrl(auto);
                            showToast("Auto-fetched official logo asset!");
                          }
                        }}
                        className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Auto-Fetch Logo
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <CompanyLogo
                        name={createName || "Company"}
                        logoUrl={createLogoUrl}
                        website={createWebsite}
                        size="md"
                        className="shrink-0"
                      />
                      <input
                        type="text"
                        value={createLogoUrl}
                        onChange={(e) => setCreateLogoUrl(e.target.value)}
                        onBlur={(e) => {
                          const resolved = resolveCompanyLogo(e.target.value, createName, createWebsite);
                          if (resolved) setCreateLogoUrl(resolved);
                        }}
                        placeholder="https://.../logo.png or leave blank to auto-fetch"
                        className="flex-1 bg-surface-container-low rounded-xl px-3.5 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                      />
                    </div>
                  </div>

                  {/* Website Link */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">
                      Company Website Link
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant" />
                      <input
                        type="text"
                        value={createWebsite}
                        onChange={(e) => setCreateWebsite(e.target.value)}
                        placeholder="https://www.nvidia.com"
                        className="w-full bg-surface-container-low rounded-xl pl-9 pr-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30 font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  {/* Industry & Verified */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface">Industry</label>
                      <SearchableIndustrySelect
                        value={createIndustry}
                        onChange={setCreateIndustry}
                        industries={availableIndustries}
                        placeholder="Search or select industry..."
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface">Verified Badge</label>
                      <button
                        type="button"
                        onClick={() => setCreateVerified(!createVerified)}
                        className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border transition-all ${
                          createVerified
                            ? "bg-primary/10 text-primary border-primary/30 shadow-2xs"
                            : "bg-surface-container text-gray-400 border-outline-variant/30"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{createVerified ? "Verified Partner ✓" : "Standard Partner"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Description / Focus Areas</label>
                    <textarea
                      rows={4}
                      value={createDescription}
                      onChange={(e) => setCreateDescription(e.target.value)}
                      placeholder="Brief overview of venture mandate, core engineering focus, problem areas, or technical thesis..."
                      className="w-full bg-surface-container-low rounded-xl p-3.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30 resize-y"
                    />
                  </div>
                </div>

                {/* Right Column: Live Card Preview (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-3 bg-surface-container-low/70 rounded-2xl p-5 border border-outline-variant/30 justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-on-surface">Live Directory Preview</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-on-surface-variant font-bold">
                        Interactive
                      </span>
                    </div>

                    {/* Rendered Preview Card */}
                    <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <CompanyLogo
                            name={createName || "Partner"}
                            logoUrl={createLogoUrl}
                            website={createWebsite}
                            size="lg"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-sm font-extrabold text-on-surface line-clamp-1">
                                {createName.trim() || "Company Name"}
                              </h4>
                              {createVerified && (
                                <span title="Verified Enterprise Partner">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-primary">
                              {createIndustry || "General Industry"}
                            </span>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          Active
                        </span>
                      </div>

                      <p className="text-xs text-on-surface-variant line-clamp-3 min-h-[48px]">
                        {createDescription.trim() ||
                          "Enterprise solver and ecosystem venture partner actively reviewing challenge tracks."}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
                        {createWebsite.trim() ? (
                          <span className="inline-flex items-center gap-1.5 text-primary font-mono text-[11px] truncate max-w-[200px]">
                            <Globe className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">
                              {createWebsite.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                            </span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </span>
                        ) : (
                          <span className="text-on-surface-variant/40 font-mono text-[11px]">
                            www.website.com
                          </span>
                        )}

                        <span className="text-[10px] font-mono text-on-surface-variant">
                          ID: auto-generated
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Help Tips */}
                  <div className="p-3.5 rounded-xl bg-surface border border-outline-variant/20 text-[11px] text-on-surface-variant space-y-1">
                    <p className="font-bold text-on-surface flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      Enterprise Directory Standards
                    </p>
                    <p>
                      Square 1:1 logos work best. If left blank, the system automatically retrieves official favicons and SVG vectors from the company domain.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/30 bg-surface-container-low shrink-0">
                <span className="text-xs text-on-surface-variant">
                  Partner will be immediately published to the live directory.
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-white flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 transition-all hover:scale-[1.02]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Creating..." : "Create Enterprise Partner"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EDIT COMPANY MODAL (Full Screen Studio) ──────────────────── */}
      {editingCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div
            className={`bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col transition-all duration-300 ${
              isEditFullscreen
                ? "w-full h-full rounded-none"
                : "w-full max-w-5xl max-h-[92vh] h-[850px]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-low shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-on-surface">Edit Enterprise Partner</h3>
                    <span className="rounded-full bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 text-[11px] font-bold text-primary border border-primary/20">
                      ID: {editingCompany.id}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Modify partner identity, logo asset, domain link, and problem focus areas.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditFullscreen(!isEditFullscreen)}
                  title={isEditFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors hidden sm:inline-flex cursor-pointer"
                >
                  {isEditFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body: 2-column studio layout */}
            <form onSubmit={handleSaveEdit} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-y-auto">
                {/* Left Column: Form Controls (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
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
                      placeholder="e.g. Nvidia, Google Health, Stripe"
                      className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                    />
                  </div>

                  {/* Square Logo URL */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-on-surface">
                        Logo URL (Square Image)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const auto = resolveCompanyLogo(editLogoUrl, editName, editWebsite);
                          if (auto) {
                            setEditLogoUrl(auto);
                            showToast("Auto-fetched official logo asset!");
                          }
                        }}
                        className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Auto-Fetch Logo
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <CompanyLogo
                        name={editName || "Company"}
                        logoUrl={editLogoUrl}
                        website={editWebsite}
                        size="md"
                        className="shrink-0"
                      />
                      <input
                        type="text"
                        value={editLogoUrl}
                        onChange={(e) => setEditLogoUrl(e.target.value)}
                        onBlur={(e) => {
                          const resolved = resolveCompanyLogo(e.target.value, editName, editWebsite);
                          if (resolved) setEditLogoUrl(resolved);
                        }}
                        placeholder="https://... logo URL (Wikipedia, SVG, PNG)"
                        className="flex-1 bg-surface-container-low rounded-xl px-3.5 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                      />
                    </div>
                  </div>

                  {/* Website Link */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">
                      Company Website Link
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant" />
                      <input
                        type="text"
                        value={editWebsite}
                        onChange={(e) => setEditWebsite(e.target.value)}
                        placeholder="https://www.company.com"
                        className="w-full bg-surface-container-low rounded-xl pl-9 pr-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30 font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  {/* Industry & Verified */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface">Industry</label>
                      <SearchableIndustrySelect
                        value={editIndustry}
                        onChange={setEditIndustry}
                        industries={availableIndustries}
                        placeholder="Search or select industry..."
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface">Verified Badge</label>
                      <button
                        type="button"
                        onClick={() => setEditVerified(!editVerified)}
                        className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer border transition-all ${
                          editVerified
                            ? "bg-primary/10 text-primary border-primary/30 shadow-2xs"
                            : "bg-surface-container text-gray-400 border-outline-variant/30"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{editVerified ? "Verified Partner ✓" : "Standard Partner"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Description / Focus Areas</label>
                    <textarea
                      rows={4}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Brief overview of venture mandate, core engineering focus, problem areas, or technical thesis..."
                      className="w-full bg-surface-container-low rounded-xl p-3.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30 resize-y"
                    />
                  </div>
                </div>

                {/* Right Column: Live Card Preview (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-3 bg-surface-container-low/70 rounded-2xl p-5 border border-outline-variant/30 justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-on-surface">Live Directory Preview</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-on-surface-variant font-bold">
                        Interactive
                      </span>
                    </div>

                    {/* Rendered Preview Card */}
                    <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <CompanyLogo
                            name={editName || "Partner"}
                            logoUrl={editLogoUrl}
                            website={editWebsite}
                            size="lg"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-sm font-extrabold text-on-surface line-clamp-1">
                                {editName.trim() || "Company Name"}
                              </h4>
                              {editVerified && (
                                <span title="Verified Enterprise Partner">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-primary">
                              {editIndustry || "General Industry"}
                            </span>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          Active
                        </span>
                      </div>

                      <p className="text-xs text-on-surface-variant line-clamp-3 min-h-[48px]">
                        {editDescription.trim() ||
                          "Enterprise solver and ecosystem venture partner actively reviewing challenge tracks."}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
                        {editWebsite.trim() ? (
                          <span className="inline-flex items-center gap-1.5 text-primary font-mono text-[11px] truncate max-w-[200px]">
                            <Globe className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">
                              {editWebsite.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                            </span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </span>
                        ) : (
                          <span className="text-on-surface-variant/40 font-mono text-[11px]">
                            www.website.com
                          </span>
                        )}

                        <span className="text-[10px] font-mono text-on-surface-variant">
                          ID: {editingCompany.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Help Tips */}
                  <div className="p-3.5 rounded-xl bg-surface border border-outline-variant/20 text-[11px] text-on-surface-variant space-y-1">
                    <p className="font-bold text-on-surface flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      Live Ecosystem Sync
                    </p>
                    <p>
                      Changes made here immediately synchronize to the public directory and challenge sponsorship displays.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/30 bg-surface-container-low shrink-0">
                <span className="text-xs text-on-surface-variant">
                  Updating partner record for <strong>{editingCompany.name}</strong>.
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditingCompany(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-white flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 transition-all hover:scale-[1.02]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── BULK COMPANY IMPORT MODAL (CSV / EXCEL) ────────────────────── */}
      {isBulkModalOpen && (
        <AdminBulkCompanyImportModal
          isOpen={isBulkModalOpen}
          onClose={() => setIsBulkModalOpen(false)}
          existingCompanies={companies}
          onImportComplete={(created, merged) => {
            showToast(`Bulk import complete: ${created} created, ${merged} merged!`);
          }}
        />
      )}
    </div>
  );
};
