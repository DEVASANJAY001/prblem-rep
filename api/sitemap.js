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
  {
    "id": "prob-1788075093699-xbwo",
    "title": "Autonomous Capture and De-orbiting of Non-Cooperative Micro-Debris in Low Earth Orbit (LEO)",
    "startup": false
  },
  {
    "id": "prob-7-54m9",
    "title": "Freshers Cannot Tell a Real Recruiter from a Scammer Before Paying or Sharing Documents",
    "startup": true
  },
  {
    "id": "prob-7-54xo",
    "title": "Government School Teachers Lose Teaching Time to Repeated Data Collection and Online Data Entry",
    "startup": true
  },
  {
    "id": "prob-7-553f",
    "title": "Patients and Small Pharmacies Have No Easy Way to Learn That a Medicine Batch They Hold Was Flagged Substandard",
    "startup": true
  },
  {
    "id": "prob-7-5568",
    "title": "Small and Cooperative Banks Struggle to Spot Mule Accounts That Launder Cyber-Fraud Money",
    "startup": true
  },
  {
    "id": "prob-7-5591",
    "title": "Micro and Small Suppliers Cannot Easily Track, Prove and Claim Payments Overdue Beyond the 45-Day Limit",
    "startup": true
  },
  {
    "id": "prob-7-55bs",
    "title": "Delivery and Ride Workers Cannot Verify Their Real Take-Home Pay per Hour After Waiting Time and Costs",
    "startup": true
  },
  {
    "id": "prob-7-55en",
    "title": "Small Farmers Sell Perishables Immediately at Distress Prices Because Affordable Cooling and Storage Are Out of Reach",
    "startup": true
  },
  {
    "id": "prob-7-55lb",
    "title": "Screen-Reader Users Are Locked Out of Government Services by Image-Only Documents and Image CAPTCHAs",
    "startup": true
  },
  {
    "id": "prob-7-55ob",
    "title": "Patients and Small Clinics Still Run on Handwritten Prescriptions and Lab Printouts That Never Become a Usable Health Record",
    "startup": true
  },
  {
    "id": "prob-7-dph7",
    "title": "Families Cannot Easily Find and Claim Forgotten Bank, Insurance and Investment Money Held Across Separate Portals",
    "startup": true
  },
  {
    "id": "prob-7-dqvk",
    "title": "Fishing Crews at Sea Cannot Reliably Get Cyclone Warnings They Can Act On, and Sail-or-Return Decisions Rest on Fragmented Advisories",
    "startup": true
  },
  {
    "id": "prob-7-ds1f",
    "title": "Children of Mobile Migrant Families Are Missed Again After Being Identified, Because Due Lists Do Not Follow the Family",
    "startup": true
  },
  {
    "id": "prob-7-dtbv",
    "title": "Persons With Disabilities Wait Months for a Certificate or UDID Card and Cannot See Which Stage Is Stuck or Why an Application Was Rejected",
    "startup": true
  },
  {
    "id": "prob-7-dv2n",
    "title": "Blood Collection Is Not Planned Around Transfusion Demand and Stock Data Is Unreliable, So Families Run From Bank to Bank Looking for Donors",
    "startup": true
  },
  {
    "id": "prob-7-dwre",
    "title": "People Granted Bail Stay in Jail for Want of a Surety, and the Gap Between a Bail Order and Release Is Hard to See and Act On",
    "startup": true
  },
  {
    "id": "prob-7-dyg1",
    "title": "Households Cannot Independently Check Whether a Smart Meter Bill Reflects Their Real Electricity Use",
    "startup": true
  },
  {
    "id": "prob-7-e03y",
    "title": "Low-Income Households Cannot Plan or Afford Regular LPG Refills, So Many Slip Back to Firewood",
    "startup": true
  },
  {
    "id": "prob-7-e1kw",
    "title": "Motorists Cannot Easily Tell a Genuine E-Challan From a Scam, See Everything Pending Against Their Vehicle, or Dispute a Wrong Challan Within the Deadline",
    "startup": true
  },
  {
    "id": "prob-7-e3bw",
    "title": "Households Hold or Give Away Old Electronics Without a Clear Authorised Route, and Official Recycling Figures Cannot Say How Much Is Really Recycled",
    "startup": true
  },
  {
    "id": "prob-7-jt1f",
    "title": "Pensioners Risk a Stopped Pension if Digital Life Certificate Authentication Fails or Is Missed by 30 November",
    "startup": true
  },
  {
    "id": "prob-7-jty4",
    "title": "Farmers Queue for Fertiliser at Sowing Time Because Local Stock Visibility and Distribution Do Not Match Aggregate Availability",
    "startup": true
  },
  {
    "id": "prob-7-juq4",
    "title": "Construction Workers Registered With Welfare Boards Do Not Receive the Benefits the Cess Is Meant to Fund, and Board and Central Registries Do Not Reconcile",
    "startup": true
  },
  {
    "id": "prob-7-jvng",
    "title": "Dog-Bite Victims Often Start but Do Not Complete Rabies Vaccination, and Cannot Tell Which Nearby Facility Has Vaccine and Immunoglobulin",
    "startup": true
  },
  {
    "id": "prob-7-jwmz",
    "title": "Motorists Cannot Verify the Ethanol Content of the Petrol They Buy Because Sampling Methods, Labs and Results Are Disputed and Not Recorded in One Comparable Place",
    "startup": true
  },
  {
    "id": "prob-7-jxnu",
    "title": "Public Libraries and Book-Selection Committees Have No Standard, Affordable Check for Authorship, Plagiarism and Factual Accuracy Before Buying Books in Bulk",
    "startup": true
  },
  {
    "id": "prob-7-jyt4",
    "title": "Courts and Lawyers Cannot Quickly Verify Whether Every Case Citation and Quotation in a Filing Is Real",
    "startup": true
  },
  {
    "id": "prob-7-jzya",
    "title": "Buyers Cannot See in One Place Whether a Land Parcel Has a Pending Mutation, Court Case or Loan Before They Pay",
    "startup": true
  },
  {
    "id": "prob-7-k14w",
    "title": "People Being Treated for TB Wait Months for Nutrition Support, and Delays Are Worst for Patients Notified by Private Providers",
    "startup": true
  },
  {
    "id": "prob-7-k2iw",
    "title": "Teachers Lack a Quick Way to Find Which Children Are Behind in Reading and Number Sense, So Gaps Only Show Up Years Later in Large Surveys",
    "startup": true
  },
  {
    "id": "prob-7-noc2",
    "title": "Health Insurance Claims Get Delayed or Rejected Over Document Mismatches That Policyholders Cannot Spot Before Submitting",
    "startup": true
  },
  {
    "id": "prob-7-np7v",
    "title": "Borrowers in a Cash Crunch Cannot Quickly Tell Whether a Loan App Is Genuinely Linked to a Regulated Lender",
    "startup": true
  },
  {
    "id": "prob-7-npg7",
    "title": "Small Farmers Cannot Reliably Get a Working Residue-Management Machine in the Short Window Before Wheat Sowing, and Incentives Cannot Cheaply Verify Who Did Not Burn",
    "startup": true
  },
  {
    "id": "prob-7-nprl",
    "title": "Small Employers Cannot Easily Confirm Their Internal Committee Is Legally Valid, and Employees Do Not Know Where a Workplace Harassment Complaint Will Go",
    "startup": true
  },
  {
    "id": "prob-7-nq1q",
    "title": "Rural Households Cannot See or Understand Their Drinking Water Test Results, So Contaminated Taps Go Untreated",
    "startup": true
  },
  {
    "id": "prob-7-nqcz",
    "title": "People Treated for Hypertension Drop Out of Follow-Up Because Nothing Links Reminders, Refills and Clinic Visits",
    "startup": true
  },
  {
    "id": "prob-7-nqqy",
    "title": "Migrant Workers Do Not Know Which Welfare Entitlements They Can Actually Use in the State Where They Work",
    "startup": true
  },
  {
    "id": "prob-7-nr4q",
    "title": "Consumers and Small Food Vendors Cannot See What Food-Safety Test Failures and Enforcement Actually Happened in Their State",
    "startup": true
  },
  {
    "id": "prob-7-nrji",
    "title": "Hospital Attendants and People Sleeping Rough Cannot Find a Shelter Bed They Can Actually Use Tonight",
    "startup": true
  },
  {
    "id": "prob-7-ns0i",
    "title": "Street Vendors Cannot Plan Loan Repayment and Next-Tranche Eligibility Around Irregular Daily Income",
    "startup": true
  },
  {
    "id": "prob-7-tufe",
    "title": "Lack of Verifiable Waste Traceability from Collection to Recycling in Chennai",
    "startup": false
  },
  {
    "id": "prob-7-y18w",
    "title": "Long-Haul Truck Drivers Cannot Find Out Where a Legal, Safe Night Halt Is Available Before Their Driving Hours Run Out",
    "startup": true
  },
  {
    "id": "prob-7-y2u7",
    "title": "Chennai Commuters Wait Through Long Gaps and Then See Several Buses on One Route Arrive Together, and There Is No Public Measure of How Regular Each Route Is",
    "startup": true
  },
  {
    "id": "prob-7-y73b",
    "title": "Salaried Employees Cannot Easily Check Whether Their Employer Is Depositing Every Month's PF, So Gaps Surface Only When They Change Jobs or Withdraw",
    "startup": true
  },
  {
    "id": "prob-7-ybdk",
    "title": "Engineering Teams Using AI Coding Tools Cannot See Which Pull Requests Need Deep Review, So Review Queues Stall or Changes Merge Unreviewed",
    "startup": true
  },
  {
    "id": "prob-7-yd9t",
    "title": "Students and Early Researchers Cannot Easily Tell Whether a Paper They Cite Has Been Retracted, So Withdrawn Work Keeps Spreading Through Theses, Papers and Wikipedia",
    "startup": true
  },
  {
    "id": "prob-7-yff5",
    "title": "Workers and Families in Virudhunagar's Fireworks Cluster Cannot Check Whether a Unit Is Licensed, Within Its Worker Limit and Recently Inspected Before They Take the Job",
    "startup": true
  },
  {
    "id": "prob-7-yhqr",
    "title": "Students Cannot See at Which Stage Their Scholarship Application Is Stuck, Whether the Fault Lies With the College, the Bank Mapping or the Government, or What to Do Before the Deadline",
    "startup": true
  },
  {
    "id": "prob-7-yjw1",
    "title": "Older Adults Living Alone or Far From Their Children Cannot Reliably Track Which Prescribed Medicines They Took, and No One Nearby Notices Missed Doses",
    "startup": true
  },
  {
    "id": "prob-7-ym78",
    "title": "Mobile Users Cannot Tell in the Moment Whether a Call or Text Comes From a Registered Sender, and About Half of Their Spam Complaints Turn Out Not to Be Actionable",
    "startup": true
  },
  {
    "id": "prob-7-yoe5",
    "title": "Customers With a Failed UPI or Card Payment Cannot Tell Whether Their Complaint Will Be Accepted by the RBI Ombudsman, and Most Complaints at the Central Centre Are Closed as Not Maintainable",
    "startup": true
  },
  {
    "id": "prob-7-zou5",
    "title": "Small Businesses Have No Practical Way to Map Their Personal Data and Prepare Consent Notices Before India's May 2027 DPDP Deadline",
    "startup": true
  },
  {
    "id": "prob-7-zp32",
    "title": "Graduates Are Asked for Proof of Applied Skills but Have No Trusted Way to Show Their Work or Get Feedback on It",
    "startup": true
  },
  {
    "id": "prob-7-zp8l",
    "title": "Households Applying for Rooftop Solar Subsidy Cannot Track Each Approval Step or Check Their Vendor Before Loan Money Moves",
    "startup": true
  },
  {
    "id": "prob-7-zpex",
    "title": "Older Adults Under a Live 'Digital Arrest' Call Are Isolated, So Neither Family Nor Bank Gets a Chance to Intervene Before Money Moves",
    "startup": true
  },
  {
    "id": "prob-7-zpmx",
    "title": "Residents Who Report Dust and Pollution Violations Cannot See Whether Anyone Acted, and Closures Cannot Be Verified",
    "startup": true
  },
  {
    "id": "prob-7-zptw",
    "title": "EV Drivers Cannot Tell Before They Arrive Whether a Public Charger Actually Works",
    "startup": true
  },
  {
    "id": "prob-7-zq2x",
    "title": "Students Cannot Easily Find, Trust or Navigate the Mental Health Support Their Campus Says It Offers",
    "startup": true
  },
  {
    "id": "prob-7-zqc1",
    "title": "Tenants and Landlords Cannot Prove a Home's Condition or Know Which Deposit Rules Apply, So Refunds End in Disputes",
    "startup": true
  },
  {
    "id": "prob-7-zqlh",
    "title": "Small Teams Install New Open-Source Package Versions With No Vetting Layer, So One Poisoned Release Runs on Their Machines Before Anyone Can Review It",
    "startup": true
  },
  {
    "id": "prob-7-zqwy",
    "title": "Ambulance Delays Cannot Be Traced to Their Cause Because Call, Dispatch, Travel and Hospital-Handover Times Are Not Analysed Together",
    "startup": true
  }
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
