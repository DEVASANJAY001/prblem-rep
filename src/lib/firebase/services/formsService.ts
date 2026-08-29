import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config";
import { FormSchema, FormResponseDoc } from "@/types";
import {
  getForms as getLocalForms,
  getFormById as getLocalFormById,
  getFormBySlug as getLocalFormBySlug,
  saveForm as saveLocalForm,
  deleteForm as deleteLocalForm,
  submitFormResponse as submitLocalFormResponse,
  getFormResponses as getLocalFormResponses,
} from "@/lib/storage";

const FORMS_COLLECTION = "forms";
const RESPONSES_COLLECTION = "form_responses";

// Multiplexed Streams
let formsStream: {
  unsubscribe: () => void;
  listeners: Set<(forms: FormSchema[]) => void>;
  latestData: FormSchema[] | null;
} | null = null;

const responseStreams = new Map<
  string,
  {
    unsubscribe: () => void;
    listeners: Set<(responses: FormResponseDoc[]) => void>;
    latestData: FormResponseDoc[] | null;
  }
>();

export async function createOrUpdateForm(form: FormSchema): Promise<FormSchema> {
  const updatedForm = saveLocalForm(form, {
    uid: form.createdByUid || "admin_1",
    name: form.createdBy || "Admin",
  });

  try {
    if (db && typeof doc === "function") {
      const formRef = doc(db, FORMS_COLLECTION, updatedForm.id);
      await setDoc(formRef, {
        ...updatedForm,
        updatedAtServer: serverTimestamp(),
      });
    }
  } catch (error) {
    console.warn("Firestore form sync deferred:", error);
  }

  return updatedForm;
}

export async function deleteForm(formId: string): Promise<boolean> {
  const localResult = deleteLocalForm(formId);
  try {
    if (db && typeof doc === "function") {
      const formRef = doc(db, FORMS_COLLECTION, formId);
      await deleteDoc(formRef);
    }
  } catch (error) {
    console.warn("Firestore form delete deferred:", error);
  }
  return localResult;
}

export async function getFormBySlug(slug: string): Promise<FormSchema | null> {
  const local = getLocalFormBySlug(slug);
  if (local) return local;

  try {
    if (db && typeof collection === "function") {
      const q = query(collection(db, FORMS_COLLECTION), where("slug", "==", slug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs[0].data() as FormSchema;
      }
    }
  } catch (error) {
    console.warn("Firestore getFormBySlug error:", error);
  }

  return null;
}

export function subscribeForms(callback: (forms: FormSchema[]) => void): () => void {
  const local = getLocalForms();
  callback(local);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  if (!formsStream) {
    const colRef = collection(db, FORMS_COLLECTION);
    const listeners = new Set<(forms: FormSchema[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      colRef,
      (snap) => {
        if (!snap.empty) {
          const list: FormSchema[] = [];
          snap.forEach((d) => list.push(d.data() as FormSchema));
          list.forEach((f) => saveLocalForm(f, { uid: "admin", name: "Admin" }));
          if (formsStream) {
            formsStream.latestData = list;
            formsStream.listeners.forEach((cb) => cb(list));
          }
        }
      },
      (err) => {
        console.warn("Forms subscription fallback:", err.message);
      }
    );

    formsStream = { unsubscribe, listeners, latestData: local };
  } else {
    formsStream.listeners.add(callback);
    if (formsStream.latestData) {
      callback(formsStream.latestData);
    }
  }

  return () => {
    if (formsStream) {
      formsStream.listeners.delete(callback);
      if (formsStream.listeners.size === 0) {
        formsStream.unsubscribe();
        formsStream = null;
      }
    }
  };
}

export async function submitFormResponse(
  formId: string,
  answers: Record<string, any>,
  respondentInfo: { respondentUid?: string; respondentEmail?: string; respondentName?: string } = {}
): Promise<{ success: boolean; responseId: string }> {
  const localDoc = submitLocalFormResponse(
    formId,
    answers,
    respondentInfo.respondentUid || null,
    respondentInfo.respondentEmail || null
  );

  try {
    if (db && typeof doc === "function") {
      const responseRef = doc(db, RESPONSES_COLLECTION, localDoc.id);
      await setDoc(responseRef, {
        ...localDoc,
        submittedAtServer: serverTimestamp(),
      });
    }
  } catch (error) {
    console.warn("Firestore response submit deferred:", error);
  }

  return { success: true, responseId: localDoc.id };
}

export function subscribeFormResponses(
  formId: string,
  callback: (responses: FormResponseDoc[]) => void
): () => void {
  const local = getLocalFormResponses(formId);
  callback(local);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  let stream = responseStreams.get(formId);

  if (!stream) {
    const q = query(
      collection(db, RESPONSES_COLLECTION),
      where("formId", "==", formId),
      orderBy("submittedAt", "desc")
    );

    const listeners = new Set<(responses: FormResponseDoc[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        if (!snap.empty) {
          const list: FormResponseDoc[] = [];
          snap.forEach((d) => list.push(d.data() as FormResponseDoc));
          const cur = responseStreams.get(formId);
          if (cur) {
            cur.latestData = list;
            cur.listeners.forEach((cb) => cb(list));
          }
        }
      },
      (err) => {
        console.warn("Form responses subscription fallback:", err.message);
      }
    );

    stream = { unsubscribe, listeners, latestData: local };
    responseStreams.set(formId, stream);
  } else {
    stream.listeners.add(callback);
    if (stream.latestData) {
      callback(stream.latestData);
    }
  }

  return () => {
    const cur = responseStreams.get(formId);
    if (cur) {
      cur.listeners.delete(callback);
      if (cur.listeners.size === 0) {
        cur.unsubscribe();
        responseStreams.delete(formId);
      }
    }
  };
}

export function exportResponsesToCSV(form: FormSchema, responses: FormResponseDoc[]): string {
  if (responses.length === 0) return "";

  const headers = [
    "Response ID",
    "Submitted At",
    "Respondent Name",
    "Respondent Email",
    ...form.fields.map((f) => `"${f.label.replace(/"/g, '""')}"`),
  ];
  const rows = responses.map((r) => {
    const answerCols = form.fields.map((f) => {
      const val = r.answers[f.id];
      if (val === undefined || val === null) return '""';
      if (Array.isArray(val)) return `"${val.join(", ").replace(/"/g, '""')}"`;
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    return [
      `"${r.id}"`,
      `"${r.submittedAt}"`,
      `"${r.respondentName || ""}"`,
      `"${r.respondentEmail || ""}"`,
      ...answerCols,
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
