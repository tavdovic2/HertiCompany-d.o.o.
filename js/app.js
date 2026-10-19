/* ==========================================================================
   Herti Company – logika stranice
   Ovaj fajl NE treba mijenjati za dodavanje proizvoda.
   Proizvodi su u: podaci/proizvodi.js   Kontakt podaci su u: podaci/postavke.js
   ========================================================================== */
(function () {
  "use strict";

  var F = window.FIRMA || {};
  var KAT = window.KATEGORIJE || [];
  var PR = window.PROIZVODI || [];
  var STRANICA = document.body.getAttribute("data-stranica") || "";

  /* ---------------------------------------------------------------- pomoćno */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function norm(s) {
    return String(s || "").toLowerCase()
      .replace(/đ/g, "dj").replace(/[čć]/g, "c").replace(/š/g, "s").replace(/ž/g, "z")
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function param(ime) { try { return new URLSearchParams(location.search).get(ime) || ""; } catch (e) { return ""; } }
  function kategorija(id) { return KAT.filter(function (k) { return k.id === id; })[0]; }
  function proizvod(id) { return PR.filter(function (p) { return p.id === id; })[0]; }
  function urlProizvod(p) { return "proizvod.html?id=" + encodeURIComponent(p.id); }
  function urlKategorija(k) { return "kategorija.html?id=" + encodeURIComponent(k.id); }
  function tel() { return "tel:" + (F.telefonPoziv || ""); }
  function brojProizvoda(n) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return n + " proizvod";
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return n + " proizvoda";
    return n + " proizvoda";
  }
  function grupeRedom(lista) {
    var redoslijed = [], mapa = {};
    lista.forEach(function (p) {
      var g = p.grupa || "";
      if (!mapa.hasOwnProperty(g)) { mapa[g] = []; redoslijed.push(g); }
      mapa[g].push(p);
    });
    return redoslijed.map(function (g) { return { naziv: g, proizvodi: mapa[g] }; });
  }

  function postaviMeta(naslov, opis, kanonski) {
    document.title = naslov ? naslov + " | Herti Company" : "Herti Company";
    var m = $('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    if (opis) m.content = opis;
    if (kanonski && F.web) {
      var l = $('link[rel="canonical"]');
      if (!l) { l = document.createElement("link"); l.rel = "canonical"; document.head.appendChild(l); }
      l.href = F.web.replace(/\/$/, "") + "/" + kanonski;
    }
  }
  function jsonLd(obj) {
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
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

  /* --------------------------------------- crtež boce (prazno mjesto za sliku) */
  function oblikBoce(tip, brend, zapremina) {
    var ink = "#1b1f24";
    var tijelo, labela, fs;
    if (tip === "Galon") {
      tijelo =
        '<rect x="40" y="38" width="40" height="28" rx="5" fill="' + ink + '"/>' +
        '<path d="M100 30h52a14 14 0 0 1 14 14v18H100z" style="fill:var(--k)"/>' +
        '<rect x="112" y="42" width="42" height="16" rx="7" style="fill:var(--t)"/>' +
        '<rect x="24" y="60" width="152" height="190" rx="20" style="fill:var(--k)"/>' +
        '<rect x="34" y="72" width="10" height="164" rx="5" fill="#fff" opacity=".22"/>';
      labela = { x: 46, y: 118, w: 108, h: 92 };
    } else if (tip === "Boca s pumpicom") {
      tijelo =
        '<rect x="94" y="40" width="12" height="36" fill="' + ink + '"/>' +
        '<rect x="86" y="28" width="28" height="16" rx="4" fill="' + ink + '"/>' +
        '<rect x="108" y="31" width="46" height="9" rx="4" fill="' + ink + '"/>' +
        '<rect x="80" y="72" width="40" height="26" rx="5" fill="' + ink + '"/>' +
        '<rect x="48" y="94" width="104" height="156" rx="22" style="fill:var(--k)"/>' +
        '<rect x="58" y="108" width="10" height="128" rx="5" fill="#fff" opacity=".22"/>';
      labela = { x: 60, y: 140, w: 80, h: 78 };
    } else {
      tijelo =
        '<rect x="76" y="12" width="48" height="40" rx="7" fill="' + ink + '"/>' +
        '<path d="M80 50h40q0 22 30 36q8 4 8 14v138q0 12-12 12H54q-12 0-12-12V100q0-10 8-14q30-14 30-36z" style="fill:var(--k)"/>' +
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
  function slika(p, velicina) {
    var sadrzaj;
    if (p.slika) {
      // Fotografije su kvadratne (1000 × 1000) s bijelim razmakom oko proizvoda
      sadrzaj = '<img src="' + esc(p.slika) + '" alt="' + esc(p.naziv + " – " + p.brend) + '" width="1000" height="1000" loading="lazy">';
    } else {
      sadrzaj = '<svg class="boca" viewBox="0 0 200 262" role="img" aria-label="' + esc(p.naziv) + '">' +
        oblikBoce(p.pakovanje, p.brend, p.zapremina) + "</svg>";
    }
    return '<div class="slika' + (p.slika ? " ima-foto" : "") + '" data-kat="' + esc(p.kategorija) + '">' + sadrzaj + "</div>";
  }

  /* -------------------------------------------------------- kartica proizvoda */
  function kartica(p, nivoNaslova) {
    var h = nivoNaslova || "h3";
    return '<article class="kartica">' + slika(p) +
      '<div class="tijelo"><span class="brend">' + esc(p.brend) + "</span>" +
      "<" + h + '><a href="' + urlProizvod(p) + '">' + esc(p.naziv) + "</a></" + h + ">" +
      '<div class="oznake"><span class="oznaka">' + esc(p.zapremina) + '</span><span class="oznaka">' + esc(p.pakovanje) + "</span></div>" +
      '<div class="kartica-dno"><a class="btn btn-obrub" href="' + urlProizvod(p) + '#upit">Zatraži ponudu</a></div>' +
      "</div></article>";
  }
  function mreza(lista, h) {
    return '<div class="mreza">' + lista.map(function (p) { return kartica(p, h); }).join("") + "</div>";
  }

  /* ------------------------------------------------------------------ mrvice */
  function mrvice(stavke) {
    var baza = (F.web || "").replace(/\/$/, "");
    jsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: stavke.map(function (s, i) {
        var o = { "@type": "ListItem", position: i + 1, name: s.naziv };
        if (s.url) o.item = baza + "/" + s.url;
        return o;
      })
    });
    return '<nav class="mrvice" aria-label="Gdje se nalazite"><ol>' + stavke.map(function (s, i) {
      var zadnja = i === stavke.length - 1;
      return "<li>" + (zadnja ? '<span aria-current="page">' + esc(s.naziv) + "</span>" : '<a href="' + esc(s.url || "index.html") + '">' + esc(s.naziv) + "</a>") + "</li>";
    }).join("") + "</ol></nav>";
  }

  /* ------------------------------------------------- zaglavlje, podnožje, traka */
  function zaglavlje() {
    var stavke = [
      { id: "pocetna", naziv: "Početna", url: "index.html" },
      { id: "proizvodi", naziv: "Proizvodi", url: "proizvodi.html" },
      { id: "o-nama", naziv: "O nama", url: "o-nama.html" },
      { id: "kontakt", naziv: "Kontakt", url: "kontakt.html" }
    ];
    var aktivna = (STRANICA === "kategorija" || STRANICA === "proizvod") ? "proizvodi" : STRANICA;
    var html =
      '<a class="skip" href="#sadrzaj">Preskočite na sadržaj</a>' +
      '<header class="zaglavlje"><div class="wrap">' +
      '<a class="marka" href="index.html" aria-label="Herti Company – početna stranica"><img src="slike/logo.png" alt="" width="52" height="52"><span>Herti Company</span></a>' +
      '<nav class="meni" id="meni" aria-label="Glavni meni">' +
      stavke.map(function (s) { return '<a href="' + s.url + '"' + (s.id === aktivna ? ' aria-current="page"' : "") + ">" + s.naziv + "</a>"; }).join("") +
      '<a class="btn btn-glavno" href="' + tel() + '">' + I.tel + "Pozovite " + esc(F.telefon) + "</a>" +
      "</nav>" +
      '<button class="ikona-pretraga ikona-tema" type="button"></button>' +
      '<a class="ikona-pretraga" href="proizvodi.html#pretraga" aria-label="Pretražite proizvode">' + I.lupa + "</a>" +
      '<a class="btn btn-glavno btn-poziv" href="' + tel() + '">' + I.tel + esc(F.telefon) + "</a>" +
      '<button class="meni-dugme" type="button" aria-expanded="false" aria-controls="meni"><span class="ik">' + I.meni + "</span><span>Meni</span></button>" +
      "</div></header>";
    document.body.insertAdjacentHTML("afterbegin", html);

    var temaDugme = $(".ikona-tema");
    function prikaziTemu(tema) {
      var tamna = tema === "dark";
      var natpis = tamna ? "Uključite svijetlu temu" : "Uključite tamnu temu";
      document.documentElement.setAttribute("data-theme", tamna ? "dark" : "light");
      temaDugme.innerHTML = tamna ? I.sunce : I.mjesec;
      temaDugme.setAttribute("aria-label", natpis);
      temaDugme.title = natpis;
      var boja = $('meta[name="theme-color"]');
      if (boja) boja.content = tamna ? "#0f1a2b" : "#ffffff";
    }
    prikaziTemu(document.documentElement.getAttribute("data-theme"));
    temaDugme.addEventListener("click", function () {
      var nova = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      prikaziTemu(nova);
      try { localStorage.setItem("herti-tema", nova); } catch (e) { /* izbor se ne pamti, tema i dalje radi */ }
    });

    var dugme = $(".meni-dugme"), meni = $("#meni");
    dugme.addEventListener("click", function () {
      var otvoren = meni.classList.toggle("otvoren");
      dugme.setAttribute("aria-expanded", otvoren ? "true" : "false");
      $(".ik", dugme).innerHTML = otvoren ? I.zatvori : I.meni;
      $("span:last-child", dugme).textContent = otvoren ? "Zatvori" : "Meni";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && meni.classList.contains("otvoren")) { dugme.click(); dugme.focus(); }
    });
  }

  function podnozje() {
    var pravno = ["© " + new Date().getFullYear() + " " + esc(F.naziv) + ". Sva prava zadržana."];
    if (F.idBroj) pravno.push("ID broj: " + esc(F.idBroj));
    if (F.pdvBroj) pravno.push("PDV broj: " + esc(F.pdvBroj));
    pravno.push('<a href="privatnost.html">Politika privatnosti</a>');
    var html =
      '<footer class="podnozje"><div class="wrap">' +
      '<div><a class="marka" href="index.html"><img src="slike/logo.png" alt="" width="52" height="52"><span>Herti Company</span></a>' +
      "<p>Deterdženti, sapuni, šamponi i auto hemija iz naše fabrike u Kiseljaku. Bez minimalne narudžbe, s dostavom.</p></div>" +
      '<div><h2>Proizvodi</h2><ul>' +
      KAT.map(function (k) { return '<li><a href="' + urlKategorija(k) + '">' + esc(k.naziv) + "</a></li>"; }).join("") +
      '<li><a href="proizvodi.html">Svi proizvodi</a></li></ul></div>' +
      '<div><h2>Firma</h2><ul><li><a href="o-nama.html">O nama</a></li><li><a href="kontakt.html">Kontakt</a></li><li><a href="kontakt.html#pitanja">Česta pitanja</a></li><li><a href="privatnost.html">Politika privatnosti</a></li></ul></div>' +
      '<div><h2>Kontakt</h2><ul>' +
      '<li><a href="' + tel() + '"><strong>' + esc(F.telefon) + "</strong></a></li>" +
      '<li><a href="mailto:' + esc(F.email) + '">' + esc(F.email) + "</a></li>" +
      "<li>" + esc(F.adresa) + ", " + esc(F.mjesto) + "</li>" +
      (F.radnoVrijeme ? "<li>" + esc(F.radnoVrijeme) + "</li>" : "") +
      "</ul></div>" +
      '<div class="pravno">' + pravno.map(function (x) { return "<span>" + x + "</span>"; }).join("") + "</div>" +
      "</div></footer>";
    var upitLink = STRANICA === "proizvod" ? "#upit" : "kontakt.html#upit";
    html += '<div class="donja-traka" role="navigation" aria-label="Brze akcije">' +
      '<a class="btn btn-obrub" href="' + tel() + '">' + I.tel + "Pozovite</a>" +
      '<a class="btn btn-glavno" href="' + upitLink + '">Zatraži ponudu</a></div>';
    document.body.insertAdjacentHTML("beforeend", html);
  }

  /* ------------------------------------------------------------ česta pitanja */
  function pitanja(el) {
    if (!el) return;
    var lista = window.PITANJA || [];
    el.innerHTML = '<div class="pitanja">' + lista.map(function (q) {
      return "<details><summary>" + esc(q.pitanje) + "</summary><p>" + esc(q.odgovor) + "</p></details>";
    }).join("") + "</div>";
    jsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: lista.map(function (q) {
        return { "@type": "Question", name: q.pitanje, acceptedAnswer: { "@type": "Answer", text: q.odgovor } };
      })
    });
  }

  /* -------------------------------------------------------- kartice kategorija */
  function karticeKategorija(lista) {
    return lista.map(function (k) {
      var n = PR.filter(function (p) { return p.kategorija === k.id; }).length;
      return '<a class="kat-kartica" data-kat="' + k.id + '" href="' + urlKategorija(k) + '">' + I[k.id] +
        "<h3>" + esc(k.naziv) + "</h3><p>" + esc(k.uvod) + "</p>" +
        '<div class="kat-dno"><span>' + brojProizvoda(n) + "</span><span>" + I.strelica + "</span></div></a>";
    }).join("");
  }

  /* ---------------------------------------------------------- obrazac za upit */
  function obrazac(el, opcije) {
    if (!el) return;
    opcije = opcije || {};
    var opcijeSelect = '<option value="">Izaberite proizvod</option>' + KAT.map(function (k) {
      return '<optgroup label="' + esc(k.naziv) + '">' + PR.filter(function (p) { return p.kategorija === k.id; }).map(function (p) {
        return '<option value="' + esc(p.id) + '">' + esc(p.naziv + " – " + p.brend) + "</option>";
      }).join("") + "</optgroup>";
    }).join("");

    el.innerHTML =
      '<form class="obrazac" novalidate>' +
      '<fieldset><legend>Šta Vas zanima?</legend><div class="artikli"></div>' +
      '<button type="button" class="btn btn-tiho dodaj-artikl">' + I.plus + "Dodajte još jedan proizvod</button></fieldset>" +
      '<fieldset><legend>Vaši podaci</legend>' +
      '<div class="dva">' +
      '<div class="polje"><label for="u-ime">Ime i prezime</label><input id="u-ime" name="ime" autocomplete="name" required><span class="greska">Upišite ime i prezime.</span></div>' +
      '<div class="polje"><label for="u-firma">Firma ili trgovina <span class="opc">(nije obavezno)</span></label><input id="u-firma" name="firma" autocomplete="organization"></div>' +
      '<div class="polje"><label for="u-tel">Broj telefona</label><input id="u-tel" name="telefon" type="tel" inputmode="tel" autocomplete="tel" placeholder="npr. 061 234 567" required><span class="greska">Upišite broj telefona da Vas možemo pozvati.</span></div>' +
      '<div class="polje"><label for="u-mail">E-mail <span class="opc">(nije obavezno)</span></label><input id="u-mail" name="email" type="email" inputmode="email" autocomplete="email"><span class="greska">Provjerite e-mail adresu – izgleda da nešto nedostaje.</span></div>' +
      "</div>" +
      '<div class="polje"><label for="u-mjesto">Mjesto dostave <span class="opc">(nije obavezno)</span></label><input id="u-mjesto" name="mjesto" autocomplete="address-level2" placeholder="npr. Sarajevo"></div>' +
      '<div class="polje"><label for="u-napomena">Napomena <span class="opc">(nije obavezno)</span></label><textarea id="u-napomena" name="napomena" placeholder="Npr. pitanje o dostavi ili posebnom pakovanju."></textarea></div>' +
      "</fieldset>" +
      '<label class="hp" aria-hidden="true">Ne popunjavajte<input type="checkbox" name="botcheck" tabindex="-1"></label>' +
      '<label class="saglasnost"><input type="checkbox" name="saglasnost" required><span>Slažem se da Herti Company koristi moje podatke samo da odgovori na ovaj upit. Više u <a href="privatnost.html" target="_blank">Politici privatnosti</a>.</span></label>' +
      '<button type="submit" class="btn btn-glavno btn-veliko btn-blok">Pošaljite upit</button>' +
      '<p class="napomena-mala">Upit ne obavezuje na kupovinu. Kontaktiraćemo Vas u najkraćem roku.</p>' +
      '<div class="poruka-stanje" role="status" aria-live="polite"></div>' +
      "</form>";

    var forma = $("form", el), artikli = $(".artikli", forma), brojac = 0;

    function osvjeziUkloni() {
      var redovi = $$(".artikl-red", artikli);
      redovi.forEach(function (r) { $(".ukloni", r).hidden = redovi.length === 1; });
    }
    function dodajRed(idProizvoda) {
      brojac++;
      var red = document.createElement("div");
      red.className = "artikl-red";
      red.innerHTML =
        '<div class="polje"><label for="u-art-' + brojac + '">Proizvod</label><select id="u-art-' + brojac + '" name="artikl">' + opcijeSelect + '</select><span class="greska">Izaberite proizvod ili napišite u napomeni šta Vas zanima.</span></div>' +
        '<div class="polje"><label for="u-kol-' + brojac + '">Količina</label><input id="u-kol-' + brojac + '" name="kolicina" placeholder="npr. 20 kom"></div>' +
        '<button type="button" class="ukloni" aria-label="Uklonite ovaj proizvod iz upita">' + I.ukloni + "</button>";
      artikli.appendChild(red);
      if (idProizvoda) $("select", red).value = idProizvoda;
      $(".ukloni", red).addEventListener("click", function () { red.remove(); osvjeziUkloni(); });
      osvjeziUkloni();
      return red;
    }
    (opcije.proizvodi && opcije.proizvodi.length ? opcije.proizvodi : [""]).forEach(dodajRed);
    $(".dodaj-artikl", forma).addEventListener("click", function () { $("select", dodajRed("")).focus(); });

    el.postaviNapomenu = function (t) { var n = $("#u-napomena", forma); if (n.value.indexOf(t) === -1) n.value = (n.value ? n.value + "\n" : "") + t; };
    el.fokus = function () { var k = $('[name="kolicina"]', forma); (k || $("#u-ime", forma)).focus({ preventScroll: true }); };

    function greska(polje, ima) { polje.classList.toggle("ima-gresku", ima); }

    forma.addEventListener("submit", function (e) {
      e.preventDefault();
      var stanje = $(".poruka-stanje", forma);
      stanje.className = "poruka-stanje"; stanje.innerHTML = "";
      var ime = $("#u-ime", forma), tel = $("#u-tel", forma), mail = $("#u-mail", forma), napomena = $("#u-napomena", forma);
      var stavke = $$(".artikl-red", artikli).map(function (r) {
        var p = proizvod($("select", r).value);
        return p ? { p: p, kolicina: $('[name="kolicina"]', r).value.trim() } : null;
      }).filter(Boolean);
      var ok = true, prvo = null;
      function provjeri(uslov, polje, fokusEl) { greska(polje, !uslov); if (!uslov) { ok = false; prvo = prvo || fokusEl; } }
      var prviRed = $(".artikl-red .polje", artikli);
      provjeri(stavke.length > 0 || napomena.value.trim().length > 0, prviRed, $("select", prviRed));
      provjeri(ime.value.trim().length > 1, ime.closest(".polje"), ime);
      provjeri(tel.value.replace(/\D/g, "").length >= 6, tel.closest(".polje"), tel);
      provjeri(!mail.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim()), mail.closest(".polje"), mail);
      var sag = $('[name="saglasnost"]', forma);
      $(".saglasnost", forma).classList.toggle("ima-gresku", !sag.checked);
      if (!sag.checked) { ok = false; prvo = prvo || sag; }
      if (!ok) {
        stanje.className = "poruka-stanje ne";
        stanje.innerHTML = "Provjerite označena polja.<p>" + (!sag.checked && $$(".ima-gresku", forma).length === 1 ? "Označite saglasnost da bismo mogli odgovoriti na upit." : "Crvenom bojom su označena polja koja treba popuniti.") + "</p>";
        prvo.focus();
        return;
      }
      if ($('[name="botcheck"]', forma).checked) return;

      var linije = stavke.map(function (s) { return "- " + s.p.naziv + " (" + s.p.brend + ")" + (s.kolicina ? " – količina: " + s.kolicina : ""); });
      var naslov = "Upit za ponudu: " + (stavke.length ? stavke[0].p.naziv + (stavke.length > 1 ? " i još " + (stavke.length - 1) : "") : "opšti upit");
      var tijelo =
        "UPIT ZA PONUDU – herticompany.ba\n\n" +
        "Proizvodi:\n" + (linije.length ? linije.join("\n") : "- (nije izabran proizvod)") + "\n\n" +
        "Ime i prezime: " + ime.value.trim() + "\n" +
        "Firma: " + ($("#u-firma", forma).value.trim() || "-") + "\n" +
        "Telefon: " + tel.value.trim() + "\n" +
        "E-mail: " + (mail.value.trim() || "-") + "\n" +
        "Mjesto dostave: " + ($("#u-mjesto", forma).value.trim() || "-") + "\n\n" +
        "Napomena:\n" + (napomena.value.trim() || "-");

      var dugme = $('button[type="submit"]', forma);
      function uspjeh(naslovPoruke, tekst) {
        stanje.className = "poruka-stanje ok";
        stanje.innerHTML = esc(naslovPoruke) + "<p>" + tekst + "</p>";
        stanje.setAttribute("tabindex", "-1"); stanje.focus();
      }

      if (F.web3formsKljuc) {
        dugme.disabled = true; dugme.textContent = "Šaljemo upit…";
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: F.web3formsKljuc, subject: naslov, from_name: "Herti Company – web katalog",
            name: ime.value.trim(), email: mail.value.trim() || undefined, phone: tel.value.trim(), message: tijelo
          })
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (!d || !d.success) throw new Error("ne");
          forma.reset(); $$(".artikl-red", artikli).slice(1).forEach(function (r) { r.remove(); }); osvjeziUkloni();
          uspjeh("Hvala! Vaš upit je poslan.", "Kontaktiraćemo Vas u najkraćem roku. Ako je hitno, pozovite nas na " + '<a href="' + tel_() + '">' + esc(F.telefon) + "</a>.");
        }).catch(function () {
          stanje.className = "poruka-stanje ne";
          stanje.innerHTML = "Upit nije poslan.<p>Provjerite internet vezu i pokušajte ponovo, ili nas pozovite na " + '<a href="' + tel_() + '">' + esc(F.telefon) + "</a>.</p>";
        }).then(function () { dugme.disabled = false; dugme.textContent = "Pošaljite upit"; });
      } else {
        location.href = "mailto:" + F.email + "?subject=" + encodeURIComponent(naslov) + "&body=" + encodeURIComponent(tijelo);
        uspjeh("Otvorili smo Vaš e-mail program s gotovim upitom.",
          "Kliknite „Pošalji“ u e-mail programu da upit stigne do nas. Ako se ništa nije otvorilo, pišite na " +
          '<a href="mailto:' + esc(F.email) + '">' + esc(F.email) + '</a> ili nas pozovite na <a href="' + tel_() + '">' + esc(F.telefon) + "</a>.");
      }
    });
    $$("input, select", forma).forEach(function (i) {
      i.addEventListener("input", function () { var p = i.closest(".polje, .saglasnost"); if (p) p.classList.remove("ima-gresku"); });
      i.addEventListener("change", function () { var p = i.closest(".polje, .saglasnost"); if (p) p.classList.remove("ima-gresku"); });
    });
    artikli.addEventListener("change", function (e) { var p = e.target.closest(".polje"); if (p) p.classList.remove("ima-gresku"); });
  }
  function tel_() { return tel(); }

  function upitSekcija(naslov, tekst) {
    return '<div class="upit-okvir"><div class="upit-strana"><h2>' + esc(naslov) + "</h2><p>" + tekst + "</p>" +
      '<p>Radije razgovarate? Pozovite nas:</p><a class="veliki-telefon" href="' + tel() + '">' + esc(F.telefon) + "</a>" +
      '<p>ili pišite na <a href="mailto:' + esc(F.email) + '">' + esc(F.email) + "</a></p></div>" +
      '<div id="upit-obrazac"></div></div>';
  }

  /* ================================================================ STRANICE */

  /* ---------------------------------------- pokretna traka s proizvodima (hero) */
  // Dio pune visine trake prema zapremini pakovanja
  function visinaPakovanja(zapremina) {
    var m = String(zapremina).replace(",", ".").match(/([\d.]+)\s*(ml|l)/i);
    var ml = m ? parseFloat(m[1]) * (m[2].toLowerCase() === "l" ? 1000 : 1) : 1000;
    if (ml <= 750) return 0.68;
    if (ml <= 1000) return 0.8;
    if (ml <= 3000) return 0.9;
    return 1;
  }
  // Nacrtana boca odsječena tačno oko oblika, da stoji na liniji kao fotografija
  var OKVIR_BOCE = { "Galon": [22, 28, 156, 223], "Boca s pumpicom": [46, 26, 110, 225] };
  function predmetTrake(p, i, kopija) {
    var sl = (window.POLICA || {})[p.id];
    var v = visinaPakovanja(p.zapremina);
    var unutra;
    if (sl) {
      unutra = '<img src="slike/proizvodi/polica/' + esc(p.id) + '.webp" alt="' + esc(p.naziv) + '" width="' + sl[0] + '" height="' + sl[1] + '" loading="' + (i < 6 && !kopija ? "eager" : "lazy") + '" decoding="async">';
    } else {
      var o = OKVIR_BOCE[p.pakovanje] || [40, 10, 120, 241];
      unutra = '<svg viewBox="' + o.join(" ") + '" width="' + o[2] + '" height="' + o[3] + '" role="img" aria-label="' + esc(p.naziv) + '">' + oblikBoce(p.pakovanje, p.brend, p.zapremina) + "</svg>";
    }
    return '<a class="traka-predmet" data-kat="' + esc(p.kategorija) + '" href="' + urlProizvod(p) + '" title="' + esc(p.naziv) + '" style="--v:' + v + '"' + (kopija ? ' tabindex="-1"' : "") + ">" + unutra + "</a>";
  }
  function pokretnaTraka(el) {
    if (!el) return;
    // kategorije naizmjenično: kućna, lična, auto, pa opet ispočetka
    var poKat = KAT.map(function (k) { return PR.filter(function (p) { return p.kategorija === k.id; }); });
    var red = [];
    for (var i = 0; red.length < PR.length; i++) poKat.forEach(function (l) { if (l[i]) red.push(l[i]); });
    function niz(kopija) {
      return '<div class="traka-niz"' + (kopija ? ' aria-hidden="true"' : "") + ">" + red.map(function (p, i) { return predmetTrake(p, i, kopija); }).join("") + "</div>";
    }
    el.innerHTML = '<div class="traka" role="region" aria-label="Proizvodi Herti Company">' +
      '<div class="traka-okvir"><div class="traka-red">' + niz(false) + niz(true) + "</div></div>" +
      '<div class="traka-linija" aria-hidden="true"></div></div>';

    // Trajanje kruga prema dužini reda, da brzina (px/s) uvijek bude ista:
    // 0,2 visine trake u sekundi (oko 44 px/s na računaru, 30 px/s na mobitelu)
    var redEl = $(".traka-red", el), prviNiz = $(".traka-niz", el);
    function trajanje() {
      var h = parseFloat(getComputedStyle(el).getPropertyValue("--traka-h")) || 220;
      redEl.style.animationDuration = (prviNiz.getBoundingClientRect().width / (h * 0.2)).toFixed(1) + "s";
    }
    trajanje();
    window.addEventListener("resize", trajanje);
  }

  function pocetna() {
    pokretnaTraka($("#polica"));
    var kat = $("#kategorije");
    if (kat) kat.innerHTML = karticeKategorija(KAT);
    var izd = $("#izdvojeno");
    if (izd) {
      // Lista NAJTRAZENIJI iz podaci/proizvodi.js, tačno tim redoslijedom (nepostojeći id se preskače)
      var lista = (window.NAJTRAZENIJI || []).map(proizvod).filter(Boolean);
      if (!lista.length) lista = PR.filter(function (p) { return p.izdvojeno; });
      if (!lista.length) lista = PR.slice(0, 4);
      izd.innerHTML = mreza(lista.slice(0, 8));
    }
    var n = $("#broj-proizvoda");
    if (n) n.textContent = PR.length;
    var forma = $("#pretraga-forma");
    if (forma) forma.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = $("input", forma).value.trim();
      location.href = "proizvodi.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
    pitanja($("#pitanja"));
  }

  function sviProizvodi() {
    var main = $("#sadrzaj");
    var q = param("q"), filter = param("kategorija");
    if (filter && !kategorija(filter)) filter = "";
    main.innerHTML =
      '<div class="wrap">' + mrvice([{ naziv: "Početna", url: "index.html" }, { naziv: "Svi proizvodi" }]) +
      '<div style="padding:24px 0 0"><h1>Svi proizvodi</h1><p class="lead">' + brojProizvoda(PR.length) + " iz naše fabrike u Kiseljaku, poredano po kategorijama. Upišite šta tražite ili izaberite kategoriju.</p></div>" +
      '<div class="alati">' +
      '<form class="pretraga" role="search" id="pretraga-forma"><label><span class="visually-hidden">Pretražite proizvode</span>' + I.lupa.replace("<svg", '<svg class="lupa"') +
      '<input id="pretraga" type="search" placeholder="Npr. sapun, staklo, 5 L, Exall" autocomplete="off" value="' + esc(q) + '"></label></form>' +
      '<div class="filteri" role="group" aria-label="Prikaži kategoriju"><button type="button" data-f="">Sve kategorije</button>' +
      KAT.map(function (k) { return '<button type="button" data-f="' + k.id + '">' + esc(k.naziv) + "</button>"; }).join("") + "</div>" +
      '<p class="rezultat-info" aria-live="polite"></p></div>' +
      '<div id="lista"></div></div>';

    var input = $("#pretraga"), lista = $("#lista"), info = $(".rezultat-info");

    function tekstZaPretragu(p) {
      var k = kategorija(p.kategorija) || {};
      return norm([p.naziv, p.brend, k.naziv, p.grupa, p.zapremina, p.zapremina.replace(/\s/g, ""), p.pakovanje, p.miris, p.namjena].join(" "));
    }
    function prikazi() {
      var rijeci = norm(input.value).split(/\s+/).filter(Boolean);
      var nadjeni = PR.filter(function (p) {
        if (filter && p.kategorija !== filter) return false;
        var t = tekstZaPretragu(p);
        return rijeci.every(function (r) { return t.indexOf(r) !== -1; });
      });
      $$(".filteri button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-f") === filter ? "true" : "false"); });
      var opis = (rijeci.length || filter) ? "Prikazano: " + brojProizvoda(nadjeni.length) + " od " + PR.length : "Prikazano svih " + PR.length + " proizvoda";
      info.textContent = opis;

      if (!nadjeni.length) {
        lista.innerHTML = '<div class="prazno"><h2>Nismo pronašli „' + esc(input.value.trim()) + '“</h2>' +
          "<p>Provjerite kako je riječ napisana ili pokušajte kraći pojam, npr. „sapun“ ili „5 L“. Možete nas i pozvati, rado ćemo pomoći.</p>" +
          '<div class="dugmad"><button type="button" class="btn btn-glavno" id="ocisti">Prikažite sve proizvode</button><a class="btn btn-obrub" href="' + tel() + '">' + I.tel + "Pozovite " + esc(F.telefon) + "</a></div></div>";
        $("#ocisti").addEventListener("click", function () { input.value = ""; filter = ""; prikazi(); input.focus(); });
      } else {
        lista.innerHTML = KAT.map(function (k) {
          var uKat = nadjeni.filter(function (p) { return p.kategorija === k.id; });
          if (!uKat.length) return "";
          return '<section aria-labelledby="k-' + k.id + '"><div class="grupa-naslov"><h2 id="k-' + k.id + '"><a href="' + urlKategorija(k) + '" style="color:inherit;text-decoration:none">' + esc(k.naziv) + "</a></h2><span>" + brojProizvoda(uKat.length) + "</span></div>" +
            grupeRedom(uKat).map(function (g) {
              return (g.naziv ? '<div class="grupa-naslov mala"><h3>' + esc(g.naziv) + "</h3></div>" : "") + mreza(g.proizvodi, g.naziv ? "h4" : "h3");
            }).join("") + "</section>";
        }).join("");
      }
      try {
        var u = new URL(location.href);
        input.value.trim() ? u.searchParams.set("q", input.value.trim()) : u.searchParams.delete("q");
        filter ? u.searchParams.set("kategorija", filter) : u.searchParams.delete("kategorija");
        history.replaceState(null, "", u.pathname + u.search + u.hash);
      } catch (e) { /* bez promjene adrese */ }
    }
    input.addEventListener("input", prikazi);
    $("#pretraga-forma").addEventListener("submit", function (e) { e.preventDefault(); input.blur(); });
    $$(".filteri button").forEach(function (b) {
      b.addEventListener("click", function () { filter = b.getAttribute("data-f"); prikazi(); });
    });
    prikazi();
    if (location.hash === "#pretraga") input.focus();
    postaviMeta("Svi proizvodi – kućna hemija, lična higijena i auto hemija",
      "Katalog Herti Company: deterdženti za posuđe i veš, tečni sapuni, šamponi i auto hemija iz fabrike u Kiseljaku. Zatražite ponudu bez minimalne narudžbe.",
      "proizvodi.html");
  }

  function stranicaKategorije() {
    var main = $("#sadrzaj");
    var k = kategorija(param("id")) || null;
    if (!k) { nijePronadjeno(main, "Kategorija nije pronađena"); return; }
    var uKat = PR.filter(function (p) { return p.kategorija === k.id; });
    var ostale = KAT.filter(function (x) { return x.id !== k.id; });
    main.innerHTML =
      '<div class="kat-zaglavlje" data-kat="' + k.id + '"><div class="wrap">' +
      mrvice([{ naziv: "Početna", url: "index.html" }, { naziv: "Proizvodi", url: "proizvodi.html" }, { naziv: k.naziv }]) +
      "<div><div><h1>" + esc(k.naslov) + '</h1><p class="lead">' + esc(k.uvod) + "</p>" +
      '<p><strong>' + brojProizvoda(uKat.length) + "</strong>. Bez minimalne narudžbe, s dostavom.</p></div>" + I[k.id] + "</div></div></div>" +
      '<div class="wrap">' +
      grupeRedom(uKat).map(function (g) {
        return (g.naziv ? '<div class="grupa-naslov"><h2>' + esc(g.naziv) + "</h2><span>" + brojProizvoda(g.proizvodi.length) + "</span></div>" : '<div style="height:36px"></div>') + mreza(g.proizvodi, g.naziv ? "h3" : "h2");
      }).join("") + "</div>" +
      '<section class="blok siva" style="margin-top:72px"><div class="wrap savjet"><div><h2>Koje pakovanje izabrati?</h2><p class="muted">Kratak savjet za domaćinstva, trgovine i firme.</p></div><ul>' +
      k.savjet.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div></section>" +
      '<section class="blok"><div class="wrap"><div class="naslov-reda"><h2>Pogledajte i druge kategorije</h2></div><div class="srodne kategorije">' + karticeKategorija(ostale) + "</div></div></section>" +
      '<div class="wrap">' + pozivTraka() + "</div>";
    postaviMeta(k.naslov, k.opisZaGoogle, urlKategorija(k));
  }

  function stranicaProizvoda() {
    var main = $("#sadrzaj");
    var p = proizvod(param("id"));
    if (!p) { nijePronadjeno(main, "Proizvod nije pronađen"); return; }
    var k = kategorija(p.kategorija) || { naziv: "", id: "" };
    var pakovanja = PR.filter(function (x) { return x.linija && x.linija === p.linija; });
    var srodni = PR.filter(function (x) { return x.kategorija === p.kategorija && x.linija !== p.linija && (!p.grupa || x.grupa === p.grupa); });
    var sKategorije = PR.filter(function (x) { return x.kategorija === p.kategorija && x.linija !== p.linija && srodni.indexOf(x) === -1; });
    var vidjeni = {};
    srodni = srodni.concat(sKategorije).filter(function (x) { if (vidjeni[x.linija]) return false; vidjeni[x.linija] = 1; return true; }).slice(0, 4);

    var redovi = [
      ["Brend", p.brend], ["Kategorija", k.naziv], ["Grupa", p.grupa], ["Zapremina", p.zapremina],
      ["Pakovanje", p.pakovanje], ["Miris", p.miris], ["Namjena", p.namjena], ["Proizvođač", F.naziv + ", " + F.mjesto]
    ].filter(function (r) { return r[1]; });

    var mailUpit = "mailto:" + (F.email || "") + "?subject=" + encodeURIComponent("Upit: " + p.naziv);

    main.innerHTML =
      '<div class="wrap">' +
      mrvice([{ naziv: "Početna", url: "index.html" }, { naziv: "Proizvodi", url: "proizvodi.html" }, { naziv: k.naziv, url: urlKategorija(k) }, { naziv: p.naziv }]) +
      '<div class="proizvod-vrh">' + slika(p) +
      "<div>" +
      '<div class="proizvod-brend"><span>' + esc(p.brend) + '</span><span aria-hidden="true">/</span><a href="' + urlKategorija(k) + '">' + esc(k.naziv) + "</a></div>" +
      "<h1>" + esc(p.naziv) + '</h1><p class="lead">' + esc(p.kratakOpis) + "</p>" +
      (pakovanja.length > 1 ? '<div class="pakovanja"><h2>Dostupna pakovanja</h2><ul>' + pakovanja.map(function (x) {
        return "<li>" + (x.id === p.id ? '<span aria-current="true">' + esc(x.zapremina) + "</span>" : '<a href="' + urlProizvod(x) + '">' + esc(x.zapremina) + "</a>") + "</li>";
      }).join("") + "</ul></div>" : '<div class="pakovanja"><h2>Pakovanje</h2><ul><li><span aria-current="true">' + esc(p.zapremina) + "</span></li></ul></div>") +
      '<div class="proizvod-akcije"><a class="btn btn-glavno btn-veliko" href="#upit" id="na-upit">Zatraži ponudu</a>' +
      '<div class="red"><a class="btn btn-obrub" href="' + tel() + '">' + I.tel + "Pozovite</a>" +
      '<a class="btn btn-tiho" href="' + esc(mailUpit) + '">' + I.mail + "Pošaljite e-mail</a></div></div>" +
      '<p class="napomena-mala">Bez minimalne narudžbe. Dostava postoji, uslove dogovaramo uz ponudu.</p>' +
      "</div></div></div>" +

      '<section class="blok siva"><div class="wrap detalji"><div><h2>O proizvodu</h2><p>' + esc(p.opis) + "</p>" +
      '<h3 style="margin-top:28px">Zašto ga kupci biraju</h3><ul class="lista-kvacica">' +
      p.prednosti.map(function (x) { return "<li>" + I.kvacica + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul>" +
      '<p class="napomena-mala" style="margin-top:22px">Prije upotrebe pročitajte uputstvo na etiketi. Čuvati van domašaja djece.</p></div>' +
      '<div><table class="tabela"><caption>Specifikacija</caption><tbody>' +
      redovi.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join("") +
      "</tbody></table>" +
      '<div class="kupci-kutija"><h3>Kupujete za trgovinu ili firmu?</h3>' +
      "<p>Nema minimalne narudžbe, robu dostavljamo, a na upit odgovaramo u najkraćem roku.</p>" +
      '<a class="btn btn-glavno" href="#upit">Zatraži ponudu</a></div></div></div></section>' +

      '<section class="blok" id="upit"><div class="wrap">' +
      upitSekcija("Zatražite ponudu za ovaj proizvod", "Proizvod je već upisan. Dodajte količinu i svoj broj telefona, a mi Vam šaljemo cijenu i uslove dostave u najkraćem roku.") +
      "</div></section>" +

      (srodni.length ? '<section class="blok siva"><div class="wrap"><div class="naslov-reda"><h2>Iz iste kategorije</h2><a class="btn btn-obrub" href="' + urlKategorija(k) + '">Sva ' + esc(k.naziv.toLowerCase()) + "</a></div>" + mreza(srodni) + "</div></section>" : "");

    var forma = $("#upit-obrazac");
    obrazac(forma, { proizvodi: [p.id] });
    $$('a[href="#upit"]', main).forEach(function (a) {
      a.addEventListener("click", function () { setTimeout(function () { forma.fokus(); }, 450); });
    });
    if (location.hash === "#upit") setTimeout(function () { $("#upit").scrollIntoView(); forma.fokus(); }, 60);

    postaviMeta(p.naziv + " – " + p.brend, p.kratakOpis + " Proizvođač Herti Company, Kiseljak. Zatražite ponudu.", urlProizvod(p));
    jsonLd({
      "@context": "https://schema.org", "@type": "Product", name: p.naziv, description: p.opis, category: k.naziv,
      brand: { "@type": "Brand", name: p.brend },
      manufacturer: { "@type": "Organization", name: F.naziv, address: F.adresa + ", " + F.mjesto + ", " + F.drzava, telephone: F.telefonPoziv }
    });
  }

  function stranicaKontakt() {
    var el = $("#upit-obrazac");
    var id = param("proizvod");
    obrazac(el, { proizvodi: proizvod(id) ? [id] : [] });
    pitanja($("#pitanja"));
    $$("[data-tel]").forEach(function (a) { a.href = tel(); a.textContent = F.telefon; });
    $$("[data-mail]").forEach(function (a) { a.href = "mailto:" + F.email; a.textContent = F.email; });
  }

  function pozivTraka() {
    return '<div class="poziv-traka"><div><h2>Trebate ponudu?</h2><p>Pozovite nas ili pošaljite upit. Bez minimalne narudžbe, s dostavom.</p></div>' +
      '<div class="dugmad"><a class="btn btn-glavno btn-veliko" href="' + tel() + '">' + I.tel + esc(F.telefon) + '</a><a class="btn btn-obrub btn-veliko" href="kontakt.html#upit">Zatraži ponudu</a></div></div>';
  }

  function nijePronadjeno(main, naslov) {
    main.innerHTML = '<div class="wrap nema"><p class="velika" aria-hidden="true">404</p><h1>' + esc(naslov) + "</h1>" +
      '<p class="lead">Moguće je da je adresa pogrešno upisana ili da je proizvod u međuvremenu promijenjen. Svi proizvodi su na jednom mjestu.</p>' +
      '<div class="dugmad"><a class="btn btn-glavno btn-veliko" href="proizvodi.html">Pogledajte sve proizvode</a><a class="btn btn-obrub btn-veliko" href="' + tel() + '">' + I.tel + "Pozovite nas</a></div></div>";
    postaviMeta(naslov, "Stranica nije pronađena.");
    var r = document.createElement("meta"); r.name = "robots"; r.content = "noindex"; document.head.appendChild(r);
  }

  /* ------------------------------------------------------------ pokretanje */
  zaglavlje();
  if (STRANICA === "pocetna") pocetna();
  if (STRANICA === "proizvodi") sviProizvodi();
  if (STRANICA === "kategorija") stranicaKategorije();
  if (STRANICA === "proizvod") stranicaProizvoda();
  if (STRANICA === "kontakt") stranicaKontakt();
  if (STRANICA === "404") nijePronadjeno($("#sadrzaj"), "Stranica nije pronađena");
  $$("[data-poziv-traka]").forEach(function (el) { el.innerHTML = pozivTraka(); });
  $$("[data-tel-link]").forEach(function (a) { a.href = tel(); });
  podnozje();
})();
