import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated_jahanzaib_session_2026") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#CAD5E2] flex flex-col md:flex-row font-sans selection:bg-[#F1BF00] selection:text-[#0B0C0E]">
      {/* Responsive Admin Sidebar & Mobile App Bar */}
      <AdminSidebar />

      {/* Main Admin Viewport */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto max-h-screen bg-[#0B0C0E] w-full">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
