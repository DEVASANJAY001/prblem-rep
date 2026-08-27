import { cn } from "@/lib/utils";
import type { ProblemStatus } from "@/types/firebase";

type BadgeVariant =
  | "status"
  | "industry"
  | "severity"
  | "role"
  | "default";

interface BadgePillProps {
  label: string;
  variant?: BadgeVariant;
  status?: ProblemStatus | "approved" | "pending" | "rejected" | "under_review" | "needs_info";
  className?: string;
}

const statusStyles: Record<string, string> = {
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
  pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
  rejected: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900",
  under_review: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900",
  needs_info: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900",
};

const statusDots: Record<string, string> = {
  approved: "bg-emerald-500",
  pending: "bg-amber-500",
  rejected: "bg-red-500",
  under_review: "bg-blue-500",
  needs_info: "bg-purple-500",
};

export function BadgePill({ label, variant = "default", status, className }: BadgePillProps) {
  const isStatus = variant === "status" && status;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        isStatus
          ? statusStyles[status!] ?? "bg-muted text-muted-foreground border-border"
          : "bg-secondary text-secondary-foreground border-border",
        className
      )}
    >
      {isStatus && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            statusDots[status!] ?? "bg-muted-foreground"
          )}
        />
      )}
      {label}
    </span>
  );
}
