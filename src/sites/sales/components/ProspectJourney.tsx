"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const JOURNEY = [
  { day: 1, action: "Compte recherché", type: "research", channel: null },
  { day: 2, action: "Email personnalisé envoyé", type: "email", channel: "Email" },
  { day: 3, action: "Profil LinkedIn consulté", type: "linkedin", channel: "LinkedIn" },
  { day: 5, action: "Demande de connexion envoyée", type: "linkedin", channel: "LinkedIn" },
  { day: 7, action: "Premier appel téléphonique", type: "phone", channel: "Téléphone" },
  { day: 8, action: "Email de relance", type: "email", channel: "Email" },
  { day: 10, action: "Appel connecté", type: "call-connected", channel: "Téléphone" },
  { day: 12, action: "RDV obtenu", type: "meeting", channel: null },
];

const TYPE_STYLES: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  research: {
    bg: "bg-purple-500/10",
    color: "text-purple-500",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  email: {
    bg: "bg-blue-500/10",
    color: "text-blue-500",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
  },
  linkedin: {
    bg: "bg-sky-500/10",
    color: "text-sky-500",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  phone: {
    bg: "bg-orange-500/10",
    color: "text-orange-500",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
      </svg>
    ),
  },
  "call-connected": {
    bg: "bg-green-500/10",
    color: "text-green-500",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  meeting: {
    bg: "bg-accent/10",
    color: "text-accent",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <polyline points="9 14 12 17 16 11" />
      </svg>
    ),
  },
};

export default function ProspectJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-36 bg-background" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Timeline */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Prospect card */}
            <div className="mb-8 p-6 rounded-xl bg-foreground/[0.02] border border-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-accent">CM</span>
                </div>
                <div>
                  <p className="font-semibold">Claire Martin</p>
                  <p className="text-sm text-muted">Directrice Technique</p>
                  <p className="text-xs text-muted mt-1">B2B SaaS · Paris · 85 employés</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-4">
                {JOURNEY.map((step, i) => {
                  const style = TYPE_STYLES[step.type];
                  return (
                    <motion.div
                      key={i}
                      className="relative flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    >
                      {/* Node */}
                      <div className={`absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full ${style.bg} flex items-center justify-center ${style.color}`}>
                        {style.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 ml-4 p-4 rounded-lg bg-foreground/[0.02] border border-border hover:border-accent/20 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted">Jour {step.day}</span>
                          {step.channel && (
                            <span className={`text-xs px-2 py-0.5 rounded ${style.bg} ${style.color}`}>
                              {step.channel}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm font-medium">{step.action}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 text-xs text-muted text-center">Exemple de parcours prospect</p>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.p
              className="text-sm font-semibold uppercase tracking-wider text-accent mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Approche multicanale
            </motion.p>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Un prospect.<br />
              <span className="text-muted">Plusieurs points de contact.</span>
            </motion.h2>
            <motion.p
              className="mt-6 text-lg text-muted leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Vos prospects ne vivent pas sur un seul canal. Votre prospection non plus.
              Nous coordonnons email, LinkedIn et téléphone en une séquence cohérente qui
              respecte le timing et construit la familiarité.
            </motion.p>

            <motion.div
              className="mt-10 grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <p className="text-2xl font-semibold text-blue-500">Email</p>
                <p className="text-xs text-muted mt-1">Séquences</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-sky-500/5 border border-sky-500/10">
                <p className="text-2xl font-semibold text-sky-500">LinkedIn</p>
                <p className="text-xs text-muted mt-1">Social</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-orange-500/5 border border-orange-500/10">
                <p className="text-2xl font-semibold text-orange-500">Téléphone</p>
                <p className="text-xs text-muted mt-1">Appels</p>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 p-6 rounded-xl bg-accent/5 border border-accent/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-sm text-foreground">
                <span className="font-semibold text-accent">3x plus de réponses</span>
                {" "}comparé à la prospection mono-canal.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
