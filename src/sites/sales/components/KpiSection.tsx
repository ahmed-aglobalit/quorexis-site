"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

const categories = ["activity", "performance", "business"] as const;

export default function KpiSection() {
  const t = useTranslations("kpi");
  const ref = useReveal<HTMLElement>();

  return (
    <section id="kpi" className="scroll-mt-20 reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const metrics = [0, 1, 2, 3, 4].map((i) => {
              try {
                return t(`categories.${cat}.metrics.${i}`);
              } catch {
                return null;
              }
            }).filter(Boolean);

            return (
              <div
                key={cat}
                className="expertise-card border border-border rounded-lg p-6 md:p-8 bg-background"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  {t(`categories.${cat}.title`)}
                </h3>
                <ul className="mt-5 space-y-3">
                  {metrics.map((metric, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted">
            {t("northStar.title")}
          </p>
          <p className="mt-3 text-3xl md:text-4xl font-semibold text-accent">
            {t("northStar.metric")}
          </p>
        </div>
      </div>
    </section>
  );
}
