"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

const engines = ["data", "automation", "outreach", "sdr"] as const;

function DataIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function AutomationIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M12 2a4 4 0 0 1 4 4v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6a4 4 0 0 1 4-4z" />
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M9 14h.01M15 14h.01M9 17h6" />
    </svg>
  );
}

function OutreachIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function SdrIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M16 11l2 2 4-4" />
    </svg>
  );
}

const engineIcons = {
  data: DataIcon,
  automation: AutomationIcon,
  outreach: OutreachIcon,
  sdr: SdrIcon,
} as const;

export default function EnginesSection() {
  const t = useTranslations("engines");
  const ref = useReveal<HTMLElement>();

  return (
    <section id="engines" className="scroll-mt-20 bg-foreground/[0.02] reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
          {t("title")}
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {engines.map((engine) => {
            const Icon = engineIcons[engine];
            const capabilities = [0, 1, 2, 3, 4, 5].map((i) => {
              try {
                return t(`${engine}.capabilities.${i}`);
              } catch {
                return null;
              }
            }).filter(Boolean);

            return (
              <div
                key={engine}
                className="expertise-card border border-border rounded-lg p-6 md:p-8 bg-background hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{t(`${engine}.title`)}</h3>
                    <p className="text-sm text-muted mt-0.5">{t(`${engine}.subtitle`)}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm text-muted leading-relaxed">
                  {t(`${engine}.description`)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-foreground/[0.04] text-muted"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-border/60">
                  <p className="text-sm font-medium text-accent">
                    {t(`${engine}.output`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
