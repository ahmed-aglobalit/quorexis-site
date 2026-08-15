"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const OBJECTIONS = [
  { label: "Déjà un prestataire", percent: 35 },
  { label: "Timing", percent: 25 },
  { label: "Budget", percent: 20 },
  { label: "Mauvais persona", percent: 12 },
  { label: "Pas de projet", percent: 8 },
];

const PERSONAS_PERF = [
  { label: "CEO", rate: 18, trend: "up" },
  { label: "VP Sales", rate: 24, trend: "up" },
  { label: "CTO", rate: 6, trend: "down" },
  { label: "Head of Growth", rate: 15, trend: "stable" },
];

const CHANNELS = [
  { label: "Cold Call", rate: 22 },
  { label: "Email", rate: 14 },
  { label: "LinkedIn", rate: 11 },
];

const OPTIMIZATIONS = [
  {
    category: "ICP",
    before: "20–500 employees",
    after: "50–250 employees",
  },
  {
    category: "Persona",
    before: "CEO + CTO + CFO",
    after: "CEO + VP Sales",
  },
  {
    category: "Messaging",
    before: "Generic efficiency angle",
    after: "Specific pipeline pain",
  },
  {
    category: "Cold Call",
    before: "Opening V1",
    after: "Opening V2 — Direct pain",
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
    <section id="demo-week-4" ref={ref} className="py-24 md:py-32 bg-foreground/[0.02]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Week 04 — Optimize
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-xs text-muted">Example campaign</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-6">
            Maintenant, le marché<br />
            <span className="text-muted">commence à nous répondre.</span>
          </h2>
          <p className="text-lg text-muted max-w-3xl">
            Chaque conversation produit de l&apos;information. Quorexis utilise cette information pour améliorer la campagne.
          </p>
        </motion.div>

        {/* Market Feedback Dashboard */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-6">
            Market Feedback
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Top Objections */}
            <div className="p-6 rounded-2xl bg-background border border-border">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                Top Objections
              </h4>
              <div className="space-y-3">
                {OBJECTIONS.map((obj, i) => (
                  <motion.div
                    key={obj.label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{obj.label}</span>
                        <span className="text-xs text-muted">{obj.percent}%</span>
                      </div>
                      <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-orange-500/60 rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${obj.percent}%` } : {}}
                          transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Persona Performance */}
            <div className="p-6 rounded-2xl bg-background border border-border">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                Persona Performance
              </h4>
              <div className="space-y-3">
                {PERSONAS_PERF.map((persona, i) => (
                  <motion.div
                    key={persona.label}
                    className="flex items-center justify-between p-3 rounded-lg bg-foreground/[0.02] border border-border"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                  >
                    <span className="text-sm font-medium">{persona.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${
                        persona.trend === "up" ? "text-green-500" :
                        persona.trend === "down" ? "text-red-500" : "text-muted"
                      }`}>
                        {persona.rate}%
                      </span>
                      {persona.trend === "up" && (
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path d="M5 15l7-7 7 7" />
                        </svg>
                      )}
                      {persona.trend === "down" && (
                        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Channel Performance */}
            <div className="p-6 rounded-2xl bg-background border border-border">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                Channel Performance
              </h4>
              <div className="space-y-4">
                {CHANNELS.map((channel, i) => (
                  <motion.div
                    key={channel.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{channel.label}</span>
                      <span className="text-sm font-bold text-accent">{channel.rate}%</span>
                    </div>
                    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${channel.rate * 4}%` } : {}}
                        transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Optimization */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-6">
            Quorexis Optimization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OPTIMIZATIONS.map((opt, i) => (
              <motion.div
                key={opt.category}
                className="p-6 rounded-2xl bg-background border border-border"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
              >
                <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                  {opt.category}
                </h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1 p-3 rounded-lg bg-foreground/[0.02] border border-border">
                    <p className="text-xs text-muted mb-1">Before</p>
                    <p className="text-sm line-through text-muted">{opt.before}</p>
                  </div>
                  <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <div className="flex-1 p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <p className="text-xs text-accent mb-1">After</p>
                    <p className="text-sm font-medium">{opt.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Campaign V2 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="font-semibold">CAMPAIGN V2 LIVE</span>
          </div>
        </motion.div>

        {/* Key Messages */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <blockquote className="text-xl md:text-2xl font-medium mb-6">
            &ldquo;Quorexis ne fait pas tourner votre campagne en pilote automatique.
            <br />
            <span className="text-accent">Nous écoutons le marché, nous apprenons et nous ajustons.</span>&rdquo;
          </blockquote>
        </motion.div>

        {/* Honesty Note */}
        <motion.div
          className="p-6 rounded-2xl bg-foreground text-background text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            Si le problème vient du marché ou de l&apos;offre, nous vous le dirons.
          </h3>
          <p className="text-background/70">
            La transparence fait partie de notre méthodologie.
          </p>
        </motion.div>

        {/* Transition */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <button
            type="button"
            onClick={scrollToSummary}
            className="group inline-flex flex-col items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <span className="font-semibold">Votre premier mois est terminé.</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
