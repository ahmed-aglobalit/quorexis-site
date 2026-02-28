"use client";

import { useEffect, useRef, useCallback } from "react";
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
  url: string | undefined;
  duration: string;
  icon: React.ReactNode;
}

const CALENDLY_EVENTS: EventType[] = [
  {
    key: "discovery",
    url: process.env.NEXT_PUBLIC_CALENDLY_DISCOVERY_20,
    duration: "20 min",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    key: "audit",
    url: process.env.NEXT_PUBLIC_CALENDLY_AUDIT_30,
    duration: "30 min",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    key: "scoping",
    url: process.env.NEXT_PUBLIC_CALENDLY_SCOPING_45,
    duration: "45 min",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

export default function CalendlySelector({
  name,
  email,
  company,
}: CalendlySelectorProps) {
  const t = useTranslations("assistant");
  const scriptLoaded = useRef(false);
  const selectedRef = useRef<string | null>(null);

  // Load Calendly widget script
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

    // Add Calendly CSS for popup
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
      if (company) params.set("a1", company); // Calendly custom field
      const qs = params.toString();
      return qs ? `${baseUrl}?${qs}` : baseUrl;
    },
    [name, email, company]
  );

  function handleSelect(event: EventType) {
    if (!event.url) return;
    const url = buildUrl(event.url);
    selectedRef.current = event.key;

    // Try popup, fallback to new tab
    if (window.Calendly) {
      try {
        window.Calendly.initPopupWidget({ url });
        return;
      } catch {
        // fallback below
      }
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const availableEvents = CALENDLY_EVENTS.filter((e) => e.url);

  if (availableEvents.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">{t("lead.calendly.title")}</p>
      <p className="text-xs text-muted">{t("lead.calendly.subtitle")}</p>

      <div className="flex flex-col gap-2">
        {availableEvents.map((event) => (
          <button
            key={event.key}
            onClick={() => handleSelect(event)}
            className="group flex items-center gap-3 w-full p-3 border border-border rounded-lg text-left hover:border-accent hover:bg-accent/5 transition-all focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            aria-label={`${t(`lead.calendly.events.${event.key}.title`)} — ${event.duration}`}
          >
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent/20 transition-colors">
              {event.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {t(`lead.calendly.events.${event.key}.title`)}
              </p>
              <p className="text-xs text-muted mt-0.5">
                {t(`lead.calendly.events.${event.key}.desc`)}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-1.5 text-xs text-muted">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {event.duration}
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted text-center mt-1">
        {t("lead.calendly.fallback")}
      </p>
    </div>
  );
}
