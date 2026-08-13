"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const COMPANIES = ["Acme Corp", "TechFlow", "DataSync", "CloudPeak", "NeoScale"];
const STAGES = ["target", "enrich", "outreach", "conversation", "meeting", "pipeline"];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function OutboundEngine() {
  const prefersReducedMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const [activeCompany, setActiveCompany] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveCompany((prev) => (prev + 1) % COMPANIES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full max-w-md">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="engine-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#engine-grid)" />
        </svg>
      </div>

      {/* Engine visualization */}
      <div className="relative bg-foreground/[0.02] border border-border rounded-xl p-6 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-muted uppercase tracking-wider">Live Engine</span>
          </div>
          <span className="text-xs text-muted font-mono">Example campaign</span>
        </div>

        {/* Pipeline stages */}
        <div className="space-y-3">
          {/* Target Accounts */}
          <motion.div
            className={`p-4 rounded-lg border transition-colors duration-500 ${activeStage === 0 ? "border-accent bg-accent/5" : "border-border bg-background"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Target Accounts</span>
              <span className="text-xs font-mono text-accent">2,481</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {COMPANIES.map((company, i) => (
                <motion.span
                  key={company}
                  className={`px-2 py-1 text-xs rounded-md transition-all duration-300 ${i === activeCompany ? "bg-accent text-white" : "bg-foreground/5 text-muted"}`}
                >
                  {company}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center">
            <motion.div
              className="w-px h-4 bg-border relative overflow-hidden"
              initial={{ opacity: 0.5 }}
            >
              <motion.div
                className="absolute inset-x-0 h-2 bg-accent"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          {/* Enrichment */}
          <motion.div
            className={`p-4 rounded-lg border transition-colors duration-500 ${activeStage === 1 ? "border-accent bg-accent/5" : "border-border bg-background"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Enrichment</span>
              <span className="text-xs font-mono text-green-500">97%</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-muted">Email</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-muted">Phone</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-muted">LinkedIn</span>
              </div>
            </div>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center">
            <motion.div className="w-px h-4 bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-x-0 h-2 bg-accent"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.3 }}
              />
            </motion.div>
          </div>

          {/* Outreach */}
          <motion.div
            className={`p-4 rounded-lg border transition-colors duration-500 ${activeStage === 2 ? "border-accent bg-accent/5" : "border-border bg-background"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Outreach</span>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-foreground/5">
                <svg className="w-3 h-3 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
                <span className="text-xs text-muted">Email</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-foreground/5">
                <svg className="w-3 h-3 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="text-xs text-muted">LinkedIn</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-foreground/5">
                <svg className="w-3 h-3 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-xs text-muted">Phone</span>
              </div>
            </div>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center">
            <motion.div className="w-px h-4 bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-x-0 h-2 bg-accent"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.6 }}
              />
            </motion.div>
          </div>

          {/* Conversation */}
          <motion.div
            className={`p-4 rounded-lg border transition-colors duration-500 ${activeStage === 3 ? "border-accent bg-accent/5" : "border-border bg-background"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Conversations</span>
              <span className="text-xs font-mono text-accent">31</span>
            </div>
            <div className="space-y-2">
              <motion.div
                className="text-xs text-muted italic bg-foreground/5 px-3 py-2 rounded"
                animate={{ opacity: activeStage === 3 ? 1 : 0.5 }}
              >
                Interested, let&apos;s discuss next week
              </motion.div>
            </div>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center">
            <motion.div className="w-px h-4 bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-x-0 h-2 bg-accent"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.9 }}
              />
            </motion.div>
          </div>

          {/* Meeting */}
          <motion.div
            className={`p-4 rounded-lg border transition-colors duration-500 ${activeStage === 4 ? "border-accent bg-accent/5" : "border-border bg-background"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Meeting Booked</span>
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-xs font-mono text-accent">Thu 10:30</span>
              </div>
            </div>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center">
            <motion.div className="w-px h-4 bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-x-0 h-2 bg-green-500"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 1.2 }}
              />
            </motion.div>
          </div>

          {/* Pipeline */}
          <motion.div
            className={`p-4 rounded-lg border transition-colors duration-500 ${activeStage === 5 ? "border-green-500 bg-green-500/5" : "border-border bg-background"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Pipeline</span>
              <motion.span
                className="text-lg font-semibold text-green-500 font-mono"
                key={activeStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                €184K
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function SalesHeroV2() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>

      {/* Gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <motion.p
              className="text-sm font-semibold uppercase tracking-wider text-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              B2B Outbound Engine
            </motion.p>

            <motion.h1
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block text-foreground">{t("headline1")}</span>
              <span className="block text-muted">{t("headline2")}</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-muted leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 active:translate-y-0 transition-all duration-200"
              >
                {t("cta")}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("quorexis:open-assistant", { detail: { mode: "ai" } }))}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Parler avec l&apos;IA
              </button>
            </motion.div>

            <motion.div
              className="mt-10 flex items-center gap-6 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                France
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Europe
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Canada
              </span>
            </motion.div>
          </div>

          {/* Right: Outbound Engine */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OutboundEngine />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div className="w-1 h-2 rounded-full bg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
