import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Seamless 3D Tree with Curved Branches & Exact Brand Logos */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[300px] xs:h-[340px] sm:h-[360px] md:h-[400px] flex items-center justify-center overflow-hidden sm:overflow-visible">
              {/* Central 3D Asset */}
              <div className="absolute inset-0 flex items-center justify-center z-10 w-full h-full">
                <OrganicTreeVisualization />
              </div>

              {/* Orbiting Innovation Node Badges with Curved Connecting Lines */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                {/* Node 1: Google (Top Left) */}
                <div className="absolute top-[14%] left-[14%] transform -translate-x-1/2 -translate-y-1/2 animate-[float_6s_ease-in-out_infinite]">
                  <div className="relative group/node pointer-events-auto flex flex-col items-center">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute top-1/2 left-full w-28 h-20 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M0,0 C30,15 60,35 90,50" />
                    </svg>
                    {/* Official Google Vector Logo */}
                    <div
                      className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2.5 border border-outline-variant/30 flex items-center justify-center transition-all duration-300 group-hover/node:scale-115 group-hover/node:shadow-lg group-hover/node:border-primary/40 shadow-primary/10 cursor-pointer"
                      title="Google"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0">
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
                    <span className="absolute -bottom-5.5 opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 pointer-events-none text-[10px] font-bold text-gray-700 bg-white/95 px-2 py-0.5 rounded-full shadow-2xs border border-gray-100 whitespace-nowrap">
                      Google
                    </span>
                  </div>
                </div>

                {/* Node 2: Meta (Top Right) */}
                <div className="absolute top-[15%] right-[14%] transform translate-x-1/2 -translate-y-1/2 animate-[float_7s_ease-in-out_infinite_1s]">
                  <div className="relative group/node pointer-events-auto flex flex-col items-center">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute top-1/2 right-full w-28 h-20 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M90,0 C60,15 30,35 0,50" />
                    </svg>
                    {/* Official Meta Infinity Vector Logo */}
                    <div
                      className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2.5 border border-outline-variant/30 flex items-center justify-center transition-all duration-300 group-hover/node:scale-115 group-hover/node:shadow-lg group-hover/node:border-primary/40 shadow-primary/10 cursor-pointer"
                      title="Meta"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="#0081FB">
                        <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />
                      </svg>
                    </div>
                    <span className="absolute -bottom-5.5 opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 pointer-events-none text-[10px] font-bold text-gray-700 bg-white/95 px-2 py-0.5 rounded-full shadow-2xs border border-gray-100 whitespace-nowrap">
                      Meta
                    </span>
                  </div>
                </div>

                {/* Node 3: Amazon (Middle Left) */}
                <div className="absolute top-[52%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 animate-[float_5s_ease-in-out_infinite_0.5s]">
                  <div className="relative group/node pointer-events-auto flex flex-col items-center">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute top-1/2 left-full w-28 h-14 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M0,0 C30,15 60,-10 90,5" />
                    </svg>
                    {/* Official Amazon Vector Logo with Smile */}
                    <div
                      className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2.5 border border-outline-variant/30 flex items-center justify-center transition-all duration-300 group-hover/node:scale-115 group-hover/node:shadow-lg group-hover/node:border-primary/40 shadow-primary/10 cursor-pointer"
                      title="Amazon"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="#131921">
                        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z" />
                      </svg>
                    </div>
                    <span className="absolute -bottom-5.5 opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 pointer-events-none text-[10px] font-bold text-gray-700 bg-white/95 px-2 py-0.5 rounded-full shadow-2xs border border-gray-100 whitespace-nowrap">
                      Amazon
                    </span>
                  </div>
                </div>

                {/* Node 4: Microsoft (Middle Right) */}
                <div className="absolute top-[50%] right-[10%] transform translate-x-1/2 -translate-y-1/2 animate-[float_6.5s_ease-in-out_infinite_2s]">
                  <div className="relative group/node pointer-events-auto flex flex-col items-center">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute top-1/2 right-full w-28 h-14 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M90,0 C60,15 30,-10 0,5" />
                    </svg>
                    {/* Official Microsoft 4-Color Vector Tiles */}
                    <div
                      className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2.5 border border-outline-variant/30 flex items-center justify-center transition-all duration-300 group-hover/node:scale-115 group-hover/node:shadow-lg group-hover/node:border-primary/40 shadow-primary/10 cursor-pointer"
                      title="Microsoft"
                    >
                      <svg viewBox="0 0 23 23" className="w-5.5 h-5.5 shrink-0">
                        <path fill="#f35325" d="M1 1h10v10H1z" />
                        <path fill="#81bc06" d="M12 1h10v10H12z" />
                        <path fill="#05a6f0" d="M1 12h10v10H1z" />
                        <path fill="#ffba08" d="M12 12h10v10H12z" />
                      </svg>
                    </div>
                    <span className="absolute -bottom-5.5 opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 pointer-events-none text-[10px] font-bold text-gray-700 bg-white/95 px-2 py-0.5 rounded-full shadow-2xs border border-gray-100 whitespace-nowrap">
                      Microsoft
                    </span>
                  </div>
                </div>

                {/* Node 5: Apple (Bottom Left) */}
                <div className="absolute bottom-[10%] left-[16%] transform -translate-x-1/2 translate-y-1/2 animate-[float_5.5s_ease-in-out_infinite_1.5s]">
                  <div className="relative group/node pointer-events-auto flex flex-col items-center">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute bottom-1/2 left-full w-26 h-24 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M0,80 C25,50 50,30 80,0" />
                    </svg>
                    {/* Official Apple Vector Logo */}
                    <div
                      className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2.5 border border-outline-variant/30 flex items-center justify-center transition-all duration-300 group-hover/node:scale-115 group-hover/node:shadow-lg group-hover/node:border-primary/40 shadow-primary/10 cursor-pointer"
                      title="Apple"
                    >
                      <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 shrink-0" fill="#1D1D1F">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                      </svg>
                    </div>
                    <span className="absolute -bottom-5.5 opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 pointer-events-none text-[10px] font-bold text-gray-700 bg-white/95 px-2 py-0.5 rounded-full shadow-2xs border border-gray-100 whitespace-nowrap">
                      Apple
                    </span>
                  </div>
                </div>

                {/* Node 6: IBM (Bottom Right) */}
                <div className="absolute bottom-[8%] right-[16%] transform translate-x-1/2 translate-y-1/2 animate-[float_6s_ease-in-out_infinite_0.8s]">
                  <div className="relative group/node pointer-events-auto flex flex-col items-center">
                    {/* Curved connecting line */}
                    <svg
                      className="absolute bottom-1/2 right-full w-26 h-24 -z-10 text-primary/30 stroke-current hidden sm:block pointer-events-none"
                      style={{ strokeDasharray: 3, strokeWidth: 1.5, fill: "none" }}
                    >
                      <path d="M80,80 C55,50 30,30 0,0" />
                    </svg>
                    {/* Official IBM 8-Bar Blue Vector Logo */}
                    <div
                      className="w-11 h-11 md:w-13 md:h-13 bg-white rounded-2xl shadow-md p-2.5 border border-outline-variant/30 flex items-center justify-center transition-all duration-300 group-hover/node:scale-115 group-hover/node:shadow-lg group-hover/node:border-primary/40 shadow-primary/10 cursor-pointer"
                      title="IBM"
                    >
                      <svg viewBox="0 0 64 26" className="w-7 h-3.5 shrink-0">
                        <path
                          fill="#0F62FE"
                          d="M0 0h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm0 3.5h8v2H0zm15-24h12c4 0 6.5 1.5 6.5 4.5 0 2-1.2 3.5-3.2 4 2.5.5 4.2 2.2 4.2 4.8 0 3.5-2.8 5.7-7.5 5.7H15zm9 2.5h-5v2h5c1.5 0 2.5-.5 2.5-1s-1-1-2.5-1zm0 3.5h-5v2h5c1.5 0 2.5-.5 2.5-1s-1-1-2.5-1zm1 9h-6v2h6c2 0 3-.5 3-1s-1-1-3-1zm0 3.5h-6v2h6c2 0 3-.5 3-1s-1-1-3-1zm16-18.5h8l4 9 4-9h8v22h-6v-13l-4 9h-4l-4-9v13h-6z"
                        />
                      </svg>
                    </div>
                    <span className="absolute -bottom-5.5 opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 pointer-events-none text-[10px] font-bold text-gray-700 bg-white/95 px-2 py-0.5 rounded-full shadow-2xs border border-gray-100 whitespace-nowrap">
                      IBM
                    </span>
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
