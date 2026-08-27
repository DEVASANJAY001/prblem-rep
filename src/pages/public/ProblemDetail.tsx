import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getProblemById,
  subscribeProblemById,
  voteProblem,
  addComment,
  recordProblemView,
  toggleCommunityValidation,
  recordUserInterest,
  toggleUserInterest,
  addProblemReply,
  toggleCommentLike,
} from "@/lib/firebase/services/problemsService";
import { ProblemDoc, ProblemComment, CommentReply } from "@/types";
import { toggleBookmark, isProblemBookmarked } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingContainer } from "@/components/common/LoadingContainer";
import { UserAvatar } from "@/components/ui/UserAvatar";
import {
  Bookmark,
  Share2,
  CheckCircle,
  Eye,
  Flame,
  FileText,
  ExternalLink,
  Check,
  Heart,
  Bot,
  Leaf,
  Building2,
  ArrowLeft,
  Send,
  CornerDownRight,
  MessageSquare,
  ThumbsUp,
  Hand,
  DollarSign,
  Hammer,
  Code,
  Copy,
  ShieldCheck,
  X,
  Globe,
} from "lucide-react";

interface SolverCompany {
  name: string;
  icon: React.ReactNode;
}

const getIndustrySolvers = (industry: string): { companies: SolverCompany[]; totalCount: number } => {
  const ind = industry.toLowerCase();

  const googleIcon = (
    <svg viewBox="0 0 24 24" className="w-3 h-3">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );

  const msftIcon = (
    <div className="grid grid-cols-2 gap-0.5 w-2.5 h-2.5">
      <div className="bg-[#F25022] rounded-[0.5px]" />
      <div className="bg-[#7FBA00] rounded-[0.5px]" />
      <div className="bg-[#00A4EF] rounded-[0.5px]" />
      <div className="bg-[#FFB900] rounded-[0.5px]" />
    </div>
  );

  const amazonIcon = (
    <span className="font-black text-[8.5px] text-[#FF9900] leading-none font-sans">a</span>
  );

  const metaIcon = (
    <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#0081FB]" fill="currentColor">
      <path d="M12 6.5C8.41 6.5 5.5 9.41 5.5 13c0 2.21 1.1 4.16 2.78 5.34l1.24-1.66C8.25 15.74 7.5 14.47 7.5 13c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5c0 1.47-.75 2.74-2.02 3.68l1.24 1.66C17.4 17.16 18.5 15.21 18.5 13c0-3.59-2.91-6.5-6.5-6.5z" />
    </svg>
  );

  const ibmIcon = (
    <span className="font-black text-[7px] text-[#0530AD] font-mono leading-none">IBM</span>
  );

  const healthIcon = (
    <span className="font-bold text-[7.5px] text-[#E11D48] font-sans">Rx</span>
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
      totalCount: 26,
    };
  }

  return {
    companies: [
      { name: "Google", icon: googleIcon },
      { name: "Microsoft", icon: msftIcon },
      { name: "Amazon", icon: amazonIcon },
      { name: "Meta", icon: metaIcon },
      { name: "IBM", icon: ibmIcon },
    ],
    totalCount: 38,
  };
};

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "3 days ago";
  try {
    const now = Date.now();
    const past = new Date(dateString).getTime();
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffMins > 0) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    return "Just now";
  } catch (e) {
    return "3 days ago";
  }
}

