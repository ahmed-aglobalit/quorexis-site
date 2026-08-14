"use client";

import { notFound } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SITE_MODE } from "@/config/site";
import { Link } from "@/i18n/navigation";

const DIFFERENTIATORS = [
  {
    title: "Pas un call center",
    description: "Nous ne vendons pas du volume d'appels. Nous construisons un pipeline qualifié avec une approche multicanale structurée.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    title: "Vos données, votre propriété",
    description: "Toutes les données prospectées vous appartiennent. Export possible à tout moment. Pas de dépendance.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "SDR validés et formés",
    description: "Chaque SDR passe un entretien et une validation avant d'être affecté à votre compte. Pas de junior non supervisé.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Transparence totale",
    description: "Dashboard en temps réel, reporting hebdomadaire, accès à toutes les métriques. Vous savez exactement ce qui se passe.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "Sortie facile",
    description: "30 jours de préavis, transition documentée, pas de pénalités. Nous misons sur les résultats, pas sur les contrats.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
  },
  {
    title: "Technology + Human",
    description: "L'IA et l'automation pour le scale. Les humains pour la confiance et les conversations qui convertissent.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

const PROCESS = [
  { step: "01", title: "Pilote", description: "2-3 mois pour valider le canal et prouver les résultats." },
  { step: "02", title: "Ajustement", description: "Optimisation ICP, messaging, canaux basée sur les données réelles." },
  { step: "03", title: "Scale", description: "Augmentation progressive avec des bases solides." },
];

function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-36" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Ce qui nous différencie
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Nous ne sommes pas une agence de plus. Nous construisons votre machine outbound.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              className="p-6 rounded-xl border border-border hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-36 bg-foreground/[0.02]" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Notre approche
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Pas de promesses irréalistes. Une méthode prouvée.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROCESS.map((item, i) => (
            <motion.div
              key={item.step}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              <div className="text-6xl font-bold text-accent/20 mb-4">{item.step}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-36 bg-foreground text-background" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 text-center">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Nos engagements
        </motion.h2>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-6 rounded-xl bg-background/5 border border-background/10">
            <p className="text-3xl font-bold text-accent mb-2">100%</p>
            <p className="text-sm text-background/70">Données propriétaires</p>
          </div>
          <div className="p-6 rounded-xl bg-background/5 border border-background/10">
            <p className="text-3xl font-bold text-accent mb-2">30j</p>
            <p className="text-sm text-background/70">Préavis de sortie</p>
          </div>
          <div className="p-6 rounded-xl bg-background/5 border border-background/10">
            <p className="text-3xl font-bold text-accent mb-2">24h</p>
            <p className="text-sm text-background/70">Réponse aux replies</p>
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Construire mon pipeline
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function WhyQuorexisPage() {
  if (SITE_MODE !== "sales") notFound();

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 text-center">
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-accent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Pourquoi Quorexis
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Une Sales Factory.<br />
            <span className="text-muted">Pas une agence de plus.</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-muted max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nous ne vendons pas des leads. Nous construisons l&apos;infrastructure
            qui génère votre pipeline de façon prévisible.
          </motion.p>
        </div>
      </section>

      <WhySection />
      <ProcessSection />
      <GuaranteeSection />
    </>
  );
}
