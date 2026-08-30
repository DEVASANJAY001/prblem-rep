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
} from "lucide-react";

export const Contact: React.FC = () => {
  const [inquiryType, setInquiryType] = useState("Partnerships & Enterprise Scouting");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const contactChannels = [
    {
      icon: Building2,
      title: "Enterprise & Partnerships",
      email: "partners@problematlas.com",
      description: "Custom problem scouting, private bounty escrow, and innovation pipeline licensing.",
    },
    {
      icon: MessageSquare,
      title: "Community & Solver Support",
      email: "support@problematlas.com",
      description: "Assistance with problem submissions, leaderboard scores, and badge verification.",
    },
    {
      icon: Mail,
      title: "Research & Data Access",
      email: "research@problematlas.com",
      description: "Academic licensing, empirical bulk dataset APIs, and clinical benchmark integrations.",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface">
      <SEOHead
        title="Contact Us — ProblemAtlas"
        description="Get in touch with the ProblemAtlas team for enterprise scouting, research dataset partnerships, or platform inquiries."
        canonicalUrl="https://problematlas.com/contact"
        ogType="website"
        keywords={["contact problematlas", "enterprise scouting inquiry", "problem bounties support", "research partnerships"]}
      />      {/* ── Top Header Section ───────────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-8 pb-5 sm:pt-12 sm:pb-8 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Get in Touch</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                Contact the Team
              </h1>
              <p className="text-on-surface-variant text-xs sm:text-sm md:text-base mt-1 sm:mt-2 max-w-2xl font-normal leading-relaxed">
                Have a question about partnering, enterprise problem scouting, or empirical research datasets? We typically respond within 24 business hours.
              </p>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>Average Response SLA: &lt; 24 hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact Form & Channel Cards ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column: Direct Interactive Form */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-10 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-on-surface">Message Received!</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {name}. A member of our team will review your inquiry regarding "{inquiryType}" and follow up shortly at {email}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-on-surface">Send a Message</h2>
                  <p className="text-xs text-on-surface-variant">Fill out the form below to reach the appropriate team.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface">Inquiry Topic</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Partnerships & Enterprise Scouting">Partnerships & Enterprise Problem Scouting</option>
                    <option value="Research Data Access">Academic Research & Dataset Access</option>
                    <option value="Bounties & Competitions">Host a Bounty or Hackathon</option>
                    <option value="Press & Media">Press & Media Inquiries</option>
                    <option value="General Support">General Platform Support</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface">Organization / University (Optional)</label>
                  <input
                    type="text"
                    placeholder="Acme Health or MIT Lab"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface">Message Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry, proposed partnership scope, or question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Channels & Hub Cards */}
          <div className="lg:col-span-5 space-y-4">
            {contactChannels.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-xs space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-on-surface">{c.title}</h3>
                      <a
                        href={`mailto:${c.email}`}
                        className="text-xs font-mono font-bold text-primary hover:underline"
                      >
                        {c.email}
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{c.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
