"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { CertificationData, EducationData } from "@/types";
import { Award, GraduationCap, ExternalLink, Calendar, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

interface CertificationsEducationProps {
  certifications: CertificationData[];
  education: EducationData[];
}

export default function CertificationsEducationSection({
  certifications,
  education,
}: CertificationsEducationProps) {
  return (
    <>
      {/* =========================================================================
          SECTION 1: LICENSES & CERTIFICATIONS
         ========================================================================= */}
      <AnimatedSection id="certifications" className="pt-28 pb-20 relative bg-[#0B0C0E] overflow-hidden">
        {/* Ambient Backlight Orbs */}
        <div className="glow-orb-gold -left-24 top-1/4 opacity-20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4 font-serif-heading">
              Licenses &amp; <span className="text-gradient-vos">Certifications</span>
            </h2>
            <p className="text-[#999999] text-sm sm:text-base max-w-2xl mx-auto">
              Professional specializations and technical accreditations issued by industry leaders including Meta &amp; Coursera.
            </p>
          </div>

          {/* Certifications Grid (2 Columns on MD+, spacious luxury cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#15171D] via-[#111318] to-[#0D0F14] border border-white/10 hover:border-[#F1BF00]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#F1BF00]/10 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Ambient Glow Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F1BF00]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar: Icon + Issuer Badge + Verify Link */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#0B0C0E] border border-white/10 group-hover:border-[#F1BF00]/40 flex items-center justify-center text-[#F1BF00] shadow-inner transition-colors">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold text-[#F1BF00] bg-[#F1BF00]/10 px-2.5 py-0.5 rounded-full border border-[#F1BF00]/25">
                          {cert.issuer}
                        </span>
                      </div>
                    </div>

                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#F1BF00] text-[#999999] hover:text-[#0B0C0E] border border-white/5 hover:border-[#F1BF00] transition-all shrink-0 hover:scale-105"
                        title="Verify Certificate"
                        aria-label={`Verify ${cert.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2 group-hover:text-[#FFF8DC] transition-colors font-serif-heading leading-snug">
                    {cert.title}
                  </h3>

                  {/* Details */}
                  <p className="text-[#999999] text-xs sm:text-sm leading-relaxed mb-4">
                    {cert.details}
                  </p>
                </div>

                {/* Bottom Verification Footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#CAD5E2]">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Credential Verified</span>
                  </span>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F1BF00] hover:underline flex items-center gap-1"
                    >
                      <span>Show Credential</span>
                      &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* =========================================================================
          SECTION 2: FORMAL EDUCATION
         ========================================================================= */}
      <AnimatedSection id="education" className="pt-20 pb-28 relative bg-[#090A0C] overflow-hidden border-t border-white/5">
        {/* Ambient Backlight Orbs */}
        <div className="glow-orb-crimson -right-24 top-1/3 opacity-20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#AA151B]/20 border border-[#AA151B]/40 text-[#FFF8DC] text-xs font-semibold uppercase tracking-wider mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-[#F1BF00]" />
              <span>Academic Background</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4 font-serif-heading">
              Formal <span className="text-gradient-vos">Education</span>
            </h2>
            <p className="text-[#999999] text-sm sm:text-base max-w-2xl mx-auto">
              University degree in Software Engineering and academic foundations in science and technology.
            </p>
          </div>

          {/* Education Timeline / Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu, idx) => (
              <div
                key={edu.id}
                className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#15171D] via-[#111318] to-[#0D0F14] border border-white/10 hover:border-[#AA151B]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#AA151B]/15 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#AA151B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar: Icon + Step Index */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#0B0C0E] border border-white/10 group-hover:border-[#AA151B]/40 flex items-center justify-center text-[#F1BF00] shadow-inner transition-colors">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#CAD5E2] bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Degree */}
                  <h3 className="text-white font-bold text-base sm:text-lg mb-1.5 group-hover:text-[#FFF8DC] transition-colors font-serif-heading leading-snug">
                    {edu.degree}
                  </h3>

                  {/* Institution */}
                  <p className="text-[#F1BF00] font-semibold text-sm mb-4">
                    {edu.institution}
                  </p>
                </div>

                {/* Meta details footer (Timeline & Location) */}
                <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono text-[#999999]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#F1BF00]" />
                    <span className="text-[#CAD5E2]">{edu.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#999999]" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
