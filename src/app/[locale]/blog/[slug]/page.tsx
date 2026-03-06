import { getTranslations } from "next-intl/server";
import { getArticle, getAllSlugs } from "@/content/blog";
import { notFound, redirect } from "next/navigation";

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

  const metaTitles: Record<string, Record<string, string>> = {
    "presentation-quorexis": {
      fr: "Présentation Quorexis — Qualité et stabilité logicielle",
      en: "Quorexis Overview — Software Quality and Stability",
    },
    "ia-accelere-les-bugs": {
      fr: "L'IA accélère-t-elle aussi les bugs ?",
      en: "Does AI also accelerate bugs?",
    },
    "ai-accelerates-bugs": {
      fr: "L'IA accélère-t-elle aussi les bugs ?",
      en: "Does AI also accelerate bugs?",
    },
  };

  const metaDescriptions: Record<string, Record<string, string>> = {
    "presentation-quorexis": {
      fr: "Découvrez la vision Quorexis du software testing et notre approche pour garantir la qualité avant la mise en production.",
      en: "Discover the Quorexis vision of software testing and our approach to ensuring quality before production deployment.",
    },
    "ia-accelere-les-bugs": {
      fr: "Analyse Quorexis de l'impact de l'intelligence artificielle sur la qualité logicielle.",
      en: "Quorexis analysis of the impact of artificial intelligence on software quality.",
    },
    "ai-accelerates-bugs": {
      fr: "Analyse Quorexis de l'impact de l'intelligence artificielle sur la qualité logicielle.",
      en: "Quorexis analysis of the impact of artificial intelligence on software quality.",
    },
  };

  return {
    title: metaTitles[slug]?.[locale] ?? `${article.title} — Quorexis`,
    description: metaDescriptions[slug]?.[locale] ?? article.intro,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticle(slug, locale as "fr" | "en");

  if (!article) notFound();

  // PDF articles redirect directly to the PDF
  if (article.pdfUrl) {
    redirect(article.pdfUrl);
  }

  // Fallback: redirect to blog list
  const blogUrl = locale === "fr" ? "/blog" : "/en/blog";
  redirect(blogUrl);
}
