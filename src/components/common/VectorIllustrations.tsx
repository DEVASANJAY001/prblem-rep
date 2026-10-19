import React from "react";

interface IllustrationProps {
  className?: string;
  size?: number | string;
}

/**
 * 404 / Not Found Vector Illustration
 * Theme: Modern geometric exploration with compass, floating problem cards, and orbital coordinates.
 * Cohesive with #f9f9ff / #ffffff / #1657FF theme.
 */
export const NotFoundIllustration: React.FC<IllustrationProps> = ({
  className = "w-64 h-48 mx-auto",
}) => {
  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Soft Ambient Background Glow */}
        <radialGradient id="nf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1657FF" stopOpacity="0.14" />
          <stop offset="60%" stopColor="#2554f0" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#1657FF" stopOpacity="0" />
        </radialGradient>

        {/* Card Gradient */}
        <linearGradient id="nf-card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#f3f3f9" stopOpacity="0.85" />
        </linearGradient>

        {/* Primary Accent Gradient */}
        <linearGradient id="nf-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2554f0" />
          <stop offset="100%" stopColor="#003bcb" />
        </linearGradient>

        {/* Secondary Rose/Coral Gradient */}
        <linearGradient id="nf-rose-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>

        {/* Emerald Glow */}
        <linearGradient id="nf-emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <filter id="nf-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1657FF" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Ambient Radial Mesh */}
      <circle cx="180" cy="120" r="110" fill="url(#nf-glow)" />

      {/* Orbital Discovery Ring */}
      <circle
        cx="180"
        cy="120"
        r="88"
        stroke="#c4c5d8"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        strokeOpacity="0.4"
      />
      <circle
        cx="180"
        cy="120"
        r="64"
        stroke="#1657FF"
        strokeWidth="1"
        strokeDasharray="2 4"
        strokeOpacity="0.25"
      />

      {/* Floating Constellation Nodes */}
      <circle cx="85" cy="65" r="3" fill="#1657FF" fillOpacity="0.4" />
      <circle cx="275" cy="75" r="2.5" fill="#1657FF" fillOpacity="0.35" />
      <circle cx="285" cy="165" r="3.5" fill="#006d3c" fillOpacity="0.3" />
      <circle cx="70" cy="160" r="2" fill="#ba1a1a" fillOpacity="0.3" />

      {/* Background Floating Card (Rotated slightly left) */}
      <g transform="translate(105, 52) rotate(-8)">
        <rect
          width="90"
          height="115"
          rx="14"
          fill="url(#nf-card-grad)"
          stroke="#e2e2e8"
          strokeWidth="1.2"
          filter="url(#nf-shadow)"
        />
        <rect x="12" y="14" width="36" height="5" rx="2.5" fill="#c4c5d8" fillOpacity="0.6" />
        <rect x="12" y="26" width="66" height="4" rx="2" fill="#e2e2e8" />
        <rect x="12" y="36" width="52" height="4" rx="2" fill="#e2e2e8" />
        <rect x="12" y="46" width="60" height="4" rx="2" fill="#e2e2e8" />
        <circle cx="20" cy="85" r="8" fill="#1657FF" fillOpacity="0.1" />
        <path d="M17 85L23 85" stroke="#1657FF" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Foreground Main Floating Card (Rotated slightly right) */}
      <g transform="translate(155, 65) rotate(6)">
        <rect
          width="96"
          height="122"
          rx="16"
          fill="#ffffff"
          stroke="#1657FF"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          filter="url(#nf-shadow)"
        />
        {/* Header accent pill */}
        <rect x="12" y="14" width="42" height="6" rx="3" fill="url(#nf-blue-grad)" />
        <circle cx="78" cy="17" r="3.5" fill="#2554f0" fillOpacity="0.25" />
        {/* Content lines */}
        <rect x="12" y="30" width="72" height="4" rx="2" fill="#c4c5d8" fillOpacity="0.7" />
        <rect x="12" y="40" width="58" height="4" rx="2" fill="#e2e2e8" />
        <rect x="12" y="50" width="68" height="4" rx="2" fill="#e2e2e8" />
        {/* Verification stamp */}
        <rect x="12" y="66" width="72" height="20" rx="6" fill="#f9f9ff" stroke="#c4c5d8" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="24" cy="76" r="4" fill="url(#nf-emerald-grad)" />
        <rect x="34" y="74" width="38" height="4" rx="2" fill="#434655" fillOpacity="0.5" />
        {/* Missing Dossier Watermark */}
        <circle cx="48" cy="104" r="7" fill="#fb7185" fillOpacity="0.15" />
        <path d="M45 101L51 107M51 101L45 107" stroke="#e11d48" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* Central 404 Badge */}
      <g transform="translate(125, 135)">
        <rect
          width="110"
          height="46"
          rx="14"
          fill="#ffffff"
          stroke="#1657FF"
          strokeWidth="2"
          filter="url(#nf-shadow)"
        />
        <text
          x="55"
          y="31"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="2"
          fill="url(#nf-blue-grad)"
        >
          404
        </text>
      </g>

      {/* Floating Sparkles & Geometrics */}
      <g transform="translate(255, 45)">
        <path
          d="M0 6C4 6 6 4 6 0C6 4 8 6 12 6C8 6 6 8 6 12C6 8 4 6 0 6Z"
          fill="url(#nf-blue-grad)"
        />
      </g>
      <g transform="translate(90, 115)">
        <path
          d="M0 4C3 4 4 3 4 0C4 3 5 4 8 4C5 4 4 5 4 8C4 5 3 4 0 4Z"
          fill="#34d399"
        />
      </g>
      <g transform="translate(265, 125)">
        <path
          d="M0 5C3.5 5 5 3.5 5 0C5 3.5 6.5 5 10 5C6.5 5 5 6.5 5 10C5 6.5 3.5 5 0 5Z"
          fill="#fb7185"
        />
      </g>
    </svg>
  );
};

