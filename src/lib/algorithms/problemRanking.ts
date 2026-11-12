import { ProblemDoc } from "@/types";

/**
 * Multi-Factor Problem Ranking & Display Intelligence
 *
 * Replaces arbitrary insertion order and random shuffle with a deterministic,
 * signal-weighted ranking engine that balances:
 *  1. Pain Severity & Core Score (impact magnitude)
 *  2. Traction & Builder Demand (who is facing, paying, building)
 *  3. Community Engagement Velocity (comments, upvotes, real views)
 *  4. Credibility & Verification (verified badge, enterprise backing)
 *  5. Recency / Freshness Window (discovery boost for newly surfaced problems)
 *  6. Industry Diversity (anti-clustering to prevent monoculture in grid feeds)
 */

export interface RankScoreBreakdown {
  painWeight: number;
  severityBonus: number;
  validationWeight: number;
  engagementWeight: number;
  credibilityBonus: number;
  freshnessBonus: number;
  totalScore: number;
}

/**
 * Calculates a comprehensive rank score for a single Problem Statement.
 * Higher score = higher placement in Trending & Explore feeds.
 */
export function computeProblemRankScore(
  problem: ProblemDoc,
  now: number = Date.now()
): number {
  if (!problem) return 0;

  // 1. Pain Score & Magnitude (0 to 35 points)
  const pain = typeof problem.painScore === "number" ? problem.painScore : 50;
  const painWeight = Math.max(0, Math.min(100, pain)) * 0.35;

  // 2. Severity Bonus
  let severityBonus = 0;
  const sev = (problem.severity || "").toLowerCase().trim();
  if (sev === "critical") {
    severityBonus = 10;
  } else if (sev === "high") {
    severityBonus = 6;
  } else if (sev === "medium") {
    severityBonus = 2;
  }

  // 3. Validation & Traction Momentum (Real builder demand is the strongest indicator)
  const validations = problem.validations;
  const buildCount = Math.max(0, Number(validations?.buildCount) || 0);
  const faceCount = Math.max(0, Number(validations?.faceCount) || 0);
  const payCount = Math.max(0, Number(validations?.payCount) || 0);
  const greatCount = Math.max(0, Number(validations?.greatCount) || 0);

  // Building (8pts) > Willingness to Pay (6pts) > Facing Problem (5pts) > Great Idea (2pts)
  const validationWeight =
    buildCount * 8 +
    payCount * 6 +
    faceCount * 5 +
    greatCount * 2;

  // 4. Community Engagement Velocity
  const commentsCount = Math.max(
    0,
    Number(problem.commentsCount) || (Array.isArray(problem.comments) ? problem.comments.length : 0)
  );
  const upvotes = Math.max(0, Number(problem.votes?.upvotes) || 0);
  const rawViews = Math.max(0, Number(problem.views) || 0);

  // Views are capped at 15 points to prevent raw click-counts from dominating real human validation
  const viewsBonus = Math.min(15, rawViews * 0.05);
  const engagementWeight = commentsCount * 3 + upvotes * 2 + viewsBonus;

  // 5. Credibility & Enterprise Backing
  let credibilityBonus = 0;
  if (problem.verified) {
    credibilityBonus += 10;
  }
  const hasCompany =
    (Array.isArray(problem.attachedCompanyNames) && problem.attachedCompanyNames.length > 0) ||
    (Array.isArray(problem.attachedCompanyIds) && problem.attachedCompanyIds.length > 0);
  if (hasCompany) {
    credibilityBonus += 5;
  }

  // 6. Recency / Discovery Boost (Half-life decaying bonus)
  let freshnessBonus = 0;
  const dateStr = problem.publishedAt || problem.createdAt || problem.submittedAt;
  if (dateStr) {
    const timestamp = new Date(dateStr).getTime();
    if (!isNaN(timestamp)) {
      const ageMs = Math.max(0, now - timestamp);
      const ageDays = ageMs / (1000 * 60 * 60 * 24);

      if (ageDays <= 7) {
        freshnessBonus = 15; // First week discovery surge
      } else if (ageDays <= 21) {
        freshnessBonus = 8; // 2-3 weeks active window
      } else if (ageDays <= 45) {
        freshnessBonus = 4; // Sustained fresh status
      }
    }
  }

  const total =
    painWeight +
    severityBonus +
    validationWeight +
    engagementWeight +
    credibilityBonus +
    freshnessBonus;

  return Math.round(total * 100) / 100;
}

