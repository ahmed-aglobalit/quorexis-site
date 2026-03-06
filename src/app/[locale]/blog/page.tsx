import { getTranslations } from "next-intl/server";
import { getArticles } from "@/content/blog";
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
          <a
            href={featured.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-border rounded-lg overflow-hidden hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <BlogHeroPattern
              seed={slugToSeed(featured.slug)}
              className="w-full"
            />
            <div className="p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed max-w-3xl">
                {featured.intro}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                {t("readPresentation")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      )}

      {/* Other articles */}
      {others.length > 0 && (
        <div className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-6">
            {t("insightsLabel")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {others.map((article) => (
              <a
                key={article.slug}
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border rounded-lg overflow-hidden hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <BlogHeroPattern
                  seed={slugToSeed(article.slug)}
                  className="w-full"
                />
                <div className="p-6 md:p-8">
                  <h2 className="text-lg font-semibold tracking-tight group-hover:text-accent transition-colors duration-300">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
                    {article.intro}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    {t("readArticle")}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