/**
 * System Error / Exception Vector Illustration
 * Theme: Calibrated gear diagnostics, safety shield, telemetry radar, amber/indigo theme.
 */
export const ErrorGlitchIllustration: React.FC<IllustrationProps> = ({
  className = "w-64 h-48 mx-auto",
}) => {
  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Ambient Glow */}
        <radialGradient id="err-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.14" />
          <stop offset="60%" stopColor="#1657FF" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#1657FF" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="err-amber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="err-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2554f0" />
          <stop offset="100%" stopColor="#1657FF" />
        </linearGradient>

        <filter id="err-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#f59e0b" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Ambient background glow */}
      <circle cx="180" cy="120" r="105" fill="url(#err-glow)" />

      {/* Concentric Circuit Tracks */}
      <circle cx="180" cy="120" r="82" stroke="#c4c5d8" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.5" />
      <circle cx="180" cy="120" r="60" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="5 7" strokeOpacity="0.3" />

      {/* Circuit Nodes & Connectors */}
      <path d="M100 120 L135 120" stroke="#c4c5d8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="98" cy="120" r="3.5" fill="#1657FF" />
      <path d="M225 120 L260 120" stroke="#c4c5d8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="262" cy="120" r="3.5" fill="#f59e0b" />

      {/* Background Precision Gear (Light indigo) */}
      <g transform="translate(142, 82) scale(0.9)" opacity="0.35">
        <path
          d="M38 10L42 10L44 17L51 20L57 16L60 19L57 26L60 33L67 35L67 39L60 41L57 48L60 55L57 58L51 54L44 57L42 64L38 64L36 57L29 54L23 58L20 55L23 48L20 41L13 39L13 35L20 33L23 26L20 19L23 16L29 20L36 17Z"
          fill="#1657FF"
        />
        <circle cx="40" cy="37" r="14" fill="#ffffff" />
      </g>

      {/* Central Shield Container */}
      <g transform="translate(138, 68)" filter="url(#err-shadow)">
        <rect
          width="84"
          height="96"
          rx="22"
          fill="#ffffff"
          stroke="#f59e0b"
          strokeWidth="2"
        />

        {/* Warning Badge Interior */}
        <path
          d="M42 22 L64 62 L20 62 Z"
          fill="url(#err-amber)"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Exclamation Symbol */}
        <rect x="40.5" y="34" width="3" height="15" rx="1.5" fill="#ffffff" />
        <circle cx="42" cy="54" r="2" fill="#ffffff" />

        {/* Status Line */}
        <rect x="18" y="74" width="48" height="4" rx="2" fill="#c4c5d8" fillOpacity="0.6" />
        <rect x="26" y="82" width="32" height="4" rx="2" fill="#1657FF" fillOpacity="0.4" />
      </g>

      {/* Floating System Sparkles */}
      <g transform="translate(90, 75)">
        <path
          d="M0 5C3.5 5 5 3.5 5 0C5 3.5 6.5 5 10 5C6.5 5 5 6.5 5 10C5 6.5 3.5 5 0 5Z"
          fill="#f59e0b"
        />
      </g>
      <g transform="translate(260, 68)">
        <path
          d="M0 6C4 6 6 4 6 0C6 4 8 6 12 6C8 6 6 8 6 12C6 8 4 6 0 6Z"
          fill="url(#err-primary)"
        />
      </g>
    </svg>
  );
};

/**
 * Empty Search / Discovery Vector Illustration
 * Theme: Magnifying radar scanner, floating domain statements, constellation particles.
 * Seamlessly matches #f9f9ff / #ffffff / #1657FF theme.
 */
