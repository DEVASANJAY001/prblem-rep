import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  LEARNING_MODULES,
  LEARNING_ARTICLES,
  LearningArticle,
} from "@/data/learningCurricula";
import { LearningDiagram } from "@/components/learning/LearningDiagrams";
import {
  BookOpen,
  Search,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Sparkles,
  Share2,
  Bookmark,
  Check,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  AlertCircle,
  Lightbulb,
  ExternalLink,
  Code2,
  Menu,
  X,
  Compass,
  BarChart3,
  Cpu,
} from "lucide-react";

export const Learn: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // Active article selection (defaults to first article if no slug provided)
  const currentSlug = slug || "the-problem-first-mindset";
  const article: LearningArticle | undefined = LEARNING_ARTICLES[currentSlug];

  // Mobile sidebar drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Search filter query in sidebar
  const [searchQuery, setSearchQuery] = useState("");

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Copy link feedback
  const [copied, setCopied] = useState(false);

  // Reset quiz state when switching articles
  React.useEffect(() => {
    setSelectedOption(null);
    setQuizSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSlug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find previous and next articles
  const allArticleSlugs = useMemo(() => {
    return LEARNING_MODULES.flatMap((mod) => mod.articles);
  }, []);

  const currentIndex = allArticleSlugs.indexOf(currentSlug);
  const prevSlug = currentIndex > 0 ? allArticleSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allArticleSlugs.length - 1 ? allArticleSlugs[currentIndex + 1] : null;

  const prevArticle = prevSlug ? LEARNING_ARTICLES[prevSlug] : null;
  const nextArticle = nextSlug ? LEARNING_ARTICLES[nextSlug] : null;

  // Filter modules/articles by search query
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return LEARNING_MODULES;
    const q = searchQuery.toLowerCase();

    return LEARNING_MODULES.map((mod) => ({
      ...mod,
      articles: mod.articles.filter((artSlug) => {
        const art = LEARNING_ARTICLES[artSlug];
        return (
          art.title.toLowerCase().includes(q) ||
          art.subtitle.toLowerCase().includes(q) ||
          art.relatedCategory.toLowerCase().includes(q)
        );
      }),
    })).filter((mod) => mod.articles.length > 0);
  }, [searchQuery]);

  // Schema.org JSON-LD
  const jsonLdData = useMemo(() => {
    if (!article) return [];
    return [
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: article.title,
        description: article.subtitle,
        proficiencyLevel: article.difficulty,
        timeRequired: article.readTime,
        dateModified: "2026-11-21",
        author: {
          "@type": "Organization",
          name: "Stuckhere Academy",
        },
        publisher: {
          "@type": "Organization",
          name: "Stuckhere",
          url: "https://stuckhere.davns.com",
        },
        mainEntityOfPage: `https://stuckhere.davns.com/learn/${article.slug}`,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://stuckhere.davns.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Academy",
            item: "https://stuckhere.davns.com/learn",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.moduleTitle,
            item: `https://stuckhere.davns.com/learn#${article.moduleId}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: article.title,
            item: `https://stuckhere.davns.com/learn/${article.slug}`,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: article.quiz.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: article.quiz.explanation,
            },
          },
        ],
      },
    ];
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Lesson Not Found</h2>
          <p className="text-sm text-on-surface-variant mb-4">
            The requested tutorial article could not be located in our academy database.
          </p>
          <Link to="/learn" className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold text-sm">
            Back to Academy Index
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-surface font-body-md text-on-surface flex flex-col">
      <SEOHead
        title={`${article.title} | Stuckhere Academy`}
        description={article.subtitle}
        canonicalUrl={`https://stuckhere.davns.com/learn/${article.slug}`}
        keywords={[
          "startup tutorial",
          "problem discovery guide",
          "geeksforgeeks for startups",
          article.title.toLowerCase(),
          article.relatedCategory.toLowerCase(),
          "market sizing formula",
        ]}
        jsonLd={jsonLdData}
      />

      {/* Sub-Header Banner with GeeksforGeeks-Style Breadcrumb & Mobile Drawer Toggle */}
      <div className="w-full bg-surface-container-lowest border-b border-outline-variant/30 sticky top-16 z-30 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap py-1">
            <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-outline" />
            <Link to="/learn" className="text-on-surface-variant hover:text-primary transition-colors font-medium">
              Academy
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-outline" />
            <span className="text-on-surface-variant font-medium hidden sm:inline">
              {article.moduleTitle}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-outline hidden sm:inline" />
            <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-[320px]">
              {article.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Toggle Table of Contents"
            >
              {mobileDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>Curriculum</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-xs font-semibold text-on-surface transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Learning Workspace */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 flex-1 flex gap-8 py-6">
        {/* Left Sticky Sidebar (GeeksforGeeks / Stripe Docs style navigation) */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 sm:w-80 bg-surface-container-lowest lg:bg-transparent lg:static lg:block shrink-0 border-r lg:border-r-0 border-outline-variant/30 p-4 lg:p-0 overflow-y-auto transition-transform duration-300 ease-in-out ${
            mobileDrawerOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="lg:sticky lg:top-32 space-y-4 max-h-[calc(100vh-140px)] flex flex-col">
            {/* Search Input in Sidebar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                placeholder="Filter tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-surface-container text-xs text-on-surface placeholder:text-outline border border-outline-variant/30 focus:outline-none focus:border-primary transition-all"
              />
            </div>

            {/* Modules and Articles Tree */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1 text-xs">
              {filteredModules.map((module) => (
                <div key={module.id} className="space-y-1.5">
                  <div className="font-bold text-[11px] text-outline uppercase tracking-wider px-2 flex items-center justify-between">
                    <span>{module.title}</span>
                  </div>
                  <div className="space-y-0.5">
                    {module.articles.map((artSlug) => {
                      const item = LEARNING_ARTICLES[artSlug];
                      const isActive = item.slug === currentSlug;
                      return (
                        <Link
                          key={item.slug}
                          to={`/learn/${item.slug}`}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`flex items-start gap-2.5 px-3 py-2 rounded-xl transition-all group ${
                            isActive
                              ? "bg-primary text-on-primary font-bold shadow-xs"
                              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            isActive ? "bg-white" : "bg-outline/50 group-hover:bg-primary"
                          }`} />
                          <div className="flex-1 leading-snug">
                            <span className="block">{item.title}</span>
                            <span className={`text-[10px] ${isActive ? "text-white/80" : "text-outline"}`}>
                              {item.readTime} · {item.difficulty}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Bottom Promo Card */}
            <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 space-y-2 mt-auto">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Verify Real Problems</span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Apply these frameworks to 1,500+ verified industry bottlenecks in the catalog.
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-1"
              >
                <span>Browse Registry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Center Educational Reading Canvas */}
        <main className="flex-1 min-w-0 max-w-3xl lg:px-4 space-y-10">
          {/* Article Header */}
          <div className="space-y-4 border-b border-outline-variant/20 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold font-mono">
                {article.moduleTitle}
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                article.difficulty === "Beginner"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : article.difficulty === "Intermediate"
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
              }`}>
                {article.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-outline font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
              <span className="text-outline text-xs">·</span>
              <span className="text-xs text-outline">Updated {article.lastUpdated}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-on-surface tracking-tight leading-[1.15]">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          {/* Key Takeaways Box (GeeksforGeeks style high-yield summary) */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-primary/30 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Core Takeaways</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface leading-relaxed">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Visual Diagram */}
          <LearningDiagram type={article.diagramType} />

          {/* Article Structured Content Sections */}
          <div className="space-y-10">
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
                  {section.title}
                </h2>

                <div className="space-y-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Callout Box */}
                {section.callout && (
                  <div className={`p-4 sm:p-5 rounded-xl border my-4 space-y-1.5 ${
                    section.callout.type === "warning"
                      ? "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-400"
                      : section.callout.type === "formula"
                      ? "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300 font-mono text-xs"
                      : "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300"
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-xs">
                      {section.callout.type === "warning" ? (
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                      ) : section.callout.type === "formula" ? (
                        <Code2 className="w-4 h-4 text-purple-500" />
                      ) : (
                        <Lightbulb className="w-4 h-4 text-blue-500" />
                      )}
                      <span>{section.callout.title}</span>
                    </div>
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {section.callout.text}
                    </div>
                  </div>
                )}

                {/* Comparison Table */}
                {section.table && (
                  <div className="overflow-x-auto my-4 border border-outline-variant/30 rounded-xl shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-surface-container border-b border-outline-variant/30">
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 font-bold text-on-surface">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20 bg-surface-container-lowest">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-surface-container/40 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 text-on-surface-variant font-medium">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Code Snippet Box */}
                {section.codeSnippet && (
                  <div className="rounded-xl overflow-hidden bg-slate-950 text-slate-100 border border-slate-800 shadow-sm my-4 font-mono text-xs">
                    <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{section.codeSnippet.language.toUpperCase()}</span>
                      <span>Snippet</span>
                    </div>
                    <pre className="p-4 overflow-x-auto leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Interactive Checkpoint Quiz (GeeksforGeeks style concept reinforcement) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Concept Checkpoint</span>
              </div>
              <span className="text-[11px] font-mono text-outline">1 QUESTION</span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-on-surface">
              {article.quiz.question}
            </h3>

            <div className="space-y-2.5">
              {article.quiz.options.map((option, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === article.quiz.correctIndex;

                let buttonStyle = "bg-surface border-outline-variant/30 hover:border-primary/50 text-on-surface-variant";
                if (quizSubmitted) {
                  if (isCorrect) {
                    buttonStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold";
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = "bg-rose-500/10 border-rose-500 text-rose-800 dark:text-rose-300";
                  }
                } else if (isSelected) {
                  buttonStyle = "bg-primary/10 border-primary text-primary font-semibold";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      if (!quizSubmitted) setSelectedOption(optIdx);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${buttonStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between">
              {!quizSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={() => setQuizSubmitted(true)}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedOption(null);
                    setQuizSubmitted(false);
                  }}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Retry Question
                </button>
              )}
            </div>

            {/* Explanation card after submit */}
            {quizSubmitted && (
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 text-xs sm:text-sm space-y-1">
                <span className="font-bold text-on-surface block">
                  {selectedOption === article.quiz.correctIndex ? "🎉 Correct!" : "💡 Explanation:"}
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  {article.quiz.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Chapter Pagination (Previous / Next Buttons) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-outline-variant/20">
            {prevArticle ? (
              <Link
                to={`/learn/${prevArticle.slug}`}
                className="w-full sm:w-auto p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 transition-all flex items-center gap-3 text-left group"
              >
                <ArrowLeft className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:-translate-x-1" />
                <div>
                  <span className="text-[10px] text-outline uppercase font-bold tracking-wider block">
                    Previous Chapter
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-on-surface block truncate max-w-[220px]">
                    {prevArticle.title}
                  </span>
                </div>
              </Link>
            ) : <div />}

            {nextArticle ? (
              <Link
                to={`/learn/${nextArticle.slug}`}
                className="w-full sm:w-auto p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 transition-all flex items-center justify-end gap-3 text-right group ml-auto"
              >
                <div>
                  <span className="text-[10px] text-outline uppercase font-bold tracking-wider block">
                    Next Chapter
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-on-surface block truncate max-w-[220px]">
                    {nextArticle.title}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : <div />}
          </div>
        </main>

        {/* Right Rail (On This Page Table of Contents + Live Problem Registry Links) */}
        <aside className="hidden xl:block w-64 shrink-0 space-y-6">
          <div className="sticky top-32 space-y-6">
            {/* Table of Contents */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-outline block">
                On This Page
              </span>
              <nav className="space-y-1.5 text-xs">
                {article.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-on-surface-variant hover:text-primary transition-colors py-0.5 truncate"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Related Real Problem CTA */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/5 border border-primary/20 space-y-2.5">
              <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>Related Category</span>
              </div>
              <p className="text-xs font-extrabold text-on-surface">
                {article.relatedCategory}
              </p>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Explore real problem statements and customer friction in this industry.
              </p>
              <Link
                to={`/explore?q=${encodeURIComponent(article.relatedCategory)}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                <span>Find Related Problems</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
