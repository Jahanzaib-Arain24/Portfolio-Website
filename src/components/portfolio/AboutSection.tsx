"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  Sparkles, 
  Download, 
  Terminal,
  Layers
} from "lucide-react";

interface AboutSectionProps {
  bio: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
}

export default function AboutSection({
  bio,
  resumeUrl,
}: AboutSectionProps) {
  const bioParagraphs = bio.split("\n\n");
  const actualResumeUrl = resumeUrl || "/assets/Jahanzaib-Resume-Frontend-Engineer.pdf";

  const pillars = [
    {
      title: "Clean & Modular Architecture",
      desc: "Component-driven structure with strict TypeScript typing, reusable design systems, and maintainable state pipelines.",
      icon: ShieldCheck,
      borderColor: "hover:border-[#AA151B]/60",
      iconColor: "text-[#AA151B]",
      accentGlow: "group-hover:bg-[#AA151B]/10",
    },
    {
      title: "Sub-Second Core Vitals",
      desc: "Zero layout shifts (0 CLS) and sub-second First Contentful Paint engineered for max conversions.",
      icon: Zap,
      borderColor: "hover:border-[#F1BF00]/60",
      iconColor: "text-[#F1BF00]",
      accentGlow: "group-hover:bg-[#F1BF00]/10",
    },
    {
      title: "Meta Certified Specialist",
      desc: "Comprehensive 9-course professional specialization in responsive design, UI/UX, and state pipelines.",
      icon: Award,
      borderColor: "hover:border-[#FFF8DC]/60",
      iconColor: "text-[#FFF8DC]",
      accentGlow: "group-hover:bg-[#FFF8DC]/10",
    },
    {
      title: "Modern React & Next.js",
      desc: "Deep mastery of App Router, Server Components, TypeScript type-safety, and modular architecture.",
      icon: Layers,
      borderColor: "hover:border-[#F1BF00]/60",
      iconColor: "text-[#F1BF00]",
      accentGlow: "group-hover:bg-[#F1BF00]/10",
    },
  ];

  return (
    <AnimatedSection id="about" className="py-28 relative bg-[#0B0C0E] overflow-hidden">
      {/* Ambient Radial Lights */}
      <div className="glow-orb-crimson -left-20 top-20 opacity-30" />
      <div className="glow-orb-gold right-0 bottom-20 opacity-20" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering Discipline &amp; Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight font-serif-heading">
            Behind the <span className="text-gradient-vos">Code &amp; Architecture</span>
          </h2>
          <p className="text-[#999999] text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Architecting modern, scalable React &amp; Next.js web applications with lightning-fast performance and clean code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Portrait with Grayscale-to-Color Transition */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md group relative">
              
              {/* Backlight Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#AA151B]/40 via-[#F1BF00]/30 to-[#AA151B]/40 blur-xl opacity-50 group-hover:opacity-100 transition-all duration-700 -z-10" />

              {/* Royal Obsidian Glass Frame */}
              <div className="relative rounded-3xl p-3 bg-[#12141A]/95 border border-white/10 group-hover:border-[#F1BF00]/50 transition-all duration-500 shadow-2xl overflow-hidden">
                
                {/* Photo Container */}
                <div className="relative w-full aspect-[4/4.9] rounded-2xl overflow-hidden bg-[#0B0C0E]">
                  <Image
                    src="/assets/about-me.png"
                    alt="Muhammad Jahanzaib - Frontend Engineer"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover object-top filter grayscale contrast-[1.08] brightness-[0.98] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    priority
                  />

                  {/* Gradient overlay at bottom for subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity pointer-events-none" />

                  {/* Top Status Pill */}
                  <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0C0E]/80 backdrop-blur-md border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] font-mono shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open to Remote Roles</span>
                  </div>

                  {/* Bottom Portrait Caption */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-xl font-bold text-white font-serif-heading drop-shadow-lg">
                      Muhammad Jahanzaib
                    </h3>
                    <p className="text-xs text-[#F1BF00] font-mono font-medium drop-shadow-md">
                      Frontend Engineer &amp; Full Stack Developer
                    </p>
                  </div>
                </div>

                {/* Download Complete CV Button */}
                <a
                  href={actualResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-royal-gold mt-3 w-full text-xs font-semibold flex items-center justify-center gap-2 py-3.5 shadow-lg"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Complete Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Narrative, Quick Contact Chips & 4 Architectural Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Story Card */}
            <div className="royal-card p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#F1BF00]/15 text-[#F1BF00]">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-serif-heading">
                      Modern Frontend &amp; Full Stack Architecture
                    </h3>
                    <p className="text-[11px] font-mono text-[#999999]">
                      Production-Grade Engineering &bull; Clean Next.js &amp; React Systems
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#AA151B]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F1BF00]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {bioParagraphs.map((para, idx) => (
                <p key={idx} className="text-[#CAD5E2] text-sm sm:text-base leading-[26px]">
                  {para}
                </p>
              ))}
            </div>

            {/* 4 Architectural Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className={`group p-5 rounded-2xl bg-gradient-to-b from-[#15171D] to-[#0E1015] border border-white/10 ${pillar.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className={`p-2.5 rounded-xl bg-white/[0.04] ${pillar.accentGlow} transition-colors border border-white/5`}>
                        <Icon className={`w-5 h-5 ${pillar.iconColor}`} />
                      </div>
                      <h4 className="font-bold text-white text-sm group-hover:text-[#FFF8DC] transition-colors font-serif-heading">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-[#999999] text-xs leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </AnimatedSection>
  );
}
