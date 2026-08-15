"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PRICING_CONFIG, COMPARISON_TABLE, PRICING_FAQ } from "../config/pricing";
import { Link } from "@/i18n/navigation";

function openAssistant() {
  window.dispatchEvent(new CustomEvent("quorexis:open-assistant", { detail: { mode: "ai" } }));
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

type PlanConfig = typeof PRICING_CONFIG.starter | typeof PRICING_CONFIG.growth | typeof PRICING_CONFIG.scale;

function OfferCard({
  id,
  plan,
  highlights,
  isHighlight = false,
  hasTeamLead = false
}: {
  id: string;
  plan: PlanConfig;
  highlights: string[];
  isHighlight?: boolean;
  hasTeamLead?: boolean;
}) {

  return (
    <motion.div
      id={id}
      className={`relative rounded-2xl p-8 md:p-10 scroll-mt-24 ${
        isHighlight
          ? "bg-foreground text-background border-2 border-accent"
          : "bg-background border border-border"
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {isHighlight && (
        <div className="absolute -top-3 left-8 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full uppercase tracking-wider">
          Recommandé
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Info */}
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${isHighlight ? "text-background" : ""}`}>
            {plan.name}
          </h2>
          <p className={`text-lg mb-6 ${isHighlight ? "text-background/70" : "text-muted"}`}>
            {plan.tagline}
          </p>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-bold ${isHighlight ? "text-background" : ""}`}>
                {plan.monthlyPrice.toLocaleString("fr-FR")} €
              </span>
              <span className={`text-lg ${isHighlight ? "text-background/60" : "text-muted"}`}>/mois</span>
            </div>
            <p className={`text-sm mt-2 ${isHighlight ? "text-accent" : "text-accent"}`}>
              +{plan.meetingFee} € / rendez-vous qualifié tenu
            </p>
          </div>

          {/* SDR Capacity */}
          <div className={`p-4 rounded-xl mb-6 ${isHighlight ? "bg-background/10" : "bg-accent/5"}`}>
            <p className={`text-xl font-bold ${isHighlight ? "text-background" : "text-foreground"}`}>
              {plan.sdrLabel}
            </p>
            {hasTeamLead && (
              <p className={`text-sm mt-1 ${isHighlight ? "text-background/70" : "text-muted"}`}>
                Supervision Team Lead incluse
              </p>
            )}
          </div>

          <p className={`mb-6 ${isHighlight ? "text-background/80" : "text-muted"}`}>
            {plan.microcopy}
          </p>

          <button
            type="button"
            onClick={openAssistant}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isHighlight
                ? "bg-accent text-white hover:bg-accent/90"
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            Parler de mon marché
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Right: Features */}
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isHighlight ? "text-background/50" : "text-muted"}`}>
            Ce qui est inclus
          </p>
          <ul className="space-y-3">
            {highlights.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className={`w-5 h-5 shrink-0 mt-0.5 ${isHighlight ? "text-accent" : "text-accent"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className={isHighlight ? "text-background/90" : ""}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function ComparisonTable() {
  return (
    <motion.div
      className="overflow-x-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
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
                <td className="py-3 px-4 text-center">{renderCell(row.starter)}</td>
                <td className="py-3 px-4 text-center bg-accent/5">{renderCell(row.growth)}</td>
                <td className="py-3 px-4 text-center">{renderCell(row.scale)}</td>
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
            <div className="px-4 pb-4 text-sm text-muted">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function OffresPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const starterFeatures = [
    "Définition de l'ICP",
    "Recherche des entreprises cibles",
    "Recherche des décideurs",
    "Enrichissement des données",
    "Cold Email",
    "Prospection LinkedIn",
    "Séquences outbound",
    "Capacité SDR partagée",
    "Qualification des prospects",
    "Relances",
    "Prise de rendez-vous",
    "Reporting mensuel",
  ];

  const growthFeatures = [
    "Tout le contenu Starter",
    "1 SDR dédié à votre campagne",
    "Stratégie multicanale complète",
    "Cold Email + LinkedIn + Cold Calling",
    "Data enrichment avancé",
    "Personnalisation des campagnes",
    "Scripts de prospection",
    "Traitement des objections",
    "Qualification commerciale",
    "Booking des rendez-vous",
    "Optimisation continue",
    "Reporting hebdomadaire",
    "Dashboard de performance",
    "CRM setup & intégration",
  ];

  const scaleFeatures = [
    "Tout le contenu Growth",
    "2 SDR Senior dédiés",
    "Supervision Team Lead",
    "Plusieurs ICP",
    "Plusieurs marchés",
    "Campagnes multicanales avancées",
    "Cold Calling intensif",
    "Account-Based Prospecting",
    "Automatisation avancée",
    "IA pour recherche, segmentation et personnalisation",
    "A/B Testing",
    "Reporting avancé",
    "Dashboard temps réel",
    "Suivi des opportunités",
    "Playbooks sectoriels",
    "Support closing optionnel",
  ];

  return (
    <div className="bg-background" ref={ref}>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-background/50 uppercase tracking-wider mb-4">
              Tarifs transparents
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Choisissez la capacité outbound adaptée à votre ambition.
            </h1>
            <p className="text-lg text-background/70">
              De la première campagne à une véritable équipe outbound dédiée.
            </p>

            {/* Quick nav */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <button
                type="button"
                onClick={() => scrollTo("starter")}
                className="px-4 py-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
              >
                Starter · {PRICING_CONFIG.starter.monthlyPrice.toLocaleString("fr-FR")} €
              </button>
              <button
                type="button"
                onClick={() => scrollTo("growth")}
                className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 transition-colors"
              >
                Growth · {PRICING_CONFIG.growth.monthlyPrice.toLocaleString("fr-FR")} €
              </button>
              <button
                type="button"
                onClick={() => scrollTo("scale")}
                className="px-4 py-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
              >
                Scale · {PRICING_CONFIG.scale.monthlyPrice.toLocaleString("fr-FR")} €
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offers */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 space-y-8">
          <OfferCard id="starter" plan={PRICING_CONFIG.starter} highlights={starterFeatures} />
          <OfferCard id="growth" plan={PRICING_CONFIG.growth} highlights={growthFeatures} isHighlight />
          <OfferCard id="scale" plan={PRICING_CONFIG.scale} highlights={scaleFeatures} hasTeamLead />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 md:py-28 bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Comparatif détaillé</h2>
            <p className="text-muted">Toutes les fonctionnalités par formule.</p>
          </motion.div>
          <ComparisonTable />
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">
              PAS SÛR DE LA FORMULE ?
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Votre meilleure formule dépend<br />
              <span className="text-muted">de votre économie commerciale.</span>
            </h2>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              Votre panier moyen, votre marché, votre objectif de rendez-vous et votre capacité
              de closing déterminent la formule adaptée.
            </p>
            <Link
              href="/tools/budget-calculator"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200"
            >
              Calculer ma meilleure formule
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-sm text-muted mt-4">
              Besoin d&apos;aller plus loin ?{" "}
              <Link href="/tools" className="text-accent hover:underline">
                Découvrir tous nos outils →
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Questions fréquentes</h2>
          </motion.div>
          <PricingFAQ />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-background/50 uppercase tracking-wider mb-4">
              Prêt à construire votre pipeline ?
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Parlons de votre objectif commercial.
            </h2>
            <p className="text-lg text-background/70 max-w-2xl mx-auto mb-10">
              En 30 minutes, nous analysons votre cible, votre panier moyen et vos objectifs
              pour dimensionner la capacité outbound adaptée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={openAssistant}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200"
              >
                Parler de mon marché
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background/10 text-background font-semibold rounded-lg hover:bg-background/20 transition-all duration-200"
              >
                Utiliser les outils gratuits
              </Link>
            </div>
            <p className="text-sm text-background/50 mt-6">
              Outbound Strategy Call — 30 minutes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
