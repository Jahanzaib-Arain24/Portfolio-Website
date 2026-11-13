"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Briefcase, X } from "lucide-react";
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
    location: "Remote",
    focus: "",
    achievementsInput: "",
    order: 0,
  });

  const fetchExperience = async () => {
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      if (data.experiences) setExperiences(data.experiences);
    } catch {
      toast.error("Failed to fetch experiences.");
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
    const payload = {
      ...form,
      id: editingId,
      achievements: form.achievementsInput.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/experience", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Experience updated!" : "Experience added!");
        setShowModal(false);
        fetchExperience();
      } else {
        toast.error("Failed to save.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job role?")) return;

    try {
      const res = await fetch(`/api/experience?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Role removed!");
        fetchExperience();
      } else {
        toast.error("Failed to delete.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <Toaster position="bottom-right" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Work Experience Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Add, update, or remove previous engineering companies, contracts, and achievements.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Add Work Role</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-2xl bg-[#0e101a] border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-indigo-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white text-base group-hover:text-indigo-300">
                  {exp.role}
                </span>
                <span className="text-cyan-400 font-semibold text-sm">
                  @ {exp.company}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mb-2">
                {exp.timeline} • {exp.location} • Focus: {exp.focus}
              </p>
              <div className="space-y-1">
                {exp.achievements.map((ach, idx) => (
                  <p key={idx} className="text-xs text-slate-300">
                    • {ach}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => openEditModal(exp)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                title="Edit Role"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                title="Remove Role"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e101a] border border-white/15 p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-bold text-white mb-4">
              {editingId ? "Edit Work Role" : "Add Work Role"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Job Role *</label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. OM SOLUTIONZ PVT LTD"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Timeline *</label>
                  <input
                    type="text"
                    required
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    placeholder="e.g. Dec 2025 – Present"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Remote / On-site"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Role Focus</label>
                <input
                  type="text"
                  value={form.focus}
                  onChange={(e) => setForm({ ...form, focus: e.target.value })}
                  placeholder="e.g. UI Component Architecture, Performance"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">
                  Key Achievements (one bullet per line)
                </label>
                <textarea
                  rows={4}
                  value={form.achievementsInput}
                  onChange={(e) => setForm({ ...form, achievementsInput: e.target.value })}
                  placeholder="Architected 10+ modular UI components...&#10;Accelerated feature delivery by 30%..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

