"use client";
import { useState } from "react";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { translator } from "../lib/i18n";
import { ORANGE, ORANGE_SHADOW, ORANGE_INK } from "../lib/theme";
import { TelegramIcon, InstagramIcon, MailIcon } from "./icons";

// Formspree endpoint. Submissions land in the Formspree inbox and are forwarded
// to the address configured there — no backend of our own needed.
const FORM_ENDPOINT = "https://formspree.io/f/xjgrvwnl";

const CHANNELS = [
  { icon: <TelegramIcon size={20} />, title: "טלגרם", sub: "הדרך המהירה ביותר", url: "https://t.me/Rent_tlv_bot" },
  { icon: <MailIcon size={20} />, title: "support@keyreal.co.il", sub: "תמיכה ופניות כלליות", copy: "support@keyreal.co.il" },
  { icon: <MailIcon size={20} />, title: "legal@keyreal.co.il", sub: "פניות בנושא זכויות ותוכן", copy: "legal@keyreal.co.il" },
  { icon: <InstagramIcon size={20} />, title: "אינסטגרם", sub: "@keyreal_bot", url: "https://www.instagram.com/keyreal_bot" }
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Declared outside the page component so typing never remounts the input.
function Field({ c, t, label, name, value, onChange, type = "text", area, required, placeholder, full, invalid, describedBy }) {
  const base = {
    fontFamily: "Assistant, sans-serif",
    fontSize: 15.5,
    color: c.text,
    background: c.inputBg,
    border: `1px solid ${c.inputBd}`,
    borderRadius: 12,
    padding: "0 14px",
    minHeight: 48,
    outline: "none",
    width: "100%"
  };
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 14.5, color: c.sub, gridColumn: full ? "1 / -1" : "auto" }}>
      <span style={{ fontWeight: 600 }}>
        {t(label)}
        {required ? <span style={{ color: c.accent, fontWeight: 800 }}> *</span> : null}
      </span>
      {area ? (
        <textarea
          name={name}
          required={required}
          aria-required={required || undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? describedBy : undefined}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={t(placeholder)}
          style={{ ...base, padding: "12px 14px", minHeight: 120, resize: "vertical" }}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={t(placeholder)}
          required={required}
          aria-required={required || undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? describedBy : undefined}
          style={base}
        />
      )}
    </label>
  );
}

