import { notFound } from "next/navigation";
import { SITE_MODE } from "@/config/site";
import { PricingSection, BudgetCalculator, SalesFaq } from "@/sites/sales/components";

export async function generateMetadata() {
  if (SITE_MODE !== "sales") return {};
  return {
    title: "Tarifs — Quorexis",
    description: "Découvrez nos offres Starter, Growth et Scale pour externaliser votre prospection B2B.",
  };
}

export default function PricingPage() {
  if (SITE_MODE !== "sales") notFound();

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
            Tarifs
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            Des offres claires.<br />
            <span className="text-muted">Des résultats mesurables.</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            Pas de frais cachés, pas d&apos;engagement long terme.
            Choisissez le niveau qui correspond à vos ambitions.
          </p>
        </div>
      </section>

      <PricingSection />
      <BudgetCalculator />
      <SalesFaq />
    </>
  );
}
