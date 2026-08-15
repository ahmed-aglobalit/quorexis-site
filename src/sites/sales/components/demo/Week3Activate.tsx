"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TIMELINE = [
  { time: "09:02", label: "Email sent", icon: "email" },
  { time: "09:18", label: "LinkedIn accepted", icon: "linkedin" },
  { time: "10:07", label: "Cold call", icon: "call" },
  { time: "10:12", label: "Objection handled", icon: "shield" },
  { time: "14:16", label: "Interest confirmed", icon: "check" },
  { time: "15:30", label: "MEETING BOOKED", icon: "meeting" },
];

export default function Week3Activate() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToWeek4 = () => {
    const el = document.getElementById("demo-week-4");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="demo-week-3" ref={ref} className="py-12 md:py-16 bg-foreground/[0.02] min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-2 py-1 rounded-full bg-accent/10 text-xs font-bold text-accent">
              WEEK 03
            </span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted">Live simulation</span>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Votre SDR parle au marché.
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="space-y-2">
            {TIMELINE.map((event, i) => (
              <motion.div
                key={event.time}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  event.icon === "meeting" ? "bg-accent/10 border border-accent/20" : "bg-background border border-border"
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              >
                <span className="text-xs font-mono text-muted w-10">{event.time}</span>
                <span className={`text-sm ${event.icon === "meeting" ? "font-bold text-accent" : ""}`}>
                  {event.label}
                </span>
                {event.icon === "meeting" && (
                  <svg className="w-4 h-4 text-accent ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* WE PROSPECT. YOU CLOSE. */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl md:text-2xl font-bold">
            WE PROSPECT. <span className="text-accent">YOU CLOSE.</span>
          </h3>
          <p className="text-sm text-muted mt-2 max-w-md mx-auto">
            Votre commercial arrive au RDV pour vendre, pas pour découvrir le prospect.
          </p>
        </motion.div>

        {/* Transition */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            type="button"
            onClick={scrollToWeek4}
            className="flex flex-col items-center gap-1 mx-auto text-accent hover:text-accent/80 transition-colors"
          >
            <span className="text-sm font-medium">Voir l&apos;optimisation</span>
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
