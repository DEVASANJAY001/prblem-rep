import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Compass, ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/common/SEOHead";
import { HumanVerification } from "@/components/common/HumanVerification";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, registerWithEmail } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHumanVerified, setIsHumanVerified] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!isHumanVerified) {
      setError("Please complete the 'I am not a robot' verification check.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await registerWithEmail(name, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Registration failed.");
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
      setError(err?.message || "Google registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4 bg-surface font-body-md text-on-surface">
      <SEOHead title="Create Account" description="Join ProblemAtlas to validate and solve problems." noindex />
      <div className="flex flex-col w-full max-w-[420px] bg-surface-container-lowest shadow-sm rounded-xl p-8 gap-8 border border-outline-variant/40">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
            <Compass className="h-7 w-7" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Create Account</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Join ProblemAtlas to validate problems.</p>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-error-container p-3 text-label-md font-label-md text-on-error-container">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors text-on-surface font-label-md text-label-md"
          >
            <svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="flex items-center gap-4 w-full">
            <div className="h-px bg-outline-variant flex-1" />
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">or</span>
            <div className="h-px bg-outline-variant flex-1" />
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-outline"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-outline"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors placeholder:text-outline"
              />
            </div>

            <div className="pt-1">
              <HumanVerification
                onVerify={() => {
                  setIsHumanVerified(true);
                  setError(null);
                }}
                onExpire={() => setIsHumanVerified(false)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded-lg transition-colors mt-2 shadow-sm flex items-center justify-center gap-2"
            >
              <span>{loading ? "Creating..." : "Create Account"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-label-md">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
