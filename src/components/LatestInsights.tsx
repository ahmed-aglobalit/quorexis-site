"use client";

import { useTranslations, useLocale } from "next-intl";
import { useReveal } from "@/hooks/useReveal";
import { getArticles } from "@/content/blog";
import BlogHeroPattern, { slugToSeed } from "./BlogHeroPattern";

export default function LatestInsights() {
  const t = useTranslations("blog");
  const locale = useLocale() as "fr" | "en";
  const ref = useReveal<HTMLElement>();
  const articles = getArticles(locale);

  return (
    <section className="scroll-mt-20 reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {t("homeTitle")}
        </h2>
        <p className="mt-4 text-muted text-lg max-w-2xl">
          {t("homeSubtitle")}
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <a
              key={article.slug}
              href={article.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group border border-border rounded-lg overflow-hidden hover:border-accent/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300 ${
                article.featured ? "md:col-span-2" : ""
              }`}
            >
              <BlogHeroPattern
                seed={slugToSeed(article.slug)}
                className="w-full"
              />
              <div className={article.featured ? "p-8 md:p-10" : "p-6 md:p-8"}>
                {article.featured && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                    {t("featuredLabel")}
                  </p>
                )}
                <h3
                  className={`font-semibold tracking-tight group-hover:text-accent transition-colors duration-300 ${
                    article.featured
                      ? "text-xl md:text-2xl leading-tight"
                      : "text-lg"
                  }`}
                >
                  {article.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
                  {article.intro}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">
                  {article.featured ? t("readPresentation") : t("readArticle")}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
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
    </section>
  );
}
