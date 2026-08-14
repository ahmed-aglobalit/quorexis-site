import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    let prompt = "";
    let systemPrompt = "Tu es un expert en prospection B2B et en copywriting commercial. Réponds toujours en français.";

    switch (type) {
      case "cold-email":
        prompt = `Génère un cold email B2B personnalisé avec ces paramètres :
- Industrie cible : ${data.industry}
- Pain point principal : ${data.painPoint}
- Ton souhaité : ${data.tone}
- Proposition de valeur : ${data.valueProposition || "génération de leads qualifiés"}

L'email doit :
- Être court (max 150 mots)
- Avoir un objet accrocheur
- Commencer par une accroche personnalisée
- Mentionner le pain point
- Proposer une valeur claire
- Terminer par un CTA simple (demande de call)
- Utiliser les variables {prénom}, {entreprise} où approprié

Format de réponse :
OBJET: [l'objet de l'email]

[Le corps de l'email]`;
        break;

      case "subject-line":
        systemPrompt = "Tu es un expert en email marketing B2B. Analyse les objets d'email et donne des recommandations précises.";
        prompt = `Analyse cet objet d'email pour du cold emailing B2B :
"${data.subject}"

Donne :
1. Un score sur 100 avec justification
2. 3 points forts (si applicable)
3. 3 points à améliorer (si applicable)
4. 3 alternatives d'objets optimisés

Format JSON strict :
{
  "score": number,
  "analysis": "string",
  "strengths": ["string"],
  "improvements": ["string"],
  "alternatives": ["string", "string", "string"]
}`;
        break;

      case "call-script":
        prompt = `Génère un script d'appel téléphonique B2B avec ces paramètres :
- Contexte : ${data.context}
- Objectif : ${data.objective}
- Industrie cible : ${data.industry || "B2B général"}
- Proposition de valeur : ${data.valueProposition || "génération de leads qualifiés"}

Le script doit inclure :
1. ACCROCHE (15 sec) : Comment se présenter et capter l'attention
2. QUALIFICATION (30 sec) : 2-3 questions pour qualifier le besoin
3. PITCH (30 sec) : Présentation de la valeur
4. OBJECTIONS : 3 réponses aux objections courantes
5. CLOSE : Comment conclure et obtenir l'engagement

Utilise {prénom} et {entreprise} comme variables.`;
        break;

      case "icp-analysis":
        prompt = `Analyse ce profil client idéal (ICP) et donne des recommandations :
- Tailles d'entreprise : ${data.sizes?.join(", ") || "non spécifié"}
- Industries : ${data.industries?.join(", ") || "non spécifié"}
- Zones géographiques : ${data.geos?.join(", ") || "non spécifié"}
- Décideurs ciblés : ${data.decisionMakers?.join(", ") || "non spécifié"}
- CA minimum : ${data.minRevenue || "non spécifié"}

Donne :
1. Évaluation de la pertinence de l'ICP (score /100)
2. 3 recommandations pour affiner le ciblage
3. 3 critères supplémentaires à considérer
4. Estimation du potentiel de marché (qualitatif)

Format JSON :
{
  "score": number,
  "evaluation": "string",
  "recommendations": ["string"],
  "additionalCriteria": ["string"],
  "marketPotential": "string"
}`;
        break;

      default:
        return NextResponse.json(
          { error: "Unknown generation type" },
          { status: 400 }
        );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content || "";

    // Try to parse JSON responses
    if (type === "subject-line" || type === "icp-analysis") {
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ result: parsed });
        }
      } catch {
        // Return raw content if JSON parsing fails
      }
    }

    return NextResponse.json({ result: content });
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
