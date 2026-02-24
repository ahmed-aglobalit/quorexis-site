"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";

const domains = ["qa", "devops", "data"] as const;

const domainImages: Record<(typeof domains)[number], string> = {
  qa: "/images/qa.webp",
  devops: "/images/devops.webp",
  data: "/images/data.webp",
};

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

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((domain) => {
            const isOpen = expanded === domain;
            const deliverables = [0, 1, 2].map((i) => t(`${domain}.deliverables.${i}`));
            const results = [0, 1].map((i) => t(`${domain}.results.${i}`));

            return (
              <button
                key={domain}
                type="button"
                className={`border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer select-none text-left ${
                  isOpen
                    ? "border-accent/30 shadow-[0_4px_12px_rgba(0,0,0,0.06)] -translate-y-0.5"
                    : "border-border hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
                }`}
                aria-expanded={isOpen}
                onClick={() => toggle(domain)}
              >
                {/* Card image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={domainImages[domain]}
                    alt={t(`${domain}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>

                {/* Card content */}
                <div className="p-8">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold">{t(`${domain}.title`)}</h3>
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
                      isOpen ? "mt-5 max-h-96 opacity-100" : "max-h-0 opacity-0"
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
