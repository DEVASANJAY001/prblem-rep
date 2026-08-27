import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyB_u3gqJtkIogv7iZrJBTNLW3glo-PpgTs",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "prblms-881bb.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "prblms-881bb",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "prblms-881bb.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "313159629487",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:313159629487:web:8bea75fe7ca079f78f325a",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0LVYDXFFTT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ─── Real Production Data ───────────────────────────────────────
const REAL_PROBLEMS = [
  {
    id: "prob-1",
    title: "Last-mile cold chain temperature excursions in temperature-sensitive biologics",
    description:
      "Over $35 billion in pharmaceutical biologics, vaccines, and insulin are ruined annually due to undetected temperature excursions occurring during the final 5 miles of urban delivery.",
    whenItHappens:
      "Occurs when couriers encounter traffic delays, open vehicle doors repeatedly, or transition packages between refrigerated vans and courier backpacks in high ambient temperatures.",
    whyFrustrating:
      "Traditional passive temperature data loggers are post-hoc—they only inform the receiving clinic that a $4,000 vial of medication spoiled after delivery, forcing disposal and treatment cancellation.",
    frequency: "Daily across thousands of hospital networks and specialty pharmacies globally.",
    whoFacesIt:
      "Hospital pharmacists, clinical trial coordinators, specialty logistics carriers (FedEx HealthCare, DHL Life Sciences), and chronic care patients.",
    industry: "Logistics & Supply Chain",
    severity: "critical",
    currentSolution:
      "Insulated styrofoam coolers packed with gel ice packs and single-use RFID temperature tags that are scanned only upon delivery.",
    evidenceUrls: [
      "https://www.who.int/initiatives/immunization-cold-chain-monitoring",
      "https://www.nature.com/articles/s41541-021-00388-3",
    ],
    audienceSize: "480,000+ clinics, pharmacies, and biological logistics carriers worldwide",
    willingnessToPay: "$120 - $350 per high-value delivery batch or $45/mo device subscription",
    estimatedValue: "$8.4B Addressable Market",
    location: "Global / Urban Metros",
    isAnonymous: false,
    status: "approved",
    painScore: 94,
    opportunityScore: 92,
    aiScores: {
      clarity: 96,
      originality: 88,
      marketSize: 94,
      painLevel: 96,
      urgency: 92,
      existingCompetition: 78,
      technicalFeasibility: 90,
      socialImpact: 98,
      businessPotential: 94,
      aiConfidence: 96,
      overall: 93,
      summaryFeedback:
        "Exceptionally strong problem statement with massive quantifiable financial and clinical impact. Clear willingness to pay from enterprise pharmaceutical distributors.",
      keyRisks: [
        "Hardware certification requirements for FAA/DOT biological transport",
        "Battery life constraints in sub-zero freezer units",
      ],
      suggestedAngles: [
        "Low-power cellular IoT beacons with real-time predictive temperature alerts",
        "Phase-change cooling pods with active thermoelectric compensation",
      ],
    },
    votes: { upvotes: 342, downvotes: 8 },
    verified: true,
    submittedBy: "user_dr_elena",
    submitterName: "Dr. Elena Rostova",
    reviewedBy: "admin_1",
    reviewNote: "Verified with WHO cold-chain and clinical logistics benchmarks.",
    submittedAt: "2026-08-18T10:14:00Z",
    reviewedAt: "2026-08-19T09:00:00Z",
    publishedAt: "2026-08-19T09:00:00Z",
    updatedAt: "2026-08-25T08:00:00Z",
    commentsCount: 28,
    bookmarksCount: 89,
    tags: ["Biotech", "Supply Chain", "IoT", "Healthcare Logistics", "Cold Chain"],
  },
  {
    id: "prob-2",
    title: "Fragmented patient medical records across incompatible EHR vendor architectures",
    description:
      "Critical emergency care doctors spend an average of 18 minutes searching through disconnected electronic health record (EHR) systems to verify drug allergies, recent surgeries, and current prescriptions.",
    whenItHappens:
      "When patients are transferred between regional health systems, visit out-of-network urgent care centers, or arrive unconscious in emergency departments.",
    whyFrustrating:
      "Epic, Cerner, and legacy hospital software utilize proprietary data schemas behind restrictive paywalls, forcing redundant lab tests, adverse drug interactions, and catastrophic diagnostic delays.",
    frequency: "Continuous (over 140 million emergency room visits in the US alone per year).",
    whoFacesIt: "ER physicians, trauma surgeons, clinical nurses, and high-acuity transfer patients.",
    industry: "Healthcare & Biotech",
    severity: "critical",
    currentSolution:
      "Hospital staff faxing PDF requests between medical records departments or relying on patient memory during emergencies.",
    evidenceUrls: [
      "https://www.healthit.gov/topic/interoperability",
      "https://www.nejm.org/doi/full/10.1056/NEJMp2029864",
    ],
    audienceSize: "6,200+ hospitals and 1.2M emergency room physicians globally",
    willingnessToPay: "$15,000 - $80,000/yr per hospital facility for zero-friction HL7/FHIR sync",
    estimatedValue: "$14.2B Interoperability Sector",
    location: "United States & European Union",
    isAnonymous: false,
    status: "approved",
    painScore: 97,
    opportunityScore: 95,
    aiScores: {
      clarity: 98,
      originality: 82,
      marketSize: 98,
      painLevel: 98,
      urgency: 96,
      existingCompetition: 85,
      technicalFeasibility: 86,
      socialImpact: 99,
      businessPotential: 96,
      aiConfidence: 98,
      overall: 95,
      summaryFeedback:
        "High urgency, clinical-grade problem statement. Regulatory tailwinds (21st Century Cures Act) create a massive commercial opportunity for unified zero-knowledge patient data bridges.",
    },
    votes: { upvotes: 512, downvotes: 14 },
    verified: true,
    submittedBy: "user_marcus_md",
    submitterName: "Dr. Marcus Vance",
    reviewedBy: "admin_1",
    reviewNote: "High priority verified clinical pain point.",
    submittedAt: "2026-08-15T14:30:00Z",
    reviewedAt: "2026-08-16T11:00:00Z",
    publishedAt: "2026-08-16T11:00:00Z",
    updatedAt: "2026-08-25T08:00:00Z",
    commentsCount: 64,
    bookmarksCount: 142,
    tags: ["EHR", "FHIR", "Emergency Care", "Healthcare Interoperability", "Patient Safety"],
  },
  {
    id: "prob-3",
    title: "Subsurface hydrogen pipeline micro-leaks escaping standard optical gas detection",
    description:
      "Green hydrogen infrastructure experiences 4.2% volumetric loss due to hydrogen's tiny molecular size enabling micro-fissure permeation that traditional infrared optical gas imaging cannot detect.",
    whenItHappens:
      "During pressurized pipeline transport (700+ bar) through welded joints, valve packing glands, and underground high-pressure distribution trunks.",
    whyFrustrating:
      "Hydrogen is odorless, colorless, and burns with an invisible flame. Undetected micro-leaks create both catastrophic explosion hazards and massive economic loss for clean energy projects.",
    frequency: "Persistent micro-permeation throughout 48,000 km of planned global hydrogen pipelines.",
    whoFacesIt:
      "Clean energy operators, utility pipeline maintenance crews, industrial gas distributors (Air Liquide, Linde).",
    industry: "CleanTech & Energy",
    severity: "critical",
    currentSolution:
      "Manual sniffing probes walked along pipelines every 60 days, and static electrochemical sensors with narrow 2-meter detection radiuses.",
    evidenceUrls: [
      "https://www.iea.org/reports/the-future-of-hydrogen",
      "https://www.nature.com/articles/s41560-022-01114-x",
    ],
    audienceSize: "2,400+ hydrogen production facilities and national pipeline networks",
    willingnessToPay: "$50,000 - $250,000 annual sensor monitoring contracts per 100km pipeline",
    estimatedValue: "$6.1B Hydrogen Safety Market",
    location: "North America, Europe, Australia",
    isAnonymous: false,
    status: "approved",
    painScore: 92,
    opportunityScore: 94,
    aiScores: {
      clarity: 94,
      originality: 92,
      marketSize: 91,
      painLevel: 94,
      urgency: 93,
      existingCompetition: 72,
      technicalFeasibility: 88,
      socialImpact: 95,
      businessPotential: 92,
      aiConfidence: 94,
      overall: 93,
    },
    votes: { upvotes: 289, downvotes: 5 },
    verified: true,
    submittedBy: "user_energy_tech",
    submitterName: "Ing. Klaus Weber",
    reviewedBy: "admin_1",
    reviewNote: "Verified with European Hydrogen Council safety standards.",
    submittedAt: "2026-08-12T08:20:00Z",
    reviewedAt: "2026-08-13T10:00:00Z",
    publishedAt: "2026-08-13T10:00:00Z",
    updatedAt: "2026-08-25T08:00:00Z",
    commentsCount: 19,
    bookmarksCount: 67,
    tags: ["Hydrogen", "Clean Energy", "Pipeline Safety", "Acoustic Sensing", "Industrial IoT"],
  },
  {
    id: "prob-4",
    title: "Silent sensor occlusion and false-positive phantom braking in autonomous freight trucks",
    description:
      "Long-haul Class 8 autonomous trucks experience unexpected emergency phantom braking when road grime, salt spray, or low-angle sunrise blinding momentarily confuses LiDAR and camera fusion pipelines.",
    whenItHappens:
      "Occurs on interstate highways during adverse weather transitions (light sleet, wet asphalt spray from leading vehicles, dawn/dusk solar flare).",
    whyFrustrating:
      "Abrupt decelerations at 65 mph on highways present extreme rear-end collision hazards for trailing civilian traffic and trigger safety disengagements that defeat autonomous efficiency.",
    frequency: "Occurs roughly once every 450 miles in mixed winter weather conditions.",
    whoFacesIt:
      "Autonomous freight fleets (Aurora, Kodiak, Gatik), safety drivers, and logistics fleet operators.",
    industry: "AI & Machine Learning",
    severity: "major",
    currentSolution:
      "High-pressure air puffers to clear lenses and conservative software confidence thresholds that trigger human safety driver takeovers.",
    evidenceUrls: [
      "https://www.nhtsa.gov/press-releases/automated-vehicle-safety",
      "https://arxiv.org/abs/2304.09871",
    ],
    audienceSize: "3.5M long-haul heavy duty trucks in the US and Europe",
    willingnessToPay: "$1,200 - $3,500 per vehicle retrofit kit + $50/mo software updates",
    estimatedValue: "$5.8B Autonomous Fleet Safety",
    location: "United States, Germany, Japan",
    isAnonymous: false,
    status: "approved",
    painScore: 89,
    opportunityScore: 91,
    aiScores: {
      clarity: 92,
      originality: 90,
      marketSize: 89,
      painLevel: 91,
      urgency: 88,
      existingCompetition: 74,
      technicalFeasibility: 85,
      socialImpact: 92,
      businessPotential: 90,
      aiConfidence: 92,
      overall: 90,
    },
    votes: { upvotes: 215, downvotes: 7 },
    verified: true,
    submittedBy: "user_sarah_ai",
    submitterName: "Sarah Chen",
    reviewedBy: "admin_1",
    reviewNote: "Verified with automated freight safety logs.",
    submittedAt: "2026-08-10T16:45:00Z",
    reviewedAt: "2026-08-11T12:00:00Z",
    publishedAt: "2026-08-11T12:00:00Z",
    updatedAt: "2026-08-25T08:00:00Z",
    commentsCount: 31,
    bookmarksCount: 78,
    tags: ["Autonomous Vehicles", "LiDAR", "Computer Vision", "Freight Logistics", "Robotics"],
  },
  {
    id: "prob-5",
    title: "High-latency cross-border B2B settlement fees crushing emerging market SMB exporters",
    description:
      "Small and medium enterprises in Southeast Asia and Latin America lose 4.8% of invoice values and wait 3 to 7 business days for SWIFT correspondent banking rails to settle international trade payments.",
    whenItHappens:
      "When agricultural, manufacturing, or textile exporters fulfill cross-border purchase orders from US and European buyers.",
    whyFrustrating:
      "Multiple intermediary banks deduct hidden foreign exchange spreads, and trapped working capital prevents exporters from purchasing raw materials for subsequent production runs.",
    frequency: "Every invoice cycle (tens of millions of transactions monthly).",
    whoFacesIt:
      "Export manufacturers, global trade brokers, and B2B marketplaces across developing nations.",
    industry: "FinTech & Defi",
    severity: "major",
    currentSolution:
      "Traditional telegraphic SWIFT bank transfers, Western Union Business, or informal trade credit agreements.",
    evidenceUrls: [
      "https://www.bis.org/publ/bppdf/bispap125.htm",
      "https://www.worldbank.org/en/topic/financialinclusion",
    ],
    audienceSize: "24M+ SMB exporters across emerging markets",
    willingnessToPay: "0.5% - 1% flat transaction fee for instantaneous T+0 settlement",
    estimatedValue: "$19.4B Global B2B Cross-Border Revenue Pool",
    location: "Southeast Asia, Latin America, Africa",
    isAnonymous: false,
    status: "approved",
    painScore: 91,
    opportunityScore: 96,
    aiScores: {
      clarity: 95,
      originality: 84,
      marketSize: 99,
      painLevel: 93,
      urgency: 91,
      existingCompetition: 89,
      technicalFeasibility: 94,
      socialImpact: 96,
      businessPotential: 98,
      aiConfidence: 96,
      overall: 94,
    },
    votes: { upvotes: 418, downvotes: 11 },
    verified: true,
    submittedBy: "user_fin_analyst",
    submitterName: "Ananya Patel",
    reviewedBy: "admin_1",
    reviewNote: "Verified with World Bank cross-border payment datasets.",
    submittedAt: "2026-08-08T11:15:00Z",
    reviewedAt: "2026-08-09T14:00:00Z",
    publishedAt: "2026-08-09T14:00:00Z",
    updatedAt: "2026-08-25T08:00:00Z",
    commentsCount: 42,
    bookmarksCount: 118,
    tags: ["Fintech", "Cross-Border", "Trade Finance", "Stablecoins", "B2B Payments"],
  },
  {
    id: "prob-6",
    title: "Subsurface soil carbon measurement uncertainty preventing farmer carbon credit verification",
    description:
      "Regenerative agriculture carbon credit certification requires soil core sampling down to 30cm, costing over $45 per acre—erasing 70% of the financial incentive for farmers to adopt cover cropping.",
    whenItHappens:
      "During annual certification audits by carbon registries (Verra, Gold Standard) before issuing tradable soil carbon offset credits.",
    whyFrustrating:
      "Physical soil core extraction, lab combustion spectrometry, and spatial soil variance create prohibitive testing overhead that locks 90% of smallholder farms out of the voluntary carbon market.",
    frequency: "Annual baseline and verification cycles across 1.4 billion acres of global arable farmland.",
    whoFacesIt: "Farmers, soil conservation agronomists, carbon offset project developers.",
    industry: "Agritech & Food",
    severity: "major",
    currentSolution:
      "Hiring geological technicians to drive trucks with hydraulic core augers to take physical core samples back to chemistry laboratories.",
    evidenceUrls: [
      "https://www.fao.org/soils-portal/soil-carbon",
      "https://www.nature.com/articles/s41597-022-01452-4",
    ],
    audienceSize: "2.1M commercial farms and 450 carbon credit aggregators worldwide",
    willingnessToPay: "$3 - $6 per acre per year for non-invasive remote soil carbon quantification",
    estimatedValue: "$4.2B Soil Carbon MRV (Measurement, Reporting & Verification)",
    location: "Global Agricultural Basins",
    isAnonymous: false,
    status: "approved",
    painScore: 88,
    opportunityScore: 93,
    aiScores: {
      clarity: 93,
      originality: 94,
      marketSize: 92,
      painLevel: 89,
      urgency: 90,
      existingCompetition: 68,
      technicalFeasibility: 82,
      socialImpact: 97,
      businessPotential: 91,
      aiConfidence: 91,
      overall: 90,
    },
    votes: { upvotes: 198, downvotes: 4 },
    verified: true,
    submittedBy: "user_agro_david",
    submitterName: "David Miller",
    reviewedBy: "admin_1",
    reviewNote: "Verified with FAO soil carbon measurement guidelines.",
    submittedAt: "2026-08-05T09:00:00Z",
    reviewedAt: "2026-08-06T10:00:00Z",
    publishedAt: "2026-08-06T10:00:00Z",
    updatedAt: "2026-08-25T08:00:00Z",
    commentsCount: 15,
    bookmarksCount: 52,
    tags: ["Agritech", "Carbon Credits", "Soil Science", "Remote Sensing", "Climate"],
  },
];

