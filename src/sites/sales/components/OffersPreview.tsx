"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { PRICING_CONFIG } from "../config/pricing";

function openAssistant() {
  window.dispatchEvent(new CustomEvent("quorexis:open-assistant", { detail: { mode: "ai" } }));
}

const OFFERS = [
  {
    key: "starter",
    step: "01",
    stepLabel: "TEST",
    name: "STARTER",
    headline: "Lancer et valider votre outbound.",
    price: PRICING_CONFIG.starter.monthlyPrice,
    sdrLabel: "SDR partagé",
    description: "Pour valider un ICP, tester un marché et commencer à générer des conversations sans construire une équipe SDR complète.",
    highlights: ["ICP & Data", "Cold Email", "LinkedIn", "Qualification SDR"],
    outcome: "Commencez à transformer votre marché cible en conversations.",
    anchor: "starter",
  },
  {
    key: "growth",
    step: "02",
    stepLabel: "BUILD",
    name: "GROWTH",
    headline: "Transformez l'outbound en canal d'acquisition.",
    price: PRICING_CONFIG.growth.monthlyPrice,
    sdrLabel: "1 SDR dédié",
    sdrSub: "Dédié à votre campagne",
    description: "Une véritable capacité commerciale pour générer régulièrement des conversations et rendez-vous qualifiés.",
    highlights: ["1 SDR dédié", "Email + LinkedIn + Cold Call", "Data avancée", "Dashboard & optimisation"],
    outcome: "Votre équipe commerciale reçoit des opportunités. Elle se concentre sur le closing.",
    anchor: "growth",
    highlight: true,
  },
  {
    key: "scale",
    step: "03",
    stepLabel: "SCALE",
    name: "SCALE",
    headline: "Construisez une véritable force outbound.",
    price: PRICING_CONFIG.scale.monthlyPrice,
    sdrLabel: "2 SDR Senior",
    sdrSub: "+ Team Lead",
    description: "Une équipe structurée pour adresser plusieurs ICP, plusieurs marchés et augmenter fortement votre capacité de prospection.",
    highlights: ["2 SDR Senior", "Team Lead", "Multichannel", "Data + Automation + AI"],
    outcome: "Plus de capacité. Plus de conversations. Plus d'opportunités.",
    anchor: "scale",
  },
];

function OfferCard({ offer, index }: { offer: typeof OFFERS[0]; index: number }) {
  const isHighlight = offer.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Link
        href={`/offres#${offer.anchor}`}
        className={`group relative rounded-2xl p-8 flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
          isHighlight
            ? "bg-foreground text-background md:scale-[1.02]"
            : "bg-background border border-border hover:border-accent/50"
        }`}
      >
        {isHighlight && (
          <div className="absolute -top-3 left-8 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full uppercase tracking-wider">
            Recommandé
          </div>
        )}

      {/* Step */}
        <div className={`text-xs font-medium tracking-wider mb-4 ${isHighlight ? "text-background/40" : "text-muted"}`}>
          {offer.step} — {offer.stepLabel}
        </div>

        {/* Name */}
        <h3 className={`text-2xl font-bold mb-2 ${isHighlight ? "text-background" : ""}`}>
          {offer.name}
        </h3>

        {/* Headline */}
        <p className={`text-sm mb-6 ${isHighlight ? "text-background/70" : "text-muted"}`}>
          {offer.headline}
        </p>

        {/* SDR Capacity - Ce qu'on offre concrètement */}
        <div className={`p-4 rounded-xl mb-6 ${isHighlight ? "bg-background/10" : "bg-accent/5"}`}>
          <p className={`text-lg font-bold ${isHighlight ? "text-background" : "text-foreground"}`}>
            {offer.sdrLabel}
          </p>
          {offer.sdrSub && (
            <p className={`text-sm ${isHighlight ? "text-background/60" : "text-muted"}`}>
              {offer.sdrSub}
            </p>
          )}
        </div>

        {/* Description */}
        <p className={`text-sm mb-6 ${isHighlight ? "text-background/70" : "text-muted"}`}>
          {offer.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {offer.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <svg
                className={`w-4 h-4 shrink-0 ${isHighlight ? "text-accent" : "text-accent"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className={isHighlight ? "text-background/80" : ""}>{item}</span>
            </li>
          ))}
        </ul>

        {/* Outcome */}
        <p className={`text-sm font-medium mb-6 flex-1 ${isHighlight ? "text-background" : "text-foreground"}`}>
          {offer.outcome}
        </p>

        {/* Price - En bas après avoir présenté la valeur */}
        <div className={`p-4 rounded-xl mb-6 ${isHighlight ? "bg-accent/20" : "bg-foreground/5"}`}>
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl font-bold ${isHighlight ? "text-background" : ""}`}>
              {offer.price.toLocaleString("fr-FR")} €
            </span>
            <span className={`text-sm ${isHighlight ? "text-background/50" : "text-muted"}`}>/mois</span>
          </div>
          <p className={`text-xs mt-1 ${isHighlight ? "text-accent" : "text-accent"}`}>
            +50 € / rendez-vous qualifié tenu
          </p>
        </div>

        {/* CTA indicator */}
        <div className={`flex items-center justify-between pt-4 border-t ${isHighlight ? "border-background/20" : "border-border"}`}>
          <span className={`text-sm font-semibold ${isHighlight ? "text-background" : "text-foreground"}`}>
            Découvrir {offer.name}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 ${isHighlight ? "text-accent" : "text-accent"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}

export default function OffersPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="offers-preview" className="py-24 md:py-32 bg-foreground/[0.02] scroll-mt-20" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            Choisissez votre moteur outbound
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl mx-auto">
            Combien de pipeline voulez-vous construire ?
          </h2>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            Quorexis vous permet de démarrer avec une capacité ciblée, puis d&apos;augmenter progressivement
            votre puissance commerciale à mesure que votre acquisition se développe.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-16">
          {OFFERS.map((offer, index) => (
            <OfferCard key={offer.key} offer={offer} index={index} />
          ))}
        </div>

        {/* Economics message */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-medium mb-4">
            Le bon sujet n&apos;est pas seulement « combien cela coûte ? »
          </p>
          <p className="text-muted">
            C&apos;est « combien de pipeline cette capacité peut-elle créer ? »
          </p>
        </motion.div>

        {/* Pipeline visual */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="px-3 py-1.5 rounded-lg bg-foreground/5 border border-border">Investissement</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span className="px-3 py-1.5 rounded-lg bg-foreground/5 border border-border">Conversations</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span className="px-3 py-1.5 rounded-lg bg-foreground/5 border border-border">RDV qualifiés</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent font-medium">Pipeline</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              type="button"
              onClick={openAssistant}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200"
            >
              Parler de mon marché
            </button>
            <Link
              href="/tools/budget-calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-all duration-200"
            >
              Calculer mon potentiel
            </Link>
          </div>
          <Link
            href="/offres"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Voir toutes les offres en détail
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <motion.div
            className="mt-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-center text-muted mb-4">
              Et concrètement, que se passe-t-il ensuite ?
            </p>
            <motion.div
              className="flex flex-col items-center text-accent"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm font-semibold mb-1">Vos 4 premières semaines</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
