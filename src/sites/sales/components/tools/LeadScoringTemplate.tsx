"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Criterion = {
  id: string;
  category: "firmographic" | "behavioral" | "engagement";
  label: string;
  weight: number;
  options: { label: string; score: number }[];
};

const DEFAULT_CRITERIA: Criterion[] = [
  {
    id: "company_size",
    category: "firmographic",
    label: "Taille entreprise",
    weight: 15,
    options: [
      { label: "1-10", score: 5 },
      { label: "11-50", score: 10 },
      { label: "51-200", score: 15 },
      { label: "201-500", score: 12 },
      { label: "500+", score: 8 },
    ],
  },
  {
    id: "industry",
    category: "firmographic",
    label: "Industrie",
    weight: 10,
    options: [
      { label: "ICP exact", score: 15 },
      { label: "Adjacent", score: 10 },
      { label: "Hors cible", score: 0 },
    ],
  },
  {
    id: "revenue",
    category: "firmographic",
    label: "CA estimé",
    weight: 10,
    options: [
      { label: "< 1M€", score: 5 },
      { label: "1-10M€", score: 15 },
      { label: "10-50M€", score: 12 },
      { label: "> 50M€", score: 8 },
    ],
  },
  {
    id: "job_title",
    category: "firmographic",
    label: "Titre du contact",
    weight: 15,
    options: [
      { label: "C-Level", score: 15 },
      { label: "VP / Directeur", score: 12 },
      { label: "Manager", score: 8 },
      { label: "Contributeur", score: 3 },
    ],
  },
  {
    id: "email_open",
    category: "engagement",
    label: "Ouverture emails",
    weight: 10,
    options: [
      { label: "3+ fois", score: 15 },
      { label: "1-2 fois", score: 8 },
      { label: "Jamais", score: 0 },
    ],
  },
  {
    id: "link_click",
    category: "engagement",
    label: "Clics liens",
    weight: 15,
    options: [
      { label: "Oui", score: 15 },
      { label: "Non", score: 0 },
    ],
  },
  {
    id: "reply",
    category: "engagement",
    label: "Réponse email",
    weight: 15,
    options: [
      { label: "Positive", score: 20 },
      { label: "Neutre/Question", score: 10 },
      { label: "Négative", score: -5 },
      { label: "Pas de réponse", score: 0 },
    ],
  },
  {
    id: "linkedin",
    category: "behavioral",
    label: "Engagement LinkedIn",
    weight: 10,
    options: [
      { label: "Connexion acceptée", score: 10 },
      { label: "Vue profil", score: 5 },
      { label: "Aucun", score: 0 },
    ],
  },
];

export function LeadScoringTemplate() {
  const [criteria, setCriteria] = useState<Criterion[]>(DEFAULT_CRITERIA);
  const [scores, setScores] = useState<Record<string, number>>({});

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxPossibleScore = criteria.reduce(
    (acc, c) => acc + Math.max(...c.options.map((o) => o.score)),
    0
  );
  const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

  const getGrade = (pct: number) => {
    if (pct >= 80) return { label: "A - Hot Lead", color: "text-green-500", bg: "bg-green-500/10" };
    if (pct >= 60) return { label: "B - Warm Lead", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    if (pct >= 40) return { label: "C - Nurture", color: "text-orange-500", bg: "bg-orange-500/10" };
    return { label: "D - Cold", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const grade = getGrade(percentage);

  const updateWeight = (id: string, weight: number) => {
    setCriteria(criteria.map((c) => (c.id === id ? { ...c, weight } : c)));
  };

  const selectOption = (criterionId: string, score: number) => {
    setScores({ ...scores, [criterionId]: score });
  };

  const resetScores = () => setScores({});

  const groupedCriteria = {
    firmographic: criteria.filter((c) => c.category === "firmographic"),
    engagement: criteria.filter((c) => c.category === "engagement"),
    behavioral: criteria.filter((c) => c.category === "behavioral"),
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Lead Scoring Template</h3>
          <p className="text-sm text-muted">Créez votre grille de scoring personnalisée.</p>
        </div>
        <button
          type="button"
          onClick={resetScores}
          className="px-3 py-1.5 text-sm text-muted hover:text-foreground border border-border rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Score Result */}
      <motion.div
        className={`p-6 rounded-xl border mb-8 ${grade.bg} border-${grade.color.replace("text-", "")}/20`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Score actuel</p>
            <p className="text-4xl font-bold">{totalScore} pts</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">Grade</p>
            <p className={`text-2xl font-bold ${grade.color}`}>{grade.label}</p>
          </div>
        </div>
        <div className="mt-4 h-2 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-muted mt-2 text-center">{percentage}% du score maximum</p>
      </motion.div>

      {/* Criteria by category */}
      <div className="space-y-8">
        {Object.entries(groupedCriteria).map(([category, items]) => (
          <div key={category}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
              {category === "firmographic" && "Données firmographiques"}
              {category === "engagement" && "Engagement"}
              {category === "behavioral" && "Comportement"}
            </h4>
            <div className="space-y-4">
              {items.map((criterion) => (
                <div
                  key={criterion.id}
                  className="p-4 rounded-lg bg-foreground/[0.02] border border-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">{criterion.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted">Poids:</span>
                      <input
                        type="number"
                        min={1}
                        max={25}
                        value={criterion.weight}
                        onChange={(e) => updateWeight(criterion.id, Number(e.target.value))}
                        className="w-12 px-2 py-1 text-xs border border-border rounded bg-background text-center"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {criterion.options.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => selectOption(criterion.id, option.score)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                          scores[criterion.id] === option.score
                            ? "bg-accent text-white"
                            : "bg-foreground/5 hover:bg-foreground/10"
                        }`}
                      >
                        {option.label}
                        <span className="ml-1 text-xs opacity-70">({option.score})</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 rounded-lg bg-accent/5 border border-accent/20">
        <p className="text-sm font-semibold mb-2">Interprétation du score</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span>A (80%+): Contact prioritaire</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>B (60-79%): À travailler</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span>C (40-59%): Nurturing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span>D (&lt;40%): Non qualifié</span>
          </div>
        </div>
      </div>
    </div>
  );
}
