import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export const Privacy: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      <SEOHead
        title="Privacy Policy — ProblemAtlas"
        description="Learn how ProblemAtlas collects, protects, and handles your data with strict encryption, GDPR compliance, and transparent telemetry policies."
        canonicalUrl="https://problematlas.com/privacy"
        ogType="website"
        keywords={["privacy policy", "data protection", "GDPR compliance", "ProblemAtlas privacy"]}
      />

      {/* ── Top Header Section ───────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-12 pb-8 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Legal & Data Protection</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Privacy Policy
          </h1>
          <p className="text-on-surface-variant text-xs sm:text-sm">
            Last Updated: August 30, 2026 • Effective Date: January 01, 2026
          </p>
        </div>
      </div>

      {/* ── Content Body ─────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 space-y-10 text-sm leading-relaxed text-on-surface-variant">
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            1. Overview & Commitment to Transparency
          </h2>
          <p>
            ProblemAtlas ("we", "our", or "us") operates the open problem intelligence registry and venture modeling canvas. We believe in total transparency regarding how user data, practitioner validations, and problem statement submissions are processed and secured.
          </p>
        </section>

        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            2. Information We Collect
          </h2>
          <div className="space-y-3">
            <div>
              <strong className="text-on-surface font-semibold">A. Account Information:</strong>
              <p className="mt-1">When you create an account via email or Google OAuth, we store your authenticated User ID (UID), full name, email address, avatar selection, and optional professional title.</p>
            </div>
            <div>
              <strong className="text-on-surface font-semibold">B. Problem Submissions & Evidence:</strong>
              <p className="mt-1">Publicly submitted problem statements, empirical data points, primary citation URLs, and market estimates are stored in our distributed database and made available to community solvers.</p>
            </div>
            <div>
              <strong className="text-on-surface font-semibold">C. Validation Telemetry:</strong>
              <p className="mt-1">When you record interest, validate friction points ("I Face This", "I Pay For Workarounds"), or comment on dossiers, these interactions are pseudonymously tallied to calculate community consensus scores.</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            3. Data Security & Storage Architecture
          </h2>
          <p>
            All data in transit is encrypted using modern TLS 1.3 protocols, and all stored data is encrypted at rest using AES-256 keys managed by Google Cloud Platform and Firebase infrastructure. We do not sell your personal contact information to third-party data brokers or marketing agencies.
          </p>
        </section>

        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            4. Your Rights (GDPR & CCPA)
          </h2>
          <p>
            You retain full ownership of your personal data. You may request access to, correction of, or permanent deletion of your account and submitted dossiers at any time by contacting our Data Protection Officer at <a href="mailto:privacy@problematlas.com" className="text-primary font-bold hover:underline">privacy@problematlas.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
