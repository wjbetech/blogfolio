import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!toEmail || !apiKey) {
    console.error("[contact] Server misconfiguration: CONTACT_TO_EMAIL or RESEND_API_KEY missing");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: "BlogFolio Contact <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `New message from ${name} via BlogFolio`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
