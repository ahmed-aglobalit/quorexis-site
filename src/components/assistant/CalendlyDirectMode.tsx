"use client";

import { useTranslations } from "next-intl";
import CalendlySelector from "./CalendlySelector";

interface CalendlyDirectModeProps {
  onBack: () => void;
}

export default function CalendlyDirectMode({ onBack }: CalendlyDirectModeProps) {
  const t = useTranslations("assistant");

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="p-4 flex flex-col gap-4 overflow-y-auto min-h-0 flex-1">
        {/* Welcome message */}
        <div className="rounded-md bg-foreground/[0.03] p-3">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {t("calendlyDirect.welcome")}
          </p>
        </div>

        {/* Calendly cards — no form, direct access */}
        <CalendlySelector name="" email="" company="" />
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-border px-4 py-3">
        <button
          onClick={onBack}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          &larr; {t("calendlyDirect.backToChoose")}
        </button>
      </div>
    </div>
  );
}
