"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const OPTIMIZATIONS = [
  { label: "ICP", before: "20–500 emp.", after: "50–250 emp." },
  { label: "Persona", before: "CEO+CTO+CFO", after: "CEO+VP Sales" },
  { label: "Messaging", before: "Generic", after: "Pain-focused" },
];

const FEEDBACK = [
  { label: "Top objection", value: "Prestataire existant", percent: 35 },
  { label: "Best persona", value: "VP Sales", percent: 24 },
  { label: "Best channel", value: "Cold Call", percent: 22 },
];

export default function Week4Optimize() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToSummary = () => {
    const el = document.getElementById("demo-summary");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="demo-week-4" ref={ref} className="py-12 md:py-16 bg-background min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-2 py-1 rounded-full bg-accent/10 text-xs font-bold text-accent">
              WEEK 04
            </span>
            <span className="text-xs text-muted">Example campaign</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Le marché répond. On optimise.
          </h2>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Market Feedback */}
          <div className="p-4 rounded-xl bg-foreground/[0.02] border border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Market Feedback</h3>
            <div className="space-y-3">
              {FEEDBACK.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.percent * 2.5}%` } : {}}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optimizations */}
          <div className="p-4 rounded-xl bg-foreground/[0.02] border border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Optimizations</h3>
            <div className="space-y-2">
              {OPTIMIZATIONS.map((opt) => (
                <div key={opt.label} className="flex items-center gap-2 text-sm">
                  <span className="text-muted w-16">{opt.label}</span>
                  <span className="line-through text-muted/50">{opt.before}</span>
                  <span className="text-accent">→</span>
                  <span className="font-medium text-accent">{opt.after}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Campaign V2 + Message */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-sm font-semibold">CAMPAIGN V2 LIVE</span>
          </div>
          <p className="text-sm text-muted max-w-md mx-auto">
            On écoute le marché, on apprend, on ajuste. Pas de pilote automatique.
          </p>
        </motion.div>

        {/* Transition */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            type="button"
            onClick={scrollToSummary}
            className="flex flex-col items-center gap-1 mx-auto text-accent hover:text-accent/80 transition-colors"
          >
            <span className="text-sm font-medium">Voir le résultat du mois</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
