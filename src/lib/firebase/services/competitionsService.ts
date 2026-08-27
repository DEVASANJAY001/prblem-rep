import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../config";
import { CompetitionDoc } from "@/types";
import { REAL_COMPETITIONS } from "@/data/realProductionData";

const COLLECTION_NAME = "competitions";

let competitionsStream: {
  unsubscribe: () => void;
  listeners: Set<(competitions: CompetitionDoc[]) => void>;
  latestData: CompetitionDoc[] | null;
} | null = null;

export function subscribeCompetitions(
  callback: (competitions: CompetitionDoc[]) => void
): () => void {
  callback(REAL_COMPETITIONS);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  if (!competitionsStream) {
    const colRef = collection(db, COLLECTION_NAME);
    const listeners = new Set<(competitions: CompetitionDoc[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: CompetitionDoc[] = [];
          snapshot.forEach((d) => list.push(d.data() as CompetitionDoc));
          if (competitionsStream) {
            competitionsStream.latestData = list;
            competitionsStream.listeners.forEach((cb) => cb(list));
          }
        }
      },
      (err) => {
        console.warn("Competitions Firestore subscription fallback:", err.message);
      }
    );

    competitionsStream = { unsubscribe, listeners, latestData: REAL_COMPETITIONS };
  } else {
    competitionsStream.listeners.add(callback);
    if (competitionsStream.latestData) {
      callback(competitionsStream.latestData);
    }
  }

  return () => {
    if (competitionsStream) {
      competitionsStream.listeners.delete(callback);
      if (competitionsStream.listeners.size === 0) {
        competitionsStream.unsubscribe();
        competitionsStream = null;
      }
    }
  };
}

export async function getCompetitions(): Promise<CompetitionDoc[]> {
  try {
    if (db && typeof collection === "function") {
      const colRef = collection(db, COLLECTION_NAME);
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const list: CompetitionDoc[] = [];
        snap.forEach((d) => list.push(d.data() as CompetitionDoc));
        return list;
      }
    }
  } catch (err) {
    console.warn("Firestore getCompetitions deferred to local dataset");
  }
  return REAL_COMPETITIONS;
}
