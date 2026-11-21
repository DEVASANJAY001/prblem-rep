import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import { ACADEMY_CHAPTERS, AcademyChapter } from "@/data/academyData";

export const ChapterReader: React.FC = () => {
  const { chapterNum, slug } = useParams<{ chapterNum?: string; slug?: string }>();
  const navigate = useNavigate();

  // Find active chapter by slug or by index
  const activeChapter: AcademyChapter = useMemo(() => {
    if (slug) {
      const found = ACADEMY_CHAPTERS.find((c) => c.slug === slug);
      if (found) return found;
      const num = parseInt(slug, 10);
      if (!isNaN(num) && ACADEMY_CHAPTERS[num]) return ACADEMY_CHAPTERS[num];
    }
    if (chapterNum) {
      const num = parseInt(chapterNum, 10);
      if (!isNaN(num) && ACADEMY_CHAPTERS[num]) return ACADEMY_CHAPTERS[num];
    }
    // Default to Chapter 1 ("Foundations: What Is a Problem?") matching Reader.dc.html
    return ACADEMY_CHAPTERS[1];
  }, [chapterNum, slug]);

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
        canonicalUrl={`https://stuckhere.davns.com/learn/${activeChapter.slug}`}
      />

      {/* Sub-header Breadcrumb Bar (Sitting under the universal main Navbar) */}
      <div className="border-b border-[#dae1ed] bg-white sticky top-14 sm:top-16 z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-2.5 box-border flex items-center gap-2 text-sm">
          <Link
            to="/learn"
            className="text-[#0056d2] hover:text-[#00419e] font-semibold no-underline flex items-center gap-1"
          >
            ← Academy
          </Link>
          <span className="text-[#5b606b]">/</span>
          <Link
            to="/learn/module-1"
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

      {/* 3-Column Layout matching Reader.dc.html */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-10 pb-20 box-border flex flex-wrap gap-8 sm:gap-12 items-start">
        {/* Left Sidebar: Course Navigation (260px) matching Reader.dc.html */}
        <nav
          aria-label="Course chapters"
          className="flex-[0_0_260px] w-full sm:w-[260px] box-border border border-[#dae1ed] rounded-lg p-3 bg-white"
        >
          <div className="text-[13px] font-semibold tracking-[1px] text-[#5b606b] py-2 px-2.5 uppercase">
            MODULE 1 CONTENTS
          </div>

          <div className="flex flex-col gap-0.5 mt-1">
            {ACADEMY_CHAPTERS.map((ch) => {
              const isCur = ch.num === activeChapter.num;
              const isChapterDone = Boolean(done[ch.num]);

              return (
                <div key={ch.num}>
                  <Link
                    to={`/learn/${ch.slug}`}
                    className={`flex gap-1.5 items-baseline py-2.5 px-2.5 rounded-[6px] no-underline text-base min-h-[44px] box-border transition-colors ${
                      isCur
                        ? "bg-[#e8f0fe] font-bold text-[#00419e]"
                        : "text-[#1f1f1f] hover:bg-[#f5f8ff]"
                    }`}
                  >
                    <span className="w-6 flex-[0_0_24px] text-[#5b606b] text-sm">
                      {isChapterDone ? "✓" : ch.num}
                    </span>
                    <span>{ch.title}</span>
                  </Link>

                  {/* Subsection links under active chapter matching Reader.dc.html */}
                  {isCur && ch.sections.length > 0 && (
                    <div className="my-0 mr-0 mb-2 ml-[34px] flex flex-col text-sm border-l border-[#dae1ed] pl-2">
                      {ch.sections.map((sec) => (
                        <a
                          key={sec.id}
                          href={`#${sec.id}`}
                          className="py-2 px-1.5 no-underline text-[#3d424d] hover:text-[#0056d2] transition-colors"
                        >
                          {sec.sectionNumber} {sec.title}
                        </a>
                      ))}
                      <a
                        href="#quiz"
                        className="py-2 px-1.5 no-underline text-[#0056d2] font-semibold"
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

        {/* Center Column: Reading Canvas (720px) matching Reader.dc.html */}
        <main className="flex-[999_1_520px] min-w-0 max-w-[720px]">
          <div className="text-sm text-[#5b606b]">
            Module 1 · Chapter {activeChapter.num}
          </div>

          <h1 className="m-0 mt-2.5 text-3xl sm:text-[44px] leading-[1.1] tracking-[-1px] font-bold text-[#1f1f1f]">
            {activeChapter.title}
          </h1>

          <p className="text-lg sm:text-[20px] leading-[1.55] text-[#3d424d] mt-4 mb-0">
            {activeChapter.lead}
          </p>

          {/* In This Chapter Card matching Reader.dc.html */}
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

              {/* Points List if present (e.g. 1.2 Five things) */}
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

              {/* Template Callout Box if present (e.g. 1.3 The template) */}
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

              {/* Interactive <details><summary> Check Yourself Questions matching Reader.dc.html */}
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

          {/* Bottom Navigation Links matching Reader.dc.html */}
          <div className="flex flex-wrap justify-between gap-3 sm:gap-6 mt-11 pt-5 border-t border-[#dae1ed]">
            {prevChapter ? (
              <Link
                to={`/learn/${prevChapter.slug}`}
                className="py-3 min-h-[44px] box-border font-semibold text-[#0056d2] hover:text-[#00419e] no-underline"
              >
                ← Chapter {prevChapter.num}: {prevChapter.shortTitle}
              </Link>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <Link
                to={`/learn/${nextChapter.slug}`}
                className="py-3 min-h-[44px] box-border font-semibold text-[#0056d2] hover:text-[#00419e] no-underline text-right"
              >
                Chapter {nextChapter.num}: {nextChapter.shortTitle} →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </main>

        {/* Right Sidebar: ON THIS PAGE (200px) matching Reader.dc.html */}
        <aside className="hidden lg:block flex-[0_0_200px] w-[200px] box-border sticky top-28">
          <div className="text-[13px] font-semibold tracking-[1px] text-[#5b606b] mb-1.5 uppercase">
            ON THIS PAGE
          </div>
          <div className="flex flex-col text-sm border-t border-[#dae1ed]">
            {activeChapter.sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="py-2.5 border-b border-[#dae1ed] no-underline text-[#3d424d] hover:text-[#0056d2] transition-colors"
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
