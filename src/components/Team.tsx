"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import Toast from "./Toast";

const members = [
  {
    name: "Ahmed Ghanmi",
    role: "Co-Founder & CEO",
    email: "ahmed.ghanmi@quorexis.fr",
    photo: "/images/team/ahmed.webp",
    photoClass: "object-cover object-[center_15%] scale-[1.2]",
  },
  {
    name: "Samy Mejri",
    role: "Co-Founder, Sales Director & Business Development",
    email: "samy.mejri@quorexis.fr",
    photo: "/images/team/samy.webp",
    photoClass: "object-cover object-top",
  },
  {
    name: "Maryem",
    role: "QA Consultant & Trainer — ISTQB® Certified",
    email: "",
    photo: "/images/team/maryem.webp",
    photoClass: "object-cover object-[center_20%] scale-[1.1]",
  },
];

export default function Team() {
  const t = useTranslations("team");
  const ref = useReveal<HTMLElement>();
  const [toast, setToast] = useState<string | null>(null);

  async function copyEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email);
      setToast(t("copied"));
    } catch {
      // fallback: do nothing
    }
  }

  return (
    <section id="team" className="scroll-mt-20 reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 text-muted text-lg max-w-2xl">
          {t("subtitle")}
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.name}
              className="border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden bg-foreground/[0.03]">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={member.photoClass}
                />
              </div>

              {/* Info */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted">{member.role}</p>
                  <p className="text-xs text-muted mt-1">Quorexis</p>
                </div>

                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  {t("partner")}
                </p>

                <div className="flex flex-col gap-1.5 text-sm">
                  {/* Email — click to copy */}
                  {member.email && (
                  <button
                    onClick={() => copyEmail(member.email)}
                    className="text-left text-muted hover:text-foreground transition-colors group inline-flex items-center gap-2"
                    aria-label={`Copy ${member.email}`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="shrink-0"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13 2 4" />
                    </svg>
                    {member.email}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="opacity-0 group-hover:opacity-60 transition-opacity shrink-0"
                      aria-hidden="true"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  </button>
                  )}

                  {/* Website */}
                  <a
                    href="https://www.quorexis.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-foreground transition-colors inline-flex items-center gap-2"
                    aria-label={t("website")}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="shrink-0"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                    {t("website")}
                  </a>

                  {/* Location */}
                  <span className="text-muted inline-flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    {t("location")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </section>
  );
}
