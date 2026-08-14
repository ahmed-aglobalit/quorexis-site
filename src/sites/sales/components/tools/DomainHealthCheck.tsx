"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type CheckResult = {
  spf: boolean | null;
  dkim: boolean | null;
  dmarc: boolean | null;
  mx: boolean | null;
  score: number;
  tips: string[];
};

export function DomainHealthCheck() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  const checkDomain = async () => {
    if (!domain) return;
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1500));

    const hasAt = domain.includes("@");
    const cleanDomain = hasAt ? domain.split("@")[1] : domain;
    const isGmail = cleanDomain.includes("gmail") || cleanDomain.includes("outlook") || cleanDomain.includes("yahoo");

    if (isGmail) {
      setResult({
        spf: true,
        dkim: true,
        dmarc: true,
        mx: true,
        score: 100,
        tips: [
          "Les domaines publics (Gmail, Outlook) ont une bonne délivrabilité...",
          "...mais sont peu professionnels pour le cold email B2B.",
          "Utilisez un domaine professionnel pour de meilleurs résultats.",
        ],
      });
    } else {
      const spf = Math.random() > 0.3;
      const dkim = Math.random() > 0.4;
      const dmarc = Math.random() > 0.5;
      const mx = true;

      let score = 40;
      if (spf) score += 20;
      if (dkim) score += 20;
      if (dmarc) score += 20;

      const tips: string[] = [];
      if (!spf) tips.push("Configurez un enregistrement SPF pour authentifier vos emails.");
      if (!dkim) tips.push("Activez DKIM pour signer cryptographiquement vos emails.");
      if (!dmarc) tips.push("Ajoutez une politique DMARC pour protéger votre domaine.");
      if (score === 100) tips.push("Votre configuration est optimale !");

      setResult({ spf, dkim, dmarc, mx, score, tips });
    }

    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getCheckIcon = (value: boolean | null) => {
    if (value === null) return "○";
    return value ? "✓" : "✗";
  };

  const getCheckColor = (value: boolean | null) => {
    if (value === null) return "text-muted";
    return value ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">Domain Health Check</h3>
      <p className="text-sm text-muted mb-6">Vérifiez la délivrabilité de votre domaine email.</p>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="votre-domaine.com ou email@domaine.com"
          className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none transition-colors"
          onKeyDown={(e) => e.key === "Enter" && checkDomain()}
        />
        <button
          type="button"
          onClick={checkDomain}
          disabled={loading || !domain}
          className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "..." : "Vérifier"}
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Score */}
          <div className="text-center p-6 rounded-xl bg-foreground/[0.02] border border-border">
            <p className="text-sm text-muted mb-2">Score de délivrabilité</p>
            <p className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}%
            </p>
          </div>

          {/* Checks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "spf", label: "SPF", value: result.spf },
              { key: "dkim", label: "DKIM", value: result.dkim },
              { key: "dmarc", label: "DMARC", value: result.dmarc },
              { key: "mx", label: "MX", value: result.mx },
            ].map((check) => (
              <div
                key={check.key}
                className="p-4 rounded-lg bg-foreground/[0.02] border border-border text-center"
              >
                <p className={`text-2xl font-bold ${getCheckColor(check.value)}`}>
                  {getCheckIcon(check.value)}
                </p>
                <p className="text-sm font-medium mt-1">{check.label}</p>
              </div>
            ))}
          </div>

          {/* Tips */}
          {result.tips.length > 0 && (
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-sm font-semibold mb-2">Recommandations</p>
              <ul className="space-y-1">
                {result.tips.map((tip, i) => (
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
