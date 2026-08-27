"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScoreCircleProps {
  score: number; // 0–100
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: { dim: 56, stroke: 4, fontSize: "text-sm", labelSize: "text-[10px]" },
  md: { dim: 72, stroke: 5, fontSize: "text-base", labelSize: "text-xs" },
  lg: { dim: 96, stroke: 6, fontSize: "text-xl", labelSize: "text-xs" },
};

function scoreColor(score: number) {
  if (score >= 75) return "#0F9D58";
  if (score >= 50) return "#F4B400";
  return "#DB4437";
}

export function ScoreCircle({
  score,
  label,
  size = "md",
  className,
}: ScoreCircleProps) {
  const { dim, stroke, fontSize, labelSize } = sizeConfig[size];
  const radius = (dim - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <div
      className={cn("flex flex-col items-center gap-1", className)}
      role="img"
      aria-label={`${label ?? "Score"}: ${score} out of 100`}
    >
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          {/* Track */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-border"
          />
          {/* Animated progress */}
          <motion.circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        {/* Score number centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold tabular-nums", fontSize)} style={{ color }}>
            {score}
          </span>
        </div>
      </div>
      {label && (
        <span className={cn("text-muted-foreground text-center leading-tight", labelSize)}>
          {label}
        </span>
      )}
    </div>
  );
}
