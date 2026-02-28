"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { navigationItems } from "@/config/navigation";
import MegaMenu from "./MegaMenu";
import DropdownMenu from "./DropdownMenu";

function ChevronDown({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 4l3 3 3-3" />
    </svg>
  );
}

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isFr = locale === "fr";
  const targetLocale = isFr ? "en" : "fr";

  const switchLanguage = useCallback(() => {
    router.replace(pathname, { locale: targetLocale });
  }, [router, pathname, targetLocale]);

  // Close menus on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function handleDesktopEnter(key: string) {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setOpenMenu(key);
    }, 150);
  }

  function handleDesktopLeave() {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  }

  function handleDesktopClick(key: string) {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setOpenMenu((prev) => (prev === key ? null : key));
  }

  const closeMenu = useCallback(() => {
    setOpenMenu(null);
  }, []);

  function toggleMobileAccordion(key: string) {
    setMobileAccordion((prev) => (prev === key ? null : key));
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60 transition-colors"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/quorexis-logo.png"
            alt="Quorexis"
            width={120}
            height={32}
            className="h-7 w-auto object-contain"
            priority
          />
          <span className="sr-only">Quorexis</span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navigationItems.map((item) => {
            if (item.type === "link") {
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm transition-colors ${
                    pathname === item.href
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              );
            }

            if (item.type === "mega") {
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => handleDesktopEnter(item.key)}
                  onMouseLeave={handleDesktopLeave}
                >
                  <button
                    onClick={() => handleDesktopClick(item.key)}
                    aria-expanded={openMenu === item.key}
                    className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors ${
                      openMenu === item.key
                        ? "text-foreground font-medium"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {t(item.labelKey)}
                    <ChevronDown
                      className={`transition-transform duration-200 ${
                        openMenu === item.key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <MegaMenu
                    mega={item.mega}
                    isOpen={openMenu === item.key}
                    onClose={closeMenu}
                  />
                </div>
              );
            }

            // dropdown
            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => handleDesktopEnter(item.key)}
                onMouseLeave={handleDesktopLeave}
              >
                <button
                  onClick={() => handleDesktopClick(item.key)}
                  aria-expanded={openMenu === item.key}
                  className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors ${
                    openMenu === item.key
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {t(item.labelKey)}
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      openMenu === item.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <DropdownMenu
                  links={item.dropdown.links}
                  isOpen={openMenu === item.key}
                  onClose={closeMenu}
                />
              </div>
            );
          })}

          {/* Language switcher */}
          <button
            onClick={switchLanguage}
            className="ml-3 text-sm font-medium text-accent hover:text-foreground transition-colors px-2 py-1 border border-border/60 rounded"
          >
            {t("switchLang")}
          </button>

          {/* CTA Contact */}
          <Link
            href="/#contact"
            className="ml-3 px-5 py-2 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
          >
            {t("contactUs")}
          </Link>
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? t("closeMenu") : t("menu")}
          aria-expanded={mobileOpen}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {mobileOpen ? (
              <path d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <nav
          className="lg:hidden fixed inset-0 top-16 z-40 bg-background/98 backdrop-blur-md overflow-y-auto"
          aria-label="Mobile navigation"
        >
          <div className="px-6 py-6 flex flex-col gap-1">
            {navigationItems.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 text-sm border-b border-border/30 ${
                      pathname === item.href
                        ? "text-foreground font-medium"
                        : "text-muted"
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              }

              const links =
                item.type === "mega"
                  ? item.mega.tabs.flatMap((tab) =>
                      tab.columns.flatMap((col) => col.links)
                    )
                  : item.dropdown.links;

              const isAccordionOpen = mobileAccordion === item.key;

              return (
                <div key={item.key} className="border-b border-border/30">
                  <button
                    onClick={() => toggleMobileAccordion(item.key)}
                    aria-expanded={isAccordionOpen}
                    className="w-full flex items-center justify-between py-3 text-sm text-muted"
                  >
                    {t(item.labelKey)}
                    <ChevronDown
                      className={`transition-transform duration-200 ${
                        isAccordionOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isAccordionOpen && (
                    <div className="pb-3 pl-4 flex flex-col gap-2">
                      {links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-muted hover:text-accent transition-colors break-words"
                        >
                          {t(link.labelKey)}
                        </Link>
                      ))}
                      {/* Show other links for mega menus */}
                      {item.type === "mega" &&
                        item.mega.otherLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-sm text-muted hover:text-accent transition-colors break-words"
                          >
                            {t(link.labelKey)}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile CTA + lang switcher */}
            <div className="mt-6 flex flex-col gap-4">
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="text-center px-6 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 transition-colors"
              >
                {t("contactUs")}
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  switchLanguage();
                }}
                className="text-sm font-medium text-accent text-center py-2 border border-border/60 rounded"
              >
                {isFr ? t("english") : t("french")}
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
