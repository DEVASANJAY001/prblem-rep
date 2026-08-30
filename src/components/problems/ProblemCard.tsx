import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProblemDoc } from "@/types";
import { BadgePill } from "@/components/ui/BadgePill";
import { voteProblem, toggleBookmark, isProblemBookmarked } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { getProblemDetailUrl, getStartupModeUrl } from "@/lib/seoUrls";
import {
  ArrowUp,
  ArrowDown,
  Bookmark,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Share2,
  Clock,
} from "lucide-react";

interface ProblemCardProps {
  problem: ProblemDoc;
  onVoteChange?: () => void;
  layout?: "grid" | "list";
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onVoteChange,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [upvotes, setUpvotes] = useState(problem.votes?.upvotes || 0);
  const [downvotes, setDownvotes] = useState(problem.votes?.downvotes || 0);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(problem.votes?.userVote || null);
  const [bookmarked, setBookmarked] = useState(() =>
    isProblemBookmarked(problem.id, user?.uid || "guest")
  );
  const [copied, setCopied] = useState(false);

  const handleVote = (e: React.MouseEvent, type: "up" | "down") => {
    e.preventDefault();
    e.stopPropagation();
    const result = voteProblem(problem.id, type, user?.uid || "guest");
    setUpvotes(result.upvotes);
    setDownvotes(result.downvotes);
    setUserVote(result.userVote);
    if (onVoteChange) onVoteChange();
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isNow = toggleBookmark(problem.id, user?.uid || "guest");
    setBookmarked(isNow);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}${getProblemDetailUrl(problem)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(problem.submittedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      onClick={() => navigate(getProblemDetailUrl(problem))}
      className="card-hover group relative flex cursor-pointer flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 transition-all dark:border-zinc-800 dark:bg-zinc-900/90"
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <BadgePill label={problem.industry} variant="brand" />
            <BadgePill label={problem.severity} variant="severity" severity={problem.severity} />
            {problem.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formattedDate}
            </span>
            <button
              onClick={handleBookmark}
              title={bookmarked ? "Remove bookmark" : "Save problem"}
              className={`rounded p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                bookmarked ? "text-primary" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              }`}
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-primary text-primary" : ""}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-base font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-primary dark:text-zinc-50 sm:text-lg">
          {problem.title}
        </h3>

        {/* Description Excerpt */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {problem.description}
        </p>
      </div>

      {/* Center Scores & Context */}
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
        {/* Pain & Opportunity Badges */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Pain</span>
              <span className="text-sm font-bold tabular-nums text-rose-600 dark:text-rose-400">
                {problem.painScore}/100
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

          <div className="flex items-center gap-1.5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Opportunity</span>
              <span className="text-sm font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                {problem.opportunityScore}/100
              </span>
            </div>
          </div>

          {problem.aiScores?.overall && (
            <>
              <div className="hidden sm:block h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">AI Index</span>
                <span className="text-sm font-bold tabular-nums text-primary">
                  {problem.aiScores.overall}/100
                </span>
              </div>
            </>
          )}
        </div>

        {/* Startup Brief CTA */}
        <Link
          to={getStartupModeUrl(problem)}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary transition-all hover:bg-primary hover:text-white"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Startup Brief</span>
        </Link>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        {/* Voting pills */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => handleVote(e, "up")}
            className={`flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-colors ${
              userVote === "up"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <ArrowUp className={`h-3.5 w-3.5 ${userVote === "up" ? "text-emerald-600" : ""}`} />
            <span className="tabular-nums">{upvotes}</span>
          </button>

          <button
            onClick={(e) => handleVote(e, "down")}
            className={`flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-colors ${
              userVote === "down"
                ? "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <ArrowDown className={`h-3.5 w-3.5 ${userVote === "down" ? "text-rose-600" : ""}`} />
            <span className="tabular-nums">{downvotes}</span>
          </button>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{problem.commentsCount || 0}</span>
          </span>

          <button
            onClick={handleShare}
            title="Copy link"
            className="flex items-center gap-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
