"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ICP_ITEMS = [
  { label: "Company size", value: "20–200 emp." },
  { label: "Industry", value: "SaaS B2B" },
  { label: "Geography", value: "France" },
];

const PERSONAS = [
  { role: "CEO", priority: "Primary" },
  { role: "VP Sales", priority: "Primary" },
  { role: "Head of Growth", priority: "Secondary" },
];

export default function Week1Strategy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToWeek2 = () => {
    const el = document.getElementById("demo-week-2");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="demo-week-1" ref={ref} className="py-12 md:py-16 bg-foreground/[0.02] min-h-[80vh] flex items-center">
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
              WEEK 01
            </span>
            <span className="text-xs text-muted">Example campaign</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Comprendre qui mérite votre attention.
          </h2>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* ICP */}
          <div className="p-4 rounded-xl bg-background border border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">ICP</h3>
            <div className="space-y-2">
              {ICP_ITEMS.map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-muted">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Personas */}
          <div className="p-4 rounded-xl bg-background border border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Personas</h3>
            <div className="space-y-2">
              {PERSONAS.map((p) => (
                <div key={p.role} className="flex justify-between text-sm">
                  <span className="font-medium">{p.role}</span>
                  <span className={p.priority === "Primary" ? "text-accent text-xs" : "text-muted text-xs"}>
                    {p.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Objections */}
          <div className="p-4 rounded-xl bg-background border border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Objections</h3>
            <div className="flex flex-wrap gap-1">
              {["Prestataire existant", "Timing", "Budget", "Docs"].map((obj) => (
                <span key={obj} className="px-2 py-0.5 rounded-full bg-orange-500/10 text-xs text-orange-600">
                  {obj}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ICP Validated + Transition */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-sm font-semibold text-accent">ICP VALIDATED</span>
          </div>

          <button
            type="button"
            onClick={scrollToWeek2}
            className="flex flex-col items-center gap-1 mx-auto text-accent hover:text-accent/80 transition-colors"
          >
            <span className="text-sm font-medium">Construisons la campagne</span>
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
