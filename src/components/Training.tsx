"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useReveal } from "@/hooks/useReveal";

const certifications = [
  "ctfl",
  "advancedTestAnalyst",
  "technicalTestAnalyst",
  "testAutomationEngineer",
  "agileTester",
  "testManager",
] as const;

const pedagogyBlocks = ["theory", "caseStudies", "mockExams", "followUp"] as const;
const formats = ["interCompany", "intraCompany", "remote"] as const;
const whyPoints = ["practitioners", "successRate", "offshore", "personalized"] as const;

function BookIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M9 7h6M9 11h4" />
    </svg>
  );
}

function CaseStudyIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M8 7h8M8 11h8M8 15h4" />
    </svg>
  );
}

function ExamIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M9 11l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v1M12 17v1" />
    </svg>
  );
}

function SupportIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

const pedagogyIcons = {
  theory: BookIcon,
  caseStudies: CaseStudyIcon,
  mockExams: ExamIcon,
  followUp: SupportIcon,
} as const;

function UsersIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function BuildingIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h6" />
    </svg>
  );
}

function MonitorIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

const formatIcons = {
  interCompany: UsersIcon,
  intraCompany: BuildingIcon,
  remote: MonitorIcon,
} as const;

function levelColor(level: string): string {
  switch (level) {
    case "Foundation":
    case "Foundation Extension":
      return "bg-accent/10 text-accent";
    case "Advanced":
      return "bg-foreground/10 text-foreground";
    case "Specialist":
      return "bg-accent/20 text-accent";
    default:
      return "bg-foreground/5 text-muted";
  }
}

export default function Training() {
  const t = useTranslations("training");
  const heroRef = useReveal<HTMLElement>();
  const certRef = useReveal<HTMLElement>();
  const pedaRef = useReveal<HTMLElement>();
  const formatRef = useReveal<HTMLElement>();
  const whyRef = useReveal<HTMLElement>();
  const ctaRef = useReveal<HTMLElement>();

  function scrollToCertifications() {
    const el = document.getElementById("certifications");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section ref={heroRef} className="reveal pt-32 md:pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <p className="hero-enter text-sm font-medium text-accent tracking-wide uppercase">
            ISTQB Official Training Partner
          </p>
          <h1 className="hero-enter-delay mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            {t("hero.title")}
          </h1>
          <p className="hero-enter-delay mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="hero-enter-delay-2 mt-10 flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {t("hero.cta")}
            </Link>
            <button
              onClick={scrollToCertifications}
              className="px-6 py-3 border border-border text-sm font-medium rounded-md hover:bg-foreground/5 hover:border-muted active:bg-foreground/10 transition-all duration-200"
            >
              {t("hero.ctaSecondary")}
            </button>
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certifications" className="scroll-mt-20 reveal bg-foreground/[0.02]" ref={certRef}>
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("certifications.title")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            {t("certifications.subtitle")}
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => {
              const level = t(`certifications.${cert}.level`);
              const keyPoints = [0, 1, 2, 3]
                .map((i) => {
                  try { return t(`certifications.${cert}.keyPoints.${i}`); }
                  catch { return null; }
                })
                .filter(Boolean);

              return (
                <div
                  key={cert}
                  className="training-card border border-border rounded-lg p-6 md:p-8 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${levelColor(level)}`}>
                    {level}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">
                    {t(`certifications.${cert}.title`)}
                  </h3>
                  <p className="mt-1 text-sm text-accent font-medium">
                    {t(`certifications.${cert}.duration`)}
                  </p>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {t(`certifications.${cert}.description`)}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {keyPoints.map((point) => (
                      <li key={point} className="text-sm text-muted flex items-start gap-2">
                        <span className="text-accent mt-0.5 shrink-0">&#8212;</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pedagogy ── */}
      <section id="pedagogy" className="scroll-mt-20 reveal" ref={pedaRef}>
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("pedagogy.title")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            {t("pedagogy.subtitle")}
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {pedagogyBlocks.map((block) => {
              const Icon = pedagogyIcons[block];
              return (
                <div
                  key={block}
                  className="pedagogy-block flex gap-5"
                >
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {t(`pedagogy.${block}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {t(`pedagogy.${block}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Formats ── */}
      <section id="formats" className="scroll-mt-20 reveal bg-foreground/[0.02]" ref={formatRef}>
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("formats.title")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            {t("formats.subtitle")}
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {formats.map((format) => {
              const Icon = formatIcons[format];
              const points = [0, 1, 2].map((i) => {
                try { return t(`formats.${format}.points.${i}`); }
                catch { return null; }
              }).filter(Boolean);

              return (
                <div
                  key={format}
                  className="training-card border border-border rounded-lg p-6 md:p-8 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="text-accent w-5 h-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">
                    {t(`formats.${format}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {t(`formats.${format}.description`)}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {points.map((point) => (
                      <li key={point} className="text-sm text-muted flex items-start gap-2">
                        <span className="text-accent mt-0.5 shrink-0">&#8212;</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Quorexis ── */}
      <section id="why-quorexis" className="scroll-mt-20 reveal" ref={whyRef}>
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("whyQuorexis.title")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            {t("whyQuorexis.subtitle")}
          </p>

          <div className="mt-14 space-y-8">
            {whyPoints.map((point) => (
              <div key={point} className="border-l-2 border-accent pl-6 max-w-3xl">
                <h3 className="text-lg font-semibold">
                  {t(`whyQuorexis.points.${point}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {t(`whyQuorexis.points.${point}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="reveal bg-foreground/[0.02]" ref={ctaRef}>
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("cta.title")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="mt-10">
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
