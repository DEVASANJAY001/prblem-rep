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

/**
 * AdminRoute — guards admin-only routes.
 *
 * Critical security note: we wait for `userDocVerified` to be true before
 * granting access. Without this, an attacker who manually sets localStorage
 * with role:"admin" could access the admin panel during the brief window
 * before Firestore confirms the real role. `userDocVerified` only becomes
 * true after the Firestore read completes and the role is confirmed from
 * the source of truth.
 */
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, isModerator, loading, userDocVerified } = useAuth();
  const location = useLocation();

  if (loading || !userDocVerified) {
    // Show spinner while either:
    // 1. Firebase Auth state is resolving (loading), OR
    // 2. Firestore hasn't confirmed the role yet (userDocVerified is false)
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin && !isModerator) {
    // Authenticated but not an admin/mod — redirect to home with a param
    // so the page can display an access-denied message.
    return <Navigate to="/?access=denied" replace />;
  }

  return <>{children}</>;
};
