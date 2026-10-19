import React from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={`flex flex-col bg-surface text-on-surface font-body-md ${isAuthPage ? "min-h-screen md:h-screen md:overflow-hidden" : "min-h-screen"}`}>
      <Navbar />
      <main className={`flex-1 pt-14 sm:pt-16 flex flex-col ${isAuthPage ? "md:h-[calc(100vh-4rem)] md:overflow-hidden" : ""}`}>{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
};
