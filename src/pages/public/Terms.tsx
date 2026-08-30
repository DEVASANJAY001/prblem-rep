import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import { Scale, FileCheck, AlertCircle, ShieldCheck } from "lucide-react";

export const Terms: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      <SEOHead
        title="Terms of Service — ProblemAtlas"
        description="Review the ProblemAtlas terms of service, acceptable use policies, problem verification standards, and intellectual property terms."
        canonicalUrl="https://problematlas.com/terms"
        ogType="website"
        keywords={["terms of service", "terms and conditions", "ProblemAtlas terms", "user agreement"]}
      />

      {/* ── Top Header Section ───────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-12 pb-8 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Scale className="h-3.5 w-3.5" />
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Terms of Service
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
            <Scale className="w-5 h-5 text-primary" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using ProblemAtlas (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree to all terms, please refrain from using our services.
          </p>
        </section>

        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary" />
            2. Problem Submission & Verification Standard
          </h2>
          <p>
            Contributors submitting problem statements represent that their entries reflect genuine operational, clinical, or technical bottlenecks. Submissions must adhere to our 10-point diagnostic verification standards, including identifying specific trigger events, affected stakeholders, and non-confidential evidence citations.
          </p>
        </section>

        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            3. Intellectual Property & Contributor Rights
          </h2>
          <p>
            Public problem dossiers and market pain descriptions are made available to founders and researchers under an open innovation framework to stimulate solution development. Solvers building startups based on public problem dossiers retain 100% intellectual property ownership of their software, hardware, patents, and business entities.
          </p>
        </section>

        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            4. Prohibited Activities & Disclaimers
          </h2>
          <p>
            Users agree not to submit fraudulent data, disclose proprietary trade secrets under active NDAs, or use the platform to harass individuals or commercial entities. Market size (TAM) and pain calculations are algorithmic estimations provided for exploratory research purposes and should be verified independently prior to capital allocation.
          </p>
        </section>
      </div>
    </div>
  );
};
