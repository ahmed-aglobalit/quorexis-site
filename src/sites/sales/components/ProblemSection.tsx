"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

export default function ProblemSection() {
  const t = useTranslations("problem");
  const ref = useReveal<HTMLElement>();

  const points = [0, 1, 2, 3, 4, 5].map((i) => t(`points.${i}`));

  return (
    <section className="scroll-mt-20 reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight max-w-3xl">
          {t("title")}
        </h2>

        <p className="mt-8 text-lg text-muted">
          {t("intro")}
        </p>

        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M8 12l2 2 4-4" />
              </svg>
              <span className="text-muted">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 p-6 md:p-8 bg-foreground/[0.03] rounded-lg border border-border">
          <p className="text-lg font-medium">
            {t("conclusion")}
          </p>
        </div>
      </div>
    </section>
  );
}
