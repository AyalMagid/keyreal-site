"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { THEMES } from "./theme";

const SiteCtx = createContext(null);

export function SiteProvider({ children }) {
  // The inline script in <head> reads localStorage before first paint and
  // stashes the result on window, so the first render is already correct.
  const [mode, setMode] = useState(() =>
    typeof window !== "undefined" && window.__krTheme ? window.__krTheme : "light"
  );
  const [lang, setLang] = useState(() =>
    typeof window !== "undefined" && window.__krLang ? window.__krLang : "he"
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.documentElement.style.backgroundColor = THEMES[mode].flat;
  }, [mode, lang]);

  const value = useMemo(() => ({
    mode,
    lang,
    c: THEMES[mode],
    dir: lang === "en" ? "ltr" : "rtl",
    toggleTheme() {
      const next = mode === "dark" ? "light" : "dark";
      setMode(next);
      try { localStorage.setItem("keyreal-theme", next); } catch (e) {}
    },
    toggleLang() {
      const next = lang === "en" ? "he" : "en";
      setLang(next);
      try { localStorage.setItem("keyreal-lang", next); } catch (e) {}
    }
  }), [mode, lang]);

  return <SiteCtx.Provider value={value}>{children}</SiteCtx.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteCtx);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
