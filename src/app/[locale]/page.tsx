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
  SalesHero,
  ProblemSection,
  EnginesSection,
  NotCallCenterSection,
  PipelineSection,
  MethodSection,
  KpiSection,
  OffersSection,
  TunisiaSection,
  SalesTeam,
  PhilosophySection,
  SalesFaq,
  FinalCta,
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
      <SalesHero />
      <ProblemSection />
      <EnginesSection />
      <NotCallCenterSection />
      <PipelineSection />
      <MethodSection />
      <KpiSection />
      <OffersSection />
      <TunisiaSection />
      <SalesTeam />
      <PhilosophySection />
      <SalesFaq />
      <FinalCta />
      <SalesContact />
    </>
  );
}

export default function HomePage() {
  return SITE_MODE === "sales" ? <SalesHomePage /> : <QaHomePage />;
}
