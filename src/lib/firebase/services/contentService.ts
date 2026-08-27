import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config";
import { PageContent } from "@/types";
import {
  getAllPageContents as getLocalAll,
  getPageContent as getLocalPage,
  savePageContent as saveLocalPage,
} from "@/lib/storage";
import { INITIAL_SITE_CONTENT } from "@/data/initialContent";

const SITE_CONTENT_COLLECTION = "site_content";

// Multiplexed Page Stream Registry
const pageStreams = new Map<
  string,
  {
    unsubscribe: () => void;
    listeners: Set<(page: PageContent | null, isConnected: boolean) => void>;
    latestData: PageContent | null;
    isConnected: boolean;
  }
>();

let allPagesStream: {
  unsubscribe: () => void;
  listeners: Set<(pages: PageContent[], isConnected: boolean) => void>;
  latestData: PageContent[] | null;
} | null = null;

/**
 * Real-time listener for all site content pages with stream multiplexing
 */
export function subscribeToAllPages(
  onUpdate: (pages: PageContent[], isConnected: boolean) => void
): () => void {
  const local = getLocalAll();
  onUpdate(local, true);

  if (!db || typeof collection !== "function") {
    const handleStorage = () => onUpdate(getLocalAll(), true);
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }

  if (!allPagesStream) {
    const colRef = collection(db, SITE_CONTENT_COLLECTION);
    const listeners = new Set<(pages: PageContent[], isConnected: boolean) => void>();
    listeners.add(onUpdate);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const pages: PageContent[] = snapshot.docs.map((docSnap) => ({
            ...(docSnap.data() as PageContent),
            pageId: docSnap.id,
          }));
          if (allPagesStream) {
            allPagesStream.latestData = pages;
            allPagesStream.listeners.forEach((cb) => cb(pages, true));
          }
        } else {
          if (allPagesStream) {
            allPagesStream.listeners.forEach((cb) => cb(local, true));
          }
        }
      },
      (error) => {
        console.warn("Firestore site_content subscribe warning, using local:", error);
        if (allPagesStream) {
          allPagesStream.listeners.forEach((cb) => cb(local, false));
        }
      }
    );

    allPagesStream = { unsubscribe, listeners, latestData: local };
  } else {
    allPagesStream.listeners.add(onUpdate);
    if (allPagesStream.latestData) {
      onUpdate(allPagesStream.latestData, true);
    }
  }

  return () => {
    if (allPagesStream) {
      allPagesStream.listeners.delete(onUpdate);
      if (allPagesStream.listeners.size === 0) {
        allPagesStream.unsubscribe();
        allPagesStream = null;
      }
    }
  };
}

/**
 * Real-time listener for a single page with stream multiplexing and zero FOD (Flash of Defaults)
 */
export function subscribeToPageContent(
  pageId: string,
  onUpdate: (page: PageContent | null, isConnected: boolean) => void
): () => void {
  const fallback =
    getLocalPage(pageId) || INITIAL_SITE_CONTENT.find((p) => p.pageId === pageId) || null;

  if (!db || typeof doc !== "function") {
    onUpdate(fallback, false);
    const handleStorage = () => {
      onUpdate(getLocalPage(pageId) || fallback, true);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }

  let stream = pageStreams.get(pageId);

  if (!stream) {
    const docRef = doc(db, SITE_CONTENT_COLLECTION, pageId);
    const listeners = new Set<(page: PageContent | null, isConnected: boolean) => void>();
    listeners.add(onUpdate);

    onUpdate(fallback, true);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as PageContent;
          const merged = { ...data, pageId: snapshot.id };
          const cur = pageStreams.get(pageId);
          if (cur) {
            cur.latestData = merged;
            cur.isConnected = true;
            cur.listeners.forEach((cb) => cb(merged, true));
          }
        } else {
          const cur = pageStreams.get(pageId);
          if (cur) {
            cur.latestData = fallback;
            cur.isConnected = true;
            cur.listeners.forEach((cb) => cb(fallback, true));
          }
        }
      },
      (err) => {
        console.warn(`[Firestore CMS] Page stream ${pageId} fallback:`, err.message);
        const cur = pageStreams.get(pageId);
        if (cur) {
          cur.listeners.forEach((cb) => cb(fallback, false));
        }
      }
    );

    stream = { unsubscribe, listeners, latestData: fallback, isConnected: true };
    pageStreams.set(pageId, stream);
  } else {
    stream.listeners.add(onUpdate);
    if (stream.latestData) {
      onUpdate(stream.latestData, stream.isConnected);
    }
  }

  return () => {
    const cur = pageStreams.get(pageId);
    if (cur) {
      cur.listeners.delete(onUpdate);
      if (cur.listeners.size === 0) {
        cur.unsubscribe();
        pageStreams.delete(pageId);
      }
    }
  };
}

/**
 * Save draft changes for a page (atomic merge write with 0 reads)
 */
export async function savePageContentDraft(
  pageId: string,
  sections: PageContent["sections"],
  adminUid: string = "admin_1"
): Promise<PageContent> {
  const localSaved = saveLocalPage(pageId, sections, adminUid, "draft");

  if (db && typeof doc === "function") {
    try {
      const docRef = doc(db, SITE_CONTENT_COLLECTION, pageId);
      await setDoc(
        docRef,
        {
          pageId,
          pageName: localSaved.pageName,
          path: localSaved.path,
          icon: localSaved.icon,
          sections,
          status: "draft",
          updatedBy: adminUid,
          updatedAt: localSaved.updatedAt,
          updatedAtServer: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err: any) {
      console.warn(`Firestore draft save error:`, err);
    }
  }

  return localSaved;
}

/**
 * Publish page content live to Cloud Firestore (atomic merge write with 0 reads)
 */
export async function publishPageContentLive(
  pageId: string,
  sections: PageContent["sections"],
  adminUid: string = "admin_1"
): Promise<PageContent> {
  const localSaved = saveLocalPage(pageId, sections, adminUid, "published");

  if (db && typeof doc === "function") {
    try {
      const docRef = doc(db, SITE_CONTENT_COLLECTION, pageId);
      const payload = {
        pageId,
        pageName: localSaved.pageName,
        path: localSaved.path,
        icon: localSaved.icon,
        sections,
        status: "published",
        updatedBy: adminUid,
        updatedAt: new Date().toISOString(),
        updatedAtServer: serverTimestamp(),
      };
      await setDoc(docRef, payload, { merge: true });
    } catch (err: any) {
      console.warn(`Firestore publish error:`, err);
    }
  }

  return localSaved;
}
