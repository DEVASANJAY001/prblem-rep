import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeProblems, updateFullProblemDetails } from "@/lib/firebase/services/problemsService";
import { getBookmarkedProblems } from "@/lib/storage";
import { ProblemDoc } from "@/types";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { AVATAR_PRESETS } from "@/lib/avatars";
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
} from "lucide-react";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, userDoc, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"problems" | "bookmarks" | "badges">("problems");

  const [allProblems, setAllProblems] = useState<ProblemDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Profile Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(userDoc?.name || user?.displayName || "Innovator");
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
    const unsubscribe = subscribeProblems({ status: "all" }, (list) => {
      setAllProblems(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const currentUid = userDoc?.uid || user?.uid;
  const mySubmissions = allProblems.filter(
    (p) =>
      p.submittedByUid === currentUid ||
      p.submittedBy === currentUid ||
      p.submittedBy === userDoc?.name ||
      p.submitterName === userDoc?.name ||
      allProblems.length <= 6
  );
  const bookmarkedProblems = getBookmarkedProblems(userDoc?.uid || user?.uid || "guest");

  const displayName = userDoc?.name || user?.displayName || "Innovator";
  const userRole = userDoc?.role || "user";
  const badges = userDoc?.badges || ["Early Member", "Innovator"];

  const handleOpenEdit = () => {
    setEditName(userDoc?.name || user?.displayName || "Innovator");
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
      status: "pending", // Every edit resets status to pending for Admin re-approval!
      updatedAt: new Date().toISOString(),
    };

    await updateFullProblemDetails(editingProblem.id, updatedData);
    setIsUpdatingProblem(false);
    setEditingProblem(null);
  };

  const handleSelectPreset = (url: string, id: string) => {
    setEditPhotoURL(url);
    setSelectedPreset(id);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Please select an image smaller than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditPhotoURL(event.target.result as string);
          setSelectedPreset(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserProfile({
        name: editName.trim() || displayName,
        headline: editHeadline.trim(),
        bio: editBio.trim(),
        photoURL: editPhotoURL.trim() || null,
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setIsSaving(false);
        setIsEditOpen(false);
      }, 700);
    } catch (err) {
      console.error("Save profile error:", err);
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-12 font-body-md text-on-surface bg-surface">
      
      {/* ── Main Profile Banner Card ──────────────────────────────── */}
      <div className="relative rounded-3xl bg-surface-container-lowest border border-outline-variant/30 p-6 md:p-8 shadow-sm mb-12 overflow-hidden">
        {/* Ambient Gradient Background Glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar and Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative group">
              <UserAvatar
                src={userDoc?.photoURL || user?.photoURL}
                name={displayName}
                email={userDoc?.email || user?.email}
                role={userRole}
                size="2xl"
                isEditable
                onEditClick={handleOpenEdit}
                showRoleBadge
              />
              <button
                onClick={handleOpenEdit}
                className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Change Profile Picture"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
                  {displayName}
                </h1>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold ${
                    userRole === "admin"
                      ? "bg-primary text-white shadow-xs"
                      : userRole === "moderator"
                      ? "bg-secondary text-white"
                      : "bg-primary-container text-on-primary-container"
                  }`}
                >
                  {userRole === "admin" ? (
                    <>
                      <Shield className="h-3 w-3" />
                      <span>Admin</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3" />
                      <span className="capitalize">{userRole}</span>
                    </>
                  )}
                </span>
              </div>

              <p className="text-sm md:text-base font-semibold text-primary">
                {userDoc?.headline || "Problem Explorer & Innovator"}
              </p>

              <p className="text-xs md:text-sm text-on-surface-variant max-w-xl line-clamp-2 leading-relaxed">
                {userDoc?.bio || "Researching verified real-world problems and building high-conviction solutions."}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1 font-mono">
                  <Mail className="h-3.5 w-3.5 text-outline" />
                  {userDoc?.email || user?.email || "verified@problematlas.com"}
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
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mr-1">
            Badges:
          </span>
          {badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-surface-container text-on-surface border border-outline-variant/30 shadow-xs"
            >
              <Award className="h-3.5 w-3.5 text-primary" />
              <span>{b}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 4 Stat Tiles ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Stat Card 1 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary-fixed/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-label-md font-label-md text-on-surface uppercase tracking-wider font-semibold">
              Problems Submitted
            </span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface font-bold">
            {userDoc?.counts?.problemsSubmitted ?? 12}
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-secondary-container/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex items-center gap-3">
            <Hammer className="h-5 w-5 text-secondary" />
            <span className="text-label-md font-label-md text-on-surface uppercase tracking-wider font-semibold">
              Solutions Built
            </span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface font-bold">
            {userDoc?.counts?.problemsApproved ?? 0}
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-tertiary-fixed/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex items-center gap-3">
            <ThumbsUp className="h-5 w-5 text-tertiary" />
            <span className="text-label-md font-label-md text-on-surface uppercase tracking-wider font-semibold">
              Votes Received
            </span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface font-bold">
            {userDoc?.counts?.votes ?? 0}
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-surface-variant/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-on-surface-variant" />
            <span className="text-label-md font-label-md text-on-surface uppercase tracking-wider font-semibold">
              Badges Earned
            </span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface font-bold">
            {badges.length}
          </div>
        </div>
      </div>

      {/* ── Tabs & Problem Lists ─────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
          <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/20">
            <button
              onClick={() => setActiveTab("problems")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "problems"
                  ? "bg-primary text-white shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              My Submissions ({mySubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "badges"
                  ? "bg-primary text-white shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              <span>Credentials & Badges</span>
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

        {activeTab === "problems" && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-x-auto">
            {mySubmissions.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center gap-3 max-w-md mx-auto">
                <FileText className="h-10 w-10 text-outline" />
                <h3 className="text-base font-bold text-on-surface">No submitted problem statements yet</h3>
                <p className="text-xs text-on-surface-variant">
                  Contribute real-world friction, diagnostic insights, and market pain points to the open registry.
                </p>
                <Link
                  to="/submit"
                  className="mt-2 inline-flex items-center gap-1.5 bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary-container shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Submit Problem Statement</span>
                </Link>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-outline-variant/30 bg-surface-container-low/50">
                    <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                      Problem Title & Narrative
                    </th>
                    <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                      Industry
                    </th>
                    <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                      Status & Admin Review
                    </th>
                    <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {mySubmissions.map((prob) => {
                    const isPending = prob.status === "pending";
                    const isNeedsInfo = prob.status === "needs_info";
                    const isApproved = prob.status === "approved" || !prob.status;
                    const isRejected = prob.status === "rejected";

                    return (
                      <tr
                        key={prob.id}
                        onClick={() => navigate(`/problem/${prob.id}`)}
                        className="hover:bg-surface-container-low/40 transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-1 max-w-md">
                            <p className="text-sm font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                              {prob.title}
                            </p>
                            <p className="text-[11px] text-on-surface-variant line-clamp-1">
                              {prob.description}
                            </p>

                            {/* Admin Review Note Callout if changes requested or note provided */}
                            {(isNeedsInfo || prob.reviewNote || prob.adminReviewNote) && (
                              <div className="mt-1.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="text-[11px] text-amber-900 leading-tight">
                                  <span className="font-bold">Admin Note: </span>
                                  {prob.reviewNote || prob.adminReviewNote || "Modifications requested. Please edit and resubmit."}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-surface-container text-on-surface-variant whitespace-nowrap font-medium">
                            {prob.industry}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          {isApproved && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Approved & Live
                            </span>
                          )}
                          {isPending && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-bold border border-amber-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              Pending Review
                            </span>
                          )}
                          {isNeedsInfo && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full font-bold border border-rose-200">
                              <AlertCircle className="w-3 h-3 text-rose-600" />
                              Action Required
                            </span>
                          )}
                          {isRejected && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full font-bold">
                              Rejected / Hidden
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={(e) => handleOpenProblemEdit(prob, e)}
                              className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-xs font-bold text-on-surface flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                              title="Edit & Resubmit Problem Statement"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit & Resubmit</span>
                            </button>
                            <Link
                              to={`/problem/${prob.id}`}
                              className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                              title="View Live Problem"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "bookmarks" && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-8 text-center">
            {bookmarkedProblems.length === 0 ? (
              <div className="flex flex-col items-center gap-3 max-w-sm mx-auto">
                <Bookmark className="h-10 w-10 text-outline" />
                <h3 className="text-base font-bold text-on-surface">No bookmarked problems yet</h3>
                <p className="text-xs text-on-surface-variant">
                  Explore the problem repository and bookmark high-pain issues you want to research or build solutions for.
                </p>
                <Link
                  to="/explore"
                  className="mt-2 inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary-container"
                >
                  <span>Explore Problems</span>
                </Link>
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant">Showing {bookmarkedProblems.length} bookmarked problems.</p>
            )}
          </div>
        )}

        {activeTab === "badges" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((b, i) => (
              <div
                key={b}
                className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-2xl flex items-center gap-4 shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">{b}</h4>
                  <p className="text-[11px] text-on-surface-variant">Verified community credential #{i + 1}</p>
                </div>
              </div>
            ))}
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
                <h2 className="text-xl font-extrabold text-on-surface">Edit Profile & Avatar</h2>
                <p className="text-xs text-on-surface-variant">Customize your public identity and profile image</p>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
              {/* Profile Image Preview & Avatar Selector */}
              <div className="flex flex-col gap-4 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                <label className="text-xs font-bold uppercase tracking-wider text-on-surface">
                  Profile Picture
                </label>

                <div className="flex items-center gap-5">
                  <UserAvatar
                    src={editPhotoURL}
                    name={editName}
                    size="xl"
                    className="ring-4 ring-primary/20"
                  />

                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg text-xs font-bold border border-outline-variant/40 transition-all cursor-pointer"
                      >
                        <Upload className="h-3.5 w-3.5 text-primary" />
                        <span>Upload Photo</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                    <span className="text-[11px] text-on-surface-variant">
                      JPG, PNG or GIF under 2MB. Or select a preset avatar below.
                    </span>
                  </div>
                </div>

                {/* Preset Avatars Grid */}
                <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
                  <span className="text-[11px] font-bold text-on-surface-variant">
                    Choose from Curated Avatars:
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {AVATAR_PRESETS.map((preset) => {
                      const isSelected = editPhotoURL === preset.url || selectedPreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleSelectPreset(preset.url, preset.id)}
                          title={preset.label}
                          className={`relative rounded-full p-0.5 transition-all cursor-pointer hover:scale-110 ${
                            isSelected
                              ? "ring-2 ring-primary ring-offset-2 scale-105"
                              : "hover:ring-2 hover:ring-outline-variant opacity-75 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-10 h-10 rounded-full object-cover shadow-xs"
                          />
                          {isSelected && (
                            <span className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5">
                              <Check className="h-2.5 w-2.5" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Image URL Field */}
                <div className="flex items-center gap-2 pt-2">
                  <LinkIcon className="h-4 w-4 text-outline shrink-0" />
                  <input
                    type="url"
                    value={editPhotoURL}
                    onChange={(e) => {
                      setEditPhotoURL(e.target.value);
                      setSelectedPreset(null);
                    }}
                    placeholder="Or paste an image URL (https://...)"
                    className="flex-1 bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Text Fields */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Headline / Title
                  </label>
                  <input
                    type="text"
                    value={editHeadline}
                    onChange={(e) => setEditHeadline(e.target.value)}
                    placeholder="e.g. Clinical Supply Lead | 2x Founder"
                    className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Bio & Expertise
                  </label>
                  <textarea
                    rows={3}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Share what industries or friction points you are investigating..."
                    className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>

              {/* Save & Cancel */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>{isSaving ? "Saving..." : "Save Profile"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Submission Edit & Resubmit Modal */}
      {editingProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-outline-variant/30 overflow-hidden font-['Poppins',sans-serif]">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-low">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Edit3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-on-surface">
                    Edit & Resubmit Problem Statement
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    Edits will reset status to "Pending Review" for Admin verification.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingProblem(null)}
                className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveProblemEdit} className="p-6 overflow-y-auto flex flex-col gap-4">
              {/* Admin Note Reminder if present */}
              {(editingProblem.reviewNote || editingProblem.adminReviewNote) && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <span className="font-bold">Admin Requested Changes: </span>
                    {editingProblem.reviewNote || editingProblem.adminReviewNote}
                  </div>
                </div>
              )}

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Problem Statement Title</label>
                <input
                  type="text"
                  required
                  value={editProbTitle}
                  onChange={(e) => setEditProbTitle(e.target.value)}
                  className="w-full bg-surface-container-low rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Core Issue Summary */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Core Issue Summary</label>
                <textarea
                  required
                  rows={3}
                  value={editProbDesc}
                  onChange={(e) => setEditProbDesc(e.target.value)}
                  className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Operational Narrative Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">When It Happens</label>
                  <input
                    type="text"
                    value={editProbWhen}
                    onChange={(e) => setEditProbWhen(e.target.value)}
                    className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Who Faces It</label>
                  <input
                    type="text"
                    value={editProbWho}
                    onChange={(e) => setEditProbWho(e.target.value)}
                    className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Why It's Frustrating</label>
                  <textarea
                    rows={2}
                    value={editProbWhy}
                    onChange={(e) => setEditProbWhy(e.target.value)}
                    className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-on-surface">Current Solution / Workaround</label>
                  <textarea
                    rows={2}
                    value={editProbCurrentSol}
                    onChange={(e) => setEditProbCurrentSol(e.target.value)}
                    className="w-full bg-surface-container-low rounded-xl p-3 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">TAM ($)</label>
                  <input
                    type="text"
                    value={editProbTam}
                    onChange={(e) => setEditProbTam(e.target.value)}
                    className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Wasted Cost ($)</label>
                  <input
                    type="text"
                    value={editProbWastedCost}
                    onChange={(e) => setEditProbWastedCost(e.target.value)}
                    className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-xs font-bold text-error outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Submit & Cancel */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setEditingProblem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingProblem}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isUpdatingProblem ? "Updating..." : "Submit for Re-Approval"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

