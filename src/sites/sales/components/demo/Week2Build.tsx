"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PIPELINE_STEPS = [
  { label: "ICP", status: "done" },
  { label: "Accounts", status: "done" },
  { label: "Contacts", status: "done" },
  { label: "Messaging", status: "done" },
  { label: "SDR Training", status: "done" },
  { label: "Ready", status: "active" },
];

const CLOUDAXIS_DATA = {
  accounts: 847,
  accountsLabel: "SaaS 50-250 France",
  contacts: 312,
  contactsLabel: "VP Engineering, CTO, Head of Infra",
};

export default function Week2Build() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToWeek3 = () => {
    const el = document.getElementById("demo-week-3");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="demo-week-2"
      ref={ref}
      className="min-h-[calc(100svh-80px)] py-8 md:py-12 bg-foreground/[0.02] flex flex-col"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Week 02 — Build
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-xs text-muted">Campagne CloudAxis</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
            Votre marché devient une machine<span className="text-muted"> outbound prête.</span>
          </h2>
        </motion.div>

        {/* Pipeline Flow - Compact */}
        <motion.div
          className="mb-6 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-center gap-1 min-w-max">
            {PIPELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              >
                <div
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${
                    step.status === "active"
                      ? "bg-accent text-white border-accent"
                      : "bg-background border-border"
                  }`}
                >
                  {step.label}
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <svg className="w-4 h-4 text-muted mx-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data + SDR Training - Compact 3 col */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Accounts */}
          <motion.div
            className="p-4 rounded-xl bg-background border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted uppercase">Accounts</span>
              <motion.span
                className="text-xl font-bold text-accent"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {CLOUDAXIS_DATA.accounts}
              </motion.span>
            </div>
            <p className="text-[10px] text-muted">{CLOUDAXIS_DATA.accountsLabel}</p>
          </motion.div>

          {/* Contacts */}
          <motion.div
            className="p-4 rounded-xl bg-background border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted uppercase">Contacts</span>
              <motion.span
                className="text-xl font-bold text-accent"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                {CLOUDAXIS_DATA.contacts}
              </motion.span>
            </div>
            <p className="text-[10px] text-muted">{CLOUDAXIS_DATA.contactsLabel}</p>
          </motion.div>

          {/* SDR Training - Differentiator */}
          <motion.div
            className="p-4 rounded-xl bg-accent/5 border border-accent/20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-xs font-bold text-accent uppercase">SDR Formé</span>
            </div>
            <p className="text-[10px] text-muted">
              Comprend les enjeux Cloud & DevOps avant le premier appel.
            </p>
          </motion.div>
        </div>

        {/* Messaging Sequence Preview */}
        <motion.div
          className="p-4 md:p-5 rounded-xl bg-background border border-border mb-6 flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-4">
            Sequence Preview — CloudAxis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email */}
            <motion.div
              className="p-3 rounded-lg bg-foreground/[0.02] border border-border"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6L12 13 2 6" />
                </svg>
                <span className="text-xs font-semibold">J1 — Email</span>
              </div>
              <p className="text-[10px] text-muted italic">
                &ldquo;Scaling infra sans recruter DevOps ?&rdquo;
              </p>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              className="p-3 rounded-lg bg-foreground/[0.02] border border-border"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.55 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-xs font-semibold">J3 — LinkedIn</span>
              </div>
              <p className="text-[10px] text-muted italic">
                &ldquo;Vu votre stack AWS, question rapide...&rdquo;
              </p>
            </motion.div>

            {/* Cold Call */}
            <motion.div
              className="p-3 rounded-lg bg-foreground/[0.02] border border-border"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-xs font-semibold">J5 — Call</span>
              </div>
              <p className="text-[10px] text-muted italic">
                &ldquo;Je travaille avec SaaS comme vous sur l&apos;ops...&rdquo;
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Control - Compact */}
        <motion.div
          className="flex items-center gap-4 p-4 rounded-xl bg-foreground text-background mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <div className="flex-1">
            <p className="text-sm font-medium">Votre marque reste sous contrôle.</p>
            <p className="text-[10px] text-background/60">Messaging validé. Scripts approuvés. SDR formé sur CloudAxis.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {["Messaging", "Scripts", "SDR"].map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/10 border border-background/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
              >
                <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[10px] font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer: Campaign Ready + Transition */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-border"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-xs font-semibold">CAMPAIGN READY</span>
            </div>
            <span className="text-sm text-muted hidden md:inline">Prêt à parler au marché.</span>
          </div>
          <button
            type="button"
            onClick={scrollToWeek3}
            className="group flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <span className="text-sm font-medium">Lancer l&apos;outbound</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
