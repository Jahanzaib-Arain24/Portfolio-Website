"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Cpu, X, Sparkles, Check, ArrowRight } from "lucide-react";
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
  icon?: string | null;
  order: number;
  skills: SkillItem[];
}

export default function SkillsAdminPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

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

  const openAddModal = (catId?: string) => {
    if (catId) setSelectedCatId(catId);
    setEditingSkillId(null);
    setForm({
      name: "",
      proficiency: 90,
      order: 0,
    });
    setShowModal(true);
  };

  const openEditModal = (skill: SkillItem, catId: string) => {
    setSelectedCatId(catId);
    setEditingSkillId(skill.id);
    setForm({
      name: skill.name,
      proficiency: skill.proficiency,
      order: skill.order,
    });
    setShowModal(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCatId || !form.name) return;

    try {
      if (editingSkillId) {
        // Update existing skill
        const res = await fetch("/api/skills", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingSkillId,
            ...form,
            categoryId: selectedCatId,
          }),
        });
        if (res.ok) {
          toast.success("Skill updated!");
          setShowModal(false);
          fetchSkills();
        } else {
          toast.error("Failed to update skill.");
        }
      } else {
        // Create new skill
        const res = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            categoryId: selectedCatId,
          }),
        });
        if (res.ok) {
          toast.success("Skill added successfully!");
          setShowModal(false);
          fetchSkills();
        } else {
          toast.error("Failed to add skill.");
        }
      }
    } catch {
      toast.error("Network error during save.");
    }
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success(`Removed "${name}"`);
        fetchSkills();
      } else {
        toast.error("Failed to delete.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const activeCategory = categories.find((c) => c.id === selectedCatId) || categories[0];

  return (
    <div className="space-y-8">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] font-mono mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-heading">
            Skills &amp; Technologies Matrix
          </h1>
          <p className="text-xs text-[#999999] mt-1">
            Organize skills across your 4 core categories, fine-tune mastery percentages, and add new frameworks.
          </p>
        </div>

        <button
          onClick={() => openAddModal()}
          className="btn-royal-gold text-xs shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Skill in Current Tab</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => {
          const isSelected = selectedCatId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#F1BF00] text-[#0B0C0E] shadow-lg shadow-[#F1BF00]/20 font-bold"
                  : "bg-[#12141A] text-[#CAD5E2] hover:text-white border border-white/5 hover:border-white/15"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                  isSelected ? "bg-[#0B0C0E]/20 text-[#0B0C0E]" : "bg-white/5 text-[#999999]"
                }`}
              >
                {cat.skills.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills in Active Category */}
      {loading ? (
        <div className="p-16 text-center text-[#999999] font-mono text-xs">
          Loading Technical Skills...
        </div>
      ) : activeCategory && (
        <div className="rounded-3xl p-6 sm:p-8 bg-[#12141A] border border-white/10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white font-serif-heading">
                {activeCategory.name}
              </h2>
              <p className="text-xs font-mono text-[#999999] mt-0.5">
                {activeCategory.skills.length} Registered Technologies &bull; Updates reflect on live site immediately
              </p>
            </div>

            <button
              onClick={() => openAddModal(activeCategory.id)}
              className="text-xs font-semibold text-[#F1BF00] hover:text-[#FFF8DC] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to {activeCategory.name}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory.skills.map((skill) => (
              <div
                key={skill.id}
                className="group p-4 rounded-2xl bg-[#0B0C0E] border border-white/5 hover:border-[#F1BF00]/40 transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FFF8DC] transition-colors truncate">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono text-[#F1BF00]">
                      {skill.proficiency >= 92 ? "Expert Mastery" : skill.proficiency >= 85 ? "Advanced Level" : "Proficient"}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#F1BF00] bg-[#F1BF00]/10 px-2 py-0.5 rounded border border-[#F1BF00]/20 shrink-0">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Progress bar preview */}
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-[#AA151B] to-[#F1BF00] rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>

                {/* Card actions */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(skill, activeCategory.id)}
                    className="p-1.5 rounded-lg text-xs text-[#999999] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Edit Skill"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#F1BF00]" />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id, skill.name)}
                    className="p-1.5 rounded-lg text-xs text-[#999999] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-[#12141A] border border-[#F1BF00]/30 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#999999] hover:text-white border border-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#F1BF00] text-xs font-mono uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>{editingSkillId ? "Edit Skill" : "Add Skill"}</span>
            </div>
            <h2 className="text-xl font-bold text-white font-serif-heading mb-6">
              {editingSkillId ? `Edit "${form.name}"` : "Add Technology"}
            </h2>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                  Target Category
                </label>
                <select
                  value={selectedCatId}
                  onChange={(e) => setSelectedCatId(e.target.value)}
                  className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F1BF00]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                  Technology / Skill Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js 16, GraphQL, Redis"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#999999] focus:outline-none focus:border-[#F1BF00]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#999999] mb-1.5">
                  <span>Proficiency Percentage</span>
                  <span className="text-[#F1BF00] font-bold">{form.proficiency}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={form.proficiency}
                  onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
                  className="w-full accent-[#F1BF00] cursor-pointer"
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
                  <span>{editingSkillId ? "Save Changes" : "Add to Matrix"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
