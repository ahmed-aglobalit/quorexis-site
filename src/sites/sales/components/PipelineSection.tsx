"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

export default function PipelineSection() {
  const t = useTranslations("pipeline");
  const ref = useReveal<HTMLElement>();

  const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
    number: t(`steps.${i}.number`),
    label: t(`steps.${i}.label`),
    description: t(`steps.${i}.description`),
  }));

  return (
    <section id="pipeline" className="scroll-mt-20 reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center">
          {t("title")}
        </h2>

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 lg:gap-2">
            {steps.map((step, i) => (
              <div
                key={i}
                className="approach-step relative flex flex-col items-center text-center group"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="relative z-10 h-12 w-12 rounded-full bg-background border-2 border-accent flex items-center justify-center text-sm font-semibold text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {step.number}
                </div>
                <p className="mt-3 text-sm font-semibold">{step.label}</p>
                <p className="mt-1 text-xs text-muted leading-snug max-w-[120px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
