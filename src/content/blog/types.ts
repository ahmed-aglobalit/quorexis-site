export interface BlogSection {
  heading: string;
  content: string;
}

export interface BlogArticle {
  slug: string;
  locale: "fr" | "en";
  title: string;
  date: string;
  intro: string;
  sections: BlogSection[];
  conclusion: string;
}
