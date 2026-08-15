"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function DemoIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToWeek1 = () => {
    const el = document.getElementById("demo-week-1");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="demo-intro"
      ref={ref}
      className="py-12 md:py-16 bg-background border-b border-border"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Simulation CloudAxis
                </span>
              </div>
              <div className="flex -space-x-1.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
              Vos 4 premières semaines<span className="text-muted"> avec Quorexis.</span>
            </h2>
            <p className="mt-2 text-sm text-muted max-w-xl">
              Suivez une vraie campagne: CloudAxis, Managed Cloud & DevOps, ciblant les SaaS 50-250 en France.
            </p>
          </div>
          <motion.button
            type="button"
            onClick={scrollToWeek1}
            className="group flex items-center gap-3 px-5 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium">Commencer Week 01</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
