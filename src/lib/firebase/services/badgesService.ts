import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config";
import { BadgeDoc, UserDoc } from "@/types";
import {
  getBadgesFromStorage,
  saveBadgeToStorage,
  deleteBadgeFromStorage,
  grantBadgeToUserInStorage,
  revokeBadgeFromUserInStorage,
} from "@/lib/storage";

const COLLECTION_NAME = "badges";

let badgesStream: {
  unsubscribe: () => void;
  listeners: Set<(badges: BadgeDoc[]) => void>;
  latestData: BadgeDoc[] | null;
} | null = null;

export function subscribeBadges(
  callback: (badges: BadgeDoc[]) => void
): () => void {
  const local = getBadgesFromStorage();
  callback(local);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  if (!badgesStream) {
    const colRef = collection(db, COLLECTION_NAME);
    const listeners = new Set<(badges: BadgeDoc[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: BadgeDoc[] = [];
          snapshot.forEach((d) => list.push(d.data() as BadgeDoc));
          list.forEach((b) => saveBadgeToStorage(b));
          if (badgesStream) {
            badgesStream.latestData = list;
            badgesStream.listeners.forEach((cb) => cb(list));
          }
        }
      },
      (err) => {
        console.warn("Badges Firestore subscription fallback:", err.message);
      }
    );

    badgesStream = { unsubscribe, listeners, latestData: local };
  } else {
    badgesStream.listeners.add(callback);
    if (badgesStream.latestData) {
      callback(badgesStream.latestData);
    }
  }

  return () => {
    if (badgesStream) {
      badgesStream.listeners.delete(callback);
      if (badgesStream.listeners.size === 0) {
        badgesStream.unsubscribe();
        badgesStream = null;
      }
    }
  };
}

export async function getBadges(): Promise<BadgeDoc[]> {
  const local = getBadgesFromStorage();
  try {
    if (db && typeof collection === "function") {
      const colRef = collection(db, COLLECTION_NAME);
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const list: BadgeDoc[] = [];
        snap.forEach((d) => list.push(d.data() as BadgeDoc));
        list.forEach((b) => saveBadgeToStorage(b));
        return list;
      }
    }
  } catch (err) {
    console.warn("Firestore getBadges deferred to local dataset");
  }
  return local;
}

export async function createBadge(
  data: Omit<BadgeDoc, "id" | "createdAt">
): Promise<string> {
  const id = `badge-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const now = new Date().toISOString();

  const newBadge: BadgeDoc = {
    ...data,
    id,
    slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    createdAt: now,
    updatedAt: now,
    awardedCount: 0,
    isActive: data.isActive !== undefined ? data.isActive : true,
  };

  saveBadgeToStorage(newBadge);

  try {
    if (db && typeof doc === "function") {
      const docRef = doc(db, COLLECTION_NAME, id);
      await setDoc(docRef, {
        ...newBadge,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (err) {
    console.warn("Firestore createBadge deferred to local cache:", err);
  }

  return id;
}

export async function updateBadge(
  id: string,
  updates: Partial<BadgeDoc>
): Promise<void> {
  const local = getBadgesFromStorage();
  const found = local.find((b) => b.id === id);
  if (found) {
    const updated = { ...found, ...updates, updatedAt: new Date().toISOString() };
    saveBadgeToStorage(updated);
  }

  try {
    if (db && typeof doc === "function") {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (err) {
    console.warn("Firestore updateBadge deferred to local cache:", err);
  }
}

export async function deleteBadge(id: string): Promise<void> {
  deleteBadgeFromStorage(id);

  try {
    if (db && typeof doc === "function") {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    }
  } catch (err) {
    console.warn("Firestore deleteBadge deferred to local cache:", err);
  }
}

export async function grantBadgeToUser(
  uid: string,
  badgeName: string
): Promise<void> {
  grantBadgeToUserInStorage(uid, badgeName);

  try {
    if (db && typeof doc === "function") {
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const userData = snap.data() as UserDoc;
        const currentBadges = userData.badges || [];
        if (!currentBadges.includes(badgeName)) {
          await updateDoc(userRef, {
            badges: [...currentBadges, badgeName],
            updatedAt: serverTimestamp(),
          });
        }
      }
    }
  } catch (err) {
    console.warn("Firestore grantBadgeToUser deferred to storage:", err);
  }
}

export async function revokeBadgeFromUser(
  uid: string,
  badgeName: string
): Promise<void> {
  revokeBadgeFromUserInStorage(uid, badgeName);

  try {
    if (db && typeof doc === "function") {
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const userData = snap.data() as UserDoc;
        const currentBadges = userData.badges || [];
        await updateDoc(userRef, {
          badges: currentBadges.filter((b) => b !== badgeName),
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (err) {
    console.warn("Firestore revokeBadgeFromUser deferred to storage:", err);
  }
}

/**
 * Evaluates a user's real activities against all active badges.
 * Automatically grants any badge whose task requirements are satisfied.
 */
export async function evaluateAndAwardUserBadges(
  uid: string,
  currentBadges: string[],
  stats: {
    problemsSubmitted: number;
    solutionsBuilt: number;
    votesReceived: number;
    dataPointsCount?: number;
    maxTamDollars?: number;
    criticalCount?: number;
    commentsCount?: number;
    bountiesCount?: number;
  }
): Promise<string[]> {
  const allBadges = getBadgesFromStorage();
  const newlyAwarded: string[] = [];

  for (const badge of allBadges) {
    if (!badge.isActive) continue;
    if (currentBadges.includes(badge.name)) continue;

    let isCompleted = false;

    switch (badge.taskType) {
      case "problems_submitted":
        if (stats.problemsSubmitted >= badge.taskThreshold) {
          isCompleted = true;
        }
        break;
      case "solutions_built":
        if (stats.solutionsBuilt >= badge.taskThreshold) {
          isCompleted = true;
        }
        break;
      case "votes_received":
        if (stats.votesReceived >= badge.taskThreshold) {
          isCompleted = true;
        }
        break;
      case "evidence_attached":
        if ((stats.dataPointsCount || 0) >= badge.taskThreshold) {
          isCompleted = true;
        }
        break;
      case "tam_modeled":
        if ((stats.maxTamDollars || 0) >= badge.taskThreshold) {
          isCompleted = true;
        }
        break;
      case "critical_problems":
        if ((stats.criticalCount || 0) >= badge.taskThreshold) {
          isCompleted = true;
        }
        break;
      case "comments_posted":
        if ((stats.commentsCount || 0) >= badge.taskThreshold) {
          isCompleted = true;
        }
        break;
      case "bounties_joined":
        if ((stats.bountiesCount || 0) >= badge.taskThreshold) {
          isCompleted = true;
        }
        break;
      default:
        break;
    }

    if (isCompleted) {
      await grantBadgeToUser(uid, badge.name);
      newlyAwarded.push(badge.name);
    }
  }

  return newlyAwarded;
}
