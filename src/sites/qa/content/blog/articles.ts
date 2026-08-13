import { BlogArticle, BlogSection } from "./types";
import { sections1, sections2, sections3, sections4 } from "./content-1-4";
import { sections5, sections6, sections7, sections8 } from "./content-5-8";
import {
  sections9,
  sections10,
  sections11,
  sections12,
} from "./content-9-12";

const sectionsMap: Record<number, BlogSection[]> = {
  1: sections1,
  2: sections2,
  3: sections3,
  4: sections4,
  5: sections5,
  6: sections6,
  7: sections7,
  8: sections8,
  9: sections9,
  10: sections10,
  11: sections11,
  12: sections12,
};

interface ArticleData {
  id: number;
  fr: { title: string; description: string };
  en: { title: string; description: string };
  date: string;
  coverExt: "jpg" | "png";
  featured?: boolean;
}

const articlesData: ArticleData[] = [
  {
    id: 1,
    fr: {
      title:
        "Nous garantissons que chaque produit logiciel arrive en production avec qualité et stabilité",
      description:
        "Présentation de Quorexis et de notre vision du software testing : garantir la qualité, la stabilité et la confiance avant la mise en production.",
    },
    en: {
      title:
        "We ensure every software product reaches production with quality and stability",
      description:
        "An introduction to Quorexis and our vision of software testing: ensuring quality, stability and confidence before production deployment.",
    },
    date: "2026-03-01",
    coverExt: "jpg",
    featured: true,
  },
  {
    id: 2,
    fr: {
      title: "Les 5 KPI QA que les CTO devraient suivre",
      description:
        "La plupart des équipes mesurent la vitesse de livraison. Très peu mesurent réellement la qualité. Il est temps de changer cela.",
    },
    en: {
      title: "The 5 QA KPIs that CTOs should track",
      description:
        "Most teams measure delivery speed. Very few actually measure quality. It's time to change that.",
    },
    date: "2026-03-02",
    coverExt: "jpg",
  },
  {
    id: 3,
    fr: {
      title:
        "L'IA accélère le développement logiciel. Mais elle accélère aussi les bugs.",
      description:
        "Pourquoi le QA devient plus critique que jamais à l'ère de l'intelligence artificielle.",
    },
    en: {
      title:
        "AI accelerates software development. But it also accelerates bugs.",
      description:
        "Why QA is becoming more critical than ever in the age of artificial intelligence.",
    },
    date: "2026-03-03",
    coverExt: "png",
  },
  {
    id: 4,
    en: {
      title:
        "Why QA Is No Longer a Cost Center — It's a Strategic Engine",
      description:
        "Reliable software requires structure. Quality Assurance is now a strategic lever for business success.",
    },
    fr: {
      title:
        "Pourquoi le QA n'est plus un centre de coût — c'est un moteur stratégique",
      description:
        "Un logiciel fiable nécessite de la structure. Le QA est désormais un levier stratégique pour la réussite business.",
    },
    date: "2026-03-04",
    coverExt: "png",
  },
  {
    id: 5,
    en: {
      title: "Why 57% of Test Automation Projects Flop",
      description:
        "2025 State of QA Report: the real reasons behind test automation failures and how to avoid them.",
    },
    fr: {
      title: "Pourquoi 57% des projets d'automatisation de tests échouent",
      description:
        "Rapport 2025 sur l'état du QA : les vraies raisons derrière les échecs d'automatisation et comment les éviter.",
    },
    date: "2026-03-05",
    coverExt: "jpg",
  },
  {
    id: 6,
    fr: {
      title: "Le coût réel des bugs en production",
      description:
        "Pourquoi chaque problème en production est un tueur silencieux de profits — et ce que cela coûte réellement à votre entreprise.",
    },
    en: {
      title: "The real cost of bugs in production",
      description:
        "Why every production issue is a silent profit killer — and what it really costs your business.",
    },
    date: "2026-03-06",
    coverExt: "png",
  },
  {
    id: 7,
    fr: {
      title: "Pourquoi les startups livrent des bugs en production",
      description:
        "La plupart des startups ne manquent pas de talent. Elles manquent de structure. Voici pourquoi les bugs atteignent la production.",
    },
    en: {
      title: "Why startups ship bugs to production",
      description:
        "Most startups don't lack talent. They lack structure. Here's why bugs reach production.",
    },
    date: "2026-03-07",
    coverExt: "jpg",
  },
  {
    id: 8,
    fr: {
      title: "Les erreurs QA les plus fréquentes dans les startups",
      description:
        "Pourquoi la qualité logicielle fait ou défait les startups — et comment éviter les pièges les plus coûteux.",
    },
    en: {
      title: "The most common QA mistakes in startups",
      description:
        "Why software quality makes or breaks startups — and how to avoid the most costly pitfalls.",
    },
    date: "2026-03-08",
    coverExt: "jpg",
  },
  {
    id: 9,
    fr: {
      title: "CI/CD sans quality gates : livrer des bugs plus vite",
      description:
        "L'automatisation du déploiement est une révolution — mais sans filets de sécurité, le CI/CD peut transformer chaque push en risque production.",
    },
    en: {
      title: "CI/CD without quality gates: shipping bugs faster",
      description:
        "Deployment automation is a revolution — but without safety nets, CI/CD can turn every push into a production risk.",
    },
    date: "2026-03-09",
    coverExt: "png",
  },
  {
    id: 10,
    en: {
      title: "Testing vs. Quality Engineering",
      description:
        "Why 'just testing' is no longer enough in 2026 — and what forward-thinking engineering teams are doing instead.",
    },
    fr: {
      title: "Testing vs. Quality Engineering",
      description:
        "Pourquoi 'juste tester' ne suffit plus en 2026 — et ce que font les équipes d'ingénierie les plus avancées.",
    },
    date: "2026-03-10",
    coverExt: "jpg",
  },
  {
    id: 11,
    en: {
      title: "Build a Bullet-Proof Test Strategy",
      description:
        "A step-by-step framework to transform chaotic, defect-prone releases into disciplined, high-confidence software delivery.",
    },
    fr: {
      title: "Construire une stratégie de test blindée",
      description:
        "Un framework étape par étape pour transformer des releases chaotiques en delivery logiciel discipliné et fiable.",
    },
    date: "2026-03-11",
    coverExt: "jpg",
  },
  {
    id: 12,
    en: {
      title: "Why Quality Must Be Built Into CI/CD",
      description:
        "Transform speed into reliability — the new competitive edge in software delivery.",
    },
    fr: {
      title: "Pourquoi la qualité doit être intégrée au CI/CD",
      description:
        "Transformer la vitesse en fiabilité — le nouvel avantage compétitif en delivery logiciel.",
    },
    date: "2026-03-12",
    coverExt: "jpg",
  },
];

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export function getArticles(locale: "fr" | "en"): BlogArticle[] {
  return articlesData.map((a) => {
    const slug = toSlug(a.fr.title);
    return {
      slug,
      locale,
      title: a[locale].title,
      description: a[locale].description,
      date: a.date,
      pdfUrl: `/blog/posts/${slug}.pdf`,
      coverUrl: `/blog/covers/${a.id}.${a.coverExt}`,
      featured: a.featured,
      sections: sectionsMap[a.id] ?? [],
    };
  });
}

export function getArticle(
  slug: string,
  locale: "fr" | "en"
): BlogArticle | undefined {
  return getArticles(locale).find((a) => a.slug === slug);
}

export function getAllSlugs(): { slug: string; locale: "fr" | "en" }[] {
  const result: { slug: string; locale: "fr" | "en" }[] = [];
  for (const a of articlesData) {
    const slug = toSlug(a.fr.title);
    result.push({ slug, locale: "fr" });
    result.push({ slug, locale: "en" });
  }
  return result;
}
