import React from "react";
import { Link } from "react-router-dom";
import { ProblemDoc } from "@/types";
import { UserAvatar } from "@/components/ui/UserAvatar";

interface TrendingProblemCardProps {
  problem: ProblemDoc;
  className?: string;
}

interface SolverCompany {
  name: string;
  icon: React.ReactNode;
}

const getIndustrySolvers = (industry: string): { companies: SolverCompany[]; totalCount: number } => {
  const ind = industry.toLowerCase();

  const googleIcon = (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>
  );

  const msftIcon = (
    <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
      <div className="bg-[#F25022] rounded-[0.5px]" />
      <div className="bg-[#7FBA00] rounded-[0.5px]" />
      <div className="bg-[#00A4EF] rounded-[0.5px]" />
      <div className="bg-[#FFB900] rounded-[0.5px]" />
    </div>
  );

  const amazonIcon = (
    <span className="font-black text-[9px] text-[#FF9900] leading-none font-sans">a</span>
  );

  const metaIcon = (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#0081FB]" fill="currentColor">
      <path d="M12 6.5C8.41 6.5 5.5 9.41 5.5 13c0 2.21 1.1 4.16 2.78 5.34l1.24-1.66C8.25 15.74 7.5 14.47 7.5 13c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5c0 1.47-.75 2.74-2.02 3.68l1.24 1.66C17.4 17.16 18.5 15.21 18.5 13c0-3.59-2.91-6.5-6.5-6.5z" />
    </svg>
  );

  const ibmIcon = (
    <span className="font-black text-[7.5px] text-[#0530AD] font-mono leading-none">IBM</span>
  );

  const openAiIcon = (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-900" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z" />
    </svg>
  );

  const stripeIcon = (
    <span className="font-black text-[9px] text-[#635BFF] font-sans">S</span>
  );

  const healthIcon = (
    <span className="font-bold text-[8px] text-[#E11D48] font-sans">Rx</span>
  );

  if (ind.includes("health") || ind.includes("bio") || ind.includes("medical")) {
    return {
      companies: [
        { name: "Pfizer", icon: healthIcon },
        { name: "Google Health", icon: googleIcon },
        { name: "Microsoft Health", icon: msftIcon },
        { name: "IBM Watson", icon: ibmIcon },
        { name: "Amazon Health", icon: amazonIcon },
      ],
      totalCount: 24,
    };
  }

  if (ind.includes("fintech") || ind.includes("hr") || ind.includes("payroll")) {
    return {
      companies: [
        { name: "Stripe", icon: stripeIcon },
        { name: "Google Cloud", icon: googleIcon },
        { name: "Microsoft", icon: msftIcon },
        { name: "Amazon AWS", icon: amazonIcon },
        { name: "Meta", icon: metaIcon },
      ],
      totalCount: 19,
    };
  }

  if (ind.includes("ai") || ind.includes("tech") || ind.includes("software")) {
    return {
      companies: [
        { name: "OpenAI", icon: openAiIcon },
        { name: "Google", icon: googleIcon },
        { name: "Microsoft", icon: msftIcon },
        { name: "Meta", icon: metaIcon },
        { name: "IBM", icon: ibmIcon },
      ],
      totalCount: 31,
    };
  }

  // Default / Agriculture / Energy / Others
  return {
    companies: [
      { name: "Google", icon: googleIcon },
      { name: "Microsoft", icon: msftIcon },
      { name: "Amazon", icon: amazonIcon },
      { name: "Meta", icon: metaIcon },
      { name: "IBM", icon: ibmIcon },
    ],
    totalCount: 22,
  };
};

