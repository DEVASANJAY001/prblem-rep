import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/common/SEOHead";
import { HumanVerification } from "@/components/common/HumanVerification";

interface AuthPageProps {
  defaultMode?: "login" | "register";
}

export const AuthPage: React.FC<AuthPageProps> = ({ defaultMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();

  // Mode derived from route, fallback to defaultMode if route doesn't match either
  const mode =
    location.pathname === "/register"
      ? "register"
      : location.pathname === "/login"
      ? "login"
      : defaultMode || "login";

  // Shared form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHumanVerified, setIsHumanVerified] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  // Clear errors when switching modes
  useEffect(() => {
    setError(null);
  }, [location.pathname]);

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  // Google 1-Click Action
  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err?.message || "Google Authentication failed.";
      if (msg.includes("popup-closed-by-user")) {
        setError("Sign-in popup was closed. Please try again.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Email Sign In
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
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await loginWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      const code = err?.code;
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("Invalid email or password combination. Please try again.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many unsuccessful attempts. Please reset your password or try again later.");
      } else {
        setError(err?.message || "Failed to sign in. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Email Registration
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in your name, email, and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters in length.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to our Terms of Service and Privacy Policy.");
      return;
    }
    if (!isHumanVerified) {
      setError("Please complete the quick verification check below.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await registerWithEmail(name.trim(), email.trim(), password);
      navigate("/dashboard");
    } catch (err: any) {
      const code = err?.code;
      if (code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please sign in instead.");
      } else if (code === "auth/weak-password") {
        setError("Please choose a stronger password.");
      } else {
        setError(err?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Password Reset Link
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.includes("@")) {
      setResetError("Please enter a valid email address.");
      return;
    }
    setResetLoading(true);
    setResetError(null);
    try {
      await sendPasswordResetEmail(auth, resetEmail.trim(), {
        url: `${window.location.origin}/login`,
      });
      setResetSuccess(true);
    } catch (err: any) {
      const code = err?.code;
      if (code === "auth/user-not-found") {
        setResetSuccess(true);
      } else {
        setResetError(err?.message || "Failed to send reset email. Please try again.");
      }
    } finally {
      setResetLoading(false);
    }
  };

  const switchMode = (target: "login" | "register") => {
    if (target === mode) return;
    setError(null);
    navigate(target === "login" ? "/login" : "/register");
  };

  return (
    <div className="w-full flex-1 min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] md:overflow-hidden flex items-center justify-center p-3 sm:p-5 font-['Poppins',sans-serif] text-on-surface bg-surface relative overflow-hidden selection:bg-primary/15 selection:text-primary">
      <SEOHead
        title={mode === "login" ? "Sign In — Stuckhere" : "Create Account — Stuckhere"}
        description={
          mode === "login"
            ? "Sign in to your Stuckhere account to access verified problem dossiers, venture modeling tools, and community innovation bounties."
            : "Join Stuckhere to validate real-world problems, build high-leverage startups, and access open innovation bounties."
        }
        noindex
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-primary/[0.07] dark:bg-primary/[0.12] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[320px] h-[320px] bg-blue-500/[0.05] rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] bg-indigo-500/[0.05] rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.03] via-transparent to-transparent pointer-events-none" />

      {/* 2-Column Split: Form on Left | Separator | Stuckhere Logo & Slogan on Right */}
      <div className="w-full max-w-4xl lg:max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-8 md:gap-12 lg:gap-16 py-2 sm:py-4 md:py-0 my-auto">
        
        {/* Left Column: Form with Smooth Crossfade & Slide Transition (Stable Fixed Height to prevent jump) */}
        <div className="w-full max-w-[380px] min-h-[500px] flex flex-col space-y-3 order-2 md:order-1">
          
          {/* Segmented Mode Switcher Pill - Stays in exact same fixed position */}
          <div className="flex p-1 bg-surface-container-low/80 dark:bg-surface-container/60 rounded-xl border border-outline-variant/30 w-[220px] shadow-2xs select-none shrink-0">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`relative flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center ${
                mode === "login" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {mode === "login" && (
                <motion.div
                  layoutId="auth-mode-pill"
                  className="absolute inset-0 bg-surface shadow-xs rounded-lg border border-outline-variant/30"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">Sign in</span>
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`relative flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center ${
                mode === "register" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {mode === "register" && (
                <motion.div
                  layoutId="auth-mode-pill"
                  className="absolute inset-0 bg-surface shadow-xs rounded-lg border border-outline-variant/30"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">Sign up</span>
            </button>
          </div>

          {/* Form Switching Container with stable minimum viewport */}
          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait" initial={false}>
            {mode === "login" ? (
              <motion.div
                key="login-form-container"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="space-y-3.5"
              >
                {/* Header */}
                <div className="text-left space-y-1">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-on-surface">
                    Welcome back
                  </h1>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant">
                    Sign in to continue exploring problem intelligence.
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2 animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-[11px]">{error}</span>
                  </div>
                )}

                {/* Google 1-Click Action */}
                <div>
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    className="w-full group flex items-center justify-center gap-2.5 py-2.5 px-3.5 rounded-xl border border-outline-variant/40 hover:border-outline-variant bg-surface-container-lowest/70 hover:bg-surface-container-low/80 dark:bg-surface-container/40 dark:hover:bg-surface-container/70 transition-all duration-200 text-on-surface font-semibold text-xs sm:text-[13px] shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
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
                <div className="relative flex items-center justify-center py-1">
                  <div className="border-t border-outline-variant/30 w-full" />
                  <span className="bg-surface px-3 text-[10px] sm:text-[11px] font-semibold text-on-surface-variant/60 uppercase tracking-widest absolute">
                    or with email
                  </span>
                </div>

                {/* Login Email Form */}
                <form onSubmit={handleEmailSignIn} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] sm:text-xs font-semibold text-on-surface flex items-center justify-between" htmlFor="loginEmail">
                      <span>Email Address</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-on-surface-variant/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="loginEmail"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex. deva@davns.com"
                        className="w-full bg-surface-container-low/60 border border-outline-variant/40 focus:border-primary focus:bg-surface rounded-xl pl-9 pr-3.5 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-3 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] sm:text-xs">
                      <label className="font-semibold text-on-surface" htmlFor="loginPassword">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setResetEmail(email);
                          setResetError(null);
                          setResetSuccess(false);
                          setShowForgotModal(true);
                        }}
                        className="text-[11px] text-primary hover:text-primary-container font-semibold hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-on-surface-variant/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="loginPassword"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-surface-container-low/60 border border-outline-variant/40 focus:border-primary focus:bg-surface rounded-xl pl-9 pr-9 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-3 focus:ring-primary/10 transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface transition-colors cursor-pointer"
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded-md border-outline-variant text-primary focus:ring-primary/20 w-3.5 h-3.5 cursor-pointer accent-primary"
                      />
                      <span className="text-[11px] text-on-surface-variant">Stay signed in for 30 days</span>
                    </label>
                  </div>

                  <div className="pt-0.5">
                    <HumanVerification
                      onVerify={() => setIsHumanVerified(true)}
                      onExpire={() => setIsHumanVerified(false)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !isHumanVerified}
                    className="w-full group relative overflow-hidden py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-[13px] shadow-sm hover:shadow-md active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? "Signing in..." : "Sign in"}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </form>

                {/* Switch to Register */}
                <div className="text-center pt-1">
                  <p className="text-[11px] sm:text-xs text-on-surface-variant">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("register")}
                      className="text-primary hover:text-primary-container font-bold hover:underline cursor-pointer"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register-form-container"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="space-y-3"
              >
                {/* Header */}
                <div className="text-left space-y-1">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-on-surface">
                    Create an account
                  </h1>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant">
                    Join founders and researchers mapping global friction.
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2 animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-[11px]">{error}</span>
                  </div>
                )}

                {/* Google 1-Click Action */}
                <div>
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    className="w-full group flex items-center justify-center gap-2.5 py-2.5 px-3.5 rounded-xl border border-outline-variant/40 hover:border-outline-variant bg-surface-container-lowest/70 hover:bg-surface-container-low/80 dark:bg-surface-container/40 dark:hover:bg-surface-container/70 transition-all duration-200 text-on-surface font-semibold text-xs sm:text-[13px] shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
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
                    <span>Sign up with Google</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center py-1">
                  <div className="border-t border-outline-variant/30 w-full" />
                  <span className="bg-surface px-3 text-[10px] sm:text-[11px] font-semibold text-on-surface-variant/60 uppercase tracking-widest absolute">
                    or with email
                  </span>
                </div>

                {/* Registration Email Form */}
                <form onSubmit={handleEmailRegister} className="space-y-2.5">
                  <div className="space-y-1">
                    <label className="text-[11px] sm:text-xs font-semibold text-on-surface" htmlFor="regName">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-on-surface-variant/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="regName"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex. Deva sanjay"
                        className="w-full bg-surface-container-low/60 border border-outline-variant/40 focus:border-primary focus:bg-surface rounded-xl pl-9 pr-3.5 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-3 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] sm:text-xs font-semibold text-on-surface" htmlFor="regEmail">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-on-surface-variant/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="regEmail"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex. deva@davns.com"
                        className="w-full bg-surface-container-low/60 border border-outline-variant/40 focus:border-primary focus:bg-surface rounded-xl pl-9 pr-3.5 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-3 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] sm:text-xs font-semibold text-on-surface" htmlFor="regPassword">
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-on-surface-variant/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="regPassword"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full bg-surface-container-low/60 border border-outline-variant/40 focus:border-primary focus:bg-surface rounded-xl pl-9 pr-9 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-3 focus:ring-primary/10 transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface transition-colors cursor-pointer"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-0.5">
                    <label className="flex items-start gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-0.5 rounded-md border-outline-variant text-primary focus:ring-primary/20 w-3.5 h-3.5 cursor-pointer accent-primary"
                      />
                      <span className="text-[11px] text-on-surface-variant leading-tight">
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline font-semibold" target="_blank">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:underline font-semibold" target="_blank">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>

                  <div className="pt-0.5">
                    <HumanVerification
                      onVerify={() => setIsHumanVerified(true)}
                      onExpire={() => setIsHumanVerified(false)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !agreedToTerms || !isHumanVerified}
                    className="w-full group relative overflow-hidden py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-[13px] shadow-sm hover:shadow-md active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative flex items-center justify-center gap-1.5">
                      {loading ? "Creating Account..." : "Create Free Account"}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </form>

                {/* Switch to Sign In */}
                <div className="text-center pt-1">
                  <p className="text-[11px] sm:text-xs text-on-surface-variant">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="text-primary hover:text-primary-container font-bold hover:underline cursor-pointer"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

        </div>

        {/* Center Vertical Separator */}
        <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-outline-variant/30 to-transparent min-h-[440px]" />

        {/* Right Column: Stuckhere Logo & Slogan (Hidden on mobile, visible on desktop md+) */}
        <div className="hidden md:flex w-full max-w-[380px] flex-col items-start text-left space-y-3.5 md:order-2 py-2">
          <Link
            to="/"
            className="group inline-flex items-center"
            title="Stuckhere Home"
          >
            <span className="font-headline-sm text-4xl sm:text-5xl lg:text-6xl tracking-tight text-on-surface font-extrabold flex items-center transition-transform group-hover:scale-[1.02]">
              Stuck<span className="text-primary ml-1">here</span>
            </span>
          </Link>

          <div className="min-h-[56px] flex items-center md:items-start">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={mode === "login" ? "login-slogan" : "register-slogan"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="text-sm sm:text-base text-on-surface-variant font-medium leading-relaxed max-w-xs"
              >
                {mode === "login"
                  ? "Turn unaddressed industry friction into high-conviction venture opportunities."
                  : "Discover verified, quantified real-world bottlenecks worth building for."}
              </motion.p>
            </AnimatePresence>
          </div>
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
                      placeholder="Ex. deva@davns.com"
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