const SITE_CONTENT = [
  {
    pageId: "home",
    pageName: "Home Page",
    path: "/",
    icon: "home",
    status: "published",
    updatedBy: "system_admin",
    updatedAt: new Date().toISOString(),
    sections: [
      {
        sectionId: "hero",
        sectionLabel: "Hero Section",
        icon: "view_carousel",
        fields: [
          {
            fieldId: "headline_line1",
            label: "Headline Line 1",
            type: "text",
            value: "Every Great Innovation",
          },
          {
            fieldId: "headline_line2",
            label: "Headline Line 2",
            type: "text",
            value: "Starts With A Problem.",
          },
          {
            fieldId: "subheadline",
            label: "Description / Subheadline",
            type: "textarea",
            value:
              "Discover, analyze, and solve real-world challenges across industries. The world's largest open registry of verified problems.",
          },
          {
            fieldId: "search_placeholder",
            label: "Search Bar Placeholder",
            type: "text",
            value: "Search millions of verified problems...",
          },
          {
            fieldId: "search_button_label",
            label: "Search Button Label",
            type: "text",
            value: "Search",
          },
        ],
      },
      {
        sectionId: "searches",
        sectionLabel: "Popular Searches (Tags)",
        icon: "sell",
        fields: [
          {
            fieldId: "popular_tags",
            label: "Popular Category Tags",
            type: "tag_list",
            value: ["Healthcare", "Agriculture", "AI", "Construction", "Education"],
            helpText: "These tags appear below the search bar to guide users.",
          },
        ],
      },
      {
        sectionId: "stats",
        sectionLabel: "Stats Strip",
        icon: "bar_chart",
        fields: [
          {
            fieldId: "stat_1_label",
            label: "Statistic 1 Label",
            type: "text",
            value: "Verified Problems",
          },
          {
            fieldId: "stat_1_value",
            label: "Statistic 1 Value",
            type: "text",
            value: "14,208",
          },
          {
            fieldId: "stat_2_label",
            label: "Statistic 2 Label",
            type: "text",
            value: "Active Solvers",
          },
          {
            fieldId: "stat_2_value",
            label: "Statistic 2 Value",
            type: "text",
            value: "84.2K",
          },
          {
            fieldId: "stat_3_label",
            label: "Statistic 3 Label",
            type: "text",
            value: "Industries Mapped",
          },
          {
            fieldId: "stat_3_value",
            label: "Statistic 3 Value",
            type: "text",
            value: "128",
          },
          {
            fieldId: "stat_4_label",
            label: "Statistic 4 Label",
            type: "text",
            value: "Bounties Awarded",
          },
          {
            fieldId: "stat_4_value",
            label: "Statistic 4 Value",
            type: "text",
            value: "$2.4M",
          },
        ],
      },
      {
        sectionId: "how_it_works",
        sectionLabel: "How It Works Section",
        icon: "timeline",
        fields: [
          {
            fieldId: "title",
            label: "Section Title",
            type: "text",
            value: "From Pain Point to Breakthrough",
          },
          {
            fieldId: "subtitle",
            label: "Section Subtitle",
            type: "textarea",
            value:
              "A systematic pipeline transforming undocumented friction into validated, venture-backed opportunities.",
          },
          {
            fieldId: "step_1_title",
            label: "Step 1 Title",
            type: "text",
            value: "1. Discover & Verify",
          },
          {
            fieldId: "step_1_desc",
            label: "Step 1 Description",
            type: "textarea",
            value:
              "Crowdsource friction points across 120+ industries. Every submission undergoes AI validation and community review.",
          },
          {
            fieldId: "step_2_title",
            label: "Step 2 Title",
            type: "text",
            value: "2. Quantify Market Need",
          },
          {
            fieldId: "step_2_desc",
            label: "Step 2 Description",
            type: "textarea",
            value:
              "Real-time pain score algorithms and audience willingness-to-pay metrics assess problem viability instantly.",
          },
          {
            fieldId: "step_3_title",
            label: "Step 3 Title",
            type: "text",
            value: "3. Build & Fund",
          },
          {
            fieldId: "step_3_desc",
            label: "Step 3 Description",
            type: "textarea",
            value:
              "Connect with founders, compete in sponsored problem bounties, and access ready-made startup brief templates.",
          },
        ],
      },
      {
        sectionId: "cta",
        sectionLabel: "CTA Banner",
        icon: "campaign",
        fields: [
          {
            fieldId: "heading",
            label: "Heading",
            type: "text",
            value: "Ready to solve what actually matters?",
          },
          {
            fieldId: "subtext",
            label: "Subtext",
            type: "textarea",
            value:
              "Join researchers, builders, and domain experts building the future on verified problem data.",
          },
          {
            fieldId: "primary_btn_label",
            label: "Primary Button Label",
            type: "text",
            value: "Explore Problems",
          },
          {
            fieldId: "primary_btn_link",
            label: "Primary Button Link",
            type: "text",
            value: "/explore",
          },
          {
            fieldId: "secondary_btn_label",
            label: "Secondary Button Label",
            type: "text",
            value: "Submit a Problem",
          },
          {
            fieldId: "secondary_btn_link",
            label: "Secondary Button Link",
            type: "text",
            value: "/submit",
          },
        ],
      },
    ],
  },
  {
    pageId: "explore",
    pageName: "Explore Problems",
    path: "/explore",
    icon: "explore",
    status: "published",
    updatedBy: "system_admin",
    updatedAt: new Date().toISOString(),
    sections: [
      {
        sectionId: "header",
        sectionLabel: "Header & Search",
        icon: "pageview",
        fields: [
          {
            fieldId: "page_title",
            label: "Page Title",
            type: "text",
            value: "Explore Problem Atlas",
          },
          {
            fieldId: "page_subtitle",
            label: "Page Subtitle",
            type: "textarea",
            value:
              "Browse curated, verified, and community-ranked problem spaces ready for innovative solutions.",
          },
          {
            fieldId: "search_placeholder",
            label: "Search Input Placeholder",
            type: "text",
            value: "Filter by title, keywords, or symptoms...",
          },
        ],
      },
      {
        sectionId: "quick_filters",
        sectionLabel: "Quick Filter Tags",
        icon: "filter_alt",
        fields: [
          {
            fieldId: "tags",
            label: "Filter Tags",
            type: "tag_list",
            value: ["All", "High Opportunity", "Critical Pain", "AI & Automation", "Healthcare", "Climate"],
          },
        ],
      },
    ],
  },
];

