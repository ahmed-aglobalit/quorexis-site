"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

const PLANS = {
  starter: { name: "Starter", price: 1099, meetingsRange: [3, 8] },
  growth: { name: "Growth", price: 2099, meetingsRange: [8, 20] },
  scale: { name: "Scale", price: 4099, meetingsRange: [20, 40] },
};

const MEETING_BONUS = 50;

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
    // Determine recommended plan
    let plan: keyof typeof PLANS = "starter";
    if (targetMeetings > 15) plan = "scale";
    else if (targetMeetings > 6) plan = "growth";

    const planData = PLANS[plan];
    const monthlyBase = planData.price;
    const meetingsBonus = targetMeetings * MEETING_BONUS;
    const totalMonthly = monthlyBase + meetingsBonus;

    // ROI calculation
    const expectedDeals = (targetMeetings * conversionRate) / 100;
    const expectedRevenue = expectedDeals * avgDealSize;
    const roi = expectedRevenue > 0 ? ((expectedRevenue - totalMonthly) / totalMonthly) * 100 : 0;

    return {
      plan: planData.name,
      monthlyBase,
      meetingsBonus,
      totalMonthly,
      expectedDeals: Math.round(expectedDeals * 10) / 10,
      expectedRevenue,
      roi: Math.round(roi),
      costPerMeeting: Math.round(totalMonthly / targetMeetings),
    };
  }, [targetMeetings, avgDealSize, conversionRate]);

  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Inputs */}
          <motion.div
            className="bg-background border border-border rounded-2xl p-8"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-8">Vos objectifs</h3>

            {/* Target meetings */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Rendez-vous par mois</label>
                <span className="text-2xl font-semibold text-accent">{targetMeetings}</span>
              </div>
              <input
                type="range"
                min="3"
                max="50"
                value={targetMeetings}
                onChange={(e) => setTargetMeetings(Number(e.target.value))}
                className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-xs text-muted mt-2">
                <span>3</span>
                <span>50</span>
              </div>
            </div>

            {/* Average deal size */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Panier moyen</label>
                <span className="text-2xl font-semibold">{avgDealSize.toLocaleString()} €</span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={avgDealSize}
                onChange={(e) => setAvgDealSize(Number(e.target.value))}
                className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-xs text-muted mt-2">
                <span>5K €</span>
                <span>200K €</span>
              </div>
            </div>

            {/* Conversion rate */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Taux de conversion RDV → Deal</label>
                <span className="text-2xl font-semibold">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-xs text-muted mt-2">
                <span>5%</span>
                <span>50%</span>
              </div>
            </div>

            <p className="text-xs text-muted">
              * Estimation indicative basée sur vos paramètres. Les résultats réels dépendent de votre marché, offre et exécution.
            </p>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Recommended plan */}
            <div className="bg-accent text-white rounded-2xl p-8 mb-6">
              <p className="text-sm font-medium text-white/70 mb-2">Plan recommandé</p>
              <p className="text-3xl font-semibold">{result.plan}</p>
            </div>

            {/* Cost breakdown */}
            <div className="bg-background border border-border rounded-2xl p-8 mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted mb-6">
                Votre investissement mensuel
              </h4>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted">Abonnement {result.plan}</span>
                  <span className="font-mono">{result.monthlyBase.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Bonus RDV ({targetMeetings} × {MEETING_BONUS}€)</span>
                  <span className="font-mono">{result.meetingsBonus.toLocaleString()} €</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="font-semibold">Total mensuel</span>
                  <span className="text-2xl font-semibold text-accent">{result.totalMonthly.toLocaleString()} €</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-foreground/[0.02] border border-border">
                <p className="text-sm text-muted">
                  Coût par rendez-vous : <span className="font-semibold text-foreground">{result.costPerMeeting} €</span>
                </p>
              </div>
            </div>

            {/* ROI */}
            <div className="bg-background border border-border rounded-2xl p-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted mb-6">
                Retour sur investissement potentiel
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-foreground/[0.02]">
                  <p className="text-xs text-muted mb-1">Deals attendus/mois</p>
                  <p className="text-2xl font-semibold">{result.expectedDeals}</p>
                </div>
                <div className="p-4 rounded-lg bg-foreground/[0.02]">
                  <p className="text-xs text-muted mb-1">CA potentiel</p>
                  <p className="text-2xl font-semibold">{(result.expectedRevenue / 1000).toFixed(0)}K €</p>
                </div>
              </div>

              <div className={`p-6 rounded-xl text-center ${result.roi > 0 ? "bg-green-500/10 border border-green-500/20" : "bg-orange-500/10 border border-orange-500/20"}`}>
                <p className="text-sm text-muted mb-2">ROI estimé</p>
                <p className={`text-4xl font-bold ${result.roi > 0 ? "text-green-500" : "text-orange-500"}`}>
                  {result.roi > 0 ? "+" : ""}{result.roi}%
                </p>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              type="button"
              onClick={() => scrollTo("contact")}
              className="w-full mt-6 py-4 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 hover:-translate-y-0.5 transition-all duration-200"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
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
    <section id="calculator" className="py-24 md:py-36 bg-foreground/[0.02]" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            Outil gratuit
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Estimez votre budget outbound
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Calculez le coût et le ROI potentiel de votre campagne en 30 secondes.
          </p>
        </motion.div>
        {content}
      </div>
    </section>
  );
}

export default BudgetCalculator;
