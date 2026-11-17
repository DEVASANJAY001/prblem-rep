import React, { useState } from "react";

/**
 * Normalizes user-submitted or scraped company logo URLs into direct renderable image links.
 * Handles:
 * - Wikipedia/Wikimedia File pages (e.g. https://sco.wikipedia.org/wiki/File:Nvidia_logo.svg) -> direct Wikimedia asset
 * - Google Drive share links
 * - Dropbox share links
 * - GitHub blob URLs
 */
export function normalizeLogoUrl(url: string = ""): string {
  if (!url) return "";
  const clean = url.trim();

  // Wikipedia / Wikimedia File URL -> Direct Special:FilePath asset
  // Matches: https://sco.wikipedia.org/wiki/File:Nvidia_logo.svg, https://en.wikipedia.org/wiki/File:...
  const wikiFileMatch = clean.match(/https?:\/\/[a-z0-9-.]*wik(?:ipedia|imedia)\.org\/wiki\/File:([^#?&]+)/i);
  if (wikiFileMatch && wikiFileMatch[1]) {
    const fileName = decodeURIComponent(wikiFileMatch[1]);
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
  }

  // Google Drive preview -> direct view
  const gdriveMatch = clean.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${gdriveMatch[1]}`;
  }

  // Dropbox share link -> raw image
  if (clean.includes("dropbox.com") && clean.includes("dl=0")) {
    return clean.replace("dl=0", "raw=1");
  }

  // GitHub blob link -> raw user content
  if (clean.includes("github.com") && clean.includes("/blob/")) {
    return clean.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
  }

  return clean;
}

const BRAND_PALETTES: Record<string, { bg: string; text: string; iconText: string }> = {
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
  "intel": { bg: "bg-[#0068B5]", text: "text-white", iconText: "I" },
  "amd": { bg: "bg-[#ED1C24]", text: "text-white", iconText: "A" },
  "openai": { bg: "bg-[#10A37F]", text: "text-white", iconText: "O" },
  "tesla": { bg: "bg-[#E82127]", text: "text-white", iconText: "T" },
  "microsoft": { bg: "bg-[#00A4EF]", text: "text-white", iconText: "M" },
  "apple": { bg: "bg-black", text: "text-white", iconText: "A" },
  "amazon": { bg: "bg-[#FF9900]", text: "text-white", iconText: "A" },
};

const KNOWN_BRAND_LOGOS: Record<string, string> = {
  "google": "https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png",
  "microsoft": "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "apple": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "amazon": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "meta": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  "oracle": "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
  "nvidia": "https://commons.wikimedia.org/wiki/Special:FilePath/Nvidia_logo.svg",
  "intel": "https://commons.wikimedia.org/wiki/Special:FilePath/Intel_logo_%282020%29.svg",
  "amd": "https://commons.wikimedia.org/wiki/Special:FilePath/AMD_Logo.svg",
  "openai": "https://commons.wikimedia.org/wiki/Special:FilePath/OpenAI_Logo_%282%29.svg",
  "tesla": "https://commons.wikimedia.org/wiki/Special:FilePath/Tesla_Motors.svg",
  "ibm": "https://commons.wikimedia.org/wiki/Special:FilePath/IBM_logo.svg",
};

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
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  logoUrl,
  size = "sm",
  className = "",
}) => {
  const brand = getCompanyBrand(name);
  const key = name.toLowerCase().trim();
  const [loadError, setLoadError] = useState(false);

  const sizeClasses = {
    xs: "w-5 h-5 text-[10px]",
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  }[size];

  // Resolve logo image if available from props or known brands
  let effectiveLogo = logoUrl ? normalizeLogoUrl(logoUrl) : "";
  const isHumanPhoto = effectiveLogo && (effectiveLogo.includes("photo-") || effectiveLogo.includes("unsplash.com/photo-"));
  if (isHumanPhoto || !effectiveLogo) {
    for (const [k, url] of Object.entries(KNOWN_BRAND_LOGOS)) {
      if (key.includes(k)) {
        effectiveLogo = url;
        break;
      }
    }
  }

  if (effectiveLogo && !isHumanPhoto && !loadError) {
    return (
      <div
        className={`rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-black/10 bg-white shadow-2xs ${sizeClasses} ${className}`}
        title={name}
      >
        <img
          src={effectiveLogo}
          alt={name}
          onError={() => setLoadError(true)}
          className="w-full h-full object-contain p-0.5"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center font-black tracking-tight shrink-0 shadow-2xs border border-white/20 select-none ${brand.bg} ${brand.text} ${sizeClasses} ${className}`}
      title={name}
    >
      <span>{brand.iconText}</span>
    </div>
  );
};
