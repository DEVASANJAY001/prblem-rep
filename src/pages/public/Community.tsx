import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeLeaderboard } from "@/lib/firebase/services/usersService";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { subscribeBadges } from "@/lib/firebase/services/badgesService";
import { UserDoc, ProblemDoc, BadgeDoc } from "@/types";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { DynamicBadgeIcon, TIER_CONFIG } from "@/components/ui/DynamicBadgeIcon";
import { getProblemDetailUrl, getStartupModeUrl } from "@/lib/seoUrls";
import { SEOHead } from "@/components/common/SEOHead";
import {
  Trophy,
  Crown,
  Search,
  Flame,
  Rocket,
  CheckCircle2,
  Users,
  ArrowRight,
  Award,
  MessageSquare,
  Eye,
  ThumbsUp,
  Hammer,
  TrendingUp,
  Plus,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function getImpactPoints(u: UserDoc) {
  return (u.counts?.problemsApproved || 0) * 100 + (u.counts?.votes || 0);
}
function getBuilderPoints(u: UserDoc) {
  return (u.counts?.problemsApproved || 0) * 80 + (u.counts?.votes || 0) * 0.5 + (u.counts?.comments || 0) * 5;
}
function getValidatorPoints(u: UserDoc) {
  return (u.counts?.comments || 0) * 20 + (u.counts?.votes || 0) * 10 + (u.counts?.problemsApproved || 0) * 15;
}

function timeAgo(dateStr: string) {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    if (m > 0) return `${m}m ago`;
    return "Just now";
  } catch {
    return "Recently";
  }
}

type LeaderboardTab = "finders" | "builders" | "validators";
type MainTab = "leaderboard" | "feed" | "members";

