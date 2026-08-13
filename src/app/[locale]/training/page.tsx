import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SITE_MODE } from "@/config/site";
import Training from "@/components/Training";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (SITE_MODE === "sales") return {};
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("trainingTitle"),
    description: t("trainingDescription"),
  };
}

export default function TrainingPage() {
  if (SITE_MODE === "sales") notFound();
  return <Training />;
}
