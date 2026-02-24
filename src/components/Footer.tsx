import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium">{t("baseline")}</p>
            <p className="text-xs text-muted mt-1">{t("copyright")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-muted">
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
              {t("legal")}
            </Link>
            <Link href="/confidentialite" className="hover:text-foreground transition-colors">
              {t("privacy")}
            </Link>
            <a
              href="mailto:contact@quorexis.fr"
              className="hover:text-foreground transition-colors"
            >
              contact@quorexis.fr
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
