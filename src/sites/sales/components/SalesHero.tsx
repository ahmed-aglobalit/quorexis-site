"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-20 py-32">
        <p className="hero-enter text-sm font-semibold uppercase tracking-wider text-accent">
          {t("eyebrow")}
        </p>

        <h1 className="hero-enter mt-6 text-3xl md:text-[48px] lg:text-[56px] font-semibold leading-[1.15] tracking-tight text-foreground max-w-3xl">
          <span className="block">{t("headline1")}</span>
          <span className="block text-muted">{t("headline2")}</span>
        </h1>

        <p className="hero-enter-delay mt-6 text-base md:text-lg text-muted leading-relaxed max-w-xl">
          {t("subtitle")}
        </p>

        <div className="hero-enter-delay-2 mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white text-sm font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200"
          >
            {t("cta")}
          </button>
          <button
            onClick={() => scrollTo("method")}
            className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground text-sm font-medium rounded-md hover:bg-foreground/5 hover:border-foreground/30 active:bg-foreground/10 transition-all duration-200"
          >
            {t("ctaSecondary")}
          </button>
        </div>

        <div className="hero-enter-delay-2 mt-12 flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-muted">
          <span>{t("markets")}</span>
          <span className="hidden sm:inline">•</span>
          <span>{t("delivery")}</span>
        </div>
      </div>
    </section>
  );
}
