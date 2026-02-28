import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { rndPages, getRndBySlug } from "@/config/rnd";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return rndPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = getRndBySlug(slug);
  if (!page) return {};
  const t = await getTranslations({ locale, namespace: "rnd" });
  return {
    title: t(`${page.i18nKey}.seoTitle`),
    description: t(`${page.i18nKey}.seoDescription`),
  };
}

export default async function RndDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = getRndBySlug(slug);
  if (!page) notFound();
  const t = await getTranslations({ locale, namespace: "rnd" });
  const tc = await getTranslations({ locale, namespace: "rnd.common" });

  const rawScope = t.raw(`${page.i18nKey}.scope`) as string[];
  const scope = Array.isArray(rawScope) ? rawScope : [];
  const rawBenefits = t.raw(`${page.i18nKey}.benefits`) as string[];
  const benefits = Array.isArray(rawBenefits) ? rawBenefits : [];

  return (
    <>
      <section className="pt-32 md:pt-40 pb-24 md:pb-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <Link
            href="/rnd"
            className="inline-block text-sm font-medium text-accent tracking-wide hover:text-foreground transition-colors"
          >
            ← {tc("backToRnd")}
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] break-words">
            {t(`${page.i18nKey}.title`)}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed break-words">
            {t(`${page.i18nKey}.subtitle`)}
          </p>
        </div>
      </section>

      {scope.length > 0 && (
        <section className="bg-foreground/[0.02]">
          <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {tc("scopeTitle")}
            </h2>
            <ul className="mt-10 space-y-3 max-w-2xl">
              {scope.map((item, i) => (
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
        </section>
      )}

      {benefits.length > 0 && (
        <section>
          <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {tc("benefitsTitle")}
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="border border-border rounded-lg p-5 flex items-start gap-3"
                >
                  <span className="text-accent shrink-0 mt-0.5 font-medium">
                    &#8212;
                  </span>
                  <span className="text-sm text-foreground/80 leading-relaxed break-words min-w-0">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {tc("ctaTitle")}
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            {tc("ctaSubtitle")}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
            >
              {tc("ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
