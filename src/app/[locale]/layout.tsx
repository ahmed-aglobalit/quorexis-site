import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { SITE_MODE } from "@/config/site";

import QaHeader from "@/components/Header";
import QaFooter from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import AssistantWidget from "@/components/AssistantWidget";
import SkipToContent from "@/components/SkipToContent";

import SalesHeader from "@/sites/sales/components/SalesHeader";
import SalesFooter from "@/sites/sales/components/SalesFooter";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  const messages = await getMessages();
  const isSales = SITE_MODE === "sales";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SkipToContent />
      {isSales ? <SalesHeader /> : <QaHeader />}
      <main id="main-content">{children}</main>
      {isSales ? <SalesFooter /> : <QaFooter />}
      <BackToTop />
      {!isSales && <AssistantWidget />}
    </NextIntlClientProvider>
  );
}
