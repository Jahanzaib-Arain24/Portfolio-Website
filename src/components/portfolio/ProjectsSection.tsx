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
    <AnimatedSection id="projects" className="py-28 relative bg-[#0B0C0E]">
      <div className="glow-orb-crimson right-0 top-1/3 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Perfectly Centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4 font-serif-heading">
            Featured <span className="text-gradient-vos">Case Studies</span>
          </h2>
          <p className="text-[#999999] text-sm sm:text-base max-w-2xl mx-auto">
            Real enterprise and digital platforms shipped to users worldwide, engineered for modern performance and conversion.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                <div className="p-6 pb-2">
                  {/* Fallback Header Badges if no image */}
                  {!project.imageUrl && (
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-md bg-[#0B0C0E] border border-white/5 text-[#CAD5E2]">
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
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFF8DC] transition-colors font-serif-heading">
                    {project.title}
                  </h3>
                  <p className="text-[#999999] text-xs sm:text-sm line-clamp-2 mb-5 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0B0C0E] border border-white/5 text-[#CAD5E2]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#999999]">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-auto px-6 pb-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-[#F1BF00] hover:text-[#FFF8DC] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
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

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B0C0E]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#15171C] border border-[#F1BF00]/30 p-6 sm:p-8 shadow-2xl text-left"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#999999] hover:text-white border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-3 py-1 rounded-md bg-[#F1BF00]/15 border border-[#F1BF00]/30 text-[#F1BF00] text-xs font-semibold uppercase mb-3">
                {selectedProject.type}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-serif-heading">
                {selectedProject.title}
              </h2>
              <p className="text-[#F1BF00] text-sm font-semibold mb-6">
                {selectedProject.tagline}
              </p>

              {selectedProject.imageUrl && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0B0C0E] border border-white/10 mb-6 shadow-xl">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 750px"
                    className="object-cover object-top"
                  />
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#999999] mb-2">
                  System Overview
                </h4>
                <p className="text-[#CAD5E2] text-sm leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#999999] mb-3">
                  Architecture & Engineering Highlights
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CAD5E2]">
                      <CheckCircle className="w-4 h-4 text-[#F1BF00] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#999999] mb-2">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-[#0B0C0E] border border-white/5 text-[#CAD5E2]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-royal-gold text-xs"
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
                    className="btn-royal-crimson text-xs"
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
