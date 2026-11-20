"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Zap, Rocket, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import TypingRoles from "./TypingRoles";

interface SocialLinkData {
  platform: string;
  url: string;
}

interface HeroSectionProps {
  name: string;
  title: string;
  subtitle: string;
  greeting: string;
  badge: string;
  primaryCTA: string;
  secondaryCTA: string;
  resumeUrl: string;
  counters: Array<{ label: string; value: string }>;
  typingRoles?: string | null;
  phone?: string;
  location?: string;
  socialLinks?: SocialLinkData[];
}

export default function HeroSection({
  name,
  subtitle,
  greeting,
  badge,
  primaryCTA,
  secondaryCTA,
  resumeUrl,
  counters,
  typingRoles,
  location,
  socialLinks: dbSocialLinks,
}: HeroSectionProps) {
  const actualResumeUrl = resumeUrl || "/assets/jahanzaib-dev.pdf";

  const typingRolesList = typingRoles
    ? typingRoles.split(",").map((r) => r.trim()).filter(Boolean)
    : [
        "Frontend Engineer",
        "React.js & Next.js Developer",
        "Full Stack Web Developer",
      ];

  const defaultSocialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jahanzaib-arain/",
      icon: LinkedinIcon,
      hoverColor: "hover:text-[#F1BF00] hover:border-[#F1BF00]/40",
    },
    {
      name: "GitHub",
      href: "https://github.com/Jahanzaib-Arain24",
      icon: GithubIcon,
      hoverColor: "hover:text-[#F1BF00] hover:border-[#F1BF00]/40",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/Jahanzaib.Arain24",
      icon: FacebookIcon,
      hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]/40",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/jahanzaib.arain24/",
      icon: InstagramIcon,
      hoverColor: "hover:text-[#E4405F] hover:border-[#E4405F]/40",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/923123358542",
      icon: WhatsAppIcon,
      hoverColor: "hover:text-[#25D366] hover:border-[#25D366]/40",
    },
  ];

  // Resolve links from DB if provided, else use default
  const resolvedSocialLinks = dbSocialLinks && dbSocialLinks.length > 0
    ? dbSocialLinks.map((item) => {
        const plat = item.platform.toLowerCase();
        let Icon = LinkedinIcon;
        let hoverColor = "hover:text-[#F1BF00] hover:border-[#F1BF00]/40";

        if (plat.includes("github")) {
          Icon = GithubIcon;
          hoverColor = "hover:text-[#F1BF00] hover:border-[#F1BF00]/40";
        } else if (plat.includes("facebook")) {
          Icon = FacebookIcon;
          hoverColor = "hover:text-[#1877F2] hover:border-[#1877F2]/40";
        } else if (plat.includes("instagram")) {
          Icon = InstagramIcon;
          hoverColor = "hover:text-[#E4405F] hover:border-[#E4405F]/40";
        } else if (plat.includes("whatsapp")) {
          Icon = WhatsAppIcon;
          hoverColor = "hover:text-[#25D366] hover:border-[#25D366]/40";
        }

        return {
          name: item.platform,
          href: item.url,
          icon: Icon,
          hoverColor,
        };
      })
    : defaultSocialLinks;

  return (
    <section id="home" className="relative min-h-[94vh] pt-28 sm:pt-36 pb-16 sm:pb-24 flex flex-col justify-center overflow-hidden bg-[#0B0C0E]">
      {/* VOS Dual Radial Gradients */}
      <div className="glow-orb-crimson -top-10 left-10 opacity-60" />
      <div className="glow-orb-gold top-48 right-0 opacity-50" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-w-0">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 min-w-0"
          >
            {/* Live Gold Beacon Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] sm:text-xs font-semibold mb-6 shadow-sm backdrop-blur-md max-w-full">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F1BF00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F1BF00]" />
              </span>
              <span className="leading-snug">{badge || "Available for Full-Time Roles & High-Impact Contracts (Remote Worldwide)"}</span>
            </div>

            {/* Greeting & Name Heading (Ensured single line on mobile) */}
            <p className="text-[#999999] font-mono text-xs sm:text-sm tracking-wider uppercase mb-2">
              {greeting || "Hi There, I'm"}
            </p>
            <h1 className="text-[25px] xs:text-[28px] sm:text-5xl lg:text-[62px] font-bold text-white mb-3 sm:mb-4 leading-tight font-serif-heading">
              {name ? name.split(" ")[0] : "Muhammad"}{" "}
              <span className="text-gradient-vos inline">
                {name ? name.split(" ").slice(1).join(" ") : "Jahanzaib."}
              </span>
            </h1>

            {/* Interactive Typewriter Effect (Single line on mobile) */}
            <div className="mb-6 min-h-[28px] sm:min-h-[38px] flex items-center">
              <h2 className="text-sm xs:text-base sm:text-2xl lg:text-[26px] font-bold text-white flex items-center gap-1.5 sm:gap-2 whitespace-nowrap overflow-x-hidden">
                <span>I Am Into</span>
                <TypingRoles roles={typingRolesList} />
              </h2>
            </div>

            {/* High-Converting Pitch / Subtitle Description */}
            <p className="text-[#CAD5E2] text-xs sm:text-base leading-relaxed sm:leading-[26px] max-w-xl mb-8">
              {subtitle || "I architect scalable, high-performance web systems and bespoke digital products. By combining modern React & Next.js engineering with rigorous quality discipline, I build lightning-fast web applications engineered for seamless user experience and maximum business growth."}
            </p>

            {/* Action Buttons: Royal Gold + Crimson Glass Pill (Compact sleek sizing on mobile, full desktop sizing on sm+) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <a
                href="/projects"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("projects");
                  if (el) {
                    const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: topOffset, behavior: "smooth" });
                    window.history.pushState(null, "", "/projects");
                  }
                }}
                className="btn-royal-gold cursor-pointer justify-center py-2.5 sm:py-3.5 px-5 sm:px-7 text-xs sm:text-sm font-bold"
              >
                <span>{primaryCTA || "Explore Projects"}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </a>

              <a
                href={actualResumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-royal-crimson justify-center py-2.5 sm:py-3.5 px-5 sm:px-6 text-xs sm:text-sm font-semibold"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F1BF00]" />
                <span>{secondaryCTA || "Download Resume"}</span>
              </a>
            </div>

            {/* Social Icons Bar (Adaptive layout for mobile) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-white/10">
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <span className="text-xs font-mono text-[#999999] uppercase tracking-wider mr-1 hidden sm:inline">
                  Connect:
                </span>
                {resolvedSocialLinks.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={idx}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 text-[#CAD5E2] transition-all duration-200 hover:scale-110 hover:shadow-lg ${s.hoverColor}`}
                      title={s.name}
                      aria-label={s.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

              {/* Performance Guarantees */}
              <div className="flex items-center gap-4 text-xs font-medium text-[#999999]">
                <span className="flex items-center gap-1.5 text-[#CAD5E2]">
                  <Zap className="w-3.5 h-3.5 text-[#F1BF00]" />
                  <span>Sub-Second Load</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#CAD5E2]">
                  <Rocket className="w-3.5 h-3.5 text-[#AA151B]" />
                  <span>Production-Grade</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Royal Code Showcase Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative mt-8 lg:mt-0 min-w-0"
          >
            {/* Top-Left Floating Metric */}
            <div className="absolute -top-6 left-2 sm:-top-8 sm:-left-5 z-20 flex items-center gap-2.5 sm:gap-3 py-2 sm:py-2.5 px-3 sm:px-4 rounded-2xl bg-[#15171C]/95 border border-[#F1BF00]/30 backdrop-blur-xl shadow-2xl">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F1BF00]/20 border border-[#F1BF00]/40 flex items-center justify-center font-bold text-xs sm:text-sm text-[#F1BF00] font-mono">
                {counters?.[1]?.value || "785+"}
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase font-mono text-[#999999] tracking-wider">Automated Testing</p>
                <p className="text-[11px] sm:text-xs font-bold text-white">{counters?.[1]?.label || "QA Tests Passed"}</p>
              </div>
            </div>

            {/* Showcase Visual Card */}
            <div className="royal-card p-2 sm:p-3 shadow-2xl">
              <div className="relative rounded-2xl bg-[#0B0C0E] border border-white/5 p-4 sm:p-6 pt-11 sm:pt-14 pb-7 sm:pb-8 flex flex-col justify-between font-mono text-xs overflow-hidden">
                
                {/* Code Window Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#AA151B]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F1BF00]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-[#999999] font-mono">Jahanzaib.config.ts</span>
                </div>

                {/* Actual Real Profile Configuration Code (Scrollable if narrow) */}
                <div className="space-y-1.5 sm:space-y-2 text-[#CAD5E2] leading-relaxed text-[11px] sm:text-[13px] overflow-x-auto no-scrollbar pb-1">
                  <p className="text-[#999999] whitespace-nowrap">// Frontend Engineer &amp; Full Stack Web Developer</p>
                  <p className="text-white whitespace-nowrap"><span className="text-[#F1BF00]">export const</span> engineer = &#123;</p>
                  <p className="pl-3 sm:pl-4 text-[#CAD5E2] whitespace-nowrap">name: <span className="text-[#FFF8DC]">&apos;{name || "Muhammad Jahanzaib"}&apos;</span>,</p>
                  <p className="pl-3 sm:pl-4 text-[#CAD5E2] whitespace-nowrap">roles: [<span className="text-[#F1BF00]">&apos;Frontend Engineer&apos;</span>, <span className="text-[#F1BF00]">&apos;React/Next.js&apos;</span>, <span className="text-[#F1BF00]">&apos;Full Stack&apos;</span>],</p>
                  <p className="pl-3 sm:pl-4 text-[#CAD5E2] whitespace-nowrap">credentials: <span className="text-[#FFF8DC]">&apos;Meta Front-End Certified&apos;</span>,</p>
                  <p className="pl-3 sm:pl-4 text-[#CAD5E2] whitespace-nowrap">stack: [<span className="text-[#FFF8DC]">&apos;Next.js 16&apos;</span>, <span className="text-[#FFF8DC]">&apos;React 19&apos;</span>, <span className="text-[#FFF8DC]">&apos;TypeScript&apos;</span>],</p>
                  <p className="pl-3 sm:pl-4 text-[#CAD5E2] whitespace-nowrap">performance: <span className="text-[#F1BF00]">&apos;Sub-Second Ultra Fast&apos;</span>,</p>
                  <p className="pl-3 sm:pl-4 text-[#CAD5E2] whitespace-nowrap">location: <span className="text-[#CAD5E2]">&apos;{location || "Karachi, Pakistan (Remote)"}&apos;</span></p>
                  <p className="text-white whitespace-nowrap">&#125;;</p>
                </div>

                {/* Metrics Progress Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#15171C] border border-[#F1BF00]/20 backdrop-blur-md mt-5 sm:mt-6">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
                    <span className="text-[#CAD5E2] font-semibold text-[11px] sm:text-xs">{counters?.[3]?.label || "Delivery Speed Acceleration"}</span>
                    <span className="text-[#F1BF00] font-bold font-mono text-[11px] sm:text-xs">+{counters?.[3]?.value || "30%"} Velocity</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#AA151B] to-[#F1BF00] h-full w-full rounded-full" />
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom-Right Floating Badge */}
            <div className="absolute -bottom-5 right-2 sm:-bottom-7 sm:-right-4 z-20 py-2 sm:py-2.5 px-3 sm:px-4 rounded-2xl bg-[#15171C]/95 border border-[#AA151B]/40 backdrop-blur-xl shadow-2xl text-right">
              <p className="text-[9px] sm:text-[10px] text-[#F1BF00] font-semibold font-mono tracking-wider">100% Quality Guaranteed</p>
              <p className="text-[11px] sm:text-xs font-bold text-white">Production Shipped</p>
            </div>
          </motion.div>

        </div>

        {/* 4 Hero Counters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-14 sm:mt-20"
        >
          {counters.map((c, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#15171D] via-[#101216] to-[#0B0C0E] border border-white/10 hover:border-[#F1BF00]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F1BF00]/10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F1BF00] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8DC] to-[#F1BF00] font-mono tracking-tight">
                  {c.value}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#F1BF00]/15 border border-[#F1BF00]/30 flex items-center justify-center text-[#F1BF00] group-hover:scale-110 group-hover:bg-[#F1BF00] group-hover:text-[#0B0C0E] transition-all">
                  {idx === 0 && <Rocket className="w-5 h-5" />}
                  {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 3 && <Zap className="w-5 h-5" />}
                </div>
              </div>
              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#FFF8DC] transition-colors">
                {c.label}
              </h3>
              <p className="text-xs text-[#999999] font-mono">
                {idx === 0 && "Live enterprise & client platforms"}
                {idx === 1 && "Unit, E2E & regression verification"}
                {idx === 2 && "Accessible & zero layout shift"}
                {idx === 3 && "Fast CI/CD & rapid release cycle"}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
