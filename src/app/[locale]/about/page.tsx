import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SITE_MODE } from "@/config/site";

const founders = [
  {
    key: "ahmed",
    image: "/images/team/ahmed.webp",
    linkedin: "https://www.linkedin.com/in/ahmed-ghanmi-b4b05a99/",
  },
  {
    key: "samy",
    image: "/images/team/samy.webp",
    linkedin: "https://www.linkedin.com/in/samy-ghanmi/",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (SITE_MODE !== "sales") return {};
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: `${t("title")} — Quorexis`,
    description: t("subtitle"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (SITE_MODE !== "sales") notFound();
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const navT = await getTranslations({ locale, namespace: "nav" });

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

      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {t("story.title")}
            </h2>
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {t("founders.title")}
          </h2>
          <p className="mt-4 text-muted max-w-2xl">
            {t("founders.subtitle")}
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            {founders.map((founder) => (
              <div
                key={founder.key}
                className="group border border-border rounded-lg p-6 text-center hover:border-accent/30 transition-colors"
              >
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-foreground/5">
                  <Image
                    src={founder.image}
                    alt={t(`founders.${founder.key}.name`)}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  {t(`founders.${founder.key}.name`)}
                </h3>
                <p className="text-sm text-accent">
                  {t(`founders.${founder.key}.role`)}
                </p>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {t(`founders.${founder.key}.bio`)}
                </p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {locale === "fr" ? "Construisons ensemble votre pipeline" : "Let's build your pipeline together"}
          </h2>
          <p className="mt-4 text-background/70 text-lg max-w-2xl mx-auto">
            {locale === "fr"
              ? "Décrivez-nous votre contexte. Nous vous montrerons comment nous pouvons vous aider."
              : "Tell us about your context. We'll show you how we can help."}
          </p>
          <div className="mt-10">
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-foreground text-sm font-semibold rounded-md hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {navT("contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
