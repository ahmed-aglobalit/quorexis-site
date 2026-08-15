"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const OBJECTIONS = [
  { label: "Consultant interne", percent: 40 },
  { label: "Timing projet", percent: 28 },
  { label: "Budget gelé", percent: 18 },
];

const PERSONAS_PERF = [
  { label: "VP Engineering", rate: 28, trend: "up" },
  { label: "Head of Infra", rate: 19, trend: "up" },
  { label: "CTO", rate: 8, trend: "down" },
];

const CHANNELS = [
  { label: "Cold Call", rate: 24 },
  { label: "Email", rate: 16 },
  { label: "LinkedIn", rate: 12 },
];

const OPTIMIZATIONS = [
  {
    category: "Persona",
    before: "VP Eng + CTO + Head Infra",
    after: "VP Eng + Head Infra (CTO supprimé)",
  },
  {
    category: "Messaging",
    before: "\"Scalez votre infra\"",
    after: "\"Libérez vos devs du firefighting\"",
  },
];

export default function Week4Optimize() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSummary = () => {
    const el = document.getElementById("demo-summary");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="demo-week-4"
      ref={ref}
      className="min-h-[calc(100svh-80px)] py-8 md:py-12 bg-foreground/[0.02] flex flex-col"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Week 04 — Optimize
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-xs text-muted">Campagne CloudAxis</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
            Le marché nous répond.<span className="text-muted"> On ajuste.</span>
          </h2>
        </motion.div>

        {/* Market Feedback Dashboard - Compact 3 col */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Top Objections */}
          <motion.div
            className="p-4 rounded-xl bg-background border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-3">
              Top Objections
            </h4>
            <div className="space-y-2">
              {OBJECTIONS.map((obj, i) => (
                <motion.div
                  key={obj.label}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.03 }}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs">{obj.label}</span>
                    <span className="text-[10px] text-muted">{obj.percent}%</span>
                  </div>
                  <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-orange-500/60 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${obj.percent}%` } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Persona Performance */}
          <motion.div
            className="p-4 rounded-xl bg-background border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-3">
              Persona Performance
            </h4>
            <div className="space-y-2">
              {PERSONAS_PERF.map((persona, i) => (
                <motion.div
                  key={persona.label}
                  className="flex items-center justify-between p-2 rounded-lg bg-foreground/[0.02] border border-border"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.03 }}
                >
                  <span className="text-xs">{persona.label}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-bold ${
                      persona.trend === "up" ? "text-green-500" :
                      persona.trend === "down" ? "text-red-500" : "text-muted"
                    }`}>
                      {persona.rate}%
                    </span>
                    {persona.trend === "up" && (
                      <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                    {persona.trend === "down" && (
                      <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Channel Performance */}
          <motion.div
            className="p-4 rounded-xl bg-background border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-3">
              Channel Performance
            </h4>
            <div className="space-y-2">
              {CHANNELS.map((channel, i) => (
                <motion.div
                  key={channel.label}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.03 }}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs">{channel.label}</span>
                    <span className="text-xs font-bold text-accent">{channel.rate}%</span>
                  </div>
                  <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${channel.rate * 3}%` } : {}}
                      transition={{ duration: 0.5, delay: 0.35 + i * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Optimizations - Compact row */}
        <motion.div
          className="mb-6 flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
            Optimisations CloudAxis V2
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {OPTIMIZATIONS.map((opt, i) => (
              <motion.div
                key={opt.category}
                className="p-3 rounded-xl bg-background border border-border"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
              >
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-2">
                  {opt.category}
                </h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-2 rounded-lg bg-foreground/[0.02] border border-border">
                    <p className="text-[10px] text-muted line-through">{opt.before}</p>
                  </div>
                  <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <div className="flex-1 p-2 rounded-lg bg-accent/5 border border-accent/20">
                    <p className="text-[10px] font-medium">{opt.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Honesty Note - Compact */}
        <motion.div
          className="flex items-center gap-4 p-4 rounded-xl bg-foreground text-background mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <div className="flex-1">
            <p className="text-sm font-medium">Si le problème vient du marché ou de l&apos;offre, on vous le dit.</p>
            <p className="text-[10px] text-background/60">La transparence fait partie de la méthode Quorexis.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-white shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-xs font-semibold">V2 LIVE</span>
          </div>
        </motion.div>

        {/* Footer: Transition */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-border"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="text-sm text-muted">Votre premier mois est terminé.</span>
          <button
            type="button"
            onClick={scrollToSummary}
            className="group flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <span className="text-sm font-medium">Voir le résultat</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
