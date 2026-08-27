import React from "react";

interface LoadingContainerProps {
  message?: string;
  submessage?: string;
  minHeight?: string;
}

/**
 * High-fidelity glassmorphic loading fetching container animation
 */
export const LoadingContainer: React.FC<LoadingContainerProps> = ({
  message = "Fetching live data from Cloud Firestore...",
  submessage = "Synchronizing verified real-time records",
  minHeight = "min-h-[280px]",
}) => {
  return (
    <div
      className={`w-full ${minHeight} flex flex-col items-center justify-center p-8 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-xl border border-outline-variant/30 relative overflow-hidden shadow-sm`}
    >
      {/* Background Animated Gradient Shimmer Wave */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />

      {/* Center Radar / Orbital Glow Pulse */}
      <div className="relative flex items-center justify-center mb-5">
        <div className="absolute w-16 h-16 rounded-full bg-primary/20 animate-ping opacity-40" />
        <div className="absolute w-12 h-12 rounded-full bg-secondary/15 animate-pulse" />
        <div className="relative w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined text-[22px] animate-spin">
            progress_activity
          </span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-1.5 z-10 max-w-sm">
        <h4 className="font-headline-sm text-base font-bold text-on-surface tracking-tight">
          {message}
        </h4>
        <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
          {submessage}
        </p>
      </div>

      {/* Mini Progress Pulse Bar */}
      <div className="w-36 h-1 bg-surface-container-high rounded-full overflow-hidden mt-4">
        <div className="w-full h-full bg-gradient-to-r from-primary via-secondary to-primary animate-[indeterminate_1.5s_infinite_linear] origin-left" />
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
        <div className="h-4 w-1/6 rounded bg-surface-container-high" />
        <div className="h-4 w-1/6 rounded bg-surface-container-high ml-auto" />
      </div>
      <div className="divide-y divide-outline-variant/15">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4.5 flex items-center gap-4 animate-pulse">
            <div className="h-4 w-1/3 rounded bg-surface-container" />
            <div className="h-4 w-1/6 rounded bg-surface-container" />
            <div className="h-4 w-1/6 rounded bg-surface-container" />
            <div className="h-8 w-24 rounded-lg bg-surface-container-high ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};
