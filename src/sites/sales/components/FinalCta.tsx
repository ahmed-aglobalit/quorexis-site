"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function FinalCta() {
  const t = useTranslations("cta");
  const ref = useReveal<HTMLElement>();

  return (
    <section className="scroll-mt-20 bg-foreground text-white reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            <span className="block">{t("title")}</span>
            <span className="block text-white/70">{t("subtitle")}</span>
          </h2>

          <p className="mt-8 text-lg text-white/60 leading-relaxed max-w-2xl">
            {t("text")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-foreground text-sm font-semibold rounded-md hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200"
            >
              {t("primary")}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white text-sm font-medium rounded-md hover:bg-white/10 hover:border-white/50 active:bg-white/5 transition-all duration-200"
            >
              {t("secondary")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
