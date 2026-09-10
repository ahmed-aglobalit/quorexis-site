"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { PRICING_CONFIG } from "../config/pricing";

function openAssistant() {
  window.dispatchEvent(new CustomEvent("quorexis:open-assistant", { detail: { mode: "ai" } }));
}

const PLANS = {
  starter: { name: PRICING_CONFIG.starter.name, price: PRICING_CONFIG.starter.monthlyPrice, meetingsRange: [3, 8] },
  growth: { name: PRICING_CONFIG.growth.name, price: PRICING_CONFIG.growth.monthlyPrice, meetingsRange: [8, 20] },
  scale: { name: PRICING_CONFIG.scale.name, price: PRICING_CONFIG.scale.monthlyPrice, meetingsRange: [20, 40] },
};

const MEETING_BONUS = PRICING_CONFIG.starter.meetingFee;

interface BudgetCalculatorProps {
  embedded?: boolean;
}

export function BudgetCalculator({ embedded = false }: BudgetCalculatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [targetMeetings, setTargetMeetings] = useState(10);
  const [avgDealSize, setAvgDealSize] = useState(25000);
  const [conversionRate, setConversionRate] = useState(20);

  const result = useMemo(() => {
    let plan: keyof typeof PLANS = "starter";
    if (targetMeetings > 15) plan = "scale";
    else if (targetMeetings > 6) plan = "growth";

    const planData = PLANS[plan];
    const monthlyBase = planData.price;
    const meetingsBonus = targetMeetings * MEETING_BONUS;
    const totalMonthly = monthlyBase + meetingsBonus;

    const expectedDeals = (targetMeetings * conversionRate) / 100;
    // Facteur de réalisme: cycle de vente, deals qui ne closent pas, coûts cachés, etc.
    const realismFactor = 0.25; // 25% du CA théorique pour être très conservateur
    const expectedRevenue = expectedDeals * avgDealSize * realismFactor;
    const roi = expectedRevenue > 0 ? Math.round(((expectedRevenue - totalMonthly) / totalMonthly) * 100) : 0;

    // Recommendations
    const recommendations: string[] = [];
    if (conversionRate < 15) {
      recommendations.push("Taux de conversion faible : travaillez la qualification des leads en amont.");
    }
    if (avgDealSize < 10000 && targetMeetings < 20) {
      recommendations.push("Panier moyen modeste : augmentez le volume de RDV pour atteindre vos objectifs.");
    }
    if (roi < 100) {
      recommendations.push("ROI sous 100% : envisagez d'augmenter le panier moyen ou le taux de conversion.");
    }
    if (roi > 500) {
      recommendations.push("Potentiel élevé ! Ces chiffres supposent une exécution optimale.");
    } else if (roi > 300) {
      recommendations.push("Bon potentiel ROI — résultats conditionnés à la qualité d'exécution.");
    }
    if (targetMeetings > 30 && plan !== "scale") {
      recommendations.push("Volume élevé : le plan Scale vous offrira un meilleur accompagnement.");
    }

    return {
      plan: planData.name,
      planKey: plan,
      monthlyBase,
      meetingsBonus,
      totalMonthly,
      expectedDeals: Math.round(expectedDeals),
      expectedRevenue,
      roi: Math.round(roi),
      costPerMeeting: Math.round(totalMonthly / targetMeetings),
      recommendations,
    };
  }, [targetMeetings, avgDealSize, conversionRate]);

  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Inputs + Mini ROI */}
      <motion.div
        className="bg-background border border-border rounded-xl p-6"
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Vos objectifs</h3>
          {/* Mini ROI indicator */}
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${result.roi > 0 ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600"}`}>
            ROI: {result.roi > 0 ? "+" : ""}{result.roi}%
          </div>
        </div>

        {/* Target meetings */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="targetMeetings" className="text-sm">Rendez-vous par mois</label>
            <span className="text-lg font-semibold text-accent">{targetMeetings}</span>
          </div>
          <input
            id="targetMeetings"
            type="range"
            min={3}
            max={50}
            value={targetMeetings}
            onChange={(e) => setTargetMeetings(parseInt(e.target.value, 10))}
            onInput={(e) => setTargetMeetings(parseInt((e.target as HTMLInputElement).value, 10))}
            className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>3</span>
            <span>50</span>
          </div>
        </div>

        {/* Average deal size */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="avgDealSize" className="text-sm">Panier moyen</label>
            <span className="text-lg font-semibold">{avgDealSize.toLocaleString()} €</span>
          </div>
          <input
            id="avgDealSize"
            type="range"
            min={1000}
            max={500000}
            step={1000}
            value={avgDealSize}
            onChange={(e) => setAvgDealSize(parseInt(e.target.value, 10))}
            onInput={(e) => setAvgDealSize(parseInt((e.target as HTMLInputElement).value, 10))}
            className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>1K €</span>
            <span>500K €</span>
          </div>
        </div>

        {/* Conversion rate */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="conversionRate" className="text-sm">Taux de conversion RDV → Deal</label>
            <span className="text-lg font-semibold">{conversionRate}%</span>
          </div>
          <input
            id="conversionRate"
            type="range"
            min={5}
            max={50}
            step={5}
            value={conversionRate}
            onChange={(e) => setConversionRate(parseInt(e.target.value, 10))}
            onInput={(e) => setConversionRate(parseInt((e.target as HTMLInputElement).value, 10))}
            className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>5%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Mini summary */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-foreground/[0.02] rounded-lg border border-border">
          <div className="text-center">
            <p className="text-xs text-muted">Deals/mois</p>
            <p className="text-sm font-semibold">{result.expectedDeals}</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-xs text-muted">CA potentiel</p>
            <p className="text-sm font-semibold">{(result.expectedRevenue / 1000).toFixed(0)}K €</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted">Coût/RDV</p>
            <p className="text-sm font-semibold">{result.costPerMeeting} €</p>
          </div>
        </div>

        <p className="text-xs text-muted mt-3">
          * Estimation indicative. Les résultats dépendent de votre marché et exécution.
        </p>
      </motion.div>

      {/* Results */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Plan + Investment + ROI combined */}
        <div className="bg-background border border-border rounded-xl overflow-hidden">
          {/* Plan header */}
          <div className="bg-accent text-white px-4 py-3">
            <p className="text-xs font-medium text-white/70">Plan recommandé</p>
            <p className="text-xl font-semibold">{result.plan}</p>
          </div>

          {/* Cost breakdown */}
          <div className="px-4 py-3 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted">Abonnement {result.plan}</span>
              <span className="font-mono">{result.monthlyBase.toLocaleString()} €</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted">Bonus RDV ({targetMeetings} × {MEETING_BONUS}€)</span>
              <span className="font-mono">{result.meetingsBonus.toLocaleString()} €</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-semibold">Total mensuel</span>
              <span className="text-xl font-semibold text-accent">{result.totalMonthly.toLocaleString()} €</span>
            </div>
          </div>

          {/* ROI section */}
          <div className="border-t border-border px-4 py-3 bg-foreground/[0.01]">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="p-2 rounded-lg bg-background border border-border text-center">
                <p className="text-xs text-muted">Deals/mois</p>
                <p className="text-lg font-semibold">{result.expectedDeals}</p>
              </div>
              <div className="p-2 rounded-lg bg-background border border-border text-center">
                <p className="text-xs text-muted">CA potentiel</p>
                <p className="text-lg font-semibold">{(result.expectedRevenue / 1000).toFixed(0)}K €</p>
              </div>
            </div>

            <div className={`p-3 rounded-lg text-center ${result.roi > 0 ? "bg-green-500/10 border border-green-500/20" : "bg-orange-500/10 border border-orange-500/20"}`}>
              <p className="text-xs text-muted">ROI estimé (conservateur)</p>
              <p className={`text-2xl font-bold ${result.roi > 0 ? "text-green-600" : "text-orange-600"}`}>
                {result.roi > 0 ? "+" : ""}{result.roi}%
              </p>
              <p className="text-[10px] text-muted mt-1">Basé sur 25% du CA théorique</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {result.recommendations.length > 0 && (
          <div className="border border-border rounded-lg px-3 py-2 bg-foreground/[0.02]">
            <p className="text-xs text-muted mb-1">💡 Conseil</p>
            <ul className="space-y-0.5">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="text-xs text-foreground/80">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <motion.button
          type="button"
          onClick={openAssistant}
          className="w-full py-2.5 bg-foreground text-background text-sm font-semibold rounded-lg hover:bg-foreground/90 transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          Discuter de mon projet →
        </motion.button>
      </motion.div>
    </div>
  );

  if (embedded) {
    return <div ref={ref}>{content}</div>;
  }

  return (
    <section id="calculator" className="py-16 md:py-24 bg-foreground/[0.02]" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
            Outil gratuit
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
            Estimez votre budget outbound
          </h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Calculez le coût et le ROI potentiel de votre campagne en 30 secondes.
          </p>
        </motion.div>
        {content}
      </div>
    </section>
  );
}

export default BudgetCalculator;
