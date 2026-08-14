"use client";

import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { SITE_MODE } from "@/config/site";
import { Link } from "@/i18n/navigation";
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

type ToolConfig = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  component: React.ComponentType;
  icon: React.ReactNode;
  gradient: string;
};

const TOOLS: ToolConfig[] = [
  {
    id: "budget-calculator",
    slug: "budget-calculator",
    name: "Budget Calculator",
    description: "Estimez votre budget outbound et le ROI potentiel",
    category: "ROI & Performance",
    component: () => <BudgetCalculator embedded />,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20M10 3v6" /></svg>,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "icp-builder",
    slug: "icp-builder",
    name: "ICP Builder",
    description: "Définissez votre client idéal et estimez votre marché",
    category: "Prospection & Ciblage",
    component: ICPBuilder,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "domain-health",
    slug: "domain-health",
    name: "Domain Health Check",
    description: "Vérifiez la délivrabilité de votre domaine email",
    category: "Email & Délivrabilité",
    component: DomainHealthCheck,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" /></svg>,
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    id: "subject-line",
    slug: "subject-line-tester",
    name: "Subject Line Tester",
    description: "Analysez et optimisez vos objets d'email avec l'IA",
    category: "Email & Délivrabilité",
    component: SubjectLineTester,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "email-generator",
    slug: "cold-email-generator",
    name: "Cold Email Generator",
    description: "Générez des emails personnalisés avec l'IA",
    category: "Email & Délivrabilité",
    component: ColdEmailGenerator,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "sequence-planner",
    slug: "sequence-planner",
    name: "Sequence Planner",
    description: "Construisez votre cadence de prospection multicanale",
    category: "Planning & Stratégie",
    component: SequencePlanner,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: "ab-test",
    slug: "ab-test-calculator",
    name: "A/B Test Calculator",
    description: "Calculez la significativité statistique de vos tests",
    category: "Planning & Stratégie",
    component: ABTestCalculator,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "meeting-cost",
    slug: "meeting-cost-calculator",
    name: "Meeting Cost Calculator",
    description: "Calculez le coût réel des rendez-vous manqués",
    category: "ROI & Performance",
    component: MeetingCostCalculator,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "sales-velocity",
    slug: "sales-velocity-calculator",
    name: "Sales Velocity Calculator",
    description: "Mesurez et optimisez la vélocité de votre pipeline",
    category: "ROI & Performance",
    component: SalesVelocityCalculator,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "lead-scoring",
    slug: "lead-scoring",
    name: "Lead Scoring Template",
    description: "Créez votre grille de scoring personnalisée",
    category: "Prospection & Ciblage",
    component: LeadScoringTemplate,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "linkedin-analyzer",
    slug: "linkedin-analyzer",
    name: "LinkedIn Analyzer",
    description: "Évaluez et optimisez votre profil LinkedIn",
    category: "Prospection & Ciblage",
    component: LinkedInAnalyzer,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    id: "objection-handler",
    slug: "objection-handler",
    name: "Objection Handler",
    description: "Réponses aux objections courantes",
    category: "Scripts & Templates",
    component: ObjectionHandler,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    id: "call-script",
    slug: "cold-call-script",
    name: "Cold Call Script Generator",
    description: "Scripts d'appel générés par l'IA",
    category: "Scripts & Templates",
    component: ColdCallScriptGenerator,
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function ToolPage() {
  const params = useParams();
  const slug = params.slug as string;

  if (SITE_MODE !== "sales") notFound();

  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) notFound();

  const otherTools = TOOLS.filter((t) => t.slug !== slug).slice(0, 6);
  const ToolComponent = tool.component;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Tous les outils
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white`}>
              {tool.icon}
            </div>
            <div>
              <motion.h1
                className="text-3xl md:text-4xl font-semibold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {tool.name}
              </motion.h1>
              <motion.p
                className="mt-2 text-lg text-muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {tool.description}
              </motion.p>
            </div>
          </div>

          <span className="inline-block px-3 py-1 text-sm bg-foreground/5 rounded-full text-muted">
            {tool.category}
          </span>
        </div>
      </section>

      {/* Tool */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
          <ToolComponent />
        </div>
      </section>

      {/* Other tools */}
      <section className="py-24 bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <h2 className="text-2xl font-semibold mb-8">Autres outils gratuits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherTools.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="p-4 rounded-xl border border-border bg-background hover:border-accent/30 hover:shadow-lg transition-all group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                  {t.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{t.name}</h3>
                <p className="text-xs text-muted line-clamp-2">{t.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors"
            >
              Voir tous les outils
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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
            Les outils vous ont aidé à planifier. Maintenant, laissez-nous exécuter.
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
