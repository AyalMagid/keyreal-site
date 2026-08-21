"use client";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { translator } from "../lib/i18n";
import { POSTS } from "../lib/posts";

/** Internal posts navigate client-side; planned ones still link out to the bot. */
function Card({ post, children, ...rest }) {
  return post.internal ? (
    <Link href={post.url} {...rest}>{children}</Link>
  ) : (
    <a href={post.url} {...rest}>{children}</a>
  );
}

export default function BlogView() {
  const { c, lang, mode } = useSite();
  const t = translator(lang);
  const light = mode === "light";

  const cover = {
    position: "relative",
    height: 158,
    overflow: "hidden",
    backgroundColor: light ? "#F3EEFB" : "oklch(0.26 0.045 315 / 0.75)",
    backgroundImage: `radial-gradient(circle at 22% 18%, ${light ? "oklch(0.62 0.18 300 / 0.16)" : "oklch(0.62 0.2 300 / 0.3)"}, transparent 58%), radial-gradient(circle at 84% 88%, rgba(251,164,60,0.16), transparent 55%), radial-gradient(${light ? "oklch(0.52 0.19 300 / 0.16)" : "oklch(0.78 0.15 300 / 0.14)"} 1px, transparent 1px)`,
    backgroundSize: "auto, auto, 15px 15px",
    backgroundPosition: "center, center, -1px -1px"
  };

  return (
    <>
      <section className="kr-sec" style={{ padding: "66px 40px 30px", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: c.chipBg, color: c.accent, fontFamily: "Heebo, sans-serif", fontWeight: 700, fontSize: 13.5, marginBottom: 16 }}>
          {t("הבלוג של קיריל")}
        </div>
        <h1 style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 50, letterSpacing: "-0.035em", margin: "0 0 12px", lineHeight: 1.05, color: c.head }}>
          {t("מדריכים לשוכרים ולקונים")}
        </h1>
        <p style={{ margin: 0, maxWidth: 620, fontSize: 18.5, lineHeight: 1.55, color: c.sub }}>
          {t("נתונים אמיתיים על שוק השכירות: מחירים לפי שכונה, מה שווה כל תוספת, ואיך באמת לקבל יתרון משמעותי בשוק תחרותי, ולהגיע לדירות השוות לפני כולם")}
        </p>
      </section>

      <section className="kr-sec" style={{ padding: "24px 40px 80px", maxWidth: 1240, margin: "0 auto" }}>
        <div className="kr-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 18 }}>
          {POSTS.map((post) => (
            <Card key={post.title.replace(" | ", " · ")} post={post} className="kr-card" style={{ display: "flex", flexDirection: "column", borderRadius: 22, overflow: "hidden", background: c.card, border: `1px solid ${c.cardBd}`, color: c.text }}>
              <div style={cover}>
                {post.cover ? (
                  <img
                    src={post.cover}
                    alt={post.coverAlt || ""}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: post.coverTall ? "contain" : "cover", display: "block" }}
                  />
                ) : null}
                <div style={{ position: "absolute", inset: 0, display: post.cover ? "none" : "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 62, height: 62, borderRadius: 20, background: light ? "#FFFFFF" : "oklch(0.32 0.05 320 / 0.8)", border: `1px solid ${light ? "oklch(0.55 0.04 320 / 0.16)" : "oklch(0.7 0.06 320 / 0.22)"}`, boxShadow: `0 8px 22px rgba(0,0,0,${light ? 0.08 : 0.28})`, fontSize: 28, lineHeight: 1 }}>
                    {post.icon}
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to left, transparent, ${light ? "oklch(0.52 0.19 300 / 0.35)" : "oklch(0.78 0.15 300 / 0.3)"}, transparent)` }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "20px 22px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: c.muted }}>
                  <span style={{ padding: "3px 10px", borderRadius: 999, background: c.chipBg, color: c.accent, fontWeight: 700 }}>{post.tag}</span>
                  <span>{post.read}</span>
                </div>
                <h2 style={{ margin: 0, fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 19.5, lineHeight: 1.3, color: c.head }}>{post.title.replace(" | ", " · ")}</h2>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: c.body }}>{post.excerpt}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
