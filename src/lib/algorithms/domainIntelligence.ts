import { IndustryDoc, ProblemDoc } from "@/types";
import { REAL_INDUSTRIES } from "@/data/realProductionData";

export interface DomainStats {
  problemCount: number;
  totalViews: number;
  totalUpvotes: number;
  totalValidations: number;
  avgPainScore: number;
  criticalCount: number;
  recentCount: number;
  popularScore: number;
  trendingScore: number;
}

export interface DomainIntelligenceResult {
  popularDomains: IndustryDoc[];
  trendingDomains: IndustryDoc[];
  allDomains: IndustryDoc[];
  domainStats: Record<string, DomainStats>;
}

export interface DomainAdminConfig {
  popularSlugs?: string[];
  trendingSlugs?: string[];
  hiddenSlugs?: string[];
  enableAlgoBlending?: boolean;
}

export const COMPOUND_INDUSTRY_SPLIT_MAP: Record<string, string[]> = {
  "healthcare-biotech": ["healthcare", "biotech"],
  "ai-machine-learning": ["ai", "machine-learning"],
  "cleantech-energy": ["cleantech", "clean-energy"],
  "fintech-defi": ["fintech", "defi"],
  "agritech-food": ["agriculture", "food-security"],
  "logistics-supply-chain": ["logistics", "supply-chain"],
  "cybersecurity-identity": ["cybersecurity"],
  "spacetech-aerospace": ["aerospace"],
  "defense-national-security": ["defense"],
  "technology": ["ai"],
  "energy": ["clean-energy"],
};

/**
 * Splits compound industry names into clean separate standalone names
 */
export function separateCompoundIndustry(input: string): string[] {
  if (!input) return ["General"];
  const lower = input.toLowerCase().trim();

  if (lower.includes("agritech") && lower.includes("food")) return ["Agriculture", "Food Security"];
  if (lower.includes("ai") && lower.includes("machine")) return ["AI", "Machine Learning"];
  if (lower.includes("clean") && lower.includes("energy")) return ["CleanTech", "Clean Energy"];
  if (lower.includes("fintech") && lower.includes("defi")) return ["FinTech", "DeFi"];
  if (lower.includes("health") && lower.includes("biotech")) return ["Healthcare", "Biotech"];
  if (lower.includes("logistics") && lower.includes("supply")) return ["Logistics", "Supply Chain"];

  if (input.includes("&")) {
    return input.split("&").map((s) => s.trim()).filter(Boolean);
  }

  return [input.trim()];
}

/**
 * Cleans any industry name to guarantee zero ampersands
 */
export function cleanIndustryName(input: string): string {
  if (!input) return "General";
  const separated = separateCompoundIndustry(input);
  return separated[0] || input.replace(/\s*&\s*/g, " ").trim();
}

/**
 * Eliminates compound '&' industry names and splits into clean standalone single industries.
 * Guarantees zero ampersands in any industry name or slug across the entire system.
 */
export function sanitizeAndSeparateIndustries(rawList: IndustryDoc[]): IndustryDoc[] {
  const map = new Map<string, IndustryDoc>();

  // If rawList is provided from Firebase/storage and has items, use rawList as source of truth!
  // Only fall back to REAL_INDUSTRIES if rawList is empty or uninitialized.
  const sourceList = Array.isArray(rawList) && rawList.length > 0
    ? rawList
    : REAL_INDUSTRIES;

  sourceList.forEach((raw) => {
    if (!raw || !raw.name) return;
    const rawSlug = (raw.slug || "").toLowerCase().trim();
    const rawName = (raw.name || "").trim();

    // Check if this matches a legacy compound slug with '&'
    const splitSlugs = COMPOUND_INDUSTRY_SPLIT_MAP[rawSlug];
    if (splitSlugs && splitSlugs.length > 0) {
      splitSlugs.forEach((targetSlug) => {
        if (map.has(targetSlug)) {
          const target = map.get(targetSlug)!;
          map.set(targetSlug, {
            ...target,
            problemCount: Math.max(target.problemCount || target.problemsCount || 0, raw.problemCount || raw.problemsCount || 0),
            totalBounties: raw.totalBounties || target.totalBounties,
            isPopular: raw.isPopular ?? target.isPopular,
            isTrending: raw.isTrending ?? target.isTrending,
            hidden: raw.hidden ?? target.hidden,
          });
        }
      });
      return;
    }

    // If it contains '&', split into separate components
    if (rawName.includes("&")) {
      const parts = separateCompoundIndustry(rawName);
      parts.forEach((part) => {
        const partSlug = part.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        // Check if map has matching entry
        let matchedKey = "";
        for (const [k, v] of map.entries()) {
          if (k === partSlug || v.name.toLowerCase() === part.toLowerCase()) {
            matchedKey = k;
            break;
          }
        }
        if (matchedKey) {
          const target = map.get(matchedKey)!;
          map.set(matchedKey, {
            ...target,
            problemCount: Math.max(target.problemCount || target.problemsCount || 0, raw.problemCount || raw.problemsCount || 0),
            isPopular: raw.isPopular ?? target.isPopular,
            isTrending: raw.isTrending ?? target.isTrending,
            hidden: raw.hidden ?? target.hidden,
          });
        } else {
          map.set(partSlug, {
            ...raw,
            id: `ind-${partSlug}`,
            name: part,
            slug: partSlug,
          });
        }
      });
      return;
    }

    // Standalone clean industry - preserve all fields directly from Firebase/Admin!
    const cleanSlug = rawSlug.replace(/[^a-z0-9]+/g, "-");
    const existing = map.get(cleanSlug);
    if (existing) {
      map.set(cleanSlug, {
        ...existing,
        ...raw,
        name: rawName, // Preserves admin-modified name!
        slug: cleanSlug,
      });
    } else {
      map.set(cleanSlug, {
        ...raw,
        name: rawName,
        slug: cleanSlug,
      });
    }
  });

  // Final safety check: never return any item with '&'
  return Array.from(map.values()).filter((ind) => !ind.name.includes("&"));
}

