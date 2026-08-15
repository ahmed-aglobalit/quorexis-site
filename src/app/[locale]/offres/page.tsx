import { getTranslations } from "next-intl/server";
import OffresPage from "@/sites/sales/components/OffresPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: `Offres - ${t("title")}`,
    description: "Découvrez nos formules Starter, Growth et Scale pour construire votre pipeline B2B.",
  };
}

export default function Page() {
  return <OffresPage />;
}
