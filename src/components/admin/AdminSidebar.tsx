"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Briefcase,
  Award,
  GraduationCap,
  MessageSquare,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Hero & Bio Narrative", href: "/admin/profile", icon: User },
  { name: "Projects & Showcases", href: "/admin/projects", icon: FolderGit2 },
  { name: "Skills Matrix", href: "/admin/skills", icon: Cpu },
  { name: "Work Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "Formal Education", href: "/admin/education", icon: GraduationCap },
  { name: "Client Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    toast.loading("Ending session...", { id: "logout-toast" });

    try {
      await fetch("/api/auth", { method: "DELETE" });
      toast.success("Logged out successfully", { id: "logout-toast" });
      router.push("/login");
      router.refresh();
      window.location.href = "/login";
    } catch {
      // Fallback direct GET navigation
      window.location.href = "/api/auth";
    }
  };

  return (
    <>
      {/* ========================================================
          MOBILE TOP APP BAR (Visible only on < md screens)
          ======================================================== */}
      <header className="md:hidden sticky top-0 z-40 bg-[#101217]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl p-[1.5px] bg-gradient-to-tr from-[#AA151B] via-[#F1BF00] to-[#AA151B] shadow-md shadow-[#F1BF00]/10 shrink-0">
            <div className="w-full h-full bg-[#0B0C0E] rounded-[10px] flex items-center justify-center font-bold text-[11px] text-[#F1BF00] font-mono">
              &lt;MJ/&gt;
            </div>
          </div>
          <div>
            <h2 className="font-bold text-sm text-white font-serif-heading leading-tight">
              Jahanzaib CMS
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-[9px] text-emerald-400 font-mono tracking-wider uppercase">
                Active
              </p>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Quick Logout Button on Mobile Header */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title="Terminate Session"
            className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all cursor-pointer"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/[0.04] text-white border border-white/10 hover:border-[#F1BF00]/50 transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#F1BF00]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ========================================================
          MOBILE SLIDE-IN DRAWER OVERLAY
          ======================================================== */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-5 animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm mx-auto bg-[#101217] border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl p-[1.5px] bg-gradient-to-tr from-[#AA151B] via-[#F1BF00] to-[#AA151B]">
                  <div className="w-full h-full bg-[#0B0C0E] rounded-[10px] flex items-center justify-center font-bold text-[11px] text-[#F1BF00] font-mono">
                    &lt;MJ/&gt;
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Navigation</h3>
                  <p className="text-[10px] text-white/40 font-mono">Select CMS Module</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-1.5 flex-1 overflow-y-auto pr-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#F1BF00]/15 text-[#F1BF00] border border-[#F1BF00]/40 shadow-sm shadow-[#F1BF00]/10"
                        : "text-[#CAD5E2] hover:text-white hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#F1BF00]" : "text-[#999999]"}`} />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-white/10 space-y-2.5 mt-4 shrink-0">
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#CAD5E2] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F1BF00]" />
                  Live Portfolio
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-[#999999]" />
              </Link>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{loggingOut ? "Logging out..." : "Terminate Session (Logout)"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          DESKTOP PERSISTENT SIDEBAR (Visible on md+ screens)
          ======================================================== */}
      <aside className="hidden md:flex w-72 bg-[#101217] border-r border-white/10 flex-col justify-between p-6 shrink-0 shadow-2xl relative z-20 min-h-screen">
        <div>
          {/* Brand & Auth Badge */}
          <div className="flex items-center gap-3.5 pb-6 border-b border-white/10 mb-6">
            <div className="w-11 h-11 rounded-2xl p-[1.5px] bg-gradient-to-tr from-[#AA151B] via-[#F1BF00] to-[#AA151B] shadow-lg shadow-[#F1BF00]/20 shrink-0">
              <div className="w-full h-full bg-[#0B0C0E] rounded-[14px] flex items-center justify-center font-bold text-xs text-[#F1BF00] font-mono">
                &lt;MJ/&gt;
              </div>
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm text-white font-serif-heading truncate">
                Jahanzaib CMS
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[10px] text-emerald-400 font-mono tracking-wide uppercase">
                  Active Session
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Section Title */}
          <div className="mb-3 px-3">
            <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
              Management Modules
            </span>
          </div>

          {/* Navigation Links with Active State */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-[#F1BF00]/15 text-[#F1BF00] border border-[#F1BF00]/40 shadow-sm shadow-[#F1BF00]/10"
                      : "text-[#999999] hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/5"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? "text-[#F1BF00]" : "text-[#F1BF00]"
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2 mt-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#CAD5E2] hover:text-[#FFF8DC] bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F1BF00]" />
              Live Portfolio
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#999999]" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{loggingOut ? "Logging out..." : "Terminate Session (Logout)"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

