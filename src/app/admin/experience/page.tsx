"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Briefcase, X, Check, Calendar, MapPin, Building2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  timeline: string;
  location: string;
  focus: string;
  achievements: string[];
  order: number;
}

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    role: "",
    company: "",
    timeline: "",
    location: "Karachi, Pakistan (Remote)",
    focus: "",
    achievementsInput: "",
    order: 0,
  });

  const fetchExperience = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      if (data.experiences) {
        setExperiences(data.experiences);
      }
    } catch {
      toast.error("Failed to load experiences.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      role: "",
      company: "",
      timeline: "",
      location: "Remote",
      focus: "",
      achievementsInput: "",
      order: experiences.length + 1,
    });
    setShowModal(true);
  };

  const openEditModal = (exp: ExperienceItem) => {
    setEditingId(exp.id);
    setForm({
      role: exp.role,
      company: exp.company,
      timeline: exp.timeline,
      location: exp.location,
      focus: exp.focus,
      achievementsInput: exp.achievements.join("\n"),
      order: exp.order,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role || !form.company) return;

    const payload = {
      ...form,
      id: editingId,
      achievements: form.achievementsInput
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/experience", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Experience updated!" : "New role added!");
        setShowModal(false);
        fetchExperience();
      } else {
        toast.error("Failed to save experience.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const handleDelete = async (id: string, role: string) => {
    if (!confirm(`Delete "${role}"?`)) return;

    try {
      const res = await fetch(`/api/experience?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Experience record deleted.");
        fetchExperience();
      } else {
        toast.error("Failed to delete.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  return (
    <div className="space-y-8">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] font-mono mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Progression</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-heading">
            Work Experience Manager
          </h1>
          <p className="text-xs text-[#999999] mt-1">
            Add engineering positions, contract deliverables, company details, and measurable achievements.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-royal-gold text-xs shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Work Experience</span>
        </button>
      </div>

      {/* Experience Timeline Cards */}
      {loading ? (
        <div className="p-16 text-center text-[#999999] font-mono text-xs">
          Loading career timeline...
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group p-6 rounded-3xl bg-[#12141A] border border-white/10 hover:border-[#F1BF00]/40 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-xl"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-white font-serif-heading">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-[#F1BF00] bg-[#F1BF00]/10 px-3 py-0.5 rounded-full border border-[#F1BF00]/20">
                    {exp.company}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#999999]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#F1BF00]" />
                    {exp.timeline}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#999999]" />
                    {exp.location}
                  </span>
                </div>

                {exp.focus && (
                  <p className="text-xs text-[#FFF8DC] font-medium">
                    Focus: {exp.focus}
                  </p>
                )}

                <ul className="space-y-1.5 pt-2">
                  {exp.achievements.map((a, idx) => (
                    <li key={idx} className="text-xs text-[#CAD5E2] flex items-start gap-2 leading-relaxed">
                      <span className="text-[#F1BF00] mt-1 shrink-0">&bull;</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 self-end md:self-start shrink-0">
                <button
                  onClick={() => openEditModal(exp)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#F1BF00]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(exp.id, exp.role)}
                  className="p-1.5 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors cursor-pointer"
                  title="Delete Role"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#12141A] border border-[#F1BF00]/30 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#999999] hover:text-white border border-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white font-serif-heading mb-6">
              {editingId ? "Edit Work Experience" : "Add New Role"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                    Job Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Front-End Developer"
                    className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. OM SOLUTIONZ PVT LTD"
                    className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                    Duration / Timeline *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    placeholder="e.g. Dec 2025 – Present"
                    className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                    Location &amp; Work Model
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Remote / On-site"
                    className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                  Core Engineering Focus Area
                </label>
                <input
                  type="text"
                  value={form.focus}
                  onChange={(e) => setForm({ ...form, focus: e.target.value })}
                  placeholder="e.g. UI Component Architecture & Performance"
                  className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                  Key Achievements &amp; Responsibilities (One per line)
                </label>
                <textarea
                  rows={4}
                  value={form.achievementsInput}
                  onChange={(e) => setForm({ ...form, achievementsInput: e.target.value })}
                  placeholder="Architected 10+ modular, reusable UI components&#10;Accelerated feature delivery velocity by 30%&#10;Collaborated with backend teams on REST API pipelines"
                  className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00] leading-relaxed font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#999999] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-royal-gold text-xs px-6 py-2.5 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>{editingId ? "Save Changes" : "Save Experience"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
