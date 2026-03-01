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

function openAssistant() {
  window.dispatchEvent(new CustomEvent("quorexis:open-assistant"));
}

const BULLET_ICONS = [
  // Shield check — certified
  <svg key="cert" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
  // Target — zero-defect
  <svg key="target" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  // Bar chart — KPIs
  <svg key="kpi" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  // Zap — AI
  <svg key="ai" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
];

export default function Hero() {
  const t = useTranslations("hero");
  const bullets = ["bullet1", "bullet2", "bullet3", "bullet4"] as const;

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
        <p className="hero-enter-delay mt-2 text-sm text-muted/70 italic max-w-2xl">
          {t("subtitleAi")}
        </p>

        {/* Bullets */}
        <ul className="hero-enter-delay mt-8 flex flex-col gap-3 max-w-xl">
          {bullets.map((key, i) => (
            <li key={key} className="flex items-start gap-3">
              {BULLET_ICONS[i]}
              <span className="text-sm text-foreground/80 leading-snug">
                {t(key)}
              </span>
            </li>
          ))}
        </ul>

        <div className="hero-enter-delay-2 mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={openAssistant}
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
