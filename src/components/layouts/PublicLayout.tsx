import React from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface font-body-md">
      <Navbar />
      <main className="flex-1 pt-16 flex flex-col">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
};
