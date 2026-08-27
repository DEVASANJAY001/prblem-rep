import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config";
import { AuditLogDoc } from "@/types";
import {
  generateAdminInviteToken as generateLocalToken,
  validateAndUseAdminInvite as validateLocalToken,
  getAuditLogs as getLocalAuditLogs,
  addAuditLog as addLocalAuditLog,
} from "@/lib/storage";

const INVITES_COLLECTION = "admin_invites";
const AUDIT_COLLECTION = "audit_logs";

let auditLogsStream: {
  unsubscribe: () => void;
  listeners: Set<(logs: AuditLogDoc[]) => void>;
  latestData: AuditLogDoc[] | null;
} | null = null;

export async function generateAdminInvite(adminUid: string): Promise<string> {
  const token = generateLocalToken(adminUid);

  try {
    if (db && typeof doc === "function") {
      const inviteRef = doc(db, INVITES_COLLECTION, token);
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      await setDoc(inviteRef, {
        token,
        createdBy: adminUid,
        expiresAt,
        used: false,
        createdAtServer: serverTimestamp(),
      });
    }
  } catch (error) {
    console.warn("Firestore invite sync deferred:", error);
  }

  return token;
}

export async function validateAndUseInvite(token: string): Promise<boolean> {
  const trimmed = token.trim();
  const localValid = validateLocalToken(trimmed);
  if (!localValid) return false;

  try {
    if (db && typeof doc === "function") {
      const inviteRef = doc(db, INVITES_COLLECTION, trimmed);
      const snap = await getDoc(inviteRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data.used || new Date(data.expiresAt).getTime() < Date.now()) {
          return false;
        }
        await updateDoc(inviteRef, { used: true });
      }
    }
  } catch (error) {
    console.warn("Firestore invite validation notice:", error);
  }

  return true;
}

export function subscribeAuditLogs(callback: (logs: AuditLogDoc[]) => void): () => void {
  const local = getLocalAuditLogs();
  callback(local);

  if (!db || typeof collection !== "function") {
    return () => {};
  }

  if (!auditLogsStream) {
    const q = query(collection(db, AUDIT_COLLECTION), orderBy("timestamp", "desc"));
    const listeners = new Set<(logs: AuditLogDoc[]) => void>();
    listeners.add(callback);

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        if (!snap.empty) {
          const list: AuditLogDoc[] = [];
          snap.forEach((d) => list.push(d.data() as AuditLogDoc));
          if (auditLogsStream) {
            auditLogsStream.latestData = list;
            auditLogsStream.listeners.forEach((cb) => cb(list));
          }
        }
      },
      (err) => {
        console.warn("Audit logs subscription fallback:", err.message);
      }
    );

    auditLogsStream = { unsubscribe, listeners, latestData: local };
  } else {
    auditLogsStream.listeners.add(callback);
    if (auditLogsStream.latestData) {
      callback(auditLogsStream.latestData);
    }
  }

  return () => {
    if (auditLogsStream) {
      auditLogsStream.listeners.delete(callback);
      if (auditLogsStream.listeners.size === 0) {
        auditLogsStream.unsubscribe();
        auditLogsStream = null;
      }
    }
  };
}

export async function logAdminAction(
  actor: { uid: string; name: string },
  action: string,
  targetId: string,
  targetType: "problem" | "user" | "form" | "invite" | "system",
  details: string
): Promise<void> {
  addLocalAuditLog({
    actorUid: actor.uid,
    actorName: actor.name,
    action,
    targetId,
    targetType,
    details,
  });

  try {
    if (db && typeof collection === "function") {
      const auditCol = collection(db, AUDIT_COLLECTION);
      const newDoc = doc(auditCol);
      await setDoc(newDoc, {
        id: newDoc.id,
        actorUid: actor.uid,
        actorName: actor.name,
        action,
        targetId,
        targetType,
        details,
        timestamp: new Date().toISOString(),
        serverTimestamp: serverTimestamp(),
      });
    }
  } catch (error) {
    console.warn("Firestore audit log sync deferred:", error);
  }
}
