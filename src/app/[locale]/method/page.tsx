import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SITE_MODE } from "@/config/site";
import { First30Days, NextStepCTA } from "@/sites/sales/components";

const steps = [
  { key: "discover", phase: "discover" },
  { key: "define", phase: "discover" },
  { key: "build", phase: "build" },
  { key: "launch", phase: "launch" },
  { key: "engage", phase: "engage" },
  { key: "qualify", phase: "qualify" },
  { key: "book", phase: "deliver" },
  { key: "optimize", phase: "optimize" },
];

const phaseColors: Record<string, string> = {
  discover: "bg-blue-500/10 text-blue-600",
  build: "bg-purple-500/10 text-purple-600",
  launch: "bg-green-500/10 text-green-600",
  engage: "bg-orange-500/10 text-orange-600",
  qualify: "bg-pink-500/10 text-pink-600",
  deliver: "bg-teal-500/10 text-teal-600",
  optimize: "bg-indigo-500/10 text-indigo-600",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (SITE_MODE !== "sales") return {};
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "method" });
  return {
    title: `${t("title")} — Quorexis`,
    description: t("title"),
  };
}

export default async function MethodPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (SITE_MODE !== "sales") notFound();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "method" });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            THE QUOREXIS METHOD
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            {locale === "fr" ? "Une méthode structurée." : "A Structured Method."}
            <br />
            <span className="text-muted">
              {locale === "fr" ? "Pas une campagne improvisée." : "Not an improvised campaign."}
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {locale === "fr"
              ? "De votre marché cible au premier rendez-vous qualifié, chaque étape de votre outbound est construite, opérée et mesurée."
              : "From your target market to the first qualified meeting, every step of your outbound is built, operated and measured."}
          </p>
        </div>
      </section>

      {/* 8 Steps */}
      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-12">
            {locale === "fr" ? "Les 8 étapes de notre méthode" : "The 8 Steps of Our Method"}
          </h2>

          <div className="relative">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-10">
              {steps.map((step) => (
                <div key={step.key} className="relative pl-12 md:pl-16">
                  <div className="absolute left-0 top-0 w-8 md:w-12 h-8 md:h-12 rounded-full bg-background border-2 border-accent flex items-center justify-center text-xs md:text-sm font-semibold text-accent">
                    {t(`steps.${step.key}.number`)}
                  </div>

                  <div className="pt-1">
                    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${phaseColors[step.phase]}`}>
                      {t(`steps.${step.key}.title`)}
                    </span>
                    <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight">
                      {t(`steps.${step.key}.title`)}
                    </h3>
                    <p className="mt-3 text-muted leading-relaxed max-w-2xl">
                      {t(`steps.${step.key}.description`)}
                    </p>
                    <p className="mt-2 text-sm text-accent">
                      → {t(`steps.${step.key}.deliverable`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* First 4 Weeks - Featured Section */}
      <div id="first-month" className="scroll-mt-24">
        <First30Days />
      </div>

      {/* Next Step: Offers */}
      <NextStepCTA
        eyebrow={locale === "fr" ? "ÉTAPE SUIVANTE" : "NEXT STEP"}
        headline={locale === "fr" ? "Vous connaissez la méthode." : "You know the method."}
        subheadline={locale === "fr" ? "Choisissez maintenant la puissance de votre moteur outbound." : "Now choose the power of your outbound engine."}
        text={locale === "fr"
          ? "Du premier test de marché à une véritable équipe SDR structurée, choisissez la capacité correspondant à votre ambition commerciale."
          : "From the first market test to a true structured SDR team, choose the capacity that matches your commercial ambition."}
        ctaText={locale === "fr" ? "Découvrir nos offres" : "Discover our offers"}
        ctaHref="/offres"
      />
    </>
  );
}
