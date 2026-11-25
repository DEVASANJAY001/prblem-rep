import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ACADEMY_COURSES, COURSE_1_CHAPTERS, COURSE_2_CHAPTERS } from "../src/data/academyData";
import { COURSE_3_CHAPTERS } from "../src/data/course3Data";
import { COURSE_4_CHAPTERS } from "../src/data/course4Data";
import { COURSE_5_CHAPTERS } from "../src/data/course5Data";
import { COURSE_6_CHAPTERS } from "../src/data/course6Data";
import {
  REAL_INDUSTRIES,
  REAL_PROBLEMS,
  REAL_COMPANIES,
  REAL_RESEARCH,
  REAL_COMPETITIONS,
} from "../src/data/realProductionData";

const BASE_URL = "https://stuckhere.davns.com";
const TODAY = new Date().toISOString().slice(0, 10);

const courseChapterMap: Record<string, any[]> = {
  "problem-discovery-and-validation": COURSE_1_CHAPTERS,
  "market-sizing-and-opportunity": COURSE_2_CHAPTERS,
  "full-stack-cloud-development": COURSE_3_CHAPTERS,
  "solution-design-and-mvp-building": COURSE_4_CHAPTERS,
  "ai-for-builders": COURSE_5_CHAPTERS,
  "startup-fundamentals": COURSE_6_CHAPTERS,
};

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  title?: string;
  imageUrl?: string;
  imageTitle?: string;
}

