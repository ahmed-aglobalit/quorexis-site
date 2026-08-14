"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type AIAnalysis = {
  score: number;
  analysis: string;
  strengths: string[];
  improvements: string[];
  alternatives: string[];
};

export function SubjectLineTester() {
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeSubject = async () => {
    if (!subject.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "subject-line",
          data: { subject },
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else if (data.result) {
        setResult(data.result);
      }
    } catch {
      setError("Erreur lors de l'analyse. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

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

  const copyAlternative = (alt: string) => {
    navigator.clipboard.writeText(alt);
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Subject Line Tester</h3>
          <p className="text-sm text-muted">Analyse IA de vos objets d&apos;email</p>
        </div>
      </div>

      <div className="mb-4">
        <textarea
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Entrez votre objet d'email à analyser..."
          rows={2}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none transition-colors resize-none"
        />
        <div className="flex justify-between text-xs text-muted mt-2">
          <span>{subject.length} caractères</span>
          <span>{subject.split(/\s+/).filter(Boolean).length} mots</span>
        </div>
      </div>

      <button
        type="button"
        onClick={analyzeSubject}
        disabled={loading || !subject.trim()}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Analyse en cours...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Analyser avec l&apos;IA
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          {/* Score */}
          <div className="text-center p-6 rounded-xl bg-foreground/[0.02] border border-border">
            <p className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}
            </p>
            <p className={`text-sm font-medium mt-1 ${getScoreColor(result.score)}`}>
              {getScoreLabel(result.score)}
            </p>
            <p className="text-sm text-muted mt-3">{result.analysis}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            {result.strengths && result.strengths.length > 0 && (
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <p className="text-sm font-semibold text-green-600 mb-2">✓ Points forts</p>
                <ul className="space-y-1">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-muted">{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {result.improvements && result.improvements.length > 0 && (
              <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
                <p className="text-sm font-semibold text-orange-500 mb-2">→ À améliorer</p>
                <ul className="space-y-1">
                  {result.improvements.map((s, i) => (
                    <li key={i} className="text-sm text-muted">{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Alternatives */}
          {result.alternatives && result.alternatives.length > 0 && (
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-sm font-semibold mb-3">Alternatives suggérées par l&apos;IA</p>
              <div className="space-y-2">
                {result.alternatives.map((alt, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-background border border-border group"
                  >
                    <span className="text-sm">{alt}</span>
                    <button
                      type="button"
                      onClick={() => copyAlternative(alt)}
                      className="px-2 py-1 text-xs text-muted hover:text-accent opacity-0 group-hover:opacity-100 transition-all"
                    >
                      Copier
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
