import React from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Cookie,
  CheckCircle2,
  Shield,
  Info,
  Settings2,
  Sliders,
  Database,
  Lock,
  Globe,
  ArrowRight,
} from "lucide-react";

export const Cookies: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface selection:bg-primary/15 selection:text-primary overflow-x-hidden">
      <SEOHead
        title="Cookie & Storage Policy — Stuckhere"
        description="Comprehensive Cookie & Local Storage Policy. Transparent breakdown of essential authentication tokens, functional preferences, and privacy controls."
        canonicalUrl="https://stuckhere.com/cookies"
        ogType="website"
        keywords={[
          "cookie policy",
          "browser cookies",
          "local storage",
          "Stuckhere cookies",
          "privacy controls",
          "session management",
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
            <span className="text-primary font-bold">Cookie Policy</span>
          </div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Cookie className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
            <span>Browser Storage Transparency</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Cookie & Storage Policy
              </h1>
              <p className="text-on-surface-variant text-[11px] sm:text-xs md:text-sm mt-1 sm:mt-2">
                Last Updated: October 08, 2026 • Effective Date: January 01, 2026 • Version 2.2
              </p>
            </div>

            {/* Quick Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs font-semibold w-full sm:w-auto">
              <Link
                to="/privacy"
                className="flex-1 sm:flex-initial text-center px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="flex-1 sm:flex-initial text-center px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Terms
              </Link>
              <span className="flex-1 sm:flex-initial text-center px-3 py-1.5 rounded-lg bg-surface text-primary shadow-2xs font-bold">
                Cookies
              </span>
            </div>
          </div>

          {/* Highlights Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-2 sm:pt-4">
            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-2.5 sm:gap-3">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">Zero Ad Trackers</p>
                <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">
                  No third-party cross-site advertising or retargeting cookies.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-2.5 sm:gap-3">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">Secure Sessions</p>
                <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">
                  Tokens are scoped with HttpOnly and SameSite=Strict protections.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-2.5 sm:gap-3">
              <Sliders className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">Offline Preferences</p>
                <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">
                  Bookmarks and theme selections saved in fast client storage.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-2xs flex items-start gap-2.5 sm:gap-3">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-surface">GPC & DNT Honored</p>
                <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">
                  Global Privacy Control browser signals respected automatically.
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
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>1. What Are Cookies & Web Storage Technologies?</span>
          </h2>
          <p>
            When you visit Stuckhere, we use standard web storage technologies to provide a smooth, secure, and
            reliable experience. These include:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm pl-4 list-disc marker:text-primary leading-relaxed">
            <li>
              <strong>HTTP Cookies:</strong> Small text files placed on your browser by our web server that are sent
              back with subsequent requests to verify identity and maintain authenticated state.
            </li>
            <li>
              <strong>HTML5 LocalStorage:</strong> Client-side browser storage that allows persisting user preferences
              (such as your saved problem bookmarks and light/dark theme) across browser sessions without expiring.
            </li>
            <li>
              <strong>SessionStorage:</strong> Temporary client-side storage cleared automatically as soon as you close
              your active browser tab or window.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <Database className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>2. Complete Inventory of Storage Keys & Cookies Used</span>
          </h2>
          <p>
            We believe in total transparency. The following tables document every cookie and local storage item
            utilized across Stuckhere:
          </p>

          {/* Table 1: Strictly Necessary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <span>Category A: Strictly Necessary & Authentication Storage</span>
              </h3>
              <span className="sm:hidden text-[10px] font-medium text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full shrink-0">
                Swipe ↔
              </span>
            </div>
            <p className="text-xs">These items are essential for authenticating user identity, preventing fraud, and enabling core security functions.</p>

            <div className="w-full overflow-x-auto rounded-xl border border-outline-variant/30 shadow-2xs -mx-1 sm:mx-0">
              <table className="w-full text-left text-xs min-w-[520px]">
                <thead className="bg-surface-container-low text-on-surface font-bold border-b border-outline-variant/30">
                  <tr>
                    <th className="p-2.5 sm:p-3">Key / Cookie Name</th>
                    <th className="p-2.5 sm:p-3">Type</th>
                    <th className="p-2.5 sm:p-3">Purpose & Function</th>
                    <th className="p-2.5 sm:p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 bg-surface-container-lowest text-on-surface-variant">
                  <tr>
                    <td className="p-2.5 sm:p-3 font-mono text-[11px] font-semibold text-primary">firebase:authUser:*</td>
                    <td className="p-2.5 sm:p-3">LocalStorage</td>
                    <td className="p-2.5 sm:p-3">Stores encrypted Firebase Auth session tokens so you remain logged in across page refreshes.</td>
                    <td className="p-2.5 sm:p-3">Persistent (Purged upon Sign Out)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 sm:p-3 font-mono text-[11px] font-semibold text-primary">__session</td>
                    <td className="p-2.5 sm:p-3">HTTP Cookie</td>
                    <td className="p-2.5 sm:p-3">Session token utilized by secure API endpoints to verify signed authentication claims.</td>
                    <td className="p-2.5 sm:p-3">Session / 14 Days</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 sm:p-3 font-mono text-[11px] font-semibold text-primary">csrf_token</td>
                    <td className="p-2.5 sm:p-3">HTTP Cookie</td>
                    <td className="p-2.5 sm:p-3">Cryptographic token preventing Cross-Site Request Forgery during problem submissions.</td>
                    <td className="p-2.5 sm:p-3">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Functional */}
          <div className="space-y-2 pt-2 sm:pt-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
                <span>Category B: Functional & User Preference Storage</span>
              </h3>
              <span className="sm:hidden text-[10px] font-medium text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full shrink-0">
                Swipe ↔
              </span>
            </div>
            <p className="text-xs">These items enable personalization, UI comfort, and fast offline interactions.</p>

            <div className="w-full overflow-x-auto rounded-xl border border-outline-variant/30 shadow-2xs -mx-1 sm:mx-0">
              <table className="w-full text-left text-xs min-w-[520px]">
                <thead className="bg-surface-container-low text-on-surface font-bold border-b border-outline-variant/30">
                  <tr>
                    <th className="p-2.5 sm:p-3">Key / Cookie Name</th>
                    <th className="p-2.5 sm:p-3">Type</th>
                    <th className="p-2.5 sm:p-3">Purpose & Function</th>
                    <th className="p-2.5 sm:p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 bg-surface-container-lowest text-on-surface-variant">
                  <tr>
                    <td className="p-2.5 sm:p-3 font-mono text-[11px] font-semibold text-primary">theme</td>
                    <td className="p-2.5 sm:p-3">LocalStorage</td>
                    <td className="p-2.5 sm:p-3">Remembers your preferred light/dark interface mode.</td>
                    <td className="p-2.5 sm:p-3">1 Year</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 sm:p-3 font-mono text-[11px] font-semibold text-primary">stuckhere_saved_problems</td>
                    <td className="p-2.5 sm:p-3">LocalStorage</td>
                    <td className="p-2.5 sm:p-3">Caches bookmarked problem dossier IDs for instant zero-latency loading.</td>
                    <td className="p-2.5 sm:p-3">Persistent</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 sm:p-3 font-mono text-[11px] font-semibold text-primary">stuckhere_view_mode</td>
                    <td className="p-2.5 sm:p-3">LocalStorage</td>
                    <td className="p-2.5 sm:p-3">Remembers whether you prefer Grid or Compact List view on problem discovery feeds.</td>
                    <td className="p-2.5 sm:p-3">6 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 3: Analytics */}
          <div className="space-y-2 pt-2 sm:pt-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                <span>Category C: Aggregated Analytics (Pseudonymous & Optional)</span>
              </h3>
              <span className="sm:hidden text-[10px] font-medium text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full shrink-0">
                Swipe ↔
              </span>
            </div>
            <p className="text-xs">Used strictly to understand global traffic distribution and diagnose platform bottlenecks.</p>

            <div className="w-full overflow-x-auto rounded-xl border border-outline-variant/30 shadow-2xs -mx-1 sm:mx-0">
              <table className="w-full text-left text-xs min-w-[520px]">
                <thead className="bg-surface-container-low text-on-surface font-bold border-b border-outline-variant/30">
                  <tr>
                    <th className="p-2.5 sm:p-3">Key / Cookie Name</th>
                    <th className="p-2.5 sm:p-3">Provider</th>
                    <th className="p-2.5 sm:p-3">Purpose & Function</th>
                    <th className="p-2.5 sm:p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 bg-surface-container-lowest text-on-surface-variant">
                  <tr>
                    <td className="p-2.5 sm:p-3 font-mono text-[11px] font-semibold text-primary">_ga, _ga_*</td>
                    <td className="p-2.5 sm:p-3">Google Analytics 4</td>
                    <td className="p-2.5 sm:p-3">Aggregated counter distinguishing unique sessions to track high-traffic problem pages. IP masking active.</td>
                    <td className="p-2.5 sm:p-3">24 Hours – 2 Years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <Settings2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>3. How to Manage, Disable & Delete Cookies in Your Browser</span>
          </h2>
          <p>
            You have full control over cookie and storage management. You can configure your browser to block all cookies,
            delete existing stored data, or prompt you before accepting cookies:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 text-xs pt-1">
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-on-surface font-semibold block">Google Chrome</strong>
              <p className="text-on-surface-variant">Settings → Privacy and security → Third-party cookies → See all site data.</p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-on-surface font-semibold block">Apple Safari</strong>
              <p className="text-on-surface-variant">Preferences → Privacy → Prevent cross-site tracking & Manage Website Data.</p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-on-surface font-semibold block">Mozilla Firefox</strong>
              <p className="text-on-surface-variant">Settings → Privacy & Security → Enhanced Tracking Protection → Cookies.</p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-on-surface font-semibold block">Microsoft Edge</strong>
              <p className="text-on-surface-variant">Settings → Cookies and site permissions → Manage and delete cookies.</p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-on-surface font-semibold block">Brave Browser</strong>
              <p className="text-on-surface-variant">Shields → Advanced Controls → Block cross-site cookies & fingerprinting.</p>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <strong className="text-on-surface font-semibold block">Mobile (iOS & Android)</strong>
              <p className="text-on-surface-variant">Settings → App Settings / Chrome/Safari → Privacy → Clear Browsing Data.</p>
            </div>
          </div>

          <p className="text-xs text-amber-800 dark:text-amber-300 bg-amber-500/10 p-3 sm:p-3.5 rounded-xl border border-amber-500/20">
            <strong>Please Note:</strong> Disabling strictly necessary cookies or local storage will prevent you from
            logging in or keeping bookmarked problems saved across page reloads.
          </p>
        </section>

        {/* Section 4 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>4. Do Not Track (DNT) & Global Privacy Control (GPC)</span>
          </h2>
          <p>
            Stuckhere respects modern user privacy signals. When your browser transmits a{" "}
            <strong>Global Privacy Control (GPC)</strong> or <strong>Do Not Track (DNT)</strong> header, our
            application automatically suppresses non-essential third-party analytics scripts, ensuring your visit
            proceeds without secondary telemetry.
          </p>
        </section>

        {/* Section 5 */}
        <section className="rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 shadow-xs">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-on-surface flex items-start sm:items-center gap-2 sm:gap-2.5">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
            <span>5. Revisions & Privacy Contact</span>
          </h2>
          <p>
            We review this Cookie Policy annually to ensure it reflects current engineering practices. For any questions
            regarding our browser storage implementation, reach our privacy engineering desk at:
          </p>
          <p className="text-xs">
            Email:{" "}
            <a href="mailto:privacy@stuckhere.com" className="text-primary font-bold hover:underline">
              privacy@stuckhere.com
            </a>{" "}
            • Stuckhere Privacy Architecture Desk
          </p>
        </section>

        {/* Bottom CTA Card */}
        <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-on-surface text-sm sm:text-base">Explore Related Legal Documents</h3>
            <p className="text-xs text-on-surface-variant">Review our full Privacy Policy and Terms of Service agreements.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Link
              to="/privacy"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-surface border border-outline-variant/30 text-on-surface text-xs font-bold hover:bg-surface-container transition-all shadow-2xs w-full sm:w-auto"
            >
              <span>Privacy Policy</span>
            </Link>
            <Link
              to="/terms"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-xs w-full sm:w-auto"
            >
              <span>Terms of Service</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
