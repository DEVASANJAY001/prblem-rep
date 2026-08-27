import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProblemDoc } from "@/types";
import { REAL_COMPANIES } from "@/data/realProductionData";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { useAuth } from "@/contexts/AuthContext";
import { isProblemBookmarked, toggleBookmark, voteProblem } from "@/lib/storage";
import { Eye, ShieldCheck, ThumbsUp, Bookmark } from "lucide-react";

interface TrendingCarouselCardProps {
  problem: ProblemDoc;
  className?: string;
}

export const TrendingCarouselCard: React.FC<TrendingCarouselCardProps> = ({
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

  // Normalize pain score (0 to 100 raw, formatted as /10 decimal)
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

    // Sector matching fallback using real company logos
    const indLower = industry.toLowerCase();
    return REAL_COMPANIES.filter((c) =>
      (c.industry && indLower.includes(c.industry.toLowerCase().slice(0, 4))) ||
      (c.name && ["Google", "Microsoft", "OpenAI", "Amazon"].includes(c.name))
    ).slice(0, 3).map((c) => ({ name: c.name, logoUrl: c.logoUrl }));
  }, [problem, industry]);

  // Views text (only eye and count)
  const rawViews = problem.views ?? 0;
  const viewsText = rawViews >= 1000 ? `${(rawViews / 1000).toFixed(1)}K` : `${rawViews}`;

  const isCritical = painNormalized >= 90;
  const isSevere = painNormalized >= 75 && painNormalized < 90;
  const gradientId = `trend-glow-${problem.id.replace(/[^a-zA-Z0-9]/g, "")}`;
  const cornerGradId = `corner-stroke-${problem.id.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <article
      className={`bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_2px_8px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_36px_-6px_rgba(244,63,94,0.12)] transition-all duration-300 overflow-hidden relative flex flex-col justify-between font-['Poppins',sans-serif] border border-gray-100/90 group shrink-0 ${className}`}
    >
      {/* 1.5px Curved Corner Red Gradient Stroke directly tracing rounded border */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none z-20 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
          <defs>
            <linearGradient id={cornerGradId} x1="128" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="1" />
              <stop offset="25%" stopColor="#fb7185" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#f43f5e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 0.75 L 104 0.75 A 23.25 23.25 0 0 1 127.25 24 L 127.25 128"
            stroke={`url(#${cornerGradId})`}
            strokeWidth="1.75"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="p-6 md:p-7 flex flex-col gap-4 flex-1 justify-between relative z-10">
        {/* Top Header: Category Pill + Company Logos + Views & Interactive Actions */}
        <header className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between gap-2.5 w-full">
            <div className="flex items-center gap-2 min-w-0 flex-wrap">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 bg-[#f4f2ff] px-2.5 py-1 rounded-full shrink-0">
                <span className="text-[11px] font-medium tracking-wide text-[#5c37eb] truncate max-w-[130px]">
                  {industry}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#5c37eb]"></div>
              </div>

              {/* Companies Interested Avatar Stack */}
              {attachedCompanies.length > 0 && (
                <div className="flex items-center -space-x-1.5 shrink-0">
                  {attachedCompanies.slice(0, 3).map((comp, idx) => (
                    <CompanyLogo
                      key={idx}
                      name={comp.name}
                      logoUrl={comp.logoUrl}
                      size="xs"
                      className="w-5 h-5 shadow-2xs ring-1 ring-white"
                    />
                  ))}
                  {attachedCompanies.length > 3 && (
                    <div
                      className="w-5 h-5 rounded-full bg-surface-container border border-gray-200/80 shadow-2xs flex items-center justify-center text-[8px] font-bold text-primary shrink-0"
                      title={`${attachedCompanies.length} companies interested`}
                    >
                      +{attachedCompanies.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Side: Views, Like, Save & Verified Checkmark */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 mr-1">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                <span>{viewsText}</span>
              </div>

              {/* Like / Upvote Button (Border-free Animated Thumbs Up: Gray if not liked, Blue if liked) */}
              <button
                type="button"
                onClick={handleLike}
                className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer select-none active:scale-90 ${
                  isLiked
                    ? "text-blue-600 font-bold"
                    : "text-gray-400 hover:text-blue-500"
                }`}
                title={isLiked ? "Liked" : "Like problem"}
              >
                <ThumbsUp
                  className={`w-3.5 h-3.5 transition-all duration-300 ${
                    isLiked
                      ? "fill-blue-600 text-blue-600 scale-110"
                      : "text-gray-400 hover:text-blue-500"
                  } ${likeAnimating ? "animate-bounce scale-125" : ""}`}
                />
                <span className="font-mono text-[10px]">{likesCount}</span>
              </button>

              {/* Save / Bookmark Button */}
              <button
                type="button"
                onClick={handleSave}
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  isSaved
                    ? "bg-primary/10 border-primary text-primary shadow-2xs"
                    : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary/40 hover:text-primary"
                }`}
                title={isSaved ? "Saved to Bookmarks" : "Save problem statement"}
              >
                <Bookmark className={`w-3 h-3 ${isSaved ? "fill-primary text-primary" : ""}`} />
              </button>

              <div
                className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 shrink-0 shadow-2xs border border-emerald-100/60"
                title="Verified Problem"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Title */}
          <Link to={`/problem/${problem.id}`} className="hover:text-[#5c37eb] transition-colors">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug line-clamp-2 tracking-tight group-hover:text-primary transition-colors">
              {problem.title}
            </h3>
          </Link>
        </header>

        {/* Middle Content Area: Description + Pain Score without /10 */}
        <div className="flex items-center justify-between gap-4 py-1">
          <p className="flex-1 text-gray-500 leading-relaxed text-xs font-normal line-clamp-3">
            {problem.description}
          </p>

          <div className="w-px h-14 bg-gray-100/90 shrink-0"></div>

          {/* Pain Score Widget without /10 */}
          <div className="flex flex-col items-center justify-center shrink-0 px-1">
            <div className="relative w-12 h-12">
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

                <circle
                  className="stroke-gray-100 fill-transparent"
                  strokeWidth="4.5"
                  cx="36"
                  cy="36"
                  r="28"
                />

                <circle
                  stroke={`url(#${gradientId})`}
                  className="fill-transparent transition-all duration-1000 ease-out"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  cx="36"
                  cy="36"
                  r="28"
                  strokeDasharray="175.93"
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>

              {/* Just the Pain Score Value (No /10) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-extrabold text-gray-900 leading-none tracking-tight">
                  {painDecimal}
                </span>
              </div>
            </div>

            <span className="text-[9px] text-gray-500 font-medium tracking-wide mt-1 whitespace-nowrap">
              Pain Score
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
