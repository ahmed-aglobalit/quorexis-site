"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

interface CalendlySelectorProps {
  name: string;
  email: string;
  company: string;
}

interface EventType {
  key: string;
  url: string;
  badge: string;
}

const CALENDLY_EVENTS: EventType[] = [
  {
    key: "quickCall",
    url: "https://calendly.com/ahmed-ghanmi-quorexis/30min",
    badge: "20–30 min",
  },
  {
    key: "deepDive",
    url: "https://calendly.com/ahmed-ghanmi-quorexis/echange-qa-quorexis-45-mn",
    badge: "45 min",
  },
  {
    key: "demo",
    url: "https://calendly.com/ahmed-ghanmi-quorexis/echange-qa-quorexis-1-hr",
    badge: "60 min",
  },
];

export default function CalendlySelector({
  name,
  email,
  company,
}: CalendlySelectorProps) {
  const t = useTranslations("assistant");
  const scriptLoaded = useRef(false);
  const [opened, setOpened] = useState(false);

  // Load Calendly widget script once
  useEffect(() => {
    if (scriptLoaded.current) return;
    if (document.querySelector('script[src*="calendly.com"]')) {
      scriptLoaded.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
    };
    document.head.appendChild(script);

    if (!document.querySelector('link[href*="calendly.com"]')) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  const buildUrl = useCallback(
    (baseUrl: string) => {
      const params = new URLSearchParams();
      if (name) params.set("name", name);
      if (email) params.set("email", email);
      if (company) params.set("a1", company);
      const qs = params.toString();
      return qs ? `${baseUrl}?${qs}` : baseUrl;
    },
    [name, email, company]
  );

  function handleSelect(event: EventType) {
    const url = buildUrl(event.url);

    if (window.Calendly) {
      try {
        window.Calendly.initPopupWidget({ url });
        setOpened(true);
        return;
      } catch {
        // fallback below
      }
    }
    window.open(url, "_blank", "noopener,noreferrer");
    setOpened(true);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">{t("lead.calendly.title")}</p>
      <p className="text-xs text-muted">{t("lead.calendly.subtitle")}</p>

      <div className="flex flex-col gap-2.5">
        {CALENDLY_EVENTS.map((event) => (
          <button
            key={event.key}
            onClick={() => handleSelect(event)}
            className="group flex items-center gap-3 w-full p-4 bg-foreground/[0.02] border border-border rounded-lg text-left hover:border-accent hover:bg-accent/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            aria-label={`${t(`lead.calendly.events.${event.key}.title`)} — ${event.badge}`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">
                {t(`lead.calendly.events.${event.key}.title`)}
              </p>
              <p className="text-xs text-muted mt-1">
                {t(`lead.calendly.events.${event.key}.desc`)}
              </p>
            </div>
            <span className="shrink-0 text-[11px] font-medium text-muted bg-foreground/[0.04] px-2 py-0.5 rounded group-hover:text-accent transition-colors">
              {event.badge}
            </span>
          </button>
        ))}
      </div>

      {opened && (
        <div className="flex flex-col gap-1.5 mt-1">
          <p className="text-xs text-muted">
            {t("lead.calendly.afterOpen")}
          </p>
          <p className="text-xs text-muted italic">
            {t("lead.calendly.contextPrompt")}
          </p>
        </div>
      )}

      <p className="text-xs text-muted text-center mt-1">
        {t("lead.calendly.fallback")}
      </p>
    </div>
  );
}
