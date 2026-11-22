import React from "react";

interface CourseCardBannerProps {
  courseNum: number;
  isSelected?: boolean;
}

export const CourseCardBanner: React.FC<CourseCardBannerProps> = ({
  courseNum,
  isSelected = false,
}) => {
  if (courseNum === 1) {
    // Course 1: Problem Discovery & Validation (Theme: Blue / Radar / Dossier / Discovery)
    return (
      <div className="relative w-full h-[124px] sm:h-[132px] overflow-hidden select-none">
        <svg
          viewBox="0 0 380 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c1-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#002d9c" />
              <stop offset="50%" stopColor="#003bcb" />
              <stop offset="100%" stopColor="#2554f0" />
            </linearGradient>
            <linearGradient id="c1-card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
            </linearGradient>
            <radialGradient id="c1-glow" cx="80%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2554f0" stopOpacity="0" />
            </radialGradient>
            <pattern id="c1-grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.08" />
            </pattern>
          </defs>

          {/* Background */}
          <rect width="380" height="132" fill="url(#c1-grad)" />
          <rect width="380" height="132" fill="url(#c1-glow)" />
          <rect width="380" height="132" fill="url(#c1-grid)" />

          {/* Decorative Radar Circles */}
          <circle cx="310" cy="66" r="54" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="3 3" />
          <circle cx="310" cy="66" r="38" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.2" />
          <circle cx="310" cy="66" r="20" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.28" />
          <line x1="310" y1="12" x2="310" y2="120" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
          <line x1="256" y1="66" x2="364" y2="66" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />

          {/* Radar Sweep Line */}
          <line x1="310" y1="66" x2="348" y2="34" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
          <circle cx="348" cy="34" r="3.5" fill="#60a5fa" />
          <circle cx="348" cy="34" r="7" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.5" />

          {/* Floating Problem Dossier Card Graphic */}
          <g transform="translate(145, 20)">
            <rect width="130" height="92" rx="8" fill="url(#c1-card-grad)" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            {/* Dossier Header */}
            <rect x="12" y="14" width="44" height="6" rx="3" fill="#ffffff" fillOpacity="0.8" />
            <rect x="12" y="26" width="76" height="4" rx="2" fill="#ffffff" fillOpacity="0.45" />
            <rect x="12" y="34" width="62" height="4" rx="2" fill="#ffffff" fillOpacity="0.35" />

            {/* Pain Score Pill Gauge */}
            <rect x="12" y="48" width="58" height="18" rx="9" fill="#002d9c" fillOpacity="0.6" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="21" cy="57" r="3" fill="#38bdf8" />
            <text x="28" y="61" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="sans-serif">PAIN 88</text>

            {/* Verification Checkmark Icon */}
            <circle cx="106" cy="22" r="10" fill="#2563eb" fillOpacity="0.6" stroke="#93c5fd" strokeWidth="1" />
            <path d="M102 22 L105 25 L111 19" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Signal Bars */}
            <rect x="80" y="54" width="4" height="12" rx="1.5" fill="#38bdf8" />
            <rect x="87" y="50" width="4" height="16" rx="1.5" fill="#60a5fa" />
            <rect x="94" y="44" width="4" height="22" rx="1.5" fill="#93c5fd" />
            <rect x="101" y="40" width="4" height="26" rx="1.5" fill="#ffffff" />
          </g>

          {/* Left Hero Badge / Branding */}
          <g transform="translate(18, 20)">
            <rect width="84" height="22" rx="6" fill="#ffffff" fillOpacity="0.18" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.35" />
            <text x="10" y="15" fill="#ffffff" fontSize="10" fontWeight="800" letterSpacing="1" fontFamily="sans-serif">
              COURSE 1
            </text>
            <text x="1" y="48" fill="#ffffff" fontSize="15" fontWeight="700" fontFamily="sans-serif">
              Discovery
            </text>
            <text x="1" y="65" fill="#bfdbfe" fontSize="11" fontWeight="500" fontFamily="sans-serif">
              &amp; Validation
            </text>
          </g>
        </svg>

        {/* Selection Glow / Badge overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {isSelected ? (
            <span className="text-[11px] font-bold bg-white text-[#003bcb] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003bcb] animate-pulse" />
              Active
            </span>
          ) : (
            <span className="text-[10px] font-medium bg-black/25 text-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
              15 Chapters
            </span>
          )}
        </div>
      </div>
    );
  }

  if (courseNum === 2) {
    // Course 2: Market Sizing & Opportunity Analysis (Theme: Teal / TAM SAM SOM / Curves / Finance)
    return (
      <div className="relative w-full h-[124px] sm:h-[132px] overflow-hidden select-none">
        <svg
          viewBox="0 0 380 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c2-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#042f2e" />
              <stop offset="45%" stopColor="#0b6b83" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="c2-card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="c2-curve-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="c2-glow" cx="85%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0b6b83" stopOpacity="0" />
            </radialGradient>
            <pattern id="c2-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.9" fill="#ffffff" fillOpacity="0.12" />
            </pattern>
          </defs>

          {/* Background */}
          <rect width="380" height="132" fill="url(#c2-grad)" />
          <rect width="380" height="132" fill="url(#c2-glow)" />
          <rect width="380" height="132" fill="url(#c2-dots)" />

          {/* Concentric TAM / SAM / SOM Orbital Rings */}
          <ellipse cx="310" cy="66" rx="56" ry="46" stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />
          <ellipse cx="310" cy="66" rx="38" ry="30" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.3" />
          <ellipse cx="310" cy="66" rx="20" ry="16" fill="#0f766e" fillOpacity="0.4" stroke="#67e8f9" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="310" y="69" fill="#ffffff" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SOM</text>

          {/* Financial Growth Curve */}
          <path
            d="M 160 94 Q 210 88, 240 68 T 300 30"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 160 94 Q 210 88, 240 68 T 300 30 L 300 110 L 160 110 Z"
            fill="url(#c2-curve-grad)"
          />

          {/* Node Sparks */}
          <circle cx="240" cy="68" r="3.5" fill="#2dd4bf" />
          <circle cx="300" cy="30" r="4.5" fill="#ffffff" stroke="#2dd4bf" strokeWidth="1.5" />

          {/* Floating TAM/SAM Card Graphic */}
          <g transform="translate(138, 22)">
            <rect width="134" height="88" rx="8" fill="url(#c2-card-grad)" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.28" />
            {/* Metrics */}
            <text x="12" y="18" fill="#a7f3d0" fontSize="9" fontWeight="700" letterSpacing="0.5" fontFamily="sans-serif">BOTTOM-UP TAM</text>
            <text x="12" y="36" fill="#ffffff" fontSize="16" fontWeight="800" fontFamily="sans-serif">$1.2 Billion</text>

            <rect x="12" y="44" width="110" height="1" fill="#ffffff" fillOpacity="0.18" />

            {/* SAM and SOM pills */}
            <rect x="12" y="52" width="50" height="16" rx="8" fill="#042f2e" fillOpacity="0.6" stroke="#2dd4bf" strokeWidth="0.8" />
            <text x="19" y="63" fill="#67e8f9" fontSize="8" fontWeight="700" fontFamily="sans-serif">SAM: $180M</text>

            <rect x="68" y="52" width="54" height="16" rx="8" fill="#042f2e" fillOpacity="0.6" stroke="#38bdf8" strokeWidth="0.8" />
            <text x="74" y="63" fill="#93c5fd" fontSize="8" fontWeight="700" fontFamily="sans-serif">LTV &gt; 3:1 CAC</text>
          </g>

          {/* Left Hero Badge / Branding */}
          <g transform="translate(18, 20)">
            <rect width="84" height="22" rx="6" fill="#ffffff" fillOpacity="0.18" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.35" />
            <text x="10" y="15" fill="#ffffff" fontSize="10" fontWeight="800" letterSpacing="1" fontFamily="sans-serif">
              COURSE 2
            </text>
            <text x="1" y="48" fill="#ffffff" fontSize="15" fontWeight="700" fontFamily="sans-serif">
              Market Sizing
            </text>
            <text x="1" y="65" fill="#ccfbf1" fontSize="11" fontWeight="500" fontFamily="sans-serif">
              &amp; Opportunity
            </text>
          </g>
        </svg>

        {/* Selection Glow / Badge overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {isSelected ? (
            <span className="text-[11px] font-bold bg-white text-[#0b6b83] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0b6b83] animate-pulse" />
              Active
            </span>
          ) : (
            <span className="text-[10px] font-medium bg-black/25 text-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
              18 Chapters
            </span>
          )}
        </div>
      </div>
    );
  }

  // Course 3: Full-Stack Cloud Development (Theme: Indigo / Violet / Cloud / Code / Firestore)
  return (
    <div className="relative w-full h-[124px] sm:h-[132px] overflow-hidden select-none">
      <svg
        viewBox="0 0 380 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="c3-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="35%" stopColor="#1e1b4b" />
            <stop offset="75%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="c3-card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="c3-glow" cx="80%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
          </radialGradient>
          <pattern id="c3-net" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.08" />
            <circle cx="0" cy="0" r="1.5" fill="#38bdf8" fillOpacity="0.35" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="380" height="132" fill="url(#c3-grad)" />
        <rect width="380" height="132" fill="url(#c3-glow)" />
        <rect width="380" height="132" fill="url(#c3-net)" />

        {/* Cloud & Network Constellation Nodes */}
        <g stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.35">
          <line x1="290" y1="40" x2="330" y2="28" />
          <line x1="330" y1="28" x2="360" y2="52" />
          <line x1="360" y1="52" x2="335" y2="84" />
          <line x1="335" y1="84" x2="295" y2="76" />
          <line x1="295" y1="76" x2="290" y2="40" />
        </g>
        <circle cx="290" cy="40" r="3" fill="#38bdf8" />
        <circle cx="330" cy="28" r="3.5" fill="#c084fc" />
        <circle cx="360" cy="52" r="3" fill="#60a5fa" />
        <circle cx="335" cy="84" r="3.5" fill="#38bdf8" />
        <circle cx="295" cy="76" r="3" fill="#a855f7" />

        {/* Stacked Database Cylinders Graphic */}
        <g transform="translate(325, 68)">
          {/* Cylinder Top */}
          <ellipse cx="20" cy="12" rx="14" ry="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
          <path d="M 6 12 v 10 a 14 5 0 0 0 28 0 v -10" fill="#0f172a" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
          <path d="M 6 22 v 10 a 14 5 0 0 0 28 0 v -10" fill="#0f172a" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
        </g>

        {/* Floating IDE Code Editor Card */}
        <g transform="translate(140, 18)">
          <rect width="144" height="96" rx="8" fill="url(#c3-card-grad)" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />

          {/* IDE Window Controls */}
          <circle cx="12" cy="12" r="3" fill="#f87171" fillOpacity="0.8" />
          <circle cx="20" cy="12" r="3" fill="#fbbf24" fillOpacity="0.8" />
          <circle cx="28" cy="12" r="3" fill="#4ade80" fillOpacity="0.8" />
          <rect x="42" y="8" width="50" height="8" rx="4" fill="#ffffff" fillOpacity="0.12" />

          {/* Code Syntax Lines */}
          <text x="12" y="32" fill="#c084fc" fontSize="9" fontWeight="600" fontFamily="monospace">import</text>
          <text x="46" y="32" fill="#e2e8f0" fontSize="9" fontFamily="monospace">&#123; useFirestore &#125;</text>

          <text x="12" y="47" fill="#60a5fa" fontSize="9" fontWeight="600" fontFamily="monospace">const</text>
          <text x="42" y="47" fill="#f8fafc" fontSize="9" fontFamily="monospace">app = useApp();</text>

          {/* AI Copilot Sparkle Pill */}
          <rect x="12" y="58" width="80" height="18" rx="9" fill="#1e1b4b" fillOpacity="0.7" stroke="#a855f7" strokeWidth="0.9" />
          <circle cx="21" cy="67" r="2.5" fill="#c084fc" />
          <text x="27" y="70" fill="#ffffff" fontSize="8" fontWeight="700" fontFamily="sans-serif">✦ AI Copilot: Active</text>

          {/* Vercel Edge Badge */}
          <polygon points="120,68 128,82 112,82" fill="#ffffff" fillOpacity="0.9" />
        </g>

        {/* Left Hero Badge / Branding */}
        <g transform="translate(18, 20)">
          <rect width="84" height="22" rx="6" fill="#ffffff" fillOpacity="0.18" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.35" />
          <text x="10" y="15" fill="#ffffff" fontSize="10" fontWeight="800" letterSpacing="1" fontFamily="sans-serif">
            COURSE 3
          </text>
          <text x="1" y="48" fill="#ffffff" fontSize="15" fontWeight="700" fontFamily="sans-serif">
            Full-Stack Cloud
          </text>
          <text x="1" y="65" fill="#c7d2fe" fontSize="11" fontWeight="500" fontFamily="sans-serif">
            Development
          </text>
        </g>
      </svg>

      {/* Selection Glow / Badge overlay */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        {isSelected ? (
          <span className="text-[11px] font-bold bg-white text-[#1e40af] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e40af] animate-pulse" />
            Active
          </span>
        ) : (
          <span className="text-[10px] font-medium bg-black/25 text-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
            18 Chapters
          </span>
        )}
      </div>
    </div>
  );
};
