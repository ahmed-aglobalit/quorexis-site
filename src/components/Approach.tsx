"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  { key: "assess", number: "01" },
  { key: "structure", number: "02" },
  { key: "deliver", number: "03" },
] as const;

function AssessIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" />
      <path d="M8 11h6M11 8v6" />
    </svg>
  );
}

function StructureIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function DeliverIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const stepIcons = {
  assess: AssessIcon,
  structure: StructureIcon,
  deliver: DeliverIcon,
} as const;

export default function Approach() {
  const t = useTranslations("approach");
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
      id="approach"
      className="scroll-mt-20 bg-foreground/[0.02] reveal"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 text-muted text-lg max-w-2xl">
          {t("subtitle")}
        </p>

        {/* Timeline + Steps */}
        <div ref={timelineRef} className="mt-14 relative">
          {/* Vertical timeline line */}
          <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-border">
            <div
              className="timeline-line w-full bg-accent origin-top"
              style={{ height: `${progress * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-8 md:gap-10">
            {steps.map((step, index) => {
              const isOpen = expandedStep === step.key;
              const Icon = stepIcons[step.key];
              const stepProgress = index / (steps.length - 1);
              const isReached = progress >= stepProgress;
              const activities = [0, 1, 2, 3].map((i) =>
                t(`${step.key}.activities.${i}`)
              );

              return (
                <div
                  key={step.key}
                  className="approach-step relative pl-10 md:pl-14"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-1.5 md:left-2.5 top-7 w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 ${
                      isReached
                        ? "border-accent bg-accent"
                        : "border-border bg-background"
                    } ${isOpen ? "timeline-dot-active" : ""}`}
                  />

                  {/* Step card */}
                  <button
                    type="button"
                    onClick={() => toggle(step.key)}
                    aria-expanded={isOpen}
                    className={`w-full text-left border rounded-lg p-6 md:p-8 cursor-pointer select-none transition-all duration-300 ${
                      isOpen
                        ? "border-accent/30 shadow-[0_4px_12px_rgba(0,0,0,0.06)] -translate-y-0.5"
                        : "border-border hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`shrink-0 transition-colors duration-300 ${
                            isReached || isOpen ? "text-accent" : "text-muted"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium transition-colors duration-300 ${
                            isReached || isOpen ? "text-accent" : "text-muted"
                          }`}
                        >
                          {step.number}
                        </span>
                      </div>
                      {/* Chevron */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className={`mt-1 shrink-0 text-muted transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                    </div>

                    {/* Title */}
                    <h3
                      className={`mt-3 text-xl font-semibold transition-colors duration-300 ${
                        isOpen ? "text-accent" : ""
                      }`}
                    >
                      {t(`${step.key}.title`)}
                    </h3>

                    {/* Description (always visible) */}
                    <p className="mt-3 text-sm text-muted leading-relaxed">
                      {t(`${step.key}.description`)}
                    </p>

                    {/* Expandable content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "mt-5 max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-5 border-t border-border/60 space-y-5">
                        {/* Activities */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                            {t("activitiesLabel")}
                          </p>
                          <ul className="space-y-1.5">
                            {activities.map((item) => (
                              <li
                                key={item}
                                className="text-sm text-muted flex items-start gap-2"
                              >
                                <span className="text-accent mt-0.5 shrink-0">
                                  &#8212;
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Outcome */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                            {t("outcomeLabel")}
                          </p>
                          <div className="border-l-2 border-accent pl-4">
                            <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                              {t(`${step.key}.outcome`)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credibility */}
        <p className="mt-16 text-sm text-muted italic max-w-xl">
          {t("credibility")}
        </p>
      </div>
    </section>
  );
}
