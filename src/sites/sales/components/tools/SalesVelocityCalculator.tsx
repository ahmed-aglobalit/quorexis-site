"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export function SalesVelocityCalculator() {
  const [opportunities, setOpportunities] = useState(50);
  const [avgDealSize, setAvgDealSize] = useState(15000);
  const [winRate, setWinRate] = useState(25);
  const [salesCycle, setSalesCycle] = useState(45);

  const result = useMemo(() => {
    const velocity = (opportunities * avgDealSize * (winRate / 100)) / salesCycle;
    const monthlyRevenue = velocity * 30;
    const quarterlyRevenue = velocity * 90;
    const annualRevenue = velocity * 365;

    return {
      dailyVelocity: Math.round(velocity),
      monthlyRevenue: Math.round(monthlyRevenue),
      quarterlyRevenue: Math.round(quarterlyRevenue),
      annualRevenue: Math.round(annualRevenue),
      dealsPerMonth: Math.round((opportunities * (winRate / 100) * 30) / salesCycle * 10) / 10,
    };
  }, [opportunities, avgDealSize, winRate, salesCycle]);

  const scenarios = useMemo(() => {
    const current = result.annualRevenue;

    const improved = {
      moreOpportunities: Math.round(((opportunities * 1.2) * avgDealSize * (winRate / 100)) / salesCycle * 365),
      higherWinRate: Math.round((opportunities * avgDealSize * ((winRate + 5) / 100)) / salesCycle * 365),
      fasterCycle: Math.round((opportunities * avgDealSize * (winRate / 100)) / (salesCycle * 0.8) * 365),
      biggerDeals: Math.round((opportunities * (avgDealSize * 1.15) * (winRate / 100)) / salesCycle * 365),
    };

    return {
      current,
      moreOpportunities: { value: improved.moreOpportunities, lift: Math.round(((improved.moreOpportunities - current) / current) * 100) },
      higherWinRate: { value: improved.higherWinRate, lift: Math.round(((improved.higherWinRate - current) / current) * 100) },
      fasterCycle: { value: improved.fasterCycle, lift: Math.round(((improved.fasterCycle - current) / current) * 100) },
      biggerDeals: { value: improved.biggerDeals, lift: Math.round(((improved.biggerDeals - current) / current) * 100) },
    };
  }, [opportunities, avgDealSize, winRate, salesCycle, result.annualRevenue]);

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">Sales Velocity Calculator</h3>
      <p className="text-sm text-muted mb-6">
        Mesurez et optimisez la vélocité de votre pipeline commercial.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Opportunités en cours</label>
              <span className="text-lg font-semibold">{opportunities}</span>
            </div>
            <input
              type="range"
              min={10}
              max={200}
              value={opportunities}
              onChange={(e) => setOpportunities(Number(e.target.value))}
              className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Panier moyen</label>
              <span className="text-lg font-semibold">{avgDealSize.toLocaleString()} €</span>
            </div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={avgDealSize}
              onChange={(e) => setAvgDealSize(Number(e.target.value))}
              className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Taux de conversion (Win Rate)</label>
              <span className="text-lg font-semibold">{winRate}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              value={winRate}
              onChange={(e) => setWinRate(Number(e.target.value))}
              className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Cycle de vente (jours)</label>
              <span className="text-lg font-semibold">{salesCycle}j</span>
            </div>
            <input
              type="range"
              min={7}
              max={180}
              value={salesCycle}
              onChange={(e) => setSalesCycle(Number(e.target.value))}
              className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          {/* Formula */}
          <div className="p-4 rounded-lg bg-foreground/[0.02] border border-border">
            <p className="text-xs text-muted mb-2">Formule Sales Velocity</p>
            <p className="text-sm font-mono">
              ({opportunities} × {avgDealSize.toLocaleString()}€ × {winRate}%) / {salesCycle}j
            </p>
          </div>
        </div>

        {/* Results */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="p-6 rounded-xl bg-accent/10 border border-accent/30 text-center">
            <p className="text-sm text-muted mb-1">Vélocité journalière</p>
            <p className="text-4xl font-bold text-accent">{result.dailyVelocity.toLocaleString()} €</p>
            <p className="text-xs text-muted mt-1">par jour de pipeline</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-lg bg-foreground/[0.02] border border-border text-center">
              <p className="text-xs text-muted mb-1">Mensuel</p>
              <p className="text-lg font-bold">{(result.monthlyRevenue / 1000).toFixed(0)}K €</p>
            </div>
            <div className="p-4 rounded-lg bg-foreground/[0.02] border border-border text-center">
              <p className="text-xs text-muted mb-1">Trimestriel</p>
              <p className="text-lg font-bold">{(result.quarterlyRevenue / 1000).toFixed(0)}K €</p>
            </div>
            <div className="p-4 rounded-lg bg-foreground/[0.02] border border-border text-center">
              <p className="text-xs text-muted mb-1">Annuel</p>
              <p className="text-lg font-bold">{(result.annualRevenue / 1000).toFixed(0)}K €</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-foreground/[0.02] border border-border">
            <p className="text-sm font-semibold mb-3">Scénarios d&apos;amélioration</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">+20% opportunités</span>
                <span className="text-green-500 font-medium">+{scenarios.moreOpportunities.lift}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">+5 pts win rate</span>
                <span className="text-green-500 font-medium">+{scenarios.higherWinRate.lift}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">-20% cycle de vente</span>
                <span className="text-green-500 font-medium">+{scenarios.fasterCycle.lift}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">+15% panier moyen</span>
                <span className="text-green-500 font-medium">+{scenarios.biggerDeals.lift}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
