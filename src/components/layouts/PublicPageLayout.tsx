import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Search,
  Users,
  Trophy,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/explore", label: "Explore", icon: Search },
  { href: "/industries", label: "Industries", icon: LayoutGrid },
  { href: "/community", label: "Community", icon: Users },
  { href: "/research", label: "Research", icon: BookOpen },
];

export function PublicPageLayout({ children }: { children: React.ReactNode }) {
  const { user, userDoc, loading, isAdmin, logout } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    if (logout) await logout();
    setUserMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Navbar ───────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold tracking-tight">ProblemAtlas</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      id="user-menu-btn"
                      onClick={() => setUserMenuOpen((o) => !o)}
                      className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      <span className="hidden sm:block max-w-[120px] truncate">
                        {userDoc?.name ?? user.displayName ?? "Account"}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-popover py-1 shadow-lg"
                        >
                          <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent" onClick={() => setUserMenuOpen(false)}>
                            <User className="h-4 w-4" /> Dashboard
                          </Link>
                          <Link to="/submit" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent" onClick={() => setUserMenuOpen(false)}>
                            <Zap className="h-4 w-4" /> Submit Problem
                          </Link>
                          {isAdmin && (
                            <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent" onClick={() => setUserMenuOpen(false)}>
                              <Settings className="h-4 w-4" /> Admin Panel
                            </Link>
                          )}
                          <div className="my-1 border-t border-border" />
                          <button onClick={handleSignOut} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-accent">
                            <LogOut className="h-4 w-4" /> Sign out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm">Sign in</Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm">Get started</Button>
                    </Link>
                  </>
                )}
              </>
            )}
            {/* Mobile hamburger */}
            <button
              className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── Page content ─────────────────────────────── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                ProblemAtlas
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                Every Great Innovation Starts With A Problem.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">About</Link>
              <Link to="/explore" className="hover:text-foreground">Explore</Link>
              <Link to="/leaderboard" className="hover:text-foreground">Leaderboard</Link>
              <Link to="/admin/login" className="hover:text-foreground">Admin</Link>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} ProblemAtlas. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
