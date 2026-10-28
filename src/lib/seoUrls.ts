/**
 * SEO URL Utilities for Amazon / Product Hunt-grade Semantic Slug Architectures
 * Formats:
 * - Problem: /problem/data-interoperability-failure-in-rural-clinics--prob-1
 * - Startup Mode: /startup-mode/data-interoperability-failure-in-rural-clinics--prob-1
 * - Industry: /industries/healthcare-biotech
 */

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove all non-word chars except spaces and dashes
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a single dash
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

/**
 * Detects whether a string looks like an auto-generated UUID or long hash
 * (e.g. "834e1337-f231-4f5e-a819-bdf862824c2d" or "prob-834e1337-f231-4f5e-a819-bdf862824c2d")
 */
export function isUuidLike(text?: string): boolean {
  if (!text) return false;
  return /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}/i.test(text) || (text.length > 25 && text.includes("-"));
}

/**
 * Generates an SEO-optimized slugged URL for a problem statement.
 * Uses Amazon/Product Hunt standard semantic format: /problem/<keywords-slug>--<id>
 * If only ID or only slug is present, gracefully falls back.
 */
export function getProblemSlug(problem: { id: string; title?: string }): string {
  if (!problem) return "";
  const cleanSlug = problem.title ? slugify(problem.title) : "";

  if (cleanSlug && problem.id) {
    return `${cleanSlug}--${problem.id}`;
  }
  return cleanSlug || problem.id || "problem-statement";
}

/**
 * Returns the full relative path for a problem detail page
 */
export function getProblemDetailUrl(problem: { id: string; title?: string }): string {
  if (!problem) return "/explore";
  return `/problem/${getProblemSlug(problem)}`;
}

/**
 * Returns the full relative path for a startup mode workspace
 */
export function getStartupModeUrl(problem: { id: string; title?: string }): string {
  if (!problem) return "/explore";
  return `/startup-mode/${getProblemSlug(problem)}`;
}

/**
 * Extracts the canonical problem ID from a route parameter
 * Supports:
 * - "data-interoperability-failure-in-rural-clinics--prob-1" -> "prob-1"
 * - "prob-1" -> "prob-1"
 * - "some-slug-12345" -> "12345"
 */
export function extractProblemId(param: string | undefined): string {
  if (!param) return "";
  
  // 1. If it contains the explicit double dash separator "--" (Standard Amazon-style slug)
  if (param.includes("--")) {
    const parts = param.split("--");
    const lastPart = parts[parts.length - 1];
    if (lastPart) return decodeURIComponent(lastPart);
  }

  // 2. If it contains "-prob-"
  const probIdx = param.lastIndexOf("prob-");
  if (probIdx !== -1) {
    return param.slice(probIdx);
  }

  // 3. Raw ID format
  return decodeURIComponent(param);
}
