"use client";

import { useState, useEffect } from "react";
import { Mail, Calendar, MessageSquare, Trash2, Copy, Check, Send, Search, RefreshCw } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.messages) setMessages(data.messages);
    } catch {
      toast.error("Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    toast.success("Sender email copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete message from ${name}?`)) return;

    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Message deleted successfully.");
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        toast.error("Failed to delete message.");
      }
    } catch {
      toast.error("Network error while deleting.");
    }
  };

  const filteredMessages = messages.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.toLowerCase().includes(search.toLowerCase()) ||
    m.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-5xl">
      <Toaster position="bottom-right" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101217] via-[#14171E] to-[#0B0C0E] border border-[#F1BF00]/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F1BF00]/5 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/25 text-[#F1BF00] text-xs font-mono mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>COMMUNICATION INBOX TERMINAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Recruiter & Client Dispatches
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
            Live database records of inquiries submitted via the portfolio contact terminal, with direct email replies and clipboard integration.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="relative z-10 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-mono transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#F1BF00]" : ""}`} />
          <span>Refresh Feed</span>
        </button>
      </div>

      {/* Search & Statistics Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#101217] border border-white/10">
        <div className="flex items-center gap-2 px-3 py-1.5 w-full sm:w-80 rounded-xl bg-white/[0.03] border border-white/5">
          <Search className="w-4 h-4 text-[#F1BF00]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sender, email, or keywords..."
            className="w-full bg-transparent text-xs text-white placeholder-white/40 outline-none"
          />
        </div>
        <div className="text-xs font-mono text-white/50 px-3">
          Showing <span className="text-[#F1BF00] font-bold">{filteredMessages.length}</span> of {messages.length} dispatches
        </div>
      </div>

      {/* Messages Feed */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-white/40 font-mono text-xs">
            Fetching dispatched inquiries...
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#101217] border border-white/5 text-white/40 font-mono text-xs">
            {messages.length === 0
              ? "No contact submissions logged yet. When someone fills the contact form, their dispatch will appear here instantly."
              : "No dispatches match your search filters."}
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className="p-6 rounded-3xl bg-[#101217] border border-white/10 hover:border-[#F1BF00]/30 shadow-xl space-y-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#F1BF00]/10 border border-[#F1BF00]/25 flex items-center justify-center text-[#F1BF00] font-bold text-xs uppercase">
                      {msg.name.slice(0, 1)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight">
                        {msg.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs text-[#F1BF00] hover:underline font-mono inline-flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>{msg.email}</span>
                        </a>
                        <button
                          onClick={() => handleCopyEmail(msg.email, msg.id)}
                          className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                          title="Copy Email"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-white/40 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-white/30" />
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#F1BF00] uppercase tracking-wider mb-2">
                  Subject: {msg.subject || "General Inquiry"}
                </div>
                <div className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap bg-white/[0.02] p-5 rounded-2xl border border-white/5 font-sans">
                  {msg.message}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleDelete(msg.id, msg.name)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#AA151B]/15 hover:bg-[#AA151B]/30 text-rose-400 text-xs font-mono transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Portfolio Inquiry")}&body=Hi ${encodeURIComponent(msg.name)},%0D%0A%0D%0AThank you for reaching out via my portfolio.%0D%0A%0D%0ABest regards,%0D%0AMuhammad Jahanzaib`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#F1BF00] text-[#0B0C0E] font-bold text-xs uppercase tracking-wider hover:bg-[#F1BF00]/90 transition-all shadow-md shadow-[#F1BF00]/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
