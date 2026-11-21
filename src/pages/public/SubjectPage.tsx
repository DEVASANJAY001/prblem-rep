import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import { ACADEMY_PARTS, ACADEMY_CHAPTERS } from "@/data/academyData";

export const SubjectPage: React.FC = () => {
  // Active syllabus accordion part (default to part 0: Foundations)
  const [openPart, setOpenPart] = useState<number>(0);

  // We exclude the "All" part for the syllabus accordion
  const syllabusParts = ACADEMY_PARTS.filter((p) => p.name !== "All");

  return (
    <div className="font-source-sans w-full min-h-screen bg-white text-[#1f1f1f] text-base antialiased">
      <SEOHead
        title="Problem Discovery & Validation — Stuckhere Academy"
        description="From raw friction to a verified, buildable problem. Learn to find, document, score and test problems before you write a line of code."
        canonicalUrl="https://stuckhere.davns.com/learn/problem-discovery-and-validation"
      />

      {/* Hero Section */}
      <section className="bg-[#f5f8ff] border-b border-[#dae1ed] py-10 sm:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 box-border flex flex-wrap gap-8 items-start">
          <div className="flex-[2_1_560px] min-w-0">
            <div className="text-sm font-semibold text-[#0056d2]">Academy / Course 1</div>
            <h1 className="m-0 mt-3 text-3xl sm:text-[42px] leading-[1.1] font-bold tracking-[-0.8px] text-[#1f1f1f]">
              Problem Discovery &amp; Validation
            </h1>
            <p className="m-0 mt-3.5 max-w-[640px] text-lg sm:text-[19px] leading-[1.5] text-[#3d424d]">
              From raw friction to a verified, buildable problem. Learn to find, document, score and test problems before you write a line of code.
            </p>

            <div className="flex flex-wrap gap-3 mt-5.5">
              <Link
                to="/learn/problem-discovery-and-validation/course-overview"
                className="inline-block bg-[#0056d2] hover:bg-[#00419e] text-white font-semibold no-underline py-3.5 px-7 rounded-lg min-h-[44px] box-border transition-colors shadow-sm"
              >
                Start learning
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-9 mt-7">
              <div>
                <div className="font-bold text-[18px] text-[#1f1f1f]">15 chapters</div>
                <div className="text-sm text-[#5b606b]">78 sections</div>
              </div>
              <div>
                <div className="font-bold text-[18px] text-[#1f1f1f]">Beginner</div>
                <div className="text-sm text-[#5b606b]">No prior experience</div>
              </div>
              <div>
                <div className="font-bold text-[18px] text-[#1f1f1f]">Quiz per chapter</div>
                <div className="text-sm text-[#5b606b]">Plus a capstone</div>
              </div>
            </div>
          </div>

          {/* Right Card: What is included matching Course.dc.html */}
          <div className="flex-[1_1_300px] bg-white border border-[#dae1ed] rounded-lg p-5 sm:p-6 box-border self-start shadow-sm">
            <div className="text-[18px] font-bold text-[#1f1f1f]">What is included</div>
            <div className="flex flex-col gap-3 mt-3.5 text-base text-[#3d424d]">
              <div className="flex items-center gap-2.5">
                <span className="text-[#0056d2] font-bold">✓</span>
                <span>Readable chapters and examples</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#0056d2] font-bold">✓</span>
                <span>Exercises on real problems</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#0056d2] font-bold">✓</span>
                <span>Checkpoint quizzes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#0056d2] font-bold">✓</span>
                <span>Capstone project</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor Navigation Bar matching Course.dc.html */}
      <nav
        aria-label="Module sections"
        className="max-w-[1280px] mx-auto px-4 sm:px-8 box-border border-b border-[#dae1ed] flex flex-wrap gap-x-7 text-base sticky top-14 sm:top-16 bg-white z-30"
      >
        <a
          href="#about"
          className="py-3.5 text-[#1f1f1f] font-bold border-b-[3px] border-[#0056d2] no-underline"
        >
          About
        </a>
        <a
          href="#syllabus"
          className="py-3.5 text-[#5b606b] hover:text-[#0056d2] no-underline transition-colors"
        >
          Syllabus
        </a>
        <a
          href="#skills"
          className="py-3.5 text-[#5b606b] hover:text-[#0056d2] no-underline transition-colors"
        >
          Skills
        </a>
        <a
          href="#faq"
          className="py-3.5 text-[#5b606b] hover:text-[#0056d2] no-underline transition-colors"
        >
          FAQ
        </a>
      </nav>

      {/* Main Content Area matching Course.dc.html */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-10 pb-18 box-border flex flex-wrap gap-10 items-start">
        <main className="flex-[2_1_560px] min-w-0">
          {/* Section: What you will learn */}
          <section id="about">
            <h2 className="m-0 text-[26px] font-bold text-[#1f1f1f]">What you will learn</h2>
            <div className="mt-4 border border-[#dae1ed] rounded-lg p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-7 text-base leading-[1.45] text-[#3d424d] bg-white">
              <div className="flex gap-2.5 items-start">
                <span className="text-[#0056d2] font-bold mt-0.5">•</span>
                <span>Spot problems in real workplaces and daily life</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-[#0056d2] font-bold mt-0.5">•</span>
                <span>Interview operators without pitching</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-[#0056d2] font-bold mt-0.5">•</span>
                <span>Document a problem as a structured dossier</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-[#0056d2] font-bold mt-0.5">•</span>
                <span>Score pain on a 0 to 100 scale</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-[#0056d2] font-bold mt-0.5">•</span>
                <span>Test a problem with cheap experiments</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-[#0056d2] font-bold mt-0.5">•</span>
                <span>Decide to go, pivot or stop</span>
              </div>
            </div>
          </section>

          {/* Section: Skills you will gain */}
          <section id="skills" className="mt-10">
            <h2 className="m-0 text-[26px] font-bold text-[#1f1f1f]">Skills you will gain</h2>
            <div className="flex flex-wrap gap-2.5 mt-3.5">
              {[
                "Customer discovery",
                "Pain scoring",
                "Competitor analysis",
                "Bottom-up sizing",
                "Validation experiments",
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-[#eef2fb] text-[#00419e] font-medium rounded py-2 px-3.5 text-[15px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Section: Syllabus matching Course.dc.html */}
          <section id="syllabus" className="mt-10">
            <h2 className="m-0 text-[26px] font-bold text-[#1f1f1f]">Syllabus</h2>
            <div className="mt-3.5 border-t border-[#dae1ed]">
              {syllabusParts.map((p, idx) => {
                const isOpen = openPart === idx;
                const partChapters = ACADEMY_CHAPTERS.filter(
                  (c) => c.num >= p.startChapter && c.num <= p.endChapter
                );

                return (
                  <div key={p.name} className="border-b border-[#dae1ed]">
                    <button
                      type="button"
                      onClick={() => setOpenPart(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                      className="flex items-center gap-3.5 w-full text-left bg-transparent border-0 py-4.5 px-1 min-h-[44px] text-[#1f1f1f] cursor-pointer hover:bg-black/[0.01] transition-colors"
                    >
                      <span className="flex-1">
                        <span className="block text-[13px] font-semibold tracking-[1px] text-[#5b606b]">
                          PART {idx + 1}
                        </span>
                        <span className="block text-[19px] font-bold mt-0.5 text-[#1f1f1f]">
                          {p.title}
                        </span>
                      </span>
                      <span className="text-sm text-[#5b606b] mr-2 hidden sm:inline">
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
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="px-1 pb-4.5 text-base leading-[1.7] text-[#3d424d] animate-fade-in">
                        <div className="text-sm text-[#5b606b] mb-3">
                          {p.items}
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                          {partChapters.map((ch) => (
                            <Link
                              key={ch.num}
                              to={`/learn/problem-discovery-and-validation/${ch.slug}`}
                              className="flex items-center justify-between py-2 px-3 rounded hover:bg-[#eef2fb] text-[#1f1f1f] hover:text-[#0056d2] no-underline transition-colors"
                            >
                              <span className="font-medium">
                                Chapter {ch.num}: {ch.title}
                              </span>
                              <span className="text-xs text-[#0056d2] font-semibold shrink-0 ml-4">
                                Read chapter →
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
            <h2 className="m-0 text-[26px] font-bold text-[#1f1f1f]">
              Frequently asked questions
            </h2>
            <div className="mt-3 text-base leading-[1.6] text-[#3d424d]">
              <div className="font-bold text-[#1f1f1f]">Do I need a technical background?</div>
              <p className="m-0 mt-1 mb-4 text-[#3d424d]">
                No. The course is about people, operational workflows, and verified economic friction—not code.
              </p>

              <div className="font-bold text-[#1f1f1f]">How long does it take?</div>
              <p className="m-0 mt-1 text-[#3d424d]">
                Go at your own pace, one chapter at a time. Each chapter takes about 5 to 7 minutes to read and practice.
              </p>
            </div>
          </section>
        </main>

        {/* Aside Sidebar matching Course.dc.html */}
        <aside className="flex-[1_1_280px] box-border sticky top-28 hidden md:block">
          <div className="border border-[#dae1ed] rounded-lg p-5">
            <div className="text-[18px] font-bold text-[#1f1f1f]">Curriculum Parts</div>
            <div className="flex flex-col mt-2.5 text-[15px]">
              <a
                href="#syllabus"
                onClick={() => setOpenPart(0)}
                className="py-2.5 text-[#3d424d] hover:text-[#0056d2] border-b border-[#dae1ed] no-underline"
              >
                Part 1 · Foundations
              </a>
              <a
                href="#syllabus"
                onClick={() => setOpenPart(1)}
                className="py-2.5 text-[#3d424d] hover:text-[#0056d2] border-b border-[#dae1ed] no-underline"
              >
                Part 2 · Discover
              </a>
              <a
                href="#syllabus"
                onClick={() => setOpenPart(2)}
                className="py-2.5 text-[#3d424d] hover:text-[#0056d2] border-b border-[#dae1ed] no-underline"
              >
                Part 3 · Measure and validate
              </a>
              <a
                href="#syllabus"
                onClick={() => setOpenPart(3)}
                className="py-2.5 text-[#3d424d] hover:text-[#0056d2] no-underline"
              >
                Part 4 · Apply
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
