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
    namespace: "resources.whitepapers",
  });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
}

export default function WhitepapersPage() {
  if (SITE_MODE === "sales") notFound();
  return <ComingSoon namespace="resources.whitepapers" />;
}
