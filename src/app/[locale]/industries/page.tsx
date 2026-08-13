import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE_MODE } from "@/config/site";

const salesIndustries = [
  { key: "esn", slug: "esn", icon: "code" },
  { key: "saas", slug: "saas", icon: "cloud" },
  { key: "cybersecurity", slug: "cybersecurity", icon: "shield" },
  { key: "recruitment", slug: "recruitment", icon: "users" },
  { key: "professionalServices", slug: "professional-services", icon: "briefcase" },
] as const;

const qaIndustries = ["fintech", "telecom", "iot", "travel", "healthcare"] as const;

function getIcon(icon: string) {
  switch (icon) {
    case "code":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "cloud":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "shield":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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
    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });

  if (SITE_MODE === "sales") {
    return {
      title: `${t("title")} — Quorexis`,
      description: t("subtitle"),
    };
  }

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });

  if (SITE_MODE === "sales") {
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
              {salesIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group border border-border rounded-lg p-6 md:p-8 bg-background hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    {getIcon(industry.icon)}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold group-hover:text-accent transition-colors">
                    {t(`${industry.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {t(`${industry.key}.description`)}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-accent">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

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

      {qaIndustries.map((industry, idx) => {
        const rawChallenges = t.raw(`${industry}.challenges`) as string[];
        const challenges = Array.isArray(rawChallenges) ? rawChallenges : [];
        const rawFocus = t.raw(`${industry}.focus`) as string[];
        const focus = Array.isArray(rawFocus) ? rawFocus : [];

        return (
          <section
            key={industry}
            id={industry}
            className={`scroll-mt-20 ${idx % 2 === 0 ? "bg-foreground/[0.02]" : ""}`}
          >
            <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight break-words">
                {t(`${industry}.title`)}
              </h2>
              <p className="mt-4 text-muted text-lg max-w-2xl leading-relaxed break-words">
                {t(`${industry}.description`)}
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {challenges.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted/60 mb-4">
                      Challenges
                    </h3>
                    <ul className="space-y-3">
                      {challenges.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"
                        >
                          <span className="text-accent shrink-0 mt-0.5 font-medium">
                            &#8212;
                          </span>
                          <span className="break-words min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {focus.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted/60 mb-4">
                      Testing focus
                    </h3>
                    <ul className="space-y-3">
                      {focus.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"
                        >
                          <span className="text-accent shrink-0 mt-0.5 font-medium">
                            &#8212;
                          </span>
                          <span className="break-words min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            {t("ctaSubtitle")}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
