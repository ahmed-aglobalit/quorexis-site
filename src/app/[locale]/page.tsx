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
  LiveActivity,
  TechHumanSection,
  ProspectJourney,
  MethodSection,
  BudgetCalculator,
  PricingSection,
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
      {/* Hero: White background with live engine visualization */}
      <SalesHeroV2 />

      {/* Command Center: Light gray - show the dashboard */}
      <CommandCenter />

      {/* Not a Call Center: Full-bleed black signature section */}
      <NotCallCenterV2 />

      {/* Live Activity: White - show real-time campaign activity */}
      <LiveActivity />

      {/* Tech + Human: Light gray - split view */}
      <TechHumanSection />

      {/* Prospect Journey: White - multichannel timeline */}
      <ProspectJourney />

      {/* Method: Light gray - how it works */}
      <MethodSection />

      {/* Budget Calculator: Light gray - free tool */}
      <BudgetCalculator />

      {/* Pricing: White - real pricing */}
      <PricingSection />

      {/* Team: White - founders */}
      <SalesTeam />

      {/* FAQ: Light gray */}
      <SalesFaq />

      {/* Final CTA: Full-bleed black */}
      <FinalCtaV2 />

      {/* Contact: White */}
      <SalesContact />
    </>
  );
}

export default function HomePage() {
  return SITE_MODE === "sales" ? <SalesHomePage /> : <QaHomePage />;
}
