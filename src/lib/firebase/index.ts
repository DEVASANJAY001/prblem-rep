/**
 * Public re-export of client-side Firebase instances.
 * Single source of truth: all Firebase initialization happens in ./config.ts
 * which sets up IndexedDB persistence via initializeFirestore().
 *
 * Safe to import in any client component.
 * Do NOT import anything from ./admin here (that was a Next.js server-only file,
 * removed since this is a Vite SPA).
 */
export { app, auth, db, storage, googleProvider, firebaseConfig } from "./config";

/**
 * Analytics is only available in browser environments.
 * Call this lazily — do NOT import at module level.
 */
export async function getFirebaseAnalytics() {
  const { getAnalytics, isSupported } = await import("firebase/analytics");
  if (typeof window === "undefined") return null;
  const supported = await isSupported();
  if (!supported) return null;
  const { app } = await import("./config");
  return getAnalytics(app);
}
