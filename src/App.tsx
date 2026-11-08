import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ProtectedRoute, AdminRoute } from "@/components/common/ProtectedRoute";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { ScrollRestoration } from "@/components/common/ScrollRestoration";

// Robust dynamic import wrapper that handles stale chunk 404s after new deployments
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const sessionKey = "stuckhere_chunk_reload";
    const hasReloaded = sessionStorage.getItem(sessionKey);

    try {
      const module = await factory();
      sessionStorage.removeItem(sessionKey);
      return module;
    } catch (error: any) {
      const isChunkError =
        error?.message?.includes("Failed to fetch dynamically imported module") ||
        error?.name === "ChunkLoadError" ||
        error?.message?.includes("Importing a module script failed");

      if (isChunkError && !hasReloaded) {
        sessionStorage.setItem(sessionKey, "true");
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }

      sessionStorage.removeItem(sessionKey);
      throw error;
    }
  });
}

// Dynamic Code Splitting (Lazy-Loaded Route Modules with Auto-Reload on Stale Deployments)
const Home = lazyWithRetry(() => import("@/pages/public/Home").then((m) => ({ default: m.Home })));
const Explore = lazyWithRetry(() => import("@/pages/public/Explore").then((m) => ({ default: m.Explore })));
const ProblemDetail = lazyWithRetry(() => import("@/pages/public/ProblemDetail").then((m) => ({ default: m.ProblemDetail })));
const StartupMode = lazyWithRetry(() => import("@/pages/public/StartupMode").then((m) => ({ default: m.StartupMode })));
const Industries = lazyWithRetry(() => import("@/pages/public/Industries").then((m) => ({ default: m.Industries })));
const IndustryDetail = lazyWithRetry(() => import("@/pages/public/IndustryDetail").then((m) => ({ default: m.IndustryDetail })));
const Companies = lazyWithRetry(() => import("@/pages/public/Companies").then((m) => ({ default: m.Companies })));
const Research = lazyWithRetry(() => import("@/pages/public/Research").then((m) => ({ default: m.Research })));
const Community = lazyWithRetry(() => import("@/pages/public/Community").then((m) => ({ default: m.Community })));
const About = lazyWithRetry(() => import("@/pages/public/About").then((m) => ({ default: m.About })));
const AuthPage = lazyWithRetry(() => import("@/pages/public/AuthPage").then((m) => ({ default: m.AuthPage })));
const SubmitProblem = lazyWithRetry(() => import("@/pages/public/SubmitProblem").then((m) => ({ default: m.SubmitProblem })));
const Dashboard = lazyWithRetry(() => import("@/pages/public/Dashboard").then((m) => ({ default: m.Dashboard })));
const SavedProblems = lazyWithRetry(() => import("@/pages/public/SavedProblems").then((m) => ({ default: m.SavedProblems })));
const PublicFormRunner = lazyWithRetry(() => import("@/pages/public/PublicFormRunner").then((m) => ({ default: m.PublicFormRunner })));
const NotFound = lazyWithRetry(() => import("@/pages/public/NotFound").then((m) => ({ default: m.NotFound })));
const Features = lazyWithRetry(() => import("@/pages/public/Features").then((m) => ({ default: m.Features })));
const Solutions = lazyWithRetry(() => import("@/pages/public/Solutions").then((m) => ({ default: m.Solutions })));
const Contact = lazyWithRetry(() => import("@/pages/public/Contact").then((m) => ({ default: m.Contact })));
const Privacy = lazyWithRetry(() => import("@/pages/public/Privacy").then((m) => ({ default: m.Privacy })));
const Terms = lazyWithRetry(() => import("@/pages/public/Terms").then((m) => ({ default: m.Terms })));
const Cookies = lazyWithRetry(() => import("@/pages/public/Cookies").then((m) => ({ default: m.Cookies })));
const Competitions = lazyWithRetry(() => import("@/pages/public/Competitions").then((m) => ({ default: m.Competitions })));

