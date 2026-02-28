"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useReveal } from "@/hooks/useReveal";
import CtaBanner from "./CtaBanner";

interface ServicePageLayoutProps {
  serviceKey: string;
}

export default function ServicePageLayout({ serviceKey }: ServicePageLayoutProps) {
  const t = useTranslations("services");
  const tc = useTranslations("services.common");
  const heroRef = useReveal<HTMLElement>();
  const solvesRef = useReveal<HTMLElement>();
  const scopeRef = useReveal<HTMLElement>();
  const deliveryRef = useReveal<HTMLElement>();
  const kpisRef = useReveal<HTMLElement>();

  const rawSolves = t.raw(`${serviceKey}.solves`) as string[];
  const solves = Array.isArray(rawSolves) ? rawSolves : [];

  const rawDeliverables = t.raw(`${serviceKey}.deliverables`) as string[];
  const deliverables = Array.isArray(rawDeliverables) ? rawDeliverables : [];

  const rawKpis = t.raw(`${serviceKey}.kpis`) as string[];
  const kpis = Array.isArray(rawKpis) ? rawKpis : [];

  return (
    <>
      {/* ── Hero ── */}
      <section ref={heroRef} className="reveal pt-32 md:pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <Link
            href="/services"
            className="hero-enter inline-block text-sm font-medium text-accent tracking-wide hover:text-foreground transition-colors"
          >
            ← {tc("backToServices")}
          </Link>
          <h1 className="hero-enter-delay mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] break-words">
            {t(`${serviceKey}.title`)}
          </h1>
          <p className="hero-enter-delay mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed break-words">
            {t(`${serviceKey}.subtitle`)}
          </p>
          <div className="hero-enter-delay-2 mt-10">
            <Link
              href="/contact"
              className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {tc("ctaButton")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── What it solves ── */}
      {solves.length > 0 && (
        <section ref={solvesRef} className="reveal bg-foreground/[0.02]">
          <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {tc("solvesTitle")}
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {solves.map((item, i) => (
                <div
                  key={i}
                  className="service-card border border-border rounded-lg p-5 flex items-start gap-3"
                >
                  <span className="text-accent shrink-0 mt-0.5 font-medium">&#8212;</span>
                  <span className="text-sm text-foreground/80 leading-relaxed break-words min-w-0">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Scope & Deliverables ── */}
      {deliverables.length > 0 && (
        <section ref={scopeRef} className="reveal">
          <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {tc("scopeTitle")}
            </h2>
            <ul className="mt-10 space-y-3 max-w-2xl">
              {deliverables.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"
                >
                  <span className="text-accent shrink-0 mt-0.5 font-medium">&#8212;</span>
                  <span className="break-words min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Delivery model ── */}
      <section ref={deliveryRef} className="reveal bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {tc("deliveryTitle")}
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["assess", "structure", "deliver"] as const).map((phase, i) => (
              <div
                key={phase}
                className="service-card border border-border rounded-lg p-6 md:p-8"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {tc(`${phase}Title`)}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed break-words">
                  {t(`${serviceKey}.${phase}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KPIs & Reporting ── */}
      {kpis.length > 0 && (
        <section ref={kpisRef} className="reveal">
          <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {tc("kpisTitle")}
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {kpis.map((item, i) => (
                <div
                  key={i}
                  className="service-card border border-border rounded-lg p-5 flex items-start gap-3"
                >
                  <span className="text-accent shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </span>
                  <span className="text-sm text-foreground/80 leading-relaxed break-words min-w-0">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <CtaBanner
        title={tc("ctaTitle")}
        subtitle={tc("ctaSubtitle")}
        buttonText={tc("ctaButton")}
        href="/contact"
      />
    </>
  );
}
