import React, { useState, useEffect } from "react";
import { subscribeLeaderboard, updateUserRole } from "@/lib/firebase/services/usersService";
import { generateAdminInviteToken } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { UserDoc, UserRole } from "@/types";
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
} from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";

export const AdminUsers: React.FC = () => {
  const { userDoc } = useAuth();
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [generatedInvite, setGeneratedInvite] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeLeaderboard((list) => setUsers(list));
    return () => unsubscribe();
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
        <h1 className="text-headline-lg font-headline-lg text-on-surface">Users</h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline h-4 w-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-lowest text-body-md font-body-md text-on-surface pl-10 pr-4 py-2.5 rounded-lg shadow-sm border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline"
              placeholder="Search by name or email..."
              type="text"
            />
          </div>

          {/* Role Filter */}
          <div className="relative w-full sm:w-40">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-surface-container-lowest text-body-md font-body-md text-on-surface pl-4 pr-10 py-2.5 rounded-lg shadow-sm border border-outline-variant/40 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
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
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg text-label-md font-label-md hover:bg-primary-container hover:shadow-md transition-all whitespace-nowrap shadow-sm"
          >
            <UserPlus className="h-4 w-4" />
            <span>Invite Admin</span>
          </button>
        </div>
      </div>

      {/* High-Density Data Table Card */}
      <div className="flex flex-col w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[900px] flex flex-col w-full">
            {/* Table Header */}
            <div className="flex items-center px-6 py-4 bg-surface-container-low text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest border-b border-surface-variant">
              <div className="w-12 flex items-center justify-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-primary focus:ring-primary bg-surface accent-primary cursor-pointer border-outline-variant"
                />
              </div>
              <div className="flex-1 min-w-[200px]">User</div>
              <div className="flex-1 min-w-[200px]">Email</div>
              <div className="w-32">Role</div>
              <div className="w-32 text-center">Submissions</div>
              <div className="w-40">Joined</div>
              <div className="w-32 text-right pr-2">Change Role</div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col w-full divide-y divide-surface-container">
              {filtered.length === 0 ? (
                <div className="py-16 text-center text-on-surface-variant">
                  No users found matching your criteria.
                </div>
              ) : (
                filtered.map((u) => {
                  const isAdmin = u.role === "admin";
                  const isMod = u.role === "moderator";

                  return (
                    <div
                      key={u.uid}
                      className="flex items-center px-6 py-4 hover:bg-surface-container-low/40 transition-colors group"
                    >
                      <div className="w-12 flex items-center justify-center">
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
                        <span className="text-body-md font-body-md font-bold text-on-surface truncate">
                          {u.name || "Anonymous User"}
                        </span>
                      </div>

                      {/* Email */}
                      <div className="flex-1 min-w-[200px] text-body-md font-body-md text-on-surface-variant truncate pr-4 font-mono">
                        {u.email || "No email on record"}
                      </div>

                      {/* Role Pill */}
                      <div className="w-32">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-label-sm font-label-sm font-semibold tracking-wide ${
                            isAdmin
                              ? "bg-primary text-on-primary shadow-sm"
                              : isMod
                              ? "bg-primary-fixed text-on-primary-fixed"
                              : "bg-surface-variant text-on-surface-variant"
                          }`}
                        >
                          <span className="capitalize">{u.role || "User"}</span>
                        </span>
                      </div>

                      {/* Submissions */}
                      <div className="w-32 text-center text-body-md font-body-md text-on-surface font-semibold font-mono">
                        {u.counts?.problemsApproved || 0}
                      </div>

                      {/* Joined Date */}
                      <div className="w-40 text-body-md font-body-md text-outline">
                        {u.createdAt
                          ? typeof u.createdAt === "string"
                            ? new Date(u.createdAt).toLocaleDateString()
                            : u.createdAt?.toDate
                            ? u.createdAt.toDate().toLocaleDateString()
                            : "Active"
                          : "Active"}
                      </div>

                      {/* Role Selector */}
                      <div className="w-32 flex items-center justify-end pr-2">
                        <select
                          value={u.role || "user"}
                          onChange={(e) => handleRoleChange(u.uid, e.target.value as UserRole)}
                          className="rounded-lg border border-outline-variant bg-surface px-2 py-1 text-label-sm font-semibold text-on-surface focus:border-primary focus:outline-none shadow-sm cursor-pointer"
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
        <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low text-body-md font-body-md text-on-surface-variant border-t border-surface-variant">
          <span>Showing 1 to {filtered.length} of {users.length} entries</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-surface-variant text-outline disabled:opacity-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold shadow-sm">
              1
            </button>
            <button className="p-1.5 rounded-lg hover:bg-surface-variant text-outline">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Invite Admin Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-surface-container-lowest rounded-xl shadow-2xl p-6 md:p-8 flex flex-col gap-6 text-on-surface border border-outline-variant">
            <div className="flex items-center justify-between">
              <h2 className="text-headline-sm font-headline-sm text-on-surface">Invite Administrator</h2>
              <button
                onClick={() => setIsInviteOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-variant text-outline"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wide">
                  Invitee Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@problematlas.com"
                  className="w-full bg-surface-container-low border border-outline-variant text-body-md font-body-md text-on-surface px-4 py-2.5 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <p className="text-label-sm font-label-sm text-outline">
                Generates a secure single-use registration link valid for 7 days.
              </p>
            </div>

            {!generatedInvite ? (
              <button
                onClick={handleGenerateInvite}
                className="w-full bg-primary text-on-primary py-3 rounded-lg text-label-md font-label-md hover:bg-primary-container shadow-sm transition-all"
              >
                Generate Invite Link
              </button>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <label className="text-label-md font-label-md text-secondary uppercase tracking-wide flex items-center gap-1.5 font-bold">
                  <CheckCircle className="h-4 w-4 text-secondary" /> Invite Token Ready
                </label>
                <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant p-2 rounded-lg">
                  <input
                    type="text"
                    readOnly
                    value={generatedInvite}
                    className="flex-1 bg-transparent text-body-md font-body-md text-on-surface font-mono outline-none truncate"
                  />
                  <button
                    onClick={handleCopyInvite}
                    className="p-2 bg-primary text-on-primary rounded-md hover:bg-primary-container transition-colors flex items-center justify-center shadow-xs"
                    title="Copy Link"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
