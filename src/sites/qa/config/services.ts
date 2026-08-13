export interface ServiceMeta {
  slug: string;
  i18nKey: string;
  category: "core" | "advanced" | "governance" | "levels" | "platforms";
}

export const services: ServiceMeta[] = [
  { slug: "functional-testing", i18nKey: "functionalTesting", category: "core" },
  { slug: "test-automation", i18nKey: "testAutomation", category: "core" },
  { slug: "api-testing", i18nKey: "apiTesting", category: "core" },
  { slug: "performance-testing", i18nKey: "performanceTesting", category: "core" },
  { slug: "accessibility-testing", i18nKey: "accessibilityTesting", category: "core" },
  { slug: "exploratory-testing", i18nKey: "exploratoryTesting", category: "advanced" },
  { slug: "regression-testing", i18nKey: "regressionTesting", category: "advanced" },
  { slug: "uat-system-testing", i18nKey: "uatSystemTesting", category: "advanced" },
  { slug: "compatibility-testing", i18nKey: "compatibilityTesting", category: "advanced" },
  { slug: "qa-governance", i18nKey: "qaGovernance", category: "governance" },
  { slug: "qa-audit", i18nKey: "qaAudit", category: "governance" },
  { slug: "test-strategy", i18nKey: "testStrategy", category: "governance" },
  { slug: "quality-gates", i18nKey: "qualityGates", category: "governance" },
  { slug: "defect-triage", i18nKey: "defectTriage", category: "governance" },
  { slug: "smoke-testing", i18nKey: "smokeTesting", category: "levels" },
  { slug: "system-testing", i18nKey: "systemTesting", category: "levels" },
  { slug: "integration-testing", i18nKey: "integrationTesting", category: "levels" },
  { slug: "uat", i18nKey: "uat", category: "levels" },
  { slug: "web-testing", i18nKey: "webTesting", category: "platforms" },
  { slug: "mobile-testing", i18nKey: "mobileTesting", category: "platforms" },
  { slug: "desktop-testing", i18nKey: "desktopTesting", category: "platforms" },
];

export function getServiceBySlug(slug: string): ServiceMeta | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceMeta["category"]): ServiceMeta[] {
  return services.filter((s) => s.category === category);
}
