import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/common/SEOHead";
import {
  ACADEMY_COURSES,
  COURSE_1_CHAPTERS,
  COURSE_2_CHAPTERS,
  COURSE_3_CHAPTERS,
  COURSE_1_PARTS,
  COURSE_2_PARTS,
  COURSE_3_PARTS,
  ACADEMY_COLORS,
  AcademyChapter,
  AcademyPart,
} from "@/data/academyData";
import { CourseCardBanner } from "@/components/learning/CourseCardBanners";
import { ChapterCoverPattern } from "@/components/learning/ChapterCoverPattern";

export const AcademyHome: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>(
    "problem-discovery-and-validation"
  );
  const [part, setPart] = useState("All");

  const isCourse3 =
    selectedCourseSlug === "full-stack-cloud-development" ||
    selectedCourseSlug === "full-stack-cloud-for-founders" ||
    selectedCourseSlug === "course-3";
  const isCourse2 = !isCourse3 && selectedCourseSlug === "market-sizing-and-opportunity";

  const activeCourse = isCourse3 ? ACADEMY_COURSES[2] : isCourse2 ? ACADEMY_COURSES[1] : ACADEMY_COURSES[0];
  const chapters: AcademyChapter[] = isCourse3
    ? COURSE_3_CHAPTERS
    : isCourse2
    ? COURSE_2_CHAPTERS
    : COURSE_1_CHAPTERS;
  const parts: AcademyPart[] = isCourse3
    ? COURSE_3_PARTS
    : isCourse2
    ? COURSE_2_PARTS
    : COURSE_1_PARTS;

  const ql = q.trim().toLowerCase();
  const currentPart = parts.find((p) => p.name === part) || parts[0];

  const filteredChapters = useMemo(() => {
    return chapters.filter((c) => {
      const inPart = c.num >= currentPart.startChapter && c.num <= currentPart.endChapter;
      if (!inPart) return false;
      if (!ql) return true;
      const haystack = `${c.title} ${c.subs} ${c.lead} ${c.part}`.toLowerCase();
      return haystack.includes(ql);
    });
  }, [chapters, currentPart, ql]);

  const handleCourseSwitch = (slug: string) => {
    setSelectedCourseSlug(slug);
    setPart("All");
    const el = document.getElementById("chapters-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const clearSearch = () => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("q");
        return next;
      },
      { replace: true }
    );
  };

  return (
    <div className="font-source-sans w-full min-h-screen bg-white text-[#1f1f1f] text-base antialiased">
      <SEOHead
        title="Stuckhere Academy — Problem Discovery, Validation & Market Sizing"
        description="Concise, actionable chapters on problem discovery, validation, market sizing and building. Read them in order, or jump to the concept you need."
        canonicalUrl="https://stuckhere.davns.com/learn"
      />

      {/* ── Hero Section (Responsive on Mobile & Desktop) ──────── */}
      <section className="bg-[#f5f8ff] border-b border-[#dae1ed] py-8 sm:py-14 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 box-border flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
          <div className="flex-1 min-w-0">
            <h1 className="m-0 text-2xl sm:text-4xl md:text-[44px] leading-[1.12] font-bold tracking-[-1px] text-[#1f1f1f]">
              Learn to find problems worth solving
            </h1>
            <p className="m-0 mt-3 sm:mt-4 max-w-[620px] text-base sm:text-lg md:text-[20px] leading-[1.5] text-[#3d424d]">
              Short, readable chapters on problem discovery, market sizing and building. Read them in order, or jump to the concept you need.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mt-6">
              <Link
                to="/learn/problem-discovery-and-validation"
                className="inline-block bg-[#0056d2] hover:bg-[#00419e] text-white font-semibold no-underline py-3 sm:py-3.5 px-6 sm:px-7 rounded-lg min-h-[44px] box-border transition-colors shadow-sm text-center"
              >
                Start Course 1
              </Link>
              <Link
                to="/learn/market-sizing-and-opportunity"
                className="inline-block bg-[#0b6b83] hover:bg-[#084f61] text-white font-semibold no-underline py-3 sm:py-3.5 px-6 sm:px-7 rounded-lg min-h-[44px] box-border transition-colors shadow-sm text-center"
              >
                Explore Course 2
              </Link>
              <a
                href="#courses"
                className="inline-block bg-white hover:bg-slate-50 text-[#1f1f1f] border border-[#dae1ed] font-semibold no-underline py-3 sm:py-3.5 px-5 sm:px-6 rounded-lg min-h-[44px] box-border transition-colors shadow-2xs text-center"
              >
                All Courses
              </a>
            </div>
          </div>

          {/* Quick Active Course Feature Card */}
          <div className="w-full lg:w-[340px] xl:w-[360px] bg-white border border-[#dae1ed] rounded-lg p-5 sm:p-6 box-border shadow-sm shrink-0">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0056d2]">
              Course Highlights
            </div>
            <Link
              to="/learn/problem-discovery-and-validation"
              className="text-[19px] sm:text-[20px] font-bold mt-1 text-[#1f1f1f] hover:text-[#0056d2] block no-underline transition-colors"
            >
              Problem Discovery &amp; Validation
            </Link>
            <div className="text-sm text-[#3d424d] mt-2 leading-[1.6]">
              15 chapters · 78 sections · Pain Scoring
            </div>

            <div className="mt-3 pt-3 border-t border-[#dae1ed]">
              <Link
                to="/learn/market-sizing-and-opportunity"
                className="text-[17px] font-bold text-[#1f1f1f] hover:text-[#0b6b83] block no-underline transition-colors"
              >
                Market Sizing &amp; Opportunity Analysis
              </Link>
              <div className="text-xs text-[#5b606b] mt-1 leading-[1.5]">
                18 chapters · 76 sections · TAM, SAM, SOM &amp; Unit Economics
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#dae1ed]">
              <Link
                to="/learn/full-stack-cloud-development"
                className="text-[17px] font-bold text-[#1f1f1f] hover:text-[#1e40af] block no-underline transition-colors"
              >
                Full-Stack Cloud Development
              </Link>
              <div className="text-xs text-[#5b606b] mt-1 leading-[1.5]">
                18 chapters · 99 sections · React, Firestore, AI Copilots &amp; Vercel
              </div>
            </div>

            <Link
              to="/learn/problem-discovery-and-validation"
              className="inline-block mt-4 text-xs sm:text-sm font-semibold text-[#0056d2] hover:underline"
            >
              Start reading syllabus →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Courses Section ──────── */}
      <section id="courses" className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-14 box-border">
        <h2 className="m-0 text-2xl sm:text-[28px] font-bold text-[#1f1f1f]">Courses</h2>
        <div className="text-sm sm:text-[15px] text-[#5b606b] mt-1">
          Master the full pipeline: discover authentic problems, size the market, and build solutions. Click any course to view its chapters.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {ACADEMY_COURSES.map((course) => {
            const isSelected =
              selectedCourseSlug === course.slug ||
              (course.id === "course-3" && isCourse3) ||
              (course.id === "course-2" && isCourse2) ||
              (course.id === "course-1" && !isCourse2 && !isCourse3);

            return (
              <div
                key={course.id}
                role="button"
                tabIndex={0}
                onClick={() => handleCourseSwitch(course.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCourseSwitch(course.slug);
                  }
                }}
                className={`text-[#1f1f1f] border rounded-xl overflow-hidden bg-white transition-all duration-300 group flex flex-col cursor-pointer text-left select-none relative ${
                  isSelected
                    ? "border-[#0056d2] ring-3 ring-[#0056d2]/25 shadow-lg scale-[1.01]"
                    : "border-[#dae1ed] hover:border-[#0056d2]/60 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {/* Visual Matching Website Banner Graphic */}
                <CourseCardBanner courseNum={course.n} isSelected={isSelected} />

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[18px] font-bold text-[#1f1f1f] group-hover:text-[#0056d2] transition-colors leading-[1.3]">
                      {course.title}
                    </div>
                    <div className="text-xs sm:text-sm text-[#5b606b] mt-2 leading-[1.5]">
                      {course.description}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#dae1ed]/70">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-[#5b606b]">
                        {course.level} · {course.chaptersCount} chapters
                      </span>
                      <span
                        className={`font-bold transition-colors inline-flex items-center gap-1 ${
                          isSelected
                            ? "text-[#0056d2]"
                            : "text-[#5b606b] group-hover:text-[#0056d2]"
                        }`}
                      >
                        {isSelected ? "Viewing chapters ↓" : "View chapters →"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Chapters Exploration Section ──────── */}
      <section
        id="chapters-section"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 pb-20 box-border scroll-mt-20"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dae1ed] pb-4">
          <div>
            <div className="text-xs font-bold text-[#0056d2] uppercase tracking-wider mb-1">
              COURSE CHAPTERS
            </div>
            <h2 className="m-0 text-xl sm:text-2xl md:text-[28px] font-bold text-[#1f1f1f]">
              {activeCourse.title}
            </h2>
            <div className="text-xs sm:text-sm text-[#5b606b] mt-0.5">
              Explore all {activeCourse.chaptersCount} chapters ({activeCourse.sectionsCount} sections). Click any chapter to read.
            </div>
          </div>

          <Link
            to={`/learn/${activeCourse.slug}`}
            className="text-xs sm:text-sm font-semibold text-[#0056d2] hover:text-[#00419e] hover:underline inline-flex items-center gap-1.5 bg-[#0056d2]/5 hover:bg-[#0056d2]/10 px-3.5 py-2 rounded-lg transition-colors"
          >
            <span>Full Syllabus Overview</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Animated Chapters Extraction Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCourseSlug}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Filter Indicator on active search */}
            {q && (
              <div className="flex items-center gap-2 bg-[#0056d2]/10 text-[#0056d2] px-3.5 py-1.5 rounded-full text-xs font-semibold my-4 self-start inline-flex">
                <span>Filtered by: "{q}"</span>
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear filter"
                  className="hover:underline cursor-pointer border-0 bg-transparent p-0 font-bold ml-1 text-xs"
                >
                  ✕ Clear
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mt-6 items-start">
              {/* Left Column: Browse by part (Horizontal Chips on Mobile, Vertical list on desktop) */}
              <aside className="w-full sm:w-[220px] shrink-0 box-border">
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5b606b] pb-2 border-b border-[#dae1ed] hidden sm:block">
                  Browse by Part
                </div>

                {/* Mobile Horizontal Scrolling Chips */}
                <div className="flex sm:flex-col gap-1.5 sm:gap-1 overflow-x-auto no-scrollbar pb-2 sm:pb-0 sm:mt-2">
                  {parts.map((p) => {
                    const on = part === p.name;
                    const count = p.endChapter - p.startChapter + 1;

                    return (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => setPart(p.name)}
                        aria-pressed={on}
                        className={`flex items-center gap-2 text-left py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors shrink-0 cursor-pointer ${
                          on
                            ? "bg-[#0056d2]/10 text-[#0056d2] font-bold border border-[#0056d2]/20"
                            : "text-[#3d424d] hover:bg-gray-100"
                        }`}
                      >
                        <span className="truncate">{p.name}</span>
                        <span className="ml-auto text-xs text-[#5b606b] font-normal">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Right Column: Chapters Grid */}
              <main className="flex-1 min-w-0 w-full">
                <div className="text-xs sm:text-sm text-[#5b606b] mb-4 flex items-center justify-between">
                  <span>
                    Showing {filteredChapters.length} of {chapters.length} chapters
                  </span>
                  {q && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="text-xs text-[#0056d2] hover:underline cursor-pointer border-0 bg-transparent font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredChapters.map((ch) => {
                    const cleanSubs = ch.subs.split(" · ").slice(0, 3).join(", ");
                    const chapterPath = `/learn/${activeCourse.slug}/${ch.slug}`;

                    return (
                      <div
                        key={ch.num}
                        className="border border-[#dae1ed] rounded-lg overflow-hidden bg-white flex flex-col hover:border-[#0056d2] hover:shadow-md transition-all group"
                      >
                        {/* Chapter Cover with Diverse Multi-Colored Vector Lines & Curves Pattern */}
                        <ChapterCoverPattern
                          chapterNum={ch.num}
                          courseNum={activeCourse.n}
                        />

                        {/* Chapter Body Content */}
                        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <Link
                              to={chapterPath}
                              className="text-[16px] sm:text-[18px] font-bold leading-[1.25] text-[#1f1f1f] group-hover:text-[#0056d2] no-underline transition-colors block"
                            >
                              {ch.title}
                            </Link>
                            <div className="text-xs sm:text-sm text-[#5b606b] mt-1.5 leading-[1.5]">
                              {ch.sectionsCount} sections · Quiz
                            </div>
                            <div className="text-xs sm:text-sm leading-[1.5] text-[#5b606b] mt-1.5 line-clamp-2">
                              {cleanSubs}
                            </div>
                          </div>

                          {/* Bottom Action Bar */}
                          <div className="mt-4 pt-3 border-t border-[#dae1ed]">
                            <Link
                              to={chapterPath}
                              className="inline-block font-semibold text-xs sm:text-sm text-[#0056d2] hover:text-[#00419e] no-underline"
                            >
                              Read chapter →
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredChapters.length === 0 && (
                  <div className="py-12 text-center text-sm sm:text-base text-[#5b606b]">
                    No chapters match "{q}" in {activeCourse.title}. Try another keyword or switch parts.
                  </div>
                )}
              </main>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};
