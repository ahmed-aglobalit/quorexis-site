"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { MegaMenuConfig } from "@/config/navigation";

type Props = {
  mega: MegaMenuConfig;
  isOpen: boolean;
  onClose: () => void;
};

export default function MegaMenu({ mega, isOpen, onClose }: Props) {
  const t = useTranslations("nav");
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(mega.tabs[0]?.key ?? "");

  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick, true);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [isOpen, onClose]);

  // Reset active tab when opening
  useEffect(() => {
    if (isOpen) setActiveTab(mega.tabs[0]?.key ?? "");
  }, [isOpen, mega.tabs]);

  if (!isOpen) return null;

  const currentTab = mega.tabs.find((tab) => tab.key === activeTab) ?? mega.tabs[0];

  return (
    <div
      ref={panelRef}
      role="menu"
      className="menu-panel-enter absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[min(900px,calc(100vw-2rem))] bg-white border border-border rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="flex min-h-[320px]">
        {/* Left sidebar — tabs + other links */}
        <div className="w-[220px] shrink-0 border-r border-border/60 py-4 flex flex-col">
          <p className="px-4 pb-3 text-xs uppercase tracking-wider text-muted/60 font-semibold">
            {t("qaServices")}
          </p>

          <div className="flex-1 space-y-0.5 px-2">
            {mega.tabs.map((tab) => (
              <button
                key={tab.key}
                role="menuitem"
                onMouseEnter={() => setActiveTab(tab.key)}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeTab === tab.key
                    ? "bg-foreground/5 text-foreground font-medium"
                    : "text-muted hover:text-foreground hover:bg-foreground/[0.02]"
                }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          {mega.otherLinks.length > 0 && (
            <div className="mt-auto border-t border-border/60 pt-3 px-2">
              <p className="px-3 pb-2 text-xs uppercase tracking-wider text-muted/60 font-semibold">
                {t("other")}
              </p>
              {mega.otherLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  onClick={onClose}
                  className="block px-3 py-1.5 text-sm text-muted hover:text-accent transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right content — columns */}
        {currentTab && (
          <div className="flex-1 py-4 px-6">
            <div className={`grid gap-8 ${
              currentTab.columns.length === 1
                ? "grid-cols-1"
                : currentTab.columns.length === 2
                ? "grid-cols-2"
                : "grid-cols-3"
            }`}>
              {currentTab.columns.map((col) => (
                <div key={col.titleKey}>
                  <p className="text-xs uppercase tracking-wider text-muted/60 font-semibold mb-3">
                    {t(col.titleKey)}
                  </p>
                  <div className="space-y-1">
                    {col.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={onClose}
                        className="block py-1.5 text-sm text-muted hover:text-accent transition-colors break-words"
                      >
                        {t(link.labelKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
