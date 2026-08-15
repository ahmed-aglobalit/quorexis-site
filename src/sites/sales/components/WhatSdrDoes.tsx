"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SDR_TASKS = [
  { task: "Formé à votre offre", desc: "Comprend votre proposition de valeur, vos différenciateurs et vos personas" },
  { task: "Contacte les prospects", desc: "Emails, LinkedIn, appels — selon la stratégie multicanale définie" },
  { task: "Gère les relances", desc: "Suit les séquences, adapte le timing et personnalise les follow-ups" },
  { task: "Traite les objections", desc: "Répond aux premières résistances avec les arguments préparés" },
  { task: "Qualifie les conversations", desc: "Vérifie le fit ICP, le besoin, le timing et le pouvoir de décision" },
  { task: "Documente les échanges", desc: "Capture le contexte, les objections et les signaux d'achat" },
  { task: "Booke les rendez-vous", desc: "Planifie directement dans votre agenda avec un briefing contextuel" },
];

export default function WhatSdrDoes() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-foreground/[0.02]" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            Votre équipe étendue
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Que fait réellement votre SDR Quorexis ?
          </h2>
          <p className="text-lg text-muted mb-12">
            Votre SDR devient l&apos;extension de votre équipe commerciale. Il ne se contente pas
            d&apos;envoyer des emails — il crée de vraies conversations et qualifie de vraies opportunités.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SDR_TASKS.map((item, i) => (
            <motion.div
              key={item.task}
              className="p-5 rounded-xl border border-border bg-background hover:border-accent/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.task}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 p-6 rounded-xl bg-foreground text-background"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-sm text-background/60 mb-2">À propos de &quot;SDR dédié&quot;</p>
          <p className="text-sm text-background/80">
            Un SDR dédié à votre campagne intervient directement sur vos actions de prospection,
            conversations, relances, qualification et prise de rendez-vous. La capacité exacte
            dépend de la formule choisie. Pour Scale, un Team Lead supervise l&apos;équipe.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
