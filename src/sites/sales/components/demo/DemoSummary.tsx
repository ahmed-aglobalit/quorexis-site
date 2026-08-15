"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

function openAssistant() {
  window.dispatchEvent(new CustomEvent("quorexis:open-assistant", { detail: { mode: "ai" } }));
}

const WEEKS = [
  { num: "01", label: "Strategy", check: "ICP validé" },
  { num: "02", label: "Build", check: "Campagne prête" },
  { num: "03", label: "Activate", check: "Conversations" },
  { num: "04", label: "Optimize", check: "V2 live" },
];

export default function DemoSummary() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="demo-summary" ref={ref} className="py-12 md:py-16 bg-foreground/[0.02] min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-[1000px] px-6 md:px-12 w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              30 Days Complete
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Votre outbound est <span className="text-accent">opérationnel.</span>
          </h2>
        </motion.div>

        {/* Weeks Grid */}
        <motion.div
          className="grid grid-cols-4 gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {WEEKS.map((week) => (
            <div key={week.num} className="p-3 rounded-xl bg-background border border-border text-center">
              <div className="text-xs font-bold text-accent mb-1">W{week.num}</div>
              <div className="text-sm font-semibold mb-1">{week.label}</div>
              <div className="flex items-center justify-center gap-1 text-xs text-muted">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {week.check}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pipeline Flow */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-1 text-xs mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {["ICP", "DATA", "MESSAGING", "OUTREACH", "QUALIFICATION", "MEETINGS", "PIPELINE"].map((step, i) => (
            <div key={step} className="flex items-center">
              <span className={`px-2 py-1 rounded ${
                step === "PIPELINE" ? "bg-accent text-white font-bold" : "bg-foreground/5"
              }`}>
                {step}
              </span>
              {i < 6 && <span className="mx-0.5 text-muted">→</span>}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-muted mb-4">
            Prêt à voir ce que ça donnerait sur votre marché ?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools/budget-calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all"
            >
              Simuler ma campagne
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={openAssistant}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-all"
            >
              Parler à un expert
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
