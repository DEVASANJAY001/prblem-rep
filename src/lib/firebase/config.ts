import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
  Firestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// ─────────────────────────────────────────────────────────────────────────────
// Firebase Client Config — reads exclusively from VITE_* environment variables.
// Never hardcode credentials here; they get bundled into the public JS output.
//
// Local dev:  set values in .env (already in .gitignore — never commit .env)
// Vercel:     set via Project Settings → Environment Variables dashboard
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            as string,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        as string,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         as string,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             as string,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID     as string,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);

  // Initialize Firestore with Multi-Tab IndexedDB Persistence (0 read overhead for cached docs)
  try {
    if (typeof window !== "undefined" && typeof indexedDB !== "undefined") {
      db = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      });
    } else {
      db = getFirestore(app);
    }
  } catch {
    // If already initialized or unsupported, use getFirestore fallback
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

