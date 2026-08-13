export type SiteMode = "sales" | "qa";

export const SITE_MODE: SiteMode = (process.env.NEXT_PUBLIC_SITE_MODE as SiteMode) || "sales";

export const isSalesSite = SITE_MODE === "sales";
export const isQaSite = SITE_MODE === "qa";

export const siteConfig = {
  sales: {
    name: "Quorexis",
    tagline: "B2B Outbound Sales Factory",
    domain: "quorexis.fr",
    email: "contact@quorexis.fr",
    messagesPath: "sales",
  },
  qa: {
    name: "Quorexis",
    tagline: "Software Testing Delivery",
    domain: "quorexis.fr",
    email: "contact@quorexis.fr",
    messagesPath: "qa",
  },
} as const;

export const currentSiteConfig = siteConfig[SITE_MODE];
