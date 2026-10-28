import React from "react";
import { StuckhereLogoMark } from "./StuckhereLogo";
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