export const TrendingProblemCard: React.FC<TrendingProblemCardProps> = ({
  problem,
  className = "",
}) => {
  // Normalize pain score (0 to 100)
  const painScore = Math.min(
    100,
    Math.max(
      1,
      problem.painScore
        ? problem.painScore <= 10
          ? Math.round(problem.painScore * 10)
          : problem.painScore
        : 87
    )
  );

  // SVG circular arc geometry with radius 28 (circumference = 2 * PI * 28 ≈ 175.93)
  const circumference = 175.93;
  const strokeDashoffset = circumference - circumference * (painScore / 100);

  const industry = problem.industry || "Agriculture & Food";
  const { companies, totalCount } = getIndustrySolvers(industry);
  const remainingCount = totalCount > 5 ? totalCount - 5 : 0;

  // Severity Level for gradient calculation
  const isCritical = painScore >= 90;
  const isSevere = painScore >= 75 && painScore < 90;

  // Pure Organic Database counts (Stable Monotonic Calculation)
  const rawViews = problem.views ?? 0;
  const views = rawViews >= 1000 ? `${(rawViews / 1000).toFixed(1)}K` : `${rawViews}`;

  const faceCount = Math.max(problem.validations?.faceCount ?? 0, problem.votes?.upvotes ?? 0);
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
          {/* Top Row: Category Pill + Separator + Company Icons Stack + Verified Icon */}
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

              {/* Companies Trying to Solve This Problem */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center -space-x-1.5">
                  {companies.slice(0, 5).map((comp, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-full border-2 border-white bg-gray-50 shadow-2xs p-0.5 flex items-center justify-center overflow-hidden shrink-0"
                      title={`${comp.name} is building solutions`}
                    >
                      {comp.icon}
                    </div>
                  ))}
                  {remainingCount > 0 && (
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white bg-[#f4f2ff] text-[#5c37eb] flex items-center justify-center text-[9px] font-bold z-10 shrink-0 shadow-2xs"
                      title={`${totalCount} companies building solutions`}
                    >
                      +{remainingCount}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Verified Checkmark Icon Only */}
            <div
              className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 shrink-0 shadow-2xs border border-emerald-100/60"
              title="Verified Problem"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>

          {/* Poppins Minimalist Title */}
          <Link to={`/problem/${problem.id}`} className="hover:text-[#5c37eb] transition-colors">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug line-clamp-2 tracking-tight">
              {problem.title}
            </h2>
          </Link>
        </header>

        {/* Main Content Area: Description + Redesigned Pain Score Widget */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-2">
          {/* Description */}
          <p className="flex-1 text-gray-500 leading-relaxed text-xs md:text-[13px] font-normal line-clamp-3 pr-0 sm:pr-4">
            {problem.description}
          </p>

          {/* Vertical Divider */}
          <div className="hidden sm:block w-px h-20 bg-gray-100/90 shrink-0"></div>

          {/* Clean Minimalist Pain Score Circle */}
          <div className="flex flex-col items-center justify-center shrink-0 self-center sm:self-auto px-2">
            {/* Glowing Gradient Circle Gauge */}
            <div className="relative w-16 h-16">
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
                  strokeWidth="4.5"
                  cx="36"
                  cy="36"
                  r="28"
                />

                {/* Dynamic Value Arc */}
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

              {/* Central Value */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-gray-900 leading-none tracking-tight">
                  {painScore}
                </span>
                <span className="text-[9px] text-gray-400 font-medium mt-0.5">
                  /100
                </span>
              </div>
            </div>

            {/* Pain Score Label */}
            <span className="text-[11px] text-gray-500 font-medium tracking-wide mt-1.5 whitespace-nowrap">
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

          <div className="w-px h-6 bg-gray-100"></div>

          {/* Face this */}
          <div className="flex flex-col items-center flex-1">
            <span className="font-semibold text-gray-900 text-sm md:text-[15px] tracking-tight">
              {faceText}
            </span>
            <span className="text-gray-400 text-[11px] font-normal">Face this</span>
          </div>

          <div className="w-px h-6 bg-gray-100"></div>

          {/* Building this */}
          <div className="flex flex-col items-center flex-1 gap-0.5">
            <span className="font-semibold text-gray-900 text-sm md:text-[15px] tracking-tight">
              {buildingCount}
            </span>
            <span className="text-gray-400 text-[11px] font-normal">Building</span>
          </div>

          <div className="w-px h-6 bg-gray-100"></div>

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
