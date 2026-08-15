"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { SITE_MODE } from "@/config/site";
import { Link } from "@/i18n/navigation";

type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  gradient: string;
  isAI?: boolean;
};

const TOOLS: Tool[] = [
  {
    slug: "budget-calculator",
    name: "Budget Calculator",
    description: "Estimez votre budget outbound et le ROI potentiel",
    category: "ROI & Performance",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20M10 3v6" /></svg>,
    gradient: "from-orange-500 to-red-500",
  },
  {
    slug: "icp-builder",
    name: "ICP Builder",
    description: "Définissez votre client idéal et estimez votre marché",
    category: "Prospection & Ciblage",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    slug: "domain-health",
    name: "Domain Health Check",
    description: "Vérifiez la délivrabilité de votre domaine email",
    category: "Email & Délivrabilité",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" /></svg>,
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    slug: "subject-line-tester",
    name: "Subject Line Tester",
    description: "Analysez vos objets d'email avec l'IA",
    category: "Email & Délivrabilité",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    gradient: "from-blue-500 to-cyan-500",
    isAI: true,
  },
  {
    slug: "cold-email-generator",
    name: "Cold Email Generator",
    description: "Générez des emails personnalisés avec l'IA",
    category: "Email & Délivrabilité",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    gradient: "from-purple-500 to-pink-500",
    isAI: true,
  },
  {
    slug: "sequence-planner",
    name: "Sequence Planner",
    description: "Construisez votre cadence multicanale",
    category: "Planning & Stratégie",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    slug: "ab-test-calculator",
    name: "A/B Test Calculator",
    description: "Calculez la significativité de vos tests",
    category: "Planning & Stratégie",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    slug: "meeting-cost-calculator",
    name: "Meeting Cost Calculator",
    description: "Calculez le coût des rendez-vous manqués",
    category: "ROI & Performance",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    gradient: "from-red-500 to-orange-500",
  },
  {
    slug: "sales-velocity-calculator",
    name: "Sales Velocity Calculator",
    description: "Mesurez la vélocité de votre pipeline",
    category: "ROI & Performance",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    slug: "lead-scoring",
    name: "Lead Scoring Template",
    description: "Créez votre grille de scoring",
    category: "Prospection & Ciblage",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    slug: "linkedin-analyzer",
    name: "LinkedIn Analyzer",
    description: "Optimisez votre profil LinkedIn",
    category: "Prospection & Ciblage",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    slug: "objection-handler",
    name: "Objection Handler",
    description: "Réponses aux objections courantes",
    category: "Scripts & Templates",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    slug: "cold-call-script",
    name: "Cold Call Script Generator",
    description: "Scripts d'appel générés par l'IA",
    category: "Scripts & Templates",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    gradient: "from-green-500 to-emerald-500",
    isAI: true,
  },
];

const CATEGORIES = [...new Set(TOOLS.map((t) => t.category))];

export default function ToolsPage() {
  if (SITE_MODE !== "sales") notFound();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = selectedCategory
    ? TOOLS.filter((t) => t.category === selectedCategory)
    : TOOLS;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
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
            Calculez, planifiez,<br />
            <span className="text-muted">décidez.</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {TOOLS.length} outils gratuits pour structurer votre stratégie outbound.
            Pas d&apos;inscription, pas de limite.
          </motion.p>
        </div>
      </section>

      {/* Featured: Pipeline Calculator */}
      <section className="pb-12">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/tools/budget-calculator"
              className="block p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-white shrink-0">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="20" height="18" rx="2" />
                    <path d="M2 9h20M10 3v6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-semibold bg-accent text-white rounded-full">
                      Recommandé pour commencer
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    Trouver ma formule
                  </h2>
                  <p className="text-muted">
                    Calculez la capacité outbound adaptée à votre marché, votre panier moyen et vos objectifs commerciaux.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 text-accent font-semibold group-hover:translate-x-1 transition-transform">
                    Commencer
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="pb-8">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">Autres outils</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !selectedCategory ? "bg-accent text-white" : "bg-foreground/5 hover:bg-foreground/10"
              }`}
            >
              Tous ({TOOLS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat ? "bg-accent text-white" : "bg-foreground/5 hover:bg-foreground/10"
                }`}
              >
                {cat} ({TOOLS.filter((t) => t.category === cat).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool, i) => (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  href={`/tools/${tool.slug}`}
                  className="block p-5 rounded-xl border border-border bg-background hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {tool.icon}
                    </div>
                    {tool.isAI && (
                      <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                        IA
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">{tool.name}</h3>
                  <p className="text-sm text-muted line-clamp-2">{tool.description}</p>
                  <span className="inline-block mt-3 px-2 py-0.5 text-xs bg-foreground/5 rounded text-muted">
                    {tool.category}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
