import React from "react";
import { ProblemStatus, ProblemSeverity } from "@/types";

interface BadgePillProps {
  label: string;
  variant?: "status" | "severity" | "category" | "verified" | "brand" | "neutral";
  status?: ProblemStatus;
  severity?: ProblemSeverity;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export const BadgePill: React.FC<BadgePillProps> = ({
  label,
  variant = "neutral",
  status,
  severity,
  size = "sm",
  className = "",
  dot = false,
}) => {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs font-medium";

  let colorClasses = "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
  let dotColor = "bg-zinc-400";

  if (variant === "status" && status) {
    switch (status) {
      case "approved":
        colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800";
        dotColor = "bg-emerald-500";
        break;
      case "pending":
      case "under_review":
        colorClasses = "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
        dotColor = "bg-amber-500 animate-pulse";
        break;
      case "rejected":
        colorClasses = "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800";
        dotColor = "bg-rose-500";
        break;
      case "needs_info":
        colorClasses = "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800";
        dotColor = "bg-indigo-500";
        break;
    }
  } else if (variant === "severity" && severity) {
    switch (severity) {
      case "critical":
        colorClasses = "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800";
        dotColor = "bg-rose-600";
        break;
      case "major":
        colorClasses = "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800";
        dotColor = "bg-orange-500";
        break;
      case "medium":
        colorClasses = "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
        dotColor = "bg-amber-500";
        break;
      case "minor":
        colorClasses = "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800";
        dotColor = "bg-blue-500";
        break;
    }
  } else if (variant === "verified") {
    colorClasses = "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 font-medium";
    dotColor = "bg-blue-600";
  } else if (variant === "brand") {
    colorClasses = "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 font-medium";
    dotColor = "bg-indigo-600";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${colorClasses} ${className}`}
    >
      {(dot || variant === "status" || variant === "severity") && (
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      )}
      <span>{label}</span>
    </span>
  );
};
