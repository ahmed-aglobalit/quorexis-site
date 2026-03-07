import { getTranslations } from "next-intl/server";
import { getArticles } from "@/content/blog";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: `${t("title")} — Quorexis`,
    description: t("subtitle"),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const articles = getArticles(locale as "fr" | "en");
  const featured = articles.find((a) => a.featured);
  const others = articles.filter((a) => !a.featured);

  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 mt-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-4 text-muted text-lg max-w-2xl">
        {t("subtitle")}
      </p>

      {/* Featured article */}
      {featured && (
        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-6">
            {t("featuredLabel")}
          </p>
          <Link
            href={`/${locale === "fr" ? "" : "en/"}blog/${featured.slug}`}
            className="group block border border-border rounded-lg overflow-hidden hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-foreground/[0.02]">
              <Image
                src={featured.coverUrl}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed max-w-3xl">
                {featured.description}
              </p>
              <span className="mt-6 inline-block text-sm font-medium text-accent">
                {t("readArticle")} →
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* Other articles */}
      {others.length > 0 && (
        <div className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-6">
            {t("insightsLabel")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {others.map((article) => (
              <Link
                key={article.slug}
                href={`/${locale === "fr" ? "" : "en/"}blog/${article.slug}`}
                className="group border border-border rounded-lg overflow-hidden hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-foreground/[0.02]">
                  <Image
                    src={article.coverUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-base font-semibold tracking-tight leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium text-accent">
                    {t("readArticle")} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
