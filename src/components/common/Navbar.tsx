import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Shield, Sparkles, User as UserIcon, Bookmark, Plus } from "lucide-react";
import { UserAvatar } from "@/components/ui/UserAvatar";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, userDoc, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change (handles browser back button)
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!userDropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [userDropdownOpen]);

  const navItems = [
    { label: "Explore", path: "/explore" },
    { label: "Industries", path: "/industries" },
    { label: "Community", path: "/community" },
  ];

  const preloadRoute = (path: string) => {
    switch (path) {
      case "/explore":
        import("@/pages/public/Explore");
        break;
      case "/industries":
        import("@/pages/public/Industries");
        break;
      case "/community":
        import("@/pages/public/Community");
        break;
      case "/dashboard":
        import("@/pages/public/Dashboard");
        break;
      case "/submit":
        import("@/pages/public/SubmitProblem");
        break;
      case "/about":
        import("@/pages/public/About");
        break;
      case "/login":
      case "/register":
        import("@/pages/public/AuthPage");
        break;
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-300">
      {/* Mobile-optimized Header Background (Lightweight, 60fps smooth scrolling) */}
      <div className="absolute inset-x-0 top-0 h-14 bg-surface/92 dark:bg-zinc-950/92 backdrop-blur-md border-b border-border/40 pointer-events-none sm:hidden" />

      {/* Desktop Progressive Glassmorphic Blur Mask */}
      <div
        className="hidden sm:block absolute inset-x-0 top-0 h-20 sm:h-24 md:h-28 bg-gradient-to-b from-surface/85 via-surface/40 to-transparent dark:from-zinc-950/85 dark:via-zinc-950/40 dark:to-transparent backdrop-blur-2xl pointer-events-none transform-gpu will-change-transform"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="h-14 sm:h-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-between relative z-10 pointer-events-auto">
        {/* Left Brand and Navigation */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 min-w-0">
          <Link
            to="/"
            onMouseEnter={() => import("@/pages/public/Home")}
            onTouchStart={() => import("@/pages/public/Home")}
            className="flex items-center group shrink-0"
          >
            <span className="font-headline-sm text-lg sm:text-xl md:text-2xl tracking-tight text-on-surface font-extrabold flex items-center transition-transform group-hover:scale-[1.02]">
              Stuck<span className="text-primary ml-0.5">here</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onMouseEnter={() => preloadRoute(item.path)}
                  onTouchStart={() => preloadRoute(item.path)}
                  className={`transition-all duration-200 font-body-md text-sm px-3.5 py-1.5 rounded-full ${
                    active
                      ? "bg-primary/10 text-primary font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 pr-0.5 sm:pr-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {user || userDoc ? (
              <Link
                to="/dashboard"
                className="text-body-md font-body-md text-on-surface-variant hover:text-primary transition-colors hidden sm:block px-2 sm:px-2.5 py-1 text-xs sm:text-sm font-semibold"
              >
                Dashboard
              </Link>
            ) : location.pathname === "/login" ? (
              <Link
                to="/register"
                className="text-body-md font-body-md text-primary hover:text-primary-container transition-colors px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap"
              >
                Sign up
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-body-md font-body-md text-on-surface-variant hover:text-on-surface transition-colors px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap"
              >
                Log in
              </Link>
            )}

            <Link
              to="/submit"
              className="inline-flex items-center gap-1 bg-on-surface/90 backdrop-blur-md text-surface px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 whitespace-nowrap border border-white/20 shrink-0"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span>Submit</span>
              <span className="hidden sm:inline">Problem</span>
            </Link>
          </div>

          {/* Profile Avatar Container - STRICTLY RENDERED ONLY WHEN LOGGED IN */}
          {(user || userDoc) && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="rounded-full ring-2 ring-white/60 dark:ring-white/20 hover:ring-primary/60 transition-all flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                title={`${userDoc?.name || user?.displayName || "User"} Profile Menu`}
              >
                <div className="sm:hidden">
                  <UserAvatar
                    src={userDoc?.photoURL || user?.photoURL}
                    name={userDoc?.name || user?.displayName}
                    email={userDoc?.email || user?.email}
                    role={userDoc?.role}
                    size="xs"
                    showRoleBadge
                  />
                </div>
                <div className="hidden sm:block">
                  <UserAvatar
                    src={userDoc?.photoURL || user?.photoURL}
                    name={userDoc?.name || user?.displayName}
                    email={userDoc?.email || user?.email}
                    role={userDoc?.role}
                    size="sm"
                    showRoleBadge
                  />
                </div>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-white/30 dark:border-white/10 bg-surface-container-lowest/95 backdrop-blur-xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  {/* Rich Profile Header */}
                  <div className="border-b border-outline-variant/20 p-3 flex items-center gap-3">
                    <UserAvatar
                      src={userDoc?.photoURL || user?.photoURL}
                      name={userDoc?.name || user?.displayName}
                      email={userDoc?.email || user?.email}
                      role={userDoc?.role}
                      size="md"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-on-surface truncate">
                          {userDoc?.name || user?.displayName || "Verified Member"}
                        </p>
                        {userDoc?.role === "admin" && (
                          <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-1.5 py-0.2 rounded-md">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-on-surface-variant truncate font-mono">
                        {userDoc?.email || user?.email || ""}
                      </p>
                    </div>
                  </div>

                  <div className="py-1 text-xs">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-on-surface hover:bg-surface-container-low font-medium transition-colors"
                    >
                      <UserIcon className="h-4 w-4 text-primary" />
                      <span>User Dashboard & Profile</span>
                    </Link>
                    <Link
                      to="/saved"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-on-surface hover:bg-surface-container-low font-medium transition-colors"
                    >
                      <Bookmark className="h-4 w-4 text-primary" />
                      <span>Saved Problems</span>
                    </Link>
                    {(userDoc?.role === "admin" || userDoc?.role === "moderator") && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-primary font-semibold hover:bg-primary/10 transition-colors"
                      >
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Admin Console</span>
                      </Link>
                    )}
                    <div className="my-1 border-t border-outline-variant/20" />
                    <button
                      onClick={logout}
                      className="w-full text-left rounded-xl px-3 py-2 text-error hover:bg-error-container/30 font-medium transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:scale-95 transition-all md:hidden flex items-center justify-center shrink-0 cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            title="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop for closing when tapping outside */}
          <div
            className="fixed inset-0 top-14 sm:top-16 bg-black/40 backdrop-blur-xs md:hidden z-40 pointer-events-auto"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-14 sm:top-16 inset-x-0 border-b border-outline-variant/30 bg-surface-container-lowest/98 backdrop-blur-2xl px-4 py-4 md:hidden shadow-2xl pointer-events-auto max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1.5">
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive("/explore")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                Explore Problems
              </Link>
              <Link
                to="/features"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive("/features")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                Features
              </Link>
              <Link
                to="/solutions"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive("/solutions")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                Solutions
              </Link>
              <Link
                to="/industries"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive("/industries")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                Industries
              </Link>
              <Link
                to="/community"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive("/community")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                Community
              </Link>
              <Link
                to="/companies"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive("/companies")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                Partners
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive("/about")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  isActive("/contact")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                Contact Us
              </Link>

              <div className="my-2 border-t border-outline-variant/20" />

              {user || userDoc ? (
                <div className="flex flex-col gap-1.5">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-3.5 py-2 text-xs font-bold text-on-surface hover:bg-surface-container-low flex items-center justify-between"
                  >
                    <span>My Dashboard</span>
                    <UserIcon className="w-4 h-4 text-primary" />
                  </Link>
                  <Link
                    to="/saved"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-3.5 py-2 text-xs font-bold text-on-surface hover:bg-surface-container-low flex items-center justify-between"
                  >
                    <span>Saved Problems</span>
                    <Bookmark className="w-4 h-4 text-primary" />
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left rounded-xl px-3.5 py-2 text-xs font-bold text-error hover:bg-error-container/30 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    to={location.pathname === "/login" ? "/register" : "/login"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    {location.pathname === "/login" ? "Sign up" : "Log in"}
                  </Link>
                  <Link
                    to="/submit"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-container transition-colors"
                  >
                    Submit Problem
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};
