import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { locales } from "@/i18n/config";
import { SITE_MODE } from "@/config/site";

const solutions = [
  "b2b-data",
  "cold-email",
  "linkedin-outreach",
  "cold-calling",
  "sdr-outsourcing",
  "sales-automation",
] as const;

const slugToKey: Record<string, string> = {
  "b2b-data": "b2bData",
  "cold-email": "coldEmail",
  "linkedin-outreach": "linkedinOutreach",
  "cold-calling": "coldCalling",
  "sdr-outsourcing": "sdrOutsourcing",
  "sales-automation": "salesAutomation",
};

export function generateStaticParams() {
  if (SITE_MODE !== "sales") return [];
  return locales.flatMap((locale) =>
    solutions.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  if (SITE_MODE !== "sales") return {};
  const { locale, slug } = await params;
  const key = slugToKey[slug];
  if (!key) return {};
  const t = await getTranslations({ locale, namespace: "solutions" });
  return {
    title: `${t(`${key}.title`)} — Quorexis`,
    description: t(`${key}.headline`),
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  if (SITE_MODE !== "sales") notFound();
  const { locale, slug } = await params;
  const key = slugToKey[slug];
  if (!key) notFound();

  const t = await getTranslations({ locale, namespace: "solutions" });
  const navT = await getTranslations({ locale, namespace: "nav" });

  const capabilities = [0, 1, 2, 3, 4, 5].map((i) => {
    try {
      return t(`${key}.capabilities.${i}`);
    } catch {
      return null;
    }
  }).filter(Boolean);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <Link
            href="/solutions"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← {t("title")}
          </Link>

          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            {t(`${key}.title`)}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {t(`${key}.headline`)}
          </p>
        </div>
      </section>

      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="text-lg text-muted leading-relaxed">
              {t(`${key}.description`)}
            </p>

            <div className="mt-12">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-6">
                Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 border border-border rounded-lg"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-accent shrink-0"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {locale === "fr" ? "Prêt à commencer ?" : "Ready to get started?"}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            {locale === "fr"
              ? "Décrivez-nous votre contexte. Nous vous montrerons comment cette solution s'intègre dans votre stratégie outbound."
              : "Tell us about your context. We'll show you how this solution fits into your outbound strategy."}
          </p>
          <div className="mt-10">
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 bg-accent text-white text-sm font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {navT("contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
