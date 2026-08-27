import React, { useState, useEffect } from "react";
import { subscribeLeaderboard, updateUserRole } from "@/lib/firebase/services/usersService";
import {
  subscribeBadges,
  grantBadgeToUser,
  revokeBadgeFromUser,
} from "@/lib/firebase/services/badgesService";
import { generateAdminInviteToken } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { UserDoc, UserRole, BadgeDoc } from "@/types";
import {
  Search,
  ChevronDown,
  UserPlus,
  MoreVertical,
  CheckCircle,
  Copy,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Plus,
  Trash2,
  Sparkles,
  FileText,
  ThumbsUp,
  Hammer,
} from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { DynamicBadgeIcon, TIER_CONFIG } from "@/components/ui/DynamicBadgeIcon";

export const AdminUsers: React.FC = () => {
  const { userDoc } = useAuth();
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [badges, setBadges] = useState<BadgeDoc[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [generatedInvite, setGeneratedInvite] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // User Badges Management Modal
  const [selectedUserForBadges, setSelectedUserForBadges] = useState<UserDoc | null>(null);
  const [badgeActionLoading, setBadgeActionLoading] = useState(false);

  useEffect(() => {
    const unsubUsers = subscribeLeaderboard((list) => setUsers(list));
    const unsubBadges = subscribeBadges((list) => setBadges(list));
    return () => {
      unsubUsers();
      unsubBadges();
    };
  }, []);

  const handleRoleChange = async (uid: string, newRole: UserRole) => {
    await updateUserRole(uid, newRole);
    setUsers((prev) =>
      prev.map((u) => (u.uid === uid ? { ...u, role: newRole } : u))
    );
  };

  const handleGenerateInvite = () => {
    const token = generateAdminInviteToken(userDoc?.uid || "admin_master");
    const link = `${window.location.origin}/admin/register?token=${token}`;
    setGeneratedInvite(link);
  };

  const handleCopyInvite = () => {
    if (generatedInvite) {
      navigator.clipboard.writeText(generatedInvite);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleToggleUserBadge = async (badgeName: string) => {
    if (!selectedUserForBadges) return;
    setBadgeActionLoading(true);
    const userBadges = selectedUserForBadges.badges || [];
    const hasBadge = userBadges.includes(badgeName);

    if (hasBadge) {
      await revokeBadgeFromUser(selectedUserForBadges.uid, badgeName);
      setSelectedUserForBadges((prev) =>
        prev ? { ...prev, badges: (prev.badges || []).filter((b) => b !== badgeName) } : null
      );
    } else {
      await grantBadgeToUser(selectedUserForBadges.uid, badgeName);
      setSelectedUserForBadges((prev) =>
        prev ? { ...prev, badges: [...(prev.badges || []), badgeName] } : null
      );
    }
    setBadgeActionLoading(false);
  };

  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (
      search.trim() &&
      !u.name?.toLowerCase().includes(search.toLowerCase()) &&
      !u.email?.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full font-body-md text-on-surface pb-12 gap-8 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface">Users & Credentials</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Manage user roles, monitor real-time problem submissions, and grant or revoke gamified achievement badges.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline h-4 w-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-lowest text-body-md font-body-md text-on-surface pl-10 pr-4 py-2.5 rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline text-xs"
              placeholder="Search by name or email..."
              type="text"
            />
          </div>

          {/* Role Filter */}
          <div className="relative w-full sm:w-36">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-surface-container-lowest text-body-md font-body-md text-on-surface pl-4 pr-8 py-2.5 rounded-lg shadow-sm border border-outline-variant/40 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer text-xs"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
          </div>

          {/* Invite Admin Button */}
          <button
            onClick={() => {
              setIsInviteOpen(true);
              setGeneratedInvite(null);
              setInviteEmail("");
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-primary-container hover:shadow-md transition-all whitespace-nowrap shadow-sm cursor-pointer"
          >
            <UserPlus className="h-4 w-4" />
            <span>Invite Admin</span>
          </button>
        </div>
      </div>

      {/* High-Density Data Table Card */}
      <div className="flex flex-col w-full bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/30">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1000px] flex flex-col w-full">
            {/* Table Header */}
            <div className="flex items-center px-6 py-4 bg-surface-container-low text-[11px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-surface-variant">
              <div className="w-10 flex items-center justify-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-primary focus:ring-primary bg-surface accent-primary cursor-pointer border-outline-variant"
                />
              </div>
              <div className="flex-1 min-w-[200px]">User Profile</div>
              <div className="w-32">Role</div>
              <div className="w-24 text-center">Submissions</div>
              <div className="w-24 text-center">Votes</div>
              <div className="flex-1 min-w-[220px]">Badges & Credentials</div>
              <div className="w-32 text-right pr-2">Role Actions</div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col w-full divide-y divide-surface-container">
              {filtered.length === 0 ? (
                <div className="py-16 text-center text-on-surface-variant text-xs">
                  No users found matching your criteria.
                </div>
              ) : (
                filtered.map((u) => {
                  const isAdmin = u.role === "admin";
                  const isMod = u.role === "moderator";
                  const userBadges = u.badges || [];

                  return (
                    <div
                      key={u.uid}
                      className="flex items-center px-6 py-4 hover:bg-surface-container-low/40 transition-colors group"
                    >
                      <div className="w-10 flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded text-primary focus:ring-primary bg-surface accent-primary cursor-pointer border-outline-variant"
                        />
                      </div>

                      {/* User Profile */}
                      <div className="flex-1 min-w-[200px] flex items-center gap-3">
                        <UserAvatar
                          src={u.photoURL}
                          name={u.name}
                          email={u.email}
                          role={u.role}
                          size="sm"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-on-surface truncate">
                            {u.name || "Anonymous User"}
                          </span>
                          <span className="text-[11px] text-on-surface-variant font-mono truncate">
                            {u.email || "No email"}
                          </span>
                        </div>
                      </div>

                      {/* Role Pill */}
                      <div className="w-32">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide ${
                            isAdmin
                              ? "bg-primary text-on-primary shadow-2xs"
                              : isMod
                              ? "bg-primary-fixed text-on-primary-fixed"
                              : "bg-surface-variant text-on-surface-variant"
                          }`}
                        >
                          <span className="capitalize">{u.role || "User"}</span>
                        </span>
                      </div>

                      {/* Submissions Count */}
                      <div className="w-24 text-center text-xs text-on-surface font-bold font-mono">
                        {u.counts?.problemsApproved ?? u.counts?.problemsSubmitted ?? 0}
                      </div>

                      {/* Votes Received Count */}
                      <div className="w-24 text-center text-xs text-on-surface font-bold font-mono">
                        {u.counts?.votes ?? 0}
                      </div>

                      {/* Badges Strip & Quick Manage Button */}
                      <div className="flex-1 min-w-[220px] flex items-center gap-1.5 flex-wrap">
                        {userBadges.slice(0, 3).map((bName) => {
                          const badgeObj = badges.find((b) => b.name === bName);
                          return (
                            <span
                              key={bName}
                              title={bName}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-surface-container text-on-surface border border-outline-variant/30"
                            >
                              <DynamicBadgeIcon
                                name={badgeObj?.iconName || "Award"}
                                className="w-3 h-3 text-primary"
                              />
                              <span className="truncate max-w-[90px]">{bName}</span>
                            </span>
                          );
                        })}
                        {userBadges.length > 3 && (
                          <span className="text-[10px] font-bold text-outline">
                            +{userBadges.length - 3}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => setSelectedUserForBadges(u)}
                          className="px-2 py-0.5 rounded-md bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-extrabold flex items-center gap-1 transition-colors cursor-pointer ml-1"
                        >
                          <Award className="w-3 h-3" />
                          <span>Manage</span>
                        </button>
                      </div>

                      {/* Role Selector */}
                      <div className="w-32 flex items-center justify-end pr-2">
                        <select
                          value={u.role || "user"}
                          onChange={(e) => handleRoleChange(u.uid, e.target.value as UserRole)}
                          className="rounded-lg border border-outline-variant bg-surface px-2 py-1 text-xs font-semibold text-on-surface focus:border-primary focus:outline-none shadow-xs cursor-pointer"
                        >
                          <option value="user">User</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low text-xs text-on-surface-variant border-t border-surface-variant">
          <span>Showing {filtered.length} of {users.length} registered users</span>
        </div>
      </div>

      {/* ── MANAGE USER BADGES MODAL ────────────────────────────────────────── */}
      {selectedUserForBadges && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-2xl p-6 md:p-8 flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-4">
              <div className="flex items-center gap-3">
                <UserAvatar
                  src={selectedUserForBadges.photoURL}
                  name={selectedUserForBadges.name}
                  email={selectedUserForBadges.email}
                  role={selectedUserForBadges.role}
                  size="md"
                />
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Credentials & Achievement Controller
                  </span>
                  <h3 className="text-lg font-bold text-on-surface">
                    {selectedUserForBadges.name || "Member"}
                  </h3>
                  <span className="text-xs text-outline font-mono">
                    {selectedUserForBadges.email}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUserForBadges(null)}
                className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Click any badge card to immediately grant or revoke it from this user. Badges with active tasks are also awarded automatically when users hit milestone thresholds.
            </p>

            {/* Badges Toggle Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.map((b) => {
                const userHasBadge = (selectedUserForBadges.badges || []).includes(b.name);
                const tierStyle = TIER_CONFIG[b.tier] || TIER_CONFIG.bronze;

                return (
                  <button
                    key={b.id}
                    type="button"
                    disabled={badgeActionLoading}
                    onClick={() => handleToggleUserBadge(b.name)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      userHasBadge
                        ? "bg-primary/5 border-primary shadow-xs ring-1 ring-primary/20"
                        : "bg-surface-container/30 border-outline-variant/30 hover:bg-surface-container/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${tierStyle.bg} ${tierStyle.border}`}
                      >
                        <DynamicBadgeIcon name={b.iconName} className="w-4 h-4" color={b.color} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-on-surface truncate">{b.name}</span>
                          <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded border ${tierStyle.bg} ${tierStyle.border}`}>
                            {b.tier}
                          </span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant line-clamp-1 mt-0.5">
                          {b.taskDescription || b.description}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 mt-1">
                      {userHasBadge ? (
                        <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shadow-2xs">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-outline">
                          +
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200/60">
              <button
                type="button"
                onClick={() => setSelectedUserForBadges(null)}
                className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-primary-container"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── INVITE ADMIN MODAL ────────────────────────────────────────────────── */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-3">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Invite New Administrator</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Generate a cryptographically secured invitation token allowing a designated team member to register as an administrator.
            </p>

            {generatedInvite ? (
              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-surface-container font-mono text-[11px] break-all border border-outline-variant/40 select-all">
                  {generatedInvite}
                </div>
                <button
                  type="button"
                  onClick={handleCopyInvite}
                  className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Invitation Link Copied!" : "Copy Invite Link"}</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGenerateInvite}
                className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all shadow-xs cursor-pointer"
              >
                Generate One-Time Admin Invite Link
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
