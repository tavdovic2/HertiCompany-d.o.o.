/* ==========================================================================
   Herti Company – zajednički šabloni (SEO: meta tagovi i strukturirani podaci)
   Koriste ga i preglednik (js/app.js) i generator stranica (alati/generisi-stranice.js),
   pa je isti kod na oba mjesta. Ovaj fajl NE treba mijenjati za dodavanje proizvoda.
   ========================================================================== */
(function (root) {
  "use strict";

  var F = root.FIRMA || {};
  var SEO = root.SEO || { stranice: {}, kategorije: {}, proizvodi: {} };
  var MARKA = "Herti Company";
  var BAZA = (F.web || "https://herticompany.ba").replace(/\/$/, "");
  var ID_FIRME = BAZA + "/#firma";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Apsolutna adresa na herticompany.ba od putanje ("proizvodi/" -> "https://herticompany.ba/proizvodi/")
  function aps(putanja) { return BAZA + "/" + String(putanja || "").replace(/^\//, ""); }

  /* ------------------------------------------------- naslovi i opisi za Google */
  function skrati(tekst, max) {
    if (tekst.length <= max) return tekst;
    var t = tekst.slice(0, max - 1);
    return t.slice(0, t.lastIndexOf(" ")).replace(/[,.;:–-]+$/, "") + "…";
  }
  function seoStranice(id) { return SEO.stranice[id] || { naslov: MARKA, opis: "" }; }
  function seoKategorije(k) {
    return SEO.kategorije[k.id] || { naslov: skrati(k.naslov, 44), opis: skrati(k.opisZaGoogle || k.uvod, 160) };
  }
  // Proizvod bez svog reda u podaci/seo.js dobije naslov i opis iz naziva i kratkog opisa
  function seoProizvoda(p) {
    if (SEO.proizvodi[p.id]) return SEO.proizvodi[p.id];
    var naslov = p.naziv + " – " + p.brend;
    if (naslov.length > 44) naslov = p.naziv;
    return { naslov: skrati(naslov, 44), opis: skrati(p.kratakOpis + " Proizvođač iz Kiseljaka. Zatražite ponudu.", 160) };
  }
  function punNaslov(naslov) { return naslov && naslov !== MARKA ? naslov + " | " + MARKA : MARKA; }

  /* ------------------------------------------------------- meta tagovi u <head> */
  // o: { naslov, opis, putanja, slika, tip ("website" | "product"), noindex }
  function glava(o) {
    var naslov = punNaslov(o.naslov);
    var url = o.putanja != null ? aps(o.putanja) : "";
    var slika = aps(o.slika || "slike/logo.png");
    var t = [
      "<title>" + esc(naslov) + "</title>",
      '<meta name="description" content="' + esc(o.opis) + '">'
    ];
    if (o.noindex) t.push('<meta name="robots" content="noindex">');
    else if (url) t.push('<link rel="canonical" href="' + esc(url) + '">');
    t.push(
      '<meta property="og:type" content="' + (o.tip || "website") + '">',
      '<meta property="og:site_name" content="' + MARKA + '">',
      '<meta property="og:locale" content="bs_BA">',
      '<meta property="og:title" content="' + esc(naslov) + '">',
      '<meta property="og:description" content="' + esc(o.opis) + '">'
    );
    if (url) t.push('<meta property="og:url" content="' + esc(url) + '">');
    t.push(
      '<meta property="og:image" content="' + esc(slika) + '">',
      '<meta name="twitter:card" content="' + (o.slika ? "summary_large_image" : "summary") + '">',
      '<meta name="twitter:title" content="' + esc(naslov) + '">',
      '<meta name="twitter:description" content="' + esc(o.opis) + '">',
      '<meta name="twitter:image" content="' + esc(slika) + '">'
    );
    return t.join("\n");
  }

  /* ------------------------------------------------ strukturirani podaci (JSON-LD) */
  function ld(obj) {
    // "<" se kodira da tekst nikad ne može zatvoriti <script>
    return '<script type="application/ld+json">' + JSON.stringify(obj).replace(/</g, "\\u003c") + "</script>";
  }
  function firma() {
    var brendovi = [];
    (root.PROIZVODI || []).forEach(function (p) { if (brendovi.indexOf(p.brend) === -1) brendovi.push(p.brend); });
    var o = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": ID_FIRME,
      name: F.pravniNaziv || F.naziv,
      alternateName: [F.naziv, F.ranijiNaziv].filter(Boolean),
      description: "Proizvođač kućne hemije, sredstava za ličnu higijenu i auto hemije iz Kiseljaka. Prodaja na veliko i malo, bez minimalne narudžbe, s dostavom.",
      url: BAZA + "/",
      logo: aps("slike/logo.png"),
      image: aps("slike/logo.png"),
      telephone: F.telefonPoziv,
      email: F.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: F.adresa,
        addressLocality: F.mjesto,
        postalCode: F.postanskiBroj,
        addressCountry: "BA"
      },
      areaServed: { "@type": "Country", name: "Bosna i Hercegovina" },
      brand: brendovi.map(function (b) { return { "@type": "Brand", name: b }; })
    };
    if (F.idBroj) o.taxID = F.idBroj;
    if (F.pdvBroj) o.vatID = F.pdvBroj;
    return o;
  }
  function webStranica() {
    return {
      "@context": "https://schema.org", "@type": "WebSite", "@id": BAZA + "/#web",
      name: MARKA, url: BAZA + "/", inLanguage: "bs", publisher: { "@id": ID_FIRME }
    };
  }
  // stavke: [{ naziv, putanja }]; zadnja stavka je trenutna stranica
  function mrvice(stavke) {
    return {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: stavke.map(function (s, i) {
        return { "@type": "ListItem", position: i + 1, name: s.naziv, item: aps(s.putanja) };
      })
    };
  }
  function proizvod(p, k, putanja) {
    return {
      "@context": "https://schema.org", "@type": "Product",
      "@id": aps(putanja) + "#proizvod",
      name: p.naziv,
      description: p.opis,
      image: p.slika ? [aps(p.slika)] : undefined,
      url: aps(putanja),
      category: k ? k.naziv + (p.grupa ? " > " + p.grupa : "") : undefined,
      brand: { "@type": "Brand", name: p.brend },
      manufacturer: { "@type": "Organization", "@id": ID_FIRME, name: F.pravniNaziv || F.naziv, url: BAZA + "/" },
      countryOfOrigin: "BA"
      // Namjerno bez cijene (offers), ocjena i recenzija: na stranici ih nema.
    };
  }
  function pitanja(lista) {
    return {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: lista.map(function (q) {
        return { "@type": "Question", name: q.pitanje, acceptedAnswer: { "@type": "Answer", text: q.odgovor } };
      })
    };
  }

  root.HC = {
    esc: esc, aps: aps, BAZA: BAZA,
    seoStranice: seoStranice, seoKategorije: seoKategorije, seoProizvoda: seoProizvoda,
    glava: glava,
    ld: ld, ldFirma: firma, ldWebStranica: webStranica, ldMrvice: mrvice, ldProizvod: proizvod, ldPitanja: pitanja
  };
})(typeof window !== "undefined" ? window : globalThis);
