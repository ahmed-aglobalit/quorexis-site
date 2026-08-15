"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CONTROL_STEPS = [
  { step: "ICP validé", desc: "Vous définissez qui prospecter" },
  { step: "Messaging approuvé", desc: "Vous validez les angles et le ton" },
  { step: "Scripts cadrés", desc: "Les appels suivent votre positionnement" },
  { step: "SDR formé", desc: "Il connaît votre offre et vos valeurs" },
  { step: "Quality control", desc: "Supervision des conversations" },
  { step: "Feedback loop", desc: "Ajustements continus avec vous" },
];

export default function BrandProtection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-foreground text-background" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
              Votre réputation
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              Votre marque reste sous contrôle.
            </h2>
            <p className="text-lg text-background/70 mb-8">
              Nous prospectons sous votre marque comme une extension de votre équipe commerciale.
              Les ICP, messages et approches sont cadrés avant le lancement puis optimisés avec vous.
            </p>
            <p className="text-background/60">
              Vous gardez la main sur ce qui est dit, à qui, et comment. Nous exécutons avec rigueur.
            </p>
          </motion.div>

          {/* Right — Flow */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-3">
              {CONTROL_STEPS.map((item, i) => (
                <motion.div
                  key={item.step}
                  className="flex items-center gap-4 p-4 rounded-lg bg-background/5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + 0.1 * i }}
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-background">{item.step}</p>
                    <p className="text-sm text-background/50">{item.desc}</p>
                  </div>
                  {i < CONTROL_STEPS.length - 1 && (
                    <div className="absolute left-10 ml-4 w-px h-3 bg-background/20" style={{ top: `${(i + 1) * 76 - 6}px` }} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
