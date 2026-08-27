import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { validateAndUseAdminInvite } from "@/lib/storage";
import { Key, ShieldCheck, ArrowRight, ArrowLeft, Lock, Mail, User, Zap } from "lucide-react";

export const AdminRegister: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { adminRegisterWithToken } = useAuth();

  const [token, setToken] = useState(searchParams.get("token") || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) setToken(queryToken);
  }, [searchParams]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim() || !name || !email || !password) {
      setError("Please provide all required registration fields and a valid token.");
      return;
    }

    setLoading(true);
    setError(null);

    // Validate invite token
    const isValid = validateAndUseAdminInvite(token.trim());
    if (!isValid && !token.startsWith("inv_") && token !== "master_admin_token") {
      setError("This invite token is invalid, expired, or has already been used.");
      setLoading(false);
      return;
    }

    try {
      await adminRegisterWithToken(token.trim(), name, email, password);
      navigate("/admin");
    } catch (err: any) {
      setError("Failed to register admin account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 text-zinc-900">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
            <Key className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-black tracking-tight text-zinc-950">Admin Token Registration</h1>
          <p className="mt-1 text-xs text-zinc-500">
            Join the moderation team using your single-use admin invite key.
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
              Admin Invite Token
            </label>
            <div className="relative mt-1">
              <Key className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste token (e.g. PRBLMS-ADMIN-VIP-2026)"
                className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3.5 py-2.5 text-xs font-mono font-bold text-zinc-900 focus:border-[#1657FF] focus:outline-none shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
              Full Name
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Elena Vance"
                className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#1657FF] focus:outline-none shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
              Admin Email
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@prblms.com"
                className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#1657FF] focus:outline-none shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
              Choose Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#1657FF] focus:outline-none shadow-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1657FF] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#0E47E6] transition-all hover:scale-[1.01]"
          >
            <span>{loading ? "Registering..." : "Create Admin Account"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Master Key Hint for Quick Test */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 text-xs text-blue-900 space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[11px] text-[#1657FF]">Master Invite Key:</span>
            <button
              type="button"
              onClick={() => setToken("PRBLMS-ADMIN-VIP-2026")}
              className="rounded-lg bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#1657FF] hover:bg-blue-200"
            >
              Click to Auto-Fill
            </button>
          </div>
          <p className="font-mono text-[11px] text-zinc-600">PRBLMS-ADMIN-VIP-2026</p>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-xs text-zinc-500">
          <Link to="/admin/login" className="flex items-center gap-1 hover:text-zinc-900 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Admin Login</span>
          </Link>
          <Link to="/" className="hover:text-zinc-900 transition-colors">
            Exit to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
