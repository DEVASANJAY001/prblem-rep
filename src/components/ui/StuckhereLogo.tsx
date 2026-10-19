import React from "react";

export interface StuckhereLogoMarkProps {
  className?: string;
  size?: number;
}

/**
 * Official Stuckhere Logo Mark
 * Represents the multi-layered isometric problem statements & venture intelligence tiers.
 */
export const StuckhereLogoMark: React.FC<StuckhereLogoMarkProps> = ({
  className = "w-4 h-4",
  size,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.25" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export const StuckhereBrandText: React.FC<{ className?: string }> = ({ className = "text-sm font-extrabold" }) => (
  <span className={`tracking-tight text-on-surface ${className}`}>
    Stuck<span className="text-primary ml-0.5">here</span>
  </span>
);
