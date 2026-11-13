"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("arainjhanzaib@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-[#0B0C0E] flex items-center justify-center p-4 relative overflow-hidden text-white font-sans selection:bg-[#F1BF00] selection:text-[#0B0C0E]">
      <Toaster position="top-center" />

      {/* Royal Dark Atmosphere glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#F1BF00]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#AA151B]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#101217] border border-[#F1BF00]/25 backdrop-blur-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#AA151B] to-[#F1BF00] p-[1.5px] mx-auto mb-4 shadow-lg shadow-[#F1BF00]/10">
            <div className="w-full h-full bg-[#0B0C0E] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-[#F1BF00]" />
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/25 text-[#F1BF00] text-[11px] font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Royal Dark CMS</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Gateway</h1>
          <p className="text-xs text-white/50 font-mono mt-1">
            Authenticate to access portfolio command center
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#F1BF00]/60 focus:bg-white/[0.06] text-white text-sm outline-none transition-all font-mono"
                placeholder="arainjhanzaib@gmail.com"
              />
              <Mail className="w-4 h-4 text-[#F1BF00] absolute left-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#F1BF00]/60 focus:bg-white/[0.06] text-white text-sm outline-none transition-all font-mono"
                placeholder="••••••••••••"
              />
              {/* Visible Crisp Gold Lock Icon on Left */}
              <Lock className="w-4 h-4 text-[#F1BF00] absolute left-3.5 top-3.5 pointer-events-none" />

              {/* Show / Hide Password Toggle Icon on Right */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-white/40 hover:text-[#F1BF00] transition-colors p-0.5 cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-[#F1BF00]" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#F1BF00] text-[#0B0C0E] font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#F1BF00]/20 hover:bg-[#F1BF00]/90 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-3 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Enter Admin Console</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-4 border-t border-white/5">
          <a
            href="/"
            className="text-xs font-mono text-white/50 hover:text-[#F1BF00] transition-colors inline-flex items-center gap-1"
          >
            ← Return to Live Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
