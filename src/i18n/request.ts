import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const SITE_MODE = process.env.NEXT_PUBLIC_SITE_MODE || "sales";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "fr" | "en")) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`./messages/${SITE_MODE}/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
