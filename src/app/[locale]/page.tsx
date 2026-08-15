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
  TechHumanSection,
  MethodTeaser,
  OffersPreview,
  First4WeeksTeaser,
  CalculatorCTA,
  SalesTeam,
  ToolsCTA,
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

      {/* 02 - PIPELINE VISUAL: Proof */}
      <CommandCenter />

      {/* 03 - OFFERS: What you can buy (early = commercial focus) */}
      <OffersPreview />

      {/* 04 - 4 WEEKS: What happens after you decide */}
      <First4WeeksTeaser />

      {/* 05 - METHOD TEASER: How we work (for curious prospects) */}
      <MethodTeaser />

      {/* 06 - CALCULATOR CTA: Find your plan */}
      <CalculatorCTA />

      {/* 07 - TECH + HUMAN: More detail for skeptics */}
      <TechHumanSection />

      {/* 08 - FOUNDERS: Trust */}
      <SalesTeam />

      {/* 09 - TOOLS CTA: Free tools */}
      <ToolsCTA />

      {/* 10 - FINAL CTA: Talk to expert */}
      <FinalCtaV2 />

      {/* 11 - Contact form */}
      <SalesContact />
    </>
  );
}

export default function HomePage() {
  return SITE_MODE === "sales" ? <SalesHomePage /> : <QaHomePage />;
}
