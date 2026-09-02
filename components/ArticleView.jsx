"use client";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { BOT_URL, ORANGE, ORANGE_SHADOW } from "../lib/theme";

/** Renders **bold** runs and [text](/href) links without a markdown dependency. */
const rich = (text, strongColor) =>
  text.split("**").map((part, i) => {
    const nodes = [];
    const re = /\[([^\]]+)\]\(([^)]+)\)/g;
    let last = 0, m, k = 0;
    while ((m = re.exec(part))) {
      if (m.index > last) nodes.push(part.slice(last, m.index));
      nodes.push(
        <Link key={"l" + i + k++} href={m[2]} className="kr-link" style={{ color: ORANGE }}>
          {m[1]}
        </Link>
      );
      last = m.index + m[0].length;
    }
    if (last < part.length) nodes.push(part.slice(last));
    return i % 2 === 1 ? (
      <strong key={i} style={{ fontWeight: 700, color: strongColor }}>
        {nodes}
      </strong>
    ) : (
      <span key={i}>{nodes}</span>
    );
  });

export default function ArticleView({ article }) {
  const { c, mode } = useSite();
  const strong = mode === "dark" ? "#F1EAF7" : "#2D1B52";
  const rule = mode === "dark" ? "rgba(255,255,255,0.08)" : "oklch(0.55 0.04 320 / 0.16)";
  const soft = mode === "dark" ? "oklch(0.32 0.05 320 / 0.3)" : "#FFFFFF";

  const P = ({ children }) => (
    <p style={{ margin: 0, fontSize: 18, lineHeight: 1.75, color: c.body, textWrap: "pretty" }}>{children}</p>
  );

  return (
    <article>
      <section className="kr-sec" style={{ padding: "40px 40px 90px", maxWidth: 900, margin: "0 auto" }}>
        <Link
          href="/blog"
          style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 18, color: c.accent, fontSize: 15, fontWeight: 600 }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
            <path d="M9 6l6 6-6 6" />
          </svg>
          <span>חזרה לבלוג</span>
        </Link>

        <div style={{ background: soft, border: `1px solid ${rule}`, borderRadius: 22, boxShadow: mode === "dark" ? "0 22px 50px rgba(0,0,0,0.35)" : "0 18px 44px oklch(0.45 0.06 300 / 0.08)", overflow: "hidden" }}>
          {article.cover && (article.coverTall ? (
            <div style={{ padding: "34px 46px 0", display: "flex", justifyContent: "center" }}>
              <img src={article.cover} alt={article.coverAlt} style={{ display: "block", width: "100%", maxWidth: 560, height: "auto", borderRadius: 16, border: `1px solid ${rule}` }} />
            </div>
          ) : (
            <img src={article.cover} alt={article.coverAlt} width={1200} height={630} style={{ display: "block", width: "100%", height: "auto" }} />
          ))}

          <div className="kr-article-pad" style={{ padding: "0 46px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, flexWrap: "wrap", marginTop: 30 }}>
              <Link href="/blog" style={{ padding: "5px 14px", borderRadius: 999, background: c.chipBg, color: c.accent, fontSize: 13.5, fontWeight: 700 }}>הבלוג</Link>
              <span style={{ padding: "5px 14px", borderRadius: 999, background: c.chipBg, color: c.accent, fontSize: 13.5, fontWeight: 700 }}>{article.tag}</span>
            </div>
            <h1 style={{ margin: "20px 0 0", fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 44, lineHeight: 1.14, letterSpacing: "-0.03em", color: c.head, textAlign: "center", textWrap: "balance" }}>
              {article.title.split(" | ").map((line, i) => (
                <span key={i} style={{ display: "block" }}>{line}</span>
              ))}
            </h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 16, fontSize: 14.5, color: c.sub }}>
              <time dateTime={article.date}>{article.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{article.read}</span>
            </div>
            <div style={{ height: 1, background: rule, marginTop: 30 }} />
          </div>

          <div className="kr-article-body" style={{ display: "flex", flexDirection: "column", gap: 22, padding: "34px 46px 46px" }}>
        {article.blocks.map((b, i) => {
          if (b.kind === "answer") {
            return (
              <p key={i} style={{ margin: 0, fontSize: 18, lineHeight: 1.75, color: c.body, textWrap: "pretty" }}>
                {b.text}
              </p>
            );
          }

          if (b.kind === "figure") {
            return (
              <figure key={i} style={{ margin: "8px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <img src={b.src} alt={b.alt} style={{ display: "block", width: "100%", maxWidth: 520, height: "auto", borderRadius: 16, border: `1px solid ${rule}` }} />
                <figcaption style={{ fontSize: 14.5, color: c.muted, textAlign: "center" }}>{b.caption}</figcaption>
              </figure>
            );
          }

          if (b.kind === "h2") {
            return (
              <h2 key={i} style={{ margin: "26px 0 0", fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 30, lineHeight: 1.2, letterSpacing: "-0.02em", color: c.head }}>
                {b.text}
              </h2>
            );
          }

          if (b.kind === "p") return <P key={i}>{rich(b.text, strong)}</P>;

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

          if (b.kind === "note") {
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 14, padding: "24px 26px", borderRadius: 20, background: c.card, border: `1px solid ${rule}` }}>
                {b.blocks.map((t, k) => (
                  <p key={k} style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: c.sub }}>{rich(t, strong)}</p>
                ))}
                <ul style={{ margin: 0, paddingInlineStart: 22, display: "flex", flexDirection: "column", gap: 10 }}>
                  {b.items.map((t, k) => (
                    <li key={k} style={{ fontSize: 16.5, lineHeight: 1.7, color: c.sub }}>{rich(t, strong)}</li>
                  ))}
                </ul>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: c.sub }}>{b.after}</p>
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
                <p style={{ margin: "0 auto 26px", maxWidth: 600, fontSize: 17.5, lineHeight: 1.65, color: c.sub }}>{b.text}</p>
                <a href={BOT_URL} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "16px 36px", borderRadius: 14, background: ORANGE, color: "#372361", fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 18.5, boxShadow: ORANGE_SHADOW }}>
                  {b.label}
                </a>
              </div>
            );
          }

          return null;
        })}
          </div>
        </div>
      </section>
    </article>
  );
}
