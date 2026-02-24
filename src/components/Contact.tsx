"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";
import Toast from "./Toast";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const t = useTranslations("contact");
  const ref = useReveal<HTMLElement>();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [subject, setSubject] = useState("");
  const [toast, setToast] = useState<string | null>(null);
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
      if (!form.get("message")) errs.message = t("errorRequired");
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
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Send failed");

      setStatus("success");
      setToast(t("success"));
    } catch {
      setStatus("error");
      setToast(t("errorGeneral"));
    }
  }

  function handleBlur(field: string, value: string) {
    if (field === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: t("errorEmail") }));
    } else if (!value && (field === "name" || field === "email" || field === "message")) {
      setErrors((prev) => ({ ...prev, [field]: t("errorRequired") }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function copyEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email);
      setToast(t("copied"));
    } catch {
      // Clipboard API not available
    }
  }

  const hintKey = `subjectHints.${subject}`;
  const messageHint = subject ? t(hintKey as "subjectHints.qa") : t("message");

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
              {/* Name */}
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

              {/* Email */}
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

              {/* Company */}
              <input
                type="text"
                name="company"
                placeholder={t("company")}
                aria-label={t("company")}
                className={`${inputBase} border-border`}
              />

              {/* Subject */}
              <select
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                aria-label={t("subject")}
                className={`${inputBase} border-border text-muted`}
              >
                <option value="" disabled>
                  {t("subject")}
                </option>
                <option value="qa">{t("subjectOptions.qa")}</option>
                <option value="devops">{t("subjectOptions.devops")}</option>
                <option value="data">{t("subjectOptions.data")}</option>
                <option value="other">{t("subjectOptions.other")}</option>
              </select>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  rows={4}
                  placeholder={messageHint}
                  aria-label={t("message")}
                  onBlur={(e) => handleBlur("message", e.target.value)}
                  className={`${inputBase} resize-none ${errors.message ? "border-red-400" : "border-border"}`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="self-start px-6 py-3 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {status === "sending" ? t("sending") : t("send")}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-600">{t("errorGeneral")}</p>
              )}
            </form>
          )}

          {/* Direct emails with copy */}
          <div className="mt-10 text-sm text-muted">
            <p>{t("or")}</p>
            <div className="mt-2 flex flex-col gap-1">
              {["contact@quorexis.fr", "ahmed.ghanmi@quorexis.fr"].map((email) => (
                <button
                  key={email}
                  onClick={() => copyEmail(email)}
                  className="text-left hover:text-foreground transition-colors group inline-flex items-center gap-2"
                  title={`Copy ${email}`}
                >
                  {email}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="opacity-0 group-hover:opacity-60 transition-opacity"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </section>
  );
}
