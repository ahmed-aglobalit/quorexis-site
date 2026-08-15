"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ANALYSIS_POINTS = [
  "ICP — Le ciblage est-il pertinent ?",
  "Data — Les contacts sont-ils les bons ?",
  "Messaging — L'angle résonne-t-il ?",
  "Channel — Le canal est-il adapté ?",
  "Timing — Le moment est-il opportun ?",
  "Objections — Que disent les prospects ?",
  "Offer — L'offre est-elle claire et attractive ?",
];

export default function WhatIfItFails() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-foreground/[0.02]" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
              Transparence
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              Et si le marché ne répond pas ?
            </h2>
            <p className="text-lg text-muted mb-6">
              Nous n&apos;essayons pas de compenser une mauvaise campagne en augmentant simplement le volume.
            </p>
            <p className="text-muted mb-8">
              Si les résultats ne sont pas au rendez-vous, nous analysons chaque étape du funnel pour comprendre
              où se situe le blocage et comment l&apos;adresser.
            </p>

            <div className="p-6 rounded-xl bg-foreground text-background">
              <p className="font-semibold mb-2">Notre engagement</p>
              <p className="text-sm text-background/70">
                Si le problème vient du marché ou de l&apos;offre, nous vous le dirons. Nous préférons une
                conversation honnête à une campagne qui tourne dans le vide.
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-semibold text-muted mb-6">Ce que nous analysons</p>
            <div className="space-y-3">
              {ANALYSIS_POINTS.map((point, i) => (
                <motion.div
                  key={point}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border bg-background"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + 0.08 * i }}
                >
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-xs font-semibold text-accent">
                    {i + 1}
                  </div>
                  <span className="text-sm">{point}</span>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted">
              Chaque point faible identifié devient une piste d&apos;optimisation : nouveau segment,
              nouvel angle, nouvelle cadence, traitement d&apos;objection, adaptation des canaux.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
