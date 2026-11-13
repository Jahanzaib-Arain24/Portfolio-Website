import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 1. Always save in Database first (never lose user's data or email)
    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || "No Subject",
        message,
      },
    });

    // 2. Dispatch real email notification to your inbox
    // Non-blocking so user never waits if SMTP has network latency
    sendContactNotification({
      name,
      email,
      subject: subject || "No Subject",
      message,
    }).catch((err) => {
      console.error("[Contact API] Background email dispatch error:", err);
    });

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
