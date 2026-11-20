import React, { useState } from "react";

export const KNOWN_BRAND_LOGOS: Record<string, string> = {
  "google": "https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png",
  "microsoft": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "apple": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "amazon": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "meta": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  "oracle": "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
  "nvidia": "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
  "adobe": "https://upload.wikimedia.org/wikipedia/commons/5/51/Adobe_Corporate_logo.svg",
  "intel": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282020%29.svg",
  "amd": "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
  "openai": "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
  "tesla": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  "ibm": "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "salesforce": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
  "netflix": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "spotify": "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  "uber": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
};

export const BRAND_PALETTES: Record<string, { bg: string; text: string; iconText: string }> = {
  "google": { bg: "bg-white", text: "text-blue-600", iconText: "G" },
  "cerner": { bg: "bg-[#0B4F6C]", text: "text-white", iconText: "C" },
  "epic": { bg: "bg-[#BE1E2D]", text: "text-white", iconText: "E" },
  "athena": { bg: "bg-[#5B2C6F]", text: "text-white", iconText: "A" },
  "teladoc": { bg: "bg-[#00A3E0]", text: "text-white", iconText: "T" },
  "novartis": { bg: "bg-[#E55525]", text: "text-white", iconText: "N" },
  "stripe": { bg: "bg-[#635BFF]", text: "text-white", iconText: "S" },
  "fintech": { bg: "bg-[#635BFF]", text: "text-white", iconText: "F" },
  "urban": { bg: "bg-[#D97706]", text: "text-white", iconText: "U" },
  "nvidia": { bg: "bg-[#76B900]", text: "text-white", iconText: "N" },
  "adobe": { bg: "bg-[#FA0F00]", text: "text-white", iconText: "A" },
  "intel": { bg: "bg-[#0068B5]", text: "text-white", iconText: "I" },
  "amd": { bg: "bg-[#ED1C24]", text: "text-white", iconText: "A" },
  "openai": { bg: "bg-[#10A37F]", text: "text-white", iconText: "O" },
  "tesla": { bg: "bg-[#E82127]", text: "text-white", iconText: "T" },
  "microsoft": { bg: "bg-[#00A4EF]", text: "text-white", iconText: "M" },
  "apple": { bg: "bg-black", text: "text-white", iconText: "A" },
  "amazon": { bg: "bg-[#FF9900]", text: "text-white", iconText: "A" },
};

/**
 * Normalizes raw or scraped logo links into direct image assets.
 */
