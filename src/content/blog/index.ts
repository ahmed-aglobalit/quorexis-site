import { BlogArticle } from "./types";
import * as functionalTesting from "./functional-testing-offshore";
import * as testAutomation from "./test-automation-strategy";
import * as apiTesting from "./api-testing-best-practices";
import * as performanceTesting from "./performance-testing-offshore";
import * as qaGovernance from "./qa-governance-kpi";
import * as deliveryModel from "./offshore-testing-delivery-model";
import * as distributedTeams from "./managing-distributed-qa-teams";
import * as industrialization from "./test-industrialization-framework";

const articles: Record<string, { fr: BlogArticle; en: BlogArticle }> = {
  "functional-testing-offshore": functionalTesting,
  "test-automation-strategy": testAutomation,
  "api-testing-best-practices": apiTesting,
  "performance-testing-offshore": performanceTesting,
  "qa-governance-kpi": qaGovernance,
  "offshore-testing-delivery-model": deliveryModel,
  "managing-distributed-qa-teams": distributedTeams,
  "test-industrialization-framework": industrialization,
};

export function getArticles(locale: "fr" | "en"): BlogArticle[] {
  return Object.values(articles)
    .map((a) => a[locale])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
