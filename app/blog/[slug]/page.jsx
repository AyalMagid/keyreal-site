import { notFound } from "next/navigation";
import ArticleView from "../../../components/ArticleView";
import { ARTICLES, bySlug, articleFaq } from "../../../lib/articles";
import { graph, organization, website, faqPage, breadcrumb, ID, SITE, JsonLd } from "../../../lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const a = bySlug(params.slug);
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      title: a.metaTitle,
      description: a.metaDescription,
      url: `/blog/${a.slug}`,
      type: "article",
      publishedTime: a.date,
      images: a.cover ? [{ url: a.cover, width: 1200, height: 630, alt: a.coverAlt }] : undefined
    }
  };
}

export default function Page({ params }) {
  const a = bySlug(params.slug);
  if (!a) notFound();

  const url = `${SITE}/blog/${a.slug}`;
  const posting = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: a.title,
    alternativeHeadline: a.metaTitle,
    description: a.metaDescription,
    abstract: a.excerpt,
    articleSection: a.tag,
    url,
    mainEntityOfPage: url,
    inLanguage: "he-IL",
    datePublished: a.date,
    dateModified: a.date,
    image: a.cover ? `${SITE}${a.cover}` : undefined,
    author: { "@id": ID.org },
    publisher: { "@id": ID.org },
    isPartOf: { "@id": `${SITE}/blog#blog` },
    about: [
      { "@type": "Thing", name: "שוק השכירות בתל אביב" },
      { "@type": "Thing", name: "חיפוש דירות בפייסבוק" }
    ],
    spatialCoverage: { "@type": "City", name: "תל אביב-יפו", sameAs: "https://www.wikidata.org/wiki/Q33935" }
  };

  return (
    <>
      <JsonLd
        data={graph(
          organization,
          website,
          posting,
          faqPage(url, articleFaq(a)),
          breadcrumb([
            { name: "בית", path: "/" },
            { name: "בלוג", path: "/blog" },
            { name: a.title, path: `/blog/${a.slug}` }
          ])
        )}
      />
      <ArticleView article={a} />
    </>
  );
}
