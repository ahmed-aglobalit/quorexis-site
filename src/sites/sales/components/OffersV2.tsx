"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

const OFFERS = [
  {
    key: "pilot",
    lanes: 1,
    highlight: false,
  },
  {
    key: "growth",
    lanes: 3,
    highlight: true,
  },
  {
    key: "scale",
    lanes: 5,
    highlight: false,
  },
];

export default function OffersV2() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("offers");

  return (
    <section className="py-24 md:py-36 bg-foreground/[0.02]" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Choisissez votre modèle</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* Offers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.key}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                offer.highlight
                  ? "bg-foreground text-background border-2 border-accent scale-[1.02] shadow-xl shadow-accent/10"
                  : "bg-background border border-border hover:border-accent/30 hover:shadow-lg"
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              {offer.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                  Le plus populaire
                </div>
              )}

              {/* Visual lanes */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: offer.lanes }).map((_, j) => (
                  <motion.div
                    key={j}
                    className={`w-2 h-16 rounded-full ${
                      offer.highlight ? "bg-accent" : "bg-accent/20"
                    }`}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 + j * 0.05 }}
                  />
                ))}
              </div>

              <div className="text-center">
                <h3 className={`text-2xl font-semibold ${offer.highlight ? "text-background" : ""}`}>
                  {t(`${offer.key}.name`)}
                </h3>
                <p className={`mt-2 text-sm ${offer.highlight ? "text-background/70" : "text-muted"}`}>
                  {t(`${offer.key}.tagline`)}
                </p>
              </div>

              <div className={`mt-6 pt-6 border-t ${offer.highlight ? "border-background/20" : "border-border"}`}>
                <p className={`text-sm leading-relaxed ${offer.highlight ? "text-background/80" : "text-muted"}`}>
                  {t(`${offer.key}.description`)}
                </p>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    offer.highlight
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border"
                  }`}
                >
                  En savoir plus
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="mt-12 text-center text-sm text-muted"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Tous les plans incluent une équipe dédiée, infrastructure data, prospection multicanale et reporting.
        </motion.p>
      </div>
    </section>
  );
}
