/* Opens Telegram links in the app instead of the web page.

   A plain https://t.me/... link is a universal link, but the OS honours it only
   sometimes: once the user has chosen to stay in the browser for a domain, iOS
   remembers that and every later t.me link renders the web page with an
   "OPEN IN APP" button instead of handing off. On a purchase button that extra
   tap costs conversions, so we drive the app directly.

   tg:// always goes to the app, and does nothing at all when Telegram is not
   installed — so we race it against the https URL and cancel the fallback once
   we can tell the app took over.

   Detecting that is the subtle part. iOS keeps running timers for a short while
   after the app is foregrounded, so a 700ms probe fired the fallback even on
   success and left the user with the app AND a stray web page. The wait is long
   enough that the switch has definitely registered, and three signals cancel it:
   visibilitychange, pagehide and blur. Clock drift is the backstop — a timer
   that took far longer than asked means we were suspended in the background. */
(function () {
  var WAIT = 1800;
  var DRIFT = 400;

  function deepLink(url) {
    var m = String(url).match(/^https?:\/\/t\.me\/([A-Za-z0-9_]+)\/?(?:\?(.*))?$/);
    if (!m) return null;
    var out = "tg://resolve?domain=" + m[1];
    if (m[2]) out += "&" + m[2];
    return out;
  }

  // Exposed so in-page JS (the phone's search box) uses the same handoff.
  function open(web) {
    var deep = deepLink(web);
    if (!deep) { window.location.href = web; return; }

    var started = Date.now();
    var cancelled = false;
    function cancel() { cancelled = true; }

    document.addEventListener("visibilitychange", cancel);
    window.addEventListener("pagehide", cancel);
    window.addEventListener("blur", cancel);

    setTimeout(function () {
      document.removeEventListener("visibilitychange", cancel);
      window.removeEventListener("pagehide", cancel);
      window.removeEventListener("blur", cancel);
      var late = Date.now() - started > WAIT + DRIFT;
      if (cancelled || late || document.hidden) return;
      window.location.href = web;
    }, WAIT);

    window.location.href = deep;
  }

  window.KrTg = { open: open, deepLink: deepLink };

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    var a = e.target.closest && e.target.closest('a[href*="t.me/"]');
    if (!a) return;
    var web = a.getAttribute("href");
    if (!deepLink(web)) return;
    e.preventDefault();
    open(web);
  });
})();
