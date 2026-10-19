/* ==========================================================================
   Herti Company – ponašanje stranice (tema, meni, pretraga, polica, obrazac)
   Sadržaj stranica (tekst, kartice, zaglavlje, podnožje) pravi unaprijed
   alati/generisi-stranice.js, pa je vidljiv i bez JavaScripta.
   Ovaj fajl NE treba mijenjati za dodavanje proizvoda.
   Proizvodi su u: podaci/proizvodi.js   Kontakt podaci su u: podaci/postavke.js
   ========================================================================== */
(function () {
  "use strict";

  var HC = window.HC;
  var F = window.FIRMA || {};
  var KAT = window.KATEGORIJE || [];
  var PR = window.PROIZVODI || [];
  var STRANICA = document.body.getAttribute("data-stranica") || "";
  var esc = HC.esc, I = HC.I, URL_ = HC.URL;

  /* ---------------------------------------------------------------- pomoćno */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function param(ime) { try { return new URLSearchParams(location.search).get(ime) || ""; } catch (e) { return ""; } }
  function kategorija(id) { return KAT.filter(function (k) { return k.id === id; })[0]; }
  function proizvod(id) { return PR.filter(function (p) { return p.id === id; })[0]; }
  function tel() { return "tel:" + (F.telefonPoziv || ""); }

  /* ------------------------------------------------------------ tema i meni */
  function zaglavlje() {
    var temaDugme = $(".ikona-tema");
    if (temaDugme) {
      var prikaziTemu = function (tema) {
        var tamna = tema === "dark";
        var natpis = tamna ? "Uključite svijetlu temu" : "Uključite tamnu temu";
        document.documentElement.setAttribute("data-theme", tamna ? "dark" : "light");
        temaDugme.innerHTML = tamna ? I.sunce : I.mjesec;
        temaDugme.setAttribute("aria-label", natpis);
        temaDugme.title = natpis;
        var boja = $('meta[name="theme-color"]');
        if (boja) boja.content = tamna ? "#0f1a2b" : "#ffffff";
      };
      prikaziTemu(document.documentElement.getAttribute("data-theme"));
      temaDugme.addEventListener("click", function () {
        var nova = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        prikaziTemu(nova);
        try { localStorage.setItem("herti-tema", nova); } catch (e) { /* izbor se ne pamti, tema i dalje radi */ }
      });
    }

    var dugme = $(".meni-dugme"), meni = $("#meni");
    if (!dugme || !meni) return;
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
      '<label class="saglasnost"><input type="checkbox" name="saglasnost" required><span>Slažem se da Herti Company koristi moje podatke samo da odgovori na ovaj upit. Više u <a href="' + URL_.privatnost + '" target="_blank">Politici privatnosti</a>.</span></label>' +
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

    el.fokus = function () { var k = $('[name="kolicina"]', forma); (k || $("#u-ime", forma)).focus({ preventScroll: true }); };

    function greska(polje, ima) { polje.classList.toggle("ima-gresku", ima); }

    forma.addEventListener("submit", function (e) {
      e.preventDefault();
      var stanje = $(".poruka-stanje", forma);
      stanje.className = "poruka-stanje"; stanje.innerHTML = "";
      var ime = $("#u-ime", forma), telEl = $("#u-tel", forma), mail = $("#u-mail", forma), napomena = $("#u-napomena", forma);
      var stavke = $$(".artikl-red", artikli).map(function (r) {
        var p = proizvod($("select", r).value);
        return p ? { p: p, kolicina: $('[name="kolicina"]', r).value.trim() } : null;
      }).filter(Boolean);
      var ok = true, prvo = null;
      function provjeri(uslov, polje, fokusEl) { greska(polje, !uslov); if (!uslov) { ok = false; prvo = prvo || fokusEl; } }
      var prviRed = $(".artikl-red .polje", artikli);
      provjeri(stavke.length > 0 || napomena.value.trim().length > 0, prviRed, $("select", prviRed));
      provjeri(ime.value.trim().length > 1, ime.closest(".polje"), ime);
      provjeri(telEl.value.replace(/\D/g, "").length >= 6, telEl.closest(".polje"), telEl);
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
        "Telefon: " + telEl.value.trim() + "\n" +
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
            name: ime.value.trim(), email: mail.value.trim() || undefined, phone: telEl.value.trim(), message: tijelo
          })
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (!d || !d.success) throw new Error("ne");
          forma.reset(); $$(".artikl-red", artikli).slice(1).forEach(function (r) { r.remove(); }); osvjeziUkloni();
          uspjeh("Hvala! Vaš upit je poslan.", "Kontaktiraćemo Vas u najkraćem roku. Ako je hitno, pozovite nas na " + '<a href="' + tel() + '">' + esc(F.telefon) + "</a>.");
        }).catch(function () {
          stanje.className = "poruka-stanje ne";
          stanje.innerHTML = "Upit nije poslan.<p>Provjerite internet vezu i pokušajte ponovo, ili nas pozovite na " + '<a href="' + tel() + '">' + esc(F.telefon) + "</a>.</p>";
        }).then(function () { dugme.disabled = false; dugme.textContent = "Pošaljite upit"; });
      } else {
        location.href = "mailto:" + F.email + "?subject=" + encodeURIComponent(naslov) + "&body=" + encodeURIComponent(tijelo);
        uspjeh("Otvorili smo Vaš e-mail program s gotovim upitom.",
          "Kliknite „Pošalji“ u e-mail programu da upit stigne do nas. Ako se ništa nije otvorilo, pišite na " +
          '<a href="mailto:' + esc(F.email) + '">' + esc(F.email) + '</a> ili nas pozovite na <a href="' + tel() + '">' + esc(F.telefon) + "</a>.");
      }
    });
    $$("input, select", forma).forEach(function (i) {
      i.addEventListener("input", function () { var p = i.closest(".polje, .saglasnost"); if (p) p.classList.remove("ima-gresku"); });
      i.addEventListener("change", function () { var p = i.closest(".polje, .saglasnost"); if (p) p.classList.remove("ima-gresku"); });
    });
    artikli.addEventListener("change", function (e) { var p = e.target.closest(".polje"); if (p) p.classList.remove("ima-gresku"); });
  }

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
      unutra = '<img src="/slike/proizvodi/polica/' + esc(p.id) + '.webp" alt="' + esc(p.naziv) + '" width="' + sl[0] + '" height="' + sl[1] + '" loading="' + (i < 6 && !kopija ? "eager" : "lazy") + '" decoding="async">';
    } else {
      var o = OKVIR_BOCE[p.pakovanje] || [40, 10, 120, 241];
      unutra = '<svg viewBox="' + o.join(" ") + '" width="' + o[2] + '" height="' + o[3] + '" role="img" aria-label="' + esc(p.naziv) + '">' + HC.oblikBoce(p.pakovanje, p.brend, p.zapremina) + "</svg>";
    }
    return '<a class="traka-predmet" data-kat="' + esc(p.kategorija) + '" href="' + URL_.proizvod(p) + '" title="' + esc(p.naziv) + '" style="--v:' + v + '"' + (kopija ? ' tabindex="-1"' : "") + ">" + unutra + "</a>";
  }
  function pokretnaTraka(el) {
    if (!el || !PR.length) return;
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

  /* ---------------------------------------- Svi proizvodi: pretraga i filter */
  // Kartice su već u HTML-u; pretraga ih samo sakriva i prikazuje
  function sviProizvodi() {
    var input = $("#pretraga"), info = $(".rezultat-info"), prazno = $("#prazno");
    if (!input) return;
    var filter = param("kategorija");
    if (filter && !kategorija(filter)) filter = "";
    input.value = param("q");
    var tekst = {};
    PR.forEach(function (p) {
      var k = kategorija(p.kategorija) || {};
      tekst[p.id] = HC.norm([p.naziv, p.brend, k.naziv, p.grupa, p.zapremina, p.zapremina.replace(/\s/g, ""), p.pakovanje, p.miris, p.namjena].join(" "));
    });

    function prikazi() {
      var rijeci = HC.norm(input.value).split(/\s+/).filter(Boolean);
      var ukupno = 0;
      $$(".kat-sekcija").forEach(function (sek) {
        var uSek = 0;
        $$(".grupa-blok", sek).forEach(function (g) {
          var uGrupi = 0;
          $$(".kartica", g).forEach(function (kar) {
            var t = tekst[kar.getAttribute("data-id")] || "";
            var vidljiva = (!filter || sek.getAttribute("data-kat") === filter) && rijeci.every(function (r) { return t.indexOf(r) !== -1; });
            kar.hidden = !vidljiva;
            if (vidljiva) uGrupi++;
          });
          g.hidden = !uGrupi;
          uSek += uGrupi;
        });
        sek.hidden = !uSek;
        $(".broj", sek).textContent = HC.brojProizvoda(uSek);
        ukupno += uSek;
      });
      $$(".filteri button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-f") === filter ? "true" : "false"); });
      info.textContent = (rijeci.length || filter) ? "Prikazano: " + HC.brojProizvoda(ukupno) + " od " + PR.length : "Prikazano svih " + PR.length + " proizvoda";
      prazno.hidden = ukupno > 0;
      $("#prazno-pojam").textContent = input.value.trim();
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
    $("#ocisti").addEventListener("click", function () { input.value = ""; filter = ""; prikazi(); input.focus(); });
    if (input.value || filter) prikazi();
    if (location.hash === "#pretraga") input.focus();
  }

  /* ------------------------------------------------------- stranica proizvoda */
  function stranicaProizvoda() {
    var forma = $("#upit-obrazac");
    // id proizvoda je zadnji dio adrese: /proizvodi/<kategorija>/<proizvod>/
    var dijelovi = location.pathname.split("/").filter(Boolean);
    var p = proizvod(dijelovi[dijelovi.length - 1]);
    obrazac(forma, { proizvodi: p ? [p.id] : [] });
    $$('a[href="#upit"]').forEach(function (a) {
      a.addEventListener("click", function () { setTimeout(function () { forma.fokus(); }, 450); });
    });
    if (location.hash === "#upit") setTimeout(function () { $("#upit").scrollIntoView(); forma.fokus(); }, 60);
  }

  /* ------------------------------------------------------------ pokretanje */
  zaglavlje();
  if (STRANICA === "pocetna") pokretnaTraka($("#polica"));
  if (STRANICA === "proizvodi") sviProizvodi();
  if (STRANICA === "proizvod") stranicaProizvoda();
  if (STRANICA === "kontakt") {
    var id = param("proizvod");
    obrazac($("#upit-obrazac"), { proizvodi: proizvod(id) ? [id] : [] });
  }
})();
