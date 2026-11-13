import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: "default-profile" },
      include: { socialLinks: true },
    });
    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
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
      name,
      title,
      subtitle,
      bio,
      email,
      phone,
      location,
      heroGreeting,
      heroBadge,
      primaryCTA,
      secondaryCTA,
      resumeUrl,
      heroCounters,
      typingRoles,
      aboutHeading,
      aboutSubtitle,
      storyTitle,
      storySubtitle,
      pillars,
    } = body;

    const updatedProfile = await prisma.profile.upsert({
      where: { id: "default-profile" },
      update: {
        name,
        title,
        subtitle,
        bio,
        email,
        phone,
        location,
        heroGreeting,
        heroBadge,
        primaryCTA,
        secondaryCTA,
        resumeUrl,
        heroCounters: typeof heroCounters === "string" ? heroCounters : JSON.stringify(heroCounters || []),
        typingRoles,
        aboutHeading,
        aboutSubtitle,
        storyTitle,
        storySubtitle,
        pillars: typeof pillars === "string" ? pillars : JSON.stringify(pillars || []),
      },
      create: {
        id: "default-profile",
        name,
        title,
        subtitle,
        bio,
        email,
        phone,
        location,
        heroGreeting,
        heroBadge,
        primaryCTA,
        secondaryCTA,
        resumeUrl,
        heroCounters: typeof heroCounters === "string" ? heroCounters : JSON.stringify(heroCounters || []),
        typingRoles,
        aboutHeading,
        aboutSubtitle,
        storyTitle,
        storySubtitle,
        pillars: typeof pillars === "string" ? pillars : JSON.stringify(pillars || []),
      },
    });

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
