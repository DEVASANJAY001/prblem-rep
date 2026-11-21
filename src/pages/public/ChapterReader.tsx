import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import { ACADEMY_CHAPTERS, AcademyChapter } from "@/data/academyData";

export const ChapterReader: React.FC = () => {
  const { courseSlug, chapterSlug, slug, chapterNum } = useParams<{
    courseSlug?: string;
    chapterSlug?: string;
    slug?: string;
    chapterNum?: string;
  }>();
  const navigate = useNavigate();

  const activeSlug = chapterSlug || slug;

  // Find active chapter by slug or by index
  const activeChapter: AcademyChapter = useMemo(() => {
    if (activeSlug) {
      const found = ACADEMY_CHAPTERS.find((c) => c.slug === activeSlug);
      if (found) return found;
      const num = parseInt(activeSlug, 10);
      if (!isNaN(num) && ACADEMY_CHAPTERS[num]) return ACADEMY_CHAPTERS[num];
    }
    if (chapterNum) {
      const num = parseInt(chapterNum, 10);
      if (!isNaN(num) && ACADEMY_CHAPTERS[num]) return ACADEMY_CHAPTERS[num];
    }
    // Default to Chapter 1 ("Foundations: What Is a Problem?")
    return ACADEMY_CHAPTERS[1];
  }, [activeSlug, chapterNum]);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number>(-1);

  // Completion state in localStorage
  const [done, setDone] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem("stuckhere_academy_done");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { 0: true };
  });

  // Reset quiz and scroll on chapter change
  useEffect(() => {
    setSelectedOption(-1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeChapter.num]);

  const toggleDone = () => {
    const updated = { ...done, [activeChapter.num]: !done[activeChapter.num] };
    setDone(updated);
    try {
      localStorage.setItem("stuckhere_academy_done", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const isCurrentDone = Boolean(done[activeChapter.num]);
  const prevChapter = activeChapter.num > 0 ? ACADEMY_CHAPTERS[activeChapter.num - 1] : null;
  const nextChapter =
    activeChapter.num < ACADEMY_CHAPTERS.length - 1
      ? ACADEMY_CHAPTERS[activeChapter.num + 1]
      : null;

  return (
    <div className="font-source-sans w-full min-h-screen bg-white text-[#1f1f1f] text-base antialiased">
      <SEOHead
        title={`Chapter ${activeChapter.num}: ${activeChapter.title} — Stuckhere Academy`}
        description={activeChapter.lead}
        canonicalUrl={`https://stuckhere.davns.com/learn/problem-discovery-and-validation/${activeChapter.slug}`}
      />

      {/* Sub-header Breadcrumb Bar (Below universal Navbar) */}
      <div className="border-b border-[#dae1ed] bg-white sticky top-14 sm:top-16 z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-2.5 box-border flex items-center gap-2 text-sm">
          <Link
            to="/learn"
            className="text-[#0056d2] hover:text-[#00419e] font-semibold no-underline flex items-center gap-1"
          >
            ← Academy Home
          </Link>
          <span className="text-[#5b606b]">/</span>
          <Link
            to="/learn/problem-discovery-and-validation"
            className="text-[#5b606b] hover:text-[#0056d2] no-underline truncate hidden sm:inline"
          >
            Problem Discovery &amp; Validation
          </Link>
          <span className="text-[#5b606b] hidden sm:inline">/</span>
          <span className="text-[#1f1f1f] font-medium truncate">
            Chapter {activeChapter.num}: {activeChapter.shortTitle}
          </span>
        </div>
      </div>

      {/* 3-Column Layout with Independent Scrolling Containers */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 pb-20 box-border flex flex-wrap lg:flex-nowrap gap-8 sm:gap-10 items-start">
        {/* Left Sidebar: Independent Vertical Scroll Container (260px) */}
        <nav
          aria-label="Course chapters"
          className="flex-[0_0_260px] w-full lg:w-[260px] box-border border border-[#dae1ed] rounded-lg p-3 bg-white lg:sticky lg:top-20 lg:h-[calc(100vh-5.5rem)] lg:overflow-y-auto overscroll-contain pr-1.5 scrollbar-thin shrink-0"
        >
          <div className="text-[13px] font-semibold tracking-[1px] text-[#5b606b] py-2 px-2.5 uppercase">
            COURSE 1 CONTENTS
          </div>

          <div className="flex flex-col gap-0.5 mt-1">
            {ACADEMY_CHAPTERS.map((ch) => {
              const isCur = ch.num === activeChapter.num;

              return (
                <div key={ch.num}>
                  <Link
                    to={`/learn/problem-discovery-and-validation/${ch.slug}`}
                    className={`flex gap-2 items-baseline py-2.5 px-2.5 rounded-[6px] no-underline text-base min-h-[44px] box-border transition-colors ${
                      isCur
                        ? "bg-[#e8f0fe] font-bold text-[#00419e]"
                        : "text-[#1f1f1f] hover:bg-[#f5f8ff]"
                    }`}
                  >
                    {/* Numbering only - tick mark removed per user requirement */}
                    <span className="w-5 flex-[0_0_20px] text-[#5b606b] text-sm font-semibold">
                      {ch.num}
                    </span>
                    <span className="truncate">{ch.title}</span>
                  </Link>

                  {/* Subsection links under active chapter */}
                  {isCur && ch.sections.length > 0 && (
                    <div className="my-0 mr-0 mb-2 ml-[28px] flex flex-col text-sm border-l border-[#dae1ed] pl-2">
                      {ch.sections.map((sec) => (
                        <a
                          key={sec.id}
                          href={`#${sec.id}`}
                          className="py-1.5 px-1.5 no-underline text-[#3d424d] hover:text-[#0056d2] transition-colors truncate"
                        >
                          {sec.sectionNumber} {sec.title}
                        </a>
                      ))}
                      <a
                        href="#quiz"
                        className="py-1.5 px-1.5 no-underline text-[#0056d2] font-semibold"
                      >
                        Checkpoint Quiz
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Center Column: Reading Canvas (Independent Flexible Container, Max 760px) */}
        <main className="flex-1 min-w-0 max-w-[760px] pb-16">
          <div className="text-sm text-[#5b606b]">
            Course 1 · Chapter {activeChapter.num}
          </div>

          <h1 className="m-0 mt-2.5 text-3xl sm:text-[44px] leading-[1.1] tracking-[-1px] font-bold text-[#1f1f1f]">
            {activeChapter.title}
          </h1>

          <p className="text-lg sm:text-[20px] leading-[1.55] text-[#3d424d] mt-4 mb-0">
            {activeChapter.lead}
          </p>

          {/* In This Chapter Card */}
          <div className="mt-5.5 bg-[#f5f8ff] border border-[#dae1ed] rounded-lg p-4.5 sm:p-5.5">
            <div className="font-bold text-[#1f1f1f]">In this chapter</div>
            <div className="text-base leading-[1.6] text-[#3d424d] mt-1.5">
              {activeChapter.inThisChapter || activeChapter.subs}
            </div>
          </div>

          {/* Chapter Subsections */}
          {activeChapter.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="mt-11">
              <h2 className="m-0 text-2xl sm:text-[28px] font-bold tracking-[-0.4px] text-[#1f1f1f]">
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

              {/* Comparison Table if present */}
              {sec.table && (
                <table className="w-full border-collapse mt-4 text-base leading-[1.5]">
                  <tbody>
                    {sec.table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={`border-t border-[#dae1ed] ${
                          row.highlight ? "bg-[#f5f8ff]" : ""
                        } ${rIdx === sec.table!.rows.length - 1 ? "border-b border-[#dae1ed]" : ""}`}
                      >
                        <td className="py-3 px-4 font-bold w-[120px] text-[#1f1f1f]">
                          {row.label}
                        </td>
                        <td className="py-3 px-4 text-[#3d424d]">{row.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Subheading if present */}
              {sec.subheading && (
                <h3 className="m-0 mt-6 text-[21px] font-bold text-[#1f1f1f]">
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
                      className="py-3.5 border-b border-[#dae1ed] text-[#1f1f1f] text-base leading-[1.6]"
                    >
                      <b>{pt.bold}</b> {pt.text}
                    </div>
                  ))}
                </div>
              )}

              {/* Template Callout Box if present */}
              {sec.templateBox && (
                <div className="mt-3.5 border border-[#dae1ed] rounded-lg p-4.5 sm:p-5.5 text-base sm:text-[17px] leading-[1.7] bg-[#f5f8ff] text-[#1f1f1f]">
                  <b>{sec.templateBox}</b>
                </div>
              )}

              {sec.templateComparison && (
                <p className="text-base sm:text-[18px] leading-[1.7] mt-3 text-[#1f1f1f]">
                  <b>Weak:</b> "{sec.templateComparison.weak}"
                  <br />
                  <b>Stronger:</b> "{sec.templateComparison.strong}"
                </p>
              )}

              {/* Exercise prompt if present */}
              {sec.exercisePrompt && (
                <p className="text-base sm:text-[18px] leading-[1.7] mt-3 text-[#1f1f1f]">
                  <b>Exercise.</b> {sec.exercisePrompt}
                </p>
              )}

              {/* Interactive <details><summary> Check Yourself Questions */}
              {sec.detailsQuestions && (
                <div className="mt-4 border-t border-[#dae1ed]">
                  {sec.detailsQuestions.map((dq, dIdx) => (
                    <details
                      key={dIdx}
                      className="border-b border-[#dae1ed] group cursor-pointer"
                    >
                      <summary className="flex items-center min-h-[44px] cursor-pointer font-semibold text-[#0056d2] py-2 outline-none select-none hover:text-[#00419e] transition-colors">
                        {dq.question}
                      </summary>
                      <p className="m-0 mb-3.5 text-base sm:text-[17px] leading-[1.6] text-[#3d424d] pl-1 animate-fade-in">
                        {dq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              )}

              {/* Callout box if present */}
              {sec.callout && (
                <div className="mt-4 bg-[#f5f8ff] border border-[#dae1ed] rounded-lg p-4 text-base">
                  <span className="font-bold text-[#1f1f1f]">
                    {sec.callout.boldPrefix}{" "}
                  </span>
                  <span className="text-[#3d424d]">{sec.callout.text}</span>
                  {sec.callout.linkUrl && (
                    <div className="mt-2">
                      <Link
                        to={sec.callout.linkUrl}
                        className="text-[#0056d2] hover:text-[#00419e] font-semibold no-underline"
                      >
                        {sec.callout.linkText || "Learn more"} →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </section>
          ))}

          {/* Checkpoint Quiz Section */}
          <div id="quiz" className="mt-12 pt-8 border-t-2 border-[#16181d]">
            <div className="text-xs font-semibold tracking-[2px] text-[#5b606b] uppercase">
              CHAPTER CHECKPOINT QUIZ
            </div>
            <p className="text-lg sm:text-[20px] font-bold leading-[1.5] mt-3 text-[#1f1f1f]">
              {activeChapter.quiz.question}
            </p>

            {/* Quiz Options */}
            <div className="mt-3.5 border-t border-[#dae1ed]">
              {activeChapter.quiz.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                let bgClass = "bg-transparent hover:bg-black/[0.02]";
                if (isSelected) {
                  bgClass = opt.isCorrect ? "bg-[#e6efe3]" : "bg-[#f6e4e0]";
                }

                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSelectedOption(optIdx)}
                    className={`flex w-full text-left border-0 border-b border-[#dae1ed] py-3.5 px-2 text-base sm:text-[17px] min-h-[44px] text-[#1f1f1f] cursor-pointer items-center transition-colors ${bgClass}`}
                  >
                    <span className="w-7 text-[#5b606b] font-semibold shrink-0">
                      {opt.key}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Instant Quiz Feedback */}
            {selectedOption !== -1 && (
              <p
                className={`mt-4 text-base leading-[1.6] font-medium ${
                  activeChapter.quiz.options[selectedOption]?.isCorrect
                    ? "text-[#1d5a2b]"
                    : "text-[#8a2a1a]"
                }`}
              >
                {activeChapter.quiz.options[selectedOption]?.isCorrect
                  ? activeChapter.quiz.feedbackCorrect
                  : activeChapter.quiz.feedbackIncorrect}
              </p>
            )}
          </div>

          {/* Mark Finished Button */}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={toggleDone}
              className={`rounded-md px-5 py-3 text-[15px] font-semibold min-h-[44px] cursor-pointer transition-all ${
                isCurrentDone
                  ? "bg-transparent text-[#0056d2] border border-[#0056d2] hover:bg-[#e8f0fe]"
                  : "bg-[#1f1f1f] text-white border border-[#1f1f1f] hover:bg-black"
              }`}
            >
              {isCurrentDone ? "Finished ✓ (Undo)" : "Mark chapter finished"}
            </button>
          </div>

          {/* Bottom Navigation Links */}
          <div className="flex flex-wrap justify-between gap-3 sm:gap-6 mt-11 pt-5 border-t border-[#dae1ed]">
            {prevChapter ? (
              <Link
                to={`/learn/problem-discovery-and-validation/${prevChapter.slug}`}
                className="py-3 min-h-[44px] box-border font-semibold text-[#0056d2] hover:text-[#00419e] no-underline"
              >
                ← Chapter {prevChapter.num}: {prevChapter.shortTitle}
              </Link>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <Link
                to={`/learn/problem-discovery-and-validation/${nextChapter.slug}`}
                className="py-3 min-h-[44px] box-border font-semibold text-[#0056d2] hover:text-[#00419e] no-underline text-right"
              >
                Chapter {nextChapter.num}: {nextChapter.shortTitle} →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </main>

        {/* Right Sidebar: ON THIS PAGE (Independent Scroll Container, 200px) */}
        <aside className="hidden lg:block flex-[0_0_200px] w-[200px] box-border shrink-0 sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
          <div className="text-[13px] font-semibold tracking-[1px] text-[#5b606b] mb-1.5 uppercase">
            ON THIS PAGE
          </div>
          <div className="flex flex-col text-sm border-t border-[#dae1ed]">
            {activeChapter.sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="py-2.5 border-b border-[#dae1ed] no-underline text-[#3d424d] hover:text-[#0056d2] transition-colors truncate"
              >
                {sec.title}
              </a>
            ))}
            <a
              href="#quiz"
              className="py-2.5 border-b border-[#dae1ed] no-underline text-[#0056d2] font-semibold"
            >
              Checkpoint Quiz
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};
