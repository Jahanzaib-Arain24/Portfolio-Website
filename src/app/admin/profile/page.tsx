"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Save, 
  FileText, 
  Sparkles, 
  Layers, 
  BarChart3, 
  Home, 
  ShieldCheck, 
  Terminal,
  HelpCircle
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import FileUploader from "@/components/admin/FileUploader";

interface PillarItem {
  title: string;
  desc: string;
}

export default function ProfileAdminPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "metrics">("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    title: "",
    subtitle: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    heroGreeting: "",
    heroBadge: "",
    primaryCTA: "",
    secondaryCTA: "",
    resumeUrl: "/assets/Jahanzaib-Resume-Frontend-Engineer.pdf",
    avatarUrl: "/assets/about-me.png",
    typingRoles: "Frontend Engineer, React.js & Next.js Developer, Full Stack Web Developer",
    aboutHeading: "Behind the Code & Architecture",
    aboutSubtitle: "Architecting modern, scalable React & Next.js web applications with lightning-fast performance and clean code.",
    storyTitle: "Modern Frontend & Full Stack Architecture",
    storySubtitle: "Production-Grade Engineering • Clean Next.js & React Systems",
  });

  const [pillars, setPillars] = useState<PillarItem[]>([
    {
      title: "Clean & Modular Architecture",
      desc: "Component-driven structure with strict TypeScript typing, reusable design systems, and maintainable state pipelines.",
    },
    {
      title: "Sub-Second Core Vitals",
      desc: "Zero layout shifts (0 CLS) and sub-second First Contentful Paint engineered for max conversions.",
    },
    {
      title: "Meta Certified Specialist",
      desc: "Comprehensive 9-course professional specialization in responsive design, UI/UX, and state pipelines.",
    },
    {
      title: "Modern React & Next.js",
      desc: "Deep mastery of App Router, Server Components, TypeScript type-safety, and modular architecture.",
    },
  ]);

  const [counters, setCounters] = useState([
    { label: "Production Systems Shipped", value: "6+" },
    { label: "Automated QA Tests Passed", value: "785+" },
    { label: "WCAG 2.1 AA Compliant", value: "100%" },
    { label: "Delivery Acceleration", value: "30%" },
  ]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.profile) {
        const p = data.profile;
        setForm({
          name: p.name || "Muhammad Jahanzaib",
          title: p.title || "Frontend Engineer",
          subtitle: p.subtitle || "I architect scalable, high-performance web systems and bespoke digital products. By combining modern React & Next.js engineering with rigorous quality discipline, I build lightning-fast web applications engineered for seamless user experience and maximum business growth.",
          bio: p.bio || "",
          email: p.email || "arainjhanzaib@gmail.com",
          phone: p.phone || "+92 312 3358542",
          location: p.location || "Karachi, Pakistan (Open to Remote Worldwide)",
          heroGreeting: p.heroGreeting || "Hi There, I'm",
          heroBadge: p.heroBadge || "🟢 Available for Full-Time Roles & High-Impact Contracts (Remote Worldwide)",
          primaryCTA: p.primaryCTA || "Explore Projects",
          secondaryCTA: p.secondaryCTA || "Download Resume",
          resumeUrl: p.resumeUrl || "/assets/Jahanzaib-Resume-Frontend-Engineer.pdf",
          avatarUrl: p.avatarUrl || "/assets/about-me.png",
          typingRoles: p.typingRoles || "Frontend Engineer, React.js & Next.js Developer, Full Stack Web Developer",
          aboutHeading: p.aboutHeading || "Behind the Code & Architecture",
          aboutSubtitle: p.aboutSubtitle || "Architecting modern, scalable React & Next.js web applications with lightning-fast performance and clean code.",
          storyTitle: p.storyTitle || "Modern Frontend & Full Stack Architecture",
          storySubtitle: p.storySubtitle || "Production-Grade Engineering • Clean Next.js & React Systems",
        });

        if (p.pillars) {
          try {
            setPillars(JSON.parse(p.pillars));
          } catch {}
        }

        if (p.heroCounters) {
          try {
            setCounters(JSON.parse(p.heroCounters));
          } catch {}
        }
      }
    } catch {
      toast.error("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        pillars: JSON.stringify(pillars),
        heroCounters: JSON.stringify(counters),
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Home & About settings updated successfully!");
      } else {
        toast.error("Failed to save changes.");
      }
    } catch {
      toast.error("Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  const updatePillar = (index: number, field: "title" | "desc", value: string) => {
    setPillars((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateCounter = (index: number, field: "label" | "value", value: string) => {
    setCounters((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  if (loading) {
    return (
      <div className="text-white/40 text-xs font-mono py-16 text-center">
        Loading Hero &amp; Profile Control Center...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <Toaster position="bottom-right" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101217] via-[#14171E] to-[#0B0C0E] border border-[#F1BF00]/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F1BF00]/5 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/25 text-[#F1BF00] text-xs font-mono mb-2">
            <User className="w-3.5 h-3.5" />
            <span>HERO &amp; IDENTITY COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hero &amp; Profile Control Center
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
            Live configuration for Home hero pitch, dynamic typing roles, About Me architecture narrative, and asset documents.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="relative z-10 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#F1BF00] text-[#0B0C0E] font-bold text-xs uppercase tracking-wider hover:bg-[#F1BF00]/90 transition-all shadow-lg shadow-[#F1BF00]/20 disabled:opacity-50 shrink-0"
        >
          <Save className="w-4 h-4 stroke-[3]" />
          <span>{saving ? "Saving Changes..." : "Save All Settings"}</span>
        </button>
      </div>

      {/* Modern Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#101217] border border-white/10 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "hero"
              ? "bg-[#F1BF00] text-[#0B0C0E] shadow-md shadow-[#F1BF00]/20"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>🏠 Home Hero Section</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "about"
              ? "bg-[#F1BF00] text-[#0B0C0E] shadow-md shadow-[#F1BF00]/20"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>👤 About Me &amp; Pillars</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("metrics")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "metrics"
              ? "bg-[#F1BF00] text-[#0B0C0E] shadow-md shadow-[#F1BF00]/20"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>📊 Metrics &amp; Assets</span>
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* TAB 1: HERO (HOME) SECTION */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101217] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <Sparkles className="w-5 h-5 text-[#F1BF00]" />
                <h3 className="font-bold text-white text-base">Hero Primary Identity &amp; Status</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Greeting Line
                  </label>
                  <input
                    type="text"
                    value={form.heroGreeting}
                    onChange={(e) => setForm({ ...form, heroGreeting: e.target.value })}
                    placeholder="Hi There, I'm"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Display Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Muhammad Jahanzaib"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Top Status Pill Beacon (Live Availability)
                </label>
                <input
                  type="text"
                  value={form.heroBadge}
                  onChange={(e) => setForm({ ...form, heroBadge: e.target.value })}
                  placeholder="🟢 Available for Full-Time Roles & High-Impact Contracts (Remote Worldwide)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Dynamic Typewriter Roles (Comma Separated)
                </label>
                <input
                  type="text"
                  value={form.typingRoles}
                  onChange={(e) => setForm({ ...form, typingRoles: e.target.value })}
                  placeholder="Frontend Engineer, React.js & Next.js Developer, Full Stack Web Developer"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors font-mono"
                />
                <p className="text-[11px] text-white/40 mt-1 font-mono">
                  Separate each animated role with a comma. They will loop in sequence on the hero headline.
                </p>
              </div>

              {/* High-Converting Hero Pitch / Subtitle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-[#F1BF00] uppercase font-bold">
                    Hero Main Introduction &amp; Pitch (Under Typing Roles) *
                  </label>
                  <span className="text-[10px] font-mono text-white/40">Visible directly on Home Page</span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="I architect scalable, high-performance web systems and bespoke digital products..."
                  className="w-full p-4 rounded-xl bg-white/[0.04] border border-[#F1BF00]/30 text-white text-xs leading-relaxed outline-none focus:border-[#F1BF00] transition-colors resize-none"
                />
                <p className="text-[11px] text-white/40 mt-1 font-mono">
                  This is the prominent narrative paragraph on the home screen right below &quot;I Am Into ...&quot;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Primary Button CTA
                  </label>
                  <input
                    type="text"
                    value={form.primaryCTA}
                    onChange={(e) => setForm({ ...form, primaryCTA: e.target.value })}
                    placeholder="Explore Projects"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Secondary Button CTA
                  </label>
                  <input
                    type="text"
                    value={form.secondaryCTA}
                    onChange={(e) => setForm({ ...form, secondaryCTA: e.target.value })}
                    placeholder="Download Resume"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT ME & ARCHITECTURE PILLARS */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101217] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <FileText className="w-5 h-5 text-[#F1BF00]" />
                <h3 className="font-bold text-white text-base">About Section Headings &amp; Narrative</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    About Section Main Heading
                  </label>
                  <input
                    type="text"
                    value={form.aboutHeading}
                    onChange={(e) => setForm({ ...form, aboutHeading: e.target.value })}
                    placeholder="Behind the Code & Architecture"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    About Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={form.aboutSubtitle}
                    onChange={(e) => setForm({ ...form, aboutSubtitle: e.target.value })}
                    placeholder="Architecting modern, scalable React & Next.js web applications..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Story Box Header
                  </label>
                  <input
                    type="text"
                    value={form.storyTitle}
                    onChange={(e) => setForm({ ...form, storyTitle: e.target.value })}
                    placeholder="Modern Frontend & Full Stack Architecture"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Story Box Sub-Header
                  </label>
                  <input
                    type="text"
                    value={form.storySubtitle}
                    onChange={(e) => setForm({ ...form, storySubtitle: e.target.value })}
                    placeholder="Production-Grade Engineering • Clean Next.js & React Systems"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-white/60 uppercase">
                    Biography Story Paragraphs (Leave empty line between paragraphs)
                  </label>
                  <span className="text-[10px] font-mono text-white/40">Multi-paragraph Markdown</span>
                </div>
                <textarea
                  rows={6}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="I am a Frontend Engineer and Full Stack Web Developer holding a Software Engineering degree..."
                  className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs leading-relaxed outline-none focus:border-[#F1BF00]/60 transition-colors resize-none"
                />
              </div>
            </div>

            {/* 4 Architectural Pillars Editor */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101217] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#F1BF00]" />
                  <h3 className="font-bold text-white text-base">4 Architectural Pillars (Under Story Card)</h3>
                </div>
                <span className="text-xs font-mono text-[#F1BF00]">4 Key Foundations</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#F1BF00] font-bold">
                        Pillar #{idx + 1}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-white/50 mb-1 uppercase">
                        Title
                      </label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => updatePillar(idx, "title", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-white/50 mb-1 uppercase">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={pillar.desc}
                        onChange={(e) => updatePillar(idx, "desc", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: METRICS, ASSETS & CONTACT */}
        {activeTab === "metrics" && (
          <div className="space-y-6">
            {/* Direct File & Asset Uploaders */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101217] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <FileText className="w-5 h-5 text-[#F1BF00]" />
                <h3 className="font-bold text-white text-base">Media &amp; Document Assets</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUploader
                  label="Portrait Photo (About Section & Portrait Frame)"
                  value={form.avatarUrl || "/assets/about-me.png"}
                  onChange={(url) => {
                    setForm({ ...form, avatarUrl: url });
                    toast.success("Portrait photo updated!");
                  }}
                  accept="image/png,image/jpeg,image/webp"
                  helperText="Recommended: 600x750 high resolution portrait (.png or .jpg)"
                />

                <FileUploader
                  label="Complete Resume / Curriculum Vitae (PDF)"
                  value={form.resumeUrl || "/assets/Jahanzaib-Resume-Frontend-Engineer.pdf"}
                  onChange={(url) => {
                    setForm({ ...form, resumeUrl: url });
                    toast.success("Resume PDF document updated!");
                  }}
                  accept="application/pdf"
                  helperText="Official downloadable PDF for recruiters & clients"
                />
              </div>
            </div>

            {/* 4 Telemetry Counters */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101217] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#F1BF00]" />
                  <h3 className="font-bold text-white text-base">4 Telemetry Stat Counters (Live Bar &amp; Config Box)</h3>
                </div>
                <span className="text-xs font-mono text-[#F1BF00]">Hero &amp; Public Display</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {counters.map((counter, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
                  >
                    <span className="text-[10px] font-mono text-[#F1BF00] uppercase font-bold">
                      Metric #{idx + 1}
                    </span>

                    <div>
                      <label className="block text-[10px] font-mono text-white/50 mb-1 uppercase">
                        Stat Value
                      </label>
                      <input
                        type="text"
                        value={counter.value}
                        onChange={(e) => updateCounter(idx, "value", e.target.value)}
                        placeholder="e.g. 6+ or 785+"
                        className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white font-mono text-sm font-bold outline-none focus:border-[#F1BF00]/60"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-white/50 mb-1 uppercase">
                        Stat Label
                      </label>
                      <input
                        type="text"
                        value={counter.label}
                        onChange={(e) => updateCounter(idx, "label", e.target.value)}
                        placeholder="e.g. Production Systems Shipped"
                        className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact & Location */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#101217] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <User className="w-5 h-5 text-[#F1BF00]" />
                <h3 className="font-bold text-white text-base">Direct Contact Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Location &amp; Availability
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Bottom Save Action */}
        <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/10">
          <p className="text-xs text-white/40 font-mono">
            All modifications update live database instantly upon saving.
          </p>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#F1BF00] text-[#0B0C0E] font-bold text-xs uppercase tracking-wider hover:bg-[#F1BF00]/90 transition-all shadow-lg shadow-[#F1BF00]/20 disabled:opacity-50"
          >
            <Save className="w-4 h-4 stroke-[3]" />
            <span>{saving ? "Saving Changes..." : "Save All Settings"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
