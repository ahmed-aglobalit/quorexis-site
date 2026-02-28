import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { rndPages } from "@/config/rnd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rnd.landing" });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
}

export default async function RndPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rnd" });

  return (
    <>
      <section className="pt-32 md:pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            {t("landing.title")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {t("landing.subtitle")}
          </p>
        </div>
      </section>

      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rndPages.map((page) => (
              <Link
                key={page.slug}
                href={`/rnd/${page.slug}`}
                className="group border border-border rounded-lg p-6 md:p-8 hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <h2 className="text-lg font-semibold tracking-tight group-hover:text-accent transition-colors break-words">
                  {t(`landing.${page.i18nKey}.title`)}
                </h2>
                <p className="mt-3 text-sm text-muted leading-relaxed break-words">
                  {t(`landing.${page.i18nKey}.description`)}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("common.ctaTitle")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            {t("common.ctaSubtitle")}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {t("common.ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