function escapeXml(unsafe: string): string {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderUrlsetXml(entries: SitemapUrlEntry[]): string {
  const xmlEntries = entries
    .map((e) => {
      let imageBlock = "";
      if (e.imageUrl) {
        const fullImg = e.imageUrl.startsWith("http") ? e.imageUrl : `${BASE_URL}${e.imageUrl.startsWith("/") ? "" : "/"}${e.imageUrl}`;
        imageBlock = `\n    <image:image>\n      <image:loc>${escapeXml(fullImg)}</image:loc>\n      <image:title>${escapeXml(e.imageTitle || e.title || "")}</image:title>\n    </image:image>`;
      } else if (e.title) {
        imageBlock = `\n    <image:image>\n      <image:loc>${BASE_URL}/og-image.png</image:loc>\n      <image:title>${escapeXml(e.title)}</image:title>\n    </image:image>`;
      }

      return `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod || TODAY}</lastmod>
    <changefreq>${e.changefreq || "weekly"}</changefreq>
    <priority>${(e.priority !== undefined ? e.priority : 0.8).toFixed(2)}</priority>${imageBlock}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlEntries}
</urlset>
`;
}

function renderSitemapIndexXml(sitemapUrls: { loc: string; lastmod?: string }[]): string {
  const sitemaps = sitemapUrls
    .map((s) => {
      return `  <sitemap>
    <loc>${escapeXml(s.loc)}</loc>
    <lastmod>${s.lastmod || TODAY}</lastmod>
  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>
`;
}

// 1. Extract existing problem, startup-mode, and industry entries from public/sitemap.xml
function extractExistingEntries(): {
  existingProblems: SitemapUrlEntry[];
  existingStartupMode: SitemapUrlEntry[];
} {
  const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    return { existingProblems: [], existingStartupMode: [] };
  }

  const content = fs.readFileSync(sitemapPath, "utf8");
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  let match: RegExpExecArray | null;

  const existingProblems: SitemapUrlEntry[] = [];
  const existingStartupMode: SitemapUrlEntry[] = [];

  while ((match = urlRegex.exec(content)) !== null) {
    const block = match[1];
    const locMatch = block.match(/<loc>(.*?)<\/loc>/);
    const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/);
    const changefreqMatch = block.match(/<changefreq>(.*?)<\/changefreq>/);
    const priorityMatch = block.match(/<priority>(.*?)<\/priority>/);
    const imgLocMatch = block.match(/<image:loc>(.*?)<\/image:loc>/);
    const imgTitleMatch = block.match(/<image:title>(.*?)<\/image:title>/);

    if (locMatch) {
      const loc = locMatch[1].trim();
      const entry: SitemapUrlEntry = {
        loc,
        lastmod: lastmodMatch ? lastmodMatch[1].trim() : TODAY,
        changefreq: (changefreqMatch ? changefreqMatch[1].trim() : "weekly") as any,
        priority: priorityMatch ? parseFloat(priorityMatch[1].trim()) : 0.85,
        imageUrl: imgLocMatch ? imgLocMatch[1].trim() : undefined,
        imageTitle: imgTitleMatch ? imgTitleMatch[1].trim() : undefined,
      };

      if (loc.includes("/problem/")) {
        existingProblems.push(entry);
      } else if (loc.includes("/startup-mode/")) {
        existingStartupMode.push(entry);
      }
    }
  }

  return { existingProblems, existingStartupMode };
}

// 2. Generate Core Entries
function generateCoreEntries(): SitemapUrlEntry[] {
  return [
    { loc: `${BASE_URL}/`, lastmod: TODAY, changefreq: "daily", priority: 1.0, title: "Stuckhere — The World's Open Problem Registry" },
    { loc: `${BASE_URL}/explore`, lastmod: TODAY, changefreq: "daily", priority: 0.95, title: "Explore Verified Industry Problems" },
    { loc: `${BASE_URL}/explore?filter=startup_mode`, lastmod: TODAY, changefreq: "daily", priority: 0.90, title: "Startup Mode: Venture Opportunities & Solutions" },
    { loc: `${BASE_URL}/methodology`, lastmod: TODAY, changefreq: "weekly", priority: 0.85, title: "Problem Verification Methodology & Pain Scoring" },
    { loc: `${BASE_URL}/guides/problem-discovery-framework`, lastmod: TODAY, changefreq: "weekly", priority: 0.85, title: "Founder Problem Discovery Guide & Framework" },
    { loc: `${BASE_URL}/open-innovation`, lastmod: TODAY, changefreq: "weekly", priority: 0.85, title: "Open Innovation & Enterprise Challenges" },
    { loc: `${BASE_URL}/solutions`, lastmod: TODAY, changefreq: "weekly", priority: 0.80, title: "Innovative Solutions & Architecture Blueprints" },
    { loc: `${BASE_URL}/companies`, lastmod: TODAY, changefreq: "weekly", priority: 0.80, title: "Enterprise & Partner Directory" },
    { loc: `${BASE_URL}/research`, lastmod: TODAY, changefreq: "weekly", priority: 0.75, title: "Industry Empirical Research & Whitepapers" },
    { loc: `${BASE_URL}/competitions`, lastmod: TODAY, changefreq: "weekly", priority: 0.75, title: "Hackathons, Bounties & Innovation Competitions" },
    { loc: `${BASE_URL}/community`, lastmod: TODAY, changefreq: "daily", priority: 0.75, title: "Community Forum & Contributor Discussions" },
    { loc: `${BASE_URL}/features`, lastmod: TODAY, changefreq: "monthly", priority: 0.75, title: "Platform Features & Builder Capabilities" },
    { loc: `${BASE_URL}/about`, lastmod: TODAY, changefreq: "monthly", priority: 0.70, title: "About Stuckhere — Mission & Team" },
    { loc: `${BASE_URL}/contact`, lastmod: TODAY, changefreq: "monthly", priority: 0.60, title: "Contact & Partnership Inquiries" },
    { loc: `${BASE_URL}/submit`, lastmod: TODAY, changefreq: "weekly", priority: 0.75, title: "Submit a Verified Problem Statement" },
    { loc: `${BASE_URL}/privacy`, lastmod: TODAY, changefreq: "yearly", priority: 0.30, title: "Privacy Policy" },
    { loc: `${BASE_URL}/terms`, lastmod: TODAY, changefreq: "yearly", priority: 0.30, title: "Terms of Service" },
    { loc: `${BASE_URL}/cookies`, lastmod: TODAY, changefreq: "yearly", priority: 0.30, title: "Cookie Policy" },
  ];
}

// 3. Generate Academy Entries (6 Courses + 105 Chapters)
function generateAcademyEntries(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [];

  // Academy Home
  entries.push({
    loc: `${BASE_URL}/learn`,
    lastmod: TODAY,
    changefreq: "daily",
    priority: 0.95,
    title: "Stuckhere Academy — Problem Discovery, Sizing, Cloud, AI & Venture Fundamentals",
    imageUrl: `${BASE_URL}/og-image.png`,
    imageTitle: "Stuckhere Academy Learning Portal",
  });

  // Course Landing Pages & Chapters
  ACADEMY_COURSES.forEach((course) => {
    const chapters = courseChapterMap[course.slug] || [];

    // Course Subject Page
    const firstDiagram = chapters.find((ch) => ch.sections?.some((s: any) => s.image?.url))?.sections?.find((s: any) => s.image?.url)?.image;
    entries.push({
      loc: `${BASE_URL}/learn/${course.slug}`,
      lastmod: TODAY,
      changefreq: "weekly",
      priority: 0.90,
      title: `Course ${course.n}: ${course.title}`,
      imageUrl: firstDiagram?.url ? `${BASE_URL}${firstDiagram.url}` : `${BASE_URL}/og-image.png`,
      imageTitle: firstDiagram?.alt || `Course ${course.n}: ${course.title}`,
    });

    // All Chapters in this course
    chapters.forEach((chapter) => {
      // Find diagram in chapter sections if any
      const sectionWithImage = chapter.sections?.find((s: any) => s.image?.url);
      const diagram = sectionWithImage?.image;

      entries.push({
        loc: `${BASE_URL}/learn/${course.slug}/${chapter.slug}`,
        lastmod: TODAY,
        changefreq: "weekly",
        priority: 0.85,
        title: `Course ${course.n} Chapter ${chapter.num}: ${chapter.title}`,
        imageUrl: diagram?.url ? `${BASE_URL}${diagram.url}` : `${BASE_URL}/og-image.png`,
        imageTitle: diagram?.alt || `Course ${course.n} Chapter ${chapter.num}: ${chapter.title}`,
      });
    });
  });

  return entries;
}

// 4. Generate Industry Entries
function generateIndustryEntries(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [
    { loc: `${BASE_URL}/industries`, lastmod: TODAY, changefreq: "daily", priority: 0.85, title: "Industry Verticals & Sector Atlases" },
  ];

  REAL_INDUSTRIES.forEach((ind) => {
    entries.push({
      loc: `${BASE_URL}/industries/${ind.slug}`,
      lastmod: TODAY,
      changefreq: "daily",
      priority: 0.80,
      title: `${ind.name} Problem Statements & Industry Opportunities`,
      imageUrl: ind.iconUrl ? ind.iconUrl : `${BASE_URL}/og-image.png`,
      imageTitle: `${ind.name} Industry Hub`,
    });
  });

  return entries;
}

// 5. Generate Companies & Research Entries
function generateCompaniesAndResearchEntries(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [
    { loc: `${BASE_URL}/companies`, lastmod: TODAY, changefreq: "weekly", priority: 0.80, title: "Enterprise & Partner Directory" },
    { loc: `${BASE_URL}/research`, lastmod: TODAY, changefreq: "weekly", priority: 0.75, title: "Empirical Problem Research & Case Studies" },
    { loc: `${BASE_URL}/competitions`, lastmod: TODAY, changefreq: "weekly", priority: 0.75, title: "Innovation Competitions & Problem Bounties" },
  ];

  REAL_COMPANIES.forEach((comp) => {
    entries.push({
      loc: `${BASE_URL}/companies?search=${encodeURIComponent(comp.name)}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.70,
      title: `${comp.name} — Industry Partner & Operations Profile`,
    });
  });

  REAL_RESEARCH.forEach((res) => {
    entries.push({
      loc: `${BASE_URL}/research?topic=${encodeURIComponent(res.category || "General")}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: 0.70,
      title: `${res.title} — Empirical Problem Dossier`,
    });
  });

  return entries;
}

// 6. Main Orchestrator
export function generateAllSitemaps() {
  console.log("Generating Comprehensive High-Performance Sitemaps for Stuckhere...");

  const { existingProblems, existingStartupMode } = extractExistingEntries();
  console.log(`Loaded ${existingProblems.length} existing problem URLs and ${existingStartupMode.length} startup-mode URLs.`);

  const coreEntries = generateCoreEntries();
  const academyEntries = generateAcademyEntries();
  const industryEntries = generateIndustryEntries();
  const companyEntries = generateCompaniesAndResearchEntries();

  // Also include problems from REAL_PROBLEMS if not already in existingProblems
  REAL_PROBLEMS.forEach((p) => {
    const slug = p.slug || p.id;
    const probLoc = `${BASE_URL}/problem/${slug}`;
    if (!existingProblems.some((e) => e.loc === probLoc)) {
      existingProblems.push({
        loc: probLoc,
        lastmod: TODAY,
        changefreq: "weekly",
        priority: 0.90,
        title: p.title,
      });
    }

    const startupLoc = `${BASE_URL}/startup-mode/${slug}`;
    if (!existingStartupMode.some((e) => e.loc === startupLoc)) {
      existingStartupMode.push({
        loc: startupLoc,
        lastmod: TODAY,
        changefreq: "weekly",
        priority: 0.85,
        title: `Build Startup: ${p.title}`,
      });
    }
  });

  console.log(`Core URLs: ${coreEntries.length}`);
  console.log(`Academy URLs: ${academyEntries.length} (6 Courses + 105 Chapters)`);
  console.log(`Industry URLs: ${industryEntries.length}`);
  console.log(`Problem URLs: ${existingProblems.length}`);
  console.log(`Startup Mode URLs: ${existingStartupMode.length}`);
  console.log(`Company & Research URLs: ${companyEntries.length}`);

  const publicDir = path.resolve(process.cwd(), "public");

  // Write Individual XML Sitemaps
  fs.writeFileSync(path.join(publicDir, "sitemap-core.xml"), renderUrlsetXml(coreEntries), "utf8");
  fs.writeFileSync(path.join(publicDir, "sitemap-academy.xml"), renderUrlsetXml(academyEntries), "utf8");
  fs.writeFileSync(path.join(publicDir, "sitemap-problems.xml"), renderUrlsetXml(existingProblems), "utf8");
  fs.writeFileSync(path.join(publicDir, "sitemap-startup-mode.xml"), renderUrlsetXml(existingStartupMode), "utf8");
  fs.writeFileSync(path.join(publicDir, "sitemap-industries.xml"), renderUrlsetXml(industryEntries), "utf8");
  fs.writeFileSync(path.join(publicDir, "sitemap-companies.xml"), renderUrlsetXml(companyEntries), "utf8");

  // Combined Master Sitemap for single-file crawlers
  const allEntries: SitemapUrlEntry[] = [
    ...coreEntries,
    ...academyEntries,
    ...existingProblems,
    ...existingStartupMode,
    ...industryEntries,
    ...companyEntries,
  ];
  fs.writeFileSync(path.join(publicDir, "sitemap-all.xml"), renderUrlsetXml(allEntries), "utf8");

  // Write Sitemap Index (public/sitemap.xml)
  const sitemapIndexList = [
    { loc: `${BASE_URL}/sitemap-core.xml`, lastmod: TODAY },
    { loc: `${BASE_URL}/sitemap-academy.xml`, lastmod: TODAY },
    { loc: `${BASE_URL}/sitemap-problems.xml`, lastmod: TODAY },
    { loc: `${BASE_URL}/sitemap-startup-mode.xml`, lastmod: TODAY },
    { loc: `${BASE_URL}/sitemap-industries.xml`, lastmod: TODAY },
    { loc: `${BASE_URL}/sitemap-companies.xml`, lastmod: TODAY },
    { loc: `${BASE_URL}/sitemap-all.xml`, lastmod: TODAY },
  ];

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), renderSitemapIndexXml(sitemapIndexList), "utf8");

  console.log(`Successfully generated all sitemaps! Total index entries: ${allEntries.length}`);
}

// Execute if run via CLI
generateAllSitemaps();
