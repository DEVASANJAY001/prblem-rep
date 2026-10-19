import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Mail,
  MessageSquare,
  Building2,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  HelpCircle,
  ChevronDown,
  Globe,
  Lock,
  FileCheck,
  Briefcase,
} from "lucide-react";

export const Contact: React.FC = () => {
  const [inquiryType, setInquiryType] = useState("Enterprise Problem Scouting & Bounties");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [urgency, setUrgency] = useState("Standard (24-48h)");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const contactChannels = [
    {
      icon: Building2,
      department: "Enterprise & Partnerships",
      email: "partners@stuckhere.com",
      description: "Custom problem scouting, private bounty escrow, and innovation pipeline matchmaking.",
      sla: "< 24 hours",
    },
    {
      icon: ShieldCheck,
      department: "Editorial & Verification",
      email: "moderation@stuckhere.com",
      description: "Inquiries regarding the 10-Point Verification Standard, submission appeals, or domain reviews.",
      sla: "< 36 hours",
    },
    {
      icon: Globe,
      department: "Research & Academic Data",
      email: "research@stuckhere.com",
      description: "Academic bulk datasets, empirical methodology whitepapers, and university lab collaborations.",
      sla: "< 48 hours",
    },
    {
      icon: Lock,
      department: "Security & Disclosure",
      email: "security@stuckhere.com",
      description: "Responsible vulnerability reporting, infrastructure audit logs, and PGP key verification.",
      sla: "< 12 hours (High Priority)",
    },
    {
      icon: FileCheck,
      department: "Legal & Data Privacy",
      email: "legal@stuckhere.com",
      description: "GDPR/CCPA subject requests, IP ownership terms, and copyright/DMCA notifications.",
      sla: "< 3 business days",
    },
    {
      icon: MessageSquare,
      department: "Community & Solver Support",
      email: "support@stuckhere.com",
      description: "Assistance with solver profiles, community badges, and platform navigation.",
      sla: "< 24 hours",
    },
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      region: "Global Innovation Headquarters",
      address: "525 Market Street, Suite 3400",
      locality: "San Francisco, CA 94105, USA",
      tz: "PST / UTC-8",
    },
    {
      city: "London",
      region: "EMEA Policy & Research Hub",
      address: "100 Bishopsgate, Level 19",
      locality: "London, EC2N 4AG, United Kingdom",
      tz: "GMT / UTC+0",
    },
    {
      city: "Bengaluru",
      region: "Asia-Pacific Engineering Hub",
      address: "Indiranagar 100 Feet Road, 4th Floor",
      locality: "Bengaluru, Karnataka 560038, India",
      tz: "IST / UTC+5:30",
    },
  ];

  const faqs = [
    {
      q: "Can I submit confidential or proprietary corporate problems?",
      a: "No. The public Stuckhere registry is strictly an open knowledge commons. All submitted problem statements must be non-confidential and cite publicly verifiable evidence. If your enterprise requires confidential problem scoping or private solver hackathons, contact our Enterprise team at partners@stuckhere.com to establish a private bounty escrow under mutual NDA.",
    },
    {
      q: "What is the typical timeline for problem verification?",
      a: "Submissions undergo automated algorithmic preliminary checks within 12 hours to screen for evidence citations, trigger clarity, and non-confidentiality. Following algorithmic clearance, our independent domain chairs conduct peer review within 48 to 72 business hours before awarding the Verified Problem badge.",
    },
    {
      q: "Does Stuckhere claim equity or IP rights in solutions built by solvers?",
      a: "Never. Stuckhere is 100% committed to solver IP freedom. We take 0% equity, 0% licensing royalties, and 0% intellectual property rights over any software, hardware, or corporate entities created to address cataloged problems. You own everything you build.",
    },
    {
      q: "How do sponsored enterprise bounties work?",
      a: "Enterprises facing documented operational bottlenecks can deposit a cash bounty into a verified escrow account. Solvers submit validated prototypes or pilots that solve the documented problem metrics. Once the enterprise verifies that the prototype satisfies the objective criteria, the escrow is disbursed directly to the winning solver team.",
    },
    {
      q: "How can academic researchers access raw Stuckhere datasets?",
      a: "We provide verified university researchers, non-profits, and policy institutions with anonymized JSON and CSV bulk datasets for scholarly analysis. Please contact research@stuckhere.com from an institutional (.edu / .ac) email address detailing your research methodology.",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface selection:bg-primary/15 selection:text-primary">
      <SEOHead
        title="Contact Us — Stuckhere Support, Partnerships & Global Desks"
        description="Connect with the Stuckhere team for enterprise problem scouting, editorial verification inquiries, research datasets, or solver support. Average SLA under 24 business hours."
        canonicalUrl="https://stuckhere.com/contact"
        ogType="website"
        keywords={[
          "contact stuckhere",
          "enterprise problem scouting",
          "problem bounty inquiry",
          "research dataset licensing",
          "editorial verification support",
          "stuckhere headquarters",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Stuckhere",
          "description": "Direct communication channels for Stuckhere support, enterprise partnerships, and research access.",
          "url": "https://stuckhere.com/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Stuckhere",
            "url": "https://stuckhere.com",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "email": "support@stuckhere.com",
                "contactType": "customer service",
                "availableLanguage": ["English"]
              },
              {
                "@type": "ContactPoint",
                "email": "partners@stuckhere.com",
                "contactType": "sales",
                "availableLanguage": ["English"]
              }
            ]
          }
        }}
      />

      {/* ── Top Header Section ───────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-4 sm:space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-on-surface font-bold">Company</span>
            <span>/</span>
            <span className="text-primary font-bold">Contact Us</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Mail className="h-3.5 w-3.5" />
            <span>Direct Operational &amp; Ecosystem Support</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
                Let&apos;s Build Together. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
                  Connect With Our Team.
                </span>
              </h1>
              <p className="text-on-surface-variant text-sm sm:text-base md:text-lg font-normal leading-relaxed">
                Whether you are an enterprise scouting verified solutions for persistent bottlenecks, a researcher seeking empirical problem datasets, or a founder looking for guidance, our specialized desks are ready to assist.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full shrink-0 shadow-2xs">
              <Clock className="w-4 h-4" />
              <span>Standard Response SLA: &lt; 24 Business Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Container ────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* ── Form & Key Channel Breakdown Grid ────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Left Column: Direct Interactive Form */}
          <div className="lg:col-span-7 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-10 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            {submitted ? (
              <div className="py-12 sm:py-16 text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-on-surface">
                    Inquiry Dispatched Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-on-surface">{name}</span>. Your ticket has been routed to our <span className="font-bold text-primary">{inquiryType}</span> desk. A member of our team will follow up at <span className="font-mono font-semibold text-on-surface">{email}</span> within our stated SLA.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5 border-b border-outline-variant/20 pb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-on-surface">
                    Direct Inquiry Dispatch
                  </h2>
                  <p className="text-xs text-on-surface-variant font-normal">
                    Complete the details below to route your request directly to the appropriate domain desk.
                  </p>
                </div>

                {/* Inquiry Topic Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                    <span>Department / Topic *</span>
                    <span className="text-[11px] font-normal text-on-surface-variant">Selected routing desk</span>
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="Enterprise Problem Scouting & Bounties">
                      Enterprise Problem Scouting &amp; Bounties (partners@)
                    </option>
                    <option value="Editorial & Verification Review">
                      Problem Submission &amp; 10-Point Verification Review (moderation@)
                    </option>
                    <option value="Research & Academic Dataset Licensing">
                      Academic Research &amp; Bulk Dataset Access (research@)
                    </option>
                    <option value="Security & Responsible Disclosure">
                      Infrastructure Security &amp; Vulnerability Disclosure (security@)
                    </option>
                    <option value="Press, Media & Keynote Speaking">
                      Press, Media Citations &amp; Keynotes (press@)
                    </option>
                    <option value="General Solver Community Support">
                      General Solver &amp; Platform Support (support@)
                    </option>
                  </select>
                </div>

                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-on-surface-variant/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface">Work / Institutional Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jane@organization.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-on-surface-variant/50"
                    />
                  </div>
                </div>

                {/* Organization & Urgency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface">
                      Organization / University / Lab (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mayo Clinic, Stanford, Siemens"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-on-surface-variant/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface">Response Priority</label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer"
                    >
                      <option value="Standard (24-48h)">Standard Review (24–48 hours)</option>
                      <option value="Urgent Commercial (Under 24h)">Active Procurement / Bounty Escrow (&lt; 24h)</option>
                      <option value="Critical Security (Immediate)">Vulnerability / PGP Disclosure (Immediate)</option>
                    </select>
                  </div>
                </div>

                {/* Message Details */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface">
                    Inquiry Narrative &amp; Scope *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide specific details regarding your inquiry, problem domain of interest, or partnership requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none placeholder:text-on-surface-variant/50"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-on-surface-variant">
                    Protected by AES-256 encryption. We never share contact details.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Dedicated Department Routing Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-on-surface">Specialized Routing Desks</h2>
              <p className="text-xs text-on-surface-variant font-normal">
                Direct email channels with dedicated service-level agreements.
              </p>
            </div>

            <div className="space-y-3">
              {contactChannels.map((c, idx) => {
                const Icon = c.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-5 shadow-2xs space-y-2.5 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-on-surface">
                            {c.department}
                          </h4>
                          <a
                            href={`mailto:${c.email}`}
                            className="text-xs font-mono font-bold text-primary hover:underline"
                          >
                            {c.email}
                          </a>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">
                        {c.sla}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-on-surface-variant leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section: Global Innovation Hubs ───────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-1.5 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <MapPin className="w-3.5 h-3.5" />
              <span>Physical Presence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Global Regional Hubs
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              While our problem registry is decentralized and worldwide, our core operations span three primary time zones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {officeLocations.map((loc, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-xs space-y-3 hover:border-primary/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {loc.city}
                  </span>
                  <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full">
                    {loc.tz}
                  </span>
                </div>
                <h3 className="text-base font-bold text-on-surface">
                  {loc.region}
                </h3>
                <div className="text-xs text-on-surface-variant space-y-0.5 font-normal leading-relaxed">
                  <p>{loc.address}</p>
                  <p>{loc.locality}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section: Frequently Asked Questions Accordion ─────────────────── */}
        <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-6 sm:p-12 shadow-xs space-y-8">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <HelpCircle className="w-4 h-4" />
              <span>Instant Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Common operational and partnership questions regarding the Stuckhere ecosystem.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-outline-variant/30 bg-surface-container-low/50 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-on-surface hover:text-primary transition-colors cursor-pointer gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : "text-on-surface-variant"
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-on-surface-variant leading-relaxed animate-fade-in border-t border-outline-variant/20 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Section: Bottom CTA Card ─────────────────────────────────────── */}
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-surface-container-lowest p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-on-surface">
              Looking to Scout or Sponsor Verified Bounties?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Discover how enterprise innovation teams partner with Stuckhere to crowdsource breakthrough solutions from global engineering talent.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="mailto:partners@stuckhere.com?subject=Enterprise%20Problem%20Scouting%20Inquiry"
              className="px-6 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-hover shadow-md transition-all cursor-pointer"
            >
              Email Enterprise Team
            </a>
            <Link
              to="/explore"
              className="px-5 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs sm:text-sm font-bold hover:border-primary/50 transition-all cursor-pointer"
            >
              Browse Registry
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
