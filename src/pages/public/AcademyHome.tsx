import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/common/SEOHead";
import {
  ACADEMY_CHAPTERS,
  ACADEMY_MODULES,
  ACADEMY_PARTS,
  ACADEMY_COLORS,
} from "@/data/academyData";

export const AcademyHome: React.FC = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [part, setPart] = useState("All");

  const ql = q.trim().toLowerCase();
  const currentPart = ACADEMY_PARTS.find((p) => p.name === part) || ACADEMY_PARTS[0];

  const filteredChapters = useMemo(() => {
    return ACADEMY_CHAPTERS.filter((c) => {
      const inPart = c.num >= currentPart.startChapter && c.num <= currentPart.endChapter;
      if (!inPart) return false;
      if (!ql) return true;
      const haystack = `${c.title} ${c.subs} ${c.lead} ${c.part}`.toLowerCase();
      return haystack.includes(ql);
    });
  }, [currentPart, ql]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="font-source-sans w-full min-h-screen bg-white text-[#1f1f1f] text-base antialiased">
      <SEOHead
        title="Stuckhere Academy — Learn Problem Discovery & Validation"
        description="Short, readable chapters on problem discovery, market sizing and building. Read them in order, or jump to the concept you need."
        canonicalUrl="https://stuckhere.davns.com/learn"
      />

      {/* Top Header Bar matching Main.dc.html */}
      <header className="border-b border-[#dae1ed] bg-white sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-3 box-border flex flex-wrap items-center gap-3 sm:gap-6">
          <Link
            to="/"
            className="text-[26px] font-bold tracking-[-0.5px] text-[#1f1f1f] no-underline shrink-0"
          >
            Stuck<span className="text-[#0056d2] font-semibold">here</span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-5 text-base text-[#1f1f1f]">
            <Link to="/explore" className="text-[#1f1f1f] hover:text-[#0056d2] no-underline">
              Explore
            </Link>
            <Link to="/industries" className="text-[#1f1f1f] hover:text-[#0056d2] no-underline">
              Industries
            </Link>
            <Link
              to="/learn"
              className="font-bold text-[#0056d2] no-underline"
            >
              Academy
            </Link>
            <Link to="/community" className="text-[#1f1f1f] hover:text-[#0056d2] no-underline">
              Community
            </Link>
          </nav>

          {/* Centered Search Bar matching Main.dc.html */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 basis-[280px] flex items-center border border-[#5b6670] rounded-full py-[3px] pr-[3px] pl-[18px] max-w-[560px] mx-auto"
          >
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search chapters and concepts"
              placeholder="What do you want to learn?"
              className="flex-1 min-w-0 border-0 outline-none text-base font-inherit bg-transparent text-[#1f1f1f] py-2"
            />
            {q ? (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Clear search"
                className="w-11 h-11 rounded-full border-0 bg-[#0056d2] hover:bg-[#00419e] flex items-center justify-center shrink-0 text-white cursor-pointer transition-colors"
              >
                ✕
              </button>
            ) : (
              <button
                type="submit"
                aria-label="Search"
                className="w-11 h-11 rounded-full border-0 bg-[#0056d2] hover:bg-[#00419e] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.4"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
              </button>
            )}
          </form>

          {/* Right Action Links */}
          <div className="flex items-center gap-4 sm:gap-5 ml-auto">
            <Link
              to="/dashboard"
              className="text-[#1f1f1f] hover:text-[#0056d2] no-underline text-base hidden sm:inline-block"
            >
              Dashboard
            </Link>
            <Link
              to="/submit"
              className="bg-[#1e2530] hover:bg-black text-white font-semibold py-[11px] px-[18px] rounded-lg no-underline text-sm sm:text-base transition-colors"
            >
              + Submit Problem
            </Link>
          </div>
        </div>

        {/* Sub-nav Tabs matching Main.dc.html */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 box-border flex flex-wrap gap-x-7 text-[15px]">
          <span className="py-3 font-bold border-b-[3px] border-[#0056d2] text-[#1f1f1f] cursor-default">
            Home
          </span>
          <a
            href="#learning-paths"
            className="py-3 text-[#5b606b] hover:text-[#0056d2] no-underline transition-colors"
          >
            Learning paths
          </a>
        </div>
      </header>

      {/* Hero Section matching Main.dc.html (#f5f8ff) */}
      <section className="bg-[#f5f8ff] border-b border-[#dae1ed]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12 box-border flex flex-wrap gap-7 sm:gap-14 items-center">
          <div className="flex-[2_1_520px] min-w-0">
            <h1 className="m-0 text-3xl sm:text-[44px] leading-[1.1] font-bold tracking-[-1px] text-[#1f1f1f]">
              Learn to find problems worth solving
            </h1>
            <p className="m-0 mt-4 max-w-[600px] text-lg sm:text-[20px] leading-[1.5] text-[#3d424d]">
              Short, readable chapters on problem discovery, market sizing and building. Read them in order, or jump to the concept you need.
            </p>
            <Link
              to="/learn/module-1"
              className="inline-block mt-6 bg-[#0056d2] hover:bg-[#00419e] text-white font-semibold no-underline py-3.5 px-7 rounded-lg min-h-[44px] box-border transition-colors shadow-sm"
            >
              Start Module 1
            </Link>
          </div>

          {/* Module 1 Summary Card matching Main.dc.html */}
          <div className="flex-[1_1_280px] bg-white border border-[#dae1ed] rounded-lg p-5 sm:p-6 box-border shadow-sm">
            <div className="text-sm text-[#5b606b]">Inside Module 1</div>
            <div className="text-[20px] font-bold mt-1 text-[#1f1f1f]">
              Problem Discovery &amp; Validation
            </div>
            <div className="text-[15px] text-[#3d424d] mt-2.5 leading-[1.6]">
              15 chapters · 78 sections
              <br />
              Exercises and check-yourself questions in every chapter
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section matching Main.dc.html */}
      <section id="learning-paths" className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-10 box-border">
        <h2 className="m-0 text-[26px] font-bold text-[#1f1f1f]">Learning paths</h2>
        <div className="text-[15px] text-[#5b606b] mt-1">
          Start with Module 1, the others open after it.
        </div>

        <div className="flex flex-wrap gap-5 mt-4.5">
          {/* Module 1 (Active) */}
          <Link
            to="/learn/module-1"
            className="flex-[1_1_280px] no-underline text-[#1f1f1f] border border-[#dae1ed] rounded-lg overflow-hidden bg-white hover:border-[#0056d2] hover:shadow-md transition-all group"
          >
            <div className="h-[88px] bg-[#0056d2] text-white p-4 box-border text-[13px] font-semibold tracking-[1px]">
              MODULE 1
            </div>
            <div className="p-4">
              <div className="text-[18px] font-bold text-[#1f1f1f] group-hover:text-[#0056d2] transition-colors">
                Problem Discovery &amp; Validation
              </div>
              <div className="text-sm text-[#5b606b] mt-1.5">
                Beginner · 15 chapters
              </div>
            </div>
          </Link>

          {/* Module 2 (Coming Soon) */}
          <div className="flex-[1_1_280px] border border-[#dae1ed] rounded-lg overflow-hidden bg-white opacity-85">
            <div className="h-[88px] bg-[#0b6b83] text-white p-4 box-border text-[13px] font-semibold tracking-[1px]">
              MODULE 2
            </div>
            <div className="p-4">
              <div className="text-[18px] font-bold text-[#1f1f1f]">
                Market Sizing &amp; Opportunity
              </div>
              <div className="text-sm text-[#5b606b] mt-1.5">
                Intermediate · Coming soon
              </div>
            </div>
          </div>

          {/* Module 3 (Coming Soon) */}
          <div className="flex-[1_1_280px] border border-[#dae1ed] rounded-lg overflow-hidden bg-white opacity-85">
            <div className="h-[88px] bg-[#3c4a9e] text-white p-4 box-border text-[13px] font-semibold tracking-[1px]">
              MODULE 3
            </div>
            <div className="p-4">
              <div className="text-[18px] font-bold text-[#1f1f1f]">
                Full-Stack Cloud for Founders
              </div>
              <div className="text-sm text-[#5b606b] mt-1.5">
                Advanced · Coming soon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters in Module 1 Section matching Main.dc.html */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12 pb-20 box-border">
        <h2 className="m-0 text-[26px] font-bold text-[#1f1f1f]">
          Chapters in Problem Discovery &amp; Validation
        </h2>

        <div className="flex flex-wrap gap-7 mt-5 items-start">
          {/* Left Column: Browse by part matching Main.dc.html */}
          <aside className="flex-[0_0_220px] w-full sm:w-[220px] box-border">
            <div className="text-base font-bold pb-2 border-b border-[#dae1ed] text-[#1f1f1f]">
              Browse by part
            </div>
            <div className="flex flex-col mt-1.5">
              {ACADEMY_PARTS.map((p) => {
                const on = part === p.name;
                const count = p.endChapter - p.startChapter + 1;

                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPart(p.name)}
                    aria-pressed={on}
                    className="flex items-center gap-2.5 w-full text-left bg-transparent border-0 py-2.5 px-1 min-h-[44px] text-base text-[#1f1f1f] cursor-pointer transition-colors"
                    style={{ fontWeight: on ? 700 : 400 }}
                  >
                    <span
                      className="w-[18px] h-[18px] rounded-full box-border shrink-0 transition-all"
                      style={{
                        border: `2px solid ${on ? "#0056d2" : "#5b6670"}`,
                        background: on ? "radial-gradient(#0056d2 45%, #fff 50%)" : "#fff",
                      }}
                    />
                    <span>{p.name}</span>
                    <span className="ml-auto text-[#5b606b]">{count}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Column: Chapters Grid matching Main.dc.html */}
          <main className="flex-[999_1_560px] min-w-0">
            <div className="text-[15px] text-[#5b606b] mb-3.5">
              Showing {filteredChapters.length} of 15
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredChapters.map((ch, idx) => {
                const coverBg = ACADEMY_COLORS[ch.num % 4];
                const cleanSubs = ch.subs.split(" · ").slice(0, 3).join(", ");

                return (
                  <div
                    key={ch.num}
                    className="border border-[#dae1ed] rounded-lg overflow-hidden bg-white flex flex-col hover:border-[#0056d2] hover:shadow-md transition-all group"
                  >
                    {/* Chapter Cover Bar matching Main.dc.html */}
                    <div
                      style={{ background: coverBg }}
                      className="h-[88px] text-white p-3.5 sm:px-4 box-border flex flex-col justify-between"
                    >
                      <span className="text-[13px] font-semibold tracking-[1px]">
                        CHAPTER
                      </span>
                      <span className="text-[40px] font-bold leading-none">
                        {ch.num}
                      </span>
                    </div>

                    {/* Chapter Body Content */}
                    <div className="p-4 flex-1">
                      <Link
                        to={`/learn/${ch.slug}`}
                        className="text-[18px] font-bold leading-[1.25] text-[#1f1f1f] group-hover:text-[#0056d2] no-underline transition-colors block"
                      >
                        {ch.title}
                      </Link>
                      <div className="text-sm text-[#5b606b] mt-2 leading-[1.5]">
                        {ch.sectionsCount} sections · Quiz
                      </div>
                      <div className="text-sm leading-[1.5] text-[#5b606b] mt-1.5">
                        {cleanSubs}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="px-4 border-t border-[#dae1ed]">
                      <Link
                        to={`/learn/${ch.slug}`}
                        className="inline-block py-3 min-h-[44px] box-border font-semibold text-[#0056d2] hover:text-[#00419e] no-underline"
                      >
                        Read chapter →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredChapters.length === 0 && (
              <div className="py-8 text-[17px] text-[#5b606b]">
                No chapters match. Try another search or part.
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Footer matching Stuckhere standard */}
      <footer className="border-t border-[#dae1ed] bg-white py-12 text-[#5b606b] text-sm">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-wrap justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Stuckhere Intelligence. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/explore" className="hover:text-[#0056d2] text-[#5b606b] no-underline">
              Problems
            </Link>
            <Link to="/industries" className="hover:text-[#0056d2] text-[#5b606b] no-underline">
              Industries
            </Link>
            <Link to="/community" className="hover:text-[#0056d2] text-[#5b606b] no-underline">
              Community
            </Link>
            <Link to="/privacy" className="hover:text-[#0056d2] text-[#5b606b] no-underline">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#0056d2] text-[#5b606b] no-underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
