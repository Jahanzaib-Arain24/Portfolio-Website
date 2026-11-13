"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SkillCategoryData } from "@/types";
import {
  Code2,
  ShieldCheck,
  Database,
  LayoutGrid,
  Sparkles,
  Atom,
  Layers,
  Terminal,
  Cpu,
  Globe,
  ShoppingBag,
  GitBranch,
  CheckCircle2,
  Zap,
  Server,
  FileCode2,
  Palette,
  Bug,
  Accessibility,
  CloudUpload,
  Lock,
  Braces,
  Wrench,
  Search,
  Bot,
  PenTool,
  Send,
  Kanban,
  FileSpreadsheet,
  Workflow,
  Laptop,
  Pin,
} from "lucide-react";

interface SkillsSectionProps {
  categories: SkillCategoryData[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id || ""
  );

  const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("frontend")) return Code2;
    if (lower.includes("backend") || lower.includes("security")) return Database;
    if (lower.includes("testing") || lower.includes("qa")) return ShieldCheck;
    if (lower.includes("devops") || lower.includes("ai") || lower.includes("tools")) return Wrench;
    return LayoutGrid;
  };

  const getSkillVisual = (skillName: string) => {
    const lower = skillName.toLowerCase();
    if (lower.includes("next.js")) return { icon: Layers, badge: "SSR" };
    if (lower.includes("react") && !lower.includes("testing")) return { icon: Atom, badge: "UI" };
    if (lower.includes("typescript")) return { icon: Braces, badge: "TS" };
    if (lower.includes("javascript")) return { icon: FileCode2, badge: "JS" };
    if (lower.includes("tailwind") || lower.includes("bootstrap") || lower.includes("css"))
      return { icon: Palette, badge: "CSS" };
    if (lower.includes("html")) return { icon: Code2, badge: "DOM" };
    if (lower.includes("responsive") || lower.includes("tokens")) return { icon: LayoutGrid, badge: "UI/UX" };
    if (lower.includes("seo")) return { icon: Search, badge: "SEO" };
    if (lower.includes("php")) return { icon: Terminal, badge: "PHP" };
    if (lower.includes("mysql")) return { icon: Database, badge: "SQL" };
    if (lower.includes("pdo") || lower.includes("owasp") || lower.includes("security"))
      return { icon: Lock, badge: "SEC" };
    if (lower.includes("rest")) return { icon: Zap, badge: "API" };
    if (lower.includes("wordpress")) return { icon: Globe, badge: "CMS" };
    if (lower.includes("shopify")) return { icon: ShoppingBag, badge: "ECO" };
    if (lower.includes("jest") || lower.includes("testing library"))
      return { icon: CheckCircle2, badge: "UNIT" };
    if (lower.includes("wcag") || lower.includes("accessibility"))
      return { icon: Accessibility, badge: "A11Y" };
    if (lower.includes("manual") || lower.includes("jira") || lower.includes("defect"))
      return { icon: Bug, badge: "QA" };
    if (lower.includes("sdlc")) return { icon: Workflow, badge: "PROCESS" };
    if (lower.includes("git")) return { icon: GitBranch, badge: "VCS" };
    if (lower.includes("ci/cd") || lower.includes("netlify")) return { icon: CloudUpload, badge: "DEPLOY" };
    if (lower.includes("ai-assisted") || lower.includes("claude") || lower.includes("cursor"))
      return { icon: Bot, badge: "AI" };
    if (lower.includes("vs code")) return { icon: Laptop, badge: "IDE" };
    if (lower.includes("figma")) return { icon: PenTool, badge: "DESIGN" };
    if (lower.includes("postman")) return { icon: Send, badge: "API" };
    if (lower.includes("agile") || lower.includes("scrum")) return { icon: Kanban, badge: "AGILE" };
    if (lower.includes("microsoft office")) return { icon: FileSpreadsheet, badge: "OFFICE" };
    return { icon: Cpu, badge: "TECH" };
  };

  const currentCategory =
    categories.find((c) => c.id === activeCategory) || categories[0];

  const avgProficiency = currentCategory?.skills.length
    ? Math.round(
        currentCategory.skills.reduce((acc, s) => acc + s.proficiency, 0) /
          currentCategory.skills.length
      )
    : 0;

  return (
    <AnimatedSection id="skills" className="py-16 sm:py-28 relative bg-[#0B0C0E] overflow-hidden">
      {/* Ambient Radial Backlights */}
      <div className="glow-orb-gold -right-24 top-1/3 opacity-20" />
      <div className="glow-orb-crimson -left-24 bottom-1/4 opacity-20" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4 font-serif-heading">
            Specialized <span className="text-gradient-vos">Skills &amp; Technologies</span>
          </h2>
          <p className="text-[#999999] text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Frontend &amp; Core Web, Backend Security, CMS, Testing, Accessibility, and AI-Assisted Workflows.
          </p>
        </div>

        {/* Interactive Category Switcher Bar (Smooth Touch-Scrollable on mobile, Centered Pill on sm+) */}
        <div className="flex sm:justify-center mb-8 sm:mb-10 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex sm:flex-wrap items-center justify-start sm:justify-center gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-[#12141A]/90 border border-white/10 backdrop-blur-xl shadow-2xl shrink-0">
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat.name);
              const isSelected = currentCategory?.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? "text-[#0B0C0E]"
                      : "text-[#CAD5E2] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeSkillCategoryPill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#F1BF00] to-[#e0b000] shadow-lg shadow-[#F1BF00]/25"
                    />
                  )}
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 ${
                      isSelected ? "text-[#0B0C0E]" : "text-[#F1BF00]"
                    }`}
                  />
                  <span className="relative z-10">{cat.name}</span>
                  <span
                    className={`relative z-10 text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-[#0B0C0E]/15 text-[#0B0C0E] font-bold"
                        : "bg-white/5 text-[#999999]"
                    }`}
                  >
                    {cat.skills.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Summary Strip */}
        {currentCategory && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 mb-6 rounded-2xl bg-gradient-to-r from-[#14161D] via-[#111318] to-[#14161D] border border-white/10">
            <div className="flex items-center gap-3">
              {(() => {
                const ActiveIcon = getCategoryIcon(currentCategory.name);
                return (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F1BF00]/15 border border-[#F1BF00]/30 flex items-center justify-center text-[#F1BF00] shrink-0">
                    <ActiveIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                );
              })()}
              <div>
                <h3 className="text-sm sm:text-lg font-bold text-white font-serif-heading">
                  {currentCategory.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#999999] font-mono">
                  {currentCategory.skills.length} Production-Ready Technologies
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-[#0B0C0E]/80 border border-[#F1BF00]/25 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F1BF00] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono text-[#CAD5E2]">
                  Avg Proficiency:{" "}
                  <strong className="text-[#F1BF00]">{avgProficiency}%</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Recreated Skill Cards Grid */}
        {currentCategory && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4"
            >
              {currentCategory.skills.map((skill, idx) => {
                const { icon: SkillIcon, badge } = getSkillVisual(skill.name);
                const levelLabel =
                  skill.proficiency >= 92
                    ? "Expert"
                    : skill.proficiency >= 85
                    ? "Advanced"
                    : "Proficient";

                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    className="group relative rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-[#15171D] to-[#0D0F14] border border-white/10 hover:border-[#F1BF00]/45 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#F1BF00]/10 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Subtle Top Accent Border on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F1BF00]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Top Row: Icon + Title + Percentage */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-[#0B0C0E] border border-white/10 group-hover:border-[#F1BF00]/40 flex items-center justify-center text-[#F1BF00] flex-shrink-0 group-hover:scale-105 transition-all shadow-inner mt-0.5">
                          <SkillIcon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-[#FFF8DC] transition-colors leading-snug truncate">
                              {skill.name}
                            </h4>
                            {skill.pinned && (
                              <span className="p-0.5 px-1 rounded-full bg-[#AA151B]/40 border border-[#F1BF00]/40 text-[#F1BF00] flex-shrink-0" title="Pinned Core Skill">
                                <Pin className="w-2.5 h-2.5 fill-[#F1BF00] rotate-45" />
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#999999]">
                              {badge}
                            </span>
                            <span className="text-[#999999]/40">&bull;</span>
                            <span className="text-[10px] font-mono text-[#F1BF00]/90">
                              {levelLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-[#F1BF00] bg-[#F1BF00]/10 px-2.5 py-1 rounded-lg border border-[#F1BF00]/25 flex-shrink-0">
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative w-full bg-[#0B0C0E] rounded-full h-2 overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.7, delay: idx * 0.04, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#AA151B] via-[#d97706] to-[#F1BF00] rounded-full relative"
                      >
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FFF8DC]" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </AnimatedSection>
  );
}
