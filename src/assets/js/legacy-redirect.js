// Redirects legacy URLs (proizvod.html?id=..., kategorija.html?id=...) to their current pages.
// The id -> path map is embedded by the build in <script type="application/json" id="redirect-map">.
(function () {
  "use strict";
  const el = document.getElementById("redirect-map");
  let map = {};
  try { map = JSON.parse(el.textContent); } catch (e) { /* fall back to the catalogue */ }
  const id = new URLSearchParams(location.search).get("id") || "";
  const target = Object.prototype.hasOwnProperty.call(map, id) ? map[id] : "/proizvodi/";
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && el) canonical.href = el.getAttribute("data-base") + target;
  location.replace(target + location.hash);
})();
