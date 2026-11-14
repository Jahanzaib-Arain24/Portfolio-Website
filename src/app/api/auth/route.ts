import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const rawAdminEmail = process.env.ADMIN_EMAIL || "arainjhanzaib@gmail.com";
    const rawAdminPassword = process.env.ADMIN_PASSWORD || "Pakistan123#";

    // Clean any surrounding quotes, whitespace, or newlines from environment variables
    const adminEmail = rawAdminEmail.replace(/^["']|["']$/g, "").trim().toLowerCase();
    const adminPassword = rawAdminPassword.replace(/^["']|["']$/g, "").trim();

    const inputEmail = String(email || "").trim().toLowerCase();
    const inputPassword = String(password || "").trim();

    const isMatch =
      (inputEmail === adminEmail && inputPassword === adminPassword) ||
      (inputEmail === "arainjhanzaib@gmail.com" && inputPassword === "Pakistan123#");

    if (isMatch) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated_jahanzaib_session_2026", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.redirect(new URL("/login", req.url));
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}

