import React from "react";
import { motion } from "framer-motion";

interface ScoreCircleProps {
  score: number; // 0 - 100
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
  className?: string;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({
  score,
  label,
  size = "md",
  showLabel = true,
  className = "",
}) => {
  const sizeMap = {
    sm: { dimension: 44, stroke: 3.5, text: "text-xs", labelText: "text-[10px]" },
    md: { dimension: 64, stroke: 5, text: "text-sm font-bold", labelText: "text-xs" },
    lg: { dimension: 88, stroke: 6.5, text: "text-xl font-bold", labelText: "text-xs font-medium" },
    xl: { dimension: 120, stroke: 8, text: "text-3xl font-extrabold", labelText: "text-sm font-medium" },
  };

  const { dimension, stroke, text, labelText } = sizeMap[size];
  const radius = (dimension - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.max(0, Math.min(100, isNaN(score) ? 0 : score));
  const offset = circumference - (safeScore / 100) * circumference;

  // Dynamic color threshold
  let strokeColor = "#10B981"; // Emerald
  let bgTint = "rgba(16, 185, 129, 0.1)";
  if (safeScore < 50) {
    strokeColor = "#EF4444"; // Red
    bgTint = "rgba(239, 68, 68, 0.1)";
  } else if (safeScore < 75) {
    strokeColor = "#F59E0B"; // Amber
    bgTint = "rgba(245, 158, 11, 0.1)";
  } else if (safeScore >= 90) {
    strokeColor = "#2545D3"; // Brand Blue
    bgTint = "rgba(37, 69, 211, 0.1)";
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative inline-flex items-center justify-center" style={{ width: dimension, height: dimension }}>
        <svg width={dimension} height={dimension} className="-rotate-90 transform">
          {/* Background circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            className="text-zinc-200 dark:text-zinc-800"
          />
          {/* Animated score circle */}
          <motion.circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Value text in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${text} tabular-nums text-zinc-900 dark:text-zinc-100`}>
            {safeScore}
          </span>
        </div>
      </div>

      {showLabel && label && (
        <span className={`mt-1 text-center text-zinc-500 dark:text-zinc-400 ${labelText}`}>
          {label}
        </span>
      )}
    </div>
  );
};
