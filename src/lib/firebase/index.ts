/**
 * Public re-export of client-side Firebase instances.
 * Safe to import in Client Components and Server Components.
 * Do NOT re-export anything from ./admin here.
 */
export { firebaseApp, auth, db, storage, getFirebaseAnalytics } from "./client";
