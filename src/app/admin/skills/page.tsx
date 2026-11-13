"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Cpu, 
  X, 
  Sparkles, 
  Check, 
  Pin, 
  GripVertical, 
  ChevronUp, 
  ChevronDown,
  Layers
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface SkillItem {
  id: string;
  name: string;
  proficiency: number;
  pinned?: boolean;
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
  const [draggedSkillIndex, setDraggedSkillIndex] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    proficiency: 90,
    pinned: false,
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
    const activeCat = categories.find((c) => c.id === (catId || selectedCatId));
    setForm({
      name: "",
      proficiency: 90,
      pinned: false,
      order: (activeCat?.skills.length || 0) + 1,
    });
    setShowModal(true);
  };

  const openEditModal = (skill: SkillItem, catId: string) => {
    setSelectedCatId(catId);
    setEditingSkillId(skill.id);
    setForm({
      name: skill.name,
      proficiency: skill.proficiency,
      pinned: Boolean(skill.pinned),
      order: skill.order,
    });
    setShowModal(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCatId || !form.name) return;

    try {
      if (editingSkillId) {
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
        const res = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            categoryId: selectedCatId,
          }),
        });
        if (res.ok) {
          toast.success("Skill added to matrix!");
          setShowModal(false);
          fetchSkills();
        } else {
          toast.error("Failed to add skill.");
        }
      }
    } catch {
      toast.error("Network error while saving.");
    }
  };

  const handleDeleteSkill = async (skillId: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}"?`)) return;

    try {
      const res = await fetch(`/api/skills?id=${skillId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Skill removed!");
        fetchSkills();
      } else {
        toast.error("Failed to delete skill.");
      }
    } catch {
      toast.error("Network error while deleting.");
    }
  };

  // Toggle Pin for a skill
  const togglePinSkill = async (skill: SkillItem) => {
    const newPinned = !skill.pinned;

    // Optimistically update
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== selectedCatId) return cat;
        const updatedSkills = cat.skills.map((s) =>
          s.id === skill.id ? { ...s, pinned: newPinned } : s
        );
        updatedSkills.sort((a, b) => {
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
          return a.order - b.order;
        });
        return { ...cat, skills: updatedSkills };
      })
    );

    try {
      const res = await fetch("/api/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: skill.id,
          pinned: newPinned,
        }),
      });

      if (res.ok) {
        toast.success(newPinned ? `📌 "${skill.name}" pinned to top of category!` : `Unpinned "${skill.name}"`);
        fetchSkills();
      } else {
        toast.error("Failed to pin skill.");
        fetchSkills();
      }
    } catch {
      toast.error("Network error.");
      fetchSkills();
    }
  };

  // Save new skill order to server
  const saveSkillOrder = async (skillsList: SkillItem[]) => {
    const items = skillsList.map((item, index) => ({
      id: item.id,
      order: index,
      pinned: item.pinned,
    }));

    try {
      const res = await fetch("/api/skills", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (res.ok) {
        toast.success("Skill order saved to live portfolio!");
      } else {
        toast.error("Failed to reorder skills.");
      }
    } catch {
      toast.error("Network error while reordering.");
    }
  };

  // Drag and Drop handlers for Skills
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedSkillIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedSkillIndex === null || draggedSkillIndex === index) return;

    const currentCat = categories.find((c) => c.id === selectedCatId);
    if (!currentCat) return;

    const updatedSkills = [...currentCat.skills];
    const draggedItem = updatedSkills[draggedSkillIndex];
    updatedSkills.splice(draggedSkillIndex, 1);
    updatedSkills.splice(index, 0, draggedItem);

    setDraggedSkillIndex(index);
    setCategories((prev) =>
      prev.map((c) => (c.id === selectedCatId ? { ...c, skills: updatedSkills } : c))
    );
  };

  const handleDragEnd = () => {
    setDraggedSkillIndex(null);
    const currentCat = categories.find((c) => c.id === selectedCatId);
    if (currentCat) {
      saveSkillOrder(currentCat.skills);
    }
  };

  // Manual Move Up / Down
  const moveSkill = (index: number, direction: "up" | "down") => {
    const currentCat = categories.find((c) => c.id === selectedCatId);
    if (!currentCat) return;

    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === currentCat.skills.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updatedSkills = [...currentCat.skills];
    const item = updatedSkills[index];
    updatedSkills[index] = updatedSkills[targetIndex];
    updatedSkills[targetIndex] = item;

    setCategories((prev) =>
      prev.map((c) => (c.id === selectedCatId ? { ...c, skills: updatedSkills } : c))
    );
    saveSkillOrder(updatedSkills);
  };

  const activeCategory = categories.find((c) => c.id === selectedCatId);

  return (
    <div className="space-y-8 max-w-6xl">
      <Toaster position="bottom-right" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101217] via-[#14171E] to-[#0B0C0E] border border-[#F1BF00]/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F1BF00]/5 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/25 text-[#F1BF00] text-xs font-mono mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>ENGINEERING COMPETENCY MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Skills &amp; Technologies Management
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
            Drag to arrange technology sequence, pin core tools to top, and fine-tune proficiency percentages.
          </p>
        </div>

        <button
          onClick={() => openAddModal(selectedCatId)}
          className="relative z-10 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#F1BF00] text-[#0B0C0E] font-bold text-xs uppercase tracking-wider hover:bg-[#F1BF00]/90 transition-all shadow-lg shadow-[#F1BF00]/20 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Technology</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCatId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                isSelected
                  ? "bg-[#F1BF00] text-[#0B0C0E] border-[#F1BF00] shadow-lg shadow-[#F1BF00]/20"
                  : "bg-[#101217] text-white/70 hover:text-white border-white/10 hover:border-white/20"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                  isSelected ? "bg-[#0B0C0E]/20 text-[#0B0C0E]" : "bg-white/5 text-white/40"
                }`}
              >
                {cat.skills.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Arrangement Guide Strip */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#101217] border border-white/10 text-xs font-mono text-white/50">
        <div className="flex items-center gap-2">
          <GripVertical className="w-3.5 h-3.5 text-[#F1BF00]" />
          <span>Drag skill cards or use arrows &bull; Click <Pin className="w-3 h-3 inline text-[#F1BF00]" /> to pin skill to top</span>
        </div>
        <div>
          Category: <span className="text-[#F1BF00] font-bold">{activeCategory?.name}</span>
        </div>
      </div>

      {/* Skills List in Active Category */}
      {loading ? (
        <div className="p-12 text-center text-white/40 font-mono text-xs">
          Loading engineering skills...
        </div>
      ) : !activeCategory || activeCategory.skills.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#101217] border border-white/5 text-white/40 font-mono text-xs">
          No skills configured in this category yet. Click &quot;Add New Technology&quot; to begin.
        </div>
      ) : (
        <div className="space-y-3">
          {activeCategory.skills.map((skill, index) => (
            <div
              key={skill.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`p-4 rounded-2xl bg-[#101217] border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg ${
                skill.pinned
                  ? "border-[#F1BF00]/40 shadow-[#F1BF00]/5 bg-gradient-to-r from-[#141720] to-[#101217]"
                  : "border-white/10 hover:border-white/20"
              } ${draggedSkillIndex === index ? "opacity-50 scale-[0.99] border-dashed border-[#F1BF00]" : ""}`}
            >
              <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto">
                {/* Drag Grip Handle */}
                <div
                  className="cursor-grab active:cursor-grabbing p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/40 hover:text-[#F1BF00] transition-colors shrink-0"
                  title="Drag to rearrange position"
                >
                  <GripVertical className="w-4 h-4" />
                </div>

                {/* Move Up / Down Buttons */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => moveSkill(index, "up")}
                    disabled={index === 0}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp className="w-2.5 h-2.5" />
                  </button>
                  <button
                    onClick={() => moveSkill(index, "down")}
                    disabled={index === activeCategory.skills.length - 1}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown className="w-2.5 h-2.5" />
                  </button>
                </div>

                {/* Skill Name & Badges */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {skill.name}
                    </span>
                    {skill.pinned && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 bg-[#AA151B]/80 border border-[#F1BF00]/40 px-2 py-0.5 rounded-full">
                        <Pin className="w-2 h-2 fill-amber-300 rotate-45" />
                        <span>Pinned</span>
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-white/30">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Progress Bar & Level */}
                  <div className="flex items-center gap-3 mt-1.5 w-48 sm:w-64">
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#AA151B] to-[#F1BF00] h-full rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#F1BF00] shrink-0">
                      {skill.proficiency}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 w-full sm:w-auto justify-end">
                {/* Pin / Unpin Button */}
                <button
                  onClick={() => togglePinSkill(skill)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    skill.pinned
                      ? "bg-[#F1BF00] text-[#0B0C0E] font-bold shadow-md shadow-[#F1BF00]/20"
                      : "bg-white/5 hover:bg-[#F1BF00]/20 text-white/60 hover:text-[#F1BF00]"
                  }`}
                  title={skill.pinned ? "Click to unpin" : "Pin skill to top of category"}
                >
                  <Pin className={`w-3 h-3 ${skill.pinned ? "fill-[#0B0C0E] rotate-45" : ""}`} />
                  <span>{skill.pinned ? "Pinned" : "Pin"}</span>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => openEditModal(skill, selectedCatId)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-[#F1BF00]/20 text-white/70 hover:text-[#F1BF00] transition-colors"
                  title="Edit Skill"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteSkill(skill.id, skill.name)}
                  className="p-2 rounded-xl bg-[#AA151B]/15 hover:bg-[#AA151B]/30 text-rose-400 transition-colors"
                  title="Delete Skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#101217] border border-[#F1BF00]/30 p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#F1BF00]" />
              <span className="text-xs font-mono text-[#F1BF00] uppercase tracking-wider">
                {editingSkillId ? "Update Skill" : "New Technology"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-6">
              {editingSkillId ? "Edit Skill Details" : "Add Technology"}
            </h2>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Technology / Tool Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Next.js 16 or Tailwind CSS"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Category
                </label>
                <select
                  value={selectedCatId}
                  onChange={(e) => setSelectedCatId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101217] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#101217]">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-white/60 uppercase">
                    Proficiency Level
                  </label>
                  <span className="text-xs font-mono font-bold text-[#F1BF00]">
                    {form.proficiency}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={form.proficiency}
                  onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value) })}
                  className="w-full accent-[#F1BF00]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.pinned}
                    onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
                    className="w-4 h-4 rounded text-[#F1BF00] accent-[#F1BF00]"
                  />
                  <div>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Pin className="w-3.5 h-3.5 text-[#F1BF00] rotate-45" />
                      <span>Pin to Top of Category</span>
                    </span>
                    <span className="text-[10px] text-white/40 block">Always appear first in this skill section</span>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F1BF00] text-[#0B0C0E] font-bold text-xs uppercase tracking-wider hover:bg-[#F1BF00]/90 transition-all shadow-lg shadow-[#F1BF00]/20"
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
