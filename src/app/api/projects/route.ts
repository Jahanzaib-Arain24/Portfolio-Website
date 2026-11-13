import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rawProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    const projects = rawProjects.map((p) => ({
      ...p,
      techStack: JSON.parse(p.techStack || "[]"),
      highlights: JSON.parse(p.highlights || "[]"),
    }));
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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
    const {
      title,
      tagline,
      description,
      techStack,
      type,
      highlights,
      liveUrl,
      githubUrl,
      imageUrl,
      featured,
      order,
    } = body;

    const newProject = await prisma.project.create({
      data: {
        title,
        tagline: tagline || "",
        description: description || "",
        techStack: typeof techStack === "string" ? techStack : JSON.stringify(techStack || []),
        type: type || "Web Application",
        highlights: typeof highlights === "string" ? highlights : JSON.stringify(highlights || []),
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        imageUrl: imageUrl || null,
        featured: Boolean(featured),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
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
    const {
      id,
      title,
      tagline,
      description,
      techStack,
      type,
      highlights,
      liveUrl,
      githubUrl,
      imageUrl,
      featured,
      order,
    } = body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        tagline,
        description,
        techStack: typeof techStack === "string" ? techStack : JSON.stringify(techStack || []),
        type,
        highlights: typeof highlights === "string" ? highlights : JSON.stringify(highlights || []),
        liveUrl,
        githubUrl,
        imageUrl,
        featured: Boolean(featured),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

