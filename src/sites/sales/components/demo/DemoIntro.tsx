"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function DemoIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
      className="py-12 md:py-16 bg-background min-h-[70vh] flex items-center"
    >
      <div className="mx-auto max-w-[1000px] px-6 md:px-12 w-full">
        {/* Transition + Main content combined */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-muted mb-3">Vous avez choisi votre capacité.</p>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight mb-4">
            Voyez ce qui se passe<br />
            <span className="text-accent">lorsque Quorexis démarre.</span>
          </h2>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Campaign Simulation
            </span>
          </div>

          {/* Day 0 */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-border" />
            <div className="px-3 py-1.5 rounded-lg bg-foreground/5 border border-border">
              <span className="text-xs font-mono font-semibold">DAY 0</span>
              <span className="mx-2 text-muted">—</span>
              <span className="text-xs text-muted">Campaign accepted</span>
            </div>
            <div className="w-8 h-px bg-border" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex -space-x-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-accent">
              Votre équipe est prête.
            </p>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={scrollToWeek1}
            className="group inline-flex flex-col items-center gap-1 text-accent hover:text-accent/80 transition-colors"
          >
            <span className="text-sm font-semibold">Commencer la semaine 1</span>
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
