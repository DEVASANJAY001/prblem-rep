import React from "react";

interface ChapterCoverPatternProps {
  chapterNum: number;
  courseNum?: number;
  className?: string;
}

/**
 * ChapterCoverPattern
 * Generates simple, diverse vector line and curve patterns with vibrant mixed colors
 * to replace flat solid colors on chapter cards.
 */
export const ChapterCoverPattern: React.FC<ChapterCoverPatternProps> = ({
  chapterNum,
  courseNum = 1,
  className = "",
}) => {
  // Rotate through 8 distinct vector line & curve patterns
  const patternIndex = Math.abs(chapterNum) % 8;
  const uid = `ch-pat-${courseNum}-${chapterNum}`;

  return (
    <div
      className={`relative w-full h-[84px] sm:h-[90px] overflow-hidden select-none bg-[#0a0f1d] ${className}`}
    >
      <svg
        viewBox="0 0 340 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Universal Multi-Color Gradient Palette */}
          <linearGradient id={`${uid}-mc1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="35%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <linearGradient id={`${uid}-mc2`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="35%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>

          <linearGradient id={`${uid}-mc3`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <linearGradient id={`${uid}-gold-cyan`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <radialGradient id={`${uid}-glow`} cx="75%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#0a0f1d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Dark Base with soft glow */}
        <rect width="340" height="90" fill="#0b1120" />
        <rect width="340" height="90" fill={`url(#${uid}-glow)`} />

        {/* PATTERN 0: Mixed-Color Flowing Sine Waves */}
        {patternIndex === 0 && (
          <g>
            <path
              d="M 120 75 C 170 15, 210 100, 260 40 C 290 5, 320 60, 360 25"
              stroke={`url(#${uid}-mc1)`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 100 60 C 150 90, 200 10, 250 70 C 285 110, 315 20, 355 50"
              stroke={`url(#${uid}-mc2)`}
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.85"
              strokeLinecap="round"
            />
            <path
              d="M 140 30 C 190 70, 230 20, 280 85 C 310 120, 335 45, 365 70"
              stroke={`url(#${uid}-mc3)`}
              strokeWidth="1.5"
              fill="none"
              strokeOpacity="0.65"
            />
            <circle cx="260" cy="40" r="3.5" fill="#00f0ff" />
            <circle cx="250" cy="70" r="3" fill="#f43f5e" />
          </g>
        )}

        {/* PATTERN 1: Harmonic Sweeping Bezier Curves */}
        {patternIndex === 1 && (
          <g>
            <path
              d="M 80 90 Q 180 80, 250 35 T 350 10"
              stroke={`url(#${uid}-mc1)`}
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 100 90 Q 200 75, 265 45 T 350 25"
              stroke={`url(#${uid}-mc2)`}
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.8"
            />
            <path
              d="M 120 90 Q 220 70, 280 55 T 350 40"
              stroke={`url(#${uid}-mc3)`}
              strokeWidth="1.6"
              fill="none"
              strokeOpacity="0.65"
            />
            <path
              d="M 140 90 Q 240 65, 295 65 T 350 55"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              fill="none"
              strokeOpacity="0.5"
            />
            <circle cx="250" cy="35" r="4" fill="#a855f7" />
          </g>
        )}

        {/* PATTERN 2: Dynamic Diagonal Vector Lines & Mixed Rays */}
        {patternIndex === 2 && (
          <g>
            <line x1="160" y1="90" x2="270" y2="0" stroke={`url(#${uid}-mc1)`} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="190" y1="90" x2="300" y2="0" stroke={`url(#${uid}-mc2)`} strokeWidth="2" strokeOpacity="0.85" strokeLinecap="round" />
            <line x1="220" y1="90" x2="330" y2="0" stroke={`url(#${uid}-mc3)`} strokeWidth="1.6" strokeOpacity="0.7" strokeLinecap="round" />
            <line x1="250" y1="90" x2="360" y2="0" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
            {/* Cross Accent Arc */}
            <path
              d="M 170 20 Q 250 70, 340 30"
              stroke={`url(#${uid}-gold-cyan)`}
              strokeWidth="2"
              fill="none"
            />
            <circle cx="270" cy="53" r="3.5" fill="#fbbf24" />
          </g>
        )}

        {/* PATTERN 3: Topographical Multi-Color Contour Curves */}
        {patternIndex === 3 && (
          <g>
            <path
              d="M 110 80 Q 180 20, 240 65 T 350 20"
              stroke={`url(#${uid}-mc1)`}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 125 90 Q 195 30, 255 75 T 350 35"
              stroke={`url(#${uid}-mc2)`}
              strokeWidth="1.8"
              fill="none"
              strokeOpacity="0.8"
            />
            <path
              d="M 140 95 Q 210 40, 270 85 T 350 50"
              stroke={`url(#${uid}-mc3)`}
              strokeWidth="1.5"
              fill="none"
              strokeOpacity="0.65"
            />
            <path
              d="M 155 100 Q 225 50, 285 95 T 350 65"
              stroke="#06b6d4"
              strokeWidth="1.2"
              fill="none"
              strokeOpacity="0.45"
            />
            <circle cx="240" cy="65" r="3" fill="#38bdf8" />
          </g>
        )}

        {/* PATTERN 4: Concentric Vector Wave Arcs */}
        {patternIndex === 4 && (
          <g>
            <ellipse cx="320" cy="45" rx="140" ry="80" stroke={`url(#${uid}-mc1)`} strokeWidth="1.8" fill="none" strokeOpacity="0.5" />
            <ellipse cx="320" cy="45" rx="100" ry="58" stroke={`url(#${uid}-mc2)`} strokeWidth="2.2" fill="none" strokeOpacity="0.75" />
            <ellipse cx="320" cy="45" rx="64" ry="38" stroke={`url(#${uid}-mc3)`} strokeWidth="2" fill="none" strokeOpacity="0.85" />
            <ellipse cx="320" cy="45" rx="30" ry="18" stroke={`url(#${uid}-gold-cyan)`} strokeWidth="2.5" fill="none" />
            <circle cx="320" cy="45" r="4" fill="#38bdf8" />
          </g>
        )}

        {/* PATTERN 5: Intersecting Ribbon Waveforms */}
        {patternIndex === 5 && (
          <g>
            <path
              d="M 100 25 C 160 85, 220 5, 280 75 C 310 100, 330 30, 360 45"
              stroke={`url(#${uid}-mc2)`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 110 75 C 170 15, 230 95, 290 25 C 320 0, 340 70, 360 55"
              stroke={`url(#${uid}-mc1)`}
              strokeWidth="2.2"
              fill="none"
              strokeOpacity="0.85"
              strokeLinecap="round"
            />
            <circle cx="200" cy="48" r="3" fill="#a855f7" />
            <circle cx="290" cy="25" r="3.5" fill="#00f0ff" />
          </g>
        )}

        {/* PATTERN 6: Harmonic Equalizer & Wave Pulse Lines */}
        {patternIndex === 6 && (
          <g>
            <path
              d="M 120 45 L 180 45 L 205 18 L 225 72 L 245 28 L 265 60 L 285 45 L 350 45"
              stroke={`url(#${uid}-mc1)`}
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 140 45 L 190 45 L 210 28 L 230 62 L 250 35 L 270 52 L 290 45 L 350 45"
              stroke={`url(#${uid}-mc3)`}
              strokeWidth="1.6"
              fill="none"
              strokeOpacity="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="205" cy="18" r="3.5" fill="#00f0ff" />
            <circle cx="225" cy="72" r="3.5" fill="#ec4899" />
          </g>
        )}

        {/* PATTERN 7: Multi-Hue Streamlines Ribbon */}
        {patternIndex === 7 && (
          <g>
            <path
              d="M 90 85 C 160 80, 220 20, 350 15"
              stroke={`url(#${uid}-mc1)`}
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 105 87 C 175 82, 235 25, 350 25"
              stroke={`url(#${uid}-mc2)`}
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.85"
            />
            <path
              d="M 120 89 C 190 84, 250 30, 350 35"
              stroke={`url(#${uid}-mc3)`}
              strokeWidth="1.6"
              fill="none"
              strokeOpacity="0.7"
            />
            <path
              d="M 135 91 C 205 86, 265 35, 350 45"
              stroke={`url(#${uid}-gold-cyan)`}
              strokeWidth="1.2"
              fill="none"
              strokeOpacity="0.5"
            />
            <circle cx="250" cy="30" r="3" fill="#fbbf24" />
          </g>
        )}
      </svg>

      {/* Crystal-Clear Chapter Number & Title Overlay */}
      <div className="relative z-10 h-full p-3 sm:px-4 box-border flex flex-col justify-between pointer-events-none">
        <span className="text-[11px] sm:text-[12px] font-bold tracking-[1.5px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          CHAPTER
        </span>
        <span className="text-[34px] sm:text-[38px] font-black leading-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] tracking-tight">
          {chapterNum}
        </span>
      </div>
    </div>
  );
};
