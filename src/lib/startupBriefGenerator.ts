import { ProblemDoc, StartupBrief } from "@/types";

export function generateStartupBrief(problem: ProblemDoc): StartupBrief {
  const isHealth = problem.industry.toLowerCase().includes("health");
  const isFinance = problem.industry.toLowerCase().includes("fin") || problem.industry.toLowerCase().includes("legal");
  const isConstruction = problem.industry.toLowerCase().includes("home") || problem.industry.toLowerCase().includes("construct");

  return {
    problemId: problem.id,
    problemTitle: problem.title,
    industry: problem.industry,
    executiveSummary: `ProblemAtlas Startup Intelligence has synthesized a verified commercial blueprint for: "${problem.title}". With an acute Pain Score of ${problem.painScore}/100 and Opportunity Score of ${problem.opportunityScore}/100, this problem exhibits strong indicators for venture-scale commercialization via automated workflows and specialized domain infrastructure.`,
    solutionHypotheses: [
      {
        name: `Automated ${problem.industry.split(" ")[0]} Intelligence Copilot`,
        model: "B2B SaaS",
        description: `Direct software solution replacing manual, fragmented workarounds with an intelligent, continuous monitoring platform built for ${problem.whoFacesIt}.`,
        targetBuyer: isFinance ? "CFO / VP of Compliance" : isHealth ? "Clinical Director / Care Manager" : "Operations Lead / Business Owner",
        feasibilityScore: 92,
      },
      {
        name: `Integrated Verification & Escrow Network`,
        model: "Marketplace",
        description: `Two-sided trust platform offering milestone escrow, automated verification, and guaranteed SLA execution for ${problem.industry}.`,
        targetBuyer: "End Consumers & Enterprise Service Providers",
        feasibilityScore: 84,
      },
      {
        name: `Headless API & Telemetry Infrastructure`,
        model: "API / Infrastructure",
        description: `Developer-first API and sensor SDK enabling legacy industry software to plug directly into real-time alerts and state machines.`,
        targetBuyer: "Software Engineers & Tech Leaders in the space",
        feasibilityScore: 88,
      },
    ],
    targetICP: {
      persona: problem.whoFacesIt || "Domain Operations Directors & Stressed Practitioners",
      coreJobToBeDone: `Eliminate recurring operational friction and preventable financial exposure during ${problem.whenItHappens || "daily workflows"}.`,
      keyBudgetOwner: isFinance ? "Finance / Legal Discretionary Budget" : isHealth ? "Patient Care & Hospital Operations Fund" : "Department Operating Budget",
      currentWorkaroundCost: problem.willingnessToPay === "$200+/mo" ? "$15,000 - $50,000 / year in manual overhead" : "$2,400 - $8,000 / year in lost productivity",
    },
    marketSize: {
      tam: problem.estimatedValue || "$14.2 Billion (Global Aggregate Market)",
      sam: "$3.8 Billion (Serviceable Available Market in Tier-1 Geographies)",
      som: "$420 Million (Serviceable Obtainable Market via High-Velocity Wedge in Years 1-3)",
      rationale: `Derived from ${problem.audienceSize} target units paying an estimated ${problem.willingnessToPay} blended annual contract value with 85%+ gross margins.`,
    },
    monetization: {
      pricingStrategy: problem.willingnessToPay === "$200+/mo" 
        ? "Tiered Usage + Base Seat License ($499 - $2,499/mo + 1.2% transaction take-rate)" 
        : "Product-Led Growth ($29/seat/mo Starter, $199/team/mo Pro, Custom Enterprise)",
      estimatedACV: problem.willingnessToPay === "$200+/mo" ? "$18,500" : "$3,200",
      projectedLTVCAC: "4.8x (Targeting < 7 month payback period)",
    },
    gtmRoadmap: [
      {
        phase: "Phase 1: Zero-to-One Wedge (Months 1-4)",
        milestone: "10 Design Partners & Reference Case Studies",
        keyActions: [
          "Conduct 30 deep-dive customer discovery calls using ProblemAtlas verified respondents",
          "Deploy manual concierge MVP solving the core pain point in under 48 hours",
          "Secure 5 signed letters of intent (LOI) with upfront pilot deposits",
        ],
      },
      {
        phase: "Phase 2: Product-Led Flywheel (Months 5-10)",
        milestone: "$25,000 Monthly Recurring Revenue (MRR)",
        keyActions: [
          "Launch public self-serve portal with instant diagnostic ROI calculator",
          "Distribute industry benchmark report derived from real-world telemetry",
          "Integrate directly with standard industry tool stack",
        ],
      },
      {
        phase: "Phase 3: Category Expansion & Ecosystem (Months 11-18)",
        milestone: "$1.2M ARR & Series A Institutional Financing",
        keyActions: [
          "Introduce enterprise compliance guarantees and API developer marketplace",
          "Scale outbound sales team targeting mid-market accounts",
          "Expand geographically into European and Asian regulatory jurisdictions",
        ],
      },
    ],
    competitorMatrix: [
      {
        competitor: "Legacy Enterprise Suites",
        theirWeakness: "Bloated, expensive 12-month onboarding cycles, lacks real-time AI automation.",
        ourUnfairAdvantage: "Instant 5-minute setup, 10x lower price point, specialized workflow intelligence.",
      },
      {
        competitor: "Manual Spreadsheets & Email",
        theirWeakness: "Prone to human error, lacks audit trails, zero automated triggers.",
        ourUnfairAdvantage: "Guaranteed SLA, automated compliance audit logs, instant peace of mind.",
      },
      {
        competitor: "Generic Horizontal AI Tools",
        theirWeakness: "Hallucinates, lacks regulatory guardrails and industry-specific integrations.",
        ourUnfairAdvantage: "Deterministic validation rules, domain data model, verified liability protection.",
      },
    ],
  };
}
