/**
 * RFC 4180 Compliant CSV Parser & Serializer for Problem Statements
 * Designed specifically for the 6-module Problem Dossier architecture:
 * 1. Core Narrative
 * 2. Evidence & Data
 * 3. Market & Impact
 * 4. Research & Rivals
 * 5. MVP Specs
 * 6. Startup Mode
 */

import { ProblemDoc, ProblemSeverity, ProblemStatus, EvidenceDocument } from "@/types";

export interface ParsedProblemRow {
  // Module 1: Core Narrative
  title: string;
  description: string;
  industry: string;
  severity: ProblemSeverity;
  location: string;
  frequency: string;
  whoFacesIt: string;
  whenItHappens: string;
  whyFrustrating: string;
  currentSolution: string;
  submitterName: string;
  submitterRole?: string;
  isAnonymous: boolean;
  psFrom: string[];
  psFromCustom?: string;
  tags?: string[];

  // Module 2: Evidence & Data
  dataPoints: Array<{ metric: string; label: string }>;
  evidenceDocuments: EvidenceDocument[];
  evidenceUrls: string[];

  // Module 3: Market & Impact
  tam: string;
  currentPenetration: number;
  wastedCost: string;
  citizensAffected: string;
  audienceSize: string;
  willingnessToPay: string;

  // Module 4: Research & Rivals
  keyFindings: string[];
  researchMethodology: string;
  academicReferences: string[];
  competitors: Array<{ solution: string; pros: string; cons: string }>;

  // Module 5: MVP Specs
  mvpFeatures: string[];
  technicalRequirements: string;
  complianceStandards: string[];

  // Module 6: Startup Mode
  hasStartupMode: boolean;
  startupThesis: string;
  startupTargetSegments: string[];
  startupWillingnessToPay: string;
  startupValueProp: string;
  startupSolutionsGaps: Array<{
    name: string;
    description: string;
    weaknessType: "Weakness" | "Gap";
    weakness: string;
  }>;
  startupDirections: Array<{
    type: "software" | "service" | "hardware" | "hybrid" | string;
    title: string;
    description: string;
    pros?: string;
    cons?: string;
    techStack?: string[];
  }>;
  startupValidationQuestions: string[];
  discoveryInterviewPrompt: string;
  suggestedAngles: string[];
  keyRisks: string[];

  // Publication Status
  status: ProblemStatus;

  // Metadata for preview/validation table
  _rawRowIndex: number;
  _validationWarnings: string[];
}

