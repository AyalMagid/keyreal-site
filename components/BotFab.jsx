"use client";
import { useEffect, useState } from "react";
import { useSite } from "../lib/site-context";
import { translator } from "../lib/i18n";
import { BOT_URL } from "../lib/theme";

// Floating Telegram button. Lives in the shell so it shows on every route,
// and only after the reader has scrolled past the first screen.
export default function BotFab() {
  const { lang } = useSite();
  const t = translator(lang);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <a
      href={BOT_URL}
      target="_blank"
      rel="noopener"
      className="kr-fab"
      title={t("לקיריל בטלגרם")}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: 88,
        height: 88,
        borderRadius: "50%",
        background: "#FFFFFF",
        border: "2px solid oklch(0.7 0.19 300)",
        boxShadow: "0 16px 40px oklch(0.35 0.12 300 / 0.45)"
      }}
    >
      <img src="/assets/logo-sm.png" alt="קיריל" width={44} height={44} style={{ objectFit: "contain", display: "block" }} />
      <span style={{ fontFamily: "Heebo, sans-serif", fontWeight: 800, fontSize: 15, color: "#5B2D82", lineHeight: 1 }}>
        {t("לקיריל")}
      </span>
    </a>
  );
}
