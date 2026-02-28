import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const industries = ["fintech", "telecom", "iot", "travel", "healthcare"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });

  return (
    <>
      <section className="pt-32 md:pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {industries.map((industry, idx) => {
        const rawChallenges = t.raw(`${industry}.challenges`) as string[];
        const challenges = Array.isArray(rawChallenges) ? rawChallenges : [];
        const rawFocus = t.raw(`${industry}.focus`) as string[];
        const focus = Array.isArray(rawFocus) ? rawFocus : [];

        return (
          <section
            key={industry}
            id={industry}
            className={`scroll-mt-20 ${idx % 2 === 0 ? "bg-foreground/[0.02]" : ""}`}
          >
            <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight break-words">
                {t(`${industry}.title`)}
              </h2>
              <p className="mt-4 text-muted text-lg max-w-2xl leading-relaxed break-words">
                {t(`${industry}.description`)}
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {challenges.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted/60 mb-4">
                      Challenges
                    </h3>
                    <ul className="space-y-3">
                      {challenges.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"
                        >
                          <span className="text-accent shrink-0 mt-0.5 font-medium">
                            &#8212;
                          </span>
                          <span className="break-words min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {focus.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted/60 mb-4">
                      Testing focus
                    </h3>
                    <ul className="space-y-3">
                      {focus.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed"
                        >
                          <span className="text-accent shrink-0 mt-0.5 font-medium">
                            &#8212;
                          </span>
                          <span className="break-words min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            {t("ctaSubtitle")}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
