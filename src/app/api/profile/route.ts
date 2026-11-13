import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: "default-profile" },
      include: { socialLinks: { orderBy: { order: "asc" } } },
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
      avatarUrl,
      heroCounters,
      typingRoles,
      aboutHeading,
      aboutSubtitle,
      storyTitle,
      storySubtitle,
      pillars,
      socialLinks,
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
        avatarUrl: avatarUrl || "/assets/about-me.png",
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
        avatarUrl: avatarUrl || "/assets/about-me.png",
        heroCounters: typeof heroCounters === "string" ? heroCounters : JSON.stringify(heroCounters || []),
        typingRoles,
        aboutHeading,
        aboutSubtitle,
        storyTitle,
        storySubtitle,
        pillars: typeof pillars === "string" ? pillars : JSON.stringify(pillars || []),
      },
    });

    // Update social links if provided
    if (Array.isArray(socialLinks)) {
      for (const link of socialLinks) {
        if (link.platform && link.url) {
          const existing = await prisma.socialLink.findFirst({
            where: {
              profileId: "default-profile",
              platform: link.platform,
            },
          });

          if (existing) {
            await prisma.socialLink.update({
              where: { id: existing.id },
              data: { url: link.url },
            });
          } else {
            await prisma.socialLink.create({
              data: {
                profileId: "default-profile",
                platform: link.platform,
                url: link.url,
                icon: link.icon || link.platform,
                order: link.order || 0,
              },
            });
          }
        }
      }
    }

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
