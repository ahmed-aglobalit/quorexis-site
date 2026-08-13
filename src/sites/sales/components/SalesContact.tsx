"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function SalesContact() {
  const t = useTranslations("contact");
  const ref = useReveal<HTMLElement>();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(
    (form: FormData) => {
      const errs: Record<string, string> = {};
      if (!form.get("name")) errs.name = t("errorRequired");
      const email = form.get("email") as string;
      if (!email) {
        errs.email = t("errorRequired");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errs.email = t("errorEmail");
      }
      return errs;
    },
    [t]
  );

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          website: form.get("website"),
          role: form.get("role"),
          goal: form.get("goal"),
          teamSize: form.get("teamSize"),
          targetMarket: form.get("targetMarket"),
          message: form.get("message"),
          source: "sales",
        }),
      });

      if (!res.ok) throw new Error("Send failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleBlur(field: string, value: string) {
    if (field === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: t("errorEmail") }));
    } else if (!value && (field === "name" || field === "email")) {
      setErrors((prev) => ({ ...prev, [field]: t("errorRequired") }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  const inputBase =
    "w-full px-4 py-3 border rounded-md bg-transparent text-sm placeholder:text-muted/60 focus:outline-none focus:border-accent transition-all duration-200";

  return (
    <section id="contact" className="scroll-mt-20 reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted text-lg">{t("intro")}</p>

          {status === "success" ? (
            <div className="mt-10 p-6 border border-accent/20 rounded-lg bg-accent/5">
              <p className="text-sm font-medium">{t("success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("name")}
                    aria-label={t("name")}
                    onBlur={(e) => handleBlur("name", e.target.value)}
                    className={`${inputBase} ${errors.name ? "border-red-400" : "border-border"}`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("email")}
                    aria-label={t("email")}
                    onBlur={(e) => handleBlur("email", e.target.value)}
                    className={`${inputBase} ${errors.email ? "border-red-400" : "border-border"}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="company"
                  placeholder={t("company")}
                  aria-label={t("company")}
                  className={`${inputBase} border-border`}
                />
                <input
                  type="url"
                  name="website"
                  placeholder={t("website")}
                  aria-label={t("website")}
                  className={`${inputBase} border-border`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <select
                  name="role"
                  aria-label={t("role")}
                  className={`${inputBase} border-border text-muted`}
                >
                  <option value="">{t("role")}</option>
                  <option value="ceo">{t("roleOptions.ceo")}</option>
                  <option value="salesDirector">{t("roleOptions.salesDirector")}</option>
                  <option value="headOfSales">{t("roleOptions.headOfSales")}</option>
                  <option value="businessDev">{t("roleOptions.businessDev")}</option>
                  <option value="marketing">{t("roleOptions.marketing")}</option>
                  <option value="other">{t("roleOptions.other")}</option>
                </select>

                <select
                  name="teamSize"
                  aria-label={t("teamSize")}
                  className={`${inputBase} border-border text-muted`}
                >
                  <option value="">{t("teamSize")}</option>
                  <option value="0">{t("teamSizeOptions.zero")}</option>
                  <option value="1-5">{t("teamSizeOptions.small")}</option>
                  <option value="6-20">{t("teamSizeOptions.medium")}</option>
                  <option value="21-50">{t("teamSizeOptions.large")}</option>
                  <option value="50+">{t("teamSizeOptions.enterprise")}</option>
                </select>
              </div>

              <select
                name="goal"
                aria-label={t("goal")}
                className={`${inputBase} border-border text-muted`}
              >
                <option value="">{t("goal")}</option>
                <option value="moreLeads">{t("goalOptions.moreLeads")}</option>
                <option value="outsource">{t("goalOptions.outsource")}</option>
                <option value="buildTeam">{t("goalOptions.buildTeam")}</option>
                <option value="newMarket">{t("goalOptions.newMarket")}</option>
                <option value="improve">{t("goalOptions.improve")}</option>
                <option value="other">{t("goalOptions.other")}</option>
              </select>

              <input
                type="text"
                name="targetMarket"
                placeholder={t("targetMarket")}
                aria-label={t("targetMarket")}
                className={`${inputBase} border-border`}
              />

              <textarea
                name="message"
                rows={4}
                placeholder={t("message")}
                aria-label={t("message")}
                className={`${inputBase} border-border resize-none`}
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="self-start px-8 py-4 bg-accent text-white text-sm font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {status === "sending" ? t("sending") : t("send")}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-600">{t("errorGeneral")}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
