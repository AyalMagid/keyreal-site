/* Keyreal accessibility panel.
   Self-mounting: no markup needed on the page, no third-party service, no network calls.
   Everything it does is CSS the user can turn off, and the choice persists in localStorage. */
(function () {


  var KEY = "keyreal-a11y";
  var DEFAULTS = { zoom: 0, contrast: false, links: false, still: false, cursor: false };
  var state = load();

  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      var out = {};
      for (var k in DEFAULTS) out[k] = typeof raw[k] === typeof DEFAULTS[k] ? raw[k] : DEFAULTS[k];
      return out;
    } catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  var ZOOMS = [1, 1.12, 1.25, 1.4];

  function host() { return document.body || document.documentElement; }

  function rgb(s) {
    var m = String(s).match(/[\d.]+/g);
    if (!m) return null;
    return { r: +m[0], g: +m[1], b: +m[2], a: m.length > 3 ? parseFloat(m[3]) : 1 };
  }
  function lin(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function lum(c) { return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b); }
  function ratio(a, b) {
    var l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  // nearest ancestor that actually paints a background
  function bgOf(el) {
    for (var n = el; n && n.nodeType === 1; n = n.parentElement) {
      var c = rgb(getComputedStyle(n).backgroundColor);
      if (c && c.a >= 0.85) return c;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  }
  function hasOwnText(el) {
    for (var i = 0; i < el.childNodes.length; i++) {
      var n = el.childNodes[i];
      if (n.nodeType === 3 && n.nodeValue.trim()) return true;
    }
    return false;
  }

  function contrastOn() {
    var nodes = document.querySelectorAll("p,span,li,dt,dd,label,h1,h2,h3,h4,h5,a,button,summary,div,strong,em,td,th");
    [].forEach.call(nodes, function (el) {
      if (el.closest("[data-kr-a11y]")) return;
      // the phone is a deliberate replica of Telegram's own UI — leave it alone
      if (el.closest('[data-m="phone"]') || el.closest(".kr-phone")) return;
      if (!hasOwnText(el) || el.hasAttribute("data-kr-fix")) return;
      var cs = getComputedStyle(el);
      var fg = rgb(cs.color);
      if (!fg || fg.a < 0.5) return;
      var bg = bgOf(el);
      if (ratio(fg, bg) >= 4.5) return;
      el.setAttribute("data-kr-fix", el.style.color || "");
      el.style.color = lum(bg) > 0.45 ? "#0B0710" : "#FFFFFF";
    });
  }

  function contrastOff() {
    var fixed = document.querySelectorAll("[data-kr-fix]");
    [].forEach.call(fixed, function (el) {
      var prev = el.getAttribute("data-kr-fix");
      el.style.color = prev || "";
      el.removeAttribute("data-kr-fix");
    });
  }
  var root, panel, sheet, lastTrigger = null;

  function isDark() {
    if (!host()) return false;
    var bg = getComputedStyle(host()).backgroundColor || "";
    var m = bg.match(/\d+/g);
    if (!m) return false;
    var l = (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
    return l < 0.5;
  }

  // Everything in <body> except our own panel gets the zoom, so the controls
  // stay a constant size while the page scales.
  function contentEls() {
    var h = host();
    if (!h) return [];
    return [].filter.call(h.children, function (el) {
      return el !== root && el.tagName !== "SCRIPT" && el.tagName !== "STYLE" && el.tagName !== "HEAD" && el.tagName !== "LINK";
    });
  }

  function apply(persist) {
    var z = ZOOMS[state.zoom] || 1;
    contentEls().forEach(function (el) {
      el.style.zoom = z === 1 ? "" : z;
    });

    var css = "";
    if (state.links) css += 'a:not([data-m="fab"]):not([data-m="burger"]) { text-decoration: underline !important; text-underline-offset: 3px !important; }';
    if (state.still) css += '*, *::before, *::after { animation: none !important; transition: none !important; }' +
      'html { scroll-behavior: auto !important; }' +
      // content that fades in via animation fill would otherwise stay at opacity 0
      '[data-reveal] { opacity: 1 !important; } [data-rail] { background-size: 100% 100% !important; } [data-draw] { stroke-dashoffset: 0 !important; }';
    if (state.cursor) {
      var cur = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M6 3l22 15-9 1.5 5 11-4 2-5-11-6 6z' fill='%23fff' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E\") 4 2";
      css += "html, body, * { cursor: " + cur + ", auto !important; }" +
        "a, button, label, summary, [role=\"button\"] { cursor: " + cur + ", pointer !important; }";
    }
    sheet.textContent = css;

    if (state.contrast) contrastOn(); else contrastOff();

    // CSS rules only stop CSS motion; JS-driven motion reads this flag
    var de = document.documentElement;
    if (de) de.dataset.krStill = state.still ? "1" : "0";

    panel.querySelectorAll("[data-flag]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(!!state[b.dataset.flag]));
      paintToggle(b, !!state[b.dataset.flag]);
    });
    var lvl = panel.querySelector("[data-level]");
    if (lvl) lvl.textContent = Math.round((ZOOMS[state.zoom] || 1) * 100) + "%";
    if (persist) save();
  }

  function paintToggle(b, on) {
    var dark = isDark();
    b.style.background = on ? (dark ? "oklch(0.62 0.2 300)" : "oklch(0.52 0.19 300)") : (dark ? "rgba(255,255,255,0.06)" : "#FFFFFF");
    b.style.color = on ? "#FFFFFF" : (dark ? "#E9E1F0" : "#372361");
    b.style.borderColor = on ? "transparent" : (dark ? "rgba(255,255,255,0.16)" : "oklch(0.5 0.05 300 / 0.22)");
  }

  function build() {
    var h = host();
    if (!h) return;
    var dark = isDark();
    var surface = dark ? "#1B1226" : "#FFFFFF";
    var ink = dark ? "#F2ECF7" : "#372361";
    var sub = dark ? "#B9AAC6" : "#63537F";
    var line = dark ? "rgba(255,255,255,0.12)" : "oklch(0.5 0.05 300 / 0.16)";
    var accent = dark ? "oklch(0.72 0.19 300)" : "oklch(0.52 0.19 300)";

    root = document.createElement("div");
    root.setAttribute("data-kr-a11y", "");
    root.style.cssText = "position: fixed; z-index: 200; inset: 0; pointer-events: none; font-family: Assistant, system-ui, sans-serif; direction: rtl;";

    panel = document.createElement("div");
    panel.id = "kr-a11y-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "אפשרויות נגישות");
    panel.hidden = true;
    panel.style.cssText = "position: fixed; pointer-events: auto; width: 268px; max-width: calc(100vw - 40px); padding: 16px; border-radius: 18px; background: " +
      surface + "; border: 1px solid " + line + "; box-shadow: 0 20px 46px rgba(0,0,0,0.28); display: none; flex-direction: column; gap: 12px; text-align: right;";

    var head = document.createElement("div");
    head.style.cssText = "font-family: Heebo, sans-serif; font-weight: 800; font-size: 16px; color: " + ink + ";";
    head.textContent = "נגישות";

    // text size
    var sizeWrap = document.createElement("div");
    sizeWrap.style.cssText = "display: flex; flex-direction: column; gap: 7px;";
    var sizeLbl = document.createElement("div");
    sizeLbl.style.cssText = "font-size: 13.5px; color: " + sub + ";";
    sizeLbl.textContent = "גודל טקסט";
    var sizeRow = document.createElement("div");
    sizeRow.style.cssText = "display: flex; align-items: center; gap: 8px;";
    var minus = stepBtn("א−", "הקטנת טקסט", -1, ink, line, surface);
    var level = document.createElement("span");
    level.setAttribute("data-level", "");
    level.setAttribute("aria-live", "polite");
    level.style.cssText = "flex: 1; text-align: center; font-family: Heebo, sans-serif; font-weight: 700; font-size: 14px; color: " + ink + ";";
    var plus = stepBtn("א+", "הגדלת טקסט", 1, ink, line, surface);
    sizeRow.append(minus, level, plus);
    sizeWrap.append(sizeLbl, sizeRow);

    var flags = document.createElement("div");
    flags.style.cssText = "display: flex; flex-direction: column; gap: 7px;";
    [["contrast", "ניגודיות מוגברת"], ["links", "הדגשת קישורים"], ["still", "עצירת אנימציות"], ["cursor", "סמן גדול"]]
      .forEach(function (pair) { flags.appendChild(toggle(pair[0], pair[1], line)); });

    var reset = document.createElement("button");
    reset.type = "button";
    reset.style.cssText = "align-self: flex-start; padding: 0; border: 0; background: none; color: " + accent + "; font-size: 13.5px; cursor: pointer; text-decoration: underline; font-family: inherit;";
    reset.textContent = "איפוס";
    reset.addEventListener("click", function () { state = Object.assign({}, DEFAULTS); apply(true); });

    var note = document.createElement("div");
    note.style.cssText = "font-size: 12px; line-height: 1.5; color: " + sub + ";";
    note.textContent = "ההגדרות נשמרות במכשיר שלכם";

    panel.append(head, sizeWrap, flags, reset, note);
    root.append(panel);
    (document.documentElement || h).appendChild(root);

    sheet = document.getElementById("kr-a11y-sheet");
    if (!sheet) {
      sheet = document.createElement("style");
      sheet.id = "kr-a11y-sheet";
      (document.head || document.documentElement).appendChild(sheet);
    }

    // triggers live in the page (header icon, footer link) and survive re-renders,
    // so they are handled by delegation rather than direct binding
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest && e.target.closest("[data-kr-a11y-open]");
      if (trigger) {
        e.preventDefault();
        setOpen(panel.hidden, trigger);
        return;
      }
      if (!panel.hidden && !panel.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) {
        var t2 = lastTrigger;
        setOpen(false);
        if (t2 && t2.focus) t2.focus();
      }
    });
  }

  function setOpen(open, trigger) {
    panel.hidden = !open;
    panel.style.display = open ? "flex" : "none";
    if (trigger) lastTrigger = trigger;
    document.querySelectorAll("[data-kr-a11y-open]").forEach(function (el) {
      el.setAttribute("aria-expanded", String(open && el === lastTrigger));
    });
    if (open) {
      place(lastTrigger);
      var f = panel.querySelector("button");
      if (f) f.focus();
    }
  }

  // anchor the panel to whichever control opened it, clamped to the viewport
  function place(trigger) {
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;
    var pw = 268, ph = panel.offsetHeight || 320;
    var top, left;
    if (trigger && trigger.getBoundingClientRect) {
      var r = trigger.getBoundingClientRect();
      top = r.bottom + 10;
      if (top + ph > vh - 10) top = Math.max(10, r.top - ph - 10);
      left = r.left + r.width / 2 - pw / 2;
    } else {
      top = Math.max(10, vh - ph - 20);
      left = 20;
    }
    panel.style.top = Math.max(10, Math.min(top, vh - ph - 10)) + "px";
    panel.style.left = Math.max(10, Math.min(left, vw - pw - 10)) + "px";
  }

  function stepBtn(label, aria, dir, ink, line, surface) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", aria);
    b.style.cssText = "width: 40px; height: 36px; border-radius: 10px; border: 1px solid " + line + "; background: " + surface +
      "; color: " + ink + "; font-family: Heebo, sans-serif; font-weight: 800; font-size: 15px; cursor: pointer;";
    b.textContent = label;
    b.addEventListener("click", function () {
      state.zoom = Math.min(ZOOMS.length - 1, Math.max(0, state.zoom + dir));
      apply(true);
    });
    return b;
  }

  function toggle(flag, label, line) {
    var b = document.createElement("button");
    b.type = "button";
    b.dataset.flag = flag;
    b.setAttribute("aria-pressed", "false");
    b.style.cssText = "display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; padding: 9px 12px; border-radius: 11px; border: 1px solid " +
      line + "; font-family: inherit; font-size: 14.5px; cursor: pointer; text-align: right;";
    b.textContent = label;
    b.addEventListener("click", function () { state[flag] = !state[flag]; apply(true); });
    return b;
  }

  function ensure() {
    var h = host();
    if (!h || !h.children.length) return;
    if (root && root.isConnected) return;
    if (document.querySelector("[data-kr-a11y]")) return;
    try { build(); apply(); } catch (e) {}
  }

  function start() {
    ensure();
    setInterval(ensure, 400);
    window.addEventListener("pageshow", ensure);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
