"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Award, X, ExternalLink } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface CertItem {
  id: string;
  title: string;
  issuer: string;
  details: string;
  verifyUrl: string;
  order: number;
}

export default function CertificationsAdminPage() {
  const [certifications, setCertifications] = useState<CertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    issuer: "",
    details: "",
    verifyUrl: "",
    order: 0,
  });

  const fetchCerts = async () => {
    try {
      const res = await fetch("/api/certifications");
      const data = await res.json();
      if (data.certifications) setCertifications(data.certifications);
    } catch {
      toast.error("Failed to load certifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      title: "",
      issuer: "Meta",
      details: "",
      verifyUrl: "",
      order: certifications.length + 1,
    });
    setShowModal(true);
  };

  const openEditModal = (cert: CertItem) => {
    setEditingId(cert.id);
    setForm({
      title: cert.title,
      issuer: cert.issuer,
      details: cert.details,
      verifyUrl: cert.verifyUrl,
      order: cert.order,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/certifications", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId }),
      });

      if (res.ok) {
        toast.success(editingId ? "Certificate updated!" : "Certificate added!");
        setShowModal(false);
        fetchCerts();
      } else {
        toast.error("Failed to save.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this certificate?")) return;

    try {
      const res = await fetch(`/api/certifications?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Certificate deleted!");
        fetchCerts();
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
            Licenses & Certifications Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Add, update, or remove Meta certifications and credential verification links.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-[#0e101a] border border-white/10 shadow-lg flex items-start justify-between gap-4 group hover:border-indigo-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white text-sm group-hover:text-indigo-300">
                  {cert.title}
                </span>
              </div>
              <p className="text-xs text-cyan-400 font-semibold mb-1">
                {cert.issuer}
              </p>
              <p className="text-xs text-slate-400 mb-3">{cert.details}</p>

              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-indigo-400 hover:text-indigo-300"
                >
                  <span>Verification Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => openEditModal(cert)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                title="Edit"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
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
              {editingId ? "Edit Certification" : "Add Certification"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Meta Front-End Developer Professional"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Issuer *</label>
                <input
                  type="text"
                  required
                  value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  placeholder="e.g. Meta (Coursera)"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Description / Details</label>
                <textarea
                  rows={2}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  placeholder="Specialization scope, topics mastered..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1 uppercase">Verification URL</label>
                <input
                  type="url"
                  value={form.verifyUrl}
                  onChange={(e) => setForm({ ...form, verifyUrl: e.target.value })}
                  placeholder="https://coursera.org/verify/..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs outline-none"
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
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

