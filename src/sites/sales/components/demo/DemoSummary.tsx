"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

function openAssistant() {
  window.dispatchEvent(new CustomEvent("quorexis:open-assistant", { detail: { mode: "ai" } }));
}

const WEEKS_SUMMARY = [
  { week: "01", label: "Strategy", result: "Market understood" },
  { week: "02", label: "Build", result: "Outbound engine built" },
  { week: "03", label: "Activate", result: "Conversations started" },
  { week: "04", label: "Optimize", result: "Campaign optimized" },
];

const PIPELINE_FLOW = [
  "ICP",
  "DATA",
  "MESSAGING",
  "OUTREACH",
  "CONVERSATIONS",
  "QUALIFICATION",
  "MEETINGS",
  "PIPELINE",
];

export default function DemoSummary() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demo-summary" ref={ref} className="py-24 md:py-32 bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-8">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Your First 30 Days
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
            En quatre semaines, votre outbound est passé<br />
            <span className="text-accent">d&apos;une hypothèse à une campagne active.</span>
          </h2>
        </motion.div>

        {/* Weeks Summary */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {WEEKS_SUMMARY.map((week, i) => (
            <motion.div
              key={week.week}
              className="p-6 rounded-2xl bg-background/10 border border-background/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            >
              <div className="text-xs font-bold text-accent mb-2">WEEK {week.week}</div>
              <div className="text-lg font-semibold mb-2">{week.label}</div>
              <div className="flex items-center justify-center gap-2 text-sm text-background/70">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {week.result}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pipeline Flow */}
        <motion.div
          className="mb-16 overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 min-w-max py-4">
            {PIPELINE_FLOW.map((step, i) => (
              <motion.div
                key={step}
                className="flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
              >
                <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  step === "PIPELINE"
                    ? "bg-accent text-white"
                    : "bg-background/10 border border-background/20"
                }`}>
                  {step}
                </div>
                {i < PIPELINE_FLOW.length - 1 && (
                  <svg className="w-4 h-4 text-background/40 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Month */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">
            Et le mois suivant ?
          </h3>
          <p className="text-lg text-background/70 mb-4">
            Nous ne repartons pas de zéro.
          </p>
          <p className="text-background/70">
            Votre SDR continue avec un ICP plus précis, des scripts enrichis par les conversations
            et une campagne optimisée par les retours réels du marché.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-background/60 mb-8">
            Vous connaissez maintenant exactement le fonctionnement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/tools/budget-calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200"
            >
              Simuler ma campagne Quorexis
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={openAssistant}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background text-foreground font-semibold rounded-lg hover:bg-background/90 transition-all duration-200"
            >
              Parler de mon marché avec un expert
            </button>
          </div>
          <Link
            href="/offres"
            className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
          >
            Revoir les offres en détail
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
