import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeProblems, updateFullProblemDetails } from "@/lib/firebase/services/problemsService";
import {
  subscribeBadges,
  evaluateAndAwardUserBadges,
} from "@/lib/firebase/services/badgesService";
import {
  getBookmarkedProblems,
  getUserSubmittedProblemIds,
  checkUsernameAvailability,
} from "@/lib/storage";
import { getProblemDetailUrl } from "@/lib/seoUrls";
import { ProblemDoc, BadgeDoc } from "@/types";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { AVATAR_PRESETS } from "@/lib/avatars";
import {
  DynamicBadgeIcon,
  TIER_CONFIG,
} from "@/components/ui/DynamicBadgeIcon";
import { SEOHead } from "@/components/common/SEOHead";
import confetti from "canvas-confetti";
import {
  FileText,
  Hammer,
  ThumbsUp,
  Award,
  ArrowRight,
  Plus,
  Bookmark,
  CheckCircle,
  Clock,
  Edit3,
  Camera,
  Upload,
  Link as LinkIcon,
  Sparkles,
  Shield,
  X,
  Check,
  Calendar,
  Mail,
  AlertTriangle,
  AlertCircle,
  ExternalLink,
  Target,
  Lock,
  ChevronRight,
  TrendingUp,
  Zap,
  AtSign,
} from "lucide-react";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, userDoc, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"problems" | "bookmarks" | "badges">("problems");

  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);
  const [allBadges, setAllBadges] = useState<BadgeDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<string | null>(null);

  // Profile Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState(
    userDoc?.displayName || userDoc?.name || user?.displayName || "Innovator"
  );
  const [editUsername, setEditUsername] = useState(userDoc?.username || "");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [editHeadline, setEditHeadline] = useState(userDoc?.headline || "Problem Explorer & Innovator");
  const [editBio, setEditBio] = useState(userDoc?.bio || "Researching verified real-world problems.");
  const [editPhotoURL, setEditPhotoURL] = useState(userDoc?.photoURL || user?.photoURL || "");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // User Submission Edit Modal State
  const [editingProblem, setEditingProblem] = useState<ProblemDoc | null>(null);
  const [editProbTitle, setEditProbTitle] = useState("");
  const [editProbDesc, setEditProbDesc] = useState("");
  const [editProbWhy, setEditProbWhy] = useState("");
  const [editProbWho, setEditProbWho] = useState("");
  const [editProbCurrentSol, setEditProbCurrentSol] = useState("");
  const [editProbWhen, setEditProbWhen] = useState("");
  const [editProbTam, setEditProbTam] = useState("");
  const [editProbWastedCost, setEditProbWastedCost] = useState("");
  const [isUpdatingProblem, setIsUpdatingProblem] = useState(false);

  useEffect(() => {
    const unsubProblems = subscribeProblems({ status: "all" }, (list) => {
      setAllProblems(list);
      setLoading(false);
    });

    const unsubBadges = subscribeBadges((list) => {
      setAllBadges(list);
    });

    return () => {
      unsubProblems();
      unsubBadges();
    };
  }, []);

  const currentUid = userDoc?.uid || user?.uid;
  const userSubmittedIds = useMemo(() => {
    return getUserSubmittedProblemIds(currentUid || "guest");
  }, [currentUid]);

  // Real Submissions without any mock fallback
  const mySubmissions = useMemo(() => {
    return allProblems.filter(
      (p) =>
        userSubmittedIds.includes(p.id) ||
        (currentUid && (p.submittedByUid === currentUid || p.submittedBy === currentUid)) ||
        (userDoc?.displayName && (p.submitterName === userDoc.displayName || p.submittedBy === userDoc.displayName || (p as any).submittedByName === userDoc.displayName)) ||
        (userDoc?.username && (p.submitterUsername === userDoc.username || p.authorUsername === userDoc.username)) ||
        (userDoc?.name && ((p as any).submittedByName === userDoc.name || p.submittedBy === userDoc.name)) ||
        (user?.displayName && ((p as any).submittedByName === user.displayName || p.submittedBy === user.displayName))
    );
  }, [allProblems, currentUid, userDoc?.displayName, userDoc?.username, userDoc?.name, user?.displayName, userSubmittedIds]);

  const bookmarkedProblems = getBookmarkedProblems(currentUid || "guest");

  const displayName = userDoc?.displayName || userDoc?.name || user?.displayName || "Innovator";
  const userHandle = userDoc?.username;
  const userRole = userDoc?.role || "user";
  const earnedBadgesNames = userDoc?.badges || [];

  // Real-time dynamic stats calculation
  const realStats = useMemo(() => {
    const problemsSubmitted = mySubmissions.length;
    const solutionsBuilt = mySubmissions.filter(
      (p) =>
        p.hasStartupMode ||
        ((p as any).startupMode?.solutions && (p as any).startupMode.solutions.length > 0) ||
        ((p as any).startupMode?.directions && (p as any).startupMode.directions.length > 0) ||
        ((p as any).startupMode?.mvpScope && (p as any).startupMode.mvpScope.length > 0)
    ).length;

    const votesReceived = mySubmissions.reduce(
      (acc, p) => acc + ((p as any).upvotes || p.votes?.upvotes || 0),
      0
    );

    const dataPointsCount = mySubmissions.reduce((acc, p) => {
      const dp = (p as any).evidenceData?.dataPoints?.length || 0;
      const docs = (p as any).evidenceData?.documents?.length || 0;
      return acc + dp + docs;
    }, 0);

    const criticalCount = mySubmissions.filter((p) => p.severity === "critical").length;
    const commentsCount = userDoc?.counts?.comments || 0;
    const bountiesCount = userDoc?.counts?.bountiesWon || 0;

    return {
      problemsSubmitted,
      solutionsBuilt,
      votesReceived,
      dataPointsCount,
      criticalCount,
      commentsCount,
      bountiesCount,
      badgesCount: earnedBadgesNames.length,
    };
  }, [mySubmissions, userDoc, earnedBadgesNames]);

  // Automatic Real-Time Tough Task Badge Evaluation Engine
  useEffect(() => {
    if (!currentUid) return;

    evaluateAndAwardUserBadges(currentUid, earnedBadgesNames, realStats).then((newlyAwarded) => {
      if (newlyAwarded && newlyAwarded.length > 0) {
        setNewlyUnlockedBadge(newlyAwarded[0]);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    });
  }, [currentUid, realStats, earnedBadgesNames]);

  const handleOpenEdit = () => {
    setEditDisplayName(userDoc?.displayName || userDoc?.name || user?.displayName || "Innovator");
    setEditUsername(userDoc?.username || "");
    setUsernameError(null);
    setEditHeadline(userDoc?.headline || "Problem Explorer & Innovator");
    setEditBio(userDoc?.bio || "Researching verified real-world problems.");
    setEditPhotoURL(userDoc?.photoURL || user?.photoURL || "");
    setSelectedPreset(null);
    setSaveSuccess(false);
    setIsEditOpen(true);
  };

  const handleOpenProblemEdit = (prob: ProblemDoc, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProblem(prob);
    setEditProbTitle(prob.title || "");
    setEditProbDesc(prob.description || "");
    setEditProbWhy(prob.whyFrustrating || "");
    setEditProbWho(prob.whoFacesIt || "");
    setEditProbCurrentSol(prob.currentSolution || "");
    setEditProbWhen(prob.whenItHappens || "");
    setEditProbTam(prob.marketData?.tam || prob.estimatedValue || "$1.0B");
    setEditProbWastedCost(prob.marketData?.wastedCost || "$250M");
  };

  const handleSaveProblemEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProblem) return;
    setIsUpdatingProblem(true);

    const updatedData: Partial<ProblemDoc> = {
      title: editProbTitle,
      description: editProbDesc,
      whyFrustrating: editProbWhy,
      whoFacesIt: editProbWho,
      currentSolution: editProbCurrentSol,
      whenItHappens: editProbWhen,
      marketData: {
        tam: editProbTam,
        currentPenetration: editingProblem.marketData?.currentPenetration || 25,
        wastedCost: editProbWastedCost,
        citizensAffected: editingProblem.marketData?.citizensAffected || "5M+",
      },
      status: "pending",
      updatedAt: new Date().toISOString(),
    };

    await updateFullProblemDetails(editingProblem.id, updatedData);
    setIsUpdatingProblem(false);
    setEditingProblem(null);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setUsernameError(null);

    const cleanUsername = editUsername.trim().toLowerCase().replace(/^@/, "");
    if (cleanUsername) {
      const check = checkUsernameAvailability(cleanUsername, currentUid);
      if (!check.available) {
        setUsernameError(check.error || "This username is already taken. Please choose another.");
        setIsSaving(false);
        return;
      }
    }

    try {
      await updateUserProfile({
        name: editDisplayName.trim(),
        displayName: editDisplayName.trim(),
        username: cleanUsername,
        headline: editHeadline.trim(),
        bio: editBio.trim(),
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setIsEditOpen(false);
        setSaveSuccess(false);
      }, 1200);
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Badge Progress Calculation Helper
  const getBadgeProgress = (b: BadgeDoc) => {
    let current = 0;
    switch (b.taskType) {
      case "problems_submitted":
        current = realStats.problemsSubmitted;
        break;
      case "solutions_built":
        current = realStats.solutionsBuilt;
        break;
      case "votes_received":
        current = realStats.votesReceived;
        break;
      case "evidence_attached":
        current = realStats.dataPointsCount;
        break;
      case "critical_problems":
        current = realStats.criticalCount;
        break;
      case "comments_posted":
        current = realStats.commentsCount;
        break;
      case "bounties_joined":
        current = realStats.bountiesCount;
        break;
      default:
        current = 0;
        break;
    }
    const percent = Math.min(100, Math.round((current / (b.taskThreshold || 1)) * 100));
    return { current, target: b.taskThreshold, percent };
  };

  const earnedBadgesList = useMemo(() => {
    return allBadges.filter((b) => earnedBadgesNames.includes(b.name));
  }, [allBadges, earnedBadgesNames]);

  const lockedBadgesList = useMemo(() => {
    return allBadges.filter((b) => !earnedBadgesNames.includes(b.name));
  }, [allBadges, earnedBadgesNames]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 font-['Poppins',sans-serif] text-on-surface">
      {/* noindex: private user dashboard */}
      <SEOHead title="User Dashboard" description="Your personal Stuckhere activity, submissions, and badges." noindex />
      {/* ── New Badge Achievement Toast Notification ─────────────────────── */}
      {newlyUnlockedBadge && (
        <div className="mb-6 p-4 rounded-2xl bg-linear-to-r from-amber-500/15 via-purple-500/15 to-primary/15 border border-amber-500/30 flex items-center justify-between gap-4 animate-fade-in shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Tough Task Completed!
              </span>
              <h4 className="text-sm font-bold text-on-surface">
                You just unlocked the <span className="text-primary font-black">"{newlyUnlockedBadge}"</span> badge!
              </h4>
            </div>
          </div>
          <button
            onClick={() => setNewlyUnlockedBadge(null)}
            className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── User Hero Card ───────────────────────────────────────────── */}
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-6 md:p-8 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <UserAvatar
              src={userDoc?.photoURL || user?.photoURL}
              name={displayName}
              email={userDoc?.email || user?.email}
              role={userRole}
              size="2xl"
              showRoleBadge
              className="ring-4 ring-surface-container shadow-md"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
                  {displayName}
                </h1>
                {userHandle && (
                  <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-surface-container text-primary border border-outline-variant/40 flex items-center gap-0.5">
                    <AtSign className="w-3 h-3 text-primary/70" />
                    <span>{userHandle}</span>
                  </span>
                )}
                <span className="capitalize px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed text-on-primary-fixed border border-primary/20">
                  {userRole}
                </span>
              </div>
              <p className="text-xs md:text-sm text-on-surface-variant max-w-xl line-clamp-2">
                {userDoc?.bio || "Domain explorer researching verified empirical friction points."}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1 font-mono">
                  <Mail className="h-3.5 w-3.5 text-outline" />
                  {userDoc?.email || user?.email || "verified@stuckhere.com"}
                </span>
                <span className="text-outline">•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-outline" />
                  Member since {userDoc?.createdAt ? new Date(userDoc.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "2026"}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-row md:flex-col items-center gap-3 self-stretch sm:self-auto shrink-0">
            <button
              onClick={handleOpenEdit}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-surface-container border border-outline-variant/50 hover:bg-surface-container-high text-on-surface px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer hover:-translate-y-0.5"
            >
              <Edit3 className="h-3.5 w-3.5 text-primary" />
              <span>Edit Profile</span>
            </button>
            <Link
              to="/submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-container px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" />
              <span>Submit Problem</span>
            </Link>
          </div>
        </div>

        {/* Badges Strip */}
        <div className="mt-6 pt-5 border-t border-outline-variant/20 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mr-1 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span>Credentials:</span>
          </span>
          {earnedBadgesNames.length === 0 ? (
            <span className="text-xs text-outline italic">No badges earned yet. Complete tough tasks below to unlock!</span>
          ) : (
            earnedBadgesNames.map((bName) => {
              const badgeObj = allBadges.find((b) => b.name === bName);
              const tierStyle = badgeObj ? TIER_CONFIG[badgeObj.tier] : TIER_CONFIG.bronze;
              return (
                <span
                  key={bName}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${tierStyle.bg} ${tierStyle.border}`}
                >
                  <DynamicBadgeIcon
                    name={badgeObj?.iconName || "Award"}
                    className="h-3.5 w-3.5"
                    color={badgeObj?.color}
                  />
                  <span>{bName}</span>
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* ── 4 Real-Time Stat Tiles (No Mocks) ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Stat Card 1: Problems Submitted */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Problems Submitted
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <div className="text-3xl font-black text-on-surface font-mono">
            {realStats.problemsSubmitted}
          </div>
        </div>

        {/* Stat Card 2: Solutions Built */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                <Hammer className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Solutions Built
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <div className="text-3xl font-black text-on-surface font-mono">
            {realStats.solutionsBuilt}
          </div>
        </div>

        {/* Stat Card 3: Votes Received */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-tertiary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <ThumbsUp className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Votes Received
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <div className="text-3xl font-black text-on-surface font-mono">
            {realStats.votesReceived}
          </div>
        </div>

        {/* Stat Card 4: Badges Earned */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Badges Earned
              </span>
            </div>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-full">
              {allBadges.length} Total
            </span>
          </div>
          <div className="text-3xl font-black text-on-surface font-mono">
            {realStats.badgesCount}
          </div>
        </div>
      </div>

      {/* ── Tabs & Problem / Badge Lists ─────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
          <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/20">
            <button
              onClick={() => setActiveTab("problems")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "problems"
                  ? "bg-primary text-white shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              My Submissions ({mySubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "bookmarks"
                  ? "bg-primary text-white shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>Bookmarks ({bookmarkedProblems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "badges"
                  ? "bg-primary text-white shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              <span>Credentials & Badges ({realStats.badgesCount}/{allBadges.length})</span>
            </button>
          </div>

          <Link
            to="/explore"
            className="text-xs font-bold text-primary hover:text-primary-container transition-colors flex items-center gap-1 group"
          >
            Explore all problems{" "}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── TAB 1: MY SUBMISSIONS ────────────────────────────────────────── */}
        {activeTab === "problems" && (
          <div className="space-y-4">
            {/* Submission Status & Verification Lifecycle Banner */}
            <div className="w-full bg-gradient-to-r from-primary/5 via-amber-500/5 to-emerald-500/5 border border-outline-variant/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-on-surface">
                    Problem Submission & Verification Pipeline
                  </h4>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant max-w-2xl leading-relaxed">
                    When you submit a problem statement, it is queued for admin review. Once an administrator verifies the empirical data and clicks <span className="font-semibold text-primary">Publish</span>, your statement goes live in the public Explore directory with the Verified badge.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0 text-[11px] font-semibold text-on-surface-variant bg-surface-container-low/80 px-3 py-2 rounded-xl border border-outline-variant/20">
                <span className="flex items-center gap-1 text-amber-700">
                  <Clock className="w-3.5 h-3.5 animate-pulse" /> 1. Submitted
                </span>
                <span>→</span>
                <span className="flex items-center gap-1 text-primary">
                  <Shield className="w-3.5 h-3.5" /> 2. Admin Verifies
                </span>
                <span>→</span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5" /> 3. Published Live
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-x-auto">
              {mySubmissions.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center gap-3 max-w-md mx-auto">
                  <FileText className="h-10 w-10 text-outline opacity-40" />
                  <h3 className="text-base font-bold text-on-surface">No submitted problem statements yet</h3>
                  <p className="text-xs text-on-surface-variant">
                    Contribute real-world friction, diagnostic insights, and market pain points to the open registry.
                  </p>
                  <Link
                    to="/submit"
                    className="mt-2 inline-flex items-center gap-1.5 bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary-container shadow-sm cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Submit Problem Statement</span>
                  </Link>
                </div>
              ) : (
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-outline-variant/30 bg-surface-container-low/50">
                      <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        Problem Title & Narrative
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        Industry
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        Status & Admin Verification
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 text-xs">
                    {mySubmissions.map((prob) => {
                      const isPending = prob.status === "pending";
                      const isNeedsInfo = prob.status === "needs_info";
                      const isApproved = prob.status === "approved" || !prob.status;
                      const isRejected = prob.status === "rejected";

                      return (
                        <tr
                          key={prob.id}
                          onClick={() => navigate(getProblemDetailUrl(prob))}
                          className="hover:bg-surface-container-low/60 transition-colors cursor-pointer group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1 max-w-md">
                              <span className="font-bold text-on-surface group-hover:text-primary transition-colors text-sm">
                                {prob.title}
                              </span>
                              <span className="text-on-surface-variant line-clamp-1 text-xs">
                                {prob.description}
                              </span>
                              {(prob.reviewNote || (prob as any).adminReviewNote) && (
                                <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-amber-900 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 max-w-fit">
                                  <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                                  <span>
                                    <strong>Admin Note:</strong> {prob.reviewNote || (prob as any).adminReviewNote}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2.5 py-1 rounded-full font-semibold bg-surface-container text-on-surface border border-outline-variant/30">
                              {prob.industry}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {isPending && (
                              <div className="flex flex-col gap-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold bg-amber-500/10 text-amber-700 border border-amber-500/30 w-fit">
                                  <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                                  <span>Pending Admin Review</span>
                                </span>
                                <span className="text-[10px] text-on-surface-variant">
                                  Submitted · Awaiting admin verification
                                </span>
                              </div>
                            )}
                            {isApproved && (
                              <div className="flex flex-col gap-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 w-fit">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Published & Live</span>
                                </span>
                                <span className="text-[10px] text-emerald-600 font-medium">
                                  Verified by Admin · Active in Explore
                                </span>
                              </div>
                            )}
                            {isNeedsInfo && (
                              <div className="flex flex-col gap-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold bg-blue-500/10 text-blue-700 border border-blue-500/30 w-fit">
                                  <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Modifications Requested</span>
                                </span>
                                <span className="text-[10px] text-blue-600 font-medium">
                                  Review admin notes and update details
                                </span>
                              </div>
                            )}
                            {isRejected && (
                              <div className="flex flex-col gap-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold bg-rose-500/10 text-rose-700 border border-rose-500/30 w-fit">
                                  <X className="w-3.5 h-3.5 text-rose-600" />
                                  <span>Rejected / Archived</span>
                                </span>
                                <span className="text-[10px] text-rose-600">
                                  Did not meet verification standards
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                to={getProblemDetailUrl(prob)}
                                onClick={(e) => e.stopPropagation()}
                                className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                                title="View Problem Dossier"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                              <button
                                type="button"
                                onClick={(e) => handleOpenProblemEdit(prob, e)}
                                className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                                title="Edit Problem Details"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: BOOKMARKS ─────────────────────────────────────────────── */}
        {activeTab === "bookmarks" && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm p-6">
            {bookmarkedProblems.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center gap-3">
                <Bookmark className="h-10 w-10 text-outline opacity-40" />
                <h3 className="text-base font-bold text-on-surface">No bookmarked problems</h3>
                <p className="text-xs text-on-surface-variant max-w-sm">
                  Save problems you want to reference or build solutions for later.
                </p>
                <Link
                  to="/explore"
                  className="mt-2 text-xs font-bold text-primary hover:underline"
                >
                  Explore problems to bookmark
                </Link>
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant">Showing {bookmarkedProblems.length} bookmarked problems.</p>
            )}
          </div>
        )}

        {/* ── TAB 3: CREDENTIALS & BADGES (REAL-TIME ENGINE) ────────────────── */}
        {activeTab === "badges" && (
          <div className="flex flex-col gap-8">
            {/* Section 1: Unlocked Badges */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Earned Credentials ({earnedBadgesList.length})</span>
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Verified gamification credentials awarded for empirical problem intelligence.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-primary">
                  {earnedBadgesList.length} / {allBadges.length} Total
                </span>
              </div>

              {earnedBadgesList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-surface-container-lowest border border-dashed border-gray-300 text-center flex flex-col items-center gap-2">
                  <Award className="w-8 h-8 text-outline opacity-40" />
                  <p className="text-xs text-on-surface-variant">
                    You haven't earned any credentials yet. Complete the tough challenges below to earn your first badge!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadgesList.map((badge) => {
                    const tierStyle = TIER_CONFIG[badge.tier] || TIER_CONFIG.bronze;
                    return (
                      <div
                        key={badge.id}
                        className={`bg-surface-container-lowest border rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-3 ${tierStyle.border}`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${tierStyle.bg} ${tierStyle.border}`}
                          >
                            <DynamicBadgeIcon
                              name={badge.iconName}
                              className="w-6 h-6"
                              tier={badge.tier}
                              color={badge.color}
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-on-surface truncate">{badge.name}</h4>
                              <span
                                className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${tierStyle.bg} ${tierStyle.border}`}
                              >
                                {badge.tier}
                              </span>
                            </div>
                            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed line-clamp-2">
                              {badge.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-200/50 flex items-center justify-between text-[11px] text-emerald-600 font-bold">
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Milestone Achieved</span>
                          </span>
                          <span className="text-outline font-normal">Unlocked</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 2: Locked Tough Tasks & Challenges */}
            <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant/20">
              <div>
                <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-600" />
                  <span>Available Tough Challenges ({lockedBadgesList.length})</span>
                </h3>
                <p className="text-xs text-on-surface-variant">
                  High-difficulty milestones. When you satisfy the target criteria, the system awards the badge automatically.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedBadgesList.map((badge) => {
                  const tierStyle = TIER_CONFIG[badge.tier] || TIER_CONFIG.bronze;
                  const progress = getBadgeProgress(badge);

                  return (
                    <div
                      key={badge.id}
                      className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-5 shadow-2xs flex flex-col justify-between gap-4 opacity-85 hover:opacity-100 transition-opacity"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 bg-surface-container/60 ${tierStyle.border}`}
                          >
                            <DynamicBadgeIcon
                              name={badge.iconName}
                              className="w-5 h-5 opacity-60"
                              tier={badge.tier}
                              color={badge.color}
                            />
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${tierStyle.bg} ${tierStyle.border}`}
                            >
                              {badge.tier}
                            </span>
                            <span className="p-1 rounded-full bg-surface-container text-outline" title="Locked challenge">
                              <Lock className="w-3 h-3" />
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-on-surface">{badge.name}</h4>
                          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed line-clamp-2">
                            {badge.description}
                          </p>
                        </div>

                        {/* Tough Task Requirement Box */}
                        <div className="p-3 rounded-2xl bg-surface-container/40 border border-outline-variant/20 flex flex-col gap-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-on-surface">Target Challenge</span>
                            <span className="font-mono font-bold text-primary">
                              {progress.current} / {progress.target}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden border border-outline-variant/20">
                            <div
                              className="bg-primary h-full rounded-full transition-all duration-500"
                              style={{ width: `${progress.percent}%` }}
                            />
                          </div>

                          <p className="text-[10px] text-on-surface-variant italic">
                            "{badge.taskDescription}"
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-200/50 flex items-center justify-between text-[11px] text-outline">
                        <span>Progress: {progress.percent}%</span>
                        <Link
                          to="/submit"
                          className="text-primary font-bold hover:underline flex items-center gap-0.5 text-[10px]"
                        >
                          <span>Take Action</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Edit Profile & Avatar Modal ──────────────────────────────── */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/40 p-6 md:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-on-surface">Edit Profile Details</h2>
                <p className="text-xs text-on-surface-variant">Update your public name, professional headline, and domain bio</p>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">

              {/* Display Name Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-on-surface">Display Name (Public Author Name)</label>
                  <span className="text-[11px] text-primary font-bold">Shown under "Posted by"</span>
                </div>
                <input
                  type="text"
                  required
                  value={editDisplayName}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  placeholder="e.g. Dr. Sarah Chen, MD"
                  className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none border border-outline-variant/30 focus:border-primary/50 transition-colors"
                />
                <p className="text-[11px] text-on-surface-variant">
                  This public name represents you as the author on all published problem statements and dossiers.
                </p>
              </div>

              {/* Username Input (Unique @Handle) */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-on-surface">Username (Unique Handle)</label>
                  <span className="text-[11px] text-on-surface-variant font-medium">Identifier</span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-outline font-mono text-xs font-bold pointer-events-none select-none">@</span>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => {
                      const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
                      setEditUsername(val);
                      if (usernameError) setUsernameError(null);
                    }}
                    placeholder="sarah_chen"
                    maxLength={20}
                    className={`w-full bg-surface-container/40 rounded-xl pl-8 pr-4 py-2.5 text-xs font-mono font-bold text-on-surface outline-none border transition-colors ${
                      usernameError ? "border-red-500 focus:border-red-500" : "border-outline-variant/30 focus:border-primary/50"
                    }`}
                  />
                </div>
                {usernameError ? (
                  <p className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{usernameError}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-on-surface-variant">
                    3-20 lowercase letters, numbers, or underscores. Must be unique across all innovators.
                  </p>
                )}
              </div>

              {/* Headline */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Professional Headline</label>
                <input
                  type="text"
                  value={editHeadline}
                  onChange={(e) => setEditHeadline(e.target.value)}
                  placeholder="e.g. Senior Epidemiologist & Health Systems Researcher"
                  className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none border border-outline-variant/30"
                />
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Bio</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Share your domain expertise and areas of investigation..."
                  className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                />
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-primary-container shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Edit Problem Modal ────────────────────────────────────────── */}
      {editingProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/40 p-6 md:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                  Revise Problem Statement
                </span>
                <h2 className="text-xl font-extrabold text-on-surface">Edit Problem Dossier</h2>
              </div>
              <button
                onClick={() => setEditingProblem(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProblemEdit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-on-surface">Problem Title</label>
                <input
                  type="text"
                  required
                  value={editProbTitle}
                  onChange={(e) => setEditProbTitle(e.target.value)}
                  className="w-full bg-surface-container/40 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface outline-none border border-outline-variant/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-on-surface">Core Issue Summary</label>
                <textarea
                  rows={3}
                  required
                  value={editProbDesc}
                  onChange={(e) => setEditProbDesc(e.target.value)}
                  className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-on-surface">Why It's Frustrating</label>
                  <textarea
                    rows={2}
                    value={editProbWhy}
                    onChange={(e) => setEditProbWhy(e.target.value)}
                    className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-on-surface">Who Faces It</label>
                  <textarea
                    rows={2}
                    value={editProbWho}
                    onChange={(e) => setEditProbWho(e.target.value)}
                    className="w-full bg-surface-container/40 rounded-xl p-3 text-xs text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-on-surface">TAM Market Sizing</label>
                  <input
                    type="text"
                    value={editProbTam}
                    onChange={(e) => setEditProbTam(e.target.value)}
                    className="w-full bg-surface-container/40 rounded-xl px-4 py-2 text-xs font-mono text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-on-surface">Annual Wasted Cost</label>
                  <input
                    type="text"
                    value={editProbWastedCost}
                    onChange={(e) => setEditProbWastedCost(e.target.value)}
                    className="w-full bg-surface-container/40 rounded-xl px-4 py-2 text-xs font-mono text-on-surface outline-none border border-outline-variant/30"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2 border border-amber-200">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Editing a problem resets its status to "Pending" for admin re-verification.</span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setEditingProblem(null)}
                  className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingProblem}
                  className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-primary-container shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isUpdatingProblem ? "Updating..." : "Save & Resubmit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
