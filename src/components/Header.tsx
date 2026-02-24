"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { useState, useCallback } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const sectionIds = ["expertises", "approach", "team", "contact"];

function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(sectionIds, 80);

  const isFr = locale === "fr";
  const targetLocale = isFr ? "en" : "fr";

  const switchLanguage = useCallback(() => {
    router.replace(pathname, { locale: targetLocale });
  }, [router, pathname, targetLocale]);

  const navItems = [
    { label: t("expertises"), href: "#expertises", id: "expertises" },
    { label: t("approach"), href: "#approach", id: "approach" },
    { label: t("team"), href: "#team", id: "team" },
    { label: t("contact"), href: "#contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60 transition-colors">
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 flex items-center justify-between h-16">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Quorexis
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.href)}
              className={`relative text-sm transition-colors pb-0.5 ${
                activeSection === item.id
                  ? "text-foreground font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-300 ${
                  activeSection === item.id ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
          <button
            onClick={switchLanguage}
            className="text-sm font-medium text-accent hover:text-foreground transition-colors ml-2 px-2 py-1 border border-border/60 rounded"
          >
            {t("switchLang")}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setMenuOpen(false);
                scrollTo(item.href);
              }}
              className={`text-sm text-left ${
                activeSection === item.id ? "text-foreground font-medium" : "text-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              switchLanguage();
            }}
            className="text-sm font-medium text-accent text-left"
          >
            {t("switchLang")}
          </button>
        </nav>
      )}
    </header>
  );
}
