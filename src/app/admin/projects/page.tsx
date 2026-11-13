"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Sparkles,
  Check,
  X,
  FolderGit2,
  Image as ImageIcon,
  Layers,
  ArrowUpDown,
  Search,
  Pin,
  GripVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import toast, { Toaster } from "react-hot-toast";
import FileUploader from "@/components/admin/FileUploader";

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  type: string;
  highlights: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  pinned?: boolean;
  order: number;
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: "",
    tagline: "",
    description: "",
    type: "Web Application",
    techStackInput: "",
    highlightsInput: "",
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    featured: false,
    pinned: false,
    order: 0,
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch {
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      title: "",
      tagline: "",
      description: "",
      type: "Web Application",
      techStackInput: "Next.js, React, TypeScript, Tailwind CSS",
      highlightsInput: "",
      liveUrl: "",
      githubUrl: "",
      imageUrl: "",
      featured: false,
      pinned: false,
      order: projects.length + 1,
    });
    setShowModal(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      tagline: p.tagline,
      description: p.description,
      type: p.type,
      techStackInput: p.techStack.join(", "),
      highlightsInput: p.highlights.join("\n"),
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
      imageUrl: p.imageUrl || "",
      featured: p.featured,
      pinned: Boolean(p.pinned),
      order: p.order,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("Project title is required.");
      return;
    }

    try {
      const parsedTech = form.techStackInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const parsedHighlights = form.highlightsInput
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        id: editingId,
        title: form.title,
        tagline: form.tagline,
        description: form.description,
        type: form.type,
        techStack: parsedTech,
        highlights: parsedHighlights,
        liveUrl: form.liveUrl || null,
        githubUrl: form.githubUrl || null,
        imageUrl: form.imageUrl || null,
        featured: form.featured,
        pinned: form.pinned,
        order: form.order,
      };

      const res = await fetch("/api/projects", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Project updated successfully!" : "New project added to showcase!");
        setShowModal(false);
        fetchProjects();
      } else {
        toast.error("Failed to save project.");
      }
    } catch {
      toast.error("Network error while saving.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project removed.");
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error("Failed to delete project.");
      }
    } catch {
      toast.error("Network error while deleting.");
    }
  };

  // Toggle Pin Status directly from card
  const togglePin = async (project: ProjectItem) => {
    const newPinned = !project.pinned;
    const updatedList = projects.map((p) =>
      p.id === project.id ? { ...p, pinned: newPinned } : p
    );

    // Re-sort so pinned items go to top immediately
    updatedList.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return a.order - b.order;
    });

    setProjects(updatedList);

    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...project,
          pinned: newPinned,
        }),
      });

      if (res.ok) {
        toast.success(newPinned ? `📌 "${project.title}" pinned to top!` : `Unpinned "${project.title}"`);
        fetchProjects();
      } else {
        toast.error("Failed to update pin state.");
        fetchProjects();
      }
    } catch {
      toast.error("Network error.");
      fetchProjects();
    }
  };

  // Save new ordering array to server
  const saveNewOrder = async (newList: ProjectItem[]) => {
    const items = newList.map((item, index) => ({
      id: item.id,
      order: index,
      pinned: item.pinned,
    }));

    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (res.ok) {
        toast.success("Arrangement updated on live website!");
      } else {
        toast.error("Failed to save reorder.");
      }
    } catch {
      toast.error("Network error while reordering.");
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...projects];
    const draggedItem = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    setProjects(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    saveNewOrder(projects);
  };

  // Manual Move Up / Down
  const moveItem = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === projects.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...projects];
    const item = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = item;

    setProjects(updated);
    saveNewOrder(updated);
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-6xl">
      <Toaster position="bottom-right" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101217] via-[#14171E] to-[#0B0C0E] border border-[#F1BF00]/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F1BF00]/5 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/25 text-[#F1BF00] text-xs font-mono mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO CASE STUDIES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Projects &amp; Work Showcases
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
            Drag to arrange display order, pin key showcases to the top, upload screenshots, and control live case study cards.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="relative z-10 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#F1BF00] text-[#0B0C0E] font-bold text-xs uppercase tracking-wider hover:bg-[#F1BF00]/90 transition-all shadow-lg shadow-[#F1BF00]/20 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search & Arrangement Guide Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#101217] border border-white/10">
        <div className="flex items-center gap-2 px-3 py-1.5 w-full sm:w-80 rounded-xl bg-white/[0.03] border border-white/5">
          <Search className="w-4 h-4 text-[#F1BF00]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, tagline, or stack..."
            className="w-full bg-transparent text-xs text-white placeholder-white/40 outline-none"
          />
        </div>
        <div className="text-xs font-mono text-white/50 px-3 flex items-center gap-2">
          <GripVertical className="w-3.5 h-3.5 text-[#F1BF00]" />
          <span>Drag card handles to reorder &bull; Click <Pin className="w-3 h-3 inline text-[#F1BF00]" /> to pin to top</span>
        </div>
      </div>

      {/* List of Projects (Draggable Cards) */}
      {loading ? (
        <div className="p-12 text-center text-white/40 font-mono text-xs">
          Loading portfolio showcases...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#101217] border border-white/5 text-white/40 font-mono text-xs">
          No projects match your search query.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((p, index) => (
            <div
              key={p.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`p-5 rounded-3xl bg-[#101217] border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl ${
                p.pinned
                  ? "border-[#F1BF00]/40 shadow-[#F1BF00]/5 bg-gradient-to-r from-[#141720] to-[#101217]"
                  : "border-white/10 hover:border-white/20"
              } ${draggedIndex === index ? "opacity-50 scale-[0.99] border-dashed border-[#F1BF00]" : ""}`}
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Drag Grip Handle */}
                <div
                  className="cursor-grab active:cursor-grabbing p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/40 hover:text-[#F1BF00] transition-colors shrink-0"
                  title="Drag to rearrange position"
                >
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Move Up / Down Buttons */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => moveItem(index, "down")}
                    disabled={index === projects.length - 1}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>

                {/* Thumbnail Preview */}
                <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-[#0B0C0E] border border-white/10 shrink-0">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      sizes="100px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Title & Metadata */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-white text-base truncate">
                      {p.title}
                    </h3>
                    {p.pinned && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-[#AA151B]/80 border border-[#F1BF00]/40 px-2 py-0.5 rounded-full">
                        <Pin className="w-2.5 h-2.5 fill-amber-300 rotate-45" />
                        <span>Pinned to Top</span>
                      </span>
                    )}
                    {p.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#F1BF00] bg-[#F1BF00]/10 border border-[#F1BF00]/25 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Featured</span>
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-white/30">
                      Order: #{index + 1}
                    </span>
                  </div>

                  <p className="text-xs text-white/60 line-clamp-1 max-w-xl">
                    {p.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {p.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.techStack.length > 4 && (
                      <span className="text-[10px] font-mono text-white/30">
                        +{p.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-3 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto justify-end">
                {/* Pin / Unpin Button */}
                <button
                  onClick={() => togglePin(p)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                    p.pinned
                      ? "bg-[#F1BF00] text-[#0B0C0E] font-bold shadow-md shadow-[#F1BF00]/20"
                      : "bg-white/5 hover:bg-[#F1BF00]/20 text-white/60 hover:text-[#F1BF00]"
                  }`}
                  title={p.pinned ? "Click to unpin" : "Click to pin to top of portfolio"}
                >
                  <Pin className={`w-3.5 h-3.5 ${p.pinned ? "fill-[#0B0C0E] rotate-45" : ""}`} />
                  <span>{p.pinned ? "Pinned" : "Pin"}</span>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => openEditModal(p)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-[#F1BF00]/20 text-white/70 hover:text-[#F1BF00] transition-colors"
                  title="Edit Project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  className="p-2.5 rounded-xl bg-[#AA151B]/15 hover:bg-[#AA151B]/30 text-rose-400 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-[#101217] border border-[#F1BF00]/30 p-6 sm:p-8 shadow-2xl relative text-left my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#F1BF00]" />
              <span className="text-xs font-mono text-[#F1BF00] uppercase tracking-wider">
                {editingId ? "Update Showcase" : "New Project Showcase"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-6">
              {editingId ? "Edit Project Details" : "Add Project to Portfolio"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Vantix Digital Platform"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Tagline / Catchphrase *
                </label>
                <input
                  type="text"
                  required
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="e.g. Next.js 16 SaaS Platform with sub-second performance"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Comprehensive Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Detailed architecture overview and business impact..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Project Type
                  </label>
                  <input
                    type="text"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    placeholder="e.g. Web Application / SaaS"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Tech Stack (Comma Separated)
                </label>
                <input
                  type="text"
                  value={form.techStackInput}
                  onChange={(e) => setForm({ ...form, techStackInput: e.target.value })}
                  placeholder="Next.js 16, React 19, TypeScript, Tailwind CSS, Prisma"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Key Architectural Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={form.highlightsInput}
                  onChange={(e) => setForm({ ...form, highlightsInput: e.target.value })}
                  placeholder="Sub-second Core Web Vitals&#10;100% WCAG 2.1 AA compliant&#10;Strict TypeScript type-safety"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors resize-none font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 font-mono"
                  />
                </div>
              </div>

              {/* Direct Screenshot FileUploader */}
              <div>
                <FileUploader
                  label="Project Screenshot / Thumbnail (16:9)"
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                  accept="image/png,image/jpeg,image/webp"
                  helperText="Recommended: 1280x720 16:9 ratio crisp screenshot"
                />
              </div>

              {/* Toggles: Featured & Pinned */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
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
                      <span>Pin to Top</span>
                    </span>
                    <span className="text-[10px] text-white/40 block">Always display first with pinned badge</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#F1BF00] accent-[#F1BF00]"
                  />
                  <div>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F1BF00]" />
                      <span>Featured Showcase</span>
                    </span>
                    <span className="text-[10px] text-white/40 block">Add golden Featured badge</span>
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
                  Save Showcase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
