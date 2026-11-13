import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({
      experiences: experiences.map((e) => ({
        ...e,
        achievements: JSON.parse(e.achievements || "[]"),
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session || session.value !== "authenticated_jahanzaib_session_2026") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { role, company, timeline, location, focus, achievements, order } = body;

    const newExp = await prisma.experience.create({
      data: {
        role,
        company,
        timeline,
        location: location || "Remote",
        focus: focus || "",
        achievements: typeof achievements === "string" ? achievements : JSON.stringify(achievements || []),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, experience: newExp }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session || session.value !== "authenticated_jahanzaib_session_2026") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, role, company, timeline, location, focus, achievements, order } = body;

    const updatedExp = await prisma.experience.update({
      where: { id },
      data: {
        role,
        company,
        timeline,
        location,
        focus,
        achievements: typeof achievements === "string" ? achievements : JSON.stringify(achievements || []),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, experience: updatedExp });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session || session.value !== "authenticated_jahanzaib_session_2026") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}

