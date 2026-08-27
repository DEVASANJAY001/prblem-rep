import React from "react";
import { useNavigate } from "react-router-dom";
import { OrganicTreeVisualization } from "./OrganicTreeVisualization";

export const OrganicAtlasSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-16 md:py-20 bg-surface-container-low/30 border-b border-outline-variant/20 relative overflow-hidden">
      {/* Subtle background ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 right-10 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Content & Button */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4 tracking-tight leading-tight">
              The Organic{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">
                Problem Atlas
              </span>
            </h2>

            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed mb-8 max-w-lg">
              Discovering 100% organic problem statements harvested from the world's leading innovators.{" "}
              <span className="text-secondary font-bold">
                19% of our current map is verified organic.
              </span>
            </p>

            <div>
              <button
                onClick={() => navigate("/explore")}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 font-label-md font-bold text-sm text-white bg-primary hover:bg-primary-container rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-primary/25 cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative flex items-center gap-2">
                  Explore the Organic Map
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Seamless 3D Tree with Curved Branches & Exact Logos */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[360px] md:h-[400px] flex items-center justify-center">
              {/* Central 3D Asset */}
              <div className="absolute inset-0 flex items-center justify-center z-10 w-full h-full">
                <OrganicTreeVisualization />
              </div>

              {/* Orbiting Innovation Node Badges with Curved Connecting Lines */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                {/* Node 1: Google (Top Left) */}
                <div className="absolute top-[14%] left-[14%] transform -translate-x-1/2 -translate-y-1/2 animate-[float_6s_ease-in-out_infinite]">
                  <div className="relative pointer-events-auto">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute top-1/2 left-full w-28 h-20 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M0,0 C30,15 60,35 90,50" />
                    </svg>
                    {/* Official Google Logo */}
                    <div className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2.5 border border-outline-variant/30 flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-primary/10">
                      <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Node 2: Meta (Top Right) */}
                <div className="absolute top-[15%] right-[14%] transform translate-x-1/2 -translate-y-1/2 animate-[float_7s_ease-in-out_infinite_1s]">
                  <div className="relative pointer-events-auto">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute top-1/2 right-full w-28 h-20 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M90,0 C60,15 30,35 0,50" />
                    </svg>
                    {/* Official Meta Logo */}
                    <div className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2.5 border border-outline-variant/30 flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-primary/10">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0081FB]" fill="currentColor">
                        <path d="M12 6.5C8.41 6.5 5.5 9.41 5.5 13c0 2.21 1.1 4.16 2.78 5.34l1.24-1.66C8.25 15.74 7.5 14.47 7.5 13c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5c0 1.47-.75 2.74-2.02 3.68l1.24 1.66C17.4 17.16 18.5 15.21 18.5 13c0-3.59-2.91-6.5-6.5-6.5zm-5.06 9.87L5.7 18.03C3.43 16.32 2 13.62 2 10.5 2 5.81 5.81 2 10.5 2c3.12 0 5.82 1.43 7.53 3.7l-1.66 1.24C15.11 5.48 13.06 4.5 10.5 4.5 7.19 4.5 4.5 7.19 4.5 10.5c0 2.56.98 4.61 2.44 5.87z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Node 3: Amazon (Middle Left) */}
                <div className="absolute top-[52%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 animate-[float_5s_ease-in-out_infinite_0.5s]">
                  <div className="relative pointer-events-auto">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute top-1/2 left-full w-28 h-14 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M0,0 C30,15 60,-10 90,5" />
                    </svg>
                    {/* Official Amazon Logo with Smile Curve */}
                    <div className="w-13 h-13 md:w-16 md:h-16 bg-white rounded-2xl shadow-md p-2.5 border border-outline-variant/30 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110 shadow-primary/10">
                      <div className="flex items-center justify-center">
                        <span className="font-black text-sm md:text-base text-zinc-900 leading-none">a</span>
                        <span className="font-bold text-xs md:text-sm text-zinc-800 leading-none">mazon</span>
                      </div>
                      <svg viewBox="0 0 36 10" className="w-7 h-2 mt-0.5">
                        <path
                          fill="#FF9900"
                          d="M1 4c7 4 17 5 25 1 1-.4 2-.8 3-1.4.6-.4 1.4.3 1 .8-4 5-14 7-23 4-2-.7-4-1.8-6-3.4-.6-.5 0-1.4.7-1.2.7.2 1.4.4 2.1.6z"
                        />
                        <path fill="#FF9900" d="M30 4.2c-.3 1.2.7 2.3 1.8 2.2 1.1-.1 1.7-.9 1.5-2-.2-1.1-1.2-1.5-2.2-1.2-.6.2-1 .6-1.1 1z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Node 4: Microsoft (Middle Right) */}
                <div className="absolute top-[50%] right-[10%] transform translate-x-1/2 -translate-y-1/2 animate-[float_6.5s_ease-in-out_infinite_2s]">
                  <div className="relative pointer-events-auto">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute top-1/2 right-full w-28 h-14 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M90,0 C60,15 30,-10 0,5" />
                    </svg>
                    {/* Official Microsoft 4-Color Tiles */}
                    <div className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2.5 border border-outline-variant/30 flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-primary/10">
                      <div className="grid grid-cols-2 gap-1 w-6 h-6">
                        <div className="bg-[#F25022] rounded-[1px]" />
                        <div className="bg-[#7FBA00] rounded-[1px]" />
                        <div className="bg-[#00A4EF] rounded-[1px]" />
                        <div className="bg-[#FFB900] rounded-[1px]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Node 5: SIH (Bottom Left) */}
                <div className="absolute bottom-[10%] left-[16%] transform -translate-x-1/2 translate-y-1/2 animate-[float_5.5s_ease-in-out_infinite_1.5s]">
                  <div className="relative pointer-events-auto">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute bottom-1/2 left-full w-26 h-24 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M0,80 C25,50 50,30 80,0" />
                    </svg>
                    {/* Official SIH Emblem */}
                    <div className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2 border border-outline-variant/30 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110 shadow-primary/10">
                      <div className="flex items-center text-[12px] font-black tracking-tight leading-none">
                        <span className="text-[#FF671F]">S</span>
                        <span className="text-[#06038D]">I</span>
                        <span className="text-[#046A38]">H</span>
                      </div>
                      <span className="text-[8px] font-bold text-primary font-mono mt-0.5 leading-none">
                        2026
                      </span>
                    </div>
                  </div>
                </div>

                {/* Node 6: IBM (Bottom Right) */}
                <div className="absolute bottom-[8%] right-[16%] transform translate-x-1/2 translate-y-1/2 animate-[float_6s_ease-in-out_infinite_0.8s]">
                  <div className="relative pointer-events-auto">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute bottom-1/2 right-full w-26 h-24 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M80,80 C55,50 30,30 0,0" />
                    </svg>
                    {/* Official IBM 8-Bar Blue Logo */}
                    <div className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2 border border-outline-variant/30 flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-primary/10">
                      <svg viewBox="0 0 64 26" className="w-8 h-4">
                        <path
                          fill="#0530AD"
                          d="M0 0h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm15-24h12c4 0 6.5 1.5 6.5 4.5 0 2-1.2 3.5-3.2 4 2.5.5 4.2 2.2 4.2 4.8 0 3.5-2.8 5.7-7.5 5.7H15zm9 2.5h-5v2h5c1.5 0 2.5-.5 2.5-1s-1-1-2.5-1zm0 3.5h-5v2h5c1.5 0 2.5-.5 2.5-1s-1-1-2.5-1zm1 9h-6v2h6c2 0 3-.5 3-1s-1-1-3-1zm0 3.5h-6v2h6c2 0 3-.5 3-1s-1-1-3-1zm16-18.5h8l4 9 4-9h8v22h-6v-13l-4 9h-4l-4-9v13h-6z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
