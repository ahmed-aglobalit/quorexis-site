"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { BudgetCalculator } from "./BudgetCalculator";

const FEATURED_TOOLS = [
  {
    slug: "icp-builder",
    name: "ICP Builder",
    description: "Définissez qui prospecter.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    slug: "budget-calculator",
    name: "Budget Calculator",
    description: "Estimez votre investissement outbound.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M2 9h20" />
        <path d="M10 3v6" />
      </svg>
    ),
  },
  {
    slug: "sales-velocity-calculator",
    name: "Pipeline Calculator",
    description: "Estimez la capacité nécessaire.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export function FreeToolsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Calculator intro */}
        <motion.div
          id="pipeline-calculator"
          className="text-center mb-12 scroll-mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            Dimensionnez votre outbound
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Quelle formule correspond à votre objectif ?
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Chaque entreprise possède un marché, un panier moyen, une équipe commerciale et des objectifs différents.
            Utilisez notre calculateur pour estimer la capacité outbound adaptée.
          </p>
        </motion.div>

        {/* Budget Calculator */}
        <div id="budget-calc" className="mb-20">
          <BudgetCalculator embedded />
        </div>

        {/* Tools intro */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Besoin d&apos;aide pour choisir ?
          </h3>
          <p className="text-muted max-w-2xl mx-auto">
            Votre besoin dépend de votre cible, votre panier moyen, vos canaux actuels et vos objectifs commerciaux.
            Utilisez nos outils gratuits pour dimensionner votre outbound.
          </p>
        </motion.div>

        {/* 3 Featured tools */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {FEATURED_TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group p-6 rounded-xl border border-border bg-background hover:border-accent/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                {tool.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                {tool.name}
              </h4>
              <p className="text-sm text-muted">{tool.description}</p>
            </Link>
          ))}
        </motion.div>

        {/* CTA to all tools */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            Voir tous nos outils gratuits
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
