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
  functional: "Functional Testing",
  automation: "Test Automation",
  api: "API Testing",
  performance: "Performance Testing",
  governance: "QA Governance & KPIs",
  unsure: "Not sure / to be scoped",
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
      return NextResponse.json({ success: true });
    }

    const { name, email, company, mainNeed, context, locale, referrer } = body;

    // Validation
    if (!name || !email || !company || !mainNeed) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
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
    const subjectLine = `[Lead Assistant] ${company} – ${needLabel}`;

    const textBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      "",
      `Primary need: ${needLabel}`,
      "",
      `Context: ${context || "—"}`,
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
        </table>

        <h3 style="color: #6b6b6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Need</h3>
        <p style="font-weight: 600; font-size: 16px; margin: 8px 0;">${needLabel}</p>

        ${context ? `
        <h3 style="color: #6b6b6b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Context</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">${context}</p>
        ` : ""}

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
