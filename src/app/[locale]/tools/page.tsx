"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { SITE_MODE } from "@/config/site";
import { BudgetCalculator } from "@/sites/sales/components";
import { Link } from "@/i18n/navigation";

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
    description: "Vérifiez la délivrabilité de votre domaine email (SPF, DKIM, DMARC).",
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
    description: "Simulez le retour sur investissement de différentes stratégies outbound.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 6l-9.5 9.5-5-5L1 18" />
        <path d="M17 6h6v6" />
      </svg>
    ),
    available: false,
  },
];

export default function ToolsPage() {
  if (SITE_MODE !== "sales") notFound();

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-accent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Outils gratuits
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Calculez, planifiez, décidez.
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Des outils gratuits pour vous aider à structurer votre stratégie outbound
            avant même de nous contacter.
          </motion.p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.id}
                className={`relative p-6 rounded-xl border ${
                  tool.available
                    ? "border-accent bg-accent/5 hover:bg-accent/10"
                    : "border-border bg-foreground/[0.02]"
                } transition-colors`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                {!tool.available && (
                  <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium bg-foreground/10 rounded-full text-muted">
                    Bientôt
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  tool.available ? "bg-accent text-white" : "bg-foreground/10 text-muted"
                }`}>
                  {tool.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-muted">{tool.description}</p>
                {tool.available && (
                  <a
                    href={`#${tool.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    Utiliser l&apos;outil →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Calculator */}
      <div id="budget-calculator">
        <BudgetCalculator />
      </div>

      {/* CTA */}
      <section className="py-24 bg-foreground text-background">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Prêt à passer à l&apos;action ?
          </h2>
          <p className="mt-4 text-background/70 max-w-xl mx-auto">
            Les calculs sont faits. Discutons de votre stratégie outbound.
          </p>
          <div className="mt-8">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Parler à un expert
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