// Admin Console Modules (Loaded on-demand only for authorized administrators)
const AdminLogin = lazyWithRetry(() => import("@/pages/admin/AdminLogin").then((m) => ({ default: m.AdminLogin })));
const AdminRegister = lazyWithRetry(() => import("@/pages/admin/AdminRegister").then((m) => ({ default: m.AdminRegister })));
const AdminOverview = lazyWithRetry(() => import("@/pages/admin/AdminOverview").then((m) => ({ default: m.AdminOverview })));
const AdminReviewQueue = lazyWithRetry(() => import("@/pages/admin/AdminReviewQueue").then((m) => ({ default: m.AdminReviewQueue })));
const AdminProblems = lazyWithRetry(() => import("@/pages/admin/AdminProblems").then((m) => ({ default: m.AdminProblems })));
const AdminProblemDetailEditor = lazyWithRetry(() => import("@/pages/admin/AdminProblemDetailEditor").then((m) => ({ default: m.AdminProblemDetailEditor })));
const AdminForms = lazyWithRetry(() => import("@/pages/admin/AdminForms").then((m) => ({ default: m.AdminForms })));
const AdminFormBuilder = lazyWithRetry(() => import("@/pages/admin/AdminFormBuilder").then((m) => ({ default: m.AdminFormBuilder })));
const AdminFormResponses = lazyWithRetry(() => import("@/pages/admin/AdminFormResponses").then((m) => ({ default: m.AdminFormResponses })));
const AdminUsers = lazyWithRetry(() => import("@/pages/admin/AdminUsers").then((m) => ({ default: m.AdminUsers })));
const AdminBadges = lazyWithRetry(() => import("@/pages/admin/AdminBadges").then((m) => ({ default: m.AdminBadges })));
const AdminAnalytics = lazyWithRetry(() => import("@/pages/admin/AdminAnalytics").then((m) => ({ default: m.AdminAnalytics })));
const AdminSettings = lazyWithRetry(() => import("@/pages/admin/AdminSettings").then((m) => ({ default: m.AdminSettings })));
const AdminIndustries = lazyWithRetry(() => import("@/pages/admin/AdminIndustries").then((m) => ({ default: m.AdminIndustries })));
const AdminAppController = lazyWithRetry(() => import("@/pages/admin/AdminAppController").then((m) => ({ default: m.AdminAppController })));
const AdminCompanies = lazyWithRetry(() => import("@/pages/admin/AdminCompanies").then((m) => ({ default: m.AdminCompanies })));
const AdminCredits = lazyWithRetry(() => import("@/pages/admin/AdminCredits").then((m) => ({ default: m.AdminCredits })));

// Pre-warm primary public routes during idle time so navigation is instantaneous
function RoutePrewarmer() {
  React.useEffect(() => {
    const prewarm = () => {
      import("@/pages/public/Explore");
      import("@/pages/public/Industries");
      import("@/pages/public/Community");
      import("@/pages/public/About");
      import("@/pages/public/ProblemDetail");
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(prewarm, { timeout: 3000 });
      } else {
        setTimeout(prewarm, 1200);
      }
    }
  }, []);

  return null;
}

