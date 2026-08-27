import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProblemDoc } from "@/types";
import { REAL_COMPANIES } from "@/data/realProductionData";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { useAuth } from "@/contexts/AuthContext";
import { isProblemBookmarked, toggleBookmark, voteProblem } from "@/lib/storage";
import { ThumbsUp, Bookmark, ShieldCheck } from "lucide-react";

interface TrendingProblemCardProps {
  problem: ProblemDoc;
  className?: string;
}

export const TrendingProblemCard: React.FC<TrendingProblemCardProps> = ({
  problem,
  className = "",
}) => {
  const { user } = useAuth();
  const currentUid = user?.uid || "guest";

  const [isSaved, setIsSaved] = useState<boolean>(() =>
    isProblemBookmarked(problem.id, currentUid)
  );

  const initialUpvotes = problem.votes?.upvotes ?? problem.upvotes ?? 0;
  const [likesCount, setLikesCount] = useState<number>(initialUpvotes);
  const [isLiked, setIsLiked] = useState<boolean>(problem.votes?.userVote === "up");
  const [likeAnimating, setLikeAnimating] = useState<boolean>(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 500);
    const res = voteProblem(problem.id, "up", currentUid);
    setLikesCount(res.upvotes);
    setIsLiked(res.userVote === "up");
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextSaved = toggleBookmark(problem.id, currentUid);
    setIsSaved(nextSaved);
  };

  // Normalize pain score (0 to 100 raw, formatted as /10 decimal like in ProblemDetail)
  const rawPain = Number(
    problem.painScore ??
    problem.aiScores?.painLevel ??
    problem.aiScores?.painScore ??
    87
  );
  const painNormalized = Math.min(100, Math.max(1, rawPain > 10 ? rawPain : Math.round(rawPain * 10)));
  const painDecimal = (painNormalized / 10).toFixed(1);

  // SVG circular arc geometry with radius 28 (circumference = 2 * PI * 28 ≈ 175.93)
  const circumference = 175.93;
  const strokeDashoffset = circumference - circumference * (painNormalized / 100);

  const industry = problem.industry || "General Industry";

  // Real Companies Interested (Exact logic matching ProblemDetail.tsx)
  const attachedCompanies = useMemo(() => {
    const fromAttached = Array.isArray(problem.attachedCompanyNames) && problem.attachedCompanyNames.length > 0
      ? problem.attachedCompanyNames
      : (problem.tags?.filter((t) =>
          REAL_COMPANIES.some((c) => c.name.toLowerCase() === t.toLowerCase())
        ) || []);

    const matchedList = fromAttached
      .map((name) => {
        const found = REAL_COMPANIES.find(
          (c) => c.name.toLowerCase() === name.toLowerCase() || c.id === name
        );
        if (!found) return null;
        return { name: found.name, logoUrl: found.logoUrl };
      })
      .filter(Boolean) as Array<{ name: string; logoUrl?: string }>;

    if (matchedList.length > 0) return matchedList;

    // Smart sector matching fallback using real company logos
    const indLower = industry.toLowerCase();
    return REAL_COMPANIES.filter((c) =>
      (c.industry && indLower.includes(c.industry.toLowerCase().slice(0, 4))) ||
      (c.name && ["Google", "Microsoft", "OpenAI", "Amazon"].includes(c.name))
    ).slice(0, 3).map((c) => ({ name: c.name, logoUrl: c.logoUrl }));
  }, [problem, industry]);

  // Severity Level for gradient calculation
  const isCritical = painNormalized >= 90;
  const isSevere = painNormalized >= 75 && painNormalized < 90;

  // Pure Organic Database counts
  const rawViews = problem.views ?? 0;
  const views = rawViews >= 1000 ? `${(rawViews / 1000).toFixed(1)}K` : `${rawViews}`;

  const faceCount = Math.max(problem.validations?.faceCount ?? 0, likesCount);
  const faceText = faceCount >= 1000 ? `${(faceCount / 1000).toFixed(1)}K` : `${faceCount}`;

  const comments = Math.max(
    problem.commentsCount ?? 0,
    (problem.comments?.length ?? 0) + (problem.comments ?? []).reduce((acc, c) => acc + (c.replies?.length ?? 0), 0)
  );
  const buildingCount = Math.max(problem.validations?.buildCount ?? 0, problem.teamMembers?.length ?? 0);

  const gradientId = `pain-glow-${problem.id.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <article
      className={`bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_2px_8px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_36px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden relative flex flex-col justify-between font-['Poppins',sans-serif] border border-gray-100/90 group ${className}`}
    >
      <div className="p-6 md:p-8 flex flex-col gap-4 flex-1 justify-between">
        {/* Header Section */}
        <header className="flex flex-col gap-3 w-full">
          {/* Top Row: Category Pill + Company Logos + Like / Save Actions + Verified Checkmark */}
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-2.5 min-w-0 flex-wrap sm:flex-nowrap">
              {/* Minimalist Category Pill */}
              <div className="inline-flex items-center gap-1.5 bg-[#f4f2ff] px-3 py-1 rounded-full w-fit shrink-0">
                <span className="text-[11px] font-medium tracking-wide text-[#5c37eb] truncate max-w-[170px]">
                  {industry}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#5c37eb]"></div>
              </div>

              {/* Separator Line */}
              <div className="hidden sm:block w-px h-3.5 bg-gray-200 shrink-0"></div>

              {/* Real Companies Interested */}
              <div className="flex items-center gap-1.5 shrink-0">
                {attachedCompanies.length > 0 ? (
                  <div className="flex items-center -space-x-1.5">
                    {attachedCompanies.slice(0, 4).map((comp, idx) => (
                      <CompanyLogo
                        key={idx}
                        name={comp.name}
                        logoUrl={comp.logoUrl}
                        size="xs"
                        className="w-5.5 h-5.5 shadow-2xs ring-1 ring-white"
                      />
                    ))}
                    {attachedCompanies.length > 4 && (
                      <div
                        className="w-5.5 h-5.5 rounded-full bg-surface-container border border-gray-200/80 shadow-2xs flex items-center justify-center text-[9px] font-bold text-primary shrink-0"
                        title={`${attachedCompanies.length} companies interested`}
                      >
                        +{attachedCompanies.length - 4}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-[10px] text-gray-400">Open Problem</span>
                )}
              </div>
            </div>

            {/* Interactive Actions Group: Like, Save & Verified Checkmark */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Like / Upvote Button (Border-free Animated Thumbs Up: Gray if not liked, Blue if liked) */}
              <button
                type="button"
                onClick={handleLike}
                className={`inline-flex items-center gap-1 text-xs font-semibold transition-all cursor-pointer select-none active:scale-90 ${
                  isLiked
                    ? "text-blue-600 font-bold"
                    : "text-gray-400 hover:text-blue-500"
                }`}
                title={isLiked ? "Liked" : "Like problem"}
              >
                <ThumbsUp
                  className={`w-4 h-4 transition-all duration-300 ${
                    isLiked
                      ? "fill-blue-600 text-blue-600 scale-110"
                      : "text-gray-400 hover:text-blue-500"
                  } ${likeAnimating ? "animate-bounce scale-125" : ""}`}
                />
                <span className="font-mono text-xs">{likesCount}</span>
              </button>

              {/* Save / Bookmark Button */}
              <button
                type="button"
                onClick={handleSave}
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  isSaved
                    ? "bg-primary/10 border-primary text-primary shadow-2xs"
                    : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary"
                }`}
                title={isSaved ? "Saved to Bookmarks" : "Save problem statement"}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-primary text-primary" : ""}`} />
              </button>

              {/* Verified Checkmark Icon */}
              <div
                className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 shrink-0 shadow-2xs border border-emerald-100/60"
                title="Verified Problem Statement"
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Poppins Minimalist Title */}
          <Link to={`/problem/${problem.id}`} className="hover:text-[#5c37eb] transition-colors">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug line-clamp-2 tracking-tight">
              {problem.title}
            </h2>
          </Link>
        </header>

        {/* Main Content Area: Description + Compact Pain Score Widget */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-2">
          {/* Description */}
          <p className="flex-1 text-gray-500 leading-relaxed text-xs md:text-[13px] font-normal line-clamp-3 pr-0 sm:pr-4">
            {problem.description}
          </p>

          {/* Vertical Divider */}
          <div className="hidden sm:block w-px h-16 bg-gray-100/90 shrink-0"></div>

          {/* Compact Minimalist Pain Score Circle (Value only) */}
          <div className="flex flex-col items-center justify-center shrink-0 self-center sm:self-auto px-2">
            {/* Glowing Gradient Circle Gauge */}
            <div className="relative w-14 h-14">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    {isCritical ? (
                      <>
                        <stop offset="0%" stopColor="#ff2a55" />
                        <stop offset="60%" stopColor="#ff4d00" />
                        <stop offset="100%" stopColor="#ff7a00" />
                      </>
                    ) : isSevere ? (
                      <>
                        <stop offset="0%" stopColor="#ff6b00" />
                        <stop offset="100%" stopColor="#ffaa00" />
                      </>
                    ) : (
                      <>
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </>
                    )}
                  </linearGradient>
                </defs>

                {/* Background Ring Track */}
                <circle
                  className="stroke-gray-100 fill-transparent"
                  strokeWidth="4"
                  cx="36"
                  cy="36"
                  r="28"
                />

                {/* Dynamic Value Arc */}
                <circle
                  stroke={`url(#${gradientId})`}
                  className="fill-transparent transition-all duration-1000 ease-out"
                  strokeWidth="4"
                  strokeLinecap="round"
                  cx="36"
                  cy="36"
                  r="28"
                  strokeDasharray="175.93"
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>

              {/* Central Value Scaled for 10 points (value only) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm md:text-base font-extrabold text-gray-900 leading-none tracking-tight">
                  {painDecimal}
                </span>
              </div>
            </div>

            {/* Pain Score Label */}
            <span className="text-[10px] text-gray-500 font-medium tracking-wide mt-1 whitespace-nowrap">
              Pain Score
            </span>
          </div>
        </div>

        {/* Engagement Footer */}
        <footer className="flex justify-between items-center px-1 pt-3 border-t border-gray-100/90 text-xs">
          {/* Views */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-gray-900 text-sm md:text-[15px] tracking-tight">
              {views}
            </span>
            <span className="text-gray-400 text-[11px] font-normal">Views</span>
          </div>

          <div className="w-px h-4 bg-gray-100"></div>

          {/* Facing */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-gray-900 text-sm md:text-[15px] tracking-tight">
              {faceText}
            </span>
            <span className="text-gray-400 text-[11px] font-normal">Facing</span>
          </div>

          <div className="w-px h-4 bg-gray-100"></div>

          {/* Building */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-gray-900 text-sm md:text-[15px] tracking-tight">
              {buildingCount}
            </span>
            <span className="text-gray-400 text-[11px] font-normal">Building</span>
          </div>

          <div className="w-px h-4 bg-gray-100"></div>

          {/* Comments */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-gray-900 text-sm md:text-[15px] tracking-tight">
              {comments}
            </span>
            <span className="text-gray-400 text-[11px] font-normal">Comments</span>
          </div>
        </footer>
      </div>
    </article>
  );
};
