/**
 * SEO URL Utilities for Semantic Slug Architectures
 * Formats:
 * - Problem: /problem/small-businesses-have-no-practical-way-to-map-their-personal-data-and-prepare-consent-notices-before-indias-may-2027-dpdp-deadline
 * - Startup Mode: /startup-mode/small-businesses-have-no-practical-way-to-map-their-personal-data-and-prepare-consent-notices-before-indias-may-2027-dpdp-deadline
 * - Industry: /industries/healthcare-biotech
 *
 * Duplicate disambiguation algorithm:
 * - 1st occurrence: /problem/problem-title-slug
 * - 2nd occurrence: /problem/problem-title-slug-a
 * - 3rd occurrence: /problem/problem-title-slug-b
 * - ...
 * - 27th occurrence: /problem/problem-title-slug-z
 * - 28th occurrence: /problem/problem-title-slug-aa
 * - 29th occurrence: /problem/problem-title-slug-ab
 * - ...
 * - 702nd occurrence: /problem/problem-title-slug-zz
 * - 703rd occurrence: /problem/problem-title-slug-aaa
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
 * Generates an alphabetical suffix for duplicate slugs:
 * 0 -> "a", 1 -> "b", ..., 25 -> "z", 26 -> "aa", 27 -> "ab", ..., 701 -> "zz", 702 -> "aaa"
 */
export function getDuplicateSuffix(index: number): string {
  if (index < 0) return "";
  let suffix = "";
  let n = index;
  while (n >= 0) {
    suffix = String.fromCharCode(97 + (n % 26)) + suffix;
    n = Math.floor(n / 26) - 1;
  }
  return suffix;
}

/**
 * Registry to track duplicate slugs deterministically in memory
 */
const slugRegistry = new Map<string, string[]>();

/**
 * Generates an SEO-optimized clean slug for a problem statement.
 * Strictly removes the old `--prob-...` suffix and keeps only the readable slug.
 * Supports duplicate disambiguation (`-a`, `-b`, ..., `-z`, `-aa`, ...).
 */
export function getProblemSlug(
  problem: { id?: string; title?: string; slug?: string } | string,
  maybeTitle?: string
): string {
  if (!problem) return "";

  let id = "";
  let title = "";
  let explicitSlug = "";

  if (typeof problem === "string") {
    id = problem;
    title = maybeTitle || "";
  } else {
    id = problem.id || "";
    title = problem.title || "";
    explicitSlug = problem.slug || "";
  }

  // 1. If an explicit slug is already stored on the document, clean and return it
  if (explicitSlug) {
    const clean = explicitSlug.includes("--") ? explicitSlug.split("--")[0] : explicitSlug;
    return slugify(clean);
  }

  // 2. Generate slug from clean title
  const cleanTitle = title || "";
  if (cleanTitle) {
    const baseSlug = slugify(cleanTitle);
    if (baseSlug) {
      if (!id) return baseSlug;

      // Handle duplicate titles across different problem IDs deterministically
      let ids = slugRegistry.get(baseSlug);
      if (!ids) {
        ids = [id];
        slugRegistry.set(baseSlug, ids);
      } else if (!ids.includes(id)) {
        ids.push(id);
      }

      const myIndex = ids.indexOf(id);
      if (myIndex <= 0) {
        return baseSlug;
      }
      return `${baseSlug}-${getDuplicateSuffix(myIndex - 1)}`;
    }
  }

  // 3. Fallback to ID or generic placeholder
  return id ? slugify(id) : "problem-statement";
}

/**
 * Builds a unique slug for a problem among a list of existing problems.
 * If another problem already claimed the base slug, appends -a, -b, ... -z, -aa, etc.
 */
export function buildUniqueSlug(
  title: string,
  problemId: string,
  existingList: Array<{ id: string; title?: string; slug?: string }> = []
): string {
  const baseSlug = slugify(title);
  if (!baseSlug) return problemId || "problem-statement";

  const matching = existingList.filter((p) => {
    if (p.id === problemId) return false;
    const pSlug = p.slug ? slugify(p.slug.split("--")[0]) : (p.title ? slugify(p.title) : "");
    return pSlug === baseSlug;
  });

  if (matching.length === 0) {
    return baseSlug;
  }

  const allProblems = [
    { id: problemId, title, slug: baseSlug },
    ...matching,
  ].sort((a, b) => (a.id || "").localeCompare(b.id || ""));

  const myIndex = allProblems.findIndex((p) => p.id === problemId);
  if (myIndex <= 0) {
    return baseSlug;
  }

  return `${baseSlug}-${getDuplicateSuffix(myIndex - 1)}`;
}

/**
 * Detects whether a string looks like an auto-generated UUID or long hash
 */
export function isUuidLike(text?: string): boolean {
  if (!text) return false;
  return /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}/i.test(text) || (text.length > 25 && text.includes("-"));
}

/**
 * Returns the full relative path for a problem detail page
 */
export function getProblemDetailUrl(
  problem: { id?: string; title?: string; slug?: string } | string,
  maybeTitle?: string
): string {
  if (!problem) return "/explore";
  return `/problem/${getProblemSlug(problem, maybeTitle)}`;
}

/**
 * Returns the full relative path for a startup mode workspace
 */
export function getStartupModeUrl(
  problem: { id?: string; title?: string; slug?: string } | string,
  maybeTitle?: string
): string {
  if (!problem) return "/explore";
  return `/startup-mode/${getProblemSlug(problem, maybeTitle)}`;
}

/**
 * Extracts the canonical problem ID or clean slug from a route parameter
 * Supports:
 * - Legacy Amazon-style slug: "small-businesses-...--prob-7-zou5" -> "prob-7-zou5"
 * - Direct ID: "prob-7-zou5" -> "prob-7-zou5"
 * - Clean semantic slug: "small-businesses-have-no-practical-way-..."
 */
export function extractProblemId(param: string | undefined): string {
  if (!param) return "";

  // 1. Legacy slug with explicit double dash separator "--<id>"
  if (param.includes("--")) {
    const parts = param.split("--");
    const lastPart = parts[parts.length - 1];
    if (lastPart) return decodeURIComponent(lastPart).trim();
  }

  // 2. If it contains "prob-" directly
  if (param.startsWith("prob-")) {
    return decodeURIComponent(param).trim();
  }
  const probIdx = param.lastIndexOf("-prob-");
  if (probIdx !== -1) {
    return decodeURIComponent(param.slice(probIdx + 1)).trim();
  }

  // 3. Clean slug format
  return decodeURIComponent(param).trim();
}
