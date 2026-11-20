/**
 * Company CSV / Excel Helper for Bulk Import, Export & Intelligent Deduplication
 * Supports RFC 4180 CSV, Excel CSV (with BOM), Tab-separated TSV (direct Excel copy-paste),
 * and automatic duplicate detection (by Name, Domain, or ID) and attribute merging.
 */

import { CompanyDoc } from "@/types";
import { resolveCompanyLogo } from "@/components/ui/CompanyLogo";

export interface ParsedCompanyRow {
  _rawRowIndex: number;
  name: string;
  website: string;
  logoUrl: string;
  industry: string;
  description: string;
  verified: boolean;
  problemBountiesCount: number;
  totalRewardsAwarded: number;
  hidden: boolean;
  // Duplicate & Merge Intelligence
  isDuplicate: boolean;
  matchedExisting?: CompanyDoc;
  finalCompanyDoc: CompanyDoc;
  action: "create" | "merge";
}

export interface CompanyCsvParseResult {
  rows: ParsedCompanyRow[];
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
  name: ["name", "company", "company name", "enterprise", "partner", "title"],
  website: ["website", "url", "company website", "domain", "link", "web"],
  logoUrl: ["logo", "logourl", "logo url", "square logo", "image", "icon", "avatar"],
  industry: ["industry", "sector", "domain", "category", "tag"],
  description: ["description", "about", "overview", "summary", "bio", "details"],
  verified: ["verified", "isverified", "is verified", "badge", "verified badge"],
  problemBountiesCount: ["problembountiescount", "bounties", "problem bounties", "bounties count", "challenges"],
  totalRewardsAwarded: ["totalrewardsawarded", "rewards", "total rewards", "rewards awarded", "prize pool", "funding"],
  hidden: ["hidden", "ishidden", "is hidden", "status", "visibility"],
  id: ["id", "company id", "comp id", "identifier"],
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
  if (["true", "yes", "1", "y", "verified", "active", "enabled"].includes(lower)) return true;
  if (["false", "no", "0", "n", "unverified", "hidden", "inactive", "disabled"].includes(lower)) return false;
  return defaultVal;
}

function parseNumber(val: string | undefined, defaultVal = 0): number {
  if (!val) return defaultVal;
  const num = Number(val.replace(/[^0-9.-]/g, ""));
  return isNaN(num) ? defaultVal : num;
}

