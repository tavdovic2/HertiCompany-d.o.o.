/* ==========================================================================
   SEO za generator stranica: meta tagovi u <head> i strukturirani podaci (JSON-LD).
   Tekstovi naslova i opisa su u podaci/seo.js.
   ========================================================================== */
"use strict";

module.exports = function (D) {
  const { F, PR, HC } = D;
  const SEO = D.SEO || { stranice: {}, kategorije: {}, proizvodi: {} };
  const esc = HC.esc;
  const MARKA = "Herti Company";
  const BAZA = (F.web || "https://herticompany.ba").replace(/\/$/, "");
  const ID_FIRME = BAZA + "/#firma";

  // Apsolutna adresa: "/proizvodi/" -> "https://herticompany.ba/proizvodi/"
  const aps = putanja => BAZA + "/" + String(putanja || "").replace(/^\//, "");

  /* ------------------------------------------------- naslovi i opisi za Google */
  function skrati(tekst, max) {
    if (tekst.length <= max) return tekst;
    const t = tekst.slice(0, max - 1);
    return t.slice(0, t.lastIndexOf(" ")).replace(/[,.;:–-]+$/, "") + "…";
  }
  const seoStranice = id => SEO.stranice[id] || { naslov: MARKA, opis: "" };
  const seoKategorije = k => SEO.kategorije[k.id] || { naslov: skrati(k.naslov, 44), opis: skrati(k.opisZaGoogle || k.uvod, 160) };
  // Proizvod bez svog reda u podaci/seo.js dobije naslov i opis iz naziva i kratkog opisa
  function seoProizvoda(p) {
    if (SEO.proizvodi[p.id]) return SEO.proizvodi[p.id];
    let naslov = p.naziv + " – " + p.brend;
    if (naslov.length > 44) naslov = p.naziv;
    return { naslov: skrati(naslov, 44), opis: skrati(p.kratakOpis + " Proizvođač iz Kiseljaka. Zatražite ponudu.", 160) };
  }
  const punNaslov = n => (n && n !== MARKA ? n + " | " + MARKA : MARKA);

  /* ------------------------------------------------------- meta tagovi u <head> */
  // o: { naslov, opis, putanja, slika, tip ("website" | "product"), noindex }
  function glava(o) {
    const naslov = punNaslov(o.naslov);
    const url = o.putanja != null ? aps(o.putanja) : "";
    const slika = aps(o.slika || "slike/logo.png");
    const t = ["<title>" + esc(naslov) + "</title>", '<meta name="description" content="' + esc(o.opis) + '">'];
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
  // "<" se kodira da tekst nikad ne može zatvoriti <script>
  const ld = obj => '<script type="application/ld+json">' + JSON.stringify(obj).replace(/</g, "\\u003c") + "</script>";

  function firma() {
    const brendovi = [...new Set(PR.map(p => p.brend))];
    const o = {
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
      address: { "@type": "PostalAddress", streetAddress: F.adresa, addressLocality: F.mjesto, postalCode: F.postanskiBroj, addressCountry: "BA" },
      areaServed: { "@type": "Country", name: "Bosna i Hercegovina" },
      brand: brendovi.map(b => ({ "@type": "Brand", name: b }))
    };
    if (F.idBroj) o.taxID = F.idBroj;
    if (F.pdvBroj) o.vatID = F.pdvBroj;
    return o;
  }
  const webStranica = () => ({
    "@context": "https://schema.org", "@type": "WebSite", "@id": BAZA + "/#web",
    name: MARKA, url: BAZA + "/", inLanguage: "bs", publisher: { "@id": ID_FIRME }
  });
  // stavke: [{ naziv, putanja }]; zadnja stavka je trenutna stranica
  const mrvice = stavke => ({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: stavke.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.naziv, item: aps(s.putanja) }))
  });
  const proizvod = (p, k, putanja) => ({
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
  });
  const pitanja = lista => ({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: lista.map(q => ({ "@type": "Question", name: q.pitanje, acceptedAnswer: { "@type": "Answer", text: q.odgovor } }))
  });

  return {
    BAZA, aps, seoStranice, seoKategorije, seoProizvoda, glava,
    ld, ldFirma: firma, ldWebStranica: webStranica, ldMrvice: mrvice, ldProizvod: proizvod, ldPitanja: pitanja
  };
};