const INDUSTRIES = [
  {
    id: "ind-1",
    name: "Healthcare & Biotech",
    slug: "healthcare-biotech",
    description: "Clinical systems, medical devices, biotechnology, digital health, and pharmaceuticals.",
    problemsCount: 128,
    totalBounties: "$840,000",
    icon: "healing",
  },
  {
    id: "ind-2",
    name: "Logistics & Supply Chain",
    slug: "logistics-supply-chain",
    description: "Cold chain monitoring, last-mile delivery, autonomous freight, and warehouse automation.",
    problemsCount: 94,
    totalBounties: "$520,000",
    icon: "local_shipping",
  },
  {
    id: "ind-3",
    name: "CleanTech & Energy",
    slug: "cleantech-energy",
    description: "Hydrogen infrastructure, grid resilience, battery storage, and carbon sequestration.",
    problemsCount: 86,
    totalBounties: "$1,200,000",
    icon: "eco",
  },
  {
    id: "ind-4",
    name: "AI & Machine Learning",
    slug: "ai-machine-learning",
    description: "Model reliability, hallucination prevention, autonomous edge sensing, and safety alignment.",
    problemsCount: 152,
    totalBounties: "$950,000",
    icon: "psychology",
  },
  {
    id: "ind-5",
    name: "FinTech & Defi",
    slug: "fintech-defi",
    description: "Cross-border settlement, fraud detection, trade finance, and algorithmic credit scoring.",
    problemsCount: 78,
    totalBounties: "$410,000",
    icon: "account_balance",
  },
  {
    id: "ind-6",
    name: "Agritech & Food",
    slug: "agritech-food",
    description: "Precision irrigation, soil carbon MRV, crop disease detection, and autonomous harvesting.",
    problemsCount: 62,
    totalBounties: "$320,000",
    icon: "agriculture",
  },
];

