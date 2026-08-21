import PlansView from "../../components/PlansView";
import { graph, organization, website, faqPage, breadcrumb, ID, SITE, JsonLd } from "../../lib/seo";

const title = "חבילות ומחירים | קיריל";
const description =
  "חבילות קיריל: שבוע ₪39, חודש ₪69, חודשיים ₪109. תשלום חד-פעמי בלי חיוב חוזר, 4 ימי ניסיון חינם, ובלי הרשמה או פרטים מזהים.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/plans" },
  openGraph: { title, description, url: "/plans", type: "website" }
};

const OFFERS = [
  { name: "שבוע", price: "39", days: 7 },
  { name: "חודש", price: "69", days: 30 },
  { name: "2 חודשים", price: "109", days: 60 }
];

// Written as standalone 40-60 word answers: this is the text an assistant
// lifts when someone asks what Keyreal costs.
const PLAN_FAQ = [
  {
    q: "כמה עולה קיריל?",
    a: "קיריל מציע 4 ימי ניסיון חינם עם גישה מלאה לכל היכולות. אחרי הניסיון יש שלוש חבילות בתשלום חד-פעמי: שבוע ב-39 ש\"ח, חודש ב-69 ש\"ח וחודשיים ב-109 ש\"ח. אין חיוב חוזר ואין התחייבות, והחבילה פשוט נגמרת בסוף התקופה."
  },
  {
    q: "מה כלול בכל חבילה?",
    a: "כל החבילות כוללות בדיוק את אותן יכולות, וההבדל ביניהן הוא משך התקופה בלבד: חיפוש אישי ומיידי, התראות תוך דקות, כל הדירות על מפה חיה, השוואת מחירים באזור, סינון לפי ערים, שכונות, רחובות ונקודות עניין, ותמיכה בעברית ובאנגלית."
  },
  {
    q: "מה קורה אם לא מוצאים דירה?",
    a: "מי שרכש תקופות שירות בתשלום בהיקף מצטבר של 60 ימים לפחות ועדיין לא מצא דירה, זכאי לפי בקשתו ל-30 ימי שירות נוספים ללא עלות. ההטבה חלה על תשלומים מ-22.8.2026, ניתנת פעם אחת למשתמש, ויש לפנות בתוך 14 ימים מתום התקופה."
  },
  {
    q: "האם יש חיוב חוזר או התחייבות?",
    a: "אין. כל חבילה היא תשלום חד-פעמי עבור תקופה מוגדרת, ובסוף התקופה השירות נעצר מעצמו בלי שנדרשת פעולה כלשהי. אין מנוי מתחדש, אין קנס יציאה, ואין צורך למסור כרטיס אשראי כדי להתחיל את הניסיון החינמי."
  }
];

const service = {
  "@type": "Service",
  "@id": ID.service,
  name: "קיריל - התראות דירות בטלגרם",
  serviceType: "שירות התראות על מודעות דירות",
  provider: { "@id": ID.org },
  areaServed: ["תל אביב-יפו", "רמת גן", "גבעתיים"],
  url: `${SITE}/plans`,
  offers: [
    {
      "@type": "Offer",
      name: "ניסיון חינם",
      price: "0",
      priceCurrency: "ILS",
      description: "4 ימי ניסיון עם גישה מלאה לכל היכולות",
      availability: "https://schema.org/InStock"
    },
    ...OFFERS.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: "ILS",
      availability: "https://schema.org/InStock",
      url: "https://t.me/Rent_tlv_bot",
      eligibleDuration: { "@type": "QuantitativeValue", value: o.days, unitCode: "DAY" }
    }))
  ]
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          organization,
          website,
          service,
          faqPage(`${SITE}/plans`, PLAN_FAQ),
          breadcrumb([{ name: "בית", path: "/" }, { name: "חבילות ומחירים", path: "/plans" }])
        )}
      />
      <PlansView />
    </>
  );
}
