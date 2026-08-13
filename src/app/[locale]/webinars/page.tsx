import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
import { SITE_MODE } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (SITE_MODE === "sales") return {};
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
  if (SITE_MODE === "sales") notFound();
  return <ComingSoon namespace="resources.webinars" />;
}
