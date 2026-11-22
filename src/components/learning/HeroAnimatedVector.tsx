import React from "react";
import { Link } from "react-router-dom";

/**
 * HeroAnimatedVector
 * Animated vector illustration with dynamic color-shifting gradients,
 * flowing harmonic waveforms, and interactive 3-stage founder pipeline nodes.
 * Replaces the static "Course Highlights" text box with a rich animated visual.
 */
export const HeroAnimatedVector: React.FC = () => {
  return (
    <div className="w-full lg:w-[440px] xl:w-[460px] shrink-0 select-none relative">
      <style>{`
        @keyframes heroVecColorMorph {
          0% {
            stop-color: #2563eb;
          }
          25% {
            stop-color: #06b6d4;
          }
          50% {
            stop-color: #10b981;
          }
          75% {
            stop-color: #8b5cf6;
          }
          100% {
            stop-color: #2563eb;
          }
        }
        @keyframes heroVecColorMorph2 {
          0% {
            stop-color: #8b5cf6;
          }
          25% {
            stop-color: #ec4899;
          }
          50% {
            stop-color: #3b82f6;
          }
          75% {
            stop-color: #06b6d4;
          }
          100% {
            stop-color: #8b5cf6;
          }
        }
        @keyframes heroLineDashFlow {
          0% {
            stroke-dashoffset: 60;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes heroPulseGlow {
          0%, 100% {
            opacity: 0.45;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.06);
          }
        }
        @keyframes heroNodeFloat1 {
          0%, 100% { transform: translate(75px, 35px); }
          50% { transform: translate(75px, 29px); }
        }
        @keyframes heroNodeFloat2 {
          0%, 100% { transform: translate(190px, 60px); }
          50% { transform: translate(190px, 66px); }
        }
        @keyframes heroNodeFloat3 {
          0%, 100% { transform: translate(305px, 35px); }
          50% { transform: translate(305px, 29px); }
        }
      `}</style>

      {/* Glassmorphic Container with Subtle Shimmer Border */}
      <div className="relative rounded-2xl bg-white/80 backdrop-blur-md border border-[#dae1ed] p-5 sm:p-6 shadow-xl overflow-hidden group">
        {/* Animated Changing Color Ambient Aura in Background */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-60 filter blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #38bdf8 0%, #818cf8 50%, transparent 70%)",
            animation: "heroPulseGlow 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-50 filter blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #34d399 0%, #38bdf8 50%, transparent 70%)",
            animation: "heroPulseGlow 10s ease-in-out infinite reverse",
          }}
        />

        {/* Top Header Label */}
        <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-[#dae1ed]/70">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0056d2] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0056d2]" />
            </span>
            <span className="text-[11px] font-bold tracking-[1px] uppercase text-[#0056d2]">
              FOUNDER CURRICULUM PIPELINE
            </span>
          </div>
          <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            3 Core Tracks
          </span>
        </div>

        {/* Interactive Dynamic SVG Pipeline Visualization */}
        <div className="relative z-10 my-4 h-[120px] w-full">
          <svg
            viewBox="0 0 380 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="hero-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="transition-colors duration-1000">
                  <animate
                    attributeName="stop-color"
                    values="#2563eb; #06b6d4; #10b981; #8b5cf6; #2563eb"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%">
                  <animate
                    attributeName="stop-color"
                    values="#06b6d4; #10b981; #8b5cf6; #ec4899; #06b6d4"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%">
                  <animate
                    attributeName="stop-color"
                    values="#8b5cf6; #ec4899; #2563eb; #06b6d4; #8b5cf6"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>

              <filter id="hero-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Ambient Waveform */}
            <path
              d="M 10 60 Q 95 15, 190 60 T 370 60"
              stroke="#dae1ed"
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.6"
            />

            {/* Glowing Animated Color-Changing Pipeline Path */}
            <path
              d="M 10 60 Q 95 15, 190 60 T 370 60"
              stroke="url(#hero-flow-grad)"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              filter="url(#hero-glow)"
            />

            {/* Animated Pulsing Energy Dashes */}
            <path
              d="M 10 60 Q 95 15, 190 60 T 370 60"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="8 16"
              fill="none"
              strokeLinecap="round"
              style={{ animation: "heroLineDashFlow 2.5s linear infinite" }}
            />

            {/* Stage 1 Node (Discovery) */}
            <g style={{ animation: "heroNodeFloat1 4s ease-in-out infinite" }}>
              <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="10" fill="#2563eb" fillOpacity="0.15" />
              <text x="0" y="4" fill="#2563eb" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                01
              </text>
              <circle cx="0" cy="0" r="20" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
            </g>

            {/* Stage 2 Node (Sizing) */}
            <g style={{ animation: "heroNodeFloat2 4.5s ease-in-out infinite" }}>
              <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="11" fill="#059669" fillOpacity="0.15" />
              <text x="0" y="4" fill="#059669" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                02
              </text>
              <circle cx="0" cy="0" r="22" stroke="#059669" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
            </g>

            {/* Stage 3 Node (Full-Stack) */}
            <g style={{ animation: "heroNodeFloat3 4.2s ease-in-out infinite" }}>
              <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="10" fill="#7c3aed" fillOpacity="0.15" />
              <text x="0" y="4" fill="#7c3aed" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                03
              </text>
              <circle cx="0" cy="0" r="20" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
            </g>
          </svg>
        </div>

        {/* 3 Interactive Pipeline Cards */}
        <div className="relative z-10 flex flex-col gap-2.5">
          {/* Track 1 */}
          <Link
            to="/learn/problem-discovery-and-validation"
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200/60 transition-all group/item no-underline text-inherit"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#0056d2] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                🔍
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-gray-900 group-hover/item:text-[#0056d2] transition-colors truncate">
                  Problem Discovery &amp; Validation
                </div>
                <div className="text-[11px] text-gray-500 truncate">
                  15 chapters · Pain Scoring · Mom Test
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#0056d2] shrink-0 ml-2 group-hover/item:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>

          {/* Track 2 */}
          <Link
            to="/learn/market-sizing-and-opportunity"
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-200/60 transition-all group/item no-underline text-inherit"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#059669] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                📊
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-gray-900 group-hover/item:text-[#059669] transition-colors truncate">
                  Market Sizing &amp; Opportunity
                </div>
                <div className="text-[11px] text-gray-500 truncate">
                  18 chapters · TAM, SAM, SOM · Unit Economics
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#059669] shrink-0 ml-2 group-hover/item:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>

          {/* Track 3 */}
          <Link
            to="/learn/full-stack-cloud-development"
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-purple-50/60 hover:bg-purple-100/70 border border-purple-200/60 transition-all group/item no-underline text-inherit"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#7c3aed] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                ☁️
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-gray-900 group-hover/item:text-[#7c3aed] transition-colors truncate">
                  Full-Stack Cloud Development
                </div>
                <div className="text-[11px] text-gray-500 truncate">
                  18 chapters · React 18 · Firestore · AI Copilots
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#7c3aed] shrink-0 ml-2 group-hover/item:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
