"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function BackToTop() {
  const t = useTranslations("ui");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollUp}
      aria-label={t("backToTop")}
      className={`fixed bottom-6 left-6 z-50 p-3 rounded-full border border-border bg-background/90 backdrop-blur-sm text-muted hover:text-foreground hover:border-accent/40 shadow-sm transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 12V4M4 7l4-3 4 3" />
      </svg>
    </button>
  );
}