export const ProblemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, userDoc } = useAuth();
  const currentUid = user?.uid || userDoc?.uid || "guest";

  const [problem, setProblem] = useState<ProblemDoc | null>(null);
  const [loading, setLoading] = useState(true);

  // Realtime Live Stats
  const [viewsCount, setViewsCount] = useState(0);
  const [interestedCount, setInterestedCount] = useState(0);
  const [userInterested, setUserInterested] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "description" | "evidence" | "discussion" | "research" | "competitors" | "suggested_mvp" | "related"
  >("description");

  const [bookmarked, setBookmarked] = useState(false);
  const [shared, setShared] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Validation Action Counts & States
  const [faceCount, setFaceCount] = useState(0);
  const [faced, setFaced] = useState(false);

  const [greatCount, setGreatCount] = useState(0);
  const [votedGreat, setVotedGreat] = useState(false);

  const [payCount, setPayCount] = useState(0);
  const [paid, setPaid] = useState(false);

  const [buildCount, setBuildCount] = useState(0);
  const [built, setBuilt] = useState(false);

  // Hierarchical Threaded Discussion state
  const [comments, setComments] = useState<ProblemComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const hasRecordedView = useRef(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const cleanId = decodeURIComponent(id).trim();

    const unsubscribe = subscribeProblemById(cleanId, (p) => {
      if (p) {
        setProblem((prev) => (prev ? { ...prev, ...p } : p));
        setViewsCount((prev) => Math.max(prev, p.views || 0));
        setInterestedCount((prev) =>
          Math.max(prev, p.interestedCount || 0, p.interestedUsers?.length || 0)
        );
        if (p.interestedUsers?.includes(currentUid)) {
          setUserInterested(true);
        }

        if (p.validations) {
          setFaceCount((prev) => Math.max(prev, p.validations?.faceCount || 0));
          setGreatCount((prev) => Math.max(prev, p.validations?.greatCount || 0));
          setPayCount((prev) => Math.max(prev, p.validations?.payCount || 0));
          setBuildCount((prev) => Math.max(prev, p.validations?.buildCount || 0));

          const userVals = p.validations.userValidations?.[currentUid] || [];
          if (userVals.includes("face")) setFaced(true);
          if (userVals.includes("great")) setVotedGreat(true);
          if (userVals.includes("pay")) setPaid(true);
          if (userVals.includes("build")) setBuilt(true);
        }

        setComments((prevComments) => {
          if (!p.comments || p.comments.length === 0) return prevComments;
          const map = new Map<string, ProblemComment>();
          prevComments.forEach((c) => map.set(c.id, c));
          p.comments.forEach((c) => {
            const existing = map.get(c.id);
            if (!existing) {
              map.set(c.id, c);
            } else {
              const repliesMap = new Map<string, any>();
              (existing.replies || []).forEach((r) => repliesMap.set(r.id, r));
              (c.replies || []).forEach((r) => repliesMap.set(r.id, r));
              map.set(c.id, {
                ...existing,
                ...c,
                likes: Math.max(existing.likes || 0, c.likes || 0),
                replies: Array.from(repliesMap.values()),
              });
            }
          });
          return Array.from(map.values());
        });

        if (isProblemBookmarked(p.id, currentUid)) {
          setBookmarked(true);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    // Record Realtime Page View once per session
    if (!hasRecordedView.current) {
      hasRecordedView.current = true;
      recordProblemView(cleanId).then((newViews) => {
        if (newViews) setViewsCount(newViews);
      });
    }

    // Algorithmic Interest: 60-second dwell time trigger
    const dwellTimer = setTimeout(() => {
      recordUserInterest(cleanId, currentUid, "dwell_time").then((count) => {
        if (count) setInterestedCount(count);
      });
    }, 60000);

    return () => {
      unsubscribe();
      clearTimeout(dwellTimer);
    };
  }, [id, currentUid]);

  const requireAuth = () => {
    if (!user && !userDoc) {
      navigate("/login", { state: { from: location.pathname } });
      return false;
    }
    return true;
  };

  const handleInterestToggle = async () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const res = await toggleUserInterest(problem.id, currentUid);
    setUserInterested(res.interested);
    setInterestedCount(res.count);
  };

  const handleTabClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    if (problem) {
      recordUserInterest(problem.id, user?.uid || "visitor", `tab_${tabId}`).then((c) => {
        if (c) setInterestedCount(c);
      });
    }
  };

  const handleBookmark = () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const nextState = toggleBookmark(problem.id, user?.uid);
    setBookmarked(nextState);
    recordUserInterest(problem.id, user?.uid || "user", "bookmark").then((c) => {
      if (c) setInterestedCount(c);
    });
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
    if (problem) {
      recordUserInterest(problem.id, user?.uid || "visitor", "share").then((c) => {
        if (c) setInterestedCount(c);
      });
    }
  };

  const handleFaceToggle = async () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const res = await toggleCommunityValidation(problem.id, "face", user?.uid || "user");
    setFaced(res.userHasValidated);
    setFaceCount(res.validations.faceCount);
    recordUserInterest(problem.id, user?.uid || "user", "validate_face").then((c) => {
      if (c) setInterestedCount(c);
    });
  };

  const handleGreatToggle = async () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const res = await toggleCommunityValidation(problem.id, "great", user?.uid || "user");
    setVotedGreat(res.userHasValidated);
    setGreatCount(res.validations.greatCount);
    recordUserInterest(problem.id, user?.uid || "user", "validate_great").then((c) => {
      if (c) setInterestedCount(c);
    });
  };

  const handlePayToggle = async () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const res = await toggleCommunityValidation(problem.id, "pay", user?.uid || "user");
    setPaid(res.userHasValidated);
    setPayCount(res.validations.payCount);
    recordUserInterest(problem.id, user?.uid || "user", "validate_pay").then((c) => {
      if (c) setInterestedCount(c);
    });
  };

  const handleBuildToggle = async () => {
    if (!requireAuth()) return;
    if (!problem) return;
    const res = await toggleCommunityValidation(problem.id, "build", user?.uid || "user");
    setBuilt(res.userHasValidated);
    setBuildCount(res.validations.buildCount);
    recordUserInterest(problem.id, user?.uid || "user", "validate_build").then((c) => {
      if (c) setInterestedCount(c);
    });
  };

  const handleLikeComment = async (commentId: string, replyId?: string) => {
    if (!requireAuth()) return;
    if (!problem) return;

    const userUid = user?.uid || "user";
    const res = await toggleCommentLike(problem.id, commentId, replyId, userUid);

    setComments((prev) =>
      prev.map((c) => {
        if (replyId && c.id === commentId && c.replies) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === replyId) {
                return { ...r, liked: res.liked, likes: res.likes };
              }
              return r;
            }),
          };
        } else if (c.id === commentId) {
          return { ...c, liked: res.liked, likes: res.likes };
        }
        return c;
      })
    );
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (!newComment.trim() || !problem) return;

    const authorName = userDoc?.name || user?.displayName || "Community Innovator";
    const authorRole = userDoc?.role === "admin" ? "Admin" : "Practitioner";

    const commentObj: ProblemComment = {
      id: `c-${Date.now()}`,
      author: authorName,
      role: authorRole,
      text: newComment.trim(),
      date: "Just now",
      likes: 0,
      replies: [],
    };

    setComments([commentObj, ...comments]);
    setNewComment("");

    await addComment(
      problem.id,
      {
        uid: userDoc?.uid || user?.uid || "member",
        name: authorName,
        photoURL: userDoc?.photoURL || user?.photoURL || null,
        role: authorRole,
      },
      newComment.trim()
    );

    recordUserInterest(problem.id, user?.uid || "user", "comment").then((c) => {
      if (c) setInterestedCount(c);
    });
  };

  const handleAddReply = async (parentCommentId: string) => {
    if (!requireAuth()) return;
    if (!replyText.trim() || !problem) return;

    const authorName = userDoc?.name || user?.displayName || "Community Innovator";
    const authorRole = userDoc?.role === "admin" ? "Admin" : "Practitioner";

    const newReply: CommentReply = {
      id: `r-${Date.now()}`,
      author: authorName,
      role: authorRole,
      text: replyText.trim(),
      date: "Just now",
      likes: 0,
    };

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === parentCommentId) {
          return { ...c, replies: [...(c.replies || []), newReply] };
        }
        return c;
      })
    );

    setReplyText("");
    setReplyingToId(null);

    await addProblemReply(
      problem.id,
      parentCommentId,
      {
        uid: userDoc?.uid || user?.uid || "member",
        name: authorName,
        role: authorRole,
      },
      newReply.text
    );

    recordUserInterest(problem.id, user?.uid || "user", "reply").then((c) => {
      if (c) setInterestedCount(c);
    });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20">
        <LoadingContainer
          message="Loading problem dossier from Cloud Firestore..."
          submessage="Retrieving multi-metric AI analysis, evidence links, and community telemetry."
          minHeight="min-h-[400px]"
        />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center text-on-surface font-['Poppins',sans-serif]">
        <h2 className="text-2xl font-bold text-on-surface">Problem Not Found</h2>
        <p className="mt-2 text-sm text-on-surface-variant">The problem you are looking for does not exist or has been removed.</p>
        <Link to="/explore" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>
      </div>
    );
  }

  // Calculated Pain and Opportunity scores
  const rawPain = problem.painScore || 93;
  const painScore = rawPain <= 10 ? (rawPain * 10).toFixed(0) : rawPain.toFixed(0);
  const painDecimal = (Number(painScore) / 10).toFixed(1);

  const rawOpp = problem.opportunityScore || 85;
  const oppScore = rawOpp <= 10 ? (rawOpp * 10).toFixed(0) : rawOpp.toFixed(0);
  const oppDecimal = (Number(oppScore) / 10).toFixed(1);

  const industry = problem.industry || "Healthcare & Life Sciences";
  const formattedViews = viewsCount >= 1000 ? `${(viewsCount / 1000).toFixed(1)}K` : `${viewsCount}`;
  const solverInfo = getIndustrySolvers(industry);
  const totalCommentsCount = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);
  const isTrending = viewsCount >= 50 || rawPain >= 90 || (problem.votes?.upvotes || 0) > 100;
  const relativePostTime = formatRelativeTime(problem.submittedAt || problem.createdAt);

  return (
    <div className="w-full min-h-screen bg-surface font-['Poppins',sans-serif] text-on-surface">
      <main className="w-full max-w-[1280px] mx-auto px-4 md:px-12 py-8 flex flex-col gap-6">
        {/* ── Top Breadcrumb & Action Toolbar (Seamless Flow) ─────────────── */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-3">
          <div className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5 flex-wrap">
            <Link to="/explore" className="hover:underline text-on-surface-variant">
              Explore
            </Link>
            <span>&gt;</span>
            <span className="text-on-surface-variant">{industry}</span>
            <span>&gt;</span>
            <span className="text-on-surface font-semibold truncate max-w-[280px]">
              {problem.title}
            </span>
          </div>

          {/* Bookmark & Share Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleBookmark}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${bookmarked
                ? "bg-primary/10 text-primary shadow-2xs font-bold"
                : "bg-surface-container/60 text-on-surface-variant hover:bg-surface-container"
                }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
              <span>{bookmarked ? "Saved" : "Save"}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-full bg-surface-container/60 hover:bg-surface-container text-on-surface-variant text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer relative"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shared ? "Copied!" : "Share"}</span>
            </button>
          </div>
        </div>

        {/* ── Top Split Fade Divider Line ─────────────────────────────────── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent -mt-2" />

        {/* ── Header Metadata & Clean Circular Score Dials + Sub-metrics ──── */}
        <div className="w-full flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="flex flex-col gap-3 max-w-2xl flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold">
                {industry.split("&")[0].trim()}
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                Open
              </span>
              <span className="flex items-center gap-1 text-primary text-xs font-bold bg-primary/10 px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Verified
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight leading-snug">
              {problem.title}
            </h1>
            <p className="text-xs text-on-surface-variant font-medium">
              Posted by {problem.submitterName || problem.submittedBy || "Anonymous"} · {relativePostTime}
            </p>

            <div className="flex items-center gap-4 text-xs text-on-surface-variant mt-0.5">
              <div className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[16px] text-gray-400">visibility</span>
                <span>{formattedViews} views</span>
              </div>
              {isTrending && (
                <div className="flex items-center gap-1 text-xs font-semibold text-[#ff2a55]">
                  <Flame className="w-3.5 h-3.5 fill-[#ff2a55] text-[#ff2a55]" />
                  <span>Trending</span>
                </div>
              )}
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed font-normal mt-1">
              {problem.description}
            </p>
          </div>

          {/* Right Column: Large Gauges + Generous Spacing + Engagement Metrics + Solver Companies */}
          <div className="flex flex-col items-center md:items-end gap-6 shrink-0 self-center md:self-start pt-1">
            {/* Score Dials: Pain Score & Opportunity */}
            <div className="flex items-center gap-8">
              {/* Pain Score Dial (Flame Thermal Gradient) */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-22 h-22 md:w-24 md:h-24">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                    <defs>
                      <linearGradient id="painDetailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff2a55" />
                        <stop offset="60%" stopColor="#ff4d00" />
                        <stop offset="100%" stopColor="#ff7a00" />
                      </linearGradient>
                    </defs>
                    <circle className="stroke-gray-200/70 fill-transparent" strokeWidth="6" cx="48" cy="48" r="38" />
                    <circle
                      stroke="url(#painDetailGrad)"
                      className="fill-transparent transition-all duration-1000 ease-out"
                      strokeWidth="6"
                      strokeLinecap="round"
                      cx="48"
                      cy="48"
                      r="38"
                      strokeDasharray="238.76"
                      strokeDashoffset={238.76 - 238.76 * (Number(painScore) / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-black text-gray-900 leading-none tracking-tight">
                      {painDecimal}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold mt-0.5">/10</span>
                  </div>
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-700 mt-2 whitespace-nowrap">
                  Pain Score
                </span>
              </div>

              {/* Opportunity Score Dial (Emerald Green Gradient) */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-22 h-22 md:w-24 md:h-24">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                    <defs>
                      <linearGradient id="oppDetailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="60%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <circle className="stroke-gray-200/70 fill-transparent" strokeWidth="6" cx="48" cy="48" r="38" />
                    <circle
                      stroke="url(#oppDetailGrad)"
                      className="fill-transparent transition-all duration-1000 ease-out"
                      strokeWidth="6"
                      strokeLinecap="round"
                      cx="48"
                      cy="48"
                      r="38"
                      strokeDasharray="238.76"
                      strokeDashoffset={238.76 - 238.76 * (Number(oppScore) / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-black text-gray-900 leading-none tracking-tight">
                      {oppDecimal}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold mt-0.5">/10</span>
                  </div>
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-700 mt-2 whitespace-nowrap">
                  Opportunity
                </span>
              </div>
            </div>

            {/* Sub-Metrics Container with generous space */}
            <div className="flex flex-col items-center md:items-end gap-3 mt-2">
              {/* Engagement Metrics Container (Views, Face this, Building, Comments) */}
              <div className="flex items-center gap-2.5 bg-surface-container/50 px-4 py-2 rounded-full text-xs font-medium text-on-surface-variant border border-gray-200/40">
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  <span>{formattedViews} Views</span>
                </div>
                <span className="text-gray-300">·</span>
                <div className="flex items-center gap-1">
                  <Hand className="w-3.5 h-3.5 text-gray-400" />
                  <span>{faceCount} Face this</span>
                </div>
                <span className="text-gray-300">·</span>
                <div className="flex items-center gap-1">
                  <Hammer className="w-3.5 h-3.5 text-gray-400" />
                  <span>{buildCount} Building</span>
                </div>
                <span className="text-gray-300">·</span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                  <span>{totalCommentsCount} Comments</span>
                </div>
              </div>

              {/* Solver Companies Container (Card-Style Stack) */}
              <div className="flex items-center gap-2.5 bg-surface-container/50 px-4 py-2 rounded-full text-xs font-medium text-on-surface-variant border border-gray-200/40">
                <span className="text-gray-500 font-medium">Solving this:</span>
                <div className="flex items-center -space-x-1.5">
                  {solverInfo.companies.slice(0, 5).map((comp, idx) => (
                    <div
                      key={idx}
                      title={comp.name}
                      className="w-5.5 h-5.5 rounded-full bg-white border border-gray-200/80 shadow-2xs flex items-center justify-center overflow-hidden"
                    >
                      {comp.icon}
                    </div>
                  ))}
                  {solverInfo.totalCount > 5 && (
                    <div className="w-5.5 h-5.5 rounded-full bg-surface-container border border-gray-200/80 shadow-2xs flex items-center justify-center text-[9px] font-bold text-gray-600">
                      +{solverInfo.totalCount - 5}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs Navigation ──────────────────────────────────────────────── */}
        <div className="w-full flex gap-8 border-b border-gray-200/70 pb-1 mt-2">
          <nav className="flex overflow-x-auto gap-8 w-full hide-scrollbar">
            {[
              { id: "description", label: "Description" },
              { id: "evidence", label: "Evidence" },
              { id: "discussion", label: "Discussion" },
              { id: "research", label: "Research" },
              { id: "competitors", label: "Competitors" },
              { id: "suggested_mvp", label: "Suggested MVP" },
              { id: "related", label: "Related Problems" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as any)}
                className={`pb-3 border-b-2 text-xs md:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${activeTab === tab.id
                  ? "text-primary border-primary font-bold"
                  : "text-on-surface-variant border-transparent hover:text-on-surface"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* ── 2-Column Layout: Left Main Content (70%) + Right Validation (30%) ── */}
        <div className="w-full flex flex-col lg:flex-row gap-10 items-start mt-2">
          {/* 70% Left Main Content Area */}
          <div className="w-full lg:w-[70%] flex flex-col gap-6">
            {/* 1. Description Tab */}
            {activeTab === "description" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                {/* Core Issue Section */}
                <div className="flex flex-col gap-2 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">Core Issue</h3>
                  <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-normal">
                    {problem.description}
                  </p>
                </div>

                {/* Split Fade Divider Line */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                {/* Operational Narrative & Context */}
                <div className="flex flex-col gap-4 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">
                    Operational Narrative & Context
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {problem.whenItHappens && (
                      <div className="bg-surface-container/30 p-4 rounded-xl flex flex-col gap-1 border border-outline-variant/20">
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                          When It Happens
                        </span>
                        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-normal">
                          {problem.whenItHappens}
                        </p>
                      </div>
                    )}

                    {problem.whoFacesIt && (
                      <div className="bg-surface-container/30 p-4 rounded-xl flex flex-col gap-1 border border-outline-variant/20">
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                          Who Faces It
                        </span>
                        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-normal">
                          {problem.whoFacesIt}
                        </p>
                      </div>
                    )}

                    {problem.whyFrustrating && (
                      <div className="bg-surface-container/30 p-4 rounded-xl flex flex-col gap-1 border border-outline-variant/20 md:col-span-2">
                        <span className="text-[11px] font-bold text-error uppercase tracking-wider">
                          Why It's Frustrating
                        </span>
                        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-normal">
                          {problem.whyFrustrating}
                        </p>
                      </div>
                    )}

                    {problem.currentSolution && (
                      <div className="bg-surface-container/30 p-4 rounded-xl flex flex-col gap-1 border border-outline-variant/20 md:col-span-2">
                        <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                          Current Solution / Workarounds
                        </span>
                        <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-normal">
                          {problem.currentSolution}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Split Fade Divider Line */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                {/* Market Size & Impact Section */}
                <div className="flex flex-col gap-4 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">Market Size & Impact</h3>
                  <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
                    Impacting approximately {problem.marketData?.citizensAffected || problem.audienceSize || "10M+"} citizens globally, this inefficiency contributes to an estimated {problem.marketData?.wastedCost || "$500M"} in wasted administrative costs annually.
                  </p>

                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${problem.marketData?.currentPenetration || 35}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                    <span>Current Penetration ({problem.marketData?.currentPenetration || 35}%)</span>
                    <span>Total Addressable Market ({problem.marketData?.tam || problem.estimatedValue || "$4.2B"})</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    <div className="bg-surface-container/40 p-3 rounded-xl">
                      <span className="text-[10px] text-gray-500 font-bold uppercase block">TAM</span>
                      <span className="text-xs md:text-sm font-bold text-on-surface">{problem.marketData?.tam || problem.estimatedValue || "$4.2B"}</span>
                    </div>
                    <div className="bg-surface-container/40 p-3 rounded-xl">
                      <span className="text-[10px] text-gray-500 font-bold uppercase block">Wasted Cost</span>
                      <span className="text-xs md:text-sm font-bold text-error">{problem.marketData?.wastedCost || "$500M"}</span>
                    </div>
                    <div className="bg-surface-container/40 p-3 rounded-xl">
                      <span className="text-[10px] text-gray-500 font-bold uppercase block">Affected</span>
                      <span className="text-xs md:text-sm font-bold text-on-surface">{problem.marketData?.citizensAffected || "10M+"}</span>
                    </div>
                    <div className="bg-surface-container/40 p-3 rounded-xl">
                      <span className="text-[10px] text-gray-500 font-bold uppercase block">Willingness to Pay</span>
                      <span className="text-xs md:text-sm font-bold text-secondary">{problem.willingnessToPay || "Verified"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Evidence Tab */}
            {activeTab === "evidence" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-3 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">Supporting Documents</h3>
                  <ul className="flex flex-col gap-3 mt-1">
                    {(problem.evidenceDocuments || [
                      {
                        title: "CMS Interoperability Standards & Policy Guidelines",
                        size: "2.4 MB",
                        pages: "12 pages",
                        url: "https://www.healthit.gov",
                        type: "pdf",
                      },
                    ]).map((doc, idx) => (
                      <li
                        key={idx}
                        onClick={() => window.open(doc.url, "_blank")}
                        className="flex items-center justify-between p-3.5 bg-surface-container/40 rounded-xl hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`material-symbols-outlined ${doc.type === "pdf" ? "text-error" : "text-primary"}`}>
                            {doc.type === "pdf" ? "picture_as_pdf" : "link"}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs md:text-sm font-semibold text-on-surface">
                              {doc.title}
                            </span>
                            <span className="text-[11px] text-on-surface-variant">{doc.size} · {doc.pages}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-primary" />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Evidence URLs list */}
                {problem.evidenceUrls && problem.evidenceUrls.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">External Evidence URLs</h4>
                    <div className="flex flex-col gap-1.5">
                      {problem.evidenceUrls.map((url, idx) => (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1.5 truncate"
                        >
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{url}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Split Fade Divider Line */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                <div className="flex flex-col gap-3 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">Key Statistical Data Points</h3>
                  <div className="flex flex-wrap gap-4 mt-1">
                    {(problem.dataPoints || [
                      { metric: "64%", label: "Clinics still using fax daily" },
                      { metric: "18 min", label: "Avg delay searching fragmented records" },
                    ]).map((dp, idx) => (
                      <div key={idx} className="bg-surface-container/40 p-4 rounded-xl flex-1 min-w-[200px] border border-outline-variant/20">
                        <span className={`text-2xl font-black block mb-1 ${idx === 0 ? "text-primary" : "text-error"}`}>
                          {dp.metric}
                        </span>
                        <span className="text-xs text-on-surface-variant font-medium">{dp.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Research Tab */}
            {activeTab === "research" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-5 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">Research Overview</h3>
                  <div className="flex flex-col gap-5">
                    <div>
                      <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Key Findings</h4>
                      <ul className="list-disc list-inside text-xs md:text-sm text-on-surface-variant flex flex-col gap-2 font-normal leading-relaxed">
                        {(problem.researchData?.keyFindings || [
                          "Legacy EHR vendors actively block API access to maintain market share.",
                          "Broadband limitations in rural areas make cloud-only solutions unreliable.",
                          "Patient consent management is the primary legal hurdle for sharing.",
                        ]).map((kf, idx) => (
                          <li key={idx}>{kf}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                    <div>
                      <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Methodology</h4>
                      <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
                        {problem.researchData?.methodology ||
                          "Qualitative interviews with 45 rural clinic administrators across 6 states, combined with quantitative analysis of CMS interoperability metrics from Q1-Q3 2023."}
                      </p>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                    <div>
                      <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Academic References</h4>
                      <div className="text-xs md:text-sm text-on-surface-variant flex flex-col gap-2 font-normal">
                        {(problem.researchData?.academicReferences || [
                          '"The Digital Divide in Healthcare Information Exchange", Journal of Rural Health (2022).',
                          '"Evaluating the Impact of Information Blocking Rule", Health Affairs (2023).',
                        ]).map((ar, idx) => (
                          <p key={idx} className="italic text-on-surface-variant">
                            {ar}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Competitors Tab */}
            {activeTab === "competitors" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-3 py-2 overflow-x-auto">
                  <h3 className="text-base md:text-lg font-bold text-on-surface mb-2">Competitor Landscape</h3>
                  <table className="w-full text-left border-collapse min-w-[600px] text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200/80 bg-surface-container-low/40">
                        <th className="py-3 px-3.5 font-bold text-on-surface uppercase tracking-wider text-xs">Solution</th>
                        <th className="py-3 px-3.5 font-bold text-on-surface uppercase tracking-wider text-xs">Pros</th>
                        <th className="py-3 px-3.5 font-bold text-on-surface uppercase tracking-wider text-xs">Cons</th>
                      </tr>
                    </thead>
                    <tbody className="text-on-surface-variant divide-y divide-outline-variant/20">
                      {(problem.competitorData || [
                        {
                          solution: "Epic Care Everywhere",
                          pros: "Excellent integration if both parties use Epic.",
                          cons: "Prohibitively expensive for small rural clinics.",
                        },
                        {
                          solution: "Direct Secure Messaging",
                          pros: "Low cost, HIPAA compliant email.",
                          cons: "Clunky UI, data isn't structured or parsed into EHR automatically.",
                        },
                        {
                          solution: "Analog Fax (Status Quo)",
                          pros: "Universal adoption.",
                          cons: "Manual data entry required, high risk of missing info.",
                        },
                      ]).map((comp, idx) => (
                        <tr key={idx} className="hover:bg-surface-container/30 transition-colors">
                          <td className="py-3.5 px-3.5 font-bold text-on-surface">{comp.solution}</td>
                          <td className="py-3.5 px-3.5 text-secondary font-medium">{comp.pros}</td>
                          <td className="py-3.5 px-3.5 text-error font-medium">{comp.cons}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. Suggested MVP Tab */}
            {activeTab === "suggested_mvp" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-5 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface">Suggested MVP (v1.0)</h3>
                  <div className="flex flex-col gap-5">
                    <div>
                      <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">Core Features</h4>
                      <ul className="flex flex-col gap-3">
                        {(problem.suggestedMVP?.coreFeatures || [
                          "Universal API bridge that translates major EHR formats (HL7, FHIR).",
                          "Offline-first local caching for unstable broadband connections.",
                          "Simple web portal for smaller specialists lacking modern EHRs.",
                        ]).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-on-surface-variant bg-surface-container/30 p-3 rounded-xl border border-outline-variant/20">
                            <span className="material-symbols-outlined text-primary text-[20px] shrink-0">check_circle</span>
                            <span className="font-medium text-on-surface">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

                    <div>
                      <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Technical Requirements</h4>
                      <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-normal bg-surface-container/20 p-4 rounded-xl border border-outline-variant/20">
                        {problem.suggestedMVP?.technicalRequirements ||
                          "SOC2 Type II compliance, HIPAA BAA readiness, robust integration with national HIE networks (e.g., Carequality)."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Related Problems Tab */}
            {activeTab === "related" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="flex flex-col gap-3 py-2">
                  <h3 className="text-base md:text-lg font-bold text-on-surface mb-2">Related Problems</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                      to="/problem/prob-1"
                      className="bg-surface-container/40 p-4 rounded-xl flex flex-col gap-2 hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20"
                    >
                      <div className="flex justify-between items-start">
                        <span className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full text-[10px] font-bold">
                          Healthcare
                        </span>
                        <span className="text-error font-bold text-xs">9.3</span>
                      </div>
                      <h4 className="text-xs md:text-sm font-semibold text-on-surface leading-snug mt-1">
                        Data Interoperability Failure in Rural Clinics
                      </h4>
                    </Link>
                    <Link
                      to="/problem/prob-3"
                      className="bg-surface-container/40 p-4 rounded-xl flex flex-col gap-2 hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20"
                    >
                      <div className="flex justify-between items-start">
                        <span className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full text-[10px] font-bold">
                          CleanTech
                        </span>
                        <span className="text-error font-bold text-xs">9.2</span>
                      </div>
                      <h4 className="text-xs md:text-sm font-semibold text-on-surface leading-snug mt-1">
                        Subsurface Hydrogen Pipeline Micro-Leaks
                      </h4>
                    </Link>
                    <Link
                      to="/problem/prob-4"
                      className="bg-surface-container/40 p-4 rounded-xl flex flex-col gap-2 hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20"
                    >
                      <div className="flex justify-between items-start">
                        <span className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full text-[10px] font-bold">
                          AI & ML
                        </span>
                        <span className="text-error font-bold text-xs">8.9</span>
                      </div>
                      <h4 className="text-xs md:text-sm font-semibold text-on-surface leading-snug mt-1">
                        Autonomous Freight Sensor Phantom Occlusion
                      </h4>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Split Fade Divider Line before Discussion */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent my-2" />

            {/* 7. Discussion Tab with True Hierarchical Branching System */}
            <div className="flex flex-col gap-6 py-2">
              <h3 className="text-base md:text-lg font-bold text-on-surface">
                Discussion ({totalCommentsCount})
              </h3>

              {/* Threaded Comments Feed with Visible Tree Branching Lines */}
              {comments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-200/80 p-8 text-center bg-surface-container/20">
                  <MessageSquare className="w-7 h-7 text-gray-400 mx-auto mb-2 opacity-50" />
                  <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">No discussions yet</h4>
                  <p className="text-xs text-gray-500 mt-1">Be the first practitioner or founder to share your perspective below.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex flex-col gap-3">
                      {/* Top-Level Parent Comment */}
                      <div className="flex gap-3.5 items-start">
                        <UserAvatar name={comment.author} size="sm" />
                        <div className="flex-1 flex flex-col bg-surface-container/40 rounded-xl p-3.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs md:text-sm font-bold text-on-surface">
                              {comment.author}
                            </span>
                            <span className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full text-[10px] font-semibold">
                              {comment.role}
                            </span>
                            <span className="text-[11px] text-gray-400">{formatRelativeTime(comment.date)}</span>
                          </div>
                          <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed mb-2.5">
                            {comment.text}
                          </p>
                          {/* Action Bar inside message with Reply and Like */}
                          <div className="flex items-center gap-4 text-xs font-semibold pt-1.5 border-t border-gray-200/40">
                            <button
                              onClick={() => {
                                setReplyingToId(replyingToId === comment.id ? null : comment.id);
                                setReplyText("");
                              }}
                              className="text-primary hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <CornerDownRight className="w-3.5 h-3.5" />
                              <span>Reply</span>
                            </button>
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className={`cursor-pointer flex items-center gap-1 transition-colors ${comment.liked ? "text-error font-bold" : "text-gray-400 hover:text-error"
                                }`}
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {comment.liked ? "favorite" : "favorite_border"}
                              </span>
                              <span>{comment.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Inline Reply Box for this Comment */}
                      {replyingToId === comment.id && (
                        <div className="ml-8 pl-4 border-l-2 border-primary/40 flex items-center gap-2 mt-1 animate-fade-in">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${comment.author}...`}
                            className="flex-1 bg-surface-container/60 rounded-full px-4 py-2 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleAddReply(comment.id);
                            }}
                          />
                          <button
                            onClick={() => handleAddReply(comment.id)}
                            className="bg-primary text-white text-xs font-bold px-3.5 py-2 rounded-full hover:bg-primary-container transition-all cursor-pointer"
                          >
                            Send
                          </button>
                        </div>
                      )}

                      {/* Nested Replies with Connected Branching Line */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-5 pl-4 border-l-2 border-gray-300/80 flex flex-col gap-3 mt-1">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3 items-start relative">
                              {/* Branch connector hook */}
                              <div className="absolute -left-4 top-3 w-3 h-2 border-b-2 border-gray-300/80 rounded-bl-sm pointer-events-none" />

                              <UserAvatar name={reply.author} size="xs" />
                              <div className="flex-1 flex flex-col bg-surface-container/30 rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-xs font-bold text-on-surface">
                                    {reply.author}
                                  </span>
                                  <span className="bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded-full text-[9px] font-semibold">
                                    {reply.role}
                                  </span>
                                  <span className="text-[10px] text-gray-400">{formatRelativeTime(reply.date)}</span>
                                </div>
                                <p className="text-xs text-on-surface-variant font-normal leading-relaxed mb-2">
                                  {reply.text}
                                </p>
                                {/* Like button inside reply message */}
                                <div className="flex items-center gap-3 text-xs font-semibold pt-1 border-t border-gray-200/30">
                                  <button
                                    onClick={() => handleLikeComment(comment.id, reply.id)}
                                    className={`cursor-pointer flex items-center gap-1 transition-colors ${reply.liked ? "text-error font-bold" : "text-gray-400 hover:text-error"
                                      }`}
                                  >
                                    <span className="material-symbols-outlined text-[15px]">
                                      {reply.liked ? "favorite" : "favorite_border"}
                                    </span>
                                    <span className="text-[10px]">{reply.likes}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Main New Comment Input Bar */}
              <form onSubmit={handleAddComment} className="mt-4 pt-4 border-t border-gray-200/70 flex items-center gap-3">
                <UserAvatar name={userDoc?.name || user?.displayName || "You"} size="sm" />
                <input
                  id="comment-input"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-surface-container/50 rounded-full px-4 py-2.5 text-xs md:text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 transition-all font-normal"
                  placeholder="Add a practitioner insight or discussion note..."
                  type="text"
                />
                <button
                  type="submit"
                  className="bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-primary-container transition-all cursor-pointer shadow-xs shrink-0"
                >
                  Post
                </button>
              </form>
            </div>
          </div>

          {/* 30% Right Sidebar: Problem Status & Community Validation */}
          <div className="w-full lg:w-[30%] lg:sticky lg:top-24 flex flex-col gap-6">
            {/* Problem Status Stepper (Seamless surface container) */}
            <div className="flex flex-col gap-4 py-2">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Problem Status
              </h4>
              <div className="flex items-center justify-between relative px-2">
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-surface-container -z-0" />
                <div className="absolute left-6 w-[25%] top-1/2 -translate-y-1/2 h-1 bg-secondary -z-0" />

                {/* Step 1: Open */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center border-2 border-surface shadow-xs">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                  </div>
                  <span className="text-[11px] font-bold text-on-surface">Open</span>
                </div>

                {/* Step 2: In Progress */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-surface" />
                  <span className="text-[11px] font-medium text-gray-400">In Progress</span>
                </div>

                {/* Step 3: Solved */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-surface" />
                  <span className="text-[11px] font-medium text-gray-400">Solved</span>
                </div>
              </div>
            </div>

            {/* Split Fade Divider Line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent" />

            {/* Community Validation Suite */}
            <div className="flex flex-col gap-3.5 py-2">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Community Validation
              </h4>

              {/* 1. I face this */}
              <button
                onClick={handleFaceToggle}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${faced
                  ? "bg-primary/10 text-primary font-bold shadow-2xs"
                  : "bg-surface-container/50 hover:bg-surface-container text-on-surface"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">person_raised_hand</span>
                  <span className="text-xs font-semibold">I face this</span>
                </div>
                <span className="bg-primary-container text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {faceCount}
                </span>
              </button>

              {/* 2. Great problem */}
              <button
                onClick={handleGreatToggle}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${votedGreat
                  ? "bg-secondary/10 text-secondary font-bold shadow-2xs"
                  : "bg-surface-container/50 hover:bg-surface-container text-on-surface"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                  <span className="text-xs font-semibold">Great problem</span>
                </div>
                <span className="bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {greatCount}
                </span>
              </button>

              {/* 3. I'd pay */}
              <button
                onClick={handlePayToggle}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${paid
                  ? "bg-amber-50 text-amber-800 font-bold shadow-2xs"
                  : "bg-surface-container/50 hover:bg-surface-container text-on-surface"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                  <span className="text-xs font-semibold">I'd pay</span>
                </div>
                <span className="bg-[#ffdbd0] text-[#8e2a00] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {payCount}
                </span>
              </button>

              {/* 4. I'd build this */}
              <button
                onClick={handleBuildToggle}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${built
                  ? "bg-primary/10 text-primary font-bold shadow-2xs"
                  : "bg-surface-container/50 hover:bg-surface-container text-on-surface"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">construction</span>
                  <span className="text-xs font-semibold">I'd build this</span>
                </div>
                <span className="bg-primary-container text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {buildCount}
                </span>
              </button>

              {/* People interested avatar cluster & Vector Like Button */}
              <div className="mt-3 pt-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-on-surface-variant">People interested</span>
                  <button
                    onClick={handleInterestToggle}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${userInterested
                      ? "bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-800"
                      : "bg-surface-container/60 hover:bg-surface-container text-on-surface-variant border border-gray-200/50 hover:text-on-surface"
                      }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${userInterested ? "fill-rose-600 text-rose-600" : "text-gray-400"}`} />
                    <span>{userInterested ? "Interested" : "I'm Interested"}</span>
                    <span className="text-[10px] font-mono opacity-80">({interestedCount})</span>
                  </button>
                </div>
                {interestedCount > 0 ? (
                  <div className="flex items-center -space-x-2 mt-1">
                    {(problem.interestedUsers || []).slice(0, 4).map((uid, idx) => (
                      <UserAvatar key={idx} name={uid === currentUid ? (userDoc?.name || user?.displayName || "You") : `User ${idx + 1}`} size="sm" />
                    ))}
                    {interestedCount > 4 && (
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-surface-container text-on-surface-variant text-xs font-bold shadow-2xs">
                        +{interestedCount - 4}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-400 font-normal italic">
                    Be the first to mark interest in this problem!
                  </p>
                )}
              </div>

              {/* Companies interested avatar cluster */}
              <div className="mt-1 pt-3 flex flex-col gap-2">
                <span className="text-[11px] font-semibold text-on-surface-variant">Companies interested</span>
                {solverInfo.totalCount > 0 ? (
                  <div className="flex items-center -space-x-1.5">
                    {solverInfo.companies.slice(0, 3).map((comp, idx) => (
                      <div
                        key={idx}
                        title={comp.name}
                        className="w-7 h-7 rounded-full bg-white border-2 border-surface shadow-2xs flex items-center justify-center overflow-hidden"
                      >
                        {comp.icon}
                      </div>
                    ))}
                    {solverInfo.totalCount > 3 && (
                      <div className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface bg-surface-container text-[#5c37eb] text-[9px] font-bold shadow-2xs">
                        +{solverInfo.totalCount - 3}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-400 font-normal italic">
                    No active company deployments registered yet.
                  </p>
                )}
              </div>

              {/* Build Startup Primary CTA */}
              <button
                onClick={() => {
                  recordUserInterest(problem.id, user?.uid || "user", "startup_mode_cta");
                  navigate(`/startup-mode/${problem.id}`);
                }}
                className="mt-4 w-full bg-[#1657FF] hover:bg-[#0E47E6] text-white py-3 rounded-xl text-xs md:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Build Startup</span>
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── EMBED & SECURED SHARE MODAL ───────────────────────────────────── */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-low">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">Secured Problem Dossier URL & Embed</h3>
                  <p className="text-[11px] text-on-surface-variant">
                    Direct cryptographic problem reference & sandbox-secured iframe embed snippet.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-on-surface cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Direct Secured Problem Link */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    <span>Direct Problem URL</span>
                  </label>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Encrypted Link
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/problem/${problem.id}`}
                    className="flex-1 bg-surface-container-low rounded-xl px-3.5 py-2 text-xs font-mono text-on-surface outline-none border border-outline-variant/30"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/problem/${problem.id}`);
                      setLinkCopied(true);
                      setTimeout(() => setLinkCopied(false), 2500);
                    }}
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{linkCopied ? "Copied" : "Copy URL"}</span>
                  </button>
                </div>
              </div>

              {/* Secured IFrame Embed Code */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-[#5c37eb]" />
                    <span>Secured Embed Snippet (IFrame)</span>
                  </label>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Sandbox Enforced
                  </span>
                </div>
                <textarea
                  readOnly
                  rows={3}
                  value={`<iframe src="${window.location.origin}/problem/${problem.id}" width="100%" height="600" frameborder="0" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups" title="${problem.title.replace(/"/g, '&quot;')}"></iframe>`}
                  className="w-full bg-surface-container-low rounded-xl p-3 text-[11px] font-mono text-on-surface outline-none border border-outline-variant/30 resize-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      const snippet = `<iframe src="${window.location.origin}/problem/${problem.id}" width="100%" height="600" frameborder="0" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups" title="${problem.title.replace(/"/g, '&quot;')}"></iframe>`;
                      navigator.clipboard.writeText(snippet);
                      setEmbedCopied(true);
                      setTimeout(() => setEmbedCopied(false), 2500);
                    }}
                    className="px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {embedCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Code className="w-3.5 h-3.5" />}
                    <span>{embedCopied ? "Embed Code Copied!" : "Copy Embed Code"}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/30 flex justify-end">
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
