"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

const WEEKS = [
  { week: "01", label: "STRATEGY", desc: "Comprendre votre marché" },
  { week: "02", label: "BUILD", desc: "Construire la machine" },
  { week: "03", label: "ACTIVATE", desc: "Lancer les campagnes" },
  { week: "04", label: "OPTIMIZE", desc: "Apprendre et ajuster" },
];

export default function First4WeeksTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-foreground/[0.02]" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            Après votre décision
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Voici ce qui se passe<br />
            <span className="text-muted">dans vos 4 premières semaines.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {WEEKS.map((w, i) => (
              <motion.div
                key={w.week}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                {/* Dot */}
                <div className="hidden md:flex absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                <div className="p-6 rounded-xl bg-background border border-border hover:border-accent/30 transition-colors text-center">
                  <div className="text-xs font-bold text-accent mb-2">
                    WEEK {w.week}
                  </div>
                  <div className="text-lg font-semibold mb-1">{w.label}</div>
                  <p className="text-sm text-muted">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href="/method#first-month"
            className="group inline-flex items-center gap-2 text-accent font-semibold hover:underline"
          >
            Voir le détail des 4 semaines
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
        </motion.div>
      </div>
    </section>
  );
}
