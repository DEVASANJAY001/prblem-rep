import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subscribeResearch } from "@/lib/firebase/services/researchService";
import { ResearchDoc } from "@/types";
import {
  Search,
  BookOpen,
  FileText,
  Download,
  ArrowRight,
  Database,
  Cpu,
  Heart,
  Leaf,
  GraduationCap,
  Zap,
  Home,
  ExternalLink,
  CheckCircle2,
  Clock,
  Users,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Bookmark,
  X,
  Compass,
  Building2,
  Lightbulb,
  Radio,
  FileSpreadsheet,
} from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";

// LocalStorage key for tracking reading sessions and completion
const READING_STORAGE_KEY = "stuckhere_research_reading_state";

interface ReadingState {
  [id: string]: {
    status: "reading" | "completed";
    progress: number; // 0 - 100
    lastReadAt: string;
    readingSeconds?: number;
  };
}

export const Research: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "reading" | "completed" | "unread">("all");
  const [researchList, setResearchList] = useState<ResearchDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Reader View
  const [activeReadingDoc, setActiveReadingDoc] = useState<ResearchDoc | null>(null);
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const readerContentRef = useRef<HTMLDivElement>(null);

  // Bookmarks & Reading Progress Persistence
  const [readingState, setReadingState] = useState<ReadingState>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved reading history & bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(READING_STORAGE_KEY);
      if (saved) {
        setReadingState(JSON.parse(saved));
      }
      const savedBookmarks = localStorage.getItem("stuckhere_research_bookmarks");
      if (savedBookmarks) {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync reading state to localStorage
  const updateReadingRecord = (
    id: string,
    update: Partial<ReadingState[string]>
  ) => {
    setReadingState((prev) => {
      const current = prev[id] || {
        status: "reading",
        progress: 10,
        lastReadAt: new Date().toISOString(),
        readingSeconds: 0,
      };
      const next = {
        ...prev,
        [id]: {
          ...current,
          ...update,
          lastReadAt: new Date().toISOString(),
        },
      };
      try {
        localStorage.setItem(READING_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Toggle Bookmark
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("stuckhere_research_bookmarks", JSON.stringify(next));
      } catch {
        // ignore
      }
      showToast(next.includes(id) ? "Saved to your reading library" : "Removed from library");
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3000);
  };

  // Subscribe to research list
  useEffect(() => {
    const unsubscribe = subscribeResearch((list) => {
      setResearchList(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Timer while reading inside the in-app Reader
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (activeReadingDoc) {
      timer = setInterval(() => {
        setReadingSeconds((s) => s + 1);
      }, 1000);
    } else {
      setReadingSeconds(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeReadingDoc]);

  // Open In-App Reader and mark as "reading"
  const startReading = (doc: ResearchDoc) => {
    setActiveReadingDoc(doc);
    setScrollProgress(readingState[doc.id]?.progress || 15);
    updateReadingRecord(doc.id, {
      status: readingState[doc.id]?.status === "completed" ? "completed" : "reading",
      progress: Math.max(readingState[doc.id]?.progress || 15, 20),
    });
  };

  // Mark document as completed
  const markAsCompleted = (id: string) => {
    updateReadingRecord(id, {
      status: "completed",
      progress: 100,
    });
    showToast("Marked as read and verified!");
  };

  // Copy citation to clipboard
  const copyCitation = (doc: ResearchDoc) => {
    const citation = `${doc.author} (${doc.year}). "${doc.title}." ${doc.source}. DOI: ${doc.doi || "N/A"}. Retrieved from Stuckhere Problem Intelligence Platform.`;
    navigator.clipboard.writeText(citation);
    showToast("Citation copied in APA format!");
  };

  // Track scrolling inside the reader
  const handleReaderScroll = () => {
    if (!readerContentRef.current || !activeReadingDoc) return;
    const { scrollTop, scrollHeight, clientHeight } = readerContentRef.current;
    const progress = Math.min(100, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)) || 0;
    setScrollProgress(progress);
    if (progress > (readingState[activeReadingDoc.id]?.progress || 0)) {
      updateReadingRecord(activeReadingDoc.id, {
        progress,
        status: progress >= 95 ? "completed" : "reading",
      });
    }
  };

  // Trending Topics taxonomy
  const trendingTopics = [
    { name: "All", count: `${researchList.length} Papers`, icon: Database, color: "text-primary bg-primary/10" },
    { name: "Healthcare Technology", count: "980 Papers", icon: Heart, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40" },
    { name: "Artificial Intelligence", count: "1,240 Papers", icon: Cpu, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
    { name: "Sustainable Energy", count: "875 Papers", icon: Zap, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40" },
    { name: "Smart Agriculture", count: "642 Papers", icon: Leaf, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { name: "FinTech & Payments", count: "490 Papers", icon: GraduationCap, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40" },
  ];

  // Primary Platform Pages for "Visit Other Pages"
  const platformPages = [
    {
      title: "Stuckhere Home",
      path: "/",
      description: "The world's open problem intelligence platform with real-time tickers and verified friction maps.",
      icon: Home,
      badge: "Main Hub",
      color: "bg-primary/10 text-primary border-primary/20",
    },
    {
      title: "Explore Problem Statements",
      path: "/explore",
      description: "Browse hundreds of verified, evidence-backed real-world problems across 140+ industries.",
      icon: Compass,
      badge: "140+ Verticals",
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    {
      title: "Startup Mode & Blueprints",
      path: "/explore?filter=startup_mode",
      description: "Turn verified problems into venture blueprints with TAM modeling, competitor gaps, and MVP specs.",
      icon: Lightbulb,
      badge: "Venture Builder",
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    {
      title: "Submit a Problem Dossier",
      path: "/submit",
      description: "Submit an empirical industry problem with telemetry data, research papers, and market sizing.",
      icon: ShieldCheck,
      badge: "Open Ingestion",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    {
      title: "Problem Categories & Industries",
      path: "/industries",
      description: "Explore problems categorized across Healthcare, AI, FinTech, Logistics, Energy, and more.",
      icon: Building2,
      badge: "Taxonomy",
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    },
    {
      title: "Community & Solvers",
      path: "/community",
      description: "Join founders, researchers, and engineers building solutions for high-impact global friction points.",
      icon: Users,
      badge: "Discussions",
      color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    },
  ];

  // Filtering Logic
  const filtered = useMemo(() => {
    return researchList.filter((item) => {
      // Search match
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        (item.summary && item.summary.toLowerCase().includes(query)) ||
        (item.author && item.author.toLowerCase().includes(query)) ||
        (item.source && item.source.toLowerCase().includes(query)) ||
        (item.topic && item.topic.toLowerCase().includes(query)) ||
        (item.doi && item.doi.toLowerCase().includes(query));

      // Topic match
      const matchesTopic =
        selectedTopic === "All" ||
        item.topic?.toLowerCase().includes(selectedTopic.toLowerCase()) ||
        item.title.toLowerCase().includes(selectedTopic.toLowerCase());

      // Type match
      const matchesType = selectedType === "all" || item.type === selectedType;

      // Status match
      const itemStatus = readingState[item.id]?.status || "unread";
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "reading" && itemStatus === "reading") ||
        (statusFilter === "completed" && itemStatus === "completed") ||
        (statusFilter === "unread" && itemStatus === "unread");

      return matchesSearch && matchesTopic && matchesType && matchesStatus;
    });
  }, [researchList, search, selectedTopic, selectedType, statusFilter, readingState]);

  // Aggregate stats
  const totalActiveReaders = useMemo(() => {
    return researchList.reduce((acc, curr) => acc + (curr.activeReaders || 18), 0);
  }, [researchList]);

  const currentlyReadingCount = useMemo(() => {
    return Object.values(readingState).filter((s) => s.status === "reading").length;
  }, [readingState]);

  const completedReadingCount = useMemo(() => {
    return Object.values(readingState).filter((s) => s.status === "completed").length;
  }, [readingState]);

  return (
    <div className="flex flex-col w-full min-h-screen font-['Poppins',sans-serif] text-on-surface bg-surface selection:bg-primary/20 selection:text-primary">
      {/* SEO: Research & Datasets CollectionPage */}
      <SEOHead
        title="Research & Open Datasets — Empirical Evidence for Problems"
        description="Explore peer-reviewed research papers, clinical reports, and empirical datasets backing verified problems across AI, healthcare, clean energy, and agriculture."
        canonicalUrl="https://stuckhere.davns.com/research"
        ogType="website"
        keywords={[
          "research papers",
          "open datasets",
          "empirical evidence",
          "academic problem validation",
          "clinical benchmarks",
          "scientific datasets",
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Research & Open Datasets",
          "description": "Peer-reviewed research papers, clinical reports, and empirical datasets backing verified real-world problems.",
          "url": "https://stuckhere.davns.com/research",
          "numberOfItems": researchList.length,
          "publisher": {
            "@type": "Organization",
            "name": "Stuckhere",
            "url": "https://stuckhere.davns.com/",
          },
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-gray-900 text-white px-4 py-3 shadow-xl border border-gray-800 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Top Hero Header Section ───────────────────────────────────────── */}
      <div className="w-full bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-8 pb-8 sm:pt-12 sm:pb-10 border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-4 sm:space-y-6">
          {/* Top Navigation & Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-on-surface font-bold">Research & Open Datasets</span>
            </div>

            {/* Quick Action Return to Home & Explore */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/50 bg-surface text-xs font-bold text-on-surface hover:text-primary hover:border-primary/50 transition-all shadow-2xs"
              >
                <Home className="w-3.5 h-3.5 text-primary" />
                <span>Return to Home</span>
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-2xs transition-all"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Explore Problems</span>
              </Link>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Empirical Problem Evidence & Open Datasets</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
                Empirical Research & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
                  Open Telemetry Datasets
                </span>
              </h1>
              <p className="text-on-surface-variant text-xs sm:text-sm md:text-base font-normal leading-relaxed">
                Explore peer-reviewed scientific literature, clinical trials, and calibrated sensor datasets that empirically ground verified real-world problems. Read papers directly, track your reading progress, or jump to linked venture blueprints.
              </p>
            </div>

            {/* Live Reading Metrics Bar */}
            <div className="flex flex-wrap lg:flex-col gap-2.5 sm:gap-3 bg-surface-container-low border border-outline-variant/30 p-3.5 sm:p-4 rounded-2xl w-full lg:w-72 shrink-0 shadow-xs">
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  Live Readers Now:
                </span>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {totalActiveReaders} active
                </span>
              </div>
              <div className="flex items-center justify-between w-full border-t border-outline-variant/20 pt-2">
                <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  Currently Reading:
                </span>
                <span className="text-xs font-bold text-on-surface">
                  {currentlyReadingCount} papers
                </span>
              </div>
              <div className="flex items-center justify-between w-full border-t border-outline-variant/20 pt-2">
                <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  Completed Reads:
                </span>
                <span className="text-xs font-bold text-on-surface">
                  {completedReadingCount} papers
                </span>
              </div>
            </div>
          </div>

          {/* Quick Hub Navigation Pills ("Visit Other Pages") */}
          <div className="pt-2 border-t border-outline-variant/20 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-on-surface-variant font-bold text-[11px] uppercase tracking-wider mr-1 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-primary" />
              Visit Platform Hubs:
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface border border-outline-variant/40 hover:border-primary text-on-surface font-semibold hover:text-primary transition-all"
            >
              <Home className="w-3 h-3 text-primary" />
              Home Page
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface border border-outline-variant/40 hover:border-primary text-on-surface font-semibold hover:text-primary transition-all"
            >
              Explore Problems
            </Link>
            <Link
              to="/explore?filter=startup_mode"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface border border-outline-variant/40 hover:border-primary text-on-surface font-semibold hover:text-primary transition-all"
            >
              Startup Mode
            </Link>
            <Link
              to="/submit"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface border border-outline-variant/40 hover:border-primary text-on-surface font-semibold hover:text-primary transition-all"
            >
              Submit Problem
            </Link>
            <Link
              to="/industries"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface border border-outline-variant/40 hover:border-primary text-on-surface font-semibold hover:text-primary transition-all"
            >
              Industries
            </Link>
            <Link
              to="/community"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface border border-outline-variant/40 hover:border-primary text-on-surface font-semibold hover:text-primary transition-all"
            >
              Community
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface border border-outline-variant/40 hover:border-primary text-on-surface font-semibold hover:text-primary transition-all"
            >
              Solutions
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 w-full">
        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/30">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/70" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search research papers, empirical authors, DOI, topics, datasets..."
              className="w-full rounded-xl border border-outline-variant/50 bg-surface py-2.5 pl-10 pr-4 text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Formats" },
              { id: "paper", label: "Papers" },
              { id: "report", label: "Reports" },
              { id: "dataset", label: "Datasets" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedType === t.id
                    ? "bg-primary text-white shadow-2xs"
                    : "bg-surface border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Reading Status Filter */}
          <div className="flex items-center gap-1.5 border-t md:border-t-0 md:border-l border-outline-variant/30 pt-2 md:pt-0 md:pl-3">
            {[
              { id: "all", label: "All Status" },
              { id: "reading", label: "📖 Currently Reading" },
              { id: "completed", label: "✓ Read" },
              { id: "unread", label: "Unread" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setStatusFilter(s.id as any)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === s.id
                    ? "bg-on-surface text-surface"
                    : "text-on-surface-variant hover:text-on-surface bg-surface-container-high/60"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Topics Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {trendingTopics.map((topic, i) => {
            const Icon = topic.icon;
            const isSelected = selectedTopic === topic.name;
            return (
              <button
                key={i}
                onClick={() => setSelectedTopic(topic.name)}
                className={`flex items-center gap-2.5 rounded-2xl border p-3 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary/20"
                    : "border-outline-variant/30 bg-surface hover:border-outline-variant hover:bg-surface-container-lowest"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${topic.color} shrink-0`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-on-surface truncate">{topic.name}</h3>
                  <span className="text-[10px] text-on-surface-variant font-medium">
                    {topic.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Research Papers List with "Being Read" status & Interactive Reader */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
            <span>
              Showing <strong className="text-on-surface">{filtered.length}</strong> empirical research documents
            </span>
            {selectedTopic !== "All" && (
              <button
                onClick={() => setSelectedTopic("All")}
                className="text-primary hover:underline font-bold"
              >
                Reset topic filter
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl space-y-3">
              <BookOpen className="w-10 h-10 text-on-surface-variant/40 mx-auto" />
              <h3 className="text-sm font-bold text-on-surface">No research documents match your criteria</h3>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                Try searching for different keywords, resetting the topic filter, or exploring our verified problem registry.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedTopic("All");
                  setSelectedType("all");
                  setStatusFilter("all");
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-hover transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filtered.map((item) => {
              const currentStatus = readingState[item.id]?.status || "unread";
              const currentProgress = readingState[item.id]?.progress || 0;
              const isBookmarked = bookmarkedIds.includes(item.id);
              const activeCount = item.activeReaders || 18;

              return (
                <div
                  key={item.id}
                  onClick={() => startReading(item)}
                  className={`group relative flex flex-col justify-between gap-5 rounded-3xl border bg-surface p-5 sm:p-6 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
                    currentStatus === "reading"
                      ? "border-primary/50 bg-gradient-to-r from-primary/5 via-surface to-surface ring-1 ring-primary/20"
                      : "border-outline-variant/30 hover:border-outline-variant"
                  }`}
                >
                  {/* Visual Reading Progress Bar on Top Edge */}
                  {currentProgress > 0 && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-surface-container-highest overflow-hidden rounded-t-3xl">
                      <div
                        className={`h-full transition-all duration-500 ${
                          currentStatus === "completed" ? "bg-emerald-500" : "bg-primary"
                        }`}
                        style={{ width: `${currentProgress}%` }}
                      />
                    </div>
                  )}

                  <div className="space-y-3 flex-1">
                    {/* Status & Live Indicators Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Type Badge */}
                        <span className="rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10">
                          {item.type.toUpperCase()}
                        </span>

                        {/* Live Reading Now Badge */}
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span>{activeCount} researchers reading now</span>
                        </span>

                        {/* Reading Session Status */}
                        {currentStatus === "reading" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300">
                            <BookOpen className="w-3 h-3 text-blue-600 animate-pulse" />
                            <span>Currently Reading ({currentProgress}%)</span>
                          </span>
                        )}

                        {currentStatus === "completed" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Read & Verified</span>
                          </span>
                        )}
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => toggleBookmark(item.id, e)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isBookmarked
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                            : "border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                        }`}
                        title={isBookmarked ? "Bookmarked in library" : "Save to library"}
                      >
                        <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Metadata line: Source, Year, Read Time, Citations */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
                      <span className="font-semibold text-on-surface">{item.source}</span>
                      <span>•</span>
                      <span>{item.year}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-on-surface-variant/70" />
                        {item.readTime || "12 min read"}
                      </span>
                      {item.citationsCount && (
                        <>
                          <span>•</span>
                          <span className="text-primary font-semibold">
                            {item.citationsCount} citations
                          </span>
                        </>
                      )}
                    </div>

                    {/* Document Title */}
                    <h2 className="text-base sm:text-lg font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Author & DOI */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-on-surface-variant">
                      <span>
                        Author: <strong className="text-on-surface">{item.author}</strong>
                      </span>
                      {item.doi && (
                        <span className="font-mono text-[10px] text-on-surface-variant/70">
                          DOI: {item.doi}
                        </span>
                      )}
                    </div>

                    {/* Related Problem Dossiers Pills (linking directly to /problem/:id) */}
                    {item.relatedProblemIds && item.relatedProblemIds.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline-variant/20">
                        <span className="text-[11px] font-bold text-on-surface-variant flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Linked Problem Dossier:
                        </span>
                        {item.relatedProblemIds.map((pid) => (
                          <Link
                            key={pid}
                            to={`/problem/${pid}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                          >
                            <span>#{pid} — View Problem Dossier</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right/Bottom Action Buttons */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 pt-3 sm:pt-0 sm:border-l sm:border-outline-variant/30 sm:pl-5 shrink-0 justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startReading(item);
                      }}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-primary-hover hover:shadow-xs transition-all cursor-pointer"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>
                        {currentStatus === "reading"
                          ? "Continue Reading"
                          : currentStatus === "completed"
                          ? "Re-Read Paper"
                          : "Start Reading"}
                      </span>
                    </button>

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-outline-variant/40 bg-surface px-3 py-2.5 text-xs font-semibold text-on-surface hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
                        title="Open external publisher link"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── "VISIT OTHER PAGES" HUB SECTION ───────────────────────────────── */}
        <div className="pt-8 border-t border-outline-variant/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-1">
                <Compass className="w-3 h-3" />
                <span>Stuckhere Platform Ecosystem</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface">
                Visit Other Platform Hubs
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Continue your problem-intelligence journey across our primary hubs and venture workspaces.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high border border-outline-variant/50 text-xs font-bold text-on-surface hover:text-primary transition-all self-start sm:self-auto"
            >
              <Home className="w-3.5 h-3.5 text-primary" />
              <span>Back to Home Page</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformPages.map((page, idx) => {
              const Icon = page.icon;
              return (
                <Link
                  key={idx}
                  to={page.path}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl border border-outline-variant/30 bg-surface hover:border-primary/50 hover:bg-surface-container-lowest transition-all duration-200 shadow-2xs hover:shadow-sm"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border ${page.color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant uppercase tracking-wider">
                        {page.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{page.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                    </h3>

                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {page.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/20 mt-3 text-[11px] font-bold text-primary flex items-center gap-1">
                    <span>Visit {page.title}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── IN-APP RESEARCH READER STUDIO (MODAL) ───────────────────────────── */}
      {activeReadingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="relative flex flex-col w-full max-w-4xl h-[92vh] rounded-3xl bg-surface border border-outline-variant/40 shadow-2xl overflow-hidden">
            {/* Top Reader Sticky Header Bar */}
            <div className="w-full bg-surface-container-low border-b border-outline-variant/30 px-5 py-3.5 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-on-surface">
                    <span className="text-primary uppercase tracking-wider">Research Reader Studio</span>
                    <span>•</span>
                    <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3" />
                      Session: {Math.floor(readingSeconds / 60)}m {readingSeconds % 60}s
                    </span>
                    <span>•</span>
                    <span className="text-on-surface-variant">Progress: {scrollProgress}%</span>
                  </div>
                  <h3 className="text-xs font-bold text-on-surface truncate max-w-md">
                    {activeReadingDoc.title}
                  </h3>
                </div>
              </div>

              {/* Reader Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => markAsCompleted(activeReadingDoc.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all cursor-pointer shadow-2xs"
                  title="Mark this research as fully read and verified"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mark as Read</span>
                </button>

                <button
                  onClick={() => copyCitation(activeReadingDoc)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-outline-variant/40 bg-surface text-xs font-semibold text-on-surface hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
                  title="Copy APA formatted citation"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Citation</span>
                </button>

                <button
                  onClick={() => toggleBookmark(activeReadingDoc.id)}
                  className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                    bookmarkedIds.includes(activeReadingDoc.id)
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                      : "border-outline-variant/40 text-on-surface-variant hover:text-on-surface bg-surface"
                  }`}
                  title="Bookmark for reference"
                >
                  <Bookmark
                    className="w-4 h-4"
                    fill={bookmarkedIds.includes(activeReadingDoc.id) ? "currentColor" : "none"}
                  />
                </button>

                <button
                  onClick={() => setActiveReadingDoc(null)}
                  className="p-1.5 rounded-xl border border-outline-variant/40 bg-surface hover:bg-surface-container-high text-on-surface transition-all cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reading Scroll Progress Bar */}
            <div className="w-full h-1 bg-surface-container-highest shrink-0">
              <div
                className="h-full bg-primary transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Scrollable Reader Body */}
            <div
              ref={readerContentRef}
              onScroll={handleReaderScroll}
              className="flex-1 overflow-y-auto px-6 py-6 space-y-6 sm:px-10 sm:py-8 font-['Poppins',sans-serif] text-on-surface"
            >
              {/* Paper Meta Headers */}
              <div className="space-y-3 pb-6 border-b border-outline-variant/20">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider bg-primary/10 text-primary">
                    {activeReadingDoc.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {activeReadingDoc.source} • {activeReadingDoc.year}
                  </span>
                  {activeReadingDoc.doi && (
                    <span className="font-mono text-xs text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                      DOI: {activeReadingDoc.doi}
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface leading-snug">
                  {activeReadingDoc.title}
                </h1>

                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Investigator: <strong className="text-on-surface">{activeReadingDoc.author}</strong>
                </p>
              </div>

              {/* Executive Abstract */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Executive Abstract
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20">
                  {activeReadingDoc.abstract || activeReadingDoc.summary}
                </p>
              </div>

              {/* Empirical Findings & Statistical Proof */}
              {activeReadingDoc.keyFindings && activeReadingDoc.keyFindings.length > 0 && (
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Key Empirical Findings
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeReadingDoc.keyFindings.map((finding, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl border border-outline-variant/30 bg-surface"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs text-on-surface font-medium leading-relaxed">
                          {finding}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Methodology & Rigor */}
              {activeReadingDoc.methodology && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Trial Methodology & Telemetry Parameters
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20">
                    {activeReadingDoc.methodology}
                  </p>
                </div>
              )}

              {/* Linked Real-World Problem Dossier Banner */}
              {activeReadingDoc.relatedProblemIds && activeReadingDoc.relatedProblemIds.length > 0 && (
                <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Direct Problem Statement Grounding
                    </span>
                    <span className="text-[11px] font-bold text-on-surface-variant">
                      Stuckhere Verified Problem Registry
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant">
                    This scientific research is directly linked to an active, validated problem statement in our open problem intelligence database:
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {activeReadingDoc.relatedProblemIds.map((pid) => (
                      <Link
                        key={pid}
                        to={`/problem/${pid}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs transition-all"
                      >
                        <span>View Verified Problem Dossier (#{pid})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ))}
                    <Link
                      to="/explore?filter=startup_mode"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-outline-variant/40 text-on-surface text-xs font-bold hover:border-primary transition-all"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>Explore Venture Blueprint</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Reader Footer: Return to Home or Explore other pages */}
              <div className="pt-6 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Link
                    to="/"
                    onClick={() => setActiveReadingDoc(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface text-on-surface font-bold hover:text-primary transition-all"
                  >
                    <Home className="w-3.5 h-3.5 text-primary" />
                    <span>Return to Home</span>
                  </Link>
                  <Link
                    to="/explore"
                    onClick={() => setActiveReadingDoc(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface text-on-surface font-bold hover:text-primary transition-all"
                  >
                    <Compass className="w-3.5 h-3.5 text-primary" />
                    <span>Explore Problems</span>
                  </Link>
                </div>

                {activeReadingDoc.url && (
                  <a
                    href={activeReadingDoc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary font-bold hover:underline"
                  >
                    <span>View on External Publisher Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
