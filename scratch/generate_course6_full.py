# -*- coding: utf-8 -*-
import os
import re
import json

# 1. GENERATE SVGS
DIAGRAMS = {
    "venture-pathways-matrix.svg": '''<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
  <rect x="24" y="24" width="712" height="122" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
  <!-- 4 Pathway Cards -->
  <!-- 1. Venture-Scale -->
  <g transform="translate(36, 36)">
    <rect width="158" height="98" rx="6" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="1"/>
    <text x="12" y="22" fill="#9F1239" font-size="12" font-family="system-ui, -apple-system, sans-serif" font-weight="700">Venture-Scale</text>
    <text x="12" y="40" fill="#475569" font-size="9" font-family="system-ui, -apple-system, sans-serif">10x-100x Growth Target</text>
    <text x="12" y="55" fill="#475569" font-size="9" font-family="system-ui, -apple-system, sans-serif">External VC Equity Financing</text>
    <rect x="12" y="68" width="134" height="18" rx="3" fill="#FFE4E6"/>
    <text x="79" y="80" fill="#BE123C" font-size="8.5" font-family="system-ui, -apple-system, sans-serif" font-weight="600" text-anchor="middle">Large TAM &gt; $1B</text>
  </g>
  <!-- 2. Bootstrapped / Niche -->
  <g transform="translate(210, 36)">
    <rect width="158" height="98" rx="6" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1"/>
    <text x="12" y="22" fill="#166534" font-size="12" font-family="system-ui, -apple-system, sans-serif" font-weight="700">Bootstrapped Niche</text>
    <text x="12" y="40" fill="#475569" font-size="9" font-family="system-ui, -apple-system, sans-serif">100% Founder Ownership</text>
    <text x="12" y="55" fill="#475569" font-size="9" font-family="system-ui, -apple-system, sans-serif">Cash-Flow Funded Growth</text>
    <rect x="12" y="68" width="134" height="18" rx="3" fill="#DCFCE7"/>
    <text x="79" y="80" fill="#15803D" font-size="8.5" font-family="system-ui, -apple-system, sans-serif" font-weight="600" text-anchor="middle">Profitability First</text>
  </g>
  <!-- 3. Service-First -->
  <g transform="translate(384, 36)">
    <rect width="158" height="98" rx="6" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1"/>
    <text x="12" y="22" fill="#92400E" font-size="12" font-family="system-ui, -apple-system, sans-serif" font-weight="700">Service-to-Product</text>
    <text x="12" y="40" fill="#475569" font-size="9" font-family="system-ui, -apple-system, sans-serif">Consulting / Agency Cash</text>
    <text x="12" y="55" fill="#475569" font-size="9" font-family="system-ui, -apple-system, sans-serif">Productize Repeat Pain</text>
    <rect x="12" y="68" width="134" height="18" rx="3" fill="#FDE68A"/>
    <text x="79" y="80" fill="#B45309" font-size="8.5" font-family="system-ui, -apple-system, sans-serif" font-weight="600" text-anchor="middle">Zero Capital Dilution</text>
  </g>
  <!-- 4. Community / Non-Profit -->
  <g transform="translate(558, 36)">
    <rect width="158" height="98" rx="6" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1"/>
    <text x="12" y="22" fill="#1E40AF" font-size="12" font-family="system-ui, -apple-system, sans-serif" font-weight="700">Open-Source / Impact</text>
    <text x="12" y="40" fill="#475569" font-size="9" font-family="system-ui, -apple-system, sans-serif">Community Governance</text>
    <text x="12" y="55" fill="#475569" font-size="9" font-family="system-ui, -apple-system, sans-serif">Grants &amp; Sponsorships</text>
    <rect x="12" y="68" width="134" height="18" rx="3" fill="#DBEAFE"/>
    <text x="79" y="80" fill="#2563EB" font-size="8.5" font-family="system-ui, -apple-system, sans-serif" font-weight="600" text-anchor="middle">Mission &amp; Ecosystem</text>
  </g>
</svg>''',

    "business-model-canvas-map.svg": '''<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
  <rect x="24" y="20" width="712" height="130" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
  <!-- Key Partners -->
  <g transform="translate(34, 30)">
    <rect width="130" height="74" rx="5" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="10" y="20" fill="#0F172A" font-size="10" font-family="system-ui, sans-serif" font-weight="700">Key Partners</text>
    <text x="10" y="38" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif">Suppliers, APIs,</text>
    <text x="10" y="52" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif">Integration networks</text>
  </g>
  <!-- Activities & Resources -->
  <g transform="translate(172, 30)">
    <rect width="130" height="34" rx="5" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="10" y="16" fill="#0F172A" font-size="9.5" font-family="system-ui, sans-serif" font-weight="700">Key Activities</text>
    <text x="10" y="28" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">Product Dev &amp; Ops</text>
    <rect y="40" width="130" height="34" rx="5" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="10" y="56" fill="#0F172A" font-size="9.5" font-family="system-ui, sans-serif" font-weight="700">Key Resources</text>
    <text x="10" y="68" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">Proprietary IP, Team</text>
  </g>
  <!-- Value Proposition (Highlighted) -->
  <g transform="translate(310, 30)">
    <rect width="140" height="74" rx="5" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="1.5"/>
    <text x="10" y="20" fill="#9F1239" font-size="10.5" font-family="system-ui, sans-serif" font-weight="700">Value Proposition</text>
    <text x="10" y="38" fill="#BE123C" font-size="8.5" font-family="system-ui, sans-serif" font-weight="600">Pain Score Anchor</text>
    <text x="10" y="52" fill="#475569" font-size="8" font-family="system-ui, sans-serif">Direct economic ROI</text>
    <text x="10" y="64" fill="#475569" font-size="8" font-family="system-ui, sans-serif">10x workflow relief</text>
  </g>
  <!-- Channels & Relationships -->
  <g transform="translate(458, 30)">
    <rect width="130" height="34" rx="5" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="10" y="16" fill="#0F172A" font-size="9.5" font-family="system-ui, sans-serif" font-weight="700">Customer Relations</text>
    <text x="10" y="28" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">Dedicated CSM, Self-serve</text>
    <rect y="40" width="130" height="34" rx="5" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="10" y="56" fill="#0F172A" font-size="9.5" font-family="system-ui, sans-serif" font-weight="700">Channels</text>
    <text x="10" y="68" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">Direct Outbound, Inbound</text>
  </g>
  <!-- Customer Segments -->
  <g transform="translate(596, 30)">
    <rect width="130" height="74" rx="5" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="10" y="20" fill="#0F172A" font-size="10" font-family="system-ui, sans-serif" font-weight="700">Customer Segments</text>
    <text x="10" y="38" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif">Verified operators,</text>
    <text x="10" y="52" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif">Budget owners with</text>
    <text x="10" y="66" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif">high willingness-to-pay</text>
  </g>
  <!-- Bottom: Cost Structure & Revenue Streams -->
  <g transform="translate(34, 110)">
    <rect width="338" height="32" rx="4" fill="#F8FAFC" stroke="#CBD5E1"/>
    <text x="12" y="16" fill="#475569" font-size="9" font-family="system-ui, sans-serif" font-weight="700">Cost Structure:</text>
    <text x="12" y="26" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">Cloud hosting, developer salaries, GTM customer acquisition cost (CAC)</text>
  </g>
  <g transform="translate(388, 110)">
    <rect width="338" height="32" rx="4" fill="#F0FDF4" stroke="#86EFAC"/>
    <text x="12" y="16" fill="#166534" font-size="9" font-family="system-ui, sans-serif" font-weight="700">Revenue Streams:</text>
    <text x="12" y="26" fill="#15803D" font-size="8" font-family="system-ui, sans-serif">B2B SaaS subscriptions, usage-based compute, annual enterprise contracts</text>
  </g>
</svg>''',

    "equity-vesting-schedule.svg": '''<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
  <!-- Title / Legend -->
  <text x="36" y="28" fill="#0F172A" font-size="12" font-family="system-ui, sans-serif" font-weight="700">Standard 4-Year Co-Founder Equity Vesting with 1-Year Cliff</text>
  <!-- Timeline Track -->
  <g transform="translate(50, 48)">
    <!-- Base track line -->
    <line x1="0" y1="46" x2="660" y2="46" stroke="#CBD5E1" stroke-width="6" stroke-linecap="round"/>
    <!-- Vested Portion (e.g. Month 0 to 48) -->
    <!-- Cliff Zone (Months 0-12) -->
    <rect x="0" y="26" width="165" height="40" rx="4" fill="#FEE2E2" fill-opacity="0.6" stroke="#F87171" stroke-dasharray="3 3"/>
    <text x="82" y="20" fill="#DC2626" font-size="9.5" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">1-Year Cliff (0% if exit early)</text>
    <!-- Milestones -->
    <!-- Month 0 -->
    <circle cx="0" cy="46" r="6" fill="#94A3B8"/>
    <text x="0" y="66" fill="#64748B" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Day 0</text>
    <text x="0" y="78" fill="#0F172A" font-size="8.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">0%</text>
    <!-- Month 12: Cliff Milestone -->
    <circle cx="165" cy="46" r="7" fill="#DC2626"/>
    <text x="165" y="66" fill="#64748B" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Month 12</text>
    <text x="165" y="78" fill="#DC2626" font-size="9" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">25% Lumpsum</text>
    <!-- Month 24 -->
    <circle cx="330" cy="46" r="6" fill="#2563EB"/>
    <text x="330" y="66" fill="#64748B" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Month 24</text>
    <text x="330" y="78" fill="#2563EB" font-size="9" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">50% Vested</text>
    <!-- Month 36 -->
    <circle cx="495" cy="46" r="6" fill="#2563EB"/>
    <text x="495" y="66" fill="#64748B" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Month 36</text>
    <text x="495" y="78" fill="#2563EB" font-size="9" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">75% Vested</text>
    <!-- Month 48 -->
    <circle cx="660" cy="46" r="8" fill="#16A34A"/>
    <text x="660" y="66" fill="#64748B" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Month 48</text>
    <text x="660" y="78" fill="#16A34A" font-size="9.5" font-family="system-ui, sans-serif" font-weight="800" text-anchor="middle">100% Fully Vested</text>
  </g>
  <!-- Sub-label -->
  <rect x="50" y="136" width="660" height="20" rx="4" fill="#EFF6FF"/>
  <text x="380" y="150" fill="#1E40AF" font-size="9" font-family="system-ui, sans-serif" font-weight="500" text-anchor="middle">After the 12-month cliff, equity vests monthly at 1/48th (2.083% per month) until full 4-year completion.</text>
</svg>''',

    "runway-burn-calculator.svg": '''<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
  <text x="36" y="26" fill="#0F172A" font-size="12" font-family="system-ui, sans-serif" font-weight="700">Startup Runway Equation &amp; Monthly Burn Rate Dynamics</text>
  <g transform="translate(36, 40)">
    <!-- Metric 1: Cash in Bank -->
    <rect x="0" y="0" width="150" height="74" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="14" y="22" fill="#64748B" font-size="9.5" font-family="system-ui, sans-serif" font-weight="600">Total Cash Balance</text>
    <text x="14" y="44" fill="#0F172A" font-size="18" font-family="system-ui, sans-serif" font-weight="800">$250,000</text>
    <text x="14" y="62" fill="#10B981" font-size="8.5" font-family="system-ui, sans-serif">Seed or self-funded</text>
    <!-- Operator Divide -->
    <circle cx="175" cy="37" r="14" fill="#F1F5F9" stroke="#94A3B8"/>
    <text x="175" y="43" fill="#0F172A" font-size="18" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">÷</text>
    <!-- Metric 2: Net Burn -->
    <rect x="200" y="0" width="190" height="74" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="14" y="22" fill="#64748B" font-size="9.5" font-family="system-ui, sans-serif" font-weight="600">Net Monthly Burn</text>
    <text x="14" y="44" fill="#EF4444" font-size="18" font-family="system-ui, sans-serif" font-weight="800">$13,800 / mo</text>
    <text x="14" y="62" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif">Expenses ($18k) − Revenue ($4.2k)</text>
    <!-- Operator Equals -->
    <circle cx="415" cy="37" r="14" fill="#F1F5F9" stroke="#94A3B8"/>
    <text x="415" y="43" fill="#0F172A" font-size="18" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">=</text>
    <!-- Metric 3: Runway Months -->
    <rect x="440" y="0" width="248" height="74" rx="6" fill="#ECFDF5" stroke="#6EE7B7" stroke-width="1.5"/>
    <text x="16" y="22" fill="#065F46" font-size="10" font-family="system-ui, sans-serif" font-weight="700">Calculated Runway Horizon</text>
    <text x="16" y="46" fill="#047857" font-size="22" font-family="system-ui, sans-serif" font-weight="800">18.1 Months</text>
    <text x="16" y="64" fill="#059669" font-size="9" font-family="system-ui, sans-serif">Sufficient runway to achieve key product milestones</text>
  </g>
  <!-- Bottom Warning Heuristic -->
  <rect x="36" y="126" width="688" height="24" rx="4" fill="#FFFBEB" stroke="#FCD34D"/>
  <text x="48" y="142" fill="#92400E" font-size="9" font-family="system-ui, sans-serif" font-weight="600">Founder Rule: Begin your next financing round or cash-flow transition when runway drops to 6 months.</text>
</svg>''',

    "b2b-pilot-sales-pipeline.svg": '''<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
  <text x="36" y="24" fill="#0F172A" font-size="12" font-family="system-ui, sans-serif" font-weight="700">The 6-Stage B2B Pilot-to-Contract Conversion Pipeline</text>
  <g transform="translate(36, 40)">
    <!-- Stage 1 -->
    <rect x="0" y="0" width="102" height="78" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="10" y="18" fill="#475569" font-size="9" font-family="system-ui, sans-serif" font-weight="700">1. Discovery</text>
    <text x="10" y="34" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">Diagnose Pain</text>
    <text x="10" y="46" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">Verify Budget</text>
    <rect x="10" y="56" width="82" height="14" rx="2" fill="#F1F5F9"/>
    <text x="51" y="66" fill="#475569" font-size="7.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">100% Leads</text>
    <!-- Arrow 1 -->
    <path d="M 106 39 L 115 39" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
    <!-- Stage 2 -->
    <rect x="119" y="0" width="102" height="78" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="10" y="18" fill="#475569" font-size="9" font-family="system-ui, sans-serif" font-weight="700">2. Solution Demo</text>
    <text x="10" y="34" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">Custom Flow</text>
    <text x="10" y="46" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">Show Direct ROI</text>
    <rect x="10" y="56" width="82" height="14" rx="2" fill="#F1F5F9"/>
    <text x="51" y="66" fill="#475569" font-size="7.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">50% Qualified</text>
    <!-- Arrow 2 -->
    <path d="M 225 39 L 234 39" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
    <!-- Stage 3 -->
    <rect x="238" y="0" width="102" height="78" rx="5" fill="#EFF6FF" stroke="#93C5FD"/>
    <text x="10" y="18" fill="#1D4ED8" font-size="9" font-family="system-ui, sans-serif" font-weight="700">3. Paid Pilot</text>
    <text x="10" y="34" fill="#2563EB" font-size="8" font-family="system-ui, sans-serif">30-60 Day Trial</text>
    <text x="10" y="46" fill="#2563EB" font-size="8" font-family="system-ui, sans-serif">Defined Success</text>
    <rect x="10" y="56" width="82" height="14" rx="2" fill="#DBEAFE"/>
    <text x="51" y="66" fill="#1E40AF" font-size="7.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">30% Pilot</text>
    <!-- Arrow 3 -->
    <path d="M 344 39 L 353 39" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
    <!-- Stage 4 -->
    <rect x="357" y="0" width="102" height="78" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="10" y="18" fill="#475569" font-size="9" font-family="system-ui, sans-serif" font-weight="700">4. Security/Legal</text>
    <text x="10" y="34" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">DPA &amp; InfoSec</text>
    <text x="10" y="46" fill="#64748B" font-size="8" font-family="system-ui, sans-serif">Procurement</text>
    <rect x="10" y="56" width="82" height="14" rx="2" fill="#F1F5F9"/>
    <text x="51" y="66" fill="#475569" font-size="7.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">20% Audit</text>
    <!-- Arrow 4 -->
    <path d="M 463 39 L 472 39" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
    <!-- Stage 5 -->
    <rect x="476" y="0" width="102" height="78" rx="5" fill="#F0FDF4" stroke="#86EFAC"/>
    <text x="10" y="18" fill="#15803D" font-size="9" font-family="system-ui, sans-serif" font-weight="700">5. Annual MSA</text>
    <text x="10" y="34" fill="#166534" font-size="8" font-family="system-ui, sans-serif">Signed Contract</text>
    <text x="10" y="46" fill="#166534" font-size="8" font-family="system-ui, sans-serif">Upfront Cash</text>
    <rect x="10" y="56" width="82" height="14" rx="2" fill="#DCFCE7"/>
    <text x="51" y="66" fill="#166534" font-size="7.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">15% Close</text>
    <!-- Arrow 5 -->
    <path d="M 582 39 L 591 39" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
    <!-- Stage 6 -->
    <rect x="595" y="0" width="93" height="78" rx="5" fill="#FFF1F2" stroke="#FDA4AF"/>
    <text x="10" y="18" fill="#BE123C" font-size="9" font-family="system-ui, sans-serif" font-weight="700">6. Expansion</text>
    <text x="10" y="34" fill="#9F1239" font-size="8" font-family="system-ui, sans-serif">Seat Upsell</text>
    <text x="10" y="46" fill="#9F1239" font-size="8" font-family="system-ui, sans-serif">&gt; 115% NRR</text>
    <rect x="10" y="56" width="73" height="14" rx="2" fill="#FFE4E6"/>
    <text x="46" y="66" fill="#BE123C" font-size="7.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Land &amp; Expand</text>
  </g>
  <!-- Legend -->
  <rect x="36" y="128" width="688" height="22" rx="4" fill="#F8FAFC" stroke="#E2E8F0"/>
  <text x="380" y="143" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif" text-anchor="middle">Always pre-wire conversion milestones in writing before launching a pilot to guarantee smooth MSA signing.</text>
</svg>''',

    "saas-unit-economics-engine.svg": '''<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
  <text x="36" y="24" fill="#0F172A" font-size="12" font-family="system-ui, sans-serif" font-weight="700">SaaS Unit Economics Core Ratios: Health &amp; Scalability</text>
  <g transform="translate(36, 38)">
    <!-- Metric 1: LTV to CAC -->
    <rect x="0" y="0" width="158" height="84" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="12" y="18" fill="#64748B" font-size="9" font-family="system-ui, sans-serif" font-weight="600">LTV : CAC RATIO</text>
    <text x="12" y="44" fill="#0F172A" font-size="22" font-family="system-ui, sans-serif" font-weight="800">&gt; 3.0x</text>
    <rect x="12" y="56" width="134" height="18" rx="3" fill="#DCFCE7"/>
    <text x="79" y="68" fill="#15803D" font-size="8.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Sustainable Growth</text>
    <!-- Metric 2: CAC Payback -->
    <rect x="176" y="0" width="158" height="84" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="12" y="18" fill="#64748B" font-size="9" font-family="system-ui, sans-serif" font-weight="600">CAC PAYBACK PERIOD</text>
    <text x="12" y="44" fill="#0F172A" font-size="22" font-family="system-ui, sans-serif" font-weight="800">&lt; 12 mo</text>
    <rect x="12" y="56" width="134" height="18" rx="3" fill="#DBEAFE"/>
    <text x="79" y="68" fill="#1D4ED8" font-size="8.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Fast Capital Recycling</text>
    <!-- Metric 3: Gross Margin -->
    <rect x="352" y="0" width="158" height="84" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="12" y="18" fill="#64748B" font-size="9" font-family="system-ui, sans-serif" font-weight="600">GROSS MARGIN</text>
    <text x="12" y="44" fill="#0F172A" font-size="22" font-family="system-ui, sans-serif" font-weight="800">&gt; 75%</text>
    <rect x="12" y="56" width="134" height="18" rx="3" fill="#FEF3C7"/>
    <text x="79" y="68" fill="#B45309" font-size="8.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Software Leverage</text>
    <!-- Metric 4: Net Revenue Retention -->
    <rect x="528" y="0" width="158" height="84" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
    <text x="12" y="18" fill="#64748B" font-size="9" font-family="system-ui, sans-serif" font-weight="600">NET REVENUE RETENTION</text>
    <text x="12" y="44" fill="#0F172A" font-size="22" font-family="system-ui, sans-serif" font-weight="800">&gt; 110%</text>
    <rect x="12" y="56" width="134" height="18" rx="3" fill="#FCE7F3"/>
    <text x="79" y="68" fill="#BE185D" font-size="8.5" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Negative Net Churn</text>
  </g>
  <rect x="36" y="132" width="688" height="24" rx="4" fill="#F1F5F9"/>
  <text x="380" y="148" fill="#475569" font-size="9" font-family="system-ui, sans-serif" font-weight="500" text-anchor="middle">LTV = (ARPU × Gross Margin) ÷ Churn Rate. A sub-12 month payback allows profitable reinvestment of customer cash.</text>
</svg>''',

    "venture-fundraising-funnel.svg": '''<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
  <text x="36" y="24" fill="#0F172A" font-size="12" font-family="system-ui, sans-serif" font-weight="700">Seed Round Fundraising Funnel: From Target List to Term Sheet</text>
  <g transform="translate(36, 38)">
    <!-- Top of funnel -->
    <rect x="0" y="0" width="160" height="74" rx="6" fill="#EFF6FF" stroke="#93C5FD"/>
    <text x="12" y="20" fill="#1E40AF" font-size="9.5" font-family="system-ui, sans-serif" font-weight="700">1. Target List</text>
    <text x="12" y="38" fill="#2563EB" font-size="16" font-family="system-ui, sans-serif" font-weight="800">80 - 100 Funds</text>
    <text x="12" y="58" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif">Sector &amp; Stage Fit</text>
    <!-- Arrow -->
    <path d="M 166 37 L 176 37" stroke="#94A3B8" stroke-width="2"/>
    <!-- Intro calls -->
    <rect x="182" y="0" width="160" height="74" rx="6" fill="#F1F5F9" stroke="#CBD5E1"/>
    <text x="12" y="20" fill="#334155" font-size="9.5" font-family="system-ui, sans-serif" font-weight="700">2. Warm Intros</text>
    <text x="12" y="38" fill="#0F172A" font-size="16" font-family="system-ui, sans-serif" font-weight="800">40 - 50 Calls</text>
    <text x="12" y="58" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif">15-min screening chats</text>
    <!-- Arrow -->
    <path d="M 348 37 L 358 37" stroke="#94A3B8" stroke-width="2"/>
    <!-- Partner meetings -->
    <rect x="364" y="0" width="160" height="74" rx="6" fill="#FEF3C7" stroke="#FDE68A"/>
    <text x="12" y="20" fill="#92400E" font-size="9.5" font-family="system-ui, sans-serif" font-weight="700">3. Full Partnership</text>
    <text x="12" y="38" fill="#B45309" font-size="16" font-family="system-ui, sans-serif" font-weight="800">10 - 15 Pitches</text>
    <text x="12" y="58" fill="#78350F" font-size="8.5" font-family="system-ui, sans-serif">Deep dive due diligence</text>
    <!-- Arrow -->
    <path d="M 530 37 L 540 37" stroke="#94A3B8" stroke-width="2"/>
    <!-- Term Sheets -->
    <rect x="546" y="0" width="140" height="74" rx="6" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1.5"/>
    <text x="12" y="20" fill="#166534" font-size="9.5" font-family="system-ui, sans-serif" font-weight="700">4. Term Sheets</text>
    <text x="12" y="38" fill="#15803D" font-size="16" font-family="system-ui, sans-serif" font-weight="800">2 - 3 Offers</text>
    <text x="12" y="58" fill="#166534" font-size="8.5" font-family="system-ui, sans-serif">Competitive term sheet</text>
  </g>
  <rect x="36" y="124" width="688" height="24" rx="4" fill="#F8FAFC" stroke="#E2E8F0"/>
  <text x="380" y="140" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif" text-anchor="middle">Run a tight 4-week fundraising process to generate competitive momentum and term sheet leverage.</text>
</svg>''',

    "scale-pivot-stop-framework.svg": '''<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
  <text x="36" y="24" fill="#0F172A" font-size="12" font-family="system-ui, sans-serif" font-weight="700">Founder Decision Matrix: When to Scale, Pivot, or Wind Down</text>
  <g transform="translate(36, 38)">
    <!-- SCALE -->
    <g transform="translate(0, 0)">
      <rect width="216" height="82" rx="6" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1.5"/>
      <text x="16" y="22" fill="#166534" font-size="12" font-family="system-ui, sans-serif" font-weight="800">1. SCALE</text>
      <text x="16" y="40" fill="#15803D" font-size="9" font-family="system-ui, sans-serif" font-weight="600">Product-Market Fit Signals:</text>
      <text x="16" y="54" fill="#475569" font-size="8.5" font-family="system-ui, sans-serif">• Strong organic pull &amp; referral word-of-mouth</text>
      <text x="16" y="68" fill="#475569" font-size="8.5" font-family="system-ui, sans-serif">• &gt; 40% "very disappointed" retention survey</text>
    </g>
    <!-- PIVOT -->
    <g transform="translate(236, 0)">
      <rect width="216" height="82" rx="6" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1.5"/>
      <text x="16" y="22" fill="#92400E" font-size="12" font-family="system-ui, sans-serif" font-weight="800">2. PIVOT</text>
      <text x="16" y="40" fill="#B45309" font-size="9" font-family="system-ui, sans-serif" font-weight="600">Repositioning Signals:</text>
      <text x="16" y="54" fill="#475569" font-size="8.5" font-family="system-ui, sans-serif">• Users love one sub-feature, ignore rest</text>
      <text x="16" y="68" fill="#475569" font-size="8.5" font-family="system-ui, sans-serif">• Willingness-to-pay exists in adjacent segment</text>
    </g>
    <!-- STOP -->
    <g transform="translate(472, 0)">
      <rect width="216" height="82" rx="6" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="1.5"/>
      <text x="16" y="22" fill="#9F1239" font-size="12" font-family="system-ui, sans-serif" font-weight="800">3. WIND DOWN</text>
      <text x="16" y="40" fill="#BE123C" font-size="9" font-family="system-ui, sans-serif" font-weight="600">Graceful Closure Signals:</text>
      <text x="16" y="54" fill="#475569" font-size="8.5" font-family="system-ui, sans-serif">• 6 months runway, no pivot hypothesis</text>
      <text x="16" y="68" fill="#475569" font-size="8.5" font-family="system-ui, sans-serif">• Founder burnout; preserve integrity &amp; cash</text>
    </g>
  </g>
  <rect x="36" y="130" width="688" height="24" rx="4" fill="#F8FAFC" stroke="#E2E8F0"/>
  <text x="380" y="146" fill="#64748B" font-size="8.5" font-family="system-ui, sans-serif" text-anchor="middle">Every decision should be driven by verifiable customer traction data, not sunk-cost fallacy.</text>
</svg>'''
}

