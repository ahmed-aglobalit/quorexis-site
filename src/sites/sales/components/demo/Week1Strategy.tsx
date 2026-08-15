"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ICP_ITEMS = [
  { label: "Company size", value: "20–200 employees" },
  { label: "Industry", value: "SaaS B2B" },
  { label: "Revenue", value: "1M–20M €" },
  { label: "Geography", value: "France" },
  { label: "Technology", value: "Cloud-native" },
  { label: "Buying triggers", value: "Growth phase / Series A-B" },
];

const PERSONAS = [
  { role: "CEO", priority: "Primary", color: "accent" },
  { role: "VP Sales", priority: "Primary", color: "accent" },
  { role: "Head of Growth", priority: "Secondary", color: "muted" },
];

const OBJECTIONS = [
  "Nous avons déjà un prestataire",
  "Ce n'est pas une priorité",
  "Pas de budget",
  "Envoyez-moi de la documentation",
];

export default function Week1Strategy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToWeek2 = () => {
    const el = document.getElementById("demo-week-2");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="demo-week-1" ref={ref} className="py-24 md:py-32 bg-background">
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
                Week 01 — Strategy
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-xs text-muted">Example campaign</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-6">
            Avant de prospecter, nous devons<br />
            <span className="text-muted">comprendre qui mérite votre attention.</span>
          </h2>
          <p className="text-lg text-muted max-w-3xl">
            Votre SDR ne commence pas par appeler. Il commence par comprendre votre marché.
          </p>
        </motion.div>

        {/* Campaign Brief */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-8 rounded-2xl bg-foreground/[0.02] border border-border">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-6">
              Campaign Brief
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { label: "Market", value: "France" },
                { label: "Industry", value: "SaaS B2B" },
                { label: "Target companies", value: "20–200 emp." },
                { label: "Primary persona", value: "CEO / VP Sales" },
                { label: "Avg. contract", value: "15 000 €" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <p className="text-xs text-muted mb-1">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ICP Building */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* ICP */}
          <motion.div
            className="p-8 rounded-2xl bg-foreground/[0.02] border border-border"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
                Ideal Customer Profile
              </h3>
              <motion.div
                className="px-3 py-1 rounded-full bg-accent/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                <span className="text-xs font-semibold text-accent">Building...</span>
              </motion.div>
            </div>
            <div className="space-y-4">
              {ICP_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-lg bg-background border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                >
                  <span className="text-sm text-muted">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Personas */}
          <motion.div
            className="p-8 rounded-2xl bg-foreground/[0.02] border border-border"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-6">
              Target Personas
            </h3>
            <div className="space-y-4 mb-8">
              {PERSONAS.map((persona, i) => (
                <motion.div
                  key={persona.role}
                  className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    persona.color === "accent" ? "bg-accent/10" : "bg-foreground/5"
                  }`}>
                    <svg className={`w-6 h-6 ${persona.color === "accent" ? "text-accent" : "text-muted"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{persona.role}</p>
                    <p className={`text-xs ${persona.color === "accent" ? "text-accent" : "text-muted"}`}>
                      {persona.priority}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Objections */}
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
              Objections anticipées
            </h3>
            <div className="flex flex-wrap gap-2">
              {OBJECTIONS.map((obj, i) => (
                <motion.span
                  key={obj}
                  className="px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-medium text-orange-600"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                >
                  {obj}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Value Proposition */}
        <motion.div
          className="p-8 rounded-2xl bg-foreground/[0.02] border border-border mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-6">
            Value Proposition Mapping
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Problem", value: "Pipeline insuffisant, équipe commerciale sous-utilisée", icon: "!" },
              { label: "Business impact", value: "Croissance bloquée, dépendance à l'inbound", icon: "→" },
              { label: "Quorexis angle", value: "Équipe SDR externalisée pour construire un flux outbound prévisible", icon: "✓" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="p-4 rounded-lg bg-background border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">
                    {item.icon}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {item.label}
                  </span>
                </div>
                <p className="text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ICP Validated */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/20">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="font-semibold text-accent">ICP VALIDATED</span>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className="max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <p className="text-xl md:text-2xl font-medium text-muted italic">
            &ldquo;Nous ne voulons pas contacter plus d&apos;entreprises.<br />
            Nous voulons contacter les bonnes entreprises.&rdquo;
          </p>
        </motion.blockquote>

        {/* Transition */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <p className="text-lg font-medium mb-2">Votre marché est cadré.</p>
          <button
            type="button"
            onClick={scrollToWeek2}
            className="group inline-flex flex-col items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <span className="font-semibold">Maintenant, construisons votre campagne.</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
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
