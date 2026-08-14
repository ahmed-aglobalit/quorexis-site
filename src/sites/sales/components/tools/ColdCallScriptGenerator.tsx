"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CONTEXTS = [
  { value: "first-call", label: "Premier appel à froid" },
  { value: "follow-up", label: "Suivi après email" },
  { value: "referral", label: "Recommandation / Intro" },
  { value: "event", label: "Post-événement / Webinar" },
  { value: "inbound", label: "Lead entrant" },
];

const OBJECTIVES = [
  { value: "meeting", label: "Obtenir un RDV" },
  { value: "qualify", label: "Qualifier le besoin" },
  { value: "demo", label: "Proposer une démo" },
  { value: "decision-maker", label: "Identifier le décideur" },
];

const INDUSTRIES = [
  { value: "saas", label: "SaaS / Tech" },
  { value: "services", label: "Services B2B" },
  { value: "finance", label: "Finance" },
  { value: "industry", label: "Industrie" },
  { value: "consulting", label: "Conseil" },
];

export function ColdCallScriptGenerator() {
  const [context, setContext] = useState("");
  const [objective, setObjective] = useState("");
  const [industry, setIndustry] = useState("");
  const [valueProposition, setValueProposition] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateScript = async () => {
    if (!context || !objective) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "call-script",
          data: {
            context: CONTEXTS.find((c) => c.value === context)?.label,
            objective: OBJECTIVES.find((o) => o.value === objective)?.label,
            industry: INDUSTRIES.find((i) => i.value === industry)?.label,
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

  const copyScript = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Cold Call Script Generator</h3>
          <p className="text-sm text-muted">Scripts d&apos;appel générés par l&apos;IA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Contexte de l&apos;appel *</label>
          <select
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Sélectionner...</option>
            {CONTEXTS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Objectif *</label>
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Sélectionner...</option>
            {OBJECTIVES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Industrie cible</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          >
            <option value="">Général</option>
            {INDUSTRIES.map((i) => (
              <option key={i.value} value={i.value}>{i.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Votre proposition de valeur</label>
          <input
            type="text"
            value={valueProposition}
            onChange={(e) => setValueProposition(e.target.value)}
            placeholder="Ex: +50% de leads qualifiés"
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={generateScript}
        disabled={loading || !context || !objective}
        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
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
            Générer le script
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
            <pre className="p-4 rounded-lg bg-foreground/[0.02] border border-border text-sm whitespace-pre-wrap font-sans leading-relaxed max-h-[500px] overflow-y-auto">
              {result}
            </pre>
            <button
              type="button"
              onClick={copyScript}
              className="absolute top-3 right-3 px-3 py-1.5 text-xs font-medium bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={generateScript}
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
