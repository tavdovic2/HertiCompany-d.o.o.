/* ==========================================================================
   Herti Company – stare adrese (proizvod.html?id=..., kategorija.html?id=...)
   preusmjerava na nove. Mapu "id -> nova adresa" upisuje generator u
   <script type="application/json" id="mapa"> na stranici.
   ========================================================================== */
(function () {
  var el = document.getElementById("mapa"), m = {}, id = "";
  try { m = JSON.parse(el.textContent); } catch (e) { /* ide na sve proizvode */ }
  try { id = new URLSearchParams(location.search).get("id") || ""; } catch (e) { /* bez id */ }
  var u = Object.prototype.hasOwnProperty.call(m, id) ? m[id] : "/proizvodi/";
  var c = document.querySelector('link[rel="canonical"]');
  if (c && el) c.href = el.getAttribute("data-baza") + u;
  location.replace(u + location.hash);
})();
