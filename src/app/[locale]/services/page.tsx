import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getServicesByCategory } from "@/config/services";
import type { ServiceMeta } from "@/config/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.landing" });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
}

const categoryOrder: ServiceMeta["category"][] = [
  "core",
  "advanced",
  "governance",
  "levels",
  "platforms",
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            {t("landing.title")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {t("landing.subtitle")}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {t("landing.ctaButton")}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categoryOrder.map((cat) => {
        const items = getServicesByCategory(cat);
        if (items.length === 0) return null;
        return (
          <section
            key={cat}
            className={
              categoryOrder.indexOf(cat) % 2 === 1
                ? "bg-foreground/[0.02]"
                : ""
            }
          >
            <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {t(`landing.categories.${cat}.title`)}
              </h2>
              <p className="mt-4 text-muted text-lg max-w-2xl">
                {t(`landing.categories.${cat}.description`)}
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group border border-border rounded-lg p-6 md:p-8 hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold tracking-tight group-hover:text-accent transition-colors break-words">
                      {nav(s.i18nKey)}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed break-words line-clamp-3">
                      {t(`${s.i18nKey}.subtitle`)}
                    </p>
                    <span className="mt-4 inline-block text-sm font-medium text-accent">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("landing.ctaTitle")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            {t("landing.ctaSubtitle")}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {t("landing.ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
