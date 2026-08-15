"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

type NextStepCTAProps = {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  text?: string;
  ctaText: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  secondaryCtaOnClick?: () => void;
  variant?: "light" | "dark";
};

export default function NextStepCTA({
  eyebrow = "NEXT STEP",
  headline,
  subheadline,
  text,
  ctaText,
  ctaHref,
  ctaOnClick,
  secondaryCtaText,
  secondaryCtaHref,
  secondaryCtaOnClick,
  variant = "light",
}: NextStepCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isDark = variant === "dark";

  return (
    <section
      ref={ref}
      className={`py-24 md:py-32 ${isDark ? "bg-foreground text-background" : "bg-foreground/[0.02]"}`}
    >
      <div className="mx-auto max-w-[900px] px-6 md:px-12 text-center">
        <motion.p
          className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isDark ? "text-accent" : "text-accent"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {eyebrow}
        </motion.p>

        <motion.h2
          className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {headline}
        </motion.h2>

        {subheadline && (
          <motion.h3
            className={`mt-2 text-3xl md:text-4xl font-semibold tracking-tight leading-tight ${isDark ? "text-background/50" : "text-muted"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {subheadline}
          </motion.h3>
        )}

        {text && (
          <motion.p
            className={`mt-6 text-lg max-w-2xl mx-auto ${isDark ? "text-background/70" : "text-muted"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {ctaHref ? (
            <Link
              href={ctaHref}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-200"
            >
              {ctaText}
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <button
              type="button"
              onClick={ctaOnClick}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-200"
            >
              {ctaText}
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {secondaryCtaText && (secondaryCtaHref || secondaryCtaOnClick) && (
            secondaryCtaHref ? (
              <Link
                href={secondaryCtaHref}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-all duration-200 ${
                  isDark
                    ? "bg-background/10 text-background hover:bg-background/20"
                    : "bg-foreground/5 text-foreground hover:bg-foreground/10"
                }`}
              >
                {secondaryCtaText}
              </Link>
            ) : (
              <button
                type="button"
                onClick={secondaryCtaOnClick}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-all duration-200 ${
                  isDark
                    ? "bg-background/10 text-background hover:bg-background/20"
                    : "bg-foreground/5 text-foreground hover:bg-foreground/10"
                }`}
              >
                {secondaryCtaText}
              </button>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
