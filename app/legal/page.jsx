import LegalView from "../../components/LegalView";
import { graph, organization, website, breadcrumb, ID, SITE, JsonLd } from "../../lib/seo";

const title = "מידע משפטי | קיריל";
const description =
  "תנאי שימוש, מדיניות פרטיות, מדיניות ביטולים והחזרים והצהרת נגישות של שירות קיריל.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/legal" },
  openGraph: { title, description, url: "/legal", type: "website" },
  // The privacy policy names the operator. Keep the page reachable for users
  // and regulators, out of search results.
  robots: { index: false, follow: true }
};

const page = {
  "@type": "WebPage",
  "@id": `${SITE}/legal#page`,
  url: `${SITE}/legal`,
  name: title,
  description,
  inLanguage: "he-IL",
  isPartOf: { "@id": ID.site },
  about: { "@id": ID.org },
  hasPart: [
    { "@type": "WebPageElement", name: "תנאי שימוש" },
    { "@type": "WebPageElement", name: "מדיניות פרטיות" },
    { "@type": "WebPageElement", name: "מדיניות ביטולים והחזרים" },
    { "@type": "WebPageElement", name: "הצהרת נגישות" }
  ]
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          organization,
          website,
          page,
          breadcrumb([{ name: "בית", path: "/" }, { name: "מידע משפטי", path: "/legal" }])
        )}
      />
      <LegalView />
    </>
  );
}
