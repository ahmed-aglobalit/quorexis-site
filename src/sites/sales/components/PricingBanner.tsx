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

export default function PricingBanner() {
  return (
    <motion.section
      className="py-6 bg-foreground/[0.02] border-y border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <button
          type="button"
          onClick={scrollToOffers}
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 group cursor-pointer"
        >
          {/* Prices */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted uppercase tracking-wider">Starter</span>
              <span className="text-sm font-semibold">{PRICING_CONFIG.starter.monthlyPrice.toLocaleString("fr-FR")} €</span>
            </div>

            <span className="hidden sm:block text-border">·</span>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-accent uppercase tracking-wider">Growth</span>
              <span className="text-sm font-semibold">{PRICING_CONFIG.growth.monthlyPrice.toLocaleString("fr-FR")} €</span>
            </div>

            <span className="hidden sm:block text-border">·</span>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted uppercase tracking-wider">Scale</span>
              <span className="text-sm font-semibold">{PRICING_CONFIG.scale.monthlyPrice.toLocaleString("fr-FR")} €</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-accent group-hover:underline transition-all">
            <span>Voir les formules</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>
      </div>
    </motion.section>
  );
}
