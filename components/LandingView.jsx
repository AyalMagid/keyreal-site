"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { translator } from "../lib/i18n";
import { BOT_URL, ORANGE, ORANGE_SHADOW, ORANGE_INK } from "../lib/theme";
import {
  SCRIPT, HINTS, MARQUEE, LOCATION_CARDS, FEATURE_CARDS, STEPS, FAQ, FAQ_EN, TESTIMONIALS, STATS
} from "../lib/landing-data";
import { ICONS, ChevronIcon, SendIcon } from "./icons";

const CHAT_SPEED = 1900;

// Landing-only surfaces. The shared tokens live in lib/theme.js; these are the
// few values that exist on this page alone.
const SKIN = {
  dark: {
    secBg: "#120E1A",
    hairline: "rgba(255,255,255,0.06)",
    bigCard: "rgba(255,255,255,0.03)",
    bigCardBd: "oklch(0.7 0.06 320 / 0.18)",
    innerCard: "rgba(0,0,0,0.28)",
    innerBd: "rgba(255,255,255,0.08)",
    dotBg: "#1C1421",
    ctaBg: "oklch(0.26 0.045 315 / 0.55)",
    ctaBd: "oklch(0.7 0.08 310 / 0.2)",
    ctaHead: "#F7F2FA",
    heroGrad: "linear-gradient(100deg, oklch(0.8 0.14 300), oklch(0.68 0.19 340))",
    pillBg: "oklch(0.35 0.05 320 / 0.35)",
    pillBd: "rgba(255,255,255,0.1)",
    pillText: "#C4B6CD",
    marqBg: "oklch(0.3 0.05 320 / 0.22)",
    tCard: "oklch(0.32 0.05 320 / 0.42)",
    tCardBd: "oklch(0.7 0.06 320 / 0.2)",
    tRing: "oklch(0.22 0.04 320)",
    tName: "#F3EEF6",
    tCity: "#B0A4BB",
    tQuote: "#EBE3EF",
    bubbleShadow: "0 6px 18px rgba(0,0,0,0.32)",
    cardShadow: "0 22px 50px rgba(0,0,0,0.35)",
    faqNum: "oklch(0.72 0.1 300 / 0.55)",
    faqQ: "#F7F3F9",
    faqStrong: "#F1EAF7",
    fabText: "#5B2D82"
  },
  light: {
    secBg: "#F1EBF9",
    hairline: "oklch(0.5 0.04 320 / 0.12)",
    bigCard: "#FFFFFF",
    bigCardBd: "oklch(0.55 0.04 320 / 0.14)",
    innerCard: "#FAF7FE",
    innerBd: "oklch(0.55 0.04 320 / 0.14)",
    dotBg: "#FFFFFF",
    ctaBg: "#FFFFFF",
    ctaBd: "oklch(0.52 0.19 300 / 0.22)",
    ctaHead: "#372361",
    heroGrad: "linear-gradient(100deg, oklch(0.58 0.2 320), oklch(0.5 0.19 285))",
    pillBg: "#FFFFFF",
    pillBd: "oklch(0.5 0.04 320 / 0.16)",
    pillText: "#63537F",
    marqBg: "#FFFFFF",
    tCard: "#FFFFFF",
    tCardBd: "oklch(0.55 0.04 320 / 0.14)",
    tRing: "#F7F4FB",
    tName: "#372361",
    tCity: "#6B5A85",
    tQuote: "#4A3670",
    bubbleShadow: "0 6px 18px oklch(0.4 0.06 300 / 0.14)",
    cardShadow: "0 18px 40px oklch(0.45 0.06 300 / 0.1)",
    faqNum: "oklch(0.52 0.12 300 / 0.6)",
    faqQ: "#372361",
    faqStrong: "#2D1B52",
    fabText: "#5B2D82"
  }
};

const PURPLE = "oklch(0.62 0.2 300)";
const PURPLE_HOVER = "oklch(0.7 0.19 300)";
const BUBBLE_USER = "#E4FDC6";
const BUBBLE_TEXT = "#342159";

function iconCircle(c) {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "none",
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "oklch(0.62 0.19 300 / 0.14)",
    color: c.accent
  };
}

