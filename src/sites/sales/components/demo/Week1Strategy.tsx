"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CAMPAIGN_BRIEF = {
  client: "CloudAxis",
  service: "Managed Cloud & DevOps Services",
  market: "France",
  segment: "SaaS & Tech, 50-250 employés",
  avgDeal: "30 000 €",
};

const ICP_ITEMS = [
  { label: "Taille", value: "50–250 employés" },
  { label: "Industrie", value: "SaaS & Tech B2B" },
  { label: "Revenue", value: "5M–50M €" },
  { label: "Géographie", value: "France" },
  { label: "Technologie", value: "Cloud AWS/GCP/Azure" },
  { label: "Trigger", value: "Scaling / Migration cloud" },
];

const PERSONAS = [
  { role: "VP Engineering", priority: "Primary", color: "accent" },
  { role: "CTO", priority: "Primary", color: "accent" },
  { role: "Head of Infra", priority: "Secondary", color: "muted" },
];

const OBJECTIONS = [
  "On gère en interne",
  "On a déjà un consultant",
  "Pas de budget cette année",
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
    <section
      id="demo-week-1"
      ref={ref}
      className="min-h-[calc(100svh-80px)] py-8 md:py-12 bg-background flex flex-col"
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
                Week 01 — Strategy
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-xs text-muted">Campagne {CAMPAIGN_BRIEF.client}</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
            Avant de prospecter, nous comprenons<span className="text-muted"> qui mérite votre attention.</span>
          </h2>
        </motion.div>

        {/* Campaign Brief - Compact */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="p-4 md:p-6 rounded-xl bg-accent/5 border border-accent/20">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Client:</span>
                <span className="text-sm font-bold text-accent">{CAMPAIGN_BRIEF.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Service:</span>
                <span className="text-sm font-medium">{CAMPAIGN_BRIEF.service}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Segment:</span>
                <span className="text-sm font-medium">{CAMPAIGN_BRIEF.segment}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Deal moyen:</span>
                <span className="text-sm font-bold">{CAMPAIGN_BRIEF.avgDeal}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid: ICP + Personas + Objections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 flex-1">
          {/* ICP */}
          <motion.div
            className="p-4 md:p-5 rounded-xl bg-foreground/[0.02] border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
              Ideal Customer Profile
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {ICP_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="p-2 rounded-lg bg-background border border-border"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                >
                  <p className="text-[10px] text-muted uppercase">{item.label}</p>
                  <p className="text-xs font-medium">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Personas */}
          <motion.div
            className="p-4 md:p-5 rounded-xl bg-foreground/[0.02] border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
              Target Personas
            </h3>
            <div className="space-y-2">
              {PERSONAS.map((persona, i) => (
                <motion.div
                  key={persona.role}
                  className="flex items-center gap-3 p-2 rounded-lg bg-background border border-border"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    persona.color === "accent" ? "bg-accent/10" : "bg-foreground/5"
                  }`}>
                    <svg className={`w-4 h-4 ${persona.color === "accent" ? "text-accent" : "text-muted"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{persona.role}</p>
                    <p className={`text-[10px] ${persona.color === "accent" ? "text-accent" : "text-muted"}`}>
                      {persona.priority}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Objections + Value Prop */}
          <motion.div
            className="p-4 md:p-5 rounded-xl bg-foreground/[0.02] border border-border flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
              Objections anticipées
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {OBJECTIONS.map((obj, i) => (
                <motion.span
                  key={obj}
                  className="px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-medium text-orange-600"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                >
                  {obj}
                </motion.span>
              ))}
            </div>
            <div className="mt-auto p-3 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-[10px] text-accent uppercase font-semibold mb-1">Notre angle</p>
              <p className="text-xs text-muted">
                &ldquo;Vos équipes IT sont surchargées. Externalisez l&apos;ops, gardez le contrôle.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Value Proposition Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            { label: "Pain", value: "Équipes DevOps débordées, incident response lente", icon: "!" },
            { label: "Impact", value: "Downtime = perte de revenus, clients mécontents", icon: "→" },
            { label: "CloudAxis résout", value: "24/7 managed ops, scaling automatisé", icon: "✓" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="p-3 rounded-lg bg-background border border-border flex items-start gap-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
            >
              <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0 mt-0.5">
                {item.icon}
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-0.5">
                  {item.label}
                </p>
                <p className="text-xs">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer: ICP Validated + Transition */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-border"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-xs font-semibold text-accent">ICP VALIDATED</span>
            </div>
            <span className="text-sm text-muted hidden md:inline">Le marché est cadré.</span>
          </div>
          <button
            type="button"
            onClick={scrollToWeek2}
            className="group flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <span className="text-sm font-medium">Construire la campagne</span>
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
