"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// Google Analytics 4, inert until NEXT_PUBLIC_GA_ID is set.
// On Vercel: Settings → Environment Variables → NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
//
// Two things a plain GA snippet gets wrong on this site, both handled here:
//  1. Client-side navigation fires no page load, so GA would only ever record
//     the first page of a visit. We send a page_view on every route change.
//  2. The action that matters is leaving for the bot. A document-level click
//     listener reports those as `bot_click`, tagged with which button it was,
//     so the funnel is readable without touching every link.
const ID = process.env.NEXT_PUBLIC_GA_ID;

// Where the click happened, derived from the URL's own start parameter.
function labelFor(href, el) {
  const m = href.match(/[?&]start=([^&]+)/);
  if (m) return "plan_" + m[1].replace(/^buy_/, "");
  if (href.includes("?text=")) return "chat_input";
  const cls = el.className || "";
  if (typeof cls === "string" && cls.includes("kr-fab")) return "floating_button";
  return "cta";
}

export default function Analytics() {
  const pathname = usePathname();

  // A page_view per route change (the first one included).
  useEffect(() => {
    if (!ID || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname + window.location.search,
      page_title: document.title
    });
  }, [pathname]);

  // Outbound clicks to the bot, and the theme/language switches.
  useEffect(() => {
    if (!ID) return;
    const onClick = (e) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el || typeof window.gtag !== "function") return;

      const a = el.closest("a[href]");
      if (a) {
        const href = a.getAttribute("href") || "";
        if (href.includes("t.me/")) {
          window.gtag("event", "bot_click", {
            placement: labelFor(href, a),
            page_path: pathname
          });
        } else if (href.includes("instagram.com")) {
          window.gtag("event", "social_click", { network: "instagram" });
        }
        return;
      }

      const btn = el.closest("button");
      if (btn && btn.hasAttribute("data-kr-a11y-open")) {
        window.gtag("event", "a11y_panel_open");
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  if (!ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());
gtag('config','${ID}',{anonymize_ip:true,send_page_view:false});`}
      </Script>
    </>
  );
}
