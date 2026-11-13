import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: { 
        skills: { 
          orderBy: [{ pinned: "desc" }, { order: "asc" }] 
        } 
      },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
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
    const { name, proficiency, categoryId, order, pinned } = body;

    const newSkill = await prisma.skill.create({
      data: {
        name,
        proficiency: Number(proficiency) || 90,
        categoryId,
        pinned: Boolean(pinned),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, skill: newSkill }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
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
    const { id, name, proficiency, categoryId, order, pinned } = body;

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(typeof proficiency !== "undefined" ? { proficiency: Number(proficiency) } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(typeof pinned !== "undefined" ? { pinned: Boolean(pinned) } : {}),
        ...(typeof order !== "undefined" ? { order: Number(order) } : {}),
      },
    });

    return NextResponse.json({ success: true, skill: updatedSkill });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

// Batch Reorder & Pin Status endpoint for Skills
export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session || session.value !== "authenticated_jahanzaib_session_2026") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items } = body; // Array of { id: string, order: number, pinned?: boolean }

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Items array required" }, { status: 400 });
    }

    await prisma.$transaction(
      items.map((item) =>
        prisma.skill.update({
          where: { id: item.id },
          data: {
            order: item.order,
            ...(typeof item.pinned === "boolean" ? { pinned: item.pinned } : {}),
          },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reorder skills error:", error);
    return NextResponse.json({ error: "Failed to reorder skills" }, { status: 500 });
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

    if (!id) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
    }

    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
