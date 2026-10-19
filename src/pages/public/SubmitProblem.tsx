import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { createProblem } from "@/lib/firebase/services/problemsService";
import { subscribeCredits } from "@/lib/firebase/services/creditsService";
import { recordUserSubmission } from "@/lib/storage";
import { getProblemDetailUrl, getStartupModeUrl } from "@/lib/seoUrls";
import { SEOHead } from "@/components/common/SEOHead";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { EvidenceDocument, ProblemSeverity, CreditSourceDoc } from "@/types";
import confetti from "canvas-confetti";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { HumanVerification } from "@/components/common/HumanVerification";
import { CreditSourceBadge } from "@/components/ui/CreditSourceBadge";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Building2,
  Users,
  DollarSign,
  ShieldCheck,
  Search,
  TrendingUp,
  Sparkles,
  Plus,
  X,
  ExternalLink,
  Rocket,
  Code,
  Zap,
  Globe,
  Layers,
  BarChart3,
  Lightbulb,
  Check,
  AlertCircle,
  Clock,
  Briefcase,
  HelpCircle,
  Eye,
  Sliders,
  Flame,
  FileCheck2,
  RotateCcw,
} from "lucide-react";

export const SubmitProblem: React.FC = () => {
  const navigate = useNavigate();
  const { user, userDoc, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedProblemId, setSubmittedProblemId] = useState<string | null>(null);
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  // ── Tab 1: Core Overview & Operational Narrative ─────────────────────────
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("Healthcare");
  const [customIndustry, setCustomIndustry] = useState("");
  const [isCustomIndustry, setIsCustomIndustry] = useState(false);
  const [severity, setSeverity] = useState<ProblemSeverity>("major");
  const [location, setLocation] = useState("Global");
  const [whenItHappens, setWhenItHappens] = useState("");
  const [whoFacesIt, setWhoFacesIt] = useState("");
  const [whyFrustrating, setWhyFrustrating] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [currentSolution, setCurrentSolution] = useState("");

  // Submitter Attribution
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [customSubmitterName, setCustomSubmitterName] = useState(
    userDoc?.displayName || userDoc?.name || user?.displayName || ""
  );
  const [submitterRole, setSubmitterRole] = useState("");

  useEffect(() => {
    if (userDoc?.displayName || userDoc?.name || user?.displayName) {
      setCustomSubmitterName((prev) => prev || userDoc?.displayName || userDoc?.name || user?.displayName || "");
    }
  }, [userDoc, user]);

  // Credits: (Origin / External 3rd Party Attribution Source)
  const [psFrom, setPsFrom] = useState<string[]>(["Own Thinking"]);
  const [psFromCustom, setPsFromCustom] = useState("");
  const [availableCredits, setAvailableCredits] = useState<CreditSourceDoc[]>([]);
  const [selectedCreditDropdown, setSelectedCreditDropdown] = useState("");

  useEffect(() => {
    const unsub = subscribeCredits((list) => {
      setAvailableCredits(list.filter((c) => c.isActive !== false));
    }, false);
    return () => unsub();
  }, []);

  // ── Tab 2: Evidence & Statistical Data Points ─────────────────────────────
  const [dataPoints, setDataPoints] = useState<Array<{ metric: string; label: string }>>([]);
  const [newMetric, setNewMetric] = useState("");
  const [newMetricLabel, setNewMetricLabel] = useState("");

  const [evidenceDocuments, setEvidenceDocuments] = useState<EvidenceDocument[]>([]);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocDesc, setNewDocDesc] = useState("");
  const [newDocUrl, setNewDocUrl] = useState("");
  const [newDocSize, setNewDocSize] = useState("1.8 MB");
  const [newDocPages, setNewDocPages] = useState("8 pages");

  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [newEvidenceUrl, setNewEvidenceUrl] = useState("");

  // ── Tab 3: Market Telemetry & Impact ──────────────────────────────────────
  const [tam, setTam] = useState("");
  const [currentPenetration, setCurrentPenetration] = useState(0);
  const [wastedCost, setWastedCost] = useState("");
  const [citizensAffected, setCitizensAffected] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [willingnessToPay, setWillingnessToPay] = useState("");

  // ── Tab 4: Research & Competitors ─────────────────────────────────────────
  const [keyFindings, setKeyFindings] = useState<string[]>([]);
  const [newFinding, setNewFinding] = useState("");

  const [researchMethodology, setResearchMethodology] = useState("");

  const [academicReferences, setAcademicReferences] = useState<string[]>([]);
  const [newRef, setNewRef] = useState("");

  const [competitors, setCompetitors] = useState<Array<{ solution: string; pros: string; cons: string }>>([]);
  const [newCompName, setNewCompName] = useState("");
  const [newCompPros, setNewCompPros] = useState("");
  const [newCompCons, setNewCompCons] = useState("");

  // ── Tab 5: Suggested MVP & Tech Specs ─────────────────────────────────────
  const [mvpFeatures, setMvpFeatures] = useState<string[]>([]);
  const [newMvpFeature, setNewMvpFeature] = useState("");

  const [technicalRequirements, setTechnicalRequirements] = useState("");

  // ── Tab 6: Startup Mode & Venture Blueprint ───────────────────────────────
  const [hasStartupMode, setHasStartupMode] = useState(false);
  const [startupThesis, setStartupThesis] = useState("");
  const [startupTargetSegments, setStartupTargetSegments] = useState<string[]>([]);
  const [newSegment, setNewSegment] = useState("");
  const [startupWillingnessToPay, setStartupWillingnessToPay] = useState("");
  const [startupValueProp, setStartupValueProp] = useState("");
  const [startupSolutionsGaps, setStartupSolutionsGaps] = useState<
    Array<{ name: string; description: string; weaknessType: "Weakness" | "Gap"; weakness: string }>
  >([]);
  const [newGapName, setNewGapName] = useState("");
  const [newGapDesc, setNewGapDesc] = useState("");
  const [newGapWeakness, setNewGapWeakness] = useState("");
  const [newGapType, setNewGapType] = useState<"Weakness" | "Gap">("Weakness");

  const [startupDirections, setStartupDirections] = useState<
    Array<{
      type: "software" | "service" | "hardware" | "hybrid" | string;
      title: string;
      description: string;
      pros?: string;
      cons?: string;
      techStack?: string[];
    }>
  >([]);
  const [newDirType, setNewDirType] = useState<string>("software");
  const [newDirTitle, setNewDirTitle] = useState("");
  const [newDirDesc, setNewDirDesc] = useState("");
  const [newDirPros, setNewDirPros] = useState("");
  const [newDirCons, setNewDirCons] = useState("");
  const [newDirTechStack, setNewDirTechStack] = useState("");

  const [startupValidationQuestions, setStartupValidationQuestions] = useState<string[]>([]);
  const [newValidationQuestion, setNewValidationQuestion] = useState("");
  const [discoveryInterviewPrompt, setDiscoveryInterviewPrompt] = useState("");

  const [startupComplianceStandards, setStartupComplianceStandards] = useState<string[]>([
    "HIPAA BAA Compliant",
    "SOC2 Type II Ready",
    "FHIR / HL7 Validated",
    "Carequality HIE Ready",
  ]);
  const [customStandard, setCustomStandard] = useState("");

  const [suggestedAngles, setSuggestedAngles] = useState<string[]>([]);
  const [newSuggestedAngle, setNewSuggestedAngle] = useState("");
  const [keyRisks, setKeyRisks] = useState<string[]>([]);
  const [newKeyRisk, setNewKeyRisk] = useState("");

  // ── Multi-Industry Demo Feed Engine (For Real-Time Testing Across All Modules) ──
  const DEMO_FEEDS = useMemo(() => [
    {
      id: "demo-healthcare",
      badge: "Healthcare",
      title: "Data Interoperability Failure in Rural Clinics",
      description: "Rural healthcare providers lack a unified system to access patient records across different local specialists, causing delayed treatments and duplicate lab tests.",
      industry: "Healthcare",
      severity: "critical" as ProblemSeverity,
      location: "Rural United States",
      whenItHappens: "During patient intake, emergency transfers, and multi-specialty referrals when records must cross independent EHR vendor silos.",
      whoFacesIt: "Rural clinic administrators, primary care physicians, regional specialists, and ER triage teams.",
      whyFrustrating: "Staff must spend hours manually tracking down, printing, and scanning faxed documents, which frequently contain unreadable handwriting or missing pages.",
      frequency: "Daily",
      currentSolution: "Legacy thermal fax machines, paper courier delivery, and phone calls between medical records clerks.",
      customSubmitterName: "Dr. Sarah Chen, MD",
      submitterRole: "Rural Clinic Medical Director",
      psFrom: ["Own Thinking", "Smart India Hackathon (SIH)", "Hack2skill"],
      dataPoints: [
        { metric: "64%", label: "Rural clinics still relying on manual fax transfers daily" },
        { metric: "4.2 hrs", label: "Average clinical record latency per transferred patient" },
        { metric: "$1.8B", label: "Annual unnecessary cost from duplicate lab diagnostics" },
      ],
      evidenceDocuments: [
        {
          title: "CMS Interoperability Standards & Policy Guidelines",
          description: "Official empirical survey and benchmark dataset detailing technical and logistical friction across 4,500+ rural clinics.",
          size: "2.4 MB",
          pages: "12 pages",
          url: "https://www.healthit.gov",
          type: "pdf",
        },
      ],
      evidenceUrls: [
        "https://www.ruralhealthinfo.org/research/ehr-interoperability-barriers",
        "https://www.healthit.gov/topic/interoperability/fhir-api-mandates",
      ],
      tam: "$4.8B",
      currentPenetration: 35,
      wastedCost: "$1.8B",
      citizensAffected: "46 million",
      audienceSize: "4,500+ clinics & 28,000 specialists",
      willingnessToPay: "$150/mo per practitioner",
      keyFindings: [
        "Current legacy EHRs charge proprietary licensing fees for FHIR export endpoints.",
        "Rural clinical staff experience 22% burnout attributed solely to missing record fax tracking.",
      ],
      researchMethodology: "Multi-center field survey conducted with 120 rural clinic operations directors, cross-referenced with CMS ONC audit logs.",
      academicReferences: [
        '"The Digital Divide in Healthcare Information Exchange", Journal of Rural Health (2023).',
        '"Evaluating the Impact of Information Blocking Directives", Health Affairs (2024).',
      ],
      competitors: [
        {
          solution: "Epic Care Everywhere",
          pros: "Seamless real-time synchronization if both healthcare networks are on modern Epic infrastructure.",
          cons: "Prohibitively expensive setup costs for independent community practices, zero offline resilience.",
        },
        {
          solution: "Legacy Thermal Fax (Status Quo)",
          pros: "Universal adoption across 99% of rural facilities without requiring modern IT infrastructure.",
          cons: "Zero structured parsing, manual re-entry required, massive HIPAA audit exposure and high delay.",
        },
      ],
      mvpFeatures: [
        "Universal bidirectional FHIR API translator bridge with automated HL7 v2 parser.",
        "Offline-first encrypted SQLite record cache for unstable rural broadband connectivity.",
        "Lightweight web triage portal for specialist referrals without requiring proprietary EHR installations.",
      ],
      technicalRequirements: "SOC2 Type II compliance, HIPAA BAA readiness, robust integration with national HIE networks (Carequality, CommonWell), under 200ms parse latency.",
      hasStartupMode: true,
      startupThesis: "This problem represents an acute systemic inefficiency across **46 million** citizens with an annual wasted cost of **$1.8B**. With over **64%** of rural community clinics still forced to rely on manual fax transfers daily, there is an immediate willingness to pay (**$150/mo per practitioner**) for an automated software bridge or local edge caching wedge.",
      startupTargetSegments: [
        "Rural Clinic Admins",
        "Independent Specialists",
        "Home Care Nurses",
        "Independent Pharmacists",
        "EMS & Urgent Care Providers",
      ],
      startupWillingnessToPay: "$150/mo per practitioner",
      startupValueProp: "Universal EHR translation bridge with offline caching that categorizes incoming faxes and maps them to EHR FHIR schemas for rural clinic administrators.",
      startupSolutionsGaps: [
        {
          name: "Epic Care Everywhere",
          description: "Industry gold-standard for large enterprise hospital networks.",
          weaknessType: "Weakness" as const,
          weakness: "Prohibitively expensive ($50k+/yr) for independent rural community clinics.",
        },
        {
          name: "Direct Secure Messaging",
          description: "Encrypted email protocol for certified healthcare providers.",
          weaknessType: "Gap" as const,
          weakness: "Clunky UI, relies on manual entry and unstructured PDF attachments.",
        },
        {
          name: "Legacy Thermal Fax (Status Quo)",
          description: "Universal adoption across 99% of rural healthcare facilities.",
          weaknessType: "Gap" as const,
          weakness: "Severe security vulnerabilities, manual transcription errors, zero audit log.",
        },
      ],
      startupDirections: [
        {
          type: "software",
          title: "Universal API Bridge (Software / SaaS)",
          description: "Lightweight cloud micro-service that translates inbound legacy fax OCR into standardized FHIR JSON schemas.",
          pros: "90%+ gross margins, instant multi-tenant scalability, frictionless self-serve onboarding.",
          cons: "Requires robust HIPAA BAA compliance and high OCR accuracy for handwritten charts.",
          techStack: ["Next.js", "Python / FastAPI", "AWS Textract OCR", "FHIR REST API", "PostgreSQL"],
        },
        {
          type: "service",
          title: "Managed Interoperability Network (Hybrid SaaS)",
          description: "White-glove data ingestion and concierge chart verification service for community hospital associations.",
          pros: "Very high ACV ($24k - $60k/yr), zero clinical resistance, strong stickiness.",
          cons: "Lower initial margins due to human-in-the-loop verification, slower deployment cycle.",
          techStack: ["HIPAA-Compliant Portal", "Dedicated Ops Team", "SOC2 Workflow Automation"],
        },
        {
          type: "hardware",
          title: "Local Edge Caching Appliance (Hardware + SaaS)",
          description: "Plug-and-play local edge gateway that caches regional health records on-premise for offline resilience.",
          pros: "100% operational during rural broadband blackouts, ultra-low latency.",
          cons: "Hardware logistics, firmware maintenance, on-site installation overhead.",
          techStack: ["Raspberry Pi / NUC", "Docker Embedded", "SQLite / DuckDB Sync", "WireGuard VPN"],
        },
      ],
      startupValidationQuestions: [
        "Talked to 10+ target practitioners or clinic administrators?",
        "Verified they currently pay budget for manual workarounds?",
        "Frequency verified (>3 occurrences per day)?",
        "Secured 2-3 design partner LOIs or pilot agreements?",
        "Mapped 2-week MVP scope and compliance prerequisites?",
      ],
      discoveryInterviewPrompt: "When was the last time an incoming patient record failed to transfer, and how much clinical staff time was spent chasing that single file?",
      startupComplianceStandards: [
        "HIPAA BAA Compliant",
        "SOC2 Type II Ready",
        "FHIR / HL7 Validated",
        "Carequality HIE Ready",
      ],
      suggestedAngles: [
        "Universal EHR translation bridge with offline caching for rural clinics.",
        "Secure cloud fax OCR to FHIR standard converter for independent practices.",
        "Zero-maintenance patient handoff portal with automated compliance logs.",
      ],
      keyRisks: [
        "HIPAA BAA compliance hurdles across state health exchanges",
        "Legacy EHR vendor API paywalls and rate limits",
      ],
    },
    {
      id: "demo-logistics",
      badge: "Logistics",
      title: "Cold Chain Temperature Excursions in Biologic Cargo",
      description: "Temperature-controlled pharmaceutical shipments experience unmonitored thermal spikes during intermodal airport tarmac handoffs, spoiling $35B in critical medicine annually without real-time alerts.",
      industry: "Logistics",
      severity: "critical" as ProblemSeverity,
      location: "International Air Cargo Corridors",
      whenItHappens: "During tarmac cargo transfers between cargo planes, customs inspection bays, and last-mile refrigerated transport vans.",
      whoFacesIt: "Biotech logistics directors, clinical trial supply managers, pharmaceutical freight forwarders, and specialty couriers.",
      whyFrustrating: "Current data loggers are passive USB keys read only after delivery; ruined biologics cannot be rescued during transit, leading to total inventory write-downs.",
      frequency: "Weekly",
      currentSolution: "Disposable USB thermal loggers, dry ice pack layering, and manual post-delivery temperature audit forms.",
      customSubmitterName: "Alex Rivera, PMP",
      submitterRole: "VP Global Cold Chain Logistics",
      psFrom: ["Own Thinking", "IATA Cargo Logistics Forum"],
      dataPoints: [
        { metric: "24%", label: "Biologic cargo shipments experiencing thermal threshold breaches" },
        { metric: "$35B", label: "Annual global inventory destroyed by cold chain excursions" },
        { metric: "18 hrs", label: "Average elapsed time before excursion is discovered post-arrival" },
      ],
      evidenceDocuments: [
        {
          title: "WHO Technical Report: Good Distribution Practices in Air Cargo",
          description: "Global empirical study detailing failure points across 18 international cargo terminals.",
          size: "3.8 MB",
          pages: "24 pages",
          url: "https://www.who.int/medicines",
          type: "pdf",
        },
      ],
      evidenceUrls: [
        "https://www.who.int/initiatives/cold-chain-quality",
        "https://www.iata.org/en/programs/cargo/pharma/",
      ],
      tam: "$8.4B",
      currentPenetration: 20,
      wastedCost: "$35B",
      citizensAffected: "120 Million Patients Globally",
      audienceSize: "14,000 Freight Forwarders & 3,200 Pharma Labs",
      willingnessToPay: "$45/pallet monitored",
      keyFindings: [
        "Over 72% of excursions occur during the 45-minute tarmac loading window between plane and warehouse.",
        "Liability claims take an average of 14 months to resolve due to unverified handover custody timestamps.",
      ],
      researchMethodology: "Analysis of 8,500 transatlantic pharmaceutical shipment sensor telemetry records across 6 major hubs.",
      academicReferences: [
        '"Real-time Telemetry in Biopharmaceutical Supply Chains", Supply Chain Management Review (2024).',
        '"Thermal Decay Dynamics in Cryogenic Cargo Enclosures", Journal of Pharmaceutical Sciences (2023).',
      ],
      competitors: [
        {
          solution: "Sensitech TempTale (Passive USB)",
          pros: "Industry standard, highly trusted compliance certifications, low cost ($18/unit).",
          cons: "Passive only; zero real-time alerts while cargo is spoiling on hot tarmac.",
        },
        {
          solution: "Controlant Cellular IoT",
          pros: "Live GPS & temperature updates via global cellular network.",
          cons: "Prohibitively expensive subscription, complex battery air cargo flight certifications.",
        },
      ],
      mvpFeatures: [
        "Ultra-low-power BLE mesh sensor tags with autonomous Bluetooth gateway airport sniffing.",
        "Predictive thermal decay model alerting ground handlers 90 minutes before critical temperature breach.",
        "Automated cryptographic handoff proof for instant cargo insurance dispute resolution.",
      ],
      technicalRequirements: "IATA Lithium Battery Air Cargo Certified, Bluetooth 5.2 Long Range, ISO 9001 compliance logging, REST API webhooks.",
      hasStartupMode: true,
      startupThesis: "Transforming passive thermal tracking into predictive active remediation addresses a **$8.4B** market, saving freight forwarders and pharmaceutical sponsors **$35B** in discarded medicine with a low-touch **$45/pallet** deployment model.",
      startupTargetSegments: [
        "Pharma Freight Forwarders",
        "Clinical Trial Sponsors",
        "Specialized Life Science Couriers",
        "Cargo Airlines",
      ],
      startupWillingnessToPay: "$45/pallet monitored",
      startupValueProp: "Predictive real-time thermal alert beacon that warns airport ground handlers before sensitive biologics spoil on the tarmac.",
      startupSolutionsGaps: [
        {
          name: "Sensitech TempTale",
          description: "Passive USB temperature logger",
          weaknessType: "Gap" as const,
          weakness: "Post-delivery discovery only; cargo cannot be saved mid-flight.",
        },
        {
          name: "Controlant Cellular",
          description: "Active cellular satellite tracking",
          weaknessType: "Weakness" as const,
          weakness: "High unit cost and air cargo battery restrictions limit broad adoption.",
        },
      ],
      startupDirections: [
        {
          type: "software",
          title: "Predictive Thermal Decay Dispatch (SaaS)",
          description: "Real-time dispatch dashboard predicting cargo thermal buffer based on flight weather and runway tarmac delays.",
          pros: "85%+ software margins, integrates with existing airline cargo APIs.",
          cons: "Relies on ambient sensor feeds from airport ground handlers.",
          techStack: ["React / Vite", "Python FastAPI", "TimescaleDB", "MQTT Telemetry", "AWS IoT"],
        },
        {
          type: "hardware",
          title: "Zero-Setup BLE Mesh Smart Beacon",
          description: "Credit-card sized BLE beacon with 1-year battery life, compliant with IATA air cargo regulations.",
          pros: "Zero cellular SIM needed, extreme low cost ($6/unit), disposable or recyclable.",
          cons: "Requires Bluetooth receiver gateways at cargo terminal docks.",
          techStack: ["Nordic nRF52840", "Zephyr RTOS", "BLE Mesh", "Cryogenic Thermistor"],
        },
        {
          type: "service",
          title: "Global Pharma Tarmac Concierge Network",
          description: "On-demand ground handler network with rapid thermal containment blankets at top 20 global hub airports.",
          pros: "High contract value ($50k-$150k annual enterprise retention).",
          cons: "Requires airport airside operations security badges.",
          techStack: ["Mobile Dispatch Web App", "Automated SMS Alert Gateway"],
        },
      ],
      startupValidationQuestions: [
        "Have logistics managers had to scrap >$100k in biologics due to runway tarmac delays?",
        "Will pharma freight forwarders mandate real-time beacons if priced under $50/shipment?",
        "Do airport cargo handlers have smartphone BLE enabled on the tarmac?",
      ],
      discoveryInterviewPrompt: "When a biologic batch spoils during international transit, how long does it take your claims team to determine which carrier had physical custody during the temperature breach?",
      startupComplianceStandards: [
        "IATA DGR Air Cargo Certified",
        "GDP (Good Distribution Practice)",
        "FDA 21 CFR Part 11",
        "ISO 9001:2015",
      ],
      suggestedAngles: [
        "Real-time tarmac excursion predictor for pharma logistics forwarders.",
        "Automated smart contract insurance payouts for spoiled cold-chain cargo.",
        "Zero-SIM Bluetooth mesh cargo tags for air freight.",
      ],
      keyRisks: [
        "Airlines restricting new electronic devices in cargo holds",
        "Ground handler turnover impacting manual barcode scanning",
      ],
    },
    {
      id: "demo-energy",
      badge: "Clean Energy",
      title: "Transmission Curtailment & Queue Backlog in Distributed Solar",
      description: "Commercial solar and battery operators face 4-year interconnection study backlogs and up to 38% midday power curtailment because utilities rely on static thermal line rating models.",
      industry: "Clean Energy",
      severity: "major" as ProblemSeverity,
      location: "North American & European Power Grids",
      whenItHappens: "During peak midday solar generation hours when local transmission lines reach static seasonal capacity limits.",
      whoFacesIt: "Solar farm developers, battery storage operators, utility grid planners, and independent power producers (IPPs).",
      whyFrustrating: "Clean solar electricity is forcefully switched off while adjacent commercial zones run expensive fossil-fuel peaker generators.",
      frequency: "Daily",
      currentSolution: "Static seasonal thermal line ratings, manual utility curtailment telephone orders, and uncoordinated battery discharge.",
      customSubmitterName: "Marcus Vance",
      submitterRole: "Grid Interconnection Lead",
      psFrom: ["Own Thinking", "FERC Order 2023 Study"],
      dataPoints: [
        { metric: "2,600 GW", label: "Clean energy capacity trapped in utility interconnection queues" },
        { metric: "38%", label: "Peak solar generation curtailed in congested transmission corridors" },
        { metric: "$4.2B", label: "Annual developer revenue lost from unnecessary power curtailment" },
      ],
      evidenceDocuments: [
        {
          title: "Berkeley Lab: Queued Up 2024 Interconnection Study",
          description: "Empirical dataset analyzing 10,000+ generation and storage projects in US transmission queues.",
          size: "5.1 MB",
          pages: "38 pages",
          url: "https://emp.lbl.gov/queues",
          type: "pdf",
        },
      ],
      evidenceUrls: [
        "https://emp.lbl.gov/queues-report-2024",
        "https://www.ferc.gov/order-2023",
      ],
      tam: "$6.2B",
      currentPenetration: 14,
      wastedCost: "$4.2B",
      citizensAffected: "85 Million Utility Ratepayers",
      audienceSize: "1,800 Solar Developers & 220 Utilities",
      willingnessToPay: "$2,500/mo per substation node",
      keyFindings: [
        "Dynamic Line Rating (DLR) could unlock 30-40% extra transmission capacity using real-time wind and temperature data without building new physical towers.",
        "Over 70% of proposed solar projects withdraw from queues due to unpredictable network upgrade fees.",
      ],
      researchMethodology: "Power flow simulation across 42 transmission nodes coupled with NOAA high-resolution atmospheric weather modeling.",
      academicReferences: [
        '"Dynamic Line Ratings for Increased Renewable Grid Integration", IEEE Transactions on Power Systems (2024).',
        '"Interconnection Queue Dynamics and the Clean Energy Transition", Nature Energy (2023).',
      ],
      competitors: [
        {
          solution: "Static Seasonal Line Limits",
          pros: "Zero software or sensor cost, well understood by utility engineers.",
          cons: "Artificially constrains transmission capacity by 30-45% during breezy conditions."
        },
        {
          solution: "LineVision Physical Sensors",
          pros: "Physical LiDAR sensors mounted directly onto transmission towers.",
          cons: "High capital expenditure ($35k/tower), requires physical utility line crew installation."
        },
      ],
      mvpFeatures: [
        "Software-only Dynamic Line Rating (DLR) engine leveraging NOAA weather grid APIs.",
        "Automated battery storage co-location dispatch optimizer capturing curtailed peak solar.",
        "FERC Order 2023 compliance screening tool for instant cluster study simulation.",
      ],
      technicalRequirements: "NERC CIP cyber-security compliance, sub-minute power flow simulation, IEEE 738 thermal standard implementation.",
      hasStartupMode: true,
      startupThesis: "Software-only dynamic line rating unlocks 2,600 GW of curtailed clean energy without building expensive new high-voltage transmission lines, creating a **$6.2B** market opportunity.",
      startupTargetSegments: [
        "Independent Solar Operators",
        "Battery Storage Developers",
        "Distribution Utilities",
        "Energy Trading Desks",
      ],
      startupWillingnessToPay: "$2,500/mo per substation node",
      startupValueProp: "Software-only transmission capacity intelligence that increases solar export capacity by 30% with zero hardware installation on power lines.",
      startupSolutionsGaps: [
        {
          name: "Static Line Ratings",
          description: "Seasonal manual estimates",
          weaknessType: "Gap" as const,
          weakness: "Leaves 30-40% transmission headroom untapped.",
        },
        {
          name: "LineVision Hardware",
          description: "Physical LiDAR sensors on lines",
          weaknessType: "Weakness" as const,
          weakness: "Slow deployment, requires line outages and high capex.",
        },
      ],
      startupDirections: [
        {
          type: "software",
          title: "Software-Only DLR Grid Capacity Engine",
          description: "Cloud software calculating real-time dynamic thermal headroom using high-resolution weather telemetry.",
          pros: "Zero hardware required, scalable across entire utility territories in minutes.",
          cons: "Requires utility engineering sign-off on software-only thermal models.",
          techStack: ["Python Scipy", "NOAA HRRR API", "FastAPI", "Next.js", "PostgreSQL / Timescale"],
        },
        {
          type: "service",
          title: "Interconnection Fast-Track Advisory",
          description: "Automated queue screening and engineering study dispute service for independent power producers.",
          pros: "Instant cash flow, high advisory fees ($20k-$75k/project).",
          cons: "Labor-intensive consulting component.",
          techStack: ["Power Flow Simulation Web Tool", "Document Automation"],
        },
        {
          type: "hybrid",
          title: "Behind-the-Meter Storage Arbitrage Wedge",
          description: "Edge control software that charges co-located batteries when grid curtailment is ordered and discharges when capacity frees up.",
          pros: "Direct revenue share from recovered solar energy.",
          cons: "Requires battery storage hardware asset on site.",
          techStack: ["Rust Embedded", "Modbus / CAN bus", "Cloud Orchestration Engine"],
        },
      ],
      startupValidationQuestions: [
        "Are solar farm operators losing >$150k annually to midday transmission curtailment?",
        "Will regional transmission organizations (RTOs) accept software-based thermal models under FERC Order 2023?",
        "Can developers simulate substation capacity within 5 minutes?",
      ],
      discoveryInterviewPrompt: "How much solar energy was curtailed across your regional generation assets last summer, and what would a 20% increase in transmission line export headroom be worth to your investors?",
      complianceStandards: [
        "NERC CIP Certified",
        "FERC Order 2023 Compliant",
        "IEEE 738 Thermal Standard",
        "SOC2 Type II",
      ],
      suggestedAngles: [
        "Software-only dynamic line rating for transmission utilities.",
        "Automated behind-the-meter battery dispatch during solar curtailment.",
        "Queue withdrawal risk predictor for renewable project finance.",
      ],
      keyRisks: [
        "Conservative utility engineers hesitating to adopt non-hardware thermal models",
        "Regulatory approval lag across state public utility commissions",
      ],
    },
    {
      id: "demo-fintech",
      badge: "FinTech",
      title: "T+2 Settlement Failure & Trapped Liquidity in Cross-Border B2B Remittance",
      description: "Mid-market global exporters lose 3.4% of invoice volume to correspondent banking markups, currency spreads, and 48-hour trapped liquidity in pre-funded Nostro accounts.",
      industry: "FinTech",
      severity: "major" as ProblemSeverity,
      location: "Emerging Market Trade Corridors (US - LATAM / APAC)",
      whenItHappens: "During supplier invoice payouts, cross-border vendor disbursements, and trade finance reconciliations.",
      whoFacesIt: "Corporate treasurers, export-import finance controllers, international supply chain CFOs, and procurement directors.",
      whyFrustrating: "Multi-hop correspondent banking chains deduct unannounced intermediary fees and lack transaction tracking, causing suppliers to halt shipments.",
      frequency: "Daily",
      currentSolution: "Legacy SWIFT MT103 wire transfers, pre-funded local currency Nostro balances, and phone-based FX brokerage desks.",
      customSubmitterName: "Elena Rostova, CFA",
      submitterRole: "VP Global Corporate Treasury",
      psFrom: ["Own Thinking", "Bank for International Settlements (BIS) Survey"],
      dataPoints: [
        { metric: "3.4%", label: "Average invoice value eroded by correspondent intermediary bank fees" },
        { metric: "48 hrs", label: "Average settlement duration for international supplier remittances" },
        { metric: "$120B", label: "Global working capital trapped in idle pre-funded Nostro/Vostro accounts" },
      ],
      evidenceDocuments: [
        {
          title: "BIS CPMI: Enhancing Cross-Border Payments Technical Report",
          description: "Empirical audit of friction, fees, and liquidity drag across 24 global trade settlement corridors.",
          size: "4.4 MB",
          pages: "32 pages",
          url: "https://www.bis.org/cpmi/crossborder",
          type: "pdf",
        },
      ],
      evidenceUrls: [
        "https://www.bis.org/cpmi/crossborder",
        "https://www.swift.com/our-solutions/swift-gpi",
      ],
      tam: "$9.1B",
      currentPenetration: 21,
      wastedCost: "$120B Trapped Capital",
      citizensAffected: "1.2M Cross-Border Exporters",
      audienceSize: "24,000 Mid-Market Importers & 160 Trade Banks",
      willingnessToPay: "0.35% per settled transaction volume",
      keyFindings: [
        "Over 80% of cross-border payment delays occur because intermediary correspondent banks manually review compliance sanctions flags with zero status callbacks.",
        "Pre-funding accounts in 8 local currencies ties up 12% of working capital for mid-market exporters.",
      ],
      researchMethodology: "Empirical transaction log analysis across 40,000 B2B supplier invoices between the US, Mexico, Brazil, and Southeast Asia.",
      academicReferences: [
        '"Correspondent Banking Networks and Cross-Border Liquidity Friction", Journal of Financial Economics (2024).',
        '"Evaluating Stablecoin and Instant Settlement Corridors for B2B Trade", MIT Digital Currency Initiative (2023).',
      ],
      competitors: [
        {
          solution: "Legacy SWIFT Wire (Status Quo)",
          pros: "Universally accepted across every commercial bank globally.",
          cons: "Slow (2-4 business days), high intermediary deductions ($35-$75/wire), unpredictable FX spreads.",
        },
        {
          solution: "Wise for Business",
          pros: "Transparent fees and clean web portal for small payments.",
          cons: "Strict transaction size limits, lacks automated ERP trade finance integration for mid-market $500k+ invoices.",
        },
      ],
      mvpFeatures: [
        "Automated real-time payment status tracking via SWIFT gPI API hooks with fee transparency.",
        "Smart liquidity routing matching opposing corporate exporter cash flows to eliminate currency conversion.",
        "Direct NetSuite and SAP ERP webhook connector for 1-click supplier invoice reconciliation.",
      ],
      technicalRequirements: "FinCEN MSB registered, PCI-DSS Level 1 compliant, ISO 20022 message schema format, sub-second ledger reconciliation.",
      hasStartupMode: true,
      startupThesis: "Eliminating intermediary correspondent bank friction and pre-funded Nostro drag unlocks a **$9.1B** market opportunity for mid-market international trade finance.",
      startupTargetSegments: [
        "Mid-Market Exporters ($10M-$200M revenue)",
        "International Procurement Teams",
        "Supply Chain Trade Financiers",
      ],
      startupWillingnessToPay: "0.35% per settled invoice volume",
      startupValueProp: "Same-day cross-border B2B supplier settlement with zero intermediary fee deductions and automated ERP reconciliation.",
      startupSolutionsGaps: [
        {
          name: "Legacy SWIFT Wires",
          description: "Multi-hop correspondent banking",
          weaknessType: "Gap" as const,
          weakness: "Traps working capital for 48-72 hours with opaque fees.",
        },
        {
          name: "Wise for Business",
          description: "Consumer & SMB remittance",
          weaknessType: "Weakness" as const,
          weakness: "Cannot handle $500k+ enterprise trade finance volume.",
        },
      ],
      startupDirections: [
        {
          type: "software",
          title: "Corporate Treasury FX & Routing Engine (SaaS)",
          description: "Smart routing engine comparing 12 liquidity providers in real-time to find lowest spread and fastest corridor.",
          pros: "Non-custodial software model, bypasses heavy banking capital adequacy requirements.",
          cons: "Requires API integrations with multiple regional banking partners.",
          techStack: ["Next.js", "Go / Golang", "Redis Ledger", "PostgreSQL", "ISO 20022 Engine"],
        },
        {
          type: "service",
          title: "Dedicated Cross-Border Trade Escrow",
          description: "Regulated trade finance escrow protecting both exporter shipment release and buyer delivery confirmation.",
          pros: "Very high customer stickiness and lucrative float earnings.",
          cons: "Requires money transmitter licenses across multiple jurisdictions.",
          techStack: ["Regulated Trust Banking Partner", "Web Escrow Portal"],
        },
        {
          type: "hybrid",
          title: "Real-time Stablecoin Settlement Bridge",
          description: "Regulated USD stablecoin (USDC) rail converting fiat to fiat instantly with zero T+2 settlement lag.",
          pros: "Instant 5-second settlement 24/7/365, near-zero transaction fee.",
          cons: "Corporate finance teams must overcome crypto stigma and regulatory uncertainty.",
          techStack: ["Circle Mint API", "Solana / Base Rails", "Automated Fiat Off-Ramp API"],
        },
      ],
      validationQuestions: [
        "Have suppliers held back shipments due to 3+ day bank wire delays?",
        "Does your finance team spend >10 hours monthly reconciling missing wire deduction fees?",
        "Would you switch to same-day settlement if fees were guaranteed under 0.5%?",
      ],
      discoveryInterviewPrompt: "What is the largest unexpected fee deduction a correspondent bank took from one of your cross-border supplier wire transfers, and how did that affect your vendor relationship?",
      complianceStandards: [
        "FinCEN MSB Registered",
        "ISO 20022 Validated",
        "SOC2 Type II Ready",
        "PCI-DSS Level 1",
      ],
      suggestedAngles: [
        "Real-time cross-border supplier payment tracking for mid-market manufacturers.",
        "Non-custodial smart routing engine for international corporate treasuries.",
        "Instant stablecoin rail with zero-crypto UX for global supply chains.",
      ],
      keyRisks: [
        "Correspondent banks closing partner bank accounts",
        "Complex cross-border sanctions and AML false-positive flags",
      ],
    },
  ], []);

  const loadDemoFeed = (targetIndex?: number) => {
    const idx = typeof targetIndex === "number" ? targetIndex : demoIndex;
    const feed = DEMO_FEEDS[idx % DEMO_FEEDS.length];

    // Tab 1: Narrative & Core
    setTitle(feed.title);
    setDescription(feed.description);
    setIndustry(feed.industry);
    setIsCustomIndustry(false);
    setCustomIndustry("");
    setSeverity(feed.severity);
    setLocation(feed.location);
    setWhenItHappens(feed.whenItHappens);
    setWhoFacesIt(feed.whoFacesIt);
    setWhyFrustrating(feed.whyFrustrating);
    setFrequency(feed.frequency);
    setCurrentSolution(feed.currentSolution);
    setIsAnonymous(false);
    const userRealName = userDoc?.displayName || userDoc?.name || user?.displayName;
    setCustomSubmitterName(userRealName || feed.customSubmitterName);
    setSubmitterRole(feed.submitterRole);
    setPsFrom(feed.psFrom);

    // Tab 2: Evidence & Documents
    setDataPoints(feed.dataPoints);
    setEvidenceDocuments(feed.evidenceDocuments);
    setEvidenceUrls(feed.evidenceUrls);

    // Tab 3: Market Telemetry
    setTam(feed.tam);
    setCurrentPenetration(feed.currentPenetration);
    setWastedCost(feed.wastedCost);
    setCitizensAffected(feed.citizensAffected);
    setAudienceSize(feed.audienceSize);
    setWillingnessToPay(feed.willingnessToPay);

    // Tab 4: Research & Competitors
    setKeyFindings(feed.keyFindings);
    setResearchMethodology(feed.researchMethodology);
    setAcademicReferences(feed.academicReferences);
    setCompetitors(feed.competitors);

    // Tab 5: Suggested MVP
    setMvpFeatures(feed.mvpFeatures);
    setTechnicalRequirements(feed.technicalRequirements);

    // Tab 6: Startup Mode Blueprint
    setHasStartupMode(feed.hasStartupMode);
    setStartupThesis(feed.startupThesis);
    setStartupTargetSegments(feed.startupTargetSegments);
    setStartupWillingnessToPay(feed.startupWillingnessToPay);
    setStartupValueProp(feed.startupValueProp);
    setStartupSolutionsGaps(feed.startupSolutionsGaps);
    setStartupDirections(feed.startupDirections || []);
    setStartupValidationQuestions(feed.startupValidationQuestions || []);
    setDiscoveryInterviewPrompt(feed.discoveryInterviewPrompt || "");
    setStartupComplianceStandards(feed.startupComplianceStandards || []);
    setSuggestedAngles(feed.suggestedAngles || []);
    setKeyRisks(feed.keyRisks || []);

    // Auto-verify human verification check for rapid testing
    setIsHumanVerified(true);
    setError(null);
    setDemoNotice(`Loaded Demo Feed #${(idx % DEMO_FEEDS.length) + 1}: "${feed.title}" (${feed.industry})`);
    setDemoIndex((idx + 1) % DEMO_FEEDS.length);

  };

  // ── Form Submission Handler ───────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Please provide at least a Problem Title and Core Issue Summary.");
      setActiveTab(1);
      return;
    }

    if (!isHumanVerified) {
      setError("Please complete the 'I am not a robot' human verification check before submitting.");
      setActiveTab(6);
      return;
    }

    setSubmitting(true);
    setError(null);

    const authorName = isAnonymous
      ? "Anonymous Scout"
      : customSubmitterName.trim() || userDoc?.name || user?.displayName || "Practitioner Submitter";

    const effectiveIndustry = isCustomIndustry && customIndustry.trim() ? customIndustry.trim() : industry;

    try {
      const res = await createProblem({
        title: title.trim(),
        description: description.trim(),
        industry: effectiveIndustry,
        severity,
        location: location.trim() || "Global",
        submittedByUid: userDoc?.uid || user?.uid || "member",
        submittedByName: authorName,
        submitterUsername: isAnonymous ? undefined : (userDoc?.username || undefined),
        whenItHappens: whenItHappens.trim(),
        whoFacesIt: whoFacesIt.trim(),
        whyFrustrating: whyFrustrating.trim(),
        frequency,
        currentSolution: currentSolution.trim(),
        audienceSize: audienceSize.trim(),
        willingnessToPay: willingnessToPay.trim(),
        estimatedValue: tam.trim(),
        psFrom: psFrom.length > 0 ? psFrom : ["Own Thinking"],
        psFromCustom: psFromCustom.trim(),
        marketData: {
          tam: tam.trim() || "$1.0B",
          currentPenetration,
          wastedCost: wastedCost.trim() || "$500M",
          citizensAffected: citizensAffected.trim() || "10M+",
        },
        evidenceDocuments,
        evidenceUrls,
        evidenceLinks: evidenceUrls,
        dataPoints,
        researchData: {
          keyFindings,
          methodology: researchMethodology.trim(),
          academicReferences,
        },
        competitorData: competitors,
        suggestedMVP: {
          coreFeatures: mvpFeatures,
          technicalRequirements: technicalRequirements.trim(),
          complianceStandards: startupComplianceStandards,
        },
        hasStartupMode,
        startupModeEnabled: hasStartupMode,
        startupModeConfig: {
          enabled: hasStartupMode,
          thesis: startupThesis.trim(),
          targetSegments: startupTargetSegments,
          avgWillingnessToPay: startupWillingnessToPay.trim(),
          valuePropositionDraft: startupValueProp.trim(),
          existingSolutionsGaps: startupSolutionsGaps,
          directionsToExplore: startupDirections.slice(0, 3),
          validationQuestions: startupValidationQuestions,
          discoveryInterviewPrompt: discoveryInterviewPrompt.trim(),
          complianceStandards: startupComplianceStandards,
        },
        aiScores: {
          suggestedAngles: suggestedAngles.filter(Boolean),
          keyRisks: keyRisks.filter(Boolean),
          aiConfidence: 96,
        } as any,
        status: isAdmin ? "approved" : "pending",
      });

      if (res.success && res.problemId) {
        setSubmittedProblemId(res.problemId);
        recordUserSubmission(res.problemId, userDoc?.uid || user?.uid || "guest");
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore canvas confetti errors
        }
      } else {
        setError("Failed to create problem statement. Please check required fields and try again.");
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      setError(err?.message || "An unexpected error occurred while saving the problem dossier.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success State Modal / Overlay (Live Firestore Storage & Moderation Connectivity) ──
  if (submittedProblemId) {
    return (
      <div className="w-full min-h-screen bg-surface py-16 px-4 md:px-8 font-['Poppins',sans-serif] text-on-surface flex items-center justify-center animate-fade-in">
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-xl border border-outline-variant/30 text-center flex flex-col items-center gap-6">
          <div className="w-18 h-18 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 self-center bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full text-xs font-extrabold text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Stored in Firebase · Queued for Admin Review</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-on-surface">
              Problem Statement Sent for Admin Review!
            </h2>
            <p className="text-sm text-on-surface-variant max-w-lg mx-auto">
              Your empirical problem dossier has been stored in Firebase Firestore under the <code className="bg-surface-container px-1.5 py-0.5 rounded text-xs font-mono text-primary font-bold">problems</code> collection. It is now awaiting review and approval by an administrator.
            </p>
          </div>

          {/* Database & Moderation Pipeline Status */}
          <div className="w-full flex flex-col gap-2.5 p-4 bg-surface-container/40 rounded-2xl border border-outline-variant/20 text-left">
            <div className="flex items-center justify-between text-xs py-1 border-b border-outline-variant/15">
              <span className="text-on-surface-variant font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Firebase Firestore Storage
              </span>
              <span className="font-mono text-emerald-600 font-bold">Stored (ID: {submittedProblemId})</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-b border-outline-variant/15">
              <span className="text-on-surface-variant font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Moderation Status
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-full text-[11px]">
                Pending Admin Review
              </span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-on-surface-variant font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Public Directory Status
              </span>
              <span className="font-semibold text-on-surface-variant">Publishes instantly upon approval</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-surface-container/40 rounded-2xl border border-outline-variant/20 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-outline">Pain Score</span>
              <p className="text-lg font-black text-orange-600">{severity === "critical" ? "9.4" : severity === "major" ? "8.6" : "7.2"}/10</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-outline">Opportunity</span>
              <p className="text-lg font-black text-emerald-600">8.0/10</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-bold text-outline">Market TAM</span>
              <p className="text-lg font-black text-primary">{tam || "$1.0B"}</p>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
            {isAdmin ? (
              <>
                <button
                  onClick={() => navigate("/admin/review-queue")}
                  className="w-full sm:flex-1 bg-primary text-white py-3.5 px-6 rounded-xl text-xs md:text-sm font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Review & Approve Live (Admin)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    navigate(
                      getProblemDetailUrl({ id: submittedProblemId || "prob-1", title })
                    )
                  }
                  className="w-full sm:flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/40 py-3.5 px-6 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Admin Preview Dossier</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full sm:flex-1 bg-primary text-white py-3.5 px-6 rounded-xl text-xs md:text-sm font-bold shadow-md hover:bg-primary-container transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Track Status in Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSubmittedProblemId(null);
                    setActiveTab(1);
                    setTitle("");
                    setDescription("");
                  }}
                  className="w-full sm:flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/40 py-3.5 px-6 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>+ Submit Another Problem</span>
                </button>
              </>
            )}
          </div>

          {!isAdmin && (
            <p className="text-[11px] text-on-surface-variant text-center max-w-md pt-1">
              🔒 <strong>Publishing Policy:</strong> Public canonical URLs are activated only after administrator verification and approval.
            </p>
          )}

          {isAdmin && (
            <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant pt-1">
              <button
                onClick={() => {
                  setSubmittedProblemId(null);
                  setActiveTab(1);
                  setTitle("");
                  setDescription("");
                }}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                + Submit Another Problem
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-surface py-4 sm:py-8 md:py-10 px-3 sm:px-6 md:px-8 lg:px-12 font-['Poppins',sans-serif] text-on-surface">
      {/* noindex: form page — not content for search engines */}
      <SEOHead
        title="Submit a Verified Problem Statement"
        description="Submit a verified real-world problem statement to Stuckhere. Help the community discover startup opportunities and innovation challenges."
        noindex
      />
      {/* ── TOP HERO HEADER & BREADCRUMBS ─────────────────────────────────── */}

      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-200/60 mb-5 sm:mb-8">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-on-surface-variant">
            <Link to="/explore" className="hover:text-primary transition-colors">
              Explore
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-primary font-bold">Submit Problem Statement</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-on-surface tracking-tight">
            Problem Intelligence Studio
          </h1>
          <p className="text-[11px] sm:text-xs md:text-sm text-on-surface-variant max-w-3xl">
            Draft and structure an empirical, evidence-backed problem dossier with market sizing, research citations, and startup venture blueprints.
          </p>
        </div>

        {/* Action Header Buttons & Demo Feed Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-start md:self-auto flex-wrap sm:flex-nowrap">
          {/* Multi-Industry Demo Feed Button */}
          <div className="flex items-center bg-surface-container-low/80 p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-amber-500/30 shadow-2xs">
            <button
              type="button"
              onClick={() => loadDemoFeed()}
              className="group flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-md sm:rounded-lg bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white text-[11px] sm:text-xs font-bold shadow-xs transition-all cursor-pointer"
              title="Click to populate all 6 modules with comprehensive empirical test data. Automatically clears captcha."
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
              <span>⚡ Demo Feed</span>
              <span className="bg-black/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                {demoIndex + 1}/{DEMO_FEEDS.length}
              </span>
            </button>

            {/* Quick Preset Selector */}
            <select
              aria-label="Select demo problem template"
              value={((demoIndex - 1 + DEMO_FEEDS.length) % DEMO_FEEDS.length)}
              onChange={(e) => loadDemoFeed(Number(e.target.value))}
              className="bg-transparent text-[10px] sm:text-[11px] font-bold text-on-surface-variant hover:text-on-surface px-1.5 py-1 focus:outline-none cursor-pointer border-0"
              title="Switch demo problem scenario"
            >
              {DEMO_FEEDS.map((df, i) => (
                <option key={df.id} value={i} className="bg-surface text-on-surface text-xs">
                  {df.badge}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary-container text-white px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{submitting ? "Submitting..." : "Submit Problem"}</span>
          </button>
        </div>
      </div>

      {/* ── REALTIME DEMO FEED NOTICE BANNER ────────────────────── */}
      {demoNotice && (
        <div className="w-full mb-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-[12px] sm:text-[13px] text-amber-950 dark:text-amber-100">
                {demoNotice}
              </p>
              <p className="text-[11px] text-amber-800 dark:text-amber-300">
                All 6 modules & fields populated in real-time. Human check cleared. Review tabs below or submit directly to admin for verification!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => loadDemoFeed()}
              className="flex-1 sm:flex-none text-[11px] font-bold px-3 py-1.5 rounded-lg border border-amber-500/30 hover:bg-amber-500/20 text-amber-900 dark:text-amber-100 transition-colors cursor-pointer"
            >
              Cycle Next Preset ↻
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 sm:flex-none text-[11px] font-bold px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{submitting ? "Submitting..." : "Submit to Admin →"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN FULL-PAGE STUDIO ───────────────────────────────── */}
      <div className="w-full flex flex-col gap-4 sm:gap-6">
        {/* Section Navigation Tab Bar */}
        <div className="w-full bg-surface-container-lowest p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-outline-variant/30 shadow-2xs flex items-center gap-1 overflow-x-auto no-scrollbar scrollbar-none">
          {[
            { id: 1, label: "1. Core Narrative", icon: FileText },
            { id: 2, label: "2. Evidence & Data", icon: BarChart3 },
            { id: 3, label: "3. Market & Impact", icon: DollarSign },
            { id: 4, label: "4. Research & Rivals", icon: Search },
            { id: 5, label: "5. MVP Specs", icon: Code },
            { id: 6, label: "6. Startup Mode", icon: Rocket },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50"
              }`}
            >
              <tab.icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${activeTab === tab.id ? "text-white" : "text-gray-400"}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            {/* ── TAB 1: CORE PROBLEM & OPERATIONAL NARRATIVE ───────────────── */}
            {activeTab === 1 && (
              <div className="bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-4 sm:gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-3 sm:pb-4">
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Module 1
                  </span>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-on-surface">
                    Problem Overview & Operational Context
                  </h2>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant">
                    Define the core bottleneck, who experiences the friction, and what happens during day-to-day operations.
                  </p>
                </div>

                {/* Problem Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                    <span>Problem Statement Title <span className="text-error">*</span></span>
                    <span className="text-[10px] text-outline font-normal">Clear, specific, and domain-focused</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Data Interoperability Failure in Rural Community Clinics"
                    className="w-full bg-surface-container/40 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/30"
                  />
                </div>

                {/* Core Issue Summary */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                    <span>Core Issue & High-Level Pitch <span className="text-error">*</span></span>
                    <span className="text-[10px] text-outline font-normal">2-3 sentences explaining the root conflict</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Rural healthcare providers lack a unified system to access patient records across different local specialists, causing treatment latency and medical errors..."
                    className="w-full bg-surface-container/40 rounded-xl p-3.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/30 font-normal leading-relaxed"
                  />
                </div>

                {/* Industry & Severity Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-on-surface">Target Industry</label>
                      <button
                        type="button"
                        onClick={() => setIsCustomIndustry(!isCustomIndustry)}
                        className="text-[10px] text-primary font-bold hover:underline cursor-pointer"
                      >
                        {isCustomIndustry ? "Choose from list" : "+ Enter Custom Industry"}
                      </button>
                    </div>
                    {isCustomIndustry ? (
                      <input
                        type="text"
                        value={customIndustry}
                        onChange={(e) => setCustomIndustry(e.target.value)}
                        placeholder="e.g. Quantum Cryptography, Ocean Cleanup..."
                        className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                      />
                    ) : (
                      <select
                        value={industry}
                        onChange={(e) => {
                          if (e.target.value === "__custom__") {
                            setIsCustomIndustry(true);
                          } else {
                            setIndustry(e.target.value);
                          }
                        }}
                        className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30 cursor-pointer"
                      >
                        {REAL_INDUSTRIES.map((ind) => {
                          const name = typeof ind === "string" ? ind : ind.name;
                          return (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          );
                        })}
                        <option value="__custom__">+ Other / Custom Industry...</option>
                      </select>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Geographic Scope / Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Rural United States, Global, EMEA"
                      className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>

                {/* Credits: (Origin / External 3rd Party Attribution Source) */}
                <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-200/60">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-2">
                      <span>Credits:</span>
                      <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-semibold">
                        {psFrom.length} selected
                      </span>
                    </label>
                    <span className="text-[10px] text-on-surface-variant font-normal">
                      Origin credit, hackathon platform, or 3rd-party innovation program
                    </span>
                  </div>

                  {/* Dropdown Selector & Custom Write-in Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="relative">
                      <select
                        value={selectedCreditDropdown}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val && !psFrom.includes(val)) {
                            setPsFrom([...psFrom, val]);
                          }
                          setSelectedCreditDropdown("");
                        }}
                        className="w-full bg-surface-container/40 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30 cursor-pointer"
                      >
                        <option value="">+ Select Credit from list...</option>
                        {availableCredits.map((cred) => (
                          <option key={cred.id} value={cred.name}>
                            {cred.name} {cred.category ? `(${cred.category})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Custom Credit Write-In */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={psFromCustom}
                        onChange={(e) => setPsFromCustom(e.target.value)}
                        placeholder="Or enter custom credit name..."
                        className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (psFromCustom.trim() && !psFrom.includes(psFromCustom.trim())) {
                              setPsFrom([...psFrom, psFromCustom.trim()]);
                              setPsFromCustom("");
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (psFromCustom.trim() && !psFrom.includes(psFromCustom.trim())) {
                            setPsFrom([...psFrom, psFromCustom.trim()]);
                            setPsFromCustom("");
                          }
                        }}
                        className="px-3.5 py-2 bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-bold rounded-xl border border-outline-variant/30 cursor-pointer shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                  </div>

                  {/* Selected Credits Pills / Chips */}
                  {psFrom.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {psFrom.map((source) => (
                        <CreditSourceBadge
                          key={source}
                          source={source}
                          size="sm"
                          onRemove={() => setPsFrom(psFrom.filter((s) => s !== source))}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Problem Severity Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface">Severity & Operational Impact Level</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(["minor", "medium", "major", "critical"] as ProblemSeverity[]).map((sev) => (
                      <button
                        key={sev}
                        type="button"
                        onClick={() => setSeverity(sev)}
                        className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer capitalize text-xs font-bold ${
                          severity === sev
                            ? sev === "critical"
                              ? "bg-rose-50 border-rose-500 text-rose-700 dark:bg-rose-950/40"
                              : sev === "major"
                              ? "bg-orange-50 border-orange-500 text-orange-700 dark:bg-orange-950/40"
                              : "bg-primary/10 border-primary text-primary"
                            : "bg-surface-container/20 border-outline-variant/30 text-on-surface-variant hover:bg-surface-container/50"
                        }`}
                      >
                        <span>{sev}</span>
                        <span className="text-[10px] font-normal opacity-80">
                          {sev === "critical" ? "Life/Mission threat" : sev === "major" ? "High economic cost" : sev === "medium" ? "Moderate delay" : "Minor nuisance"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5-Questions Operational Narrative Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-200/60">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">When It Happens (Trigger)</label>
                    <textarea
                      rows={2}
                      value={whenItHappens}
                      onChange={(e) => setWhenItHappens(e.target.value)}
                      placeholder="During patient triage, emergency transfers, and multi-specialist referrals..."
                      className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Who Faces It (Stakeholders)</label>
                    <textarea
                      rows={2}
                      value={whoFacesIt}
                      onChange={(e) => setWhoFacesIt(e.target.value)}
                      placeholder="Rural clinic administrators, triage doctors, regional specialists, patients..."
                      className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Why It's Frustrating (Friction)</label>
                    <textarea
                      rows={2}
                      value={whyFrustrating}
                      onChange={(e) => setWhyFrustrating(e.target.value)}
                      placeholder="Manual fax re-entry wastes 4+ hours per transfer, leading to duplicate testing..."
                      className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Current Workarounds (Status Quo)</label>
                    <textarea
                      rows={2}
                      value={currentSolution}
                      onChange={(e) => setCurrentSolution(e.target.value)}
                      placeholder="Legacy thermal fax machines, paper courier delivery, unencrypted email PDFs..."
                      className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>

                {/* Submitter Attribution & Privacy */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-on-surface">Submitter Attribution & Privacy</h4>
                      <p className="text-[11px] text-on-surface-variant">Choose how your name and verified status appear on this problem statement.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(!isAnonymous)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer self-start sm:self-auto ${
                        isAnonymous
                          ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40"
                          : "bg-primary/10 text-primary border-primary/20"
                      }`}
                    >
                      {isAnonymous ? "Anonymous Scout Mode" : "Public Practitioner Attribution"}
                    </button>
                  </div>

                  {!isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-on-surface">Display Name</label>
                        <input
                          type="text"
                          value={customSubmitterName}
                          onChange={(e) => setCustomSubmitterName(e.target.value)}
                          placeholder={userDoc?.name || user?.displayName || "Your Name"}
                          className="w-full bg-surface-container/40 rounded-xl px-3.5 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-on-surface">Professional Role / Title</label>
                        <input
                          type="text"
                          value={submitterRole}
                          onChange={(e) => setSubmitterRole(e.target.value)}
                          placeholder="e.g. Clinical Director, Systems Engineer"
                          className="w-full bg-surface-container/40 rounded-xl px-3.5 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(2)}
                    className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Evidence & Data</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 2: EVIDENCE & STATISTICAL DATA POINTS ─────────────────── */}
            {activeTab === 2 && (
              <div className="bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-4 sm:gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-3 sm:pb-4">
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Module 2
                  </span>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-on-surface">
                    Key Statistical Data Points & Evidence
                  </h2>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant">
                    Back your problem statement with empirical numbers, whitepapers, benchmarks, and external links.
                  </p>
                </div>

                {/* Key Statistical Data Points Builder */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                    <span>Key Statistical Data Points</span>
                    <span className="text-[10px] text-outline font-normal">Highlighted metrics displayed on problem dossier</span>
                  </label>

                  {dataPoints.length === 0 ? (
                    <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                      No statistical data points added yet. Use the inputs below to add empirical metrics.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dataPoints.map((dp, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl border border-outline-variant/30 bg-surface flex items-center justify-between gap-3 shadow-2xs"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-black text-primary font-mono shrink-0">
                              {dp.metric}
                            </span>
                            <span className="text-xs text-on-surface font-medium leading-snug">
                              {dp.label}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDataPoints(dataPoints.filter((_, i) => i !== idx))}
                            className="text-gray-400 hover:text-error transition-colors p-1 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Stat Input */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-1">
                    <input
                      type="text"
                      value={newMetric}
                      onChange={(e) => setNewMetric(e.target.value)}
                      placeholder="Metric (e.g. 64% or 4.2 hrs)"
                      className="w-full sm:w-1/3 bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                    />
                    <input
                      type="text"
                      value={newMetricLabel}
                      onChange={(e) => setNewMetricLabel(e.target.value)}
                      placeholder="Label (e.g. Clinics using fax daily)"
                      className="w-full sm:flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newMetric.trim() && newMetricLabel.trim()) {
                          setDataPoints([...dataPoints, { metric: newMetric.trim(), label: newMetricLabel.trim() }]);
                          setNewMetric("");
                          setNewMetricLabel("");
                        }
                      }}
                      className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Metric</span>
                    </button>
                  </div>
                </div>

                {/* Supporting Documents Builder */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200/60">
                  <label className="text-xs font-bold text-on-surface">Supporting Documents & Policy PDFs</label>
                  {evidenceDocuments.length === 0 ? (
                    <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                      No documents attached yet. Add whitepapers, reports or datasets below.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {evidenceDocuments.map((doc, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-outline-variant/30 bg-surface flex items-start justify-between gap-3 shadow-2xs"
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-on-surface truncate">{doc.title}</span>
                              <span className="text-[11px] text-on-surface-variant line-clamp-1">{doc.description}</span>
                              <div className="flex items-center gap-2 text-[10px] text-outline mt-1 font-mono">
                                <span>{doc.size || "1.5 MB"}</span>
                                <span>·</span>
                                <span>{doc.pages || "8 pages"}</span>
                                <span>·</span>
                                <span className="text-primary truncate">{doc.url}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEvidenceDocuments(evidenceDocuments.filter((_, i) => i !== idx))}
                            className="text-gray-400 hover:text-error transition-colors p-1 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Document inputs */}
                  <div className="p-3.5 rounded-2xl bg-surface-container/20 border border-dashed border-gray-300 flex flex-col gap-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={newDocTitle}
                        onChange={(e) => setNewDocTitle(e.target.value)}
                        placeholder="Document Title (e.g. CMS Rule 91-A Report)"
                        className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                      />
                      <input
                        type="text"
                        value={newDocUrl}
                        onChange={(e) => setNewDocUrl(e.target.value)}
                        placeholder="Download / Reference URL"
                        className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                      />
                    </div>
                    <input
                      type="text"
                      value={newDocDesc}
                      onChange={(e) => setNewDocDesc(e.target.value)}
                      placeholder="Short summary of dataset or research content"
                      className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newDocSize}
                          onChange={(e) => setNewDocSize(e.target.value)}
                          placeholder="Size (e.g. 2.4 MB)"
                          className="w-24 bg-surface-container/40 rounded-xl px-2.5 py-1.5 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                        <input
                          type="text"
                          value={newDocPages}
                          onChange={(e) => setNewDocPages(e.target.value)}
                          placeholder="Pages"
                          className="w-24 bg-surface-container/40 rounded-xl px-2.5 py-1.5 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (newDocTitle.trim()) {
                            setEvidenceDocuments([
                              ...evidenceDocuments,
                              {
                                title: newDocTitle.trim(),
                                description: newDocDesc.trim() || "Official benchmark dataset and research report.",
                                url: newDocUrl.trim() || "https://example.com",
                                size: newDocSize.trim() || "1.5 MB",
                                pages: newDocPages.trim() || "8 pages",
                                type: "pdf",
                              },
                            ]);
                            setNewDocTitle("");
                            setNewDocDesc("");
                            setNewDocUrl("");
                          }
                        }}
                        className="bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-primary-container cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Document</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* External Links */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-gray-200/60">
                  <label className="text-xs font-bold text-on-surface">External Evidence Links</label>
                  <div className="flex flex-wrap gap-2">
                    {evidenceUrls.map((url, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-surface-container/40 border border-outline-variant/30 text-xs font-medium text-primary flex items-center gap-2"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="max-w-[200px] truncate">{url}</span>
                        <button
                          type="button"
                          onClick={() => setEvidenceUrls(evidenceUrls.filter((_, i) => i !== idx))}
                          className="text-gray-400 hover:text-error cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newEvidenceUrl}
                      onChange={(e) => setNewEvidenceUrl(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newEvidenceUrl.trim()) {
                          setEvidenceUrls([...evidenceUrls, newEvidenceUrl.trim()]);
                          setNewEvidenceUrl("");
                        }
                      }}
                      className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(1)}
                    className="text-on-surface-variant text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-surface-container cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(3)}
                    className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Market & Impact</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 3: MARKET TELEMETRY & FINANCIAL IMPACT ─────────────────── */}
            {activeTab === 3 && (
              <div className="bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-4 sm:gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-3 sm:pb-4">
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Module 3
                  </span>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-on-surface">
                    Market Telemetry & Financial Impact
                  </h2>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant">
                    Estimate market TAM, penetration hurdles, economic waste, and willingness to pay.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Total Addressable Market (TAM)</label>
                    <input
                      type="text"
                      value={tam}
                      onChange={(e) => setTam(e.target.value)}
                      placeholder="e.g. $4.2B"
                      className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-bold text-primary outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Annual Economic Waste</label>
                    <input
                      type="text"
                      value={wastedCost}
                      onChange={(e) => setWastedCost(e.target.value)}
                      placeholder="e.g. $1.5B"
                      className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-bold text-orange-600 outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Citizens / Users Affected</label>
                    <input
                      type="text"
                      value={citizensAffected}
                      onChange={(e) => setCitizensAffected(e.target.value)}
                      placeholder="e.g. 46 million patients"
                      className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface">Audience / Organization Count</label>
                    <input
                      type="text"
                      value={audienceSize}
                      onChange={(e) => setAudienceSize(e.target.value)}
                      placeholder="e.g. 4,500+ community practices"
                      className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>

                {/* Penetration Slider */}
                <div className="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container/30 border border-outline-variant/20">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-on-surface">Estimated Market Penetration</span>
                    <span className="text-primary font-mono">{currentPenetration}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={currentPenetration}
                    onChange={(e) => setCurrentPenetration(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer h-2 bg-surface-container rounded-lg"
                  />
                  <span className="text-[10px] text-on-surface-variant font-normal">
                    Indicates how much of the target market currently uses existing solutions vs unserved gap.
                  </span>
                </div>

                {/* Willingness to Pay */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Estimated Willingness to Pay</label>
                  <input
                    type="text"
                    value={willingnessToPay}
                    onChange={(e) => setWillingnessToPay(e.target.value)}
                    placeholder="e.g. $150/mo per practitioner or $5,000/yr per clinic"
                    className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(2)}
                    className="text-on-surface-variant text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-surface-container cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(4)}
                    className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Research & Competitors</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 4: RESEARCH & COMPETITOR MATRIX ────────────────────────── */}
            {activeTab === 4 && (
              <div className="bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-4 sm:gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-3 sm:pb-4">
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Module 4
                  </span>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-on-surface">
                    Research Methodology & Competitor Matrix
                  </h2>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant">
                    Detail academic findings and evaluate why current commercial competitors fail.
                  </p>
                </div>

                {/* Key Findings Builder */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-bold text-on-surface">Key Research Findings (Bullet Points)</label>
                  {keyFindings.length === 0 ? (
                    <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                      No key research findings added yet. Add empirical insights below.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {keyFindings.map((finding, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-surface border border-outline-variant/30 flex items-start justify-between gap-2 shadow-2xs"
                        >
                          <div className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span className="text-xs text-on-surface">{finding}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setKeyFindings(keyFindings.filter((_, i) => i !== idx))}
                            className="text-gray-400 hover:text-error p-0.5 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFinding}
                      onChange={(e) => setNewFinding(e.target.value)}
                      placeholder="Add key empirical insight..."
                      className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFinding.trim()) {
                          setKeyFindings([...keyFindings, newFinding.trim()]);
                          setNewFinding("");
                        }
                      }}
                      className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                    >
                      Add Finding
                    </button>
                  </div>
                </div>

                {/* Research Methodology */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <label className="text-xs font-bold text-on-surface">Research Methodology & Sampling</label>
                  <textarea
                    rows={2}
                    value={researchMethodology}
                    onChange={(e) => setResearchMethodology(e.target.value)}
                    placeholder="How was this data collected and cross-verified?..."
                    className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>

                {/* Competitors Matrix Builder */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200/60">
                  <label className="text-xs font-bold text-on-surface">Existing Solutions & Competitor Gaps</label>
                  {competitors.length === 0 ? (
                    <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                      No competitors added yet. Add incumbent or alternative solutions below.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {competitors.map((comp, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-surface border border-outline-variant/30 shadow-2xs flex flex-col gap-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-on-surface">{comp.solution}</span>
                            <button
                              type="button"
                              onClick={() => setCompetitors(competitors.filter((_, i) => i !== idx))}
                              className="text-gray-400 hover:text-error cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex flex-col gap-1 text-[11px]">
                            <p className="text-emerald-600 font-medium leading-relaxed">
                              <span className="font-bold">Pros:</span> {comp.pros}
                            </p>
                            <p className="text-rose-600 font-medium leading-relaxed">
                              <span className="font-bold">Cons:</span> {comp.cons}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Competitor */}
                  <div className="p-3.5 rounded-2xl bg-surface-container/20 border border-dashed border-gray-300 flex flex-col gap-2.5">
                    <input
                      type="text"
                      value={newCompName}
                      onChange={(e) => setNewCompName(e.target.value)}
                      placeholder="Incumbent / Competitor Name (e.g. Epic Care Everywhere)"
                      className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={newCompPros}
                        onChange={(e) => setNewCompPros(e.target.value)}
                        placeholder="Key Advantage / Pros"
                        className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                      />
                      <input
                        type="text"
                        value={newCompCons}
                        onChange={(e) => setNewCompCons(e.target.value)}
                        placeholder="Critical Flaw / Cons"
                        className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (newCompName.trim()) {
                          setCompetitors([
                            ...competitors,
                            {
                              solution: newCompName.trim(),
                              pros: newCompPros.trim() || "Standard incumbent market presence.",
                              cons: newCompCons.trim() || "High friction and cost.",
                            },
                          ]);
                          setNewCompName("");
                          setNewCompPros("");
                          setNewCompCons("");
                        }
                      }}
                      className="self-end bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-primary-container cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Competitor</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(3)}
                    className="text-on-surface-variant text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-surface-container cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(5)}
                    className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to MVP Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 5: SUGGESTED MVP & TECHNICAL SPECS ─────────────────────── */}
            {activeTab === 5 && (
              <div className="bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-4 sm:gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-3 sm:pb-4">
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-primary">
                    Module 5
                  </span>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-on-surface">
                    Suggested MVP Scope & Technical Architecture
                  </h2>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant">
                    Outline the minimal viable solution features and necessary security/compliance constraints.
                  </p>
                </div>

                {/* MVP Features Builder */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-bold text-on-surface">Core MVP Feature Requirements</label>
                  {mvpFeatures.length === 0 ? (
                    <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                      No core MVP features added yet. Add key technical capabilities below.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {mvpFeatures.map((feat, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-surface border border-outline-variant/30 flex items-start justify-between gap-2 shadow-2xs"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs text-on-surface">{feat}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setMvpFeatures(mvpFeatures.filter((_, i) => i !== idx))}
                            className="text-gray-400 hover:text-error p-0.5 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMvpFeature}
                      onChange={(e) => setNewMvpFeature(e.target.value)}
                      placeholder="Add MVP core feature (e.g. Automated FHIR endpoint mapper)..."
                      className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newMvpFeature.trim()) {
                          setMvpFeatures([...mvpFeatures, newMvpFeature.trim()]);
                          setNewMvpFeature("");
                        }
                      }}
                      className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                    >
                      Add Feature
                    </button>
                  </div>
                </div>

                {/* Technical Requirements */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <label className="text-xs font-bold text-on-surface">Technical, Security & Compliance Requirements</label>
                  <textarea
                    rows={3}
                    value={technicalRequirements}
                    onChange={(e) => setTechnicalRequirements(e.target.value)}
                    placeholder="e.g. SOC2 Type II compliance, HIPAA BAA readiness, low-latency sync over 3G..."
                    className="w-full bg-surface-container/40 rounded-xl p-3.5 text-xs text-on-surface outline-none border border-outline-variant/30 leading-relaxed font-normal"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(4)}
                    className="text-on-surface-variant text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-surface-container cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab(6)}
                    className="bg-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Startup Mode Builder</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── TAB 6: STARTUP MODE & VENTURE WORKSPACE ────────────────────── */}
            {activeTab === 6 && (
              <div className="bg-surface-container-lowest p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-4 sm:gap-6 animate-fade-in">
                <div className="flex flex-col gap-1 border-b border-gray-200/60 pb-3 sm:pb-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-primary">
                      Module 6 · Venture Studio
                    </span>
                    {/* Startup Mode Master Switch */}
                    <button
                      type="button"
                      onClick={() => setHasStartupMode(!hasStartupMode)}
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        hasStartupMode
                          ? "bg-primary text-white shadow-xs"
                          : "bg-surface-container text-on-surface-variant border border-outline-variant/30"
                      }`}
                    >
                      <span>{hasStartupMode ? "Startup Mode Enabled" : "Startup Mode Disabled"}</span>
                    </button>
                  </div>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-on-surface">
                    Startup Mode & Venture Economics Builder
                  </h2>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant">
                    Equip founders and builders with initial hypotheses, target buyer segments, and value proposition drafts.
                  </p>
                </div>

                {hasStartupMode ? (
                  <div className="flex flex-col gap-6">
                    {/* Core Venture Thesis */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                        <span>Core Venture Thesis</span>
                        <span className="text-[10px] text-outline font-normal">Use **bold** to emphasize key metrics & insights</span>
                      </label>
                      <textarea
                        rows={3}
                        value={startupThesis}
                        onChange={(e) => setStartupThesis(e.target.value)}
                        placeholder="This problem represents an acute systemic inefficiency across **46 million** citizens with an annual wasted cost of **$1.5B**..."
                        className="w-full bg-surface-container/40 rounded-xl p-3.5 text-xs text-on-surface outline-none border border-outline-variant/30 leading-relaxed font-normal"
                      />
                    </div>

                    {/* Target Customer Segments */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-xs font-bold text-on-surface">
                        Which of these segments would a founder focus on first?
                      </label>
                      {startupTargetSegments.length === 0 ? (
                        <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                          No customer segments added yet. Add target personas below.
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {startupTargetSegments.map((seg, idx) => (
                            <div
                              key={idx}
                              className="px-3.5 py-1.5 rounded-full bg-surface-container/60 border border-outline-variant/30 text-xs font-bold text-on-surface flex items-center gap-2 shadow-2xs"
                            >
                              <span>{seg}</span>
                              <button
                                type="button"
                                onClick={() => setStartupTargetSegments(startupTargetSegments.filter((_, i) => i !== idx))}
                                className="text-gray-400 hover:text-error cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSegment}
                          onChange={(e) => setNewSegment(e.target.value)}
                          placeholder="Add customer segment (e.g. Rural Clinic Admins)..."
                          className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newSegment.trim()) {
                              setStartupTargetSegments([...startupTargetSegments, newSegment.trim()]);
                              setNewSegment("");
                            }
                          }}
                          className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                        >
                          + Add Segment
                        </button>
                      </div>
                    </div>

                    {/* Value Proposition Draft */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                        <span>Smallest Version of Value (Initial Value Proposition)</span>
                        <span className="text-[10px] text-outline font-normal">Willingness-to-pay hypothesis</span>
                      </label>
                      <textarea
                        rows={3}
                        value={startupValueProp}
                        onChange={(e) => setStartupValueProp(e.target.value)}
                        placeholder="A lightweight PDF parser that categorizes incoming faxes and maps them directly to EHR endpoints without custom integration fees..."
                        className="w-full bg-surface-container/40 rounded-xl p-3.5 text-xs text-on-surface outline-none border border-outline-variant/30 leading-relaxed font-normal"
                      />
                    </div>

                    {/* Willingness to pay benchmark */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface">Average Willingness-to-Pay Benchmark</label>
                      <input
                        type="text"
                        value={startupWillingnessToPay}
                        onChange={(e) => setStartupWillingnessToPay(e.target.value)}
                        placeholder="e.g. $150/mo per practitioner"
                        className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30"
                      />
                    </div>

                    {/* Existing Solution Gaps Builder */}
                    <div className="flex flex-col gap-3 pt-2">
                      <label className="text-xs font-bold text-on-surface">Weaknesses & Gaps in Incumbents</label>
                      {startupSolutionsGaps.length === 0 ? (
                        <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                          No incumbent weaknesses or gaps added yet. Add vulnerabilities below.
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2.5">
                          {startupSolutionsGaps.map((gap, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 shadow-2xs flex items-start justify-between gap-3"
                            >
                              <div className="flex flex-col gap-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-on-surface">{gap.name}</span>
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                      gap.weaknessType === "Weakness"
                                        ? "bg-orange-100 text-orange-700 dark:bg-orange-950/50"
                                        : "bg-purple-100 text-purple-700 dark:bg-purple-950/50"
                                    }`}
                                  >
                                    {gap.weaknessType}
                                  </span>
                                </div>
                                <span className="text-[11px] text-on-surface-variant line-clamp-1">{gap.description}</span>
                                <p className="text-xs text-rose-600 font-medium mt-0.5">
                                  <span className="font-bold">Vulnerability:</span> {gap.weakness}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setStartupSolutionsGaps(startupSolutionsGaps.filter((_, i) => i !== idx))}
                                className="text-gray-400 hover:text-error p-1 cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Gap */}
                      <div className="p-3.5 rounded-2xl bg-surface-container/20 border border-dashed border-gray-300 flex flex-col gap-2.5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={newGapName}
                            onChange={(e) => setNewGapName(e.target.value)}
                            placeholder="Solution Name (e.g. Epic)"
                            className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                          />
                          <input
                            type="text"
                            value={newGapDesc}
                            onChange={(e) => setNewGapDesc(e.target.value)}
                            placeholder="Description"
                            className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                          />
                          <select
                            value={newGapType}
                            onChange={(e) => setNewGapType(e.target.value as any)}
                            className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                          >
                            <option value="Weakness">Weakness</option>
                            <option value="Gap">Gap</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          value={newGapWeakness}
                          onChange={(e) => setNewGapWeakness(e.target.value)}
                          placeholder="Specific Vulnerability / Reason why it fails..."
                          className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newGapName.trim()) {
                              setStartupSolutionsGaps([
                                ...startupSolutionsGaps,
                                {
                                  name: newGapName.trim(),
                                  description: newGapDesc.trim() || "Incumbent solution in market.",
                                  weaknessType: newGapType,
                                  weakness: newGapWeakness.trim() || "High costs and proprietary friction.",
                                },
                              ]);
                              setNewGapName("");
                              setNewGapDesc("");
                              setNewGapWeakness("");
                            }
                          }}
                          className="self-end bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-primary-container cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Incumbent Gap</span>
                        </button>
                      </div>
                    </div>

                    {/* Directions to Explore (Max 3) */}
                    <div className="flex flex-col gap-3 pt-2 border-t border-gray-200/60">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-on-surface">
                          Architectural Directions to Explore
                        </label>
                        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                          {startupDirections.length}/3 Approaches
                        </span>
                      </div>
                      {startupDirections.length === 0 ? (
                        <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                          No architectural directions added yet. Add up to 3 exploration angles below.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {startupDirections.map((dir, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-2xl bg-surface border border-outline-variant/30 shadow-2xs flex flex-col gap-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                                  {dir.type}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setStartupDirections(startupDirections.filter((_, i) => i !== idx))}
                                  className="text-gray-400 hover:text-error cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="text-xs font-bold text-on-surface">{dir.title}</span>
                              <span className="text-[11px] text-on-surface-variant leading-relaxed">
                                {dir.description}
                              </span>
                              {dir.pros && (
                                <div className="text-[10px] text-emerald-700 font-medium">
                                  <strong>Pros:</strong> {dir.pros}
                                </div>
                              )}
                              {dir.cons && (
                                <div className="text-[10px] text-error font-medium">
                                  <strong>Cons:</strong> {dir.cons}
                                </div>
                              )}
                              {dir.techStack && dir.techStack.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {dir.techStack.map((tech, tIdx) => (
                                    <span key={tIdx} className="text-[9px] font-mono bg-surface-container px-2 py-0.5 rounded text-on-surface">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {startupDirections.length < 3 ? (
                        <div className="p-3.5 rounded-2xl bg-surface-container/20 border border-dashed border-gray-300 flex flex-col gap-2.5">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <select
                              value={newDirType}
                              onChange={(e) => setNewDirType(e.target.value)}
                              className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                            >
                              <option value="software">Software / SaaS</option>
                              <option value="service">Managed Service / Hybrid</option>
                              <option value="hardware">Hardware / Edge Appliance</option>
                              <option value="hybrid">Hybrid Solution</option>
                            </select>
                            <input
                              type="text"
                              value={newDirTitle}
                              onChange={(e) => setNewDirTitle(e.target.value)}
                              placeholder="Direction Title (e.g. Universal API Bridge)"
                              className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface outline-none border border-outline-variant/30 sm:col-span-2"
                            />
                          </div>
                          <input
                            type="text"
                            value={newDirDesc}
                            onChange={(e) => setNewDirDesc(e.target.value)}
                            placeholder="Brief technical angle or venture rationale..."
                            className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={newDirPros}
                              onChange={(e) => setNewDirPros(e.target.value)}
                              placeholder="Pros (e.g. High margins, rapid scaling)"
                              className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                            />
                            <input
                              type="text"
                              value={newDirCons}
                              onChange={(e) => setNewDirCons(e.target.value)}
                              placeholder="Cons (e.g. Requires BAA compliance)"
                              className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                            />
                          </div>
                          <input
                            type="text"
                            value={newDirTechStack}
                            onChange={(e) => setNewDirTechStack(e.target.value)}
                            placeholder="Tech Stack (comma-separated, e.g. Next.js, Python, FHIR, PostgreSQL)"
                            className="w-full bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newDirTitle.trim()) {
                                const stackArr = newDirTechStack
                                  ? newDirTechStack.split(",").map((s) => s.trim()).filter(Boolean)
                                  : [];
                                setStartupDirections([
                                  ...startupDirections,
                                  {
                                    type: newDirType,
                                    title: newDirTitle.trim(),
                                    description: newDirDesc.trim() || "Venture exploration angle.",
                                    pros: newDirPros.trim(),
                                    cons: newDirCons.trim(),
                                    techStack: stackArr,
                                  },
                                ]);
                                setNewDirTitle("");
                                setNewDirDesc("");
                                setNewDirPros("");
                                setNewDirCons("");
                                setNewDirTechStack("");
                              }
                            }}
                            className="self-end bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-primary-container cursor-pointer flex items-center gap-1 shadow-2xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Architectural Direction</span>
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs text-on-surface-variant italic">
                          Maximum of 3 architectural approaches reached.
                        </p>
                      )}
                    </div>

                    {/* Compliance & Security Standards */}
                    <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-200/60">
                      <label className="text-xs font-bold text-on-surface">
                        Compliance & Security Standards
                      </label>
                      <p className="text-[11px] text-on-surface-variant">
                        Click chips to quickly toggle enterprise security requirements.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "HIPAA BAA Compliant",
                          "SOC2 Type II Ready",
                          "FHIR / HL7 Validated",
                          "Carequality HIE Ready",
                          "GDPR & Privacy Shield",
                          "ISO 27001 Certified",
                          "PCI-DSS Level 1",
                          "FedRAMP Moderate",
                          "Zero Trust Encryption (AES-256)",
                        ].map((preset) => {
                          const isSelected = startupComplianceStandards.includes(preset);
                          return (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setStartupComplianceStandards(startupComplianceStandards.filter((s) => s !== preset));
                                } else {
                                  setStartupComplianceStandards([...startupComplianceStandards, preset]);
                                }
                              }}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                                isSelected
                                  ? "bg-primary text-white border-primary shadow-xs font-bold"
                                  : "bg-surface-container/40 text-on-surface-variant border-outline-variant/30 hover:bg-surface-container"
                              }`}
                            >
                              <span>{preset}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex gap-2 mt-1">
                        <input
                          type="text"
                          value={customStandard}
                          onChange={(e) => setCustomStandard(e.target.value)}
                          placeholder="Add custom compliance standard..."
                          className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && customStandard.trim()) {
                              e.preventDefault();
                              if (!startupComplianceStandards.includes(customStandard.trim())) {
                                setStartupComplianceStandards([...startupComplianceStandards, customStandard.trim()]);
                              }
                              setCustomStandard("");
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (customStandard.trim()) {
                              if (!startupComplianceStandards.includes(customStandard.trim())) {
                                setStartupComplianceStandards([...startupComplianceStandards, customStandard.trim()]);
                              }
                              setCustomStandard("");
                            }
                          }}
                          className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                        >
                          + Add Standard
                        </button>
                      </div>
                    </div>

                    {/* Validation Checklist & Discovery Prompt */}
                    <div className="flex flex-col gap-3 pt-2 border-t border-gray-200/60">
                      <label className="text-xs font-bold text-on-surface">Founder Validation Stage-Gate Questions</label>
                      {startupValidationQuestions.length === 0 ? (
                        <div className="p-3.5 rounded-xl border border-dashed border-gray-200 text-center text-xs text-on-surface-variant/70 italic bg-surface-container/10">
                          No validation milestones added. Add discovery questions below.
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {startupValidationQuestions.map((q, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-outline-variant/30 text-xs font-medium text-on-surface">
                              <span>{idx + 1}. {q}</span>
                              <button
                                type="button"
                                onClick={() => setStartupValidationQuestions(startupValidationQuestions.filter((_, i) => i !== idx))}
                                className="text-gray-400 hover:text-error"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newValidationQuestion}
                          onChange={(e) => setNewValidationQuestion(e.target.value)}
                          placeholder="e.g. Talked to 10+ target practitioners or clinic administrators?"
                          className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newValidationQuestion.trim()) {
                              setStartupValidationQuestions([...startupValidationQuestions, newValidationQuestion.trim()]);
                              setNewValidationQuestion("");
                            }
                          }}
                          className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                        >
                          + Add Question
                        </button>
                      </div>

                      <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-bold text-on-surface">Customer Discovery Interview Script Prompt</label>
                        <textarea
                          rows={2}
                          value={discoveryInterviewPrompt}
                          onChange={(e) => setDiscoveryInterviewPrompt(e.target.value)}
                          placeholder="e.g. When was the last time an incoming patient record failed to transfer, and how much clinical staff time was spent chasing that single file?"
                          className="w-full bg-surface-container/40 rounded-xl p-3.5 text-xs text-on-surface outline-none border border-outline-variant/30 leading-relaxed font-normal"
                        />
                      </div>
                    </div>

                    {/* AI Co-Founder & GTM Strategy */}
                    <div className="flex flex-col gap-3 pt-2 border-t border-gray-200/60">
                      <label className="text-xs font-bold text-on-surface">Recommended Strategic Angles & GTM</label>
                      <div className="flex flex-col gap-2">
                        {suggestedAngles.map((angle, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-surface border border-outline-variant/30 text-xs text-on-surface">
                            <span>{idx + 1}. {angle}</span>
                            <button
                              type="button"
                              onClick={() => setSuggestedAngles(suggestedAngles.filter((_, i) => i !== idx))}
                              className="text-gray-400 hover:text-error"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSuggestedAngle}
                          onChange={(e) => setNewSuggestedAngle(e.target.value)}
                          placeholder="e.g. Universal EHR translation bridge with offline caching..."
                          className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newSuggestedAngle.trim()) {
                              setSuggestedAngles([...suggestedAngles, newSuggestedAngle.trim()]);
                              setNewSuggestedAngle("");
                            }
                          }}
                          className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                        >
                          + Add Angle
                        </button>
                      </div>

                      <label className="text-xs font-bold text-on-surface mt-2">Key Regulatory & Technical Risks</label>
                      <div className="flex flex-col gap-2">
                        {keyRisks.map((risk, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-error-container/20 border border-error/20 text-xs text-on-surface">
                            <span className="font-semibold text-error">{idx + 1}. {risk}</span>
                            <button
                              type="button"
                              onClick={() => setKeyRisks(keyRisks.filter((_, i) => i !== idx))}
                              className="text-gray-400 hover:text-error"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newKeyRisk}
                          onChange={(e) => setNewKeyRisk(e.target.value)}
                          placeholder="e.g. HIPAA BAA compliance hurdles..."
                          className="flex-1 bg-surface-container/40 rounded-xl px-3 py-2 text-xs text-on-surface outline-none border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newKeyRisk.trim()) {
                              setKeyRisks([...keyRisks, newKeyRisk.trim()]);
                              setNewKeyRisk("");
                            }
                          }}
                          className="bg-surface-container text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 cursor-pointer"
                        >
                          + Add Risk
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-surface-container/20 border border-dashed border-gray-300 text-center flex flex-col items-center gap-2">
                    <Rocket className="w-8 h-8 text-gray-400 opacity-50" />
                    <h3 className="text-sm font-bold text-on-surface">Startup Mode Is Disabled</h3>
                    <p className="text-xs text-on-surface-variant max-w-md">
                      Enable Startup Mode above to attach venture unit economics, buyer segments, and draft hypotheses to this problem dossier.
                    </p>
                    <button
                      type="button"
                      onClick={() => setHasStartupMode(true)}
                      className="mt-2 text-xs font-bold text-primary hover:underline"
                    >
                      Enable Startup Mode
                    </button>
                  </div>
                )}

                {/* ── Human Anti-Bot Verification Check ───────────────── */}
                <div className="pt-2">
                  <HumanVerification
                    onVerify={() => {
                      setIsHumanVerified(true);
                      setError(null);
                    }}
                    onExpire={() => setIsHumanVerified(false)}
                    label="I'm a human contributor (verify to submit)"
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200/60 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab(5)}
                    className="text-on-surface-variant text-xs font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-surface-container cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-2 hover:bg-primary-container transition-all cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        <span>Submitting to Admin...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Problem Statement</span>
                        <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  };
