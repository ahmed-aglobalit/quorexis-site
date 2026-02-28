export interface RndMeta {
  slug: string;
  i18nKey: string;
}

export const rndPages: RndMeta[] = [
  { slug: "labs", i18nKey: "labs" },
  { slug: "accelerators", i18nKey: "accelerators" },
  { slug: "playbooks", i18nKey: "playbooks" },
];

export function getRndBySlug(slug: string): RndMeta | undefined {
  return rndPages.find((p) => p.slug === slug);
}
