"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Award, X, ExternalLink, ShieldCheck, Search } from "lucide-react";
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
  const [search, setSearch] = useState("");

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
      issuer: "Meta (Coursera)",
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
      details: cert.details || "",
      verifyUrl: cert.verifyUrl || "",
      order: cert.order || 0,
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
        toast.success(editingId ? "Certificate updated successfully!" : "New certificate issued!");
        setShowModal(false);
        fetchCerts();
      } else {
        toast.error("Failed to save certificate.");
      }
    } catch {
      toast.error("Network error while saving.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}"?`)) return;

    try {
      const res = await fetch(`/api/certifications?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Certificate deleted!");
        fetchCerts();
      } else {
        toast.error("Failed to delete certificate.");
      }
    } catch {
      toast.error("Network error while deleting.");
    }
  };

  const filteredCerts = certifications.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.issuer.toLowerCase().includes(search.toLowerCase()) ||
    c.details?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl">
      <Toaster position="bottom-right" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101217] via-[#14171E] to-[#0B0C0E] border border-[#F1BF00]/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F1BF00]/5 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/25 text-[#F1BF00] text-xs font-mono mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>CREDENTIAL VERIFICATION REGISTRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Licenses & Certifications
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
            Manage professional specializations, Meta certifications, issuing bodies, and external cryptographic credential URLs.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="relative z-10 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#F1BF00] text-[#0B0C0E] font-bold text-xs uppercase tracking-wider hover:bg-[#F1BF00]/90 transition-all shadow-lg shadow-[#F1BF00]/20 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Certificate</span>
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
            placeholder="Search by title or issuer..."
            className="w-full bg-transparent text-xs text-white placeholder-white/40 outline-none"
          />
        </div>
        <div className="text-xs font-mono text-white/50 px-3">
          Showing <span className="text-[#F1BF00] font-bold">{filteredCerts.length}</span> of {certifications.length} credentials
        </div>
      </div>

      {/* Grid of Certifications */}
      {loading ? (
        <div className="p-12 text-center text-white/40 font-mono text-xs">
          Loading credentials registry...
        </div>
      ) : filteredCerts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#101217] border border-white/5 text-white/40">
          No certifications match your query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="group relative p-6 rounded-3xl bg-[#101217] border border-white/10 hover:border-[#F1BF00]/40 transition-all flex flex-col justify-between gap-4 shadow-lg hover:shadow-[#F1BF00]/5"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/20 text-[#F1BF00] text-[11px] font-semibold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{cert.issuer}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/30 px-2 py-0.5 rounded-md bg-white/5">
                    #{cert.order}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base group-hover:text-[#F1BF00] transition-colors leading-snug">
                  {cert.title}
                </h3>

                {cert.details && (
                  <p className="text-xs text-white/60 mt-2 line-clamp-3 leading-relaxed">
                    {cert.details}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F1BF00] hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-white/30 italic">No verification link</span>
                )}

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEditModal(cert)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-[#F1BF00]/20 text-white/70 hover:text-[#F1BF00] transition-colors"
                    title="Edit Certificate"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id, cert.title)}
                    className="p-2 rounded-xl bg-[#AA151B]/15 hover:bg-[#AA151B]/30 text-rose-400 transition-colors"
                    title="Delete Certificate"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
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
                {editingId ? "Update Record" : "New Credential"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-6">
              {editingId ? "Edit Certification" : "Add Certification"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Meta Front-End Developer Professional Certificate"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                    Issuer Body *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.issuer}
                    onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                    placeholder="e.g. Meta (Coursera)"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
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
                  Curriculum Details / Scope
                </label>
                <textarea
                  rows={3}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  placeholder="9-Course Specialization covering React.js, Advanced React, JavaScript, Version Control..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5 uppercase">
                  External Verification URL
                </label>
                <input
                  type="url"
                  value={form.verifyUrl}
                  onChange={(e) => setForm({ ...form, verifyUrl: e.target.value })}
                  placeholder="https://coursera.org/verify/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-[#F1BF00]/60 transition-colors"
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
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
