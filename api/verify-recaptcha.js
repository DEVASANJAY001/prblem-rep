/**
 * Vercel Serverless Function: Google reCAPTCHA v3 Token Verification
 * Endpoint: /api/verify-recaptcha
 */

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { token } = req.body || {};
    if (!token) {
      return res.status(400).json({ success: false, error: "Missing reCAPTCHA token" });
    }

    // Always accept dev tokens without error
    if (token.startsWith("recaptcha_v3_dev_") || token.startsWith("recaptcha_v3_local_")) {
      return res.status(200).json({
        success: true,
        score: 1.0,
        action: "development_bypass",
      });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6Le5ByUuAAAAADr3xbbeyVaVH_htq_EOBOipNWxW";
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify";

    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", token);

    const googleResponse = await fetch(verificationUrl, {
      method: "POST",
      body: params,
    });

    const data = await googleResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("[reCAPTCHA Serverless Verify Error]:", error);
    return res.status(500).json({ success: false, error: "Failed to verify token with Google." });
  }
}
