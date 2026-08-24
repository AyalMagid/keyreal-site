"use client";
import { useState } from "react";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { translator } from "../lib/i18n";
import { BOT_URL, ORANGE, ORANGE_HOVER, ORANGE_SHADOW, ORANGE_INK } from "../lib/theme";

const FEATURES = [
  "חיפוש אישי ומיידי",
  "התראות תוך דקות",
  "סינון כמעט לפי כל דבר",
  "כל הדירות על מפה חיה",
  "ערים, שכונות, רחובות ונקודות עניין",
  "השוואת מחירים באזור",
  "הגדרה של איפה כן ואיפה לא",
  "תמיכה בעברית ובאנגלית"
];

const PLANS = [
  { name: "שבוע", price: "39", was: "", note: "", badge: "", hot: false, url: `${BOT_URL}?start=buy_weekly` },
  { name: "חודש", price: "69", was: "99", note: "מחיר מבצע לזמן מוגבל", badge: "הכי נבחר", hot: true, url: `${BOT_URL}?start=buy_monthly` },
  { name: "2 חודשים", price: "109", was: "149", note: "רק כ-₪54 לחודש", badge: "הכי משתלם", hot: false, url: `${BOT_URL}?start=buy_two_monthly` }
];

function PlanCard({ plan }) {
  const { c, lang } = useSite();
  const t = translator(lang);
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        padding: plan.hot ? "34px 28px 28px" : "30px 28px",
        borderRadius: 24,
        background: plan.hot ? c.cardHot : c.card,
        border: `1px solid ${hover ? c.planHotBd : plan.hot ? c.cardHotBd : c.cardBd}`,
        boxShadow: hover ? c.planGlow : plan.hot ? "0 18px 44px oklch(0.5 0.16 300 / 0.18)" : "none",
        transform: hover ? "scale(1.035)" : "none",
        zIndex: hover ? 4 : plan.hot ? 2 : 1,
        transition: "transform 0.25s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.25s ease, border-color 0.25s ease"
      }}
    >
      {plan.hot ? (
        <img
          src="/assets/kiril-wink.png"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", right: 3, top: -70, width: 78, height: "auto", display: "block", pointerEvents: "none", zIndex: 2 }}
        />
      ) : null}

      {plan.badge ? (
        <div
          style={{
            position: "absolute",
            top: -13,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "5px 14px",
            borderRadius: 999,
            background: plan.hot ? ORANGE : "oklch(0.62 0.2 300)",
            color: "#FFFFFF",
            fontFamily: "Heebo, sans-serif",
            fontWeight: 800,
            fontSize: 12.5,
            whiteSpace: "nowrap"
          }}
        >
          {t(plan.badge)}
        </div>
      ) : null}

      <div style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 21, color: c.head }}>{t(plan.name)}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, minHeight: 46 }}>
        <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 46, lineHeight: 1, letterSpacing: "-0.03em", color: c.head }}>
          ₪{plan.price}
        </span>
        {plan.was ? (
          <span
            style={{
              fontFamily: "Heebo, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              lineHeight: 1,
              color: c.muted,
              textDecoration: "line-through",
              textDecorationThickness: "2px",
              textDecorationColor: "currentColor"
            }}
          >
            ₪{plan.was}
          </span>
        ) : null}
      </div>
      {/* Always rendered so all three cards keep the same height. */}
      <div style={{ fontSize: 14, color: c.accent, fontWeight: 600, marginTop: -10, minHeight: 21 }}>{plan.note ? t(plan.note) : ""}</div>

      <a
        href={plan.url}
        className={plan.hot ? "kr-lift kr-orange" : "kr-lift kr-ghost"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "auto",
          minHeight: 52,
          borderRadius: 14,
          background: plan.hot ? ORANGE : "transparent",
          border: plan.hot ? "none" : `1.5px solid ${c.cardHotBd}`,
          color: plan.hot ? ORANGE_INK : c.accent,
          fontFamily: "Heebo, sans-serif",
          fontWeight: 800,
          fontSize: 17,
          boxShadow: plan.hot ? ORANGE_SHADOW : "none"
        }}
      >
        {t("בוא נתחיל")}
      </a>
    </div>
  );
}

