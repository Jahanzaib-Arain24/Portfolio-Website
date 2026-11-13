import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FolderGit2,
  MessageSquare,
  Award,
  Cpu,
  Briefcase,
  GraduationCap,
  Plus,
  ArrowUpRight,
  User,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [
    projectCount,
    messageCount,
    certCount,
    skillCount,
    experienceCount,
    educationCount,
    recentMessages,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.certification.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.education.count(),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const cards = [
    { label: "Live Projects", count: projectCount, href: "/admin/projects", icon: FolderGit2, color: "text-indigo-400" },
    { label: "Skills in Matrix", count: skillCount, href: "/admin/skills", icon: Cpu, color: "text-cyan-400" },
    { label: "Work Experiences", count: experienceCount, href: "/admin/experience", icon: Briefcase, color: "text-emerald-400" },
    { label: "Certifications", count: certCount, href: "/admin/certifications", icon: Award, color: "text-amber-400" },
    { label: "Education Entries", count: educationCount, href: "/admin/education", icon: GraduationCap, color: "text-purple-400" },
    { label: "Client Inquiries", count: messageCount, href: "/admin/messages", icon: MessageSquare, color: "text-rose-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Comprehensive CMS Control
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Edit, update, add, and remove all portfolio sections from one unified hub.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/profile"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-semibold text-xs transition-colors"
          >
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span>Edit Profile</span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </Link>
        </div>
      </div>

      {/* Grid of All 6 Management Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <Link
              key={idx}
              href={c.href}
              className="p-5 rounded-2xl bg-[#0e101a] border border-white/10 hover:border-indigo-500/40 transition-all duration-200 group block shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{c.label}</span>
                <Icon className={`w-4 h-4 ${c.color} group-hover:scale-110 transition-transform`} />
              </div>
              <p className="text-2xl font-extrabold text-white font-mono group-hover:text-indigo-300 transition-colors">
                {c.count}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent Dispatches */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0e101a] border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Recent Inquiries & Contact Transmissions</h2>
          <Link
            href="/admin/messages"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <p className="text-xs text-slate-500 py-8 text-center font-mono">
            No contact submissions received yet.
          </p>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{msg.name}</span>
                    <span className="text-xs text-slate-400 font-mono">({msg.email})</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">{msg.subject} — {msg.message}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-500 shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
