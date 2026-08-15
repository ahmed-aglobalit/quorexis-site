"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

function openAssistant() {
  window.dispatchEvent(new CustomEvent("quorexis:open-assistant", { detail: { mode: "ai" } }));
}

const WEEKS_SUMMARY = [
  { week: "01", label: "Strategy", result: "ICP CloudAxis validé" },
  { week: "02", label: "Build", result: "847 accounts, séquences prêtes" },
  { week: "03", label: "Activate", result: "Meeting Datalux booked" },
  { week: "04", label: "Optimize", result: "CTO retiré, V2 live" },
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
    <section
      id="demo-summary"
      ref={ref}
      className="py-12 md:py-16 bg-foreground/[0.02]"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Vos 30 premiers jours — CloudAxis
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
            En quatre semaines, votre outbound est passé<br />
            <span className="text-accent">d&apos;une hypothèse à une campagne active.</span>
          </h2>
        </motion.div>

        {/* Weeks Summary */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {WEEKS_SUMMARY.map((week, i) => (
            <motion.div
              key={week.week}
              className="p-4 rounded-xl bg-background border border-border text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
            >
              <div className="text-[10px] font-bold text-accent mb-1">WEEK {week.week}</div>
              <div className="text-sm font-semibold mb-1">{week.label}</div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted">
                <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {week.result}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pipeline Flow - Compact */}
        <motion.div
          className="mb-8 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-1 min-w-max">
            {PIPELINE_FLOW.map((step, i) => (
              <motion.div
                key={step}
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.03 }}
              >
                <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                  step === "PIPELINE"
                    ? "bg-accent text-white"
                    : "bg-foreground/5 border border-border"
                }`}>
                  {step}
                </div>
                {i < PIPELINE_FLOW.length - 1 && (
                  <svg className="w-3 h-3 text-muted mx-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Month - Compact */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <h3 className="text-lg md:text-xl font-semibold mb-3">
            Et le mois suivant ?
          </h3>
          <p className="text-sm text-muted">
            Nous ne repartons pas de zéro. Votre SDR continue avec un ICP plus précis,
            des scripts enrichis et une campagne optimisée par les retours du marché.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <p className="text-sm text-muted mb-6">
            Vous connaissez maintenant exactement le fonctionnement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link
              href="/tools/budget-calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-all duration-200"
            >
              Simuler ma campagne
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={openAssistant}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all duration-200"
            >
              Parler avec un expert
            </button>
          </div>
          <Link
            href="/offres"
            className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors"
          >
            Revoir les offres
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
