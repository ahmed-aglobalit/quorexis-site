"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PIPELINE_STEPS = [
  { label: "ICP", status: "done" },
  { label: "Accounts", status: "done" },
  { label: "Decision Makers", status: "done" },
  { label: "Enrichment", status: "done" },
  { label: "Messaging", status: "done" },
  { label: "Sequences", status: "done" },
  { label: "SDR Training", status: "done" },
  { label: "Campaign Ready", status: "active" },
];

const ENRICHMENT_ITEMS = [
  { label: "Email", status: "verified" },
  { label: "Téléphone", status: "verified" },
  { label: "LinkedIn", status: "verified" },
  { label: "Company data", status: "verified" },
];

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
    <section id="demo-week-2" ref={ref} className="py-24 md:py-32 bg-foreground/[0.02]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Week 02 — Build
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-xs text-muted">Example campaign</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-6">
            Votre marché devient une machine<br />
            <span className="text-muted">outbound prête à être activée.</span>
          </h2>
        </motion.div>

        {/* Pipeline Flow */}
        <motion.div
          className="mb-16 overflow-x-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 min-w-max pb-4">
            {PIPELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <div
                  className={`px-4 py-2 rounded-lg border ${
                    step.status === "active"
                      ? "bg-accent text-white border-accent"
                      : "bg-background border-border"
                  }`}
                >
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <svg className="w-6 h-6 text-muted mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Accounts */}
          <motion.div
            className="p-8 rounded-2xl bg-background border border-border"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-6">
              Data Sourcing
            </h3>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-foreground/[0.02] border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">Accounts sourced</span>
                  <motion.span
                    className="text-2xl font-bold text-accent"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    2,481
                  </motion.span>
                </div>
                <p className="text-xs text-muted">example accounts</p>
              </div>
              <div className="p-4 rounded-lg bg-foreground/[0.02] border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">Decision makers identified</span>
                  <motion.span
                    className="text-2xl font-bold text-accent"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    1,847
                  </motion.span>
                </div>
                <p className="text-xs text-muted">example contacts</p>
              </div>
            </div>
          </motion.div>

          {/* Enrichment */}
          <motion.div
            className="p-8 rounded-2xl bg-background border border-border"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
                Enrichment
              </h3>
              <span className="text-lg font-bold text-accent">97%</span>
            </div>
            <div className="space-y-3">
              {ENRICHMENT_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-lg bg-foreground/[0.02] border border-border"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                >
                  <span className="text-sm">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-xs text-green-500 font-medium">verified</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Messaging */}
        <motion.div
          className="p-8 rounded-2xl bg-background border border-border mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-8">
            Messaging Framework
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <motion.div
              className="p-6 rounded-xl bg-foreground/[0.02] border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6L12 13 2 6" />
                </svg>
                <span className="font-semibold">Email</span>
              </div>
              <div className="space-y-2 text-sm">
                {["Subject", "Opening", "Pain point", "Value", "CTA"].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.9 + i * 0.05 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-muted">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              className="p-6 rounded-xl bg-foreground/[0.02] border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="font-semibold">LinkedIn</span>
              </div>
              <div className="space-y-2 text-sm">
                {["Connection request", "Follow-up", "Conversation opener"].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 1 + i * 0.05 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-muted">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Cold Call */}
            <motion.div
              className="p-6 rounded-xl bg-foreground/[0.02] border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="font-semibold">Cold Call</span>
              </div>
              <div className="space-y-2 text-sm">
                {["Opening", "Discovery question", "Objection handling", "Meeting ask"].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 1.1 + i * 0.05 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-muted">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Control */}
        <motion.div
          className="p-8 rounded-2xl bg-foreground text-background mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">
            Votre marque reste sous contrôle.
          </h3>
          <p className="text-background/70 mb-8 max-w-2xl">
            Aucun SDR ne parle au nom de votre entreprise sans comprendre votre offre,
            vos personas et votre positionnement.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Messaging approved", status: true },
              { label: "Scripts approved", status: true },
              { label: "SDR trained", status: true },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 border border-background/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
              >
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Campaign Ready */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="font-semibold">CAMPAIGN READY</span>
          </div>
        </motion.div>

        {/* Transition */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <p className="text-muted mb-2">La stratégie est prête. Les données sont prêtes. Votre SDR est prêt.</p>
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Maintenant, allons parler au marché.
          </h3>
          <button
            type="button"
            onClick={scrollToWeek3}
            className="group inline-flex flex-col items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
