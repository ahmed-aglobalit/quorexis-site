import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });

  const rawPoints = t.raw("why.points") as Array<{
    title: string;
    description: string;
  }>;
  const points = Array.isArray(rawPoints) ? rawPoints : [];

  return (
    <>
      {/* Hero */}
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

      {/* Why Quorexis */}
      <section id="why" className="scroll-mt-20 bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("why.title")}
          </h2>
          <div className="mt-10 space-y-8">
            {points.map((point, i) => (
              <div
                key={i}
                className="border-l-2 border-accent pl-6 max-w-3xl overflow-hidden"
              >
                <h3 className="text-lg font-semibold break-words">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed break-words">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Model */}
      <section id="delivery" className="scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("delivery.title")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl">
            {t("delivery.description")}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["assess", "structure", "deliver"] as const).map((phase, i) => (
              <div
                key={phase}
                className="border border-border rounded-lg p-6 md:p-8"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {t(`delivery.${phase}.title`)}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed break-words">
                  {t(`delivery.${phase}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
