/* ==========================================================================
   HTML dijelovi stranica za generator (zaglavlje, podnožje, kartice, stranice).
   Isti izgled kao ranije u js/app.js, ali se sada pravi unaprijed, pa je sav
   tekst u HTML-u i vidljiv Googleu i bez JavaScripta.
   ========================================================================== */
"use strict";

module.exports = function (D) {
  const { F, KAT, PR, HC } = D;
  const { esc, URL, I, brojProizvoda, grupeRedom } = HC;
  const tel = () => "tel:" + (F.telefonPoziv || "");
  const kategorija = id => KAT.find(k => k.id === id);

  /* ----------------------------------------------------------------- slike */
  // Kartice dobiju manju sliku (500 px) ako postoji u slike/proizvodi/mala/; velika (1000 px) ostaje za oštre ekrane.
  function slika(p, o) {
    o = o || {};
    let sadrzaj;
    if (p.slika) {
      const mala = D.malaSlika(p);
      const sizes = o.velika ? "(max-width: 860px) 92vw, 520px" : "(max-width: 560px) 92vw, (max-width: 860px) 45vw, 260px";
      sadrzaj = '<img src="' + esc(URL.fajl(mala || p.slika)) + '"' +
        (mala ? ' srcset="' + esc(URL.fajl(mala)) + " 500w, " + esc(URL.fajl(p.slika)) + ' 1000w" sizes="' + sizes + '"' : "") +
        ' alt="' + esc(p.naziv + " – " + p.brend) + '" width="1000" height="1000"' +
        (o.prva ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
    } else {
      sadrzaj = '<svg class="boca" viewBox="0 0 200 262" role="img" aria-label="' + esc(p.naziv) + '">' + HC.oblikBoce(p.pakovanje, p.brend, p.zapremina) + "</svg>";
    }
    return '<div class="slika' + (p.slika ? " ima-foto" : "") + '" data-kat="' + esc(p.kategorija) + '">' + sadrzaj + "</div>";
  }

  /* -------------------------------------------------------- kartica proizvoda */
  function kartica(p, h) {
    h = h || "h3";
    return '<article class="kartica" data-id="' + esc(p.id) + '">' + slika(p) +
      '<div class="tijelo"><span class="brend">' + esc(p.brend) + "</span>" +
      "<" + h + '><a href="' + URL.proizvod(p) + '">' + esc(p.naziv) + "</a></" + h + ">" +
      '<div class="oznake"><span class="oznaka">' + esc(p.zapremina) + '</span><span class="oznaka">' + esc(p.pakovanje) + "</span></div>" +
      '<div class="kartica-dno"><a class="btn btn-obrub" href="' + URL.proizvod(p) + '#upit">Zatraži ponudu</a></div>' +
      "</div></article>";
  }
  const mreza = (lista, h) => '<div class="mreza">' + lista.map(p => kartica(p, h)).join("") + "</div>";

  /* ------------------------------------------------------------------ mrvice */
  // stavke: [{ naziv, url }]; zadnja je trenutna stranica
  const mrvice = stavke => '<nav class="mrvice" aria-label="Gdje se nalazite"><ol>' + stavke.map((s, i) =>
    "<li>" + (i === stavke.length - 1 ? '<span aria-current="page">' + esc(s.naziv) + "</span>" : '<a href="' + esc(s.url) + '">' + esc(s.naziv) + "</a>") + "</li>"
  ).join("") + "</ol></nav>";

  /* ------------------------------------------------- zaglavlje, podnožje, traka */
  const LOGO = '<img src="/slike/logo-mali.webp" alt="" width="52" height="52">';
  function zaglavlje(aktivna) {
    const stavke = [
      { id: "pocetna", naziv: "Početna", url: URL.pocetna },
      { id: "proizvodi", naziv: "Proizvodi", url: URL.proizvodi },
      { id: "o-nama", naziv: "O nama", url: URL.oNama },
      { id: "kontakt", naziv: "Kontakt", url: URL.kontakt }
    ];
    return '<a class="skip" href="#sadrzaj">Preskočite na sadržaj</a>\n' +
      '<header class="zaglavlje"><div class="wrap">' +
      '<a class="marka" href="/" aria-label="Herti Company – početna stranica">' + LOGO + "<span>Herti Company</span></a>" +
      '<nav class="meni" id="meni" aria-label="Glavni meni">' +
      stavke.map(s => '<a href="' + s.url + '"' + (s.id === aktivna ? ' aria-current="page"' : "") + ">" + s.naziv + "</a>").join("") +
      '<a class="btn btn-glavno" href="' + tel() + '">' + I.tel + "Pozovite " + esc(F.telefon) + "</a>" +
      "</nav>" +
      // Ikonu i natpis dugmeta za temu odmah postavi js/app.js prema izabranoj temi
      '<button class="ikona-pretraga ikona-tema" type="button" aria-label="Uključite tamnu temu" title="Uključite tamnu temu">' + I.mjesec + "</button>" +
      '<a class="ikona-pretraga" href="' + URL.proizvodi + '#pretraga" aria-label="Pretražite proizvode">' + I.lupa + "</a>" +
      '<a class="btn btn-glavno btn-poziv" href="' + tel() + '">' + I.tel + esc(F.telefon) + "</a>" +
      '<button class="meni-dugme" type="button" aria-expanded="false" aria-controls="meni"><span class="ik">' + I.meni + "</span><span>Meni</span></button>" +
      "</div></header>";
  }

  function podnozje(stranica) {
    const pravno = ["© " + D.godina + " " + esc(F.naziv) + ". Sva prava zadržana."];
    if (F.idBroj) pravno.push("ID broj: " + esc(F.idBroj));
    if (F.pdvBroj) pravno.push("PDV broj: " + esc(F.pdvBroj));
    pravno.push('<a href="' + URL.privatnost + '">Politika privatnosti</a>');
    const upitLink = stranica === "proizvod" ? "#upit" : URL.kontakt + "#upit";
    return '<footer class="podnozje"><div class="wrap">' +
      '<div><a class="marka" href="/">' + LOGO + "<span>Herti Company</span></a>" +
      "<p>Deterdženti, sapuni, šamponi i auto hemija iz naše fabrike u Kiseljaku. Bez minimalne narudžbe, s dostavom.</p></div>" +
      "<div><h2>Proizvodi</h2><ul>" +
      KAT.map(k => '<li><a href="' + URL.kategorija(k) + '">' + esc(k.naziv) + "</a></li>").join("") +
      '<li><a href="' + URL.proizvodi + '">Svi proizvodi</a></li></ul></div>' +
      '<div><h2>Firma</h2><ul><li><a href="' + URL.oNama + '">O nama</a></li><li><a href="' + URL.kontakt + '">Kontakt</a></li><li><a href="' + URL.kontakt + '#pitanja">Česta pitanja</a></li><li><a href="' + URL.privatnost + '">Politika privatnosti</a></li></ul></div>' +
      "<div><h2>Kontakt</h2><ul>" +
      '<li><a href="' + tel() + '"><strong>' + esc(F.telefon) + "</strong></a></li>" +
      '<li><a href="mailto:' + esc(F.email) + '">' + esc(F.email) + "</a></li>" +
      "<li>" + esc(F.adresa) + ", " + esc(F.postanskiBroj ? F.postanskiBroj + " " : "") + esc(F.mjesto) + "</li>" +
      (F.radnoVrijeme ? "<li>" + esc(F.radnoVrijeme) + "</li>" : "") +
      "</ul></div>" +
      '<div class="pravno">' + pravno.map(x => "<span>" + x + "</span>").join("") + "</div>" +
      "</div></footer>\n" +
      '<div class="donja-traka" role="navigation" aria-label="Brze akcije">' +
      '<a class="btn btn-obrub" href="' + tel() + '">' + I.tel + "Pozovite</a>" +
      '<a class="btn btn-glavno" href="' + upitLink + '">Zatraži ponudu</a></div>';
  }

  /* ------------------------------------------------------- manji zajednički dijelovi */
  const pitanja = lista => '<div class="pitanja">' + lista.map(q =>
    "<details><summary>" + esc(q.pitanje) + "</summary><p>" + esc(q.odgovor) + "</p></details>").join("") + "</div>";

  const karticeKategorija = lista => lista.map(k => {
    const n = PR.filter(p => p.kategorija === k.id).length;
    return '<a class="kat-kartica" data-kat="' + k.id + '" href="' + URL.kategorija(k) + '">' + I[k.id] +
      "<h3>" + esc(k.naziv) + "</h3><p>" + esc(k.uvod) + "</p>" +
      '<div class="kat-dno"><span>' + brojProizvoda(n) + "</span><span>" + I.strelica + "</span></div></a>";
  }).join("");

  const pozivTraka = () => '<div class="poziv-traka"><div><h2>Trebate ponudu?</h2><p>Pozovite nas ili pošaljite upit. Bez minimalne narudžbe, s dostavom.</p></div>' +
    '<div class="dugmad"><a class="btn btn-glavno btn-veliko" href="' + tel() + '">' + I.tel + esc(F.telefon) + '</a><a class="btn btn-obrub btn-veliko" href="' + URL.kontakt + '#upit">Zatraži ponudu</a></div></div>';

  // Obrazac pravi js/app.js; bez JavaScripta ostaju telefon i e-mail
  const bezJsObrazac = '<noscript><p class="obrazac">Obrazac za upit radi uz uključen JavaScript. Pozovite nas na <a href="' + tel() + '">' + esc(F.telefon) + '</a> ili pišite na <a href="mailto:' + esc(F.email) + '">' + esc(F.email) + "</a>.</p></noscript>";
  const upitSekcija = (naslov, tekst) => '<div class="upit-okvir"><div class="upit-strana"><h2>' + esc(naslov) + "</h2><p>" + tekst + "</p>" +
    '<p>Radije razgovarate? Pozovite nas:</p><a class="veliki-telefon" href="' + tel() + '">' + esc(F.telefon) + "</a>" +
    '<p>ili pišite na <a href="mailto:' + esc(F.email) + '">' + esc(F.email) + "</a></p></div>" +
    '<div id="upit-obrazac">' + bezJsObrazac + "</div></div>";

  /* ================================================================ STRANICE */

  function sviProizvodi() {
    const filteri = '<div class="filteri" role="group" aria-label="Prikaži kategoriju"><button type="button" data-f="" aria-pressed="true">Sve kategorije</button>' +
      KAT.map(k => '<button type="button" data-f="' + k.id + '" aria-pressed="false">' + esc(k.naziv) + "</button>").join("") + "</div>";
    const lista = KAT.map(k => {
      const uKat = PR.filter(p => p.kategorija === k.id);
      if (!uKat.length) return "";
      return '<section class="kat-sekcija" data-kat="' + k.id + '" aria-labelledby="k-' + k.id + '"><div class="grupa-naslov"><h2 id="k-' + k.id + '"><a href="' + URL.kategorija(k) + '" class="link-tiho">' + esc(k.naziv) + '</a></h2><span class="broj">' + brojProizvoda(uKat.length) + "</span></div>" +
        grupeRedom(uKat).map(g => '<div class="grupa-blok">' + (g.naziv ? '<div class="grupa-naslov mala"><h3>' + esc(g.naziv) + "</h3></div>" : "") + mreza(g.proizvodi, g.naziv ? "h4" : "h3") + "</div>").join("") +
        "</section>";
    }).join("");
    return '<div class="wrap">' + mrvice([{ naziv: "Početna", url: "/" }, { naziv: "Svi proizvodi" }]) +
      '<div class="pt-24"><h1>Svi proizvodi</h1><p class="lead">' + brojProizvoda(PR.length) + " iz naše fabrike u Kiseljaku, poredano po kategorijama. Upišite šta tražite ili izaberite kategoriju.</p></div>" +
      '<div class="alati">' +
      '<form class="pretraga" role="search" id="pretraga-forma" action="' + URL.proizvodi + '" method="get"><label><span class="visually-hidden">Pretražite proizvode</span>' + I.lupa.replace("<svg", '<svg class="lupa"') +
      '<input id="pretraga" name="q" type="search" placeholder="Npr. sapun, staklo, 5 L, Exall" autocomplete="off"></label></form>' +
      filteri + '<p class="rezultat-info" aria-live="polite">Prikazano svih ' + PR.length + " proizvoda</p></div>" +
      '<div id="lista">' + lista +
      '<div class="prazno" id="prazno" hidden><h2>Nismo pronašli „<span id="prazno-pojam"></span>“</h2>' +
      "<p>Provjerite kako je riječ napisana ili pokušajte kraći pojam, npr. „sapun“ ili „5 L“. Možete nas i pozvati, rado ćemo pomoći.</p>" +
      '<div class="dugmad"><button type="button" class="btn btn-glavno" id="ocisti">Prikažite sve proizvode</button><a class="btn btn-obrub" href="' + tel() + '">' + I.tel + "Pozovite " + esc(F.telefon) + "</a></div></div>" +
      "</div></div>";
  }

  function stranicaKategorije(k) {
    const uKat = PR.filter(p => p.kategorija === k.id);
    const ostale = KAT.filter(x => x.id !== k.id);
    return '<div class="kat-zaglavlje" data-kat="' + k.id + '"><div class="wrap">' +
      mrvice([{ naziv: "Početna", url: "/" }, { naziv: "Proizvodi", url: URL.proizvodi }, { naziv: k.naziv }]) +
      "<div><div><h1>" + esc(k.naslov) + '</h1><p class="lead">' + esc(k.uvod) + "</p>" +
      "<p><strong>" + brojProizvoda(uKat.length) + "</strong>. Bez minimalne narudžbe, s dostavom.</p></div>" + I[k.id] + "</div></div></div>" +
      '<div class="wrap">' +
      grupeRedom(uKat).map(g => (g.naziv ? '<div class="grupa-naslov"><h2>' + esc(g.naziv) + "</h2><span>" + brojProizvoda(g.proizvodi.length) + "</span></div>" : '<div class="h-36"></div>') + mreza(g.proizvodi, g.naziv ? "h3" : "h2")).join("") +
      "</div>" +
      '<section class="blok siva mt-72"><div class="wrap savjet"><div><h2>Koje pakovanje izabrati?</h2><p class="muted">Kratak savjet za domaćinstva, trgovine i firme.</p></div><ul>' +
      k.savjet.map(s => "<li>" + esc(s) + "</li>").join("") + "</ul></div></section>" +
      '<section class="blok"><div class="wrap"><div class="naslov-reda"><h2>Pogledajte i druge kategorije</h2></div><div class="srodne kategorije">' + karticeKategorija(ostale) + "</div></div></section>" +
      '<div class="wrap">' + pozivTraka() + "</div>";
  }

  function stranicaProizvoda(p) {
    const k = kategorija(p.kategorija) || { naziv: "", id: "" };
    const pakovanja = PR.filter(x => x.linija && x.linija === p.linija);
    let srodni = PR.filter(x => x.kategorija === p.kategorija && x.linija !== p.linija && (!p.grupa || x.grupa === p.grupa));
    const sKategorije = PR.filter(x => x.kategorija === p.kategorija && x.linija !== p.linija && !srodni.includes(x));
    const vidjeni = {};
    srodni = srodni.concat(sKategorije).filter(x => { if (vidjeni[x.linija]) return false; vidjeni[x.linija] = 1; return true; }).slice(0, 4);
    const redovi = [
      ["Brend", p.brend], ["Kategorija", k.naziv], ["Grupa", p.grupa], ["Zapremina", p.zapremina],
      ["Pakovanje", p.pakovanje], ["Miris", p.miris], ["Namjena", p.namjena], ["Proizvođač", F.naziv + ", " + F.mjesto]
    ].filter(r => r[1]);
    const mailUpit = "mailto:" + (F.email || "") + "?subject=" + encodeURIComponent("Upit: " + p.naziv);

    return '<div class="wrap">' +
      mrvice([{ naziv: "Početna", url: "/" }, { naziv: "Proizvodi", url: URL.proizvodi }, { naziv: k.naziv, url: URL.kategorija(k) }, { naziv: p.naziv }]) +
      '<div class="proizvod-vrh">' + slika(p, { prva: true, velika: true }) +
      "<div>" +
      '<div class="proizvod-brend"><span>' + esc(p.brend) + '</span><span aria-hidden="true">/</span><a href="' + URL.kategorija(k) + '">' + esc(k.naziv) + "</a></div>" +
      "<h1>" + esc(p.naziv) + '</h1><p class="lead">' + esc(p.kratakOpis) + "</p>" +
      (pakovanja.length > 1
        ? '<div class="pakovanja"><h2>Dostupna pakovanja</h2><ul>' + pakovanja.map(x => "<li>" + (x.id === p.id ? '<span aria-current="true">' + esc(x.zapremina) + "</span>" : '<a href="' + URL.proizvod(x) + '">' + esc(x.zapremina) + "</a>") + "</li>").join("") + "</ul></div>"
        : '<div class="pakovanja"><h2>Pakovanje</h2><ul><li><span aria-current="true">' + esc(p.zapremina) + "</span></li></ul></div>") +
      '<div class="proizvod-akcije"><a class="btn btn-glavno btn-veliko" href="#upit" id="na-upit">Zatraži ponudu</a>' +
      '<div class="red"><a class="btn btn-obrub" href="' + tel() + '">' + I.tel + "Pozovite</a>" +
      '<a class="btn btn-tiho" href="' + esc(mailUpit) + '">' + I.mail + "Pošaljite e-mail</a></div></div>" +
      '<p class="napomena-mala">Bez minimalne narudžbe. Dostava postoji, uslove dogovaramo uz ponudu.</p>' +
      "</div></div></div>" +

      '<section class="blok siva"><div class="wrap detalji"><div><h2>O proizvodu</h2><p>' + esc(p.opis) + "</p>" +
      '<h3 class="mt-28">Zašto ga kupci biraju</h3><ul class="lista-kvacica">' +
      p.prednosti.map(x => "<li>" + I.kvacica + "<span>" + esc(x) + "</span></li>").join("") + "</ul>" +
      '<p class="napomena-mala mt-22">Prije upotrebe pročitajte uputstvo na etiketi. Čuvati van domašaja djece.</p></div>' +
      '<div><table class="tabela"><caption>Specifikacija</caption><tbody>' +
      redovi.map(r => '<tr><th scope="row">' + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>").join("") +
      "</tbody></table>" +
      '<div class="kupci-kutija"><h3>Kupujete za trgovinu ili firmu?</h3>' +
      "<p>Nema minimalne narudžbe, robu dostavljamo, a na upit odgovaramo u najkraćem roku.</p>" +
      '<a class="btn btn-glavno" href="#upit">Zatraži ponudu</a></div></div></div></section>' +

      '<section class="blok" id="upit"><div class="wrap">' +
      upitSekcija("Zatražite ponudu za ovaj proizvod", "Proizvod je već upisan. Dodajte količinu i svoj broj telefona, a mi Vam šaljemo cijenu i uslove dostave u najkraćem roku.") +
      "</div></section>" +

      (srodni.length ? '<section class="blok siva"><div class="wrap"><div class="naslov-reda"><h2>Iz iste kategorije</h2><a class="btn btn-obrub" href="' + URL.kategorija(k) + '">Sva ' + esc(k.naziv.toLowerCase()) + "</a></div>" + mreza(srodni) + "</div></section>" : "");
  }

  const stranica404 = () => '<div class="wrap nema"><p class="velika" aria-hidden="true">404</p><h1>Stranica nije pronađena</h1>' +
    '<p class="lead">Moguće je da je adresa pogrešno upisana ili da je proizvod u međuvremenu promijenjen. Svi proizvodi su na jednom mjestu.</p>' +
    '<div class="dugmad"><a class="btn btn-glavno btn-veliko" href="' + URL.proizvodi + '">Pogledajte sve proizvode</a><a class="btn btn-obrub btn-veliko" href="' + tel() + '">' + I.tel + "Pozovite nas</a></div></div>";

  /* ------------------------------------------------- <head> resursi i skripte */
  // Fontovi se učitavaju bez blokiranja prikaza: tekst se odmah vidi, a font se zamijeni kad stigne (display=swap).
  // media="print" -> "all" prebacuje js/tema.js (Content-Security-Policy ne dozvoljava onload="" u HTML-u).
  // js/tema.js postavi temu prije učitavanja CSS-a, pa stranica ne bljesne pogrešnom bojom (zato bez defer).
  const FONTOVI = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Poppins:wght@600;700&family=Montserrat:wght@800&display=swap";
  const resursi = () => [
    '<meta name="theme-color" content="#ffffff">',
    '<link rel="icon" type="image/png" href="/slike/favicon.png">',
    '<link rel="apple-touch-icon" href="/slike/apple-touch-icon.png">',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="stylesheet" href="' + FONTOVI + '" media="print" data-fontovi>',
    '<noscript><link rel="stylesheet" href="' + FONTOVI + '"></noscript>',
    '<script src="' + D.v("js/tema.js") + '"></script>',
    '<link rel="stylesheet" href="' + D.v("css/stil.css") + '">'
  ].join("\n");
  // Svaka stranica učitava samo podatke koji joj trebaju
  const skripte = lista => lista.map(f => '<script src="' + D.v(f) + '" defer></script>').join("\n");

  // Cijela generisana stranica
  function dokument(o) {
    return "<!doctype html>\n" +
      '<html lang="bs">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      "<!-- SEO -->\n" + o.seo + "\n<!-- /SEO -->\n" +
      "<!-- HC:resursi -->\n" + resursi() + "\n<!-- /HC:resursi -->\n" +
      "</head>\n" +
      '<body data-stranica="' + o.stranica + '">\n' +
      "<!-- HC:zaglavlje -->\n" + zaglavlje(o.aktivna) + "\n<!-- /HC:zaglavlje -->\n" +
      '<main id="sadrzaj">\n' + o.main + "\n</main>\n" +
      "<!-- HC:podnozje -->\n" + podnozje(o.stranica) + "\n<!-- /HC:podnozje -->\n" +
      "<!-- HC:skripte -->\n" + skripte(o.skripte) + "\n<!-- /HC:skripte -->\n" +
      "</body>\n</html>\n";
  }

  return {
    slika, kartica, mreza, mrvice, zaglavlje, podnozje, pitanja, karticeKategorija, pozivTraka, upitSekcija,
    sviProizvodi, stranicaKategorije, stranicaProizvoda, stranica404, resursi, skripte, dokument
  };
};