export default function ContactView() {
  const { c, mode, lang } = useSite();
  const t = translator(lang);
  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [alert, setAlert] = useState("");
  const [bad, setBad] = useState({});
  const [copied, setCopied] = useState("");
  const OK = mode === "dark" ? "oklch(0.82 0.15 150)" : "oklch(0.45 0.15 150)";
  const OK_BG = mode === "dark" ? "oklch(0.55 0.14 150 / 0.22)" : "oklch(0.62 0.14 150 / 0.14)";

  // Clicking a mailto: link hands the address to the OS mail handler, which on
  // some systems hangs the browser. Copying the address avoids that entirely.
  const copyAddress = (addr) => {
    const done = () => { setCopied(addr); setTimeout(() => setCopied(""), 2200); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(addr).then(done).catch(done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = addr;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-999px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      done();
    }
  };
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (alert) { setAlert(""); setStatus("idle"); setBad({}); }
  };

  const send = async (e) => {
    e.preventDefault();
    const missing = {
      name: !form.name.trim(),
      email: !form.email.trim(),
      message: !form.message.trim()
    };
    if (missing.name || missing.email || missing.message) {
      setBad(missing);
      setStatus("error");
      setAlert(t("אנא מלאו את כל שדות החובה המסומנים בכוכבית"));
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setBad({ email: true });
      setStatus("error");
      setAlert(t("כתובת הדוא״ל לא נראית תקינה"));
      return;
    }
    setBad({});

    setStatus("sending");
    setAlert("");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target)
      });
      if (res.ok) {
        setForm({ name: "", email: "", subject: "", phone: "", message: "" });
        setStatus("ok");
        setAlert(t("ההודעה נשלחה. נחזור אליכם בהקדם"));
      } else {
        setStatus("error");
        setAlert(t("משהו השתבש בשליחה. נסו שוב, או כתבו לנו בטלגרם"));
      }
    } catch (err) {
      setStatus("error");
      setAlert(t("שגיאת רשת. נסו שוב, או כתבו לנו בטלגרם"));
    }
  };

  const sending = status === "sending";

  return (
    <>
      <section className="kr-sec" style={{ padding: "70px 40px 30px", maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Heebo, sans-serif", fontWeight: 900, fontSize: 54, letterSpacing: "-0.035em", margin: "0 0 14px", lineHeight: 1.05, color: c.head }}>
          {t("נשמח לשמוע מכם")}
        </h1>
        <p style={{ margin: "0 auto", maxWidth: 540, fontSize: 19, lineHeight: 1.55, color: c.sub }}>
          {t("שאלה, תקלה או הצעה לשיתוף פעולה. אנחנו עונים מהר")}
        </p>
      </section>

      <section className="kr-sec" style={{ padding: "20px 40px 80px", maxWidth: 1240, margin: "0 auto" }}>
        <div className="kr-contact" style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 22, alignItems: "start" }}>
          <form onSubmit={send} noValidate style={{ padding: 30, borderRadius: 24, background: c.card, border: `1px solid ${c.cardBd}` }}>
            <div className="kr-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field c={c} t={t} label="שם מלא" name="name" value={form.name} onChange={set("name")} placeholder="לדוגמה: ישראל ישראלי" required invalid={bad.name} describedBy="kr-form-alert" />
              <Field c={c} t={t} label="דוא״ל" name="email" type="email" value={form.email} onChange={set("email")} placeholder="name@example.com" required invalid={bad.email} describedBy="kr-form-alert" />
              <Field c={c} t={t} label="נושא" name="subject" value={form.subject} onChange={set("subject")} placeholder="על מה הפנייה?" />
              <Field c={c} t={t} label="טלפון" name="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="05X-XXXXXXX" />
              <Field c={c} t={t} label="ההודעה שלכם" name="message" value={form.message} onChange={set("message")} placeholder="ספרו לנו בקצרה במה נוכל לעזור" area required full invalid={bad.message} describedBy="kr-form-alert" />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
              <div style={{ fontSize: 13.5, color: c.muted }}>
                {t("מענה בדרך כלל תוך")} <strong style={{ color: c.accent, fontWeight: 700 }}>{t("24 שעות")}</strong>
              </div>
              <button
                type="submit"
                disabled={sending}
                className={sending ? "" : "kr-lift kr-orange"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  minWidth: 168,
                  minHeight: 54,
                  padding: "0 26px",
                  border: "none",
                  borderRadius: 14,
                  background: ORANGE,
                  color: ORANGE_INK,
                  fontFamily: "Heebo, sans-serif",
                  fontWeight: 800,
                  fontSize: 17.5,
                  opacity: sending ? 0.72 : 1,
                  cursor: sending ? "not-allowed" : "pointer",
                  boxShadow: ORANGE_SHADOW
                }}
              >
                {sending ? (
                  <span
                    aria-hidden="true"
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.5)",
                      borderTopColor: "#FFFFFF",
                      animation: "kr-spin 0.8s linear infinite"
                    }}
                  />
                ) : null}
                {sending ? t("שולח…") : t("שליחה")}
              </button>
            </div>

            {alert ? (
              <div
                id="kr-form-alert"
                role={status === "error" ? "alert" : "status"}
                aria-live={status === "error" ? "assertive" : "polite"}
                style={{
                  marginTop: 14,
                  padding: "12px 14px",
                  borderRadius: 12,
                  fontSize: 14.5,
                  border: `1px solid ${status === "error" ? "oklch(0.6 0.18 25 / 0.35)" : c.cardHotBd}`,
                  background: status === "error" ? "oklch(0.6 0.18 25 / 0.08)" : c.chipBg,
                  color: status === "error" ? "oklch(0.55 0.19 25)" : c.accent
                }}
              >
                {status === "ok" ? "✔ " : ""}
                {alert}
              </div>
            ) : null}

            <div style={{ marginTop: 14, fontSize: 13, color: c.muted, textAlign: "center" }}>
              {t("שליחת הטופס כפופה ל")}
              <Link href="/legal#privacy" className="kr-link" style={{ color: c.accent }}>{t("מדיניות הפרטיות")}</Link>
            </div>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CHANNELS.map((ch) => {
              const isCopy = !!ch.copy;
              const Tag = isCopy ? "button" : "a";
              const extra = isCopy
                ? { type: "button", onClick: () => copyAddress(ch.copy), title: t("העתקת הכתובת") }
                : { href: ch.url, target: "_blank", rel: "noopener" };
              return (
              <Tag
                key={ch.title}
                {...extra}
                className="kr-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "18px 20px",
                  borderRadius: 18,
                  background: isCopy && copied === ch.copy ? OK_BG : c.card,
                  border: `1px solid ${isCopy && copied === ch.copy ? OK : c.cardBd}`,
                  color: c.text,
                  transition: "background 0.2s ease, border-color 0.2s ease",
                  font: "inherit",
                  textAlign: "start",
                  width: "100%",
                  cursor: "pointer"
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: isCopy && copied === ch.copy ? OK_BG : c.chipBg,
                    color: isCopy && copied === ch.copy ? OK : c.accent,
                    flex: "none",
                    fontSize: 20,
                    fontWeight: 900,
                    transition: "background 0.2s ease, color 0.2s ease"
                  }}
                >
                  {isCopy && copied === ch.copy ? "✓" : ch.icon}
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 700, fontSize: 16.5 }}>{t(ch.title)}</span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: isCopy && copied === ch.copy ? 700 : 400,
                      color: isCopy && copied === ch.copy ? OK : c.muted
                    }}
                  >
                    {isCopy && copied === ch.copy ? t("הכתובת הועתקה") : t(ch.sub)}
                  </span>
                </span>
              </Tag>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
