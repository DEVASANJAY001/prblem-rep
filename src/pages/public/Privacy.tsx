import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Database,
  UserCheck,
  Server,
  Scale,
  Mail,
  Cookie,
  ArrowRight,
} from "lucide-react";

export const Privacy: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface selection:bg-primary/15 selection:text-primary">
      <SEOHead
        title="Privacy Policy — Stuckhere"
        description="Comprehensive Privacy Policy detailing how Stuckhere collects, processes, encrypts, and protects your data in compliance with GDPR, CCPA, and international standards."
        canonicalUrl="https://stuckhere.com/privacy"
        ogType="website"
        keywords={[
          "privacy policy",
          "data protection",
          "GDPR compliance",
          "CCPA rights",
          "Stuckhere privacy",
          "data security",
        ]}
      />

      {/* ── Top Hero Banner ──────────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-6 sm:pt-10 md:pt-12 pb-6 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-3.5 sm:px-6 md:px-8 relative z-10 space-y-3.5 sm:space-y-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-on-surface-variant flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-on-surface font-bold">Legal</span>
            <span>/</span>
            <span className="text-primary font-bold">Privacy Policy</span>
          </div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
            <span>Legal Compliance & Data Protection</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Privacy Policy
              </h1>
              <p className="text-on-surface-variant text-[11px] sm:text-xs md:text-sm mt-1 sm:mt-2">
                Last Updated: October 08, 2026 • Effective Date: January 01, 2026 • Version 2.4
              </p>
            </div>

            {/* Quick Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs font-semibold w-full sm:w-auto">
              <span className="flex-1 sm:flex-initial text-center px-3 py-1.5 rounded-lg bg-surface text-primary shadow-2xs font-bold">
                Privacy
              </span>
              <Link
                to="/terms"
                className="flex-1 sm:flex-initial text-center px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/cookies"
                className="flex-1 sm:flex-initial text-center px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>

          {/* Privacy at a Glance Highlights Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-2 sm:pt-4">
            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-2.5 sm:gap-3">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">Zero Data Selling</p>
                <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">
                  We never sell or rent your personal contact info to brokers.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-2.5 sm:gap-3">
              <Database className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">AES-256 Encryption</p>
                <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">
                  All databases and file stores are encrypted at rest and in transit.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-2.5 sm:gap-3">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">GDPR & CCPA Compliant</p>
                <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">
                  Full rights to export, correct, or permanently erase your profile.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-2.5 sm:gap-3">
              <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">Open Innovation</p>
                <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">
                  Problem dossiers are public; personal identity can be anonymized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content Body ─────────────────────────────────────────────────── */}
      <div className="w-full max-w-5xl mx-auto px-3.5 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12 space-y-5 sm:space-y-8 md:space-y-10 text-xs sm:text-sm leading-relaxed text-on-surface-variant overflow-x-hidden">
        {/* Section 1 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>1. Overview, Identity of the Data Controller & Contact</span>
          </h2>
          <p>
            Stuckhere (referred to as <strong>"Stuckhere"</strong>, <strong>"we"</strong>,{" "}
            <strong>"our"</strong>, or <strong>"us"</strong>) is the world's open problem intelligence registry
            and venture modeling canvas. We empower entrepreneurs, researchers, and organizations to discover,
            empirically validate, and solve real-world problems.
          </p>
          <p>
            For the purposes of the European Union General Data Protection Regulation (<strong>GDPR</strong>), the UK
            Data Protection Act 2018, and California Consumer Privacy Act (<strong>CCPA/CPRA</strong>), Stuckhere
            acts as the <strong>Data Controller</strong> responsible for the processing of your personal data
            collected through <span className="font-mono text-xs text-primary">stuckhere.com</span> and our
            related web services.
          </p>
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-xs space-y-1">
            <p className="font-semibold text-on-surface">Data Protection Officer (DPO) Contact Details:</p>
            <p>
              Email:{" "}
              <a href="mailto:privacy@stuckhere.com" className="text-primary font-bold hover:underline">
                privacy@stuckhere.com
              </a>{" "}
              • Legal Department:{" "}
              <a href="mailto:legal@stuckhere.com" className="text-primary font-bold hover:underline">
                legal@stuckhere.com
              </a>
            </p>
            <p>Response SLA: All formal privacy inquiries and subject rights requests are addressed within 30 calendar days.</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3.5 sm:space-y-5 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>2. Categories of Information We Collect</span>
          </h2>
          <p>
            We adhere to the principle of <em>Data Minimization</em>: we only collect personal information strictly
            necessary to authenticate sessions, maintain platform integrity, and deliver accurate problem intelligence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1.5">
              <strong className="text-on-surface font-semibold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                A. Account & Profile Credentials
              </strong>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                When you create an account via email or Google OAuth: your authenticated User ID (UID), full name,
                email address, profile picture / avatar choice, assigned community badges, and optional professional title.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1.5">
              <strong className="text-on-surface font-semibold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                B. Problem Statements & Dossiers
              </strong>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Public problem statements, trigger context, affected demographics, non-confidential evidence URLs,
                and addressable market estimates submitted for community exploration.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1.5">
              <strong className="text-on-surface font-semibold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                C. Validation Telemetry & Consensus Signals
              </strong>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Interactions recorded when you validate friction points ("I Face This", "I Pay For Workarounds"),
                bookmark dossiers, or participate in problem discussion forums.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-1.5">
              <strong className="text-on-surface font-semibold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                D. Technical & Diagnostic Logs
              </strong>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                IP addresses (pseudonymized for geolocation auditing), browser user-agent, operating system,
                page latency timings, and automated error diagnostics to prevent DDoS and malicious bot activity.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>3. Legal Bases for Processing (GDPR Article 6)</span>
          </h2>
          <p>Under European and UK data protection frameworks, we process your information under the following lawful grounds:</p>
          <ul className="space-y-2 text-xs sm:text-sm pl-4 list-disc marker:text-primary leading-relaxed">
            <li>
              <strong>Performance of Contract (Art. 6(1)(b)):</strong> To deliver our core services, maintain your active
              account session, display saved bookmarks, and administer problem submissions per our Terms of Service.
            </li>
            <li>
              <strong>Legitimate Interests (Art. 6(1)(f)):</strong> To maintain platform security, prevent fraudulent problem
              submissions, calibrate objective market pain scores, and improve the accuracy of our problem ontology.
            </li>
            <li>
              <strong>Compliance with Legal Obligations (Art. 6(1)(c)):</strong> To comply with applicable tax, corporate
              recordkeeping, and law enforcement requests under valid judicial warrant.
            </li>
            <li>
              <strong>Explicit Consent (Art. 6(1)(a)):</strong> For optional marketing subscriptions and non-essential web analytics.
              You may withdraw consent at any time without affecting prior lawful processing.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <Server className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>4. Authorized Sub-Processors & Infrastructure Partners</span>
          </h2>
          <p>
            To operate a highly available, globally distributed platform, Stuckhere collaborates with enterprise
            infrastructure providers who meet rigorous security standards (SOC 2 Type II, ISO 27001):
          </p>

          <div className="w-full overflow-x-auto rounded-xl border border-outline-variant/30 shadow-2xs -mx-1 sm:mx-0">
            <table className="w-full text-left text-xs min-w-[540px]">
              <thead className="bg-surface-container-low text-on-surface font-bold border-b border-outline-variant/30">
                <tr>
                  <th className="p-2.5 sm:p-3">Partner / Service</th>
                  <th className="p-2.5 sm:p-3">Function</th>
                  <th className="p-2.5 sm:p-3">Data Processed</th>
                  <th className="p-2.5 sm:p-3">Location & Safeguard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 bg-surface-container-lowest text-on-surface-variant">
                <tr>
                  <td className="p-2.5 sm:p-3 font-semibold text-on-surface">Google Cloud / Firebase</td>
                  <td className="p-2.5 sm:p-3">Database, Auth & Object Storage</td>
                  <td className="p-2.5 sm:p-3">Encrypted user accounts, problem dossiers</td>
                  <td className="p-2.5 sm:p-3">United States / Global (SCCs, SOC 2)</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-semibold text-on-surface">Cloudflare Inc.</td>
                  <td className="p-2.5 sm:p-3">DNS, Edge Caching, DDoS Protection</td>
                  <td className="p-2.5 sm:p-3">IP addresses, request headers, caching</td>
                  <td className="p-2.5 sm:p-3">Global Edge (ISO 27001, Privacy Pass)</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-semibold text-on-surface">Google Analytics 4</td>
                  <td className="p-2.5 sm:p-3">Pseudonymous Usage Analytics</td>
                  <td className="p-2.5 sm:p-3">Aggregated session durations, page routes</td>
                  <td className="p-2.5 sm:p-3">USA (IP Anonymization enabled)</td>
                </tr>
                <tr>
                  <td className="p-2.5 sm:p-3 font-semibold text-on-surface">Resend / Email Relay</td>
                  <td className="p-2.5 sm:p-3">Transactional Email Dispatch</td>
                  <td className="p-2.5 sm:p-3">Email address, verification links</td>
                  <td className="p-2.5 sm:p-3">United States (GDPR DPA signed)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-on-surface-variant sm:hidden flex items-center gap-1 font-medium">
            <span>↔ Swipe table horizontally to view all columns</span>
          </p>

          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed"><strong>Our Anti-Monetization Guarantee:</strong> Stuckhere does NOT sell, rent, monetize, or barter your personal identity or contact records with ad networks or data brokers.</span>
          </div>
        </section>

        {/* Section 5 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>5. International Transfers & Standard Contractual Clauses</span>
          </h2>
          <p>
            Stuckhere operates servers in the United States and global edge nodes. If you access the platform
            from the European Economic Area (EEA), United Kingdom, or Switzerland, your data is transferred to the
            United States pursuant to the European Commission's approved <strong>Standard Contractual Clauses (SCCs)</strong>{" "}
            and supplementary technical measures, including rest encryption and access partition boundaries.
          </p>
        </section>

        {/* Section 6 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <Database className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>6. Data Retention & Anonymization</span>
          </h2>
          <p>
            We retain account information for as long as your account remains active. Upon a verified request for
            account deletion:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm pl-4 list-disc marker:text-primary leading-relaxed">
            <li>Your personal authentication records, email, and private preferences are purged within <strong>30 calendar days</strong>.</li>
            <li>Backup snapshots containing personal data are cycled out and overwritten within 60 calendar days.</li>
            <li>
              Public problem statements authored by you can either be removed or have contributor attribution unlinked
              (anonymized to <em>"Anonymous Contributor"</em>), preserving factual problem intelligence for public innovation
              without retaining your personal identity.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>7. Your Legal Rights (GDPR, CCPA/CPRA & Global Frameworks)</span>
          </h2>
          <p>
            Regardless of your geographic location, Stuckhere provides transparent controls over your personal data:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <strong className="text-on-surface font-semibold block mb-1">Right to Access & Portability</strong>
              Request a comprehensive digital archive (JSON/CSV) of all personal data held about your account.
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <strong className="text-on-surface font-semibold block mb-1">Right to Rectification</strong>
              Update, modify, or correct out-of-date profile and account credentials directly through your profile settings.
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <strong className="text-on-surface font-semibold block mb-1">Right to Erasure ("Be Forgotten")</strong>
              Request permanent deletion of your authenticated profile and associated personal records.
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <strong className="text-on-surface font-semibold block mb-1">Right to Restriction & Objection</strong>
              Object to automated score telemetry or request that we pause processing of your profile data.
            </div>
          </div>

          <p className="text-xs pt-1">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:privacy@stuckhere.com" className="text-primary font-bold hover:underline break-all sm:break-normal">
              privacy@stuckhere.com
            </a>
            . We do not discriminate against users for exercising their statutory privacy rights.
          </p>
        </section>

        {/* Section 8 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>8. Data Security Architecture</span>
          </h2>
          <p>
            We deploy multi-layered defense-in-depth measures to protect your data against accidental loss, unauthorized
            disclosure, or malicious modification:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm pl-4 list-disc marker:text-primary leading-relaxed">
            <li><strong>Transit Encryption:</strong> All client-server traffic is enforced via modern TLS 1.3 with HSTS headers.</li>
            <li><strong>Rest Encryption:</strong> Firestore partitions and Cloud Storage objects are encrypted using hardware AES-256 keys.</li>
            <li><strong>Access Controls:</strong> Firebase Security Rules strictly isolate user write privileges, preventing horizontal data leakage.</li>
            <li><strong>Rate Limiting & Firewalls:</strong> Express-rate-limit and Helmet security headers protect API gateways from brute-force attempts.</li>
          </ul>
        </section>

        {/* Section 9 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <span>9. Protection of Children's Privacy</span>
          </h2>
          <p>
            Stuckhere is strictly intended for individuals aged <strong>16 and older</strong> (or 13 where permitted
            by local law under parent supervision). We do not knowingly collect personal data from minors. If you believe
            a child under 16 has registered an account, contact{" "}
            <a href="mailto:privacy@stuckhere.com" className="text-primary font-bold hover:underline break-all sm:break-normal">
              privacy@stuckhere.com
            </a>{" "}
            for immediate deletion.
          </p>
        </section>

        {/* Section 10 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>10. Policy Revisions & Supervisory Authority Complaints</span>
          </h2>
          <p>
            We may periodically update this Privacy Policy to reflect evolving legal precedents or architectural
            updates. Material changes will be accompanied by an email notification or banner notice on the platform.
          </p>
          <p>
            If you reside in the EEA or UK and believe our processing violates data protection legislation, you have the
            right to lodge a complaint with your local <strong>Data Protection Supervisory Authority</strong> (e.g., the
            ICO in the United Kingdom or the relevant national DPA in EU Member States).
          </p>
        </section>

        {/* Bottom CTA Card */}
        <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-on-surface text-sm sm:text-base">Have Questions About Your Data?</h3>
            <p className="text-xs text-on-surface-variant">Our privacy team is available to assist with data exports, corrections, or audit inquiries.</p>
          </div>
          <a
            href="mailto:privacy@stuckhere.com"
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-xs shrink-0 text-center"
          >
            <span>Contact Privacy Team</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
