"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { ExperienceData } from "@/types";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceSectionProps {
  experiences: ExperienceData[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <AnimatedSection id="experience" className="py-16 sm:py-28 relative bg-[#0B0C0E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
            Career Timeline
          </div>
          <h2 className="text-3xl sm:text-[48px] font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4 font-serif-heading">
            Professional <span className="text-gradient-vos">Work Experience</span>
          </h2>
          <p className="text-[#999999] text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Demonstrated engineering record across remote teams, contract agencies, and quality assurance divisions.
          </p>
        </div>

        {/* Timeline Container with Spanish Crimson border (Adjusted left margin for mobile safety) */}
        <div className="relative border-l border-[#AA151B]/40 ml-2 sm:ml-8 md:ml-28 pl-5 sm:pl-10 space-y-8 sm:space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Marker: Royal Gold Node */}
              <div className="absolute -left-[29px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0B0C0E] border-2 border-[#F1BF00] group-hover:border-[#FFD700] transition-colors shadow-sm shadow-[#F1BF00]/50" />

              {/* Experience Card */}
              <div className="royal-card p-4 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-[#FFF8DC] transition-colors font-serif-heading">
                      {exp.role}
                    </h3>
                    <p className="text-[#F1BF00] font-semibold text-xs sm:text-sm">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-[#999999] font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#F1BF00]" />
                      {exp.timeline}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#999999]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="mb-3.5 sm:mb-4">
                  <span className="text-[11px] sm:text-xs font-medium text-[#CAD5E2] bg-[#0B0C0E] border border-white/5 px-2.5 sm:px-3 py-1 rounded-md inline-block">
                    Focus: {exp.focus}
                  </span>
                </div>

                {/* Achievements List */}
                <div className="space-y-2 sm:space-y-2.5">
                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CAD5E2]">
                      <CheckCircle2 className="w-4 h-4 text-[#F1BF00] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
