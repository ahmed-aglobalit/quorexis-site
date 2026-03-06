import { BlogArticle } from "./types";
import * as presentationQuorexis from "./presentation-quorexis";
import * as iaAccelereBugs from "./ia-accelere-bugs";

const articles: Record<string, { fr: BlogArticle; en: BlogArticle }> = {
  "presentation-quorexis": presentationQuorexis,
  "ia-accelere-bugs": iaAccelereBugs,
};

export function getArticles(locale: "fr" | "en"): BlogArticle[] {
  return Object.values(articles)
    .map((a) => a[locale])
    .sort((a, b) => {
      // Featured articles first, then by date
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getArticle(
  slug: string,
  locale: "fr" | "en"
): BlogArticle | undefined {
  return Object.values(articles)
    .map((a) => a[locale])
    .find((a) => a.slug === slug);
}

export function getAllSlugs(): { slug: string; locale: "fr" | "en" }[] {
  const result: { slug: string; locale: "fr" | "en" }[] = [];
  for (const article of Object.values(articles)) {
    result.push({ slug: article.fr.slug, locale: "fr" });
    result.push({ slug: article.en.slug, locale: "en" });
  }
  return result;
}
