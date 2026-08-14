"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { SITE_MODE } from "@/config/site";
import { BudgetCalculator } from "@/sites/sales/components";
import {
  ICPBuilder,
  DomainHealthCheck,
  SubjectLineTester,
  SequencePlanner,
  ColdEmailGenerator,
  ABTestCalculator,
  MeetingCostCalculator,
  SalesVelocityCalculator,
  LeadScoringTemplate,
  ObjectionHandler,
  ColdCallScriptGenerator,
  LinkedInAnalyzer,
} from "@/sites/sales/components/tools";
import { Link } from "@/i18n/navigation";

type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  component: React.ComponentType;
  icon: React.ReactNode;
};

const TOOLS: Tool[] = [
  {
    id: "budget-calculator",
    name: "Budget Calculator",
    description: "Estimez votre budget outbound et le ROI potentiel",
    category: "ROI & Performance",
    component: () => <BudgetCalculator embedded />,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20M10 3v6" /></svg>,
  },
  {
    id: "icp-builder",
    name: "ICP Builder",
    description: "Définissez votre client idéal et estimez votre marché",
    category: "Prospection & Ciblage",
    component: ICPBuilder,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  },
  {
    id: "domain-health",
    name: "Domain Health Check",
    description: "Vérifiez la délivrabilité de votre domaine email",
    category: "Email & Délivrabilité",
    component: DomainHealthCheck,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" /></svg>,
  },
  {
    id: "subject-line",
    name: "Subject Line Tester",
    description: "Analysez et optimisez vos objets d'email",
    category: "Email & Délivrabilité",
    component: SubjectLineTester,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  },
  {
    id: "email-generator",
    name: "Cold Email Generator",
    description: "Générez des templates d'emails personnalisés",
    category: "Email & Délivrabilité",
    component: ColdEmailGenerator,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  },
  {
    id: "sequence-planner",
    name: "Sequence Planner",
    description: "Construisez votre cadence de prospection multicanale",
    category: "Planning & Stratégie",
    component: SequencePlanner,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
  },
  {
    id: "ab-test",
    name: "A/B Test Calculator",
    description: "Calculez la significativité statistique de vos tests",
    category: "Planning & Stratégie",
    component: ABTestCalculator,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  },
  {
    id: "meeting-cost",
    name: "Meeting Cost Calculator",
    description: "Calculez le coût réel des rendez-vous manqués",
    category: "ROI & Performance",
    component: MeetingCostCalculator,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    id: "sales-velocity",
    name: "Sales Velocity Calculator",
    description: "Mesurez et optimisez la vélocité de votre pipeline",
    category: "ROI & Performance",
    component: SalesVelocityCalculator,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  },
  {
    id: "lead-scoring",
    name: "Lead Scoring Template",
    description: "Créez votre grille de scoring personnalisée",
    category: "Prospection & Ciblage",
    component: LeadScoringTemplate,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    id: "linkedin-analyzer",
    name: "LinkedIn Analyzer",
    description: "Évaluez et optimisez votre profil LinkedIn",
    category: "Prospection & Ciblage",
    component: LinkedInAnalyzer,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
  },
  {
    id: "objection-handler",
    name: "Objection Handler",
    description: "Réponses aux objections courantes",
    category: "Scripts & Templates",
    component: ObjectionHandler,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    id: "call-script",
    name: "Cold Call Script Generator",
    description: "Scripts d'appel adaptés à votre contexte",
    category: "Scripts & Templates",
    component: ColdCallScriptGenerator,
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  },
];

const CATEGORIES = [...new Set(TOOLS.map((t) => t.category))];

export default function ToolsPage() {
  if (SITE_MODE !== "sales") notFound();

  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = selectedCategory
    ? TOOLS.filter((t) => t.category === selectedCategory)
    : TOOLS;

  const activeTool = TOOLS.find((t) => t.id === selectedTool);

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

      {/* Category filter */}
      <section className="pb-8">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
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
      <section className="pb-12">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => {
                  setSelectedTool(selectedTool === tool.id ? null : tool.id);
                  if (selectedTool !== tool.id) {
                    setTimeout(() => {
                      document.getElementById("active-tool")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }
                }}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedTool === tool.id
                    ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                    : "border-border hover:border-accent/30 hover:bg-foreground/[0.02]"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  selectedTool === tool.id ? "bg-accent text-white" : "bg-foreground/10 text-foreground"
                }`}>
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{tool.name}</h3>
                <p className="text-xs text-muted line-clamp-2">{tool.description}</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-foreground/5 rounded text-muted">
                  {tool.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active tool */}
      {activeTool && (
        <section id="active-tool" className="pb-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">{activeTool.name}</h2>
              <button
                type="button"
                onClick={() => setSelectedTool(null)}
                className="px-3 py-1.5 text-sm text-muted hover:text-foreground border border-border rounded-lg transition-colors"
              >
                Fermer
              </button>
            </div>
            <activeTool.component />
          </div>
        </section>
      )}

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
