"use client";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { translator } from "../lib/i18n";
import { ORANGE, ORANGE_SHADOW, ORANGE_INK } from "../lib/theme";

// Rendered inside SiteShell, so it keeps the header, footer and theme.
export default function NotFound() {
  const { c, lang } = useSite();
  const t = translator(lang);

  const LINKS = [
    { href: "/", label: "עמוד הבית" },
    { href: "/plans", label: "חבילות" },
    { href: "/blog", label: "הבלוג" },
    { href: "/contact", label: "צור קשר" }
  ];

  return (
    <section
      className="kr-sec"
      style={{
        padding: "90px 40px 110px",
        maxWidth: 720,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 22
      }}
    >
      <img
        src="/assets/kiril-full.png"
        alt=""
        width="150"
        height="150"
        style={{ display: "block", width: 150, height: "auto", opacity: 0.95 }}
      />

      <div
        style={{
          fontFamily: "Heebo, sans-serif",
          fontWeight: 900,
          fontSize: 76,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: c.accent
        }}
      >
        404
      </div>

      <h1
        style={{
          margin: 0,
          fontFamily: "Heebo, sans-serif",
          fontWeight: 900,
          fontSize: 34,
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          color: c.head,
          textWrap: "balance"
        }}
      >
        {t("קיריל חיפש, אבל את העמוד הזה הוא לא מצא")}
      </h1>

      <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: c.sub, maxWidth: 460, textWrap: "pretty" }}>
        {t("יכול להיות שהכתובת השתנתה או שהעמוד הוסר. דירות הוא מוצא טוב יותר.")}
      </p>

      <Link
        href="/"
        className="kr-lift kr-orange"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 54,
          padding: "0 34px",
          marginTop: 6,
          borderRadius: 14,
          background: ORANGE,
          color: ORANGE_INK,
          fontFamily: "Heebo, sans-serif",
          fontWeight: 800,
          fontSize: 18,
          lineHeight: 1,
          boxShadow: ORANGE_SHADOW
        }}
      >
        {t("חזרה לעמוד הבית")}
      </Link>

      <nav
        aria-label={lang === "en" ? "Popular pages" : "עמודים מבוקשים"}
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 14 }}
      >
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="kr-link"
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              background: c.card,
              border: `1px solid ${c.cardBd}`,
              color: c.body,
              fontSize: 15.5
            }}
          >
            {t(l.label)}
          </Link>
        ))}
      </nav>
    </section>
  );
}
