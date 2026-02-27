import { BlogArticle } from "./types";
import * as functionalTesting from "./functional-testing-offshore";
import * as testAutomation from "./test-automation-strategy";
import * as apiTesting from "./api-testing-best-practices";
import * as performanceTesting from "./performance-testing-offshore";
import * as qaGovernance from "./qa-governance-kpi";
import * as deliveryModel from "./offshore-testing-delivery-model";
import * as distributedTeams from "./managing-distributed-qa-teams";
import * as industrialization from "./test-industrialization-framework";
import * as whyOffshoreFails from "./why-offshore-testing-fails";
import * as testingStrategy30Days from "./testing-strategy-30-days";
import * as automationRoi from "./automation-roi-myth-vs-reality";
import * as kpiFramework from "./kpi-framework-qa-leaders";
import * as reducingIncidents from "./reducing-production-incidents-qa";
import * as governanceModel2026 from "./offshore-testing-governance-2026";

const articles: Record<string, { fr: BlogArticle; en: BlogArticle }> = {
  "functional-testing-offshore": functionalTesting,
  "test-automation-strategy": testAutomation,
  "api-testing-best-practices": apiTesting,
  "performance-testing-offshore": performanceTesting,
  "qa-governance-kpi": qaGovernance,
  "offshore-testing-delivery-model": deliveryModel,
  "managing-distributed-qa-teams": distributedTeams,
  "test-industrialization-framework": industrialization,
  "why-offshore-testing-fails": whyOffshoreFails,
  "testing-strategy-30-days": testingStrategy30Days,
  "automation-roi-myth-vs-reality": automationRoi,
  "kpi-framework-qa-leaders": kpiFramework,
  "reducing-production-incidents-qa": reducingIncidents,
  "offshore-testing-governance-2026": governanceModel2026,
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
