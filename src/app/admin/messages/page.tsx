import { prisma } from "@/lib/prisma";
import { Mail, Calendar, MessageSquare, Trash2 } from "lucide-react";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Recruiter & Client Dispatches
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          All contact submissions transmitted through your live portfolio contact terminal.
        </p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0e101a] border border-white/10 text-slate-500 font-mono text-xs">
            No inquiries received yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="p-6 rounded-2xl bg-[#0e101a] border border-white/10 shadow-lg space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base">{msg.name}</h3>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{msg.email}</span>
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  Subject: {msg.subject || "General Inquiry"}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  {msg.message}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Portfolio Inquiry")}`}
                  className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-colors"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

