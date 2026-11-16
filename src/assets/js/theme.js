// Applies the saved theme before the stylesheet loads (no flash of the wrong colours)
// and switches the non-blocking Google Fonts stylesheet on once it has loaded.
// Loaded from a file rather than inline because the CSP forbids inline scripts.
(function () {
  "use strict";
  let theme = "light";
  try { if (localStorage.getItem("herti-tema") === "dark") theme = "dark"; } catch (e) { /* storage unavailable */ }
  document.documentElement.dataset.theme = theme;
  if (theme === "dark") {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = "#0f1a2b";
  }

  const fonts = document.querySelector("link[data-fonts]");
  if (fonts) {
    const enable = () => { fonts.media = "all"; };
    if (fonts.sheet) enable(); else fonts.addEventListener("load", enable);
  }
})();
