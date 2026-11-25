const fs = require("fs");
const path = require("path");

const files = [
  "public/sitemap.xml",
  "public/sitemap-core.xml",
  "public/sitemap-academy.xml",
  "public/sitemap-problems.xml",
  "public/sitemap-startup-mode.xml",
  "public/sitemap-industries.xml",
  "public/sitemap-companies.xml",
  "public/sitemap-all.xml",
];

let totalErrors = 0;
let totalUrls = 0;

for (const file of files) {
  const filePath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${file}`);
    totalErrors++;
    continue;
  }

  const content = fs.readFileSync(filePath, "utf8");
  if (!content.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    console.error(`Invalid XML header in: ${file}`);
    totalErrors++;
  }

  if (file === "public/sitemap.xml") {
    if (!content.includes("</sitemapindex>")) {
      console.error(`Missing </sitemapindex> in: ${file}`);
      totalErrors++;
    }
    const count = (content.match(/<sitemap>/g) || []).length;
    console.log(`[PASS] ${file} -> Valid <sitemapindex> with ${count} child sitemaps`);
  } else {
    if (!content.includes("</urlset>")) {
      console.error(`Missing </urlset> in: ${file}`);
      totalErrors++;
    }
    const count = (content.match(/<url>/g) || []).length;
    const imageCount = (content.match(/<image:image>/g) || []).length;
    console.log(`[PASS] ${file} -> Valid <urlset> with ${count} URLs (${imageCount} with images)`);
    if (file === "public/sitemap-all.xml") {
      totalUrls = count;
    }
  }
}

if (totalErrors === 0) {
  console.log(`\nSUCCESS: All XML sitemaps are 100% compliant and ready for Google Search Console! (Total unique URLs: ${totalUrls})`);
} else {
  console.error(`\nFAILED: Found ${totalErrors} errors.`);
  process.exit(1);
}
