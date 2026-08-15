"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const GOOD_FIT = [
  "Vous vendez un produit ou service B2B à valeur significative",
  "Votre marché cible est identifiable (industrie, taille, persona)",
  "Il existe suffisamment de comptes cibles à prospecter",
  "Vous avez une équipe capable de closer les opportunités",
  "Vous cherchez un pipeline régulier et prévisible",
];

const NOT_FIT = [
  "Votre offre n'est pas encore commercialisable",
  "Votre panier moyen ne justifie pas une prospection humaine",
  "Votre marché est extrêmement limité (moins de 500 comptes)",
  "Vous cherchez uniquement le volume d'appels le moins cher",
  "Personne chez vous ne peut traiter les opportunités générées",
];

export default function FitNotFit() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            Qualification
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Est-ce que Quorexis est fait pour vous ?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Good fit */}
          <motion.div
            className="p-8 rounded-2xl border border-accent/20 bg-accent/5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Quorexis fonctionne bien si...</h3>
            </div>
            <ul className="space-y-4">
              {GOOD_FIT.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not fit */}
          <motion.div
            className="p-8 rounded-2xl border border-border bg-foreground/[0.02]"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Ce n&apos;est probablement pas pour vous si...</h3>
            </div>
            <ul className="space-y-4">
              {NOT_FIT.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-muted shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span className="text-sm text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          className="mt-10 text-center text-sm text-muted"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Nous ne prenons pas tous les projets. Nous préférons travailler avec des entreprises
          où notre méthode a du sens économiquement.
        </motion.p>
      </div>
    </section>
  );
}
