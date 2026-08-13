"use client";

import { useTranslations } from "next-intl";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function SalesHero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-foreground">
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-20 py-32">
        <p className="hero-enter text-sm font-semibold uppercase tracking-wider text-white/60">
          {t("eyebrow")}
        </p>

        <h1 className="hero-enter mt-6 text-4xl md:text-[64px] lg:text-[72px] font-semibold leading-[1.1] tracking-tight text-white max-w-4xl">
          <span className="block">{t("headline1")}</span>
          <span className="block text-white/70">{t("headline2")}</span>
        </h1>

        <p className="hero-enter-delay mt-8 text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
          {t("subtitle")}
        </p>

        <div className="hero-enter-delay-2 mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-foreground text-sm font-semibold rounded-md hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200"
          >
            {t("cta")}
          </button>
          <button
            onClick={() => scrollTo("method")}
            className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white text-sm font-medium rounded-md hover:bg-white/10 hover:border-white/50 active:bg-white/5 transition-all duration-200"
          >
            {t("ctaSecondary")}
          </button>
        </div>

        <div className="hero-enter-delay-2 mt-12 flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-white/50">
          <span>{t("markets")}</span>
          <span className="hidden sm:inline">•</span>
          <span>{t("delivery")}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
