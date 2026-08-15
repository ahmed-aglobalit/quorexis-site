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
  OffersPreview,
  SalesTeam,
  ToolsCTA,
  FinalCtaV2,
  SalesContact,
  DemoContainer,
  DemoIntro,
  Week1Strategy,
  Week2Build,
  Week3Activate,
  Week4Optimize,
  DemoSummary,
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

      {/* 03 - OFFERS: What you can buy */}
      <OffersPreview />

      {/* 04 - INTERACTIVE DEMO: 4 weeks with Quorexis */}
      <DemoContainer>
        <DemoIntro />
        <Week1Strategy />
        <Week2Build />
        <Week3Activate />
        <Week4Optimize />
        <DemoSummary />
      </DemoContainer>

      {/* 05 - TECH + HUMAN: More detail for skeptics */}
      <TechHumanSection />

      {/* 06 - FOUNDERS: Trust */}
      <SalesTeam />

      {/* 07 - TOOLS CTA: Free tools */}
      <ToolsCTA />

      {/* 08 - FINAL CTA: Talk to expert */}
      <FinalCtaV2 />

      {/* 09 - Contact form */}
      <SalesContact />
    </>
  );
}

export default function HomePage() {
  return SITE_MODE === "sales" ? <SalesHomePage /> : <QaHomePage />;
}
