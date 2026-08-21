"use client";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { BOT_URL, ORANGE, ORANGE_SHADOW, ORANGE_INK } from "../lib/theme";

/** Renders **bold** runs without pulling in a markdown dependency. */
const rich = (text, strongColor) =>
  text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ fontWeight: 700, color: strongColor }}>
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );

export default function CityView({ city }) {
  const { c, mode } = useSite();
  const strong = mode === "dark" ? "#F1EAF7" : "#2D1B52";
  const rule = mode === "dark" ? "rgba(255,255,255,0.08)" : "oklch(0.55 0.04 320 / 0.16)";
  const soft = mode === "dark" ? "oklch(0.32 0.05 320 / 0.3)" : "#FFFFFF";

  return (
    <article>
      <section className="kr-sec" style={{ padding: "48px 40px 30px", maxWidth: 900, margin: "0 auto" }}>
        <nav aria-label="מיקום בעמוד" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, fontSize: 14.5, color: c.muted }}>
          <Link href="/" style={{ color: c.accent, fontWeight: 600 }}>בית</Link>
          <span aria-hidden="true">›</span>
          <span>{city.name}</span>
        </nav>

        <h1 style={{ margin: 0, fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 46, lineHeight: 1.1, letterSpacing: "-0.035em", color: c.head, textWrap: "balance" }}>
          {city.title}
        </h1>

        <div className="kr-city-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 14, marginTop: 26 }}>
          {city.stats.map((s) => (
            <div key={s.label} style={{ padding: "18px 20px", borderRadius: 18, background: soft, border: `1px solid ${rule}` }}>
              <div style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 26, lineHeight: 1.1, letterSpacing: "-0.02em", color: c.accent }}>{s.n}</div>
              <div style={{ marginTop: 6, fontSize: 14.5, lineHeight: 1.45, color: c.sub }}>{s.label}</div>
            </div>
          ))}
        </div>

        <p style={{ margin: "26px 0 0", fontSize: 18, lineHeight: 1.75, color: c.body, textWrap: "pretty" }}>{city.answer}</p>
      </section>

      <section className="kr-sec" style={{ padding: "0 40px 90px", maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 }}>
        {city.blocks.map((b, i) => {
          if (b.kind === "h2") {
            return (
              <h2 key={i} style={{ margin: "22px 0 0", fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 30, lineHeight: 1.2, letterSpacing: "-0.02em", color: c.head }}>
                {b.text}
              </h2>
            );
          }

          if (b.kind === "p") {
            return (
              <p key={i} style={{ margin: 0, fontSize: 18, lineHeight: 1.75, color: c.body, textWrap: "pretty" }}>
                {rich(b.text, strong)}
              </p>
            );
          }

          if (b.kind === "link") {
            return (
              <Link
                key={i}
                href={b.href}
                style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 8, color: c.accent, fontSize: 16.5, fontWeight: 700 }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                  <path d="M15 6l-6 6 6 6" />
                </svg>
                <span>{b.label}</span>
              </Link>
            );
          }

          if (b.kind === "list") {
            return (
              <ul key={i} style={{ margin: 0, paddingInlineStart: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                {b.items.map((it, k) => (
                  <li key={k} style={{ fontSize: 18, lineHeight: 1.75, color: c.body }}>{rich(it, strong)}</li>
                ))}
              </ul>
            );
          }

          if (b.kind === "table") {
            return (
              <div key={i} className="kr-table" style={{ overflowX: "auto", borderRadius: 18, border: `1px solid ${rule}`, background: soft }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16.5 }}>
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col" style={{ textAlign: "start", padding: "14px 18px", fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 15.5, color: c.head, background: c.chipBg, borderBottom: `1px solid ${rule}` }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, k) => (
                          <td key={k} style={{ padding: "13px 18px", color: k === 1 ? c.accent : c.body, fontWeight: k === 1 ? 700 : 400, whiteSpace: k === 1 ? "nowrap" : "normal", borderTop: r ? `1px solid ${rule}` : "none", textAlign: "start" }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          if (b.kind === "faq") {
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 12 }}>
                <h2 style={{ margin: "14px 0 0", fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 30, letterSpacing: "-0.02em", color: c.head }}>
                  שאלות נפוצות
                </h2>
                {b.items.map((f) => (
                  <div key={f.q} style={{ padding: "18px 22px", borderRadius: 18, background: c.card, border: `1px solid ${rule}` }}>
                    <h3 style={{ margin: "0 0 8px", fontFamily: "Heebo, sans-serif", fontWeight: 700, fontSize: 18.5, lineHeight: 1.35, color: c.head }}>{f.q}</h3>
                    <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: c.body }}>{f.a}</p>
                  </div>
                ))}
              </div>
            );
          }

          if (b.kind === "cta") {
            return (
              <div key={i} style={{ marginTop: 12, paddingTop: 34, borderTop: `1px solid ${rule}`, textAlign: "center" }}>
                <h2 style={{ margin: "0 0 12px", fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 32, letterSpacing: "-0.03em", color: c.head }}>{b.title}</h2>
                <p style={{ margin: "0 auto 26px", maxWidth: 620, fontSize: 17.5, lineHeight: 1.65, color: c.sub }}>{b.text}</p>
                <a href={BOT_URL} className="kr-lift kr-orange" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "16px 36px", borderRadius: 14, background: ORANGE, color: ORANGE_INK, fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 18.5, boxShadow: ORANGE_SHADOW }}>
                  {b.label}
                </a>
              </div>
            );
          }

          return null;
        })}
      </section>
    </article>
  );
}
