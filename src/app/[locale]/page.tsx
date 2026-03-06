import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import Expertises from "@/components/Expertises";
import Approach from "@/components/Approach";
import Team from "@/components/Team";
import Clients from "@/components/Clients";
import LatestInsights from "@/components/LatestInsights";
import TrainingTeaser from "@/components/TrainingTeaser";
import Contact from "@/components/Contact";

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

export default function HomePage() {
  return (
    <>
      <Hero />
      <Expertises />
      <Approach />
      <Team />
      <Clients />
      <LatestInsights />
      <TrainingTeaser />
      <Contact />
    </>
  );
}
