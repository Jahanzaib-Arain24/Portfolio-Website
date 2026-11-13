import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

interface FooterProps {
  copyright: string;
}

export default function Footer({ copyright }: FooterProps) {
  const socialLinks = [
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
          {socialLinks.map((s, idx) => {
            const Icon = s.icon;
            return (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl bg-white/5 text-[#999999] border border-white/5 transition-all hover:scale-105 ${s.hoverClass}`}
                title={s.name}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
          <a
            href="#"
            className="p-2.5 rounded-xl bg-[#F1BF00]/15 border border-[#F1BF00]/30 text-[#F1BF00] hover:bg-[#F1BF00] hover:text-[#0B0C0E] transition-all ml-2"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
