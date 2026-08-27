import { AIScores, ProblemSeverity } from "@/types";

/**
 * AI Problem Scoring & Validation Pipeline
 * Evaluates submissions across 10 distinct parameters and generates detailed diagnostic feedback.
 */
export function scoreProblemSubmission(data: {
  title: string;
  description: string;
  whenItHappens: string;
  whyFrustrating: string;
  frequency: string;
  whoFacesIt: string;
  industry: string;
  severity: ProblemSeverity;
  currentSolution: string;
  audienceSize: string;
  willingnessToPay: string;
}): {
  aiScores: AIScores;
  painScore: number;
  opportunityScore: number;
  spamCheck: { isSpam: boolean; reason?: string };
  duplicateWarning?: string;
} {
  // 1. Spam & Quality Heuristic Check
  const totalLength = (data.title + data.description + data.whyFrustrating).length;
  const spamKeywords = ["crypto airdrop", "casino", "free money", "viagra", "seo rank fast", "telegram @", "whatsapp +"];
  const containsSpam = spamKeywords.some((kw) =>
    (data.title + " " + data.description).toLowerCase().includes(kw)
  );

  if (containsSpam || totalLength < 40) {
    return {
      aiScores: {
        clarity: 20,
        originality: 15,
        marketSize: 10,
        painLevel: 10,
        urgency: 10,
        existingCompetition: 10,
        technicalFeasibility: 20,
        socialImpact: 10,
        businessPotential: 10,
        aiConfidence: 95,
        overall: 15,
        summaryFeedback: "Submission flagged for low quality or spam triggers. Does not meet ProblemAtlas verification standards.",
      },
      painScore: 12,
      opportunityScore: 10,
      spamCheck: { isSpam: true, reason: "Spam or low-effort content detected" },
    };
  }

  // 2. Compute Clarity (based on precision of description, when it happens, who faces it)
  const descWordCount = data.description.split(/\s+/).length;
  const clarity = Math.min(98, Math.max(65, Math.round(70 + (descWordCount > 30 ? 15 : descWordCount * 0.4) + (data.whenItHappens.length > 20 ? 10 : 5))));

  // 3. Compute Pain Level (based on severity, frequency, whyFrustrating)
  const severityMultipliers: Record<ProblemSeverity, number> = {
    critical: 95,
    major: 86,
    medium: 72,
    minor: 52,
  };
  const freqBonus = data.frequency.toLowerCase().includes("daily") ? 8 : data.frequency.toLowerCase().includes("weekly") ? 4 : 0;
  const painLevel = Math.min(99, Math.round(severityMultipliers[data.severity] + freqBonus));

  // 4. Urgency
  const urgency = Math.min(98, Math.max(50, Math.round(painLevel * 0.92 + (data.severity === "critical" ? 8 : 2))));

  // 5. Market Size
  const audienceScores: Record<string, number> = {
    "10m+": 96,
    "1m-10m": 88,
    "100k-1m": 78,
    "10k-100k": 65,
    "<10k": 48,
  };
  const marketSize = audienceScores[data.audienceSize] || 75;

  // 6. Business Potential (Market size + Willingness to Pay)
  const wtpScores: Record<string, number> = {
    "$200+/mo": 96,
    "$50-200/mo": 90,
    "$10-50/mo": 78,
    "<$10/mo": 62,
    "free": 40,
    "one-time": 70,
  };
  const wtpScore = wtpScores[data.willingnessToPay] || 70;
  const businessPotential = Math.min(98, Math.round(marketSize * 0.45 + wtpScore * 0.55));

  // 7. Originality & Competition
  const originality = Math.min(95, Math.max(60, Math.round(80 + (data.currentSolution.length > 30 ? 8 : 0))));
  const existingCompetition = Math.min(90, Math.max(40, Math.round(100 - originality * 0.5 + 20)));

  // 8. Feasibility & Social Impact
  const technicalFeasibility = Math.min(95, Math.max(70, 85));
  const socialImpact = data.industry.includes("Health") || data.industry.includes("Civic") || data.industry.includes("Non-profit") || data.severity === "critical" ? 94 : 76;

  // 9. AI Confidence
  const aiConfidence = Math.min(96, Math.max(78, Math.round(75 + descWordCount * 0.2 + (data.currentSolution ? 8 : 0))));

  // 10. Overall Score
  const overall = Math.round(
    clarity * 0.12 +
    originality * 0.1 +
    marketSize * 0.12 +
    painLevel * 0.16 +
    urgency * 0.12 +
    businessPotential * 0.15 +
    technicalFeasibility * 0.1 +
    socialImpact * 0.13
  );

  // Pain & Opportunity Composite Scores
  const painScore = Math.min(99, Math.round(painLevel * 0.7 + urgency * 0.3));
  const opportunityScore = Math.min(99, Math.round(businessPotential * 0.6 + marketSize * 0.4));

  const keyRisks = [
    data.audienceSize === "<10k" ? "Niche customer segment may cap enterprise valuation" : "Customer education cycle may require targeted outreach",
    wtpScore < 60 ? "Monetization model will likely require ad-supported or sponsored B2B model" : "Incumbent software friction during migration",
    "Execution risk on workflow integration with legacy systems",
  ];

  const suggestedAngles = [
    `AI-first automated workflow tailored specifically for ${data.whoFacesIt || "target users"}`,
    `Vertical marketplace bridging the gap between ${data.industry} operators and automated solutions`,
    `Low-friction embeddable API to plug into existing ${data.currentSolution || "tooling"}`,
  ];

  const summaryFeedback = `Strong problem statement with clear pain indicators. Severity rated as ${data.severity.toUpperCase()} with high economic impact. Best positioned for a targeted B2B/consumer solution.`;

  return {
    aiScores: {
      clarity,
      originality,
      marketSize,
      painLevel,
      urgency,
      existingCompetition,
      technicalFeasibility,
      socialImpact,
      businessPotential,
      aiConfidence,
      overall,
      summaryFeedback,
      keyRisks,
      suggestedAngles,
    },
    painScore,
    opportunityScore,
    spamCheck: { isSpam: false },
  };
}
