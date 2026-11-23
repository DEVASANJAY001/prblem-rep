import React from "react";

interface CourseCardBannerProps {
  courseNum: number;
}

/**
 * CourseCardBanner
 * Coursera-style course artwork banners inspired by top enterprise credentials.
 * Clean, modern vector graphics with centered focal subjects and rich gradients.
 * No edge-clipping badges; perfectly framed within the 65-70% rounded container cut.
 */
export const CourseCardBanner: React.FC<CourseCardBannerProps> = ({ courseNum }) => {
  // Course 1: Problem Discovery & Validation (Deep Navy & Sapphire, Certificate Card motif like IBM Data Science)
  if (courseNum === 1) {
    return (
      <div className="relative w-full h-full min-h-[210px] overflow-hidden select-none bg-[#030914]">
        <svg
          viewBox="0 0 360 225"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c1-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#020914" />
              <stop offset="50%" stopColor="#091b38" />
              <stop offset="100%" stopColor="#031024" />
            </linearGradient>

            <radialGradient id="c1-glow" cx="50%" cy="46%" r="62%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#0056d2" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#020914" stopOpacity="0" />
            </radialGradient>

            <filter id="c1-card-shadow" x="-10%" y="-10%" width="125%" height="130%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.55" />
            </filter>
            
            <filter id="c1-seal-shadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#001845" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background & Ambient Glow */}
          <rect width="360" height="225" fill="url(#c1-bg-grad)" />
          <circle cx="180" cy="112" r="120" fill="url(#c1-glow)" />

          {/* Perspective Coordinate Grid Lines */}
          <g stroke="#1d4ed8" strokeWidth="0.8" strokeOpacity="0.22">
            <line x1="20" y1="190" x2="340" y2="190" />
            <line x1="30" y1="155" x2="330" y2="155" />
            <line x1="45" y1="120" x2="315" y2="120" />
            <line x1="80" y1="20" x2="135" y2="215" />
            <line x1="145" y1="20" x2="175" y2="215" />
            <line x1="215" y1="20" x2="185" y2="215" />
            <line x1="280" y1="20" x2="225" y2="215" />
          </g>

          {/* Flowing Discovery Signal Wave */}
          <path
            d="M 10 160 C 85 90, 140 175, 230 85 C 280 35, 315 95, 350 70"
            stroke="#00f0ff"
            strokeWidth="2.2"
            strokeOpacity="0.65"
            fill="none"
            strokeLinecap="round"
          />

          {/* 3D Certificate / Problem Dossier Card (Centered Coursera Motif) */}
          <g transform="translate(180, 112)" filter="url(#c1-card-shadow)">
            {/* Back Accent Card */}
            <rect
              x="-114"
              y="-66"
              width="236"
              height="136"
              rx="12"
              fill="#0a2558"
              fillOpacity="0.65"
            />
            {/* Front Crisp White Card */}
            <rect
              x="-118"
              y="-70"
              width="236"
              height="136"
              rx="12"
              fill="#ffffff"
            />
            
            {/* Card Content - Top Organization Stamp */}
            <text
              x="-96"
              y="-44"
              fill="#1e293b"
              fontSize="10"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.8"
            >
              PROBLEM DOSSIER
            </text>

            {/* Course Title on Card */}
            <text
              x="-96"
              y="-16"
              fill="#0f172a"
              fontSize="16"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              Problem Discovery
            </text>
            <text
              x="-96"
              y="5"
              fill="#0f172a"
              fontSize="16"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              &amp; Validation
            </text>

            {/* Credential Subtitle */}
            <text
              x="-96"
              y="32"
              fill="#0056d2"
              fontSize="9.5"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="1.2"
            >
              FOUNDATION PROGRAM
            </text>

            {/* Verification Ribbon Bar */}
            <rect x="-96" y="44" width="70" height="3" rx="1.5" fill="#0056d2" />
            <rect x="-22" y="44" width="40" height="3" rx="1.5" fill="#38bdf8" />

            {/* Blue Rosette Seal with Ribbon (Coursera IBM-style rosette) */}
            <g transform="translate(86, -42)" filter="url(#c1-seal-shadow)">
              {/* Ribbon Tails */}
              <path d="M -8 18 L -14 36 L -5 32 L 2 36 L -2 18 Z" fill="#00419e" />
              <path d="M 6 18 L 1 36 L 8 32 L 15 36 L 10 18 Z" fill="#003580" />
              {/* Rosette Outer Scallop Circle */}
              <circle cx="0" cy="8" r="16" fill="#0056d2" />
              <circle cx="0" cy="8" r="13" fill="#00419e" />
              {/* Rosette Inner Emblem Checkmark */}
              <circle cx="0" cy="8" r="9" fill="#0056d2" />
              <path
                d="M -3.5 8 L -0.5 11 L 4.5 5.5"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  // Course 2: Market Sizing & Opportunity Analysis (Emerald & Aqua, Excel-style 3D tile & chart motif)
  if (courseNum === 2) {
    return (
      <div className="relative w-full h-full min-h-[210px] overflow-hidden select-none bg-[#011711]">
        <svg
          viewBox="0 0 360 225"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c2-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#01140e" />
              <stop offset="50%" stopColor="#033827" />
              <stop offset="100%" stopColor="#011912" />
            </linearGradient>

            <radialGradient id="c2-glow" cx="50%" cy="46%" r="62%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#059669" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#01140e" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="c2-tile-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            <filter id="c2-tile-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#01100b" floodOpacity="0.65" />
            </filter>
          </defs>

          {/* Background & Ambient Emerald Glow */}
          <rect width="360" height="225" fill="url(#c2-bg-grad)" />
          <circle cx="180" cy="112" r="115" fill="url(#c2-glow)" />

          {/* Top Left: Spreadsheet Grid Icon (like Microsoft Excel card) */}
          <g transform="translate(52, 38)" stroke="#6ee7b7" strokeWidth="1.6" opacity="0.65">
            <rect x="0" y="0" width="28" height="22" rx="3.5" fill="#047857" fillOpacity="0.35" />
            <line x1="9" y1="0" x2="9" y2="22" />
            <line x1="18" y1="0" x2="18" y2="22" />
            <line x1="0" y1="11" x2="28" y2="11" />
          </g>

          {/* Top Right: Multi-bar Growth Chart */}
          <g transform="translate(280, 36)" fill="#6ee7b7" opacity="0.65">
            <rect x="0" y="16" width="5" height="12" rx="1.5" />
            <rect x="8" y="9" width="5" height="19" rx="1.5" fill="#34d399" />
            <rect x="16" y="2" width="5" height="26" rx="1.5" fill="#a7f3d0" />
          </g>

          {/* Upward Trending Market Curve with Nodes */}
          <path
            d="M 35 178 Q 130 170 180 120 T 325 58"
            stroke="#a7f3d0"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="45" cy="176" r="3.5" fill="#34d399" />
          <circle cx="115" cy="168" r="3.5" fill="#34d399" />
          <circle cx="180" cy="120" r="4.5" fill="#ffffff" />
          <circle cx="250" cy="85" r="3.5" fill="#34d399" />
          <circle cx="318" cy="62" r="4.5" fill="#ffffff" />

          {/* Center 3D Excel-style Green Tile with TAM / Sizing Motif */}
          <g transform="translate(180, 112)" filter="url(#c2-tile-shadow)">
            {/* Tile Body */}
            <rect
              x="-36"
              y="-36"
              width="72"
              height="72"
              rx="18"
              fill="url(#c2-tile-grad)"
              stroke="#6ee7b7"
              strokeWidth="1.5"
            />
            {/* Top Gloss Highlight */}
            <path
              d="M -34 -20 C -34 -30 -26 -34 -16 -34 L 16 -34 C 26 -34 34 -30 34 -20 C 20 -20 5 -12 -34 -20 Z"
              fill="#ffffff"
              fillOpacity="0.25"
            />
            {/* Center Sizing Lettermark */}
            <text
              x="0"
              y="8"
              fill="#ffffff"
              fontSize="21"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.8"
            >
              TAM
            </text>
          </g>

          {/* Mathematical Sigma Symbol in Bottom Right (Coursera Excel reference) */}
          <text
            x="276"
            y="196"
            fill="#a7f3d0"
            fontSize="30"
            fontWeight="600"
            opacity="0.8"
            fontFamily="serif"
          >
            ∑
          </text>

          {/* Dollar Symbol in Bottom Left */}
          <text
            x="58"
            y="194"
            fill="#34d399"
            fontSize="24"
            fontWeight="700"
            opacity="0.75"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            $
          </text>
        </svg>
      </div>
    );
  }

  // Course 3: Full-Stack Cloud Development (Violet & Magenta, OpenAI/Prompt Engineering flower motif)
  if (courseNum === 3) {
    return (
      <div className="relative w-full h-full min-h-[210px] overflow-hidden select-none bg-[#140322]">
        <svg
          viewBox="0 0 360 225"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c3-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10021c" />
              <stop offset="45%" stopColor="#430752" />
              <stop offset="100%" stopColor="#25053b" />
            </linearGradient>

            <radialGradient id="c3-glow" cx="50%" cy="46%" r="62%">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#9333ea" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10021c" stopOpacity="0" />
            </radialGradient>

            <filter id="c3-flower-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Background & Ambient Violet-Magenta Glow */}
          <rect width="360" height="225" fill="url(#c3-bg-grad)" />
          <circle cx="180" cy="112" r="115" fill="url(#c3-glow)" />

          {/* Bottom Left: Code Tag Bracket < > (exact Coursera prompt engineering motif) */}
          <g
            transform="translate(54, 182)"
            stroke="#f0abfc"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          >
            <path d="M 8 0 L 0 7 L 8 14" />
            <path d="M 16 0 L 24 7 L 16 14" />
          </g>

          {/* Top Right: AI Sparkle Brain Icon (exact Coursera reference motif) */}
          <g transform="translate(285, 36)" fill="#f0abfc" opacity="0.85">
            {/* Sparkle 4-point star */}
            <path d="M 12 0 Q 12 12 24 12 Q 12 12 12 24 Q 12 12 0 12 Q 12 12 12 0 Z" />
            <circle cx="2" cy="22" r="2" fill="#e879f9" />
          </g>

          {/* Harmonic Orbital Rings in Background */}
          <ellipse
            cx="180"
            cy="112"
            rx="115"
            ry="45"
            stroke="#c084fc"
            strokeWidth="1.2"
            opacity="0.3"
            transform="rotate(-18 180 112)"
          />
          <ellipse
            cx="180"
            cy="112"
            rx="115"
            ry="45"
            stroke="#f472b6"
            strokeWidth="1.2"
            opacity="0.25"
            transform="rotate(22 180 112)"
          />

          {/* Centerpiece: Symmetrical Luminous White OpenAI / Neural Flower Motif */}
          <g transform="translate(180, 112)" filter="url(#c3-flower-shadow)">
            {/* 6 Radial Symmetrical Petal Loops (Coursera Prompt Engineering Emblem) */}
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
              <path
                key={idx}
                d="M 0 0 C 14 -22, 34 -22, 36 -4 C 38 14, 20 28, 0 0 Z"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                transform={`rotate(${angle})`}
              />
            ))}
            {/* Inner Core Glow Orb */}
            <circle cx="0" cy="0" r="10" fill="#ffffff" />
            <circle cx="0" cy="0" r="6" fill="#a855f7" />
          </g>
        </svg>
      </div>
    );
  }

  // Course 4: Solution Design & MVP Building (Warm Sunset Amber & Coral, Mobile Prototype & Rocket motif)
  return (
    <div className="relative w-full h-full min-h-[210px] overflow-hidden select-none bg-[#1a0601]">
      <svg
        viewBox="0 0 360 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="c4-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#170501" />
            <stop offset="50%" stopColor="#4a1506" />
            <stop offset="100%" stopColor="#210802" />
          </linearGradient>

          <radialGradient id="c4-glow" cx="50%" cy="46%" r="62%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#c2410c" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#170501" stopOpacity="0" />
          </radialGradient>

          <filter id="c4-phone-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0d0300" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Background & Ambient Coral-Amber Glow */}
        <rect width="360" height="225" fill="url(#c4-bg-grad)" />
        <circle cx="180" cy="112" r="115" fill="url(#c4-glow)" />

        {/* Double Diamond Framework Geometry in Background */}
        <path
          d="M 50 112 L 105 75 L 160 112 L 105 149 Z"
          stroke="#fdba74"
          strokeWidth="1.2"
          opacity="0.3"
          fill="none"
        />
        <path
          d="M 200 112 L 255 75 L 310 112 L 255 149 Z"
          stroke="#fdba74"
          strokeWidth="1.2"
          opacity="0.3"
          fill="none"
        />

        {/* Bottom Left: User Journey Node Network */}
        <g transform="translate(52, 178)" stroke="#fdba74" strokeWidth="1.6" fill="none" opacity="0.8">
          <circle cx="6" cy="12" r="4" fill="#ea580c" />
          <circle cx="22" cy="4" r="4" fill="#f97316" />
          <circle cx="36" cy="14" r="4" fill="#fed7aa" />
          <line x1="10" y1="10" x2="18" y2="6" />
          <line x1="26" y1="6" x2="32" y2="12" />
        </g>

        {/* Top Right: Launch Rocket Trajectory */}
        <g transform="translate(285, 34)">
          <path
            d="M 14 0 C 20 6, 22 14, 20 20 L 16 18 L 12 22 L 8 18 L 4 20 C 2 14, 4 6, 10 0 Z"
            fill="#ea580c"
            stroke="#fde047"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="8" r="2.5" fill="#ffffff" />
          <path d="M 9 21 L 12 28 L 15 21 Z" fill="#facc15" />
        </g>

        {/* Centerpiece: 3D MVP Mobile Prototype Frame */}
        <g transform="translate(180, 112)" filter="url(#c4-phone-shadow)">
          {/* Phone Body */}
          <rect
            x="-34"
            y="-48"
            width="68"
            height="96"
            rx="14"
            fill="#1c1917"
            stroke="#fb923c"
            strokeWidth="1.6"
          />
          {/* Speaker / Notch */}
          <rect x="-9" y="-42" width="18" height="2.5" rx="1.2" fill="#7c2d12" />

          {/* Wireframe UI Header & Skeleton */}
          <rect x="-24" y="-32" width="34" height="5" rx="2" fill="#fbbf24" fillOpacity="0.9" />
          <rect x="-24" y="-22" width="48" height="3.5" rx="1.5" fill="#fdba74" fillOpacity="0.45" />
          <rect x="-24" y="-14" width="40" height="3.5" rx="1.5" fill="#fdba74" fillOpacity="0.3" />

          {/* MVP Interactive Card */}
          <rect x="-24" y="-5" width="48" height="24" rx="4.5" fill="#431407" stroke="#ea580c" strokeWidth="1" />
          <circle cx="-15" cy="7" r="4.5" fill="#f97316" />
          <line x1="-6" y1="4" x2="16" y2="4" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="-6" y1="10" x2="8" y2="10" stroke="#fdba74" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />

          {/* Primary Action Button */}
          <rect x="-24" y="24" width="48" height="12" rx="3.5" fill="#ea580c" />
          <text
            x="0"
            y="33"
            fill="#ffffff"
            fontSize="6.5"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
          >
            LAUNCH MVP
          </text>
        </g>
      </svg>
    </div>
  );
};
