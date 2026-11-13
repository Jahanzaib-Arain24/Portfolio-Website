"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, GraduationCap, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  order: number;
}

export default function EducationAdminPage() {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    degree: "",
    institution: "",
    location: "",
    duration: "",
    order: 0,
  });

  const fetchEducation = async () => {
    try {
      const res = await fetch("/api/education");
      const data = await res.json();
      if (data.education) setEducation(data.education);
    } catch {
      toast.error("Failed to load education.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      degree: "",
      institution: "",
      location: "Pakistan",
      duration: "",
      order: education.length + 1,
    });
    setShowModal(true);
  };

  const openEditModal = (item: EducationItem) => {
    setEditingId(item.id);
    setForm({
      degree: item.degree,
      institution: item.institution,
      location: item.location,
      duration: item.duration,
      order: item.order,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/education", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId }),
      });

      if (res.ok) {
        toast.success(editingId ? "Education updated!" : "Education added!");
        setShowModal(false);
        fetchEducation();
      } else {
        toast.error("Failed to save.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;

    try {
      const res = await fetch(`/api/education?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Education entry removed!");
        fetchEducation();
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
            Academic Background Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Add, edit, or remove degrees, intermediate records, and school certifications.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#0e101a] border border-white/10 shadow-lg flex items-center justify-between gap-4 group hover:border-indigo-500/40 transition-colors"
          >
            <div>
              <h3 className="font-bold text-white text-base group-hover:text-indigo-300">
                {item.degree}
              </h3>
              <p className="text-cyan-400 font-semibold text-sm">
                {item.institution}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {item.duration} • {item.location}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => openEditModal(item)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                title="Delete"
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
          <div className="w-full max-w-lg rounded-3xl bg-[#0e101a] border border-white/15 p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-bold text-white mb-4">
              {editingId ? "Edit Education Entry" : "Add Education Entry"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Degree / Qualification *</label>
                <input
                  type="text"
                  required
                  value={form.degree}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Science in Software Engineering"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Institution Name *</label>
                <input
                  type="text"
                  required
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  placeholder="e.g. University of Sindh"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Duration *</label>
                  <input
                    type="text"
                    required
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="e.g. Jan 2021 – Dec 2024"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Jamshoro, Pakistan"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                  />
                </div>
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
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

