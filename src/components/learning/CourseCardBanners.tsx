import React from "react";

interface CourseCardBannerProps {
  courseNum: number;
}

/**
 * CourseCardBanner
 * High-end, stunning vector artwork with animated color-changing ambient lighting,
 * rich 3D glassmorphic elements, and laser-precise technical graphics:
 * - Course 1: Holographic Discovery Radar Lens & Golden Validation Seal
 * - Course 2: 3D Isometric TAM Market Matrix & Exponential Growth Curve
 * - Course 3: Cosmic Cloud Architecture Nexus & Orbital Microservices Engine
 */
export const CourseCardBanner: React.FC<CourseCardBannerProps> = ({ courseNum }) => {
  // Course 1: Problem Discovery & Validation (Deep Royal Navy & Electric Cyan)
  if (courseNum === 1) {
    return (
      <div className="relative w-full h-[142px] sm:h-[150px] overflow-hidden select-none bg-[#050e1f]">
        <style>{`
          @keyframes c1AuroraShift {
            0% { stop-color: #003bcb; }
            33% { stop-color: #0284c7; }
            66% { stop-color: #2563eb; }
            100% { stop-color: #003bcb; }
          }
          @keyframes c1RadarSweep {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes c1PulseBeacon {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.15); }
          }
        `}</style>
        <svg
          viewBox="0 0 360 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c1-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#040914" />
              <stop offset="50%" stopColor="#0a1936" />
              <stop offset="100%" stopColor="#071224" />
            </linearGradient>

            <radialGradient id="c1-aurora" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4">
                <animate attributeName="stop-color" values="#38bdf8;#60a5fa;#818cf8;#00f0ff;#38bdf8" dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="60%" stopColor="#003bcb" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#040914" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="c1-gold-seal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            <filter id="c1-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep Space Navy Base */}
          <rect width="360" height="150" fill="url(#c1-bg-grad)" />
          <circle cx="180" cy="75" r="110" fill="url(#c1-aurora)" />

          {/* Isometric Perspective Grid Lines */}
          <g stroke="#1e3a8a" strokeWidth="0.8" strokeOpacity="0.28">
            <line x1="0" y1="130" x2="360" y2="130" />
            <line x1="0" y1="105" x2="360" y2="105" />
            <line x1="0" y1="80" x2="360" y2="80" />
            <line x1="60" y1="0" x2="140" y2="150" />
            <line x1="120" y1="0" x2="200" y2="150" />
            <line x1="240" y1="0" x2="160" y2="150" />
            <line x1="300" y1="0" x2="220" y2="150" />
          </g>

          {/* Flowing Harmonic Contour Ribbon (Left to Right) */}
          <path
            d="M -20 110 C 80 50, 140 130, 240 40 C 290 -5, 330 60, 380 30"
            stroke="#00f0ff"
            strokeWidth="2.5"
            strokeOpacity="0.85"
            fill="none"
            strokeLinecap="round"
            filter="url(#c1-soft-glow)"
          />
          <path
            d="M -20 125 C 80 65, 140 145, 240 55 C 290 10, 330 75, 380 45"
            stroke="#3b82f6"
            strokeWidth="1.8"
            strokeOpacity="0.6"
            fill="none"
            strokeLinecap="round"
          />

          {/* Center 3D Holographic Discovery Radar Lens */}
          <g transform="translate(180, 75)">
            {/* Outer Concentric Radar Rings */}
            <circle cx="0" cy="0" r="54" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="42" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.45" />
            <circle cx="0" cy="0" r="28" stroke="#93c5fd" strokeWidth="1.8" strokeOpacity="0.65" />
            <circle cx="0" cy="0" r="14" fill="#003bcb" fillOpacity="0.4" stroke="#00f0ff" strokeWidth="2" />

            {/* Rotating Radar Sweep Beam */}
            <g style={{ transformOrigin: "0px 0px", animation: "c1RadarSweep 6s linear infinite" }}>
              <line x1="0" y1="0" x2="40" y2="-30" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" filter="url(#c1-soft-glow)" />
              <polygon points="0,0 42,-34 32,-42" fill="#00f0ff" fillOpacity="0.22" />
              <circle cx="40" cy="-30" r="4" fill="#ffffff" />
            </g>

            {/* Crosshair Coordinates */}
            <line x1="-58" y1="0" x2="58" y2="0" stroke="#60a5fa" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="0" y1="-58" x2="0" y2="58" stroke="#60a5fa" strokeWidth="0.8" strokeOpacity="0.4" />

            {/* Discovery Target Nodes */}
            <g transform="translate(-24, -20)">
              <circle cx="0" cy="0" r="4" fill="#fde047" />
              <circle cx="0" cy="0" r="8" stroke="#fde047" strokeWidth="1" strokeOpacity="0.5" />
            </g>
            <g transform="translate(28, 18)">
              <circle cx="0" cy="0" r="3.5" fill="#00f0ff" />
              <circle cx="0" cy="0" r="7" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.5" />
            </g>
          </g>

          {/* Floating Golden Validation Shield Crest (Top Right) */}
          <g transform="translate(290, 24)">
            <path
              d="M 16 0 L 32 6 C 32 20, 26 34, 16 40 C 6 34, 0 20, 0 6 Z"
              fill="#002d9c"
              stroke="url(#c1-gold-seal)"
              strokeWidth="2"
            />
            {/* Checkmark inside shield */}
            <path d="M 10 18 L 14 23 L 23 13" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* Compass Rose Coordinates on Left */}
          <g transform="translate(36, 32)" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.7">
            <circle cx="12" cy="12" r="10" fill="none" strokeDasharray="3 3" />
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <polygon points="12,2 14,8 10,8" fill="#38bdf8" />
          </g>
        </svg>
      </div>
    );
  }

  // Course 2: Market Sizing & Opportunity Analysis (Emerald Green & Ocean Mint)
  if (courseNum === 2) {
    return (
      <div className="relative w-full h-[142px] sm:h-[150px] overflow-hidden select-none bg-[#021f18]">
        <style>{`
          @keyframes c2SparkleGrowth {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.3); opacity: 1; }
          }
          @keyframes c2PillarFloat {
            0%, 100% { transform: translate(55px, 105px); }
            50% { transform: translate(55px, 100px); }
          }
        `}</style>
        <svg
          viewBox="0 0 360 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="c2-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#01140f" />
              <stop offset="50%" stopColor="#033527" />
              <stop offset="100%" stopColor="#011b15" />
            </linearGradient>

            <radialGradient id="c2-aurora" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45">
                <animate attributeName="stop-color" values="#10b981;#34d399;#06b6d4;#22c55e;#10b981" dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="60%" stopColor="#047857" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#01140f" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="c2-curve-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="c2-gold-growth" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>

            <filter id="c2-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep Forest Base */}
          <rect width="360" height="150" fill="url(#c2-bg-grad)" />
          <circle cx="180" cy="75" r="110" fill="url(#c2-aurora)" />

          {/* Isometric Financial Perspective Floor Grid */}
          <g stroke="#065f46" strokeWidth="0.8" strokeOpacity="0.4">
            <line x1="0" y1="125" x2="360" y2="125" />
            <line x1="0" y1="100" x2="360" y2="100" />
            <line x1="0" y1="75" x2="360" y2="75" />
            <line x1="40" y1="150" x2="140" y2="50" />
            <line x1="100" y1="150" x2="200" y2="50" />
            <line x1="160" y1="150" x2="260" y2="50" />
            <line x1="220" y1="150" x2="320" y2="50" />
          </g>

          {/* 3D Isometric Opportunity Pillars (TAM / SAM / SOM) Grounded on Grid */}
          <g style={{ animation: "c2PillarFloat 5s ease-in-out infinite" }}>
            {/* Pillar 1: SOM */}
            <g transform="translate(0, 0)">
              <rect x="0" y="-22" width="22" height="32" rx="3" fill="#047857" stroke="#34d399" strokeWidth="1" />
              <ellipse cx="11" cy="-22" rx="11" ry="5" fill="#10b981" stroke="#34d399" strokeWidth="1" />
              <text x="11" y="-5" fill="#ffffff" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SOM</text>
            </g>

            {/* Pillar 2: SAM */}
            <g transform="translate(34, -14)">
              <rect x="0" y="-32" width="24" height="46" rx="3" fill="#059669" stroke="#34d399" strokeWidth="1.2" />
              <ellipse cx="12" cy="-32" rx="12" ry="6" fill="#34d399" stroke="#a7f3d0" strokeWidth="1.2" />
              <text x="12" y="-10" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SAM</text>
            </g>

            {/* Pillar 3: TAM (Grandest) */}
            <g transform="translate(70, -32)">
              <rect x="0" y="-44" width="28" height="64" rx="4" fill="#047857" stroke="#6ee7b7" strokeWidth="1.5" />
              <ellipse cx="14" cy="-44" rx="14" ry="7" fill="#6ee7b7" stroke="#ffffff" strokeWidth="1.5" />
              <text x="14" y="-16" fill="#064e3b" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">TAM</text>
            </g>
          </g>

          {/* Exponential Growth Curve Ascending Across Market */}
          <path
            d="M 50 120 Q 140 115, 200 80 T 320 22"
            fill="none"
            stroke="url(#c2-gold-growth)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#c2-soft-glow)"
          />
          <path
            d="M 50 120 Q 140 115, 200 80 T 320 22 L 320 135 L 50 135 Z"
            fill="url(#c2-curve-fill)"
          />

          {/* Sparkling Summit Star on Curve Apex */}
          <g transform="translate(320, 22)">
            <circle cx="0" cy="0" r="5" fill="#fde047" style={{ animation: "c2SparkleGrowth 2s ease-in-out infinite" }} />
            <circle cx="0" cy="0" r="9" stroke="#fde047" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Greek Sigma (∑) and Dollar Sign Multipliers */}
          <text x="250" y="125" fill="#34d399" fontSize="24" fontWeight="800" fillOpacity="0.75" fontFamily="serif">∑</text>
          <text x="285" y="115" fill="#fde047" fontSize="18" fontWeight="800" fillOpacity="0.85" fontFamily="sans-serif">$</text>
        </svg>
      </div>
    );
  }

  // Course 3: Full-Stack Cloud Development (Cosmic Violet, Magenta & Electric Blue)
  return (
    <div className="relative w-full h-[142px] sm:h-[150px] overflow-hidden select-none bg-[#120726]">
      <style>{`
        @keyframes c3ConstellationSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes c3DataStreamFlow {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes c3CorePulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.12); opacity: 1; }
        }
      `}</style>
      <svg
        viewBox="0 0 360 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="c3-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0b0318" />
            <stop offset="50%" stopColor="#25084a" />
            <stop offset="100%" stopColor="#0e0420" />
          </linearGradient>

          <radialGradient id="c3-aurora" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.5">
              <animate attributeName="stop-color" values="#c084fc;#ec4899;#38bdf8;#a855f7;#c084fc" dur="10s" repeatCount="indefinite" />
            </stop>
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0b0318" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="c3-laser-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <filter id="c3-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Deep Cosmic Violet Base */}
        <rect width="360" height="150" fill="url(#c3-bg-grad)" />
        <circle cx="180" cy="75" r="110" fill="url(#c3-aurora)" />

        {/* Cyber Network Grid Matrix */}
        <g stroke="#4c1d95" strokeWidth="0.8" strokeOpacity="0.35">
          <line x1="0" y1="125" x2="360" y2="125" />
          <line x1="0" y1="95" x2="360" y2="95" />
          <line x1="0" y1="65" x2="360" y2="65" />
          <circle cx="70" cy="95" r="1.5" fill="#a855f7" />
          <circle cx="140" cy="125" r="1.5" fill="#38bdf8" />
          <circle cx="230" cy="65" r="1.5" fill="#ec4899" />
          <circle cx="290" cy="95" r="1.5" fill="#c084fc" />
        </g>

        {/* Intersecting Laser Waveform Streams */}
        <path
          d="M -10 115 Q 100 20, 200 90 T 370 30"
          stroke="url(#c3-laser-grad)"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
          filter="url(#c3-soft-glow)"
        />
        <path
          d="M -10 115 Q 100 20, 200 90 T 370 30"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeDasharray="6 14"
          fill="none"
          strokeLinecap="round"
          style={{ animation: "c3DataStreamFlow 2s linear infinite" }}
        />

        {/* Center 3D Cloud Architecture Nexus */}
        <g transform="translate(180, 75)">
          {/* Orbital Acceleration Rings */}
          <g style={{ transformOrigin: "0px 0px", animation: "c3ConstellationSpin 16s linear infinite" }}>
            <ellipse cx="0" cy="0" rx="58" ry="24" stroke="#c084fc" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
            <circle cx="58" cy="0" r="3.5" fill="#38bdf8" />
            <circle cx="-58" cy="0" r="3.5" fill="#ec4899" />
          </g>
          <g style={{ transformOrigin: "0px 0px", animation: "c3ConstellationSpin 12s linear infinite reverse" }}>
            <ellipse cx="0" cy="0" rx="46" ry="36" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 4" fill="none" />
            <circle cx="0" cy="36" r="3.5" fill="#f43f5e" />
          </g>

          {/* Central Glowing Hexagonal CPU / Cloud Core */}
          <g style={{ transformOrigin: "0px 0px", animation: "c3CorePulse 3s ease-in-out infinite" }}>
            <polygon
              points="0,-18 16,-9 16,9 0,18 -16,9 -16,-9"
              fill="#2e1065"
              stroke="#00f0ff"
              strokeWidth="2"
              filter="url(#c3-soft-glow)"
            />
            {/* Cloud Icon Glyph Inside Hexagon */}
            <path
              d="M -7 4 C -9 4, -11 2, -11 0 C -11 -2, -9 -3, -7 -3 C -7 -6, -3 -8, 0 -6 C 2 -8, 6 -7, 6 -4 C 8 -4, 9 -2, 9 0 C 9 3, 7 4, 5 4 Z"
              fill="#ffffff"
            />
          </g>
        </g>

        {/* Illuminated Code Brackets Icon on Left `< / >` */}
        <g transform="translate(42, 28)" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="8,0 2,7 8,14" />
          <line x1="12" y1="14" x2="16" y2="0" stroke="#c084fc" />
          <polyline points="20,0 26,7 20,14" />
        </g>

        {/* Glowing Neural AI Copilot Node on Right */}
        <g transform="translate(294, 28)" stroke="#ec4899" strokeWidth="1.8" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="4" fill="#ec4899" filter="url(#c3-soft-glow)" />
          <path d="M 12 2 L 12 6 M 12 18 L 12 22 M 2 12 L 6 12 M 18 12 L 22 12" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
