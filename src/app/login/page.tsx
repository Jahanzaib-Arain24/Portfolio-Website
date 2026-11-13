"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("arainjhanzaib@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success("Welcome back, Jahanzaib!");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error("Invalid credentials.");
      }
    } catch {
      toast.error("Login failed. Check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster position="top-center" />
      <div className="glow-orb-primary top-10 left-1/3 opacity-30" />
      <div className="glow-orb-secondary bottom-10 right-1/4 opacity-30" />

      <div className="w-full max-w-md p-8 rounded-3xl bg-[#0e101a]/90 border border-white/10 backdrop-blur-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px] mx-auto mb-4">
            <div className="w-full h-full bg-[#0d0f17] rounded-[15px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Portfolio CMS</h1>
          <p className="text-xs text-slate-400 font-mono">
            Admin Authentication Control
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 focus:bg-white/[0.06] text-white text-sm outline-none transition-colors"
                placeholder="arainjhanzaib@gmail.com"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 focus:bg-white/[0.06] text-white text-sm outline-none transition-colors"
                placeholder="••••••••••••"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Back to Public Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

