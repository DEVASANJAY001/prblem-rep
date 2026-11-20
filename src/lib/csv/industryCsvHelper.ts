/**
 * Industry CSV / Excel Helper for Bulk Import, Export & Smart Deduplication
 * Supports RFC 4180 CSV, Excel CSV (with BOM), Tab-separated TSV (direct Excel copy-paste),
 * and automatic duplicate detection and attribute merging.
 */

import { IndustryDoc } from "@/types";

export interface ParsedIndustryRow {
  _rawRowIndex: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  subcategories: string[];
  marketSize: string;
  weeklyTrend: string;
  opportunityCount: number;
  trendingCount: number;
  avgPainScore: number;
  problemCount: number;
  isPopular: boolean;
  isTrending: boolean;
  hidden: boolean;
  // Duplicate / Merge intelligence
  isDuplicate: boolean;
  matchedExisting?: IndustryDoc;
  finalIndustryDoc: IndustryDoc;
  action: "create" | "merge";
}

export interface IndustryCsvParseResult {
  rows: ParsedIndustryRow[];
  errors: Array<{ row: number; field: string; message: string }>;
  totalRows: number;
  newCount: number;
  mergeCount: number;
  headersDetected: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Delimiter Auto-Detection & RFC-4180 Parsing
// ─────────────────────────────────────────────────────────────────────────────

function detectDelimiter(firstLine: string): string {
  const tabs = (firstLine.match(/\t/g) || []).length;
  const semicolons = (firstLine.match(/;/g) || []).length;
  const commas = (firstLine.match(/,/g) || []).length;

  if (tabs > commas && tabs > semicolons) return "\t";
  if (semicolons > commas) return ";";
  return ",";
}

export function parseCsvRows(text: string): { rows: string[][]; delimiter: string } {
  // Strip UTF-8 BOM if present
  let cleanText = text.replace(/^\uFEFF/, "").trim();
  if (!cleanText) return { rows: [], delimiter: "," };

  const firstLine = cleanText.split(/\r?\n/)[0] || "";
  const delimiter = detectDelimiter(firstLine);

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;
  let i = 0;
  const len = cleanText.length;

  while (i < len) {
    const char = cleanText[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < len && cleanText[i + 1] === '"') {
          currentField += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        currentField += char;
        i++;
        continue;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        i++;
        continue;
      } else if (char === delimiter) {
        currentRow.push(currentField);
        currentField = "";
        i++;
        continue;
      } else if (char === "\r") {
        if (i + 1 < len && cleanText[i + 1] === "\n") {
          i++;
        }
        currentRow.push(currentField);
        currentField = "";
        rows.push(currentRow);
        currentRow = [];
        i++;
        continue;
      } else if (char === "\n") {
        currentRow.push(currentField);
        currentField = "";
        rows.push(currentRow);
        currentRow = [];
        i++;
        continue;
      } else {
        currentField += char;
        i++;
        continue;
      }
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return { rows, delimiter };
}

// ─────────────────────────────────────────────────────────────────────────────
// Column Header Mapping
// ─────────────────────────────────────────────────────────────────────────────

const COLUMN_ALIASES: Record<string, string[]> = {
  name: ["name", "industry", "industry name", "title", "sector"],
  slug: ["slug", "id", "identifier", "industry slug", "code"],
  icon: ["icon", "lucide icon", "icon name", "symbol"],
  description: ["description", "desc", "overview", "summary", "about", "scope"],
  color: ["color", "hex", "hex color", "theme color", "accent color"],
  subcategories: ["subcategories", "sub categories", "sub-categories", "subcats", "tags", "niches", "domains"],
  marketSize: ["market size", "marketsize", "tam", "market_size", "market valuation"],
  weeklyTrend: ["weekly trend", "weeklytrend", "trend", "growth", "velocity"],
  opportunityCount: ["opportunity count", "opportunitycount", "opportunities", "opps"],
  trendingCount: ["trending count", "trendingcount", "trending opportunities", "trending"],
  avgPainScore: ["avg pain score", "avgpainscore", "pain score", "painscore", "score"],
  isPopular: ["popular", "ispopular", "is popular", "top priority"],
  isTrending: ["trending", "istrending", "is trending", "high velocity"],
  hidden: ["hidden", "ishidden", "is hidden", "status", "visibility"],
  problemCount: ["problem count", "problemcount", "problems", "dossiers"],
};

function normalizeHeader(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/[_\s-]+/g, " ");
}

function mapHeaders(headerRow: string[]): Record<string, number> {
  const indexMap: Record<string, number> = {};

  headerRow.forEach((col, idx) => {
    const norm = normalizeHeader(col);
    for (const [key, aliases] of Object.entries(COLUMN_ALIASES)) {
      if (aliases.some((alias) => alias === norm || norm.includes(alias))) {
        if (indexMap[key] === undefined) {
          indexMap[key] = idx;
        }
      }
    }
  });

  return indexMap;
}

function parseBoolean(val: string | undefined, defaultVal = false): boolean {
  if (!val) return defaultVal;
  const lower = val.trim().toLowerCase();
  if (["true", "yes", "1", "y", "active", "enabled"].includes(lower)) return true;
  if (["false", "no", "0", "n", "hidden", "inactive", "disabled"].includes(lower)) return false;
  return defaultVal;
}

function parseNumber(val: string | undefined, defaultVal = 0): number {
  if (!val) return defaultVal;
  const num = Number(val.replace(/[^0-9.-]/g, ""));
  return isNaN(num) ? defaultVal : num;
}

// ─────────────────────────────────────────────────────────────────────────────
// Matching & Merging Logic
// ─────────────────────────────────────────────────────────────────────────────

export function slugifyIndustry(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Finds matching existing industry by slug, ID, or case-insensitive name
 */
export function findExistingIndustryMatch(
  name: string,
  slug: string,
  existingList: IndustryDoc[]
): IndustryDoc | undefined {
  const normName = name.trim().toLowerCase();
  const normSlug = slug.trim().toLowerCase();
  const fallbackSlug = slugifyIndustry(name);

  return existingList.find((ex) => {
    const exSlug = (ex.slug || "").trim().toLowerCase();
    const exId = (ex.id || "").trim().toLowerCase();
    const exName = (ex.name || "").trim().toLowerCase();

    // Match exact slug or ind-{slug}
    if (normSlug && (exSlug === normSlug || exId === `ind-${normSlug}` || exId === normSlug)) {
      return true;
    }
    // Match generated fallback slug
    if (fallbackSlug && (exSlug === fallbackSlug || exId === `ind-${fallbackSlug}`)) {
      return true;
    }
    // Match name directly
    if (exName === normName) {
      return true;
    }
    // Match without 'and' or '&'
    const cleanEx = exName.replace(/\band\b|&/g, "").replace(/\s+/g, " ").trim();
    const cleanIn = normName.replace(/\band\b|&/g, "").replace(/\s+/g, " ").trim();
    if (cleanEx === cleanIn && cleanEx.length > 2) {
      return true;
    }

    return false;
  });
}

/**
 * Merges duplicate industry attributes without losing existing data or counts
 */
export function mergeDuplicateIndustry(
  existing: IndustryDoc,
  incoming: {
    name: string;
    icon?: string;
    description?: string;
    color?: string;
    subcategories?: string[];
    marketSize?: string;
    weeklyTrend?: string;
    opportunityCount?: number;
    trendingCount?: number;
    avgPainScore?: number;
    problemCount?: number;
    isPopular?: boolean;
    isTrending?: boolean;
    hidden?: boolean;
  }
): IndustryDoc {
  // Merge subcategories uniquely preserving existing counts
  const existingSubMap = new Map<string, number>();
  (existing.subcategories || []).forEach((s) => {
    if (s && s.name) {
      existingSubMap.set(s.name.trim().toLowerCase(), s.count);
    }
  });

  const incomingSubList = incoming.subcategories || [];
  incomingSubList.forEach((subName) => {
    const key = subName.trim().toLowerCase();
    if (!existingSubMap.has(key)) {
      existingSubMap.set(key, Math.floor(Math.random() * 1200) + 400);
    }
  });

  const mergedSubcategories: Array<{ name: string; count: number }> = [];
  const added = new Set<string>();

  // Keep existing items first
  (existing.subcategories || []).forEach((s) => {
    if (s && s.name) {
      mergedSubcategories.push(s);
      added.add(s.name.trim().toLowerCase());
    }
  });

  // Append new subcategories from CSV
  incomingSubList.forEach((subName) => {
    const key = subName.trim().toLowerCase();
    if (!added.has(key)) {
      mergedSubcategories.push({
        name: subName.trim(),
        count: existingSubMap.get(key) || 500,
      });
      added.add(key);
    }
  });

  return {
    ...existing,
    name: incoming.name || existing.name,
    slug: existing.slug,
    id: existing.id || `ind-${existing.slug}`,
    icon: incoming.icon || existing.icon || "Activity",
    description: incoming.description || existing.description || "",
    color: incoming.color || existing.color || "#1657FF",
    marketSize: incoming.marketSize || existing.marketSize || "₹18.6 Cr",
    weeklyTrend: incoming.weeklyTrend || existing.weeklyTrend || "↑ 24%",
    opportunityCount:
      incoming.opportunityCount !== undefined && incoming.opportunityCount > 0
        ? incoming.opportunityCount
        : existing.opportunityCount || 2340,
    trendingCount:
      incoming.trendingCount !== undefined && incoming.trendingCount > 0
        ? incoming.trendingCount
        : existing.trendingCount || 92,
    avgPainScore:
      incoming.avgPainScore !== undefined && incoming.avgPainScore > 0
        ? incoming.avgPainScore
        : existing.avgPainScore || 90,
    problemCount:
      incoming.problemCount !== undefined && incoming.problemCount > 0
        ? incoming.problemCount
        : existing.problemCount || existing.problemsCount || 0,
    subcategories: mergedSubcategories.length > 0 ? mergedSubcategories : existing.subcategories,
    isPopular: incoming.isPopular !== undefined ? incoming.isPopular : Boolean(existing.isPopular),
    isTrending: incoming.isTrending !== undefined ? incoming.isTrending : Boolean(existing.isTrending),
    hidden: incoming.hidden !== undefined ? incoming.hidden : Boolean(existing.hidden),
    order: existing.order,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main CSV Parse Function
// ─────────────────────────────────────────────────────────────────────────────

export function parseIndustryCsv(
  csvText: string,
  existingIndustries: IndustryDoc[]
): IndustryCsvParseResult {
  const { rows } = parseCsvRows(csvText);

  if (rows.length < 2) {
    return {
      rows: [],
      errors: [{ row: 1, field: "general", message: "CSV file is empty or missing data rows." }],
      totalRows: 0,
      newCount: 0,
      mergeCount: 0,
      headersDetected: [],
    };
  }

  const headerRow = rows[0];
  const colMap = mapHeaders(headerRow);

  if (colMap.name === undefined) {
    return {
      rows: [],
      errors: [
        {
          row: 1,
          field: "name",
          message: 'Missing required "Name" or "Industry" column header.',
        },
      ],
      totalRows: rows.length - 1,
      newCount: 0,
      mergeCount: 0,
      headersDetected: headerRow,
    };
  }

  const parsedList: ParsedIndustryRow[] = [];
  const errors: Array<{ row: number; field: string; message: string }> = [];

  // Track dynamic accumulation list so intra-CSV duplicate rows also merge properly!
  const workingPool = [...existingIndustries];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    // Skip empty lines
    if (!row || row.every((c) => !c.trim())) continue;

    const rawName = (row[colMap.name] || "").trim();
    if (!rawName) {
      errors.push({ row: r + 1, field: "name", message: "Row is missing an industry name." });
      continue;
    }

    const rawSlug = colMap.slug !== undefined ? (row[colMap.slug] || "").trim() : "";
    const slug = rawSlug ? slugifyIndustry(rawSlug) : slugifyIndustry(rawName);

    const icon = colMap.icon !== undefined ? (row[colMap.icon] || "").trim() : "";
    const description = colMap.description !== undefined ? (row[colMap.description] || "").trim() : "";
    const color = colMap.color !== undefined ? (row[colMap.color] || "").trim() : "";

    const rawSubcats = colMap.subcategories !== undefined ? row[colMap.subcategories] : "";
    const subcategories = rawSubcats
      ? rawSubcats
          .split(/[,;|]/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const marketSize = colMap.marketSize !== undefined ? (row[colMap.marketSize] || "").trim() : "";
    const weeklyTrend = colMap.weeklyTrend !== undefined ? (row[colMap.weeklyTrend] || "").trim() : "";
    const opportunityCount = colMap.opportunityCount !== undefined ? parseNumber(row[colMap.opportunityCount]) : 0;
    const trendingCount = colMap.trendingCount !== undefined ? parseNumber(row[colMap.trendingCount]) : 0;
    const avgPainScore = colMap.avgPainScore !== undefined ? parseNumber(row[colMap.avgPainScore]) : 0;
    const problemCount = colMap.problemCount !== undefined ? parseNumber(row[colMap.problemCount]) : 0;

    const isPopular = colMap.isPopular !== undefined ? parseBoolean(row[colMap.isPopular]) : false;
    const isTrending = colMap.isTrending !== undefined ? parseBoolean(row[colMap.isTrending]) : false;
    const hidden = colMap.hidden !== undefined ? parseBoolean(row[colMap.hidden]) : false;

    // Check duplicate against working pool
    const match = findExistingIndustryMatch(rawName, slug, workingPool);

    if (match) {
      // Merge into existing
      const merged = mergeDuplicateIndustry(match, {
        name: rawName,
        icon,
        description,
        color,
        subcategories,
        marketSize,
        weeklyTrend,
        opportunityCount,
        trendingCount,
        avgPainScore,
        problemCount,
        isPopular: colMap.isPopular !== undefined ? isPopular : undefined,
        isTrending: colMap.isTrending !== undefined ? isTrending : undefined,
        hidden: colMap.hidden !== undefined ? hidden : undefined,
      });

      // Update working pool in place
      const idx = workingPool.findIndex((w) => w.slug === match.slug);
      if (idx >= 0) workingPool[idx] = merged;

      parsedList.push({
        _rawRowIndex: r + 1,
        name: rawName,
        slug: match.slug,
        icon: merged.icon,
        description: merged.description,
        color: merged.color || "#1657FF",
        subcategories: merged.subcategories?.map((s) => s.name) || subcategories,
        marketSize: merged.marketSize || "₹18.6 Cr",
        weeklyTrend: merged.weeklyTrend || "↑ 24%",
        opportunityCount: merged.opportunityCount || 2340,
        trendingCount: merged.trendingCount || 92,
        avgPainScore: merged.avgPainScore || 90,
        problemCount: merged.problemCount || 0,
        isPopular: Boolean(merged.isPopular),
        isTrending: Boolean(merged.isTrending),
        hidden: Boolean(merged.hidden),
        isDuplicate: true,
        matchedExisting: match,
        finalIndustryDoc: merged,
        action: "merge",
      });
    } else {
      // Brand new industry
      const newSubcats = subcategories.map((s) => ({
        name: s,
        count: Math.floor(Math.random() * 1500) + 400,
      }));

      const newDoc: IndustryDoc = {
        id: `ind-${slug}`,
        slug,
        name: rawName,
        icon: icon || "Activity",
        description:
          description || `${rawName} engineering, operational friction, and high-impact innovation spaces.`,
        color: color || "#1657FF",
        marketSize: marketSize || "₹18.6 Cr",
        weeklyTrend: weeklyTrend || "↑ 20%",
        opportunityCount: opportunityCount || 1850,
        trendingCount: trendingCount || 64,
        avgPainScore: avgPainScore || 88,
        problemCount: problemCount || 0,
        subcategories:
          newSubcats.length > 0
            ? newSubcats
            : [
                { name: "General Operations", count: 850 },
                { name: "Automation & Tools", count: 620 },
              ],
        isPopular,
        isTrending,
        hidden,
        order: workingPool.length + 1,
      };

      workingPool.push(newDoc);

      parsedList.push({
        _rawRowIndex: r + 1,
        name: rawName,
        slug,
        icon: newDoc.icon,
        description: newDoc.description,
        color: newDoc.color || "#1657FF",
        subcategories: newDoc.subcategories?.map((s) => s.name) || subcategories,
        marketSize: newDoc.marketSize || "₹18.6 Cr",
        weeklyTrend: newDoc.weeklyTrend || "↑ 20%",
        opportunityCount: newDoc.opportunityCount || 1850,
        trendingCount: newDoc.trendingCount || 64,
        avgPainScore: newDoc.avgPainScore || 88,
        problemCount: newDoc.problemCount || 0,
        isPopular,
        isTrending,
        hidden,
        isDuplicate: false,
        finalIndustryDoc: newDoc,
        action: "create",
      });
    }
  }

  const newCount = parsedList.filter((p) => p.action === "create").length;
  const mergeCount = parsedList.filter((p) => p.action === "merge").length;

  return {
    rows: parsedList,
    errors,
    totalRows: parsedList.length,
    newCount,
    mergeCount,
    headersDetected: headerRow,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Sample Template & Export Generators
// ─────────────────────────────────────────────────────────────────────────────

export function generateSampleIndustryCsv(): string {
  const headers = [
    "Name",
    "Slug",
    "Icon",
    "Description",
    "Color",
    "Subcategories",
    "Market Size",
    "Weekly Trend",
    "Opportunity Count",
    "Trending Count",
    "Avg Pain Score",
    "Popular",
    "Trending",
    "Hidden",
  ];

  const samples = [
    [
      "Healthcare",
      "healthcare",
      "Heart",
      "Clinical workflows, hospital operations, patient safety, and medical diagnostics.",
      "#10B981",
      "Patient Care; Hospitals & Clinics; Medical Devices; HealthTech; Pharma & Biotech; Mental Health",
      "₹18.6 Cr",
      "↑ 24%",
      "2340",
      "92",
      "91",
      "true",
      "false",
      "false",
    ],
    [
      "FinTech",
      "fintech",
      "Scale",
      "Banking infrastructure, cross-border remittances, corporate treasury, and wealthtech.",
      "#1657FF",
      "Cross-Border Remittance; Treasury Flows; Micro-Investing; Credit Scoring; Regulatory Tech",
      "₹24.5 Cr",
      "↑ 31%",
      "3120",
      "118",
      "89",
      "true",
      "true",
      "false",
    ],
    [
      "CleanTech",
      "cleantech",
      "Leaf",
      "Renewable grid transmission, regenerative agriculture, battery telemetry, and carbon MRV.",
      "#059669",
      "Grid Transmission; Soil Sensing; Battery Chemistries; Carbon Accounting; Solar Inverters",
      "₹12.2 Cr",
      "↑ 19%",
      "1650",
      "48",
      "86",
      "false",
      "true",
      "false",
    ],
    [
      "Artificial Intelligence",
      "ai",
      "Bot",
      "Model evaluation, inference latency, agent orchestration, and alignment benchmarks.",
      "#8B5CF6",
      "Agent Tool Use; Inference Routing; Context Optimization; Evaluation Benchmarks",
      "₹35.0 Cr",
      "↑ 45%",
      "4200",
      "185",
      "94",
      "true",
      "true",
      "false",
    ],
    [
      "Supply Chain & Logistics",
      "supply-chain",
      "Car",
      "Freight visibility, cold-chain monitoring, drayage dispatch, and customs automation.",
      "#F59E0B",
      "Cold-Chain Telemetry; Freight Brokerage; Drayage Automation; Customs Verification",
      "₹16.8 Cr",
      "↑ 15%",
      "1980",
      "55",
      "87",
      "false",
      "false",
      "false",
    ],
  ];

  const escapeCsv = (str: string) => `"${str.replace(/"/g, '""')}"`;
  const lines = [
    headers.map(escapeCsv).join(","),
    ...samples.map((row) => row.map(escapeCsv).join(",")),
  ];

  return lines.join("\r\n");
}

export function exportIndustriesToCsv(industries: IndustryDoc[]): string {
  const headers = [
    "Name",
    "Slug",
    "Icon",
    "Description",
    "Color",
    "Subcategories",
    "Market Size",
    "Weekly Trend",
    "Opportunity Count",
    "Trending Count",
    "Avg Pain Score",
    "Popular",
    "Trending",
    "Hidden",
  ];

  const escapeCsv = (val: any) => {
    const s = String(val ?? "").replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = industries.map((ind) => [
    ind.name || "",
    ind.slug || "",
    ind.icon || "Activity",
    ind.description || "",
    ind.color || "#1657FF",
    ind.subcategories?.map((s) => s.name).join("; ") || "",
    ind.marketSize || "₹18.6 Cr",
    ind.weeklyTrend || "↑ 20%",
    ind.opportunityCount || 0,
    ind.trendingCount || 0,
    ind.avgPainScore || 0,
    Boolean(ind.isPopular),
    Boolean(ind.isTrending),
    Boolean(ind.hidden),
  ]);

  const lines = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ];

  return lines.join("\r\n");
}

export function downloadCsvFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
