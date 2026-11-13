import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
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
  ShieldAlert,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated_jahanzaib_session_2026") {
    redirect("/login");
  }

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

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#CAD5E2] flex flex-col md:flex-row font-sans selection:bg-[#F1BF00] selection:text-[#0B0C0E]">
      {/* Royal Dark Sidebar */}
      <aside className="w-full md:w-72 bg-[#101217] border-r border-white/10 flex flex-col justify-between p-6 shrink-0 shadow-2xl relative z-20">
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

          {/* Navigation Links */}
          <div className="mb-3 px-3">
            <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
              Management Modules
            </span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#999999] hover:text-white hover:bg-white/[0.04] transition-all group border border-transparent hover:border-white/5"
                >
                  <Icon className="w-4 h-4 text-[#F1BF00] group-hover:scale-110 transition-transform" />
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

          <form action="/api/auth" method="DELETE">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Terminate Session (Logout)</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Viewport */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen bg-[#0B0C0E]">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