export const EmptySearchIllustration: React.FC<IllustrationProps> = ({
  className = "w-64 h-48 mx-auto",
}) => {
  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Soft Ambient Radial Glow */}
        <radialGradient id="es-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1657FF" stopOpacity="0.15" />
          <stop offset="65%" stopColor="#2554f0" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#1657FF" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="es-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2554f0" />
          <stop offset="100%" stopColor="#1657FF" />
        </linearGradient>

        <linearGradient id="es-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <filter id="es-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1657FF" floodOpacity="0.14" />
        </filter>
      </defs>

      {/* Ambient Radial Background */}
      <circle cx="180" cy="115" r="105" fill="url(#es-glow)" />

      {/* Radar Search Rings */}
      <circle cx="180" cy="115" r="85" stroke="#c4c5d8" strokeWidth="1.2" strokeDasharray="4 6" strokeOpacity="0.4" />
      <circle cx="180" cy="115" r="58" stroke="#1657FF" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.3" />
      <circle cx="180" cy="115" r="32" stroke="#1657FF" strokeWidth="0.8" strokeDasharray="2 4" strokeOpacity="0.25" />

      {/* Radar Sweep Cone */}
      <path
        d="M180 115 L245 60 A85 85 0 0 1 262 135 Z"
        fill="url(#es-blue)"
        fillOpacity="0.06"
      />

      {/* Floating Ghost Problem Cards (Dotted outline, searching) */}
      <g transform="translate(68, 55) rotate(-6)">
        <rect
          width="82"
          height="54"
          rx="12"
          fill="#ffffff"
          stroke="#c4c5d8"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeOpacity="0.8"
        />
        <rect x="10" y="12" width="30" height="5" rx="2.5" fill="#c4c5d8" fillOpacity="0.5" />
        <rect x="10" y="24" width="62" height="4" rx="2" fill="#e2e2e8" />
        <rect x="10" y="34" width="46" height="4" rx="2" fill="#e2e2e8" />
      </g>

      <g transform="translate(215, 125) rotate(5)">
        <rect
          width="86"
          height="58"
          rx="12"
          fill="#ffffff"
          stroke="#c4c5d8"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeOpacity="0.8"
        />
        <rect x="12" y="14" width="34" height="5" rx="2.5" fill="#38bdf8" fillOpacity="0.4" />
        <rect x="12" y="26" width="62" height="4" rx="2" fill="#e2e2e8" />
        <rect x="12" y="36" width="48" height="4" rx="2" fill="#e2e2e8" />
      </g>

      {/* Main Vector Magnifying Glass (Centerpiece) */}
      <g transform="translate(130, 65)" filter="url(#es-shadow)">
        {/* Glass Handle */}
        <path
          d="M66 66 L95 95"
          stroke="#1a1c20"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M74 74 L92 92"
          stroke="url(#es-blue)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Outer Ring */}
        <circle
          cx="42"
          cy="42"
          r="36"
          fill="#ffffff"
          stroke="url(#es-blue)"
          strokeWidth="5"
        />

        {/* Lens Inner Reflection */}
        <path
          d="M22 28 A24 24 0 0 1 54 18"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />
        <circle cx="58" cy="24" r="2.5" fill="#ffffff" />

        {/* Search Crosshair / Scanning reticle inside lens */}
        <circle cx="42" cy="42" r="14" stroke="#1657FF" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.5" />
        <path d="M42 22 L42 26M42 58 L42 62M22 42 L26 42M58 42 L62 42" stroke="#1657FF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="42" cy="42" r="3" fill="url(#es-blue)" />
      </g>

      {/* Floating Sparkles & Discoveries */}
      <g transform="translate(95, 140)">
        <path
          d="M0 6C4 6 6 4 6 0C6 4 8 6 12 6C8 6 6 8 6 12C6 8 4 6 0 6Z"
          fill="url(#es-blue)"
        />
      </g>
      <g transform="translate(250, 48)">
        <path
          d="M0 4C3 4 4 3 4 0C4 3 5 4 8 4C5 4 4 5 4 8C4 5 3 4 0 4Z"
          fill="#38bdf8"
        />
      </g>
      <g transform="translate(170, 185)">
        <circle cx="0" cy="0" r="3" fill="#1657FF" fillOpacity="0.4" />
      </g>
    </svg>
  );
};

/**
 * Empty Bookmarks / Saved Problems Vector Illustration
 * Theme: Elegant floating problem dossier with an elevated bookmark ribbon and orbital constellations.
 * Cohesive with #f9f9ff / #2554f0 / #1657FF palette.
 */
