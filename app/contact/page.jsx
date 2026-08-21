import ContactView from "../../components/ContactView";
import { graph, organization, website, breadcrumb, ID, SITE, JsonLd } from "../../lib/seo";

const title = "צור קשר | קיריל";
const description =
  "יש שאלה, בעיה או הצעה? צוות קיריל כאן. פנייה בטלגרם, במייל support@keyreal.co.il או דרך הטופס באתר.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", type: "website" }
};

const contactPage = {
  "@type": "ContactPage",
  "@id": `${SITE}/contact#page`,
  url: `${SITE}/contact`,
  name: title,
  description,
  inLanguage: "he-IL",
  isPartOf: { "@id": ID.site },
  about: { "@id": ID.org },
  mainEntity: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@keyreal.co.il",
    url: "https://t.me/Rent_tlv_bot",
    availableLanguage: ["he", "en"]
  }
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          organization,
          website,
          contactPage,
          breadcrumb([{ name: "בית", path: "/" }, { name: "צור קשר", path: "/contact" }])
        )}
      />
      <ContactView />
    </>
  );
}
