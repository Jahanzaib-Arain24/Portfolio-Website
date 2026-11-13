"use client";

import { useState, useEffect } from "react";
import { Save, User, Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile(data.profile);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load profile.");
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        toast.success("Profile updated instantly!");
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
      <div className="text-slate-400 text-xs font-mono py-12 text-center">
        Loading Profile Data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <Toaster position="bottom-right" />
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Profile & Bio Settings
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Update headline, bio narrative, resume links, and contact channels across the entire portfolio.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-[#0e101a] border border-white/10 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
              Full Name
            </label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 text-white text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
              Email Address
            </label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 text-white text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
              Primary Title
            </label>
            <input
              type="text"
              required
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 text-white text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
              Subtitle Badge
            </label>
            <input
              type="text"
              value={profile.subtitle}
              onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 text-white text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
              Phone / WhatsApp
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 text-white text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 text-white text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
            Hero Availability Status Badge
          </label>
          <input
            type="text"
            value={profile.heroBadge}
            onChange={(e) => setProfile({ ...profile, heroBadge: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 text-white text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
            Resume PDF File URL
          </label>
          <input
            type="text"
            value={profile.resumeUrl}
            onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 text-white text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
            About Me Narrative (Bio)
          </label>
          <textarea
            rows={6}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500 text-white text-sm outline-none resize-none leading-relaxed"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Profile Updates"}</span>
        </button>
      </form>
    </div>
  );
}

