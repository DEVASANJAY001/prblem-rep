import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, ArrowRight, Compass, Shield } from "lucide-react";

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your admin credentials.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await adminLogin(email, password);
      navigate("/admin");
    } catch (err: any) {
      setError("Invalid administrative credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-inverse-surface font-body-md text-inverse-on-surface min-h-screen flex flex-col items-center justify-center p-4">
      {/* Top Left Brand */}
      <div className="fixed top-8 left-8 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-sm">
          PA
        </div>
        <span className="font-headline-sm text-headline-sm text-inverse-on-surface">ProblemAtlas</span>
      </div>

      <main className="w-full max-w-md">
        <div className="w-full bg-surface rounded-xl shadow-xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden text-on-surface border border-outline-variant/30">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent pointer-events-none" />

          {/* Logo & Admin Badge */}
          <div className="flex items-center gap-3 z-10">
            <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
              <Compass className="h-5 w-5 text-on-primary" />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-highest rounded-full">
              <Lock className="h-3 w-3 text-on-surface-variant" />
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Admin
              </span>
            </div>
          </div>

          <div className="z-10">
            <h1 className="text-headline-md font-headline-md text-on-surface">Admin Portal</h1>
            <p className="text-body-md text-on-surface-variant mt-1">Sign in with administrative credentials.</p>
          </div>

          {error && (
            <div className="rounded-lg bg-error-container p-3 text-label-md font-label-md text-on-error-container z-10">
              {error}
            </div>
          )}

          <form onSubmit={handleAdminSignIn} className="flex flex-col gap-5 z-10">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@problematlas.com"
                className="w-full h-11 px-4 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:outline-none font-body-md text-on-surface placeholder:text-outline transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:outline-none font-body-md text-on-surface placeholder:text-outline transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 bg-primary rounded-lg font-label-md text-label-md text-on-primary hover:bg-primary-container transition-colors flex items-center justify-center gap-2 group shadow-md hover:shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10">{loading ? "Authenticating..." : "Log In"}</span>
              <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Quick auto-fill helper for development */}
          <div className="rounded-lg border border-outline-variant/50 bg-surface-container-low p-3 text-label-sm font-label-sm text-on-surface-variant flex items-center justify-between z-10">
            <span>Demo: admin@prblms.com</span>
            <button
              type="button"
              onClick={() => {
                setEmail("admin@prblms.com");
                setPassword("admin123");
              }}
              className="text-primary font-bold hover:underline"
            >
              Auto-Fill
            </button>
          </div>

          <div className="text-center z-10 pt-4 border-t border-outline-variant/40 flex items-center justify-between">
            <Link to="/admin/register" className="text-label-sm font-label-sm text-primary hover:underline">
              Register with invite code →
            </Link>
            <Link to="/" className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface">
              Exit to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
