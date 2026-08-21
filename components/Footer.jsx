"use client";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { translator } from "../lib/i18n";
import { TelegramIcon, InstagramIcon, MailIcon } from "./icons";

const COLUMNS = [
  { title: "עמודים", items: [["בית", "/"], ["חבילות", "/plans"], ["צור קשר", "/contact"], ["בלוג", "/blog"]] },
  { title: "בעמוד הבית", items: [["למה דווקא קיריל", "/#why"], ["איך זה עובד", "/#how"], ["ביקורות", "/#reviews"], ["שאלות נפוצות", "/#faq"]] },
  { title: "משפטי", items: [["תנאי שירות", "/legal#terms"], ["מדיניות פרטיות", "/legal#privacy"], ["מדיניות ביטולים", "/legal#cancellation"], ["הצהרת נגישות", "/legal#accessibility"]] }
];

export default function Footer() {
  const { c, lang } = useSite();
  const t = translator(lang);
  const social = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: `1px solid ${c.footCircleBd}`,
    background: c.footCircleBg,
    color: c.footMuted
  };

  return (
    <footer style={{ borderTop: `1px solid ${c.footBd}`, background: c.footBg, padding: "40px 40px 30px" }}>
      <div className="kr-foot-grid" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <img src="/assets/logo-sm.png" alt="קיריל" width={34} height={34} style={{ objectFit: "contain", display: "block" }} />
            <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 18, color: c.footHead }}>{t("קיריל")}</span>
          </div>
          <p style={{ margin: 0, color: c.footMuted, fontSize: 14.5, lineHeight: 1.6, maxWidth: 280 }}>
            {t("הבוט למציאת דירות בישראל. הדירות הטובות מגיעות אליכם ראשונות")}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <a href="https://t.me/Rent_tlv_bot" title={t("טלגרם")} className="kr-fcircle" style={social}><TelegramIcon /></a>
            <a href="https://www.instagram.com/keyreal_bot" title={t("אינסטגרם")} className="kr-fcircle" style={social}><InstagramIcon /></a>
            <a href="#" data-kr-copy="support@keyreal.co.il" title={t("העתקת כתובת הדוא״ל")} aria-label={t("העתקת כתובת הדוא״ל")} className="kr-fcircle" style={social}><MailIcon /></a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 15, color: c.footHead, marginBottom: 2 }}>
              {t(col.title)}
            </div>
            {col.title === "משפטי" && (
              <button
                type="button"
                data-kr-a11y-open
                aria-expanded="false"
                aria-controls="kr-a11y-panel"
                className="kr-flink"
                style={{ display: "block", width: "100%", textAlign: "start", border: 0, background: "none", padding: 0, fontFamily: "inherit", cursor: "pointer", color: c.footMuted, fontSize: 14.5 }}
              >
                {t("התאמות נגישות")}
              </button>
            )}
            {col.items.map(([label, href]) => (
              <Link key={href} href={href} className="kr-flink" style={{ color: c.footMuted, fontSize: 14.5 }}>
                {t(label)}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: 1240,
          margin: "30px auto 0",
          paddingTop: 22,
          borderTop: `1px solid ${c.footBd}`,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          color: c.footMuted,
          fontSize: 13.5
        }}
      >
        <span>{t("© 2026 Keyreal. כל הזכויות שמורות")}</span>
        <span>support@keyreal.co.il</span>
      </div>
    </footer>
  );
}
