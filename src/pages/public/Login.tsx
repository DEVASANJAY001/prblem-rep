import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import {
  Compass,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  X,
} from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";
import { HumanVerification } from "@/components/common/HumanVerification";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle, loginWithEmail } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHumanVerified, setIsHumanVerified] = useState(false);

  // Forgot password state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err?.message || "Google Sign-In failed.";
      if (msg.includes("popup-closed-by-user")) {
        setError("Sign-in popup was closed. Please try again.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    if (!isHumanVerified) {
      setError("Please complete the quick verification check below.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await loginWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      const code = err?.code;
      if (
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password" ||
        code === "auth/user-not-found"
      ) {
        setError("Invalid email or password. Please verify your credentials or reset your password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please wait a few moments or reset your password.");
      } else {
        setError(err?.message || "Sign in failed. Check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setResetError("Please enter your registered email address.");
      return;
    }
    setResetLoading(true);
    setResetError(null);
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim());
      setResetSuccess(true);
    } catch (err: any) {
      setResetError(err?.message || "Could not send reset link. Verify your email address.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-12rem)] py-8 sm:py-14 px-4 flex items-center justify-center font-['Poppins',sans-serif] text-on-surface bg-surface relative overflow-hidden selection:bg-primary/15 selection:text-primary">
      <SEOHead
        title="Sign In — ProblemAtlas"
        description="Sign in to your ProblemAtlas account to access verified problem dossiers, venture modeling tools, and community innovation bounties."
        noindex
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Card */}
      <div className="w-full max-w-[440px] mx-auto relative z-10">
        <div className="bg-surface-container-lowest dark:bg-surface-container-low/90 rounded-3xl border border-outline-variant/40 dark:border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.02)] p-7 sm:p-9 space-y-6 backdrop-blur-xl">
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-gradient-to-br from-primary to-blue-700 text-white shadow-md shadow-primary/20 hover:scale-105 transition-all duration-300"
              title="ProblemAtlas Home"
            >
              <Compass className="w-6 h-6" />
            </Link>

            <div className="pt-1">
              <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-on-surface">
                Welcome back
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Sign in to continue exploring problem intelligence.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2.5 animate-in fade-in duration-300">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Google 1-Click Action */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full group flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-outline-variant/50 hover:border-outline-variant bg-surface hover:bg-surface-container-low transition-all duration-300 text-on-surface font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer"
            >
              {/* Official 4-Color Google SVG */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="h-px bg-outline-variant/30 flex-1" />
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
              or with email
            </span>
            <div className="h-px bg-outline-variant/30 flex-1" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-on-surface" htmlFor="loginEmail">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-on-surface-variant/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="loginEmail"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-surface-container-low/60 dark:bg-surface-container/30 border border-outline-variant/40 focus:border-primary focus:bg-surface rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-on-surface" htmlFor="loginPassword">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setShowForgotModal(true);
                  }}
                  className="text-xs font-semibold text-primary hover:text-primary-container transition-colors hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-on-surface-variant/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="loginPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-surface-container-low/60 dark:bg-surface-container/30 border border-outline-variant/40 focus:border-primary focus:bg-surface rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface p-1 rounded-md transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-on-surface-variant">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary/20 border-outline-variant cursor-pointer accent-primary"
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Verification Widget */}
            <div className="pt-1">
              <HumanVerification
                onVerify={() => {
                  setIsHumanVerified(true);
                  setError(null);
                }}
                onExpire={() => setIsHumanVerified(false)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:pointer-events-none overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative flex items-center gap-2">
                {loading ? "Signing in..." : "Sign in"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          {/* Switch to Register */}
          <div className="text-center pt-2 border-t border-outline-variant/30">
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary-container font-bold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Security Footer Note */}
        <div className="pt-4 flex items-center justify-center gap-2 text-[11px] text-on-surface-variant/70 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>TLS 1.3 256-bit encrypted • Zero data selling guarantee</span>
        </div>
      </div>

      {/* ── Forgot Password Modal ─────────────────────────────────────────── */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-surface rounded-3xl p-6 sm:p-8 border border-outline-variant/40 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowForgotModal(false);
                setResetSuccess(false);
                setResetError(null);
              }}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-on-surface">Reset your password</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Enter your account email below. We'll send you a secure link to create a new password.
              </p>
            </div>

            {/* Success State */}
            {resetSuccess ? (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold">Password Reset Email Sent!</p>
                    <p>Check your inbox for instructions to set your new password.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4 pt-1">
                {resetError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-950 dark:text-rose-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{resetError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="resetEmail">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-on-surface-variant/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="resetEmail"
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-surface-container-low/60 border border-outline-variant/40 focus:border-primary focus:bg-surface rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-outline-variant text-xs font-semibold hover:bg-surface-container-low transition-colors text-on-surface cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
                  >
                    {resetLoading ? "Sending Link..." : "Send Reset Link"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
