import { ARTICLES } from "./articles";

// Every card on the blog is a published article with its own page.
// Planned pieces are tracked in LAUNCH-CHECKLIST.md, not shown as empty cards.
export const POSTS = ARTICLES.map((a) => ({
  icon: a.icon,
  tag: a.tag,
  read: a.read,
  title: a.title,
  excerpt: a.excerpt,
  cover: a.cover,
  coverAlt: a.coverAlt,
  coverTall: a.coverTall,
  url: `/blog/${a.slug}`,
  internal: true
}));