/**
 * Normalizes industry strings to canonical lower-cased form for robust comparison
 */
function normalizeName(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Computes deep intelligence metrics for industries based on real problem data,
 * combined with algorithmic ranking and admin overrides.
 */
export function computeDomainIntelligence(
  industries: IndustryDoc[],
  problems: ProblemDoc[],
  adminConfig?: DomainAdminConfig
): DomainIntelligenceResult {
  // Always sanitize and enforce separate standalone industries without '&'
  const cleanIndustries = sanitizeAndSeparateIndustries(industries);

  const visibleIndustries = cleanIndustries.filter(
    (i) => !i.hidden && !adminConfig?.hiddenSlugs?.includes(i.slug)
  );

  const statsMap: Record<string, DomainStats> = {};

  // Initialize stats for each visible industry
  visibleIndustries.forEach((ind) => {
    statsMap[ind.slug] = {
      problemCount: 0,
      totalViews: 0,
      totalUpvotes: 0,
      totalValidations: 0,
      avgPainScore: 0,
      criticalCount: 0,
      recentCount: 0,
      popularScore: 0,
      trendingScore: 0,
    };
  });

  const now = Date.now();
  const FORTY_FIVE_DAYS_MS = 45 * 24 * 60 * 60 * 1000;

  // Aggregate telemetry from problems
  problems.forEach((p) => {
    const pIndName = normalizeName(p.industry || "");
    if (!pIndName) return;

    // Find matching industry
    const matched = visibleIndustries.find((ind) => {
      const indNorm = normalizeName(ind.name);
      const slugNorm = normalizeName(ind.slug);
      return (
        pIndName === indNorm ||
        pIndName === slugNorm ||
        pIndName.includes(indNorm) ||
        indNorm.includes(pIndName)
      );
    });

    if (!matched) return;
    const stats = statsMap[matched.slug];
    if (!stats) return;

    stats.problemCount += 1;
    stats.totalViews += Number(p.views || 0);

    const upvotes =
      typeof p.votes === "object"
        ? Number(p.votes?.upvotes || 0)
        : Number(p.votes || 0);
    stats.totalUpvotes += upvotes;

    const validations =
      p.validations && typeof p.validations === "object"
        ? (p.validations.faceCount || 0) +
          (p.validations.greatCount || 0) +
          (p.validations.payCount || 0) +
          (p.validations.buildCount || 0)
        : 0;
    stats.totalValidations += validations;

    const pain = Number(p.painScore ?? p.aiScores?.painLevel ?? 75);
    stats.avgPainScore =
      (stats.avgPainScore * (stats.problemCount - 1) + pain) / stats.problemCount;

    if (p.severity === "critical") {
      stats.criticalCount += 1;
    }

    const pubDate = p.publishedAt ? new Date(p.publishedAt).getTime() : 0;
    if (pubDate && now - pubDate < FORTY_FIVE_DAYS_MS) {
      stats.recentCount += 1;
    }
  });

  // Calculate algorithmic scores with weighted multi-factor intelligence
  visibleIndustries.forEach((ind) => {
    const stats = statsMap[ind.slug];
    if (!stats) return;

    const fallbackProblemCount = Number(ind.problemCount || ind.problemsCount || 0);
    const effectiveProblemCount = Math.max(stats.problemCount, fallbackProblemCount > 0 ? 1 : 0);

    // ── Popular Score: Sustained Depth & TAM ──
    // Formula: Problem Volume (x25) + Validations (x4) + Views (x0.2) + High-Opportunity Weight
    let popularScore =
      effectiveProblemCount * 25 +
      stats.totalValidations * 4 +
      stats.totalViews * 0.2 +
      (stats.avgPainScore >= 80 ? 10 : 0);

    // ── Trending Score: Velocity & Momentum ──
    // Formula: Recent Problems (x30) + Upvotes (x5) + Views (x0.5) + Critical Severity (x15)
    let trendingScore =
      stats.recentCount * 30 +
      stats.totalUpvotes * 5 +
      stats.totalViews * 0.5 +
      stats.criticalCount * 15 +
      (stats.avgPainScore >= 88 ? 20 : 0);

    // Admin direct overrides
    if (ind.isPopular || adminConfig?.popularSlugs?.includes(ind.slug)) {
      popularScore += 1000;
    }
    if (ind.isTrending || adminConfig?.trendingSlugs?.includes(ind.slug)) {
      trendingScore += 1000;
    }

    stats.popularScore = popularScore;
    stats.trendingScore = trendingScore;
  });

  // Rank Popular: Top scoring
  const popularRanked = [...visibleIndustries].sort((a, b) => {
    const scoreA = statsMap[a.slug]?.popularScore ?? 0;
    const scoreB = statsMap[b.slug]?.popularScore ?? 0;
    return scoreB - scoreA;
  });

  // Rank Trending: Top scoring
  const trendingRanked = [...visibleIndustries].sort((a, b) => {
    const scoreA = statsMap[a.slug]?.trendingScore ?? 0;
    const scoreB = statsMap[b.slug]?.trendingScore ?? 0;
    return scoreB - scoreA;
  });

  // All Domains: sorted alphabetically
  const allAlphabetical = [...visibleIndustries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return {
    popularDomains: popularRanked.slice(0, 8),
    trendingDomains: trendingRanked.slice(0, 8),
    allDomains: allAlphabetical,
    domainStats: statsMap,
  };
}
