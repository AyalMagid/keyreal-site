import { notFound } from "next/navigation";
import CityView from "../../../components/CityView";
import { publishedCities, cityBySlug, cityFaq } from "../../../lib/cities";
import { graph, organization, website, softwareApp, faqPage, breadcrumb, ID, SITE, JsonLd } from "../../../lib/seo";

export function generateStaticParams() {
  return publishedCities().map((x) => ({ city: x.slug }));
}

export function generateMetadata({ params }) {
  const city = cityBySlug(params.city);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `/apartments/${city.slug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `/apartments/${city.slug}`,
      type: "website"
    }
  };
}

export default function Page({ params }) {
  const city = cityBySlug(params.city);
  if (!city) notFound();

  const url = `${SITE}/apartments/${city.slug}`;

  // A WebPage about a City, not an article: this page answers "what does renting
  // here cost", so the primary entity is the place and the service that covers it.
  const page = {
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name: city.metaTitle,
    description: city.metaDescription,
    inLanguage: "he-IL",
    isPartOf: { "@id": ID.site },
    datePublished: city.date,
    dateModified: city.date,
    about: { "@type": "City", name: city.name, sameAs: city.wikidata },
    mainEntity: { "@id": ID.app },
    publisher: { "@id": ID.org },
    significantLink: [`${SITE}/plans`, `${SITE}/blog`]
  };

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: `חיפוש דירות להשכרה ב${city.name}`,
    serviceType: "התראות על דירות להשכרה",
    provider: { "@id": ID.org },
    areaServed: { "@type": "City", name: city.name, sameAs: city.wikidata },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://t.me/Rent_tlv_bot",
      name: "Telegram"
    }
  };

  return (
    <>
      <JsonLd
        data={graph(
          organization,
          website,
          softwareApp,
          page,
          service,
          faqPage(url, cityFaq(city)),
          breadcrumb([
            { name: "בית", path: "/" },
            { name: city.name, path: `/apartments/${city.slug}` }
          ])
        )}
      />
      <CityView city={city} />
    </>
  );
}
