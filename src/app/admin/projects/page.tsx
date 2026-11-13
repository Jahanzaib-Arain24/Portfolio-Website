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
  order: number;
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

    const payload = {
      ...form,
      id: editingId,
      techStack: form.techStackInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      highlights: form.highlightsInput
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Project updated successfully!" : "New project published!");
        setShowModal(false);
        fetchProjects();
      } else {
        toast.error("Failed to save project.");
      }
    } catch {
      toast.error("An unexpected network error occurred.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success(`Deleted "${title}"`);
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error("Failed to delete project.");
      }
    } catch {
      toast.error("Network error during delete.");
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/30 text-[#F1BF00] text-[11px] font-mono mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-heading">
            Projects &amp; Work Showcases
          </h1>
          <p className="text-xs text-[#999999] mt-1">
            Manage your live portfolio case studies. Upload screenshots, update live links, and customize tech stacks.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-royal-gold text-xs shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#999999] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title, type, or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#12141A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#999999] focus:outline-none focus:border-[#F1BF00]/50"
          />
        </div>

        <span className="text-xs font-mono text-[#999999] hidden sm:inline">
          {filteredProjects.length} of {projects.length} Total Projects
        </span>
      </div>

      {/* Projects List Grid */}
      {loading ? (
        <div className="p-12 text-center text-[#999999] font-mono text-xs">
          Loading case studies from SQLite database...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#12141A] border border-white/5 text-[#999999]">
          <FolderGit2 className="w-10 h-10 text-[#F1BF00]/40 mx-auto mb-3" />
          <p className="text-sm font-semibold text-white">No projects found</p>
          <p className="text-xs mt-1">Click "Add New Project" above to publish your first showcase.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="group relative rounded-2xl bg-[#12141A] border border-white/10 hover:border-[#F1BF00]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Project Preview Thumbnail */}
              <div className="relative w-full aspect-video bg-[#0B0C0E] border-b border-white/10 overflow-hidden">
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#999999] text-xs font-mono">
                    <ImageIcon className="w-8 h-8 text-white/20 mb-2" />
                    <span>No Preview Screenshot</span>
                  </div>
                )}

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#0B0C0E]/90 backdrop-blur-md border border-white/10 text-white">
                    {p.type}
                  </span>
                  {p.featured && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F1BF00] text-[#0B0C0E] flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-serif-heading mb-1.5 truncate">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#999999] line-clamp-2 leading-relaxed mb-4">
                    {p.tagline || p.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0C0E] border border-white/5 text-[#CAD5E2]"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.techStack.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#999999]">
                        +{p.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#F1BF00] text-[#999999] hover:text-[#0B0C0E] border border-white/5 transition-colors"
                        title="Open Live Site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#F1BF00] text-[#999999] hover:text-[#0B0C0E] border border-white/5 transition-colors"
                        title="Open GitHub"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(p)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#F1BF00]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-1.5 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#12141A] border border-[#F1BF00]/30 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#999999] hover:text-white border border-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#F1BF00] text-xs font-mono uppercase tracking-wider">
              <FolderGit2 className="w-4 h-4" />
              <span>{editingId ? "Update Case Study" : "New Showcase"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-heading mb-6">
              {editingId ? `Edit "${form.title}"` : "Publish New Project"}
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Image Uploader */}
              <FileUploader
                label="Project Thumbnail Screenshot"
                value={form.imageUrl}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                accept="image/png, image/jpeg, image/webp"
                helperText="Upload 16:9 screenshot. Saved directly to public/assets/"
              />

              {/* Title & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Vantix Digital"
                    className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#999999] focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                    Project Category / Type
                  </label>
                  <input
                    type="text"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    placeholder="e.g. Next.js 16 Web App"
                    className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#999999] focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                  Catchy Tagline
                </label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="One-line elevator pitch for this system..."
                  className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#999999] focus:outline-none focus:border-[#F1BF00]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                  Full System Overview (Shown in Case Study Modal)
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Comprehensive technical breakdown of the architecture, business goal, and problem solved..."
                  className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#999999] focus:outline-none focus:border-[#F1BF00] leading-relaxed"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                  Technologies Deployed (Comma Separated)
                </label>
                <input
                  type="text"
                  value={form.techStackInput}
                  onChange={(e) => setForm({ ...form, techStackInput: e.target.value })}
                  placeholder="Next.js 16, React 19, TypeScript, Tailwind CSS, Netlify"
                  className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#999999] focus:outline-none focus:border-[#F1BF00] font-mono"
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                  Engineering Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={form.highlightsInput}
                  onChange={(e) => setForm({ ...form, highlightsInput: e.target.value })}
                  placeholder="Engineered with App Router and sub-second FCP&#10;Integrated dynamic lead routing funnels&#10;Configured automated CI/CD"
                  className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#999999] focus:outline-none focus:border-[#F1BF00] leading-relaxed font-mono"
                />
              </div>

              {/* Live URL & GitHub URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#999999] focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#999999] mb-1.5">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/repo"
                    className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#999999] focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>
              </div>

              {/* Featured & Order */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-white/20 accent-[#F1BF00]"
                  />
                  <span className="text-xs font-medium text-white">
                    Pin as Featured Case Study (with Gold Badge)
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#999999]">Display Priority:</span>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-16 bg-[#0B0C0E] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white text-center font-mono focus:outline-none focus:border-[#F1BF00]"
                  />
                </div>
              </div>

              {/* Form Buttons */}
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
                  <span>{editingId ? "Save Changes" : "Create Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