export default function PlansView() {
  const { c, lang } = useSite();
  const t = translator(lang);

  return (
    <>
      <section className="kr-sec" style={{ padding: "70px 40px 40px", maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
        <h1 className="kr-plans-h1" style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 54, letterSpacing: "-0.035em", margin: "0 auto", lineHeight: 1.05, color: c.head }}>
          {t("בחרו את החבילה שמתאימה לכם")}
        </h1>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            background: c.chipBg,
            color: c.accent,
            fontFamily: "Heebo, sans-serif",
            fontWeight: 700,
            fontSize: 13.5,
            marginTop: 16
          }}
        >
          {t("תשלום חד פעמי · בלי חיוב חוזר")}
        </div>
      </section>

      <section className="kr-sec" style={{ padding: "8px 40px 0", maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ padding: "30px 34px 32px", borderRadius: 24, background: c.card, border: `1px solid ${c.cardBd}` }}>
          <div style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 20, color: c.head, textAlign: "center", marginBottom: 22 }}>
            {t("מה תקבלו בכל חבילה?")}
          </div>
          <div
            className="kr-incl"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, max-content)", justifyContent: "center", columnGap: 56, rowGap: 14, margin: "0 auto" }}
          >
            {FEATURES.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15.5, lineHeight: 1.5, color: c.body }}>
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none",
                    width: 20, height: 20, borderRadius: "50%", background: c.accent,
                    color: "#FFFFFF", fontSize: 11, fontWeight: 800, lineHeight: 1
                  }}
                >
                  ✓
                </span>
                <span>{t(f)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-sec" style={{ padding: "0 40px 70px", maxWidth: 1240, margin: "0 auto" }}>
        <div className="kr-plans-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 34, alignItems: "stretch", marginTop: 48 }}>
          {PLANS.map((p) => <PlanCard key={p.name} plan={p} />)}
        </div>
        <div
          style={{
            margin: "26px auto 0",
            maxWidth: 780,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "4px 8px",
            padding: "20px 28px",
            lineHeight: 1.5,
            borderRadius: 18,
            background: c.card,
            border: `1px solid ${c.cardBd}`,
            textAlign: "center"
          }}
        >
          <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 700, fontSize: 16.5, color: c.head }}>
            {t("לא משנה באיזו חבילה בחרתם, אם אחרי חודשיים בתשלום עדיין לא מצאתם דירה")}
          </span>
          <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 16.5, color: ORANGE }}>
            {t("תקבלו חודש נוסף עלינו 🎁")}
          </span>
          <div style={{ width: "100%", marginTop: 8, fontSize: 12.5, lineHeight: 1.55, color: c.muted }}>
            {t("*ההטבה חלה על תשלומים שבוצעו החל מ־22.8.2026. תשלומים קודמים אינם נכללים בחישוב.")}
          </div>
        </div>

        <p style={{ margin: "30px auto 0", maxWidth: 820, textAlign: "center", fontSize: 14, lineHeight: 1.7, color: c.muted }}>
          הרכישה כפופה ל<Link href="/legal#terms" className="kr-link" style={{ color: c.accent }}>תנאי השירות</Link>,{" "}
          <Link href="/legal#privacy" className="kr-link" style={{ color: c.accent }}>מדיניות הפרטיות</Link> ו
          <Link href="/legal#cancellation" className="kr-link" style={{ color: c.accent }}>מדיניות הביטולים</Link>. רכישת חבילת חיפוש מבוססת על תיאור החבילה כפי שהוצג למשתמש בעת הרכישה, ולא על תשובות, הסברים או דוגמאות שנמסרו על ידי הבוט
        </p>
      </section>
    </>
  );
}
