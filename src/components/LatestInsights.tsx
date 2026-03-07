"use client";

import { useTranslations, useLocale } from "next-intl";
import { useReveal } from "@/hooks/useReveal";
import { getArticles } from "@/content/blog";
import Image from "next/image";
import Link from "next/link";

export default function LatestInsights() {
  const t = useTranslations("blog");
  const locale = useLocale() as "fr" | "en";
  const ref = useReveal<HTMLElement>();
  const articles = getArticles(locale).slice(0, 4);

  const featured = articles.find((a) => a.featured);
  const others = articles.filter((a) => !a.featured).slice(0, 3);

  return (
    <section className="scroll-mt-20 reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {t("homeTitle")}
        </h2>
        <p className="mt-4 text-muted text-lg max-w-2xl">
          {t("homeSubtitle")}
        </p>

        <div className="mt-14 space-y-8">
          {/* Featured */}
          {featured && (
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
                <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                  {t("featuredLabel")}
                </p>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">
                  {featured.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2">
                  {featured.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent">
                  {t("readArticle")} →
                </span>
              </div>
            </Link>
          )}

          {/* Other articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-semibold tracking-tight leading-snug group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>
                  <span className="mt-2 inline-block text-sm font-medium text-accent">
                    {t("readArticle")} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
