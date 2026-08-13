"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ACTIVITIES = [
  { time: "09:31", type: "identify", text: "New decision maker identified", meta: "CTO — SaaS — Paris" },
  { time: "09:34", type: "enrich", text: "Email verified", meta: "98% deliverability score" },
  { time: "09:42", type: "linkedin", text: "LinkedIn connection accepted", meta: "Head of Engineering" },
  { time: "10:03", type: "call", text: "Cold call connected", meta: "2m 43s conversation" },
  { time: "10:08", type: "qualify", text: "Lead qualified", meta: "Budget confirmed, Q1 project" },
  { time: "10:11", type: "meeting", text: "Meeting booked", meta: "Thursday — 11:00" },
  { time: "10:24", type: "email", text: "Email reply received", meta: "\"Send me more information\"" },
  { time: "10:38", type: "identify", text: "New account added", meta: "CloudTech — 120 employees" },
];

const ICONS: Record<string, React.ReactNode> = {
  identify: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  enrich: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  linkedin: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  call: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  qualify: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  meeting: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  email: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  ),
};

const COLORS: Record<string, string> = {
  identify: "bg-blue-500/10 text-blue-500",
  enrich: "bg-green-500/10 text-green-500",
  linkedin: "bg-sky-500/10 text-sky-500",
  call: "bg-orange-500/10 text-orange-500",
  qualify: "bg-purple-500/10 text-purple-500",
  meeting: "bg-accent/10 text-accent",
  email: "bg-pink-500/10 text-pink-500",
};

export default function LiveActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= ACTIVITIES.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="py-24 md:py-36 bg-background" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.p
              className="text-sm font-semibold uppercase tracking-wider text-accent mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Always Running
            </motion.p>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              While your sales team closes...
            </motion.h2>
            <motion.p
              className="mt-6 text-lg text-muted leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your outbound engine keeps working. Identifying prospects, verifying data,
              sending sequences, making calls, booking meetings. Every day. Every hour.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm">Data enrichment</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm">Email sequences</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-sm">Cold calls</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Activity feed */}
          <motion.div
            className="relative bg-foreground/[0.02] border border-border rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-muted uppercase tracking-wider">Live Activity</span>
              </div>
              <span className="text-xs text-muted font-mono">Campaign simulation</span>
            </div>

            {/* Activity list */}
            <div className="p-5 space-y-3 h-[400px] overflow-hidden">
              <AnimatePresence mode="popLayout">
                {ACTIVITIES.slice(0, visibleCount).map((activity) => (
                  <motion.div
                    key={`${activity.time}-${activity.type}`}
                    className="flex items-start gap-4 p-3 rounded-lg bg-background border border-border"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-xs font-mono text-muted shrink-0 pt-0.5">{activity.time}</span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${COLORS[activity.type]}`}>
                      {ICONS[activity.type]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-muted mt-0.5 truncate">{activity.meta}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator when loading */}
              {visibleCount < ACTIVITIES.length && visibleCount > 0 && (
                <motion.div
                  className="flex items-center gap-2 px-4 py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
