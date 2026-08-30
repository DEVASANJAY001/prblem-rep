import React from "react";
import {
  Award,
  Trophy,
  Rocket,
  Crown,
  Shield,
  ShieldCheck,
  Flame,
  Zap,
  Star,
  Target,
  Sparkles,
  Lightbulb,
  Flag,
  Cpu,
  Layers,
  BarChart3,
  TrendingUp,
  FileText,
  ThumbsUp,
  HeartHandshake,
  Microscope,
  Compass,
  Globe,
  Briefcase,
  Building2,
  Code,
  Database,
  Terminal,
  Key,
  Lock,
  CheckCircle,
  CheckCircle2,
  Activity,
  Diamond,
  DollarSign,
  Eye,
  Heart,
  Medal,
  Users,
  Search,
  HelpCircle,
  CheckSquare,
  Send,
  LucideIcon,
} from "lucide-react";
import { BadgeTier } from "@/types";

interface DynamicBadgeIconProps {
  name: string;
  className?: string;
  tier?: BadgeTier;
  color?: string;
  size?: number;
}

export const TIER_CONFIG: Record<
  BadgeTier,
  {
    bg: string;
    text: string;
    border: string;
    glow: string;
    label: string;
  }
> = {
  bronze: {
    bg: "bg-amber-950/20 text-amber-600 dark:text-amber-400",
    text: "text-amber-600",
    border: "border-amber-700/40",
    glow: "shadow-amber-500/10",
    label: "Bronze",
  },
  silver: {
    bg: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
    text: "text-slate-600",
    border: "border-slate-400/40",
    glow: "shadow-slate-500/10",
    label: "Silver",
  },
  gold: {
    bg: "bg-amber-500/20 text-amber-500",
    text: "text-amber-500",
    border: "border-amber-500/50",
    glow: "shadow-amber-500/20",
    label: "Gold",
  },
  platinum: {
    bg: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400",
    text: "text-cyan-500",
    border: "border-cyan-500/40",
    glow: "shadow-cyan-500/20",
    label: "Platinum",
  },
  diamond: {
    bg: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    text: "text-indigo-500",
    border: "border-indigo-500/50",
    glow: "shadow-indigo-500/25",
    label: "Diamond",
  },
  legendary: {
    bg: "bg-purple-500/25 text-purple-600 dark:text-purple-300",
    text: "text-purple-500",
    border: "border-purple-500/60",
    glow: "shadow-purple-500/30",
    label: "Legendary",
  },
};

const ICON_MAP: Record<string, LucideIcon> = {
  award: Award,
  trophy: Trophy,
  rocket: Rocket,
  crown: Crown,
  shield: Shield,
  shieldcheck: ShieldCheck,
  flame: Flame,
  zap: Zap,
  star: Star,
  target: Target,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  flag: Flag,
  cpu: Cpu,
  layers: Layers,
  barchart3: BarChart3,
  trendingup: TrendingUp,
  filetext: FileText,
  thumbsup: ThumbsUp,
  hearthandshake: HeartHandshake,
  microscope: Microscope,
  compass: Compass,
  globe: Globe,
  briefcase: Briefcase,
  building2: Building2,
  code: Code,
  database: Database,
  terminal: Terminal,
  key: Key,
  lock: Lock,
  checkcircle: CheckCircle,
  checkcircle2: CheckCircle2,
  activity: Activity,
  diamond: Diamond,
  dollarsign: DollarSign,
  eye: Eye,
  heart: Heart,
  medal: Medal,
  users: Users,
  search: Search,
  helpcircle: HelpCircle,
  checksquare: CheckSquare,
  send: Send,
};

export const DynamicBadgeIcon: React.FC<DynamicBadgeIconProps> = ({
  name,
  className = "w-5 h-5",
  tier,
  color,
  size,
}) => {
  const normalizedKey = name
    ? name.toLowerCase().replace(/[^a-z0-9]/g, "")
    : "award";

  const IconComponent = ICON_MAP[normalizedKey] || Award;
  const style = color ? { color } : undefined;

  return <IconComponent className={className} style={style} size={size} />;
};

export const LUCIDE_ICONS_CATALOG = [
  "Award", "Trophy", "Rocket", "Crown", "Shield", "ShieldCheck", "Flame", "Zap", "Star",
  "Target", "Sparkles", "Lightbulb", "Flag", "Cpu", "Layers", "BarChart3", "TrendingUp",
  "FileText", "ThumbsUp", "HeartHandshake", "Microscope", "Compass", "Globe", "Briefcase",
  "Building2", "Code", "Database", "Terminal", "Key", "Lock", "CheckCircle", "CheckCircle2",
  "Activity", "Diamond", "DollarSign", "Eye", "Heart", "Medal", "Users", "Search"
];
