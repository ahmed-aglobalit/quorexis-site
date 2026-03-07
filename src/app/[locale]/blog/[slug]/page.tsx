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
    <article className="mx-auto max-w-[800px] px-6 md:px-20 py-24 md:py-36 mt-16">
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
            sizes="(max-width: 768px) 100vw, 800px"
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

      {/* Blog content */}
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

      {/* PDF download link */}
      <div className="mt-12 pt-8 border-t border-border">
        <a
          href={article.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-foreground transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t("downloadPdf")}
        </a>
      </div>

      <div className="mt-8">
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
