"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TIMELINE_EVENTS = [
  { time: "09:02", type: "email", label: "Email envoyé", detail: "Marc Dubois — Datalux" },
  { time: "10:15", type: "linkedin", label: "LinkedIn accepté", detail: null },
  { time: "11:30", type: "call", label: "Cold call", detail: null },
  { time: "11:32", type: "objection", label: "Objection", detail: "\"On a un consultant ponctuel\"" },
  { time: "11:35", type: "handled", label: "Handled", detail: null },
  { time: "15:00", type: "meeting", label: "MEETING BOOKED", detail: null },
];

const MEETING_BRIEF = [
  { label: "Entreprise", value: "Datalux — SaaS 120 emp." },
  { label: "Contact", value: "Marc Dubois, VP Engineering" },
  { label: "Besoin", value: "Migration cloud, équipe DevOps débordée" },
  { label: "Objection", value: "\"Consultant ponctuel pour urgences\"" },
  { label: "Handled", value: "Managed = proactif, pas réactif" },
  { label: "Intérêt", value: "24/7 monitoring + scaling auto" },
  { label: "Next step", value: "Discovery call — Jeudi 14:00" },
];

export default function Week3Activate() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToWeek4 = () => {
    const el = document.getElementById("demo-week-4");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "email":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 6L12 13 2 6" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case "call":
      case "conversation":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        );
      case "objection":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        );
      case "handled":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case "response":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "meeting":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="demo-week-3"
      ref={ref}
      className="min-h-[calc(100svh-80px)] py-8 md:py-12 bg-background flex flex-col"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Week 03 — Activate
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-xs text-muted">Campagne CloudAxis</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
            Votre SDR entre en conversation<span className="text-muted"> avec votre marché.</span>
          </h2>
        </motion.div>

        {/* Main Grid: Timeline + Meeting Brief */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 flex-1">
          {/* Live Outbound Timeline - Compact */}
          <motion.div
            className="p-4 md:p-5 rounded-xl bg-foreground/[0.02] border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                Live Outbound — Datalux
              </h3>
            </div>
            <div className="relative">
              <div className="absolute left-[44px] top-0 bottom-0 w-px bg-border" />
              <div className="space-y-2">
                {TIMELINE_EVENTS.map((event, i) => (
                  <motion.div
                    key={`${event.time}-${event.type}`}
                    className="relative flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  >
                    <span className="w-10 text-right text-[10px] font-mono text-muted shrink-0">
                      {event.time}
                    </span>
                    <div
                      className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        event.type === "meeting"
                          ? "bg-accent text-white"
                          : event.type === "objection"
                          ? "bg-orange-500/10 text-orange-500 border border-orange-500/30"
                          : "bg-foreground/5 text-muted border border-border"
                      }`}
                    >
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-medium ${event.type === "meeting" ? "text-accent" : ""}`}>
                        {event.label}
                      </p>
                      {event.detail && (
                        <p className={`text-[10px] ${event.type === "objection" ? "italic text-orange-500" : "text-muted"}`}>
                          {event.detail}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Meeting Brief - THE DIFFERENTIATOR */}
          <motion.div
            className="p-4 md:p-5 rounded-xl bg-accent/5 border border-accent/20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
                Meeting Brief — Transmis à votre commercial
              </h3>
              <span className="text-[10px] text-accent/70">WE PROSPECT. YOU CLOSE.</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {MEETING_BRIEF.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="p-2 rounded-lg bg-background border border-border"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.03 }}
                >
                  <p className="text-[10px] text-muted uppercase">{item.label}</p>
                  <p className="text-xs font-medium">{item.value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 p-2 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-[10px] text-center text-accent">
                Votre commercial arrive préparé, pas pour découvrir.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer: Transition */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-border"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-xs font-semibold">MEETING BOOKED</span>
            </div>
            <span className="text-sm text-muted hidden md:inline">Mais on ne s&apos;arrête pas là.</span>
          </div>
          <button
            type="button"
            onClick={scrollToWeek4}
            className="group flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <span className="text-sm font-medium">Voir les optimisations</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
