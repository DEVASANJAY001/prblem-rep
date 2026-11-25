import { ProblemDoc, IndustryDoc } from "@/types";
import { getProblemSlug } from "./seoUrls";
import { REAL_INDUSTRIES } from "@/data/realProductionData";
import { ACADEMY_COURSES, getCourseChapters } from "@/data/academyData";

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  title?: string;
  imageUrl?: string;
  imageTitle?: string;
}

const escapeXml = (unsafe: string) =>
  String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/**
 * Builds a valid XML sitemap string dynamically from approved problems, industries, and academy courses
 * Compliant with Google Search Sitemaps protocol (0.9) and Google Image extensions.
 */
export function buildSitemapXml(
  problems: ProblemDoc[] = [],
  industries: IndustryDoc[] = REAL_INDUSTRIES,
  baseUrl: string = "https://stuckhere.davns.com"
): string {
  const today = new Date().toISOString().slice(0, 10);

  // Static core routes & Stuckhere Academy Root
  const entries: SitemapUrlEntry[] = [
    { loc: `${baseUrl}/`, lastmod: today, changefreq: "daily", priority: 1.0, title: "Stuckhere — The World's Open Problem Registry" },
    { loc: `${baseUrl}/explore`, lastmod: today, changefreq: "daily", priority: 0.95, title: "Explore Verified Industry Problems" },
    { loc: `${baseUrl}/explore?filter=startup_mode`, lastmod: today, changefreq: "daily", priority: 0.9, title: "Startup Mode: Venture Opportunities & Solutions" },
    { loc: `${baseUrl}/learn`, lastmod: today, changefreq: "daily", priority: 0.95, title: "Stuckhere Academy — Learning Portal" },
    { loc: `${baseUrl}/methodology`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Problem Verification Methodology & Pain Scoring" },
    { loc: `${baseUrl}/guides/problem-discovery-framework`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Founder Problem Discovery Guide & Framework" },
    { loc: `${baseUrl}/open-innovation`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Open Innovation & Enterprise Challenges" },
    { loc: `${baseUrl}/industries`, lastmod: today, changefreq: "daily", priority: 0.85, title: "Industry Verticals Atlas" },
    { loc: `${baseUrl}/community`, lastmod: today, changefreq: "daily", priority: 0.75, title: "Community Discussions & Leaderboards" },
    { loc: `${baseUrl}/submit`, lastmod: today, changefreq: "weekly", priority: 0.75, title: "Submit a Problem Statement" },
    { loc: `${baseUrl}/solutions`, lastmod: today, changefreq: "weekly", priority: 0.8, title: "Solutions & Blueprints Directory" },
    { loc: `${baseUrl}/companies`, lastmod: today, changefreq: "weekly", priority: 0.8, title: "Enterprise & Partner Directory" },
    { loc: `${baseUrl}/research`, lastmod: today, changefreq: "weekly", priority: 0.75, title: "Industry Empirical Research" },
    { loc: `${baseUrl}/features`, lastmod: today, changefreq: "monthly", priority: 0.75, title: "Features & Builder Capabilities" },
    { loc: `${baseUrl}/competitions`, lastmod: today, changefreq: "weekly", priority: 0.75, title: "Competitions & Bounties" },
    { loc: `${baseUrl}/about`, lastmod: today, changefreq: "monthly", priority: 0.7, title: "About Stuckhere" },
    { loc: `${baseUrl}/contact`, lastmod: today, changefreq: "monthly", priority: 0.6, title: "Contact Us" },
    { loc: `${baseUrl}/privacy`, lastmod: today, changefreq: "yearly", priority: 0.3, title: "Privacy Policy" },
    { loc: `${baseUrl}/terms`, lastmod: today, changefreq: "yearly", priority: 0.3, title: "Terms of Service" },
    { loc: `${baseUrl}/cookies`, lastmod: today, changefreq: "yearly", priority: 0.3, title: "Cookie Policy" },
  ];

  // All 6 Stuckhere Academy Courses and All 105 Subtopics / Chapters
  ACADEMY_COURSES.forEach((course) => {
    const chapters = getCourseChapters(course.slug);

    // Course Subject Landing Page
    entries.push({
      loc: `${baseUrl}/learn/${course.slug}`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.90,
      title: `Course ${course.n}: ${course.title}`,
    });

    // All Chapter Reader Pages for this Course
    chapters.forEach((chapter) => {
      const diagram = chapter.sections?.find((s) => s.image?.url)?.image;
      entries.push({
        loc: `${baseUrl}/learn/${course.slug}/${chapter.slug}`,
        lastmod: today,
        changefreq: "weekly",
        priority: 0.85,
        title: `Course ${course.n} Chapter ${chapter.num}: ${chapter.title}`,
        imageUrl: diagram?.url ? `${baseUrl}${diagram.url}` : undefined,
        imageTitle: diagram?.alt || `Course ${course.n} Chapter ${chapter.num}: ${chapter.title}`,
      });
    });
  });

  // Dynamic industry vertical landing pages
  industries.forEach((ind) => {
    entries.push({
      loc: `${baseUrl}/industries/${ind.slug}`,
      lastmod: today,
      changefreq: "daily",
      priority: 0.8,
      title: `${ind.name} Industry Problems`,
    });
  });

  // Dynamic approved problems (Semantic Amazon-Style URLs)
  problems
    .filter((p) => p.status === "approved" || p.status === "open" || !p.status)
    .forEach((p) => {
      const slug = getProblemSlug(p);
      const date = p.updatedAt
        ? new Date(p.updatedAt).toISOString().slice(0, 10)
        : p.submittedAt
        ? new Date(p.submittedAt).toISOString().slice(0, 10)
        : today;

      // Problem Detail Page
      entries.push({
        loc: `${baseUrl}/problem/${slug}`,
        lastmod: date,
        changefreq: "weekly",
        priority: 0.9,
        title: p.title,
      });

      // Startup Mode Page (if enabled)
      const hasStartup =
        p.hasStartupMode !== false &&
        p.startupModeEnabled !== false &&
        (p.startupModeConfig?.enabled !== false);

      if (hasStartup) {
        entries.push({
          loc: `${baseUrl}/startup-mode/${slug}`,
          lastmod: date,
          changefreq: "weekly",
          priority: 0.85,
          title: `Build Startup: ${p.title}`,
        });
      }
    });

  const xmlEntries = entries
    .map((e) => {
      let imageBlock = "";
      if (e.imageUrl) {
        imageBlock = `\n    <image:image>\n      <image:loc>${escapeXml(e.imageUrl)}</image:loc>\n      <image:title>${escapeXml(e.imageTitle || e.title || "")}</image:title>\n    </image:image>`;
      } else if (e.title) {
        imageBlock = `\n    <image:image>\n      <image:loc>${baseUrl}/og-image.png</image:loc>\n      <image:title>${escapeXml(e.title)}</image:title>\n    </image:image>`;
      }

      return `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod || today}</lastmod>
    <changefreq>${e.changefreq || "weekly"}</changefreq>
    <priority>${e.priority?.toFixed(2) || "0.80"}</priority>${imageBlock}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlEntries}
</urlset>`;
}

/**
 * Builds standard Google Search Console Sitemap Index XML string
 */
export function buildSitemapIndexXml(
  sitemaps: string[] = [
    "sitemap-core.xml",
    "sitemap-academy.xml",
    "sitemap-problems.xml",
    "sitemap-startup-mode.xml",
    "sitemap-industries.xml",
    "sitemap-companies.xml",
    "sitemap-all.xml",
  ],
  baseUrl: string = "https://stuckhere.davns.com"
): string {
  const today = new Date().toISOString().slice(0, 10);
  const entries = sitemaps
    .map(
      (s) => `  <sitemap>
    <loc>${baseUrl}/${s.replace(/^\//, "")}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}
