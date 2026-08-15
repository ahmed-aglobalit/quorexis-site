"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

export default function CalculatorCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-background" ref={ref}>
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        <motion.div
          className="p-8 md:p-12 rounded-2xl bg-foreground text-background text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">
            Pas sûr de la formule ?
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Calculez la capacité adaptée<br />
            <span className="text-background/50">à votre économie commerciale.</span>
          </h2>
          <p className="text-background/60 mb-8 max-w-lg mx-auto">
            Votre panier moyen, votre marché cible et vos objectifs déterminent la formule la plus pertinente.
          </p>
          <Link
            href="/tools/budget-calculator"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200"
          >
            Trouver ma formule
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