export function normalizeLogoUrl(url: string = ""): string {
  if (!url) return "";
  const clean = url.trim();

  // 1. Wikipedia / Wikimedia File URL -> Direct Special:FilePath asset
  const wikiFileMatch = clean.match(/https?:\/\/[a-z0-9-.]*wik(?:ipedia|imedia)\.org\/wiki\/File:([^#?&]+)/i);
  if (wikiFileMatch && wikiFileMatch[1]) {
    const fileName = decodeURIComponent(wikiFileMatch[1]);
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
  }

  // 2. Google Drive preview -> direct view
  const gdriveMatch = clean.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${gdriveMatch[1]}`;
  }

  // 3. Dropbox share link -> raw image
  if (clean.includes("dropbox.com") && clean.includes("dl=0")) {
    return clean.replace("dl=0", "raw=1");
  }

  // 4. GitHub blob link -> raw user content
  if (clean.includes("github.com") && clean.includes("/blob/")) {
    return clean.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
  }

  return clean;
}

/**
 * Master logo resolver:
 * Automatically resolves the genuine official logo for a company even if the user
 * pasted an article URL (like logolook.net), entered a website, or left the URL blank.
 * NEVER returns the mountain photo placeholder.
 */
export function resolveCompanyLogo(
  logoUrl?: string,
  companyName: string = "",
  website: string = ""
): string {
  const cleanLogo = (logoUrl || "").trim();
  const nameKey = companyName.toLowerCase().trim();

  // If the URL is an unwanted placeholder photo (e.g. Unsplash mountain/office building), discard it
  const isPlaceholderPhoto = cleanLogo.includes("photo-1560179707") || cleanLogo.includes("unsplash.com/photo-");

  // 1. Check known brand dictionary by company name or URL keyword
  for (const [k, directLogo] of Object.entries(KNOWN_BRAND_LOGOS)) {
    if (nameKey.includes(k) || cleanLogo.toLowerCase().includes(k)) {
      return directLogo;
    }
  }

  // 2. If valid direct image URL provided (and not a placeholder/webpage)
  if (cleanLogo && !isPlaceholderPhoto) {
    const normalized = normalizeLogoUrl(cleanLogo);
    const hasImageExt = /\.(svg|png|jpg|jpeg|webp|ico|gif)(\?.*)?$/i.test(normalized);
    const isSpecialAsset = normalized.includes("Special:FilePath") || normalized.includes("gstatic.com");

    if (hasImageExt || isSpecialAsset) {
      return normalized;
    }
  }

  // 3. If website is provided (e.g. https://www.nvidia.com), resolve from Google Social Favicon CDN
  const targetWeb = website || (cleanLogo.startsWith("http") && !cleanLogo.includes("logolook") && !cleanLogo.includes("wikipedia") ? cleanLogo : "");
  if (targetWeb) {
    try {
      const urlObj = new URL(targetWeb.startsWith("http") ? targetWeb : `https://${targetWeb}`);
      const domain = urlObj.hostname.replace(/^www\./, "");
      if (domain && domain.includes(".")) {
        return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;
      }
    } catch {
      // ignore parse errors
    }
  }

  // 4. Try Google Favicon CDN using company name as domain if single word
  if (nameKey && !nameKey.includes(" ")) {
    return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${encodeURIComponent(nameKey)}.com&size=128`;
  }

  return cleanLogo && !isPlaceholderPhoto ? normalizeLogoUrl(cleanLogo) : "";
}

export function getCompanyBrand(name: string = "") {
  const key = name.toLowerCase().trim();
  for (const [k, val] of Object.entries(BRAND_PALETTES)) {
    if (key.includes(k)) {
      return val;
    }
  }
  const colors = [
    { bg: "bg-blue-600", text: "text-white" },
    { bg: "bg-indigo-600", text: "text-white" },
    { bg: "bg-emerald-600", text: "text-white" },
    { bg: "bg-purple-600", text: "text-white" },
    { bg: "bg-rose-600", text: "text-white" },
    { bg: "bg-amber-600", text: "text-white" },
    { bg: "bg-cyan-600", text: "text-white" },
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = colors[Math.abs(hash) % colors.length];
  const iconText = (name.trim()[0] || "C").toUpperCase();
  return { bg: color.bg, text: color.text, iconText };
}

interface CompanyLogoProps {
  name: string;
  logoUrl?: string;
  website?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  logoUrl,
  website,
  size = "sm",
  className = "",
}) => {
  const brand = getCompanyBrand(name);
  const [loadError, setLoadError] = useState(false);

  const sizeClasses = {
    xs: "w-5 h-5 text-[10px]",
    sm: "w-6 h-6 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  }[size];

  const effectiveLogo = resolveCompanyLogo(logoUrl, name, website);

  if (effectiveLogo && !loadError) {
    return (
      <div
        className={`rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-outline-variant/40 bg-white shadow-2xs p-1 ${sizeClasses} ${className}`}
        title={name}
      >
        <img
          src={effectiveLogo}
          alt={name}
          onError={() => setLoadError(true)}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  // Graceful branded monogram fallback (Never an unrelated stock photo)
  return (
    <div
      className={`rounded-xl overflow-hidden flex items-center justify-center font-black tracking-tight shrink-0 shadow-2xs border border-white/20 select-none ${brand.bg} ${brand.text} ${sizeClasses} ${className}`}
      title={name}
    >
      <span>{brand.iconText}</span>
    </div>
  );
};
