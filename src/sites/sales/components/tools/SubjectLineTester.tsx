"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const POWER_WORDS = ["gratuit", "exclusif", "urgent", "nouveau", "résultats", "simple", "rapide", "prouvé", "secret", "découvrez"];
const SPAM_WORDS = ["gratuit", "promo", "offre", "remise", "gagnez", "argent", "casino", "viagra", "cliquez"];
const PERSONALIZATION = ["{prénom}", "{entreprise}", "{ville}", "vous", "votre"];

export function SubjectLineTester() {
  const [subject, setSubject] = useState("");

  const analysis = useMemo(() => {
    if (!subject) return null;

    const lower = subject.toLowerCase();
    const words = subject.split(/\s+/);
    const charCount = subject.length;

    let score = 50;
    const tips: string[] = [];
    const good: string[] = [];
    const bad: string[] = [];

    // Length check
    if (charCount < 30) {
      score += 10;
      good.push("Longueur courte (bon pour mobile)");
    } else if (charCount > 60) {
      score -= 10;
      bad.push("Trop long — sera coupé sur mobile");
      tips.push("Réduisez à moins de 60 caractères");
    } else {
      score += 5;
    }

    // Word count
    if (words.length <= 7) {
      score += 5;
    }

    // Personalization
    const hasPersonalization = PERSONALIZATION.some((p) => lower.includes(p.toLowerCase()));
    if (hasPersonalization) {
      score += 15;
      good.push("Personnalisation détectée");
    } else {
      tips.push("Ajoutez {prénom} ou {entreprise} pour personnaliser");
    }

    // Power words
    const foundPowerWords = POWER_WORDS.filter((w) => lower.includes(w));
    if (foundPowerWords.length > 0) {
      score += 10;
      good.push(`Mots puissants: ${foundPowerWords.join(", ")}`);
    }

    // Spam words
    const foundSpamWords = SPAM_WORDS.filter((w) => lower.includes(w));
    if (foundSpamWords.length > 0) {
      score -= 15 * foundSpamWords.length;
      bad.push(`Mots spam: ${foundSpamWords.join(", ")}`);
      tips.push("Évitez les mots qui déclenchent les filtres spam");
    }

    // Question mark
    if (subject.includes("?")) {
      score += 5;
      good.push("Question — engage la curiosité");
    }

    // ALL CAPS
    if (subject === subject.toUpperCase() && subject.length > 3) {
      score -= 20;
      bad.push("TOUT EN MAJUSCULES = spam");
      tips.push("Utilisez une casse normale");
    }

    // Emojis
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu;
    const emojis = subject.match(emojiRegex);
    if (emojis && emojis.length > 0) {
      if (emojis.length <= 2) {
        score += 5;
        good.push("Emoji — attire l'attention");
      } else {
        score -= 10;
        bad.push("Trop d'emojis");
      }
    }

    // Numbers
    if (/\d/.test(subject)) {
      score += 5;
      good.push("Contient des chiffres — concret");
    }

    // RE: or FWD:
    if (lower.startsWith("re:") || lower.startsWith("fwd:")) {
      score -= 15;
      bad.push("Faux RE:/FWD: — perçu comme trompeur");
    }

    score = Math.max(0, Math.min(100, score));

    return { score, tips, good, bad, charCount, wordCount: words.length };
  }, [subject]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Correct";
    if (score >= 40) return "À améliorer";
    return "Risqué";
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">Email Subject Line Tester</h3>
      <p className="text-sm text-muted mb-6">Analysez et optimisez vos objets d&apos;email.</p>

      <div className="mb-6">
        <textarea
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Entrez votre objet d'email..."
          rows={2}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none transition-colors resize-none"
        />
        {analysis && (
          <div className="flex justify-between text-xs text-muted mt-2">
            <span>{analysis.charCount} caractères</span>
            <span>{analysis.wordCount} mots</span>
          </div>
        )}
      </div>

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Score */}
          <div className="text-center p-6 rounded-xl bg-foreground/[0.02] border border-border">
            <p className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
              {analysis.score}
            </p>
            <p className={`text-sm font-medium mt-1 ${getScoreColor(analysis.score)}`}>
              {getScoreLabel(analysis.score)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Good */}
            {analysis.good.length > 0 && (
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <p className="text-sm font-semibold text-green-600 mb-2">✓ Points forts</p>
                <ul className="space-y-1">
                  {analysis.good.map((g, i) => (
                    <li key={i} className="text-sm text-muted">{g}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bad */}
            {analysis.bad.length > 0 && (
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="text-sm font-semibold text-red-500 mb-2">✗ À corriger</p>
                <ul className="space-y-1">
                  {analysis.bad.map((b, i) => (
                    <li key={i} className="text-sm text-muted">{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tips */}
          {analysis.tips.length > 0 && (
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-sm font-semibold mb-2">Suggestions</p>
              <ul className="space-y-1">
                {analysis.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted flex items-start gap-2">
                    <span className="text-accent">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
