import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ education });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
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
    const { degree, institution, location, duration, order } = body;

    const newEdu = await prisma.education.create({
      data: {
        degree,
        institution,
        location: location || "",
        duration: duration || "",
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, education: newEdu }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 });
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
    const { id, degree, institution, location, duration, order } = body;

    const updatedEdu = await prisma.education.update({
      where: { id },
      data: {
        degree,
        institution,
        location,
        duration,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, education: updatedEdu });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 });
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

    await prisma.education.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 });
  }
}

