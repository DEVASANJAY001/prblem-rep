import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/common/SEOHead";
import {
  ACADEMY_COURSES,
  COURSE_1_CHAPTERS,
  COURSE_2_CHAPTERS,
  COURSE_3_CHAPTERS,
  COURSE_4_CHAPTERS,
  COURSE_5_CHAPTERS,
  COURSE_6_CHAPTERS,
  COURSE_7_CHAPTERS,
  COURSE_8_CHAPTERS,
  COURSE_1_PARTS,
  COURSE_2_PARTS,
  COURSE_3_PARTS,
  COURSE_4_PARTS,
  COURSE_5_PARTS,
  COURSE_6_PARTS,
  COURSE_7_PARTS,
  COURSE_8_PARTS,
  ACADEMY_COLORS,
  AcademyChapter,
  AcademyPart,
} from "@/data/academyData";
import { CourseCardBanner } from "@/components/learning/CourseCardBanners";
import { ChapterCoverPattern } from "@/components/learning/ChapterCoverPattern";

export const AcademyHome: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string | null>(null);
  const [part, setPart] = useState("All");

  // Courses 4-in-view horizontal scroll container & state
  const coursesScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (!coursesScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = coursesScrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = coursesScrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scrollCourses = (direction: "left" | "right") => {
    if (!coursesScrollRef.current) return;
    const container = coursesScrollRef.current;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 24
      : 300;
    const scrollAmount = direction === "left" ? -cardWidth * 2 : cardWidth * 2;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const isCourse8 =
    selectedCourseSlug === "data-analysis-and-decision-making-for-builders" ||
    selectedCourseSlug === "data-analysis" ||
    selectedCourseSlug === "course-8";
  const isCourse7 =
    !isCourse8 && (
    selectedCourseSlug === "hackathon-and-open-innovation-mastery" ||
    selectedCourseSlug === "hackathon" ||
    selectedCourseSlug === "course-7");
  const isCourse6 =
    !isCourse7 &&
    (selectedCourseSlug === "startup-fundamentals" ||
      selectedCourseSlug === "startup" ||
      selectedCourseSlug === "course-6");
  const isCourse5 =
    !isCourse7 &&
    !isCourse6 &&
    (selectedCourseSlug === "ai-for-builders" ||
      selectedCourseSlug === "ai" ||
      selectedCourseSlug === "course-5");
  const isCourse4 =
    !isCourse7 &&
    !isCourse6 &&
    !isCourse5 &&
    (selectedCourseSlug === "solution-design-and-mvp-building" ||
      selectedCourseSlug === "solution-design" ||
      selectedCourseSlug === "course-4");
  const isCourse3 =
    !isCourse7 &&
    !isCourse6 &&
    !isCourse5 &&
    !isCourse4 &&
    (selectedCourseSlug === "full-stack-cloud-development" ||
      selectedCourseSlug === "full-stack-cloud-for-founders" ||
      selectedCourseSlug === "course-3");
  const isCourse2 = !isCourse7 && !isCourse6 && !isCourse5 && !isCourse4 && !isCourse3 && selectedCourseSlug === "market-sizing-and-opportunity";

  const activeCourse = isCourse8
    ? ACADEMY_COURSES[7]
    : isCourse7
    ? ACADEMY_COURSES[6]
    : isCourse6
    ? ACADEMY_COURSES[5]
    : isCourse5
    ? ACADEMY_COURSES[4]
    : isCourse4
    ? ACADEMY_COURSES[3]
    : isCourse3
    ? ACADEMY_COURSES[2]
    : isCourse2
    ? ACADEMY_COURSES[1]
    : ACADEMY_COURSES[0];
  const chapters: AcademyChapter[] = isCourse8
    ? COURSE_8_CHAPTERS
    : isCourse7
    ? COURSE_7_CHAPTERS
    : isCourse6
    ? COURSE_6_CHAPTERS
    : isCourse5
    ? COURSE_5_CHAPTERS
    : isCourse4
    ? COURSE_4_CHAPTERS
    : isCourse3
    ? COURSE_3_CHAPTERS
    : isCourse2
    ? COURSE_2_CHAPTERS
    : COURSE_1_CHAPTERS;
  const parts: AcademyPart[] = isCourse8
    ? COURSE_8_PARTS
    : isCourse7
    ? COURSE_7_PARTS
    : isCourse6
    ? COURSE_6_PARTS
    : isCourse5
    ? COURSE_5_PARTS
    : isCourse4
    ? COURSE_4_PARTS
    : isCourse3
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

      {/* ── Hero Section with Animated Changing-Color Vector Background ──────── */}
      <style>{`
        @keyframes academyGradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes academyOrb1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(40px, -25px) scale(1.1); }
        }
        @keyframes academyOrb2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-35px, 30px) scale(0.95); }
        }
        @keyframes academyOrb3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(30px, 35px) scale(1.08); }
        }
      `}</style>
      <section
        className="relative overflow-hidden border-b border-[#dae1ed] py-12 sm:py-16 md:py-20"
        style={{
          background: "linear-gradient(135deg, #f5f8ff 0%, #edf3ff 25%, #f0fdf9 50%, #faf5ff 75%, #f5f8ff 100%)",
          backgroundSize: "250% 250%",
          animation: "academyGradientFlow 18s ease-in-out infinite",
        }}
      >
        {/* Simple single lines on both sides that fade towards the center */}
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* Left side fading to center gradients */}
            <linearGradient id="hero-line-left-1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
              <stop offset="0%" stopColor="#0056d2" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-line-left-2" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="85%" stopColor="#06b6d4" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-line-left-3" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.25" />
              <stop offset="85%" stopColor="#60a5fa" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </linearGradient>

            {/* Right side fading to center gradients */}
            <linearGradient id="hero-line-right-1" gradientUnits="userSpaceOnUse" x1="1440" y1="0" x2="1040" y2="0">
              <stop offset="0%" stopColor="#0056d2" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-line-right-2" gradientUnits="userSpaceOnUse" x1="1440" y1="0" x2="1040" y2="0">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#059669" stopOpacity="0.2" />
              <stop offset="85%" stopColor="#34d399" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-line-right-3" gradientUnits="userSpaceOnUse" x1="1440" y1="0" x2="1040" y2="0">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.25" />
              <stop offset="85%" stopColor="#a855f7" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Left Side Lines (starting at edge x=0 and fading towards center) */}
          <g>
            <line x1="0" y1="32" x2="310" y2="32" stroke="url(#hero-line-left-1)" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="0" y1="65" x2="375" y2="65" stroke="url(#hero-line-left-2)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="100" x2="330" y2="100" stroke="url(#hero-line-left-3)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="0" y1="138" x2="390" y2="138" stroke="url(#hero-line-left-1)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="178" x2="340" y2="178" stroke="url(#hero-line-left-2)" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="0" y1="218" x2="385" y2="218" stroke="url(#hero-line-left-3)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="258" x2="320" y2="258" stroke="url(#hero-line-left-1)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="0" y1="292" x2="360" y2="292" stroke="url(#hero-line-left-2)" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Right Side Lines (starting at edge x=1440 and fading towards center) */}
          <g>
            <line x1="1440" y1="32" x2="1130" y2="32" stroke="url(#hero-line-right-1)" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="1440" y1="65" x2="1065" y2="65" stroke="url(#hero-line-right-2)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="1440" y1="100" x2="1110" y2="100" stroke="url(#hero-line-right-3)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="1440" y1="138" x2="1050" y2="138" stroke="url(#hero-line-right-1)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="1440" y1="178" x2="1100" y2="178" stroke="url(#hero-line-right-2)" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="1440" y1="218" x2="1055" y2="218" stroke="url(#hero-line-right-3)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="1440" y1="258" x2="1120" y2="258" stroke="url(#hero-line-right-1)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="1440" y1="292" x2="1080" y2="292" stroke="url(#hero-line-right-2)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>

        {/* Ambient Floating Color Glow Orbs */}
        <div
          className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-blue-400/15 filter blur-[60px] pointer-events-none"
          style={{ animation: "academyOrb1 14s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/4 -right-16 w-96 h-96 rounded-full bg-teal-300/15 filter blur-[70px] pointer-events-none"
          style={{ animation: "academyOrb2 16s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-16 left-1/3 w-80 h-80 rounded-full bg-purple-400/12 filter blur-[60px] pointer-events-none"
          style={{ animation: "academyOrb3 15s ease-in-out infinite" }}
        />

        {/* Clean Centered Content */}
        <div className="relative z-10 max-w-[840px] mx-auto px-4 sm:px-6 md:px-8 box-border text-center flex flex-col items-center">
          <h1 className="m-0 text-3xl sm:text-5xl md:text-[50px] leading-[1.12] font-extrabold tracking-[-1.5px] text-[#1f1f1f]">
            Learn to find problems worth solving
          </h1>
          <p className="m-0 mt-4 sm:mt-5 max-w-[640px] text-base sm:text-lg md:text-[20px] leading-[1.5] text-[#3d424d]">
            Short, readable chapters on problem discovery, market sizing and building. Read them in order, or jump to the concept you need.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 mt-8">
            <Link
              to="/learn/problem-discovery-and-validation"
              className="inline-block bg-[#0056d2] hover:bg-[#00419e] text-white font-bold no-underline py-3.5 px-7 rounded-xl min-h-[46px] box-border transition-all shadow-sm hover:shadow-md text-center"
            >
              Start Course 1
            </Link>
            <Link
              to="/learn/market-sizing-and-opportunity"
              className="inline-block bg-[#0b6b83] hover:bg-[#084f61] text-white font-bold no-underline py-3.5 px-7 rounded-xl min-h-[46px] box-border transition-all shadow-sm hover:shadow-md text-center"
            >
              Explore Course 2
            </Link>
            <a
              href="#courses"
              className="inline-block bg-white hover:bg-slate-50 text-[#1f1f1f] border border-[#dae1ed] font-semibold no-underline py-3.5 px-6 rounded-xl min-h-[46px] box-border transition-all shadow-2xs text-center"
            >
              All Courses
            </a>
          </div>
        </div>
      </section>

      {/* ── Courses Section (Coursera-style Cards: 4 in view on desktop with smooth left-to-right scrolling) ──────── */}
      <section id="courses" className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-14 box-border">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="m-0 text-2xl sm:text-[28px] font-bold text-[#1f1f1f]">Courses</h2>
            <div className="text-sm sm:text-[15px] text-[#5b606b] mt-1">
              Master the full pipeline: discover authentic problems, size the market, and build solutions. Click any course to view its chapters.
            </div>
          </div>

          {/* Left / Right Scroll Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollCourses("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll courses left"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                canScrollLeft
                  ? "bg-white border-[#dae1ed] text-[#1f1f1f] hover:bg-[#f0f4fa] hover:border-[#0056d2] shadow-2xs cursor-pointer"
                  : "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollCourses("right")}
              disabled={!canScrollRight}
              aria-label="Scroll courses right"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                canScrollRight
                  ? "bg-white border-[#dae1ed] text-[#1f1f1f] hover:bg-[#f0f4fa] hover:border-[#0056d2] shadow-2xs cursor-pointer"
                  : "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 4 Cards Visible at Once with Left-to-Right Horizontal Scrolling for Remaining */}
        <div
          ref={coursesScrollRef}
          className="flex gap-5 sm:gap-6 mt-6 overflow-x-auto pb-4 pt-1 px-1 -mx-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {ACADEMY_COURSES.map((course) => {
            const providerInfo =
              course.n === 1
                ? {
                    tag: "Recently updated",
                    tagClass: "bg-[#e6f4ea] text-[#137333] border-[#ceead6]",
                    rating: "4.8",
                    level: "Beginner",
                  }
                : course.n === 2
                ? {
                    tag: "New",
                    tagClass: "bg-[#f1f3f4] text-[#3c4043] border-[#dadce0]",
                    rating: "4.9",
                    level: "Intermediate",
                  }
                : course.n === 3
                ? {
                    tag: "Full-Stack Dev",
                    tagClass: "bg-[#f3e8ff] text-[#6b21a8] border-[#e9d5ff]",
                    rating: "4.9",
                    level: "Advanced",
                  }
                : course.n === 4
                ? {
                    tag: "Hands-on Capstone",
                    tagClass: "bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]",
                    rating: "4.9",
                    level: "Builder",
                  }
                : course.n === 5
                ? {
                    tag: "AI Specialization",
                    tagClass: "bg-[#ecfeff] text-[#0e7490] border-[#cffafe]",
                    rating: "4.9",
                    level: "Advanced AI",
                  }
                : {
                    tag: "Founder & Venture",
                    tagClass: "bg-[#fff1f2] text-[#be123c] border-[#fecdd3]",
                    rating: "4.9",
                    level: "Founder",
                  };

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
                className="w-[84%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] shrink-0 snap-start text-[#1f1f1f] border border-[#dae1ed] rounded-2xl p-3 sm:p-3.5 bg-white shadow-2xs hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between cursor-pointer text-left select-none relative"
              >
                {/* 65% - 70% Inner Rounded-Corner Cut Image Frame */}
                <div className="w-full h-[210px] sm:h-[225px] rounded-xl overflow-hidden shrink-0 relative bg-slate-950">
                  <CourseCardBanner courseNum={course.n} />
                </div>

                {/* 30% - 35% Content Details Below Image (Coursera Layout Hierarchy) */}
                <div className="pt-3 pb-0.5 px-0.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Course Title */}
                    <h3 className="text-[16.5px] sm:text-[17px] font-bold text-[#1f1f1f] group-hover:text-[#0056d2] transition-colors leading-[1.3] m-0 line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Rating & Meta Row (Clean Coursera-style: ★ 4.8 · Beginner · 15 chapters) */}
                    <div className="text-[12.5px] text-[#5b606b] flex items-center gap-1.5 flex-wrap mt-2">
                      <span className="text-[#f59e0b] font-bold text-[13.5px]">★</span>
                      <span className="font-bold text-[#1f1f1f]">{providerInfo.rating}</span>
                      <span className="text-[#cbd5e1]">·</span>
                      <span className="text-[#475569] font-medium">{providerInfo.level}</span>
                      <span className="text-[#cbd5e1]">·</span>
                      <span className="text-[#475569] font-medium">{course.chaptersCount} chapters</span>
                    </div>
                  </div>

                  {/* Pill Badge at the very bottom (Directly matching Coursera reference) */}
                  <div className="mt-3.5 pt-1">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${providerInfo.tagClass}`}
                    >
                      {providerInfo.tag}
                    </span>
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
