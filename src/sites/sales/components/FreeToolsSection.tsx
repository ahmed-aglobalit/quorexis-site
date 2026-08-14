"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BudgetCalculator } from "./BudgetCalculator";

const TOOLS = [
  {
    id: "budget-calculator",
    name: "Budget Calculator",
    description: "Estimez votre budget outbound et le ROI potentiel en 30 secondes.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M2 9h20" />
        <path d="M10 3v6" />
      </svg>
    ),
    available: true,
  },
  {
    id: "icp-builder",
    name: "ICP Builder",
    description: "Définissez votre client idéal et estimez la taille de votre marché.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    available: false,
  },
  {
    id: "email-checker",
    name: "Domain Health Check",
    description: "Vérifiez la délivrabilité de votre domaine (SPF, DKIM, DMARC).",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
    available: false,
  },
  {
    id: "roi-simulator",
    name: "ROI Simulator",
    description: "Simulez le retour sur investissement de différentes stratégies.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 6l-9.5 9.5-5-5L1 18" />
        <path d="M17 6h6v6" />
      </svg>
    ),
    available: false,
  },
];

export function FreeToolsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-36" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            Outils gratuits
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Calculez, planifiez, décidez.
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Des outils pour structurer votre stratégie outbound avant même de nous contacter.
          </p>
        </motion.div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.id}
              className={`relative p-5 rounded-xl border transition-all duration-300 ${
                tool.available
                  ? "border-accent bg-accent/5 hover:bg-accent/10 cursor-pointer"
                  : "border-border bg-foreground/[0.02]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              onClick={() => {
                if (tool.available) {
                  document.getElementById("budget-calc")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {!tool.available && (
                <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-medium bg-foreground/10 rounded-full text-muted">
                  Bientôt
                </span>
              )}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  tool.available ? "bg-accent text-white" : "bg-foreground/10 text-muted"
                }`}
              >
                {tool.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1">{tool.name}</h3>
              <p className="text-xs text-muted leading-relaxed">{tool.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Budget Calculator */}
        <div id="budget-calc">
          <BudgetCalculator embedded />
        </div>
      </div>
    </section>
  );
}
