"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { BudgetCalculator } from "./BudgetCalculator";

const TOOLS = [
  {
    id: "budget-calculator",
    name: "Budget Calculator",
    description: "Estimez votre budget outbound et ROI",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M2 9h20" />
        <path d="M10 3v6" />
      </svg>
    ),
  },
  {
    id: "icp-builder",
    name: "ICP Builder",
    description: "Définissez votre client idéal",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: "sequence-planner",
    name: "Sequence Planner",
    description: "Construisez votre cadence multicanale",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "email-generator",
    name: "Cold Email Generator",
    description: "Templates personnalisés",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
  },
  {
    id: "objection-handler",
    name: "Objection Handler",
    description: "Réponses aux objections",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "more",
    name: "+8 outils",
    description: "Voir tous les outils gratuits",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4v16m8-8H4" />
      </svg>
    ),
    isLink: true,
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {TOOLS.map((tool, i) => {
            const isLink = "isLink" in tool && tool.isLink;
            const content = (
              <>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  isLink ? "bg-accent text-white" : "bg-foreground/10 text-foreground"
                }`}>
                  {tool.icon}
                </div>
                <h3 className="text-sm font-semibold mb-1">{tool.name}</h3>
                <p className="text-xs text-muted leading-relaxed">{tool.description}</p>
              </>
            );

            if (isLink) {
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    href="/tools"
                    className="block p-4 rounded-xl border border-accent bg-accent/5 hover:bg-accent/10 transition-all duration-300"
                  >
                    {content}
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={tool.id}
                className="p-4 rounded-xl border border-border bg-foreground/[0.02] hover:border-accent/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                {content}
              </motion.div>
            );
          })}
        </div>

        {/* Budget Calculator */}
        <div id="budget-calc">
          <BudgetCalculator embedded />
        </div>
      </div>
    </section>
  );
}
