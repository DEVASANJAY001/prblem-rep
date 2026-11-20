import React, { useState } from "react";
import { StuckhereLogoMark } from "./StuckhereLogo";
import { resolveCompanyLogo, getCompanyBrand } from "./CompanyLogo";
import { X } from "lucide-react";

export interface CreditSourceBadgeProps {
  source: string;
  size?: "xs" | "sm" | "md";
  className?: string;
  onRemove?: () => void;
  showIcon?: boolean;
}

export function isOwnThinkingCredit(source?: string): boolean {
  if (!source) return false;
  const s = source.toLowerCase().trim();
  return (
    s === "own thinking" ||
    s === "cred-own-thinking" ||
    s.includes("own thinking") ||
    s.includes("stuckhere")
  );
}

/**
 * CreditSourceBadge: Renders problem statement attribution tags.
 * If the credit is "Own Thinking", it displays the official Stuckhere logo
 * and branded styling to clearly identify Stuckhere original problem statements.
 */
export const CreditSourceBadge: React.FC<CreditSourceBadgeProps> = ({
  source,
  size = "sm",
  className = "",
  onRemove,
  showIcon = true,
}) => {
  const isOwn = isOwnThinkingCredit(source);

  const sizeClasses = {
    xs: "text-[10px] px-2 py-0.5 gap-1",
    sm: "text-[11px] px-2.5 py-1 gap-1.5",
    md: "text-xs px-3 py-1.5 gap-2",
  }[size];

  if (isOwn) {
    return (
      <span
        className={`inline-flex items-center rounded-md font-bold border transition-all ${sizeClasses} bg-surface-container-low text-on-surface border-primary/30 shadow-2xs hover:border-primary/50 ${className}`}
        title="Stuckhere Original Problem Statement"
      >
        {showIcon && (
          <span className="flex items-center justify-center w-4 h-4 rounded bg-primary/10 overflow-hidden shrink-0 border border-primary/20 p-0.5 shadow-2xs">
            <img
              src="/logo.png"
              alt="Stuckhere"
              className="w-full h-full object-contain"
              onError={(e) => {
                // If png fails, fallback gracefully to StuckhereLogoMark
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </span>
        )}
        <span className="tracking-tight font-extrabold text-on-surface flex items-center">
          Stuck<span className="text-primary ml-0.5">here</span>
        </span>
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-0.5 rounded-full hover:bg-primary/20 text-primary cursor-pointer ml-0.5 transition-colors"
            title="Remove attribution"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-lg font-semibold border transition-all ${sizeClasses} bg-surface-container/70 border-outline-variant/30 text-on-surface shadow-2xs hover:bg-surface-container ${className}`}
    >
      {showIcon && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
      <span>{source}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="p-0.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer ml-0.5 transition-colors"
          title="Remove attribution"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export const KNOWN_CREDIT_DOMAINS: Record<string, string> = {
  "hack2skill": "hack2skill.com",
  "unstop": "unstop.com",
  "smart india hackathon (sih)": "sih.gov.in",
  "smart india hackathon": "sih.gov.in",
  "sih": "sih.gov.in",
  "msme idea hackathon": "mygov.in",
  "msme": "msme.gov.in",
  "devfolio / devpost": "devfolio.co",
  "devfolio": "devfolio.co",
  "devpost": "devpost.com",
  "open innovation / corporate": "openinnovation.net",
  "open innovation": "openinnovation.net",
  "kaggle": "kaggle.com",
  "y combinator": "ycombinator.com",
  "techstars": "techstars.com",
  "mit solve": "solve.mit.edu",
  "xprize": "xprize.org",
};

export function resolveCreditLogo(
  source: string = "",
  customLogoUrl?: string,
  websiteUrl?: string
): string {
  if (isOwnThinkingCredit(source)) {
    return "/logo.png";
  }

  // 1. If explicit custom logo provided
  if (customLogoUrl && customLogoUrl.trim()) {
    return resolveCompanyLogo(customLogoUrl, source, websiteUrl);
  }

  const cleanSource = source.toLowerCase().trim();

  // 2. Check known credit platforms
  for (const [key, domain] of Object.entries(KNOWN_CREDIT_DOMAINS)) {
    if (cleanSource === key || cleanSource.includes(key)) {
      return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;
    }
  }

  // 3. If explicit website provided
  if (websiteUrl && websiteUrl.trim()) {
    try {
      const urlObj = new URL(websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`);
      const domain = urlObj.hostname.replace(/^www\./, "");
      if (domain && domain.includes(".")) {
        return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;
      }
    } catch {
      // ignore
    }
  }

  // 4. Try resolveCompanyLogo (e.g. if source is a company name like Google, Microsoft, Tata, etc.)
  return resolveCompanyLogo("", source, websiteUrl);
}

export interface CreditLogoCircleProps {
  source: string;
  className?: string;
  size?: "sm" | "md";
  customLogoUrl?: string;
  websiteUrl?: string;
}

/**
 * CreditLogoCircle: Renders only the logo in a clean circular avatar
 * matching the People and Companies interested avatar clusters.
 */
export const CreditLogoCircle: React.FC<CreditLogoCircleProps> = ({
  source,
  className = "",
  size = "md",
  customLogoUrl,
  websiteUrl,
}) => {
  const [loadError, setLoadError] = useState(false);
  const isOwn = isOwnThinkingCredit(source);
  const logoUrl = resolveCreditLogo(source, customLogoUrl, websiteUrl);
  const brand = getCompanyBrand(source);

  const sizeClasses = size === "sm" ? "w-7 h-7 text-[10px]" : "w-8 h-8 text-xs";

  if (isOwn) {
    return (
      <div
        className={`rounded-full bg-surface-container border-2 border-surface shadow-2xs flex items-center justify-center overflow-hidden shrink-0 hover:scale-110 hover:z-20 transition-all cursor-pointer ${sizeClasses} ${className}`}
        title="Stuckhere (Own Thinking - Original Discovery)"
      >
        {!loadError ? (
          <img
            src="/logo.png"
            alt="Stuckhere"
            className="w-full h-full object-contain p-1"
            onError={() => setLoadError(true)}
          />
        ) : (
          <StuckhereLogoMark className="w-4 h-4 text-primary stroke-[2.5]" />
        )}
      </div>
    );
  }

  if (logoUrl && !loadError) {
    return (
      <div
        className={`rounded-full bg-white dark:bg-zinc-800 border-2 border-surface shadow-2xs flex items-center justify-center overflow-hidden shrink-0 hover:scale-110 hover:z-20 transition-all cursor-pointer p-1 ${sizeClasses} ${className}`}
        title={source}
      >
        <img
          src={logoUrl}
          alt={source}
          className="w-full h-full object-contain"
          onError={() => setLoadError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Branded Monogram Fallback
  return (
    <div
      className={`rounded-full border-2 border-surface shadow-2xs flex items-center justify-center font-bold tracking-tight select-none shrink-0 hover:scale-110 hover:z-20 transition-all cursor-pointer ${brand.bg} ${brand.text} ${sizeClasses} ${className}`}
      title={source}
    >
      <span>{brand.iconText}</span>
    </div>
  );
};
