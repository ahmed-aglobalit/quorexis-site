import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const resources = [
  { key: "blog", href: "/blog" },
  { key: "whitepapers", href: "/whitepapers" },
  { key: "webinars", href: "/webinars" },
  { key: "training", href: "/training" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "resources.knowledgeBase",
  });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
}

export default async function KnowledgeBasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "resources.knowledgeBase",
  });

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res) => (
              <Link
                key={res.key}
                href={res.href}
                className="group border border-border rounded-lg p-6 md:p-8 hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <h2 className="text-lg font-semibold tracking-tight group-hover:text-accent transition-colors break-words">
                  {t(`${res.key}.title`)}
                </h2>
                <p className="mt-3 text-sm text-muted leading-relaxed break-words">
                  {t(`${res.key}.description`)}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent">
                  {t(`${res.key}.cta`)} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
