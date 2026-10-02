import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/config";
import {
  getUserDoc,
  createUserDoc,
  syncUserProfile,
} from "@/lib/firebase/services/usersService";
import { validateAndUseInvite } from "@/lib/firebase/services/adminService";
import { getDefaultAvatar } from "@/lib/avatars";
import { UserDoc, UserRole } from "@/types";

interface AuthContextType {
  user: FirebaseUser | null;
  userDoc: UserDoc | null;
  role: UserRole;
  isAdmin: boolean;
  isModerator: boolean;
  loading: boolean;
  /** True only after userDoc.role has been confirmed from Firestore (not just localStorage cache). */
  userDocVerified: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, pass: string) => Promise<void>;
  adminLogin: (email: string, pass: string) => Promise<void>;
  adminRegisterWithToken: (token: string, name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfileBio: (bio: string, headline?: string) => void;
  updateUserProfile: (data: Partial<UserDoc>) => Promise<void>;
  updateProfilePhoto: (photoURL: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = "prblms_current_user_doc_v1";

function readLocalUser(): UserDoc | null {
  try {
    const stored = localStorage.getItem(LOCAL_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userDoc, setUserDocState] = useState<UserDoc | null>(readLocalUser);
  const [loading, setLoading] = useState(true);
  // Starts false — becomes true after Firestore confirms the role for the current user.
  // Prevents the localStorage cache bypass window on admin routes.
  const [userDocVerified, setUserDocVerified] = useState(false);
  // Tracks UIDs whose userDoc was just written by a sign-in method (loginWithGoogle,
  // registerWithEmail) so onAuthStateChanged skips the redundant Firestore re-read.
  const justSignedInRef = React.useRef<Set<string>>(new Set());

  function setUserDoc(doc: UserDoc | null) {
    setUserDocState(doc);
    if (doc) {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(doc));
    } else {
      localStorage.removeItem(LOCAL_USER_KEY);
    }
  }

  // â”€â”€ Auth State Observer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      if (auth && typeof auth.onAuthStateChanged === "function") {
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          // Named async handler with .catch() to prevent silent unhandled rejections.
          const handleAuthChange = async () => {
            setUser(firebaseUser);

            if (firebaseUser) {
              // Skip redundant Firestore read if loginWithGoogle/registerWithEmail
              // already fetched or created the doc in the same event loop.
              if (justSignedInRef.current.has(firebaseUser.uid)) {
                justSignedInRef.current.delete(firebaseUser.uid);
                setUserDocVerified(true);
                setLoading(false);
                return;
              }

              // 1. Instantly hydrate from local cache if same user (fast paint)
              const cached = readLocalUser();
              if (cached && cached.uid === firebaseUser.uid) {
                setUserDocState(cached);
                setLoading(false);
                // Refresh role & data from Firestore in background; verify once confirmed
                getUserDoc(firebaseUser.uid)
                  .then((fresh) => {
                    if (fresh) {
                      setUserDoc(fresh);
                      setUserDocVerified(true);
                    }
                  })
                  .catch(() => {});
              } else {
                // Different or missing user â€” fetch from Firestore
                try {
                  const firestoreDoc = await getUserDoc(firebaseUser.uid);
                  if (firestoreDoc) {
                    setUserDoc(firestoreDoc);
                    setUserDocVerified(true);
                  } else {
                    // Brand-new user â€” create a minimal doc (role defaults to "user")
                    const uName =
                      firebaseUser.displayName ||
                      firebaseUser.email?.split("@")[0] ||
                      "Innovator";
                    const newDoc: UserDoc = {
                      uid: firebaseUser.uid,
                      name: uName,
                      email: firebaseUser.email || "",
                      photoURL:
                        firebaseUser.photoURL ||
                        getDefaultAvatar(uName, firebaseUser.email || firebaseUser.uid),
                      role: "user",
                      headline: "Problem Explorer",
                      bio: "",
                      badges: ["Early Member"],
                      counts: {
                        problemsSubmitted: 0,
                        problemsApproved: 0,
                        votes: 0,
                        comments: 0,
                      },
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                    };
                    setUserDoc(newDoc);
                    createUserDoc(newDoc).catch(() => {});
                  }
                } catch {
                  // Firestore unavailable â€” fall back to cache
                  if (cached) setUserDocState(cached);
                }
                setLoading(false);
              }
            } else {
              // Signed out
              setUserDocState(null);
              localStorage.removeItem(LOCAL_USER_KEY);
              setLoading(false);
            }
          };

          handleAuthChange().catch((err) => {
            console.warn("Auth state handler error:", err);
            setLoading(false);
          });
        });
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.warn("Auth state observer error:", err);
      setLoading(false);
    }
    return () => unsubscribe();
  }, []);

  // â”€â”€ Google Sign-In â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const fUser = result.user;

    // Check if a Firestore doc already exists for this Google account
    const existing = await getUserDoc(fUser.uid);
    if (!existing) {
      const uName = fUser.displayName || fUser.email?.split("@")[0] || "Innovator";
      const newDoc: UserDoc = {
        uid: fUser.uid,
        name: uName,
        email: fUser.email || "",
        photoURL: fUser.photoURL || getDefaultAvatar(uName, fUser.email || fUser.uid),
        role: "user",
        headline: "Problem Explorer & Innovator",
        bio: "Passionate about finding problems worth solving.",
        badges: ["Google Verified", "Early Member"],
        counts: { problemsSubmitted: 0, problemsApproved: 0, votes: 0, comments: 0 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await createUserDoc(newDoc);
      setUserDoc(newDoc);
    } else {
      setUserDoc(existing);
    }
    // Mark this UID so onAuthStateChanged skips a redundant Firestore re-read.
    // The doc was just fetched/created above — no need to read it again.
    justSignedInRef.current.add(fUser.uid);
  };

  // â”€â”€ Email / Password Sign-In â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const loginWithEmail = async (email: string, pass: string) => {
    // Throws on wrong credentials â€” no mock fallback
    await signInWithEmailAndPassword(auth, email, pass);
    // onAuthStateChanged handles userDoc hydration
  };

  // â”€â”€ Email / Password Registration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const registerWithEmail = async (name: string, email: string, pass: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    const uName = name.trim() || res.user.email?.split("@")[0] || "Innovator";
    const newDoc: UserDoc = {
      uid: res.user.uid,
      name: uName,
      email: res.user.email || email,
      photoURL: getDefaultAvatar(uName, email),
      role: "user",
      headline: "Problem Explorer",
      bio: "Joined ProblemAtlas to find and submit real problems.",
      badges: ["New Member"],
      counts: { problemsSubmitted: 0, problemsApproved: 0, votes: 0, comments: 0 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUserDoc(newDoc);
    await createUserDoc(newDoc);
    // Mark so onAuthStateChanged skips redundant re-fetch
    justSignedInRef.current.add(res.user.uid);
  };

  // â”€â”€ Admin Sign-In (requires admin or moderator role in Firestore) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const adminLogin = async (email: string, pass: string) => {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    const firestoreDoc = await getUserDoc(res.user.uid);

    if (
      !firestoreDoc ||
      (firestoreDoc.role !== "admin" && firestoreDoc.role !== "moderator")
    ) {
      // Sign the user back out â€” they don't have admin access
      await firebaseSignOut(auth);
      throw new Error(
        "This account does not have admin access. Contact the platform owner to grant permissions."
      );
    }
    // onAuthStateChanged will hydrate the admin userDoc
  };

  // â”€â”€ Admin Registration with Invite Token â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const adminRegisterWithToken = async (
    token: string,
    name: string,
    email: string,
    pass: string
  ): Promise<boolean> => {
    // 1. Validate invite token (checks Firestore + local store)
    const isValid = await validateAndUseInvite(token);
    if (!isValid) return false;

    // 2. Create a real Firebase Auth account
    const res = await createUserWithEmailAndPassword(auth, email, pass);

    // 3. Write admin user doc to Firestore with role: "admin"
    const adminDoc: UserDoc = {
      uid: res.user.uid,
      name: name.trim(),
      email,
      photoURL: getDefaultAvatar(name, email),
      role: "admin",
      headline: "Verified Administrator",
      bio: "Authorized platform administrator.",
      badges: ["Invited Admin", "Moderator"],
      counts: { problemsSubmitted: 0, problemsApproved: 0, votes: 0, comments: 0 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUserDoc(adminDoc);

    try {
      await createUserDoc(adminDoc);
      // Set Firebase Auth custom claim so Firestore rules work.
      // The rules check `request.auth.token.role == 'admin'` which requires a
      // custom claim — writing only to the Firestore doc is not enough.
      try {
        const idToken = await res.user.getIdToken();
        const backendBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
        const claimRes = await fetch(`${backendBase}/api/admin/set-claims`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
          body: JSON.stringify({ targetUid: res.user.uid, role: 'admin' }),
        });
        if (claimRes.ok) {
          await res.user.getIdToken(true);
        } else {
          console.warn('[AdminReg] set-claims API non-OK:', claimRes.status);
        }
      } catch (claimErr) {
        console.warn('[AdminReg] Could not set custom claims:', claimErr);
      }
    } catch (err) {
      // Rollback: createUserDoc failed after auth account was created.
      // Sign out the orphaned Firebase Auth account to keep state consistent.
      console.error("Admin registration failed after Firebase Auth creation. Rolling back:", err);
      setUserDoc(null);
      try {
        await firebaseSignOut(auth);
      } catch {
        // Ignore sign-out error during rollback
      }
      throw new Error("Admin registration failed. Please try again.");
    }

    return true;
  };

  // â”€â”€ Sign-Out â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const logout = async () => {
    try {
      if (auth && typeof firebaseSignOut === "function") {
        await firebaseSignOut(auth);
      }
    } catch (e) {
      console.warn("SignOut error:", e);
    }
    setUser(null);
    setUserDoc(null);
  };

  // â”€â”€ Profile Mutations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const updateProfileBio = (bio: string, headline?: string) => {
    if (!userDoc) return;
    const updated: UserDoc = {
      ...userDoc,
      bio,
      headline: headline !== undefined ? headline : userDoc.headline,
      updatedAt: new Date().toISOString(),
    };
    setUserDoc(updated);
    syncUserProfile(updated).catch(() => {});
  };

  const updateUserProfile = async (data: Partial<UserDoc>) => {
    if (!userDoc) return;
    const updated: UserDoc = {
      ...userDoc,
      ...data,
      // Prevent client from elevating their own role via this method
      role: userDoc.role,
      updatedAt: new Date().toISOString(),
    };
    setUserDoc(updated);
    await syncUserProfile(updated);
  };

  const updateProfilePhoto = async (photoURL: string) => {
    if (!userDoc) return;
    const updated: UserDoc = {
      ...userDoc,
      photoURL,
      updatedAt: new Date().toISOString(),
    };
    setUserDoc(updated);
    await syncUserProfile(updated);
  };

  const role: UserRole = userDoc?.role || "user";
  const isAdmin = role === "admin";
  const isModerator = role === "moderator" || role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        userDoc,
        role,
        isAdmin,
        isModerator,
        loading,
        userDocVerified,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        adminLogin,
        adminRegisterWithToken,
        logout,
        updateProfileBio,
        updateUserProfile,
        updateProfilePhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
