import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Compass,
  Search,
  ArrowRight,
  Home,
  Sparkles,
  Layers,
  HelpCircle,
} from "lucide-react";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/explore");
    }
  };

  const quickCategories = [
    { name: "Healthcare & Biotech", slug: "healthcare-biotech" },
    { name: "AI & Automation", slug: "artificial-intelligence-automation" },
    { name: "Clean Energy", slug: "clean-energy-sustainability" },
    { name: "FinTech & Banking", slug: "fintech-defi" },
    { name: "Logistics & Supply Chain", slug: "logistics-supply-chain" },
  ];

  return (
    <div className="min-h-[75vh] w-full flex items-center justify-center px-4 py-16 font-['Poppins',sans-serif] text-on-surface">
      <SEOHead
        title="404 — Page Not Found"
        description="The requested page or problem statement could not be found on ProblemAtlas."
        noindex
      />

      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        {/* Visual Badge */}
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary shadow-lg shadow-primary/5">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-black tracking-widest uppercase shadow-sm">
            404
          </span>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-on-surface tracking-tight">
            Lost on the Atlas?
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-md mx-auto leading-relaxed">
            The problem statement, dossier, or page you were looking for doesn't exist, was renamed, or has been archived.
          </p>
        </div>

        {/* Inline Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant h-4 w-4 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verified problem statements..."
            className="w-full bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 focus:border-primary rounded-2xl py-3.5 pl-11 pr-24 text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all cursor-pointer shadow-xs"
          >
            Search
          </button>
        </form>

        {/* Quick Industry Pills */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Or explore popular domains:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/industries/${cat.slug}`}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-container-low border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary hover:bg-surface-container transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-container transition-all"
          >
            <Layers className="w-4 h-4" />
            <span>Explore All Problems</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
