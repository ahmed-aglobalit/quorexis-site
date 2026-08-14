"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

function calculateSignificance(
  visitorsA: number,
  conversionsA: number,
  visitorsB: number,
  conversionsB: number
): { significant: boolean; confidence: number; winner: "A" | "B" | null; lift: number } {
  if (visitorsA === 0 || visitorsB === 0) {
    return { significant: false, confidence: 0, winner: null, lift: 0 };
  }

  const rateA = conversionsA / visitorsA;
  const rateB = conversionsB / visitorsB;

  const pooledRate = (conversionsA + conversionsB) / (visitorsA + visitorsB);
  const standardError = Math.sqrt(
    pooledRate * (1 - pooledRate) * (1 / visitorsA + 1 / visitorsB)
  );

  if (standardError === 0) {
    return { significant: false, confidence: 0, winner: null, lift: 0 };
  }

  const zScore = Math.abs(rateA - rateB) / standardError;

  let confidence = 0;
  if (zScore >= 2.576) confidence = 99;
  else if (zScore >= 1.96) confidence = 95;
  else if (zScore >= 1.645) confidence = 90;
  else if (zScore >= 1.28) confidence = 80;
  else confidence = Math.round(50 + zScore * 20);

  const significant = confidence >= 95;
  const winner = rateB > rateA ? "B" : rateA > rateB ? "A" : null;
  const lift = rateA > 0 ? ((rateB - rateA) / rateA) * 100 : 0;

  return { significant, confidence, winner, lift };
}

export function ABTestCalculator() {
  const [visitorsA, setVisitorsA] = useState(1000);
  const [conversionsA, setConversionsA] = useState(50);
  const [visitorsB, setVisitorsB] = useState(1000);
  const [conversionsB, setConversionsB] = useState(65);

  const result = useMemo(() => {
    return calculateSignificance(visitorsA, conversionsA, visitorsB, conversionsB);
  }, [visitorsA, conversionsA, visitorsB, conversionsB]);

  const rateA = visitorsA > 0 ? ((conversionsA / visitorsA) * 100).toFixed(2) : "0";
  const rateB = visitorsB > 0 ? ((conversionsB / visitorsB) * 100).toFixed(2) : "0";

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">A/B Test Calculator</h3>
      <p className="text-sm text-muted mb-6">Calculez la significativité statistique de vos tests.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Variant A */}
        <div className="p-4 rounded-xl bg-foreground/[0.02] border border-border">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-blue-500 text-white text-sm flex items-center justify-center">A</span>
            Variante A (Contrôle)
          </h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted mb-1 block">Visiteurs / Emails envoyés</label>
              <input
                type="number"
                min={0}
                value={visitorsA}
                onChange={(e) => setVisitorsA(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="text-sm text-muted mb-1 block">Conversions / Réponses</label>
              <input
                type="number"
                min={0}
                max={visitorsA}
                value={conversionsA}
                onChange={(e) => setConversionsA(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted">Taux de conversion</p>
              <p className="text-2xl font-bold">{rateA}%</p>
            </div>
          </div>
        </div>

        {/* Variant B */}
        <div className="p-4 rounded-xl bg-foreground/[0.02] border border-border">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-green-500 text-white text-sm flex items-center justify-center">B</span>
            Variante B (Test)
          </h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted mb-1 block">Visiteurs / Emails envoyés</label>
              <input
                type="number"
                min={0}
                value={visitorsB}
                onChange={(e) => setVisitorsB(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="text-sm text-muted mb-1 block">Conversions / Réponses</label>
              <input
                type="number"
                min={0}
                max={visitorsB}
                value={conversionsB}
                onChange={(e) => setConversionsB(Number(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted">Taux de conversion</p>
              <p className="text-2xl font-bold">{rateB}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-6 rounded-xl border ${
          result.significant
            ? "bg-green-500/5 border-green-500/20"
            : "bg-yellow-500/5 border-yellow-500/20"
        }`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-muted mb-1">Confiance</p>
            <p className={`text-3xl font-bold ${result.confidence >= 95 ? "text-green-500" : "text-yellow-500"}`}>
              {result.confidence}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted mb-1">Significatif ?</p>
            <p className={`text-3xl font-bold ${result.significant ? "text-green-500" : "text-yellow-500"}`}>
              {result.significant ? "Oui" : "Non"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted mb-1">Gagnant</p>
            <p className="text-3xl font-bold">
              {result.winner || "—"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted mb-1">Uplift</p>
            <p className={`text-3xl font-bold ${result.lift > 0 ? "text-green-500" : result.lift < 0 ? "text-red-500" : ""}`}>
              {result.lift > 0 ? "+" : ""}{result.lift.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-sm text-center">
            {result.significant ? (
              <>
                <span className="text-green-600 font-medium">Test concluant !</span> La variante {result.winner} est statistiquement meilleure avec {result.confidence}% de confiance.
              </>
            ) : (
              <>
                <span className="text-yellow-600 font-medium">Pas encore concluant.</span> Continuez le test pour atteindre 95% de confiance.
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
