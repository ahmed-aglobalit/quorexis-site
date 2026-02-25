import { getTranslations } from "next-intl/server";
import { getArticle, getAllSlugs } from "@/content/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllSlugs().map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticle(slug, locale as "fr" | "en");
  if (!article) return {};
  return {
    title: `${article.title} — Quorexis`,
    description: article.intro,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const article = getArticle(slug, locale as "fr" | "en");

  if (!article) notFound();

  return (
    <article className="mx-auto max-w-[800px] px-6 md:px-20 py-24 md:py-36 mt-16">
      <Link
        href={`/${locale === "fr" ? "" : "en/"}blog`}
        className="text-sm text-muted hover:text-foreground transition-colors"
      >
        {t("backToArticles")}
      </Link>

      <h1 className="mt-8 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
        {article.title}
      </h1>

      <p className="mt-4 text-sm text-muted">
        {t("publishedOn")} {article.date}
      </p>

      <p className="mt-8 text-lg text-muted leading-relaxed">
        {article.intro}
      </p>

      {article.sections.map((section, i) => (
        <div key={i} className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">
            {section.heading}
          </h2>
          <div className="mt-4 text-base text-foreground/80 leading-relaxed whitespace-pre-line">
            {section.content}
          </div>
        </div>
      ))}

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-base text-foreground/80 leading-relaxed font-medium">
          {article.conclusion}
        </p>
      </div>

      <div className="mt-12">
        <Link
          href={`/${locale === "fr" ? "" : "en/"}blog`}
          className="text-sm font-medium text-accent hover:text-foreground transition-colors"
        >
          {t("backToArticles")}
        </Link>
      </div>
    </article>
  );
}
