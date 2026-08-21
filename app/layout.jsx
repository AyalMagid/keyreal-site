import { SiteProvider } from "../lib/site-context";
import SiteShell from "../components/SiteShell";
import Analytics from "../components/Analytics";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://www.keyreal.co.il"),
  title: {
    default: "קיריל | הבוט המקורי למציאת דירות בישראל",
    template: "%s"
  },
  description:
    "קיריל הוא עוזר אישי חכם (AI) שמרכז עבורכם את כל הדירות הקיימות בשוק. התראות תוך דקות מרגע הפרסום. השכרה, מכירה וסבלט",
  openGraph: {
    siteName: "קיריל",
    locale: "he_IL",
    type: "website",
    // Swap to og-light.png for the light version — same size, same content.
    images: [
      {
        url: "/assets/og-dark.png",
        width: 1200,
        height: 630,
        alt: "קיריל - הבוט החכם שמוצא לך דירה לפני כולם"
      }
    ]
  },
  twitter: { card: "summary_large_image", images: ["/assets/og-dark.png"] },
  icons: { icon: "/assets/logo-sm.png", apple: "/assets/logo-sm.png" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@700;800;900&family=Assistant:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          html { scroll-behavior: smooth; }
          [id] { scroll-margin-top: 92px; }
          a, button, label, summary, [role="button"], [role="tab"] { cursor: pointer; }

          /* Accessibility: a visible focus ring for keyboard users on every
             interactive element, without showing it on mouse clicks. */
          :focus { outline: none; }
          :focus-visible {
            outline: 3px solid oklch(0.62 0.2 300);
            outline-offset: 3px;
            border-radius: 6px;
          }
          input:focus-visible, textarea:focus-visible { outline-offset: 1px; }

          .kr-skip {
            position: absolute;
            inset-inline-start: 50%;
            top: -100px;
            transform: translateX(-50%);
            z-index: 200;
            padding: 12px 22px;
            border-radius: 0 0 12px 12px;
            background: oklch(0.52 0.19 300);
            color: #FFFFFF;
            font-family: Heebo, sans-serif;
            font-weight: 700;
            font-size: 15px;
            transition: top 0.15s ease;
          }
          .kr-skip:focus { top: 0; }

          .kr-sr {
            position: absolute;
            width: 1px; height: 1px;
            padding: 0; margin: -1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
            border: 0;
          }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.001ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.001ms !important;
              scroll-behavior: auto !important;
            }
          }
          input, textarea, label:has(input), label:has(textarea) { cursor: text; }
          html, body { margin: 0; padding: 0; }
          * { box-sizing: border-box; }
          a { text-decoration: none; color: inherit; }
          @keyframes kr-in { from { opacity: 0; transform: translateY(14px) scale(0.97); } to { opacity: 1; transform: none; } }
          @keyframes kr-blink { 0%, 60% { opacity: 0.25; } 30% { opacity: 1; } }
          @keyframes kr-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes kr-pulse { 0%, 100% { opacity: 0.35; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.08); } }
          @keyframes kr-marq { from { transform: translateX(0); } to { transform: translateX(50%); } }
          @keyframes kr-rise { from { opacity: 0; transform: translateY(18px) scale(0.985); } to { opacity: 1; transform: none; } }
          @keyframes kr-pop { 0% { opacity: 0; transform: scale(0.5); } 62% { transform: scale(1.14); } 100% { opacity: 1; transform: scale(1); } }
          @keyframes kr-spin { to { transform: rotate(360deg); } }
          @keyframes kr-menu-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes kr-open { from { grid-template-rows: 0fr; opacity: 0; } to { grid-template-rows: 1fr; opacity: 1; } }

          /* Hover states. Inline styles cannot express :hover, so they live here
             and read the CSS vars that SiteShell sets from the active theme. */
          @media (hover: hover) {
            .kr-lift { transition: transform 0.2s cubic-bezier(0.2,0.8,0.2,1), background 0.2s ease, box-shadow 0.2s ease; }
            .kr-lift:hover { transform: scale(1.035); }
            .kr-orange:hover { background: #FFB055 !important; }
            .kr-purple:hover { background: oklch(0.7 0.19 300) !important; }
            .kr-ghost:hover { background: var(--kr-card-hot) !important; border-color: var(--kr-hot-bd) !important; }
            .kr-logo { transition: opacity 0.2s ease; }
            .kr-logo:hover { opacity: 0.82; }
            .kr-circle, .kr-fcircle { transition: background 0.18s ease; }
            .kr-circle:hover { background: var(--kr-circle-hov) !important; }
            .kr-fcircle:hover { background: var(--kr-foot-circle-hov) !important; }
            .kr-flink { transition: color 0.18s ease; }
            .kr-flink:hover { color: var(--kr-foot-accent) !important; }
            .kr-link:hover { text-decoration: underline; }
            .kr-faq:hover { border-color: var(--kr-hot-bd) !important; }
            .kr-card { transition: transform 0.22s cubic-bezier(0.2,0.8,0.2,1), border-color 0.2s ease, box-shadow 0.25s ease; }
            .kr-card:hover { transform: translateY(-4px); border-color: var(--kr-hot-bd) !important; }
            .kr-fab { transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
            .kr-fab:hover { transform: scale(1.12); }
            .kr-send { transition: transform 0.18s cubic-bezier(0.2,0.8,0.2,1); }
            .kr-send:hover { transform: scale(1.08); }
            .kr-dot { transition: opacity 0.18s ease; }
            .kr-dot:hover { opacity: 0.7; }
          }

          .kr-nav-mobile { display: none !important; }

          /* nav breakpoint: swap to the burger before the links get crushed */
          @media (max-width: 1080px) {
            .kr-nav-desktop { display: none !important; }
            .kr-burger { display: inline-flex !important; }
            .kr-nav-mobile:not([hidden]) { display: flex !important; }
          }

          @media (max-width: 980px) {
            .kr-fab { left: 0 !important; right: 0 !important; margin-inline: 14px !important; transform: none !important; bottom: 14px !important; width: auto !important; max-width: none !important; height: 56px !important; border-radius: 999px !important; flex-direction: row !important; gap: 10px !important; padding: 0 26px !important; }
            .kr-fab:hover { transform: none !important; }
            .kr-fab img { width: 30px !important; height: 30px !important; }
            .kr-fab span { font-size: 16.5px !important; }
            h1 { font-size: 30px !important; line-height: 1.1 !important; letter-spacing: -0.03em !important; }
            h2 { font-size: 26px !important; line-height: 1.15 !important; }
            .kr-grid3 > a h2 { font-size: 19.5px !important; line-height: 1.3 !important; }
            .kr-nav-desktop { display: none !important; }
            .kr-burger { display: inline-flex !important; }
            .kr-ctl { display: none !important; }
            header { position: sticky; }
            .kr-incl { grid-template-columns: 1fr !important; justify-content: start !important; }
            .kr-contact { grid-template-columns: 1fr !important; }
            .kr-article-body { padding: 24px 18px !important; }
            .kr-table { overflow-x: visible !important; }
            .kr-table thead { display: none !important; }
            .kr-table table, .kr-table tbody, .kr-table tr, .kr-table td { display: block !important; width: auto !important; }
            .kr-table tr { padding: 14px 16px !important; }
            .kr-table tr + tr { border-top: 1px solid var(--kr-hot-bd) !important; }
            .kr-table td { padding: 0 !important; border-top: 0 !important; white-space: normal !important; }
            .kr-table td:first-child { font-family: Heebo, sans-serif; font-weight: 800; font-size: 16px; color: var(--kr-head) !important; margin-bottom: 3px; }
            .kr-table td:nth-child(2) { font-size: 21px; margin-bottom: 3px; }
            .kr-table td:last-child { font-size: 15.5px; line-height: 1.55; }
            .kr-article-pad h1 { font-size: 27px !important; line-height: 1.2 !important; letter-spacing: -0.02em !important; }
            .kr-article-pad { padding: 0 18px !important; }
            .kr-fields { grid-template-columns: 1fr !important; }
            .kr-hero { grid-template-columns: 1fr !important; padding: 40px 20px 24px !important; gap: 30px !important; }
            .kr-hero h1 { font-size: 40px !important; }
            .kr-hero p { font-size: 17.5px !important; }
            .kr-hero-btns { flex-direction: column !important; align-items: stretch !important; }
            .kr-hero-btns a { width: 100% !important; }
            .kr-stats { gap: 12px !important; max-width: none !important; }
            .kr-stats > div > div:first-child { font-size: 26px !important; }
            .kr-phone { transform: scale(0.86); transform-origin: top center; }
            .kr-grid3 { grid-template-columns: 1fr !important; }
            .kr-sec .kr-grid3:has(> div > img) { margin-top: 40px !important; row-gap: 34px !important; }
            .kr-grid3 > div:nth-child(2) > img { right: 4px !important; top: -30px !important; width: 68px !important; }
            .kr-sec { padding-left: 18px !important; padding-right: 18px !important; }
            .kr-contact { grid-template-columns: 1fr !important; gap: 18px !important; }
            .kr-article-body { padding: 24px 18px !important; }
            .kr-table { overflow-x: visible !important; }
            .kr-table thead { display: none !important; }
            .kr-table table, .kr-table tbody, .kr-table tr, .kr-table td { display: block !important; width: auto !important; }
            .kr-table tr { padding: 14px 16px !important; }
            .kr-table tr + tr { border-top: 1px solid var(--kr-hot-bd) !important; }
            .kr-table td { padding: 0 !important; border-top: 0 !important; white-space: normal !important; }
            .kr-table td:first-child { font-family: Heebo, sans-serif; font-weight: 800; font-size: 16px; color: var(--kr-head) !important; margin-bottom: 3px; }
            .kr-table td:nth-child(2) { font-size: 21px; margin-bottom: 3px; }
            .kr-table td:last-child { font-size: 15.5px; line-height: 1.55; }
            .kr-article-pad h1 { font-size: 27px !important; line-height: 1.2 !important; letter-spacing: -0.02em !important; }
            .kr-article-pad { padding: 0 18px !important; }
            .kr-fields { grid-template-columns: 1fr !important; }
            .kr-incl { grid-template-columns: 1fr !important; column-gap: 0 !important; justify-content: start !important; }
        footer { padding: 18px 18px 16px !important; }
        .kr-foot-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 10px !important; align-items: start !important; }
        .kr-foot-grid > div:first-child { gap: 8px !important; }
        .kr-foot-grid > div:first-child img { width: 28px !important; height: 28px !important; }
        .kr-foot-grid > div:first-child span { font-size: 17px !important; }
        .kr-foot-grid > div:first-child p { display: none !important; }
        .kr-foot-grid > div:first-child > div:last-child { flex-direction: column !important; align-items: flex-start !important; margin-top: 0 !important; gap: 6px !important; }
        .kr-foot-grid > div:first-child > div:last-child a { width: 30px !important; height: 30px !important; }
        .kr-foot-grid > div:nth-child(3) { display: none !important; }
        .kr-foot-grid > div + div { gap: 0 !important; }
        .kr-foot-grid > div + div { padding-top: 6px !important; }
            .kr-foot-grid > div + div > div:first-child { font-size: 13.5px !important; margin-bottom: 3px !important; line-height: 1.2 !important; }
        .kr-foot-grid > div + div > a { font-size: 14px !important; line-height: 1.15 !important; padding: 5px 6px !important; margin-inline: -6px !important; }
        footer > div:last-child { flex-direction: row !important; flex-wrap: wrap !important; align-items: center !important; justify-content: space-between !important; gap: 4px 12px !important; margin-top: 10px !important; padding-top: 10px !important; font-size: 12px !important; }
            .kr-grid3 > div:first-child { grid-column: span 1 !important; padding: 24px 20px !important; }
            section { padding-inline: 20px !important; }
            section h2 { font-size: 34px !important; }
            .kr-steps { gap: 14px !important; }
            .kr-steps [data-step-block] { grid-template-columns: 1fr !important; }
            .kr-steps [data-step-block] > div { grid-column: 1 !important; transform: none !important; }
            .kr-steps [data-rail] { display: none !important; }
            .kr-step-card { justify-content: stretch !important; }
            .kr-step-card > div { max-width: none !important; opacity: 1 !important; }
            .kr-connector { display: none !important; }
          }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var m=localStorage.getItem('keyreal-theme');if(m!=='light'&&m!=='dark')m='light';window.__krTheme=m;var l=localStorage.getItem('keyreal-lang');if(l!=='en'&&l!=='he')l='he';window.__krLang=l;document.documentElement.lang=l;document.documentElement.dir=l==='en'?'ltr':'rtl';document.documentElement.style.backgroundColor=m==='dark'?'#171020':'#F7F4FB';}catch(e){}})()"
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <SiteProvider>
          <SiteShell>{children}</SiteShell>
        </SiteProvider>
        <Script src="/a11y.js" strategy="afterInteractive" />
        <Script src="/copy-mail.js" strategy="afterInteractive" />
        <Analytics />
      </body>
    </html>
  );
}