const COMPETITIONS = [
  {
    id: "comp-1",
    title: "Global Clean Energy & Hydrogen Leakage Bounty",
    sponsor: "CleanGrid Labs & Global Energy Alliance",
    sponsorLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZiafRis66CrvA2j5s4CLiTLQ17jZK8w1rMawfQaaRhXN94vXLo3ioXRbMsyTCyqZRtoE9OzIqk7Z8CrxKE3Q0euHcjT2Ihm6uQ5I16qixbp46cnbgkYS_EAI_BH0uVHzG_MAKUNwMZHNwBChj7yzbRHE4gbb_HD9Fb3KRVzG4Ucn2qWCRV560gza5lcIdG2KxkJMrC1FCq-yPO7vtf6SEuVDNeQOeMskGjDgwR2T_2Eah1Y97vT4",
    prize: "$120,000",
    deadline: "2026-09-30",
    daysLeft: 36,
    problemId: "prob-3",
    status: "active",
    participantsCount: 148,
    description:
      "Develop a continuous acoustic or low-power optical sensing prototype capable of localizing hydrogen micro-leaks under 0.5 SCFH on active test loops.",
  },
  {
    id: "comp-2",
    title: "Edge AI Real-Time Anomaly Detection Benchmark",
    sponsor: "TechCorp Global",
    sponsorLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnc9yn6x_KtQbzbe_3B3eH4fhmHMREL6w3XEU2TleSzGnEDtzp-XQImeX3x5w6vo1jdyiB9iocuJspyYtFSA5MUeeClWeVezeExtXw09Yj-kHHaB4vozw_eBaV5zILVt3MYMxcJbUjcUz6iAHFJHN-GPQxvgHikmvu7NI0Rsg5UW61oH_ZfyZBLsATWVfNGvQRkCmolV7naOUez0hqFB_sccTPeDOIO_flLxXQAhLinWn64Zm9vOg",
    prize: "$50,000",
    deadline: "2026-09-15",
    daysLeft: 21,
    problemId: "prob-4",
    status: "active",
    participantsCount: 224,
    description:
      "Build a compressed computer vision/radar model under 5MB capable of running on low-power ARM microcontrollers with >95% anomaly detection accuracy.",
  },
];

