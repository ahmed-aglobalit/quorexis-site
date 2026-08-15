"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WEEKS = [
  {
    week: "Semaine 1",
    title: "Comprendre votre marché",
    items: ["Offre & proposition de valeur", "Meilleurs clients actuels", "ICP & personas", "Objections fréquentes", "Cycle commercial"],
    output: "Outbound Strategy",
  },
  {
    week: "Semaine 2",
    title: "Construire la machine",
    items: ["Sourcing des comptes", "Enrichissement contacts", "Scripts & messaging", "Séquences multicanales", "Infrastructure email/LinkedIn"],
    output: "Campaign Ready",
  },
  {
    week: "Semaine 3",
    title: "Lancer",
    items: ["Cold Email", "LinkedIn outreach", "Cold Calling", "Suivi des réponses", "Premières conversations"],
    output: "Live Campaign",
  },
  {
    week: "Semaine 4",
    title: "Apprendre et optimiser",
    items: ["Analyse des conversations", "Traitement des objections", "Ajustement du ciblage", "Optimisation messaging", "Premiers rendez-vous"],
    output: "First Learnings",
  },
];

export default function First30Days() {
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
            Réduction du risque
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Vos 30 premiers jours avec Quorexis
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Pas besoin de tout construire avant de commencer. En un mois, vous saurez comment
            votre marché réagit réellement à une approche outbound structurée.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WEEKS.map((week, i) => (
            <motion.div
              key={week.week}
              className="relative p-6 rounded-xl border border-border bg-foreground/[0.01]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
            >
              <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">
                {week.week}
              </div>
              <h3 className="text-lg font-semibold mb-4">{week.title}</h3>
              <ul className="space-y-2 mb-6">
                {week.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted">
                    <div className="w-1 h-1 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted mb-1">Output</p>
                <p className="text-sm font-semibold text-accent">{week.output}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-lg font-medium">
            En 30 jours, vous commencez à savoir comment votre marché réagit réellement.
          </p>
          <p className="text-sm text-muted mt-2">
            Pas de promesse de résultats garantis — mais une vraie lecture de votre potentiel outbound.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
