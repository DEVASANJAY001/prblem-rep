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

  // Static core routes
  const entries: SitemapUrlEntry[] = [
    { loc: `${baseUrl}/`, lastmod: today, changefreq: "daily", priority: 1.0 },
    { loc: `${baseUrl}/explore`, lastmod: today, changefreq: "daily", priority: 0.95 },
    { loc: `${baseUrl}/explore?filter=startup_mode`, lastmod: today, changefreq: "daily", priority: 0.9 },
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
