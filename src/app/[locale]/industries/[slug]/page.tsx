import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { locales } from "@/i18n/config";
import { SITE_MODE } from "@/config/site";

const industries = ["esn", "saas", "cybersecurity", "recruitment", "professional-services"] as const;

const slugToKey: Record<string, string> = {
  "esn": "esn",
  "saas": "saas",
  "cybersecurity": "cybersecurity",
  "recruitment": "recruitment",
  "professional-services": "professionalServices",
};

export function generateStaticParams() {
  if (SITE_MODE !== "sales") return [];
  return locales.flatMap((locale) =>
    industries.map((slug) => ({ locale, slug }))
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
  const t = await getTranslations({ locale, namespace: "industries" });
  return {
    title: `${t(`${key}.title`)} — Quorexis`,
    description: t(`${key}.description`),
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  if (SITE_MODE !== "sales") notFound();
  const { locale, slug } = await params;
  const key = slugToKey[slug];
  if (!key) notFound();

  const t = await getTranslations({ locale, namespace: "industries" });
  const navT = await getTranslations({ locale, namespace: "nav" });

  const rawTargets = t.raw(`${key}.targets`) as string[];
  const targets = Array.isArray(rawTargets) ? rawTargets : [];
  const industryTitle = t(`${key}.title`);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <Link
            href="/industries"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← {t("title")}
          </Link>

          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            {industryTitle}
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

            {targets.length > 0 && (
              <div className="mt-12">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-6">
                  {locale === "fr" ? "Décideurs ciblés" : "Target decision makers"}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {targets.map((target, i) => (
                    <span
                      key={`target-${i}`}
                      className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full"
                    >
                      {target}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {locale === "fr"
              ? `Prêt à développer votre pipeline ${industryTitle} ?`
              : `Ready to grow your ${industryTitle} pipeline?`}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            {locale === "fr"
              ? "Décrivez-nous votre contexte. Nous vous montrerons comment nous pouvons vous aider."
              : "Tell us about your context. We'll show you how we can help."}
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
