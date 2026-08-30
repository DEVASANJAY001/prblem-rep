import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import { Cookie, CheckCircle2, Shield, Info } from "lucide-react";

export const Cookies: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      <SEOHead
        title="Cookie Policy — ProblemAtlas"
        description="Learn how ProblemAtlas uses essential and functional cookies to remember your preferences and maintain secure sessions."
        canonicalUrl="https://problematlas.com/cookies"
        ogType="website"
        keywords={["cookie policy", "browser cookies", "ProblemAtlas cookies"]}
      />

      {/* ── Top Header Section ───────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-12 pb-8 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Cookie className="h-3.5 w-3.5" />
            <span>Browser Storage & Cookies</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Cookie Policy
          </h1>
          <p className="text-on-surface-variant text-xs sm:text-sm">
            Last Updated: August 30, 2026
          </p>
        </div>
      </div>

      {/* ── Content Body ─────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 space-y-8 text-sm leading-relaxed text-on-surface-variant">
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            1. What Are Cookies?
          </h2>
          <p>
            Cookies and browser local storage items are small text files stored on your computer or mobile device when you visit ProblemAtlas. They allow the platform to remember your active session, theme preferences, and bookmarked problems.
          </p>
        </section>

        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            2. Categories of Cookies We Use
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-on-surface font-semibold flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Strictly Necessary & Authentication
              </strong>
              <p className="text-xs text-on-surface-variant">
                Used to securely identify your Firebase authentication session, manage access permissions, and maintain your login state. Cannot be disabled.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-on-surface font-semibold flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Functional & User Preferences
              </strong>
              <p className="text-xs text-on-surface-variant">
                Used to store local bookmarks, draft problem submissions in progress, and your preferred light/dark display theme across page reloads.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <Cookie className="w-5 h-5 text-primary" />
            3. How to Manage Cookies
          </h2>
          <p>
            You can modify your browser settings to decline non-essential cookies or delete stored local cookies at any time via your browser's Privacy & Security settings. Note that disabling essential cookies may impact authentication and saved problem libraries.
          </p>
        </section>
      </div>
    </div>
  );
};
