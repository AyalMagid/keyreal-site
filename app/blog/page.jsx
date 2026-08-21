import BlogView from "../../components/BlogView";
import { POSTS } from "../../lib/posts";
import { graph, organization, website, breadcrumb, ID, SITE, JsonLd } from "../../lib/seo";

const title = "בלוג | קיריל";
const description =
  "מדריכים על חיפוש דירה בישראל: איך לנסח חיפוש שמביא תוצאות, מדריך שכונות תל אביב, מה לבדוק בחוזה שכירות וכמה באמת עולה לעבור דירה.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, url: "/blog", type: "website" }
};

const blog = {
  "@type": "Blog",
  "@id": `${SITE}/blog#blog`,
  name: "הבלוג של קיריל",
  description,
  url: `${SITE}/blog`,
  inLanguage: "he-IL",
  publisher: { "@id": ID.org },
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    abstract: p.excerpt,
    articleSection: p.tag,
    url: p.url,
    inLanguage: "he-IL",
    author: { "@id": ID.org },
    publisher: { "@id": ID.org }
  }))
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          organization,
          website,
          blog,
          breadcrumb([{ name: "בית", path: "/" }, { name: "בלוג", path: "/blog" }])
        )}
      />
      <BlogView />
    </>
  );
}
