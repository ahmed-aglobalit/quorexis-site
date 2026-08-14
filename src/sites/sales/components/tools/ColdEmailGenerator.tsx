"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const INDUSTRIES = [
  { value: "saas", label: "SaaS / Tech" },
  { value: "services", label: "Services B2B" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "finance", label: "Finance" },
  { value: "industry", label: "Industrie" },
  { value: "health", label: "Santé" },
  { value: "consulting", label: "Conseil" },
];

const PAIN_POINTS = [
  { value: "growth", label: "Croissance / Acquisition clients" },
  { value: "efficiency", label: "Efficacité commerciale" },
  { value: "cost", label: "Réduction des coûts" },
  { value: "quality", label: "Qualité des leads" },
  { value: "time", label: "Gain de temps" },
  { value: "conversion", label: "Taux de conversion" },
];

const TONES = [
  { value: "professional", label: "Professionnel" },
  { value: "casual", label: "Décontracté" },
  { value: "direct", label: "Direct" },
  { value: "curious", label: "Curieux" },
];

export function ColdEmailGenerator() {
  const [industry, setIndustry] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [tone, setTone] = useState("");
  const [valueProposition, setValueProposition] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEmail = async () => {
    if (!industry || !painPoint || !tone) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cold-email",
          data: {
            industry: INDUSTRIES.find((i) => i.value === industry)?.label,
            painPoint: PAIN_POINTS.find((p) => p.value === painPoint)?.label,
            tone: TONES.find((t) => t.value === tone)?.label,
            valueProposition,
          },
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.result);
      }
    } catch {
      setError("Erreur lors de la génération. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Cold Email Generator</h3>
          <p className="text-sm text-muted">Propulsé par l&apos;IA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Industrie cible *</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Sélectionner...</option>
            {INDUSTRIES.map((i) => (
              <option key={i.value} value={i.value}>{i.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Pain point *</label>
          <select
            value={painPoint}
            onChange={(e) => setPainPoint(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Sélectionner...</option>
            {PAIN_POINTS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Ton *</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Sélectionner...</option>
            {TONES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Votre proposition de valeur</label>
          <input
            type="text"
            value={valueProposition}
            onChange={(e) => setValueProposition(e.target.value)}
            placeholder="Ex: génération de 15 RDV qualifiés/mois"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={generateEmail}
        disabled={loading || !industry || !painPoint || !tone}
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Génération en cours...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Générer avec l&apos;IA
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
          className="mt-6"
        >
          <div className="relative">
            <pre className="p-4 rounded-lg bg-foreground/[0.02] border border-border text-sm whitespace-pre-wrap font-sans leading-relaxed">
              {result}
            </pre>
            <button
              type="button"
              onClick={copyToClipboard}
              className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={generateEmail}
              className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-foreground/5 transition-colors"
            >
              Régénérer
            </button>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
            <p className="text-sm font-semibold mb-2">Variables à personnaliser</p>
            <div className="flex flex-wrap gap-2">
              {["{prénom}", "{entreprise}"].map((v) => (
                <span key={v} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
