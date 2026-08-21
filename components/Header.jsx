"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "../lib/site-context";
import { translator } from "../lib/i18n";
import { BOT_URL } from "../lib/theme";

const NAV = [
  { he: "למה דווקא קיריל", href: "/#why", icon: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /> },
  { he: "איך זה עובד", href: "/#how", icon: <><circle cx="5" cy="7" r="1.6" /><circle cx="5" cy="17" r="1.6" /><path d="M10 7h9M10 17h9" /></> },
  { he: "חבילות", href: "/plans", icon: <><path d="M20.6 12.6 12.4 20.8a2 2 0 0 1-2.8 0l-6.4-6.4a2 2 0 0 1 0-2.8l8.2-8.2 9.2 1z" /><circle cx="16.4" cy="7.6" r="1.4" /></> },
  { he: "צור קשר", href: "/contact", icon: <><rect x="2.5" y="4.5" width="19" height="15" rx="3" /><path d="M3.5 6.5 12 13l8.5-6.5" /></> },
  { he: "בלוג", href: "/blog", icon: <><path d="M4 4.5h9a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H4z" /><path d="M20 4.5h-3a3 3 0 0 0-1 .2V20a2.5 2.5 0 0 1 2.5-2.5H20z" /></> }
];

// One row in the mobile sheet: icon, label, nothing else.
const RowIcon = ({ children }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", opacity: 0.75 }} aria-hidden="true">
    {children}
  </svg>
);

const rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "13px 6px",
  color: "inherit",
  fontSize: 17,
  borderRadius: 10,
  border: 0,
  background: "none",
  width: "100%",
  textAlign: "start",
  fontFamily: "inherit",
  cursor: "pointer"
};

const circle = (c) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: `1px solid ${c.circleBd}`,
  background: c.circleBg,
  flex: "none",
  lineHeight: 1
});

