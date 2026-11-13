"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Mail, Phone, MapPin, Send, MessageSquare, Copy, Check } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";
import toast, { Toaster } from "react-hot-toast";

interface ContactSectionProps {
  email: string;
  phone: string;
  location: string;
}

export default function ContactSection({ email, phone, location }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message dispatched successfully! I will reach out soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again or WhatsApp me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection id="contact" className="py-16 sm:py-28 relative bg-[#0B0C0E]">
      <Toaster position="bottom-right" />
      <div className="glow-orb-crimson left-1/3 -bottom-10 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
            Direct Communication
          </div>
          <h2 className="text-3xl sm:text-[48px] font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4 font-serif-heading">
            Let's Build Something <span className="text-gradient-vos">Exceptional</span>
          </h2>
          <p className="text-[#999999] text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Have an open engineering role, freelance contract, or project architecture inquiry? Send a direct dispatch below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Direct Details Cards */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            <div className="royal-card p-4 sm:p-6 flex items-center justify-between gap-3 sm:gap-4 group">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1"
                title="Send Email"
              >
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#F1BF00]/15 text-[#F1BF00] group-hover:bg-[#F1BF00] group-hover:text-[#0B0C0E] transition-colors shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-mono text-[#999999] uppercase">Email Address</p>
                  <p className="text-white font-semibold text-xs sm:text-sm group-hover:text-[#FFF8DC] transition-colors truncate">
                    {email}
                  </p>
                </div>
              </a>

              {/* 1-Click Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "bg-white/[0.04] text-[#999999] hover:text-[#F1BF00] border-white/10 hover:border-[#F1BF00]/40 hover:bg-[#F1BF00]/10"
                }`}
                title={copied ? "Copied!" : "Copy Email to Clipboard"}
                aria-label="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="royal-card p-4 sm:p-6 block group"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#AA151B]/20 text-[#AA151B] group-hover:bg-[#AA151B] group-hover:text-white transition-colors shrink-0">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-mono text-[#999999] uppercase">WhatsApp / Direct Call</p>
                  <p className="text-white font-semibold text-xs sm:text-sm group-hover:text-[#FFF8DC] transition-colors truncate">
                    {phone}
                  </p>
                </div>
              </div>
            </a>

            <div className="royal-card p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0B0C0E] text-[#999999] border border-white/5 shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-mono text-[#999999] uppercase">Location &amp; Availability</p>
                  <p className="text-white font-semibold text-xs sm:text-sm truncate">
                    {location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Direct Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/jahanzaib-arain/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-2xl bg-[#15171C] border border-white/5 hover:border-[#F1BF00]/40 text-[#CAD5E2] hover:text-white transition-colors text-xs font-semibold"
              >
                <LinkedinIcon className="w-4 h-4 text-[#F1BF00]" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Jahanzaib-Arain24"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-2xl bg-[#15171C] border border-white/5 hover:border-[#F1BF00]/40 text-[#CAD5E2] hover:text-white transition-colors text-xs font-semibold"
              >
                <GithubIcon className="w-4 h-4 text-[#AA151B]" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Contact Dispatch Form */}
          <div className="lg:col-span-7 royal-card p-4 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#CAD5E2] mb-1.5 uppercase tracking-wide">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="royal-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#CAD5E2] mb-1.5 uppercase tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="royal-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#CAD5E2] mb-1.5 uppercase tracking-wide">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Next.js 16 Web Project or Full-Time Role"
                  className="royal-input"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#CAD5E2] mb-1.5 uppercase tracking-wide">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your scope, timelines, or engineering expectations..."
                  className="royal-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-royal-gold w-full py-3.5 sm:py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
