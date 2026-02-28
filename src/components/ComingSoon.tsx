"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useReveal } from "@/hooks/useReveal";

interface ComingSoonProps {
  namespace: "resources.whitepapers" | "resources.webinars";
}

export default function ComingSoon({ namespace }: ComingSoonProps) {
  const t = useTranslations(namespace);
  const heroRef = useReveal<HTMLElement>();
  const ctaRef = useReveal<HTMLElement>();

  return (
    <>
      <section ref={heroRef} className="reveal pt-32 md:pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <h1 className="hero-enter text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            {t("title")}
          </h1>
          <p className="hero-enter-delay mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight">
              {t("comingSoonTitle")}
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              {t("comingSoonDescription")}
            </p>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="reveal">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
          >
            {t("notifyButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
