import React from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  // Chapter reader routes where 3-pane fixed viewport with independent scrolling is active
  const isReaderPage =
    location.pathname.startsWith("/learn/problem-discovery-and-validation/") ||
    (/^\/learn\/[^/]+\/[^/]+/.test(location.pathname) && !location.pathname.startsWith("/learn/course/"));

  const isFixedLayout = isAuthPage || isReaderPage;

  return (
    <div
      className={`flex flex-col bg-surface text-on-surface font-body-md w-full max-w-full overflow-x-hidden ${
        isFixedLayout ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      <Navbar />
      <main
        className={`flex-1 pt-14 sm:pt-16 flex flex-col w-full max-w-full ${
          isFixedLayout
            ? "h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-hidden"
            : "overflow-x-hidden"
        }`}
      >
        {children}
      </main>
      {!isFixedLayout && <Footer />}
    </div>
  );
};