// Ultra-fast slim top loader and fallback
const PageLoader = () => (
  <div className="w-full">
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-primary/20 z-[9999] overflow-hidden">
      <div className="h-full bg-gradient-to-r from-primary to-blue-400 animate-[indeterminate_1s_infinite_linear] origin-left" />
    </div>
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-xs font-semibold text-on-surface-variant">Switching page...</span>
      </div>
    </div>
  </div>
);

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname} resetKey={location.pathname}>
      {children}
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <RoutePrewarmer />
          <ScrollRestoration />
          <RoutedErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* ── Public Route Group ──────────────────────────────── */}
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<PublicLayout><Explore /></PublicLayout>} />
                <Route path="/problem/:id" element={<PublicLayout><ProblemDetail /></PublicLayout>} />
                <Route path="/startup-mode/:problemId" element={<ProtectedRoute><PublicLayout><StartupMode /></PublicLayout></ProtectedRoute>} />
                <Route path="/industries" element={<PublicLayout><Industries /></PublicLayout>} />
                <Route path="/industries/:slug" element={<PublicLayout><IndustryDetail /></PublicLayout>} />
                <Route path="/companies" element={<PublicLayout><Companies /></PublicLayout>} />
                <Route path="/research" element={<PublicLayout><Research /></PublicLayout>} />
                <Route path="/community" element={<PublicLayout><Community /></PublicLayout>} />
                <Route path="/leaderboard" element={<PublicLayout><Community /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/login" element={<PublicLayout><AuthPage defaultMode="login" /></PublicLayout>} />
                <Route path="/register" element={<PublicLayout><AuthPage defaultMode="register" /></PublicLayout>} />
                <Route path="/submit" element={<ProtectedRoute><PublicLayout><SubmitProblem /></PublicLayout></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><PublicLayout><Dashboard /></PublicLayout></ProtectedRoute>} />
                <Route path="/saved" element={<PublicLayout><SavedProblems /></PublicLayout>} />
                <Route path="/bookmarks" element={<PublicLayout><SavedProblems /></PublicLayout>} />
                <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
                <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
                <Route path="/forums" element={<PublicLayout><Community /></PublicLayout>} />
                <Route path="/partners" element={<PublicLayout><Companies /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
                <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
                <Route path="/cookies" element={<PublicLayout><Cookies /></PublicLayout>} />
                <Route path="/competitions" element={<PublicLayout><Competitions /></PublicLayout>} />

                {/* Dynamic Public Form Runner */}
                <Route path="/f/:formSlug" element={<PublicLayout><PublicFormRunner /></PublicLayout>} />

                {/* ── Admin Authentication (Unguarded Entrypoints) ──────── */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />

                {/* ── Guarded Admin Console Suite (/admin/*) ───────────────────────────────── */}
                {/* AdminRoute verifies: Firebase Auth + Firestore-confirmed role (custom claim) */}
                {/* userDocVerified must be true — blocks localStorage role spoofing attack window */}
                <Route path="/admin" element={<AdminRoute><AdminLayout><AdminOverview /></AdminLayout></AdminRoute>} />
                <Route path="/admin/review-queue" element={<AdminRoute><AdminLayout><AdminReviewQueue /></AdminLayout></AdminRoute>} />
                <Route path="/admin/problems" element={<AdminRoute><AdminLayout><AdminProblems /></AdminLayout></AdminRoute>} />
                <Route path="/admin/problems/:id/edit" element={<AdminRoute><AdminLayout><AdminProblemDetailEditor /></AdminLayout></AdminRoute>} />
                <Route path="/admin/app-controller" element={<AdminRoute><AdminLayout><AdminAppController /></AdminLayout></AdminRoute>} />
                <Route path="/admin/industries" element={<AdminRoute><AdminLayout><AdminIndustries /></AdminLayout></AdminRoute>} />
                <Route path="/admin/forms" element={<AdminRoute><AdminLayout><AdminForms /></AdminLayout></AdminRoute>} />
                <Route path="/admin/forms/new" element={<AdminRoute><AdminLayout><AdminFormBuilder /></AdminLayout></AdminRoute>} />
                <Route path="/admin/forms/:id/edit" element={<AdminRoute><AdminLayout><AdminFormBuilder /></AdminLayout></AdminRoute>} />
                <Route path="/admin/forms/:id/responses" element={<AdminRoute><AdminLayout><AdminFormResponses /></AdminLayout></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />
                <Route path="/admin/badges" element={<AdminRoute><AdminLayout><AdminBadges /></AdminLayout></AdminRoute>} />
                <Route path="/admin/credits" element={<AdminRoute><AdminLayout><AdminCredits /></AdminLayout></AdminRoute>} />
                <Route path="/admin/companies" element={<AdminRoute><AdminLayout><AdminCompanies /></AdminLayout></AdminRoute>} />
                <Route path="/admin/research" element={<AdminRoute><AdminLayout><Research /></AdminLayout></AdminRoute>} />
                <Route path="/admin/analytics" element={<AdminRoute><AdminLayout><AdminAnalytics /></AdminLayout></AdminRoute>} />
                <Route path="/admin/settings" element={<AdminRoute><AdminLayout><AdminSettings /></AdminLayout></AdminRoute>} />

                {/* ── Fallback 404 ─────────────────────────────────────── */}
                <Route
                  path="*"
                  element={
                    <PublicLayout>
                      <NotFound />
                    </PublicLayout>
                  }
                />
              </Routes>
            </Suspense>
          </RoutedErrorBoundary>
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
