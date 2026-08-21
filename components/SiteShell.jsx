"use client";
import { useSite } from "../lib/site-context";
import Header from "./Header";
import Footer from "./Footer";
import BotFab from "./BotFab";

// One shell for every route: the header and footer mount once and survive
// navigation, so moving between pages costs nothing.
export default function SiteShell({ children }) {
  const { c, dir } = useSite();
  return (
    <div
      dir={dir}
      style={{
        fontFamily: "Assistant, Heebo, Helvetica, sans-serif",
        background: c.bg,
        color: c.text,
        minHeight: "100vh",
        overflowX: "clip",
        position: "relative",
        // Hover colors live in CSS (see layout.jsx) and read these vars.
        "--kr-head": c.head,
        "--kr-accent": c.accent,
        "--kr-circle-hov": c.circleHov,
        "--kr-chip": c.chipBg,
        "--kr-nav-hov": c.navHoverBg,
        "--kr-nav-hov-text": c.navHoverText,
        "--kr-hot-bd": c.cardHotBd,
        "--kr-card-hot": c.cardHot,
        "--kr-foot-circle-hov": c.footCircleHov,
        "--kr-foot-accent": c.footAccent
      }}
    >
      <a href="#main" className="kr-skip">{dir === "rtl" ? "דלגו לתוכן הראשי" : "Skip to main content"}</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <BotFab />
    </div>
  );
}
