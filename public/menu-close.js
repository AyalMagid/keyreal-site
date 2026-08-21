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
    // <details>-based sheet
    var inside = e.target.closest("details");
    closeDetails(inside);

    // aria-expanded button + its controlled panel
    document.querySelectorAll('[aria-expanded="true"][aria-controls]').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (btn.contains(e.target)) return;
      if (panel && panel.contains(e.target)) return;
      btn.click();
    });
  }, true);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDetails(null);
  });
})();
