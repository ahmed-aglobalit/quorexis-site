import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/config/services";
import ServicePageLayout from "@/components/ServicePageLayout";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t(`${service.i18nKey}.seoTitle`),
    description: t(`${service.i18nKey}.seoDescription`),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return <ServicePageLayout serviceKey={service.i18nKey} />;
}
