"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ChecklistItem = {
  id: string;
  category: string;
  label: string;
  weight: number;
  tip: string;
};

const CHECKLIST: ChecklistItem[] = [
  { id: "photo", category: "Profil", label: "Photo professionnelle de qualité", weight: 10, tip: "Fond neutre, sourire, tenue pro. Pas de selfie ni de photo de vacances." },
  { id: "banner", category: "Profil", label: "Bannière personnalisée", weight: 5, tip: "Utilisez une bannière avec votre proposition de valeur ou votre branding." },
  { id: "headline", category: "Profil", label: "Headline accrocheur (pas juste le titre)", weight: 15, tip: "Format: 'J'aide [cible] à [résultat] grâce à [méthode]'. Pas juste 'Sales Manager chez X'." },
  { id: "about", category: "Profil", label: "Section À propos complète", weight: 10, tip: "Parlez de la valeur que vous apportez, pas juste de votre parcours. Incluez un CTA." },
  { id: "experience", category: "Profil", label: "Expériences avec résultats chiffrés", weight: 10, tip: "Ajoutez des métriques : '+X% de croissance', 'X clients signés', etc." },
  { id: "skills", category: "Crédibilité", label: "Compétences validées (50+ recommandations)", weight: 5, tip: "Demandez à vos contacts de valider vos compétences clés." },
  { id: "recommendations", category: "Crédibilité", label: "Recommandations de clients/collègues", weight: 10, tip: "Demandez des recommandations spécifiques sur des projets réussis." },
  { id: "posts", category: "Activité", label: "Publications régulières (1-2/semaine)", weight: 10, tip: "Partagez du contenu de valeur pour votre audience cible." },
  { id: "engagement", category: "Activité", label: "Commentaires pertinents sur posts cibles", weight: 10, tip: "Commentez les posts de vos prospects et influenceurs du secteur." },
  { id: "connections", category: "Réseau", label: "500+ connexions pertinentes", weight: 5, tip: "Privilégiez la qualité : connectez-vous à vos ICP et décideurs." },
  { id: "custom-url", category: "Profil", label: "URL personnalisée", weight: 5, tip: "linkedin.com/in/prenom-nom au lieu de l'URL par défaut avec chiffres." },
  { id: "contact", category: "Profil", label: "Coordonnées visibles", weight: 5, tip: "Email et/ou calendrier accessible pour faciliter le contact." },
];

const CATEGORIES = [...new Set(CHECKLIST.map((c) => c.category))];

export function LinkedInAnalyzer() {
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (id: string) => {
    setChecked(checked.includes(id) ? checked.filter((c) => c !== id) : [...checked, id]);
  };

  const totalWeight = CHECKLIST.reduce((acc, c) => acc + c.weight, 0);
  const currentScore = CHECKLIST.filter((c) => checked.includes(c.id)).reduce((acc, c) => acc + c.weight, 0);
  const percentage = Math.round((currentScore / totalWeight) * 100);

  const getGrade = (pct: number) => {
    if (pct >= 90) return { label: "Excellent", color: "text-green-500", emoji: "🏆" };
    if (pct >= 70) return { label: "Bon", color: "text-blue-500", emoji: "👍" };
    if (pct >= 50) return { label: "Moyen", color: "text-yellow-500", emoji: "⚠️" };
    return { label: "À améliorer", color: "text-red-500", emoji: "🔧" };
  };

  const grade = getGrade(percentage);
  const unchecked = CHECKLIST.filter((c) => !checked.includes(c.id)).sort((a, b) => b.weight - a.weight);
  const topPriorities = unchecked.slice(0, 3);

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">LinkedIn Profile Analyzer</h3>
      <p className="text-sm text-muted mb-6">Évaluez et optimisez votre profil pour la prospection.</p>

      {/* Score */}
      <motion.div
        className="p-6 rounded-xl bg-foreground/[0.02] border border-border mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted">Score profil</p>
            <p className="text-4xl font-bold">{percentage}%</p>
          </div>
          <div className="text-right">
            <p className="text-4xl">{grade.emoji}</p>
            <p className={`text-sm font-medium ${grade.color}`}>{grade.label}</p>
          </div>
        </div>
        <div className="h-3 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Top priorities */}
      {topPriorities.length > 0 && (
        <div className="mb-8 p-4 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-sm font-semibold mb-3">Top 3 priorités</p>
          <div className="space-y-2">
            {topPriorities.map((item, i) => (
              <div key={item.id} className="flex items-start gap-2 text-sm">
                <span className="font-bold text-accent">{i + 1}.</span>
                <div>
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted"> — {item.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checklist by category */}
      <div className="space-y-6">
        {CATEGORIES.map((category) => (
          <div key={category}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
              {category}
            </h4>
            <div className="space-y-2">
              {CHECKLIST.filter((c) => c.category === category).map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    checked.includes(item.id)
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-foreground/[0.02] border-border hover:border-accent/30"
                  }`}
                  onClick={() => toggle(item.id)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        checked.includes(item.id)
                          ? "bg-green-500 text-white"
                          : "bg-foreground/10"
                      }`}
                    >
                      {checked.includes(item.id) && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${checked.includes(item.id) ? "text-green-600" : ""}`}>
                          {item.label}
                        </span>
                        <span className="text-xs text-muted">+{item.weight} pts</span>
                      </div>
                      <p className="text-xs text-muted mt-1">{item.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
