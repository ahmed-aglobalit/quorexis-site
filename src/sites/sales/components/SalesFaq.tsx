"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";

export default function SalesFaq() {
  const t = useTranslations("faq");
  const ref = useReveal<HTMLElement>();
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setExpanded((prev) => (prev === index ? null : index));
  }, []);

  const items = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  return (
    <section id="faq" className="scroll-mt-20 bg-foreground/[0.02] reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {t("title")}
        </h2>

        <div className="mt-12 max-w-3xl">
          {items.map((item, i) => {
            const isOpen = expanded === i;

            return (
              <div key={i} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left"
                >
                  <span className="text-sm font-medium pr-4">{item.question}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`shrink-0 mt-0.5 text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[500px] opacity-100 pb-5" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-muted leading-relaxed pr-8">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
