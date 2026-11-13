"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  resumeUrl?: string;
}

const navLinks = [
  { name: "Home", section: "home", path: "/" },
  { name: "About", section: "about", path: "/about" },
  { name: "Skills", section: "skills", path: "/skills" },
  { name: "Projects", section: "projects", path: "/projects" },
  { name: "Experience", section: "experience", path: "/experience" },
  { name: "Certifications", section: "certifications", path: "/certifications" },
  { name: "Education", section: "education", path: "/education" },
  { name: "Contact", section: "contact", path: "/contact" },
];

export default function Navbar({ resumeUrl = "/assets/Jahanzaib-Resume.pdf" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll and clean URL handler (NO # in URL!)
  const navigateToSection = (sectionId: string, pushHistory = true) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    const cleanPath = sectionId === "home" ? "/" : `/${sectionId}`;
    if (pushHistory && window.location.pathname !== cleanPath) {
      window.history.pushState(null, "", cleanPath);
    }

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  // Initial load check: if URL is /projects, /about, etc., smoothly scroll to it
  useEffect(() => {
    const rawPath = window.location.pathname.replace(/^\//, "").toLowerCase();
    const matched = navLinks.find((l) => l.section === rawPath);
    if (matched && matched.section !== "home") {
      setTimeout(() => {
        const el = document.getElementById(matched.section);
        if (el) {
          const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
          setActiveSection(matched.section);
        }
      }, 200);
    }

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const currentPath = window.location.pathname.replace(/^\//, "").toLowerCase();
      const currentSection = currentPath || "home";
      navigateToSection(currentSection, false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Scroll listener to update active section & URL without hash
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "skills", "projects", "experience", "certifications", "education", "contact"];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        if (section === "home" && window.scrollY < 300) {
          setActiveSection("home");
          break;
        }

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

      // Debounced clean URL update as user scrolls
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const currentCleanPath = activeSection === "home" ? "/" : `/${activeSection}`;
        if (window.location.pathname !== currentCleanPath && !window.location.hash) {
          window.history.replaceState(null, "", currentCleanPath);
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full overflow-x-hidden transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0C0E]/94 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/60 py-3"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Balanced Modern Logo (Size 11 on Desktop, Size 10 on Mobile) */}
        <button
          onClick={() => navigateToSection("home")}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-left focus:outline-none"
        >
          {/* Sized Icon Box */}
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#181B22] via-[#12141A] to-[#0B0C0E] border border-[#F1BF00]/35 shadow-lg shadow-[#F1BF00]/10 group-hover:border-[#F1BF00] group-hover:shadow-[#F1BF00]/25 transition-all duration-300 shrink-0">
            <span className="font-mono text-sm sm:text-base font-bold text-[#F1BF00] group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </span>
            {/* Glowing Live Beacon */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F1BF00] border-2 border-[#0B0C0E] shadow-sm animate-pulse" />
          </div>

          {/* Balanced Brand Typography */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-bold text-base sm:text-xl tracking-tight text-white group-hover:text-[#F1BF00] transition-colors font-serif-heading leading-tight">
                Jahanzaib
              </span>
              <span className="text-[#F1BF00] font-black text-base sm:text-xl leading-none">.</span>
            </div>
            <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-[#B5BAC1] font-mono font-medium -mt-0.5">
              Frontend Engineer
            </span>
          </div>
        </button>

        {/* Complete Desktop Nav Links with Clean URLs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#15171C]/85 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md shadow-lg shadow-black/40">
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection(link.section);
                }}
                className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
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

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection("contact");
            }}
            className="btn-royal-gold text-xs px-5 py-2.5 font-bold cursor-pointer"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#CAD5E2] hover:text-white hover:border-[#F1BF00]/40 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B0C0E]/98 border-b border-[#F1BF00]/20 px-5 sm:px-6 py-6 shadow-2xl backdrop-blur-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(link.section);
                  }}
                  className={`text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                    activeSection === link.section
                      ? "bg-[#F1BF00]/15 text-[#F1BF00] border border-[#F1BF00]/30"
                      : "text-[#CAD5E2] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.name}</span>
                  {activeSection === link.section && (
                    <span className="w-2 h-2 rounded-full bg-[#F1BF00]" />
                  )}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 mt-2">
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection("contact");
                  }}
                  className="w-full btn-royal-gold text-sm font-bold flex items-center justify-center gap-2 py-3 cursor-pointer"
                >
                  <span>Let&apos;s Talk</span>
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
