"use client";

import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import StepIndicator from "./StepIndicator";

interface LeadModeProps {
  onBack: () => void;
}

interface LeadData {
  name: string;
  email: string;
  company: string;
  role: string;
  productType: string;
  sector: string;
  mainNeed: string;
  urgency: string;
  volume: string;
  goals: string[];
  message: string;
  wantsCall: boolean;
  timeSlot: string;
  timezone: string;
  website: string; // honeypot
}

type Status = "idle" | "sending" | "success" | "error";

const TOTAL_STEPS = 7; // 6 form steps + summary

const roleKeys = ["cto", "qaLead", "product", "procurement", "other"] as const;
const typeKeys = ["web", "mobile", "api", "multi"] as const;
const sectorKeys = ["fintech", "telecom", "iot", "travel", "healthcare", "other"] as const;
const needKeys = ["functional", "automation", "api", "performance", "governance", "training"] as const;
const urgencyKeys = ["asap", "1month", "1-3months", "planning"] as const;
const volumeKeys = ["small", "medium", "large"] as const;
const goalKeys = ["reduceIncidents", "accelerateRelease", "stabilizeRegression", "structureGovernance", "improveKpis"] as const;
const timeSlotKeys = ["morning", "afternoon", "flexible"] as const;
const tzKeys = ["europe", "uk", "us-east", "us-west", "other"] as const;

const inputBase =
  "w-full px-3 py-2.5 border border-border rounded-md bg-transparent text-sm focus:outline-none focus:border-accent transition-colors";

