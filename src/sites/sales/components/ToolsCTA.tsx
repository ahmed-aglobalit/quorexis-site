"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

const TOOLS_PREVIEW = [
  { name: "Pipeline Calculator", desc: "Estimez votre capacité", icon: "📊" },
  { name: "ICP Builder", desc: "Définissez votre cible", icon: "🎯" },
  { name: "Cold Email Generator", desc: "Créez vos emails", icon: "✉️" },
];

export default function ToolsCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-foreground/[0.02]" ref={ref}>
      <div className="mx-auto max-w-[1000px] px-6 md:px-12">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-3">
            Besoin de préparer ?
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Nos outils gratuits pour structurer<br />
            <span className="text-muted">votre stratégie outbound.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {TOOLS_PREVIEW.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="p-5 rounded-xl bg-background border border-border text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              <div className="text-2xl mb-2">{tool.icon}</div>
              <div className="font-semibold text-sm mb-1">{tool.name}</div>
              <div className="text-xs text-muted">{tool.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/tools"
            className="group inline-flex items-center gap-2 text-accent font-semibold hover:underline"
          >
            Découvrir tous nos outils gratuits
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
