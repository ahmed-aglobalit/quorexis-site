"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Week2Build() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToWeek3 = () => {
    const el = document.getElementById("demo-week-3");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="demo-week-2" ref={ref} className="py-12 md:py-16 bg-background min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-2 py-1 rounded-full bg-accent/10 text-xs font-bold text-accent">
              WEEK 02
            </span>
            <span className="text-xs text-muted">Example campaign</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            La machine outbound se construit.
          </h2>
        </motion.div>

        {/* Pipeline Flow */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {["ICP", "Accounts", "Contacts", "Enrichment", "Messaging", "Sequences"].map((step, i) => (
            <div key={step} className="flex items-center">
              <span className="px-3 py-1.5 rounded-lg bg-accent/10 text-xs font-medium">{step}</span>
              {i < 5 && <span className="mx-1 text-muted">→</span>}
            </div>
          ))}
        </motion.div>

        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Data */}
          <div className="p-4 rounded-xl bg-foreground/[0.02] border border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Data</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted">Accounts</span>
                <span className="text-sm font-bold text-accent">2,481</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Contacts</span>
                <span className="text-sm font-bold text-accent">1,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">Enrichment</span>
                <span className="text-sm font-bold text-green-500">97%</span>
              </div>
            </div>
          </div>

          {/* Messaging */}
          <div className="p-4 rounded-xl bg-foreground/[0.02] border border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Messaging</h3>
            <div className="space-y-1 text-sm">
              {["Email sequences", "LinkedIn messages", "Cold call scripts"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Control */}
          <div className="p-4 rounded-xl bg-foreground/[0.02] border border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Brand Control</h3>
            <div className="space-y-1 text-sm">
              {["Messaging approved", "Scripts approved", "SDR trained"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Campaign Ready + Transition */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-sm font-semibold">CAMPAIGN READY</span>
          </div>

          <button
            type="button"
            onClick={scrollToWeek3}
            className="flex flex-col items-center gap-1 mx-auto text-accent hover:text-accent/80 transition-colors"
          >
            <span className="text-sm font-medium">Voir le SDR en action</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
