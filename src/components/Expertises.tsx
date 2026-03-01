"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";

const domains = [
  "functionalTesting",
  "testAutomation",
  "apiTesting",
  "performanceTesting",
  "qaGovernance",
  "aiTesting",
] as const;

function FunctionalTestingIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 10l2 2 4-4" />
      <path d="M9 16h6" />
    </svg>
  );
}

function TestAutomationIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      <path d="M10 12l2 2 3-3" />
    </svg>
  );
}

function ApiTestingIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M8.5 7.5L15.5 16.5M8.5 6H15" />
    </svg>
  );
}

function PerformanceTestingIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12" />
      <path d="M12 6v6l4 2" />
      <path d="M2 17h6M2 21h4" />
    </svg>
  );
}

function QaGovernanceIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M4 20h16" />
      <path d="M4 20V10M9 20V8M14 20V12M19 20V6" />
      <path d="M4 10l5-2 5 4 5-6" />
    </svg>
  );
}

function AiTestingIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M12 2a4 4 0 0 1 4 4v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6a4 4 0 0 1 4-4z" />
      <path d="M9 8v2M15 8v2" />
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M9 14h.01M15 14h.01" />
      <path d="M9 17h6" />
      <path d="M3 14h2M19 14h2" />
    </svg>
  );
}

const domainIcons = {
  functionalTesting: FunctionalTestingIcon,
  testAutomation: TestAutomationIcon,
  apiTesting: ApiTestingIcon,
  performanceTesting: PerformanceTestingIcon,
  qaGovernance: QaGovernanceIcon,
  aiTesting: AiTestingIcon,
} as const;

export default function Expertises() {
  const t = useTranslations("expertises");
  const ref = useReveal<HTMLElement>();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = useCallback((domain: string) => {
    setExpanded((prev) => (prev === domain ? null : domain));
  }, []);

  return (
    <section id="expertises" className="scroll-mt-20 reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 text-muted text-lg max-w-2xl">
          {t("intro")}
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain) => {
            const isOpen = expanded === domain;
            const Icon = domainIcons[domain];
            const deliverables = [0, 1, 2].map((i) => t(`${domain}.deliverables.${i}`));
            const results = [0, 1].map((i) => t(`${domain}.results.${i}`));

            return (
              <button
                key={domain}
                type="button"
                className={`expertise-card border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer select-none text-left ${
                  isOpen
                    ? "border-accent/30 shadow-[0_4px_12px_rgba(0,0,0,0.06)] -translate-y-0.5"
                    : "border-border hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
                }`}
                aria-expanded={isOpen}
                onClick={() => toggle(domain)}
              >
                <div className="p-6 md:p-8">
                  {/* Card header with icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`shrink-0 transition-colors duration-300 ${
                          isOpen ? "text-accent" : "text-muted"
                        }`}
                      />
                      <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                        isOpen ? "text-accent" : ""
                      }`}>
                        {t(`${domain}.title`)}
                      </h3>
                    </div>
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

                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {t(`${domain}.description`)}
                  </p>

                  {/* Expanded content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "mt-5 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-5 border-t border-border/60 space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                          {t("deliverables")}
                        </p>
                        <ul className="space-y-1.5">
                          {deliverables.map((item) => (
                            <li key={item} className="text-sm text-muted flex items-start gap-2">
                              <span className="text-accent mt-0.5 shrink-0">&#8212;</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                          {t("results")}
                        </p>
                        <ul className="space-y-1.5">
                          {results.map((item) => (
                            <li key={item} className="text-sm text-muted flex items-start gap-2">
                              <span className="text-accent mt-0.5 shrink-0">&#8212;</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
