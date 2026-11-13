"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Cpu, X, Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface SkillItem {
  id: string;
  name: string;
  proficiency: number;
  order: number;
}

interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
}

export default function SkillsAdminPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [form, setForm] = useState({
    name: "",
    proficiency: 90,
    order: 0,
  });

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
        if (data.categories.length > 0 && !selectedCatId) {
          setSelectedCatId(data.categories[0].id);
        }
      }
    } catch {
      toast.error("Failed to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCatId || !form.name) return;

    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categoryId: selectedCatId,
        }),
      });

      if (res.ok) {
        toast.success("Skill added!");
        setShowModal(false);
        setForm({ name: "", proficiency: 90, order: 0 });
        fetchSkills();
      } else {
        toast.error("Failed to add skill.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Are you sure you want to remove this skill?")) return;

    try {
      const res = await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Skill removed!");
        fetchSkills();
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
            Skills Matrix Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Add, update, or remove skills and proficiency percentages across each domain.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Category Tabs & Skill Grid */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                selectedCatId === cat.id
                  ? "bg-indigo-600/30 border-indigo-500 text-white"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {cat.name} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Selected Category's Skills */}
        <div className="rounded-2xl bg-[#0e101a] border border-white/10 p-6 shadow-xl">
          {categories
            .filter((c) => c.id === selectedCatId)
            .map((cat) => (
              <div key={cat.id}>
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider font-mono">
                  {cat.name} — Current Skills
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3 group hover:border-indigo-500/40 transition-colors"
                    >
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-indigo-300">
                          {skill.name}
                        </p>
                        <p className="text-[10px] text-cyan-400 font-mono">
                          Proficiency: {skill.proficiency}%
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Remove Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Skill Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#0e101a] border border-white/15 p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-bold text-white mb-4">Add Skill to Portfolio</h2>

            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Target Category</label>
                <select
                  value={selectedCatId}
                  onChange={(e) => setSelectedCatId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0e101a]">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Next.js 16, GraphQL, Redux Toolkit"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">
                  Proficiency ({form.proficiency}%)
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={form.proficiency}
                  onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
                  className="w-full"
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
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

