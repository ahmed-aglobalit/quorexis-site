"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";

interface ClientLogo {
  name: string;
  display: string;
  /** Tailwind classes for premium typographic identity */
  style: string;
}

const clients: ClientLogo[] = [
  {
    name: "Louis Vuitton",
    display: "LV",
    style: "text-2xl font-light tracking-[0.35em] uppercase",
  },
  {
    name: "Galeries Lafayette",
    display: "Galeries Lafayette",
    style: "text-sm font-semibold tracking-[0.2em] uppercase",
  },
  {
    name: "Renault",
    display: "Renault",
    style: "text-lg font-bold tracking-wide uppercase",
  },
  {
    name: "Sagemcom",
    display: "Sagemcom",
    style: "text-lg font-medium tracking-widest uppercase",
  },
  {
    name: "Michelin",
    display: "Michelin",
    style: "text-lg font-bold tracking-wide uppercase italic",
  },
];

export default function Clients() {
  const t = useTranslations("clients");
  const ref = useReveal<HTMLElement>();

  /* Double the list for seamless infinite loop */
  const track = [...clients, ...clients];

  return (
    <section
      id="clients"
      className="scroll-mt-20 bg-foreground/[0.02] reveal"
      ref={ref}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 text-muted text-lg max-w-2xl">
          {t("subtitle")}
        </p>

        {/* ── Cylinder carousel ── */}
        <div
          className="client-cylinder group mt-14"
          role="marquee"
          aria-label={t("title")}
        >
          {/* 3D perspective wrapper */}
          <div className="client-cylinder-perspective">
            {/* Gradient edge masks */}
            <div className="client-cylinder-mask-left" aria-hidden="true" />
            <div className="client-cylinder-mask-right" aria-hidden="true" />

            {/* Center highlight */}
            <div className="client-cylinder-highlight" aria-hidden="true" />

            {/* Scrolling track */}
            <div className="client-cylinder-track">
              {track.map((client, i) => (
                <div
                  key={`${client.name}-${i}`}
                  className="client-cylinder-item"
                  aria-label={client.name}
                >
                  <span className={client.style}>{client.display}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Static grid fallback for reduced-motion ── */}
        <div
          className="client-static-grid mt-14"
          role="list"
          aria-label={t("title")}
        >
          {clients.map((client) => (
            <div
              key={client.name}
              className="border border-border rounded-lg p-6 md:p-8 flex items-center justify-center text-center"
              role="listitem"
            >
              <span
                className={`${client.style} text-foreground/70`}
                aria-label={client.name}
              >
                {client.display}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted italic max-w-xl">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
