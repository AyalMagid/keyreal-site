"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "../lib/site-context";
import { translator } from "../lib/i18n";
import { BOT_URL } from "../lib/theme";

const NAV = [
  { he: "למה דווקא קיריל", href: "/#why" },
  { he: "איך זה עובד", href: "/#how" },
  { he: "חבילות", href: "/plans" },
  { he: "צור קשר", href: "/contact" },
  { he: "בלוג", href: "/blog" }
];

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
        style={menuOpen ? {
          display: "flex", alignItems: "center", gap: 16, padding: "15px 4px",
          fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 25, letterSpacing: "-0.02em",
          color: c.head, borderBottom: `1px solid ${c.headerBd}`, whiteSpace: "nowrap"
        } : { padding: "9px 4px", whiteSpace: "nowrap", transition: "color 0.15s ease" }}
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
          height: "calc(100dvh - 65px)",
          maxHeight: "calc(100dvh - 65px)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          padding: "20px 20px 24px",
          fontSize: 17,
          color: c.sub,
          background: c.flat,
          animation: "kr-sheet-in 0.28s cubic-bezier(0.2,0.9,0.25,1) both"
        }}
      >
        {NAV.map(navLink)}
        <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 22 }} className="kr-mpills">
        <button type="button" onClick={toggleTheme} className="kr-mrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, flex: 1, minWidth: 0, padding: "12px 8px", borderRadius: 14, border: `1px solid ${c.cardBd}`, background: c.card, color: c.sub, fontSize: 13.5, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", opacity: 0.75 }} aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" /></svg>
          <span>{t(c.themeRow)}</span>
        </button>
        <button type="button" onClick={toggleLang} className="kr-mrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, flex: 1, minWidth: 0, padding: "12px 8px", borderRadius: 14, border: `1px solid ${c.cardBd}`, background: c.card, color: c.sub, fontSize: 13.5, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", opacity: 0.75 }} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3.5 9.5h17M3.5 14.5h17" /><path d="M12 3c2.6 2.4 2.6 15.6 0 18M12 3C9.4 5.4 9.4 18.6 12 21" /></svg>
          <span>{lang === "en" ? "עברית" : "English"}</span>
        </button>
        <button type="button" data-kr-a11y-open aria-expanded="false" aria-controls="kr-a11y-panel" className="kr-mrow" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, flex: 1, minWidth: 0, padding: "12px 8px", borderRadius: 14, border: `1px solid ${c.cardBd}`, background: c.card, color: c.sub, fontSize: 13.5, fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", opacity: 0.75 }} aria-hidden="true"><circle cx="12" cy="4.2" r="1.7" fill="currentColor" stroke="none" /><path d="M4.5 8.2h15M9.4 8.2 8.2 21M14.6 8.2 15.8 21M8.7 14h6.6" /></svg>
          <span>{t("נגישות")}</span>
        </button>
        </div>
        <a href={BOT_URL} style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12, minHeight: 54, borderRadius: 15, background: c.accent, color: "#FFFFFF", fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 17.5 }}>
          {t("התחילו עכשיו בחינם")}
        </a>
      </nav>
    </header>
  );
}
