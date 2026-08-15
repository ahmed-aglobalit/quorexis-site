"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TIMELINE_EVENTS = [
  { time: "09:02", type: "email", label: "Email sent", detail: "VP Sales — Example Company" },
  { time: "09:18", type: "linkedin", label: "LinkedIn connection accepted", detail: null },
  { time: "10:07", type: "call", label: "Cold call", detail: null },
  { time: "10:09", type: "conversation", label: "Conversation started", detail: null },
  { time: "10:12", type: "objection", label: "Objection reçue", detail: "\"Nous travaillons déjà avec un prestataire.\"" },
  { time: "10:14", type: "handled", label: "Objection handled", detail: null },
  { time: "11:42", type: "email", label: "Follow-up sent", detail: null },
  { time: "14:16", type: "response", label: "Interested response", detail: null },
  { time: "15:30", type: "meeting", label: "MEETING BOOKED", detail: null },
];

const MEETING_BRIEF = [
  { label: "Company", value: "Example Company" },
  { label: "Contact", value: "VP Sales" },
  { label: "Need", value: "Pipeline outbound insuffisant" },
  { label: "Context", value: "Équipe commerciale de 5 personnes, focus inbound" },
  { label: "Objection", value: "Prestataire actuel non performant" },
  { label: "Interest", value: "Approche hybride Tech + Humain" },
  { label: "Next step", value: "Discovery call — Jeudi 10:30" },
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
    <section id="demo-week-3" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Week 03 — Activate
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground/5 border border-border">
              <span className="text-xs text-muted">Example campaign</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-6">
            Votre SDR entre maintenant<br />
            <span className="text-muted">en conversation avec votre marché.</span>
          </h2>
        </motion.div>

        {/* Live Outbound Interface */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-8 rounded-2xl bg-foreground/[0.02] border border-border">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Quorexis Live Outbound
                </h3>
              </div>
              <span className="text-xs text-muted">Example simulation</span>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-[52px] top-0 bottom-0 w-px bg-border" />

              <div className="space-y-4">
                {TIMELINE_EVENTS.map((event, i) => (
                  <motion.div
                    key={`${event.time}-${event.type}`}
                    className="relative flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    <span className="w-12 text-right text-xs font-mono text-muted shrink-0">
                      {event.time}
                    </span>
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        event.type === "meeting"
                          ? "bg-accent text-white"
                          : event.type === "objection"
                          ? "bg-orange-500/10 text-orange-500 border border-orange-500/30"
                          : "bg-foreground/5 text-muted border border-border"
                      }`}
                    >
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className={`font-medium ${event.type === "meeting" ? "text-accent text-lg" : ""}`}>
                        {event.label}
                      </p>
                      {event.detail && (
                        <p className={`text-sm mt-1 ${event.type === "objection" ? "italic text-orange-500" : "text-muted"}`}>
                          {event.detail}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Meeting Brief */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="p-8 rounded-2xl bg-accent/5 border border-accent/20">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent mb-6">
              Meeting Brief — Transmis à votre commercial
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MEETING_BRIEF.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="p-4 rounded-lg bg-background border border-border"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.05 }}
                >
                  <p className="text-xs text-muted mb-1">{item.label}</p>
                  <p className="font-medium text-sm">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* WE PROSPECT. YOU CLOSE. */}
        <motion.div
          className="text-center py-16 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            WE PROSPECT.
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-accent mb-8">
            YOU CLOSE.
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto mb-6">
            Quorexis ouvre la conversation, traite les premières objections, qualifie l&apos;intérêt
            et transmet le contexte à votre équipe commerciale.
          </p>
          <p className="text-lg font-medium max-w-2xl mx-auto">
            Votre commercial arrive au rendez-vous pour vendre, pas pour découvrir qui est le prospect.
          </p>
        </motion.div>

        {/* Transition */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-muted mb-4">
            Mais une campagne Quorexis ne s&apos;arrête pas au nombre d&apos;appels ou d&apos;emails envoyés.
          </p>
          <button
            type="button"
            onClick={scrollToWeek4}
            className="group inline-flex flex-col items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <span className="font-semibold">Voyons ce que le marché nous apprend.</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
