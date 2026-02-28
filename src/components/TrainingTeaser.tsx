"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useReveal } from "@/hooks/useReveal";

export default function TrainingTeaser() {
  const t = useTranslations("trainingTeaser");
  const ref = useReveal<HTMLElement>();

  return (
    <section className="reveal bg-foreground/[0.02]" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-4 text-muted text-lg">
              {t("subtitle")}
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/training"
              className="inline-block px-6 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
