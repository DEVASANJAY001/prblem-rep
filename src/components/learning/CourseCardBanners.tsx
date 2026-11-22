import React from "react";

interface CourseCardBannerProps {
  courseNum: number;
  isSelected?: boolean;
}

/**
 * CourseCardBanner
 * High-end minimalist vector artwork following a unified, standard theme design across all courses.
 * Features smooth harmonic vector wave curves, mixed-color gradients, and ambient glow.
 */
export const CourseCardBanner: React.FC<CourseCardBannerProps> = ({
  courseNum,
  isSelected = false,
}) => {
  // Course 1: Problem Discovery & Validation (Theme: Cobalt / Royal Blue & Cyan)
  if (courseNum === 1) {
    return (
      <div className="relative w-full h-[120px] sm:h-[128px] overflow-hidden select-none bg-[#0a1226]">
        <svg
          viewBox="0 0 380 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#080e1e" />
              <stop offset="45%" stopColor="#002d9c" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>

            <linearGradient id="c1-ribbon-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>

            <linearGradient id="c1-ribbon-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            <radialGradient id="c1-ambient" cx="80%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#080e1e" stopOpacity="0" />
            </radialGradient>

            <pattern id="c1-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#ffffff" fillOpacity="0.08" />
            </pattern>
          </defs>

          {/* Background & Ambient Glow */}
          <rect width="380" height="128" fill="url(#c1-bg)" />
          <rect width="380" height="128" fill="url(#c1-ambient)" />
          <rect width="380" height="128" fill="url(#c1-dots)" />

          {/* Flowing Harmonic Vector Waves & Curves */}
          <path
            d="M 150 128 C 210 100, 240 20, 310 40 C 345 50, 365 25, 390 10"
            stroke="url(#c1-ribbon-1)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 130 115 C 190 85, 230 10, 295 28 C 340 40, 360 80, 390 65"
            stroke="url(#c1-ribbon-2)"
            strokeWidth="2.2"
            fill="none"
            strokeOpacity="0.85"
            strokeLinecap="round"
          />
          <path
            d="M 160 128 C 220 110, 260 40, 325 58 C 355 68, 370 50, 390 40"
            stroke="#93c5fd"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
            strokeOpacity="0.45"
          />

          {/* Elegant Accent Nodes */}
          <circle cx="310" cy="40" r="4.5" fill="#00f0ff" />
          <circle cx="310" cy="40" r="9" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="295" cy="28" r="3.5" fill="#818cf8" />

          {/* Left Branding Typography */}
          <g transform="translate(20, 22)">
            <rect width="78" height="20" rx="5" fill="#ffffff" fillOpacity="0.14" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
            <text x="8" y="14" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="1.2" fontFamily="sans-serif">
              COURSE 1
            </text>
            <text x="0" y="44" fill="#ffffff" fontSize="16" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.3">
              Problem Discovery
            </text>
            <text x="0" y="62" fill="#bfdbfe" fontSize="12" fontWeight="600" fontFamily="sans-serif">
              &amp; Validation
            </text>
          </g>
        </svg>

        {/* Selection Status Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {isSelected ? (
            <span className="text-[11px] font-bold bg-white text-[#003bcb] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003bcb] animate-pulse" />
              Active
            </span>
          ) : (
            <span className="text-[10px] font-medium bg-black/30 text-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
              15 Chapters
            </span>
          )}
        </div>
      </div>
    );
  }

  // Course 2: Market Sizing & Opportunity Analysis (Theme: Emerald Teal & Ocean Cyan)
  if (courseNum === 2) {
    return (
      <div className="relative w-full h-[120px] sm:h-[128px] overflow-hidden select-none bg-[#041f20]">
        <svg
          viewBox="0 0 380 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#021a1b" />
              <stop offset="45%" stopColor="#0b6b83" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>

            <linearGradient id="c2-ribbon-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="c2-ribbon-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>

            <radialGradient id="c2-ambient" cx="80%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#021a1b" stopOpacity="0" />
            </radialGradient>

            <pattern id="c2-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="#ffffff" fillOpacity="0.08" />
            </pattern>
          </defs>

          {/* Background & Ambient Glow */}
          <rect width="380" height="128" fill="url(#c2-bg)" />
          <rect width="380" height="128" fill="url(#c2-ambient)" />
          <rect width="380" height="128" fill="url(#c2-dots)" />

          {/* Flowing Harmonic Vector Waves & Curves */}
          <path
            d="M 150 128 C 210 100, 240 20, 310 40 C 345 50, 365 25, 390 10"
            stroke="url(#c2-ribbon-1)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 130 115 C 190 85, 230 10, 295 28 C 340 40, 360 80, 390 65"
            stroke="url(#c2-ribbon-2)"
            strokeWidth="2.2"
            fill="none"
            strokeOpacity="0.85"
            strokeLinecap="round"
          />
          <path
            d="M 160 128 C 220 110, 260 40, 325 58 C 355 68, 370 50, 390 40"
            stroke="#99f6e4"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
            strokeOpacity="0.45"
          />

          {/* Elegant Accent Nodes */}
          <circle cx="310" cy="40" r="4.5" fill="#2dd4bf" />
          <circle cx="310" cy="40" r="9" stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="295" cy="28" r="3.5" fill="#38bdf8" />

          {/* Left Branding Typography */}
          <g transform="translate(20, 22)">
            <rect width="78" height="20" rx="5" fill="#ffffff" fillOpacity="0.14" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
            <text x="8" y="14" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="1.2" fontFamily="sans-serif">
              COURSE 2
            </text>
            <text x="0" y="44" fill="#ffffff" fontSize="16" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.3">
              Market Sizing
            </text>
            <text x="0" y="62" fill="#ccfbf1" fontSize="12" fontWeight="600" fontFamily="sans-serif">
              &amp; Opportunity
            </text>
          </g>
        </svg>

        {/* Selection Status Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {isSelected ? (
            <span className="text-[11px] font-bold bg-white text-[#0b6b83] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0b6b83] animate-pulse" />
              Active
            </span>
          ) : (
            <span className="text-[10px] font-medium bg-black/30 text-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
              18 Chapters
            </span>
          )}
        </div>
      </div>
    );
  }

  // Course 3: Full-Stack Cloud Development (Theme: Royal Violet / Indigo & Electric Blue)
  return (
    <div className="relative w-full h-[120px] sm:h-[128px] overflow-hidden select-none bg-[#0f1226]">
      <svg
        viewBox="0 0 380 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="c3-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a0a1a" />
            <stop offset="45%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>

          <linearGradient id="c3-ribbon-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <linearGradient id="c3-ribbon-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#00f0ff" />
          </linearGradient>

          <radialGradient id="c3-ambient" cx="80%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0a0a1a" stopOpacity="0" />
          </radialGradient>

          <pattern id="c3-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#ffffff" fillOpacity="0.08" />
          </pattern>
        </defs>

        {/* Background & Ambient Glow */}
        <rect width="380" height="128" fill="url(#c3-bg)" />
        <rect width="380" height="128" fill="url(#c3-ambient)" />
        <rect width="380" height="128" fill="url(#c3-dots)" />

        {/* Flowing Harmonic Vector Waves & Curves */}
        <path
          d="M 150 128 C 210 100, 240 20, 310 40 C 345 50, 365 25, 390 10"
          stroke="url(#c3-ribbon-1)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 130 115 C 190 85, 230 10, 295 28 C 340 40, 360 80, 390 65"
          stroke="url(#c3-ribbon-2)"
          strokeWidth="2.2"
          fill="none"
          strokeOpacity="0.85"
          strokeLinecap="round"
        />
        <path
          d="M 160 128 C 220 110, 260 40, 325 58 C 355 68, 370 50, 390 40"
          stroke="#c7d2fe"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          strokeOpacity="0.45"
        />

        {/* Elegant Accent Nodes */}
        <circle cx="310" cy="40" r="4.5" fill="#a855f7" />
        <circle cx="310" cy="40" r="9" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="295" cy="28" r="3.5" fill="#00f0ff" />

        {/* Left Branding Typography */}
        <g transform="translate(20, 22)">
          <rect width="78" height="20" rx="5" fill="#ffffff" fillOpacity="0.14" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
          <text x="8" y="14" fill="#ffffff" fontSize="9.5" fontWeight="800" letterSpacing="1.2" fontFamily="sans-serif">
            COURSE 3
          </text>
          <text x="0" y="44" fill="#ffffff" fontSize="16" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.3">
            Full-Stack Cloud
          </text>
          <text x="0" y="62" fill="#c7d2fe" fontSize="12" fontWeight="600" fontFamily="sans-serif">
            Development
          </text>
        </g>
      </svg>

      {/* Selection Status Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        {isSelected ? (
          <span className="text-[11px] font-bold bg-white text-[#4f46e5] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] animate-pulse" />
            Active
          </span>
        ) : (
          <span className="text-[10px] font-medium bg-black/30 text-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
            18 Chapters
          </span>
        )}
      </div>
    </div>
  );
};
