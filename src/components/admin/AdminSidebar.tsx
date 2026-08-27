import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { generateAdminInviteToken, getProblems } from "@/lib/storage";
import {
  LayoutDashboard,
  Inbox,
  FileSpreadsheet,
  FilePlus2,
  SlidersHorizontal,
  Users,
  Trophy,
  Building2,
  BookOpen,
  BarChart3,
  Settings,
  Key,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isHovered,
  onHoverChange,
}) => {
  const location = useLocation();
  const { userDoc, logout } = useAuth();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const pendingCount = getProblems({ status: "pending" }).length;

  const handleGenerateToken = () => {
    const token = generateAdminInviteToken(userDoc?.uid || "admin_master");
    setCopiedToken(token);
    navigator.clipboard.writeText(`${window.location.origin}/admin/register?token=${token}`);
    setTimeout(() => setCopiedToken(null), 3500);
  };

  const navItems = [
    { name: "Overview", path: "/admin", icon: LayoutDashboard },
    { name: "Review Queue", path: "/admin/review-queue", icon: Inbox, badge: pendingCount },
    { name: "Problems", path: "/admin/problems", icon: FileSpreadsheet },
    { name: "App Controller", path: "/admin/app-controller", icon: SlidersHorizontal },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Forms", path: "/admin/forms", icon: FilePlus2 },
    { name: "Industries", path: "/admin/industries", icon: Building2 },
    { name: "Competitions", path: "/admin/competitions", icon: Trophy },
    { name: "Companies", path: "/admin/companies", icon: Building2 },
    { name: "Research", path: "/admin/research", icon: BookOpen },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/admin" && location.pathname === "/admin") return true;
    if (path !== "/admin" && (location.pathname === path || (path !== "/admin" && location.pathname.startsWith(path)))) {
      return true;
    }
    return false;
  };

  // Expanded if manually not collapsed OR if hovered while collapsed
  const isExpanded = !isCollapsed || isHovered;

  return (
    <aside
      onMouseEnter={() => {
        if (isCollapsed) onHoverChange(true);
      }}
      onMouseLeave={() => {
        if (isCollapsed) onHoverChange(false);
      }}
      className={`fixed left-0 top-0 bottom-0 bg-surface-dim border-r border-outline-variant flex flex-col z-50 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64 shadow-2xl" : "w-20 shadow-sm"
      }`}
    >
      {/* Brand Header & Minimize Toggle Button */}
      <div className={`p-4 flex items-center ${isExpanded ? "justify-between" : "justify-center"} border-b border-outline-variant/30 h-16`}>
        {isExpanded ? (
          <>
            <Link to="/admin" className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                PA
              </div>
              <span className="font-headline-sm text-base font-bold text-on-surface tracking-tight truncate">
                Admin
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                to="/"
                title="View public website"
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
              <button
                onClick={onToggleCollapse}
                title={isCollapsed ? "Lock expanded" : "Minimize to icons only"}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={onToggleCollapse}
            title="Expand sidebar"
            className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-sm hover:scale-105 transition-transform cursor-pointer"
          >
            PA
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              title={!isExpanded ? item.name : undefined}
              className={`flex items-center ${
                isExpanded ? "justify-between px-3.5 py-2.5" : "justify-center p-2.5"
              } rounded-xl text-body-md font-body-md transition-all group relative ${
                active
                  ? "bg-primary text-on-primary font-semibold shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`h-5 w-5 shrink-0 ${active ? "text-on-primary" : "text-on-surface-variant group-hover:text-primary transition-colors"}`} />
                {isExpanded && (
                  <span className="truncate text-sm">{item.name}</span>
                )}
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                isExpanded ? (
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ml-1.5 ${
                    active ? "bg-white/20 text-white" : "bg-error/15 text-error"
                  }`}>
                    {item.badge}
                  </span>
                ) : (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-surface-dim" />
                )
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="mt-auto p-3 border-t border-outline-variant flex flex-col gap-2 bg-surface-dim">
        {isExpanded ? (
          <>
            <button
              onClick={handleGenerateToken}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2 text-xs font-bold text-primary hover:bg-surface-container transition-colors"
            >
              <Key className="h-3.5 w-3.5" />
              <span className="truncate">{copiedToken ? "Invite Copied!" : "Generate Admin Key"}</span>
            </button>

            <div className="flex items-center gap-3 pt-2">
              <UserAvatar
                src={userDoc?.photoURL}
                name={userDoc?.name}
                email={userDoc?.email}
                role={userDoc?.role || "admin"}
                size="sm"
                showRoleBadge
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-on-surface truncate">
                  {userDoc?.name || userDoc?.email?.split("@")[0] || "Admin"}
                </span>
                <span className="text-[11px] text-on-surface-variant truncate capitalize">
                  {userDoc?.role || "System Lead"}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 text-xs font-medium text-on-surface-variant hover:text-error transition-colors px-1 py-1.5 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleGenerateToken}
              title={copiedToken ? "Invite Copied!" : "Generate Admin Key"}
              className="w-10 h-10 rounded-xl border border-outline-variant bg-surface-container-low flex items-center justify-center text-primary hover:bg-surface-container transition-colors"
            >
              <Key className="h-4 w-4" />
            </button>
            <div title={`${userDoc?.name || "Admin"} (${userDoc?.role || "System Lead"})`}>
              <UserAvatar
                src={userDoc?.photoURL}
                name={userDoc?.name}
                email={userDoc?.email}
                role={userDoc?.role || "admin"}
                size="sm"
                showRoleBadge
              />
            </div>
            <button
              onClick={logout}
              title="Sign out"
              className="p-2 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
