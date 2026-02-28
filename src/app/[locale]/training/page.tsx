import { getTranslations } from "next-intl/server";
import Training from "@/components/Training";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("trainingTitle"),
    description: t("trainingDescription"),
  };
}

export default function TrainingPage() {
  return <Training />;
}
