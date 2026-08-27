import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";

// Public Pages
import { Home } from "@/pages/public/Home";
import { Explore } from "@/pages/public/Explore";
import { ProblemDetail } from "@/pages/public/ProblemDetail";
import { StartupMode } from "@/pages/public/StartupMode";
import { Industries } from "@/pages/public/Industries";
import { IndustryDetail } from "@/pages/public/IndustryDetail";
import { Companies } from "@/pages/public/Companies";
import { Research } from "@/pages/public/Research";
import { Community } from "@/pages/public/Community";
import { About } from "@/pages/public/About";
import { Login } from "@/pages/public/Login";
import { Register } from "@/pages/public/Register";
import { SubmitProblem } from "@/pages/public/SubmitProblem";
import { Dashboard } from "@/pages/public/Dashboard";
import { SavedProblems } from "@/pages/public/SavedProblems";
import { PublicFormRunner } from "@/pages/public/PublicFormRunner";

// Admin Pages
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { AdminRegister } from "@/pages/admin/AdminRegister";
import { AdminOverview } from "@/pages/admin/AdminOverview";
import { AdminReviewQueue } from "@/pages/admin/AdminReviewQueue";
import { AdminProblems } from "@/pages/admin/AdminProblems";
import { AdminProblemDetailEditor } from "@/pages/admin/AdminProblemDetailEditor";
import { AdminForms } from "@/pages/admin/AdminForms";
import { AdminFormBuilder } from "@/pages/admin/AdminFormBuilder";
import { AdminFormResponses } from "@/pages/admin/AdminFormResponses";
import { AdminUsers } from "@/pages/admin/AdminUsers";
import { AdminBadges } from "@/pages/admin/AdminBadges";
import { AdminAnalytics } from "@/pages/admin/AdminAnalytics";
import { AdminSettings } from "@/pages/admin/AdminSettings";
import { AdminIndustries } from "@/pages/admin/AdminIndustries";
import { AdminAppController } from "@/pages/admin/AdminAppController";
import { AdminCompanies } from "@/pages/admin/AdminCompanies";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
