import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../config";
import { ResearchDoc } from "@/types";
import { REAL_RESEARCH } from "@/data/realProductionData";

const COLLECTION_NAME = "research";

let researchStream: {
  unsubscribe: () => void;
  listeners: Set<(research: ResearchDoc[]) => void>;
  latestData: ResearchDoc[] | null;
} | null = null;

export function subscribeResearch(
  callback: (research: ResearchDoc[]) => void
): () => void {
  callback(REAL_RESEARCH);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  if (!researchStream) {
    const colRef = collection(db, COLLECTION_NAME);
    const listeners = new Set<(research: ResearchDoc[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: ResearchDoc[] = [];
          snapshot.forEach((d) => list.push(d.data() as ResearchDoc));
          if (researchStream) {
            researchStream.latestData = list;
            researchStream.listeners.forEach((cb) => cb(list));
          }
        }
      },
      (err) => {
        console.warn("Research Firestore subscription fallback:", err.message);
      }
    );

    researchStream = { unsubscribe, listeners, latestData: REAL_RESEARCH };
  } else {
    researchStream.listeners.add(callback);
    if (researchStream.latestData) {
      callback(researchStream.latestData);
    }
  }

  return () => {
    if (researchStream) {
      researchStream.listeners.delete(callback);
      if (researchStream.listeners.size === 0) {
        researchStream.unsubscribe();
        researchStream = null;
      }
    }
  };
}

export async function getResearch(): Promise<ResearchDoc[]> {
  try {
    if (db && typeof collection === "function") {
      const colRef = collection(db, COLLECTION_NAME);
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const list: ResearchDoc[] = [];
        snap.forEach((d) => list.push(d.data() as ResearchDoc));
        return list;
      }
    }
  } catch (err) {
    console.warn("Firestore getResearch deferred to local dataset");
  }
  return REAL_RESEARCH;
}
