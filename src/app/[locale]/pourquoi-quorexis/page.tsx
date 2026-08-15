import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SITE_MODE } from "@/config/site";
import {
  WhatSdrDoes,
  BrandProtection,
  WhatIfItFails,
  FitNotFit,
  SalesTeam,
  NextStepCTA,
} from "@/sites/sales/components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (SITE_MODE !== "sales") return {};
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Pourquoi Quorexis — Quorexis" : "Why Quorexis — Quorexis",
    description: locale === "fr"
      ? "Découvrez pourquoi confier votre prospection à Quorexis : méthode structurée, SDR formés, qualité contrôlée, marque protégée."
      : "Discover why you should trust Quorexis with your prospecting: structured method, trained SDRs, quality controlled, brand protected.",
  };
}

function openAssistant() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("quorexis:open-assistant", { detail: { mode: "ai" } }));
  }
}

export default async function WhyQuorexisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (SITE_MODE !== "sales") notFound();
  const { locale } = await params;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            {locale === "fr" ? "POURQUOI QUOREXIS" : "WHY QUOREXIS"}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            {locale === "fr" ? "La capacité est une chose." : "Capacity is one thing."}
            <br />
            <span className="text-muted">
              {locale === "fr" ? "La manière de l'opérer en est une autre." : "How it's operated is another."}
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {locale === "fr"
              ? "Découvrez comment Quorexis protège votre marque, forme ses SDR, contrôle la qualité et optimise une campagne lorsque le marché ne répond pas comme prévu."
              : "Discover how Quorexis protects your brand, trains its SDRs, controls quality and optimizes a campaign when the market doesn't respond as expected."}
          </p>
        </div>
      </section>

      {/* Not a Call Center */}
      <section className="py-20 md:py-28 bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
              {locale === "fr" ? "PAS UN CALL CENTER" : "NOT A CALL CENTER"}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              {locale === "fr"
                ? "Une équipe revenue outbound, pas un plateau d'appels."
                : "An outbound revenue team, not a call center floor."}
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                {locale === "fr"
                  ? "Un call center optimise le volume d'appels avec des scripts standards. Quorexis construit une machine de prospection complète."
                  : "A call center optimizes call volume with standard scripts. Quorexis builds a complete prospecting machine."}
              </p>
              <p>
                {locale === "fr"
                  ? "Data, ciblage ICP, multicanal, SDR formés au B2B, qualification business et mesure du pipeline généré — pas seulement du nombre d'appels."
                  : "Data, ICP targeting, multichannel, B2B-trained SDRs, business qualification and pipeline measurement — not just call counts."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What SDR Does */}
      <WhatSdrDoes />

      {/* Brand Protection */}
      <BrandProtection />

      {/* What If It Fails */}
      <WhatIfItFails />

      {/* Fit / Not Fit */}
      <FitNotFit />

      {/* Founders */}
      <SalesTeam />

      {/* Final CTA */}
      <NextStepCTA
        variant="dark"
        eyebrow={locale === "fr" ? "VOTRE PROCHAINE ÉTAPE" : "YOUR NEXT STEP"}
        headline={locale === "fr" ? "Vous avez les réponses." : "You have the answers."}
        subheadline={locale === "fr" ? "Parlons de votre marché." : "Let's talk about your market."}
        text={locale === "fr"
          ? "En 30 minutes, nous analysons votre cible, votre panier moyen et vos objectifs pour déterminer si une campagne Quorexis a du sens pour votre entreprise."
          : "In 30 minutes, we analyze your target, your average deal size and your objectives to determine if a Quorexis campaign makes sense for your company."}
        ctaText={locale === "fr" ? "Parler de mon marché" : "Talk about my market"}
        ctaOnClick={openAssistant}
      />
    </>
  );
}
