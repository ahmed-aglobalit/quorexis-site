"use client";

import { useTranslations } from "next-intl";

export default function SkipToContent() {
  const t = useTranslations("ui");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:text-sm focus:font-medium"
    >
      {t("skipToContent")}
    </a>
  );
}