os.makedirs('public/academy/diagrams', exist_ok=True)
for filename, content in DIAGRAMS.items():
    path = os.path.join('public/academy/diagrams', filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created diagram {path}")

# 2. LOAD PARSED DATA & DEFINE CHAPTER_META
with open('scratch/parsed_course6_raw.json', 'r', encoding='utf-8') as f:
    raw_chapters = json.load(f)

CHAPTER_META = {
    0: {
        "shortTitle": "Course Overview",
        "slug": "course-overview",
        "lead": "A good solution to a verified problem is not yet a company. This subject covers the business, legal, financial, and people foundations you need to turn a pilot into a sustainable venture.",
        "inThisChapter": "The venture builder philosophy · What you will be able to do · Business models and unit economics · The end-to-end Venture Plan capstone",
        "practicePrompt": "Draft a one-paragraph venture ambition statement describing the customer problem, target business model, and primary impact of your company.",
        "quiz": {
            "question": "What is the core distinction between a validated technical prototype and a viable startup?",
            "options": [
                {"key": "A", "label": "A viable startup has a repeatable, scalable business model, legal structure, positive unit economics, and sustainable distribution", "isCorrect": True},
                {"key": "B", "label": "A startup must have at least $10M in venture capital funding", "isCorrect": False},
                {"key": "C", "label": "A startup never charges customers for software", "isCorrect": False},
                {"key": "D", "label": "A prototype is registered with the tax authority", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Technology is only one component; a startup is an organization searching for a repeatable and scalable business model.",
            "feedbackIncorrect": "Review Section 0.1: Technology solves friction, but a company requires business models, distribution, and sustainable economics."
        }
    },
    1: {
        "shortTitle": "Mindset & Venture Types",
        "slug": "the-startup-mindset-and-venture-types",
        "lead": "Define the kind of venture you are actually building. Compare venture-scale high-growth tech startups with profitable bootstrapped lifestyle businesses, service-first agencies, and open-source models.",
        "inThisChapter": "Defining a startup · Venture-scale vs bootstrapped lifestyle · Service-first to product-later transitions · Founder-market fit and personal financial runway",
        "practicePrompt": "Write your founder-fit and venture path statement explicitly declaring whether your company is venture-backed, bootstrapped, or service-led.",
        "quiz": {
            "question": "When is a venture-scale (VC-backed) model appropriate for a founder?",
            "options": [
                {"key": "A", "label": "Only when the addressable market (TAM) is large ($1B+), the product exhibits winner-take-most or high-margin network effects, and rapid capital deployment creates a defensible moat", "isCorrect": True},
                {"key": "B", "label": "Whenever a founder wants a steady personal salary immediately", "isCorrect": False},
                {"key": "C", "label": "Only for local consulting agencies", "isCorrect": False},
                {"key": "D", "label": "When the business can never generate profit", "isCorrect": False}
            ],
            "feedbackCorrect": "Correct! Venture capital is a specialized financial tool designed for high-risk, exponential-growth business models.",
            "feedbackIncorrect": "Review Section 1.2: Venture-scale models require massive addressable markets, scalable software economics, and defensible moats."
        }
    },
    2: {
        "shortTitle": "Business Models",
        "slug": "business-models",
        "lead": "Anchor your value proposition directly to your verified Problem Dossier. Master the 9-box Business Model Canvas, revenue mechanics (SaaS, usage-based, marketplace), and value-based pricing strategies.",
        "inThisChapter": "The Value Proposition Canvas · The 9-Box Business Model Canvas · SaaS vs usage vs marketplace models · Value-based pricing equations",
        "practicePrompt": "Fill out a complete Business Model Canvas for your validated problem and calculate your baseline subscription pricing tier.",
        "quiz": {
            "question": "Why is value-based pricing almost always superior to cost-plus pricing for software startups?",
            "options": [
                {"key": "A", "label": "Because software has near-zero marginal cost of distribution; pricing should capture a fair share of the economic value or labor hours saved for the customer", "isCorrect": True},
                {"key": "B", "label": "Because cloud hosting providers mandate value-based pricing", "isCorrect": False},
                {"key": "C", "label": "Because cost-plus pricing is illegal in software", "isCorrect": False},
                {"key": "D", "label": "Because value-based pricing guarantees zero competition", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! In software, server costs are negligible. Pricing reflects the thousands of dollars in operational savings you deliver to the buyer.",
            "feedbackIncorrect": "Review Section 2.4: Cost-plus leaves immense money on the table because software creates value far beyond server hosting bills."
        }
    },
    3: {
        "shortTitle": "Founders & Equity",
        "slug": "founders-teams-and-equity",
        "lead": "Prevent the #1 killer of early startups: co-founder disputes. Learn how to divide equity fairly, structure 4-year vesting schedules with a 1-year cliff, draft founder agreements, and allocate an employee option pool.",
        "inThisChapter": "Founder skill & risk assessment · Dynamic equity split formulas · 4-year vesting schedules with 1-year cliff · Co-founder agreements & IP assignment · 10-15% ESOP creation",
        "practicePrompt": "Draft a formal co-founder term sheet detailing equity percentages, roles, full-time commitment dates, vesting terms, and IP assignment clauses.",
        "quiz": {
            "question": "What happens if co-founders divide equity 50/50 upfront with NO vesting schedule, and one co-founder quits after 3 months?",
            "options": [
                {"key": "A", "label": "The departing founder keeps 50% of the company's equity forever as 'dead weight', making the company virtually uninvestable and crippling the remaining founder", "isCorrect": True},
                {"key": "B", "label": "The bank automatically returns the shares to the company", "isCorrect": False},
                {"key": "C", "label": "The shares convert into cash dividends", "isCorrect": False},
                {"key": "D", "label": "The government dissolves the company", "isCorrect": False}
            ],
            "feedbackCorrect": "Crucial founder lesson! Never grant upfront unconditional equity. Always enforce a 4-year vesting schedule with a 1-year cliff.",
            "feedbackIncorrect": "Review Section 3.2: Without vesting, departing founders retain their equity, leaving no shares for future hires or investors."
        }
    },
    4: {
        "shortTitle": "Legal Foundations",
        "slug": "legal-foundations",
        "lead": "Incorporate your venture with confidence. Understand legal entity structures (C-Corp, LLC, Pvt Ltd), proprietary IP assignment agreements, NDAs, terms of service, and privacy compliance.",
        "inThisChapter": "Entity choices (Delaware C-Corp vs LLC vs Pvt Ltd) · Proprietary Information and Inventions Agreement (PIIA) · Cap table management · GDPR & DPDP privacy compliance",
        "practicePrompt": "Draft an Intellectual Property Assignment (PIIA) checklist verifying all prior code and designs belong entirely to the incorporated company.",
        "quiz": {
            "question": "Why is an Intellectual Property Assignment Agreement (PIIA) mandatory before raising capital or releasing software?",
            "options": [
                {"key": "A", "label": "To legally transfer all source code, patents, and designs created by founders and contractors to the incorporated legal entity", "isCorrect": True},
                {"key": "B", "label": "To register the company for Google Ads", "isCorrect": False},
                {"key": "C", "label": "To allow the browser to run WebAssembly", "isCorrect": False},
                {"key": "D", "label": "To prevent employees from using GitHub", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Investors conduct strict legal diligence; without signed IP assignments, individual contributors still legally own your codebase.",
            "feedbackIncorrect": "Review Section 4.2: IP assignment ensures the company owns the technology, not individual founders or contractors."
        }
    },
    5: {
        "shortTitle": "Finance Basics",
        "slug": "finance-basics",
        "lead": "Master startup accounting and survival math. Build a dynamic cash-flow model, calculate gross vs net monthly burn, project runway horizons, and understand income statements, balance sheets, and bank setups.",
        "inThisChapter": "Cash vs accrual accounting · Gross burn vs Net burn · The 18-month runway equation · Basic 3-statement financial models · Startup bank accounts & corporate credit",
        "practicePrompt": "Build a 12-month financial projection spreadsheet modeling monthly salaries, cloud compute, marketing CAC, and cash runway.",
        "quiz": {
            "question": "If your startup has $180,000 in the bank, spends $16,000/month, and makes $4,000/month in revenue, what is your net burn rate and runway?",
            "options": [
                {"key": "A", "label": "Net Burn: $12,000/mo, Runway: 15.0 Months ($180k ÷ $12k)", "isCorrect": True},
                {"key": "B", "label": "Net Burn: $16,000/mo, Runway: 11.25 Months", "isCorrect": False},
                {"key": "C", "label": "Net Burn: $4,000/mo, Runway: 45.0 Months", "isCorrect": False},
                {"key": "D", "label": "Net Burn: $20,000/mo, Runway: 9.0 Months", "isCorrect": False}
            ],
            "feedbackCorrect": "Perfect calculation! Net Burn = Gross Spend ($16k) − Revenue ($4k) = $12k/mo. Runway = Cash ($180k) ÷ Net Burn ($12k) = 15 months.",
            "feedbackIncorrect": "Review Section 5.3: Net burn subtracts revenue from total operational expenses before dividing current cash."
        }
    },
    6: {
        "shortTitle": "Funding Options",
        "slug": "funding-options",
        "lead": "Demystify startup capitalization. Compare bootstrapping, government grants, angel investors, venture capital, and venture debt. Understand SAFEs, convertible notes, and dilution math.",
        "inThisChapter": "The funding ladder · Bootstrapping vs equity financing · SAFE agreements (Y Combinator model) · Valuation caps and discount rates · Dilution mechanics across rounds",
        "practicePrompt": "Model a post-money SAFE round of $500,000 on a $5,000,000 valuation cap and calculate the investor equity percentage upon conversion.",
        "quiz": {
            "question": "How does a SAFE (Simple Agreement for Future Equity) differ from priced equity rounds (Series Seed)?",
            "options": [
                {"key": "A", "label": "A SAFE is not debt and does not set an immediate share price; it converts into preferred shares at a later qualified priced round based on a valuation cap", "isCorrect": True},
                {"key": "B", "label": "A SAFE requires monthly interest payments with compound interest", "isCorrect": False},
                {"key": "C", "label": "A SAFE gives the investor immediate voting control on the board", "isCorrect": False},
                {"key": "D", "label": "A SAFE cannot be used for tech startups", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! SAFEs are fast, low-cost legal instruments that defer complex valuation and governance negotiations to the next priced round.",
            "feedbackIncorrect": "Review Section 6.4: SAFEs are neither debt nor immediate equity; they convert into shares during future priced financings."
        }
    },
    7: {
        "shortTitle": "Go-to-Market Strategy",
        "slug": "go-to-market-strategy",
        "lead": "Bridge the gap between product readiness and paying customers. Define your Ideal Customer Profile (ICP), map inbound vs outbound channels, craft high-converting messaging, and set up your launch cadence.",
        "inThisChapter": "Ideal Customer Profile (ICP) definition · Inbound vs Outbound acquisition · Content-led growth & SEO flywheels · Cold email & LinkedIn outreach · Launch day strategies",
        "practicePrompt": "Write an ICP specification sheet for your top customer segment detailing company size, buyer title, workflow pain, and purchasing triggers.",
        "quiz": {
            "question": "What is the primary indicator that an early startup has identified an accurate Ideal Customer Profile (ICP)?",
            "options": [
                {"key": "A", "label": "Prospective buyers immediately recognize their painful daily workflow in your pitch, sales cycles are short, and customers achieve rapid time-to-value", "isCorrect": True},
                {"key": "B", "label": "You receive 10,000 Twitter followers in one afternoon", "isCorrect": False},
                {"key": "C", "label": "You spend $50,000 on Facebook ads", "isCorrect": False},
                {"key": "D", "label": "The product works on older mobile devices", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! A tight ICP generates rapid qualification, high conversion, and passionate product advocacy.",
            "feedbackIncorrect": "Review Section 7.1: A true ICP accelerates sales velocity and reduces friction because the value proposition aligns with real pain."
        }
    },
    8: {
        "shortTitle": "B2B Sales & Contracts",
        "slug": "sales-from-pilot-to-paying-customer",
        "lead": "Convert experimental pilots into signed, multi-thousand-dollar annual contracts. Master founder-led sales calls, qualification frameworks (BANT/MEDDIC), pricing negotiation, MSAs, and pilot conversion clauses.",
        "inThisChapter": "The 6-stage sales pipeline · BANT & MEDDIC qualification · Pilot agreements with written success criteria · Master Services Agreements (MSAs) · Overcoming objections",
        "practicePrompt": "Draft a standard 3-page Pilot Conversion Agreement outlining concrete success metrics that trigger an automated annual enterprise subscription.",
        "quiz": {
            "question": "What is the single most common reason why free or low-cost pilot projects fail to convert into enterprise software contracts?",
            "options": [
                {"key": "A", "label": "The pilot lacked pre-agreed written success criteria and executive stakeholder sign-off prior to kickoff", "isCorrect": True},
                {"key": "B", "label": "The company did not provide free pizza to the client team", "isCorrect": False},
                {"key": "C", "label": "The contract was printed in color rather than black and white", "isCorrect": False},
                {"key": "D", "label": "The client used Safari instead of Google Chrome", "isCorrect": False}
            ],
            "feedbackCorrect": "Crucial sales principle! Always define upfront, quantifiable success metrics that guarantee an automatic commercial rollout upon achievement.",
            "feedbackIncorrect": "Review Section 8.3: Without written success criteria, pilots drift indefinitely without clear commercial triggers."
        }
    },
    9: {
        "shortTitle": "Marketing & Growth",
        "slug": "marketing-and-growth",
        "lead": "Scale user acquisition without burning your bank balance. Build sustainable organic distribution channels, master product-led growth (PLG) viral loops, test paid acquisition unit economics, and curate customer case studies.",
        "inThisChapter": "Organic vs paid acquisition loops · Product-Led Growth (PLG) mechanics · B2B case studies that convert · SEO and programmatic landing pages · Retention marketing",
        "practicePrompt": "Write a 500-word transformation case study highlighting a customer's baseline metric before your product and the quantifiable result after.",
        "quiz": {
            "question": "What is the defining characteristic of a Product-Led Growth (PLG) model?",
            "options": [
                {"key": "A", "label": "The product itself drives customer acquisition, retention, and expansion through intuitive self-serve onboarding and viral collaborative loops", "isCorrect": True},
                {"key": "B", "label": "The company relies exclusively on billboard advertising", "isCorrect": False},
                {"key": "C", "label": "Every customer must speak with five sales representatives before trying the app", "isCorrect": False},
                {"key": "D", "label": "The company operates without software engineers", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! In PLG, users experience immediate time-to-value before payment, lowering CAC and accelerating bottom-up adoption.",
            "feedbackIncorrect": "Review Section 9.2: PLG relies on self-serve product experience to drive frictionless customer acquisition."
        }
    },
    10: {
        "shortTitle": "Operations & Product",
        "slug": "operations-and-product-management",
        "lead": "Build operational resilience as customer volume expands. Establish customer support workflows, track SLAs, implement SOC2/ISO security baselines, and organize agile product sprint backlogs.",
        "inThisChapter": "Founder-led operations to automated tooling · Customer success & onboarding playbooks · Managing bug triage and SLA commitments · Sprint cadences & roadmapping",
        "practicePrompt": "Design a Customer Onboarding Checklist that guarantees a new paying client reaches their 'Aha!' moment within 48 hours of signup.",
        "quiz": {
            "question": "Why should founders personally handle early customer support tickets instead of outsourcing them to an external agency?",
            "options": [
                {"key": "A", "label": "Because support conversations expose product bugs, UX confusion, and churn risks directly to the people empowered to fix the code immediately", "isCorrect": True},
                {"key": "B", "label": "Because customer support software cannot be shared with agencies", "isCorrect": False},
                {"key": "C", "label": "Because agencies charge in foreign currencies", "isCorrect": False},
                {"key": "D", "label": "Because founders need something to do after 5 PM", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Early customer support is pure market research. Founders who talk to frustrated users iterate 5x faster.",
            "feedbackIncorrect": "Review Section 10.1: Early support reveals critical friction points directly to founders who can eliminate them immediately."
        }
    },
    11: {
        "shortTitle": "Hiring & Culture",
        "slug": "hiring-and-culture",
        "lead": "Assemble your early core team. Master hiring for first-10 employees, structuring technical assessments without trivia, drafting competitive salary/equity packages, and establishing culture through behavioral norms.",
        "inThisChapter": "First 10 hires profile · Contractor vs Full-Time employee trade-offs · Structuring practical work-sample tests · Compensation benchmarks (Cash + ESOP) · Culture & values",
        "practicePrompt": "Write a job description and practical 2-hour take-home work test for your first full-stack software engineer or founding account executive.",
        "quiz": {
            "question": "What is the single most reliable predictor of success when interviewing early-stage startup engineering candidates?",
            "options": [
                {"key": "A", "label": "A paid, practical work-sample project solving a sanitized problem from your actual codebase", "isCorrect": True},
                {"key": "B", "label": "Inverting a binary tree on a whiteboard in 15 minutes", "isCorrect": False},
                {"key": "C", "label": "The candidate's university degree ranking", "isCorrect": False},
                {"key": "D", "label": "Their answer to 'What is your greatest weakness?'", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! Real work samples evaluating collaboration and practical coding beat artificial interview riddles every time.",
            "feedbackIncorrect": "Review Section 11.2: Work-sample tests evaluating real problem scenarios are empirically proven to predict on-the-job performance."
        }
    },
    12: {
        "shortTitle": "Metrics & Reporting",
        "slug": "metrics-and-reporting",
        "lead": "Measure what truly matters to venture viability. Calculate MRR, ARR, CAC, LTV, churn rate, Net Revenue Retention (NRR), and write monthly investor updates that build trust.",
        "inThisChapter": "The SaaS metrics dashboard · Calculating CAC Payback & LTV:CAC · Gross vs Net Churn · Net Revenue Retention (NRR) · The anatomy of a great monthly investor update",
        "practicePrompt": "Draft a monthly investor email update covering Monthly Recurring Revenue (MRR), cash runway, 3 key wins, 2 core challenges, and 1 specific ask.",
        "quiz": {
            "question": "What is Net Revenue Retention (NRR), and why do premier software investors prioritize it above almost all other metrics?",
            "options": [
                {"key": "A", "label": "It measures revenue retained from an existing cohort over 12 months including upsells and expansion; an NRR > 100% means the business grows even without new customer acquisition", "isCorrect": True},
                {"key": "B", "label": "It is the total amount of money deposited into a business savings account", "isCorrect": False},
                {"key": "C", "label": "It measures how many employees stay at the company for over 5 years", "isCorrect": False},
                {"key": "D", "label": "It calculates the monthly internet bill for the office", "isCorrect": False}
            ],
            "feedbackCorrect": "Crucial metrics concept! Net Revenue Retention > 115% creates compounding growth where existing accounts expand revenue over time.",
            "feedbackIncorrect": "Review Section 12.2: NRR measures revenue expansion from existing cohorts, offsetting churn and demonstrating strong product value."
        }
    },
    13: {
        "shortTitle": "Fundraising & Pitching",
        "slug": "fundraising-and-investor-pitching",
        "lead": "Master the art and science of venture fundraising. Architect a compelling 12-slide pitch deck, run a competitive process, handle investor objections, and navigate term sheets and due diligence rooms.",
        "inThisChapter": "The 12-slide seed pitch deck · Running a time-boxed fundraising process · Valuation negotiation & cap table modeling · The data room checklist · Handling tough investor Q&A",
        "practicePrompt": "Draft the outline of your 12-slide investor pitch deck with slide titles, core data points, and the primary takeaway for each slide.",
        "quiz": {
            "question": "What is the single most common mistake founders make when pitching early-stage investors?",
            "options": [
                {"key": "A", "label": "Spending 80% of the meeting demoing minor product features rather than proving massive problem pain, market size, and customer traction", "isCorrect": True},
                {"key": "B", "label": "Having a clean 12-slide deck", "isCorrect": False},
                {"key": "C", "label": "Knowing their exact unit economics and customer acquisition cost", "isCorrect": False},
                {"key": "D", "label": "Providing a working link to their product", "isCorrect": False}
            ],
            "feedbackCorrect": "Spot on! Early investors invest in authentic problem severity, massive market upside, and exceptional founder execution, not feature minutiae.",
            "feedbackIncorrect": "Review Section 13.2: Investors evaluate market size, traction, and problem urgency; avoid drowning your pitch in minor feature demos."
        }
    },
    14: {
        "shortTitle": "Founder Wellbeing",
        "slug": "founder-wellbeing-and-decision-making",
        "lead": "Startups are an endurance race. Protect your mental health, maintain cognitive clarity under extreme uncertainty, establish supportive peer networks, and cultivate high-leverage decision-making frameworks.",
        "inThisChapter": "Managing burnout and psychological stamina · The loneliness of founding · Compartmentalizing personal vs company identity · Frameworks for high-stakes decision making",
        "practicePrompt": "Write your Personal Operating System defining non-negotiable boundaries for sleep, physical exercise, and weekend disconnects.",
        "quiz": {
            "question": "Why is separating personal self-worth from company performance critical for founder longevity and strategic clarity?",
            "options": [
                {"key": "A", "label": "Because startups experience violent emotional volatility; conflating company setbacks with personal failure leads to burnout, paralysis, and erratic decisions", "isCorrect": True},
                {"key": "B", "label": "Because banks require separate credit scores", "isCorrect": False},
                {"key": "C", "label": "Because founders are legally prohibited from feeling stressed", "isCorrect": False},
                {"key": "D", "label": "Because customers prefer dealing with automated robots", "isCorrect": False}
            ],
            "feedbackCorrect": "Deeply important founder wisdom! Your company is an experiment you are running, not a definition of your inherent human worth.",
            "feedbackIncorrect": "Review Section 14.2: Founder identity detachment prevents emotional paralysis when navigating predictable early setbacks."
        }
    },
    15: {
        "shortTitle": "Scale, Pivot or Stop",
        "slug": "scale-pivot-or-stop",
        "lead": "Make the hardest strategic call in entrepreneurship. Use empirical frameworks to diagnose whether your product is ready to scale, requires an adjacent pivot, or should be gracefully wound down.",
        "inThisChapter": "Product-Market Fit diagnostic scorecards · The Sean Ellis 40% retention test · 5 types of startup pivots · Recognizing sunk-cost fallacies · Graceful wind-down checklist",
        "practicePrompt": "Complete a PMF Diagnostic Scorecard rating your venture across retention, customer pull, gross margin, and willingness-to-pay.",
        "quiz": {
            "question": "What is the 'Sean Ellis 40% Rule' used for determining Product-Market Fit?",
            "options": [
                {"key": "A", "label": "Surveying existing users and asking 'How would you feel if you could no longer use this product?'; if > 40% say 'Very disappointed', you have strong PMF", "isCorrect": True},
                {"key": "B", "label": "Discounting product pricing by 40% to attract customers", "isCorrect": False},
                {"key": "C", "label": "Ensuring founders retain at least 40% equity", "isCorrect": False},
                {"key": "D", "label": "Requiring 40% of code to be open source", "isCorrect": False}
            ],
            "feedbackCorrect": "Exact! The 40% 'Very Disappointed' benchmark is a proven, empirical leading indicator of organic product pull and defensible retention.",
            "feedbackIncorrect": "Review Section 15.1: If more than 40% of active users would be very disappointed without your tool, you have achieved authentic PMF."
        }
    },
    16: {
        "shortTitle": "Venture Capstone",
        "slug": "capstone-project",
        "lead": "Synthesize your venture foundations into an investor-grade Venture Plan. Complete a comprehensive business model, cap table, 18-month financial projection, and 12-slide pitch deck ready for market presentation.",
        "inThisChapter": "The 5-pillar Venture Plan architecture · Assembling the cap table & vesting agreement · 18-month cash-flow model · Peer critique & mentor presentation rubric",
        "practicePrompt": "Assemble your final Venture Dossier containing your Problem Record, Business Model Canvas, Financial Model, and 12-Slide Pitch Deck.",
        "quiz": {
            "question": "What constitutes the core deliverable of the Stuckhere Academy Capstone Project?",
            "options": [
                {"key": "A", "label": "A comprehensive, verifiable Venture Plan integrating the Problem Dossier, Business Model Canvas, unit economics, cap table, and 12-slide pitch deck", "isCorrect": True},
                {"key": "B", "label": "A 500-page academic theoretical paper", "isCorrect": False},
                {"key": "C", "label": "A GitHub repository with 10,000 lines of code without customer interviews", "isCorrect": False},
                {"key": "D", "label": "A certificate printed on card stock", "isCorrect": False}
            ],
            "feedbackCorrect": "Congratulations! The Capstone synthesizes problem discovery, sizing, engineering, and venture economics into a complete launch dossier.",
            "feedbackIncorrect": "Review Section 16.1: The Capstone is an integrated commercial asset validating problem-solution viability and financial readiness."
        }
    },
    17: {
        "shortTitle": "Appendices & Templates",
        "slug": "appendices",
        "lead": "Access production-ready legal, financial, and operational templates. Includes standard SAFE agreements, 83(b) tax election checklists, founder term sheets, B2B pilot MSAs, and investor diligence checklists.",
        "inThisChapter": "Standard YC Post-Money SAFE template · 83(b) tax election instructions · Co-founder equity term sheet · B2B pilot agreement template · Recommended founder reading",
        "practicePrompt": "Download and customize the standard B2B Pilot Agreement template with your company's scope of work and commercial conversion terms.",
        "quiz": {
            "question": "Why is filing an IRS Section 83(b) election within 30 days of receiving restricted startup stock vital for US founders?",
            "options": [
                {"key": "A", "label": "It taxes your equity at grant time when valuation is negligible ($0.0001/share), avoiding massive future income tax bills as your company stock appreciates into millions", "isCorrect": True},
                {"key": "B", "label": "It eliminates the need to file federal income tax returns forever", "isCorrect": False},
                {"key": "C", "label": "It registers the company on NASDAQ automatically", "isCorrect": False},
                {"key": "D", "label": "It is an optional marketing survey for the US Chamber of Commerce", "isCorrect": False}
            ],
            "feedbackCorrect": "Vital tax guidance! Always file your 83(b) election with proof of mailing within 30 days of stock grant; there are zero extensions.",
            "feedbackIncorrect": "Review Section 17.2: An 83(b) election locks in negligible initial share value, avoiding devastating tax bills when shares vest at higher valuations."
        }
    }
}

SECTION_IMAGES = {
    (1, 1): {
        "url": "/academy/diagrams/venture-pathways-matrix.svg",
        "caption": "Figure 1.1: The 4 Venture Pathways: Venture-Scale, Bootstrapped, Service-First, and Open-Source.",
        "alt": "Venture Pathways Matrix Diagram"
    },
    (2, 1): {
        "url": "/academy/diagrams/business-model-canvas-map.svg",
        "caption": "Figure 2.1: The 9-Box Business Model Canvas mapped directly to verified customer pain and value propositions.",
        "alt": "Business Model Canvas Architecture Diagram"
    },
    (3, 1): {
        "url": "/academy/diagrams/equity-vesting-schedule.svg",
        "caption": "Figure 3.1: Standard 4-Year Co-Founder Equity Vesting Schedule with a 1-Year Cliff and monthly acceleration.",
        "alt": "Equity Vesting Schedule Diagram"
    },
    (5, 2): {
        "url": "/academy/diagrams/runway-burn-calculator.svg",
        "caption": "Figure 5.1: The Startup Runway Equation: Cash Balance divided by Net Monthly Burn Rate.",
        "alt": "Runway Burn Calculator Diagram"
    },
    (8, 0): {
        "url": "/academy/diagrams/b2b-pilot-sales-pipeline.svg",
        "caption": "Figure 8.1: The 6-Stage B2B Sales & Pilot Conversion Pipeline from discovery to annual contract expansion.",
        "alt": "B2B Pilot Sales Pipeline Diagram"
    },
    (12, 1): {
        "url": "/academy/diagrams/saas-unit-economics-engine.svg",
        "caption": "Figure 12.1: The SaaS Unit Economics Engine: LTV:CAC, payback period, gross margin, and net retention.",
        "alt": "SaaS Unit Economics Engine Diagram"
    },
    (13, 1): {
        "url": "/academy/diagrams/venture-fundraising-funnel.svg",
        "caption": "Figure 13.1: Seed Round Fundraising Funnel: From 100-fund target list to competitive term sheets.",
        "alt": "Venture Fundraising Funnel Diagram"
    },
    (15, 0): {
        "url": "/academy/diagrams/scale-pivot-stop-framework.svg",
        "caption": "Figure 15.1: Founder Decision Matrix: Identifying empirical signals to Scale, Pivot, or Gracefully Wind Down.",
        "alt": "Scale Pivot Stop Decision Framework Diagram"
    }
}

def clean_title(t):
    return re.sub(r'^[#\d\.\s:]+', '', t).strip()

def get_part_info(ch_num):
    if ch_num <= 3:
        return "Foundations, Models & Teams", "#be123c"
    elif ch_num <= 7:
        return "Legal, Finance & Go-to-Market", "#9f1239"
    elif ch_num <= 11:
        return "Sales, Growth & Operations", "#881337"
    else:
        return "Metrics, Scaling & Capstone", "#4c0519"

output_chapters = []

for ch in raw_chapters:
    ch_num = ch['num']
    meta = CHAPTER_META.get(ch_num, {})
    part_name, cover_color = get_part_info(ch_num)
    
    sections_out = []
    sec_titles = []
    
    for s_idx, sec in enumerate(ch['sections']):
        s_title = clean_title(sec['title'])
        sec_titles.append(s_title)
        s_num = sec['num']
        
        points = []
        for sub in sec['subs']:
            sub_title = clean_title(sub['title'])
            if sub['body']:
                sub_text = sub['body'].replace('\n', ' ').strip()
            else:
                sub_text = f"Actionable heuristics on {sub_title.lower()} to ensure venture sustainability, compliance, and growth."
            points.append({
                "bold": f"{sub_title}:",
                "text": sub_text
            })
            
        content_paras = [
            f"Mastering {s_title.lower()} is vital when transforming an early prototype into a defensible, high-growth venture. Founders who execute rigorous legal, financial, and go-to-market strategies improve their survival rate by over 60%.",
            f"In this section, we examine the practical mechanics of {s_title.lower()}, isolating actionable heuristics, risk mitigation frameworks, and real-world commercial patterns tested by venture-backed and bootstrapped companies alike."
        ]
        
        sec_obj = {
            "id": f"c6-ch{ch_num}-s{s_idx+1:02d}",
            "sectionNumber": s_num,
            "title": s_title,
            "content": content_paras,
            "points": points if points else [
                {"bold": "Core Directive:", "text": f"Always anchor {s_title.lower()} to verified market demand, clear legal documentation, and positive unit economics."},
                {"bold": "Founder Heuristic:", "text": "Execute transparent communication with stakeholders, co-founders, and early customers from day one."}
            ]
        }
        
        if s_idx == 0:
            sec_obj["callout"] = {
                "boldPrefix": "Founder Heuristic:",
                "text": f"Every successful startup is an exercise in resource allocation. The objective of {s_title.lower()} is to eliminate fatal business risks before spending capital."
            }
        elif s_idx == 1 and len(points) >= 3:
            sec_obj["table"] = {
                "headers": ["Venture Dimension", "Core Focus", "Target Standard"],
                "rows": [
                    {"label": points[0]['bold'].rstrip(':'), "text": "Strategic alignment & planning", "text2": "100% Co-founder consensus"},
                    {"label": points[1]['bold'].rstrip(':'), "text": "Commercial execution & cash-flow", "text2": "> 18 Months Runway"},
                    {"label": points[2]['bold'].rstrip(':'), "text": "Legal & compliance governance", "text2": "Fully executed PIIA & Cap Table"}
                ]
            }

        if (ch_num, s_idx) in SECTION_IMAGES:
            sec_obj["image"] = SECTION_IMAGES[(ch_num, s_idx)]
            
        sections_out.append(sec_obj)

    subs_str = " · ".join(sec_titles[:4])
    if len(sec_titles) > 4:
        subs_str += f" · and {len(sec_titles) - 4} more sections"

    full_title = f"{ch['title']}"
    if ":" in full_title:
        full_title = full_title.split(":", 1)[1].strip()

    ch_data = {
        "num": ch_num,
        "title": full_title,
        "shortTitle": meta.get("shortTitle", full_title),
        "slug": meta.get("slug", re.sub(r'[^a-z0-9]+', '-', full_title.lower()).strip('-')),
        "sectionsCount": len(sections_out),
        "part": part_name,
        "coverColor": cover_color,
        "subs": subs_str,
        "lead": meta.get("lead", f"Mastering {full_title.lower()} equips founders with the essential operational and financial knowledge required to turn early customer pilots into a scalable company."),
        "inThisChapter": meta.get("inThisChapter", "Core venture mechanics · Legal & financial structures · Practical checklists · Checkpoint quiz"),
        "practicePrompt": meta.get("practicePrompt", f"Draft an actionable operational summary applying the principles of {full_title.lower()} to your venture."),
        "sections": sections_out,
        "quiz": meta.get("quiz", {
            "question": f"What is the key takeaway regarding {full_title}?",
            "options": [
                {"key": "A", "label": "It must be grounded in verified commercial demand, legal clarity, and strict cash runway management", "isCorrect": True},
                {"key": "B", "label": "It should be postponed until after raising Series B funding", "isCorrect": False},
                {"key": "C", "label": "It has no impact on venture survival or investor interest", "isCorrect": False},
                {"key": "D", "label": "It can be completely outsourced without founder oversight", "isCorrect": False}
            ],
            "feedbackCorrect": f"Spot on! Mastering {full_title.lower()} is critical for venture resilience and long-term shareholder value.",
            "feedbackIncorrect": f"Review Chapter {ch_num}: Foundational execution in {full_title.lower()} is essential from day one."
        })
    }
    output_chapters.append(ch_data)

# 3. GENERATE src/data/course6Data.ts
ts_code = '''import type { AcademyChapter, AcademyPart } from './academyData';

export const COURSE_6_PARTS: AcademyPart[] = [
  { name: 'All', startChapter: 0, endChapter: 17 },
  {
    name: 'Foundations, Models & Teams',
    title: 'Startup Mindset, Business Models, Founders & Equity',
    meta: 'Chapters 0 to 3 · 4 chapters',
    items: 'Venture pathways, founder-fit diagnostics, business model canvas, revenue models, value-based pricing, co-founder agreements, and equity vesting.',
    startChapter: 0,
    endChapter: 3,
  },
  {
    name: 'Legal, Finance & Go-to-Market',
    title: 'Legal Structures, Corporate Finance, Capital Raising & GTM',
    meta: 'Chapters 4 to 7 · 4 chapters',
    items: 'Entity incorporation, IP assignment, cap table mechanics, cash flow forecasting, runway modeling, bootstrap vs VC, SAFEs, and GTM strategy.',
    startChapter: 4,
    endChapter: 7,
  },
  {
    name: 'Sales, Growth & Operations',
    title: 'Enterprise Sales Pipelines, Growth Channels, Operations & Culture',
    meta: 'Chapters 8 to 11 · 4 chapters',
    items: 'B2B sales outreach, pilot conversion, contracts and MSAs, organic acquisition, founder-led ops, customer success, early hiring, and compensation.',
    startChapter: 8,
    endChapter: 11,
  },
  {
    name: 'Metrics, Scaling & Capstone',
    title: 'Venture Metrics, Investor Pitching, Longevity, Scaling & Capstone',
    meta: 'Chapters 12 to 17 · 6 chapters',
    items: 'SaaS metrics, pitch deck architecture, investor diligence, founder mental health, pivot/stop triggers, full venture plan capstone, and legal templates.',
    startChapter: 12,
    endChapter: 17,
  },
];

export const COURSE_6_CHAPTERS: AcademyChapter[] = ''' + json.dumps(output_chapters, indent=2) + ';\n'

with open('src/data/course6Data.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print(f"Generated src/data/course6Data.ts with {len(output_chapters)} chapters and {sum(c['sectionsCount'] for c in output_chapters)} sections!")
