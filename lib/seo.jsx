// One entity graph for the whole site. Every page's JSON-LD references these
// @ids instead of re-declaring the brand, so AI engines resolve one entity
// rather than five look-alikes.

export const SITE = "https://www.keyreal.co.il";

export const ID = {
  org: `${SITE}/#organization`,
  site: `${SITE}/#website`,
  app: `${SITE}/#bot`,
  service: `${SITE}/#service`
};

const DESC =
  "קיריל הוא עוזר אישי חכם (AI) בטלגרם שמרכז את כל הדירות הקיימות בשוק. המשתמש כותב בשפה חופשית מה הוא מחפש, וקיריל שולח התראות על מודעות מתאימות תוך דקות מרגע הפרסום. פעיל בתל אביב-יפו, רמת גן וגבעתיים.";

export const organization = {
  "@type": "Organization",
  "@id": ID.org,
  name: "קיריל",
  alternateName: ["Keyreal", "Kiril", "קיריל - לפני כולם"],
  url: SITE,
  logo: { "@type": "ImageObject", url: `${SITE}/assets/logo-sm.png`, width: 512, height: 512 },
  description: DESC,
  // sameAs is the entity-validation signal: it ties this @id to the same brand
  // on platforms the engines already trust.
  sameAs: ["https://t.me/Rent_tlv_bot", "https://www.instagram.com/keyreal.il"],
  email: "support@keyreal.co.il",
  areaServed: [
    { "@type": "City", name: "תל אביב-יפו", sameAs: "https://www.wikidata.org/wiki/Q33935" },
    { "@type": "City", name: "רמת גן", sameAs: "https://www.wikidata.org/wiki/Q207614" },
    { "@type": "City", name: "גבעתיים", sameAs: "https://www.wikidata.org/wiki/Q207480" }
  ],
  knowsAbout: [
    "חיפוש דירות להשכרה",
    "שוק השכירות בתל אביב",
    "התראות על מודעות דירות",
    "סבלט ודירות שותפים",
    "מחירי שכירות לפי שכונה",
    "חוזי שכירות בישראל"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@keyreal.co.il",
    availableLanguage: ["he", "en"]
  }
};

export const website = {
  "@type": "WebSite",
  "@id": ID.site,
  url: SITE,
  name: "קיריל",
  inLanguage: "he-IL",
  publisher: { "@id": ID.org }
};

export const softwareApp = {
  "@type": "SoftwareApplication",
  "@id": ID.app,
  name: "קיריל",
  alternateName: "Keyreal",
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "חיפוש דירות",
  operatingSystem: "Telegram (iOS, Android, Web, Desktop)",
  url: SITE,
  installUrl: "https://t.me/Rent_tlv_bot",
  inLanguage: ["he", "en"],
  description: DESC,
  publisher: { "@id": ID.org },
  featureList: [
    "חיפוש בשפה חופשית ללא טפסים",
    "התראות תוך דקות מרגע פרסום המודעה",
    "סינון לפי עיר, שכונה, רחוב ונקודות עניין",
    "החרגת אזורים ורחובות שלא מתאימים",
    "כל הדירות על מפה חיה אחת",
    "השוואת מחיר לממוצע באזור",
    "תמיכה מלאה בעברית ובאנגלית",
    "ללא הרשמה וללא פרטים מזהים"
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "ILS",
    lowPrice: "0",
    highPrice: "109",
    offerCount: 4
  }
};

/** Strips the **bold** markers the FAQ copy uses for on-page emphasis. */
export const plain = (s) => s.replace(/\*\*/g, "");

/** FAQPage node. Answers stay in the 40-60 word band engines extract best. */
export const faqPage = (url, items) => ({
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  isPartOf: { "@id": ID.site },
  mainEntity: items.map((it) => ({
    "@type": "Question",
    name: plain(it.q),
    acceptedAnswer: { "@type": "Answer", text: plain(it.a) }
  }))
});

export const breadcrumb = (trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: `${SITE}${t.path}`
  }))
});

/** Wraps nodes in a single @graph — one script tag per page, one entity web. */
export const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes });

export const JsonLd = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
