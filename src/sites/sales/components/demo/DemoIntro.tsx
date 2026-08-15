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
      className="py-32 md:py-40 bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
        {/* Transition */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg md:text-xl text-white/60 mb-6">
            Vous avez choisi votre capacité.
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white">
            Maintenant, voyez ce qui se passe<br />
            <span className="text-accent">lorsque Quorexis démarre votre campagne.</span>
          </h2>
          <p className="mt-8 text-lg text-white/60 max-w-2xl mx-auto">
            Suivez votre premier mois avec notre équipe, semaine après semaine.
          </p>
        </motion.div>

        {/* Campaign Simulation Banner */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Campaign Simulation
            </span>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
            Votre premier mois avec Quorexis.
          </h3>
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12">
            Imaginez que votre campagne commence aujourd&apos;hui. Voici comment notre équipe
            transforme votre marché cible en conversations commerciales qualifiées.
          </p>
        </motion.div>

        {/* Day 0 */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-white/20" />
            <div className="px-4 py-2 rounded-lg bg-white/10 border border-white/20">
              <span className="text-sm font-mono font-semibold text-white">DAY 0</span>
              <span className="mx-3 text-white/40">—</span>
              <span className="text-sm text-white/70">Campaign accepted</span>
            </div>
            <div className="w-12 h-px bg-white/20" />
          </div>

          <motion.div
            className="flex items-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-accent/30 border-2 border-[#0a0a0a] flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              ))}
            </div>
            <p className="text-lg font-medium text-accent">
              Votre équipe Quorexis est prête.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.button
            type="button"
            onClick={scrollToWeek1}
            className="group flex flex-col items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <span className="text-lg font-semibold">Commencer la semaine 1</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