function Quote({ text, kind = "user", s }) {
  return (
    <div
      style={{
        marginTop: 20,
        alignSelf: "flex-start",
        padding: "9px 13px",
        borderRadius: "14px 14px 14px 4px",
        background: kind === "user" ? BUBBLE_USER : "#FFFFFF",
        color: BUBBLE_TEXT,
        fontSize: 14.5,
        lineHeight: 1.4,
        boxShadow: s.bubbleShadow
      }}
    >
      {text}
    </div>
  );
}

export default function LandingView() {
  const { c, mode, lang } = useSite();
  const t = translator(lang);
  const s = SKIN[mode];

  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(0);
  const [tPage, setTPage] = useState(0);
  const [draft, setDraft] = useState("");
  const [draftFocus, setDraftFocus] = useState(false);
  const [hintIdx, setHintIdx] = useState(0);
  const rootRef = useRef(null);
  const rotRef = useRef(null);

  // Chat demo. The accessibility panel's "stop animations" flag lives on <html>;
  // CSS rules cannot stop a timer, so the timers read it themselves.
  const still = () => document.documentElement.dataset.krStill === "1";

  useEffect(() => {
    if (still()) {
      if (step < SCRIPT.length) setStep(SCRIPT.length);
      const poll = setTimeout(() => setStep((n) => n), 700);
      return () => clearTimeout(poll);
    }
    const done = step >= SCRIPT.length;
    const id = setTimeout(() => setStep((n) => (n >= SCRIPT.length ? 1 : n + 1)), done ? CHAT_SPEED * 2.4 : CHAT_SPEED);
    return () => clearTimeout(id);
  }, [step]);

  // Placeholder rotation
  useEffect(() => {
    const id = setInterval(() => {
      if (!still() && !draftFocus && !draft) setHintIdx((i) => i + 1);
    }, 3400);
    return () => clearInterval(id);
  }, [draftFocus, draft]);

  // Testimonial carousel
  useEffect(() => {
    rotRef.current = setInterval(() => { if (!still()) setTPage((p) => (p + 1) % 3); }, 7000);
    return () => clearInterval(rotRef.current);
  }, []);

  // Timeline reveal
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver) return;
    const how = root.querySelector("#how");
    if (!how) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const blocks = [...how.querySelectorAll("[data-step-block]")];
    const conns = [...how.querySelectorAll("[data-draw]")];
    conns.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 0;
      if (!len) return;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = reduce ? 0 : len;
      p.style.transition = "stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.25,1)";
    });
    if (reduce) {
      how.querySelectorAll("[data-reveal]").forEach((el) => { el.style.opacity = 1; });
      how.querySelectorAll("[data-rail]").forEach((el) => { el.style.backgroundSize = "100% 100%"; });
      return;
    }
    const timers = [];
    const run = (block, i) => {
      const dot = block.querySelector('[data-reveal="dot"]');
      const bubble = block.querySelector('[data-reveal="bubble"]');
      const rail = block.querySelector("[data-rail]");
      if (dot) dot.style.animation = "kr-pop 0.42s cubic-bezier(0.2,0.8,0.2,1) both";
      if (bubble) bubble.style.animation = "kr-rise 0.5s cubic-bezier(0.2,0.8,0.2,1) 0.06s both";
      if (rail) {
        rail.style.transition = "background-size 0.42s cubic-bezier(0.4,0,0.25,1)";
        timers.push(setTimeout(() => { rail.style.backgroundSize = "100% 100%"; }, 180));
      }
      const conn = conns[i];
      if (conn) timers.push(setTimeout(() => { conn.style.strokeDashoffset = 0; }, 520));
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        run(e.target, blocks.indexOf(e.target));
      }),
      { threshold: 0.4, rootMargin: "0px 0px -6% 0px" }
    );
    blocks.forEach((b) => io.observe(b));
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [mode]);

  const sendDraft = () => {
    const q = draft.trim();
    window.open(BOT_URL + (q ? "?text=" + encodeURIComponent(q) : ""), "_blank", "noopener");
    setDraft("");
  };

  const visible = SCRIPT.slice(0, step);
  const typing = !!SCRIPT[step] && SCRIPT[step].type !== "user";
  const trio = useMemo(() => TESTIMONIALS.slice(tPage * 3, tPage * 3 + 3), [tPage]);
  const faq = lang === "en" ? FAQ_EN : FAQ;

  const railGrad = `linear-gradient(to bottom, ${c.accent}, ${c.accent})`;

  return (
    <div ref={rootRef}>
      <section className="kr-hero" style={{ position: "relative", padding: "84px 40px 40px", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center", maxWidth: 1360, margin: "0 auto" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 14px 7px 10px", borderRadius: 999, border: `1px solid ${s.pillBd}`, background: s.pillBg, fontSize: 14, color: s.pillText, marginBottom: 26 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: PURPLE_HOVER, boxShadow: "0 0 12px oklch(0.7 0.19 300 / 0.8)" }} />
            {t("זמין בטלגרם · השכרה, מכירה וסבלט")}
          </div>
          <h1 style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 62, lineHeight: 1.02, letterSpacing: "-0.035em", margin: "0 0 22px", textWrap: "balance", color: c.head }}>
            {t("הבוט המקורי")}
            <br />
            <span style={{ backgroundImage: s.heroGrad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              {t("למציאת דירות בישראל")}
            </span>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.42, color: c.sub, maxWidth: 540, margin: "0 0 34px", textWrap: "pretty" }}>
            {t("קיריל הוא עוזר אישי חכם (AI) שמרכז עבורכם את כל הדירות הקיימות בשוק.")}{" "}
            {t("כותבים לו מה מחפשים ומקבלים")}{" "}
            <strong style={{ color: c.accent, fontWeight: 700 }}>{t("התראות תוך דקות מרגע הפרסום")}</strong>
          </p>
          <div className="kr-hero-btns" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginBottom: 40 }}>
            <a href={BOT_URL} className="kr-lift kr-purple" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "0 32px", minHeight: 56, borderRadius: 14, background: PURPLE, color: "#FFFFFF", fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 18, lineHeight: 1, boxShadow: "0 4px 12px oklch(0.45 0.16 300 / 0.2)" }}>
              {t("התחילו עכשיו בחינם")}
            </a>
            <a href="#why" className="kr-lift kr-orange" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 30px", minHeight: 56, borderRadius: 14, background: ORANGE, color: ORANGE_INK, fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 18, lineHeight: 1, boxShadow: ORANGE_SHADOW }}>
              {t("למה דווקא קיריל")}
            </a>
          </div>
          <div style={{ fontSize: 14.5, color: c.muted, margin: "-26px 0 34px" }}>{t("כדי להתחיל לחפש לא צריך למסור שם, מייל, טלפון או פרטי אשראי")}</div>
          <div className="kr-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 20, maxWidth: 560, borderTop: `1px solid ${s.hairline}`, paddingTop: 26 }}>
            {STATS.map((st) => (
              <div key={st.n}>
                <div style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 34, letterSpacing: "-0.03em", color: c.accent }}>{st.n}</div>
                <div style={{ fontSize: 14, color: c.muted, marginTop: 4 }}>{t(st.label)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="kr-phone-wrap" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 14, position: "relative" }}>
          <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, oklch(0.7 0.19 300 / 0.24), transparent 70%)", filter: "blur(10px)" }} />
          <div id="demo" className="kr-phone" role="img" aria-label={t("הדגמה של שיחה עם קיריל בטלגרם")} style={{ position: "relative", animation: "kr-float 7s ease-in-out infinite" }}>
            <div style={{ width: 372, padding: 12, borderRadius: 54, background: "linear-gradient(160deg, #4A3F5C, #241E33 55%, #3B3350)", boxShadow: "0 50px 90px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)" }}>
              <div style={{ position: "relative", borderRadius: 42, overflow: "hidden", background: "#F0EBF7", color: "#372361", height: 660, display: "flex", flexDirection: "column" }}>
                <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 96, height: 26, borderRadius: 999, background: "#05070A", zIndex: 5 }} />
                <div style={{ padding: "44px 18px 12px", display: "flex", alignItems: "center", gap: 10, background: "#F6F2FB", borderBottom: "1px solid oklch(0.5 0.05 300 / 0.14)" }}>
                  <img src="/assets/avatar-sm.png" alt="קיריל" width={40} height={40} style={{ borderRadius: "50%", objectFit: "cover", display: "block", flex: "none" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Heebo, sans-serif", fontWeight: 700, fontSize: 15 }}>{t("קיריל - לפני כולם")}</div>
                    <div style={{ fontSize: 12, color: "oklch(0.52 0.19 300)" }}>{t("מקוון · עובד עכשיו")}</div>
                  </div>
                </div>

                <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10, padding: "14px 12px 16px", backgroundImage: "url('/assets/doodle-light-sm.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                  {visible.map((m, i) => {
                    if (m.type === "user") {
                      return (
                        <div key={i} style={{ display: "flex", justifyContent: "flex-start", animation: "kr-in 0.45s cubic-bezier(0.2,0.8,0.2,1) both" }}>
                          <div style={{ maxWidth: "82%", padding: "11px 14px", borderRadius: "18px 18px 18px 4px", background: BUBBLE_USER, color: BUBBLE_TEXT, fontSize: 14.5, lineHeight: 1.5, boxShadow: "0 1px 2px oklch(0.4 0.05 300 / 0.18)" }}>
                            {m.text}
                          </div>
                        </div>
                      );
                    }
                    if (m.type === "bot") {
                      return (
                        <div key={i} style={{ display: "flex", justifyContent: "flex-end", animation: "kr-in 0.45s cubic-bezier(0.2,0.8,0.2,1) both" }}>
                          <div style={{ maxWidth: "86%", padding: "11px 14px", borderRadius: "18px 18px 4px 18px", background: "#FFFFFF", color: BUBBLE_TEXT, fontSize: 14.5, lineHeight: 1.55, boxShadow: "0 1px 2px oklch(0.4 0.05 300 / 0.18)" }}>
                            {m.text}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: "flex-end", animation: "kr-in 0.5s cubic-bezier(0.2,0.8,0.2,1) both" }}>
                        <div style={{ width: "94%", borderRadius: "18px 18px 4px 18px", background: "#FFFFFF", overflow: "hidden", boxShadow: "0 1px 2px oklch(0.4 0.05 300 / 0.18)" }}>
                          <img src={m.image} alt={m.area} style={{ display: "block", width: "100%", height: 132, objectFit: "cover" }} />
                          <div style={{ padding: "12px 13px" }}>
                            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 9 }}>
                              <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 700, fontSize: 14.5, color: BUBBLE_TEXT }}>{m.area}</span>
                              <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 16, color: "oklch(0.5 0.18 300)" }}>{m.price}</span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, fontSize: 12, color: "#5C4C77" }}>
                              {m.tags.map((tag) => (
                                <span key={tag} style={{ padding: "4px 8px", borderRadius: 8, background: "#F2F0F6" }}>{tag}</span>
                              ))}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "4px 10px", marginTop: 11, paddingTop: 10, borderTop: "1px solid #EAE6F0", fontSize: 12, color: "#6E6478" }}>
                              <span>{m.meta}</span>
                              <span style={{ color: "#2E86DE", fontWeight: 600, whiteSpace: "nowrap" }}>🔗 {t("צפייה במודעה")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {typing && (
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ display: "flex", gap: 5, padding: "13px 15px", borderRadius: "18px 18px 4px 18px", background: "#FFFFFF", boxShadow: "0 1px 2px oklch(0.4 0.05 300 / 0.18)" }}>
                        {[0, 0.2, 0.4].map((d) => (
                          <span key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "#A99CC0", animation: `kr-blink 1.2s ${d}s infinite` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ padding: "10px 12px 20px", borderTop: "1px solid oklch(0.5 0.05 300 / 0.14)", background: "#F6F2FB", display: "flex", alignItems: "center", gap: 10 }}>
                  <label style={{ flex: 1, minWidth: 0, position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type="text"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") sendDraft(); }}
                      onFocus={() => setDraftFocus(true)}
                      onBlur={() => setDraftFocus(false)}
                      placeholder={t(HINTS[hintIdx % HINTS.length])}
                      style={{
                        width: "100%", padding: "11px 14px", borderRadius: 999, background: "#FFFFFF",
                        border: `1px solid ${draftFocus ? PURPLE : "oklch(0.5 0.05 300 / 0.22)"}`,
                        fontFamily: "Assistant, sans-serif", fontSize: 13.5, color: "#372361", outline: "none",
                        boxShadow: draftFocus ? "0 0 0 4px oklch(0.62 0.2 300 / 0.16)" : "none"
                      }}
                    />
                  </label>
                  <button type="button" onClick={sendDraft} title={t("שליחה לקיריל")} className="kr-send" style={{ width: 38, height: 38, border: 0, padding: 0, borderRadius: "50%", background: PURPLE, display: "flex", alignItems: "center", justifyContent: "center", flex: "none", cursor: "pointer" }}>
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: 372, textAlign: "center", fontSize: 12.5, lineHeight: 1.5, color: c.muted }}>
            {t("בשליחת חיפוש אתם מסכימים ל")}
            <Link href="/legal#privacy" className="kr-link" style={{ color: c.accent }}>{t("מדיניות הפרטיות")}</Link>
          </div>
        </div>
      </section>

      <div aria-hidden="true" style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)", padding: "26px 0 8px", borderTop: `1px solid ${s.hairline}`, borderBottom: `1px solid ${s.hairline}`, marginTop: 40, background: s.marqBg }}>
        <div style={{ display: "flex", width: "max-content", gap: 44, fontFamily: "Heebo, sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.02em", paddingBottom: 26, animation: "kr-marq 30s linear infinite" }}>
          {[0, 1].map((rep) => (
            <div key={rep} style={{ display: "flex", gap: 44 }}>
              {MARQUEE.map((m, i) => (
                <span key={i} style={{ display: "flex", gap: 44, color: c.accent, whiteSpace: "nowrap" }}>
                  {t(m)}
                  <span style={{ color: mode === "dark" ? "oklch(0.82 0.17 62 / 0.75)" : "oklch(0.6 0.16 62 / 0.9)" }}>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="why" style={{ padding: "72px 40px", background: s.secBg, borderTop: `1px solid ${s.hairline}`, borderBottom: `1px solid ${s.hairline}` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 52, letterSpacing: "-0.03em", margin: "0 0 46px", lineHeight: 1.05, color: c.head }}>
            {t("למה דווקא קיריל")}
          </h2>
          <div className="kr-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 18 }}>
            <div style={{ gridColumn: "span 3", padding: "34px 32px", borderRadius: 24, background: s.bigCard, border: `1px solid ${s.bigCardBd}` }}>
              <div style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 27, marginBottom: 8, color: c.head }}>{t("מיקום מדויק באמת")}</div>
              <p style={{ margin: "0 0 22px", color: c.body, fontSize: 17, lineHeight: 1.55, maxWidth: 700 }}>
                {t("זו הנקודה שמפילה כל חיפוש דירה. בקיריל מגדירים בדיוק איפה, בשפה חופשית, בלי לסמן ידנית רשימות שכונות")}
              </p>
              <div className="kr-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 14 }}>
                {LOCATION_CARDS.map((card) => {
                  const Icon = ICONS[card.icon];
                  return (
                    <div key={card.title} style={{ display: "flex", flexDirection: "column", gap: 10, padding: "22px 20px 18px", borderRadius: 18, background: s.innerCard, border: `1px solid ${s.innerBd}` }}>
                      <div style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", gap: 11, color: c.head }}>
                        <span style={iconCircle(c)}><Icon /></span>
                        {t(card.title)}
                      </div>
                      <p style={{ margin: 0, color: c.sub, fontSize: 15.5, lineHeight: 1.45 }}>{t(card.body)}</p>
                      <Quote text={t(card.quote)} s={s} />
                    </div>
                  );
                })}
              </div>
            </div>

            {FEATURE_CARDS.map((card) => {
              const Icon = ICONS[card.icon];
              return (
                <div key={card.title} style={{ display: "flex", flexDirection: "column", padding: 32, borderRadius: 24, background: mode === "dark" ? "oklch(0.32 0.05 320 / 0.3)" : "#FFFFFF", border: `1px solid ${s.bigCardBd}` }}>
                  <div style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 10, display: "flex", alignItems: "center", gap: 11, color: c.head }}>
                    <span style={iconCircle(c)}><Icon /></span>
                    {t(card.title)}
                  </div>
                  <p style={{ margin: "0 0 20px", color: c.sub, fontSize: 16, lineHeight: 1.6 }}>{t(card.body)}</p>
                  {card.quote && <Quote text={t(card.quote)} kind={card.quoteKind} s={s} />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how" className="kr-sec" style={{ padding: "0 40px 72px", maxWidth: 1240, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 52, letterSpacing: "-0.03em", margin: "0 0 40px", lineHeight: 1.05, color: c.head }}>
          {t("איך זה עובד")}
        </h2>
        <div className="kr-steps" style={{ position: "relative", display: "flex", flexDirection: "column", padding: "4px 0" }}>
          {STEPS.map((stp, i) => {
            const left = stp.side === "user";
            const shift = left ? 56 : -56;
            const first = i === 0;
            const last = i === STEPS.length - 1;
            return (
              <div key={i}>
                <div data-step-block={i} style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 172px 1fr", alignItems: "center" }}>
                  <div
                    data-rail={shift}
                    style={{
                      position: "absolute",
                      top: first ? "calc(50% - 1px)" : 0,
                      bottom: last ? "calc(50% - 1px)" : 0,
                      left: "50%", marginLeft: -1, transform: `translateX(${shift}px)`, width: 2,
                      backgroundImage: railGrad, backgroundRepeat: "no-repeat", backgroundPosition: "top center",
                      backgroundSize: "100% 0%", pointerEvents: "none", opacity: 0.55
                    }}
                  />
                  <div className="kr-step-card" style={{ display: "flex", justifyContent: left ? "flex-start" : "flex-end", gridColumn: left ? 1 : 3, gridRow: 1 }}>
                    <div
                      data-reveal="bubble"
                      style={{
                        opacity: 0, maxWidth: 420, padding: "16px 20px 12px",
                        borderRadius: left ? "22px 22px 22px 6px" : "22px 22px 6px 22px",
                        background: left ? BUBBLE_USER : "#FFFFFF", boxShadow: s.bubbleShadow
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: left ? "#5B7A3A" : "#6E6478" }}>{t(stp.who)}</span>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: left ? "#5B7A3A" : "#6E6478", opacity: 0.5 }} />
                        <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 19, color: BUBBLE_TEXT }}>{t(stp.title)}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "#524475", textWrap: "pretty" }}>{t(stp.body)}</p>
                      <div style={{ marginTop: 6, fontSize: 11.5, color: "#6E6478", direction: "ltr", textAlign: left ? "left" : "right" }}>{stp.time}</div>
                    </div>
                  </div>
                  <div style={{ gridColumn: 2, gridRow: 1, display: "flex", justifyContent: "center", position: "relative", zIndex: 2, transform: `translateX(${shift}px)` }}>
                    <div
                      data-reveal="dot"
                      style={{
                        opacity: 0, width: 46, height: 46, borderRadius: "50%", background: s.dotBg,
                        border: `1.5px solid ${c.accent}`, boxShadow: "0 0 0 6px oklch(0.62 0.19 300 / 0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 15, color: c.accent
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
                {!last && (
                  <div className="kr-connector" style={{ display: "flex", justifyContent: "center", pointerEvents: "none" }}>
                    <svg width="112" height="62" viewBox="0 0 112 62" fill="none" style={{ display: "block", overflow: "visible", margin: "-2px 0" }}>
                      <path
                        data-draw="1"
                        d={left ? "M112,-1 C112,37 0,25 0,63" : "M0,-1 C0,37 112,25 112,63"}
                        stroke={c.accent}
                        strokeOpacity="0.55"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section id="reviews" style={{ padding: "0 40px 72px", maxWidth: 1240, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 52, letterSpacing: "-0.03em", margin: "0 0 52px", lineHeight: 1.05, color: c.head }}>
          {t("מה אומרים על קיריל")}
        </h2>
        <div className="kr-grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 24 }}>
          {trio.map((item, i) => (
            <div key={tPage * 3 + i} style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18, minHeight: 268, padding: "46px 28px 26px", borderRadius: 28, background: s.tCard, border: `1px solid ${s.tCardBd}`, boxShadow: s.cardShadow, animation: "kr-in 0.55s cubic-bezier(0.2,0.8,0.2,1) both" }}>
              <div style={{ position: "absolute", top: -26, right: 26, width: 66, height: 66, borderRadius: "50%", border: `5px solid ${s.tRing}`, overflow: "hidden", background: "linear-gradient(150deg, oklch(0.62 0.2 300), oklch(0.5 0.16 320))" }}>
                <img src={item.photo} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 7, paddingInlineEnd: 66, whiteSpace: "nowrap" }}>
                <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 17, color: s.tName }}>{item.name}</span>
                <span style={{ fontSize: 14.5, color: s.tCity }}>{t(item.city)}</span>
              </div>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: s.tQuote, textWrap: "pretty" }}>{item.quote}</p>
              <div style={{ display: "flex", gap: 3, marginTop: "auto", fontSize: 19, color: "#F2B23E", letterSpacing: 1 }}>
                {"★★★★★".split("").map((star, k) => <span key={k}>{star}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", direction: "rtl", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 30 }}>
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`עמוד ${i + 1}`}
              className="kr-dot"
              onClick={() => { clearInterval(rotRef.current); setTPage(i); }}
              style={{ height: 8, width: i === tPage ? 28 : 8, border: 0, padding: 0, borderRadius: 999, cursor: "pointer", background: i === tPage ? c.accent : c.cardBd }}
            />
          ))}
        </div>
      </section>

      <section id="faq" style={{ padding: "0 40px 72px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 52, letterSpacing: "-0.03em", margin: "0 0 32px", lineHeight: 1.05, color: c.head }}>
          {t("שאלות נפוצות")}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="kr-faq"
                style={{
                  borderRadius: 20,
                  background: isOpen ? c.cardHot : c.card,
                  border: `1px solid ${isOpen ? c.cardHotBd : c.cardBd}`,
                  boxShadow: isOpen ? s.cardShadow : "none",
                  overflow: "hidden", cursor: "pointer",
                  transition: "background 0.2s ease, border-color 0.2s ease"
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{ width: "100%", background: "none", border: 0, textAlign: "start", font: "inherit", color: "inherit", display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 22px" }}
                >
                  <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: "0.04em", color: s.faqNum, paddingTop: 3, minWidth: 22 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ flex: 1, fontFamily: "Heebo, sans-serif", fontWeight: 700, fontSize: 17.5, lineHeight: 1.35, color: s.faqQ }}>{item.q}</span>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "50%", background: c.chipBg, color: c.accent, flex: "none", transition: "transform 0.16s cubic-bezier(0.2,0.8,0.2,1)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <ChevronIcon />
                  </span>
                </button>
                <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0, transition: "grid-template-rows 0.18s cubic-bezier(0.3,0.95,0.3,1), opacity 0.18s ease" }}>
                  <div style={{ minHeight: 0, overflow: "hidden", paddingInlineStart: 58, paddingInlineEnd: 22 }}>
                    <div style={{ height: 1, background: c.cardBd, marginBottom: 16 }} />
                    <p style={{ margin: "0 0 18px", color: c.body, fontSize: 16.5, lineHeight: 1.68, textWrap: "pretty" }}>
                      {item.a.split("**").map((part, k) =>
                        k % 2 === 1
                          ? <strong key={k} style={{ fontWeight: 700, color: s.faqStrong }}>{part}</strong>
                          : <span key={k}>{part}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ padding: "0 40px 72px", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: 32, padding: "70px 48px 72px", textAlign: "center", background: s.ctaBg, border: `1px solid ${s.ctaBd}`, boxShadow: s.cardShadow }}>
          <h2 style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 54, letterSpacing: "-0.035em", margin: "0 0 14px", lineHeight: 1.04, color: s.ctaHead }}>
            {t("נמאס לכם לחפש ולהתאכזב?")}
          </h2>
          <p style={{ margin: "0 auto 32px", maxWidth: 540, fontSize: 19.5, lineHeight: 1.5, color: c.sub }}>
            {t("תנו לקיריל לעשות את העבודה. בלי הרשמה, בלי התחייבות")}
          </p>
          <a href={BOT_URL} className="kr-lift kr-orange" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 40px", borderRadius: 15, background: ORANGE, color: ORANGE_INK, fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 19.5, boxShadow: ORANGE_SHADOW }}>
            {t("קיריל, תמצא לי דירה")}
          </a>
        </div>
      </section>
    </div>
  );
}
