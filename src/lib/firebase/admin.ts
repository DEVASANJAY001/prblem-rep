/**
 * Firebase Admin SDK — SERVER ONLY.
 *
 * This file is guarded by the `server-only` package, which causes a
 * build-time error if any Client Component tries to import it.
 * Never import this file in a component without the `"use client"` absence guarantee.
 */
import "server-only";

import {
  initializeApp,
  getApps,
  cert,
  App,
  getApp,
} from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let _adminApp: App | null = null;

function getAdminApp(): App {
  if (_adminApp) return _adminApp;
  if (getApps().length > 0) {
    _adminApp = getApp();
    return _adminApp;
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      [
        "Firebase Admin SDK is not configured.",
        "Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL,",
        "and FIREBASE_ADMIN_PRIVATE_KEY in your .env.local file.",
        "Download the service account JSON from Firebase Console →",
        "Project Settings → Service Accounts → Generate new private key.",
      ].join(" ")
    );
  }

  _adminApp = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      // Replace literal \n with real newlines (common env var encoding issue)
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });

  return _adminApp;
}

/**
 * Lazy getters — initialization happens on first use at request time,
 * not at module import time (which would break `next build` if env vars are missing).
 */
export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}

// Convenience re-exports using getters
// Usage: const adminAuth = getAdminAuth(); const adminDb = getAdminDb();
export const adminAuth = new Proxy({} as Auth, {
  get(_target, prop) {
    return (getAdminAuth() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const adminDb = new Proxy({} as Firestore, {
  get(_target, prop) {
    return (getAdminDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
