"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  { id: "demo-week-1", label: "Strategy", num: "01" },
  { id: "demo-week-2", label: "Build", num: "02" },
  { id: "demo-week-3", label: "Activate", num: "03" },
  { id: "demo-week-4", label: "Optimize", num: "04" },
];

export default function DemoNav() {
  const [activeStep, setActiveStep] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const demoContainer = document.getElementById("quorexis-demo");
      if (!demoContainer) return;

      const rect = demoContainer.getBoundingClientRect();
      const isInDemo = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3;
      setIsVisible(isInDemo);

      let current = -1;
      STEPS.forEach((step, i) => {
        const el = document.getElementById(step.id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          if (elRect.top < window.innerHeight * 0.5) {
            current = i;
          }
        }
      });
      setActiveStep(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop: Vertical rail */}
      <motion.nav
        className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {STEPS.map((step, i) => {
          const isActive = activeStep === i;
          const isPast = activeStep > i;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => scrollTo(step.id)}
              className={`group flex items-center gap-3 text-left transition-all duration-300 ${
                isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isPast
                    ? "bg-accent text-white"
                    : isActive
                    ? "bg-foreground text-background"
                    : "bg-foreground/10 text-foreground"
                }`}
              >
                {isPast ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive ? "text-foreground" : "text-muted"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </motion.nav>

      {/* Mobile: Horizontal indicator */}
      <motion.div
        className="lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-foreground/95 backdrop-blur-sm rounded-full shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 text-background">
          <span className="text-sm font-bold">
            {String(activeStep + 1).padStart(2, "0")}
          </span>
          <span className="text-background/50">/</span>
          <span className="text-sm text-background/50">04</span>
          <span className="mx-2 w-px h-4 bg-background/20" />
          <span className="text-sm font-medium uppercase tracking-wider">
            {STEPS[activeStep]?.label || "Intro"}
          </span>
        </div>
      </motion.div>
    </>
  );
}
