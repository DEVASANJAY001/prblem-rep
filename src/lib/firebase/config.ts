import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB_u3gqJtkIogv7iZrJBTNLW3glo-PpgTs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "prblms-881bb.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "prblms-881bb",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "prblms-881bb.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "313159629487",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:313159629487:web:8bea75fe7ca079f78f325a",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0LVYDXFFTT",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
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
