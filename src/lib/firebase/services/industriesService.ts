import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config";
import { IndustryDoc } from "@/types";
import {
  getIndustries as getLocalIndustries,
  setLocalIndustries,
  saveIndustry as saveLocalIndustry,
  deleteIndustry as deleteLocalIndustry,
  toggleIndustryVisibility as toggleLocalVisibility,
  reorderIndustries as reorderLocalIndustries,
} from "@/lib/storage";
import { REAL_INDUSTRIES } from "@/data/realProductionData";

import { sanitizeAndSeparateIndustries } from "@/lib/algorithms/domainIntelligence";

const COLLECTION_NAME = "industries";

let industriesStream: {
  unsubscribe: () => void;
  listeners: Set<(industries: IndustryDoc[]) => void>;
  latestData: IndustryDoc[] | null;
} | null = null;

export function subscribeIndustries(
  callback: (industries: IndustryDoc[]) => void
): () => void {
  // Emit local instantly (sanitized)
  const local = sanitizeAndSeparateIndustries(getLocalIndustries());
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
          const sanitized = sanitizeAndSeparateIndustries(list);
          setLocalIndustries(sanitized);
          if (industriesStream) {
            industriesStream.latestData = sanitized;
            industriesStream.listeners.forEach((cb) => cb(sanitized));
          }
        } else {
          // If Firestore is empty, seed with initial clean standalone industries
          const seedList = sanitizeAndSeparateIndustries(REAL_INDUSTRIES);
          seedList.forEach(async (ind) => {
            try {
              const docId = ind.id || `ind-${ind.slug}`;
              await setDoc(doc(db, COLLECTION_NAME, docId), ind, { merge: true });
            } catch {}
          });
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
        try {
          industriesStream.unsubscribe();
        } catch (e) {
          console.warn("Industries unsubscribe notice:", e);
        }
        industriesStream = null;
      }
    }
  };
}

export async function getIndustries(): Promise<IndustryDoc[]> {
  const local = sanitizeAndSeparateIndustries(getLocalIndustries());
  try {
    if (db && typeof collection === "function") {
      const colRef = collection(db, COLLECTION_NAME);
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const list: IndustryDoc[] = [];
        snap.forEach((d) => list.push(d.data() as IndustryDoc));
        const sanitized = sanitizeAndSeparateIndustries(list);
        sanitized.forEach((i) => saveLocalIndustry(i));
        return sanitized;
      }
    }
  } catch (err) {
    console.warn("Firestore getIndustries deferred to local dataset");
  }
  return local;
}

export interface PaginatedIndustriesResult {
  industries: IndustryDoc[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  totalLoaded: number;
}

/**
 * Optimized paginated fetch for industries:
 * Fetches exactly `pageSize` (default 15) documents from Firestore using cursor-based
 * pagination (`limit`, `orderBy`, `startAfter`), drastically minimizing read/write operations
 * and database costs compared to full collection listeners.
 */
export async function fetchIndustriesBatch(
  pageSize: number = 15,
  lastDocSnapshot: QueryDocumentSnapshot<DocumentData> | null = null,
  offsetIndex: number = 0
): Promise<PaginatedIndustriesResult> {
  try {
    if (db && typeof collection === "function") {
      const colRef = collection(db, COLLECTION_NAME);
      const constraints: any[] = [orderBy("name", "asc")];
      if (lastDocSnapshot) {
        constraints.push(startAfter(lastDocSnapshot));
      }
      constraints.push(limit(pageSize));

      const q = query(colRef, ...constraints);
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const rawList: IndustryDoc[] = [];
        snapshot.forEach((d) => {
          const docData = d.data() as IndustryDoc;
          if (!docData.hidden) {
            rawList.push(docData);
          }
        });
        const sanitized = sanitizeAndSeparateIndustries(rawList);
        const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
        const hasMore = snapshot.docs.length >= pageSize;

        return {
          industries: sanitized,
          lastDoc,
          hasMore,
          totalLoaded: sanitized.length,
        };
      }
    }
  } catch (err) {
    console.warn("Firestore fetchIndustriesBatch deferred to local dataset:", err);
  }

  // Graceful fallback to local storage / REAL_INDUSTRIES dataset chunked by offset
  const allLocal = sanitizeAndSeparateIndustries(getLocalIndustries()).filter((i) => !i.hidden);
  const slice = allLocal.slice(offsetIndex, offsetIndex + pageSize);
  const hasMore = offsetIndex + pageSize < allLocal.length;

  return {
    industries: slice,
    lastDoc: null,
    hasMore,
    totalLoaded: slice.length,
  };
}

export async function getIndustryBySlug(slug: string): Promise<IndustryDoc | null> {
  const all = await getIndustries();
  return all.find((i) => i.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function saveIndustryToFirestore(industry: IndustryDoc): Promise<IndustryDoc> {
  const saved = saveLocalIndustry(industry);
  try {
    if (db && typeof doc === "function") {
      const docId = saved.id || (saved.slug.startsWith("ind-") ? saved.slug : `ind-${saved.slug}`);
      const indRef = doc(db, COLLECTION_NAME, docId);
      await setDoc(indRef, {
        ...saved,
        id: docId,
        updatedAtServer: serverTimestamp(),
      }, { merge: true });
    }
  } catch (error) {
    console.warn("Firestore saveIndustry deferred:", error);
  }
  return saved;
}

export async function bulkSaveIndustriesToFirestore(
  industriesList: IndustryDoc[]
): Promise<{ total: number; success: number }> {
  let success = 0;
  for (const ind of industriesList) {
    try {
      await saveIndustryToFirestore(ind);
      success++;
    } catch (err) {
      console.warn("Error saving industry in bulk:", ind.name, err);
    }
  }
  return { total: industriesList.length, success };
}

export async function deleteIndustryFromFirestore(slug: string): Promise<boolean> {
  const local = deleteLocalIndustry(slug);
  try {
    if (db && typeof doc === "function") {
      const candidates = [slug, `ind-${slug}`, slug.replace(/^ind-/, "")];
      for (const id of candidates) {
        try {
          await deleteDoc(doc(db, COLLECTION_NAME, id));
        } catch {}
      }
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
      const candidates = [slug, `ind-${slug}`, slug.replace(/^ind-/, "")];
      for (const id of candidates) {
        try {
          await updateDoc(doc(db, COLLECTION_NAME, id), {
            hidden: newHidden,
            updatedAt: new Date().toISOString(),
          });
          break;
        } catch {}
      }
    }
  } catch (error) {
    console.warn("Firestore toggleIndustryVisibility deferred:", error);
  }
  return newHidden;
}
