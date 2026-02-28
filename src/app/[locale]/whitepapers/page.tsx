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
    namespace: "resources.whitepapers",
  });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
}

export default function WhitepapersPage() {
  return <ComingSoon namespace="resources.whitepapers" />;
}
