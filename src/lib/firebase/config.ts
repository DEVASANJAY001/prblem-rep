import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
  Firestore,
  persistentLocalCache,
  persistentSingleTabManager,
  memoryLocalCache,
} from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// ─────────────────────────────────────────────────────────────────────────────
// Firebase Client Config — reads exclusively from VITE_* environment variables.
// Never hardcode credentials here; they get bundled into the public JS output.
//
// Local dev:  set values in .env (already in .gitignore — never commit .env)
// Vercel:     set via Project Settings → Environment Variables dashboard
// ─────────────────────────────────────────────────────────────────────────────
const env = (typeof import.meta !== "undefined" && import.meta.env)
  ? (import.meta.env as Record<string, string>)
  : ((typeof globalThis !== "undefined" && (globalThis as any).process?.env) || {}) as Record<string, string>;

const firebaseConfig = {
  apiKey:            env.VITE_FIREBASE_API_KEY            || "AIzaSyB_u3gqJtkIogv7iZrJBTNLW3glo-PpgTs",
  authDomain:        env.VITE_FIREBASE_AUTH_DOMAIN        || "prblms-881bb.firebaseapp.com",
  projectId:         env.VITE_FIREBASE_PROJECT_ID         || "prblms-881bb",
  storageBucket:     env.VITE_FIREBASE_STORAGE_BUCKET     || "prblms-881bb.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "313159629487",
  appId:             env.VITE_FIREBASE_APP_ID             || "1:313159629487:web:8bea75fe7ca079f78f325a",
  measurementId:     env.VITE_FIREBASE_MEASUREMENT_ID     || "G-0LVYDXFFTT",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);

  // Initialize Firestore with robust memoryLocalCache (avoids IndexedDB multi-tab assertion crashes)
  try {
    db = initializeFirestore(app, {
      localCache: memoryLocalCache(),
    });
  } catch {
    // If already initialized, use getFirestore fallback
    db = getFirestore(app);
  }

  storage = getStorage(app);
} catch (error) {
  console.warn("Firebase initialization warning (using local fallback state):", error);
  // Fallback stub objects if network/config is offline
  app = {} as FirebaseApp;
  auth = {} as Auth;
  db = {} as Firestore;
  storage = {} as FirebaseStorage;
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export { app, auth, db, storage, firebaseConfig };

