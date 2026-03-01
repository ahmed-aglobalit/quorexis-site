"use client";

import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import CalendlySelector from "./CalendlySelector";

interface LeadModeProps {
  onBack: () => void;
}

interface LeadData {
  name: string;
  email: string;
  company: string;
  mainNeed: string;
  context: string;
  website: string; // honeypot
}

type Status = "idle" | "sending" | "success" | "error";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.fr", "yahoo.co.uk",
  "outlook.com", "outlook.fr", "hotmail.com", "hotmail.fr", "live.com",
  "live.fr", "msn.com", "icloud.com", "me.com", "mac.com",
  "aol.com", "aol.fr", "proton.me", "protonmail.com", "pm.me",
  "mail.com", "zoho.com", "yandex.com", "yandex.ru", "gmx.com",
  "gmx.fr", "free.fr", "orange.fr", "wanadoo.fr", "laposte.net",
  "sfr.fr", "bbox.fr",
]);

const needKeys = [
  "functional", "automation", "api", "performance", "governance", "unsure",
] as const;

const inputBase =
  "w-full px-3 py-2.5 border border-border rounded-md bg-transparent text-sm focus:outline-none focus:border-accent transition-colors";

function isValidProEmail(email: string): { valid: boolean; reason?: string } {
  // Basic format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, reason: "format" };
  }

  const domain = email.split("@")[1].toLowerCase();

  // Reject free/public email domains
  if (FREE_EMAIL_DOMAINS.has(domain)) {
    return { valid: false, reason: "public" };
  }

  // Reject domains that are too short (e.g. a.com, b.co)
  const domainName = domain.split(".")[0];
  if (domainName.length < 3) {
    return { valid: false, reason: "short" };
  }

  return { valid: true };
}

export default function LeadMode({ onBack }: LeadModeProps) {
  const t = useTranslations("assistant");
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<LeadData>({
    name: "",
    email: "",
    company: "",
    mainNeed: "",
    context: "",
    website: "", // honeypot
  });

  function updateField<K extends keyof LeadData>(key: K, value: LeadData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  const validateStep = useCallback(
    (s: number): boolean => {
      const errs: Record<string, string> = {};

      if (s === 1) {
        if (!data.name.trim()) errs.name = t("lead.errorRequired");

        if (!data.email.trim()) {
          errs.email = t("lead.errorRequired");
        } else {
          const emailCheck = isValidProEmail(data.email.trim());
          if (!emailCheck.valid) {
            errs.email = t("lead.errorEmailPro");
          }
        }

        if (!data.company.trim()) errs.company = t("lead.errorRequired");
        if (!data.mainNeed) errs.mainNeed = t("lead.errorRequired");
      }

      setErrors(errs);
      return Object.keys(errs).length === 0;
    },
    [data, t]
  );

  function handleNext() {
    if (!validateStep(step)) return;
    setStep(2);
  }

  async function handleSubmit() {
    setStatus("sending");
    try {
      const payload = {
        ...data,
        locale,
        referrer: typeof window !== "undefined" ? window.location.href : "",
      };

      const res = await fetch("/api/assistant/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API ${res.status}`);
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="p-6 flex flex-col items-center gap-4 text-center">
        <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-accent"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-sm font-medium leading-relaxed">
          {t("lead.success")}
        </p>
        <button
          onClick={onBack}
          className="text-xs text-muted hover:text-foreground transition-colors"
        >
          {t("startOver")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Step indicator */}
      <div className="shrink-0 px-4 pt-3 pb-1">
        <div className="flex items-center gap-2">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-accent" : "bg-border"}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-accent" : "bg-border"}`} />
        </div>
        <p className="text-[11px] text-muted mt-1.5">
          {t("step", { current: step, total: 2 })}
        </p>
      </div>

      {/* Scrollable content */}
      <div className="p-4 flex flex-col gap-3 overflow-y-auto min-h-0 flex-1">
        {/* Step 1: Profile + Need */}
        {step === 1 && (
          <>
            <p className="text-sm font-medium">{t("lead.profileTitle")}</p>

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={data.website}
              onChange={(e) => updateField("website", e.target.value)}
              className="absolute opacity-0 h-0 w-0 overflow-hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div>
              <input
                type="text"
                value={data.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder={t("lead.name")}
                className={`${inputBase} ${errors.name ? "border-red-400" : ""}`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                value={data.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder={t("lead.email")}
                className={`${inputBase} ${errors.email ? "border-red-400" : ""}`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                value={data.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder={t("lead.company")}
                className={`${inputBase} ${errors.company ? "border-red-400" : ""}`}
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-500">{errors.company}</p>
              )}
            </div>

            <div className="mt-2">
              <p className="text-sm font-medium mb-2">{t("lead.needTitle")}</p>
              <div className="flex flex-wrap gap-2">
                {needKeys.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => updateField("mainNeed", k)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      data.mainNeed === k
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted hover:border-accent/50 hover:text-foreground"
                    }`}
                  >
                    {t(`lead.needs.${k}`)}
                  </button>
                ))}
              </div>
              {errors.mainNeed && (
                <p className="mt-1.5 text-xs text-red-500">{errors.mainNeed}</p>
              )}
            </div>

            <div className="mt-1">
              <textarea
                value={data.context}
                onChange={(e) => updateField("context", e.target.value)}
                placeholder={t("lead.contextPlaceholder")}
                rows={2}
                maxLength={500}
                className={`${inputBase} resize-none`}
              />
            </div>
          </>
        )}

        {/* Step 2: Calendly */}
        {step === 2 && (
          <>
            <CalendlySelector
              name={data.name}
              email={data.email}
              company={data.company}
            />

            <div className="mt-2 pt-3 border-t border-border">
              <button
                onClick={handleSubmit}
                disabled={status === "sending"}
                className="w-full px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-md hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? t("sending") : t("lead.confirm")}
              </button>
              {status === "error" && (
                <p className="mt-2 text-xs text-red-500 text-center">
                  {t("lead.errorGeneral")}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 border-t border-border px-4 py-3 flex items-center justify-between gap-2">
        <button
          onClick={step === 1 ? onBack : () => setStep(1)}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          ← {t("back")}
        </button>

        {step === 1 && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 transition-colors"
          >
            {t("continue")}
          </button>
        )}
      </div>
    </div>
  );
}
