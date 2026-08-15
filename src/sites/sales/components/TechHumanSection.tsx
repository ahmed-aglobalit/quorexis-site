"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TECH_ITEMS = [
  { label: "Enrichissement data", icon: "database" },
  { label: "Recherche IA", icon: "brain" },
  { label: "Segmentation", icon: "filter" },
  { label: "Automatisation workflow", icon: "workflow" },
  { label: "Sync CRM", icon: "sync" },
];

const HUMAN_ITEMS = [
  { label: "Appels de découverte", icon: "phone" },
  { label: "Gestion des objections", icon: "shield" },
  { label: "Qualification", icon: "check" },
  { label: "Construction de relations", icon: "heart" },
  { label: "Prise de RDV", icon: "calendar" },
];

function TechIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    database: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    brain: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4.5c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5l5.5 6 5.5-6c1.5-1.5 1.5-4 0-5.5s-4-1.5-5.5 0" />
        <path d="M12 16v4" />
        <path d="M8 20h8" />
      </svg>
    ),
    filter: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
    workflow: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="3" width="6" height="6" rx="1" />
        <rect x="9" y="15" width="6" height="6" rx="1" />
        <path d="M6 9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9" />
        <path d="M12 12v3" />
      </svg>
    ),
    sync: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M21.5 2v6h-6" />
        <path d="M2.5 22v-6h6" />
        <path d="M21.5 8A10 10 0 0 0 3.07 7.5" />
        <path d="M2.5 16a10 10 0 0 0 18.43.5" />
      </svg>
    ),
    phone: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    shield: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    check: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    heart: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    calendar: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  };
  return icons[type] || null;
}

export default function TechHumanSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-36 bg-foreground/[0.03]" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            La technologie pour scaler.
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-muted mt-2">
            L&apos;humain pour la confiance.
          </h2>
        </motion.div>

        {/* Split view */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
          {/* Technology */}
          <motion.div
            className="bg-background p-8 md:p-12"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Technologie</h3>
            </div>

            <div className="space-y-4">
              {TECH_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-lg bg-foreground/[0.02] border border-border hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center text-muted">
                    <TechIcon type={item.icon} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 p-4 rounded-lg bg-accent/5 border border-accent/20"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-sm text-accent font-medium">
                Automatise le répétitif. Amplifie le stratégique.
              </p>
            </motion.div>
          </motion.div>

          {/* Human */}
          <motion.div
            className="bg-background p-8 md:p-12"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">SDR Humain</h3>
            </div>

            <div className="space-y-4">
              {HUMAN_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-lg bg-foreground/[0.02] border border-border hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center text-muted">
                    <TechIcon type={item.icon} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 p-4 rounded-lg bg-green-500/5 border border-green-500/20"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p className="text-sm text-green-600 font-medium">
                Crée la confiance. Construit les relations. Conclut les deals.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom equation */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-foreground/5 border border-border">
            <span className="text-lg font-semibold">Technologie</span>
            <span className="text-2xl text-accent">+</span>
            <span className="text-lg font-semibold">Humain</span>
            <span className="text-2xl text-muted">=</span>
            <span className="text-lg font-semibold text-accent">Pipeline</span>
          </div>
        </motion.div>

        {/* Transition to next section */}
        <motion.div
          className="mt-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-center text-muted mb-4">
            Qui est derrière Quorexis ?
          </p>
          <motion.div
            className="flex flex-col items-center text-accent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm font-semibold mb-1">Rencontrez les fondateurs</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
