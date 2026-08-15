"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

const STEPS = [
  { key: "target", label: "TARGET", desc: "Définir votre ICP" },
  { key: "build", label: "BUILD", desc: "Construire la machine" },
  { key: "activate", label: "ACTIVATE", desc: "Lancer les campagnes" },
  { key: "qualify", label: "QUALIFY", desc: "Qualifier les conversations" },
  { key: "optimize", label: "OPTIMIZE", desc: "Améliorer en continu" },
];

export default function MethodTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
              Notre méthode
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Une machine commerciale<br />
              <span className="text-muted">construite avec méthode.</span>
            </h2>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              De votre marché cible au premier rendez-vous qualifié, chaque étape de votre outbound
              est construite, opérée et mesurée.
            </p>
            <div className="mt-8">
              <Link
                href="/method"
                className="group inline-flex items-center gap-2 text-accent font-semibold hover:underline"
              >
                Découvrir notre méthode
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual flow */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-accent via-accent/50 to-accent/20" />

              <div className="space-y-4">
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.key}
                    className="relative flex items-center gap-4 pl-12"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 w-4 h-4 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>

                    {/* Card */}
                    <div className="flex-1 p-4 rounded-lg bg-foreground/[0.02] border border-border hover:border-accent/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-accent">
                          {step.label}
                        </span>
                        <span className="text-xs text-muted">0{i + 1}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Transition to next section */}
        <motion.p
          className="mt-16 text-center text-muted"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Maintenant que vous connaissez notre approche, voyons quelle capacité vous pouvez déployer.
        </motion.p>
      </div>
    </section>
  );
}
