import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest py-16 border-t border-outline-variant/20 font-body-md text-on-surface">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-12">
        {/* Product Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-label-sm font-semibold text-on-surface uppercase tracking-widest mb-2">
            Product
          </h4>
          <nav className="flex flex-col gap-3">
            <Link to="/features" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/solutions" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Solutions
            </Link>
            <Link to="/industries" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Industries
            </Link>
            <Link to="/explore" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Problem Catalog
            </Link>
          </nav>
        </div>

        {/* Community Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-label-sm font-semibold text-on-surface uppercase tracking-widest mb-2">
            Community
          </h4>
          <nav className="flex flex-col gap-3">
            <Link to="/community" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Forums & Feed
            </Link>
            <Link to="/companies" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Industry Partners
            </Link>
            <Link to="/submit" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Submit a Problem
            </Link>
          </nav>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-label-sm font-semibold text-on-surface uppercase tracking-widest mb-2">
            Company
          </h4>
          <nav className="flex flex-col gap-3">
            <Link to="/about" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Legal Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-label-sm font-semibold text-on-surface uppercase tracking-widest mb-2">
            Legal
          </h4>
          <nav className="flex flex-col gap-3">
            <Link to="/privacy" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom Bar matching Stitch */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-black text-xs">
            PA
          </div>
          <span className="font-label-sm text-outline font-bold tracking-widest uppercase">
            ProblemAtlas
          </span>
        </div>
        <p className="text-label-sm text-outline">© 2026 ProblemAtlas. All rights reserved.</p>
      </div>
    </footer>
  );
};
