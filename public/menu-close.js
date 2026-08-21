/* Closes an open mobile menu when the user taps anywhere outside it.
   Works for both shapes the site uses: a <details> sheet (static mockups) and
   a button with aria-expanded (the Next app, which owns its own React state). */
(function () {
  function closeDetails(except) {
    document.querySelectorAll("details[open]").forEach(function (d) {
      if (d !== except) d.open = false;
    });
  }

  document.addEventListener("pointerdown", function (e) {
    // e.target can be a non-element (scrollbar, text node), which has no
    // .closest and would throw on every such gesture.
    var el = e.target instanceof Element ? e.target : null;
    if (!el) return;

    closeDetails(el.closest("details"));

    // aria-expanded button + its controlled panel
    document.querySelectorAll('[aria-expanded="true"][aria-controls]').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (btn.contains(el)) return;
      if (panel && panel.contains(el)) return;
      btn.click();
    });
  }, true);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDetails(null);
  });
})();