export const EmptyBookmarksIllustration: React.FC<IllustrationProps> = ({
  className = "w-64 h-48 mx-auto",
}) => {
  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="eb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2554f0" stopOpacity="0.14" />
          <stop offset="65%" stopColor="#1657FF" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#2554f0" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="eb-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2554f0" />
          <stop offset="100%" stopColor="#003bcb" />
        </linearGradient>

        <linearGradient id="eb-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <linearGradient id="eb-card" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#f3f3f9" stopOpacity="0.9" />
        </linearGradient>

        <filter id="eb-shadow" x="-15%" y="-15%" width="130%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#1657FF" floodOpacity="0.12" />
        </filter>
        <filter id="eb-bm-shadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#003bcb" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Ambient Radial Background */}
      <circle cx="180" cy="115" r="105" fill="url(#eb-glow)" />

      {/* Subtle Orbital Coordinates */}
      <circle cx="180" cy="115" r="88" stroke="#c4c5d8" strokeWidth="1.2" strokeDasharray="4 6" strokeOpacity="0.4" />
      <circle cx="180" cy="115" r="56" stroke="#2554f0" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.25" />

      {/* Background Secondary Floating Card */}
      <g transform="translate(85, 60) rotate(-6)">
        <rect
          width="110"
          height="80"
          rx="14"
          fill="#ffffff"
          fillOpacity="0.75"
          stroke="#e2e2e8"
          strokeWidth="1.2"
        />
        <rect x="14" y="18" width="40" height="6" rx="3" fill="#e2e2e8" />
        <rect x="14" y="32" width="80" height="4" rx="2" fill="#ededf3" />
        <rect x="14" y="42" width="60" height="4" rx="2" fill="#ededf3" />
      </g>

      {/* Main Centered Problem Dossier */}
      <g transform="translate(125, 48)" filter="url(#eb-shadow)">
        <rect
          width="125"
          height="130"
          rx="18"
          fill="url(#eb-card)"
          stroke="#c4c5d8"
          strokeWidth="1.4"
          strokeOpacity="0.6"
        />

        {/* Card Header Placeholder Elements */}
        <rect x="18" y="22" width="46" height="7" rx="3.5" fill="#2554f0" fillOpacity="0.18" />
        <rect x="18" y="38" width="88" height="6" rx="3" fill="#1a1c20" fillOpacity="0.75" />
        <rect x="18" y="50" width="70" height="6" rx="3" fill="#1a1c20" fillOpacity="0.55" />

        {/* Content Lines */}
        <rect x="18" y="68" width="88" height="4" rx="2" fill="#e2e2e8" />
        <rect x="18" y="78" width="80" height="4" rx="2" fill="#e2e2e8" />
        <rect x="18" y="88" width="55" height="4" rx="2" fill="#e2e2e8" />

        {/* Bottom Metrics Pill */}
        <rect x="18" y="104" width="38" height="12" rx="6" fill="#f3f3f9" stroke="#e2e2e8" strokeWidth="1" />
        <circle cx="26" cy="110" r="2.5" fill="#006d3c" />
        <rect x="32" y="108" width="18" height="4" rx="2" fill="#747687" />
      </g>

      {/* Elevated Signature Bookmark Ribbon Floating Over Card Top-Right */}
      <g transform="translate(205, 34)" filter="url(#eb-bm-shadow)">
        {/* Bookmark Ribbon */}
        <path
          d="M0 0 H38 V62 L19 50 L0 62 Z"
          fill="url(#eb-blue)"
        />
        {/* Inner subtle fold highlight */}
        <path
          d="M4 4 H34 V54 L19 44 L4 54 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />
        {/* Bookmark Star Centerpiece */}
        <path
          d="M19 18 L21.5 24.5 L28.5 24.5 L23 28.5 L25 35 L19 31 L13 35 L15 28.5 L9.5 24.5 L16.5 24.5 Z"
          fill="#ffffff"
        />
      </g>

      {/* Floating Sparkles & Accent Constellations */}
      <g transform="translate(70, 145)">
        <path
          d="M0 5C3.5 5 5 3.5 5 0C5 3.5 6.5 5 10 5C6.5 5 5 6.5 5 10C5 6.5 3.5 5 0 5Z"
          fill="url(#eb-blue)"
        />
      </g>
      <g transform="translate(275, 80)">
        <path
          d="M0 4C3 4 4 3 4 0C4 3 5 4 8 4C5 4 4 5 4 8C4 5 3 4 0 4Z"
          fill="#38bdf8"
        />
      </g>
      <circle cx="285" cy="155" r="3.5" fill="#1657FF" fillOpacity="0.3" />
      <circle cx="85" cy="45" r="2.5" fill="#38bdf8" fillOpacity="0.5" />
    </svg>
  );
};
