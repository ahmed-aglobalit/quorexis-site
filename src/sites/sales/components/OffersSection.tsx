"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

const offers = ["pilot", "growth", "scale"] as const;

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function OffersSection() {
  const t = useTranslations("offers");
  const ref = useReveal<HTMLElement>();

  return (
    <section id="offers" className="scroll-mt-20 bg-foreground/[0.02] reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center">
          {t("title")}
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const includes = [0, 1, 2, 3, 4, 5].map((i) => {
              try {
                return t(`${offer}.includes.${i}`);
              } catch {
                return null;
              }
            }).filter(Boolean);

            const isRecommended = offer === "growth";

            return (
              <div
                key={offer}
                className={`service-card relative border rounded-lg p-6 md:p-8 bg-background transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 ${
                  isRecommended ? "border-accent" : "border-border"
                }`}
              >
                {isRecommended && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                    {t(`${offer}.badge`)}
                  </span>
                )}

                <h3 className="text-xl font-semibold">{t(`${offer}.name`)}</h3>
                <p className="mt-1 text-sm text-accent font-medium">
                  {t(`${offer}.tagline`)}
                </p>
                <p className="mt-4 text-sm text-muted leading-relaxed">
                  {t(`${offer}.description`)}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent mt-0.5 shrink-0"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollTo("contact")}
                  className={`mt-8 w-full py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                    isRecommended
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "border border-border hover:bg-foreground/5"
                  }`}
                >
                  {t(`${offer}.cta`)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
