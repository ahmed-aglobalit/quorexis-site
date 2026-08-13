"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  "discover",
  "define",
  "build",
  "launch",
  "engage",
  "qualify",
  "book",
  "optimize",
] as const;

export default function MethodSection() {
  const t = useTranslations("method");
  const sectionRef = useReveal<HTMLElement>();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  useEffect(() => {
    function handleScroll() {
      const el = timelineRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = rect.top - windowHeight * 0.5;
      const end = rect.bottom - windowHeight * 0.7;
      const total = end - start;

      if (total <= 0) return;

      const current = -start;
      const pct = Math.min(Math.max(current / total, 0), 1);
      setProgress(pct);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = useCallback((key: string) => {
    setExpandedStep((prev) => (prev === key ? null : key));
  }, []);

  return (
    <section
      id="method"
      className="scroll-mt-20 bg-foreground/[0.02] reveal"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
          {t("title")}
        </h2>

        <div ref={timelineRef} className="mt-14 relative">
          <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-border">
            <div
              className="timeline-line w-full bg-accent origin-top"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          <div className="flex flex-col gap-6">
            {steps.map((step, index) => {
              const isOpen = expandedStep === step;
              const stepProgress = index / (steps.length - 1);
              const isReached = progress >= stepProgress;

              return (
                <div
                  key={step}
                  className="approach-step relative pl-10 md:pl-14"
                >
                  <div
                    className={`absolute left-1.5 md:left-2.5 top-5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 ${
                      isReached
                        ? "border-accent bg-accent"
                        : "border-border bg-background"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => toggle(step)}
                    aria-expanded={isOpen}
                    className={`w-full text-left border rounded-lg p-5 md:p-6 cursor-pointer select-none transition-all duration-300 ${
                      isOpen
                        ? "border-accent/30 shadow-[0_4px_12px_rgba(0,0,0,0.06)] -translate-y-0.5 bg-background"
                        : "border-border bg-background hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm font-medium transition-colors duration-300 ${
                            isReached || isOpen ? "text-accent" : "text-muted"
                          }`}
                        >
                          {t(`steps.${step}.number`)}
                        </span>
                        <h3
                          className={`text-lg font-semibold transition-colors duration-300 ${
                            isOpen ? "text-accent" : ""
                          }`}
                        >
                          {t(`steps.${step}.title`)}
                        </h3>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`shrink-0 text-muted transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                    </div>

                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {t(`steps.${step}.description`)}
                    </p>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "mt-4 max-h-[100px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-4 border-t border-border/60">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                          Deliverable
                        </p>
                        <p className="text-sm text-accent font-medium">
                          {t(`steps.${step}.deliverable`)}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
