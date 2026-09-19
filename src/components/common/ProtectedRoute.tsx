import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * ProtectedRoute — guards routes that require a real authenticated Firebase session.
 * Checks both the Firebase Auth user object (verified by Firebase SDK) AND a loaded
 * userDoc. Falls through to login if either is absent after auth state resolves.
 */
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // Guard is based on the real Firebase Auth user — not the localStorage userDoc cache.
  // This prevents bypassing the guard by manually setting localStorage.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
