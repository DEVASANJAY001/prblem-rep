// Vercel Serverless Function: Dynamic Sitemap from Firebase Firestore
// Only approved/published problems and public industries are included.

function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isUuidLike(text) {
  if (!text) return false;
  return (
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}/i.test(text) ||
    (text.length > 25 && text.includes("-"))
  );
}

function getProblemSlug(id, title) {
  const cleanSlug = title ? slugify(title) : "";
  if (isUuidLike(id)) {
    return cleanSlug || "problem-statement";
  }
  if (cleanSlug && id) {
    return `${cleanSlug}--${id}`;
  }
  return cleanSlug || id || "problem-statement";
}

function escapeXml(unsafe) {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default async function handler(req, res) {
  const BASE_URL = "https://stuckhere.davns.com";
  const today = new Date().toISOString().split("T")[0];

  // Core Static Platform Pages
  const staticPages = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/explore", priority: "0.9", changefreq: "daily" },
    { path: "/industries", priority: "0.8", changefreq: "weekly" },
    { path: "/community", priority: "0.8", changefreq: "daily" },
    { path: "/companies", priority: "0.8", changefreq: "weekly" },
    { path: "/research", priority: "0.8", changefreq: "weekly" },
    { path: "/solutions", priority: "0.7", changefreq: "weekly" },
    { path: "/features", priority: "0.7", changefreq: "monthly" },
    { path: "/about", priority: "0.6", changefreq: "monthly" },
    { path: "/contact", priority: "0.5", changefreq: "monthly" },
    { path: "/terms", priority: "0.3", changefreq: "yearly" },
    { path: "/privacy", priority: "0.3", changefreq: "yearly" },
    { path: "/cookies", priority: "0.3", changefreq: "yearly" },
  ];

  let problemUrls = [];
  let industryUrls = [];

  try {
    // 1. Fetch Problems from Firestore (up to 300 latest)
    const probRes = await fetch(
      "https://firestore.googleapis.com/v1/projects/prblms-881bb/databases/(default)/documents/problems?pageSize=300"
    );
    if (probRes.ok) {
      const probData = await probRes.json();
      const docs = probData.documents || [];

      for (const doc of docs) {
        const id = doc.name.split("/").pop();
        const fields = doc.fields || {};
        const title = fields.title?.stringValue || "";
        const status = fields.status?.stringValue || "approved";

        // CRITICAL: Only include approved / open problems that admin has verified & published
        if (status !== "approved" && status !== "open") {
          continue;
        }

        const slug = getProblemSlug(id, title);
        let lastMod = today;
        if (fields.updatedAt?.stringValue) {
          lastMod = fields.updatedAt.stringValue.split("T")[0];
        } else if (fields.createdAt?.stringValue) {
          lastMod = fields.createdAt.stringValue.split("T")[0];
        }

        problemUrls.push({
          loc: `${BASE_URL}/problem/${slug}`,
          lastmod: lastMod,
          changefreq: "weekly",
          priority: "0.85",
        });
      }
    }
  } catch (err) {
    console.error("Error fetching problems for sitemap:", err);
  }

  try {
    // 2. Fetch Industries from Firestore
    const indRes = await fetch(
      "https://firestore.googleapis.com/v1/projects/prblms-881bb/databases/(default)/documents/industries?pageSize=100"
    );
    if (indRes.ok) {
      const indData = await indRes.json();
      const docs = indData.documents || [];

      for (const doc of docs) {
        const fields = doc.fields || {};
        const slug = fields.slug?.stringValue || doc.name.split("/").pop();
        if (slug) {
          industryUrls.push({
            loc: `${BASE_URL}/industries/${slug}`,
            lastmod: today,
            changefreq: "weekly",
            priority: "0.75",
          });
        }
      }
    }
  } catch (err) {
    console.error("Error fetching industries for sitemap:", err);
  }

  // 3. Assemble complete XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
${staticPages
  .map(
    (p) => `  <url>
    <loc>${escapeXml(BASE_URL + p.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}

  <!-- Verified & Published Problems (Dynamic from Firebase) -->
${problemUrls
  .map(
    (p) => `  <url>
    <loc>${escapeXml(p.loc)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}

  <!-- Industry Directory Hubs (Dynamic from Firebase) -->
${industryUrls
  .map(
    (ind) => `  <url>
    <loc>${escapeXml(ind.loc)}</loc>
    <lastmod>${ind.lastmod}</lastmod>
    <changefreq>${ind.changefreq}</changefreq>
    <priority>${ind.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  // Cache in Vercel Edge for 1 hour, serve stale up to 2 hours while revalidating
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=7200");
  res.status(200).send(xml);
}