// ─────────────────────────────────────────────────────────────
// Community Page
// ─────────────────────────────────────────────────────────────
export const Community: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mainTab, setMainTab] = useState<MainTab>("leaderboard");
  const [lbTab, setLbTab] = useState<LeaderboardTab>("finders");
  const [memberSearch, setMemberSearch] = useState("");

  const [users, setUsers] = useState<UserDoc[]>([]);
  const [problems, setProblems] = useState<ProblemDoc[]>([]);
  const [badges, setBadges] = useState<BadgeDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u1 = subscribeLeaderboard((list) => { setUsers(list); setLoading(false); });
    const u2 = subscribeProblems({ status: "approved" }, (list) => setProblems(list));
    const u3 = subscribeBadges((list) => setBadges(list));
    return () => { u1(); u2(); u3(); };
  }, []);

  // ── Sorted leaderboards ─────────────────────────────────────
  const byImpact   = useMemo(() => [...users].sort((a, b) => getImpactPoints(b)   - getImpactPoints(a)),   [users]);
  const byBuilder  = useMemo(() => [...users].sort((a, b) => getBuilderPoints(b)  - getBuilderPoints(a)),  [users]);
  const byValidator= useMemo(() => [...users].sort((a, b) => getValidatorPoints(b)- getValidatorPoints(a)),[users]);

  const activeList  = lbTab === "finders" ? byImpact : lbTab === "builders" ? byBuilder : byValidator;
  const activeScore = lbTab === "finders" ? getImpactPoints : lbTab === "builders" ? getBuilderPoints : getValidatorPoints;

  // ── User top problem helper ─────────────────────────────────
  function topProblemFor(u: UserDoc) {
    return problems
      .filter(p => p.submittedByUid === u.uid || p.submittedBy === u.uid || p.submittedBy === u.name)
      .sort((a, b) => (b.votes?.upvotes || 0) - (a.votes?.upvotes || 0))[0];
  }

  // ── Activity feed (derived from existing data) ──────────────
  const feed = useMemo(() => {
    const items: { id: string; icon: React.ReactNode; label: string; body: React.ReactNode; time: string }[] = [];

    [...problems]
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 4)
      .forEach(p => items.push({
        id: `sub-${p.id}`,
        icon: <Flame className="h-3.5 w-3.5 text-rose-500" />,
        label: "New problem submitted",
        body: <Link to={getProblemDetailUrl(p)} className="font-semibold text-primary hover:underline">{p.title}</Link>,
        time: p.submittedAt,
      }));

    [...problems]
      .filter(p => p.hasStartupMode && p.startupModeEnabled)
      .sort((a, b) => new Date(b.updatedAt || b.submittedAt).getTime() - new Date(a.updatedAt || a.submittedAt).getTime())
      .slice(0, 3)
      .forEach(p => items.push({
        id: `brief-${p.id}`,
        icon: <Rocket className="h-3.5 w-3.5 text-indigo-500" />,
        label: "Startup brief launched",
        body: <Link to={getStartupModeUrl(p)} className="font-semibold text-primary hover:underline">{p.title}</Link>,
        time: p.updatedAt || p.submittedAt,
      }));

    [...problems]
      .filter(p => (p.validations?.faceCount || 0) + (p.validations?.buildCount || 0) > 2)
      .sort((a, b) =>
        ((b.validations?.faceCount || 0) + (b.validations?.buildCount || 0)) -
        ((a.validations?.faceCount || 0) + (a.validations?.buildCount || 0))
      )
      .slice(0, 3)
      .forEach(p => items.push({
        id: `val-${p.id}`,
        icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
        label: "Community validated",
        body: <>
          <Link to={getProblemDetailUrl(p)} className="font-semibold text-primary hover:underline">{p.title}</Link>
          {" · "}
          <span className="text-on-surface-variant">{(p.validations?.faceCount || 0) + (p.validations?.buildCount || 0) + (p.validations?.payCount || 0)} validations</span>
        </>,
        time: p.updatedAt || p.submittedAt,
      }));

    users
      .filter(u => u.badges && u.badges.length > 0)
      .slice(0, 3)
      .forEach(u => items.push({
        id: `badge-${u.uid}`,
        icon: <Award className="h-3.5 w-3.5 text-amber-500" />,
        label: "Badge earned",
        body: <><span className="font-semibold text-on-surface">{u.name}</span>{" earned "}<span className="font-semibold text-amber-600 dark:text-amber-400">{u.badges[u.badges.length - 1]}</span></>,
        time: u.updatedAt || u.createdAt,
      }));

    return items.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 14);
  }, [problems, users]);

  // ── Platform stats ──────────────────────────────────────────
  const totalValidations = useMemo(() =>
    problems.reduce((acc, p) =>
      acc + (p.validations?.faceCount || 0) + (p.validations?.buildCount || 0) +
      (p.validations?.payCount || 0) + (p.validations?.greatCount || 0), 0),
    [problems]
  );

  // ── Members ─────────────────────────────────────────────────
  const filteredMembers = useMemo(() => {
    const q = memberSearch.toLowerCase().trim();
    return byImpact
      .filter(u => !q || u.name.toLowerCase().includes(q) || (u.headline || "").toLowerCase().includes(q))
      .slice(0, 30);
  }, [byImpact, memberSearch]);

  // ── Top 3 + rest ────────────────────────────────────────────
  const [top1, top2, top3, ...rest] = activeList;

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      {/* SEO: Community WebPage schema */}
      <SEOHead
        title="Community \u2014 Problem Finders, Builders & Validators"
        description={`Join ${users.length || "thousands of"} problem finders, startup builders, and domain validators on ProblemAtlas. Climb the leaderboard, explore trending problems, and connect with innovators.`}
        canonicalUrl="https://problematlas.com/community"
        ogType="website"
        keywords={["problem solving community", "startup community", "innovation leaderboard", "problem validators", "startup builders", "hackathon community"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "ProblemAtlas Community",
          "description": "Leaderboard, activity feed, and member directory for the ProblemAtlas problem-solving community.",
          "url": "https://problematlas.com/community",
          "isPartOf": {
            "@type": "WebSite",
            "name": "ProblemAtlas",
            "url": "https://problematlas.com"
          }
        }}
      />

      {/* ── PAGE HEADER ─────────────────────────────────────── */}

      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface border-b border-outline-variant/20 pt-8 pb-5 sm:pt-10 sm:pb-8 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-on-surface-variant">Live Community</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">
                Community
              </h1>
              <p className="text-on-surface-variant text-xs sm:text-sm mt-1 max-w-xl">
                Problem finders, startup builders, and validators shaping the ProblemAtlas ecosystem.
              </p>
            </div>

            {/* Quick stats strip */}
            <div className="flex items-center gap-4 sm:gap-6 text-sm shrink-0 flex-wrap">
              {[
                { value: users.length || "—", label: "Members" },
                { value: problems.length, label: "Verified Problems" },
                { value: totalValidations, label: "Validations" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-lg sm:text-xl font-black text-on-surface font-mono">{typeof s.value === "number" ? s.value.toLocaleString() : s.value}</p>
                  <p className="text-[10px] sm:text-[11px] text-on-surface-variant mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tab bar */}
          <div className="mt-5 sm:mt-8 flex items-center gap-1 border-b border-outline-variant/20 overflow-x-auto hide-scrollbar">
            {([
              { id: "leaderboard", label: "Leaderboard", icon: <Trophy className="h-3.5 w-3.5" /> },
              { id: "feed",        label: "Activity Feed", icon: <Flame className="h-3.5 w-3.5" /> },
              { id: "members",     label: "Members",       icon: <Users className="h-3.5 w-3.5" /> },
            ] as { id: MainTab; label: string; icon: React.ReactNode }[]).map(t => (
              <button
                key={t.id}
                onClick={() => setMainTab(t.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 -mb-px transition-all cursor-pointer whitespace-nowrap ${
                  mainTab === t.id
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* ══════════════════════════════════════════════════
            LEADERBOARD TAB
        ══════════════════════════════════════════════════ */}
        {mainTab === "leaderboard" && (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left: main leaderboard */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* Sub-tab selector */}
              <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant/20 p-1 rounded-2xl w-fit">
                {([
                  { id: "finders",    label: "Problem Finders", icon: <Search className="h-3 w-3" /> },
                  { id: "builders",   label: "Builders",        icon: <Hammer className="h-3 w-3" /> },
                  { id: "validators", label: "Validators",      icon: <ShieldCheck className="h-3 w-3" /> },
                ] as { id: LeaderboardTab; label: string; icon: React.ReactNode }[]).map(t => (
                  <button
                    key={t.id}
                    onClick={() => setLbTab(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      lbTab === t.id
                        ? "bg-primary text-white shadow-xs"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    {t.icon}
                    <span className="hidden sm:inline">{t.label}</span>
                    <span className="sm:hidden">{t.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Scoring note */}
              <p className="text-xs text-on-surface-variant">
                {lbTab === "finders"
                  ? "Ranked by: verified problems × 100 + community votes"
                  : lbTab === "builders"
                  ? "Ranked by: problem quality + engagement activity + startup briefs"
                  : "Ranked by: comments posted × 20 + validations given × 10"}
              </p>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : activeList.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-outline-variant/40 rounded-2xl">
                  <Users className="h-8 w-8 mx-auto text-outline mb-3" />
                  <p className="text-sm font-semibold text-on-surface-variant">No members yet</p>
                  <Link to="/register" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                    Be the first to join <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ) : (
                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden shadow-xs">
                  {/* Top 3 highlighted rows */}
                  {[top1, top2, top3].filter(Boolean).map((u, i) => {
                    const rank = i + 1;
                    const score = activeScore(u);
                    const tp = topProblemFor(u);
                    const rankMedal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉";
                    return (
                      <div
                        key={u.uid || i}
                        className={`flex items-center gap-4 px-5 py-4 border-b border-outline-variant/20 ${
                          rank === 1 ? "bg-amber-50/60 dark:bg-amber-950/10" : "hover:bg-surface-container/50"
                        } transition-colors`}
                      >
                        <span className="text-xl w-7 text-center shrink-0 select-none">{rankMedal}</span>
                        <UserAvatar src={u.photoURL || undefined} name={u.name} size="lg" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-bold text-on-surface text-sm ${rank === 1 ? "text-base" : ""}`}>{u.name}</span>
                            {u.badges?.[0] && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/8 border border-primary/15 text-primary">
                                {u.badges[0]}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-on-surface-variant mt-0.5 truncate">{u.headline || u.role}</p>
                          {tp && (
                            <Link to={getProblemDetailUrl(tp)} className="text-[11px] text-primary hover:underline mt-1 block truncate">
                              → {tp.title}
                            </Link>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-mono font-black text-primary text-base">{score.toLocaleString()}</p>
                          <p className="text-[10px] text-on-surface-variant">pts</p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Rest of the table */}
                  {rest.length > 0 && (
                    <table className="w-full text-xs">
                      <tbody className="divide-y divide-outline-variant/10">
                        {rest.map((u, i) => {
                          const score = activeScore(u);
                          return (
                            <tr key={u.uid || i} className="hover:bg-surface-container/40 transition-colors">
                              <td className="py-3 pl-5 w-8 text-on-surface-variant font-mono">#{i + 4}</td>
                              <td className="py-3 pr-3">
                                <div className="flex items-center gap-3">
                                  <UserAvatar src={u.photoURL || undefined} name={u.name} size="sm" />
                                  <div className="min-w-0">
                                    <p className="font-semibold text-on-surface truncate">{u.name}</p>
                                    <p className="text-[10px] text-on-surface-variant truncate">{u.headline || u.role}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 hidden sm:table-cell text-on-surface-variant">{u.counts?.problemsApproved || 0} verified</td>
                              <td className="py-3 pr-5 text-right font-mono font-bold text-primary">{score.toLocaleString()}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <div className="w-full lg:w-72 shrink-0 space-y-6">

              {/* Trending problems this week */}
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs overflow-hidden">
                <div className="px-4 py-3 border-b border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-rose-500" />
                    <span className="text-sm font-bold text-on-surface">Trending This Week</span>
                  </div>
                  <Link to="/explore" className="text-[11px] text-primary font-semibold hover:underline flex items-center gap-0.5">
                    See all <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="divide-y divide-outline-variant/10">
                  {[...problems]
                    .sort((a, b) => (b.votes?.upvotes || 0) - (a.votes?.upvotes || 0))
                    .slice(0, 5)
                    .map((p, i) => (
                      <Link
                        key={p.id}
                        to={getProblemDetailUrl(p)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-surface-container/50 transition-colors group"
                      >
                        <span className="font-mono text-xs text-on-surface-variant pt-0.5 w-4 shrink-0">{i + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {p.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-on-surface-variant">
                            <span className="flex items-center gap-0.5"><ThumbsUp className="h-2.5 w-2.5" />{p.votes?.upvotes || 0}</span>
                            <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" />{p.views || 0}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  {problems.length === 0 && (
                    <p className="px-4 py-6 text-xs text-center text-on-surface-variant">No problems yet.</p>
                  )}
                </div>
              </div>

              {/* Problems needing a builder */}
              {problems.filter(p => p.validations?.buildCount && p.validations.buildCount > 0 && !p.hasStartupMode).length > 0 && (
                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs overflow-hidden">
                  <div className="px-4 py-3 border-b border-outline-variant/20 flex items-center gap-2">
                    <Hammer className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold text-on-surface">Needs a Builder</span>
                  </div>
                  <div className="divide-y divide-outline-variant/10">
                    {problems
                      .filter(p => p.validations?.buildCount && p.validations.buildCount > 0 && !p.hasStartupMode)
                      .slice(0, 3)
                      .map(p => (
                        <Link key={p.id} to={getProblemDetailUrl(p)} className="flex items-start gap-3 px-4 py-3 hover:bg-surface-container/50 transition-colors group">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">{p.title}</p>
                            <p className="text-[10px] text-on-surface-variant mt-1">{p.validations?.buildCount} people said "I can build this"</p>
                          </div>
                        </Link>
                      ))
                    }
                  </div>
                </div>
              )}

              {/* CTA for guests */}
              {!user && (
                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs p-5 text-center">
                  <p className="text-sm font-bold text-on-surface">Join the leaderboard</p>
                  <p className="text-xs text-on-surface-variant mt-1">Submit problems, earn badges, and climb the rankings.</p>
                  <Link
                    to="/register"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary text-white text-xs font-bold px-4 py-2.5 hover:bg-primary/90 transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" /> Create Account
                  </Link>
                  <Link to="/explore" className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors">
                    Browse problems first
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            ACTIVITY FEED TAB
        ══════════════════════════════════════════════════ */}
        {mainTab === "feed" && (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Feed column */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-5 border-b border-outline-variant/20 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-on-surface">Activity Feed</h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">Latest platform events — submissions, briefs, validations, and badges.</p>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 px-2.5 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : feed.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-outline-variant/40 rounded-2xl">
                  <Flame className="h-8 w-8 mx-auto text-outline mb-3" />
                  <p className="text-sm font-semibold text-on-surface-variant">No activity yet.</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs overflow-hidden">
                  {feed.map((item, i) => (
                    <div
                      key={item.id}
                      className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-surface-container/50 ${
                        i < feed.length - 1 ? "border-b border-outline-variant/10" : ""
                      }`}
                    >
                      {/* Timeline dot + icon */}
                      <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container border border-outline-variant/30">
                          {item.icon}
                        </div>
                        {i < feed.length - 1 && (
                          <div className="w-px flex-1 min-h-[16px] bg-outline-variant/20" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-0.5">{item.label}</p>
                        <p className="text-xs text-on-surface leading-relaxed">{item.body}</p>
                      </div>

                      {/* Timestamp */}
                      <span className="shrink-0 text-[10px] text-on-surface-variant pt-0.5 whitespace-nowrap">{timeAgo(item.time)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar: featured problem + stats */}
            <div className="w-full lg:w-72 shrink-0 space-y-6">

              {/* Problem of the week */}
              {problems.length > 0 && (() => {
                const pow = [...problems].sort((a, b) => (b.votes?.upvotes || 0) - (a.votes?.upvotes || 0))[0];
                return (
                  <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs overflow-hidden">
                    <div className="px-4 py-3 border-b border-outline-variant/20 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-bold text-on-surface">Problem of the Week</span>
                    </div>
                    <div
                      onClick={() => navigate(getProblemDetailUrl(pow))}
                      className="p-4 cursor-pointer group"
                    >
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">{pow.industry}</span>
                      <h3 className="text-sm font-bold text-on-surface leading-snug group-hover:text-primary transition-colors line-clamp-3">
                        {pow.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">{pow.description}</p>
                      <div className="mt-3 flex items-center gap-3 text-[11px] text-on-surface-variant">
                        <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{pow.votes?.upvotes || 0} votes</span>
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{pow.views || 0} views</span>
                        <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{pow.commentsCount || 0}</span>
                      </div>
                    </div>
                    {pow.hasStartupMode && (
                      <div className="px-4 pb-4">
                        <Link
                          to={getStartupModeUrl(pow)}
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all"
                        >
                          <Rocket className="h-3 w-3" /> View Startup Brief
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Platform numbers */}
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs overflow-hidden">
                <div className="px-4 py-3 border-b border-outline-variant/20">
                  <span className="text-sm font-bold text-on-surface">Platform Stats</span>
                </div>
                <div className="divide-y divide-outline-variant/10">
                  {[
                    { label: "Members", value: users.length },
                    { label: "Verified Problems", value: problems.length },
                    { label: "Community Validations", value: totalValidations },
                    { label: "Startup Briefs", value: problems.filter(p => p.hasStartupMode).length },
                    { label: "Badges Available", value: badges.length },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between px-4 py-3">
                      <span className="text-xs text-on-surface-variant">{s.label}</span>
                      <span className="text-sm font-black font-mono text-on-surface">{s.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            MEMBERS TAB
        ══════════════════════════════════════════════════ */}
        {mainTab === "members" && (
          <div className="space-y-6">
            {/* Header + search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-5">
              <div>
                <h2 className="text-xl font-bold text-on-surface">All Members</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Showing {filteredMembers.length} contributors ranked by impact
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant h-3.5 w-3.5" />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={e => setMemberSearch(e.target.value)}
                  placeholder="Search by name or role…"
                  className="w-full bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 rounded-xl py-2 pl-9 pr-3 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary shadow-xs transition-all"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-outline-variant/40 rounded-2xl">
                <Users className="h-8 w-8 mx-auto text-outline mb-3" />
                <p className="text-sm text-on-surface-variant">No members match your search.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-xs overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-outline-variant/20 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                      <th className="py-3 pl-5 text-left">Member</th>
                      <th className="py-3 text-left hidden md:table-cell">Top Problem</th>
                      <th className="py-3 text-right hidden sm:table-cell">Verified</th>
                      <th className="py-3 text-right hidden sm:table-cell">Votes</th>
                      <th className="py-3 text-right pr-5">Impact Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {filteredMembers.map((u, i) => {
                      const score = getImpactPoints(u);
                      const tp = topProblemFor(u);
                      const badgeObj = badges.find(b => b.name === u.badges?.[0]);
                      const tierStyle = badgeObj ? TIER_CONFIG[badgeObj.tier] : null;
                      return (
                        <tr key={u.uid || i} className="hover:bg-surface-container/40 transition-colors">
                          <td className="py-4 pl-5">
                            <div className="flex items-center gap-3">
                              <span className="text-[11px] font-mono text-on-surface-variant w-5 shrink-0">
                                {i < 3 ? ["🥇","🥈","🥉"][i] : `${i+1}`}
                              </span>
                              <UserAvatar src={u.photoURL || undefined} name={u.name} size="md" />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-on-surface truncate">{u.name}</p>
                                <p className="text-[11px] text-on-surface-variant truncate">{u.headline || u.role}</p>
                                {u.badges?.[0] && tierStyle && (
                                  <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full border mt-1 ${tierStyle.bg} ${tierStyle.border}`}>
                                    <DynamicBadgeIcon name={badgeObj?.iconName || "award"} className="h-2 w-2" color={badgeObj?.color} />
                                    {u.badges[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-4 hidden md:table-cell max-w-[200px]">
                            {tp ? (
                              <Link to={getProblemDetailUrl(tp)} className="text-xs text-primary hover:underline line-clamp-2 leading-snug">
                                {tp.title}
                              </Link>
                            ) : (
                              <span className="text-xs text-on-surface-variant">—</span>
                            )}
                          </td>
                          <td className="py-4 text-right hidden sm:table-cell text-sm font-bold text-on-surface font-mono">
                            {u.counts?.problemsApproved || 0}
                          </td>
                          <td className="py-4 text-right hidden sm:table-cell text-sm text-on-surface-variant font-mono">
                            {u.counts?.votes || 0}
                          </td>
                          <td className="py-4 text-right pr-5 font-mono font-black text-primary">
                            {score.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* CTA for non-logged-in users */}
            {!user && (
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-on-surface">Want to appear here?</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Create an account and start submitting verified problems to earn your rank.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link to="/register" className="flex items-center gap-2 rounded-xl bg-primary text-white text-xs font-bold px-4 py-2.5 hover:bg-primary/90 transition-all">
                    <Plus className="h-3.5 w-3.5" /> Join Now
                  </Link>
                  <Link to="/explore" className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors">
                    Browse problems
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
