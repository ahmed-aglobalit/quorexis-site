import { getTranslations } from "next-intl/server";
import { getArticles } from "@/content/blog";
import Link from "next/link";
import BlogHeroPattern, { slugToSeed } from "@/components/BlogHeroPattern";

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

  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 mt-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-4 text-muted text-lg max-w-2xl">
        {t("subtitle")}
      </p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/${locale === "fr" ? "" : "en/"}blog/${article.slug}`}
            className="group border border-border rounded-lg overflow-hidden hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <BlogHeroPattern
              seed={slugToSeed(article.slug)}
              className="w-full"
            />
            <div className="p-6 md:p-8">
            <p className="text-xs text-muted">
              {t("publishedOn")} {article.date}
            </p>
            <h2 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-accent transition-colors duration-300">
              {article.title}
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
              {article.intro}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-accent">
              {t("readMore")} →
            </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
