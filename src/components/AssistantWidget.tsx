"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import FaqMode from "./assistant/FaqMode";
import LeadMode from "./assistant/LeadMode";
import CalendlyDirectMode from "./assistant/CalendlyDirectMode";

type Mode = "choose" | "faq" | "lead" | "calendly-direct";

const BLOG_LIST_KEY = "quorexis_assistant_autopopup_blog_seen";
const BLOG_ARTICLE_KEY = "quorexis_assistant_autopopup_article_seen";

export default function AssistantWidget() {
  const t = useTranslations("assistant");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mode, setMode] = useState<Mode>("choose");
  const [showBadge, setShowBadge] = useState(false);
  const autoOpenFiredRef = useRef(false);
  const prevPathRef = useRef(pathname);

  // Blog detection (usePathname from next-intl returns locale-stripped paths)
  const isBlogList = pathname === "/blog";
  const isBlogArticle = pathname.startsWith("/blog/") && pathname !== "/blog/";
  const isBlogPage = isBlogList || isBlogArticle;

  // Open from external trigger (e.g. Hero CTA)
  useEffect(() => {
    function handleExternalOpen() {
      setIsOpen(true);
      setMode("calendly-direct");
    }
    window.addEventListener("quorexis:open-assistant", handleExternalOpen);
    return () => window.removeEventListener("quorexis:open-assistant", handleExternalOpen);
  }, []);

  // Escape to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Reset auto-open ref on pathname change (allows new auto-open on different page type)
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      autoOpenFiredRef.current = false;
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  // Auto-open on blog pages
  useEffect(() => {
    if (!isBlogPage) {
      setShowBadge(false);
      return;
    }

    const storageKey = isBlogArticle ? BLOG_ARTICLE_KEY : BLOG_LIST_KEY;

    try {
      if (sessionStorage.getItem(storageKey) === "true") {
        setShowBadge(true);
        return;
      }
    } catch {
      return;
    }

    if (autoOpenFiredRef.current) return;
    autoOpenFiredRef.current = true;

    const delay = 800 + Math.random() * 400;
    const timer = setTimeout(() => {
      setIsOpen(true);
      setMode("calendly-direct");
      try {
        sessionStorage.setItem(storageKey, "true");
      } catch {
        // ignore
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isBlogPage, isBlogArticle, pathname]);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150);
  }

  function handleOpen() {
    setIsOpen(true);
    setMode("choose");
    setShowBadge(false);
  }

  function handleBackToChoose() {
    setMode("choose");
  }

  function handleSwitchToLead() {
    setMode("lead");
  }

  return (
    <>
      {/* Enhanced floating button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 py-3 px-5 rounded-xl bg-accent text-white shadow-lg hover:bg-accent/90 hover:shadow-xl active:scale-[0.98] transition-all duration-200"
          aria-label={t("buttonLabel")}
        >
          {/* Icon */}
          <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          {/* Labels */}
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-white leading-tight">
              {t("buttonLabel")}
            </span>
            <span className="text-[11px] text-white/70 leading-tight mt-0.5 hidden sm:block">
              {t("buttonSub")}
            </span>
          </div>

          {/* Badge */}
          {showBadge && (
            <span className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full bg-accent animate-pulse" />
          )}
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-[60] flex max-h-[min(560px,calc(100vh-3rem))] w-[calc(100vw-2rem)] flex-col rounded-lg border border-border bg-background shadow-xl sm:w-[380px] ${
            isClosing ? "chatbot-panel-exit" : "chatbot-panel-enter"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3 shrink-0">
            <span className="text-sm font-semibold">{t("title")}</span>
            <button
              onClick={handleClose}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-foreground/5 hover:text-foreground transition-colors"
              aria-label={t("close")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
            {mode === "choose" && (
              <div className="p-4 flex flex-col gap-4">
                <p className="text-sm font-medium">{t("chooseMode")}</p>

                <button
                  onClick={() => setMode("faq")}
                  className="text-left p-4 border border-border rounded-md hover:border-accent transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-accent"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t("faqOption")}</p>
                      <p className="text-xs text-muted mt-0.5">
                        {t("faqDesc")}
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setMode("lead")}
                  className="text-left p-4 border border-border rounded-md hover:border-accent transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-accent"
                        aria-hidden="true"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t("leadOption")}</p>
                      <p className="text-xs text-muted mt-0.5">
                        {t("leadDesc")}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {mode === "faq" && (
              <FaqMode
                onBack={handleBackToChoose}
                onSwitchToLead={handleSwitchToLead}
              />
            )}

            {mode === "lead" && <LeadMode onBack={handleBackToChoose} />}

            {mode === "calendly-direct" && (
              <CalendlyDirectMode onBack={handleBackToChoose} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
