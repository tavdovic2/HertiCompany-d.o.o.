/* ==========================================================================
   Herti Company – zajednički dijelovi (adrese, ikone, crtež boce)
   Koriste ga i preglednik (js/app.js) i generator stranica (alati/generisi-stranice.js),
   pa su adrese i ikone svuda iste. Ovaj fajl NE treba mijenjati za dodavanje proizvoda.
   ========================================================================== */
(function (root) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Pretraga bez obzira na kvačice: "Čišćenje" = "ciscenje"
  function norm(s) {
    return String(s || "").toLowerCase()
      .replace(/đ/g, "dj").replace(/[čć]/g, "c").replace(/š/g, "s").replace(/ž/g, "z")
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  /* ------------------------------------------------- adrese (čiste, od korijena) */
  var URL = {
    pocetna: "/",
    proizvodi: "/proizvodi/",
    oNama: "/o-nama/",
    kontakt: "/kontakt/",
    privatnost: "/privatnost/",
    kategorija: function (k) { return "/proizvodi/" + (k.id || k) + "/"; },
    proizvod: function (p) { return "/proizvodi/" + p.kategorija + "/" + p.id + "/"; },
    // putanja do fajla (slike/...) -> adresa od korijena (/slike/...)
    fajl: function (putanja) { return "/" + String(putanja || "").replace(/^\//, ""); }
  };

  function brojProizvoda(n) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return n + " proizvod";
    return n + " proizvoda";
  }
  // Proizvodi grupisani po polju "grupa", redoslijedom iz kataloga
  function grupeRedom(lista) {
    var redoslijed = [], mapa = {};
    lista.forEach(function (p) {
      var g = p.grupa || "";
      if (!Object.prototype.hasOwnProperty.call(mapa, g)) { mapa[g] = []; redoslijed.push(g); }
      mapa[g].push(p);
    });
    return redoslijed.map(function (g) { return { naziv: g, proizvodi: mapa[g] }; });
  }

  /* ----------------------------------------------------------------- ikone */
  var I = {
    tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    lupa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>',
    strelica: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    meni: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    mjesec: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>',
    sunce: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>',
    zatvori: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    kvacica: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    lokacija: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    ukloni: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
    "kucna-hemija": '<svg class="kat-ikona" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 12h12v8H24zM28 12V6h10l4 4"/><path d="M22 20h16l4 8v28a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V28z"/><path d="M18 36h24"/><circle cx="50" cy="16" r="2"/><circle cx="54" cy="24" r="1.6"/><circle cx="48" cy="8" r="1.4"/></svg>',
    "licna-higijena": '<svg class="kat-ikona" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M30 6h14M37 6v8M28 14h18v6H28z"/><path d="M24 20h26a2 2 0 0 1 2 2v32a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V22a2 2 0 0 1 2-2z"/><path d="M37 32c-3 4-5 6.5-5 9a5 5 0 0 0 10 0c0-2.5-2-5-5-9z"/></svg>',
    "auto-hemija": '<svg class="kat-ikona" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 40v-6l5-12a4 4 0 0 1 3.7-2.5h30.6A4 4 0 0 1 51 22l5 12v6a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z"/><path d="M8 34h48M14 26h36"/><circle cx="18" cy="44" r="5"/><circle cx="46" cy="44" r="5"/></svg>'
  };

  /* --------------------------------------- crtež boce (kad proizvod nema sliku) */
  function oblikBoce(tip, brend, zapremina) {
    var ink = "#1b1f24";
    var tijelo, labela, fs;
    if (tip === "Galon") {
      tijelo =
        '<rect x="40" y="38" width="40" height="28" rx="5" fill="' + ink + '"/>' +
        '<path d="M100 30h52a14 14 0 0 1 14 14v18H100z" class="boja-k"/>' +
        '<rect x="112" y="42" width="42" height="16" rx="7" class="boja-t"/>' +
        '<rect x="24" y="60" width="152" height="190" rx="20" class="boja-k"/>' +
        '<rect x="34" y="72" width="10" height="164" rx="5" fill="#fff" opacity=".22"/>';
      labela = { x: 46, y: 118, w: 108, h: 92 };
    } else if (tip === "Boca s pumpicom") {
      tijelo =
        '<rect x="94" y="40" width="12" height="36" fill="' + ink + '"/>' +
        '<rect x="86" y="28" width="28" height="16" rx="4" fill="' + ink + '"/>' +
        '<rect x="108" y="31" width="46" height="9" rx="4" fill="' + ink + '"/>' +
        '<rect x="80" y="72" width="40" height="26" rx="5" fill="' + ink + '"/>' +
        '<rect x="48" y="94" width="104" height="156" rx="22" class="boja-k"/>' +
        '<rect x="58" y="108" width="10" height="128" rx="5" fill="#fff" opacity=".22"/>';
      labela = { x: 60, y: 140, w: 80, h: 78 };
    } else {
      tijelo =
        '<rect x="76" y="12" width="48" height="40" rx="7" fill="' + ink + '"/>' +
        '<path d="M80 50h40q0 22 30 36q8 4 8 14v138q0 12-12 12H54q-12 0-12-12V100q0-10 8-14q30-14 30-36z" class="boja-k"/>' +
        '<rect x="52" y="104" width="10" height="132" rx="5" fill="#fff" opacity=".22"/>';
      labela = { x: 58, y: 128, w: 84, h: 86 };
    }
    // Poppins je širok: veličina slova se prilagođava širini etikete i dužini naziva brenda
    fs = Math.min(18, Math.floor((labela.w - 12) / (brend.length * 0.66)));
    var cx = labela.x + labela.w / 2;
    return tijelo +
      '<rect x="' + labela.x + '" y="' + labela.y + '" width="' + labela.w + '" height="' + labela.h + '" rx="8" fill="#fff"/>' +
      '<text x="' + cx + '" y="' + (labela.y + labela.h * 0.46) + '" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="' + fs + '" fill="' + ink + '">' + esc(brend) + '</text>' +
      '<rect x="' + (cx - 16) + '" y="' + (labela.y + labela.h * 0.58) + '" width="32" height="2" fill="' + ink + '" opacity=".35"/>' +
      '<text x="' + cx + '" y="' + (labela.y + labela.h * 0.82) + '" text-anchor="middle" font-family="Atkinson Hyperlegible, Arial, sans-serif" font-weight="700" font-size="15" fill="' + ink + '">' + esc(zapremina) + '</text>';
  }

  root.HC = {
    esc: esc, norm: norm, URL: URL, I: I,
    brojProizvoda: brojProizvoda, grupeRedom: grupeRedom, oblikBoce: oblikBoce
  };
})(typeof window !== "undefined" ? window : globalThis);
