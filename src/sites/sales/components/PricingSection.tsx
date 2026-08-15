"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PRICING_CONFIG, COMPARISON_TABLE, PRICING_FAQ, QUALIFIED_MEETING_DEFINITION } from "../config/pricing";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-8 h-8 ${className}`} fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="7" r="4" />
      <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" />
    </svg>
  );
}

function StarterVisual() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <PersonIcon className="text-muted/40" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent/20 rounded-full" />
      </div>
      <p className="text-sm text-muted">Capacité mutualisée</p>
    </div>
  );
}

function GrowthVisual() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <PersonIcon className="text-accent" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
          <span className="text-[10px] text-white font-bold">1</span>
        </div>
      </div>
      <p className="text-sm text-background/70">Votre SDR attitré</p>
    </div>
  );
}

function ScaleVisual() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-end gap-1">
        <PersonIcon className="text-accent w-7 h-7" />
        <div className="relative">
          <PersonIcon className="text-accent w-9 h-9" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <PersonIcon className="text-accent w-7 h-7" />
      </div>
      <p className="text-sm text-muted">Équipe dédiée + supervision</p>
    </div>
  );
}

function MeetingFeeTooltip() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1 text-accent hover:underline cursor-help"
      >
        +50 € / rendez-vous qualifié tenu
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-foreground text-background rounded-lg shadow-xl text-sm">
          <p className="font-semibold mb-2">{QUALIFIED_MEETING_DEFINITION.title}</p>
          <ul className="space-y-1">
            {QUALIFIED_MEETING_DEFINITION.criteria.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-background/80">{c}</span>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
            <div className="border-8 border-transparent border-t-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

function PricingCard({
  plan,
  visual,
  index
}: {
  plan: typeof PRICING_CONFIG.starter | typeof PRICING_CONFIG.growth | typeof PRICING_CONFIG.scale;
  visual: React.ReactNode;
  index: number;
}) {
  const isHighlight = plan.highlight;
  const hasTeamLead = "teamLead" in plan && plan.teamLead;

  return (
    <motion.div
      className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 flex flex-col ${
        isHighlight
          ? "bg-foreground text-background border-2 border-accent md:scale-[1.02] shadow-xl shadow-accent/10"
          : "bg-background border border-border hover:border-accent/30 hover:shadow-lg"
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      {isHighlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full uppercase tracking-wider">
          Recommandé
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className={`text-2xl font-bold ${isHighlight ? "text-background" : ""}`}>
          {plan.name}
        </h3>
        <p className={`text-sm mt-1 ${isHighlight ? "text-background/70" : "text-muted"}`}>
          {plan.tagline}
        </p>
      </div>

      {/* Visual */}
      <div className={`py-6 rounded-xl mb-6 ${isHighlight ? "bg-background/10" : "bg-foreground/[0.02] border border-border"}`}>
        {visual}
      </div>

      {/* SDR Capacity - Main highlight */}
      <div className={`text-center p-4 rounded-xl mb-6 ${isHighlight ? "bg-accent/20" : "bg-accent/10"}`}>
        <p className={`text-lg font-bold ${isHighlight ? "text-background" : "text-foreground"}`}>
          {plan.sdrLabel}
        </p>
        {hasTeamLead && (
          <p className={`text-sm mt-1 ${isHighlight ? "text-background/70" : "text-muted"}`}>
            Supervision Team Lead incluse
          </p>
        )}
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className={`text-4xl font-bold ${isHighlight ? "text-background" : ""}`}>
            {plan.monthlyPrice.toLocaleString("fr-FR")}
          </span>
          <span className={`text-lg ${isHighlight ? "text-background/70" : "text-muted"}`}>
            €/mois
          </span>
        </div>
        <p className={`text-sm mt-2 ${isHighlight ? "text-accent" : "text-accent"}`}>
          <MeetingFeeTooltip />
        </p>
        <p className={`text-xs mt-2 ${isHighlight ? "text-background/60" : "text-muted"}`}>
          {plan.positioning}
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={() => scrollTo("contact")}
        className={`w-full py-4 rounded-lg font-semibold text-sm transition-all duration-200 mb-6 ${
          isHighlight
            ? "bg-accent text-white hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg"
            : "bg-foreground text-background hover:bg-foreground/90 hover:-translate-y-0.5"
        }`}
      >
        {plan.cta}
      </button>

      {/* Features */}
      <div className={`border-t pt-6 flex-1 ${isHighlight ? "border-background/20" : "border-border"}`}>
        <p className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isHighlight ? "text-background/60" : "text-muted"}`}>
          Ce qui est inclus
        </p>
        <ul className="space-y-2.5">
          {plan.features.slice(0, 8).map((feature, j) => (
            <li key={j} className="flex items-start gap-2.5">
              <svg
                className={`w-4 h-4 shrink-0 mt-0.5 ${isHighlight ? "text-accent" : "text-accent"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className={`text-sm ${isHighlight ? "text-background/90" : ""}`}>
                {feature}
              </span>
            </li>
          ))}
          {plan.features.length > 8 && (
            <li className={`text-sm ${isHighlight ? "text-background/60" : "text-muted"}`}>
              + {plan.features.length - 8} autres fonctionnalités
            </li>
          )}
        </ul>
      </div>

      {/* Microcopy */}
      <p className={`text-xs text-center mt-6 italic ${isHighlight ? "text-background/50" : "text-muted"}`}>
        {plan.microcopy}
      </p>
    </motion.div>
  );
}

