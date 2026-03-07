import { getTranslations } from "next-intl/server";
import { getArticle, getAllSlugs } from "@/content/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  return getAllSlugs().map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { locale, slug } = await params;
  const article = getArticle(slug, locale as "fr" | "en");
  if (!article) return {};
  return {
    title: `${article.title} — Quorexis`,
    description: article.description,
  };
}

export default async function BlogArticlePage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const article = getArticle(slug, locale as "fr" | "en");

  if (!article) notFound();

  return (
    <article className="mx-auto max-w-[1000px] px-6 md:px-20 py-24 md:py-36 mt-16">
      <Link
        href={`/${locale === "fr" ? "" : "en/"}blog`}
        className="text-sm text-muted hover:text-foreground transition-colors"
      >
        {t("backToArticles")}
      </Link>

      {/* Cover */}
      <div className="mt-6 rounded-lg overflow-hidden">
        <div className="relative aspect-[21/9] w-full">
          <Image
            src={article.coverUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Title & description */}
      <h1 className="mt-8 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
        {article.title}
      </h1>
      <p className="mt-4 text-lg text-muted leading-relaxed">
        {article.description}
      </p>

      {/* Embedded PDF */}
      <div className="mt-10 rounded-lg overflow-hidden border border-border">
        <iframe
          src={article.pdfUrl}
          title={article.title}
          className="w-full"
          style={{ height: "80vh" }}
        />
      </div>

      <div className="mt-10">
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
