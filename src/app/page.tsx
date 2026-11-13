import { prisma } from "@/lib/prisma";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import CertificationsEducationSection from "@/components/portfolio/CertificationsEducationSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  // Fetch all portfolio data in parallel via Promise.all (Zero waterfall latency)
  const [
    profile,
    rawProjects,
    categories,
    rawExperiences,
    certifications,
    education,
    settings,
  ] = await Promise.all([
    prisma.profile.findUnique({
      where: { id: "default-profile" },
      include: { socialLinks: { orderBy: { order: "asc" } } },
    }),
    prisma.project.findMany({
      orderBy: [{ pinned: "desc" }, { order: "asc" }],
    }),
    prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        skills: {
          orderBy: [{ pinned: "desc" }, { order: "asc" }],
        },
      },
    }),
    prisma.experience.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.certification.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.education.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.siteSettings.findUnique({
      where: { id: "default-settings" },
    }),
  ]);

  const projects = rawProjects.map((p) => ({
    ...p,
    techStack: JSON.parse(p.techStack || "[]"),
    highlights: JSON.parse(p.highlights || "[]"),
  }));

  const experiences = rawExperiences.map((e) => ({
    ...e,
    achievements: JSON.parse(e.achievements || "[]"),
  }));

  const counters = profile ? JSON.parse(profile.heroCounters || "[]") : [];

  return (
    <main className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col">
      <Navbar resumeUrl={profile?.resumeUrl || "/assets/Jahanzaib-Resume.pdf"} />

      {profile && (
        <HeroSection
          name={profile.name}
          title={profile.title}
          subtitle={profile.subtitle}
          greeting={profile.heroGreeting}
          badge={profile.heroBadge}
          primaryCTA={profile.primaryCTA}
          secondaryCTA={profile.secondaryCTA}
          resumeUrl={profile.resumeUrl}
          counters={counters}
          typingRoles={profile.typingRoles}
          phone={profile.phone}
          location={profile.location}
          socialLinks={profile.socialLinks}
        />
      )}

      {profile && (
        <AboutSection
          name={profile.name}
          bio={profile.bio}
          email={profile.email}
          phone={profile.phone}
          location={profile.location}
          resumeUrl={profile.resumeUrl}
          aboutHeading={profile.aboutHeading}
          aboutSubtitle={profile.aboutSubtitle}
          storyTitle={profile.storyTitle}
          storySubtitle={profile.storySubtitle}
          pillars={profile.pillars}
          avatarUrl={profile.avatarUrl}
        />
      )}

      <SkillsSection categories={categories} />

      <ProjectsSection projects={projects} />

      <ExperienceSection experiences={experiences} />

      <CertificationsEducationSection
        certifications={certifications}
        education={education}
      />

      {profile && (
        <ContactSection
          email={profile.email}
          phone={profile.phone}
          location={profile.location}
        />
      )}

      <Footer 
        copyright={settings?.copyright || "© 2026 Muhammad Jahanzaib. All rights reserved."} 
        socialLinks={profile?.socialLinks} 
      />
    </main>
  );
}
