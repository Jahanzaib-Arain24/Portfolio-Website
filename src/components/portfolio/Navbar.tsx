"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Code2 } from "lucide-react";

interface NavbarProps {
  resumeUrl?: string;
}

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ resumeUrl = "/assets/Jahanzaib-Resume.pdf" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "skills", "projects", "experience", "certifications", "education", "contact"];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0C0E]/92 backdrop-blur-2xl border-b border-white/5 shadow-xl shadow-black/50 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Sleek Modern Logo */}
        <Link href="#home" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#15171C] border border-[#F1BF00]/30 shadow-md shadow-[#F1BF00]/10 group-hover:border-[#F1BF00] group-hover:shadow-[#F1BF00]/25 transition-all duration-300">
            <span className="font-mono text-sm font-bold text-[#F1BF00] group-hover:scale-110 transition-transform">
              &lt;/&gt;
            </span>
            {/* Subtle glow beacon */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F1BF00] opacity-80 animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-[#F1BF00] transition-colors font-serif-heading">
                Jahanzaib
              </span>
              <span className="text-[#F1BF00] font-black text-base leading-none">.</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#999999] -mt-1 font-mono font-medium">
              Frontend Engineer
            </span>
          </div>
        </Link>

        {/* Complete Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#15171C]/80 border border-white/5 rounded-full px-3 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-[#F1BF00]"
                    : "text-[#CAD5E2] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillVOS"
                    className="absolute inset-0 bg-[#F1BF00]/15 border border-[#F1BF00]/30 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button Only (Admin Link Completely Removed) */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="btn-royal-gold text-xs px-5 py-2.5 font-bold"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-[#CAD5E2]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B0C0E]/98 border-b border-[#F1BF00]/20 px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-[#CAD5E2] hover:text-[#F1BF00] py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full btn-royal-gold text-sm font-bold flex items-center justify-center gap-2 py-3"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
