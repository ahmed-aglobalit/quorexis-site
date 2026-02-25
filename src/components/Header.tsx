"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { useState, useCallback } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const sectionIds = ["expertises", "approach", "team", "clients", "contact"];

type NavItem =
  | { type: "anchor"; label: string; id: string }
  | { type: "link"; label: string; href: string };

function scrollTo(id: string) {
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
  const isHome = pathname === "/";

  const switchLanguage = useCallback(() => {
    router.replace(pathname, { locale: targetLocale });
  }, [router, pathname, targetLocale]);

  const navItems: NavItem[] = [
    { type: "anchor", label: t("expertises"), id: "expertises" },
    { type: "anchor", label: t("approach"), id: "approach" },
    { type: "anchor", label: t("team"), id: "team" },
    { type: "anchor", label: t("clients"), id: "clients" },
    { type: "link", label: t("blog"), href: "/blog" },
    { type: "anchor", label: t("contact"), id: "contact" },
  ];

  function handleAnchorClick(id: string) {
    if (isHome) {
      scrollTo(id);
    } else {
      router.push(`/#${id}`);
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60 transition-colors">
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 flex items-center justify-between h-16">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Quorexis
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => {
            if (item.type === "link") {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm transition-colors pb-0.5 ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleAnchorClick(item.id)}
                className={`relative text-sm transition-colors pb-0.5 ${
                  isHome && activeSection === item.id
                    ? "text-foreground font-medium"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-300 ${
                    isHome && activeSection === item.id ? "w-full" : "w-0"
                  }`}
                />
              </button>
            );
          })}
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
          {navItems.map((item) => {
            if (item.type === "link") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm text-left ${
                    pathname.startsWith(item.href) ? "text-foreground font-medium" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  setMenuOpen(false);
                  handleAnchorClick(item.id);
                }}
                className={`text-sm text-left ${
                  isHome && activeSection === item.id ? "text-foreground font-medium" : "text-muted"
                }`}
              >
                {item.label}
              </button>
            );
          })}
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
