import React from "react";

interface CourseCardBannerProps {
  courseNum: number;
}

/**
 * CourseCardBanner
 * Simple, static, elegant vector illustrations (no animated video/spinning effects).
 * Designed for the inner rounded-corner cut container (occupying 65-70% of the card).
 */
export const CourseCardBanner: React.FC<CourseCardBannerProps> = ({ courseNum }) => {
  // Course 1: Problem Discovery & Validation (Royal Navy & Sapphire)
  if (courseNum === 1) {
    return (
      <div className="relative w-full h-full min-h-[220px] overflow-hidden select-none bg-[#050e1f]">
        <svg
          viewBox="0 0 360 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c1-static-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#040914" />
              <stop offset="50%" stopColor="#0a1d3d" />
              <stop offset="100%" stopColor="#061226" />
            </linearGradient>

            <radialGradient id="c1-static-glow" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#003bcb" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#040914" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="c1-static-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            <filter id="c1-static-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background & Ambient Glow */}
          <rect width="360" height="240" fill="url(#c1-static-bg)" />
          <circle cx="180" cy="115" r="115" fill="url(#c1-static-glow)" />

          {/* Perspective Grid Accent */}
          <g stroke="#1e3a8a" strokeWidth="0.8" strokeOpacity="0.25">
            <line x1="0" y1="200" x2="360" y2="200" />
            <line x1="0" y1="165" x2="360" y2="165" />
            <line x1="0" y1="130" x2="360" y2="130" />
            <line x1="60" y1="0" x2="140" y2="240" />
            <line x1="140" y1="0" x2="190" y2="240" />
            <line x1="220" y1="0" x2="170" y2="240" />
            <line x1="300" y1="0" x2="220" y2="240" />
          </g>

          {/* Flowing Harmonic Contour Ribbon */}
          <path
            d="M -20 170 C 80 80, 140 190, 240 70 C 290 10, 330 90, 380 50"
            stroke="#00f0ff"
            strokeWidth="2.5"
            strokeOpacity="0.75"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M -20 188 C 80 98, 140 208, 240 88 C 290 28, 330 108, 380 68"
            stroke="#3b82f6"
            strokeWidth="1.8"
            strokeOpacity="0.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Center Discovery Radar Lens */}
          <g transform="translate(180, 115)" filter="url(#c1-static-shadow)">
            <circle cx="0" cy="0" r="64" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="50" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="0" cy="0" r="34" stroke="#93c5fd" strokeWidth="1.8" strokeOpacity="0.6" />
            <circle cx="0" cy="0" r="18" fill="#003bcb" fillOpacity="0.45" stroke="#00f0ff" strokeWidth="2" />

            {/* Crosshair Coordinates */}
            <line x1="-70" y1="0" x2="70" y2="0" stroke="#60a5fa" strokeWidth="0.8" strokeOpacity="0.35" />
            <line x1="0" y1="-70" x2="0" y2="70" stroke="#60a5fa" strokeWidth="0.8" strokeOpacity="0.35" />

            {/* Sweep Ray & Target Nodes */}
            <line x1="0" y1="0" x2="48" y2="-36" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="48" cy="-36" r="4.5" fill="#ffffff" />
            <circle cx="-28" cy="-24" r="3.5" fill="#fde047" />
            <circle cx="32" cy="22" r="3" fill="#00f0ff" />
          </g>

          {/* Validation Shield Crest on Top Right */}
          <g transform="translate(290, 26)">
            <path
              d="M 16 0 L 32 6 C 32 20, 26 34, 16 40 C 6 34, 0 20, 0 6 Z"
              fill="#002d9c"
              stroke="url(#c1-static-gold)"
              strokeWidth="2"
            />
            <path d="M 10 18 L 14 23 L 23 13" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Course Badge in Top Left */}
          <g transform="translate(20, 24)">
            <rect width="84" height="24" rx="6" fill="#003bcb" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1" />
            <text x="42" y="16" fill="#ffffff" fontSize="10.5" fontWeight="800" textAnchor="middle" letterSpacing="1" fontFamily="sans-serif">
              COURSE 1
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // Course 2: Market Sizing & Opportunity Analysis (Emerald & Aqua)
  if (courseNum === 2) {
    return (
      <div className="relative w-full h-full min-h-[220px] overflow-hidden select-none bg-[#021f18]">
        <svg
          viewBox="0 0 360 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c2-static-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#01140f" />
              <stop offset="50%" stopColor="#033829" />
              <stop offset="100%" stopColor="#011b15" />
            </linearGradient>

            <radialGradient id="c2-static-glow" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#047857" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#01140f" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="c2-static-curve-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="c2-static-growth" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>

          {/* Background & Ambient Glow */}
          <rect width="360" height="240" fill="url(#c2-static-bg)" />
          <circle cx="180" cy="115" r="115" fill="url(#c2-static-glow)" />

          {/* Isometric Perspective Floor Grid */}
          <g stroke="#065f46" strokeWidth="0.8" strokeOpacity="0.35">
            <line x1="0" y1="200" x2="360" y2="200" />
            <line x1="0" y1="165" x2="360" y2="165" />
            <line x1="0" y1="130" x2="360" y2="130" />
            <line x1="40" y1="240" x2="160" y2="100" />
            <line x1="120" y1="240" x2="230" y2="100" />
            <line x1="200" y1="240" x2="300" y2="100" />
          </g>

          {/* 3D Isometric Opportunity Pillars (SOM, SAM, TAM) */}
          <g transform="translate(60, 160)">
            {/* Pillar 1: SOM */}
            <g transform="translate(0, 0)">
              <rect x="0" y="-30" width="26" height="42" rx="3" fill="#047857" stroke="#34d399" strokeWidth="1" />
              <ellipse cx="13" cy="-30" rx="13" ry="6" fill="#10b981" stroke="#34d399" strokeWidth="1" />
              <text x="13" y="-8" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SOM</text>
            </g>

            {/* Pillar 2: SAM */}
            <g transform="translate(42, -18)">
              <rect x="0" y="-42" width="28" height="60" rx="3" fill="#059669" stroke="#34d399" strokeWidth="1.2" />
              <ellipse cx="14" cy="-42" rx="14" ry="7" fill="#34d399" stroke="#a7f3d0" strokeWidth="1.2" />
              <text x="14" y="-12" fill="#ffffff" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SAM</text>
            </g>

            {/* Pillar 3: TAM */}
            <g transform="translate(86, -40)">
              <rect x="0" y="-56" width="32" height="82" rx="4" fill="#047857" stroke="#6ee7b7" strokeWidth="1.5" />
              <ellipse cx="16" cy="-56" rx="16" ry="8" fill="#6ee7b7" stroke="#ffffff" strokeWidth="1.5" />
              <text x="16" y="-18" fill="#064e3b" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">TAM</text>
            </g>
          </g>

          {/* Exponential Growth Curve Ascending Across Market */}
          <path
            d="M 50 180 Q 150 170, 210 115 T 325 36"
            fill="none"
            stroke="url(#c2-static-growth)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 50 180 Q 150 170, 210 115 T 325 36 L 325 210 L 50 210 Z"
            fill="url(#c2-static-curve-fill)"
          />

          {/* Golden Apex Star */}
          <g transform="translate(325, 36)">
            <circle cx="0" cy="0" r="5" fill="#fde047" />
            <circle cx="0" cy="0" r="10" stroke="#fde047" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Sigma and Dollar Multipliers */}
          <text x="245" y="195" fill="#34d399" fontSize="26" fontWeight="800" fillOpacity="0.75" fontFamily="serif">∑</text>
          <text x="285" y="180" fill="#fde047" fontSize="20" fontWeight="800" fillOpacity="0.85" fontFamily="sans-serif">$</text>

          {/* Course Badge in Top Left */}
          <g transform="translate(20, 24)">
            <rect width="84" height="24" rx="6" fill="#059669" fillOpacity="0.8" stroke="#34d399" strokeWidth="1" />
            <text x="42" y="16" fill="#ffffff" fontSize="10.5" fontWeight="800" textAnchor="middle" letterSpacing="1" fontFamily="sans-serif">
              COURSE 2
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // Course 3: Full-Stack Cloud Development (Cosmic Violet & Indigo)
  return (
    <div className="relative w-full h-full min-h-[220px] overflow-hidden select-none bg-[#120726]">
      <svg
        viewBox="0 0 360 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="c3-static-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b0318" />
            <stop offset="50%" stopColor="#220743" />
            <stop offset="100%" stopColor="#0e0420" />
          </linearGradient>

          <radialGradient id="c3-static-glow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0b0318" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="c3-static-laser" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Background & Ambient Glow */}
        <rect width="360" height="240" fill="url(#c3-static-bg)" />
        <circle cx="180" cy="115" r="115" fill="url(#c3-static-glow)" />

        {/* Cyber Network Grid Matrix */}
        <g stroke="#4c1d95" strokeWidth="0.8" strokeOpacity="0.3">
          <line x1="0" y1="200" x2="360" y2="200" />
          <line x1="0" y1="155" x2="360" y2="155" />
          <line x1="0" y1="110" x2="360" y2="110" />
          <circle cx="70" cy="155" r="2" fill="#a855f7" />
          <circle cx="150" cy="200" r="2" fill="#38bdf8" />
          <circle cx="230" cy="110" r="2" fill="#ec4899" />
          <circle cx="300" cy="155" r="2" fill="#c084fc" />
        </g>

        {/* Intersecting Laser Waveform Streams */}
        <path
          d="M -10 180 Q 100 50, 200 145 T 370 60"
          stroke="url(#c3-static-laser)"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Center 3D Cloud Architecture Nexus */}
        <g transform="translate(180, 115)">
          {/* Orbital Acceleration Rings */}
          <ellipse cx="0" cy="0" rx="68" ry="28" stroke="#c084fc" strokeWidth="1.2" strokeOpacity="0.45" fill="none" />
          <circle cx="68" cy="0" r="4" fill="#38bdf8" />
          <circle cx="-68" cy="0" r="4" fill="#ec4899" />
          <ellipse cx="0" cy="0" rx="54" ry="42" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4 4" fill="none" />
          <circle cx="0" cy="42" r="3.5" fill="#f43f5e" />

          {/* Central Hexagonal Cloud Core */}
          <polygon
            points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"
            fill="#2e1065"
            stroke="#00f0ff"
            strokeWidth="2.2"
          />
          {/* Cloud Icon Inside Hexagon */}
          <path
            d="M -8 5 C -10 5, -12 3, -12 1 C -12 -1, -10 -2, -8 -2 C -8 -5, -4 -7, 0 -5 C 2 -7, 7 -6, 7 -3 C 9 -3, 10 -1, 10 1 C 10 4, 8 5, 6 5 Z"
            fill="#ffffff"
          />
        </g>

        {/* Code Brackets on Left `< / >` */}
        <g transform="translate(42, 34)" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="8,0 2,7 8,14" />
          <line x1="12" y1="14" x2="16" y2="0" stroke="#c084fc" />
          <polyline points="20,0 26,7 20,14" />
        </g>

        {/* Neural AI Copilot Node on Right */}
        <g transform="translate(290, 34)" stroke="#ec4899" strokeWidth="1.8" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="4" fill="#ec4899" />
          <path d="M 12 2 L 12 6 M 12 18 L 12 22 M 2 12 L 6 12 M 18 12 L 22 12" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Course Badge in Top Left */}
        <g transform="translate(20, 24)">
          <rect width="84" height="24" rx="6" fill="#7c3aed" fillOpacity="0.8" stroke="#c084fc" strokeWidth="1" />
          <text x="42" y="16" fill="#ffffff" fontSize="10.5" fontWeight="800" textAnchor="middle" letterSpacing="1" fontFamily="sans-serif">
            COURSE 3
          </text>
        </g>
      </svg>
    </div>
  );
};
