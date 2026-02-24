import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
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

    const subjectLabels: Record<string, string> = {
      qa: "QA",
      devops: "DevOps",
      data: "Data",
      other: "Autre",
    };

    const subjectLine = `[Quorexis] ${subjectLabels[subject] || "Contact"} — ${name}`;

    await transporter.sendMail({
      from: `"Quorexis Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: subjectLine,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        company ? `Entreprise : ${company}` : null,
        `Sujet : ${subjectLabels[subject] || "Non spécifié"}`,
        ``,
        `Message :`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px;">
          <h2 style="color: #2c3e50;">Nouveau message — Quorexis</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b6b6b;">Nom</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b6b6b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #6b6b6b;">Entreprise</td><td style="padding: 8px 0;">${company}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; color: #6b6b6b;">Sujet</td><td style="padding: 8px 0;">${subjectLabels[subject] || "Non spécifié"}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
