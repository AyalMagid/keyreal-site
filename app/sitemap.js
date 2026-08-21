import { ARTICLES } from "../lib/articles";

// /legal is intentionally absent: it carries robots noindex.
const ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/plans", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" }
];

export default function sitemap() {
  const now = new Date();
  return [
    ...ROUTES.map((r) => ({
      url: `https://www.keyreal.co.il${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority
    })),
    ...ARTICLES.map((a) => ({
      url: `https://www.keyreal.co.il/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly",
      priority: 0.7
    }))
  ];
}
