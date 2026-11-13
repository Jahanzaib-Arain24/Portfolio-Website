"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

interface SocialLinkData {
  platform: string;
  url: string;
}

interface FooterProps {
  copyright: string;
  socialLinks?: SocialLinkData[];
}

export default function Footer({ copyright, socialLinks: dbSocialLinks }: FooterProps) {
  const defaultSocialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Jahanzaib-Arain24",
      icon: GithubIcon,
      hoverClass: "hover:text-[#F1BF00] hover:bg-[#F1BF00]/15",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jahanzaib-arain/",
      icon: LinkedinIcon,
      hoverClass: "hover:text-[#F1BF00] hover:bg-[#F1BF00]/15",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/Jahanzaib.Arain24",
      icon: FacebookIcon,
      hoverClass: "hover:text-[#1877F2] hover:bg-[#1877F2]/15",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/jahanzaib.arain24/",
      icon: InstagramIcon,
      hoverClass: "hover:text-[#E4405F] hover:bg-[#E4405F]/15",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/923123358542",
      icon: WhatsAppIcon,
      hoverClass: "hover:text-[#25D366] hover:bg-[#25D366]/15",
    },
  ];

  const resolvedLinks = dbSocialLinks && dbSocialLinks.length > 0
    ? dbSocialLinks.map((item) => {
        const plat = item.platform.toLowerCase();
        let Icon = LinkedinIcon;
        let hoverClass = "hover:text-[#F1BF00] hover:bg-[#F1BF00]/15";

        if (plat.includes("github")) {
          Icon = GithubIcon;
          hoverClass = "hover:text-[#F1BF00] hover:bg-[#F1BF00]/15";
        } else if (plat.includes("facebook")) {
          Icon = FacebookIcon;
          hoverClass = "hover:text-[#1877F2] hover:bg-[#1877F2]/15";
        } else if (plat.includes("instagram")) {
          Icon = InstagramIcon;
          hoverClass = "hover:text-[#E4405F] hover:bg-[#E4405F]/15";
        } else if (plat.includes("whatsapp")) {
          Icon = WhatsAppIcon;
          hoverClass = "hover:text-[#25D366] hover:bg-[#25D366]/15";
        }

        return {
          name: item.platform,
          href: item.url,
          icon: Icon,
          hoverClass,
        };
      })
    : defaultSocialLinks;

  return (
    <footer className="border-t border-white/5 bg-[#08090B] py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-bold text-lg text-white group-hover:text-[#F1BF00] transition-colors font-serif-heading">
              Muhammad Jahanzaib<span className="text-[#F1BF00]">.</span>
            </span>
          </Link>
          <p className="text-xs text-[#999999] font-mono">
            {copyright}
          </p>
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {resolvedLinks.map((s, idx) => {
            const Icon = s.icon;
            return (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/10 text-white/70 transition-all duration-200 hover:scale-105 ${s.hoverClass}`}
                title={s.name}
                aria-label={s.name}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] hover:bg-[#F1BF00] hover:text-[#0B0C0E] transition-all ml-2 cursor-pointer"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
