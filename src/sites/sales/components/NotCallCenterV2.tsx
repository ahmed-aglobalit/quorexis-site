"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function NotCallCenterV2() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-foreground text-background overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="notcc-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#notcc-grid)" />
        </svg>
      </div>

      <div className="relative py-24 md:py-36 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          {/* Label */}
          <motion.p
            className="text-sm font-semibold uppercase tracking-wider text-background/50 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Un modèle différent
          </motion.p>

          {/* Main headline */}
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95]"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Pas un call center.
          </motion.h2>
          <motion.h3
            className="mt-2 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] text-background/40"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Une équipe revenue outbound.
          </motion.h3>

          {/* Comparison */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Call Center */}
            <motion.div
              className="opacity-50"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 0.5, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-background/40 mb-8">
                Call Center Traditionnel
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-background/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-background/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span className="text-lg text-background/60">Volume d&apos;appels</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-background/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-background/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <span className="text-lg text-background/60">Scripts standards</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-background/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-background/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  </div>
                  <span className="text-lg text-background/60">Téléphone uniquement</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-background/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-background/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="text-lg text-background/60">KPIs d&apos;activité</span>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-lg bg-background/5 border border-background/10">
                <p className="text-4xl font-mono text-background/40">5,000</p>
                <p className="text-sm text-background/30 mt-1">appels passés</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-background/40">???</span>
                  <span className="text-xs text-background/30">pipeline généré</span>
                </div>
              </div>
            </motion.div>

            {/* Quorexis */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-8">
                Quorexis
              </h4>
              <div className="space-y-3">
                {["Stratégie ICP", "Data enrichie", "Multi-canal", "SDRs B2B formés", "Playbooks personnalisés", "Qualification business"].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-10 p-6 rounded-lg bg-accent/10 border border-accent/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <p className="text-4xl font-mono text-accent">€228K</p>
                <p className="text-sm text-background/60 mt-1">pipeline généré</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-accent">31</span>
                  <span className="text-xs text-background/50">RDV qualifiés</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom statement */}
          <motion.div
            className="mt-24 md:mt-32 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              <span className="text-background/40">Le volume, c&apos;est de l&apos;activité.</span>
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-2">
              <span className="text-accent">Le pipeline, c&apos;est le résultat.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
