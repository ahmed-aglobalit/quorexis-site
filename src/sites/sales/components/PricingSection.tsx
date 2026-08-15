"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

const PLANS = [
  {
    name: "Starter",
    price: "1 099",
    tagline: "Lancez votre première campagne outbound",
    description: "Pour valider rapidement un marché et tester l'outbound.",
    sdr: "SDR partagé",
    sdrNote: "Accès à notre équipe SDR",
    features: [
      "Définition de l'ICP",
      "Recherche et qualification prospects",
      "Enrichissement des données",
      "Cold emailing",
      "Prospection LinkedIn",
      "Séquences outbound",
      "Qualification des prospects",
      "Reporting mensuel",
    ],
    bonus: "+50 € / rendez-vous confirmé",
    highlight: false,
    cta: "Commencer",
  },
  {
    name: "Growth",
    price: "2 099",
    tagline: "Générez des rendez-vous réguliers",
    description: "Pour les entreprises qui veulent une machine outbound fiable.",
    sdr: "1 SDR dédié",
    sdrNote: "Votre commercial attitré",
    features: [
      "Tout le contenu Starter",
      "Stratégie multicanale complète",
      "Email + LinkedIn + Cold Calling",
      "Data enrichment avancé",
      "Personnalisation des campagnes",
      "Optimisation continue",
      "Reporting hebdomadaire",
      "Dashboard de performance",
    ],
    bonus: "+50 € / rendez-vous confirmé",
    highlight: true,
    cta: "Choisir Growth",
  },
  {
    name: "Scale",
    price: "4 099",
    tagline: "Industrialisez votre acquisition",
    description: "Pour scaler avec plusieurs marchés et une équipe senior.",
    sdr: "1 SDR Senior dédié",
    sdrNote: "Expert prospection B2B",
    features: [
      "Tout le contenu Growth",
      "Plusieurs ICP / marchés",
      "Campagnes multicanales avancées",
      "Cold Calling intensif",
      "Automatisation et IA",
      "A/B testing des campagnes",
      "Reporting avancé temps réel",
      "Suivi des opportunités",
      "Account-based prospecting",
    ],
    bonus: "+50 € / rendez-vous confirmé",
    highlight: false,
    cta: "Passer à Scale",
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [annual, setAnnual] = useState(false);

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
            Choisissez votre niveau d&apos;ambition
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Pas de frais cachés. Pas d&apos;engagement long terme. Résultats mesurables.
          </p>
        </motion.div>

        {/* Guarantee badge */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-green-600">
              SDR validés et formés • Données 100% propriétaires • Sortie sous 30 jours
            </span>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? "bg-foreground text-background border-2 border-accent md:scale-[1.02] shadow-xl shadow-accent/10"
                  : "bg-background border border-border hover:border-accent/30 hover:shadow-lg"
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                  Recommandé
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-semibold ${plan.highlight ? "text-background" : ""}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.highlight ? "text-background/70" : "text-muted"}`}>
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-semibold ${plan.highlight ? "text-background" : ""}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${plan.highlight ? "text-background/70" : "text-muted"}`}>
                    €/mois
                  </span>
                </div>
                <p className={`text-sm mt-2 ${plan.highlight ? "text-accent" : "text-accent"}`}>
                  {plan.bonus}
                </p>
              </div>

              <p className={`text-sm mb-6 ${plan.highlight ? "text-background/80" : "text-muted"}`}>
                {plan.description}
              </p>

              {/* SDR Badge */}
              <div className={`mb-6 p-4 rounded-lg ${plan.highlight ? "bg-accent/20" : "bg-accent/10"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${plan.highlight ? "bg-accent" : "bg-accent/20"}`}>
                    <svg className={`w-5 h-5 ${plan.highlight ? "text-white" : "text-accent"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${plan.highlight ? "text-background" : "text-foreground"}`}>
                      {plan.sdr}
                    </p>
                    <p className={`text-xs ${plan.highlight ? "text-background/70" : "text-muted"}`}>
                      {plan.sdrNote}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`border-t pt-6 mb-8 ${plan.highlight ? "border-background/20" : "border-border"}`}>
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlight ? "text-accent" : "text-accent"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className={`text-sm ${plan.highlight ? "text-background/90" : ""}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? "bg-accent text-white hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg"
                    : "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border hover:-translate-y-0.5"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-muted mb-4">
            Besoin d&apos;une solution sur mesure pour plusieurs marchés ?
          </p>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="text-accent font-medium hover:underline"
          >
            Contactez-nous pour un devis personnalisé →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
