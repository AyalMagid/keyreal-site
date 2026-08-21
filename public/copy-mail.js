/* Turns any element with data-kr-copy="<text>" into a copy-to-clipboard control.
   A mailto: link hands the address to the OS mail handler, which on some systems
   hangs the browser; copying avoids that. Self-mounting, no dependencies. */
(function () {
  var SEL = "[data-kr-copy]";

  function write(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallback(text, done); });
    } else {
      fallback(text, done);
    }
  }

  function fallback(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-999px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    done();
  }

  // A floating confirmation, so the feedback is unmissable even for a 38px icon.
  function toast(msg) {
    var el = document.getElementById("kr-copy-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "kr-copy-toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.style.cssText =
        "position:fixed;z-index:2147483000;bottom:26px;left:50%;transform:translateX(-50%) translateY(14px);" +
        "display:flex;align-items:center;gap:9px;padding:13px 20px;border-radius:14px;" +
        "background:#1B1226;color:#FFFFFF;font-family:Assistant,Heebo,sans-serif;font-weight:700;font-size:15.5px;" +
        "direction:rtl;box-shadow:0 18px 46px rgba(0,0,0,0.42);opacity:0;pointer-events:none;" +
        "transition:opacity .18s ease, transform .18s cubic-bezier(0.2,0.8,0.2,1)";
      document.body.appendChild(el);
    }
    el.innerHTML =
      '<span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:oklch(0.72 0.16 150);color:#0E2A16;font-size:13px;font-weight:900">✓</span>' +
      '<span></span>';
    el.lastChild.textContent = msg;
    requestAnimationFrame(function () {
      el.style.opacity = "1";
      el.style.transform = "translateX(-50%) translateY(0)";
    });
    clearTimeout(el._t);
    el._t = setTimeout(function () {
      el.style.opacity = "0";
      el.style.transform = "translateX(-50%) translateY(14px)";
    }, 2000);
  }

  function flash(el) {
    if (el._flash) return;
    el._flash = true;
    var bd = el.style.borderColor, bg = el.style.background, tr = el.style.transform;
    el.style.borderColor = "oklch(0.72 0.16 150)";
    el.style.background = "oklch(0.6 0.14 150 / 0.2)";
    el.style.transform = "scale(1.08)";
    setTimeout(function () {
      el.style.borderColor = bd;
      el.style.background = bg;
      el.style.transform = tr;
      el._flash = false;
    }, 900);
  }

  function onClick(e) {
    var el = e.target.closest(SEL);
    if (!el) return;
    e.preventDefault();
    var text = el.getAttribute("data-kr-copy");
    var label = el.getAttribute("data-kr-copy-label") || text;
    write(text, function () {
      flash(el);
      toast((document.documentElement.lang === "en" ? "Copied: " : "הועתק: ") + label);
    });
  }

  function onKey(e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var el = e.target.closest && e.target.closest(SEL);
    if (!el) return;
    e.preventDefault();
    el.click();
  }

  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKey);
})();
