import { NextResponse } from "next/server";
import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

// Simple in-memory rate limiter (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const SYSTEM_PROMPT_FR = `Tu es l'assistant virtuel de Quorexis, un cabinet français spécialisé exclusivement en delivery de tests logiciels en offshore.

Expertises : Tests fonctionnels, Automatisation des tests, Tests API, Tests de performance, Gouvernance QA & KPIs.
Approche en 3 phases : Évaluer (audit QA et cadrage), Structurer (organisation offshore, frameworks, processus), Livrer (exécution des campagnes, reporting, amélioration continue).
Fondé par Ahmed Ghanmi, plus de 10 ans d'expérience en QA et testing offshore.
Clients de référence : Renault, Thales, Louis Vuitton, Michelin Travel Partner, Sagemcom.

Ton rôle :
- Répondre aux questions sur les services de Quorexis de manière professionnelle et concise.
- Qualifier les leads commerciaux en posant 2-3 questions structurées (secteur d'activité, volumétrie de test, niveau de maturité QA actuel).
- Proposer un appel découverte de 30 minutes quand l'intérêt commercial est détecté.
- Rester dans le périmètre du testing logiciel offshore. Ne jamais mentionner DevOps, Data ou services IT hors testing.
- Adopter un ton premium consulting : structuré, confiant, orienté résultats.
- Répondre en français sauf si le message est en anglais.`;

const SYSTEM_PROMPT_EN = `You are the virtual assistant for Quorexis, a French consultancy specializing exclusively in offshore software testing delivery.

Expertise areas: Functional Testing, Test Automation, API Testing, Performance Testing, QA Governance & KPIs.
3-phase approach: Assess (QA audit and scoping), Structure (offshore organization, frameworks, processes), Deliver (campaign execution, reporting, continuous improvement).
Founded by Ahmed Ghanmi, over 10 years of experience in QA and offshore testing.
Reference clients: Renault, Thales, Louis Vuitton, Michelin Travel Partner, Sagemcom.

Your role:
- Answer questions about Quorexis services professionally and concisely.
- Qualify commercial leads by asking 2-3 structured questions (industry sector, test volume, current QA maturity level).
- Propose a 30-minute discovery call when commercial interest is detected.
- Stay within the offshore software testing scope. Never mention DevOps, Data, or non-testing IT services.
- Adopt a premium consulting tone: structured, confident, results-oriented.
- Respond in English unless the message is in French.`;

export async function POST(request: Request) {
  try {
    const openai = getOpenAI();
    if (!openai) {
      return NextResponse.json(
        { error: "Chat service not configured" },
        { status: 503 }
      );
    }

    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const now = Date.now();
    const limit = rateLimitMap.get(ip);
    if (limit && now < limit.resetTime) {
      if (limit.count >= 20) {
        return NextResponse.json(
          { error: "Too many requests. Please wait a moment." },
          { status: 429 }
        );
      }
      limit.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    }

    const { messages, locale } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const systemPrompt = locale === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_FR;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-10).map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      stream: true,
      max_tokens: 500,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
