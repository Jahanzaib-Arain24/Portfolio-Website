"use client";

import { useState, useEffect } from "react";
import { Save, User, Sparkles, Check, Download, FileText, Image as ImageIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import FileUploader from "@/components/admin/FileUploader";

export default function ProfileAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
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
    resumeUrl: "",
    heroCounters: "[]",
  });

  const [counters, setCounters] = useState<Array<{ label: string; value: string }>>([]);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile(data.profile);
          try {
            setCounters(JSON.parse(data.profile.heroCounters || "[]"));
          } catch {
            setCounters([]);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load profile.");
        setLoading(false);
      });
  }, []);

  const handleCounterChange = (index: number, field: "label" | "value", val: string) => {
    const next = [...counters];
    next[index] = { ...next[index], [field]: val };
    setCounters(next);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...profile,
        heroCounters: JSON.stringify(counters),
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Profile and Hero settings updated instantly!");
      } else {
        toast.error("Update failed.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-[#999999] text-xs font-mono py-16 text-center">
        Loading Profile Configuration...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] font-mono mb-2">
          <User className="w-3.5 h-3.5" />
          <span>Identity &amp; Narrative</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-heading">
          Hero &amp; Profile Control Center
        </h1>
        <p className="text-xs text-[#999999] mt-1">
          Manage your personal biography, resume PDF document, portrait image, and live telemetry stats.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Media Files (Portrait Photo & Resume PDF) */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#12141A] border border-white/10 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-white font-serif-heading text-lg">
            <ImageIcon className="w-5 h-5 text-[#F1BF00]" />
            <h3>Media &amp; Document Assets</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploader
              label="Portrait Photo (About Me Section)"
              value="/assets/about-me.png"
              onChange={(url) => toast.success("Portrait photo updated in public/assets!")}
              accept="image/png, image/jpeg, image/webp"
              customName="about-me"
              helperText="Upload your official photo. Directly replaces public/assets/about-me.png with instant hover effect."
            />

            <FileUploader
              label="Resume / Curriculum Vitae (PDF Document)"
              value={profile.resumeUrl || "/assets/Jahanzaib-Resume-Frontend-Engineer.pdf"}
              onChange={(url) => setProfile({ ...profile, resumeUrl: url })}
              accept="application/pdf"
              customName="Jahanzaib-Resume-Frontend-Engineer"
              helperText="Upload your latest PDF CV. Automatically updates download buttons across the portfolio."
            />
          </div>
        </div>

        {/* Section 2: Personal Contact Information */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#12141A] border border-white/10 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-white font-serif-heading text-lg">
            <Sparkles className="w-5 h-5 text-[#F1BF00]" />
            <h3>Personal Identity &amp; Contact</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                WhatsApp / Phone *
              </label>
              <input
                type="text"
                required
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                Location &amp; Availability *
              </label>
              <input
                type="text"
                required
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Hero Headline & Badges */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#12141A] border border-white/10 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-white font-serif-heading text-lg">
            <Sparkles className="w-5 h-5 text-[#F1BF00]" />
            <h3>Hero Top Section Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                Hero Status Pill Badge (Top Beacon)
              </label>
              <input
                type="text"
                value={profile.heroBadge}
                onChange={(e) => setProfile({ ...profile, heroBadge: e.target.value })}
                className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                  Greeting Line
                </label>
                <input
                  type="text"
                  value={profile.heroGreeting}
                  onChange={(e) => setProfile({ ...profile, heroGreeting: e.target.value })}
                  className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                  Primary Title / Headline
                </label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: About Me Biography Narrative */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#12141A] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-white font-serif-heading text-lg">
              About Me Biography Story
            </h3>
            <span className="text-[11px] font-mono text-[#999999]">
              Supports multi-paragraph layout (leave empty line between paragraphs)
            </span>
          </div>

          <textarea
            rows={6}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F1BF00] leading-relaxed"
          />
        </div>

        {/* Section 5: Telemetry Counters */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#12141A] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-white font-serif-heading text-lg">
              Telemetry Stat Counters (Above About Section)
            </h3>
            <span className="text-[11px] font-mono text-[#999999]">
              4 Key Metrics
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {counters.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0B0C0E] border border-white/5 space-y-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#999999] mb-1">
                    Value #{idx + 1}
                  </label>
                  <input
                    type="text"
                    value={c.value}
                    onChange={(e) => handleCounterChange(idx, "value", e.target.value)}
                    className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-mono font-bold focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#999999] mb-1">
                    Label #{idx + 1}
                  </label>
                  <input
                    type="text"
                    value={c.label}
                    onChange={(e) => handleCounterChange(idx, "label", e.target.value)}
                    className="w-full bg-[#12141A] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button Bar */}
        <div className="sticky bottom-6 p-4 rounded-2xl bg-[#12141A]/95 border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-between">
          <p className="text-xs text-[#999999] font-mono hidden sm:inline">
            Press save to sync all changes directly to SQLite database.
          </p>
          <button
            type="submit"
            disabled={saving}
            className="btn-royal-gold text-xs px-8 py-3 shrink-0 cursor-pointer ml-auto"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{saving ? "Publishing Updates..." : "Save All Profile Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
