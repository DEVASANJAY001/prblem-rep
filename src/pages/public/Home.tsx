import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/common/Navbar";
import { usePageContent } from "@/hooks/usePageContent";
import { subscribeProblems } from "@/lib/firebase/services/problemsService";
import { ProblemDoc } from "@/types";
import { ProblemCardSkeleton } from "@/components/common/LoadingContainer";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { OrganicAtlasSection } from "@/components/ui/OrganicAtlasSection";
import { TrendingProblemCard } from "@/components/ui/TrendingProblemCard";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const mouseGlowRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trendingScrollRef = useRef<HTMLDivElement | null>(null);

  const [trendingProblems, setTrendingProblems] = useState<ProblemDoc[]>([]);
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [homeSearchQuery, setHomeSearchQuery] = useState("");

  const handleHomeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeSearchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(homeSearchQuery.trim())}`);
    } else {
      navigate("/explore");
    }
  };

  const checkScroll = () => {
    if (trendingScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trendingScrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  const scrollTrending = (direction: "left" | "right") => {
    if (trendingScrollRef.current) {
      const scrollAmount = direction === "left" ? -580 : 580;
      trendingScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeProblems({ status: "approved" }, (list) => {
      setTrendingProblems(list);
      setLoadingProblems(false);
      setTimeout(checkScroll, 100);
    });
    return () => unsubscribe();
  }, []);

  const { getField, loading: contentLoading } = usePageContent("home");

  const headline1 = getField("hero", "headline_line1", "Every Great Innovation");
  const headline2 = getField("hero", "headline_line2", "Starts With A Problem.");
  const subheadline = getField(
    "hero",
    "subheadline",
    "Discover, analyze, and solve real-world challenges across industries. The world's largest open registry of verified problems."
  );
  const searchPlaceholder = getField(
    "hero",
    "search_placeholder",
    "Search millions of verified problems..."
  );
  const searchBtnLabel = getField("hero", "search_button_label", "Search");
  const popularTags = getField<string[]>("searches", "popular_tags", [
    "Healthcare",
    "Agriculture",
    "AI",
    "Construction",
    "Education",
  ]);

  const stat1Label = getField("stats", "stat_1_label", "Problems Today");
  const stat1Val = getField("stats", "stat_1_value", "14,208");
  const stat2Label = getField("stats", "stat_2_label", "New This Week");
  const stat2Val = getField("stats", "stat_2_value", "+1,402");
  const stat3Label = getField("stats", "stat_3_label", "Industries");
  const stat3Val = getField("stats", "stat_3_value", "142");
  const stat4Label = getField("stats", "stat_4_label", "Active Users");
  const stat4Val = getField("stats", "stat_4_value", "89.4k");

  const ctaHeading = getField("cta", "heading", "Ready to solve the world's most pressing problems?");
  const ctaSubtext = getField(
    "cta",
    "subtext",
    "Join thousands of innovators, researchers, and organizations building a better future."
  );
  const ctaPrimaryLabel = getField("cta", "primary_btn_label", "Start Exploring");
  const ctaPrimaryLink = getField("cta", "primary_btn_link", "/explore");
  const ctaSecondaryLabel = getField("cta", "secondary_btn_label", "Submit a Problem");
  const ctaSecondaryLink = getField("cta", "secondary_btn_link", "/submit");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.left = `${e.pageX}px`;
        mouseGlowRef.current.style.top = `${e.pageY}px`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // WebGL Background Shader Canvas Animation (ANIMATION_32)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl", { alpha: true, antialias: true }) ||
      canvas.getContext("experimental-webgl", { alpha: true })) as WebGLRenderingContext | null;
    if (!gl) return;

    let animationFrameId: number;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = v_texCoord;
        
        // Fluid sine/cosine moving blobs (Stitch ANIMATION_32)
        float t = u_time * 0.75;
        float blob1 = sin(uv.x * 2.5 + t * 0.6) * cos(uv.y * 3.0 - t * 0.45);
        float blob2 = cos(uv.x * 3.8 - t * 0.35) * sin(uv.y * 2.4 + t * 0.7);
        float blob3 = sin((uv.x + uv.y) * 2.8 + t * 0.5);

        // Soft interactive mouse wave
        vec2 mouseNorm = u_mouse / max(u_resolution, vec2(1.0, 1.0));
        float distToMouse = length(uv - mouseNorm);
        float mouseWave = exp(-distToMouse * 3.5) * 0.35;

        // Vivid theme colors: Primary Royal Blue (#2554f0), Electric Cyan, Soft Lavender
        vec3 color1 = vec3(0.145, 0.329, 0.941); 
        vec3 color2 = vec3(0.35, 0.68, 1.0);
        vec3 color3 = vec3(0.65, 0.45, 0.98);

        float mask = smoothstep(-0.6, 0.6, blob1 + blob2 + mouseWave);
        float mask2 = smoothstep(-0.4, 0.8, blob3);

        vec3 finalColor = mix(color1, color2, mask);
        finalColor = mix(finalColor, color3, mask2 * 0.45);

        // Highly visible, rich opacity on light background
        float alpha = 0.32 + 0.28 * mask;
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;

    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleWindowMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });

    function syncSize() {
      if (!canvas || !gl) return;
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(Math.floor(rect.width || window.innerWidth), 300);
      const h = Math.max(Math.floor(rect.height || window.innerHeight), 300);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        if (uRes) gl.uniform2f(uRes, w, h);
      }
    }

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    const startTime = performance.now();

    function render() {
      if (!canvas || !gl) return;
      const t = performance.now() - startTime;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      resizeObserver.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased selection:bg-primary/20 selection:text-primary relative overflow-x-hidden min-h-screen">
      {/* Mouse Glow */}
      <div ref={mouseGlowRef} className="mouse-glow hidden md:block" id="mouseGlow" />

      {/* iOS Glassmorphic Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full bg-surface relative">
        <div className="flex flex-col w-full">
          {/* Section 1: Hero with Direct WebGL Shader extending behind header */}
          <section className="w-full flex flex-col items-center justify-center min-h-screen pt-24 pb-12 px-4 md:px-8 text-center relative overflow-hidden">
            {/* Direct WebGL Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
            />
            <div className="absolute inset-0 bg-dot-pattern z-0 pointer-events-none" />
            {/* Smooth merging fade & blur transition at bottom of hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-surface z-0 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-surface via-surface/80 to-transparent pointer-events-none z-10 backdrop-blur-[1px]" />

            {/* Hero Content */}
            <div className="max-w-5xl w-full z-10 flex flex-col items-center gap-6 md:gap-7 relative my-auto">
              {contentLoading ? (
                <div className="flex flex-col items-center gap-4 w-full py-4 animate-pulse">
                  <div className="h-12 sm:h-16 md:h-20 w-3/4 max-w-2xl bg-surface-container-high rounded-3xl" />
                  <div className="h-10 sm:h-14 md:h-16 w-1/2 max-w-xl bg-surface-container-high/70 rounded-2xl" />
                  <div className="h-5 sm:h-6 w-2/3 max-w-lg bg-surface-container-low rounded-xl mt-2" />
                </div>
              ) : (
                <>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] leading-[1.08] text-on-surface tracking-tighter max-w-5xl font-extrabold relative text-center">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-xl -z-10 rounded-full animate-blob" />
                    <span className="block">{headline1}</span>
                    <span className="block mt-1 sm:mt-2">
                      {headline2.includes("Problem") ? (
                        <>
                          {headline2.split("Problem")[0]}
                          <span className="text-primary-container relative inline-block">
                            <span className="relative z-10">Problem</span>
                            <span className="absolute bottom-0 left-0 w-full h-3 bg-primary/20 -z-10 -skew-x-12" />
                          </span>
                          {headline2.split("Problem")[1]}
                        </>
                      ) : (
                        headline2
                      )}
                    </span>
                  </h1>

                  <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                    {subheadline}
                  </p>
                </>
              )}

              <form
                onSubmit={handleHomeSearch}
                className="w-full max-w-2xl relative shadow-2xl shadow-primary/10 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl border border-outline-variant/30 hover:border-primary/50 focus-within:border-primary/80 focus-within:shadow-primary/20 transition-all duration-300 group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <span className="material-symbols-outlined absolute left-5 top-1/2 transform -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                  search
                </span>
                <input
                  value={homeSearchQuery}
                  onChange={(e) => setHomeSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-36 py-4 md:py-4.5 bg-transparent focus:outline-none focus:ring-0 rounded-2xl font-body-lg text-body-lg text-on-surface placeholder-on-surface-variant/70 border-none"
                  placeholder={searchPlaceholder}
                  type="text"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-on-surface text-surface px-6 py-2.5 rounded-xl font-label-md text-label-md hover:bg-primary active:scale-[0.98] transition-colors shadow-sm hover:shadow-md hover:shadow-primary/20 cursor-pointer"
                >
                  {searchBtnLabel}
                </button>
              </form>

              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-1 min-h-[36px]">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mr-1 font-semibold">
                  Popular:
                </span>
                {contentLoading ? (
                  <div className="flex items-center gap-2 animate-pulse">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-7 w-20 rounded-full bg-surface-container-high/80" />
                    ))}
                  </div>
                ) : (
                  popularTags.map((cat) => (
                    <Link
                      key={cat}
                      to={`/explore?industry=${encodeURIComponent(cat)}`}
                      className="animate-fade-in px-4 py-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm border border-outline-variant/20 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10 text-on-surface font-label-md text-xs transition-all duration-300 shadow-sm"
                    >
                      {cat}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Section 2: Stats Counter */}
          <section className="w-full py-16 border-y border-outline-variant/20 bg-surface-container-lowest/30 backdrop-blur-sm relative z-20">
            <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8">
              {contentLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-outline-variant/20 animate-pulse">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center justify-center gap-3 p-4">
                      <div className="h-4 w-24 bg-surface-container-high rounded-full" />
                      <div className="h-10 w-28 bg-surface-container-high/70 rounded-xl" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="animate-fade-in grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-outline-variant/20">
                  <div className="flex flex-col items-center justify-center gap-2 p-4 relative group hover:bg-primary/5 transition-colors rounded-xl overflow-hidden cursor-pointer">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold group-hover:text-primary transition-colors">
                      {stat1Label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-lg text-4xl text-on-surface font-bold tracking-tight">
                        {stat1Val}
                      </span>
                      <svg
                        className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 p-4 relative group hover:bg-secondary/5 transition-colors rounded-xl overflow-hidden cursor-pointer">
                    <div className="absolute top-0 left-0 w-full h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold group-hover:text-secondary transition-colors">
                      {stat2Label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-lg text-4xl text-on-surface font-bold tracking-tight">
                        {stat2Val}
                      </span>
                      <svg
                        className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 p-4 relative group hover:bg-primary/5 transition-colors rounded-xl overflow-hidden cursor-pointer">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold group-hover:text-primary transition-colors">
                      {stat3Label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-lg text-4xl text-on-surface font-bold tracking-tight">
                        {stat3Val}
                      </span>
                      <svg
                        className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 p-4 relative group hover:bg-tertiary/5 transition-colors rounded-xl overflow-hidden cursor-pointer">
                    <div className="absolute top-0 left-0 w-full h-1 bg-tertiary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold group-hover:text-tertiary transition-colors">
                      {stat4Label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-lg text-4xl text-on-surface font-bold tracking-tight">
                        {stat4Val}
                      </span>
                      <svg
                        className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 3: The Organic Problem Atlas */}
          <OrganicAtlasSection />

          {/* Section 4: Trending Problems */}
          <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-8 md:pb-10 flex flex-col gap-6 font-['Poppins',sans-serif]">
            <div className="flex items-end justify-between border-b border-outline-variant/20 pb-4 px-2 md:px-6">
              <div className="flex flex-col gap-1.5">
                <h2 className="text-2xl md:text-4xl text-on-surface tracking-tight font-bold">
                  Trending Problems
                </h2>
                <p className="text-sm md:text-base text-on-surface-variant font-normal">
                  The most urgent challenges being discussed this week.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Horizontal Scroll Controls */}
                <div className="hidden sm:flex items-center gap-1.5 bg-surface-container-low p-1 rounded-full border border-outline-variant/30">
                  <button
                    onClick={() => scrollTrending("left")}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-all cursor-pointer shadow-2xs"
                    title="Scroll Left"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button
                    onClick={() => scrollTrending("right")}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-all cursor-pointer shadow-2xs"
                    title="Scroll Right"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>

                <Link
                  to="/explore"
                  className="font-medium text-xs md:text-sm text-primary hover:text-primary-container transition-colors flex items-center gap-1 group bg-primary/5 px-4 py-2 rounded-full hover:bg-primary/10"
                >
                  View all{" "}
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            {/* Scroll Viewport Container with Dynamic Left & Right Gradient Blur */}
            <div className="relative w-full py-2">
              {/* Left Edge Blur Overlay (Only mounted when scrolled past 1st card) */}
              {canScrollLeft && (
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-surface via-surface/90 to-transparent z-20 transition-opacity duration-300" />
              )}

              {/* Right Edge Blur Overlay (Only mounted when more cards available to the right) */}
              {canScrollRight && (
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-surface via-surface/90 to-transparent z-20 transition-opacity duration-300" />
              )}

              {/* Single Row Horizontal Scroll Feed */}
              <div
                ref={trendingScrollRef}
                onScroll={checkScroll}
                className="flex flex-row flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pb-4 pt-2 hide-scrollbar items-stretch"
                style={{ scrollbarWidth: "none" }}
              >
                {loadingProblems ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="snap-start shrink-0 min-w-[340px] sm:min-w-[480px] md:min-w-[560px] lg:min-w-[620px]">
                      <ProblemCardSkeleton />
                    </div>
                  ))
                ) : trendingProblems.length === 0 ? (
                  <div className="w-full p-8 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30 text-on-surface-variant text-sm">
                    No verified problems currently available. Check back soon!
                  </div>
                ) : (
                  trendingProblems.map((prob) => (
                    <TrendingProblemCard
                      key={prob.id}
                      problem={prob}
                      className="snap-start shrink-0 min-w-[340px] sm:min-w-[480px] md:min-w-[560px] lg:min-w-[620px] max-w-[640px]"
                    />
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Section: Platform Use Cases */}
          <section className="w-full pt-10 pb-16 md:pt-12 md:pb-20 bg-surface-container-low/30 border-b border-outline-variant/20">
            <div className="flex flex-col w-full h-full relative max-w-[1400px] mx-auto px-4 md:px-8" id="use-cases-container">
              <div className="w-full flex justify-center pt-4 pb-6">
                <div className="text-center max-w-3xl px-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-4 tracking-tight">Platform Use Cases</h2>
                  <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">
                    Explore how different innovators and organizations leverage ProblemAtlas to discover, validate, and solve real-world challenges.
                  </p>
                </div>
              </div>

              {/* Desktop Accordion Grid */}
              <div className="w-full mx-auto px-2 pb-24 h-[600px] hidden md:flex gap-4 group/container overflow-hidden">
                {/* Case 1: Problem Discovery */}
                <div className="use-case-card relative flex-[1] hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-full rounded-2xl overflow-hidden cursor-pointer group group-hover/container:opacity-100 bg-surface-container shadow-sm hover:shadow-xl">
                  <div className="absolute inset-0 z-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="absolute inset-0 w-full h-full opacity-30 text-primary" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col z-10 bg-gradient-to-t from-surface-container via-transparent to-transparent">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 mb-auto transition-transform duration-500 group-hover:scale-110 shadow-md">
                      <span className="material-symbols-outlined text-on-primary">search</span>
                    </div>
                    <div className="flex flex-col mt-auto pb-4 relative min-h-[120px] justify-end">
                      <h3 className="text-2xl font-bold text-on-surface whitespace-nowrap mb-2 origin-left transition-transform duration-500 transform rotate-[-90deg] translate-y-[-100%] translate-x-[20px] group-hover:rotate-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:mb-3">
                        Problem Discovery
                      </h3>
                      <div className="h-0 opacity-0 overflow-hidden transition-all duration-500 delay-100 group-hover:h-[80px] group-hover:opacity-100">
                        <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                          Identify real-world gaps and document global challenges for innovators to solve.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case 2: Market Validation */}
                <div className="use-case-card relative flex-[1] hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-full rounded-2xl overflow-hidden cursor-pointer group group-hover/container:opacity-100 bg-surface-container shadow-sm hover:shadow-xl">
                  <div className="absolute inset-0 z-0 bg-error/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="absolute inset-0 w-full h-full opacity-30 text-error" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,80 Q30,20 60,60 T100,40 L100,100 L0,100 Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col z-10 bg-gradient-to-t from-surface-container via-transparent to-transparent">
                    <div className="w-12 h-12 rounded-full bg-error flex items-center justify-center shrink-0 mb-auto transition-transform duration-500 group-hover:scale-110 shadow-md">
                      <span className="material-symbols-outlined text-on-error">trending_up</span>
                    </div>
                    <div className="flex flex-col mt-auto pb-4 relative min-h-[120px] justify-end">
                      <h3 className="text-2xl font-bold text-on-surface whitespace-nowrap mb-2 origin-left transition-transform duration-500 transform rotate-[-90deg] translate-y-[-100%] translate-x-[20px] group-hover:rotate-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:mb-3">
                        Market Validation
                      </h3>
                      <div className="h-0 opacity-0 overflow-hidden transition-all duration-500 delay-100 group-hover:h-[80px] group-hover:opacity-100">
                        <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                          Validate demand and size opportunities using crowd-sourced pain point data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case 3: Startup Matching */}
                <div className="use-case-card relative flex-[1] hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-full rounded-2xl overflow-hidden cursor-pointer group group-hover/container:opacity-100 bg-surface-container shadow-sm hover:shadow-xl">
                  <div className="absolute inset-0 z-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="absolute inset-0 w-full h-full opacity-30 text-secondary" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,20 Q40,80 80,30 T100,50 L100,100 L0,100 Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col z-10 bg-gradient-to-t from-surface-container via-transparent to-transparent">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0 mb-auto transition-transform duration-500 group-hover:scale-110 shadow-md">
                      <span className="material-symbols-outlined text-on-secondary">handshake</span>
                    </div>
                    <div className="flex flex-col mt-auto pb-4 relative min-h-[120px] justify-end">
                      <h3 className="text-2xl font-bold text-on-surface whitespace-nowrap mb-2 origin-left transition-transform duration-500 transform rotate-[-90deg] translate-y-[-100%] translate-x-[20px] group-hover:rotate-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:mb-3">
                        Startup Matching
                      </h3>
                      <div className="h-0 opacity-0 overflow-hidden transition-all duration-500 delay-100 group-hover:h-[80px] group-hover:opacity-100">
                        <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                          Connect startups with verified problems that match their core technology.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case 4: Academic Research */}
                <div className="use-case-card relative flex-[1] hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-full rounded-2xl overflow-hidden cursor-pointer group group-hover/container:opacity-100 bg-surface-container shadow-sm hover:shadow-xl">
                  <div className="absolute inset-0 z-0 bg-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="absolute inset-0 w-full h-full opacity-30 text-tertiary" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,60 Q20,20 60,70 T100,30 L100,100 L0,100 Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col z-10 bg-gradient-to-t from-surface-container via-transparent to-transparent">
                    <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center shrink-0 mb-auto transition-transform duration-500 group-hover:scale-110 shadow-md">
                      <span className="material-symbols-outlined text-on-tertiary">school</span>
                    </div>
                    <div className="flex flex-col mt-auto pb-4 relative min-h-[120px] justify-end">
                      <h3 className="text-2xl font-bold text-on-surface whitespace-nowrap mb-2 origin-left transition-transform duration-500 transform rotate-[-90deg] translate-y-[-100%] translate-x-[20px] group-hover:rotate-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:mb-3">
                        Academic Research
                      </h3>
                      <div className="h-0 opacity-0 overflow-hidden transition-all duration-500 delay-100 group-hover:h-[80px] group-hover:opacity-100">
                        <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                          Surface novel research topics backed by industry-verified data and needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case 5: Talent Recruitment */}
                <div className="use-case-card relative flex-[1] hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-full rounded-2xl overflow-hidden cursor-pointer group group-hover/container:opacity-100 bg-surface-container shadow-sm hover:shadow-xl">
                  <div className="absolute inset-0 z-0 bg-primary-container/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="absolute inset-0 w-full h-full opacity-30 text-primary-container" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,30 Q50,90 90,40 T100,60 L100,100 L0,100 Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col z-10 bg-gradient-to-t from-surface-container via-transparent to-transparent">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0 mb-auto transition-transform duration-500 group-hover:scale-110 shadow-md">
                      <span className="material-symbols-outlined text-on-primary-container">groups</span>
                    </div>
                    <div className="flex flex-col mt-auto pb-4 relative min-h-[120px] justify-end">
                      <h3 className="text-2xl font-bold text-on-surface whitespace-nowrap mb-2 origin-left transition-transform duration-500 transform rotate-[-90deg] translate-y-[-100%] translate-x-[20px] group-hover:rotate-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:mb-3">
                        Talent Recruitment
                      </h3>
                      <div className="h-0 opacity-0 overflow-hidden transition-all duration-500 delay-100 group-hover:h-[80px] group-hover:opacity-100">
                        <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                          Identify bright minds solving complex problems to build high-impact teams.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Case 6: Internal Innovation */}
                <div className="use-case-card relative flex-[1] hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-full rounded-2xl overflow-hidden cursor-pointer group group-hover/container:opacity-100 bg-surface-container shadow-sm hover:shadow-xl">
                  <div className="absolute inset-0 z-0 bg-surface-tint/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="absolute inset-0 w-full h-full opacity-30 text-surface-tint" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,50 Q30,10 70,60 T100,20 L100,100 L0,100 Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col z-10 bg-gradient-to-t from-surface-container via-transparent to-transparent">
                    <div className="w-12 h-12 rounded-full bg-surface-tint flex items-center justify-center shrink-0 mb-auto transition-transform duration-500 group-hover:scale-110 shadow-md">
                      <span className="material-symbols-outlined text-on-primary">lightbulb</span>
                    </div>
                    <div className="flex flex-col mt-auto pb-4 relative min-h-[120px] justify-end">
                      <h3 className="text-2xl font-bold text-on-surface whitespace-nowrap mb-2 origin-left transition-transform duration-500 transform rotate-[-90deg] translate-y-[-100%] translate-x-[20px] group-hover:rotate-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:mb-3">
                        Internal Innovation
                      </h3>
                      <div className="h-0 opacity-0 overflow-hidden transition-all duration-500 delay-100 group-hover:h-[80px] group-hover:opacity-100">
                        <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                          Empower your workforce to drive change and gather employee insights.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Fallback / Vertical Grid */}
              <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4 pb-16">
                <div className="bg-surface-container rounded-2xl p-6 shadow-sm border border-outline-variant/20">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-on-primary">search</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">Problem Discovery</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Identify real-world gaps and document global challenges for innovators to solve.
                  </p>
                </div>

                <div className="bg-surface-container rounded-2xl p-6 shadow-sm border border-outline-variant/20">
                  <div className="w-12 h-12 rounded-full bg-error flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-on-error">trending_up</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">Market Validation</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Validate demand and size opportunities using crowd-sourced pain point data.
                  </p>
                </div>

                <div className="bg-surface-container rounded-2xl p-6 shadow-sm border border-outline-variant/20">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-on-secondary">handshake</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">Startup Matching</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Connect startups with verified problems that match their core technology.
                  </p>
                </div>

                <div className="bg-surface-container rounded-2xl p-6 shadow-sm border border-outline-variant/20">
                  <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-on-tertiary">school</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">Academic Research</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Surface novel research topics backed by industry-verified data and needs.
                  </p>
                </div>

                <div className="bg-surface-container rounded-2xl p-6 shadow-sm border border-outline-variant/20">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-on-primary-container">groups</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">Talent Recruitment</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Identify bright minds solving complex problems to build high-impact teams.
                  </p>
                </div>

                <div className="bg-surface-container rounded-2xl p-6 shadow-sm border border-outline-variant/20">
                  <div className="w-12 h-12 rounded-full bg-surface-tint flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-on-primary">lightbulb</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">Internal Innovation</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Empower your workforce to drive change and gather employee insights.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Innovation Impact Quote with WebGL Shader */}
          <section className="w-full relative min-h-[560px] flex items-center justify-center py-20 overflow-hidden group bg-surface">
            {/* Ambient WebGL Shader Background */}
            <div className="absolute inset-0 z-0 w-full h-full opacity-60 mix-blend-multiply pointer-events-none transition-opacity duration-[2000ms] ease-in-out group-hover:opacity-85">
              <ShaderBackground />
            </div>

            {/* Subtle Texture Overlay */}
            <div
              className="absolute inset-0 z-0 w-full h-full opacity-5 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #003bcb 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Main Quote Container */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
              <div className="relative bg-surface/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[32px] p-8 md:p-16 shadow-2xl shadow-primary-container/10 hover:shadow-primary-container/20 transition-all duration-700 ease-out border border-surface-variant/50 flex flex-col items-center text-center">
                {/* Decorative Quote Mark */}
                <div className="absolute -top-8 -left-4 md:-top-12 md:-left-8 text-[120px] md:text-[180px] leading-none text-primary-fixed-dim/30 font-serif select-none pointer-events-none transform -rotate-12 transition-transform duration-700 ease-out group-hover:rotate-0">
                  “
                </div>

                {/* Quote Text */}
                <h2 className="text-2xl md:text-4xl font-extrabold text-on-surface mb-8 max-w-3xl leading-tight tracking-tight">
                  Innovative companies are{" "}
                  <span className="text-primary relative inline-block group-hover:scale-105 transition-transform duration-500 ease-out">
                    10x faster
                  </span>{" "}
                  in product development and{" "}
                  <span className="text-primary relative inline-block group-hover:scale-105 transition-transform duration-500 ease-out delay-75">
                    6x better
                  </span>{" "}
                  at scaling new ventures
                </h2>

                {/* Attribution */}
                <div className="text-xs font-semibold text-outline tracking-[0.2em] uppercase mb-10 flex items-center gap-4 opacity-80">
                  <span className="w-8 h-[1px] bg-outline-variant"></span>
                  by McKinsey Report
                  <span className="w-8 h-[1px] bg-outline-variant"></span>
                </div>

                {/* Call to Action */}
                <button
                  onClick={() => navigate("/explore")}
                  className="group/btn relative inline-flex items-center justify-center gap-3 bg-primary text-on-primary font-bold px-8 py-4 rounded-full overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <span className="relative z-10">Experience the impact firsthand</span>
                  <span className="material-symbols-outlined relative z-10 text-[20px] transition-transform duration-300 ease-out group-hover/btn:translate-x-1">
                    arrow_forward
                  </span>
                  {/* Button Hover Gradient */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary-container to-surface-tint opacity-0 transition-opacity duration-300 ease-out group-hover/btn:opacity-100"></div>
                </button>
              </div>
            </div>

            {/* Decorative Floating Dots */}
            <div className="absolute top-1/4 left-10 w-2.5 h-2.5 rounded-full bg-secondary animate-pulse blur-[1px]"></div>
            <div className="absolute bottom-1/4 right-10 w-3 h-3 rounded-full bg-primary-container blur-[2px] animate-bounce"></div>
          </section>

          {/* Section 7: Dark High-Impact CTA */}
          <section className="w-full py-32 bg-on-surface text-surface relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
            <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 flex flex-col items-center gap-8 w-full">
              {contentLoading ? (
                <div className="flex flex-col items-center gap-6 w-full animate-pulse">
                  <div className="h-12 md:h-16 w-3/4 max-w-2xl bg-white/10 rounded-2xl" />
                  <div className="h-6 w-1/2 max-w-lg bg-white/5 rounded-xl" />
                  <div className="flex gap-4 mt-4">
                    <div className="h-14 w-44 bg-white/10 rounded-xl" />
                    <div className="h-14 w-44 bg-white/5 rounded-xl" />
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in flex flex-col items-center gap-8">
                  <h2 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                    {ctaHeading.includes("pressing problems") ? (
                      <>
                        {ctaHeading.split("pressing problems")[0]}
                        <span className="text-primary-fixed">pressing problems</span>
                        {ctaHeading.split("pressing problems")[1]}
                      </>
                    ) : (
                      ctaHeading
                    )}
                  </h2>
                  <p className="font-body-lg text-xl text-surface-variant/80 max-w-2xl">
                    {ctaSubtext}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                    <Link
                      to={ctaPrimaryLink}
                      className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl font-label-md text-base font-semibold hover:bg-primary-container hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 text-center"
                    >
                      {ctaPrimaryLabel}
                    </Link>
                    <Link
                      to={ctaSecondaryLink}
                      className="w-full sm:w-auto bg-surface-container-high/40 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-label-md text-base font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300 text-center"
                    >
                      {ctaSecondaryLabel}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest py-16">
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="text-label-sm font-semibold text-on-surface uppercase tracking-widest mb-2">
              Product
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/explore" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Features
              </Link>
              <Link to="/explore" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Solutions
              </Link>
              <Link to="/industries" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Industries
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-label-sm font-semibold text-on-surface uppercase tracking-widest mb-2">
              Community
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/community" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Forums
              </Link>
              <Link to="/community" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Events
              </Link>
              <Link to="/companies" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Partners
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-label-sm font-semibold text-on-surface uppercase tracking-widest mb-2">
              Company
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/about" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Careers
              </Link>
              <Link to="/about" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-label-sm font-semibold text-on-surface uppercase tracking-widest mb-2">
              Legal
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/about" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/about" className="text-body-md text-on-surface-variant hover:text-primary transition-colors">
                Cookies
              </Link>
            </nav>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop mt-16 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-black text-xs">
              PA
            </div>
            <span className="font-label-sm text-outline font-bold tracking-widest uppercase">
              ProblemAtlas
            </span>
          </div>
          <p className="text-label-sm text-outline">© 2024 ProblemAtlas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
