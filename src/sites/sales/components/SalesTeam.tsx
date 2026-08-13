"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";

const founders = [
  {
    key: "ahmed",
    photo: "/images/team/ahmed.webp",
    photoClass: "object-cover object-[center_15%] scale-[1.2]",
  },
  {
    key: "samy",
    photo: "/images/team/samy.webp",
    photoClass: "object-cover object-top",
  },
];

export default function SalesTeam() {
  const t = useTranslations("team");
  const ref = useReveal<HTMLElement>();

  return (
    <section id="team" className="scroll-mt-20 bg-foreground/[0.02] reveal" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 text-muted text-lg max-w-2xl">
          {t("subtitle")}
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          {founders.map((founder) => (
            <div
              key={founder.key}
              className="border border-border rounded-lg overflow-hidden bg-background transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-foreground/[0.03]">
                <Image
                  src={founder.photo}
                  alt={t(`${founder.key}.name`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={founder.photoClass}
                />
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-lg font-semibold">{t(`${founder.key}.name`)}</h3>
                <p className="text-sm text-accent font-medium">{t(`${founder.key}.role`)}</p>
                <p className="text-sm text-muted">{t(`${founder.key}.focus`)}</p>
                <p className="text-xs text-muted pt-2">{t("location")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
