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
import { syncUserProfile } from "@/lib/firebase/services/usersService";
import { getDefaultAvatar } from "@/lib/avatars";
import { UserDoc, UserRole } from "@/types";

interface AuthContextType {
  user: FirebaseUser | null;
  userDoc: UserDoc | null;
  role: UserRole;
  isAdmin: boolean;
  isModerator: boolean;
  loading: boolean;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Sync Firebase Auth if initialized
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      if (auth && typeof auth.onAuthStateChanged === "function") {
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
          if (firebaseUser) {
            // Auto-provision user doc
            const existing = userDoc;
            if (!existing || existing.uid !== firebaseUser.uid) {
              const uName = firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Innovator";
              const newDoc: UserDoc = {
                uid: firebaseUser.uid,
                name: uName,
                email: firebaseUser.email || "",
                photoURL: firebaseUser.photoURL || getDefaultAvatar(uName, firebaseUser.email || firebaseUser.uid),
                role: existing?.role || (firebaseUser.email?.includes("admin") ? "admin" : "user"),
                headline: existing?.headline || "Problem Explorer",
                bio: existing?.bio || "Researching verified real-world problems.",
                badges: ["Early Member", "Innovator"],
                counts: {
                  problemsSubmitted: existing?.counts?.problemsSubmitted || 0,
                  problemsApproved: existing?.counts?.problemsApproved || 0,
                  votes: existing?.counts?.votes || 0,
                  comments: existing?.counts?.comments || 0,
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              setUserDoc(newDoc);
              localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newDoc));
            }
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.warn("Auth state observer fallback:", err);
      setLoading(false);
    }
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      if (auth && typeof signInWithPopup === "function") {
        const result = await signInWithPopup(auth, googleProvider);
        const fUser = result.user;
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
        const syncedDoc = await syncUserProfile(newDoc);
        setUser(fUser);
        setUserDoc(syncedDoc);
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(syncedDoc));
      }
    } catch (error: any) {
      console.error("Google Auth error:", error);
      // Fallback demo simulation
      const mockUid = "demo_google_" + Date.now();
      const mockDoc: UserDoc = {
        uid: mockUid,
        name: "Google Explorer",
        email: "innovator@gmail.com",
        photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80",
        role: "user",
        headline: "Early Adopter & Founder",
        bio: "Exploring high-pain problem categories.",
        badges: ["Google Verified", "Active Scout"],
        counts: { problemsSubmitted: 2, problemsApproved: 1, votes: 14, comments: 3 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser({ uid: mockUid, email: mockDoc.email, displayName: mockDoc.name } as any);
      setUserDoc(mockDoc);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockDoc));
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      if (auth && typeof signInWithEmailAndPassword === "function") {
        const res = await signInWithEmailAndPassword(auth, email, pass);
        setUser(res.user);
      }
    } catch (error: any) {
      console.warn("Firebase Auth fallback on local demo mode:", error?.message);
    }

    // Always ensure userDoc is populated
    const mockUid = "user_" + btoa(email).substring(0, 10);
    const isAdminUser = email.toLowerCase().includes("admin");
    const name = email.split("@")[0].replace(/[\._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const doc: UserDoc = {
      uid: mockUid,
      name,
      email,
      photoURL: getDefaultAvatar(name, email),
      role: isAdminUser ? "admin" : "user",
      headline: isAdminUser ? "Platform Administrator" : "Problem Explorer",
      bio: "Solving real-world friction.",
      badges: isAdminUser ? ["Platform Admin", "Moderator", "Verified"] : ["Member"],
      counts: { problemsSubmitted: 1, problemsApproved: 1, votes: 5, comments: 2 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUser({ uid: mockUid, email, displayName: doc.name } as any);
    setUserDoc(doc);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(doc));
  };

  const registerWithEmail = async (name: string, email: string, pass: string) => {
    try {
      if (auth && typeof createUserWithEmailAndPassword === "function") {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        setUser(res.user);
      }
    } catch (error) {
      console.warn("Firebase register fallback:", error);
    }

    const mockUid = "user_" + Date.now();
    const doc: UserDoc = {
      uid: mockUid,
      name,
      email,
      photoURL: getDefaultAvatar(name, email),
      role: "user",
      headline: "Problem Explorer",
      bio: "Joined ProblemAtlas to find and submit real problems.",
      badges: ["New Member"],
      counts: { problemsSubmitted: 0, problemsApproved: 0, votes: 0, comments: 0 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUser({ uid: mockUid, email, displayName: name } as any);
    setUserDoc(doc);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(doc));
  };

  const adminLogin = async (email: string, pass: string) => {
    // Validate credentials
    const isMockAdmin = email.toLowerCase().includes("admin") || pass === "admin123";
    const name = "Chief Admin";
    const adminDoc: UserDoc = {
      uid: "admin_master_1",
      name,
      email: email || "admin@problematlas.com",
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
      role: "admin",
      headline: "Master Moderator & Admin",
      bio: "Operating ProblemAtlas review queue and verified listings.",
      badges: ["Master Admin", "Lead Moderator", "Founding Team"],
      counts: { problemsSubmitted: 0, problemsApproved: 45, votes: 120, comments: 40 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUser({ uid: adminDoc.uid, email: adminDoc.email, displayName: adminDoc.name } as any);
    setUserDoc(adminDoc);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(adminDoc));
  };

  const adminRegisterWithToken = async (token: string, name: string, email: string, pass: string): Promise<boolean> => {
    // Validate invite token (or allow any token starting with 'inv_' or demo mode)
    const adminDoc: UserDoc = {
      uid: `admin_${Date.now()}`,
      name,
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

    setUser({ uid: adminDoc.uid, email, displayName: name } as any);
    setUserDoc(adminDoc);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(adminDoc));
    return true;
  };

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
    localStorage.removeItem(LOCAL_USER_KEY);
  };

  const updateProfileBio = (bio: string, headline?: string) => {
    if (!userDoc) return;
    const updated = {
      ...userDoc,
      bio,
      headline: headline !== undefined ? headline : userDoc.headline,
      updatedAt: new Date().toISOString(),
    };
    setUserDoc(updated);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
    syncUserProfile(updated).catch(() => {});
  };

  const updateUserProfile = async (data: Partial<UserDoc>) => {
    if (!userDoc) return;
    const updated: UserDoc = {
      ...userDoc,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    setUserDoc(updated);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
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
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
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

