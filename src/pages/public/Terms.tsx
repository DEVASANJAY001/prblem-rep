import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Scale,
  FileCheck,
  AlertCircle,
  ShieldCheck,
  Zap,
  Award,
  Lock,
  FileText,
  UserX,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export const Terms: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface selection:bg-primary/15 selection:text-primary">
      <SEOHead
        title="Terms of Service — ProblemAtlas"
        description="Official Terms of Service for ProblemAtlas. Learn about acceptable use standards, contributor verification guidelines, open problem licenses, and 100% solver IP protection."
        canonicalUrl="https://problematlas.com/terms"
        ogType="website"
        keywords={[
          "terms of service",
          "user agreement",
          "ProblemAtlas terms",
          "solver IP rights",
          "problem verification standard",
          "acceptable use policy",
        ]}
      />

      {/* ── Top Hero Banner ──────────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-12 pb-6 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Scale className="h-3.5 w-3.5" />
            <span>Binding User Agreement</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Terms of Service
              </h1>
              <p className="text-on-surface-variant text-xs sm:text-sm mt-2">
                Last Updated: October 08, 2026 • Effective Date: January 01, 2026 • Version 2.4
              </p>
            </div>

            {/* Quick Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs font-semibold">
              <Link
                to="/privacy"
                className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Privacy
              </Link>
              <span className="px-3 py-1.5 rounded-lg bg-surface text-primary shadow-2xs">
                Terms
              </span>
              <Link
                to="/cookies"
                className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>

          {/* Key Terms at a Glance Highlights Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-3">
              <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">100% Solver IP Rights</p>
                <p className="text-[11px] text-on-surface-variant leading-snug">
                  Founders building solutions retain total ownership of their code & startups.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">Verified Standards</p>
                <p className="text-[11px] text-on-surface-variant leading-snug">
                  Submitted problems must cite public, non-confidential evidence.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">Research Estimates</p>
                <p className="text-[11px] text-on-surface-variant leading-snug">
                  Market TAM and opportunity metrics are informational research models.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">Zero Trade Secrets</p>
                <p className="text-[11px] text-on-surface-variant leading-snug">
                  Never post proprietary data under NDA or non-public patient records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content Body ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 space-y-10 text-sm leading-relaxed text-on-surface-variant">
        {/* Section 1 */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-primary" />
            1. Acceptance of Terms & Eligibility
          </h2>
          <p>
            These Terms of Service (<strong>"Terms"</strong>) constitute a legally binding agreement between you
            (whether personally or on behalf of an entity) and <strong>ProblemAtlas</strong> (<strong>"we"</strong>,{" "}
            <strong>"us"</strong>, or <strong>"our"</strong>), governing your access to and use of{" "}
            <span className="font-mono text-xs text-primary">problematlas.com</span> and all associated tools,
            APIs, and services (collectively, the <strong>"Platform"</strong>).
          </p>
          <p>
            By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound
            by these Terms. If you do not agree, you must immediately discontinue use.
          </p>
          <p className="text-xs text-on-surface-variant">
            <strong>Eligibility:</strong> You represent and warrant that you are at least 18 years of age (or the age
            of legal majority in your jurisdiction). If using the Platform on behalf of a company, university, or
            organization, you represent that you possess legal authority to bind that entity to these Terms.
          </p>
        </section>

        {/* Section 2 */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-primary" />
            2. User Accounts, Security & Credentials
          </h2>
          <p>
            Certain features (e.g., submitting problems, validating pain signals, accessing Startup Mode canvas tools,
            or bookmarking dossiers) require registering an account via email or authorized third-party OAuth (Google).
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm pl-4 list-disc marker:text-primary">
            <li>You agree to provide true, current, and complete registration information.</li>
            <li>You are responsible for safeguarding your credentials and for all activities conducted under your account.</li>
            <li>You must notify us immediately at <a href="mailto:security@problematlas.com" className="text-primary font-bold hover:underline">security@problematlas.com</a> upon discovering any unauthorized account breach or compromise.</li>
            <li>ProblemAtlas reserves the right to suspend or terminate accounts that violate security protocols or impersonate other individuals or brands.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-primary" />
            3. Problem Submission Standards & Diagnostic Verification
          </h2>
          <p>
            ProblemAtlas is committed to cultivating a high-signal registry of verified human friction. To maintain
            editorial integrity, contributors submitting problem statements must adhere to our <strong>10-Point Diagnostic Verification Standard</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-xs font-bold text-on-surface">1. Specificity Over Generalities</strong>
              <p className="text-[11px] text-on-surface-variant">Identify the precise operational, technical, or clinical bottleneck rather than vague aspirational complaints.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-xs font-bold text-on-surface">2. Concrete Trigger Events</strong>
              <p className="text-[11px] text-on-surface-variant">Describe the specific workflow scenario or moment in time where the breakdown or friction occurs.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-xs font-bold text-on-surface">3. Stakeholder Identification</strong>
              <p className="text-[11px] text-on-surface-variant">Clearly define the exact roles, practitioners, or demographic groups directly experiencing the pain.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-xs font-bold text-on-surface">4. Primary Evidence & Non-Confidentiality</strong>
              <p className="text-[11px] text-on-surface-variant">Submissions must cite publicly accessible research, clinical trials, industry audits, or government datasets.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>
              <strong>Strict Prohibition on Proprietary Information:</strong> You warrant that you will NEVER submit
              confidential trade secrets under an active Non-Disclosure Agreement (NDA), protected health information (PHI/HIPAA),
              classified government data, or defamatory statements targeting specific individuals.
            </span>
          </div>
        </section>

        {/* Section 4 - CRITICAL SOLVER PROTECTION */}
        <section className="rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-8 space-y-5 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2.5">
            <Award className="w-5 h-5 text-primary" />
            4. Intellectual Property & Contributor vs. Solver Rights
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-primary">A. Solver & Founder Protection (Our Core Principle)</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                ProblemAtlas exists to ignite venture creation. If you develop a solution, software application,
                hardware prototype, machine learning model, pharmaceutical formulation, patentable invention, or
                commercial business inspired by or addressing a public problem dossier on ProblemAtlas:
              </p>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200 font-medium">
                <strong>You retain 100% full, exclusive, and unencumbered intellectual property ownership</strong> of all
                code, designs, patents, trademarks, corporate equity, and revenue generated by your solution. ProblemAtlas
                makes ZERO claim to your intellectual property, equity, or commercial proceeds.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-primary">B. Contributor License Grant</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                By submitting a problem statement, dossier, or empirical citation to ProblemAtlas, you grant ProblemAtlas
                a worldwide, non-exclusive, royalty-free, perpetual, and irrevocable license to index, catalog, display,
                synthesize, translate, and algorithmically score the problem content for public educational and entrepreneurial
                exploration across the Platform.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-primary">C. Platform Proprietary Rights</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                The ProblemAtlas platform, including its brand marks, custom logos, visual designs, UI component tokens,
                underlying software code, proprietary scoring algorithms (PainScore, Opportunity Index), and ontology
                taxonomies, are the exclusive intellectual property of ProblemAtlas and protected by international copyright
                and trademark laws.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2.5">
            <UserX className="w-5 h-5 text-rose-600" />
            5. Acceptable Use & Prohibited Conduct
          </h2>
          <p>You agree not to engage in any of the following restricted activities:</p>
          <ul className="space-y-1.5 text-xs sm:text-sm pl-4 list-disc marker:text-rose-600">
            <li><strong>Automated Scraping:</strong> Scraping, spidering, or bulk harvesting problem dossiers or user directories without prior written authorization.</li>
            <li><strong>Sybil & Manipulation:</strong> Creating automated bot networks to artificially inflate problem validation scores ("I Face This") or tamper with leaderboard rankings.</li>
            <li><strong>Security Violations:</strong> Probing, scanning, or attempting to breach our Firebase authentication, rate limiters, or server architecture.</li>
            <li><strong>Malicious Content:</strong> Transmitting malware, viruses, phishing payloads, or spam URLs through problem evidence citations or forum comments.</li>
            <li><strong>Reverse Engineering:</strong> Decompiling, reverse engineering, or disassembling any portion of the platform's proprietary algorithms or source code.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-primary" />
            6. Digital Millennium Copyright Act (DMCA) Notice & Takedown
          </h2>
          <p>
            We respect the intellectual property rights of others. If you believe that content hosted on ProblemAtlas
            infringes your copyright, submit a written notification to our Designated Copyright Agent at{" "}
            <a href="mailto:legal@problematlas.com" className="text-primary font-bold hover:underline">
              legal@problematlas.com
            </a>{" "}
            containing:
          </p>
          <ul className="space-y-1 text-xs pl-4 list-disc marker:text-primary">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Exact URL or path to the allegedly infringing material on ProblemAtlas.</li>
            <li>Your physical or electronic signature and direct contact information (email, phone, address).</li>
            <li>A statement of good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement under penalty of perjury that the information in your notice is accurate.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            7. Research Estimations & Non-Reliance Disclaimers
          </h2>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2 text-amber-950 dark:text-amber-200">
            <p className="font-bold">Informational & Exploratory Research Only:</p>
            <p>
              All quantitative metrics displayed on ProblemAtlas—including Total Addressable Market (TAM) estimates,
              opportunity scores, willingness-to-pay calculations, and AI-synthesized risk profiles—are algorithmic
              approximations generated for exploratory hypothesis formulation.
            </p>
            <p>
              ProblemAtlas does NOT provide financial, legal, investment, regulatory, or clinical advice. Solvers and
              investors must conduct independent due diligence, regulatory verification, and customer discovery before
              allocating capital or incorporating commercial entities.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-primary" />
            8. Disclaimer of Warranties & Limitation of Liability
          </h2>
          <p className="uppercase font-bold text-xs text-on-surface">
            The platform is provided on an "as is" and "as available" basis without warranties of any kind.
          </p>
          <p className="text-xs">
            To the maximum extent permitted by applicable law, ProblemAtlas and its officers, directors, employees,
            and partners disclaim all express or implied warranties, including merchantability, fitness for a particular
            purpose, non-infringement, and accuracy of user-submitted problem statements.
          </p>
          <p className="text-xs">
            In no event shall ProblemAtlas be liable for indirect, incidental, special, consequential, or punitive damages
            (including loss of profits, data, goodwill, or business opportunity) arising out of or related to your use of
            the platform. In jurisdictions where limitations of liability are restricted, our aggregate liability shall not
            exceed the greater of fifty U.S. dollars ($50.00 USD) or the total amount paid by you to ProblemAtlas in the
            preceding six (6) months.
          </p>
        </section>

        {/* Section 9 */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-primary" />
            9. Indemnification & Dispute Resolution
          </h2>
          <p>
            You agree to defend, indemnify, and hold harmless ProblemAtlas against any claims, liabilities, damages,
            or expenses (including reasonable legal fees) arising from your breach of these Terms, unauthorized submission
            of proprietary trade secrets, or infringement of third-party rights.
          </p>
          <p>
            <strong>Mandatory Informal Negotiation:</strong> Prior to initiating arbitration or legal proceedings, both
            parties agree to engage in good-faith informal negotiations for at least 30 calendar days by providing written
            notice to <a href="mailto:legal@problematlas.com" className="text-primary font-bold hover:underline">legal@problematlas.com</a>.
          </p>
        </section>

        {/* Section 10 */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-primary" />
            10. Termination & Modifications
          </h2>
          <p>
            We reserve the right to suspend or terminate your access to the Platform at our sole discretion, without prior
            notice, for conduct that violates these Terms or threatens the security of our community.
          </p>
          <p>
            We may revise these Terms periodically. If revisions are material, we will provide at least 14 days' notice
            prior to new terms taking effect. Continued use of the Platform after revisions indicates acceptance.
          </p>
        </section>

        {/* Bottom CTA Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-on-surface text-base">Questions About Our Terms or IP Policies?</h3>
            <p className="text-xs text-on-surface-variant">Our legal team is available to assist enterprise partners and founders.</p>
          </div>
          <a
            href="mailto:legal@problematlas.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-xs shrink-0"
          >
            <span>Contact Legal Team</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
