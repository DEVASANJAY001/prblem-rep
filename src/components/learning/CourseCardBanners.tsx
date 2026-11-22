import React from "react";

interface CourseCardBannerProps {
  courseNum: number;
}

/**
 * CourseCardBanner
 * Coursera-style visual illustration banners matching the user-uploaded reference:
 * - Course 1: IBM-style Certificate banner with crisp white dossier card & blue ribbon seal
 * - Course 2: Microsoft Excel-style Green theme with 3D TAM tile, charts, grid & sigma
 * - Course 3: ChatGPT/Prompt Engineering-style Purple/Magenta aura with flower emblem, code brackets & AI head
 */
export const CourseCardBanner: React.FC<CourseCardBannerProps> = ({ courseNum }) => {
  // Course 1: Problem Discovery & Validation (IBM Data Science Certificate style)
  if (courseNum === 1) {
    return (
      <div className="relative w-full h-[142px] sm:h-[150px] overflow-hidden select-none bg-[#071329]">
        <svg
          viewBox="0 0 360 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c1-coursera-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#061024" />
              <stop offset="45%" stopColor="#0b234f" />
              <stop offset="100%" stopColor="#0a1a3b" />
            </linearGradient>

            <filter id="c1-card-shadow" x="-10%" y="-10%" width="125%" height="135%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.45" />
            </filter>

            <linearGradient id="c1-ribbon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <radialGradient id="c1-ambient-glow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#061024" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep Navy Background & Ambient Glow */}
          <rect width="360" height="150" fill="url(#c1-coursera-bg)" />
          <circle cx="180" cy="75" r="100" fill="url(#c1-ambient-glow)" />

          {/* Background Subtle Accent Lines */}
          <path d="M 0 30 Q 180 80 360 20" stroke="#1e3a8a" strokeWidth="1" strokeOpacity="0.3" fill="none" />
          <path d="M 0 120 Q 180 60 360 130" stroke="#1e3a8a" strokeWidth="1" strokeOpacity="0.3" fill="none" />

          {/* Center White Certificate / Dossier Card (Matches IBM Card in reference image) */}
          <g transform="translate(42, 22)">
            {/* Card Base Layer (Shadowed) */}
            <rect
              x="0"
              y="0"
              width="276"
              height="106"
              rx="12"
              fill="#ffffff"
              filter="url(#c1-card-shadow)"
            />

            {/* Inner Subtle Border */}
            <rect
              x="0"
              y="0"
              width="276"
              height="106"
              rx="12"
              stroke="#e2e8f0"
              strokeWidth="1"
              fill="none"
            />

            {/* Sub-Brand / Org Mark */}
            <text
              x="24"
              y="32"
              fill="#1e293b"
              fontSize="11"
              fontWeight="800"
              letterSpacing="0.8"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              STUCKHERE
            </text>

            {/* Certificate Big Title */}
            <text
              x="24"
              y="58"
              fill="#0f172a"
              fontSize="17"
              fontWeight="800"
              fontFamily="Georgia, serif, system-ui"
              letterSpacing="-0.3"
            >
              Problem Discovery
            </text>
            <text
              x="24"
              y="79"
              fill="#0f172a"
              fontSize="16"
              fontWeight="800"
              fontFamily="Georgia, serif, system-ui"
              letterSpacing="-0.3"
            >
              Professional Certificate
            </text>

            {/* Blue Rosette Ribbon Badge (Top Right of Card) */}
            <g transform="translate(204, 0)">
              {/* Ribbon hanging tails */}
              <path d="M 12 40 L 18 56 L 24 40 Z" fill="#1e40af" />
              <path d="M 28 40 L 34 56 L 40 40 Z" fill="#1e40af" />

              {/* Rosette Medal Base */}
              <rect x="6" y="-6" width="40" height="48" rx="8" fill="url(#c1-ribbon-grad)" />
              <circle cx="26" cy="18" r="14" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1.5" />
              <circle cx="26" cy="18" r="10" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2.5 2.5" fill="none" />
              <circle cx="26" cy="18" r="5" fill="#ffffff" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  // Course 2: Market Sizing & Opportunity Analysis (Microsoft Excel style)
  if (courseNum === 2) {
    return (
      <div className="relative w-full h-[142px] sm:h-[150px] overflow-hidden select-none bg-[#022c22]">
        <svg
          viewBox="0 0 360 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            {/* Rich Emerald-to-Lime Green Gradient (Matches Excel card in reference image) */}
            <radialGradient id="c2-center-aura" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="45%" stopColor="#059669" />
              <stop offset="85%" stopColor="#044e3d" />
              <stop offset="100%" stopColor="#022c22" />
            </radialGradient>

            <linearGradient id="c2-glow-sweep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#065f46" stopOpacity="0.3" />
            </linearGradient>

            <filter id="c2-excel-shadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#012018" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Background Aura */}
          <rect width="360" height="150" fill="url(#c2-center-aura)" />
          <ellipse cx="230" cy="50" rx="90" ry="70" fill="#34d399" fillOpacity="0.35" filter="blur(25px)" />

          {/* Top-Left Floating Spreadsheet Grid Icon */}
          <g transform="translate(85, 20)" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeOpacity="0.9">
            <rect x="0" y="0" width="22" height="18" rx="3" />
            <line x1="0" y1="6" x2="22" y2="6" />
            <line x1="8" y1="6" x2="8" y2="18" />
            <line x1="15" y1="6" x2="15" y2="18" />
          </g>

          {/* Top-Right Floating Bar Chart Icon */}
          <g transform="translate(265, 30)" fill="#ffffff" fillOpacity="0.9">
            <rect x="0" y="10" width="4" height="12" rx="1.5" />
            <rect x="7" y="4" width="4" height="18" rx="1.5" />
            <rect x="14" y="0" width="4" height="22" rx="1.5" />
          </g>

          {/* Bottom-Left Trending Line Chart Icon */}
          <g transform="translate(68, 98)">
            <path
              d="M 4 22 L 14 10 L 22 18 L 34 4"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeOpacity="0.9"
            />
            <circle cx="4" cy="22" r="3" fill="#ffffff" />
            <circle cx="14" cy="10" r="3" fill="#ffffff" />
            <circle cx="22" cy="18" r="3" fill="#ffffff" />
            <circle cx="34" cy="4" r="3.5" fill="#ffffff" />
          </g>

          {/* Bottom-Right Greek Sigma (∑) Icon */}
          <text
            x="248"
            y="126"
            fill="#ffffff"
            fontSize="24"
            fontWeight="700"
            fontFamily="serif, system-ui"
            fillOpacity="0.9"
          >
            ∑
          </text>

          {/* Center 3D Excel-Style App Icon Tile (Matches Excel Tile in reference image) */}
          <g transform="translate(150, 45)" filter="url(#c2-excel-shadow)">
            {/* Green App Tile Layers */}
            <rect x="0" y="0" width="60" height="60" rx="14" fill="#047857" />
            <rect x="12" y="8" width="44" height="44" rx="8" fill="#10b981" />
            <rect x="22" y="14" width="30" height="32" rx="6" fill="#34d399" fillOpacity="0.3" />

            {/* Front Raised Icon Plate */}
            <rect x="6" y="10" width="40" height="40" rx="9" fill="#059669" stroke="#34d399" strokeWidth="1" />

            {/* 3D Bold TAM Text / Sizing Emblem */}
            <text
              x="26"
              y="37"
              fill="#ffffff"
              fontSize="20"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              letterSpacing="-0.5"
            >
              TAM
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // Course 3: Full-Stack Cloud Development (ChatGPT / Prompt Engineering style)
  return (
    <div className="relative w-full h-[142px] sm:h-[150px] overflow-hidden select-none bg-[#1e0b36]">
      <svg
        viewBox="0 0 360 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Deep Purple & Electric Magenta Aura (Matches Prompt Engineering card in reference image) */}
          <linearGradient id="c3-coursera-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e0b36" />
            <stop offset="35%" stopColor="#4c0519" />
            <stop offset="70%" stopColor="#831843" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>

          <radialGradient id="c3-magenta-core" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1e0b36" stopOpacity="0" />
          </radialGradient>

          <filter id="c3-glow-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#ffffff" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Purple Background & Radiant Center Glow */}
        <rect width="360" height="150" fill="url(#c3-coursera-bg)" />
        <circle cx="180" cy="75" r="90" fill="url(#c3-magenta-core)" />

        {/* Bottom-Left Code Brackets Icon `< >` (Matches reference image) */}
        <g transform="translate(48, 102)" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.95">
          <polyline points="10,0 2,8 10,16" />
          <polyline points="16,0 24,8 16,16" />
        </g>

        {/* Top-Right AI Head / Neural Copilot Icon (Matches reference image) */}
        <g transform="translate(290, 26)" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.95">
          {/* Head silhouette */}
          <path d="M 6 22 C 3 18, 2 12, 5 8 C 8 3, 16 3, 19 8 C 21 11, 21 15, 18 19 L 18 22 Z" />
          {/* Gear / Brain Spark inside */}
          <circle cx="12" cy="11" r="2.5" fill="#ffffff" />
          <line x1="12" y1="5.5" x2="12" y2="7" />
          <line x1="12" y1="15" x2="12" y2="16.5" />
          <line x1="6.5" y1="11" x2="8" y2="11" />
          <line x1="16" y1="11" x2="17.5" y2="11" />
        </g>

        {/* Center Iconic White Geometric Constellation Flower Emblem (Matches ChatGPT Flower in reference image) */}
        <g transform="translate(180, 75)" filter="url(#c3-glow-filter)">
          {/* Outer Rotating Rosette Petals */}
          <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Petal 0 */}
            <path d="M 0 -34 C 14 -34, 24 -24, 24 -12 C 24 -3, 16 4, 8 10" />
            {/* Petal 60 */}
            <g transform="rotate(60)">
              <path d="M 0 -34 C 14 -34, 24 -24, 24 -12 C 24 -3, 16 4, 8 10" />
            </g>
            {/* Petal 120 */}
            <g transform="rotate(120)">
              <path d="M 0 -34 C 14 -34, 24 -24, 24 -12 C 24 -3, 16 4, 8 10" />
            </g>
            {/* Petal 180 */}
            <g transform="rotate(180)">
              <path d="M 0 -34 C 14 -34, 24 -24, 24 -12 C 24 -3, 16 4, 8 10" />
            </g>
            {/* Petal 240 */}
            <g transform="rotate(240)">
              <path d="M 0 -34 C 14 -34, 24 -24, 24 -12 C 24 -3, 16 4, 8 10" />
            </g>
            {/* Petal 300 */}
            <g transform="rotate(300)">
              <path d="M 0 -34 C 14 -34, 24 -24, 24 -12 C 24 -3, 16 4, 8 10" />
            </g>
          </g>

          {/* Central Core Hexagon / Ring */}
          <circle cx="0" cy="0" r="8" fill="#ffffff" fillOpacity="0.25" stroke="#ffffff" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
};
