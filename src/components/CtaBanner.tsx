"use client";

import { Link } from "@/i18n/navigation";
import { useReveal } from "@/hooks/useReveal";

interface CtaBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  href?: string;
}

export default function CtaBanner({
  title,
  subtitle,
  buttonText,
  href = "/contact",
}: CtaBannerProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <section className="reveal bg-foreground/[0.02]" ref={ref}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-20 py-24 md:py-36 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
        <div className="mt-10">
          <Link
            href={href}
            className="inline-block px-8 py-4 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
