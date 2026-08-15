"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PRICING_CONFIG } from "../config/pricing";

type OfferKey = "starter" | "growth" | "scale";

interface OfferCardData {
  key: OfferKey;
  step: string;
  stepLabel: string;
  name: string;
  headline: string;
  price: number;
  sdrLabel: string;
  sdrSub?: string;
  description: string;
  highlights: string[];
  cta: string;
  anchor: string;
  highlight?: boolean;
}

const OFFERS: OfferCardData[] = [
  {
    key: "starter",
    step: "01",
    stepLabel: "TEST",
    name: "STARTER",
    headline: "Lancez votre première campagne outbound.",
    price: PRICING_CONFIG.starter.monthlyPrice,
    sdrLabel: "SDR partagé",
    description: "Pour valider rapidement un marché et tester votre stratégie outbound.",
    highlights: ["ICP & Targeting", "Cold Email", "LinkedIn", "Data Enrichment", "Reporting"],
    cta: "Voir Starter",
    anchor: "pricing-starter",
  },
  {
    key: "growth",
    step: "02",
    stepLabel: "BUILD",
    name: "GROWTH",
    headline: "Générez des rendez-vous régulièrement.",
    price: PRICING_CONFIG.growth.monthlyPrice,
    sdrLabel: "1 SDR dédié",
    sdrSub: "Dédié à votre campagne",
    description: "Pour construire une machine outbound régulière et multicanale.",
    highlights: ["Cold Email", "LinkedIn", "Cold Calling", "Dashboard", "CRM", "Optimisation continue"],
    cta: "Voir Growth",
    anchor: "pricing-growth",
    highlight: true,
  },
  {
    key: "scale",
    step: "03",
    stepLabel: "SCALE",
    name: "SCALE",
    headline: "Industrialisez votre acquisition.",
    price: PRICING_CONFIG.scale.monthlyPrice,
    sdrLabel: "2 SDR Senior",
    sdrSub: "+ Team Lead",
    description: "Pour augmenter votre capacité commerciale sur plusieurs ICP et marchés.",
    highlights: ["Multi-market", "AI & Automation", "Account-Based", "Advanced Reporting"],
    cta: "Voir Scale",
    anchor: "pricing-scale",
  },
];

function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function SdrCapacityVisual({ offer }: { offer: OfferCardData }) {
  if (offer.key === "starter") {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-foreground/20" />
        <div className="w-3 h-3 rounded-full bg-foreground/10" />
        <div className="w-3 h-3 rounded-full bg-foreground/10" />
      </div>
    );
  }
  if (offer.key === "growth") {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-3.5 h-3.5 rounded-full bg-accent" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-3.5 h-3.5 rounded-full bg-accent" />
      <div className="w-3.5 h-3.5 rounded-full bg-accent" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-500/20" />
    </div>
  );
}

function OfferCard({ offer, index }: { offer: OfferCardData; index: number }) {
  const isHighlight = offer.highlight;

  return (
    <motion.button
      type="button"
      onClick={() => scrollToAnchor(offer.anchor)}
      className={`group relative text-left rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer flex flex-col
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        ${isHighlight
          ? "bg-foreground text-background border-2 border-accent md:scale-[1.02] shadow-xl"
          : "bg-background border border-border hover:border-foreground/30 hover:shadow-lg"
        }
        hover:-translate-y-1
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      aria-label={`Voir les détails de l'offre ${offer.name}`}
    >
      {/* Recommended badge */}
      {isHighlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full uppercase tracking-wider">
          Recommandé
        </div>
      )}

      {/* Step indicator */}
      <div className={`text-xs font-medium tracking-wider mb-4 ${isHighlight ? "text-background/50" : "text-muted"}`}>
        {offer.step} — {offer.stepLabel}
      </div>

      {/* Name */}
      <h3 className={`text-xl font-bold tracking-tight mb-2 ${isHighlight ? "text-background" : "text-foreground"}`}>
        {offer.name}
      </h3>

      {/* Headline */}
      <p className={`text-sm mb-5 ${isHighlight ? "text-background/70" : "text-muted"}`}>
        {offer.headline}
      </p>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-bold ${isHighlight ? "text-background" : "text-foreground"}`}>
            {offer.price.toLocaleString("fr-FR")} €
          </span>
          <span className={`text-sm ${isHighlight ? "text-background/60" : "text-muted"}`}>/mois</span>
        </div>
        <p className={`text-xs mt-1 ${isHighlight ? "text-accent" : "text-accent"}`}>
          +{PRICING_CONFIG.starter.meetingFee} € / rendez-vous qualifié tenu
        </p>
      </div>

      {/* SDR Capacity */}
      <div className={`flex items-center gap-3 p-3 rounded-lg mb-5 ${isHighlight ? "bg-background/10" : "bg-foreground/[0.03] border border-border"}`}>
        <SdrCapacityVisual offer={offer} />
        <div>
          <p className={`text-sm font-semibold ${isHighlight ? "text-background" : "text-foreground"}`}>
            {offer.sdrLabel}
          </p>
          {offer.sdrSub && (
            <p className={`text-xs ${isHighlight ? "text-background/60" : "text-muted"}`}>
              {offer.sdrSub}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <p className={`text-sm mb-5 ${isHighlight ? "text-background/70" : "text-muted"}`}>
        {offer.description}
      </p>

      {/* Highlights */}
      <ul className="space-y-2 mb-6 flex-1">
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
            <span className={isHighlight ? "text-background/80" : "text-foreground/80"}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className={`flex items-center justify-between pt-4 border-t ${isHighlight ? "border-background/20" : "border-border"}`}>
        <span className={`text-sm font-semibold ${isHighlight ? "text-background" : "text-foreground"}`}>
          {offer.cta}
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
    </motion.button>
  );
}

export default function OffersPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            Choose your outbound capacity
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl mx-auto">
            Une formule pour chaque étape de votre croissance.
          </h2>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            Quorexis adapte la capacité humaine, la technologie et les canaux de prospection à votre niveau d&apos;ambition.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-12">
          {OFFERS.map((offer, index) => (
            <OfferCard key={offer.key} offer={offer} index={index} />
          ))}
        </div>

        {/* Bottom CTAs */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            type="button"
            onClick={() => scrollToAnchor("pricing")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors"
          >
            Comparer les offres en détail
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          <div className="mt-10 pt-10 border-t border-border max-w-2xl mx-auto">
            <p className="text-lg font-medium mb-2">Pas sûr de la formule adaptée ?</p>
            <p className="text-muted mb-6">
              Dites-nous votre marché, votre panier moyen et vos objectifs.
              Nous vous aiderons à dimensionner votre capacité outbound.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => scrollToAnchor("budget-calc")}
                className="px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-all duration-200"
              >
                Calculer mon potentiel
              </button>
              <button
                type="button"
                onClick={() => scrollToAnchor("contact")}
                className="px-6 py-3 bg-background text-foreground font-semibold rounded-lg border border-border hover:border-foreground/30 transition-all duration-200"
              >
                Parler à un expert
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
