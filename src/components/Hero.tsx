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

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
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
          {t("tagline")}
        </p>
        <h1 className="hero-enter mt-4 text-4xl md:text-[56px] font-semibold leading-tight tracking-tight max-w-3xl">
          {t("headline")}
        </h1>
        <p className="hero-enter-delay mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
          {t("subtitle")}
        </p>
        <div className="hero-enter-delay-2 mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
          >
            {t("cta")}
          </button>
          <button
            onClick={() => scrollTo("expertises")}
            className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm font-medium rounded-md hover:bg-foreground/5 hover:border-muted active:bg-foreground/10 transition-all duration-200"
          >
            {t("ctaSecondary")}
          </button>
        </div>
      </div>
    </section>
  );
}