export interface CsvParseResult {
  validProblems: ParsedProblemRow[];
  errors: Array<{ row: number; field: string; message: string }>;
  totalRowsFound: number;
  headersDetected: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Low-Level RFC 4180 CSV Engine (Zero External Dependencies)
// Handles quotes, commas inside quotes, multiline fields (\n or \r\n), escaped quotes ("")
// ─────────────────────────────────────────────────────────────────────────────

export function parseRfc4180Csv(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;
  let i = 0;
  const len = text.length;

  while (i < len) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < len && text[i + 1] === '"') {
          // Escaped quote: "" -> "
          currentField += '"';
          i += 2;
          continue;
        } else {
          // Closing quote
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
      } else if (char === ",") {
        currentRow.push(currentField);
        currentField = "";
        i++;
        continue;
      } else if (char === "\r") {
        if (i + 1 < len && text[i + 1] === "\n") {
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

  // Push final trailing field and row if non-empty
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  // Filter out any purely empty lines at end
  return rows.filter((r) => r.length > 0 && r.some((cell) => cell.trim().length > 0));
}

export function escapeCsvCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function serializeToCsv(headers: string[], rows: (string | number | boolean | null | undefined)[][]): string {
  const headerLine = headers.map(escapeCsvCell).join(",");
  const rowLines = rows.map((r) => r.map(escapeCsvCell).join(","));
  return [headerLine, ...rowLines].join("\r\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// Robust Multi-Format Cell Parsers
// Supports:
// 1. JSON string in cell: '[{"metric":"64%","label":"..."}]'
// 2. Delimited string: item1 | item2 | item3
// 3. Sub-field delimiter: 'metric::label' or 'title::url::description::type'
// ─────────────────────────────────────────────────────────────────────────────

function tryParseJson<T>(value: string): T | null {
  const trimmed = value.trim();
  if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    try {
      return JSON.parse(trimmed) as T;
    } catch {
      return null;
    }
  }
  return null;
}

function parseList(value: string): string[] {
  if (!value || !value.trim()) return [];
  const json = tryParseJson<string[]>(value);
  if (Array.isArray(json)) return json.map(String).map((s) => s.trim()).filter(Boolean);

  // If delimited by pipe '|', semicolon ';', or newline
  return value
    .split(/[|;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseDataPoints(value: string): Array<{ metric: string; label: string }> {
  if (!value || !value.trim()) return [];
  const json = tryParseJson<Array<{ metric: string; label: string }>>(value);
  if (Array.isArray(json)) {
    return json
      .filter((item) => item && (item.metric || item.label))
      .map((item) => ({
        metric: String(item.metric || "").trim(),
        label: String(item.label || "").trim(),
      }));
  }

  // Format: metric::label | metric::label
  const items = value.split(/[|\n]/).map((s) => s.trim()).filter(Boolean);
  return items.map((item) => {
    const parts = item.split("::");
    if (parts.length >= 2) {
      return { metric: parts[0].trim(), label: parts.slice(1).join("::").trim() };
    }
    // Fallback: split on first colon if double colon not used
    const singleColon = item.split(":");
    if (singleColon.length >= 2) {
      return { metric: singleColon[0].trim(), label: singleColon.slice(1).join(":").trim() };
    }
    return { metric: item, label: "" };
  });
}

function parseEvidenceDocuments(value: string): EvidenceDocument[] {
  if (!value || !value.trim()) return [];
  const json = tryParseJson<EvidenceDocument[]>(value);
  if (Array.isArray(json)) {
    return json
      .filter((d) => d && (d.title || d.url))
      .map((d) => ({
        title: String(d.title || "Evidence Document").trim(),
        url: String(d.url || "").trim(),
        description: d.description ? String(d.description).trim() : undefined,
        type: (d.type ? String(d.type).trim() : "pdf") as any,
      }));
  }

  // Format: title::url::description::type | ...
  const items = value.split(/[|\n]/).map((s) => s.trim()).filter(Boolean);
  return items.map((item) => {
    const parts = item.split("::").map((p) => p.trim());
    return {
      title: parts[0] || "Evidence Document",
      url: parts[1] || "",
      description: parts[2] || undefined,
      type: parts[3] || "pdf",
    };
  });
}

function parseCompetitors(value: string): Array<{ solution: string; pros: string; cons: string }> {
  if (!value || !value.trim()) return [];
  const json = tryParseJson<Array<{ solution: string; pros: string; cons: string }>>(value);
  if (Array.isArray(json)) {
    return json.map((c) => ({
      solution: String(c.solution || "").trim(),
      pros: String(c.pros || "").trim(),
      cons: String(c.cons || "").trim(),
    }));
  }

  // Format: solution::pros::cons | ...
  const items = value.split(/[|\n]/).map((s) => s.trim()).filter(Boolean);
  return items.map((item) => {
    const parts = item.split("::").map((p) => p.trim());
    return {
      solution: parts[0] || "",
      pros: parts[1] || "",
      cons: parts[2] || "",
    };
  });
}

function parseStartupSolutionsGaps(
  value: string
): Array<{ name: string; description: string; weaknessType: "Weakness" | "Gap"; weakness: string }> {
  if (!value || !value.trim()) return [];
  const json = tryParseJson<
    Array<{ name: string; description: string; weaknessType?: "Weakness" | "Gap" | string; weakness: string }>
  >(value);
  if (Array.isArray(json)) {
    return json.map((g) => ({
      name: String(g.name || "").trim(),
      description: String(g.description || "").trim(),
      weaknessType: g.weaknessType?.toLowerCase() === "gap" ? "Gap" : "Weakness",
      weakness: String(g.weakness || "").trim(),
    }));
  }

  // Format: name::description::weaknessType::weakness | ...
  const items = value.split(/[|\n]/).map((s) => s.trim()).filter(Boolean);
  return items.map((item) => {
    const parts = item.split("::").map((p) => p.trim());
    const weaknessTypeRaw = (parts[2] || "").toLowerCase();
    const weaknessType: "Weakness" | "Gap" = weaknessTypeRaw === "gap" ? "Gap" : "Weakness";
    return {
      name: parts[0] || "",
      description: parts[1] || "",
      weaknessType,
      weakness: parts[3] || parts[2] || "",
    };
  });
}

function parseStartupDirections(value: string): Array<{
  type: "software" | "service" | "hardware" | "hybrid" | string;
  title: string;
  description: string;
  pros?: string;
  cons?: string;
  techStack?: string[];
}> {
  if (!value || !value.trim()) return [];
  const json = tryParseJson<any[]>(value);
  if (Array.isArray(json)) {
    return json.map((d) => ({
      type: d.type || "software",
      title: String(d.title || "").trim(),
      description: String(d.description || "").trim(),
      pros: d.pros ? String(d.pros).trim() : undefined,
      cons: d.cons ? String(d.cons).trim() : undefined,
      techStack: Array.isArray(d.techStack) ? d.techStack : parseList(d.techStack || ""),
    }));
  }

  // Format: type::title::description::pros::cons::techStack(comma separated) | ...
  const items = value.split(/[|\n]/).map((s) => s.trim()).filter(Boolean);
  return items.map((item) => {
    const parts = item.split("::").map((p) => p.trim());
    return {
      type: parts[0] || "software",
      title: parts[1] || "",
      description: parts[2] || "",
      pros: parts[3] || undefined,
      cons: parts[4] || undefined,
      techStack: parts[5] ? parts[5].split(",").map((t) => t.trim()).filter(Boolean) : undefined,
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Normalization & Header Mapping Dictionary
// ─────────────────────────────────────────────────────────────────────────────

function normalizeHeaderKey(header: string): string {
  return header
    .toLowerCase()
    .replace(/^module\s*\d+[:.\s-]*/i, "") // strip "Module 1:" prefixes
    .replace(/[^a-z0-9]/g, ""); // strip spaces, underscores, hyphens
}

const HEADER_ALIASES: Record<string, string> = {
  // Module 1: Core Narrative
  title: "title",
  problemtitle: "title",
  problemstatementtitle: "title",
  problemstatement: "title",
  name: "title",

  description: "description",
  summary: "description",
  coreissuesummary: "description",
  abstract: "description",
  details: "description",

  industry: "industry",
  category: "industry",
  domain: "industry",

  severity: "severity",
  urgency: "severity",
  priority: "severity",

  location: "location",
  region: "location",
  geography: "location",
  country: "location",

  frequency: "frequency",
  occurrencefrequency: "frequency",
  howoften: "frequency",

  whofacesit: "whoFacesIt",
  affecteddemographics: "whoFacesIt",
  affectedusers: "whoFacesIt",
  stakeholders: "whoFacesIt",
  targetaudience: "whoFacesIt",

  whenithappens: "whenItHappens",
  context: "whenItHappens",
  trigger: "whenItHappens",
  contextofoccurrence: "whenItHappens",

  whyfrustrating: "whyFrustrating",
  operationalfriction: "whyFrustrating",
  painpoint: "whyFrustrating",
  frustration: "whyFrustrating",

  currentsolution: "currentSolution",
  currentsolutions: "currentSolution",
  workaround: "currentSolution",
  workarounds: "currentSolution",
  statusquo: "currentSolution",

  submittername: "submitterName",
  submittedbyname: "submitterName",
  authorname: "submitterName",
  author: "submitterName",
  submitter: "submitterName",

  submitterrole: "submitterRole",
  authorrole: "submitterRole",
  role: "submitterRole",

  isanonymous: "isAnonymous",
  anonymous: "isAnonymous",

  credits: "psFrom",
  psfrom: "psFrom",
  sources: "psFrom",
  platformchallenge: "psFrom",
  origin: "psFrom",

  creditscustom: "psFromCustom",
  psfromcustom: "psFromCustom",
  sourcecustom: "psFromCustom",

  tags: "tags",
  keywords: "tags",

  // Module 2: Evidence & Data
  datapoints: "dataPoints",
  telemetry: "dataPoints",
  metrics: "dataPoints",
  statistics: "dataPoints",

  evidencedocuments: "evidenceDocuments",
  documents: "evidenceDocuments",
  files: "evidenceDocuments",
  papers: "evidenceDocuments",

  evidenceurls: "evidenceUrls",
  evidencelinks: "evidenceUrls",
  urls: "evidenceUrls",
  links: "evidenceUrls",

  // Module 3: Market & Impact
  tam: "tam",
  totaladdressablemarket: "tam",
  marketsize: "tam",
  estimatedvalue: "tam",

  currentpenetration: "currentPenetration",
  penetration: "currentPenetration",
  penetrationrate: "currentPenetration",

  wastedcost: "wastedCost",
  inefficiencycost: "wastedCost",
  annualwastedcost: "wastedCost",
  costofinaction: "wastedCost",

  citizensaffected: "citizensAffected",
  peopleaffected: "citizensAffected",
  usersaffected: "citizensAffected",

  audiencesize: "audienceSize",
  demographicsize: "audienceSize",

  willingnesstopay: "willingnessToPay",
  wtp: "willingnessToPay",
  pricing: "willingnessToPay",
  expectedprice: "willingnessToPay",

  // Module 4: Research & Rivals
  keyfindings: "keyFindings",
  findings: "keyFindings",
  researchfindings: "keyFindings",

  researchmethodology: "researchMethodology",
  methodology: "researchMethodology",

  academicreferences: "academicReferences",
  references: "academicReferences",
  citations: "academicReferences",

  competitors: "competitors",
  rivals: "competitors",
  competitordata: "competitors",
  existingsolutions: "competitors",

  // Module 5: MVP Specs
  mvpfeatures: "mvpFeatures",
  features: "mvpFeatures",
  corefeatures: "mvpFeatures",
  suggestedmvp: "mvpFeatures",

  technicalrequirements: "technicalRequirements",
  techrequirements: "technicalRequirements",
  techspecs: "technicalRequirements",
  architecture: "technicalRequirements",

  compliancestandards: "complianceStandards",
  compliance: "complianceStandards",
  standards: "complianceStandards",

  // Module 6: Startup Mode
  hasstartupmode: "hasStartupMode",
  startupmodeenabled: "hasStartupMode",
  startupmode: "hasStartupMode",

  startupthesis: "startupThesis",
  thesis: "startupThesis",
  venturethesis: "startupThesis",

  startuptargetsegments: "startupTargetSegments",
  targetsegments: "startupTargetSegments",
  segments: "startupTargetSegments",

  startupwillingnesstopay: "startupWillingnessToPay",
  avgwillingnesstopay: "startupWillingnessToPay",

  startupvalueprop: "startupValueProp",
  valueprop: "startupValueProp",
  valueproposition: "startupValueProp",

  startupsolutionsgaps: "startupSolutionsGaps",
  solutiongaps: "startupSolutionsGaps",
  gaps: "startupSolutionsGaps",

  startupdirections: "startupDirections",
  directionstoexplore: "startupDirections",
  directions: "startupDirections",

  startupvalidationquestions: "startupValidationQuestions",
  validationquestions: "startupValidationQuestions",
  questions: "startupValidationQuestions",

  discoveryinterviewprompt: "discoveryInterviewPrompt",
  interviewprompt: "discoveryInterviewPrompt",

  suggestedangles: "suggestedAngles",
  angles: "suggestedAngles",

  keyrisks: "keyRisks",
  risks: "keyRisks",

  // Publication Status
  status: "status",
  publicationstatus: "status",
};

// ─────────────────────────────────────────────────────────────────────────────
// Primary CSV Parser & Validator
// ─────────────────────────────────────────────────────────────────────────────

export function parseProblemsFromCsv(
  csvText: string,
  options: {
    defaultStatus?: ProblemStatus;
    defaultSubmitterName?: string;
  } = {}
): CsvParseResult {
  const defaultStatus = options.defaultStatus || "approved";
  const defaultSubmitterName = options.defaultSubmitterName || "Admin Scout";

  const rows = parseRfc4180Csv(csvText);
  if (rows.length < 2) {
    return {
      validProblems: [],
      errors: [{ row: 1, field: "file", message: "CSV file is empty or missing a header row." }],
      totalRowsFound: 0,
      headersDetected: [],
    };
  }

  const rawHeaders = rows[0];
  const headerMap: Record<number, string> = {};

  rawHeaders.forEach((header, index) => {
    const normalized = normalizeHeaderKey(header);
    const canonicalKey = HEADER_ALIASES[normalized];
    if (canonicalKey) {
      headerMap[index] = canonicalKey;
    }
  });

  const validProblems: ParsedProblemRow[] = [];
  const errors: Array<{ row: number; field: string; message: string }> = [];

  for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const rowNumber = rowIndex + 1; // 1-based for human user display

    // Extract raw values mapped by canonical keys
    const cellValues: Record<string, string> = {};
    row.forEach((cell, colIndex) => {
      const canonicalKey = headerMap[colIndex];
      if (canonicalKey) {
        cellValues[canonicalKey] = cell.trim();
      }
    });

    const warnings: string[] = [];

    // Required Field 1: Title
    const title = cellValues["title"] || "";
    if (!title) {
      errors.push({ row: rowNumber, field: "title", message: "Missing required 'Problem Title'." });
      continue;
    }

    // Required Field 2: Description
    const description = cellValues["description"] || "";
    if (!description) {
      errors.push({ row: rowNumber, field: "description", message: "Missing required 'Core Issue Summary / Description'." });
      continue;
    }

    // Severity validation
    let severity: ProblemSeverity = "major";
    if (cellValues["severity"]) {
      const s = cellValues["severity"].toLowerCase();
      if (s === "minor" || s === "medium" || s === "major" || s === "critical") {
        severity = s;
      } else {
        warnings.push(`Unknown severity "${cellValues["severity"]}", defaulted to "major".`);
      }
    }

    // Status validation
    let status: ProblemStatus = defaultStatus;
    if (cellValues["status"]) {
      const st = cellValues["status"].toLowerCase();
      if (st === "approved" || st === "pending" || st === "under_review" || st === "rejected") {
        status = st as ProblemStatus;
      }
    }

    // Boolean fields
    const isAnonymous = cellValues["isAnonymous"]?.toLowerCase() === "true" || cellValues["isAnonymous"] === "1";
    const hasStartupMode =
      cellValues["hasStartupMode"] !== undefined
        ? cellValues["hasStartupMode"].toLowerCase() !== "false" && cellValues["hasStartupMode"] !== "0"
        : true; // Default true for rich venture blueprint

    // Numeric penetration
    let currentPenetration = 25;
    if (cellValues["currentPenetration"]) {
      const num = parseFloat(cellValues["currentPenetration"].replace(/[^0-9.]/g, ""));
      if (!isNaN(num)) currentPenetration = num;
    }

    // Submitter
    const submitterName = cellValues["submitterName"] || defaultSubmitterName;

    // Build complete dossier object
    const problemRow: ParsedProblemRow = {
      // 1. Core Narrative
      title,
      description,
      industry: cellValues["industry"] || "Healthcare",
      severity,
      location: cellValues["location"] || "Global",
      frequency: cellValues["frequency"] || "Daily",
      whoFacesIt: cellValues["whoFacesIt"] || "Industry practitioners and operations teams",
      whenItHappens: cellValues["whenItHappens"] || "During standard day-to-day workflow execution",
      whyFrustrating: cellValues["whyFrustrating"] || description,
      currentSolution: cellValues["currentSolution"] || "Manual workarounds and status-quo tools",
      submitterName,
      submitterRole: cellValues["submitterRole"] || undefined,
      isAnonymous,
      psFrom: parseList(cellValues["psFrom"] || "Own Thinking"),
      psFromCustom: cellValues["psFromCustom"] || undefined,
      tags: parseList(cellValues["tags"] || ""),

      // 2. Evidence & Data
      dataPoints: parseDataPoints(cellValues["dataPoints"] || ""),
      evidenceDocuments: parseEvidenceDocuments(cellValues["evidenceDocuments"] || ""),
      evidenceUrls: parseList(cellValues["evidenceUrls"] || ""),

      // 3. Market & Impact
      tam: cellValues["tam"] || "$1.0B",
      currentPenetration,
      wastedCost: cellValues["wastedCost"] || "$250M",
      citizensAffected: cellValues["citizensAffected"] || "5M+",
      audienceSize: cellValues["audienceSize"] || "100k-1m practitioners",
      willingnessToPay: cellValues["willingnessToPay"] || "$50-200/mo",

      // 4. Research & Rivals
      keyFindings: parseList(cellValues["keyFindings"] || ""),
      researchMethodology: cellValues["researchMethodology"] || "",
      academicReferences: parseList(cellValues["academicReferences"] || ""),
      competitors: parseCompetitors(cellValues["competitors"] || ""),

      // 5. MVP Specs
      mvpFeatures: parseList(cellValues["mvpFeatures"] || ""),
      technicalRequirements: cellValues["technicalRequirements"] || "",
      complianceStandards: parseList(
        cellValues["complianceStandards"] || "HIPAA BAA Compliant; SOC2 Type II Ready"
      ),

      // 6. Startup Mode
      hasStartupMode,
      startupThesis:
        cellValues["startupThesis"] ||
        `High friction across ${cellValues["citizensAffected"] || "millions of practitioners"} creating significant annual inefficiency. Validated willingness to pay exists for an automated software wedge.`,
      startupTargetSegments: parseList(cellValues["startupTargetSegments"] || ""),
      startupWillingnessToPay: cellValues["startupWillingnessToPay"] || cellValues["willingnessToPay"] || "$150/mo",
      startupValueProp:
        cellValues["startupValueProp"] ||
        `Automated platform solving ${title} for ${cellValues["whoFacesIt"] || "practitioners"}.`,
      startupSolutionsGaps: parseStartupSolutionsGaps(cellValues["startupSolutionsGaps"] || ""),
      startupDirections: parseStartupDirections(cellValues["startupDirections"] || ""),
      startupValidationQuestions: parseList(cellValues["startupValidationQuestions"] || ""),
      discoveryInterviewPrompt: cellValues["discoveryInterviewPrompt"] || "",
      suggestedAngles: parseList(cellValues["suggestedAngles"] || ""),
      keyRisks: parseList(cellValues["keyRisks"] || ""),

      // Publication Status
      status,

      _rawRowIndex: rowIndex,
      _validationWarnings: warnings,
    };

    validProblems.push(problemRow);
  }

  return {
    validProblems,
    errors,
    totalRowsFound: rows.length - 1,
    headersDetected: rawHeaders,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CSV Column Definition & Canonical Header Schema
// ─────────────────────────────────────────────────────────────────────────────

export interface CsvColumnSpec {
  key: string;
  header: string;
  module: "1. Core Narrative" | "2. Evidence & Data" | "3. Market & Impact" | "4. Research & Rivals" | "5. MVP Specs" | "6. Startup Mode" | "Metadata";
  required: boolean;
  description: string;
  example: string;
  delimiterNote?: string;
}

export const PROBLEM_CSV_SPEC: CsvColumnSpec[] = [
  // ── Module 1: Core Narrative ─────────────────────────
  {
    key: "title",
    header: "Problem Title",
    module: "1. Core Narrative",
    required: true,
    description: "Specific, domain-focused problem statement headline",
    example: "Data Interoperability Failure in Rural Clinics",
  },
  {
    key: "description",
    header: "Description",
    module: "1. Core Narrative",
    required: true,
    description: "Detailed summary of the core bottleneck and friction",
    example: "Rural healthcare providers lack unified record exchange across local specialists, delaying treatments.",
  },
  {
    key: "industry",
    header: "Industry",
    module: "1. Core Narrative",
    required: false,
    description: "Domain category (e.g. Healthcare, Logistics, Fintech, AI, Climate Tech, Education)",
    example: "Healthcare",
  },
  {
    key: "severity",
    header: "Severity",
    module: "1. Core Narrative",
    required: false,
    description: "minor | medium | major | critical (defaults to major)",
    example: "critical",
  },
  {
    key: "location",
    header: "Location",
    module: "1. Core Narrative",
    required: false,
    description: "Affected geographic region or 'Global'",
    example: "Rural United States",
  },
  {
    key: "frequency",
    header: "Frequency",
    module: "1. Core Narrative",
    required: false,
    description: "Daily | Weekly | Monthly | Continuous | Rare / Critical",
    example: "Daily",
  },
  {
    key: "whoFacesIt",
    header: "Who Faces It",
    module: "1. Core Narrative",
    required: false,
    description: "Target demographics, roles, or end-users suffering the problem",
    example: "Rural clinic administrators, primary care physicians, regional ER triage teams",
  },
  {
    key: "whenItHappens",
    header: "When It Happens",
    module: "1. Core Narrative",
    required: false,
    description: "Exact operational trigger and workflow context",
    example: "During patient intake, emergency transfers, and multi-specialty referrals",
  },
  {
    key: "whyFrustrating",
    header: "Why Frustrating",
    module: "1. Core Narrative",
    required: false,
    description: "Core friction, human pain point, or why workarounds fail",
    example: "Staff spend 4+ hours printing, faxing, and re-keying records with high error rates",
  },
  {
    key: "currentSolution",
    header: "Current Solution",
    module: "1. Core Narrative",
    required: false,
    description: "Existing status-quo tools and manual workarounds",
    example: "Legacy thermal fax machines, paper courier delivery, and phone calls",
  },
  {
    key: "submitterName",
    header: "Submitter Name",
    module: "1. Core Narrative",
    required: false,
    description: "Name of author or scout (defaults to active admin)",
    example: "Dr. Sarah Chen, MD",
  },
  {
    key: "submitterRole",
    header: "Submitter Role",
    module: "1. Core Narrative",
    required: false,
    description: "Professional title or role",
    example: "Rural Clinic Medical Director",
  },
  {
    key: "isAnonymous",
    header: "Is Anonymous",
    module: "1. Core Narrative",
    required: false,
    description: "true | false (defaults to false)",
    example: "false",
  },
  {
    key: "psFrom",
    header: "Credits / Source",
    module: "1. Core Narrative",
    required: false,
    description: "Origin / challenge platform / hackathon source tags",
    example: "Own Thinking; Smart India Hackathon (SIH); Hack2skill",
    delimiterNote: "Separated by ';' or '|'",
  },
  {
    key: "psFromCustom",
    header: "Custom Source Notes",
    module: "1. Core Narrative",
    required: false,
    description: "Custom attribution or organization note",
    example: "Field interview notes from 2026 Rural Health Summit",
  },

  // ── Module 2: Evidence & Data ────────────────────────
  {
    key: "dataPoints",
    header: "Data Points",
    module: "2. Evidence & Data",
    required: false,
    description: "Statistical telemetry metrics and labels",
    example: "64%::Clinics still relying on manual fax transfers | 4.2 hrs::Average clinical record latency | $1.8B::Annual unnecessary lab costs",
    delimiterNote: "Format: 'metric::label | metric::label' or JSON array",
  },
  {
    key: "evidenceDocuments",
    header: "Evidence Documents",
    module: "2. Evidence & Data",
    required: false,
    description: "Whitepapers, government reports, or case studies",
    example: "CMS Interoperability Standards::https://www.healthit.gov::Official survey across 4500 clinics::pdf",
    delimiterNote: "Format: 'title::url::description::type | ...' or JSON array",
  },
  {
    key: "evidenceUrls",
    header: "Evidence URLs",
    module: "2. Evidence & Data",
    required: false,
    description: "External reference links",
    example: "https://www.ruralhealthinfo.org/research; https://www.healthit.gov/topic/interoperability",
    delimiterNote: "Separated by ';' or '|'",
  },

  // ── Module 3: Market & Impact ────────────────────────
  {
    key: "tam",
    header: "TAM",
    module: "3. Market & Impact",
    required: false,
    description: "Total Addressable Market size",
    example: "$4.8B",
  },
  {
    key: "currentPenetration",
    header: "Current Penetration",
    module: "3. Market & Impact",
    required: false,
    description: "Current market solution penetration percentage (0-100)",
    example: "35",
  },
  {
    key: "wastedCost",
    header: "Wasted Cost",
    module: "3. Market & Impact",
    required: false,
    description: "Annual economic waste or inefficiency cost",
    example: "$1.8B",
  },
  {
    key: "citizensAffected",
    header: "Citizens Affected",
    module: "3. Market & Impact",
    required: false,
    description: "Number of individuals or citizens affected",
    example: "46 million",
  },
  {
    key: "audienceSize",
    header: "Audience Size",
    module: "3. Market & Impact",
    required: false,
    description: "Target practitioner demographic size",
    example: "4,500+ clinics & 28,000 specialists",
  },
  {
    key: "willingnessToPay",
    header: "Willingness To Pay",
    module: "3. Market & Impact",
    required: false,
    description: "Expected price or monthly willingness to pay",
    example: "$150/mo per practitioner",
  },

  // ── Module 4: Research & Rivals ──────────────────────
  {
    key: "keyFindings",
    header: "Key Findings",
    module: "4. Research & Rivals",
    required: false,
    description: "Empirical field findings and insights",
    example: "Legacy EHRs charge proprietary export fees | Staff experience 22% burnout from missing records",
    delimiterNote: "Separated by '|' or ';'",
  },
  {
    key: "researchMethodology",
    header: "Research Methodology",
    module: "4. Research & Rivals",
    required: false,
    description: "How the research was conducted",
    example: "Multi-center field survey conducted with 120 rural clinic directors and CMS audit logs.",
  },
  {
    key: "academicReferences",
    header: "Academic References",
    module: "4. Research & Rivals",
    required: false,
    description: "Academic papers and journal citations",
    example: "'The Digital Divide in Healthcare Exchange', J Rural Health (2024) | 'Evaluating Info Blocking', Health Affairs (2024)",
    delimiterNote: "Separated by '|' or ';'",
  },
  {
    key: "competitors",
    header: "Competitors",
    module: "4. Research & Rivals",
    required: false,
    description: "Existing competitors, pros, and cons",
    example: "Epic Care Everywhere::Seamless sync within Epic network::Prohibitively expensive for independent practices | Legacy Thermal Fax::Universal 99% adoption::Zero structured parsing, HIPAA risk",
    delimiterNote: "Format: 'solution::pros::cons | ...' or JSON array",
  },

  // ── Module 5: MVP Specs ──────────────────────────────
  {
    key: "mvpFeatures",
    header: "MVP Features",
    module: "5. MVP Specs",
    required: false,
    description: "Suggested core MVP features to build",
    example: "Universal bidirectional FHIR API translator bridge | Offline-first encrypted SQLite record cache | Lightweight web triage referral portal",
    delimiterNote: "Separated by '|' or ';'",
  },
  {
    key: "technicalRequirements",
    header: "Technical Requirements",
    module: "5. MVP Specs",
    required: false,
    description: "Architecture, compliance, latency, and integration specs",
    example: "SOC2 Type II compliance, HIPAA BAA readiness, Carequality HIE network integration, sub-200ms parse latency.",
  },
  {
    key: "complianceStandards",
    header: "Compliance Standards",
    module: "5. MVP Specs",
    required: false,
    description: "Required regulatory and security certifications",
    example: "HIPAA BAA Compliant; SOC2 Type II Ready; FHIR / HL7 Validated; Carequality HIE Ready",
    delimiterNote: "Separated by ';' or '|'",
  },

  // ── Module 6: Startup Mode ───────────────────────────
  {
    key: "hasStartupMode",
    header: "Startup Mode Enabled",
    module: "6. Startup Mode",
    required: false,
    description: "true | false (defaults to true)",
    example: "true",
  },
  {
    key: "startupThesis",
    header: "Startup Thesis",
    module: "6. Startup Mode",
    required: false,
    description: "Venture hypothesis and investment thesis",
    example: "Acute systemic inefficiency across 46M citizens with $1.8B annual waste. 64% clinic reliance on fax creates high WTP for a modern wedge.",
  },
  {
    key: "startupTargetSegments",
    header: "Startup Target Segments",
    module: "6. Startup Mode",
    required: false,
    description: "Initial beachhead ICP segments",
    example: "Rural Clinic Admins; Independent Specialists; Home Care Nurses; Independent Pharmacists",
    delimiterNote: "Separated by ';' or '|'",
  },
  {
    key: "startupValueProp",
    header: "Startup Value Prop",
    module: "6. Startup Mode",
    required: false,
    description: "One-sentence value proposition draft",
    example: "Universal EHR translation bridge with offline caching that maps incoming faxes to FHIR schemas.",
  },
  {
    key: "startupSolutionsGaps",
    header: "Startup Solutions Gaps",
    module: "6. Startup Mode",
    required: false,
    description: "Existing market solutions and their specific weakness or gap",
    example: "Epic Care Everywhere::Gold standard enterprise hospital system::Weakness::Prohibitively expensive ($50k+/yr) | Legacy Thermal Fax::Universal adoption::Gap::Zero audit trail, manual re-entry",
    delimiterNote: "Format: 'name::description::WeaknessType::weakness | ...'",
  },
  {
    key: "startupDirections",
    header: "Startup Directions",
    module: "6. Startup Mode",
    required: false,
    description: "Different execution angles (software, service, hardware, hybrid)",
    example: "software::Universal API Bridge::Cloud micro-service converting fax OCR to FHIR::90%+ gross margins::Requires HIPAA BAA::Next.js, Python, AWS Textract | hardware::Edge Caching Appliance::Plug-and-play gateway on premise::Works during broadband outages::Hardware logistics::Raspberry Pi, Docker, SQLite",
    delimiterNote: "Format: 'type::title::description::pros::cons::techStack(comma separated) | ...'",
  },
  {
    key: "startupValidationQuestions",
    header: "Startup Validation Questions",
    module: "6. Startup Mode",
    required: false,
    description: "Customer discovery validation checklist questions",
    example: "Talked to 10+ target clinic administrators? | Verified budget currently paid for manual workarounds? | Secured 2-3 pilot LOIs?",
    delimiterNote: "Separated by '|' or ';'",
  },
  {
    key: "discoveryInterviewPrompt",
    header: "Discovery Interview Prompt",
    module: "6. Startup Mode",
    required: false,
    description: "Best interview question for prospective founders to ask customers",
    example: "When was the last time an incoming patient record failed to transfer, and how much time was spent chasing it?",
  },
  {
    key: "suggestedAngles",
    header: "Suggested Angles",
    module: "6. Startup Mode",
    required: false,
    description: "Strategic expansion and wedge angles",
    example: "Universal EHR translation bridge with offline caching | Secure cloud fax OCR to FHIR converter | Zero-maintenance patient handoff portal",
    delimiterNote: "Separated by '|' or ';'",
  },
  {
    key: "keyRisks",
    header: "Key Risks",
    module: "6. Startup Mode",
    required: false,
    description: "Venture execution risks and moats",
    example: "HIPAA BAA compliance across state health exchanges | Legacy EHR vendor API paywalls",
    delimiterNote: "Separated by '|' or ';'",
  },

  // ── Publication Metadata ──────────────────────────────
  {
    key: "status",
    header: "Status",
    module: "Metadata",
    required: false,
    description: "approved | pending | under_review (defaults to approved for admin import)",
    example: "approved",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sample CSV Generator (Multi-Industry Real Production Dossiers)
// ─────────────────────────────────────────────────────────────────────────────

export function generateSampleProblemCsv(): string {
  const headers = PROBLEM_CSV_SPEC.map((s) => s.header);

  const sampleRows: (string | number | boolean | null | undefined)[][] = [
    // Row 1: Healthcare
    [
      "Data Interoperability Failure in Rural Clinics", // Problem Title
      "Rural healthcare providers lack a unified system to access patient records across different local specialists, causing delayed treatments and duplicate lab tests.", // Description
      "Healthcare", // Industry
      "critical", // Severity
      "Rural United States", // Location
      "Daily", // Frequency
      "Rural clinic administrators, primary care physicians, regional specialists, and ER triage teams.", // Who Faces It
      "During patient intake, emergency transfers, and multi-specialty referrals when records must cross independent EHR vendor silos.", // When It Happens
      "Staff must spend hours manually tracking down, printing, and scanning faxed documents, which frequently contain unreadable handwriting or missing pages.", // Why Frustrating
      "Legacy thermal fax machines, paper courier delivery, and phone calls between medical records clerks.", // Current Solution
      "Dr. Sarah Chen, MD", // Submitter Name
      "Rural Clinic Medical Director", // Submitter Role
      "false", // Is Anonymous
      "Own Thinking; Smart India Hackathon (SIH); Hack2skill", // Credits / Source
      "Direct empirical study across 45 community healthcare clinics", // Custom Source Notes
      "64%::Rural clinics still relying on manual fax transfers daily | 4.2 hrs::Average clinical record latency per transferred patient | $1.8B::Annual unnecessary cost from duplicate lab diagnostics", // Data Points
      "CMS Interoperability Standards & Policy Guidelines::https://www.healthit.gov::Official empirical survey and benchmark dataset detailing technical and logistical friction across 4,500+ rural clinics.::pdf", // Evidence Documents
      "https://www.ruralhealthinfo.org/research/ehr-interoperability-barriers; https://www.healthit.gov/topic/interoperability/fhir-api-mandates", // Evidence URLs
      "$4.8B", // TAM
      35, // Current Penetration
      "$1.8B", // Wasted Cost
      "46 million", // Citizens Affected
      "4,500+ clinics & 28,000 specialists", // Audience Size
      "$150/mo per practitioner", // Willingness To Pay
      "Current legacy EHRs charge proprietary licensing fees for FHIR export endpoints. | Rural clinical staff experience 22% burnout attributed solely to missing record fax tracking.", // Key Findings
      "Multi-center field survey conducted with 120 rural clinic operations directors, cross-referenced with CMS ONC audit logs.", // Research Methodology
      "'The Digital Divide in Healthcare Information Exchange', Journal of Rural Health (2023). | 'Evaluating the Impact of Information Blocking Directives', Health Affairs (2024).", // Academic References
      "Epic Care Everywhere::Seamless real-time synchronization if both networks are on modern Epic infrastructure.::Prohibitively expensive setup costs for independent community practices, zero offline resilience. | Legacy Thermal Fax (Status Quo)::Universal adoption across 99% of rural facilities without IT upgrades.::Zero structured parsing, manual re-entry required, massive HIPAA audit exposure and high delay.", // Competitors
      "Universal bidirectional FHIR API translator bridge with automated HL7 v2 parser. | Offline-first encrypted SQLite record cache for unstable rural broadband connectivity. | Lightweight web triage portal for specialist referrals without requiring proprietary EHR installations.", // MVP Features
      "SOC2 Type II compliance, HIPAA BAA readiness, robust integration with national HIE networks (Carequality, CommonWell), under 200ms parse latency.", // Technical Requirements
      "HIPAA BAA Compliant; SOC2 Type II Ready; FHIR / HL7 Validated; Carequality HIE Ready", // Compliance Standards
      "true", // Startup Mode Enabled
      "This problem represents an acute systemic inefficiency across 46 million citizens with an annual wasted cost of $1.8B. With over 64% of rural community clinics still forced to rely on manual fax transfers daily, there is an immediate willingness to pay ($150/mo per practitioner) for an automated software bridge or local edge caching wedge.", // Startup Thesis
      "Rural Clinic Admins; Independent Specialists; Home Care Nurses; Independent Pharmacists; EMS & Urgent Care Providers", // Startup Target Segments
      "Universal EHR translation bridge with offline caching that categorizes incoming faxes and maps them to EHR FHIR schemas for rural clinic administrators.", // Startup Value Prop
      "Epic Care Everywhere::Industry gold-standard for large enterprise hospital networks.::Weakness::Prohibitively expensive ($50k+/yr) for independent rural community clinics. | Direct Secure Messaging::Encrypted email protocol for certified healthcare providers.::Gap::Clunky UI, relies on manual entry and unstructured PDF attachments. | Legacy Thermal Fax::Universal adoption across 99% of rural healthcare facilities.::Gap::Severe security vulnerabilities, manual transcription errors, zero audit log.", // Startup Solutions Gaps
      "software::Universal API Bridge (Software / SaaS)::Lightweight cloud micro-service that translates inbound legacy fax OCR into standardized FHIR JSON schemas.::90%+ gross margins, instant multi-tenant scalability, frictionless self-serve onboarding.::Requires robust HIPAA BAA compliance and high OCR accuracy for handwritten charts.::Next.js, Python / FastAPI, AWS Textract OCR, FHIR REST API, PostgreSQL | hardware::Local Edge Caching Appliance (Hardware + SaaS)::Plug-and-play local edge gateway that caches regional health records on-premise for offline resilience.::100% operational during rural broadband blackouts, ultra-low latency.::Hardware logistics, firmware maintenance, on-site installation overhead.::Raspberry Pi, Docker Embedded, SQLite Sync, WireGuard VPN", // Startup Directions
      "Talked to 10+ target practitioners or clinic administrators? | Verified they currently pay budget for manual workarounds? | Frequency verified (>3 occurrences per day)? | Secured 2-3 design partner LOIs or pilot agreements? | Mapped 2-week MVP scope and compliance prerequisites?", // Startup Validation Questions
      "When was the last time an incoming patient record failed to transfer, and how much clinical staff time was spent chasing that single file?", // Discovery Interview Prompt
      "Universal EHR translation bridge with offline caching for rural clinics. | Secure cloud fax OCR to FHIR standard converter for independent practices. | Zero-maintenance patient handoff portal with automated compliance logs.", // Suggested Angles
      "HIPAA BAA compliance hurdles across state health exchanges | Legacy EHR vendor API paywalls and rate limits", // Key Risks
      "approved", // Status
    ],

    // Row 2: Logistics & Supply Chain
    [
      "Cold Chain Temperature Excursions in Biologic Cargo", // Problem Title
      "Temperature-controlled pharmaceutical shipments experience unmonitored thermal spikes during intermodal airport tarmac handoffs, spoiling $35B in critical medicine annually without real-time alerts.", // Description
      "Logistics", // Industry
      "critical", // Severity
      "International Air Cargo Corridors", // Location
      "Daily", // Frequency
      "Freight forwarders, pharmaceutical quality assurance officers, tarmac ground handlers, and cold-storage warehouse supervisors.", // Who Faces It
      "During tarmac cross-docking transitions between refrigerated reefer trucks and wide-body aircraft cargo holds under extreme ambient heat.", // When It Happens
      "Standard data loggers only reveal that temperature limits were breached AFTER the shipment arrives at destination, leaving cargo spoiled and unsalvageable.", // Why Frustrating
      "Passive dry ice blankets, USB flash-drive temperature dataloggers read upon arrival, and manual clipboard check sheets.", // Current Solution
      "Marcus Vance", // Submitter Name
      "VP Global Cold Chain Logistics", // Submitter Role
      "false", // Is Anonymous
      "Own Thinking; International Air Transport Association (IATA)", // Credits / Source
      "IATA Center of Excellence for Independent Validators in Pharmaceutical Logistics", // Custom Source Notes
      "$35B::Global annual economic loss from temperature excursion wastage | 28%::Of healthcare air cargo experiences unrecorded tarmac thermal stress | 4.8 hrs::Average tarmac dwell time with zero active cooling", // Data Points
      "IATA CEIV Pharma Global Benchmarking Report::https://www.iata.org/pharma::Comprehensive statistical analysis of temperature spikes across 120 global hub airports.::pdf", // Evidence Documents
      "https://www.iata.org/en/programs/cargo/pharma/; https://www.who.int/initiatives/cold-chain-benchmarks", // Evidence URLs
      "$14.2B", // TAM
      22, // Current Penetration
      "$35.0B", // Wasted Cost
      "120 million patients", // Citizens Affected
      "1,800 global freight forwarding hubs & 350 pharma manufacturers", // Audience Size
      "$450/month per active cargo lane", // Willingness To Pay
      "Over 72% of thermal excursions occur within a narrow 45-minute window during tarmac aircraft loading. | Modern cellular IoT sensors lose network connectivity inside aluminum aircraft ULD containers.", // Key Findings
      "Telemetry study across 420 transatlantic biologic shipments tracking multi-sensor ambient versus internal payload readings.", // Research Methodology
      "'Risk Factors for Thermal Excursions in Global Vaccine Supply Chains', Vaccine Logistics Review (2024).", // Academic References
      "Sensitech TempTale Ultra::Industry standard USB data logger with high regulatory acceptance.::Zero real-time alerting; excursion only discovered days later at destination after damage is permanent. | Controlant Real-Time IoT::Cellular real-time tracking during transit.::Prohibitive unit cost ($180+ per single-use tracker) and RF blackout inside cargo hold.", // Competitors
      "Sub-GHz mesh beacon gateway for tarmac ground crews with immediate acoustic and push notifications. | Predictive thermal decay algorithm accounting for ambient asphalt temperature and solar irradiance. | Automated GDP compliance audit report generator exportable to FAA and EMA inspectors.", // MVP Features
      "FAA battery compliance (DO-160 Section 21 RF emissions certified), Bluetooth 5.4 Low Energy, IP68 waterproof housing, sub-1 second local alert latency.", // Technical Requirements
      "GDP Compliant; FAA DO-160G; IATA CEIV Pharma Certified; ISO 9001", // Compliance Standards
      "true", // Startup Mode Enabled
      "Pharmaceutical manufacturers willingly absorb massive insurance premiums because current telemetry is retrospective. Providing predictive real-time alerts before thermal thresholds breach saves millions per shipment with immediate ROI.", // Startup Thesis
      "Pharma Supply Chain Directors; Air Cargo Ground Handlers; Specialty Biologic Distributors; Clinical Trial Freight Forwarders", // Startup Target Segments
      "Real-time predictive tarmac cold chain monitor that alerts ground crews 30 minutes before thermal threshold breaches occur.", // Startup Value Prop
      "Sensitech USB Loggers::Regulatory gold standard for audits::Weakness::Retrospective only; reports failure after millions in cargo has already spoiled. | High-End Satellite Trackers::Continuous telemetry::Gap::Prohibitively expensive for high-volume standard shipments and banned inside certain aircraft holds.", // Startup Solutions Gaps
      "software::Predictive Tarmac Telemetry Cloud::Predictive heat decay software analyzing weather and tarmac dwell times.::Zero hardware manufacturing required, rapid B2B deployment.::Relies on third-party sensor integration.::TypeScript, Node.js, TimescaleDB, AWS IoT Core | hybrid::Mesh Beacon + Tarmac Station Wedge::Low-cost BLE beacons combined with ruggedized tarmac ground stations.::Provides 100% real-time visibility during critical loading windows.::Requires airport ground-handler cooperation.::Rust Embedded, BLE 5.4, Go Microservices, React Dashboard", // Startup Directions
      "Interviewed 5+ cargo QA leads at major pharma manufacturers? | Verified cost of a single spoiled shipment exceeds $250k? | Confirmed ground handlers would act on a 20-minute advance alert?", // Startup Validation Questions
      "How often does a tarmac delay cause a complete batch discard, and who absorbs the contractual liability?", // Discovery Interview Prompt
      "Predictive tarmac heat exposure model for airport ground crews | Disposable BLE sensor network with automated GDP certification | High-value clinical trial shipment insurance telemetry plug-in", // Suggested Angles
      "Airport security and RF restriction clearances | Ground handler operational friction and turnover", // Key Risks
      "approved", // Status
    ],

    // Row 3: Fintech & Cross-Border B2B
    [
      "Multi-Currency B2B Invoice Reconciliation Discrepancies", // Problem Title
      "Mid-market export manufacturers spend 20+ finance team hours weekly resolving micro-cent FX rounding errors and hidden intermediary correspondent bank deductions.", // Description
      "Fintech", // Industry
      "major", // Severity
      "Southeast Asia & Latin America", // Location
      "Weekly", // Frequency
      "Corporate treasury analysts, export controllers, accounts receivable managers, and CFOs.", // Who Faces It
      "During month-end reconciliation when incoming SWIFT wire payments do not match invoice totals due to undisclosed intermediary bank fees.", // When It Happens
      "ERP systems reject automatic invoice matching over discrepancy margins as small as $12.50, forcing accountants to manually trace MT103 wire messages.", // Why Frustrating
      "Manual Excel spreadsheet reconciliations, bank customer support tickets, and write-off adjustment journals.", // Current Solution
      "Elena Rostova", // Submitter Name
      "Head of Treasury Operations", // Submitter Role
      "false", // Is Anonymous
      "Own Thinking; Global Treasury Forum", // Credits / Source
      "Survey of 300 export enterprises with cross-border operations", // Custom Source Notes
      "$850M::Annual accounting overhead spent manually reconciling cross-border payments | 34%::Of incoming international wire transfers differ from invoice totals | 6.5 days::Average delay in closing month-end financial books", // Data Points
      "Bank for International Settlements Cross-Border Payment Friction Study::https://www.bis.org/cpmi/cross_border.htm::Analysis of intermediary fee friction in ISO 20022 payment corridors.::pdf", // Evidence Documents
      "https://www.swift.com/standards/iso-20022; https://www.bis.org/publ/qtrpdf/r_qt2003e.htm", // Evidence URLs
      "$3.2B", // TAM
      18, // Current Penetration
      "$850M", // Wasted Cost
      "850,000 export enterprises", // Citizens Affected
      "140,000 mid-market exporters across ASEAN and LATAM", // Audience Size
      "$299/month per corporate entity", // Willingness To Pay
      "Over 88% of invoice mismatches are caused by unpredictable lifting fees taken by second-tier correspondent banks in the SWIFT path. | Finance teams lack real-time MT103 GPI tracking visibility inside their native ERP.", // Key Findings
      "Transaction audit of 12,000 cross-border invoices across NetSuite, SAP Business One, and Xero.", // Research Methodology
      "'Friction in Intermediary Correspondent Banking Networks', Journal of Financial Market Infrastructures (2023).", // Academic References
      "BlackLine Enterprise::High-end financial close automation for Fortune 500 corporations.::Requires 6-month enterprise onboarding and costs $80,000+/year, out of reach for mid-market exporters. | Native NetSuite Auto-Match::Basic transaction matching.::Stops completely when currency amounts differ by even pennies due to correspondent fees.", // Competitors
      "Automated SWIFT GPI MT103 fee deduction predictor and fuzzy tolerance matching engine. | Two-way plug-in for NetSuite, QuickBooks Online, and Xero that automatically books lifting fee variances to correct GL accounts. | Real-time foreign exchange spread benchmark comparison table.", // MVP Features
      "SOC2 Type II, ISO 20022 messaging compliance, 256-bit AES encryption for bank connection tokens, sub-500ms invoice reconciliation throughput.", // Technical Requirements
      "SOC2 Type II; ISO 20022; PCI-DSS Level 1; GDPR Compliant", // Compliance Standards
      "true", // Startup Mode Enabled
      "Mid-market export manufacturers are caught between simplistic SMB accounting software and 6-figure enterprise suites. An automated fuzzy reconciliation bridge delivers immediate ROI by saving 80+ hours of finance labor per month.", // Startup Thesis
      "Export Manufacturers ($5M-$100M revenue); Cross-Border E-commerce Aggregators; Digital Agencies with International Clients", // Startup Target Segments
      "Zero-touch cross-border invoice reconciliation that automatically resolves SWIFT fee discrepancies and syncs with your ERP.", // Startup Value Prop
      "NetSuite Native Reconciliation::Standard ERP matching::Weakness::Fails on FX rounding and intermediary fee deductions, requiring manual review. | Manual Spreadsheet Balancing::Universal zero-software solution::Gap::Prone to human error, delays monthly financial statements by days.", // Startup Solutions Gaps
      "software::ERP Reconciliation Plug-in (B2B SaaS)::Zero-configuration connector that ingests bank statements and matches open invoices with fuzzy variance tolerance.::Instant deployment, high gross margin, low churn.::Requires maintaining connectors across multiple ERP systems.::TypeScript, Next.js, FastAPI, PostgreSQL, Plaid / SWIFT API", // Startup Directions
      "Validated with 10+ CFOs that month-end close is delayed by wire reconciliations? | Confirmed companies currently pay external bookkeepers to fix wire discrepancies? | Tested fuzzy auto-matching algorithm on 500 real bank rows?", // Startup Validation Questions
      "How many hours does your accounting team spend each month tracking down why a customer's wire payment arrived $20 short?", // Discovery Interview Prompt
      "Automated correspondent bank fee predictor and ERP ledger reconciler | SWIFT GPI wire tracking portal for mid-market exporters | Multi-currency micro-variance clearing house", // Suggested Angles
      "Banking API rate limits and proprietary statement formats across regional banks | ERP partner marketplace certification cycles", // Key Risks
      "approved", // Status
    ],
  ];

  return serializeToCsv(headers, sampleRows);
}

// ─────────────────────────────────────────────────────────────────────────────
// Exporter: Convert Existing ProblemDoc Objects to CSV
// ─────────────────────────────────────────────────────────────────────────────

export function exportProblemToUniversalRow(p: any): (string | number | boolean | null | undefined)[] {
  // 1. Core Narrative
  const title = p.title || "";
  const description = p.description || "";
  const industry = p.industry || "Healthcare";
  const severity = p.severity || "major";
  const location = p.location || "Global";
  const frequency = p.frequency || "Daily";
  const whoFacesIt = p.whoFacesIt || "";
  const whenItHappens = p.whenItHappens || "";
  const whyFrustrating = p.whyFrustrating || "";
  const currentSolution = p.currentSolution || "";
  const submitterName = p.submittedByName || p.submittedBy || p.authorDisplayName || p.submitterName || "";
  const submitterRole = p.submitterRole || "";
  const isAnonymous = p.isAnonymous ? "true" : "false";
  const psFrom = Array.isArray(p.psFrom) ? p.psFrom.join("; ") : p.psFrom || "";
  const psFromCustom = p.psFromCustom || "";

  // 2. Evidence & Data
  const dataPoints = (p.dataPoints || [])
    .map((dp: any) => `${dp.metric}::${dp.label}`)
    .join(" | ");
  const evidenceDocuments = (p.evidenceDocuments || [])
    .map((d: any) => `${d.title}::${d.url}::${d.description || ""}::${d.type || "pdf"}`)
    .join(" | ");
  const evidenceUrls = Array.isArray(p.evidenceUrls) ? p.evidenceUrls.join("; ") : p.evidenceUrls || "";

  // 3. Market & Impact
  const tam = p.tam || p.marketData?.tam || p.estimatedValue || "";
  const currentPenetration = p.currentPenetration ?? p.marketData?.currentPenetration ?? 25;
  const wastedCost = p.wastedCost || p.marketData?.wastedCost || "";
  const citizensAffected = p.citizensAffected || p.marketData?.citizensAffected || "";
  const audienceSize = p.audienceSize || "";
  const willingnessToPay = p.willingnessToPay || "";

  // 4. Research & Rivals
  const keyFindings = Array.isArray(p.keyFindings)
    ? p.keyFindings.join(" | ")
    : (p.researchData?.keyFindings || []).join(" | ");
  const researchMethodology = p.researchMethodology || p.researchData?.methodology || "";
  const academicReferences = Array.isArray(p.academicReferences)
    ? p.academicReferences.join(" | ")
    : (p.researchData?.academicReferences || []).join(" | ");
  const competitors = (p.competitors || p.competitorData || [])
    .map((c: any) => `${c.solution}::${c.pros}::${c.cons}`)
    .join(" | ");

  // 5. MVP Specs
  const mvpFeatures = Array.isArray(p.mvpFeatures)
    ? p.mvpFeatures.join(" | ")
    : (p.suggestedMVP?.coreFeatures || []).join(" | ");
  const technicalRequirements = p.technicalRequirements || p.suggestedMVP?.technicalRequirements || "";
  const complianceStandards = Array.isArray(p.complianceStandards)
    ? p.complianceStandards.join("; ")
    : (p.suggestedMVP?.complianceStandards || p.startupModeConfig?.complianceStandards || []).join("; ");

  // 6. Startup Mode
  const cfg = p.startupModeConfig;
  const hasStartupMode =
    p.hasStartupMode !== undefined
      ? p.hasStartupMode ? "true" : "false"
      : p.startupModeEnabled ?? cfg?.enabled ?? true ? "true" : "false";
  const startupThesis = p.startupThesis || cfg?.thesis || "";
  const startupTargetSegments = Array.isArray(p.startupTargetSegments)
    ? p.startupTargetSegments.join("; ")
    : (cfg?.targetSegments || []).join("; ");
  const startupValueProp = p.startupValueProp || cfg?.valuePropositionDraft || "";
  const startupSolutionsGaps = (p.startupSolutionsGaps || cfg?.existingSolutionsGaps || [])
    .map((g: any) => `${g.name}::${g.description}::${g.weaknessType || "Weakness"}::${g.weakness || ""}`)
    .join(" | ");
  const startupDirections = (p.startupDirections || cfg?.directionsToExplore || [])
    .map((d: any) => {
      const tech = Array.isArray(d.techStack) ? d.techStack.join(",") : d.techStack || "";
      return `${d.type || "software"}::${d.title}::${d.description}::${d.pros || ""}::${d.cons || ""}::${tech}`;
    })
    .join(" | ");
  const startupValidationQuestions = Array.isArray(p.startupValidationQuestions)
    ? p.startupValidationQuestions.join(" | ")
    : (cfg?.validationQuestions || []).join(" | ");
  const discoveryInterviewPrompt = p.discoveryInterviewPrompt || cfg?.discoveryInterviewPrompt || "";
  const suggestedAngles = Array.isArray(p.suggestedAngles)
    ? p.suggestedAngles.join(" | ")
    : (p.aiScores?.suggestedAngles || []).join(" | ");
  const keyRisks = Array.isArray(p.keyRisks)
    ? p.keyRisks.join(" | ")
    : (p.aiScores?.keyRisks || []).join(" | ");

  const status = p.status || "approved";

  return [
    title,
    description,
    industry,
    severity,
    location,
    frequency,
    whoFacesIt,
    whenItHappens,
    whyFrustrating,
    currentSolution,
    submitterName,
    submitterRole,
    isAnonymous,
    psFrom,
    psFromCustom,
    dataPoints,
    evidenceDocuments,
    evidenceUrls,
    tam,
    currentPenetration,
    wastedCost,
    citizensAffected,
    audienceSize,
    willingnessToPay,
    keyFindings,
    researchMethodology,
    academicReferences,
    competitors,
    mvpFeatures,
    technicalRequirements,
    complianceStandards,
    hasStartupMode,
    startupThesis,
    startupTargetSegments,
    startupValueProp,
    startupSolutionsGaps,
    startupDirections,
    startupValidationQuestions,
    discoveryInterviewPrompt,
    suggestedAngles,
    keyRisks,
    status,
  ];
}

export function exportProblemsToCsv(problems: ProblemDoc[] | ParsedProblemRow[]): string {
  const headers = PROBLEM_CSV_SPEC.map((s) => s.header);
  const rows = problems.map(exportProblemToUniversalRow);
  return serializeToCsv(headers, rows);
}

// ─────────────────────────────────────────────────────────────────────────────
// Browser Download Helper
// ─────────────────────────────────────────────────────────────────────────────

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

