"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

const clientNames = [
  "Renault",
  "Thales",
  "Louis Vuitton",
  "Michelin Travel Partner",
  "Sagemcom",
];

export default function Clients() {
  const t = useTranslations("clients");
  const ref = useReveal<HTMLElement>();

  return (
    <section id="clients" className="scroll-mt-20 bg-foreground/[0.02] reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 text-muted text-lg max-w-2xl">
          {t("subtitle")}
        </p>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {clientNames.map((name) => (
            <div
              key={name}
              className="border border-border rounded-lg p-6 md:p-8 flex items-center justify-center text-center hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300"
            >
              <span className="text-sm font-semibold tracking-wide text-foreground/80">
                {name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted italic max-w-xl">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
