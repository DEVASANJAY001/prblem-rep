# -*- coding: utf-8 -*-
import os
import json

C4_DIAGRAMS = {
    "double-diamond-design.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">The Double Diamond Design Process: Solving the Right Problem Right</text>

  <rect x="24" y="46" width="340" height="106" rx="8" fill="#FFFFFF" stroke="#EA580c" stroke-width="1.8"/>
  <text x="194" y="70" fill="#EA580C" font-size="13" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">DIAMOND 1: THE RIGHT PROBLEM</text>
  <text x="100" y="94" fill="#334155" font-size="11" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">1. Discover (Diverge)</text>
  <text x="100" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Interviews &amp; shadowing</text>
  <text x="100" y="130" fill="#EA580C" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Broad Field Inquiry</text>

  <text x="288" y="94" fill="#334155" font-size="11" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">2. Define (Converge)</text>
  <text x="288" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Problem statement &amp; HMW</text>
  <text x="288" y="130" fill="#EA580C" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Targeted Friction Point</text>

  <rect x="396" y="46" width="340" height="106" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.8"/>
  <text x="566" y="70" fill="#0284C7" font-size="13" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">DIAMOND 2: THE RIGHT SOLUTION</text>
  <text x="472" y="94" fill="#334155" font-size="11" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">3. Develop (Diverge)</text>
  <text x="472" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Crazy 8s &amp; wireframes</text>
  <text x="472" y="130" fill="#0284C7" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Multi-Option Ideation</text>

  <text x="660" y="94" fill="#334155" font-size="11" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">4. Deliver (Converge)</text>
  <text x="660" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">MVP test &amp; pilot agree</text>
  <text x="660" y="130" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Tested Solution</text>
</svg>""",

    "user-journey-map.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">5-Stage Customer Journey Map &amp; Friction Triggers</text>

  <rect x="20" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#64748B" stroke-width="1.5"/>
  <text x="86" y="70" fill="#475569" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">1. AWARENESS</text>
  <text x="86" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Operator realizes</text>
  <text x="86" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">workplace bottleneck</text>
  <text x="86" y="126" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Emotion: Frustration</text>
  <text x="86" y="142" fill="#DC2626" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Pain Trigger ⚠️</text>

  <rect x="168" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5"/>
  <text x="234" y="70" fill="#0284C7" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">2. WORKAROUND</text>
  <text x="234" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Hacks WhatsApp</text>
  <text x="234" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">or paper diary</text>
  <text x="234" y="126" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Emotion: Skeptical</text>
  <text x="234" y="142" fill="#D97706" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Current Patch 📋</text>

  <rect x="316" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#EA580C" stroke-width="2"/>
  <text x="382" y="70" fill="#EA580C" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">3. DISCOVERY</text>
  <text x="382" y="92" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Finds your MVP</text>
  <text x="382" y="108" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Low barrier trial</text>
  <text x="382" y="126" fill="#1E293B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Emotion: Hopeful</text>
  <text x="382" y="142" fill="#EA580C" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">First Value Point ⭐</text>

  <rect x="464" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.5"/>
  <text x="530" y="70" fill="#0891B2" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">4. ADOPTION</text>
  <text x="530" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Shifted primary</text>
  <text x="530" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">daily workflow</text>
  <text x="530" y="126" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Emotion: Relieved</text>
  <text x="530" y="142" fill="#0891B2" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Habit Formed 🔄</text>

  <rect x="612" y="46" width="128" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="676" y="70" fill="#059669" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">5. CONVERSION</text>
  <text x="676" y="92" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Pays invoice</text>
  <text x="676" y="108" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Signs pilot contract</text>
  <text x="676" y="126" fill="#1E293B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Emotion: Delighted</text>
  <text x="676" y="142" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Paid Pilot Won 💰</text>
</svg>""",

    "how-might-we-framing.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">How Might We (HMW) Problem Statement Reframing</text>

  <rect x="24" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#DC2626" stroke-width="1.5"/>
  <text x="40" y="72" fill="#DC2626" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">❌ TOO NARROW (PRESCRIBED)</text>
  <text x="40" y="94" fill="#334155" font-size="11" font-family="system-ui, sans-serif">"HMW build a Flutter mobile app</text>
  <text x="40" y="112" fill="#334155" font-size="11" font-family="system-ui, sans-serif">with Bluetooth thermal sensors?"</text>
  <text x="40" y="136" fill="#DC2626" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Danger: Locks in tech before validation</text>

  <rect x="268" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="284" y="72" fill="#059669" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">✅ CALIBRATED (SWEET SPOT)</text>
  <text x="284" y="94" fill="#1E293B" font-size="11" font-weight="semibold" font-family="system-ui, sans-serif">"HMW empower informal workers</text>
  <text x="284" y="112" fill="#1E293B" font-size="11" font-weight="semibold" font-family="system-ui, sans-serif">to safely reschedule extreme shifts?"</text>
  <text x="284" y="136" fill="#059669" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Target: Inspires creative, testable MVPs</text>

  <rect x="512" y="46" width="224" height="106" rx="8" fill="#FFFFFF" stroke="#D97706" stroke-width="1.5"/>
  <text x="528" y="72" fill="#D97706" font-size="13" font-weight="bold" font-family="system-ui, sans-serif">❌ TOO BROAD (VAGUE)</text>
  <text x="528" y="94" fill="#334155" font-size="11" font-family="system-ui, sans-serif">"HMW solve global climate change</text>
  <text x="528" y="112" fill="#334155" font-size="11" font-family="system-ui, sans-serif">and workplace heat completely?"</text>
  <text x="528" y="136" fill="#D97706" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Danger: Unactionable, boiling the ocean</text>
</svg>""",

    "rice-prioritization-matrix.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">The RICE Feature Prioritization Equation: (R × I × C) / E</text>

  <rect x="20" y="46" width="168" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.6"/>
  <text x="104" y="72" fill="#0891B2" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">R = REACH</text>
  <text x="104" y="94" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">How many users impacted</text>
  <text x="104" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">per quarter? (e.g. 1,200)</text>
  <text x="104" y="134" fill="#0891B2" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Volume Multiplier</text>

  <rect x="200" y="46" width="168" height="106" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.6"/>
  <text x="284" y="72" fill="#0284C7" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">I = IMPACT</text>
  <text x="284" y="94" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">How much pain relieved?</text>
  <text x="284" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">3 = Massive · 2 = High · 1 = Med</text>
  <text x="284" y="134" fill="#0284C7" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Pain Relief Scale</text>

  <rect x="380" y="46" width="168" height="106" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.6"/>
  <text x="464" y="72" fill="#7C3AED" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">C = CONFIDENCE</text>
  <text x="464" y="94" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">How certain are we?</text>
  <text x="464" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">100% = Dossier verified</text>
  <text x="464" y="134" fill="#7C3AED" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Evidence Calibration</text>

  <rect x="560" y="46" width="180" height="106" rx="8" fill="#FFFFFF" stroke="#EA580C" stroke-width="2"/>
  <text x="650" y="72" fill="#EA580C" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">E = EFFORT (DIVISOR)</text>
  <text x="650" y="94" fill="#1E293B" font-size="11" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Total person-weeks to build</text>
  <text x="650" y="112" fill="#64748B" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Divide numerator by effort</text>
  <text x="650" y="134" fill="#EA580C" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">High RICE = Build First</text>
</svg>""",

    "mvp-pyramid.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">The Vertical MVP Slice: Quality Across All 4 Layers</text>

  <rect x="24" y="46" width="340" height="106" rx="8" fill="#FFFFFF" stroke="#DC2626" stroke-width="1.5"/>
  <text x="194" y="70" fill="#DC2626" font-size="13" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">❌ HORIZONTAL BUILD (ANTI-PATTERN)</text>
  <text x="194" y="94" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Building 100% of the functional backend first</text>
  <text x="194" y="112" fill="#334155" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">with zero UX, delight, or user feedback</text>
  <text x="194" y="136" fill="#DC2626" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Users cannot test or adopt invisible code</text>

  <rect x="396" y="46" width="340" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="566" y="70" fill="#059669" font-size="13" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">✅ VERTICAL SLICE (TRUE MVP)</text>
  <text x="566" y="94" fill="#1E293B" font-size="11" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Slicing 1 core workflow from top to bottom:</text>
  <text x="566" y="112" fill="#1E293B" font-size="11" text-anchor="middle" font-family="system-ui, sans-serif">Functional · Reliable · Usable · Delightful</text>
  <text x="566" y="136" fill="#059669" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Immediate customer adoption &amp; learning</text>
</svg>""",

    "pilot-conversion-funnel.svg": """<svg viewBox="0 0 760 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="760" height="170" rx="12" fill="#F8FAFC"/>
  <text x="380" y="26" fill="#0F172A" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Customer Pilot Agreement &amp; Contract Conversion Funnel</text>

  <rect x="20" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#0891B2" stroke-width="1.5"/>
  <text x="86" y="70" fill="#0891B2" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">1. AGREEMENT</text>
  <text x="86" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">One-page memo</text>
  <text x="86" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">14-to-30 day sprint</text>
  <text x="86" y="126" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Explicit success KPI</text>
  <text x="86" y="142" fill="#0891B2" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Zero Legalese</text>

  <rect x="168" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.5"/>
  <text x="234" y="70" fill="#0284C7" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">2. ONBOARD</text>
  <text x="234" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Shadow first user</text>
  <text x="234" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">In-person / Zoom</text>
  <text x="234" y="126" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Zero onboarding drop</text>
  <text x="234" y="142" fill="#0284C7" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">High Touch VIP</text>

  <rect x="316" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="382" y="70" fill="#7C3AED" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">3. BENCHMARK</text>
  <text x="382" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Daily usage log</text>
  <text x="382" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Measure time saved</text>
  <text x="382" y="126" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Hard empirical data</text>
  <text x="382" y="142" fill="#7C3AED" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">KPI Verification</text>

  <rect x="464" y="46" width="132" height="106" rx="8" fill="#FFFFFF" stroke="#EA580C" stroke-width="1.8"/>
  <text x="530" y="70" fill="#EA580C" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">4. RETROSPECTIVE</text>
  <text x="530" y="92" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">Present scorecard</text>
  <text x="530" y="108" fill="#334155" font-size="10" text-anchor="middle" font-family="system-ui, sans-serif">to Buyer / Payer</text>
  <text x="530" y="126" fill="#64748B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Prove ROI savings</text>
  <text x="530" y="142" fill="#EA580C" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Show &amp; Tell Proof</text>

  <rect x="612" y="46" width="128" height="106" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="676" y="70" fill="#059669" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">5. CONVERT</text>
  <text x="676" y="92" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Annual contract</text>
  <text x="676" y="108" fill="#1E293B" font-size="10" font-weight="semibold" text-anchor="middle" font-family="system-ui, sans-serif">Upfront deposit</text>
  <text x="676" y="126" fill="#1E293B" font-size="9" text-anchor="middle" font-family="system-ui, sans-serif">Reference quote</text>
  <text x="676" y="142" fill="#059669" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Paid Customer 🎉</text>
</svg>"""
}

target_dir = "public/academy/diagrams"
os.makedirs(target_dir, exist_ok=True)

for fname, svg_content in C4_DIAGRAMS.items():
    filepath = os.path.join(target_dir, fname)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg_content.strip())
    print(f"Created {filepath}")

# Now inject into course4Data.ts
C4_IMAGES = {
    (1, 0): {
        "url": "/academy/diagrams/double-diamond-design.svg",
        "caption": "Figure 1.1: The Double Diamond Framework: Diverging and converging across problem space and solution space.",
        "alt": "Double Diamond Design Process Diagram"
    },
    (2, 0): {
        "url": "/academy/diagrams/user-journey-map.svg",
        "caption": "Figure 2.1: The 5-Stage Customer Journey Map with emotional highs, lows, and pain trigger moments.",
        "alt": "User Journey Map Diagram"
    },
    (3, 0): {
        "url": "/academy/diagrams/how-might-we-framing.svg",
        "caption": "Figure 3.1: How Might We (HMW) Framing: Calibrating between overly narrow and overly broad problem statements.",
        "alt": "How Might We Problem Framing Diagram"
    },
    (5, 0): {
        "url": "/academy/diagrams/rice-prioritization-matrix.svg",
        "caption": "Figure 5.1: The RICE Prioritization Equation: Balancing Reach, Impact, and Confidence against Engineering Effort.",
        "alt": "RICE Prioritization Formula Diagram"
    },
    (8, 0): {
        "url": "/academy/diagrams/mvp-pyramid.svg",
        "caption": "Figure 8.1: The True MVP: Slicing vertically across functional, reliable, usable, and delightful layers.",
        "alt": "MVP Vertical Slice Pyramid Diagram"
    },
    (10, 0): {
        "url": "/academy/diagrams/pilot-conversion-funnel.svg",
        "caption": "Figure 10.1: The 5-Stage Customer Pilot Funnel: Converting proof-of-concept agreements into recurring contracts.",
        "alt": "Pilot Conversion Funnel Diagram"
    }
}

with open("scratch/build_course4_ts.py", "r", encoding="utf-8") as f:
    c4_script = f.read()

# Check if SECTION_IMAGES is in build_course4_ts.py, if not, update it and run
with open("src/data/course4Data.ts", "r", encoding="utf-8") as f:
    c4_content = f.read()

# Parse JSON from course4Data.ts and re-inject
parts_part, chapters_part = c4_content.split("export const COURSE_4_CHAPTERS: AcademyChapter[] = ")
chapters_json = chapters_part.rstrip(";\n")
chapters_data = json.loads(chapters_json)

for ch in chapters_data:
    ch_num = ch["num"]
    for s_idx, sec in enumerate(ch["sections"]):
        if (ch_num, s_idx) in C4_IMAGES:
            sec["image"] = C4_IMAGES[(ch_num, s_idx)]

new_c4_content = parts_part + "export const COURSE_4_CHAPTERS: AcademyChapter[] = " + json.dumps(chapters_data, indent=2) + ";\n"
with open("src/data/course4Data.ts", "w", encoding="utf-8") as f:
    f.write(new_c4_content)

print("Updated src/data/course4Data.ts with diagrams!")