/**
 * Normalizes industry strings for comparison and clustering detection
 */
function normalizeIndustry(industry?: string): string {
  if (!industry) return "other";
  return industry.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
}

/**
 * Soft Industry Anti-Clustering:
 * Re-arranges a sorted candidate array so that no more than `maxConsecutive` cards
 * from the exact same industry appear back-to-back in feed grids.
 * Preserves the overall ranking as closely as possible.
 */
export function applyIndustryDiversity(
  rankedProblems: ProblemDoc[],
  maxConsecutive: number = 2
): ProblemDoc[] {
  if (!Array.isArray(rankedProblems) || rankedProblems.length <= maxConsecutive) {
    return rankedProblems || [];
  }

  const result: ProblemDoc[] = [];
  const remaining = [...rankedProblems];

  let currentIndustry = "";
  let consecutiveCount = 0;

  while (remaining.length > 0) {
    let chosenIndex = 0;

    // Check if taking the top candidate exceeds consecutive threshold
    const candidateIndustry = normalizeIndustry(remaining[0].industry);

    if (consecutiveCount >= maxConsecutive && candidateIndustry === currentIndustry) {
      // Look ahead for the next best candidate from a DIFFERENT industry
      const altIndex = remaining.findIndex(
        (p) => normalizeIndustry(p.industry) !== currentIndustry
      );

      if (altIndex !== -1) {
        chosenIndex = altIndex;
      }
    }

    const [chosen] = remaining.splice(chosenIndex, 1);
    const chosenInd = normalizeIndustry(chosen.industry);

    if (chosenInd === currentIndustry) {
      consecutiveCount++;
    } else {
      currentIndustry = chosenInd;
      consecutiveCount = 1;
    }

    result.push(chosen);
  }

  return result;
}

export interface SortProblemsOptions {
  applyDiversity?: boolean;
  maxConsecutiveSameIndustry?: number;
  now?: number;
}

/**
 * Master sort function for Problem Statement feeds and grids.
 * Supports:
 *  - "Trending" (default): Multi-factor velocity ranking with soft anti-clustering
 *  - "Highest Pain": Pain score descending (with rankScore tie-breaker)
 *  - "Newest": Recency descending (with rankScore tie-breaker)
 */
export function sortProblems(
  problems: ProblemDoc[],
  sortBy: string = "Trending",
  options: SortProblemsOptions = {}
): ProblemDoc[] {
  if (!Array.isArray(problems) || problems.length === 0) {
    return [];
  }

  const now = options.now || Date.now();
  const applyDiversity = options.applyDiversity !== false;
  const maxConsecutive = options.maxConsecutiveSameIndustry ?? 2;

  // Precompute rank scores for efficient sorting
  const scoreMap = new Map<string, number>();
  for (const prob of problems) {
    scoreMap.set(prob.id, computeProblemRankScore(prob, now));
  }

  const sorted = [...problems];

  if (sortBy === "Highest Pain") {
    sorted.sort((a, b) => {
      const painA = typeof a.painScore === "number" ? a.painScore : 0;
      const painB = typeof b.painScore === "number" ? b.painScore : 0;
      if (painB !== painA) return painB - painA;
      return (scoreMap.get(b.id) || 0) - (scoreMap.get(a.id) || 0);
    });
    return sorted;
  }

  if (sortBy === "Newest") {
    sorted.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt || a.submittedAt || 0;
      const dateB = b.publishedAt || b.createdAt || b.submittedAt || 0;
      const timeA = dateA ? new Date(dateA).getTime() : 0;
      const timeB = dateB ? new Date(dateB).getTime() : 0;
      if (timeB !== timeA) return timeB - timeA;
      return (scoreMap.get(b.id) || 0) - (scoreMap.get(a.id) || 0);
    });
    return sorted;
  }

  // Default: Trending
  sorted.sort((a, b) => {
    const scoreA = scoreMap.get(a.id) || 0;
    const scoreB = scoreMap.get(b.id) || 0;
    return scoreB - scoreA;
  });

  if (applyDiversity) {
    return applyIndustryDiversity(sorted, maxConsecutive);
  }

  return sorted;
}
