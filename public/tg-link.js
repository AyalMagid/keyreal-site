/* Opens Telegram links in the app instead of the web page.

   A plain https://t.me/... link is a universal link, but the OS honours it only
   sometimes: once the user has chosen to stay in the browser for a domain, iOS
   remembers that and every later t.me link renders the web page with an
   "OPEN IN APP" button instead of handing off.

   The tg:// scheme has no such ambiguity — it always goes to the app. It just
   does nothing when Telegram is not installed, so we race it against the https
   URL: navigate to tg://, and if the page is still visible a moment later the
   app never opened, so fall back to the web link. */
(function () {
  function deepLink(url) {
    var m = String(url).match(/^https?:\/\/t\.me\/([A-Za-z0-9_]+)\/?(?:\?(.*))?$/);
    if (!m) return null;
    var out = "tg://resolve?domain=" + m[1];
    if (m[2]) out += "&" + m[2];
    return out;
  }

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    var a = e.target.closest && e.target.closest('a[href*="t.me/"]');
    if (!a) return;

    var web = a.getAttribute("href");
    var deep = deepLink(web);
    if (!deep) return;

    e.preventDefault();

    var fallback = setTimeout(function () {
      if (!document.hidden) window.location.href = web;
    }, 800);

    // The app taking over hides the page, which cancels the fallback.
    document.addEventListener("visibilitychange", function onHide() {
      if (document.hidden) clearTimeout(fallback);
      document.removeEventListener("visibilitychange", onHide);
    });
    window.addEventListener("pagehide", function () { clearTimeout(fallback); }, { once: true });

    window.location.href = deep;
  });
})();
