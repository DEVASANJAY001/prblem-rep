import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getIndustries,
  saveIndustry,
  deleteIndustry,
  toggleIndustryVisibility,
  reorderIndustries,
  getProblems,
} from "@/lib/storage";
import {
  saveIndustryToFirestore,
  deleteIndustryFromFirestore,
  toggleIndustryVisibilityInFirestore,
  subscribeIndustries,
} from "@/lib/firebase/services/industriesService";
import { IndustryDoc } from "@/types";
import {
  Building2,
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
  TrendingUp,
  Heart,
  Leaf,
  Bot,
  Zap,
  GraduationCap,
  Car,
  ShoppingCart,
  ShieldCheck,
  Scale,
  Landmark,
  Hammer,
  Coffee,
  Activity,
  Globe,
} from "lucide-react";

// Supported Lucide icon mapping
const ICON_MAP: Record<string, any> = {
  Activity,
  Heart,
  Leaf,
  Bot,
  Zap,
  GraduationCap,
  Building2,
  Car,
  ShoppingCart,
  ShieldCheck,
  Scale,
  Landmark,
  Hammer,
  Coffee,
  Globe,
  Layers,
  Sparkles,
};

export const AdminIndustries: React.FC = () => {
  const [industries, setIndustries] = useState<IndustryDoc[]>([]);
  const [layoutMode, setLayoutMode] = useState<"grid" | "list" | "compact">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("Activity");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#1657FF");
  const [marketSize, setMarketSize] = useState("₹18.6 Cr");
  const [weeklyTrend, setWeeklyTrend] = useState("↑ 24%");
  const [opportunityCount, setOpportunityCount] = useState<number>(2341);
  const [trendingCount, setTrendingCount] = useState<number>(92);
  const [avgPainScore, setAvgPainScore] = useState<number>(91);
  const [subcategoriesStr, setSubcategoriesStr] = useState(
    "Patient Care, Hospitals & Clinics, Medical Devices, HealthTech, Pharma & Biotech, Mental Health, Public Health, Health Insurance"
  );

  const loadAll = () => {
    setIndustries(getIndustries(true));
  };

  useEffect(() => {
    const unsubscribe = subscribeIndustries((list) => {
      setIndustries(list);
    });
    return () => unsubscribe();
  }, []);

  const showNotification = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleOpenCreate = () => {
    setEditingSlug(null);
    setName("");
    setSlug("");
    setIcon("Activity");
    setDescription("");
    setColor("#1657FF");
    setMarketSize("₹15.0 Cr");
    setWeeklyTrend("↑ 18%");
    setOpportunityCount(1850);
    setTrendingCount(64);
    setAvgPainScore(88);
    setSubcategoriesStr("General Operations, Automation, Compliance, Customer Experience");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ind: IndustryDoc) => {
    setEditingSlug(ind.slug);
    setName(ind.name);
    setSlug(ind.slug);
    setIcon(ind.icon || "Activity");
    setDescription(ind.description || "");
    setColor(ind.color || "#1657FF");
    setMarketSize(ind.marketSize || "₹18.6 Cr");
    setWeeklyTrend(ind.weeklyTrend || "↑ 24%");
    setOpportunityCount(ind.opportunityCount || 2341);
    setTrendingCount(ind.trendingCount || 92);
    setAvgPainScore(ind.avgPainScore || 91);
    setSubcategoriesStr(
      ind.subcategories?.map((s) => s.name).join(", ") ||
        "Patient Care, Hospitals & Clinics, Medical Devices, HealthTech, Pharma & Biotech, Mental Health"
    );
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const generatedSlug = slug.trim()
      ? slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-")
      : name.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");

    const subcats = subcategoriesStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => ({ name: s, count: Math.floor(Math.random() * 2000) + 500 }));

    const payload: IndustryDoc = {
      slug: generatedSlug,
      name,
      icon,
      description,
      color,
      marketSize,
      weeklyTrend,
      opportunityCount,
      trendingCount,
      avgPainScore,
      problemCount: editingSlug ? industries.find((i) => i.slug === editingSlug)?.problemCount || 12840 : 12840,
      subcategories: subcats,
    };

    await saveIndustryToFirestore(payload);
    loadAll();
    setIsModalOpen(false);
    showNotification(`Industry "${name}" saved successfully!`);
  };

  const handleToggleVisibility = async (slugToToggle: string) => {
    const isNowHidden = await toggleIndustryVisibilityInFirestore(slugToToggle);
    loadAll();
    showNotification(`Industry is now ${!isNowHidden ? "Visible on public site" : "Hidden from public view"}`);
  };

  const handleDelete = async (slugToDelete: string, indName: string) => {
    if (window.confirm(`Are you sure you want to delete "${indName}"?`)) {
      await deleteIndustryFromFirestore(slugToDelete);
      loadAll();
      showNotification(`Industry "${indName}" deleted.`);
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= industries.length) return;

    const copy = [...industries];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    const reordered = reorderIndustries(copy.map((i) => i.slug));
    setIndustries(reordered);
    showNotification("Industry order updated live!");
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-zinc-950 tracking-tight">Industries Control Studio</h1>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-[#1657FF] border border-blue-100">
              {industries.filter((i) => !i.hidden).length} Active • {industries.length} Total
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Visual control engine mirroring <Link to="/industries" target="_blank" className="text-[#1657FF] font-semibold hover:underline">/industries</Link>. Rearrange, edit formulations, set icons, and toggle visibility.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Layout Mode Switcher */}
          <div className="flex rounded-xl border border-zinc-200 bg-zinc-100 p-1 shadow-xs">
            <button
              onClick={() => setLayoutMode("grid")}
              title="Visual Grid View (Live Public Mirror)"
              className={`rounded-lg p-1.5 transition-all ${
                layoutMode === "grid" ? "bg-white text-zinc-900 shadow-xs" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLayoutMode("list")}
              title="Table / List View"
              className={`rounded-lg p-1.5 transition-all ${
                layoutMode === "list" ? "bg-white text-zinc-900 shadow-xs" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLayoutMode("compact")}
              title="Compact Cards View"
              className={`rounded-lg p-1.5 transition-all ${
                layoutMode === "compact" ? "bg-white text-zinc-900 shadow-xs" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <Layers className="h-4 w-4" />
            </button>
          </div>

          <Link
            to="/industries"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 shadow-xs"
          >
            <span>Preview /industries</span>
            <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
          </Link>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#1657FF] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0E47E6] transition-all hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" />
            <span>Add Industry</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* ── Mode 1: Visual Grid (Mirroring /industries) ────────────────── */}
      {layoutMode === "grid" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, index) => {
            const IconComponent = ICON_MAP[ind.icon] || Building2;
            const isHidden = ind.hidden;

            return (
              <div
                key={ind.slug}
                className={`rounded-2xl border bg-white p-5 space-y-4 shadow-xs transition-all ${
                  isHidden ? "opacity-60 border-dashed border-zinc-300 bg-zinc-50/50" : "border-zinc-200/80 hover:shadow-md"
                }`}
              >
                {/* Card Top: Order Badge, Icon, and Reorder Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-100 font-mono text-[11px] font-bold text-zinc-600">
                      #{index + 1}
                    </span>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-xs"
                      style={{ backgroundColor: ind.color || "#1657FF" }}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMove(index, "up")}
                      disabled={index === 0}
                      title="Move Up in sequence"
                      className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleMove(index, "down")}
                      disabled={index === industries.length - 1}
                      title="Move Down in sequence"
                      className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Industry Info */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-zinc-900">{ind.name}</h3>
                    {isHidden && (
                      <span className="rounded bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 border border-rose-100">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {ind.description || "Sector intelligence, problem clusters, and validation pipelines."}
                  </p>
                </div>

                {/* Key Formulations Metrics */}
                <div className="grid grid-cols-3 gap-2 rounded-xl bg-zinc-50 p-3 text-center border border-zinc-100 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Problems</span>
                    <p className="font-bold text-zinc-900 mt-0.5">{ind.problemCount || 12840}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Avg. Pain</span>
                    <p className="font-bold text-rose-600 mt-0.5">{ind.avgPainScore || 91}/100</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Est. TAM</span>
                    <p className="font-bold text-[#1657FF] mt-0.5">{ind.marketSize || "₹18.6 Cr"}</p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-xs">
                  <Link
                    to={`/industries/${ind.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 font-bold text-[#1657FF] hover:underline"
                  >
                    <span>View Hub</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleVisibility(ind.slug)}
                      title={isHidden ? "Unhide industry" : "Hide from public view"}
                      className={`rounded-lg p-1.5 transition-colors ${
                        isHidden ? "bg-amber-50 text-amber-700" : "text-zinc-500 hover:bg-zinc-100"
                      }`}
                    >
                      {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>

                    <button
                      onClick={() => handleOpenEdit(ind)}
                      title="Edit industry details"
                      className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(ind.slug, ind.name)}
                      title="Delete industry"
                      className="rounded-lg p-1.5 text-zinc-400 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Mode 2: Table / List View ─────────────────────────────────── */}
      {layoutMode === "list" && (
        <div className="rounded-2xl border border-zinc-200/80 bg-white overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs text-zinc-600">
            <thead className="border-b border-zinc-200/80 bg-zinc-50/70 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-4 py-3.5 w-16">Seq</th>
                <th className="px-4 py-3.5">Industry Name</th>
                <th className="px-4 py-3.5">Slug</th>
                <th className="px-4 py-3.5">Problems</th>
                <th className="px-4 py-3.5">Avg Pain</th>
                <th className="px-4 py-3.5">Est. TAM</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {industries.map((ind, index) => {
                const IconComponent = ICON_MAP[ind.icon] || Building2;
                return (
                  <tr key={ind.slug} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-bold text-zinc-500">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-zinc-900 flex items-center gap-2.5">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
                        style={{ backgroundColor: ind.color || "#1657FF" }}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <Link to={`/industries/${ind.slug}`} className="hover:text-[#1657FF]">
                        {ind.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-zinc-400">
                      /industries/{ind.slug}
                    </td>
                    <td className="px-4 py-3.5 font-bold font-mono text-zinc-900">
                      {ind.problemCount || 12840}
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-rose-600">
                      {ind.avgPainScore || 91}/100
                    </td>
                    <td className="px-4 py-3.5 font-bold text-[#1657FF]">
                      {ind.marketSize || "₹18.6 Cr"}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          ind.hidden
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {ind.hidden ? "Hidden" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-1">
                      <button
                        onClick={() => handleMove(index, "up")}
                        disabled={index === 0}
                        className="rounded p-1 text-zinc-400 hover:bg-zinc-100 disabled:opacity-20"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(index, "down")}
                        disabled={index === industries.length - 1}
                        className="rounded p-1 text-zinc-400 hover:bg-zinc-100 disabled:opacity-20"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleVisibility(ind.slug)}
                        className="rounded p-1 text-zinc-500 hover:bg-zinc-100"
                      >
                        {ind.hidden ? <EyeOff className="h-3.5 w-3.5 text-amber-600" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => handleOpenEdit(ind)}
                        className="rounded p-1 text-zinc-500 hover:bg-zinc-100"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(ind.slug, ind.name)}
                        className="rounded p-1 text-zinc-400 hover:text-rose-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Mode 3: Compact Cards View ────────────────────────────────── */}
      {layoutMode === "compact" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {industries.map((ind, index) => {
            const IconComponent = ICON_MAP[ind.icon] || Building2;
            return (
              <div
                key={ind.slug}
                className="rounded-xl border border-zinc-200/80 bg-white p-3.5 flex items-center justify-between shadow-xs hover:border-zinc-300"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: ind.color || "#1657FF" }}
                  >
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-zinc-900 truncate">{ind.name}</p>
                    <p className="text-[10px] text-zinc-400 font-mono font-semibold">{ind.problemCount || 12840} Problems</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => handleOpenEdit(ind)} className="rounded p-1 text-zinc-400 hover:text-zinc-900">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleToggleVisibility(ind.slug)} className="rounded p-1 text-zinc-400 hover:text-zinc-900">
                    {ind.hidden ? <EyeOff className="h-3.5 w-3.5 text-amber-600" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Create / Edit Modal ───────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-zinc-200 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-zinc-950">
                  {editingSlug ? `Edit Industry: ${name}` : "Create New Industry"}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Configure sector parameters, icon, and dynamic quantitative formulations.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Industry Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Retail & E-Commerce"
                    className="w-full rounded-xl border border-zinc-200 p-2.5 text-xs text-zinc-900 focus:border-[#1657FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Public URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. retail"
                    className="w-full rounded-xl border border-zinc-200 p-2.5 text-xs font-mono text-[#1657FF] font-bold focus:border-[#1657FF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Icon Selector & Color Accent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-100 pt-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Vector Icon</label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 p-2.5 text-xs text-zinc-900 font-semibold focus:border-[#1657FF] focus:outline-none"
                  >
                    {Object.keys(ICON_MAP).map((iconKey) => (
                      <option key={iconKey} value={iconKey}>
                        {iconKey}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Brand Theme Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="h-9 w-12 rounded-lg border border-zinc-200 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 rounded-xl border border-zinc-200 p-2 text-xs font-mono text-zinc-700"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Sector Overview Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the operational friction and technology scope in this sector..."
                  className="w-full rounded-xl border border-zinc-200 p-2.5 text-xs text-zinc-800 focus:border-[#1657FF] focus:outline-none"
                />
              </div>

              {/* Quantitative Formulations Fields */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4 space-y-3">
                <span className="text-[11px] font-bold text-[#1657FF] uppercase tracking-wider block">
                  Dynamic Hub Formulations (/industries/:slug)
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Est. TAM Size</label>
                    <input
                      type="text"
                      value={marketSize}
                      onChange={(e) => setMarketSize(e.target.value)}
                      placeholder="₹18.6 Cr"
                      className="mt-1 w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs font-bold text-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Weekly Trend</label>
                    <input
                      type="text"
                      value={weeklyTrend}
                      onChange={(e) => setWeeklyTrend(e.target.value)}
                      placeholder="↑ 24%"
                      className="mt-1 w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs font-bold text-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Opportunities</label>
                    <input
                      type="number"
                      value={opportunityCount}
                      onChange={(e) => setOpportunityCount(Number(e.target.value))}
                      className="mt-1 w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs font-bold text-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Avg. Pain Score</label>
                    <input
                      type="number"
                      value={avgPainScore}
                      onChange={(e) => setAvgPainScore(Number(e.target.value))}
                      className="mt-1 w-full rounded-lg border border-zinc-200 bg-white p-2 text-xs font-bold text-rose-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Subcategories (Comma separated for left sidebar breakdown)
                </label>
                <textarea
                  rows={2}
                  value={subcategoriesStr}
                  onChange={(e) => setSubcategoriesStr(e.target.value)}
                  placeholder="Patient Care, Hospitals & Clinics, Medical Devices, HealthTech..."
                  className="w-full rounded-xl border border-zinc-200 p-2.5 text-xs text-zinc-800 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-zinc-200 px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#1657FF] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0E47E6]"
                >
                  Save Industry Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
