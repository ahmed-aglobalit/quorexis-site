"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const CTA_MESSAGES = [
  { id: "demo-intro", text: "Commencer la semaine 1", next: "demo-week-1" },
  { id: "demo-week-1", text: "Voir la construction de la campagne", next: "demo-week-2" },
  { id: "demo-week-2", text: "Voir votre SDR en action", next: "demo-week-3" },
  { id: "demo-week-3", text: "Voir l'optimisation", next: "demo-week-4" },
  { id: "demo-week-4", text: "Voir le résultat du premier mois", next: "demo-summary" },
];

export default function DemoFloatingCTA() {
  const [currentCTA, setCurrentCTA] = useState<typeof CTA_MESSAGES[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const demoContainer = document.getElementById("quorexis-demo");
      if (!demoContainer) return;

      const rect = demoContainer.getBoundingClientRect();
      const isInDemo = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.5;

      const summaryEl = document.getElementById("demo-summary");
      const summaryRect = summaryEl?.getBoundingClientRect();
      const isInSummary = summaryRect && summaryRect.top < window.innerHeight * 0.5;

      setIsVisible(isInDemo && !isInSummary);

      let current: typeof CTA_MESSAGES[0] | null = null;
      for (const cta of CTA_MESSAGES) {
        const el = document.getElementById(cta.id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top < window.innerHeight * 0.6 && elRect.bottom > window.innerHeight * 0.3) {
            current = cta;
          }
        }
      }
      setCurrentCTA(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    if (!currentCTA?.next) return;
    const el = document.getElementById(currentCTA.next);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && currentCTA && (
        <motion.button
          type="button"
          onClick={scrollToNext}
          className="hidden lg:flex fixed right-8 bottom-8 z-50 items-center gap-3 px-5 py-3 bg-foreground/5 backdrop-blur-sm border border-border rounded-full hover:bg-foreground/10 hover:border-accent/30 transition-all duration-300 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
            {currentCTA.text}
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-4 h-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
