"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

export default function PhilosophySection() {
  const t = useTranslations("philosophy");
  const ref = useReveal<HTMLElement>();

  return (
    <section className="scroll-mt-20 reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-8 text-lg text-muted leading-relaxed">
            {t("text")}
          </p>
        </div>
      </div>
    </section>
  );
}
