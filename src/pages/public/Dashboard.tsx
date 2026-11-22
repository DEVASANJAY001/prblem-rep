import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  subscribeProblems,
  updateFullProblemDetails,
  getUserSubmissionsCount,
} from "@/lib/firebase/services/problemsService";
import {
  subscribeBadges,
  evaluateAndAwardUserBadges,
} from "@/lib/firebase/services/badgesService";
import {
  getBookmarkedProblems,
  getUserSubmittedProblemIds,
  checkUsernameAvailability,
  toggleBookmark,
} from "@/lib/storage";
import { getProblemDetailUrl } from "@/lib/seoUrls";
import { ProblemDoc, BadgeDoc } from "@/types";
import {
  DynamicBadgeIcon,
  TIER_CONFIG,
} from "@/components/ui/DynamicBadgeIcon";
import { SEOHead } from "@/components/common/SEOHead";
import confetti from "canvas-confetti";
import {
  FileText,
  Bookmark,
  Award,
  ExternalLink,
  Edit3,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Hammer,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import "./Dashboard.css";

function sanitizeSlug(val: string): string {
  return val.trim().toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20);
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, userDoc, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"problems" | "bookmarks" | "badges">("problems");

  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);
  const [allBadges, setAllBadges] = useState<BadgeDoc[]>([]);
  const [, setLoading] = useState(true);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<string | null>(null);

  // Pagination limit: Load 1st 10 statements, then "load more" to optimize performance & reads
  const [submissionsLimit, setSubmissionsLimit] = useState(10);
  const [savedLimit, setSavedLimit] = useState(10);
  // Authoritative server-aggregated submissions count (1 metadata read, 0 documents downloaded)
  const [serverSubmissionsCount, setServerSubmissionsCount] = useState<number | null>(null);

  // Profile Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState(
    userDoc?.displayName || userDoc?.name || user?.displayName || "deva Sanjay"
  );
  const [editUsername, setEditUsername] = useState(
    userDoc?.username || (user?.email ? user.email.split("@")[0].toLowerCase() : "devasanjay14")
  );
  const [isCustomUsername, setIsCustomUsername] = useState(Boolean(userDoc?.username));
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [editHeadline, setEditHeadline] = useState(userDoc?.headline || "Problem Explorer & Innovator");
  const [editBio, setEditBio] = useState(userDoc?.bio || "Passionate about finding problems worth solving.");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  // Bookmarks State
  const [bookmarkedRefresh, setBookmarkedRefresh] = useState(0);

  const currentUid = userDoc?.uid || user?.uid;

  // 1. Fetch authoritative count with 1 aggregation read (0 documents downloaded)
  useEffect(() => {
    if (!currentUid) return;
    getUserSubmissionsCount(userDoc || (user as any)).then((count) => {
      setServerSubmissionsCount(count);
    });
  }, [currentUid, userDoc, user]);

  // 2. Fetch ONLY the requested batch of problem documents (initial 10), cutting reads by >90%
  useEffect(() => {
    const unsubProblems = subscribeProblems(
      { status: "all", pageLimit: Math.max(submissionsLimit, 10) },
      (list) => {
        setAllProblems(list);
        setLoading(false);
      }
    );

    const unsubBadges = subscribeBadges((list) => {
      setAllBadges(list);
    });

    return () => {
      unsubProblems();
      unsubBadges();
    };
  }, [submissionsLimit]);
  const userSubmittedIds = useMemo(() => {
    return getUserSubmittedProblemIds(currentUid || "guest");
  }, [currentUid]);

  // Real Submissions strictly filtered to this user's contributions
  const mySubmissions = useMemo(() => {
    return allProblems.filter((p) => {
      // 1. Direct UID match
      if (currentUid && (p.submittedByUid === currentUid || p.submittedBy === currentUid)) {
        return true;
      }
      // 2. Locally recorded submissions for this UID
      if (userSubmittedIds.includes(p.id)) {
        return true;
      }
      // 3. Username match
      if (userDoc?.username && (p.submitterUsername === userDoc.username || p.authorUsername === userDoc.username)) {
        return true;
      }
      // 4. Exact Display Name match (only if displayName is not generic "Innovator")
      if (
        userDoc?.displayName &&
        userDoc.displayName !== "Innovator" &&
        (p.submitterName === userDoc.displayName || (p as any).submittedByName === userDoc.displayName || p.submittedBy === userDoc.displayName)
      ) {
        return true;
      }
      // 5. Admin / Creator match: If user is admin (or founder deva Sanjay), include platform desk submissions ("Stuckhere Research Desk") posted by the founder
      if (
        (userDoc?.role === "admin" || (userDoc?.email && userDoc.email.includes("devasanjay"))) &&
        (p.submittedBy === "Stuckhere Research Desk" || p.submitterName === "Stuckhere Research Desk" || p.submittedByUid === "etiuVNpw09eKEBjuEAQSLlWhTLt2")
      ) {
        return true;
      }
      return false;
    });
  }, [allProblems, currentUid, userDoc?.displayName, userDoc?.username, userDoc?.role, userDoc?.email, userSubmittedIds]);

  const bookmarkedProblems = useMemo(() => {
    return getBookmarkedProblems(currentUid || "guest");
  }, [currentUid, bookmarkedRefresh]);

  // Paginated views for performance and reduced reads
  const displayedSubmissions = useMemo(() => {
    return mySubmissions.slice(0, submissionsLimit);
  }, [mySubmissions, submissionsLimit]);

  const displayedSaved = useMemo(() => {
    return bookmarkedProblems.slice(0, savedLimit);
  }, [bookmarkedProblems, savedLimit]);

  // User Profile details from userDoc / user / fallback defaults
  const displayName = userDoc?.displayName || userDoc?.name || user?.displayName || "deva Sanjay";
  const userHandle = userDoc?.username || (user?.email ? user.email.split("@")[0].toLowerCase() : "devasanjay14");
  const userBio = userDoc?.bio || "Passionate about finding problems worth solving.";

  // Total author submissions count (authoritative count from server, fallback to loaded array length)
  const totalSubmissionsCount = serverSubmissionsCount !== null ? serverSubmissionsCount : mySubmissions.length;

  // Real-time dynamic stats calculation
  const realStats = useMemo(() => {
    const problemsSubmitted = totalSubmissionsCount;
    const loadedSolutions = mySubmissions.filter(
      (p) =>
        p.hasStartupMode ||
        ((p as any).startupMode?.solutions && (p as any).startupMode.solutions.length > 0) ||
        ((p as any).startupMode?.directions && (p as any).startupMode.directions.length > 0) ||
        ((p as any).startupMode?.mvpScope && (p as any).startupMode.mvpScope.length > 0)
    ).length;

    const solutionsBuilt =
      mySubmissions.length > 0
        ? Math.round((loadedSolutions / mySubmissions.length) * problemsSubmitted)
        : problemsSubmitted;

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
    };
  }, [mySubmissions, userDoc, totalSubmissionsCount]);

  // Verified badges strictly derived from real task achievement, filtering out phantom badges
  const earnedBadgesNames = useMemo(() => {
    const rawBadges = (userDoc?.badges || []).filter(
      (b) =>
        !b.toLowerCase().includes("google verified") &&
        !b.toLowerCase().includes("new member") &&
        !b.toLowerCase().includes("early member")
    );

    return rawBadges.filter((badgeName) => {
      const badgeObj = allBadges.find((b) => b.name === badgeName);
      if (!badgeObj) return true; // keep non-task custom badges
      switch (badgeObj.taskType) {
        case "problems_submitted":
          return realStats.problemsSubmitted >= (badgeObj.taskThreshold || 1);
        case "solutions_built":
          return realStats.solutionsBuilt >= (badgeObj.taskThreshold || 1);
        case "votes_received":
          return realStats.votesReceived >= (badgeObj.taskThreshold || 1);
        case "evidence_attached":
          return (realStats.dataPointsCount || 0) >= (badgeObj.taskThreshold || 1);
        case "critical_problems":
          return (realStats.criticalCount || 0) >= (badgeObj.taskThreshold || 1);
        case "comments_posted":
          return (realStats.commentsCount || 0) >= (badgeObj.taskThreshold || 1);
        case "bounties_joined":
          return (realStats.bountiesCount || 0) >= (badgeObj.taskThreshold || 1);
        default:
          return true;
      }
    });
  }, [userDoc?.badges, allBadges, realStats]);

  const badgesCount = earnedBadgesNames.length;

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
    const currentName = userDoc?.displayName || userDoc?.name || user?.displayName || "deva Sanjay";
    const currentUsername = userDoc?.username || (user?.email ? user.email.split("@")[0].toLowerCase() : "devasanjay14");
    setEditDisplayName(currentName);
    setEditUsername(currentUsername);
    setIsCustomUsername(Boolean(userDoc?.username));
    setUsernameError(null);
    setEditHeadline(userDoc?.headline || "Problem Explorer & Innovator");
    setEditBio(userDoc?.bio || "Passionate about finding problems worth solving.");
    setSaveSuccess(false);
    setIsEditOpen(true);
  };

  const handleNameChange = (val: string) => {
    setEditDisplayName(val);
    // When user types a new name, automatically suggest the unique lowercase username if not custom-locked
    if (!isCustomUsername) {
      const autoSlug = sanitizeSlug(val);
      if (autoSlug) {
        setEditUsername(autoSlug);
      }
    }
  };

  const handleUsernameChange = (val: string) => {
    setIsCustomUsername(true);
    const clean = val.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setEditUsername(clean);
    if (usernameError) setUsernameError(null);
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
      }, 1000);
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleBookmark = (probId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(probId, currentUid || "guest");
    setBookmarkedRefresh((prev) => prev + 1);
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
    const target = b.taskThreshold || 1;
    const isUnlocked = earnedBadgesNames.includes(b.name) || current >= target;
    const percent = isUnlocked ? 100 : Math.min(100, Math.round((current / target) * 100));
    return { current: isUnlocked ? target : current, target, percent, isUnlocked };
  };

  const pageTitle =
    activeTab === "problems"
      ? "My submissions"
      : activeTab === "bookmarks"
      ? "Saved problems"
      : "Badges & Credentials";

  return (
    <div className="w-full">
      <SEOHead title="Dashboard — Stuckhere" description="Your personal Stuckhere activity, submissions, and badges." noindex />

      <div className="dash-shell">
        {/* ── Left Sidebar (Stationary on Desktop, Scrolls independently) ── */}
        <aside className="dash-side">
          <div className="dash-me">
            <img
              src={userDoc?.photoURL || user?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
              alt={displayName}
              className="dash-avatar"
            />
            <div>
              <h2>{displayName}</h2>
              <small>@{userHandle}</small>
            </div>
          </div>

          <p className="dash-bio">{userBio}</p>

          <div className="dash-side-btns">
            <button className="dash-btn dash-btn-soft" onClick={handleOpenEdit}>
              Edit profile
            </button>
            <Link className="dash-btn dash-btn-main" to="/submit">
              Submit problem
            </Link>
          </div>

          <div className="dash-vnav" role="tablist" aria-orientation="vertical" aria-label="Dashboard navigation">
            <button
              role="tab"
              id="dash-tab-problems"
              aria-selected={activeTab === "problems"}
              onClick={() => setActiveTab("problems")}
            >
              <FileText size={18} />
              <span>Submissions</span>
              <em>{totalSubmissionsCount}</em>
            </button>

            <button
              role="tab"
              id="dash-tab-bookmarks"
              aria-selected={activeTab === "bookmarks"}
              onClick={() => setActiveTab("bookmarks")}
            >
              <Bookmark size={18} />
              <span>Saved</span>
              <em>{bookmarkedProblems.length}</em>
            </button>

            <button
              role="tab"
              id="dash-tab-badges"
              aria-selected={activeTab === "badges"}
              onClick={() => {
                setActiveTab("badges");
                setNewlyUnlockedBadge(null);
              }}
            >
              <Award size={18} />
              <span>Badges</span>
              {newlyUnlockedBadge && <span className="dash-new-badge" title="New badge unlocked" />}
              <em>
                {badgesCount}/{allBadges.length || 14}
              </em>
            </button>
          </div>

          {/* Credentials list */}
          <div className="dash-creds">
            {earnedBadgesNames.length > 0 ? (
              earnedBadgesNames.slice(0, 4).map((bName) => {
                const bObj = allBadges.find((b) => b.name === bName);
                return (
                  <span key={bName}>
                    <i style={{ background: bObj?.color || "var(--primary)" }}>★</i>
                    <span>{bName}</span>
                  </span>
                );
              })
            ) : (
              <div className="dash-creds-empty">
                <span>0 Badges unlocked</span>
                <small>Submit problems to earn credentials</small>
              </div>
            )}
          </div>
        </aside>

        {/* ── Main Content Area (Scrolls as independent container) ── */}
        <main className="dash-main">
          {/* Header Row */}
          <div className="dash-head">
            <h1>{pageTitle}</h1>
            <Link to="/explore">Explore all problems →</Link>
          </div>

          {/* Connected Metrics Strip (4 Robust Cells) */}
          <section className="dash-strip" aria-label="Your numbers">
            <div className="dash-cell">
              <div className="dash-ic dash-bl">
                <FileText size={20} />
              </div>
              <div className="dash-cell-content">
                <b>{realStats.problemsSubmitted}</b>
                <span>Problems</span>
              </div>
            </div>

            <div className="dash-cell">
              <div className="dash-ic dash-gr">
                <Hammer size={20} />
              </div>
              <div className="dash-cell-content">
                <b>{realStats.solutionsBuilt}</b>
                <span>Solutions</span>
              </div>
            </div>

            <div className="dash-cell">
              <div className="dash-ic dash-am">
                <ThumbsUp size={20} />
              </div>
              <div className="dash-cell-content">
                <b>{realStats.votesReceived}</b>
                <span>Votes</span>
              </div>
            </div>

            <div className="dash-cell">
              <div className="dash-ic dash-pu">
                <Award size={20} />
              </div>
              <div className="dash-cell-content">
                <b>
                  {badgesCount}
                  <small>/{allBadges.length || 14}</small>
                </b>
                <span>Badges</span>
              </div>
            </div>
          </section>

          {/* ── TAB 1: SUBMISSIONS ──────────────────────────────────── */}
          {activeTab === "problems" && (
            <div className="dash-box">
              <p className="dash-note">Each problem is reviewed by an industry specialist before it goes live.</p>

              {mySubmissions.length === 0 ? (
                <div className="dash-empty">
                  <div className="dash-big-ic">
                    <FileText size={30} />
                  </div>
                  <h3>No submitted problems yet</h3>
                  <p className="text-muted text-xs max-w-sm">
                    Contribute empirical friction points, diagnostic hurdles, and market pain points to the open registry.
                  </p>
                  <Link to="/submit" className="dash-btn dash-btn-main mt-2">
                    Submit problem
                  </Link>
                </div>
              ) : (
                <>
                  <div className="dash-th">
                    <span>Problem</span>
                    <span>Industry</span>
                    <span>Status</span>
                    <span></span>
                  </div>

                  {displayedSubmissions.map((prob) => {
                    const isPending = prob.status === "pending";
                    const isNeedsInfo = prob.status === "needs_info";
                    const isRejected = prob.status === "rejected";
                    const isLive = prob.status === "approved" || !prob.status;

                    return (
                      <div
                        key={prob.id}
                        className="dash-tr cursor-pointer"
                        onClick={() => navigate(getProblemDetailUrl(prob))}
                      >
                        {/* Clean Problem statement container — Icon thumbnail container removed */}
                        <div className="dash-who">
                          <h3>{prob.title}</h3>
                          <p>{prob.description}</p>
                          {(prob.reviewNote || (prob as any).adminReviewNote) && (
                            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-amber-700">
                              <AlertCircle size={13} className="shrink-0" />
                              <span>Note: {prob.reviewNote || (prob as any).adminReviewNote}</span>
                            </div>
                          )}
                        </div>

                        <div className="dash-meta">
                          <span className="dash-tag">{prob.industry || "General"}</span>

                          {isLive && <span className="dash-pill dash-p-live">Live</span>}
                          {isPending && <span className="dash-pill dash-p-wait">In review</span>}
                          {isNeedsInfo && <span className="dash-pill dash-p-edit">Needs changes</span>}
                          {isRejected && <span className="dash-pill dash-p-reject">Rejected</span>}
                        </div>

                        <div className="dash-acts">
                          <Link
                            to={getProblemDetailUrl(prob)}
                            className="dash-ib"
                            aria-label="View problem"
                            onClick={(e) => e.stopPropagation()}
                            title="View Problem"
                          >
                            <ExternalLink size={17} />
                          </Link>
                          <button
                            type="button"
                            className="dash-ib"
                            aria-label="Edit problem"
                            onClick={(e) => handleOpenProblemEdit(prob, e)}
                            title="Edit Problem"
                          >
                            <Edit3 size={17} />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Load More Button for Submissions */}
                  {totalSubmissionsCount > displayedSubmissions.length && (
                    <div className="dash-load-more">
                      <span className="dash-load-more-info">
                        Showing {displayedSubmissions.length} of {totalSubmissionsCount} submissions
                      </span>
                      <button
                        type="button"
                        className="dash-btn dash-btn-soft"
                        onClick={() => setSubmissionsLimit((prev) => prev + 10)}
                      >
                        Load more ({Math.max(0, totalSubmissionsCount - displayedSubmissions.length)} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ── TAB 2: SAVED PROBLEMS ───────────────────────────────── */}
          {activeTab === "bookmarks" && (
            <div className="dash-box">
              <p className="dash-note">High-signal problem dossiers you bookmarked for research or venture building.</p>

              {bookmarkedProblems.length === 0 ? (
                <div className="dash-empty">
                  <div className="dash-big-ic">
                    <Bookmark size={30} />
                  </div>
                  <h3>No saved problems</h3>
                  <p className="text-muted text-xs max-w-sm">
                    Bookmark interesting real-world problems from the open directory to track solutions and research updates.
                  </p>
                  <button
                    className="dash-btn dash-btn-main mt-2"
                    onClick={() => setActiveTab("problems")}
                  >
                    Back to submissions
                  </button>
                </div>
              ) : (
                <>
                  <div className="dash-th">
                    <span>Problem</span>
                    <span>Industry</span>
                    <span>Market TAM</span>
                    <span></span>
                  </div>

                  {displayedSaved.map((prob) => {
                    return (
                      <div
                        key={prob.id}
                        className="dash-tr cursor-pointer"
                        onClick={() => navigate(getProblemDetailUrl(prob))}
                      >
                        {/* Clean Problem statement container — Icon thumbnail container removed */}
                        <div className="dash-who">
                          <h3>{prob.title}</h3>
                          <p>{prob.description}</p>
                        </div>

                        <div className="dash-meta">
                          <span className="dash-tag">{prob.industry || "General"}</span>
                          <span className="dash-tag font-mono text-[11px]">
                            {prob.marketData?.tam || prob.estimatedValue || "$1.0B+ TAM"}
                          </span>
                        </div>

                        <div className="dash-acts">
                          <Link
                            to={getProblemDetailUrl(prob)}
                            className="dash-ib"
                            aria-label="View problem"
                            onClick={(e) => e.stopPropagation()}
                            title="View Problem"
                          >
                            <ExternalLink size={17} />
                          </Link>
                          <button
                            type="button"
                            className="dash-ib text-rose-500 hover:text-rose-600"
                            aria-label="Remove bookmark"
                            onClick={(e) => handleToggleBookmark(prob.id, e)}
                            title="Remove Bookmark"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Load More Button for Saved Problems */}
                  {bookmarkedProblems.length > savedLimit && (
                    <div className="dash-load-more">
                      <span className="dash-load-more-info">
                        Showing {displayedSaved.length} of {bookmarkedProblems.length} saved problems
                      </span>
                      <button
                        type="button"
                        className="dash-btn dash-btn-soft"
                        onClick={() => setSavedLimit((prev) => prev + 10)}
                      >
                        Load more saved ({Math.min(10, bookmarkedProblems.length - savedLimit)} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ── TAB 3: BADGES & CREDENTIALS ─────────────────────────── */}
          {activeTab === "badges" && (
            <div className="dash-box">
              <p className="dash-note">Track your progress towards tough milestones, verified badges, and platform credentials.</p>

              {allBadges.map((badge) => {
                const progress = getBadgeProgress(badge);
                const tierStyle = TIER_CONFIG[badge.tier] || TIER_CONFIG.bronze;
                const badgeColor = badge.color || "#003bcb";

                let actionLabel = "Take Action";
                let actionLink = "/submit";
                if (badge.taskType === "evidence_attached") {
                  actionLabel = "Add evidence";
                  actionLink = "/explore";
                } else if (badge.taskType === "solutions_built") {
                  actionLabel = "Build a plan";
                  actionLink = "/explore";
                } else if (badge.taskType === "votes_received") {
                  actionLabel = "Share profile";
                  actionLink = "/dashboard";
                }

                return (
                  <div key={badge.id} className="dash-brow">
                    <div
                      className="dash-em"
                      style={{
                        background: progress.isUnlocked ? `${badgeColor}22` : "var(--subtle)",
                        border: `1px solid ${badgeColor}44`,
                      }}
                    >
                      <DynamicBadgeIcon
                        name={badge.iconName}
                        className="w-5 h-5"
                        color={badgeColor}
                        tier={badge.tier}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3>{badge.name}</h3>
                        <span
                          className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${tierStyle.bg} ${tierStyle.border}`}
                        >
                          {badge.tier}
                        </span>
                      </div>
                      <p className="text-muted text-xs mt-0.5 line-clamp-1">{badge.description}</p>
                      <div className="dash-bar">
                        <i
                          style={{
                            width: `${progress.percent}%`,
                            background: badgeColor,
                          }}
                        />
                      </div>
                    </div>

                    <div className="dash-end">
                      <span className="dash-n" style={{ color: badgeColor }}>
                        {progress.current} / {progress.target}
                      </span>
                      {progress.isUnlocked ? (
                        <span
                          className="dash-go"
                          style={{
                            background: "var(--emerald-bg)",
                            color: "var(--emerald)",
                          }}
                        >
                          <CheckCircle size={14} />
                          <span>Unlocked</span>
                        </span>
                      ) : (
                        <Link className="dash-go" to={actionLink}>
                          {actionLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* ── Edit Profile Dialog ─────────────────────────────────────── */}
      {isEditOpen && (
        <div className="dash-dialog-overlay" onClick={() => setIsEditOpen(false)}>
          <div className="dash-dialog" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSaveProfile}>
              <header>
                <h2>Edit profile</h2>
                <button
                  type="button"
                  className="dash-x"
                  aria-label="Close"
                  onClick={() => setIsEditOpen(false)}
                >
                  ✕
                </button>
              </header>

              <label className="dash-label">
                Name
                <input
                  className="dash-f"
                  value={editDisplayName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="deva Sanjay"
                  required
                />
              </label>

              {/* Username (unique) lower case field */}
              <label className="dash-label">
                Username (unique) lower case
                <input
                  className="dash-f font-mono"
                  value={editUsername}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="devasanjay14"
                  required
                />
                {usernameError ? (
                  <span className="text-xs text-rose-500 font-semibold">{usernameError}</span>
                ) : (
                  <span className="text-[11px] text-muted font-normal">
                    Unique public handle (lowercase letters, numbers, and underscores). Updates automatically when you change your name.
                  </span>
                )}
              </label>

              <label className="dash-label">
                Headline
                <input
                  className="dash-f"
                  value={editHeadline}
                  onChange={(e) => setEditHeadline(e.target.value)}
                  placeholder="Problem Explorer & Innovator"
                />
              </label>

              <label className="dash-label">
                Bio
                <textarea
                  className="dash-f"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Passionate about finding problems worth solving."
                />
              </label>

              {/* Avatar Photo URL field intentionally removed per user request */}

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-2">
                  <CheckCircle size={15} />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div className="dash-dact">
                <button
                  type="button"
                  className="dash-btn dash-btn-soft"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="dash-btn dash-btn-main" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Edit Problem Dialog ─────────────────────────────────────── */}
      {editingProblem && (
        <div className="dash-dialog-overlay" onClick={() => setEditingProblem(null)}>
          <div className="dash-dialog" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSaveProblemEdit}>
              <header>
                <h2>Edit problem</h2>
                <button
                  type="button"
                  className="dash-x"
                  aria-label="Close"
                  onClick={() => setEditingProblem(null)}
                >
                  ✕
                </button>
              </header>

              <label className="dash-label">
                Title
                <input
                  className="dash-f"
                  value={editProbTitle}
                  onChange={(e) => setEditProbTitle(e.target.value)}
                  required
                />
              </label>

              <label className="dash-label">
                Issue Summary
                <textarea
                  className="dash-f"
                  value={editProbDesc}
                  onChange={(e) => setEditProbDesc(e.target.value)}
                  required
                />
              </label>

              <label className="dash-label">
                Market size (TAM)
                <input
                  className="dash-f font-mono"
                  value={editProbTam}
                  onChange={(e) => setEditProbTam(e.target.value)}
                  placeholder="$2.4B global LEO protection market"
                />
              </label>

              <label className="dash-label">
                Annual Wasted Cost
                <input
                  className="dash-f font-mono"
                  value={editProbWastedCost}
                  onChange={(e) => setEditProbWastedCost(e.target.value)}
                  placeholder="$180M annual operator loss"
                />
              </label>

              <div className="dash-warn">
                <AlertTriangle size={16} className="shrink-0" />
                <span>Saving sends this problem back to review by an industry specialist.</span>
              </div>

              <div className="dash-dact">
                <button
                  type="button"
                  className="dash-btn dash-btn-soft"
                  onClick={() => setEditingProblem(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="dash-btn dash-btn-main"
                  disabled={isUpdatingProblem}
                >
                  {isUpdatingProblem ? "Updating..." : "Save and resubmit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
