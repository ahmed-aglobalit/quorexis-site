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
    <article className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-36 mt-16">
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
            sizes="(max-width: 768px) 100vw, 1200px"
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

      {/* Open PDF button (always visible, essential on mobile) */}
      <div className="mt-6">
        <a
          href={article.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          {t("openPdf")}
        </a>
      </div>

      {/* Embedded PDF — hidden on mobile (iframes + PDF = unreadable) */}
      <div className="mt-8 rounded-lg overflow-hidden border border-border hidden md:block">
        <iframe
          src={article.pdfUrl}
          title={article.title}
          className="w-full"
          style={{ height: "calc(100vh - 100px)", minHeight: "800px" }}
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
