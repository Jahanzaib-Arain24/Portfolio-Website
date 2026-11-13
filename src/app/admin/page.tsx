import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FolderGit2,
  Cpu,
  Briefcase,
  Award,
  GraduationCap,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardOverview() {
  const [
    projectsCount,
    skillsCount,
    experienceCount,
    certificationsCount,
    educationCount,
    messagesCount,
    unreadMessagesCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.certification.count(),
    prisma.education.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  const stats = [
    {
      title: "Featured Projects",
      count: projectsCount,
      href: "/admin/projects",
      icon: FolderGit2,
      sub: "Live Case Studies",
      color: "text-[#F1BF00]",
      border: "hover:border-[#F1BF00]/50",
    },
    {
      title: "Active Skills",
      count: skillsCount,
      href: "/admin/skills",
      icon: Cpu,
      sub: "Across 4 Categories",
      color: "text-[#CAD5E2]",
      border: "hover:border-white/30",
    },
    {
      title: "Work Experience",
      count: experienceCount,
      href: "/admin/experience",
      icon: Briefcase,
      sub: "Production Roles",
      color: "text-[#AA151B]",
      border: "hover:border-[#AA151B]/50",
    },
    {
      title: "Certifications",
      count: certificationsCount,
      href: "/admin/certifications",
      icon: Award,
      sub: "Meta & Coursera",
      color: "text-[#F1BF00]",
      border: "hover:border-[#F1BF00]/50",
    },
    {
      title: "Formal Education",
      count: educationCount,
      href: "/admin/education",
      icon: GraduationCap,
      sub: "Degrees & Diplomas",
      color: "text-[#FFF8DC]",
      border: "hover:border-[#FFF8DC]/40",
    },
    {
      title: "Client Messages",
      count: messagesCount,
      href: "/admin/messages",
      icon: MessageSquare,
      sub: unreadMessagesCount > 0 ? `${unreadMessagesCount} Unread Dispatches` : "All Caught Up",
      color: unreadMessagesCount > 0 ? "text-emerald-400" : "text-[#999999]",
      border: unreadMessagesCount > 0 ? "hover:border-emerald-500/50" : "hover:border-white/20",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Banner */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-[#15171D] via-[#101217] to-[#0B0C0E] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#AA151B]/20 via-[#F1BF00]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Control Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-serif-heading mb-3">
            Welcome, <span className="text-gradient-vos">Muhammad Jahanzaib</span>
          </h1>
          <p className="text-sm text-[#999999] leading-relaxed">
            Manage your high-performance portfolio ecosystem. All updates made here are instantly committed to your embedded SQLite database and reflected live on your public site.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Link
              href="/admin/projects"
              className="btn-royal-gold text-xs"
            >
              <span>Manage Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="btn-royal-crimson text-xs"
            >
              <span>Preview Live Site</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modules Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white font-serif-heading">
            Live Modules Overview
          </h2>
          <span className="text-xs font-mono text-[#999999]">
            7 Autonomous Control Panels
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Link
                key={idx}
                href={stat.href}
                className={`group relative rounded-2xl p-6 bg-gradient-to-b from-[#15171D] to-[#0D0F14] border border-white/10 ${stat.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B0C0E] border border-white/10 group-hover:border-[#F1BF00]/40 flex items-center justify-center shadow-inner transition-colors">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                    {stat.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#FFF8DC] transition-colors font-serif-heading">
                    {stat.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1 text-xs font-mono text-[#999999]">
                    <span>{stat.sub}</span>
                    <span className="text-[#F1BF00] opacity-0 group-hover:opacity-100 transition-opacity">
                      Manage &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
