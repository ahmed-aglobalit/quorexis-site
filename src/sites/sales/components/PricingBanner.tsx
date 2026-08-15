"use client";

import { motion } from "framer-motion";
import { PRICING_CONFIG } from "../config/pricing";

function scrollToOffers() {
  const el = document.getElementById("offers-preview");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

const OFFERS = [
  {
    key: "starter",
    name: "Starter",
    label: "Tester",
    price: PRICING_CONFIG.starter.monthlyPrice,
    sdr: "SDR partagé",
    highlight: false,
  },
  {
    key: "growth",
    name: "Growth",
    label: "Construire",
    price: PRICING_CONFIG.growth.monthlyPrice,
    sdr: "1 SDR dédié",
    highlight: true,
  },
  {
    key: "scale",
    name: "Scale",
    label: "Industrialiser",
    price: PRICING_CONFIG.scale.monthlyPrice,
    sdr: "2 SDR + Team Lead",
    highlight: false,
  },
];

export default function PricingBanner() {
  return (
    <section className="py-16 md:py-20 bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-background/50 uppercase tracking-wider mb-3">
            3 formules, 1 objectif
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Choisissez votre capacité outbound
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {OFFERS.map((offer, index) => (
            <motion.button
              key={offer.key}
              type="button"
              onClick={scrollToOffers}
              className={`group relative text-left p-6 rounded-xl transition-all duration-300 cursor-pointer
                ${offer.highlight
                  ? "bg-accent text-white ring-2 ring-accent ring-offset-2 ring-offset-foreground"
                  : "bg-background/10 hover:bg-background/15"
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              {offer.highlight && (
                <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-white text-accent text-[10px] font-bold uppercase tracking-wider rounded">
                  Populaire
                </span>
              )}

              {/* Label */}
              <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${offer.highlight ? "text-white/70" : "text-background/50"}`}>
                {offer.label}
              </p>

              {/* Name + Price */}
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-bold">{offer.name}</h3>
                <div className="text-right">
                  <span className="text-xl font-bold">{offer.price.toLocaleString("fr-FR")} €</span>
                  <span className={`text-xs ${offer.highlight ? "text-white/60" : "text-background/40"}`}>/mois</span>
                </div>
              </div>

              {/* SDR capacity */}
              <div className={`flex items-center gap-2 py-2 px-3 rounded-lg ${offer.highlight ? "bg-white/10" : "bg-background/5"}`}>
                <div className="flex -space-x-1">
                  {offer.key === "starter" && (
                    <div className="w-5 h-5 rounded-full bg-background/30 border border-background/20" />
                  )}
                  {offer.key === "growth" && (
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-accent" />
                  )}
                  {offer.key === "scale" && (
                    <>
                      <div className="w-5 h-5 rounded-full bg-background/80 border border-background/40" />
                      <div className="w-5 h-5 rounded-full bg-background/80 border border-background/40" />
                      <div className="w-4 h-4 rounded-full bg-green-400 border border-green-300 mt-0.5" />
                    </>
                  )}
                </div>
                <span className={`text-sm font-medium ${offer.highlight ? "text-white" : "text-background/80"}`}>
                  {offer.sdr}
                </span>
              </div>

              {/* Arrow */}
              <div className={`absolute bottom-4 right-4 transition-transform duration-200 group-hover:translate-x-1 ${offer.highlight ? "text-white/60" : "text-background/30"}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <button
            type="button"
            onClick={scrollToOffers}
            className="inline-flex items-center gap-2 text-sm font-medium text-background/60 hover:text-background transition-colors"
          >
            Comparer en détail
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
