// Google Analytics 4, inert until NEXT_PUBLIC_GA_ID is set.
// On Vercel: Project → Settings → Environment Variables → NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
// With no id set this renders nothing, so no script and no cookie banner obligation.
import Script from "next/script";

export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
