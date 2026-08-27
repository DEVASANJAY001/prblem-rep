import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ShieldAlert, Search, Bell, ExternalLink } from "lucide-react";

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userDoc, isAdmin, isModerator, loading } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-surface text-on-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-body-md font-body-md text-on-surface-variant">Verifying Admin Permissions...</span>
        </div>
      </div>
    );
  }

  // Strictly block anyone who is not an admin or moderator
  if (!user || (!isAdmin && !isModerator)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center text-on-surface">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-error/10 text-error border border-error-container shadow-sm">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-headline-md font-headline-md text-on-surface">Admin Permission Required</h1>
        <p className="mt-2 max-w-md text-body-md font-body-md text-on-surface-variant">
          The path <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-on-surface">{location.pathname}</code> is restricted to platform moderators and administrators.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link
            to="/admin/login"
            className="rounded-lg bg-primary px-5 py-2.5 text-label-md font-label-md text-on-primary shadow-sm hover:bg-primary-container transition-all"
          >
            Admin Sign In
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-label-md font-label-md text-on-surface hover:bg-surface-container-high transition-colors"
          >
            Back to Public Site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isHovered={isHovered}
        onHoverChange={setIsHovered}
      />
      
      {/* Top Header matching Stitch */}
      <header
        className={`fixed top-0 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant z-40 transition-all duration-300 ${
          isCollapsed ? "left-20" : "left-64"
        }`}
      >
        <div className="h-full px-6 sm:px-8 flex items-center justify-between">
          <h2 className="text-headline-sm font-headline-sm text-on-surface">Dashboard</h2>
          
          <div className="flex items-center gap-6">
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline h-4 w-4" />
              <input
                className="w-full pl-9 pr-4 py-2 bg-surface-container-low border-none rounded-lg text-body-md text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Global search..."
                type="text"
              />
            </div>
            
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-1.5 text-label-md font-label-md text-on-surface hover:bg-surface-container transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="h-3.5 w-3.5 text-outline" />
            </Link>

            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content container */}
      <main
        className={`pt-16 min-h-screen bg-surface transition-all duration-300 ${
          isCollapsed ? "pl-20" : "pl-64"
        }`}
      >
        <div className="px-6 sm:px-8 py-8">{children}</div>
      </main>
    </div>
  );
};
