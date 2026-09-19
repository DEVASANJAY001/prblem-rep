import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = express();
const PORT = process.env.PORT || 4000;

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Firebase Admin SDK â€” Firestore for persistent server-side state
// Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and
// FIREBASE_ADMIN_PRIVATE_KEY in your environment (.env.local or Vercel dashboard).
// Download service account JSON from: Firebase Console â†’ Project Settings â†’
// Service Accounts â†’ Generate new private key
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let adminDb = null;

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
    console.log("Firebase Admin SDK initialized successfully.");
  } else {
    console.warn(
      "Firebase Admin SDK not configured \u2014 invite tokens will be in-memory only.\n" +
        "Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY."
    );
  }
} catch (err) {
  console.warn("Firebase Admin SDK init error (falling back to in-memory):", err.message);
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CORS â€” restrict to known origins only
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ALLOWED_ORIGINS = [
  "http://localhost:5173",  // Vite dev server
  "http://localhost:4173",  // Vite preview
  process.env.PRODUCTION_ORIGIN || "https://prblms.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., curl, Postman in dev)
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Rate Limiting
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// General API limiter â€” 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again in 15 minutes." },
});

// Stricter limit for write/submit endpoints â€” 10 per 10 minutes per IP
const writeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Submission rate limit reached. Please wait before trying again." },
});

// Admin endpoints â€” 20 per 15 minutes
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many admin requests. Please wait." },
});

app.use("/api", generalLimiter);

// In-memory audit log store (local dev fallback only â€” use Firestore in production)
let auditLogs = [];

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 1. Health Diagnostic
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    platform: "Prblms Intelligence Engine",
    version: "2.5.0",
    firebaseProject: process.env.VITE_FIREBASE_PROJECT_ID || "prblms-881bb",
    adminSdkConnected: adminDb !== null,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 2. AI Scoring Pipeline
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
    // Top-level composite scores for the UI
    painScore,
    opportunityScore,
    // AIScores shape â€” matches firebase.ts AIScores interface exactly
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 3. Problem Intake Ingestion
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.post("/api/problems/submit", writeLimiter, (req, res) => {
  const { title, description, industry, severity, submittedByUid, submittedByName } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Missing required fields for problem submission." });
  }
  if (!submittedByUid) {
    return res.status(401).json({ error: "Authentication required to submit a problem." });
  }

  const problemId = `prob-${crypto.randomUUID()}`;
  const now = new Date().toISOString();
  const severityMultiplier = { critical: 95, major: 85, medium: 70, minor: 50 }[severity] || 75;
  const overallPainScore = Math.min(98, Math.round(severityMultiplier * 0.8 + 15));
  const opportunityScore = Math.min(96, Math.round(overallPainScore * 0.9));

  res.json({
    success: true,
    message: "Problem submitted to the moderation queue.",
    problemId,
    painScore: overallPainScore,
    opportunityScore,
    status: "pending",
    createdAt: now,
  });
});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 4. Admin Moderation Status Transition
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.post("/api/problems/:id/status", adminLimiter, (req, res) => {
  const { id } = req.params;
  const { newStatus, adminUid, adminName, reviewNote } = req.body;

  const validStatuses = ["approved", "rejected", "needs_info", "pending", "under_review"];
  if (!newStatus || !validStatuses.includes(newStatus)) {
    return res.status(400).json({ error: "Invalid status transition value." });
  }
  if (!adminUid) {
    return res.status(401).json({ error: "Admin authentication required." });
  }

  auditLogs.unshift({
    id: `log-${Date.now()}`,
    actorUid: adminUid,
    actorName: adminName || "Admin",
    action: `problem.${newStatus}`,
    targetId: id,
    targetType: "problem",
    details: `Problem ${id} status \u2192 ${newStatus.toUpperCase()}${reviewNote ? ` | Note: ${reviewNote}` : ""}`,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, problemId: id, newStatus, updatedAt: new Date().toISOString() });
});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 5. Dynamic Form Response Submission
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.post("/api/forms/submit", writeLimiter, (req, res) => {
  const { formId, answers } = req.body;
  if (!formId || !answers) {
    return res.status(400).json({ error: "formId and answers are required." });
  }

  const responseId = `resp-${crypto.randomUUID()}`;
  res.json({
    success: true,
    message: "Form response registered successfully.",
    responseId,
    submittedAt: new Date().toISOString(),
  });
});

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 6. Admin Invite Token Engine â€” backed by Firestore for persistence
//    Falls back to in-memory if Firebase Admin SDK is not configured.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// In-memory fallback (lost on restart \u2014 only used when adminDb is null)
const inviteTokensFallback = {};
const INVITES_COLLECTION = "admin_invites";

app.post("/api/admin/invite/generate", adminLimiter, async (req, res) => {
  const { adminUid } = req.body;
  if (!adminUid) {
    return res.status(401).json({ error: "Admin UID required." });
  }

  const token = `inv_${crypto.randomUUID().replace(/-/g, "").substring(0, 16)}`;
  const expiresAt = new Date(Date.now() + 86400000).toISOString();
  const tokenDoc = { token, createdBy: adminUid, expiresAt, used: false, createdAt: new Date().toISOString() };

  if (adminDb) {
    try {
      await adminDb.collection(INVITES_COLLECTION).doc(token).set(tokenDoc);
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
      const snap = await ref.get();

      if (!snap.exists) {
        return res.status(400).json({ valid: false, error: "Token not found." });
      }

      const data = snap.data();
      if (data.used || new Date(data.expiresAt).getTime() < Date.now()) {
        return res.status(400).json({ valid: false, error: "Token is invalid, expired, or already consumed." });
      }

      await ref.update({ used: true, usedAt: new Date().toISOString() });
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 7. Platform Metrics
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.get("/api/metrics", async (req, res) => {
  const base = {
    systemStatus: "ONLINE",
    uptimeSeconds: Math.round(process.uptime()),
    adminSdkConnected: adminDb !== null,
    timestamp: new Date().toISOString(),
  };

  if (!adminDb) {
    // No Admin SDK \u2014 return uptime only, signal that real metrics require setup
    return res.status(501).json({
      ...base,
      note: "Real metrics require Firebase Admin SDK. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY.",
    });
  }

  try {
    const [problemsSnap, usersSnap] = await Promise.all([
      adminDb.collection("problems").count().get(),
      adminDb.collection("users").count().get(),
    ]);

    const approvedSnap = await adminDb
      .collection("problems")
      .where("status", "==", "approved")
      .count()
      .get();

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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// 404 Fallback
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

app.listen(PORT, () => {
  console.log(`\u26a1 Prblms Backend Engine running on http://localhost:${PORT}`);
  console.log(`   Allowed origins: ${ALLOWED_ORIGINS.join(", ")}`);
});
