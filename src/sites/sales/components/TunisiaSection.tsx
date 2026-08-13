"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

export default function TunisiaSection() {
  const t = useTranslations("tunisia");
  const ref = useReveal<HTMLElement>();

  const points = [0, 1, 2, 3, 4, 5].map((i) => t(`points.${i}`));

  return (
    <section id="tunisia" className="scroll-mt-20 reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {t("subtitle")}
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            {t("title")}
          </h2>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent mt-0.5 shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-muted">{point}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-lg text-muted leading-relaxed max-w-2xl">
            {t("conclusion")}
          </p>
        </div>
      </div>
    </section>
  );
}
