import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Compass,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";
import { HumanVerification } from "@/components/common/HumanVerification";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, registerWithEmail } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHumanVerified, setIsHumanVerified] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
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
      setError("Please complete the verification check below to continue.");
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
        setError("Please choose a stronger password with letters, numbers, and symbols.");
      } else {
        setError(err?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err: any) {
      const msg = err?.message || "Google registration failed.";
      if (msg.includes("popup-closed-by-user")) {
        setError("Registration window was closed. Please try again.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-surface font-['Poppins',sans-serif] text-on-surface flex flex-col justify-between selection:bg-primary/15 selection:text-primary">
      <SEOHead
        title="Create Account — ProblemAtlas"
        description="Join ProblemAtlas to validate real-world problems, build high-leverage startups, and access open innovation bounties."
        noindex
      />

      {/* Main Split Layout */}
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-4rem)]">
        {/* Left Form Column */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-12 xl:px-16 py-12 relative z-10">
          <div className="w-full max-w-[440px] mx-auto space-y-7">
            {/* Header / Brand Logo */}
            <div className="space-y-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 group transition-transform duration-300 hover:scale-102"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-700 text-white flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-primary/30 transition-all">
                  <Compass className="h-5.5 w-5.5 transition-transform duration-500 group-hover:rotate-45" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-on-surface">
                  Problem<span className="text-primary">Atlas</span>
                </span>
              </Link>

              <div className="pt-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-on-surface">
                  Create your account
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Join researchers, founders, and changemakers mapping global problem intelligence.
                </p>
              </div>
            </div>

            {/* Error Message Alert */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2.5 animate-in fade-in duration-300">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Google 1-Click Sign Up */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full group relative flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest hover:bg-surface-container-low hover:border-outline-variant transition-all duration-300 text-on-surface font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-xs cursor-pointer active:scale-98"
              >
                {/* Official 4-Color Google G Logo */}
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
                <span>Sign up with Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 w-full">
                <div className="h-px bg-outline-variant/40 flex-1" />
                <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  or register with email
                </span>
                <div className="h-px bg-outline-variant/40 flex-1" />
              </div>

              {/* Registration Form */}
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-on-surface-variant/70 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <input
                      id="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-surface-container-low/70 border border-outline-variant/50 focus:border-primary focus:bg-surface rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="regEmail">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-on-surface-variant/70 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <input
                      id="regEmail"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-surface-container-low/70 border border-outline-variant/50 focus:border-primary focus:bg-surface rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="regPassword">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-on-surface-variant/70 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <input
                      id="regPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full bg-surface-container-low/70 border border-outline-variant/50 focus:border-primary focus:bg-surface rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant/70 hover:text-on-surface p-1 rounded-md transition-colors"
                      title={showPassword ? "Hide password" : "Show password"}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="termsAgreement"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary/20 border-outline-variant cursor-pointer accent-primary mt-0.5"
                  />
                  <label htmlFor="termsAgreement" className="text-[11px] sm:text-xs text-on-surface-variant leading-relaxed select-none cursor-pointer">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary font-bold hover:underline" target="_blank">
                      Terms of Service
                    </Link>{" "}
                    and acknowledge the{" "}
                    <Link to="/privacy" className="text-primary font-bold hover:underline" target="_blank">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* Human Verification Component */}
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
                  className="w-full group relative inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:pointer-events-none overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative flex items-center gap-2">
                    {loading ? "Creating Account..." : "Create Free Account"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </form>
            </div>

            {/* Switch to Sign In */}
            <div className="text-center pt-2">
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-container font-bold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Trust & Encryption Badge */}
            <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-center gap-2 text-[11px] text-on-surface-variant/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>TLS 1.3 256-bit Encrypted • 100% Free Solver Account</span>
            </div>
          </div>
        </div>

        {/* Right Visual Showcase Column */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 bg-gradient-to-br from-primary/10 via-surface-container-low to-surface border-l border-outline-variant/20 p-10 xl:p-14 flex-col justify-between relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Top Tagline */}
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 backdrop-blur-md border border-outline-variant/40 text-xs font-bold text-primary shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Solvers & Founders Choose ProblemAtlas</span>
            </div>
            <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight text-on-surface leading-snug">
              Stop guessing market pain. Build on verified, empirical bottlenecks.
            </h2>
          </div>

          {/* Centerpiece: Three Key Value Cards */}
          <div className="relative z-10 my-8 space-y-3.5 max-w-lg">
            <div className="p-4.5 rounded-2xl bg-surface/90 backdrop-blur-xl border border-outline-variant/40 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-on-surface">100% Solver IP Protection</h3>
                <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                  You own every line of software, hardware design, patent, and equity in the company you build.
                </p>
              </div>
            </div>

            <div className="p-4.5 rounded-2xl bg-surface/90 backdrop-blur-xl border border-outline-variant/40 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-on-surface">10-Point Diagnostic Verification</h3>
                <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                  Every problem includes concrete trigger workflows, affected practitioner roles, and primary evidence citations.
                </p>
              </div>
            </div>

            <div className="p-4.5 rounded-2xl bg-surface/90 backdrop-blur-xl border border-outline-variant/40 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-on-surface">Startup Canvas & Venture Modeling</h3>
                <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                  Access instant Total Addressable Market (TAM) estimations, willingness-to-pay signals, and risk frameworks.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Social Proof / Brand Row */}
          <div className="relative z-10 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Harvesting problem signals from world innovators</span>
            <div className="flex items-center gap-3 opacity-60">
              <span className="font-bold text-[11px]">Google</span>
              <span>•</span>
              <span className="font-bold text-[11px]">Meta</span>
              <span>•</span>
              <span className="font-bold text-[11px]">Amazon</span>
              <span>•</span>
              <span className="font-bold text-[11px]">Microsoft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
