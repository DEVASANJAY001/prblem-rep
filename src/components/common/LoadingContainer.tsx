import React from "react";

export interface LoadingContainerProps {
  message?: string;
  submessage?: string;
  minHeight?: string;
  transparent?: boolean;
}

/**
 * Transparent, clean loading animation.
 * Completely container-less by default to blend seamlessly with the page background.
 */
export const LoadingContainer: React.FC<LoadingContainerProps> = ({
  message = "Loading...",
  submessage,
  minHeight = "min-h-[300px]",
  transparent = true,
}) => {
  if (transparent) {
    return (
      <div
        className={`w-full ${minHeight} flex flex-col items-center justify-center p-6 bg-transparent`}
      >
        {/* Sleek Modern Spinner Animation */}
        <div className="relative flex items-center justify-center mb-3">
          <div className="w-9 h-9 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>

        {/* Minimal Loading Text */}
        <span className="text-sm font-medium text-on-surface-variant animate-pulse tracking-wide">
          {message || "Loading..."}
        </span>
      </div>
    );
  }

  // Framed glassmorphic container (only if explicitly requested with transparent={false})
  return (
    <div
      className={`w-full ${minHeight} flex flex-col items-center justify-center p-8 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 relative overflow-hidden shadow-sm`}
    >
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>

      <div className="text-center space-y-1 z-10 max-w-sm">
        <h4 className="font-headline-sm text-sm font-bold text-on-surface tracking-tight">
          {message}
        </h4>
        {submessage && (
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            {submessage}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Skeleton card for Problems Feed & Grid
 */
export const ProblemCardSkeleton: React.FC = () => {
  return (
    <div className="w-full rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/30 p-6 flex flex-col gap-4 relative overflow-hidden shadow-sm animate-pulse">
      {/* Shimmer sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite] pointer-events-none" />

      {/* Top Header Pill & Time */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 rounded-lg bg-surface-container-high" />
        <div className="h-4 w-12 rounded-md bg-surface-container" />
      </div>

      {/* Title */}
      <div className="space-y-2 my-1">
        <div className="h-5 w-11/12 rounded-md bg-surface-container-highest" />
        <div className="h-5 w-3/4 rounded-md bg-surface-container-highest" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3.5 w-full rounded bg-surface-container" />
        <div className="h-3.5 w-5/6 rounded bg-surface-container" />
      </div>

      {/* Bottom Metrics Bar */}
      <div className="mt-auto pt-4 border-t border-outline-variant/15 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-4 w-16 rounded bg-surface-container-high" />
          <div className="h-4 w-16 rounded bg-surface-container-high" />
        </div>
        <div className="h-8 w-8 rounded-full bg-surface-container-highest" />
      </div>
    </div>
  );
};

/**
 * Skeleton for Table views (Admin review queue, problems table)
 */
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full rounded-2xl bg-surface border border-outline-variant/30 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low flex items-center gap-4 animate-pulse">
        <div className="h-4 w-1/4 rounded bg-surface-container-high" />
        <div className="h-4 w-1/6 rounded bg-surface-container-high" />
        <div className="h-4 w-1/5 rounded bg-surface-container-high" />
        <div className="h-4 w-1/6 rounded bg-surface-container-high" />
      </div>
      <div className="divide-y divide-outline-variant/10">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4 animate-pulse">
            <div className="h-4 w-1/4 rounded bg-surface-container" />
            <div className="h-4 w-1/6 rounded bg-surface-container" />
            <div className="h-4 w-1/5 rounded bg-surface-container" />
            <div className="h-4 w-1/6 rounded bg-surface-container" />
          </div>
        ))}
      </div>
    </div>
  );
};
