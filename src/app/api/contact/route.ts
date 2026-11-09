import { NextResponse } from "next/server";
import { Resend } from "resend";
import { LIMITS, TOPICS, type TopicKey } from "@/lib/contact";
import { SUPPORT_EMAIL } from "@/lib/site";

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function field(body: Record<string, unknown>, key: string, max: number) {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Spam trap: real visitors never see or fill the "website" field.
  if (field(body, "website", 200)) {
    return NextResponse.json({ success: true });
  }

  const name = field(body, "name", LIMITS.name);
  const email = field(body, "email", LIMITS.email);
  const message = field(body, "message", LIMITS.message);
  const topicKey = field(body, "topic", 40);
  const topic = Object.hasOwn(TOPICS, topicKey) ? TOPICS[topicKey as TopicKey] : undefined;

  if (!name || !email || !message || !topic) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return NextResponse.json({ error: "The form is unavailable right now." }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // plantalk.ai is a verified sending domain in Resend (DKIM on resend._domainkey,
      // SPF and bounces on send.plantalk.ai), so mail can go to any inbox. If it ever
      // loses verification, Resend rejects this sender and the form returns 502.
      from: "Plantalk AI website <website@plantalk.ai>",
      to: process.env.CONTACT_EMAIL || SUPPORT_EMAIL,
      replyTo: email,
      subject: `[Plantalk AI] ${topic}: ${name}`.replace(/[\r\n]+/g, " ").slice(0, 160),
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #141f17;">
          <h2 style="margin: 0 0 16px;">New message from plantalk.ai</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}<br />
             <strong>Email:</strong> ${escapeHtml(email)}<br />
             <strong>Topic:</strong> ${escapeHtml(topic)}</p>
          <p style="white-space: pre-wrap; background: #f1efe3; padding: 16px; border-radius: 12px;">${escapeHtml(message)}</p>
        </div>
      `,
    });
    if (error) {
      console.error("Contact form: Resend error", error);
      return NextResponse.json({ error: "We couldn't send your message." }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form: unexpected error", err);
    return NextResponse.json({ error: "We couldn't send your message." }, { status: 500 });
  }
}
