"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({ end, duration = 2, prefix = "", suffix = "" }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const FUNNEL_DATA = [
  { label: "Comptes", value: 2418, color: "bg-foreground/10" },
  { label: "Contacts", value: 1832, color: "bg-foreground/20" },
  { label: "Réponses", value: 326, color: "bg-foreground/30" },
  { label: "Conversations", value: 142, color: "bg-foreground/40" },
  { label: "Qualifiés", value: 72, color: "bg-accent/50" },
  { label: "RDV", value: 31, color: "bg-accent/70" },
  { label: "Opportunités", value: 11, color: "bg-accent" },
];

const CHANNEL_DATA = [
  { channel: "Email", sent: 4847, replies: 218, rate: "4.5%" },
  { channel: "LinkedIn", sent: 1832, replies: 89, rate: "4.9%" },
  { channel: "Phone", calls: 412, connected: 127, rate: "31%" },
];

const MEETINGS = [
  { time: "09:30", company: "TechFlow", persona: "CTO", status: "confirmed" },
  { time: "11:00", company: "DataSync", persona: "VP Eng", status: "confirmed" },
  { time: "14:30", company: "CloudPeak", persona: "CIO", status: "pending" },
];

export default function CommandCenter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-36 bg-foreground/[0.02]" ref={containerRef}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cmd-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cmd-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Votre Centre de Contrôle Outbound</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Visibilité totale.<br />
            <span className="text-muted">Contrôle en temps réel.</span>
          </h2>
        </motion.div>

        {/* Dashboard */}
        <motion.div
          className="bg-background border border-border rounded-2xl shadow-2xl shadow-black/5 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-border bg-foreground/[0.02]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-muted uppercase tracking-wider">Live</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Campagne :</span>
                <span className="text-xs font-medium px-2 py-1 bg-foreground/5 rounded">France — Services IT — CTO</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted">Période :</span>
              <span className="text-xs font-medium px-2 py-1 bg-foreground/5 rounded">30 derniers jours</span>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {[
              { label: "Comptes ciblés", value: 2418 },
              { label: "Contacts atteints", value: 1832 },
              { label: "Conversations", value: 142 },
              { label: "RDV obtenus", value: 31 },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                className="bg-background p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <p className="text-xs text-muted uppercase tracking-wider mb-2">{kpi.label}</p>
                <p className="text-2xl md:text-3xl font-semibold font-mono">
                  <CountUp end={kpi.value} />
                </p>
              </motion.div>
            ))}
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
            {/* Funnel */}
            <div className="lg:col-span-2 bg-background p-6">
              <p className="text-xs text-muted uppercase tracking-wider mb-6">Entonnoir Pipeline</p>
              <div className="space-y-3">
                {FUNNEL_DATA.map((stage, i) => {
                  const width = (stage.value / FUNNEL_DATA[0].value) * 100;
                  return (
                    <motion.div
                      key={stage.label}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    >
                      <span className="w-24 text-xs text-muted text-right">{stage.label}</span>
                      <div className="flex-1 h-8 bg-foreground/[0.03] rounded-sm overflow-hidden">
                        <motion.div
                          className={`h-full ${stage.color} flex items-center justify-end pr-3`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${width}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                        >
                          <span className="text-xs font-mono font-medium">{stage.value.toLocaleString()}</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pipeline value */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-muted uppercase tracking-wider">Pipeline généré</span>
                  <span className="text-3xl font-semibold text-green-500 font-mono">
                    €<CountUp end={228} suffix="K" />
                  </span>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="bg-background">
              {/* Channel breakdown */}
              <div className="p-6 border-b border-border">
                <p className="text-xs text-muted uppercase tracking-wider mb-4">Performance par canal</p>
                <div className="space-y-4">
                  {CHANNEL_DATA.map((ch) => (
                    <div key={ch.channel} className="flex items-center justify-between">
                      <span className="text-sm">{ch.channel}</span>
                      <span className="text-sm font-mono text-accent">{ch.rate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's meetings */}
              <div className="p-6">
                <p className="text-xs text-muted uppercase tracking-wider mb-4">RDV du jour</p>
                <div className="space-y-3">
                  {MEETINGS.map((meeting) => (
                    <div key={meeting.time} className="flex items-center gap-3 p-3 rounded-lg bg-foreground/[0.02] border border-border">
                      <span className="text-xs font-mono text-muted">{meeting.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{meeting.company}</p>
                        <p className="text-xs text-muted">{meeting.persona}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${meeting.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-border bg-foreground/[0.02]">
            <p className="text-xs text-muted text-center">Campagne exemple - Interface démonstrative</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
