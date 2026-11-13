export interface ProfileData {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  heroGreeting: string;
  heroBadge: string;
  primaryCTA: string;
  secondaryCTA: string;
  resumeUrl: string;
  avatarUrl?: string | null;
  heroCounters: Array<{ label: string; value: string }>;
  socialLinks: SocialLinkData[];
}

export interface SocialLinkData {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order: number;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  type: string;
  highlights: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  pinned?: boolean;
  order: number;
}

export interface SkillItemData {
  id: string;
  name: string;
  proficiency: number;
  pinned?: boolean;
  order: number;
}

export interface SkillCategoryData {
  id: string;
  name: string;
  icon?: string | null;
  order: number;
  skills: SkillItemData[];
}

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  timeline: string;
  location: string;
  focus: string;
  achievements: string[];
  order: number;
}

export interface CertificationData {
  id: string;
  title: string;
  issuer: string;
  details: string;
  verifyUrl: string;
  order: number;
}

export interface EducationData {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  order: number;
}

export interface SiteSettingsData {
  id: string;
  siteTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string | null;
  copyright: string;
}

export interface ContactMessageData {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

