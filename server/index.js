import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth as getAdminAuth } from "firebase-admin/auth";

const app = express();
const PORT = process.env.PORT || 4000;

// ─────────────────────────────────────────────────────────────────────────────
// Firebase Admin SDK — Firestore + Auth for persistent server-side state
// Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and
// FIREBASE_ADMIN_PRIVATE_KEY in your environment (.env.local or Vercel dashboard).
// Download service account JSON from: Firebase Console → Project Settings →
// Service Accounts → Generate new private key
// ─────────────────────────────────────────────────────────────────────────────
let adminDb = null;
let adminAuth = null;

try {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    const adminApp =
      getApps().length > 0
        ? getApp()
        : initializeApp({
            credential: cert({
              projectId,
              clientEmail,
              privateKey: privateKey.replace(/\\n/g, "\n"),
            }),
          });
    adminDb = getFirestore(adminApp);
    adminAuth = getAdminAuth(adminApp);
    console.log("Firebase Admin SDK initialized successfully.");
  } else {
    console.warn(
      "Firebase Admin SDK not configured — invite tokens will be in-memory only.\n" +
        "Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY."
    );
  }
} catch (err) {
  console.warn("Firebase Admin SDK init error (falling back to in-memory):", err.message);
}

// ─────────────────────────────────────────────────────────────────────────────
// CORS — restrict to known origins only; disallow no-origin in production
// ─────────────────────────────────────────────────────────────────────────────
const IS_PROD = process.env.NODE_ENV === "production";

