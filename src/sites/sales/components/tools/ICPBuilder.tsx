"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const COMPANY_SIZES = [
  { label: "1-10", value: "1-10", tam: 500000 },
  { label: "11-50", value: "11-50", tam: 200000 },
  { label: "51-200", value: "51-200", tam: 80000 },
  { label: "201-500", value: "201-500", tam: 25000 },
  { label: "500+", value: "500+", tam: 10000 },
];

const INDUSTRIES = [
  { label: "SaaS / Tech", value: "saas", multiplier: 1.2 },
  { label: "Services B2B", value: "services", multiplier: 1.0 },
  { label: "E-commerce", value: "ecommerce", multiplier: 0.9 },
  { label: "Industrie", value: "industry", multiplier: 0.8 },
  { label: "Finance", value: "finance", multiplier: 1.1 },
  { label: "Santé", value: "health", multiplier: 0.85 },
];

const GEOS = [
  { label: "France", value: "france", multiplier: 1.0 },
  { label: "Europe", value: "europe", multiplier: 3.5 },
  { label: "USA", value: "usa", multiplier: 5.0 },
  { label: "Monde", value: "world", multiplier: 10.0 },
];

const DECISION_MAKERS = [
  { label: "CEO / Fondateur", value: "ceo" },
  { label: "CTO / Tech", value: "cto" },
  { label: "CMO / Marketing", value: "cmo" },
  { label: "CFO / Finance", value: "cfo" },
  { label: "VP Sales", value: "sales" },
  { label: "DRH / RH", value: "hr" },
  { label: "DSI / IT", value: "it" },
];

export function ICPBuilder() {
  const [sizes, setSizes] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [geos, setGeos] = useState<string[]>(["france"]);
  const [decisionMakers, setDecisionMakers] = useState<string[]>([]);
  const [minRevenue, setMinRevenue] = useState(500000);

  const toggleItem = (list: string[], setList: (v: string[]) => void, value: string) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const calculateTAM = () => {
    if (sizes.length === 0 || industries.length === 0 || geos.length === 0) return null;

    const baseTam = sizes.reduce((acc, s) => {
      const size = COMPANY_SIZES.find((cs) => cs.value === s);
      return acc + (size?.tam || 0);
    }, 0);

    const industryMultiplier = industries.reduce((acc, i) => {
      const ind = INDUSTRIES.find((ind) => ind.value === i);
      return acc + (ind?.multiplier || 1);
    }, 0) / industries.length;

    const geoMultiplier = geos.reduce((acc, g) => {
      const geo = GEOS.find((geo) => geo.value === g);
      return Math.max(acc, geo?.multiplier || 1);
    }, 0);

    const tam = Math.round(baseTam * industryMultiplier * geoMultiplier);
    const sam = Math.round(tam * 0.3);
    const som = Math.round(sam * 0.1);

    return { tam, sam, som };
  };

  const result = calculateTAM();

  return (
    <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-6">ICP Builder</h3>

      <div className="space-y-6">
        {/* Company Size */}
        <div>
          <label className="text-sm font-medium mb-3 block">Taille entreprise cible</label>
          <div className="flex flex-wrap gap-2">
            {COMPANY_SIZES.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => toggleItem(sizes, setSizes, size.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  sizes.includes(size.value)
                    ? "bg-accent text-white"
                    : "bg-foreground/5 hover:bg-foreground/10"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Industry */}
        <div>
          <label className="text-sm font-medium mb-3 block">Industrie</label>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.value}
                type="button"
                onClick={() => toggleItem(industries, setIndustries, ind.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  industries.includes(ind.value)
                    ? "bg-accent text-white"
                    : "bg-foreground/5 hover:bg-foreground/10"
                }`}
              >
                {ind.label}
              </button>
            ))}
          </div>
        </div>

        {/* Geography */}
        <div>
          <label className="text-sm font-medium mb-3 block">Zone géographique</label>
          <div className="flex flex-wrap gap-2">
            {GEOS.map((geo) => (
              <button
                key={geo.value}
                type="button"
                onClick={() => toggleItem(geos, setGeos, geo.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  geos.includes(geo.value)
                    ? "bg-accent text-white"
                    : "bg-foreground/5 hover:bg-foreground/10"
                }`}
              >
                {geo.label}
              </button>
            ))}
          </div>
        </div>

        {/* Decision Makers */}
        <div>
          <label className="text-sm font-medium mb-3 block">Décideurs ciblés</label>
          <div className="flex flex-wrap gap-2">
            {DECISION_MAKERS.map((dm) => (
              <button
                key={dm.value}
                type="button"
                onClick={() => toggleItem(decisionMakers, setDecisionMakers, dm.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  decisionMakers.includes(dm.value)
                    ? "bg-accent text-white"
                    : "bg-foreground/5 hover:bg-foreground/10"
                }`}
              >
                {dm.label}
              </button>
            ))}
          </div>
        </div>

        {/* Min Revenue */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">CA minimum</label>
            <span className="text-lg font-semibold">{(minRevenue / 1000000).toFixed(1)}M €</span>
          </div>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={minRevenue}
            onChange={(e) => setMinRevenue(Number(e.target.value))}
            className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      {/* Results */}
      {result && (
        <motion.div
          className="mt-8 p-6 rounded-xl bg-accent/5 border border-accent/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
            Estimation de marché
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-accent">{result.tam.toLocaleString()}</p>
              <p className="text-xs text-muted mt-1">TAM (Total)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">{result.sam.toLocaleString()}</p>
              <p className="text-xs text-muted mt-1">SAM (Accessible)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">{result.som.toLocaleString()}</p>
              <p className="text-xs text-muted mt-1">SOM (Atteignable)</p>
            </div>
          </div>
          <p className="text-xs text-muted text-center mt-4">
            * Estimation basée sur les données de marché moyennes
          </p>
        </motion.div>
      )}
    </div>
  );
}