export function extractCleanDomain(urlOrDomain: string): string {
  if (!urlOrDomain) return "";
  let clean = urlOrDomain.trim().toLowerCase();
  clean = clean.replace(/^https?:\/\//, "");
  clean = clean.replace(/^www\./, "");
  clean = clean.split("/")[0].split("?")[0].split("#")[0];
  return clean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Matching & Merging Logic
// ─────────────────────────────────────────────────────────────────────────────

export function findMatchingCompany(
  incoming: { name: string; website?: string; id?: string },
  existingList: CompanyDoc[]
): CompanyDoc | undefined {
  const normName = incoming.name.trim().toLowerCase();
  const incomingDomain = extractCleanDomain(incoming.website || "");

  return existingList.find((ex) => {
    // 1. Match by ID if provided
    if (incoming.id && ex.id.toLowerCase() === incoming.id.trim().toLowerCase()) {
      return true;
    }

    // 2. Match by exact normalized name
    const exName = ex.name.trim().toLowerCase();
    if (exName === normName) {
      return true;
    }

    // 3. Match by domain if valid
    const exDomain = extractCleanDomain(ex.website || "");
    if (
      incomingDomain &&
      exDomain &&
      incomingDomain === exDomain &&
      !["example.com", "localhost", "test.com"].includes(incomingDomain)
    ) {
      return true;
    }

    // 4. Match stripped names (e.g. "Google LLC" vs "Google", "Nvidia Corp" vs "Nvidia")
    const stripSuffix = (s: string) =>
      s
        .replace(/\b(inc|llc|corp|corporation|ltd|limited|technologies|tech|solutions|health|ai)\b\.?/gi, "")
        .replace(/[^a-z0-9]/g, "")
        .trim();
    const strippedEx = stripSuffix(exName);
    const strippedIn = stripSuffix(normName);
    if (strippedEx && strippedIn && strippedEx === strippedIn && strippedEx.length >= 3) {
      return true;
    }

    return false;
  });
}

export function mergeDuplicateCompany(
  existing: CompanyDoc,
  incoming: {
    name?: string;
    website?: string;
    logoUrl?: string;
    industry?: string;
    description?: string;
    verified?: boolean;
    problemBountiesCount?: number;
    totalRewardsAwarded?: number;
    hidden?: boolean;
  }
): CompanyDoc {
  const finalName = incoming.name?.trim() || existing.name;
  const finalWebsite = incoming.website?.trim() || existing.website;
  const rawLogo = incoming.logoUrl?.trim() || existing.logoUrl;
  const finalLogo = resolveCompanyLogo(rawLogo, finalName, finalWebsite);

  return {
    ...existing,
    name: finalName,
    website: finalWebsite,
    logoUrl: finalLogo,
    industry: incoming.industry?.trim() || existing.industry || "General Industry",
    description: incoming.description?.trim() || existing.description || "",
    verified: incoming.verified !== undefined ? incoming.verified : Boolean(existing.verified),
    problemBountiesCount:
      incoming.problemBountiesCount !== undefined && incoming.problemBountiesCount >= 0
        ? incoming.problemBountiesCount
        : existing.problemBountiesCount || 0,
    totalRewardsAwarded:
      incoming.totalRewardsAwarded !== undefined && incoming.totalRewardsAwarded >= 0
        ? incoming.totalRewardsAwarded
        : existing.totalRewardsAwarded || 0,
    hidden: incoming.hidden !== undefined ? incoming.hidden : Boolean(existing.hidden),
    updatedAt: new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main CSV Parse Function
// ─────────────────────────────────────────────────────────────────────────────

export function parseCompanyCsv(
  csvText: string,
  existingCompanies: CompanyDoc[]
): CompanyCsvParseResult {
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
          message: 'Missing required "Company Name" or "Company" column header.',
        },
      ],
      totalRows: rows.length - 1,
      newCount: 0,
      mergeCount: 0,
      headersDetected: headerRow,
    };
  }

  const parsedList: ParsedCompanyRow[] = [];
  const errors: Array<{ row: number; field: string; message: string }> = [];

  // Track dynamic accumulation list so intra-file duplicate rows also merge properly!
  const workingPool = [...existingCompanies];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.every((c) => !c.trim())) continue;

    const rawName = (row[colMap.name] || "").trim();
    if (!rawName) {
      errors.push({ row: r + 1, field: "name", message: "Row is missing a company name." });
      continue;
    }

    const rawWebsite = colMap.website !== undefined ? (row[colMap.website] || "").trim() : "";
    const website = rawWebsite
      ? rawWebsite.startsWith("http")
        ? rawWebsite
        : `https://${rawWebsite}`
      : `https://www.${rawName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;

    const rawLogo = colMap.logoUrl !== undefined ? (row[colMap.logoUrl] || "").trim() : "";
    const logoUrl = resolveCompanyLogo(rawLogo, rawName, website);

    const industry = colMap.industry !== undefined ? (row[colMap.industry] || "").trim() : "General Industry";
    const description =
      colMap.description !== undefined
        ? (row[colMap.description] || "").trim()
        : `${rawName} enterprise solver and ecosystem venture partner.`;

    const verified = colMap.verified !== undefined ? parseBoolean(row[colMap.verified], true) : true;
    const problemBountiesCount =
      colMap.problemBountiesCount !== undefined ? parseNumber(row[colMap.problemBountiesCount], 0) : 0;
    const totalRewardsAwarded =
      colMap.totalRewardsAwarded !== undefined ? parseNumber(row[colMap.totalRewardsAwarded], 0) : 0;
    const hidden = colMap.hidden !== undefined ? parseBoolean(row[colMap.hidden], false) : false;
    const rawId = colMap.id !== undefined ? (row[colMap.id] || "").trim() : "";

    // Match against working pool
    const match = findMatchingCompany({ name: rawName, website, id: rawId }, workingPool);

    if (match) {
      // Merge duplicate
      const merged = mergeDuplicateCompany(match, {
        name: rawName,
        website,
        logoUrl: rawLogo ? logoUrl : undefined,
        industry: industry || undefined,
        description: description || undefined,
        verified: colMap.verified !== undefined ? verified : undefined,
        problemBountiesCount: colMap.problemBountiesCount !== undefined ? problemBountiesCount : undefined,
        totalRewardsAwarded: colMap.totalRewardsAwarded !== undefined ? totalRewardsAwarded : undefined,
        hidden: colMap.hidden !== undefined ? hidden : undefined,
      });

      // Update pool
      const idx = workingPool.findIndex((w) => w.id === match.id);
      if (idx >= 0) workingPool[idx] = merged;

      parsedList.push({
        _rawRowIndex: r + 1,
        name: merged.name,
        website: merged.website,
        logoUrl: merged.logoUrl,
        industry: merged.industry,
        description: merged.description,
        verified: merged.verified,
        problemBountiesCount: merged.problemBountiesCount,
        totalRewardsAwarded: merged.totalRewardsAwarded,
        hidden: Boolean(merged.hidden),
        isDuplicate: true,
        matchedExisting: match,
        finalCompanyDoc: merged,
        action: "merge",
      });
    } else {
      // Brand new company
      const newId = rawId || `comp-${rawName.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 16) || Date.now()}`;
      const now = new Date().toISOString();

      const newDoc: CompanyDoc = {
        id: newId,
        name: rawName,
        website,
        logoUrl,
        industry: industry || "General Industry",
        description,
        verified,
        problemBountiesCount,
        totalRewardsAwarded,
        hidden,
        createdAt: now,
        updatedAt: now,
      };

      workingPool.push(newDoc);

      parsedList.push({
        _rawRowIndex: r + 1,
        name: rawName,
        website,
        logoUrl,
        industry: newDoc.industry,
        description,
        verified,
        problemBountiesCount,
        totalRewardsAwarded,
        hidden,
        isDuplicate: false,
        finalCompanyDoc: newDoc,
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

export function generateSampleCompanyCsv(): string {
  const headers = [
    "Name",
    "Website",
    "Logo URL",
    "Industry",
    "Description",
    "Verified",
    "Bounties Count",
    "Total Rewards Awarded",
    "Hidden",
  ];

  const samples = [
    [
      "Nvidia",
      "https://www.nvidia.com",
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=120&auto=format&fit=crop&q=60",
      "AI & Machine Learning",
      "Accelerated computing platforms, enterprise LLM fine-tuning, and robotic perception pipelines.",
      "true",
      "14",
      "650000",
      "false",
    ],
    [
      "Google Health",
      "https://health.google",
      "https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png",
      "Healthcare",
      "Clinical search, ambient voice summarization, and EHR data interoperability models.",
      "true",
      "12",
      "500000",
      "false",
    ],
    [
      "Stripe",
      "https://stripe.com",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=60",
      "FinTech",
      "Financial infrastructure for the internet, global payout rails, and corporate spend automation.",
      "true",
      "8",
      "320000",
      "false",
    ],
    [
      "Tesla Energy",
      "https://www.tesla.com/energy",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=60",
      "CleanTech",
      "Megapack grid balancing, micro-inverters, virtual power plants, and renewable telemetry.",
      "true",
      "6",
      "240000",
      "false",
    ],
    [
      "Flexport",
      "https://www.flexport.com",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&auto=format&fit=crop&q=60",
      "Supply Chain & Logistics",
      "Global freight forwarding platform, customs automation, and port routing analytics.",
      "true",
      "5",
      "180000",
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

export function exportCompaniesToCsv(companies: CompanyDoc[]): string {
  const headers = [
    "Name",
    "Website",
    "Logo URL",
    "Industry",
    "Description",
    "Verified",
    "Bounties Count",
    "Total Rewards Awarded",
    "Hidden",
  ];

  const escapeCsv = (val: any) => {
    const s = String(val ?? "").replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = companies.map((c) => [
    c.name || "",
    c.website || "",
    c.logoUrl || "",
    c.industry || "General Industry",
    c.description || "",
    Boolean(c.verified),
    c.problemBountiesCount || 0,
    c.totalRewardsAwarded || 0,
    Boolean(c.hidden),
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
