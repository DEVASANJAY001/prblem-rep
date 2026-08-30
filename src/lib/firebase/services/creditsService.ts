import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../config";
import { CreditSourceDoc } from "@/types";
import {
  getCredits as getLocalCredits,
  saveCredit as saveLocalCredit,
  deleteCredit as deleteLocalCredit,
  toggleCreditActive as toggleLocalCreditActive,
  reorderCredits as reorderLocalCredits,
  DEFAULT_CREDITS,
} from "@/lib/storage";

const COLLECTION_NAME = "credits";

let creditsStream: {
  unsubscribe: () => void;
  listeners: Set<(credits: CreditSourceDoc[]) => void>;
  latestData: CreditSourceDoc[] | null;
} | null = null;

export function subscribeCredits(
  callback: (credits: CreditSourceDoc[]) => void,
  includeInactive = true
): () => void {
  // Emit local instantly
  const local = getLocalCredits(includeInactive);
  callback(local);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  if (!creditsStream) {
    const colRef = collection(db, COLLECTION_NAME);
    const listeners = new Set<(credits: CreditSourceDoc[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: CreditSourceDoc[] = [];
          snapshot.forEach((d) => list.push(d.data() as CreditSourceDoc));
          list.forEach((c) => saveLocalCredit(c));
          list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
          if (creditsStream) {
            creditsStream.latestData = list;
            creditsStream.listeners.forEach((cb) => cb(includeInactive ? list : list.filter((c) => c.isActive !== false)));
          }
        }
      },
      (err) => {
        console.warn("Credits Firestore subscription fallback:", err.message);
      }
    );

    creditsStream = { unsubscribe, listeners, latestData: local };
  } else {
    creditsStream.listeners.add(callback);
    if (creditsStream.latestData) {
      callback(includeInactive ? creditsStream.latestData : creditsStream.latestData.filter((c) => c.isActive !== false));
    }
  }

  return () => {
    if (creditsStream) {
      creditsStream.listeners.delete(callback);
      if (creditsStream.listeners.size === 0) {
        creditsStream.unsubscribe();
        creditsStream = null;
      }
    }
  };
}

export async function getCredits(includeInactive = true): Promise<CreditSourceDoc[]> {
  const local = getLocalCredits(includeInactive);
  try {
    if (db && typeof collection === "function") {
      const colRef = collection(db, COLLECTION_NAME);
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const list: CreditSourceDoc[] = [];
        snap.forEach((d) => list.push(d.data() as CreditSourceDoc));
        list.forEach((c) => saveLocalCredit(c));
        list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        return includeInactive ? list : list.filter((c) => c.isActive !== false);
      }
    }
  } catch (err) {
    console.warn("Firestore getCredits deferred to local dataset");
  }
  return local;
}

export async function saveCreditToFirestore(credit: CreditSourceDoc): Promise<void> {
  // Save local first for immediate UI reactivity
  saveLocalCredit(credit);
  try {
    if (db && typeof doc === "function" && typeof setDoc === "function") {
      const docRef = doc(db, COLLECTION_NAME, credit.id);
      await setDoc(docRef, {
        ...credit,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }
  } catch (err) {
    console.warn("Firestore saveCreditToFirestore failed, stored locally:", err);
  }
}

export async function deleteCreditFromFirestore(id: string): Promise<void> {
  // Delete local first
  deleteLocalCredit(id);
  try {
    if (db && typeof doc === "function" && typeof deleteDoc === "function") {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    }
  } catch (err) {
    console.warn("Firestore deleteCreditFromFirestore failed, deleted locally:", err);
  }
}

export async function toggleCreditActiveInFirestore(id: string, currentState: boolean): Promise<void> {
  toggleLocalCreditActive(id);
  try {
    if (db && typeof doc === "function" && typeof updateDoc === "function") {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        isActive: !currentState,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn("Firestore toggleCreditActiveInFirestore failed, updated locally:", err);
  }
}

export async function reorderCreditsInFirestore(orderedIds: string[]): Promise<void> {
  const updated = reorderLocalCredits(orderedIds);
  try {
    if (db && typeof doc === "function" && typeof updateDoc === "function") {
      for (const item of updated) {
        const docRef = doc(db, COLLECTION_NAME, item.id);
        await updateDoc(docRef, {
          order: item.order,
          updatedAt: new Date().toISOString(),
        });
      }
    }
  } catch (err) {
    console.warn("Firestore reorderCreditsInFirestore failed, saved locally:", err);
  }
}