const selectBase =
  "w-full px-3 py-2.5 border border-border rounded-md bg-transparent text-sm focus:outline-none focus:border-accent transition-colors";

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
    role: "",
    productType: "",
    sector: "",
    mainNeed: "",
    urgency: "",
    volume: "",
    goals: [],
    message: "",
    wantsCall: false,
    timeSlot: "",
    timezone: "",
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

  function toggleGoal(goal: string) {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  }

  const validateStep = useCallback(
    (s: number): boolean => {
      const errs: Record<string, string> = {};

      if (s === 1) {
        if (!data.name.trim()) errs.name = t("lead.errorRequired");
        if (!data.email.trim()) {
          errs.email = t("lead.errorRequired");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          errs.email = t("lead.errorEmail");
        }
        if (!data.company.trim()) errs.company = t("lead.errorRequired");
      }

      if (s === 3) {
        if (!data.mainNeed) errs.mainNeed = t("lead.errorRequired");
      }

      setErrors(errs);
      return Object.keys(errs).length === 0;
    },
    [data, t]
  );

  function handleNext() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function handlePrev() {
    if (step === 1) {
      onBack();
    } else {
      setStep((s) => s - 1);
    }
  }

  async function handleSubmit() {
    setStatus("sending");
    try {
      const res = await fetch("/api/assistant/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          locale,
          referrer: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  // Helper to get translated value for summary
  function label(ns: string, key: string): string {
    if (!key) return "—";
    try {
      return t(`lead.${ns}.${key}`);
    } catch {
      return key;
    }
  }

  if (status === "success") {
    return (
      <div className="p-4 flex flex-col items-center gap-4 text-center">
        <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
          <svg
            width="24"
            height="24"
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
        <p className="text-sm font-medium">{t("lead.success")}</p>
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
    <div className="flex flex-col">
      <StepIndicator current={step} total={TOTAL_STEPS} />

      <div className="p-4 flex flex-col gap-3 overflow-y-auto flex-1">
        {/* Step 1: Profile */}
        {step === 1 && (
          <>
            <p className="text-sm font-medium">{t("lead.profileTitle")}</p>

            {/* Honeypot — hidden from humans */}
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

            <select
              value={data.role}
              onChange={(e) => updateField("role", e.target.value)}
              className={`${selectBase} ${data.role ? "text-foreground" : "text-muted"}`}
            >
              <option value="" disabled>
                {t("lead.rolePlaceholder")}
              </option>
              {roleKeys.map((k) => (
                <option key={k} value={k}>
                  {t(`lead.roles.${k}`)}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Step 2: Context */}
        {step === 2 && (
          <>
            <p className="text-sm font-medium">{t("lead.contextTitle")}</p>

            <select
              value={data.productType}
              onChange={(e) => updateField("productType", e.target.value)}
              className={`${selectBase} ${data.productType ? "text-foreground" : "text-muted"}`}
            >
              <option value="" disabled>
                {t("lead.productPlaceholder")}
              </option>
              {typeKeys.map((k) => (
                <option key={k} value={k}>
                  {t(`lead.types.${k}`)}
                </option>
              ))}
            </select>

            <select
              value={data.sector}
              onChange={(e) => updateField("sector", e.target.value)}
              className={`${selectBase} ${data.sector ? "text-foreground" : "text-muted"}`}
            >
              <option value="" disabled>
                {t("lead.sectorPlaceholder")}
              </option>
              {sectorKeys.map((k) => (
                <option key={k} value={k}>
                  {t(`lead.sectors.${k}`)}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Step 3: Need */}
        {step === 3 && (
          <>
            <p className="text-sm font-medium">{t("lead.needTitle")}</p>

            <div>
              <select
                value={data.mainNeed}
                onChange={(e) => updateField("mainNeed", e.target.value)}
                className={`${selectBase} ${data.mainNeed ? "text-foreground" : "text-muted"} ${errors.mainNeed ? "border-red-400" : ""}`}
              >
                <option value="" disabled>
                  {t("lead.needPlaceholder")}
                </option>
                {needKeys.map((k) => (
                  <option key={k} value={k}>
                    {t(`lead.needs.${k}`)}
                  </option>
                ))}
              </select>
              {errors.mainNeed && (
                <p className="mt-1 text-xs text-red-500">{errors.mainNeed}</p>
              )}
            </div>

            <select
              value={data.urgency}
              onChange={(e) => updateField("urgency", e.target.value)}
              className={`${selectBase} ${data.urgency ? "text-foreground" : "text-muted"}`}
            >
              <option value="" disabled>
                {t("lead.urgencyPlaceholder")}
              </option>
              {urgencyKeys.map((k) => (
                <option key={k} value={k}>
                  {t(`lead.urgencies.${k}`)}
                </option>
              ))}
            </select>

            <select
              value={data.volume}
              onChange={(e) => updateField("volume", e.target.value)}
              className={`${selectBase} ${data.volume ? "text-foreground" : "text-muted"}`}
            >
              <option value="" disabled>
                {t("lead.volumePlaceholder")}
              </option>
              {volumeKeys.map((k) => (
                <option key={k} value={k}>
                  {t(`lead.volumes.${k}`)}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Step 4: Goals */}
        {step === 4 && (
          <>
            <p className="text-sm font-medium">{t("lead.goalsTitle")}</p>
            <p className="text-xs text-muted">{t("lead.goalsSubtitle")}</p>
            <div className="flex flex-col gap-2">
              {goalKeys.map((k) => (
                <label
                  key={k}
                  className="flex items-center gap-2.5 px-3 py-2.5 border border-border rounded-md text-sm cursor-pointer hover:border-accent transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
                >
                  <input
                    type="checkbox"
                    checked={data.goals.includes(k)}
                    onChange={() => toggleGoal(k)}
                    className="accent-accent h-4 w-4 shrink-0"
                  />
                  <span className="break-words min-w-0">{t(`lead.goals.${k}`)}</span>
                </label>
              ))}
            </div>
          </>
        )}

        {/* Step 5: Message */}
        {step === 5 && (
          <>
            <p className="text-sm font-medium">{t("lead.messageTitle")}</p>
            <textarea
              value={data.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder={t("lead.messagePlaceholder")}
              rows={4}
              maxLength={2000}
              className={`${inputBase} resize-none`}
            />
            <p className="text-xs text-muted text-right">
              {data.message.length}/2000
            </p>
          </>
        )}

        {/* Step 6: Call */}
        {step === 6 && (
          <>
            <p className="text-sm font-medium">{t("lead.callTitle")}</p>

            <label className="flex items-center gap-2.5 px-3 py-2.5 border border-border rounded-md text-sm cursor-pointer hover:border-accent transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5">
              <input
                type="checkbox"
                checked={data.wantsCall}
                onChange={(e) => updateField("wantsCall", e.target.checked)}
                className="accent-accent h-4 w-4 shrink-0"
              />
              <span>{t("lead.wantsCall")}</span>
            </label>

            {data.wantsCall && (
              <>
                <select
                  value={data.timeSlot}
                  onChange={(e) => updateField("timeSlot", e.target.value)}
                  className={`${selectBase} ${data.timeSlot ? "text-foreground" : "text-muted"}`}
                >
                  <option value="" disabled>
                    {t("lead.timeSlotPlaceholder")}
                  </option>
                  {timeSlotKeys.map((k) => (
                    <option key={k} value={k}>
                      {t(`lead.timeSlots.${k}`)}
                    </option>
                  ))}
                </select>

                <select
                  value={data.timezone}
                  onChange={(e) => updateField("timezone", e.target.value)}
                  className={`${selectBase} ${data.timezone ? "text-foreground" : "text-muted"}`}
                >
                  <option value="" disabled>
                    {t("lead.timezonePlaceholder")}
                  </option>
                  {tzKeys.map((k) => (
                    <option key={k} value={k}>
                      {t(`lead.timezones.${k}`)}
                    </option>
                  ))}
                </select>
              </>
            )}
          </>
        )}

        {/* Step 7: Summary */}
        {step === 7 && (
          <>
            <p className="text-sm font-medium">{t("lead.summaryTitle")}</p>

            <div className="flex flex-col gap-2 text-sm">
              <SummarySection title={t("lead.summaryProfile")}>
                <SummaryRow label={t("lead.name")} value={data.name} />
                <SummaryRow label={t("lead.email")} value={data.email} />
                <SummaryRow label={t("lead.company")} value={data.company} />
                <SummaryRow
                  label={t("lead.role")}
                  value={data.role ? label("roles", data.role) : "—"}
                />
              </SummarySection>

              <SummarySection title={t("lead.summaryContext")}>
                <SummaryRow
                  label={t("lead.productType")}
                  value={data.productType ? label("types", data.productType) : "—"}
                />
                <SummaryRow
                  label={t("lead.sector")}
                  value={data.sector ? label("sectors", data.sector) : "—"}
                />
              </SummarySection>

              <SummarySection title={t("lead.summaryNeed")}>
                <SummaryRow
                  label={t("lead.mainNeed")}
                  value={data.mainNeed ? label("needs", data.mainNeed) : "—"}
                />
                <SummaryRow
                  label={t("lead.urgency")}
                  value={data.urgency ? label("urgencies", data.urgency) : "—"}
                />
                <SummaryRow
                  label={t("lead.volume")}
                  value={data.volume ? label("volumes", data.volume) : "—"}
                />
              </SummarySection>

              {data.goals.length > 0 && (
                <SummarySection title={t("lead.summaryGoals")}>
                  <p className="text-muted break-words">
                    {data.goals.map((g) => label("goals", g)).join(", ")}
                  </p>
                </SummarySection>
              )}

              {data.message && (
                <SummarySection title={t("lead.summaryMessage")}>
                  <p className="text-muted break-words whitespace-pre-wrap">
                    {data.message}
                  </p>
                </SummarySection>
              )}

              <SummarySection title={t("lead.summaryCall")}>
                <p className="text-muted">
                  {data.wantsCall
                    ? `${t("lead.summaryYes")} — ${data.timeSlot ? label("timeSlots", data.timeSlot) : "—"} (${data.timezone ? label("timezones", data.timezone) : "—"})`
                    : t("lead.summaryNo")}
                </p>
              </SummarySection>
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="w-full px-3 py-2.5 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? t("sending") : t("lead.confirm")}
            </button>

            {status === "error" && (
              <p className="text-xs text-red-500">{t("lead.errorGeneral")}</p>
            )}
          </>
        )}
      </div>

      {/* Navigation */}
      {step < TOTAL_STEPS && (
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <button
            onClick={handlePrev}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← {t("back")}
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 transition-colors"
          >
            {t("continue")}
          </button>
        </div>
      )}

      {step === TOTAL_STEPS && (
        <div className="flex items-center border-t border-border px-4 py-3">
          <button
            onClick={handlePrev}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← {t("back")}
          </button>
        </div>
      )}
    </div>
  );
}

function SummarySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded-md p-2.5">
      <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1.5">
        {title}
      </p>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 text-sm">
      <span className="text-muted shrink-0">{label}</span>
      <span className="text-right break-words min-w-0">{value || "—"}</span>
    </div>
  );
}
