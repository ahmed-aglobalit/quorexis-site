"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

function openAssistant() {
  window.dispatchEvent(new CustomEvent("quorexis:open-assistant", { detail: { mode: "ai" } }));
}

export default function FinalCtaV2() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-foreground text-background overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cta-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-gradient)" />
        </svg>
      </div>

      {/* Animated nodes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-accent/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-accent/20"
          animate={{ scale: [1, 2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-accent/25"
          animate={{ scale: [1, 1.8, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="relative py-32 md:py-40">
        <div className="mx-auto max-w-[900px] px-6 md:px-12 text-center">
          {/* Label */}
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-accent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Let&apos;s Talk
          </motion.p>

          {/* Main headline */}
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15]"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Votre marché existe.
          </motion.h2>
          <motion.h3
            className="mt-3 text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15] text-background/50"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Construisons ensemble le pipeline pour l&apos;atteindre.
          </motion.h3>

          {/* Description */}
          <motion.p
            className="mt-8 text-lg text-background/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            En 30 minutes, nous analysons votre cible, votre panier moyen, votre organisation commerciale
            et vos objectifs afin de voir quelle capacité outbound pourrait être pertinente.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              type="button"
              onClick={openAssistant}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white text-base font-semibold rounded-lg hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30 active:translate-y-0 transition-all duration-200"
            >
              Parler à un expert
              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </button>
            <Link
              href="/offres"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background/10 text-background text-base font-semibold rounded-lg hover:bg-background/20 transition-all duration-200"
            >
              Voir les offres
            </Link>
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="mt-6 text-sm text-background/40"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Outbound Strategy Call — 30 minutes
          </motion.p>
        </div>
      </div>
    </section>
  );
}
