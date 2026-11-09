// Vercel Serverless Function: Dynamic XML Sitemap from Firebase Firestore
// Serves live approved problem statements, startup venture blueprints, industry verticals, and core hubs.

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

function getDuplicateSuffix(index) {
  if (index < 0) return "";
  let suffix = "";
  let n = index;
  while (n >= 0) {
    suffix = String.fromCharCode(97 + (n % 26)) + suffix;
    n = Math.floor(n / 26) - 1;
  }
  return suffix;
}

const sitemapSlugRegistry = new Map();

function getProblemSlug(id, title, slug) {
  if (slug) {
    const clean = slug.includes("--") ? slug.split("--")[0] : slug;
    return slugify(clean);
  }
  if (!title) return id ? slugify(id) : "problem-statement";
  const base = slugify(title);
  if (!id) return base;

  let ids = sitemapSlugRegistry.get(base);
  if (!ids) {
    ids = [id];
    sitemapSlugRegistry.set(base, ids);
  } else if (!ids.includes(id)) {
    ids.push(id);
  }

  const idx = ids.indexOf(id);
  if (idx <= 0) return base;
  return `${base}-${getDuplicateSuffix(idx - 1)}`;
}

function escapeXml(unsafe) {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Resilient Fallback Data (Guarantees Googlebot always receives 100% complete sitemap even during Firestore cold-starts)
const FALLBACK_PROBLEMS = [
  { id: "prob-1788075093699-xbwo", title: "Autonomous Capture and De-orbiting of Non-Cooperative Micro-Debris in Low Earth Orbit (LEO)", startup: false },
  { id: "prob-7-54m9", title: "Freshers Cannot Tell a Real Recruiter from a Scammer Before Paying or Sharing Documents", startup: true },
  { id: "prob-7-54xo", title: "Government School Teachers Lose Teaching Time to Repeated Data Collection and Online Data Entry", startup: true },
  { id: "prob-7-553f", title: "Patients and Small Pharmacies Have No Easy Way to Learn That a Medicine Batch They Hold Was Flagged Substandard", startup: true },
  { id: "prob-7-5568", title: "Small and Cooperative Banks Struggle to Spot Mule Accounts That Launder Cyber-Fraud Money", startup: true },
  { id: "prob-7-5591", title: "Micro and Small Suppliers Cannot Easily Track, Prove and Claim Payments Overdue Beyond the 45-Day Limit", startup: true },
  { id: "prob-7-55bs", title: "Delivery and Ride Workers Cannot Verify Their Real Take-Home Pay per Hour After Waiting Time and Costs", startup: true },
  { id: "prob-7-55en", title: "Small Farmers Sell Perishables Immediately at Distress Prices Because Affordable Cooling and Storage Are Out of Reach", startup: true },
  { id: "prob-7-55lb", title: "Screen-Reader Users Are Locked Out of Government Services by Image-Only Documents and Image CAPTCHAs", startup: true },
  { id: "prob-7-55ob", title: "Patients and Small Clinics Still Run on Handwritten Prescriptions and Lab Printouts That Never Become a Usable Health Record", startup: true },
  { id: "prob-7-tufe", title: "Lack of Verifiable Waste Traceability from Collection to Recycling in Chennai", startup: false },
  { id: "prob-7-zou5", title: "Small Businesses Have No Practical Way to Map Their Personal Data and Prepare Consent Notices Before India's May 2027 DPDP Deadline", startup: true },
  { id: "prob-7-zp32", title: "Graduates Are Asked for Proof of Applied Skills but Have No Trusted Way to Show Their Work or Get Feedback on It", startup: true },
  { id: "prob-7-zp8l", title: "Households Applying for Rooftop Solar Subsidy Cannot Track Each Approval Step or Check Their Vendor Before Loan Money Moves", startup: true },
  { id: "prob-7-zpex", title: "Older Adults Under a Live 'Digital Arrest' Call Are Isolated, So Neither Family Nor Bank Gets a Chance to Intervene Before Money Moves", startup: true },
  { id: "prob-7-zpmx", title: "Residents Who Report Dust and Pollution Violations Cannot See Whether Anyone Acted, and Closures Cannot Be Verified", startup: true },
  { id: "prob-7-zptw", title: "EV Drivers Cannot Tell Before They Arrive Whether a Public Charger Actually Works", startup: true },
  { id: "prob-7-zq2x", title: "Students Cannot Easily Find, Trust or Navigate the Mental Health Support Their Campus Says It Offers", startup: true },
  { id: "prob-7-zqc1", title: "Tenants and Landlords Cannot Prove a Home's Condition or Know Which Deposit Rules Apply, So Refunds End in Disputes", startup: true },
  { id: "prob-7-zqlh", title: "Small Teams Install New Open-Source Package Versions With No Vetting Layer, So One Poisoned Release Runs on Their Machines Before Anyone Can Review It", startup: true },
  { id: "prob-7-zqwy", title: "Ambulance Delays Cannot Be Traced to Their Cause Because Call, Dispatch, Travel and Hospital-Handover Times Are Not Analysed Together", startup: true }
];

const FALLBACK_INDUSTRIES = [
  "healthcare", "ai", "clean-energy", "fintech", "agriculture", "logistics",
  "manufacturing", "biotech", "supply-chain", "cybersecurity", "education",
  "construction", "aerospace", "robotics", "defense", "quantum-computing",
  "legaltech", "ecommerce", "mobility", "web3", "food-security", "cleantech",
  "machine-learning", "defi"
];

export default async function handler(req, res) {
  const BASE_URL = "https://stuckhere.davns.com";
  const today = new Date().toISOString().split("T")[0];

  // 1. Core Static Platform Hubs
  const staticPages = [
    { path: "/", priority: "1.00", changefreq: "daily" },
    { path: "/explore", priority: "0.95", changefreq: "daily" },
    { path: "/explore?filter=startup_mode", priority: "0.90", changefreq: "daily" },
    { path: "/industries", priority: "0.85", changefreq: "daily" },
    { path: "/community", priority: "0.85", changefreq: "daily" },
    { path: "/submit", priority: "0.85", changefreq: "weekly" },
    { path: "/solutions", priority: "0.80", changefreq: "weekly" },
    { path: "/companies", priority: "0.80", changefreq: "weekly" },
    { path: "/research", priority: "0.75", changefreq: "weekly" },
    { path: "/features", priority: "0.75", changefreq: "monthly" },
    { path: "/competitions", priority: "0.75", changefreq: "weekly" },
    { path: "/about", priority: "0.70", changefreq: "monthly" },
    { path: "/contact", priority: "0.60", changefreq: "monthly" },
    { path: "/privacy", priority: "0.30", changefreq: "yearly" },
    { path: "/terms", priority: "0.30", changefreq: "yearly" },
    { path: "/cookies", priority: "0.30", changefreq: "yearly" },
  ];

  let problemUrls = [];
  let startupUrls = [];
  let industryUrls = [];

  // 2. Fetch Live Problems from Firestore with 6-second timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const probRes = await fetch(
      "https://firestore.googleapis.com/v1/projects/prblms-881bb/databases/(default)/documents/problems?pageSize=500",
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (probRes.ok) {
      const probData = await probRes.json();
      const docs = probData.documents || [];

      for (const doc of docs) {
        const id = doc.name.split("/").pop();
        const fields = doc.fields || {};
        const title = fields.title?.stringValue || "";
        const status = fields.status?.stringValue || "approved";

        // Only index approved/published or open problems
        if (status !== "approved" && status !== "open") {
          continue;
        }

        const slug = getProblemSlug(id, title, fields.slug?.stringValue);
        let lastMod = today;
        if (fields.updatedAt?.stringValue) {
          lastMod = fields.updatedAt.stringValue.split("T")[0];
        } else if (fields.updatedAtServer?.timestampValue) {
          lastMod = fields.updatedAtServer.timestampValue.split("T")[0];
        } else if (fields.createdAt?.stringValue) {
          lastMod = fields.createdAt.stringValue.split("T")[0];
        }

        // Verified Problem Statement Dossier URL
        problemUrls.push({
          loc: `${BASE_URL}/problem/${slug}`,
          title: title,
          lastmod: lastMod,
          changefreq: "weekly",
          priority: "0.90",
        });

        // Startup Mode Venture Blueprint URL (if enabled)
        const hasStartup =
          fields.hasStartupMode?.booleanValue ??
          fields.startupModeEnabled?.booleanValue ??
          (fields.startupModeConfig?.mapValue?.fields?.enabled?.booleanValue ?? false);

        if (hasStartup) {
          startupUrls.push({
            loc: `${BASE_URL}/startup-mode/${slug}`,
            title: `Build Startup: ${title}`,
            lastmod: lastMod,
            changefreq: "weekly",
            priority: "0.85",
          });
        }
      }
    }
  } catch (err) {
    console.warn("Firestore problems fetch failed, using fallback catalog:", err.message);
  }

  // Fallback if Firestore returned 0 problems
  if (problemUrls.length === 0) {
    FALLBACK_PROBLEMS.forEach((p) => {
      const slug = getProblemSlug(p.id, p.title, p.slug);
      problemUrls.push({
        loc: `${BASE_URL}/problem/${slug}`,
        title: p.title,
        lastmod: today,
        changefreq: "weekly",
        priority: "0.90",
      });
      if (p.startup) {
        startupUrls.push({
          loc: `${BASE_URL}/startup-mode/${slug}`,
          title: `Build Startup: ${p.title}`,
          lastmod: today,
          changefreq: "weekly",
          priority: "0.85",
        });
      }
    });
  }

  // 3. Fetch Live Industry Verticals from Firestore
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const indRes = await fetch(
      "https://firestore.googleapis.com/v1/projects/prblms-881bb/databases/(default)/documents/industries?pageSize=100",
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

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
            priority: "0.80",
          });
        }
      }
    }
  } catch (err) {
    console.warn("Firestore industries fetch failed, using fallback taxonomy:", err.message);
  }

  // Fallback if Firestore returned 0 industries
  if (industryUrls.length === 0) {
    FALLBACK_INDUSTRIES.forEach((slug) => {
      industryUrls.push({
        loc: `${BASE_URL}/industries/${slug}`,
        lastmod: today,
        changefreq: "weekly",
        priority: "0.80",
      });
    });
  }

  // 4. Assemble Rich Sitemap XML with Google Image Search Extensions
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Core Static Platform Hubs -->
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

  <!-- Verified Problem Statement Dossiers (${problemUrls.length} Live Documents) -->
${problemUrls
  .map(
    (p) => `  <url>
    <loc>${escapeXml(p.loc)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <image:image>
      <image:loc>${BASE_URL}/og-image.png</image:loc>
      <image:title>${escapeXml(p.title)}</image:title>
    </image:image>
  </url>`
  )
  .join("\n")}

  <!-- Startup Mode Venture Blueprints (${startupUrls.length} Live Workspaces) -->
${startupUrls
  .map(
    (s) => `  <url>
    <loc>${escapeXml(s.loc)}</loc>
    <lastmod>${s.lastmod}</lastmod>
    <changefreq>${s.changefreq}</changefreq>
    <priority>${s.priority}</priority>
    <image:image>
      <image:loc>${BASE_URL}/og-image.png</image:loc>
      <image:title>${escapeXml(s.title)}</image:title>
    </image:image>
  </url>`
  )
  .join("\n")}

  <!-- Industry Taxonomy Verticals (${industryUrls.length} Sectors) -->
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
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Cache in Vercel Edge for 1 hour, serve stale up to 24 hours while revalidating in background
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(xml);
}
