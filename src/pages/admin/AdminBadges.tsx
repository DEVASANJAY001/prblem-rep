import React, { useState, useEffect, useMemo } from "react";
import {
  subscribeBadges,
  createBadge,
  updateBadge,
  deleteBadge,
  grantBadgeToUser,
} from "@/lib/firebase/services/badgesService";
import { subscribeLeaderboard } from "@/lib/firebase/services/usersService";
import { BadgeDoc, BadgeTier, BadgeCategory, BadgeTaskType, UserDoc } from "@/types";
import {
  DynamicBadgeIcon,
  TIER_CONFIG,
  LUCIDE_ICONS_CATALOG,
} from "@/components/ui/DynamicBadgeIcon";
import {
  Award,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  UserPlus,
  Sparkles,
  Shield,
  Layers,
  Rocket,
  Flame,
  Star,
  Check,
  Filter,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";

const CATEGORIES: { id: BadgeCategory; label: string }[] = [
  { id: "submission", label: "Problems & Submissions" },
  { id: "research", label: "Research & Evidence" },
  { id: "venture", label: "Startup & Venture" },
  { id: "community", label: "Community & Votes" },
  { id: "special", label: "Special & Honorary" },
];

const TIERS: { id: BadgeTier; label: string }[] = [
  { id: "bronze", label: "Bronze" },
  { id: "silver", label: "Silver" },
  { id: "gold", label: "Gold" },
  { id: "platinum", label: "Platinum" },
  { id: "diamond", label: "Diamond" },
  { id: "legendary", label: "Legendary" },
];

const TASK_TYPES: { id: BadgeTaskType; label: string; unit: string }[] = [
  { id: "problems_submitted", label: "Problems Submitted", unit: "problems" },
  { id: "solutions_built", label: "Startup Workspaces Built", unit: "solutions" },
  { id: "votes_received", label: "Community Votes Received", unit: "votes" },
  { id: "evidence_attached", label: "Evidence Data Points & Docs", unit: "data points" },
  { id: "tam_modeled", label: "TAM Sizing ($1B+ count)", unit: "models" },
  { id: "critical_problems", label: "Critical Severity Problems", unit: "critical problems" },
  { id: "comments_posted", label: "Discussion Comments", unit: "comments" },
  { id: "bounties_joined", label: "Bounty Competitions Joined", unit: "bounties" },
  { id: "manual_award", label: "Manual Administrator Award", unit: "manual" },
];

export const AdminBadges: React.FC = () => {
  const [badges, setBadges] = useState<BadgeDoc[]>([]);
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [tierFilter, setTierFilter] = useState<string>("all");

  // Create / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<BadgeDoc | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("Award");
  const [category, setCategory] = useState<BadgeCategory>("submission");
  const [tier, setTier] = useState<BadgeTier>("bronze");
  const [taskType, setTaskType] = useState<BadgeTaskType>("problems_submitted");
  const [taskThreshold, setTaskThreshold] = useState<number>(1);
  const [taskDescription, setTaskDescription] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [isActive, setIsActive] = useState(true);

  // Icon Picker Filter State
  const [iconSearch, setIconSearch] = useState("");

  // Award to User Modal State
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [badgeToAward, setBadgeToAward] = useState<BadgeDoc | null>(null);
  const [selectedUserUid, setSelectedUserUid] = useState<string>("");
  const [awardSuccess, setAwardSuccess] = useState<string | null>(null);

  useEffect(() => {
    const unsubBadges = subscribeBadges((list) => setBadges(list));
    const unsubUsers = subscribeLeaderboard((list) => setUsers(list));
    return () => {
      unsubBadges();
      unsubUsers();
    };
  }, []);

  const handleOpenCreate = () => {
    setEditingBadge(null);
    setName("");
    setSlug("");
    setDescription("");
    setIconName("Award");
    setCategory("submission");
    setTier("bronze");
    setTaskType("problems_submitted");
    setTaskThreshold(1);
    setTaskDescription("Submit at least 1 verified problem statement.");
    setColor("#3B82F6");
    setIsActive(true);
    setIconSearch("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: BadgeDoc) => {
    setEditingBadge(b);
    setName(b.name);
    setSlug(b.slug);
    setDescription(b.description);
    setIconName(b.iconName || "Award");
    setCategory(b.category);
    setTier(b.tier);
    setTaskType(b.taskType);
    setTaskThreshold(b.taskThreshold);
    setTaskDescription(b.taskDescription);
    setColor(b.color || "#3B82F6");
    setIsActive(b.isActive);
    setIconSearch("");
    setIsModalOpen(true);
  };

  const handleSaveBadge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: description.trim(),
      iconName: iconName.trim() || "Award",
      category,
      tier,
      taskType,
      taskThreshold: Number(taskThreshold) || 1,
      taskDescription: taskDescription.trim() || `Complete ${taskThreshold} ${taskType.replace(/_/g, " ")}`,
      isActive,
      color,
    };

    if (editingBadge) {
      await updateBadge(editingBadge.id, payload);
    } else {
      await createBadge(payload);
    }

    setIsModalOpen(false);
  };

  const handleDeleteBadge = async (id: string, badgeName: string) => {
    if (window.confirm(`Are you sure you want to delete badge "${badgeName}"?`)) {
      await deleteBadge(id);
    }
  };

  const handleOpenAward = (b: BadgeDoc) => {
    setBadgeToAward(b);
    setSelectedUserUid(users[0]?.uid || "");
    setAwardSuccess(null);
    setIsAwardModalOpen(true);
  };

  const handleConfirmAward = async () => {
    if (!badgeToAward || !selectedUserUid) return;
    await grantBadgeToUser(selectedUserUid, badgeToAward.name);
    const targetUser = users.find((u) => u.uid === selectedUserUid);
    setAwardSuccess(`Badge "${badgeToAward.name}" successfully awarded to ${targetUser?.name || "user"}!`);
    setTimeout(() => {
      setIsAwardModalOpen(false);
      setAwardSuccess(null);
    }, 1800);
  };

  const filteredBadges = useMemo(() => {
    return badges.filter((b) => {
      if (categoryFilter !== "all" && b.category !== categoryFilter) return false;
      if (tierFilter !== "all" && b.tier !== tierFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = b.name.toLowerCase().includes(q);
        const matchDesc = b.description.toLowerCase().includes(q);
        const matchTask = b.taskDescription?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchTask) return false;
      }
      return true;
    });
  }, [badges, categoryFilter, tierFilter, search]);

  const filteredIcons = useMemo(() => {
    if (!iconSearch.trim()) return LUCIDE_ICONS_CATALOG.slice(0, 72);
    const q = iconSearch.toLowerCase();
    return LUCIDE_ICONS_CATALOG.filter((ic) => ic.toLowerCase().includes(q)).slice(0, 96);
  }, [iconSearch]);

  return (
    <div className="flex flex-col w-full font-body-md text-on-surface pb-16 gap-8 max-w-7xl mx-auto">
      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            <span>Gamification & Credentials</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-on-surface tracking-tight">
            Badges & Tasks Controller
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant max-w-2xl mt-1">
            Create unique ecosystem credentials with tough automated task milestones, choose from 500+ vector icons, and grant achievements to members.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-primary text-white hover:bg-primary-container px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Badge</span>
        </button>
      </div>

      {/* ── Metric Summary Tiles ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex flex-col gap-1">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Total Badges</span>
          <span className="text-2xl font-black text-on-surface">{badges.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex flex-col gap-1">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Active Automated Tasks</span>
          <span className="text-2xl font-black text-emerald-600">{badges.filter((b) => b.isActive).length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex flex-col gap-1">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Tiers Configured</span>
          <span className="text-2xl font-black text-primary">6 Tiers</span>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex flex-col gap-1">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Total Awards Granted</span>
          <span className="text-2xl font-black text-purple-600">
            {badges.reduce((acc, b) => acc + (b.awardedCount || 0), 0)}
          </span>
        </div>
      </div>

      {/* ── Search & Filters Bar ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-container-lowest p-3 rounded-2xl border border-outline-variant/30 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search badge name, tasks, or criteria..."
            className="w-full bg-surface-container/40 pl-9 pr-3 py-2 rounded-xl text-xs text-on-surface outline-none border border-outline-variant/30"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-surface-container/40 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface outline-none border border-outline-variant/30 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-surface-container/40 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface outline-none border border-outline-variant/30 cursor-pointer capitalize"
          >
            <option value="all">All Tiers</option>
            {TIERS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Badges Grid ─────────────────────────────────────────────────────── */}
      {filteredBadges.length === 0 ? (
        <div className="p-16 rounded-3xl bg-surface-container-lowest border border-dashed border-gray-300 text-center flex flex-col items-center gap-3">
          <Award className="w-10 h-10 text-outline opacity-40" />
          <h3 className="text-base font-bold text-on-surface">No Badges Found</h3>
          <p className="text-xs text-on-surface-variant max-w-sm">
            Try adjusting your search criteria or create a brand new badge to reward community contributions.
          </p>
          <button
            onClick={handleOpenCreate}
            className="mt-2 bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Create Badge
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBadges.map((badge) => {
            const tierStyle = TIER_CONFIG[badge.tier] || TIER_CONFIG.bronze;

            return (
              <div
                key={badge.id}
                className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
              >
                <div className="flex flex-col gap-3">
                  {/* Top Badge Row: Icon + Tier Pill + Action Menu */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${tierStyle.bg} ${tierStyle.border}`}
                    >
                      <DynamicBadgeIcon
                        name={badge.iconName}
                        className="w-6 h-6"
                        tier={badge.tier}
                        color={badge.color}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${tierStyle.bg} ${tierStyle.border}`}
                      >
                        {badge.tier}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          badge.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {badge.isActive ? "Active" : "Paused"}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                      {badge.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>

                  {/* Task Milestones Box */}
                  <div className="p-3 rounded-2xl bg-surface-container/30 border border-outline-variant/20 flex flex-col gap-1 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-primary flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Task Milestone:</span>
                      </span>
                      <span className="font-mono text-on-surface bg-surface-container px-2 py-0.5 rounded-md">
                        {badge.taskThreshold} {badge.taskType.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant italic mt-0.5">
                      "{badge.taskDescription}"
                    </p>
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 mt-1">
                  <span className="text-[11px] font-semibold text-outline">
                    {badge.awardedCount || 0} members earned
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenAward(badge)}
                      title="Award manually to a user"
                      className="p-2 rounded-xl bg-surface-container/50 hover:bg-primary/10 text-on-surface hover:text-primary border border-outline-variant/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Award</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(badge)}
                      title="Edit Badge Config"
                      className="p-2 rounded-xl bg-surface-container/50 hover:bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/30 transition-all cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteBadge(badge.id, badge.name)}
                      title="Delete Badge"
                      className="p-2 rounded-xl bg-surface-container/50 hover:bg-rose-50 hover:text-rose-600 border border-outline-variant/30 transition-all cursor-pointer"
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

      {/* ── CREATE / EDIT BADGE MODAL ────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-2xl p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                  {editingBadge ? "Edit Credential" : "New Badge Definition"}
                </span>
                <h2 className="text-xl font-bold text-on-surface">
                  {editingBadge ? `Edit ${editingBadge.name}` : "Create Unique Badge"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBadge} className="flex flex-col gap-5">
              {/* Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Badge Name <span className="text-error">*</span></label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!editingBadge) {
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                      }
                    }}
                    placeholder="e.g. Venture Architect"
                    className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Slug ID</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. venture-architect"
                    className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-mono text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Description & Achievement Lore</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the prestige and significance of this credential..."
                  className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                />
              </div>

              {/* Category & Tier & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BadgeCategory)}
                    className="w-full bg-surface-container/40 rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface outline-none border border-outline-variant/30 cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Prestige Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as BadgeTier)}
                    className="w-full bg-surface-container/40 rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface outline-none border border-outline-variant/30 cursor-pointer capitalize"
                  >
                    {TIERS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Status</label>
                  <select
                    value={isActive ? "active" : "paused"}
                    onChange={(e) => setIsActive(e.target.value === "active")}
                    className="w-full bg-surface-container/40 rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface outline-none border border-outline-variant/30 cursor-pointer"
                  >
                    <option value="active">Active (Auto-award on)</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              {/* 500+ Lucide Icon Selector */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container/20 border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-2">
                    <span>Selected Icon:</span>
                    <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md flex items-center gap-1.5">
                      <DynamicBadgeIcon name={iconName} className="w-3.5 h-3.5" />
                      <span>{iconName}</span>
                    </span>
                  </label>
                  <div className="relative w-44">
                    <Search className="w-3 h-3 text-outline absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={iconSearch}
                      onChange={(e) => setIconSearch(e.target.value)}
                      placeholder="Search 500+ icons..."
                      className="w-full bg-surface-container pl-7 pr-2 py-1 rounded-lg text-[11px] text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>

                {/* Icon Grid */}
                <div className="grid grid-cols-8 sm:grid-cols-12 gap-1.5 max-h-36 overflow-y-auto p-1 bg-surface rounded-xl border border-outline-variant/20">
                  {filteredIcons.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setIconName(ic)}
                      title={ic}
                      className={`p-2 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                        iconName === ic
                          ? "bg-primary text-white shadow-xs"
                          : "hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      <DynamicBadgeIcon name={ic} className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tough Task Requirement Engine Config */}
              <div className="p-4 rounded-2xl bg-surface-container/20 border border-outline-variant/30 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>Automated Tough Task Requirement</span>
                  </span>
                  <span className="text-[10px] text-outline">Evaluated automatically upon user activity</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-on-surface">Target Metric</label>
                    <select
                      value={taskType}
                      onChange={(e) => setTaskType(e.target.value as BadgeTaskType)}
                      className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30 cursor-pointer"
                    >
                      {TASK_TYPES.map((tt) => (
                        <option key={tt.id} value={tt.id}>
                          {tt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-on-surface">Threshold Target Count</label>
                    <input
                      type="number"
                      min="1"
                      value={taskThreshold}
                      onChange={(e) => setTaskThreshold(Number(e.target.value))}
                      className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-on-surface">Public Task Instruction Prompt</label>
                  <input
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="e.g. Publish 5 structured problems with full operational context"
                    className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-container text-white px-6 py-2.5 text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {editingBadge ? "Save Badge Changes" : "Publish Badge & Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── AWARD BADGE TO USER MODAL ────────────────────────────────────────── */}
      {isAwardModalOpen && badgeToAward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <DynamicBadgeIcon name={badgeToAward.iconName} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">Award "{badgeToAward.name}"</h3>
                  <span className="text-[11px] text-outline capitalize">{badgeToAward.tier} Tier</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAwardModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {awardSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 border border-emerald-200">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{awardSuccess}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Select a registered user to immediately grant this credential to their profile.
                </p>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Target User</label>
                  <select
                    value={selectedUserUid}
                    onChange={(e) => setSelectedUserUid(e.target.value)}
                    className="w-full bg-surface-container/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30 cursor-pointer"
                  >
                    {users.map((u) => (
                      <option key={u.uid} value={u.uid}>
                        {u.name || "Anonymous"} ({u.email || u.uid})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAwardModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmAward}
                    className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-primary-container shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Grant Badge</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
