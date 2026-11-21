import { ProblemDoc, IndustryDoc } from "@/types";
import { getProblemSlug } from "./seoUrls";
import { REAL_INDUSTRIES } from "@/data/realProductionData";

export interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  title?: string;
}

/**
 * Builds a valid XML sitemap string dynamically from approved problems and industries
 * Compliant with Google Search Sitemaps protocol and Google Image extensions.
 */
export function buildSitemapXml(
  problems: ProblemDoc[] = [],
  industries: IndustryDoc[] = REAL_INDUSTRIES,
  baseUrl: string = "https://stuckhere.davns.com"
): string {
  const today = new Date().toISOString().slice(0, 10);

  // Static core routes & Stuckhere Academy
  const entries: SitemapUrlEntry[] = [
    { loc: `${baseUrl}/`, lastmod: today, changefreq: "daily", priority: 1.0 },
    { loc: `${baseUrl}/explore`, lastmod: today, changefreq: "daily", priority: 0.95 },
    { loc: `${baseUrl}/explore?filter=startup_mode`, lastmod: today, changefreq: "daily", priority: 0.9 },
    { loc: `${baseUrl}/learn`, lastmod: today, changefreq: "daily", priority: 0.95 },
    { loc: `${baseUrl}/methodology`, lastmod: today, changefreq: "weekly", priority: 0.85 },
    { loc: `${baseUrl}/guides/problem-discovery-framework`, lastmod: today, changefreq: "weekly", priority: 0.85 },
    { loc: `${baseUrl}/open-innovation`, lastmod: today, changefreq: "weekly", priority: 0.85 },
    { loc: `${baseUrl}/industries`, lastmod: today, changefreq: "daily", priority: 0.85 },
    { loc: `${baseUrl}/community`, lastmod: today, changefreq: "daily", priority: 0.85 },
    { loc: `${baseUrl}/submit`, lastmod: today, changefreq: "weekly", priority: 0.85 },
    { loc: `${baseUrl}/solutions`, lastmod: today, changefreq: "weekly", priority: 0.8 },
    { loc: `${baseUrl}/companies`, lastmod: today, changefreq: "weekly", priority: 0.8 },
    { loc: `${baseUrl}/research`, lastmod: today, changefreq: "weekly", priority: 0.75 },
    { loc: `${baseUrl}/features`, lastmod: today, changefreq: "monthly", priority: 0.75 },
    { loc: `${baseUrl}/competitions`, lastmod: today, changefreq: "weekly", priority: 0.75 },
    { loc: `${baseUrl}/about`, lastmod: today, changefreq: "monthly", priority: 0.7 },
    { loc: `${baseUrl}/contact`, lastmod: today, changefreq: "monthly", priority: 0.6 },
    { loc: `${baseUrl}/privacy`, lastmod: today, changefreq: "yearly", priority: 0.3 },
    { loc: `${baseUrl}/terms`, lastmod: today, changefreq: "yearly", priority: 0.3 },
    { loc: `${baseUrl}/cookies`, lastmod: today, changefreq: "yearly", priority: 0.3 },

    // Course 1: Problem Discovery & Validation (15 Chapters)
    { loc: `${baseUrl}/learn/problem-discovery-and-validation`, lastmod: today, changefreq: "weekly", priority: 0.90, title: "Course 1: Problem Discovery & Validation" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/course-overview`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Course Overview" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/what-is-a-problem`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Foundations: What Is a Problem?" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/why-startups-fail`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Why Startups Fail at the Problem Stage" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/vitamin-painkiller-surgery`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Vitamin, Painkiller, Surgery" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/where-to-find-problems`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Where to Find Real Problems" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/customer-discovery-interviews`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Customer Discovery Interviews" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/the-problem-dossier`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "The Problem Dossier" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/measuring-pain`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Measuring Pain" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/validation-signals`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Validation: Evidence and Signals" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/workarounds-and-competitors`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Workarounds and Competitor Analysis" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/sizing-the-opportunity`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Sizing the Opportunity" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/solution-hypothesis`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Problem to Solution Hypothesis" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/bias-ethics-and-mistakes`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Bias, Ethics and Common Mistakes" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/capstone-project`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Capstone Project: Problem Dossier" },
    { loc: `${baseUrl}/learn/problem-discovery-and-validation/appendices`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Appendices and Templates" },

    // Course 2: Market Sizing & Opportunity Analysis (18 Chapters)
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity`, lastmod: today, changefreq: "weekly", priority: 0.90, title: "Course 2: Market Sizing & Opportunity Analysis" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/course-overview`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Course Overview: How Big Is the Problem?" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/why-market-sizing-matters`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Why Market Sizing Matters" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/core-vocabulary`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Core Vocabulary: TAM, SAM, SOM Demystified" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/three-ways-to-size-a-market`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Three Ways to Size a Market" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/defining-who-is-in-the-market`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Defining Who Is in the Market" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/counting-customers`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Counting Customers: Data Sources" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/pricing-and-willingness-to-pay`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Pricing and Willingness to Pay" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/usage-frequency-and-revenue-per-customer`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Usage, Frequency and Revenue per Customer" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/bottom-up-tam-step-by-step`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Bottom-Up TAM: Step by Step" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/growth-trends-and-timing`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Growth, Trends and Timing" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/obtainable-market-and-go-to-market`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Obtainable Market (SOM)" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/unit-economics`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Unit Economics: CAC, LTV and Break-Even" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/sanity-checks-ranges-and-sensitivity`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Sanity Checks, Ranges and Sensitivity" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/sizing-in-india-and-emerging-markets`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Sizing in India and Emerging Markets" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/communicating-the-opportunity`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Communicating the Opportunity: One-Pager" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/common-mistakes-and-honest-practice`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Common Mistakes and Honest Practice" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/capstone-project`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Capstone Project: Market Sizing Dossier" },
    { loc: `${baseUrl}/learn/market-sizing-and-opportunity/appendices-and-formula-cheat-sheet`, lastmod: today, changefreq: "weekly", priority: 0.85, title: "Appendices, Formulas and Glossary" },
  ];

  // Dynamic industry vertical landing pages
  industries.forEach((ind) => {
    entries.push({
      loc: `${baseUrl}/industries/${ind.slug}`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.8,
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

  const escapeXml = (unsafe: string) =>
    String(unsafe || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const xmlEntries = entries
    .map((e) => {
      const imageBlock = e.title
        ? `\n    <image:image>\n      <image:loc>${baseUrl}/og-image.png</image:loc>\n      <image:title>${escapeXml(e.title)}</image:title>\n    </image:image>`
        : "";

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