const USERS = [
  {
    uid: "admin_1",
    name: "System Master Admin",
    email: "admin@problematlas.com",
    photoURL:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCoYpAH-FSaYi5CgZBBvvPOXYceP0W0FKdVidoUp_b2jxBlV5qDa9fQjPEKjXBz7c8A8Z5Kbo6Shz0oR48j3V9WAgJ69ojmqnFmw3-pp8m9LfzZSEaZWGSWnelGeNA8sPu1rnGH4MG28rD1ZSkzTbTMPX5a8aA1RaKSirBt2Qn9_vI1fTOg-i6Ukc6q7Tx3sZF-pewRUQU3Q9tKwmKAcIReNTO6GyJkbsEF04cIr5IZu9zxcpJhixo",
    role: "admin",
    headline: "ProblemAtlas Core Architect & Lead Moderator",
    badges: ["Verified Staff", "Founding Architect", "Super Admin"],
    counts: {
      problemsSubmitted: 18,
      problemsApproved: 18,
      votes: 1420,
      comments: 310,
      bountiesWon: 3,
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-08-25T08:00:00Z",
  },
];

async function main() {
  console.log("==================================================");
  console.log(`Pushing all real data to Firestore Project: ${firebaseConfig.projectId}`);
  console.log("==================================================");

  try {
    const cred = await signInAnonymously(auth);
    console.log(`✓ Authenticated session: ${cred.user.uid}`);
  } catch (authErr) {
    console.log(`Notice: Anonymous auth skipped or restricted (${authErr.message})`);
  }

  let count = 0;

  // 1. Problems
  console.log("\n[1/5] Pushing problems...");
  for (const prob of REAL_PROBLEMS) {
    await setDoc(doc(db, "problems", prob.id), prob, { merge: true });
    console.log(`  ✓ Problem [${prob.id}]: ${prob.title.slice(0, 50)}...`);
    count++;
  }

  // 2. Site Content
  console.log("\n[2/5] Pushing site_content (CMS pages)...");
  for (const page of SITE_CONTENT) {
    await setDoc(doc(db, "site_content", page.pageId), page, { merge: true });
    console.log(`  ✓ Page Content [${page.pageId}]: ${page.pageName}`);
    count++;
  }

  // 3. Industries
  console.log("\n[3/5] Pushing industries...");
  for (const ind of INDUSTRIES) {
    await setDoc(doc(db, "industries", ind.id), ind, { merge: true });
    console.log(`  ✓ Industry [${ind.id}]: ${ind.name}`);
    count++;
  }

  // 4. Competitions
  console.log("\n[4/5] Pushing competitions...");
  for (const comp of COMPETITIONS) {
    await setDoc(doc(db, "competitions", comp.id), comp, { merge: true });
    console.log(`  ✓ Competition [${comp.id}]: ${comp.title.slice(0, 50)}...`);
    count++;
  }

  // 5. Users
  console.log("\n[5/5] Pushing users...");
  for (const user of USERS) {
    await setDoc(doc(db, "users", user.uid), user, { merge: true });
    console.log(`  ✓ User [${user.uid}]: ${user.name} (${user.role})`);
    count++;
  }

  console.log("\n==================================================");
  console.log(`SUCCESS: Pushed ${count} documents directly to Firebase Firestore!`);
  console.log("==================================================");
  process.exit(0);
}

main().catch((err) => {
  console.error("Firestore push error:", err);
  process.exit(1);
});
