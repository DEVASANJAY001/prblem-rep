import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

/** Sign in with Google popup, then post ID token to session route. */
export async function signInWithGoogle(): Promise<UserCredential> {
  const credential = await signInWithPopup(auth, googleProvider);
  await createSession(credential);
  return credential;
}

/** Sign in with email + password, then post ID token to session route. */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  await createSession(credential);
  return credential;
}

/** Register with email + password + display name, then create session. */
export async function signUpWithEmail(
  name: string,
  email: string,
  password: string
): Promise<UserCredential> {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  // Set display name on the Firebase Auth profile
  await updateProfile(credential.user, { displayName: name });
  await createSession(credential);
  return credential;
}

/** Sign out client-side and clear session cookie server-side. */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
  await fetch("/api/auth/signout", { method: "POST" });
}

// ─── Internal helper ────────────────────────────────────────

async function createSession(credential: UserCredential): Promise<void> {
  const idToken = await credential.user.getIdToken();
  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    throw new Error("Failed to create session");
  }
}
