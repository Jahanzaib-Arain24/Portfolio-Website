"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, ExternalLink, Sparkles, Check, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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
  featured: boolean;
  order: number;
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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
      techStackInput: "",
      highlightsInput: "",
      liveUrl: "",
      githubUrl: "",
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
      featured: p.featured,
      order: p.order,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      id: editingId,
      techStack: form.techStackInput.split(",").map((s) => s.trim()).filter(Boolean),
      highlights: form.highlightsInput.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/projects", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Project updated!" : "Project created!");
        setShowModal(false);
        fetchProjects();
      } else {
        toast.error("Operation failed.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted!");
        fetchProjects();
      } else {
        toast.error("Failed to delete project.");
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
            Production Projects Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Add new enterprise case studies, configure highlights, tags, and demo links.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl bg-[#0e101a] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-white/5 border-b border-white/10 font-mono text-slate-400 uppercase">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Title & Type</th>
                <th className="py-3 px-4">Tech Stack</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400">{p.order}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-white text-sm">{p.title}</p>
                    <p className="text-[11px] text-slate-400">{p.type}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.techStack.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-slate-300">
                          {t}
                        </span>
                      ))}
                      {p.techStack.length > 3 && (
                        <span className="text-[10px] text-slate-500">+{p.techStack.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {p.featured ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                        Featured
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e101a] border border-white/15 p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? "Edit Project Details" : "Add New Project"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Type</label>
                  <input
                    type="text"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    placeholder="Agency Platform, Full-Stack Portal..."
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="One sentence description"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Full Overview</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={form.techStackInput}
                  onChange={(e) => setForm({ ...form, techStackInput: e.target.value })}
                  placeholder="Next.js 16, TypeScript, Tailwind CSS, Netlify"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">
                  Architecture Highlights (one per line)
                </label>
                <textarea
                  rows={3}
                  value={form.highlightsInput}
                  onChange={(e) => setForm({ ...form, highlightsInput: e.target.value })}
                  placeholder="Engineered sub-second FCP...&#10;Integrated dynamic lead funnels..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Live Demo URL</label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded bg-white/5 border-white/20 text-indigo-500"
                  />
                  <span>Mark as Featured Project</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Order:</span>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-16 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

