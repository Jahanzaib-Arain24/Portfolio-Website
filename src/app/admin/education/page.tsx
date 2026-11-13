"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, GraduationCap, X, MapPin, Calendar, Search } from "lucide-react";
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
  const [search, setSearch] = useState("");

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
      location: "Jamshoro, Pakistan",
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
      location: item.location || "",
      duration: item.duration || "",
      order: item.order || 0,
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
        toast.success(editingId ? "Education record updated!" : "New academic record saved!");
        setShowModal(false);
        fetchEducation();
      } else {
        toast.error("Failed to save education entry.");
      }
    } catch {
      toast.error("Network error while saving.");
    }
  };

  const handleDelete = async (id: string, degree: string) => {
    if (!confirm(`Are you sure you want to remove "${degree}"?`)) return;

    try {
      const res = await fetch(`/api/education?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Education record removed!");
        fetchEducation();
      } else {
        toast.error("Failed to delete education entry.");
      }
    } catch {
      toast.error("Network error while deleting.");
    }
  };

  const filteredEducation = education.filter((e) =>
    e.degree.toLowerCase().includes(search.toLowerCase()) ||
    e.institution.toLowerCase().includes(search.toLowerCase()) ||
    e.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl">
      <Toaster position="bottom-right" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101217] via-[#14171E] to-[#0B0C0E] border border-[#F1BF00]/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F1BF00]/5 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/25 text-[#F1BF00] text-xs font-mono mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION REGISTRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Formal Education
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
            Configure degrees, software engineering credentials, intermediate records, and high school academic milestones.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="relative z-10 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#F1BF00] text-[#0B0C0E] font-bold text-xs uppercase tracking-wider hover:bg-[#F1BF00]/90 transition-all shadow-lg shadow-[#F1BF00]/20 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Education</span>
        </button>
      </div>

      {/* Search & Counter Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#101217] border border-white/10">
        <div className="flex items-center gap-2 px-3 py-1.5 w-full sm:w-80 rounded-xl bg-white/[0.03] border border-white/5">
          <Search className="w-4 h-4 text-[#F1BF00]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by degree or institution..."
            className="w-full bg-transparent text-xs text-white placeholder-white/40 outline-none"
          />
        </div>
        <div className="text-xs font-mono text-white/50 px-3">
          Showing <span className="text-[#F1BF00] font-bold">{filteredEducation.length}</span> of {education.length} records
        </div>
      </div>

      {/* List of Education Records */}
      {loading ? (
        <div className="p-12 text-center text-white/40 font-mono text-xs">
          Loading academic records...
        </div>
      ) : filteredEducation.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#101217] border border-white/5 text-white/40">
          No academic records match your query.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEducation.map((item) => (
            <div
              key={item.id}
              className="group relative p-6 rounded-3xl bg-[#101217] border border-white/10 hover:border-[#F1BF00]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg hover:shadow-[#F1BF00]/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F1BF00]/10 border border-[#F1BF00]/20 flex items-center justify-center text-[#F1BF00] shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white text-base group-hover:text-[#F1BF00] transition-colors">
                      {item.degree}
                    </h3>
                    <span className="text-[10px] font-mono text-white/30 px-2 py-0.5 rounded-md bg-white/5">
                      #{item.order}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#F1BF00]">
                    {item.institution}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 font-mono mt-2">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-white/40" />
                      {item.duration}
                    </span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-white/40" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-[#F1BF00]/20 text-white/70 hover:text-[#F1BF00] transition-colors"
                  title="Edit Record"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.degree)}
                  className="p-2.5 rounded-xl bg-[#AA151B]/15 hover:bg-[#AA151B]/30 text-rose-400 transition-colors"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#101217] border border-[#F1BF00]/30 p-6 sm:p-8 shadow-2xl relative text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#F1BF00]" />
              <span className="text-xs font-mono text-[#F1BF00] uppercase tracking-wider">
                {editingId ? "Update Academic Record" : "New Academic Record"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-6">
              {editingId ? "Edit Education Entry" : "Add Education Entry"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Degree / Qualification *
                </label>
                <input
                  type="text"
                  required
                  value={form.degree}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  placeholder="e.g. Bachelor of Science in Software Engineering (BSSE)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Institution Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  placeholder="e.g. University of Sindh / Shaheen Public High School"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Duration / Years *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="e.g. Jan 2021 – Dec 2024"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Jamshoro, Pakistan"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Display Order
                </label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F1BF00] text-[#0B0C0E] font-bold text-xs uppercase tracking-wider hover:bg-[#F1BF00]/90 transition-all shadow-lg shadow-[#F1BF00]/20"
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
