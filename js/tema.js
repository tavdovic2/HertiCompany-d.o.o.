/* ==========================================================================
   Herti Company – tema i fontovi, prije prikaza stranice
   Učitava se u <head> BEZ defer, prije css/stil.css, pa stranica ne bljesne
   pogrešnom bojom. Zaseban fajl (a ne <script> u stranici) zbog sigurnosnog
   pravila Content-Security-Policy u fajlu _headers.
   ========================================================================== */
(function () {
  var t = "light";
  try { if (localStorage.getItem("herti-tema") === "dark") t = "dark"; } catch (e) { /* bez zapamćene teme */ }
  document.documentElement.dataset.theme = t;
  if (t === "dark") {
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = "#0f1a2b";
  }

  // Google Fonts se učitava kao media="print" (ne blokira prikaz), a kad stigne, uključi se za ekran
  var f = document.querySelector("link[data-fontovi]");
  if (f) {
    var ukljuci = function () { f.media = "all"; };
    if (f.sheet) ukljuci(); else f.addEventListener("load", ukljuci);
  }
})();
