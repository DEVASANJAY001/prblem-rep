import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  ACADEMY_COURSES,
  COURSE_1_CHAPTERS,
  COURSE_2_CHAPTERS,
  COURSE_3_CHAPTERS,
  COURSE_4_CHAPTERS,
  COURSE_5_CHAPTERS,
  AcademyChapter,
} from "@/data/academyData";
import { Menu, X, ChevronRight, CheckCircle2 } from "lucide-react";

export const ChapterReader: React.FC = () => {
  const { courseSlug, chapterSlug, slug, chapterNum } = useParams<{
    courseSlug?: string;
    chapterSlug?: string;
    slug?: string;
    chapterNum?: string;
  }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active course
  const isCourse5 =
    location.pathname.includes("ai-for-builders") ||
    location.pathname.includes("/ai") ||
    courseSlug?.includes("ai-for-builders") ||
    courseSlug?.includes("ai") ||
    courseSlug === "course-5";

  const isCourse4 =
    !isCourse5 &&
    (location.pathname.includes("solution-design") ||
      location.pathname.includes("mvp") ||
      courseSlug?.includes("solution-design") ||
      courseSlug?.includes("mvp") ||
      courseSlug === "course-4");

  const isCourse3 =
    !isCourse5 &&
    !isCourse4 &&
    (location.pathname.includes("full-stack") ||
      location.pathname.includes("cloud") ||
      courseSlug?.includes("full-stack") ||
      courseSlug?.includes("cloud") ||
      courseSlug === "course-3");

  const isCourse2 =
    !isCourse5 &&
    !isCourse4 &&
    !isCourse3 &&
    (location.pathname.includes("market-sizing") ||
      courseSlug?.includes("market-sizing") ||
      courseSlug === "course-2");

  const activeCourse = isCourse5
    ? ACADEMY_COURSES[4]
    : isCourse4
    ? ACADEMY_COURSES[3]
    : isCourse3
    ? ACADEMY_COURSES[2]
    : isCourse2
    ? ACADEMY_COURSES[1]
    : ACADEMY_COURSES[0];
  const chapters: AcademyChapter[] = isCourse5
    ? COURSE_5_CHAPTERS
    : isCourse4
    ? COURSE_4_CHAPTERS
    : isCourse3
    ? COURSE_3_CHAPTERS
    : isCourse2
    ? COURSE_2_CHAPTERS
    : COURSE_1_CHAPTERS;

  const activeSlug = chapterSlug || slug;

  // Find active chapter by slug or by index
  const activeChapter: AcademyChapter = useMemo(() => {
    if (activeSlug) {
      const found = chapters.find((c) => c.slug === activeSlug);
      if (found) return found;
      const num = parseInt(activeSlug, 10);
      if (!isNaN(num) && chapters[num]) return chapters[num];
    }
    if (chapterNum) {
      const num = parseInt(chapterNum, 10);
      if (!isNaN(num) && chapters[num]) return chapters[num];
    }
    // Default to Chapter 1 ("Foundations: What Is a Problem?", "Why Sizing Matters", or "Cloud Web Architecture")
    return chapters[1] || chapters[0];
  }, [activeSlug, chapterNum, chapters]);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number>(-1);

  // Mobile drawer states
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [sectionsDrawerOpen, setSectionsDrawerOpen] = useState(false);

  // Completion state in localStorage per course
  const storageKey = isCourse3
    ? "stuckhere_academy_done_c3"
    : isCourse2
    ? "stuckhere_academy_done_c2"
    : "stuckhere_academy_done_c1";
  const [done, setDone] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { 0: true };
  });

  // Reset quiz, drawers and scroll on chapter change
  useEffect(() => {
    setSelectedOption(-1);
    setMobileDrawerOpen(false);
    setSectionsDrawerOpen(false);
    const mainScroll = document.getElementById("chapter-main-scroll");
    if (mainScroll) {
      mainScroll.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeChapter.num, isCourse2, isCourse3]);

  const toggleDone = () => {
    const updated = { ...done, [activeChapter.num]: !done[activeChapter.num] };
    setDone(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const isCurrentDone = Boolean(done[activeChapter.num]);
  const prevChapter = activeChapter.num > 0 ? chapters[activeChapter.num - 1] : null;
  const nextChapter =
    activeChapter.num < chapters.length - 1 ? chapters[activeChapter.num + 1] : null;

  return (
    <div className="font-source-sans w-full h-full bg-white text-[#1f1f1f] text-base antialiased flex flex-col lg:flex-row overflow-hidden relative">
      <SEOHead
        title={`Chapter ${activeChapter.num}: ${activeChapter.title} — Stuckhere Academy`}
        description={activeChapter.lead}
        canonicalUrl={`https://stuckhere.davns.com/learn/${activeCourse.slug}/${activeChapter.slug}`}
      />

      {/* ── Mobile Top Sticky Bar (Shown only on < lg screens) ──────── */}
      <div className="lg:hidden shrink-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-[#dae1ed] px-3.5 py-2.5 flex items-center justify-between z-30 shadow-2xs">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          aria-label="Open course chapters drawer"
          className="flex items-center gap-2 max-w-[65%] text-left bg-[#f5f8ff] dark:bg-zinc-800 border border-[#dae1ed] dark:border-zinc-700 py-1.5 px-3 rounded-lg text-xs font-bold text-[#0056d2] truncate transition-colors active:scale-98"
        >
          <Menu className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            Ch. {activeChapter.num}: {activeChapter.shortTitle}
          </span>
          <span className="text-[10px] text-[#5b606b]">▾</span>
        </button>

        <div className="flex items-center gap-1.5">
          {activeChapter.sections.length > 0 && (
            <button
              type="button"
              onClick={() => setSectionsDrawerOpen(true)}
              aria-label="Jump to section on this page"
              className="text-xs font-semibold text-[#5b606b] hover:text-[#0056d2] px-2.5 py-1.5 rounded-lg bg-[#fafbfc] dark:bg-zinc-800 border border-[#dae1ed] transition-colors"
            >
              Sections
            </button>
          )}

          {prevChapter ? (
            <Link
              to={`/learn/${activeCourse.slug}/${prevChapter.slug}`}
              aria-label="Previous chapter"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-[#dae1ed] text-[#5b606b] text-xs font-bold hover:bg-[#f0f4fa]"
            >
              ←
            </Link>
          ) : (
            <span className="w-7 h-7 flex items-center justify-center text-gray-300 text-xs">←</span>
          )}

          <span className="text-[11px] font-semibold text-[#5b606b] px-0.5">
            {activeChapter.num}/{chapters.length - 1}
          </span>

          {nextChapter ? (
            <Link
              to={`/learn/${activeCourse.slug}/${nextChapter.slug}`}
              aria-label="Next chapter"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-800 border border-[#dae1ed] text-[#5b606b] text-xs font-bold hover:bg-[#f0f4fa]"
            >
              →
            </Link>
          ) : (
            <span className="w-7 h-7 flex items-center justify-center text-gray-300 text-xs">→</span>
          )}
        </div>
      </div>

      {/* ── Mobile Slide-Over Chapters Drawer ──────── */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-[85%] max-w-[340px] bg-white dark:bg-zinc-900 h-full flex flex-col shadow-2xl z-10 animate-fade-in">
            <div className="py-3 px-4 border-b border-[#dae1ed] flex items-center justify-between bg-[#fafbfc] dark:bg-zinc-950 shrink-0">
              <div>
                <div className="text-[11px] font-bold tracking-[1.2px] text-[#0056d2] uppercase">
                  COURSE {activeCourse.n} CONTENTS
                </div>
                <div className="text-xs text-[#5b606b] font-medium truncate mt-0.5">
                  {activeCourse.title} · {chapters.length} chapters
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close chapters menu"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5b606b] hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2.5 divide-y divide-gray-100">
              {chapters.map((ch) => {
                const isCur = ch.num === activeChapter.num;
                return (
                  <Link
                    key={ch.num}
                    to={`/learn/${activeCourse.slug}/${ch.slug}`}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-lg no-underline text-sm transition-colors ${
                      isCur
                        ? "bg-[#e8f0fe] font-bold text-[#00419e]"
                        : "text-[#1f1f1f] hover:bg-[#f0f4fa]"
                    }`}
                  >
                    <span className="w-5 text-center text-xs font-bold text-[#5b606b]">
                      {ch.num}
                    </span>
                    <span className="truncate flex-1">{ch.title}</span>
                    {done[ch.num] && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="p-3 border-t border-[#dae1ed] bg-[#fafbfc] shrink-0">
              <Link
                to={`/learn/${activeCourse.slug}`}
                onClick={() => setMobileDrawerOpen(false)}
                className="text-xs font-semibold text-[#0056d2] hover:underline flex items-center justify-center gap-1"
              >
                View full course syllabus →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Sections Bottom Sheet ──────── */}
      {sectionsDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setSectionsDrawerOpen(false)}
          />
          <div className="relative bg-white dark:bg-zinc-900 rounded-t-2xl max-h-[70vh] flex flex-col shadow-2xl z-10 p-4 border-t border-[#dae1ed]">
            <div className="flex items-center justify-between pb-3 border-b border-[#dae1ed]">
              <div className="text-xs font-bold text-[#0056d2] uppercase tracking-wider">
                On this page · Chapter {activeChapter.num}
              </div>
              <button
                type="button"
                onClick={() => setSectionsDrawerOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#5b606b]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2 divide-y divide-gray-100">
              {activeChapter.sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setSectionsDrawerOpen(false)}
                  className="py-2.5 px-2 block text-sm text-[#1f1f1f] hover:text-[#0056d2] no-underline truncate"
                >
                  <span className="font-semibold text-[#5b606b] mr-1.5">{sec.sectionNumber}</span>
                  {sec.title}
                </a>
              ))}
              <a
                href="#quiz"
                onClick={() => setSectionsDrawerOpen(false)}
                className="py-2.5 px-2 block text-sm text-[#0056d2] font-semibold no-underline"
              >
                Checkpoint Quiz →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Left Sidebar: Desktop Independent Vertical Scroll Column ──────── */}
      <nav
        aria-label="Course chapters"
        className="hidden lg:flex w-[280px] xl:w-[300px] shrink-0 h-full border-r border-[#dae1ed] bg-[#fafbfc] dark:bg-zinc-950 flex-col overflow-hidden"
      >
        <div className="py-3 px-4 border-b border-[#dae1ed] bg-white dark:bg-zinc-900 shrink-0 flex items-center justify-between">
          <div>
            <div className="text-[12px] font-bold tracking-[1.2px] text-[#5b606b] uppercase">
              COURSE {activeCourse.n} CONTENTS
            </div>
            <div className="text-xs text-[#5b606b] mt-0.5 truncate">
              {activeCourse.title} · {chapters.length} chapters
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-2.5 scrollbar-thin">
          <div className="flex flex-col gap-1">
            {chapters.map((ch) => {
              const isCur = ch.num === activeChapter.num;

              return (
                <div key={ch.num}>
                  <Link
                    to={`/learn/${activeCourse.slug}/${ch.slug}`}
                    className={`flex gap-2.5 items-center py-2 px-2.5 rounded-lg no-underline text-[15px] min-h-[40px] box-border transition-colors ${
                      isCur
                        ? "bg-[#e8f0fe] font-bold text-[#00419e] shadow-xs"
                        : "text-[#1f1f1f] hover:bg-[#f0f4fa]"
                    }`}
                  >
                    {/* Clean sequential numbering only - no checkmarks */}
                    <span className="w-5 flex-[0_0_20px] text-xs font-bold text-[#5b606b]">
                      {ch.num}
                    </span>
                    <span className="truncate">{ch.title}</span>
                  </Link>

                  {/* Subsection links under active chapter */}
                  {isCur && ch.sections.length > 0 && (
                    <div className="my-1 mr-1 mb-2 ml-7 flex flex-col text-xs border-l-2 border-[#0056d2]/30 pl-2.5 gap-0.5">
                      {ch.sections.map((sec) => (
                        <a
                          key={sec.id}
                          href={`#${sec.id}`}
                          className="py-1 px-1.5 no-underline text-[#3d424d] hover:text-[#0056d2] transition-colors truncate rounded hover:bg-black/5"
                        >
                          {sec.sectionNumber} {sec.title}
                        </a>
                      ))}
                      <a
                        href="#quiz"
                        className="py-1 px-1.5 no-underline text-[#0056d2] font-semibold hover:underline"
                      >
                        Checkpoint Quiz
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Center Column: Reading Canvas (Independent Scrolling Container) ──────── */}
      <main
        id="chapter-main-scroll"
        className="flex-1 min-w-0 h-full overflow-y-auto overscroll-contain bg-white dark:bg-zinc-900 scroll-smooth"
      >
        <div className="max-w-[760px] mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-8 pb-24">
          {/* Properly Aligned Breadcrumb Container */}
          <div className="mb-6 pb-4 border-b border-[#dae1ed]">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#5b606b]">
              <Link
                to="/learn"
                className="text-[#0056d2] hover:text-[#00419e] font-semibold no-underline flex items-center gap-1 transition-colors"
              >
                ← Academy Home
              </Link>
              <span className="text-[#dae1ed]">/</span>
              <Link
                to={`/learn/${activeCourse.slug}`}
                className="text-[#5b606b] hover:text-[#0056d2] no-underline transition-colors truncate max-w-[200px] sm:max-w-none"
              >
                {activeCourse.title}
              </Link>
              <span className="text-[#dae1ed]">/</span>
              <span className="text-[#1f1f1f] dark:text-zinc-100 font-semibold truncate">
                Chapter {activeChapter.num}: {activeChapter.shortTitle}
              </span>
            </nav>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-[#5b606b] uppercase tracking-wider">
            Course {activeCourse.n} · Chapter {activeChapter.num}
          </div>

          <h1 className="m-0 mt-2 text-2xl sm:text-3xl md:text-[40px] leading-[1.2] tracking-[-0.8px] font-bold text-[#1f1f1f]">
            {activeChapter.title}
          </h1>

          <p className="text-base sm:text-lg md:text-[20px] leading-[1.55] text-[#3d424d] mt-3 sm:mt-4 mb-0">
            {activeChapter.lead}
          </p>

          {/* In This Chapter Card */}
          <div className="mt-5 bg-[#f5f8ff] border border-[#dae1ed] rounded-lg p-4 sm:p-5.5">
            <div className="font-bold text-sm sm:text-base text-[#1f1f1f]">In this chapter</div>
            <div className="text-sm sm:text-base leading-[1.6] text-[#3d424d] mt-1.5">
              {activeChapter.inThisChapter || activeChapter.subs}
            </div>
          </div>

          {/* Chapter Subsections */}
          {activeChapter.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="mt-10 sm:mt-11">
              <h2 className="m-0 text-xl sm:text-2xl md:text-[28px] font-bold tracking-[-0.4px] text-[#1f1f1f]">
                {sec.sectionNumber} {sec.title}
              </h2>

              {sec.content.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-base sm:text-[18px] leading-[1.7] mt-3 text-[#1f1f1f]"
                >
                  {para}
                </p>
              ))}

              {/* Diagram or Infographic Image */}
              {sec.image && (
                <figure className="my-6 border border-[#dae1ed] rounded-xl overflow-hidden bg-[#fafbfc] dark:bg-zinc-950 p-2 sm:p-5 text-center shadow-xs">
                  {sec.image.svg ? (
                    <div
                      className="w-full flex justify-center py-2 overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: sec.image.svg }}
                    />
                  ) : sec.image.url ? (
                    <div className="w-full flex justify-center overflow-x-auto py-1">
                      <img
                        src={sec.image.url}
                        alt={sec.image.alt}
                        className="w-full max-w-full max-h-[380px] object-contain rounded-lg shadow-xs mx-auto"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  {sec.image.caption && (
                    <figcaption className="mt-2.5 text-xs sm:text-sm text-[#5b606b] font-medium italic">
                      {sec.image.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Comparison Table with Horizontal Scroll Wrap */}
              {sec.table && (
                <div className="w-full overflow-x-auto my-4 border border-[#dae1ed] rounded-lg">
                  <table className="w-full border-collapse text-sm sm:text-base leading-[1.5] min-w-[480px]">
                    {sec.table.headers && (
                      <thead className="bg-[#f0f4fa] border-b border-[#dae1ed]">
                        <tr>
                          {sec.table.headers.map((h, hIdx) => (
                            <th
                              key={hIdx}
                              className="py-2.5 px-3.5 text-left font-bold text-xs sm:text-sm text-[#1f1f1f] uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {sec.table.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={`border-t border-[#dae1ed] ${
                            row.highlight ? "bg-[#f5f8ff]" : "bg-white"
                          }`}
                        >
                          <td className="py-3 px-3.5 font-bold w-[130px] sm:w-[150px] text-[#1f1f1f]">
                            {row.label}
                          </td>
                          <td className="py-3 px-3.5 text-[#3d424d]">{row.text}</td>
                          {row.text2 && (
                            <td className="py-3 px-3.5 text-[#0056d2] font-semibold">{row.text2}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Subheading if present */}
              {sec.subheading && (
                <h3 className="m-0 mt-6 text-lg sm:text-[21px] font-bold text-[#1f1f1f]">
                  {sec.subheading}
                </h3>
              )}

              {sec.subcontent &&
                sec.subcontent.map((subp, sIdx) => (
                  <p
                    key={sIdx}
                    className="text-base sm:text-[18px] leading-[1.7] mt-3 text-[#1f1f1f]"
                  >
                    {subp}
                  </p>
                ))}

              {/* Points List if present */}
              {sec.points && (
                <div className="mt-3 border-t border-[#dae1ed]">
                  {sec.points.map((pt, ptIdx) => (
                    <div
                      key={ptIdx}
                      className="py-3 sm:py-3.5 border-b border-[#dae1ed] text-[#1f1f1f] text-sm sm:text-base leading-[1.6]"
                    >
                      <b>{pt.bold}</b> {pt.text}
                    </div>
                  ))}
                </div>
              )}

              {/* Template Callout Box if present */}
              {sec.templateBox && (
                <div className="mt-3.5 border border-[#dae1ed] rounded-lg p-4 sm:p-5.5 text-sm sm:text-[17px] leading-[1.7] bg-[#f5f8ff] text-[#1f1f1f]">
                  <b>{sec.templateBox}</b>
                </div>
              )}

              {sec.templateComparison && (
                <div className="mt-3 text-sm sm:text-[18px] leading-[1.7] text-[#1f1f1f] space-y-1">
                  <p className="m-0">
                    <b>Weak:</b> "{sec.templateComparison.weak}"
                  </p>
                  <p className="m-0">
                    <b>Stronger:</b> "{sec.templateComparison.strong}"
                  </p>
                </div>
              )}

              {/* Exercise prompt callout */}
              {sec.exercisePrompt && (
                <div className="mt-4 border-l-4 border-[#0056d2] bg-[#f5f8ff] p-3.5 sm:p-4 rounded-r-lg">
                  <div className="text-xs font-bold text-[#0056d2] uppercase tracking-wider">
                    Chapter Exercise
                  </div>
                  <div className="mt-1 text-sm sm:text-base text-[#1f1f1f] font-medium">
                    {sec.exercisePrompt}
                  </div>
                </div>
              )}

              {/* Interactive Check Yourself Questions */}
              {sec.detailsQuestions && sec.detailsQuestions.length > 0 && (
                <div className="mt-4 flex flex-col gap-2.5">
                  {sec.detailsQuestions.map((dq, dqIdx) => (
                    <details
                      key={dqIdx}
                      className="border border-[#dae1ed] rounded-lg p-3 sm:p-4 bg-white hover:border-[#0056d2]/50 transition-colors group"
                    >
                      <summary className="font-semibold text-sm sm:text-base cursor-pointer text-[#1f1f1f] group-open:text-[#0056d2] transition-colors select-none">
                        {dq.question}
                      </summary>
                      <div className="mt-3 pt-3 border-t border-[#dae1ed] text-sm sm:text-base text-[#3d424d] leading-[1.6]">
                        {dq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* ── Chapter Checkpoint Quiz ──────── */}
          {activeChapter.quiz && (
            <div id="quiz" className="mt-14 pt-8 border-t-2 border-[#1f1f1f]">
              <div className="text-xs font-bold tracking-[1.5px] uppercase text-[#5b606b]">
                CHAPTER CHECKPOINT QUIZ
              </div>

              <h3 className="m-0 mt-3 text-xl sm:text-2xl font-bold leading-[1.3] text-[#1f1f1f]">
                {activeChapter.quiz.question}
              </h3>

              <div className="flex flex-col gap-2.5 mt-5">
                {activeChapter.quiz.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  let btnBg = "bg-white border-[#dae1ed] hover:border-[#0056d2] hover:bg-[#f5f8ff]";

                  if (isSelected) {
                    btnBg = opt.isCorrect
                      ? "bg-[#e6f4ea] border-[#137333] text-[#137333]"
                      : "bg-[#fce8e6] border-[#c5221f] text-[#c5221f]";
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSelectedOption(optIdx)}
                      className={`text-left p-3.5 sm:p-4 rounded-lg border text-sm sm:text-base font-medium flex items-start gap-3 transition-colors cursor-pointer min-h-[48px] ${btnBg}`}
                    >
                      <span className="font-bold w-5 shrink-0">{opt.key}</span>
                      <span className="flex-1">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {selectedOption !== -1 && (
                <div
                  className={`mt-4 p-4 rounded-lg text-sm sm:text-base font-semibold leading-[1.5] ${
                    activeChapter.quiz.options[selectedOption].isCorrect
                      ? "bg-[#e6f4ea] text-[#137333]"
                      : "bg-[#fce8e6] text-[#c5221f]"
                  }`}
                >
                  {activeChapter.quiz.options[selectedOption].isCorrect
                    ? activeChapter.quiz.feedbackCorrect
                    : activeChapter.quiz.feedbackIncorrect}
                </div>
              )}
            </div>
          )}

          {/* ── Completion Toggle Button ──────── */}
          <div className="mt-10">
            <button
              type="button"
              onClick={toggleDone}
              className={`py-3 px-6 rounded-lg font-bold text-sm sm:text-base min-h-[44px] transition-colors cursor-pointer flex items-center gap-2 ${
                isCurrentDone
                  ? "bg-[#1f1f1f] text-white hover:bg-black"
                  : "bg-[#0056d2] text-white hover:bg-[#00419e] shadow-sm"
              }`}
            >
              {isCurrentDone ? "Finished ✓ (Undo)" : "Mark chapter finished"}
            </button>
          </div>

          {/* ── Next / Prev Chapter Navigation Footer ──────── */}
          <div className="mt-12 pt-6 border-t border-[#dae1ed] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {prevChapter ? (
              <Link
                to={`/learn/${activeCourse.slug}/${prevChapter.slug}`}
                className="py-2.5 px-3 rounded-lg border border-[#dae1ed] sm:border-0 font-semibold text-sm sm:text-base text-[#0056d2] hover:text-[#00419e] no-underline flex items-center gap-1.5"
              >
                ← Chapter {prevChapter.num}: {prevChapter.shortTitle}
              </Link>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <Link
                to={`/learn/${activeCourse.slug}/${nextChapter.slug}`}
                className="py-2.5 px-3 rounded-lg border border-[#dae1ed] sm:border-0 font-semibold text-sm sm:text-base text-[#0056d2] hover:text-[#00419e] no-underline text-left sm:text-right flex items-center justify-end gap-1.5"
              >
                Chapter {nextChapter.num}: {nextChapter.shortTitle} →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>

      {/* ── Right Sidebar: ON THIS PAGE (Independent Desktop Scroll Column) ──────── */}
      <aside className="w-[240px] shrink-0 h-full overflow-y-auto overscroll-contain border-l border-[#dae1ed] bg-white dark:bg-zinc-900 p-4 scrollbar-thin hidden xl:block">
        <div className="text-[12px] font-bold tracking-[1.2px] text-[#5b606b] uppercase">
          ON THIS PAGE
        </div>
        <div className="text-xs text-[#5b606b] mt-0.5 mb-3">
          {activeChapter.sections.length} sections
        </div>

        <div className="flex flex-col text-[14px] leading-[1.4] gap-1">
          {activeChapter.sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="py-1.5 px-2 text-[#3d424d] hover:text-[#0056d2] rounded hover:bg-[#f0f4fa] no-underline transition-colors truncate"
            >
              {sec.title}
            </a>
          ))}
          <a
            href="#quiz"
            className="py-1.5 px-2 text-[#0056d2] font-semibold rounded hover:bg-[#f0f4fa] no-underline transition-colors mt-2 border-t border-[#dae1ed] pt-2"
          >
            Checkpoint Quiz
          </a>
        </div>
      </aside>
    </div>
  );
};
