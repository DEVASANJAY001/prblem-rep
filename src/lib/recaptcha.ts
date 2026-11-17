/**
 * Google reCAPTCHA v3 Client-Side Service
 * Frictionless background bot verification according to Google reCAPTCHA v3 specifications.
 * Documentation: https://developers.google.com/recaptcha/docs/v3
 */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let scriptLoadingPromise: Promise<void> | null = null;

/**
 * Returns the configured reCAPTCHA v3 site key from environment variables.
 */
export function getRecaptchaSiteKey(): string {
  return (import.meta.env.VITE_RECAPTCHA_SITE_KEY || "").trim();
}

/**
 * Checks if a real reCAPTCHA v3 site key has been configured.
 */
export function isRecaptchaConfigured(): boolean {
  const key = getRecaptchaSiteKey();
  return Boolean(key && key.length > 5 && !key.includes("your_recaptcha"));
}

/**
 * Dynamically loads the official Google reCAPTCHA v3 script tag into the document head.
 */
export function loadRecaptchaScript(): Promise<void> {
  const siteKey = getRecaptchaSiteKey();
  if (!siteKey) {
    return Promise.resolve();
  }

  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  // Already loaded
  if (window.grecaptcha) {
    return Promise.resolve();
  }

  // Currently loading
  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  scriptLoadingPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById("google-recaptcha-v3");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-recaptcha-v3";
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = (err) => {
      console.warn("[reCAPTCHA v3] Script failed to load (adblocker or offline):", err);
      // Gracefully resolve so app actions are never permanently blocked
      resolve();
    };

    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

/**
 * Programmatically invokes Google reCAPTCHA v3 challenge without user friction.
 * Returns a valid token for backend/Firestore verification.
 * 
 * In development or when VITE_RECAPTCHA_SITE_KEY is not configured, returns a mock
 * dev token immediately so authentication and form submissions are never blocked.
 * 
 * @param action - Action descriptor (e.g. 'login', 'register', 'submit_problem', 'contact')
 */
export async function executeRecaptcha(action: string = "submit"): Promise<string> {
  const siteKey = getRecaptchaSiteKey();

  // Graceful fallback when site key is not configured (e.g. local dev / staging)
  if (!isRecaptchaConfigured()) {
    const simulatedToken = `recaptcha_v3_dev_${action}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    return simulatedToken;
  }

  try {
    await loadRecaptchaScript();

    if (!window.grecaptcha) {
      console.warn("[reCAPTCHA v3] grecaptcha object unavailable; proceeding with client token fallback.");
      return `recaptcha_v3_fallback_${action}_${Date.now()}`;
    }

    return await new Promise<string>((resolve) => {
      window.grecaptcha!.ready(async () => {
        try {
          const token = await window.grecaptcha!.execute(siteKey, { action });
          resolve(token);
        } catch (execErr) {
          console.warn("[reCAPTCHA v3] execute call error; proceeding with fallback:", execErr);
          resolve(`recaptcha_v3_fallback_${action}_${Date.now()}`);
        }
      });
    });
  } catch (err) {
    console.warn("[reCAPTCHA v3] Execution exception:", err);
    return `recaptcha_v3_exception_${action}_${Date.now()}`;
  }
}
