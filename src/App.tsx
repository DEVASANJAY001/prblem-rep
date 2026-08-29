import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { ScrollRestoration } from "@/components/common/ScrollRestoration";

// Dynamic Code Splitting (Lazy-Loaded Route Modules)
const Home = lazy(() => import("@/pages/public/Home").then((m) => ({ default: m.Home })));
const Explore = lazy(() => import("@/pages/public/Explore").then((m) => ({ default: m.Explore })));
const ProblemDetail = lazy(() => import("@/pages/public/ProblemDetail").then((m) => ({ default: m.ProblemDetail })));
const StartupMode = lazy(() => import("@/pages/public/StartupMode").then((m) => ({ default: m.StartupMode })));
const Industries = lazy(() => import("@/pages/public/Industries").then((m) => ({ default: m.Industries })));
const IndustryDetail = lazy(() => import("@/pages/public/IndustryDetail").then((m) => ({ default: m.IndustryDetail })));
const Companies = lazy(() => import("@/pages/public/Companies").then((m) => ({ default: m.Companies })));
const Research = lazy(() => import("@/pages/public/Research").then((m) => ({ default: m.Research })));
const Community = lazy(() => import("@/pages/public/Community").then((m) => ({ default: m.Community })));
const About = lazy(() => import("@/pages/public/About").then((m) => ({ default: m.About })));
const Login = lazy(() => import("@/pages/public/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("@/pages/public/Register").then((m) => ({ default: m.Register })));
const SubmitProblem = lazy(() => import("@/pages/public/SubmitProblem").then((m) => ({ default: m.SubmitProblem })));
const Dashboard = lazy(() => import("@/pages/public/Dashboard").then((m) => ({ default: m.Dashboard })));
const SavedProblems = lazy(() => import("@/pages/public/SavedProblems").then((m) => ({ default: m.SavedProblems })));
const PublicFormRunner = lazy(() => import("@/pages/public/PublicFormRunner").then((m) => ({ default: m.PublicFormRunner })));

// Admin Console Modules (Loaded on-demand only for authorized administrators)
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin").then((m) => ({ default: m.AdminLogin })));
const AdminRegister = lazy(() => import("@/pages/admin/AdminRegister").then((m) => ({ default: m.AdminRegister })));
const AdminOverview = lazy(() => import("@/pages/admin/AdminOverview").then((m) => ({ default: m.AdminOverview })));
const AdminReviewQueue = lazy(() => import("@/pages/admin/AdminReviewQueue").then((m) => ({ default: m.AdminReviewQueue })));
const AdminProblems = lazy(() => import("@/pages/admin/AdminProblems").then((m) => ({ default: m.AdminProblems })));
const AdminProblemDetailEditor = lazy(() => import("@/pages/admin/AdminProblemDetailEditor").then((m) => ({ default: m.AdminProblemDetailEditor })));
const AdminForms = lazy(() => import("@/pages/admin/AdminForms").then((m) => ({ default: m.AdminForms })));
const AdminFormBuilder = lazy(() => import("@/pages/admin/AdminFormBuilder").then((m) => ({ default: m.AdminFormBuilder })));
const AdminFormResponses = lazy(() => import("@/pages/admin/AdminFormResponses").then((m) => ({ default: m.AdminFormResponses })));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers").then((m) => ({ default: m.AdminUsers })));
const AdminBadges = lazy(() => import("@/pages/admin/AdminBadges").then((m) => ({ default: m.AdminBadges })));
const AdminAnalytics = lazy(() => import("@/pages/admin/AdminAnalytics").then((m) => ({ default: m.AdminAnalytics })));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings").then((m) => ({ default: m.AdminSettings })));
const AdminIndustries = lazy(() => import("@/pages/admin/AdminIndustries").then((m) => ({ default: m.AdminIndustries })));
const AdminAppController = lazy(() => import("@/pages/admin/AdminAppController").then((m) => ({ default: m.AdminAppController })));
const AdminCompanies = lazy(() => import("@/pages/admin/AdminCompanies").then((m) => ({ default: m.AdminCompanies })));

// Micro Suspense Loader
const PageLoader = () => (
  <div className="flex min-h-[60vh] w-full items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Loading module...</span>
    </div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollRestoration />
          <ErrorBoundary>
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
                <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
                <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
                <Route path="/submit" element={<ProtectedRoute><PublicLayout><SubmitProblem /></PublicLayout></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><PublicLayout><Dashboard /></PublicLayout></ProtectedRoute>} />
                <Route path="/saved" element={<PublicLayout><SavedProblems /></PublicLayout>} />
                <Route path="/bookmarks" element={<PublicLayout><SavedProblems /></PublicLayout>} />

                {/* Dynamic Public Form Runner */}
                <Route path="/f/:formSlug" element={<PublicLayout><PublicFormRunner /></PublicLayout>} />

                {/* ── Admin Authentication (Unguarded Entrypoints) ──────── */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />

                {/* ── Guarded Admin Console Suite (/admin/*) ───────────── */}
                <Route path="/admin" element={<AdminLayout><AdminOverview /></AdminLayout>} />
                <Route path="/admin/review-queue" element={<AdminLayout><AdminReviewQueue /></AdminLayout>} />
                <Route path="/admin/problems" element={<AdminLayout><AdminProblems /></AdminLayout>} />
                <Route path="/admin/problems/:id/edit" element={<AdminLayout><AdminProblemDetailEditor /></AdminLayout>} />
                <Route path="/admin/app-controller" element={<AdminLayout><AdminAppController /></AdminLayout>} />
                <Route path="/admin/industries" element={<AdminLayout><AdminIndustries /></AdminLayout>} />
                <Route path="/admin/forms" element={<AdminLayout><AdminForms /></AdminLayout>} />
                <Route path="/admin/forms/new" element={<AdminLayout><AdminFormBuilder /></AdminLayout>} />
                <Route path="/admin/forms/:id/edit" element={<AdminLayout><AdminFormBuilder /></AdminLayout>} />
                <Route path="/admin/forms/:id/responses" element={<AdminLayout><AdminFormResponses /></AdminLayout>} />
                <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
                <Route path="/admin/badges" element={<AdminLayout><AdminBadges /></AdminLayout>} />
                <Route path="/admin/companies" element={<AdminLayout><AdminCompanies /></AdminLayout>} />
                <Route path="/admin/research" element={<AdminLayout><Research /></AdminLayout>} />
                <Route path="/admin/analytics" element={<AdminLayout><AdminAnalytics /></AdminLayout>} />
                <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

                {/* ── Fallback 404 ─────────────────────────────────────── */}
                <Route
                  path="*"
                  element={
                    <PublicLayout>
                      <div className="mx-auto max-w-xl py-24 text-center">
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">404 - Page Not Found</h1>
                        <p className="mt-2 text-sm text-zinc-500">The requested page does not exist on ProblemAtlas.</p>
                        <a href="/" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow">
                          Return to Homepage
                        </a>
                      </div>
                    </PublicLayout>
                  }
                />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
