import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { SITE_MODE } from "@/config/site";
import { NextStepCTA } from "@/sites/sales/components";

const solutions = [
  { key: "b2bData", slug: "b2b-data", icon: "database" },
  { key: "coldEmail", slug: "cold-email", icon: "mail" },
  { key: "linkedinOutreach", slug: "linkedin-outreach", icon: "linkedin" },
  { key: "coldCalling", slug: "cold-calling", icon: "phone" },
  { key: "sdrOutsourcing", slug: "sdr-outsourcing", icon: "users" },
  { key: "salesAutomation", slug: "sales-automation", icon: "zap" },
] as const;

function getIcon(icon: string) {
  switch (icon) {
    case "database":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "mail":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 4L12 13 2 4" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "phone":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "users":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "zap":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (SITE_MODE !== "sales") return {};
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });
  return {
    title: `${t("title")} — Quorexis`,
    description: t("subtitle"),
  };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (SITE_MODE !== "sales") notFound();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions" });

  return (
    <>
      <section className="pt-32 md:pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group border border-border rounded-lg p-6 md:p-8 bg-background hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  {getIcon(solution.icon)}
                </div>
                <h3 className="mt-5 text-xl font-semibold group-hover:text-accent transition-colors">
                  {t(`${solution.key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {t(`${solution.key}.headline`)}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Next Step: Method */}
      <NextStepCTA
        eyebrow={locale === "fr" ? "ÉTAPE SUIVANTE" : "NEXT STEP"}
        headline={locale === "fr" ? "Ces solutions fonctionnent ensemble." : "These solutions work together."}
        subheadline={locale === "fr" ? "Découvrez comment nous les combinons." : "Discover how we combine them."}
        text={locale === "fr"
          ? "Data, Cold Email, LinkedIn, Cold Calling et SDR s'intègrent dans un processus outbound structuré et mesurable."
          : "Data, Cold Email, LinkedIn, Cold Calling and SDR integrate into a structured and measurable outbound process."}
        ctaText={locale === "fr" ? "Découvrir notre méthode" : "Discover our method"}
        ctaHref="/method"
      />
    </>
  );
}