export default function Header() {
  const { c, lang, toggleTheme, toggleLang } = useSite();
  const t = translator(lang);
  const path = usePathname();
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const on = (href, active) => hovered === href || (hovered === null && active);

  // Close the mobile menu on route change and on Escape.
  useEffect(() => setMenuOpen(false), [path]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const navLink = (item) => {
    const active = item.href.startsWith("/") && !item.href.includes("#") && path === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        onClick={() => setMenuOpen(false)}
        onMouseEnter={() => setHovered(item.href)}
        onMouseLeave={() => setHovered(null)}
        style={{ padding: "9px 4px", whiteSpace: "nowrap", transition: "color 0.15s ease" }}
      >
        {/* The invisible bold copy reserves the width, so going bold on hover
            never nudges the neighbouring tabs. */}
        <span style={{ display: "grid" }}>
          <span aria-hidden="true" style={{ gridArea: "1 / 1", fontWeight: 600, visibility: "hidden" }}>{t(item.he)}</span>
          <span
            style={{
              gridArea: "1 / 1",
              justifySelf: "center",
              transition: "color 0.15s ease, font-weight 0.15s ease",
              fontWeight: on(item.href, active) ? 600 : 400,
              color: on(item.href, active) ? c.navHoverText : "inherit"
            }}
          >
            {t(item.he)}
          </span>
        </span>
      </Link>
    );
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "16px 40px",
        background: c.headerBg,
        backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${c.headerBd}`
      }}
    >
      <Link href="/" className="kr-logo" style={{ display: "flex", alignItems: "center", gap: 12, color: c.text }}>
        <img src="/assets/logo-sm.png" alt="קיריל" width={40} height={40} style={{ objectFit: "contain", display: "block" }} />
        <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em" }}>
          {t("קיריל")}
        </span>
      </Link>

      <nav className="kr-nav-desktop" aria-label={lang === "en" ? "Main" : "ניווט ראשי"} style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 15, color: c.sub }}>
        {NAV.map(navLink)}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 9, flex: "none" }}>
        <button
          type="button"
          data-kr-a11y-open
          className="kr-ctl"
          aria-expanded="false"
          aria-controls="kr-a11y-panel"
          aria-label={lang === "en" ? "Accessibility options" : "אפשרויות נגישות"}
          title={lang === "en" ? "Accessibility options" : "אפשרויות נגישות"}
          style={{ ...circle(c), color: c.text, cursor: "pointer" }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="4.2" r="1.9" fill="currentColor" stroke="none" />
            <path d="M4.5 8.2h15" />
            <path d="M9.4 8.2 8.2 21" />
            <path d="M14.6 8.2 15.8 21" />
            <path d="M8.7 14h6.6" />
          </svg>
        </button>
        <button type="button" onClick={toggleTheme} title={c.themeTitle} aria-label={c.themeTitle} className="kr-circle kr-ctl" style={{ ...circle(c), fontSize: 17, cursor: "pointer" }}>
          <span aria-hidden="true">{c.themeIcon}</span>
        </button>
        <button
          type="button"
          onClick={toggleLang}
          className="kr-circle kr-ctl"
          title={lang === "en" ? "עברית" : "English"}
          aria-label={lang === "en" ? "מעבר לעברית" : "Switch to English"}
          style={{
            ...circle(c),
            fontFamily: "Heebo, sans-serif",
            fontWeight: 800,
            fontSize: 13.5,
            letterSpacing: "0.02em",
            color: c.text,
            cursor: "pointer"
          }}
        >
          {lang === "en" ? "עב" : "EN"}
        </button>
        <button
          type="button"
          className="kr-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="kr-mobile-nav"
          aria-label={menuOpen ? (lang === "en" ? "Close menu" : "סגירת התפריט") : (lang === "en" ? "Open menu" : "פתיחת התפריט")}
          style={{ ...circle(c), display: "none", color: c.text, cursor: "pointer" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <nav
        id="kr-mobile-nav"
        className="kr-nav-mobile"
        aria-label={lang === "en" ? "Main" : "ניווט ראשי"}
        hidden={!menuOpen}
        style={{
          position: "absolute",
          top: "100%",
          insetInline: 0,
          flexDirection: "column",
          gap: 2,
          padding: "10px 18px 18px",
          background: c.flat,
          borderBottom: `1px solid ${c.cardBd}`,
          boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
          color: c.sub,
          animation: "kr-sheet-in 0.24s cubic-bezier(0.2,0.9,0.25,1) both"
        }}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="kr-mrow"
            onClick={() => setMenuOpen(false)}
            style={rowStyle}
          >
            <RowIcon>{item.icon}</RowIcon>
            <span>{t(item.he)}</span>
          </Link>
        ))}

        <div style={{ height: 1, background: c.cardBd, margin: "8px 0" }} />

        <button type="button" onClick={toggleTheme} className="kr-mrow" style={rowStyle}>
          <RowIcon><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" /></RowIcon>
          <span>{t(c.themeRow)}</span>
        </button>
        <button type="button" onClick={toggleLang} className="kr-mrow" style={rowStyle}>
          <RowIcon><circle cx="12" cy="12" r="9" /><path d="M3.5 9.5h17M3.5 14.5h17" /><path d="M12 3c2.6 2.4 2.6 15.6 0 18M12 3C9.4 5.4 9.4 18.6 12 21" /></RowIcon>
          <span>{lang === "en" ? "עברית" : "English"}</span>
        </button>
        <button type="button" data-kr-a11y-open aria-expanded="false" aria-controls="kr-a11y-panel" className="kr-mrow" style={rowStyle}>
          <RowIcon><circle cx="12" cy="4.2" r="1.7" fill="currentColor" stroke="none" /><path d="M4.5 8.2h15M9.4 8.2 8.2 21M14.6 8.2 15.8 21M8.7 14h6.6" /></RowIcon>
          <span>{t("התאמות נגישות")}</span>
        </button>
      </nav>
    </header>
  );
}
