"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ProjectData } from "@/types";
import { ExternalLink, Sparkles, CheckCircle, ChevronRight, X, Pin } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsSectionProps {
  projects: ProjectData[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <AnimatedSection id="projects" className="py-16 sm:py-28 relative bg-[#0B0C0E] overflow-hidden">
      <div className="glow-orb-crimson right-0 top-1/3 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Perfectly Centered */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4 font-serif-heading">
            Featured <span className="text-gradient-vos">Case Studies</span>
          </h2>
          <p className="text-[#999999] text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Real enterprise and digital platforms shipped to users worldwide, engineered for modern performance and conversion.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="royal-card flex flex-col justify-between group relative overflow-hidden will-change-transform transform-gpu"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F1BF00]/10 rounded-full blur-2xl group-hover:bg-[#AA151B]/20 transition-all pointer-events-none" />

              <div>
                {/* Project Screenshot Thumbnail */}
                {project.imageUrl && (
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative w-full aspect-video overflow-hidden bg-[#0B0C0E] border-b border-white/10 cursor-pointer"
                  >
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15171C] via-transparent to-black/30 opacity-80 group-hover:opacity-50 transition-opacity" />

                    {/* Top Floating Badges over Thumbnail */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-[#0B0C0E]/85 backdrop-blur-md border border-white/10 text-[#CAD5E2]">
                        {project.type}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {project.pinned && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-[#AA151B]/90 backdrop-blur-md border border-[#F1BF00]/50 px-2.5 py-0.5 rounded-full shadow-lg">
                            <Pin className="w-3 h-3 fill-amber-300 rotate-45" /> Pinned
                          </span>
                        )}
                        {project.featured && (
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-[#F1BF00] bg-[#0B0C0E]/85 backdrop-blur-md border border-[#F1BF00]/40 px-2.5 py-0.5 rounded-full">
                            <Sparkles className="w-3 h-3" /> Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4 sm:p-6 pb-2">
                  {/* Fallback Header Badges if no image */}
                  {!project.imageUrl && (
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase px-2.5 py-1 rounded-md bg-[#0B0C0E] border border-white/5 text-[#CAD5E2]">
                        {project.type}
                      </span>
                      {project.featured && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#F1BF00] bg-[#F1BF00]/15 border border-[#F1BF00]/30 px-2.5 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </div>
                  )}

                  {/* Title & Tagline */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-[#FFF8DC] transition-colors font-serif-heading">
                    {project.title}
                  </h3>
                  <p className="text-[#999999] text-xs sm:text-sm line-clamp-2 mb-4 sm:mb-5 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-[#0B0C0E] border border-white/5 text-[#CAD5E2]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#999999]">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-auto px-4 sm:px-6 pb-4 sm:pb-6 pt-3.5 sm:pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-[#F1BF00] hover:text-[#FFF8DC] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                >
                  <span>Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#0B0C0E] hover:bg-[#1E2129] text-[#999999] hover:text-[#F1BF00] border border-white/5 transition-colors"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#F1BF00]/15 hover:bg-[#F1BF00] text-[#F1BF00] hover:text-[#0B0C0E] border border-[#F1BF00]/30 transition-colors font-bold"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal (Mobile-Optimized with Sticky Header & Sticky Close) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#0B0C0E]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl h-[92vh] sm:h-auto sm:max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-[#12141A] border-t sm:border border-[#F1BF00]/30 shadow-2xl text-left overflow-hidden"
            >
              {/* Sticky Top Header Bar with Pinned Close Button */}
              <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#15171C]/95 backdrop-blur-xl border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#F1BF00]/15 border border-[#F1BF00]/30 text-[#F1BF00] text-[10px] font-mono font-semibold uppercase shrink-0">
                    {selectedProject.type}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-serif-heading truncate">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#999999] hover:text-white border border-white/10 cursor-pointer shrink-0 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-4 sm:p-8 space-y-5 flex-1">
                {selectedProject.imageUrl && (
                  <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-[#0B0C0E] border border-white/10 shadow-xl shrink-0">
                    <Image
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 750px"
                      className="object-cover object-top"
                    />
                  </div>
                )}

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 font-serif-heading">
                    {selectedProject.title}
                  </h2>
                  <p className="text-[#F1BF00] text-xs sm:text-sm font-semibold">
                    {selectedProject.tagline}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#999999] mb-1.5">
                    System Overview
                  </h4>
                  <p className="text-[#CAD5E2] text-xs sm:text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#999999] mb-2">
                    Architecture &amp; Engineering Highlights
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CAD5E2]">
                        <CheckCircle className="w-4 h-4 text-[#F1BF00] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#999999] mb-2">
                    Technologies Deployed
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 rounded-lg bg-[#0B0C0E] border border-white/5 text-[#CAD5E2]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dedicated Sticky Action Footer */}
              <div className="px-4 sm:px-8 py-3.5 bg-[#15171C]/95 backdrop-blur-xl border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-royal-gold text-xs justify-center py-3"
                  >
                    <span>Launch Live System</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-royal-crimson text-xs justify-center py-3"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
