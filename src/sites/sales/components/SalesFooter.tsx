"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function SalesFooter() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo1-bis.png"
                alt="Quorexis"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-muted">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">{t("solutions")}</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/solutions/b2b-data" className="hover:text-foreground transition-colors">
                  {navT("b2bData")}
                </Link>
              </li>
              <li>
                <Link href="/solutions/cold-email" className="hover:text-foreground transition-colors">
                  {navT("coldEmail")}
                </Link>
              </li>
              <li>
                <Link href="/solutions/linkedin-outreach" className="hover:text-foreground transition-colors">
                  {navT("linkedinOutreach")}
                </Link>
              </li>
              <li>
                <Link href="/solutions/cold-calling" className="hover:text-foreground transition-colors">
                  {navT("coldCalling")}
                </Link>
              </li>
              <li>
                <Link href="/solutions/sdr-outsourcing" className="hover:text-foreground transition-colors">
                  {navT("sdrOutsourcing")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">{t("company")}</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/method" className="hover:text-foreground transition-colors">
                  {navT("method")}
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-foreground transition-colors">
                  {navT("industries")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  {navT("about")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href="mailto:contact@quorexis.fr"
                  className="hover:text-foreground transition-colors"
                >
                  contact@quorexis.fr
                </a>
              </li>
              <li className="pt-4">
                <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
                  {t("legal")}
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-foreground transition-colors">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60">
          <p className="text-xs text-muted">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
