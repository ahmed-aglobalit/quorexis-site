import { getTranslations } from "next-intl/server";
import ComingSoon from "@/components/ComingSoon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "resources.webinars",
  });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
}

export default function WebinarsPage() {
  return <ComingSoon namespace="resources.webinars" />;
}
