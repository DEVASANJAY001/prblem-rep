import React, { useState, useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
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
  COURSE_1_PARTS,
  COURSE_2_PARTS,
  COURSE_3_PARTS,
  COURSE_4_PARTS,
  COURSE_5_PARTS,
  COURSE_6_PARTS,
  COURSE_7_PARTS,
  AcademyChapter,
  AcademyPart,
} from "@/data/academyData";

export const SubjectPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug?: string }>();
  const location = useLocation();

  // Determine active course
  const isCourse7 =
    location.pathname.includes("hackathon") ||
    location.pathname.includes("open-innovation") ||
    courseSlug?.includes("hackathon") ||
    courseSlug?.includes("open-innovation") ||
    courseSlug === "course-7";

  const isCourse6 =
    !isCourse7 &&
    (location.pathname.includes("startup-fundamentals") ||
      location.pathname.includes("/startup") ||
      courseSlug?.includes("startup-fundamentals") ||
      courseSlug?.includes("startup") ||
      courseSlug === "course-6");

  const isCourse5 =
    !isCourse7 &&
    !isCourse6 &&
    (location.pathname.includes("ai-for-builders") ||
      location.pathname.includes("/ai") ||
      courseSlug?.includes("ai-for-builders") ||
      courseSlug?.includes("ai") ||
      courseSlug === "course-5");

  const isCourse4 =
    !isCourse7 &&
    !isCourse6 &&
    !isCourse5 &&
    (location.pathname.includes("solution-design") ||
      location.pathname.includes("mvp") ||
      courseSlug?.includes("solution-design") ||
      courseSlug?.includes("mvp") ||
      courseSlug === "course-4");

  const isCourse3 =
    !isCourse7 &&
    !isCourse6 &&
    !isCourse5 &&
    !isCourse4 &&
    (location.pathname.includes("full-stack") ||
      location.pathname.includes("cloud") ||
      courseSlug?.includes("full-stack") ||
      courseSlug?.includes("cloud") ||
      courseSlug === "course-3");

  const isCourse2 =
    !isCourse7 &&
    !isCourse6 &&
    !isCourse5 &&
    !isCourse4 &&
    !isCourse3 &&
    (location.pathname.includes("market-sizing") ||
      courseSlug?.includes("market-sizing") ||
      courseSlug === "course-2");

  const course = isCourse7
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
  const chapters: AcademyChapter[] = isCourse7
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
  const parts: AcademyPart[] = (
    isCourse7
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
      : COURSE_1_PARTS
  ).filter((p) => p.name !== "All");

  // Active syllabus accordion part (default to part 0: Foundations)
  const [openPart, setOpenPart] = useState<number>(0);

  const whatYouWillLearn = useMemo(() => {
    if (isCourse6) {
      return [
        "Select the right venture path (venture-scale, bootstrapped, or service-first)",
        "Construct a dynamic 9-box Business Model Canvas tied to verified customer pain",
        "Structure fair co-founder equity splits with 4-year vesting and 1-year cliffs",
        "Set up Delaware C-Corp / Pvt Ltd legal entities and execute complete IP assignment",
        "Build 18-month cash runway models, calculate net burn, and manage unit economics",
        "Master the 6-stage B2B pilot conversion sales pipeline to close paying customers",
      ];
    }
    if (isCourse5) {
      return [
        "Select the right AI architecture (rules vs classical ML vs LLMs)",
        "Master prompt engineering with strict JSON structured outputs",
        "Connect and proxy language model APIs with streaming SSE",
        "Ground answers in custom data using chunking and RAG embeddings",
        "Build tool-calling functions and safe multi-step agent workflows",
        "Implement model-graded evaluation benchmarks and safety guardrails",
      ];
    }
    if (isCourse4) {
      return [
        "Synthesize customer interviews into actionable personas and journey maps",
        "Reframe raw problem statements into high-leverage How Might We challenges",
        "Execute rapid ideation using Crazy 8s, SCAMPER, and AI technical copilots",
        "Prioritize core functionality using RICE scoring and riskiest assumption tests",
        "Design interactive mobile and web prototypes in 14-day rapid build sprints",
        "Negotiate, run, and convert customer pilot agreements into paid contracts",
      ];
    }
    if (isCourse3) {
      return [
        "Architect scalable cloud web apps using React 18, TypeScript, and Vite",
        "Design query-first Firestore schemas and write zero-trust security rules",
        "Implement secure Firebase Auth with multi-role RBAC and guest onboarding",
        "Connect Claude and Gemini LLM models with structured JSON streaming",
        "Automate continuous deployment on Vercel with instant rollback capability",
        "Build Playwright E2E browser test suites and optimize Core Web Vitals",
      ];
    }
    if (isCourse2) {
      return [
        "Estimate TAM, SAM and SOM bottom-up from real operational inputs",
        "Navigate the User vs. Buyer vs. Payer triad in B2B sales",
        "Price software to capture 10% to 20% of verified customer waste",
        "Build transparent spreadsheet models with sensitivity ranges",
        "Evaluate unit economics for a healthy >3:1 LTV:CAC ratio",
        "Produce an executive 6-box opportunity dossier for stakeholders",
      ];
    }
    return [
      "Spot problems in real workplaces and daily life",
      "Interview operators without pitching solutions",
      "Document a problem as a structured dossier",
      "Score pain on a 0 to 100 mathematical scale",
      "Test a problem with cheap validation experiments",
      "Decide objectively to go, pivot or stop",
    ];
  }, [isCourse2, isCourse3, isCourse4, isCourse5, isCourse6]);

  const skills = useMemo(() => {
    if (isCourse6) {
      return [
        "Business Model Design",
        "Value-Based Pricing",
        "Co-Founder Equity & Vesting",
        "IP Assignment & Legal Entities",
        "Cash Runway Modeling",
        "SAFE & Seed Fundraising",
        "B2B Enterprise Sales",
        "SaaS Unit Economics (CAC/LTV)",
      ];
    }
    if (isCourse5) {
      return [
        "Prompt Engineering & JSON Schemas",
        "Model API Gateways & Streaming",
        "Retrieval-Augmented Generation (RAG)",
        "Vector Embeddings & Semantic Search",
        "Function Calling & Tool Execution",
        "LLM-as-a-Judge Evaluation",
        "Prompt Injection & PII Safety",
        "Token Economics & Semantic Caching",
      ];
    }
    if (isCourse4) {
      return [
        "Human-Centered Design",
        "User Journey Mapping",
        "How Might We Reframing",
        "RICE Prioritisation",
        "Clickable Prototyping",
        "Usability Testing (SUS)",
        "Pilot Agreement Drafting",
        "Pitch & Demo Execution",
      ];
    }
    if (isCourse3) {
      return [
        "React 18 & TypeScript",
        "Cloud Firestore NoSQL",
        "Firebase Auth & RBAC",
        "LLM Copilot Streaming",
        "Vercel Edge CI/CD",
        "Playwright E2E Testing",
        "Core Web Vitals & Costing",
      ];
    }
    if (isCourse2) {
      return [
        "Bottom-Up Sizing",
        "Value-Based Pricing",
        "Unit Economics",
        "LTV : CAC Modeling",
        "Sensitivity Analysis",
        "India & Emerging Markets",
      ];
    }
    return [
      "Customer discovery",
      "Pain scoring",
      "Competitor analysis",
      "Bottom-up sizing",
      "Validation experiments",
    ];
  }, [isCourse2, isCourse3, isCourse4, isCourse5, isCourse6]);

  return (
    <div className="font-source-sans w-full min-h-screen bg-white text-[#1f1f1f] text-base antialiased">
      <SEOHead
        title={`${course.title} — Stuckhere Academy`}
        description={course.description}
        canonicalUrl={`https://stuckhere.davns.com/learn/${course.slug}`}
      />

      {/* Hero Section - Fully Responsive on Mobile & Desktop */}
      <section className="bg-[#f5f8ff] border-b border-[#dae1ed] py-8 sm:py-12 md:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 box-border flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#0056d2] uppercase bg-[#0056d2]/10 px-2.5 py-1 rounded-full mb-3">
              Academy / Course {course.n}
            </div>
            <h1 className="m-0 text-2xl sm:text-3xl md:text-[40px] leading-[1.15] font-bold tracking-[-0.8px] text-[#1f1f1f]">
              {course.title}
            </h1>
            <p className="m-0 mt-3.5 max-w-[640px] text-base sm:text-lg md:text-[19px] leading-[1.5] text-[#3d424d]">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to={`/learn/${course.slug}/course-overview`}
                className="inline-block bg-[#0056d2] hover:bg-[#00419e] text-white font-semibold no-underline py-3 sm:py-3.5 px-6 sm:px-7 rounded-lg min-h-[44px] box-border transition-colors shadow-sm text-center"
              >
                Start learning
              </Link>
              <Link
                to="/learn"
                className="inline-block bg-white hover:bg-slate-50 text-[#1f1f1f] border border-[#dae1ed] font-semibold no-underline py-3 sm:py-3.5 px-5 sm:px-6 rounded-lg min-h-[44px] box-border transition-colors text-center"
              >
                ← All Courses
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-8 mt-7 pt-5 border-t border-[#dae1ed]/60">
              <div>
                <div className="font-bold text-[17px] sm:text-[18px] text-[#1f1f1f]">
                  {course.chaptersCount} chapters
                </div>
                <div className="text-xs sm:text-sm text-[#5b606b]">{course.sectionsCount} sections</div>
              </div>
              <div>
                <div className="font-bold text-[17px] sm:text-[18px] text-[#1f1f1f]">{course.level}</div>
                <div className="text-xs sm:text-sm text-[#5b606b]">
                  {isCourse6
                    ? "Prerequisite: Courses 1, 2, 4 & 5 recommended"
                    : isCourse5
                    ? "Prerequisite: Courses 1, 2 & 3 recommended"
                    : isCourse4
                    ? "Prerequisite: Courses 1 & 2 (Course 3 optional)"
                    : isCourse3
                    ? "Prerequisite: Courses 1 & 2"
                    : isCourse2
                    ? "Prerequisite: Course 1"
                    : "No prior experience"}
                </div>
              </div>
              <div>
                <div className="font-bold text-[17px] sm:text-[18px] text-[#1f1f1f]">Checkpoint Quizzes</div>
                <div className="text-xs sm:text-sm text-[#5b606b]">Plus a verified capstone</div>
              </div>
            </div>
          </div>

          {/* Right Card: What is included */}
          <div className="w-full lg:w-[320px] xl:w-[340px] bg-white border border-[#dae1ed] rounded-lg p-5 sm:p-6 box-border shadow-sm shrink-0">
            <div className="text-[17px] sm:text-[18px] font-bold text-[#1f1f1f]">What is included</div>
            <div className="flex flex-col gap-3 mt-3.5 text-sm sm:text-base text-[#3d424d]">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0056d2] font-bold">✓</span>
                <span>Readable chapters and worked cases</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#0056d2] font-bold">✓</span>
                <span>Real industry data models &amp; exercises</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#0056d2] font-bold">✓</span>
                <span>Checkpoint quizzes with explanations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#0056d2] font-bold">✓</span>
                <span>Institutional capstone project</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor Navigation Bar - Horizontal Scrolling on Mobile */}
      <nav
        aria-label="Course navigation sections"
        className="w-full border-b border-[#dae1ed] sticky top-14 sm:top-16 bg-white z-30 overflow-x-auto no-scrollbar"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 flex gap-6 sm:gap-8 text-sm sm:text-base whitespace-nowrap">
          <a
            href="#about"
            className="py-3 sm:py-3.5 text-[#1f1f1f] font-bold border-b-[3px] border-[#0056d2] no-underline"
          >
            About
          </a>
          <a
            href="#syllabus"
            className="py-3 sm:py-3.5 text-[#5b606b] hover:text-[#0056d2] no-underline transition-colors"
          >
            Syllabus
          </a>
          <a
            href="#skills"
            className="py-3 sm:py-3.5 text-[#5b606b] hover:text-[#0056d2] no-underline transition-colors"
          >
            Skills
          </a>
          <a
            href="#faq"
            className="py-3 sm:py-3.5 text-[#5b606b] hover:text-[#0056d2] no-underline transition-colors"
          >
            FAQ
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 pb-20 box-border flex flex-col md:flex-row gap-8 sm:gap-10 items-start">
        <main className="flex-1 min-w-0 w-full">
          {/* Section: What you will learn */}
          <section id="about">
            <h2 className="m-0 text-xl sm:text-2xl md:text-[26px] font-bold text-[#1f1f1f]">
              What you will learn
            </h2>
            <div className="mt-4 border border-[#dae1ed] rounded-lg p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 text-sm sm:text-base leading-[1.5] text-[#3d424d] bg-white">
              {whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <span className="text-[#0056d2] font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Skills you will gain */}
          <section id="skills" className="mt-10">
            <h2 className="m-0 text-xl sm:text-2xl md:text-[26px] font-bold text-[#1f1f1f]">
              Skills you will gain
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-3.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-[#f5f8ff] text-[#0056d2] border border-[#dae1ed] py-1.5 px-3 rounded-full text-xs sm:text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Section: Syllabus Accordion */}
          <section id="syllabus" className="mt-10">
            <h2 className="m-0 text-xl sm:text-2xl md:text-[26px] font-bold text-[#1f1f1f]">
              Course Syllabus
            </h2>
            <div className="text-sm text-[#5b606b] mt-1 mb-4">
              {course.chaptersCount} chapters organized into {parts.length} distinct curriculum parts.
            </div>

            <div className="border border-[#dae1ed] rounded-lg overflow-hidden bg-white divide-y divide-[#dae1ed]">
              {parts.map((p, idx) => {
                const isOpen = openPart === idx;
                const partChapters = chapters.filter(
                  (c) => c.num >= p.startChapter && c.num <= p.endChapter
                );

                return (
                  <div key={p.name} className="transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenPart(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="flex items-center gap-3 w-full text-left bg-transparent border-0 py-4 px-4 min-h-[48px] text-[#1f1f1f] cursor-pointer hover:bg-black/[0.02] transition-colors"
                    >
                      <span className="flex-1 min-w-0">
                        <span className="block text-xs font-bold tracking-[1px] text-[#0056d2] uppercase">
                          PART {idx + 1}
                        </span>
                        <span className="block text-base sm:text-[18px] font-bold mt-0.5 text-[#1f1f1f] truncate">
                          {p.title || p.name}
                        </span>
                      </span>
                      <span className="text-xs sm:text-sm text-[#5b606b] mr-1 hidden sm:inline">
                        {p.meta}
                      </span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#5b606b"
                        strokeWidth="2.4"
                        aria-hidden="true"
                        className={`transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-sm sm:text-base leading-[1.6] text-[#3d424d] bg-[#fafbfc] border-t border-[#dae1ed]/60 animate-fade-in">
                        {p.items && (
                          <div className="text-xs sm:text-sm text-[#5b606b] mb-3 italic">
                            {p.items}
                          </div>
                        )}
                        <div className="flex flex-col gap-1.5 mt-2">
                          {partChapters.map((ch) => (
                            <Link
                              key={ch.num}
                              to={`/learn/${course.slug}/${ch.slug}`}
                              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white border border-[#dae1ed]/80 hover:border-[#0056d2] hover:bg-[#f0f4fa] text-[#1f1f1f] hover:text-[#0056d2] no-underline transition-all min-h-[42px] group"
                            >
                              <span className="font-semibold text-xs sm:text-sm flex items-center gap-2 min-w-0">
                                <span className="w-5 text-center text-xs font-bold text-[#5b606b] group-hover:text-[#0056d2]">
                                  {ch.num}
                                </span>
                                <span className="truncate">{ch.title}</span>
                              </span>
                              <span className="text-xs text-[#0056d2] font-semibold shrink-0 ml-3">
                                Read →
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Frequently Asked Questions */}
          <section id="faq" className="mt-10">
            <h2 className="m-0 text-xl sm:text-2xl md:text-[26px] font-bold text-[#1f1f1f]">
              Frequently asked questions
            </h2>
            <div className="mt-3 text-sm sm:text-base leading-[1.6] text-[#3d424d] space-y-4">
              <div>
                <div className="font-bold text-[#1f1f1f]">Do I need an advanced finance degree?</div>
                <p className="m-0 mt-1 text-[#3d424d]">
                  No. The math relies on practical unit arithmetic (Count × Usage × Price) and clean spreadsheet logic—not multivariable calculus.
                </p>
              </div>

              <div>
                <div className="font-bold text-[#1f1f1f]">How long does the course take?</div>
                <p className="m-0 mt-1 text-[#3d424d]">
                  At your own pace, approximately 6 to 8 hours. Each chapter is designed for 7 to 10 minutes of active reading and practice.
                </p>
              </div>

              <div>
                <div className="font-bold text-[#1f1f1f]">Can I apply this to non-software businesses?</div>
                <p className="m-0 mt-1 text-[#3d424d]">
                  Yes. The bottom-up customer counting and unit economics apply equally to hardware, physical operations, logistics, and local service providers.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Aside Sidebar: Quick Jump */}
        <aside className="w-full md:w-[260px] lg:w-[280px] box-border sticky top-28 hidden md:block shrink-0">
          <div className="border border-[#dae1ed] rounded-lg p-4 sm:p-5 bg-white shadow-2xs">
            <div className="text-base font-bold text-[#1f1f1f]">Curriculum Parts</div>
            <div className="flex flex-col mt-2.5 text-xs sm:text-sm divide-y divide-[#dae1ed]">
              {parts.map((p, idx) => (
                <a
                  key={p.name}
                  href="#syllabus"
                  onClick={() => setOpenPart(idx)}
                  className="py-2.5 text-[#3d424d] hover:text-[#0056d2] no-underline transition-colors flex items-center justify-between"
                >
                  <span className="truncate">Part {idx + 1} · {p.name}</span>
                  <span className="text-xs text-[#5b606b]">→</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
