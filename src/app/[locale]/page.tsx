import { getTranslations } from "next-intl/server";
import { SITE_MODE } from "@/config/site";

import QaHero from "@/components/Hero";
import QaExpertises from "@/components/Expertises";
import QaApproach from "@/components/Approach";
import QaTeam from "@/components/Team";
import QaClients from "@/components/Clients";
import QaLatestInsights from "@/components/LatestInsights";
import QaTrainingTeaser from "@/components/TrainingTeaser";
import QaContact from "@/components/Contact";

import {
  SalesHeroV2,
  CommandCenter,
  NotCallCenterV2,
  OffersPreview,
  TechHumanSection,
  FreeToolsSection,
  WhatSdrDoes,
  First30Days,
  BrandProtection,
  WhatIfItFails,
  SalesTeam,
  FitNotFit,
  SalesFaq,
  FinalCtaV2,
  SalesContact,
} from "@/sites/sales/components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

function QaHomePage() {
  return (
    <>
      <QaHero />
      <QaExpertises />
      <QaTeam />
      <QaClients />
      <QaLatestInsights />
      <QaTrainingTeaser />
      <QaApproach />
      <QaContact />
    </>
  );
}

function SalesHomePage() {
  return (
    <>
      {/* 01 - HERO: Promise + Outcome */}
      <SalesHeroV2 />

      {/* 02 - PIPELINE VISUAL: Proof - show the dashboard */}
      <CommandCenter />

      {/* 03 - NOT A CALL CENTER: Differentiation */}
      <NotCallCenterV2 />

      {/* 04 - WHAT YOU GET: Data + Automation + SDR */}
      <TechHumanSection />

      {/* 05 - OFFERS PREVIEW: Commercial teaser - link to /offres */}
      <OffersPreview />

      {/* 06 - CALCULATOR + TOOLS: Dimensionnez votre outbound */}
      <FreeToolsSection />

      {/* 07 - WHAT SDR DOES: Clarify SDR role */}
      <WhatSdrDoes />

      {/* 08 - FIRST 30 DAYS: Onboarding timeline - reduce risk */}
      <First30Days />

      {/* 09 - BRAND PROTECTION: Control assurance */}
      <BrandProtection />

      {/* 10 - WHAT IF DOESN'T WORK: Transparency */}
      <WhatIfItFails />

      {/* 11 - FOUNDERS: Trust - moved earlier per CRO spec */}
      <SalesTeam />

      {/* 12 - FIT / NOT FIT: Qualification */}
      <FitNotFit />

      {/* 13 - FAQ */}
      <SalesFaq />

      {/* 14 - FINAL CTA: Human CTA - Parler à un expert */}
      <FinalCtaV2 />

      {/* 15 - Contact form */}
      <SalesContact />
    </>
  );
}

export default function HomePage() {
  return SITE_MODE === "sales" ? <SalesHomePage /> : <QaHomePage />;
}
