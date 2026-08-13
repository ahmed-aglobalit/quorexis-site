"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

export default function NotCallCenterSection() {
  const t = useTranslations("notCallCenter");
  const ref = useReveal<HTMLElement>();

  const callCenterPoints = [0, 1, 2, 3, 4, 5].map((i) => t(`comparison.callCenter.points.${i}`));
  const quorexisPoints = [0, 1, 2, 3, 4, 5].map((i) => t(`comparison.quorexis.points.${i}`));

  return (
    <section className="scroll-mt-20 bg-foreground text-white reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-white/60 max-w-2xl">
          {t("subtitle")}
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 md:p-8 rounded-lg border border-white/10 bg-white/[0.02]">
            <h3 className="text-lg font-semibold text-white/50">
              {t("comparison.callCenter.title")}
            </h3>
            <ul className="mt-6 space-y-3">
              {callCenterPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-white/40">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8 rounded-lg border border-white/20 bg-white/[0.05]">
            <h3 className="text-lg font-semibold text-white">
              {t("comparison.quorexis.title")}
            </h3>
            <ul className="mt-6 space-y-3">
              {quorexisPoints.map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-white"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-lg text-white/70 max-w-2xl">
          {t("conclusion")}
        </p>
      </div>
    </section>
  );
}
