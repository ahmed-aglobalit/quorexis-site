import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

const needLabels: Record<string, string> = {
  functional: "Functional / Manual Testing",
  automation: "Test Automation",
  api: "API Testing",
  performance: "Performance Testing",
  governance: "QA Governance & KPIs",
  training: "Training ISTQB",
};

const urgencyLabels: Record<string, string> = {
  asap: "ASAP",
  "1month": "< 1 month",
  "1-3months": "1–3 months",
  planning: "Planning",
};

const volumeLabels: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.website) {
      // Bot filled the honeypot field — silently accept
      return NextResponse.json({ success: true });
    }

    const {
      name,
      email,
      company,
      role,
      productType,
      sector,
      mainNeed,
      urgency,
      volume,
      goals,
      message,
      wantsCall,
      timeSlot,
      timezone,
      locale,
      referrer,
    } = body;

    // Validation
    if (!name || !email || !company || !mainNeed) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const needLabel = needLabels[mainNeed] || mainNeed;
    const urgencyLabel = urgencyLabels[urgency] || urgency || "—";
    const volumeLabel = volumeLabels[volume] || volume || "—";
    const goalsText =
      Array.isArray(goals) && goals.length > 0 ? goals.join(", ") : "—";

    const subjectLine = `[Lead Assistant] ${company} – ${needLabel} – ${urgencyLabel}`;

    const callInfo = wantsCall
      ? `\nCall requested: Yes\nPreferred slot: ${timeSlot || "—"}\nTimezone: ${timezone || "—"}`
      : "\nCall requested: No";

    const textBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Role: ${role || "—"}`,
      "",
      `Product type: ${productType || "—"}`,
      `Sector: ${sector || "—"}`,
      "",
      `Primary need: ${needLabel}`,
      `Urgency: ${urgencyLabel}`,
      `Volume: ${volumeLabel}`,
      "",
      `Goals: ${goalsText}`,
      "",
      `Message: ${message || "—"}`,
      callInfo,
      "",
      `Locale: ${locale || "—"}`,
      `Page: ${referrer || "—"}`,
    ].join("\n");

    const htmlBody = `
      <div style="font-family: system-ui, sans-serif; max-width: 600px;">
        <h2 style="color: #2c3e50;">New Lead — Quorexis Assistant</h2>

        <h3 style="color: #6b6b6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Profile</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr><td style="padding: 6px 0; color: #6b6b6b; width: 140px;">Name</td><td style="padding: 6px 0;">${name}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Company</td><td style="padding: 6px 0;">${company}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Role</td><td style="padding: 6px 0;">${role || "—"}</td></tr>
        </table>

        <h3 style="color: #6b6b6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Context</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr><td style="padding: 6px 0; color: #6b6b6b; width: 140px;">Product type</td><td style="padding: 6px 0;">${productType || "—"}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Sector</td><td style="padding: 6px 0;">${sector || "—"}</td></tr>
        </table>

        <h3 style="color: #6b6b6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Need</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr><td style="padding: 6px 0; color: #6b6b6b; width: 140px;">Primary need</td><td style="padding: 6px 0; font-weight: 600;">${needLabel}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Urgency</td><td style="padding: 6px 0;">${urgencyLabel}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b6b6b;">Volume</td><td style="padding: 6px 0;">${volumeLabel}</td></tr>
        </table>

        <h3 style="color: #6b6b6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Goals</h3>
        <p style="line-height: 1.6;">${goalsText}</p>

        ${message ? `
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
        <h3 style="color: #6b6b6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        ` : ""}

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
        <h3 style="color: #6b6b6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Call</h3>
        <p>${wantsCall ? `✅ Requested — ${timeSlot || "—"} (${timezone || "—"})` : "Not requested"}</p>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
        <p style="font-size: 12px; color: #999;">Locale: ${locale || "—"} · Page: ${referrer || "—"}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Quorexis Assistant" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead form error:", error);
    return NextResponse.json(
      { error: "Failed to send lead" },
      { status: 500 }
    );
  }
}
