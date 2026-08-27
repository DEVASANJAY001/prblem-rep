import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config";
import { IndustryDoc } from "@/types";
import {
  getIndustries as getLocalIndustries,
  saveIndustry as saveLocalIndustry,
  deleteIndustry as deleteLocalIndustry,
  toggleIndustryVisibility as toggleLocalVisibility,
  reorderIndustries as reorderLocalIndustries,
} from "@/lib/storage";

const COLLECTION_NAME = "industries";

let industriesStream: {
  unsubscribe: () => void;
  listeners: Set<(industries: IndustryDoc[]) => void>;
  latestData: IndustryDoc[] | null;
} | null = null;

export function subscribeIndustries(
  callback: (industries: IndustryDoc[]) => void
): () => void {
  // Emit local instantly
  const local = getLocalIndustries();
  callback(local);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  if (!industriesStream) {
    const colRef = collection(db, COLLECTION_NAME);
    const listeners = new Set<(industries: IndustryDoc[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: IndustryDoc[] = [];
          snapshot.forEach((d) => list.push(d.data() as IndustryDoc));
          list.forEach((i) => saveLocalIndustry(i));
          if (industriesStream) {
            industriesStream.latestData = list;
            industriesStream.listeners.forEach((cb) => cb(list));
          }
        }
      },
      (err) => {
        console.warn("Industries Firestore subscription fallback:", err.message);
      }
    );

    industriesStream = { unsubscribe, listeners, latestData: local };
  } else {
    industriesStream.listeners.add(callback);
    if (industriesStream.latestData) {
      callback(industriesStream.latestData);
    }
  }

  return () => {
    if (industriesStream) {
      industriesStream.listeners.delete(callback);
      if (industriesStream.listeners.size === 0) {
        industriesStream.unsubscribe();
        industriesStream = null;
      }
    }
  };
}

export async function getIndustries(): Promise<IndustryDoc[]> {
  const local = getLocalIndustries();
  try {
    if (db && typeof collection === "function") {
      const colRef = collection(db, COLLECTION_NAME);
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const list: IndustryDoc[] = [];
        snap.forEach((d) => list.push(d.data() as IndustryDoc));
        list.forEach((i) => saveLocalIndustry(i));
        return list;
      }
    }
  } catch (err) {
    console.warn("Firestore getIndustries deferred to local dataset");
  }
  return local;
}

export async function getIndustryBySlug(slug: string): Promise<IndustryDoc | null> {
  const all = await getIndustries();
  return all.find((i) => i.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function saveIndustryToFirestore(industry: IndustryDoc): Promise<IndustryDoc> {
  const saved = saveLocalIndustry(industry);
  try {
    if (db && typeof doc === "function") {
      const indRef = doc(db, COLLECTION_NAME, saved.id || saved.slug);
      await setDoc(indRef, {
        ...saved,
        updatedAtServer: serverTimestamp(),
      });
    }
  } catch (error) {
    console.warn("Firestore saveIndustry deferred:", error);
  }
  return saved;
}

export async function deleteIndustryFromFirestore(slug: string): Promise<boolean> {
  const local = deleteLocalIndustry(slug);
  try {
    if (db && typeof doc === "function") {
      const indRef = doc(db, COLLECTION_NAME, slug);
      await deleteDoc(indRef);
    }
  } catch (error) {
    console.warn("Firestore deleteIndustry deferred:", error);
  }
  return local;
}

export async function toggleIndustryVisibilityInFirestore(slug: string): Promise<boolean> {
  const newHidden = toggleLocalVisibility(slug);
  try {
    if (db && typeof doc === "function") {
      const indRef = doc(db, COLLECTION_NAME, slug);
      await updateDoc(indRef, {
        hidden: newHidden,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.warn("Firestore toggleIndustryVisibility deferred:", error);
  }
  return newHidden;
}
