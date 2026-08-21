import LandingView from "../components/LandingView";
import { FAQ } from "../lib/landing-data";
import { graph, organization, website, softwareApp, faqPage, JsonLd, SITE } from "../lib/seo";

const title = "קיריל | הבוט המקורי למציאת דירות בישראל";
const description =
  "קיריל הוא עוזר אישי חכם (AI) בטלגרם שמרכז את כל הדירות בשוק. כותבים מה מחפשים ומקבלים התראות תוך דקות מרגע הפרסום. תל אביב, רמת גן וגבעתיים. בלי הרשמה.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", type: "website" }
};

export default function Page() {
  return (
    <>
      <JsonLd data={graph(organization, website, softwareApp, faqPage(SITE + "/", FAQ))} />
      <LandingView />
    </>
  );
}
