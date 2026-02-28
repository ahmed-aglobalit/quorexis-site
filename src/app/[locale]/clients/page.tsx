import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const clientNames = [
  "Renault",
  "Thales",
  "Louis Vuitton",
  "Michelin Travel Partner",
  "Sagemcom",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "clientsPage" });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
}

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "clientsPage" });

  const rawEngagements = t.raw("engagements") as Array<{
    title: string;
    description: string;
  }>;
  const engagements = Array.isArray(rawEngagements) ? rawEngagements : [];

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {clientNames.map((name) => (
              <div
                key={name}
                className="border border-border rounded-lg p-6 md:p-8 flex items-center justify-center text-center hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300"
              >
                <span className="text-sm font-semibold tracking-wide text-foreground/80">
                  {name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted italic max-w-xl">
            {t("disclaimer")}
          </p>
        </div>
      </section>

      {engagements.length > 0 && (
        <section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {t("engagementTitle")}
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {engagements.map((eng, i) => (
                <div
                  key={i}
                  className="border border-border rounded-lg p-6 md:p-8"
                >
                  <h3 className="text-lg font-semibold tracking-tight break-words">
                    {eng.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed break-words">
                    {eng.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
