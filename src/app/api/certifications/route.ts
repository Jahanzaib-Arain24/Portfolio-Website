import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ certifications });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 });
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
    const { title, issuer, details, verifyUrl, order } = body;

    const newCert = await prisma.certification.create({
      data: {
        title,
        issuer,
        details: details || "",
        verifyUrl: verifyUrl || "",
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, certification: newCert }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create certification" }, { status: 500 });
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
    const { id, title, issuer, details, verifyUrl, order } = body;

    const updatedCert = await prisma.certification.update({
      where: { id },
      data: {
        title,
        issuer,
        details,
        verifyUrl,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, certification: updatedCert });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update certification" }, { status: 500 });
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

    await prisma.certification.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 });
  }
}

