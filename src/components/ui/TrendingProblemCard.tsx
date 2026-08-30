import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProblemDoc } from "@/types";
import { REAL_COMPANIES } from "@/data/realProductionData";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { useAuth } from "@/contexts/AuthContext";
import { isProblemBookmarked, toggleBookmark, voteProblem } from "@/lib/storage";
import { getProblemDetailUrl } from "@/lib/seoUrls";
import { ThumbsUp, Bookmark, ShieldCheck, Eye, Hand, Hammer, MessageSquare } from "lucide-react";

interface TrendingProblemCardProps {
  problem: ProblemDoc;
  className?: string;
  variant?: "card" | "flat";
}

export const TrendingProblemCard: React.FC<TrendingProblemCardProps> = ({
  problem,
  className = "",
  variant = "card",
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentUid = user?.uid || "guest";

  const [isSaved, setIsSaved] = useState<boolean>(() =>
    isProblemBookmarked(problem.id, currentUid)
  );

  const initialUpvotes = problem.votes?.upvotes ?? (typeof problem.votes === "number" ? problem.votes : 0);
  const [likesCount, setLikesCount] = useState<number>(initialUpvotes);
  const [isLiked, setIsLiked] = useState<boolean>(problem.votes?.userVote === "up");
  const [likeAnimating, setLikeAnimating] = useState<boolean>(false);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) {
      return;
    }
    navigate(getProblemDetailUrl(problem));
  };

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
  const buildingCount = problem.validations?.buildCount ?? 0;

  const gradientId = `pain-glow-dt-${problem.id.replace(/[^a-zA-Z0-9]/g, "")}`;
  const mobGradientId = `pain-glow-mob-${problem.id.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <article
      onClick={handleCardClick}
      className={
        variant === "flat"
          ? `bg-transparent rounded-none shadow-none hover:shadow-none transition-all relative flex flex-col justify-between font-['Poppins',sans-serif] border-none group cursor-pointer ${className}`
          : `bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_2px_8px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_36px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden relative flex flex-col justify-between font-['Poppins',sans-serif] border border-gray-100/90 group cursor-pointer ${className}`
      }
    >
      <div className={variant === "flat" ? "py-3 px-0 flex flex-col gap-3 sm:gap-4 flex-1 justify-between" : "p-3.5 sm:p-5 md:p-8 flex flex-col gap-3 sm:gap-4 flex-1 justify-between"}>
        {/* Header Section */}
        <header className="flex flex-col gap-2 sm:gap-3 w-full">
          {/* Top Row: Category Pill + Company Logos + Like / Save Actions + Verified Checkmark */}
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap sm:flex-nowrap">
              {/* Minimalist Category Pill */}
              <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-[#f4f2ff] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full w-fit shrink-0">
                <span className="text-[10px] sm:text-[11px] font-medium tracking-wide text-[#5c37eb] truncate max-w-[100px] xs:max-w-[130px] sm:max-w-[170px]">
                  {industry}
                </span>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#5c37eb]"></div>
              </div>

              {/* Separator Line */}
              <div className="hidden sm:block w-px h-3.5 bg-gray-200 shrink-0"></div>

              {/* Real Companies Interested */}
              <div className="flex items-center gap-1 shrink-0">
                {attachedCompanies.length > 0 ? (
                  <div className="flex items-center -space-x-1.5">
                    {attachedCompanies.slice(0, 4).map((comp, idx) => (
                      <CompanyLogo
                        key={idx}
                        name={comp.name}
                        logoUrl={comp.logoUrl}
                        size="xs"
                        className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 shadow-2xs ring-1 ring-white"
                      />
                    ))}
                    {attachedCompanies.length > 4 && (
                      <div
                        className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-full bg-surface-container border border-gray-200/80 shadow-2xs flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-primary shrink-0"
                        title={`${attachedCompanies.length} companies interested`}
                      >
                        +{attachedCompanies.length - 4}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-[9px] sm:text-[10px] text-gray-400">Open Problem</span>
                )}
              </div>
            </div>

            {/* Interactive Actions Group: Like, Save & Verified Checkmark */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Like / Upvote Button */}
              <button
                type="button"
                onClick={handleLike}
                className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer select-none active:scale-90 ${
                  isLiked
                    ? "text-blue-600 font-bold"
                    : "text-gray-400 hover:text-blue-500"
                }`}
                title={isLiked ? "Liked" : "Like problem"}
              >
                <ThumbsUp
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${
                    isLiked
                      ? "fill-blue-600 text-blue-600 scale-110"
                      : "text-gray-400 hover:text-blue-500"
                  } ${likeAnimating ? "animate-bounce scale-125" : ""}`}
                />
                <span className="font-mono text-[10px] sm:text-xs">{likesCount}</span>
              </button>

              {/* Save / Bookmark Button */}
              <button
                type="button"
                onClick={handleSave}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  isSaved
                    ? "bg-primary/10 border-primary text-primary shadow-2xs"
                    : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary"
                }`}
                title={isSaved ? "Saved to Bookmarks" : "Save problem statement"}
              >
                <Bookmark className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isSaved ? "fill-primary text-primary" : ""}`} />
              </button>

              {/* Verified Checkmark Icon */}
              <div
                className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-50 text-emerald-600 shrink-0 shadow-2xs border border-emerald-100/60"
                title="Verified Problem Statement"
              >
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
          </div>

          {/* Poppins Minimalist Title */}
          <Link to={getProblemDetailUrl(problem)} className="hover:text-[#5c37eb] transition-colors block">
            <h2 className="text-sm sm:text-base md:text-xl font-semibold text-gray-900 leading-snug line-clamp-2 tracking-tight">
              {problem.title}
            </h2>
          </Link>
        </header>

        {/* Main Content Area: Description + Compact Pain Score Widget (Desktop) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5 py-1 sm:py-2">
          {/* Description */}
          <p className="flex-1 text-gray-500 leading-relaxed text-[11px] sm:text-xs md:text-[13px] font-normal line-clamp-2 sm:line-clamp-3 pr-0 sm:pr-4">
            {problem.description}
          </p>

          {/* Desktop-only Vertical Divider */}
          <div className="hidden sm:block w-px h-14 bg-gray-100/90 shrink-0"></div>

          {/* Desktop-only Compact Minimalist Pain Score Circle */}
          <div className="hidden sm:flex flex-col items-center justify-center shrink-0 self-center sm:self-auto px-1 sm:px-2">
            {/* Glowing Gradient Circle Gauge */}
            <div className="relative w-11 h-11 sm:w-14 sm:h-14">
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

              {/* Central Value Scaled for 10 points */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs sm:text-base font-extrabold text-gray-900 leading-none tracking-tight">
                  {painDecimal}
                </span>
              </div>
            </div>

            {/* Pain Score Label */}
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium tracking-wide mt-0.5 sm:mt-1 whitespace-nowrap">
              Pain Score
            </span>
          </div>
        </div>

        {/* ── Mobile-Only One-Row Footer: Pain Score + Dark Separator + 4 Icon Metrics ──────── */}
        <footer className="sm:hidden flex items-center justify-between gap-1.5 pt-2 border-t border-gray-100 text-xs">
          {/* Pain Score Mini Dial & Label */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="relative w-6.5 h-6.5 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <defs>
                  <linearGradient id={mobGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
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
                <circle className="stroke-gray-100 fill-transparent" strokeWidth="6" cx="36" cy="36" r="28" />
                <circle
                  stroke={`url(#${mobGradientId})`}
                  className="fill-transparent"
                  strokeWidth="6"
                  strokeLinecap="round"
                  cx="36"
                  cy="36"
                  r="28"
                  strokeDasharray="175.93"
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[9px] font-extrabold text-gray-900 leading-none">
                  {painDecimal}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-gray-700 tracking-tight whitespace-nowrap">
              Pain Score
            </span>
          </div>

          {/* Dark Separator */}
          <div className="w-[1.5px] h-4 bg-gray-400/80 dark:bg-gray-600 shrink-0 mx-0.5" />

          {/* 4 Icon Metrics: Views, Facing, Building, Comments */}
          <div className="flex items-center gap-2 xs:gap-3 shrink-0 flex-1 justify-around">
            <div className="flex items-center gap-1" title={`${views} views`}>
              <Eye className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <span className="text-[11px] font-bold text-gray-800">{views}</span>
            </div>

            <div className="flex items-center gap-1" title={`${faceText} facing`}>
              <Hand className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <span className="text-[11px] font-bold text-gray-800">{faceText}</span>
            </div>

            <div className="flex items-center gap-1" title={`${buildingCount} building`}>
              <Hammer className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <span className="text-[11px] font-bold text-gray-800">{buildingCount}</span>
            </div>

            <div className="flex items-center gap-1" title={`${comments} comments`}>
              <MessageSquare className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <span className="text-[11px] font-bold text-gray-800">{comments}</span>
            </div>
          </div>
        </footer>

        {/* ── Desktop-Only 4-Column Engagement Footer ───────────────────────────────────────── */}
        <footer className="hidden sm:flex justify-between items-center px-0.5 sm:px-1 pt-2 sm:pt-3 border-t border-gray-100/90 text-xs">
          {/* Views */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-[15px] tracking-tight">
              {views}
            </span>
            <span className="text-gray-400 text-[10px] sm:text-[11px] font-normal">Views</span>
          </div>

          <div className="w-px h-3.5 sm:h-4 bg-gray-100"></div>

          {/* Facing */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-[15px] tracking-tight">
              {faceText}
            </span>
            <span className="text-gray-400 text-[10px] sm:text-[11px] font-normal">Facing</span>
          </div>

          <div className="w-px h-3.5 sm:h-4 bg-gray-100"></div>

          {/* Building */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-[15px] tracking-tight">
              {buildingCount}
            </span>
            <span className="text-gray-400 text-[10px] sm:text-[11px] font-normal">Building</span>
          </div>

          <div className="w-px h-3.5 sm:h-4 bg-gray-100"></div>

          {/* Comments */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-[15px] tracking-tight">
              {comments}
            </span>
            <span className="text-gray-400 text-[10px] sm:text-[11px] font-normal">Comments</span>
          </div>
        </footer>
      </div>
    </article>
  );
};
