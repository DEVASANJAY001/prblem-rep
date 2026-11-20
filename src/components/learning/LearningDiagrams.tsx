import React from "react";

interface DiagramProps {
  type: string;
}

export const LearningDiagram: React.FC<DiagramProps> = ({ type }) => {
  switch (type) {
    case "feedback-loop":
      return (
        <div className="w-full my-8 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <div className="text-xs uppercase font-bold text-primary tracking-widest mb-3 flex items-center justify-between">
            <span>Visual Concept Architecture</span>
            <span className="text-[11px] font-mono text-outline">FIGURE 1.1</span>
          </div>
          <svg viewBox="0 0 800 320" className="w-full h-auto text-on-surface" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Idea-First Path (Fragile) */}
            <g>
              <rect x="40" y="30" width="720" height="110" rx="16" fill="currentColor" fillOpacity="0.02" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="60" y="60" fill="#EF4444" fontSize="13" fontWeight="bold">Fragile Idea-First Cycle (42% Startup Failure Rate)</text>
              
              <rect x="60" y="80" width="160" height="42" rx="8" fill="#EF4444" fillOpacity="0.1" stroke="#EF4444" strokeWidth="1" />
              <text x="140" y="106" fill="#DC2626" fontSize="12" fontWeight="600" textAnchor="middle">Novel Tech / Idea</text>

              <path d="M 230 101 L 280 101" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow-red)" />

              <rect x="290" y="80" width="160" height="42" rx="8" fill="#EF4444" fillOpacity="0.1" stroke="#EF4444" strokeWidth="1" />
              <text x="370" y="106" fill="#DC2626" fontSize="12" fontWeight="600" textAnchor="middle">Build Product First</text>

              <path d="M 460 101 L 510 101" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow-red)" />

              <rect x="520" y="80" width="200" height="42" rx="8" fill="#EF4444" fillOpacity="0.15" stroke="#EF4444" strokeWidth="1.5" />
              <text x="620" y="106" fill="#B91C1C" fontSize="12" fontWeight="bold" textAnchor="middle">Hunt for Users (Collapse)</text>
            </g>

            {/* Problem-First Path (Verified Velocity) */}
            <g>
              <rect x="40" y="170" width="720" height="120" rx="16" fill="currentColor" fillOpacity="0.03" stroke="#2563EB" strokeWidth="2" />
              <text x="60" y="200" fill="#2563EB" fontSize="13" fontWeight="bold">Stuckhere Problem-First Cycle (High-Conversion Velocity)</text>
              
              <rect x="60" y="220" width="150" height="48" rx="8" fill="#2563EB" fillOpacity="0.1" stroke="#2563EB" strokeWidth="1" />
              <text x="135" y="242" fill="#1D4ED8" fontSize="12" fontWeight="700" textAnchor="middle">Operator Friction</text>
              <text x="135" y="258" fill="#3B82F6" fontSize="10" textAnchor="middle">Documented Loss</text>

              <path d="M 220 244 L 260 244" stroke="#2563EB" strokeWidth="2" />

              <rect x="270" y="220" width="140" height="48" rx="8" fill="#2563EB" fillOpacity="0.1" stroke="#2563EB" strokeWidth="1" />
              <text x="340" y="242" fill="#1D4ED8" fontSize="12" fontWeight="700" textAnchor="middle">Pain Score ≥ 80</text>
              <text x="340" y="258" fill="#3B82F6" fontSize="10" textAnchor="middle">Verified Workaround</text>

              <path d="M 420 244 L 460 244" stroke="#2563EB" strokeWidth="2" />

              <rect x="470" y="220" width="130" height="48" rx="8" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1" />
              <text x="535" y="242" fill="#047857" fontSize="12" fontWeight="700" textAnchor="middle">Signed LOI / WTP</text>
              <text x="535" y="258" fill="#059669" fontSize="10" textAnchor="middle">Pilot Agreed</text>

              <path d="M 610 244 L 640 244" stroke="#10B981" strokeWidth="2" />

              <rect x="650" y="220" width="90" height="48" rx="8" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
              <text x="695" y="249" fill="#065F46" fontSize="12" fontWeight="bold" textAnchor="middle">Scale Code</text>
            </g>
          </svg>
          <p className="mt-3 text-xs text-on-surface-variant text-center">
            Comparing the high-risk solution-first loop vs. the verified problem-first customer validation loop.
          </p>
        </div>
      );

    case "severity-ladder":
      return (
        <div className="w-full my-8 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <div className="text-xs uppercase font-bold text-primary tracking-widest mb-3 flex items-center justify-between">
            <span>Problem Severity Pyramid</span>
            <span className="text-[11px] font-mono text-outline">FIGURE 2.1</span>
          </div>
          <svg viewBox="0 0 800 300" className="w-full h-auto text-on-surface" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 5 Levels Staircase */}
            <g transform="translate(60, 20)">
              {/* Level 1 */}
              <rect x="0" y="210" width="120" height="60" rx="8" fill="currentColor" fillOpacity="0.05" stroke="#94A3B8" strokeWidth="1.5" />
              <text x="60" y="235" fill="currentColor" fontSize="11" fontWeight="bold" textAnchor="middle">Level 1</text>
              <text x="60" y="252" fill="#64748B" fontSize="10" textAnchor="middle">Nuisance (Free)</text>

              {/* Level 2 */}
              <rect x="140" y="165" width="120" height="105" rx="8" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1.5" />
              <text x="200" y="195" fill="#2563EB" fontSize="11" fontWeight="bold" textAnchor="middle">Level 2</text>
              <text x="200" y="212" fill="#2563EB" fontSize="10" textAnchor="middle">Workflow Drag</text>
              <text x="200" y="230" fill="#60A5FA" fontSize="9" textAnchor="middle">$10–$50/mo</text>

              {/* Level 3 */}
              <rect x="280" y="120" width="120" height="150" rx="8" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1.5" />
              <text x="340" y="150" fill="#D97706" fontSize="11" fontWeight="bold" textAnchor="middle">Level 3</text>
              <text x="340" y="167" fill="#D97706" fontSize="10" textAnchor="middle">Compliance Risk</text>
              <text x="340" y="185" fill="#B45309" fontSize="9" textAnchor="middle">$10k–$50k/yr</text>

              {/* Level 4 */}
              <rect x="420" y="70" width="120" height="200" rx="8" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2" />
              <text x="480" y="100" fill="#059669" fontSize="11" fontWeight="bold" textAnchor="middle">Level 4</text>
              <text x="480" y="117" fill="#059669" fontSize="10" textAnchor="middle">Direct Cash Leak</text>
              <text x="480" y="135" fill="#047857" fontSize="9" textAnchor="middle">High WTP</text>

              {/* Level 5 */}
              <rect x="560" y="20" width="120" height="250" rx="8" fill="#EF4444" fillOpacity="0.12" stroke="#EF4444" strokeWidth="2" />
              <text x="620" y="50" fill="#DC2626" fontSize="11" fontWeight="bold" textAnchor="middle">Level 5</text>
              <text x="620" y="67" fill="#DC2626" fontSize="10" textAnchor="middle">Fatal Outage</text>
              <text x="620" y="85" fill="#B91C1C" fontSize="9" textAnchor="middle">Inelastic Budget</text>
            </g>
          </svg>
          <p className="mt-3 text-xs text-on-surface-variant text-center">
            As problem severity advances from Level 1 to Level 5, sales cycle friction decreases and contract values expand exponentially.
          </p>
        </div>
      );

    case "tam-funnel":
      return (
        <div className="w-full my-8 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <div className="text-xs uppercase font-bold text-primary tracking-widest mb-3 flex items-center justify-between">
            <span>Bottom-Up TAM Unit Economics Funnel</span>
            <span className="text-[11px] font-mono text-outline">FIGURE 5.1</span>
          </div>
          <svg viewBox="0 0 800 240" className="w-full h-auto text-on-surface" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(50, 20)">
              {/* Outer TAM Box */}
              <rect x="0" y="0" width="700" height="55" rx="10" fill="#3B82F6" fillOpacity="0.08" stroke="#3B82F6" strokeWidth="1.5" />
              <text x="350" y="28" fill="#1D4ED8" fontSize="13" fontWeight="bold" textAnchor="middle">Total Addressable Market (TAM) = Total Qualified Buyer Entities × Annual WTP</text>
              <text x="350" y="44" fill="#3B82F6" fontSize="10" textAnchor="middle">e.g. 45,000 Verified Rural Clinics × $12,000/yr ACV = $540,000,000</text>

              {/* Inner SAM Box */}
              <rect x="80" y="70" width="540" height="55" rx="10" fill="#10B981" fillOpacity="0.08" stroke="#10B981" strokeWidth="1.5" />
              <text x="350" y="98" fill="#047857" fontSize="13" fontWeight="bold" textAnchor="middle">Serviceable Addressable Market (SAM) = Geographic & Technical Reach</text>
              <text x="350" y="114" fill="#059669" fontSize="10" textAnchor="middle">Clinics with cloud-enabled EHR integration capacity (35% = $189,000,000)</text>

              {/* Inner SOM Box */}
              <rect x="160" y="140" width="380" height="55" rx="10" fill="#8B5CF6" fillOpacity="0.08" stroke="#8B5CF6" strokeWidth="1.5" />
              <text x="350" y="168" fill="#6D28D9" fontSize="13" fontWeight="bold" textAnchor="middle">Serviceable Obtainable Market (SOM) = Year 1–3 Target</text>
              <text x="350" y="184" fill="#7C3AED" fontSize="10" textAnchor="middle">Realistic 250 enterprise contracts won via pilot integrations ($3,000,000 ARR)</text>
            </g>
          </svg>
        </div>
      );

    case "pain-formula":
      return (
        <div className="w-full my-8 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <div className="text-xs uppercase font-bold text-primary tracking-widest mb-3 flex items-center justify-between">
            <span>Pain Score Algorithmic Weighting</span>
            <span className="text-[11px] font-mono text-outline">FIGURE 6.1</span>
          </div>
          <svg viewBox="0 0 800 200" className="w-full h-auto text-on-surface" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(40, 20)">
              {/* Recurrence Frequency */}
              <rect x="0" y="20" width="165" height="110" rx="12" fill="#2563EB" fillOpacity="0.08" stroke="#2563EB" strokeWidth="2" />
              <text x="82" y="55" fill="#1D4ED8" fontSize="24" fontWeight="black" textAnchor="middle">30%</text>
              <text x="82" y="80" fill="#1E40AF" fontSize="12" fontWeight="bold" textAnchor="middle">Recurrence (F)</text>
              <text x="82" y="100" fill="#6B7280" fontSize="10" textAnchor="middle">Daily / Hourly Crisis</text>

              {/* Economic Severity */}
              <rect x="185" y="20" width="165" height="110" rx="12" fill="#DC2626" fillOpacity="0.08" stroke="#DC2626" strokeWidth="2" />
              <text x="267" y="55" fill="#B91C1C" fontSize="24" fontWeight="black" textAnchor="middle">30%</text>
              <text x="267" y="80" fill="#991B1B" fontSize="12" fontWeight="bold" textAnchor="middle">Severity (S)</text>
              <text x="267" y="100" fill="#6B7280" fontSize="10" textAnchor="middle">Revenue / Fines</text>

              {/* Workaround Failure */}
              <rect x="370" y="20" width="165" height="110" rx="12" fill="#D97706" fillOpacity="0.08" stroke="#D97706" strokeWidth="2" />
              <text x="452" y="55" fill="#B45309" fontSize="24" fontWeight="black" textAnchor="middle">25%</text>
              <text x="452" y="80" fill="#92400E" fontSize="12" fontWeight="bold" textAnchor="middle">Workaround (W)</text>
              <text x="452" y="100" fill="#6B7280" fontSize="10" textAnchor="middle">Excel / Manual Drift</text>

              {/* Urgency */}
              <rect x="555" y="20" width="165" height="110" rx="12" fill="#059669" fillOpacity="0.08" stroke="#059669" strokeWidth="2" />
              <text x="637" y="55" fill="#047857" fontSize="24" fontWeight="black" textAnchor="middle">15%</text>
              <text x="637" y="80" fill="#065F46" fontSize="12" fontWeight="bold" textAnchor="middle">Urgency (U)</text>
              <text x="637" y="100" fill="#6B7280" fontSize="10" textAnchor="middle">Allocated Budget</text>
            </g>
          </svg>
        </div>
      );

    case "nosql-schema":
      return (
        <div className="w-full my-8 p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
          <div className="text-xs uppercase font-bold text-primary tracking-widest mb-3 flex items-center justify-between">
            <span>NoSQL Denormalization Architecture</span>
            <span className="text-[11px] font-mono text-outline">FIGURE 8.1</span>
          </div>
          <svg viewBox="0 0 800 240" className="w-full h-auto text-on-surface" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(60, 20)">
              {/* Problem Doc */}
              <rect x="0" y="10" width="280" height="180" rx="12" fill="#2563EB" fillOpacity="0.05" stroke="#2563EB" strokeWidth="1.5" />
              <rect x="0" y="10" width="280" height="35" rx="12" fill="#2563EB" fillOpacity="0.15" />
              <text x="20" y="33" fill="#1D4ED8" fontSize="12" fontWeight="bold">Collection: problems/{'{problemId}'}</text>
              <text x="20" y="65" fill="currentColor" fontSize="11" fontFamily="monospace">id: "prob-149"</text>
              <text x="20" y="85" fill="currentColor" fontSize="11" fontFamily="monospace">title: "Cold-chain excursion..."</text>
              <text x="20" y="105" fill="currentColor" fontSize="11" fontFamily="monospace">painScore: 92</text>
              <text x="20" y="130" fill="#059669" fontSize="11" fontFamily="monospace" fontWeight="bold">// Denormalized Author Data:</text>
              <text x="20" y="150" fill="#059669" fontSize="11" fontFamily="monospace">authorName: "Dr. Sarah Lin"</text>
              <text x="20" y="170" fill="#059669" fontSize="11" fontFamily="monospace">authorAvatar: "https://..."</text>

              {/* Arrow */}
              <path d="M 300 100 L 390 100" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
              <text x="345" y="90" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="middle">0 Extra Reads</text>

              {/* Benefit Box */}
              <rect x="410" y="25" width="270" height="150" rx="12" fill="#10B981" fillOpacity="0.05" stroke="#10B981" strokeWidth="1.5" />
              <text x="430" y="55" fill="#047857" fontSize="13" fontWeight="bold">Performance & Cost Impact</text>
              <text x="430" y="85" fill="#065F46" fontSize="11">• Eliminates N+1 relational query loops</text>
              <text x="430" y="105" fill="#065F46" fontSize="11">• 25 problems rendered in 1 roundtrip read</text>
              <text x="430" y="125" fill="#065F46" fontSize="11">• Keeps client under Firebase free tier</text>
              <text x="430" y="145" fill="#065F46" fontSize="11">• Instant client-side card render</text>
            </g>
          </svg>
        </div>
      );

    default:
      return (
        <div className="w-full my-6 p-4 rounded-xl bg-surface-container border border-outline-variant/30 text-center text-xs text-on-surface-variant font-mono">
          [System Architecture Diagram: {type}]
        </div>
      );
  }
};
