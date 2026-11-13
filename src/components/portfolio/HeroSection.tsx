"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, Zap, Rocket, ShieldCheck, TrendingUp, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import TypingRoles from "./TypingRoles";

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
}

export default function HeroSection({
  name,
  greeting,
  badge,
  primaryCTA,
  secondaryCTA,
  counters,
}: HeroSectionProps) {
  const actualResumeUrl = "/assets/Jahanzaib-Resume-Frontend-Engineer.pdf";

  const typingRolesList = [
    "Frontend Engineer",
    "React.js & Next.js Developer",
    "Full Stack Web Developer",
  ];

  const socialLinks = [
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

  return (
    <section id="home" className="relative min-h-[94vh] pt-36 pb-24 flex flex-col justify-center overflow-hidden bg-[#0B0C0E]">
      {/* VOS Dual Radial Gradients */}
      <div className="glow-orb-crimson -top-10 left-10 opacity-60" />
      <div className="glow-orb-gold top-48 right-0 opacity-50" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Live Gold Beacon Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-xs font-semibold mb-6 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F1BF00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F1BF00]" />
              </span>
              <span>{badge || "Available for Full-Time Roles & High-Impact Contracts (Remote Worldwide)"}</span>
            </div>

            {/* Greeting & Name Heading */}
            <p className="text-[#999999] font-mono text-sm tracking-wider uppercase mb-2">
              {greeting || "Hi There, I'm"}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-bold text-white mb-4 leading-[1.12] font-serif-heading">
              Muhammad{" "}
              <span className="text-gradient-vos block sm:inline">
                Jahanzaib.
              </span>
            </h1>

            {/* Interactive Typewriter Effect */}
            <div className="mb-6 min-h-[38px] flex items-center">
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white flex items-center gap-2 flex-wrap">
                <span>I Am Into</span>
                <TypingRoles roles={typingRolesList} />
              </h2>
            </div>

            {/* High-Converting Pitch */}
            <p className="text-[#CAD5E2] text-sm sm:text-base leading-[26px] max-w-xl mb-8">
              I architect scalable, high-performance web systems and bespoke digital products. By combining modern React & Next.js engineering with rigorous quality discipline, I build lightning-fast web applications engineered for seamless user experience and maximum business growth.
            </p>

            {/* Action Buttons: Royal Gold + Crimson Glass Pill */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="btn-royal-gold"
              >
                <span>{primaryCTA || "Explore Projects"}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href={actualResumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-royal-crimson"
              >
                <Download className="w-4 h-4 text-[#F1BF00]" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Icons Bar: LinkedIn, GitHub, Facebook, Instagram, WhatsApp */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#999999] uppercase tracking-wider mr-1 hidden sm:inline">
                  Connect:
                </span>
                {socialLinks.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={idx}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 text-[#CAD5E2] transition-all duration-200 hover:scale-110 hover:shadow-lg ${s.hoverColor}`}
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
            className="lg:col-span-5 relative mt-6 lg:mt-0"
          >
            {/* Top-Left Floating Metric */}
            <div className="absolute -top-7 -left-2 sm:-top-8 sm:-left-5 z-20 flex items-center gap-3 py-2.5 px-4 rounded-2xl bg-[#15171C]/95 border border-[#F1BF00]/30 backdrop-blur-xl shadow-2xl">
              <div className="w-9 h-9 rounded-xl bg-[#F1BF00]/20 border border-[#F1BF00]/40 flex items-center justify-center font-bold text-sm text-[#F1BF00] font-mono">
                785+
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono text-[#999999] tracking-wider">Automated Testing</p>
                <p className="text-xs font-bold text-white">QA Tests Passed</p>
              </div>
            </div>

            {/* Showcase Visual Card */}
            <div className="royal-card p-3 shadow-2xl">
              <div className="relative rounded-2xl bg-[#0B0C0E] border border-white/5 p-6 pt-12 sm:pt-14 pb-8 flex flex-col justify-between font-mono text-xs">
                
                {/* Code Window Header - Positioned cleanly below the top badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#AA151B]" />
                    <div className="w-3 h-3 rounded-full bg-[#F1BF00]" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] text-[#999999] font-mono">Jahanzaib.config.ts</span>
                </div>

                {/* Actual Real Profile Configuration Code */}
                <div className="space-y-2 text-[#CAD5E2] leading-relaxed text-[12px] sm:text-[13px]">
                  <p className="text-[#999999]">// Frontend Engineer &amp; Full Stack Web Developer</p>
                  <p className="text-white"><span className="text-[#F1BF00]">export const</span> engineer = &#123;</p>
                  <p className="pl-4 text-[#CAD5E2]">name: <span className="text-[#FFF8DC]">&apos;Muhammad Jahanzaib&apos;</span>,</p>
                  <p className="pl-4 text-[#CAD5E2]">roles: [<span className="text-[#F1BF00]">&apos;Frontend Engineer&apos;</span>, <span className="text-[#F1BF00]">&apos;React/Next.js&apos;</span>, <span className="text-[#F1BF00]">&apos;Full Stack&apos;</span>],</p>
                  <p className="pl-4 text-[#CAD5E2]">credentials: <span className="text-[#FFF8DC]">&apos;Meta Front-End Certified&apos;</span>,</p>
                  <p className="pl-4 text-[#CAD5E2]">stack: [<span className="text-[#FFF8DC]">&apos;Next.js 16&apos;</span>, <span className="text-[#FFF8DC]">&apos;React 19&apos;</span>, <span className="text-[#FFF8DC]">&apos;TypeScript&apos;</span>],</p>
                  <p className="pl-4 text-[#CAD5E2]">performance: <span className="text-[#F1BF00]">&apos;Sub-Second Ultra Fast&apos;</span>,</p>
                  <p className="pl-4 text-[#CAD5E2]">location: <span className="text-[#CAD5E2]">&apos;Karachi, Pakistan (Remote)&apos;</span></p>
                  <p className="text-white">&#125;;</p>
                </div>

                {/* Metrics Progress Box */}
                <div className="p-4 rounded-xl bg-[#15171C] border border-[#F1BF00]/20 backdrop-blur-md mt-6">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
                    <span className="text-[#CAD5E2] font-semibold">Delivery Speed Acceleration</span>
                    <span className="text-[#F1BF00] font-bold font-mono">+30% Velocity</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#AA151B] to-[#F1BF00] h-full w-full rounded-full" />
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom-Right Floating Badge */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-7 sm:-right-4 z-20 py-2.5 px-4 rounded-2xl bg-[#15171C]/95 border border-[#AA151B]/40 backdrop-blur-xl shadow-2xl text-right">
              <p className="text-[10px] text-[#F1BF00] font-semibold font-mono tracking-wider">100% Quality Guaranteed</p>
              <p className="text-xs font-bold text-white">Production Shipped</p>
            </div>
          </motion.div>

        </div>

        {/* 4 Hero Counters Bar Recreated */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20"
        >
          {/* Card 1: Production Systems */}
          <div className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#15171D] via-[#101216] to-[#0B0C0E] border border-white/10 hover:border-[#F1BF00]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F1BF00]/10 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F1BF00] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8DC] to-[#F1BF00] font-mono tracking-tight">
                6+
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#F1BF00]/15 border border-[#F1BF00]/30 flex items-center justify-center text-[#F1BF00] group-hover:scale-110 group-hover:bg-[#F1BF00] group-hover:text-[#0B0C0E] transition-all">
                <Rocket className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#FFF8DC] transition-colors">
              Production Systems Shipped
            </h3>
            <p className="text-xs text-[#999999] font-mono">
              Live enterprise &amp; client platforms
            </p>
          </div>

          {/* Card 2: QA Tests Passed */}
          <div className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#15171D] via-[#101216] to-[#0B0C0E] border border-white/10 hover:border-[#AA151B]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#AA151B]/15 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#AA151B] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8DC] to-[#F1BF00] font-mono tracking-tight">
                785+
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#AA151B]/20 border border-[#AA151B]/40 flex items-center justify-center text-[#AA151B] group-hover:scale-110 group-hover:bg-[#AA151B] group-hover:text-white transition-all">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#FFF8DC] transition-colors">
              Automated QA Tests Passed
            </h3>
            <p className="text-xs text-[#999999] font-mono">
              100% zero-defect verified code
            </p>
          </div>

          {/* Card 3: WCAG 2.1 AA Compliant */}
          <div className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#15171D] via-[#101216] to-[#0B0C0E] border border-white/10 hover:border-[#F1BF00]/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F1BF00]/10 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F1BF00] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8DC] to-[#F1BF00] font-mono tracking-tight">
                100%
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#F1BF00]/15 border border-[#F1BF00]/30 flex items-center justify-center text-[#F1BF00] group-hover:scale-110 group-hover:bg-[#F1BF00] group-hover:text-[#0B0C0E] transition-all">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#FFF8DC] transition-colors">
              WCAG 2.1 AA Compliant
            </h3>
            <p className="text-xs text-[#999999] font-mono">
              Accessible &amp; zero cumulative layout shift
            </p>
          </div>

          {/* Card 4: Delivery Acceleration */}
          <div className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#15171D] via-[#101216] to-[#0B0C0E] border border-white/10 hover:border-[#AA151B]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#AA151B]/15 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#AA151B] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8DC] to-[#F1BF00] font-mono tracking-tight">
                30%
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#AA151B]/20 border border-[#AA151B]/40 flex items-center justify-center text-[#AA151B] group-hover:scale-110 group-hover:bg-[#AA151B] group-hover:text-white transition-all">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#FFF8DC] transition-colors">
              Delivery Acceleration
            </h3>
            <p className="text-xs text-[#999999] font-mono">
              Faster release velocity with automated CI/CD
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
