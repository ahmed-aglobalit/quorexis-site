export interface BlogSection {
  heading: string;
  content: string;
}

export interface BlogArticle {
  slug: string;
  locale: "fr" | "en";
  title: string;
  description: string;
  date: string;
  pdfUrl: string;
  coverUrl: string;
  featured?: boolean;
  sections: BlogSection[];
}
