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
  OffersPreview,
  TechHumanSection,
  MethodSection,
  FreeToolsSection,
  SalesTeam,
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
      {/* 01 - Hero: Promise + Outcome */}
      <SalesHeroV2 />

      {/* 02 - Command Center: Proof/Value - show the dashboard */}
      <CommandCenter />

      {/* 03 - Offers Preview: Commercial teaser - NOT full pricing */}
      <OffersPreview />

      {/* 04 - Tech + Human: What you get - Data + Automation + SDR */}
      <TechHumanSection />

      {/* 05 - Method: How Quorexis builds the pipeline */}
      <MethodSection />

      {/* 06 - Calculator + Tools: Dimensionnez votre outbound */}
      <FreeToolsSection />

      {/* 07 - Team: Trust - founders */}
      <SalesTeam />

      {/* 08 - FAQ: Short FAQ */}
      <SalesFaq />

      {/* 09 - Final CTA: Human CTA - Parler à un expert */}
      <FinalCtaV2 />

      {/* 10 - Contact form */}
      <SalesContact />
    </>
  );
}

export default function HomePage() {
  return SITE_MODE === "sales" ? <SalesHomePage /> : <QaHomePage />;
}
