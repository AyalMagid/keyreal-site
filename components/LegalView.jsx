"use client";
import { useEffect, useState } from "react";
import { useSite } from "../lib/site-context";
import { translator } from "../lib/i18n";
import { DOCS } from "../lib/legal-docs";

export default function LegalView() {
  const { c, lang } = useSite();
  const t = translator(lang);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const h = (window.location.hash || "").replace("#", "");
    const i = DOCS.findIndex((d) => d.id === h);
    if (i >= 0) setActive(i);
  }, []);

  const doc = DOCS[active];

  return (
    <>
      <section className="kr-sec" style={{ padding: "62px 40px 26px", maxWidth: 1040, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 48, letterSpacing: "-0.035em", margin: "0 0 10px", lineHeight: 1.06, color: c.head }}>
          {t("מידע משפטי")}
        </h1>
        <p style={{ margin: 0, fontSize: 17.5, color: c.sub }}>{t("תנאי שירות, פרטיות, ביטולים ונגישות")}</p>
      </section>

      <section className="kr-sec" style={{ padding: "0 40px 80px", maxWidth: 1040, margin: "0 auto" }}>
        <div role="tablist" aria-label="מסמכים משפטיים" style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 26, position: "sticky", top: 84, zIndex: 20, padding: "10px 0", background: c.flat }}>
          {DOCS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className="kr-ghost"
              onClick={() => {
                setActive(i);
                if (window.history?.replaceState) window.history.replaceState(null, "", `#${d.id}`);
              }}
              style={{
                padding: "0 18px",
                minHeight: 42,
                borderRadius: 999,
                fontFamily: "Heebo, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                border: `1px solid ${i === active ? c.cardHotBd : c.cardBd}`,
                background: i === active ? c.chipBg : "transparent",
                color: i === active ? c.accent : c.sub,
                transition: "background 0.2s ease, border-color 0.2s ease"
              }}
            >
              {t(d.tab)}
            </button>
          ))}
        </div>

        <div style={{ padding: "34px 34px 30px", borderRadius: 24, background: c.card, border: `1px solid ${c.cardBd}` }}>
          <h2 style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 30, letterSpacing: "-0.02em", margin: "0 0 6px", color: c.head }}>{doc.title}</h2>
          <div style={{ fontSize: 14, color: c.muted, marginBottom: 24 }}>{doc.updated}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {doc.blocks.map(([kind, val], i) => {
              if (kind === "h") return <h3 key={i} style={{ margin: 0, fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 19, color: c.head }}>{val}</h3>;
              if (kind === "t") return <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: c.body, textWrap: "pretty" }}>{val}</p>;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {val.map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 16, lineHeight: 1.7, color: c.body }}>
                      <span style={{ color: c.accent, lineHeight: 1.5 }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
