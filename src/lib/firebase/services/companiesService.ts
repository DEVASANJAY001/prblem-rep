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
import { CompanyDoc } from "@/types";
import {
  getCompanies as getLocalCompanies,
  saveCompany as saveLocalCompany,
  updateCompanyInStorage,
  deleteCompanyFromStorage,
  toggleCompanyHiddenInStorage,
} from "@/lib/storage";

const COLLECTION_NAME = "companies";

let companiesStream: {
  unsubscribe: () => void;
  listeners: Set<(companies: CompanyDoc[]) => void>;
  latestData: CompanyDoc[] | null;
} | null = null;

export function subscribeCompanies(
  callback: (companies: CompanyDoc[]) => void
): () => void {
  // Always emit local data immediately
  const local = getLocalCompanies();
  callback(local);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  if (!companiesStream) {
    const colRef = collection(db, COLLECTION_NAME);
    const listeners = new Set<(companies: CompanyDoc[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: CompanyDoc[] = [];
          snapshot.forEach((d) => list.push(d.data() as CompanyDoc));
          list.forEach((c) => saveLocalCompany(c));
          if (companiesStream) {
            companiesStream.latestData = list;
            companiesStream.listeners.forEach((cb) => cb(list));
          }
        }
      },
      (err) => {
        console.warn("Companies Firestore subscription fallback:", err.message);
      }
    );

    companiesStream = { unsubscribe, listeners, latestData: local };
  } else {
    companiesStream.listeners.add(callback);
    if (companiesStream.latestData) {
      callback(companiesStream.latestData);
    }
  }

  return () => {
    if (companiesStream) {
      companiesStream.listeners.delete(callback);
      if (companiesStream.listeners.size === 0) {
        companiesStream.unsubscribe();
        companiesStream = null;
      }
    }
  };
}

export async function getCompanies(): Promise<CompanyDoc[]> {
  const local = getLocalCompanies();
  try {
    if (db && typeof collection === "function") {
      const colRef = collection(db, COLLECTION_NAME);
      const snap = await getDocs(colRef);
      if (!snap.empty) {
        const list: CompanyDoc[] = [];
        snap.forEach((d) => list.push(d.data() as CompanyDoc));
        list.forEach((c) => saveLocalCompany(c));
        return list;
      }
    }
  } catch (err) {
    console.warn("Firestore getCompanies deferred to local dataset");
  }
  return local;
}

export async function createCompany(companyData: {
  name: string;
  logoUrl: string;
  website: string;
  industry?: string;
  description?: string;
  verified?: boolean;
}): Promise<CompanyDoc> {
  const id = `comp-${Date.now()}`;
  const now = new Date().toISOString();

  const newCompany: CompanyDoc = {
    id,
    name: companyData.name.trim(),
    logoUrl: companyData.logoUrl.trim(),
    website: companyData.website.trim(),
    industry: companyData.industry || "General Industry",
    description: companyData.description || "",
    verified: companyData.verified ?? true,
    problemBountiesCount: 0,
    totalRewardsAwarded: 0,
    hidden: false,
    createdAt: now,
    updatedAt: now,
  };

  // 1. Save locally
  saveLocalCompany(newCompany);

  // 2. Save to Firestore
  try {
    if (db && typeof doc === "function") {
      const compRef = doc(db, COLLECTION_NAME, id);
      await setDoc(compRef, {
        ...newCompany,
        createdAtServer: serverTimestamp(),
      });
    }
  } catch (error) {
    console.warn("Firestore createCompany error:", error);
  }

  return newCompany;
}

export async function updateCompanyDetails(
  id: string,
  updates: Partial<CompanyDoc>
): Promise<boolean> {
  // 1. Update locally
  updateCompanyInStorage(id, updates);

  // 2. Update Firestore
  try {
    if (db && typeof doc === "function") {
      const compRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(compRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      return true;
    }
  } catch (error) {
    console.warn("Firestore updateCompanyDetails error:", error);
  }

  return true;
}

export async function toggleCompanyVisibility(id: string): Promise<boolean> {
  // 1. Toggle locally
  const newHidden = toggleCompanyHiddenInStorage(id);

  // 2. Toggle Firestore
  try {
    if (db && typeof doc === "function") {
      const compRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(compRef, {
        hidden: newHidden,
        updatedAt: new Date().toISOString(),
      });
      return true;
    }
  } catch (error) {
    console.warn("Firestore toggleCompanyVisibility error:", error);
  }

  return true;
}

export async function deleteCompany(id: string): Promise<boolean> {
  // 1. Delete locally
  deleteCompanyFromStorage(id);

  // 2. Delete from Firestore
  try {
    if (db && typeof doc === "function") {
      const compRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(compRef);
      return true;
    }
  } catch (error) {
    console.warn("Firestore deleteCompany error:", error);
  }

  return true;
}
