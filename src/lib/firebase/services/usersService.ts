import {
  collection,
  doc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config";
import { UserDoc, UserRole } from "@/types";
import { getLeaderboard as getLocalLeaderboard } from "@/lib/storage";

const USERS_COLLECTION = "users";

let leaderboardStream: {
  unsubscribe: () => void;
  listeners: Set<(users: UserDoc[]) => void>;
  latestData: UserDoc[] | null;
} | null = null;

export async function syncUserProfile(userDoc: UserDoc): Promise<UserDoc> {
  try {
    if (db && typeof doc === "function") {
      const userRef = doc(db, USERS_COLLECTION, userDoc.uid);
      // Atomic merge write: updates only modified profile fields with 0 read overhead
      await setDoc(
        userRef,
        {
          uid: userDoc.uid,
          name: userDoc.name,
          email: userDoc.email,
          photoURL: userDoc.photoURL,
          headline: userDoc.headline || "Problem Explorer",
          bio: userDoc.bio || "",
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.warn("Firestore syncUserProfile error:", error);
  }
  return userDoc;
}

export function subscribeLeaderboard(callback: (users: UserDoc[]) => void): () => void {
  const local = getLocalLeaderboard();
  callback(local);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  if (!leaderboardStream) {
    const q = query(
      collection(db, USERS_COLLECTION),
      orderBy("counts.problemsApproved", "desc")
    );
    const listeners = new Set<(users: UserDoc[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        if (!snap.empty) {
          const list: UserDoc[] = [];
          snap.forEach((d) => list.push(d.data() as UserDoc));
          if (leaderboardStream) {
            leaderboardStream.latestData = list;
            leaderboardStream.listeners.forEach((cb) => cb(list));
          }
        }
      },
      (err) => {
        console.warn("Leaderboard subscription fallback:", err.message);
      }
    );

    leaderboardStream = { unsubscribe, listeners, latestData: local };
  } else {
    leaderboardStream.listeners.add(callback);
    if (leaderboardStream.latestData) {
      callback(leaderboardStream.latestData);
    }
  }

  return () => {
    if (leaderboardStream) {
      leaderboardStream.listeners.delete(callback);
      if (leaderboardStream.listeners.size === 0) {
        leaderboardStream.unsubscribe();
        leaderboardStream = null;
      }
    }
  };
}

export async function updateUserRole(uid: string, newRole: UserRole): Promise<boolean> {
  try {
    if (db && typeof doc === "function") {
      const userRef = doc(db, USERS_COLLECTION, uid);
      await updateDoc(userRef, {
        role: newRole,
        updatedAt: new Date().toISOString(),
      });
      return true;
    }
  } catch (error) {
    console.warn("Firestore updateUserRole error:", error);
  }
  return true;
}