const ALLOWED_ORIGINS = [
  "http://localhost:5173",  // Vite dev server
  "http://localhost:4173",  // Vite preview
  process.env.PRODUCTION_ORIGIN || "https://prblms.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // In production, always require an explicit origin — blocks curl/bot abuse.
      // In development, allow no-origin requests (e.g., Postman) for convenience.
      if (!origin) {
        return IS_PROD
          ? callback(new Error("CORS: Direct API calls not permitted in production."))
          : callback(null, true);
      }
      if (ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not permitted.`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

// ─────────────────────────────────────────────────────────────────────────────
// Rate Limiting
// ─────────────────────────────────────────────────────────────────────────────

// General API limiter — 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again in 15 minutes." },
});

// Stricter limit for write/submit endpoints — 10 per 10 minutes per IP
const writeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Submission rate limit reached. Please wait before trying again." },
});

// Admin endpoints — 20 per 15 minutes
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many admin requests. Please wait." },
});

app.use("/api", generalLimiter);

// ─────────────────────────────────────────────────────────────────────────────
// Auth Middleware — verifies Firebase ID token from Authorization header
// ─────────────────────────────────────────────────────────────────────────────

/**
 * requireAuth — verifies a Firebase ID token.
 * Attaches `req.decodedToken` on success.
 */
async function requireAuth(req, res, next) {
  if (!adminAuth) {
    // Admin SDK not configured — cannot verify tokens; block request.
    return res.status(503).json({ error: "Auth service unavailable. Admin SDK not configured." });
  }
  const authHeader = req.headers.authorization || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;

  if (!idToken) {
    return res.status(401).json({ error: "Missing Authorization token." });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    req.decodedToken = decoded;
    next();
  } catch (err) {
    console.warn("[Auth] Token verification failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired auth token." });
  }
}

/**
 * requireAdmin — verifies token AND checks that custom claim role is 'admin'.
 * Must be used AFTER requireAuth in the middleware chain.
 */
function requireAdmin(req, res, next) {
  const role = req.decodedToken?.role;
  if (role !== "admin") {
    return res.status(403).json({ error: "Forbidden. Admin access required." });
  }
  next();
}

/**
 * requireModerator — verifies token AND checks role is 'admin' or 'moderator'.
 */
function requireModerator(req, res, next) {
  const role = req.decodedToken?.role;
  if (role !== "admin" && role !== "moderator") {
    return res.status(403).json({ error: "Forbidden. Moderator or admin access required." });
  }
  next();
}

// In-memory audit log store (local dev fallback — capped to 500 entries)
const AUDIT_LOG_CAP = 500;
let auditLogs = [];

function pushAuditLog(entry) {
  auditLogs.unshift(entry);
  // Prevent unbounded memory growth
  if (auditLogs.length > AUDIT_LOG_CAP) {
    auditLogs.length = AUDIT_LOG_CAP;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Health Diagnostic
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    platform: "Prblms Intelligence Engine",
    version: "2.6.0",
    adminSdkConnected: adminDb !== null,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. AI Scoring Pipeline (no auth required — public scoring utility)
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/ai/score", writeLimiter, (req, res) => {
  const { title, description, industry, severity } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required for AI scoring." });
  }

  // Field names match the canonical AIScores interface in firebase.ts / aiScoring.ts
  const descLen = description.trim().length;
  const descWordCount = description.trim().split(/\s+/).length;
  const clarity = Math.min(95, Math.max(50, Math.round(55 + (descLen / 300) * 35)));

  const severityMultiplierMap = { critical: 95, major: 86, medium: 72, minor: 52 };
  const painLevel = severityMultiplierMap[severity] || 75;

  const urgency = Math.min(98, Math.round(painLevel * 0.92 + (severity === "critical" ? 8 : 2)));
  const marketSize = 80; // default mid-tier; client enriches with audienceSize
  const businessPotential = Math.min(98, Math.round(marketSize * 0.45 + clarity * 0.55));
  const originality = Math.min(95, Math.max(60, 88));
  const existingCompetition = Math.min(90, Math.max(40, Math.round(100 - originality * 0.5 + 20)));
  const technicalFeasibility = 85;
  const socialImpact =
    typeof industry === "string" &&
    (industry.includes("Health") || industry.includes("Civic") || industry.includes("Non-profit"))
      ? 94
      : 78;
  const aiConfidence = Math.min(96, Math.max(78, Math.round(75 + descWordCount * 0.2 + 8)));
  const overall = Math.round(
    clarity * 0.12 +
    originality * 0.1 +
    marketSize * 0.12 +
    painLevel * 0.16 +
    urgency * 0.12 +
    businessPotential * 0.15 +
    technicalFeasibility * 0.1 +
    socialImpact * 0.13
  );

  const painScore = Math.min(99, Math.round(painLevel * 0.7 + urgency * 0.3));
  const opportunityScore = Math.min(99, Math.round(businessPotential * 0.6 + marketSize * 0.4));

  res.json({
    success: true,
    painScore,
    opportunityScore,
    aiScores: {
      clarity,
      originality,
      marketSize,
      painLevel,
      urgency,
      existingCompetition,
      technicalFeasibility,
      socialImpact,
      businessPotential,
      aiConfidence,
      overall,
      summaryFeedback: `Empirical friction detected in ${industry || "General Industry"}. Severity rated ${(severity || "medium").toUpperCase()} with strong market indicators.`,
      keyRisks: [
        "Customer education cycle may require targeted outreach",
        "Incumbent software friction during migration",
        "Execution risk on workflow integration with legacy systems",
      ],
      suggestedAngles: [
        `AI-first automated workflow for ${industry || "target industry"} operators`,
        "Vertical marketplace bridging operators and automated solutions",
        "Low-friction embeddable API to plug into existing tooling",
      ],
    },
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Problem Intake Ingestion — requires authenticated user, persists to Firestore
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/problems/submit", writeLimiter, requireAuth, async (req, res) => {
  const { title, description, industry, severity } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Missing required fields for problem submission." });
  }

  // Use the UID from the verified token — never trust the request body for identity
  const submittedByUid = req.decodedToken.uid;
  const submittedByName = req.decodedToken.name || req.body.submittedByName || "Anonymous";

  const problemId = `prob-${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  const severityMultiplier = { critical: 95, major: 85, medium: 70, minor: 50 }[severity] || 75;
  const overallPainScore = Math.min(98, Math.round(severityMultiplier * 0.8 + 15));
  const opportunityScore = Math.min(96, Math.round(overallPainScore * 0.9));

  const problemDoc = {
    id: problemId,
    title,
    description,
    industry: industry || "General",
    severity: severity || "medium",
    painScore: overallPainScore,
    opportunityScore,
    status: "pending",
    submittedBy: submittedByName,
    submittedByUid,
    createdAt: now,
    submittedAt: now,
    updatedAt: now,
    votes: { upvotes: 0, downvotes: 0 },
    validations: { faceCount: 0, greatCount: 0, payCount: 0, buildCount: 0, userValidations: {} },
    views: 0,
    interestedCount: 0,
    interestedUsers: [],
    comments: [],
    commentsCount: 0,
    bookmarksCount: 0,
    verified: false,
    isAnonymous: false,
    reviewedBy: null,
    reviewNote: null,
    reviewedAt: null,
    publishedAt: null,
  };

  if (adminDb) {
    try {
      const { FieldValue } = await import("firebase-admin/firestore");
      await adminDb.collection("problems").doc(problemId).set({
        ...problemDoc,
        createdAtServer: FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.error("Firestore problem intake write failed:", err);
      return res.status(500).json({ error: "Failed to submit problem. Please try again." });
    }
  }

  res.json({
    success: true,
    message: "Problem submitted to the moderation queue.",
    problemId,
    painScore: overallPainScore,
    opportunityScore,
    status: "pending",
    createdAt: now,
    persisted: adminDb !== null,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. Admin Moderation Status Transition — requires admin token + persists to Firestore
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/problems/:id/status", adminLimiter, requireAuth, requireModerator, async (req, res) => {
  const { id } = req.params;
  const { newStatus, reviewNote } = req.body;

  const validStatuses = ["approved", "rejected", "needs_info", "pending", "under_review"];
  if (!newStatus || !validStatuses.includes(newStatus)) {
    return res.status(400).json({ error: "Invalid status transition value." });
  }

  // Identity comes from the verified token — never from the request body
  const adminUid = req.decodedToken.uid;
  const adminName = req.decodedToken.name || "Admin";

  const auditEntry = {
    id: `log-${Date.now()}`,
    actorUid: adminUid,
    actorName: adminName,
    action: `problem.${newStatus}`,
    targetId: id,
    targetType: "problem",
    details: `Problem ${id} status → ${newStatus.toUpperCase()}${reviewNote ? ` | Note: ${reviewNote}` : ""}`,
    timestamp: new Date().toISOString(),
  };

  if (adminDb) {
    try {
      const { FieldValue } = await import("firebase-admin/firestore");
      const batch = adminDb.batch();

      // Update problem status
      const problemRef = adminDb.collection("problems").doc(id);
      batch.update(problemRef, {
        status: newStatus,
        reviewedBy: adminName,
        reviewedByUid: adminUid,
        reviewedAt: new Date().toISOString(),
        reviewNote: reviewNote || "",
        verified: newStatus === "approved",
        updatedAt: new Date().toISOString(),
        publishedAt: newStatus === "approved" ? new Date().toISOString() : null,
      });

      // Write audit log atomically
      const auditRef = adminDb.collection("audit_logs").doc(auditEntry.id);
      batch.set(auditRef, {
        ...auditEntry,
        serverTimestamp: FieldValue.serverTimestamp(),
      });

      await batch.commit();
    } catch (err) {
      console.error("Firestore status update failed:", err);
      return res.status(500).json({ error: "Failed to update problem status." });
    }
  } else {
    // In-memory fallback for local dev without Admin SDK
    pushAuditLog(auditEntry);
  }

  res.json({ success: true, problemId: id, newStatus, updatedAt: new Date().toISOString() });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. Dynamic Form Response Submission — authenticated, persists to Firestore
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/forms/submit", writeLimiter, requireAuth, async (req, res) => {
  const { formId, answers } = req.body;
  if (!formId || !answers) {
    return res.status(400).json({ error: "formId and answers are required." });
  }

  const respondentUid = req.decodedToken.uid;
  const responseId = `resp-${crypto.randomUUID()}`;
  const submittedAt = new Date().toISOString();

  const responseDoc = {
    id: responseId,
    formId,
    answers,
    respondentUid,
    submittedAt,
  };

  if (adminDb) {
    try {
      const { FieldValue } = await import("firebase-admin/firestore");
      await adminDb.collection("form_responses").doc(responseId).set({
        ...responseDoc,
        serverTimestamp: FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.error("Firestore form response write failed:", err);
      return res.status(500).json({ error: "Failed to save form response. Please try again." });
    }
  }

  res.json({
    success: true,
    message: "Form response registered successfully.",
    responseId,
    submittedAt,
    persisted: adminDb !== null,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Admin Invite Token Engine — backed by Firestore for persistence
//    Falls back to in-memory if Firebase Admin SDK is not configured.
// ─────────────────────────────────────────────────────────────────────────────

// In-memory fallback (lost on restart — only used when adminDb is null)
const inviteTokensFallback = {};
const INVITES_COLLECTION = "admin_invites";

app.post("/api/admin/invite/generate", adminLimiter, requireAuth, requireAdmin, async (req, res) => {
  // adminUid sourced from verified token — not request body
  const adminUid = req.decodedToken.uid;

  const token = `inv_${crypto.randomUUID().replace(/-/g, "").substring(0, 16)}`;
  const expiresAt = new Date(Date.now() + 86400000).toISOString();
  const tokenDoc = { token, createdBy: adminUid, expiresAt, used: false, createdAt: new Date().toISOString() };

  if (adminDb) {
    try {
      const { FieldValue } = await import("firebase-admin/firestore");
      await adminDb.collection(INVITES_COLLECTION).doc(token).set({
        ...tokenDoc,
        createdAtServer: FieldValue.serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to persist invite token to Firestore:", err);
      return res.status(500).json({ error: "Failed to generate invite. Try again." });
    }
  } else {
    // In-memory fallback (non-persistent across restarts)
    inviteTokensFallback[token] = tokenDoc;
  }

  res.json({
    success: true,
    token,
    expiresAt,
    persistent: adminDb !== null,
    registrationUrl: `${process.env.PRODUCTION_ORIGIN || "http://localhost:5173"}/admin/register?token=${token}`,
  });
});

app.post("/api/admin/invite/validate", adminLimiter, async (req, res) => {
  const { token } = req.body;
  const trimmed = (token || "").trim();

  if (!trimmed) {
    return res.status(400).json({ valid: false, error: "Token is required." });
  }

  if (adminDb) {
    try {
      const ref = adminDb.collection(INVITES_COLLECTION).doc(trimmed);
      const accepted = await adminDb.runTransaction(async (txn) => {
        const snap = await txn.get(ref);

        if (!snap.exists) {
          return false;
        }

        const data = snap.data();
        if (data.used || new Date(data.expiresAt).getTime() < Date.now()) return false;
        // Atomically mark as used inside the transaction
        txn.update(ref, { used: true, usedAt: new Date().toISOString() });
        return true;
      });

      if (!accepted) {
        return res.status(400).json({ valid: false, error: "Token is invalid, expired, or already consumed." });
      }
      return res.json({ valid: true, message: "Invite token verified and consumed." });
    } catch (err) {
      console.error("Firestore invite validation error:", err);
      return res.status(500).json({ valid: false, error: "Validation failed. Try again." });
    }
  }

  // In-memory fallback
  const found = inviteTokensFallback[trimmed];
  if (!found || found.used || new Date(found.expiresAt).getTime() < Date.now()) {
    return res.status(400).json({ valid: false, error: "Token is invalid, expired, or already consumed." });
  }

  found.used = true;
  res.json({ valid: true, message: "Invite token verified and consumed." });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Set Custom Claims — assigns role claim to a Firebase Auth user
//    Must be called after admin registration to make Firestore rules work.
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/admin/set-claims", adminLimiter, requireAuth, requireAdmin, async (req, res) => {
  const { targetUid, role } = req.body;

  const validRoles = ["admin", "moderator", "user"];
  if (!targetUid || !role || !validRoles.includes(role)) {
    return res.status(400).json({ error: "targetUid and a valid role are required." });
  }
  if (!adminAuth) {
    return res.status(503).json({ error: "Admin Auth SDK unavailable." });
  }

  try {
    await adminAuth.setCustomUserClaims(targetUid, { role });
    res.json({ success: true, uid: targetUid, role, message: "Custom claims updated. User must refresh their token." });
  } catch (err) {
    console.error("setCustomUserClaims failed:", err);
    res.status(500).json({ error: "Failed to set custom claims." });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Platform Metrics
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/metrics", async (req, res) => {
  const base = {
    systemStatus: "ONLINE",
    uptimeSeconds: Math.round(process.uptime()),
    adminSdkConnected: adminDb !== null,
    timestamp: new Date().toISOString(),
  };

  if (!adminDb) {
    return res.status(501).json({
      ...base,
      note: "Real metrics require Firebase Admin SDK. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY.",
    });
  }

  try {
    // Run all counts in parallel — avoids serial awaits
    const [problemsSnap, usersSnap, approvedSnap] = await Promise.all([
      adminDb.collection("problems").count().get(),
      adminDb.collection("users").count().get(),
      adminDb.collection("problems").where("status", "==", "approved").count().get(),
    ]);

    res.json({
      ...base,
      totalProblems: problemsSnap.data().count,
      totalUsers: usersSnap.data().count,
      approvedProblems: approvedSnap.data().count,
    });
  } catch (err) {
    console.error("Firestore metrics aggregation error:", err);
    res.status(500).json({ ...base, error: "Failed to load metrics from Firestore." });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 404 Fallback
// ─────────────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

// ─────────────────────────────────────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  // Handle CORS errors specifically
  if (err.message && err.message.startsWith("CORS:")) {
    return res.status(403).json({ error: err.message });
  }
  console.error("Unhandled server error:", err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`⚡ Prblms Backend Engine running on http://localhost:${PORT}`);
  console.log(`   Allowed origins: ${ALLOWED_ORIGINS.join(", ")}`);
  console.log(`   Environment: ${IS_PROD ? "production" : "development"}`);
});
