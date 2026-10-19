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
        className={`inline-flex items-center rounded-lg font-bold border transition-all ${sizeClasses} bg-primary/10 text-primary border-primary/25 shadow-2xs hover:bg-primary/15 ${className}`}
        title="Stuckhere Original — Formulated through independent researcher discovery & empirical thinking"
      >
        {showIcon && (
          <span className="w-4 h-4 rounded-md bg-primary text-white flex items-center justify-center shrink-0 shadow-2xs">
            <StuckhereLogoMark className="w-2.5 h-2.5 text-white stroke-[3]" />
          </span>
        )}
        <span className="tracking-tight flex items-center gap-1">
          <span className="font-extrabold">Stuckhere</span>
          <span className="text-primary/60 font-normal">·</span>
          <span>Own Thinking</span>
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
