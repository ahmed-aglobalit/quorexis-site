import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { SITE_MODE } from "@/config/site";

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
  const navT = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <section className="pt-32 md:pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {locale === "fr"
              ? "De la stratégie initiale à l'optimisation continue."
              : "From initial strategy to continuous optimization."}
          </p>
        </div>
      </section>

      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <div className="relative">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
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

      <section>
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {locale === "fr" ? "Prêt à structurer votre outbound ?" : "Ready to structure your outbound?"}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            {locale === "fr"
              ? "Décrivez-nous votre contexte. Nous vous montrerons exactement où vous en êtes et comment avancer."
              : "Tell us about your context. We'll show you exactly where you are and how to move forward."}
          </p>
          <div className="mt-10">
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 bg-accent text-white text-sm font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {navT("contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
