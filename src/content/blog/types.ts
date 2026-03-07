export interface BlogArticle {
  slug: string;
  locale: "fr" | "en";
  title: string;
  description: string;
  date: string;
  pdfUrl: string;
  coverUrl: string;
  featured?: boolean;
}