function ComparisonTable() {
  return (
    <motion.div
      className="mt-20 overflow-x-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold text-center mb-8">Comparatif détaillé</h3>
      <div className="min-w-[700px]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold">Fonctionnalité</th>
              <th className="text-center py-4 px-4 font-semibold">Starter</th>
              <th className="text-center py-4 px-4 font-semibold bg-accent/5 rounded-t-lg">Growth</th>
              <th className="text-center py-4 px-4 font-semibold">Scale</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_TABLE.map((row, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-3 px-4 text-muted">{row.feature}</td>
                <td className="py-3 px-4 text-center">
                  {renderCell(row.starter)}
                </td>
                <td className="py-3 px-4 text-center bg-accent/5">
                  {renderCell(row.growth)}
                </td>
                <td className="py-3 px-4 text-center">
                  {renderCell(row.scale)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function renderCell(value: string | boolean) {
  if (value === true) {
    return (
      <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  if (value === "—" || value === false) {
    return <span className="text-muted">—</span>;
  }
  return <span>{value}</span>;
}

function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="mt-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold text-center mb-8">Questions fréquentes</h3>
      <div className="max-w-3xl mx-auto space-y-3">
        {PRICING_FAQ.map((item, i) => (
          <div key={i} className="border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-foreground/[0.02] transition-colors"
            >
              <span className="font-medium">{item.question}</span>
              <svg
                className={`w-5 h-5 text-muted transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 text-sm text-muted">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 md:py-36 bg-background" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            Tarifs transparents
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Choisissez la puissance de votre moteur outbound.
          </h2>
          <p className="mt-6 text-lg text-muted max-w-3xl mx-auto">
            Que vous souhaitiez tester un marché, construire un canal d&apos;acquisition récurrent
            ou industrialiser votre prospection, Quorexis adapte la capacité humaine et technologique
            à vos objectifs.
          </p>
        </motion.div>

        {/* Value proposition */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {["Data", "Automation", "Multichannel", "SDR", "Qualification", "Reporting"].map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-full bg-foreground/5 border border-border text-sm text-muted"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          <PricingCard plan={PRICING_CONFIG.starter} visual={<StarterVisual />} index={0} />
          <PricingCard plan={PRICING_CONFIG.growth} visual={<GrowthVisual />} index={1} />
          <PricingCard plan={PRICING_CONFIG.scale} visual={<ScaleVisual />} index={2} />
        </div>

        {/* Comparison table */}
        <ComparisonTable />

        {/* FAQ */}
        <PricingFAQ />

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Vous ne savez pas quelle formule choisir ?
          </h3>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            Chaque entreprise possède un marché, un panier moyen et un cycle commercial différents.
            Parlez-nous de votre cible et nous vous aiderons à dimensionner la capacité outbound adaptée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
              Construire mon pipeline
            </button>
            <button
              type="button"
              onClick={() => {
                const calc = document.getElementById("budget-calc");
                if (calc) {
                  const top = calc.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="px-8 py-4 bg-foreground/5 text-foreground font-semibold rounded-lg border border-border hover:bg-foreground/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              Calculer mon potentiel
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
