#!/usr/bin/env node
/* ==========================================================================
   GENERATOR STRANICA – Herti Company
   --------------------------------------------------------------------------
   Pravi gotove HTML stranice od podataka u folderu podaci/, tako da je sav
   tekst vidljiv Googleu i bez JavaScripta.

   Pokretanje (iz glavnog foldera projekta, treba samo Node.js):
       node alati/generisi-stranice.js

   Pokrenite ga UVIJEK nakon izmjene u podaci/ (proizvodi, postavke, seo),
   css/ ili js/, pa dobijene fajlove pošaljite na GitHub zajedno s izmjenom.

   Šta pravi:
   - proizvodi/index.html                        (svi proizvodi)
   - proizvodi/<kategorija>/index.html            (svaka kategorija)
   - proizvodi/<kategorija>/<proizvod>/index.html (svaki proizvod)
   - 404.html, proizvod.html i kategorija.html (stare adrese -> nove)
   - sitemap.xml
   Na ručno pisanim stranicama (index.html, o-nama/, kontakt/, privatnost/)
   obnavlja samo dijelove između oznaka <!-- HC:... --> i <!-- SEO -->.
   ========================================================================== */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const r = (...d) => path.join(ROOT, ...d);
const STANJE = r("alati", "stanje-stranica.json");
const danas = new Date().toISOString().slice(0, 10);

/* --------------------------------------------------------- učitavanje podataka */
const ctx = { console };
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
for (const f of ["podaci/postavke.js", "podaci/proizvodi.js", "podaci/seo.js", "podaci/polica.js", "js/sablon.js"]) {
  if (!fs.existsSync(r(f))) { if (f === "podaci/polica.js") continue; throw new Error("Nema fajla " + f); }
  try { vm.runInContext(fs.readFileSync(r(f), "utf8"), ctx, { filename: f }); }
  catch (e) { console.error("\nGREŠKA u fajlu " + f + ": " + e.message + "\nNajčešće je to zaboravljen zarez ili navodnik u zadnjoj izmjeni.\n"); process.exit(1); }
}
const D = {
  F: ctx.FIRMA || {}, KAT: ctx.KATEGORIJE || [], PR: ctx.PROIZVODI || [], SEO: ctx.SEO,
  PITANJA: ctx.PITANJA || [], NAJTRAZENIJI: ctx.NAJTRAZENIJI || [], HC: ctx.HC,
  godina: new Date().getFullYear()
};

/* ------------------------------------------------------------- provjera podataka */
const greske = [], upozorenja = [];
const ids = new Set();
for (const p of D.PR) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) greske.push(`Proizvod "${p.naziv}": id "${p.id}" smije imati samo mala slova bez kvačica, brojeve i crtice.`);
  if (ids.has(p.id)) greske.push(`Isti id je upisan dva puta: ${p.id}`);
  ids.add(p.id);
  if (!D.KAT.some(k => k.id === p.kategorija)) greske.push(`Proizvod ${p.id}: kategorija "${p.kategorija}" ne postoji.`);
  if (p.slika && !fs.existsSync(r(p.slika))) greske.push(`Proizvod ${p.id}: slika ${p.slika} ne postoji.`);
  if (!D.SEO || !D.SEO.proizvodi[p.id]) upozorenja.push(`Proizvod ${p.id} nema svoj red u podaci/seo.js – naslov i opis za Google napravljeni su automatski.`);
}
for (const id of D.NAJTRAZENIJI) if (!ids.has(id)) upozorenja.push(`NAJTRAZENIJI: proizvod "${id}" ne postoji, preskočen je.`);
if (greske.length) { console.error("\nGREŠKE – stranice NISU napravljene:\n- " + greske.join("\n- ") + "\n"); process.exit(1); }

/* --------------------------------------------- verzije fajlova i manje slike */
// ?v=<otisak sadržaja> u adresi CSS/JS fajla: preglednik dugo pamti fajl, a čim se fajl promijeni, adresa je nova
const otisak = f => crypto.createHash("md5").update(fs.readFileSync(r(f))).digest("hex").slice(0, 8);
const verzije = {};
D.v = f => "/" + f + "?v=" + (verzije[f] || (verzije[f] = otisak(f)));
D.malaSlika = p => {
  const m = p.slika && p.slika.replace(/^slike\/proizvodi\//, "slike/proizvodi/mala/");
  return m && m !== p.slika && fs.existsSync(r(m)) ? m : null;
};
for (const p of D.PR) if (p.slika && !D.malaSlika(p)) upozorenja.push(`Proizvod ${p.id} nema manju sliku u slike/proizvodi/mala/ (kartice koriste veliku). Pokrenite: python alati/male-slike.py`);

const SEO = require("./seo.js")(D);
const H = require("./html.js")(D);
const { URL } = D.HC;
const kategorija = id => D.KAT.find(k => k.id === id);
const seoBlok = (o, jsonLd) => SEO.glava(o) + (jsonLd || []).map(x => "\n" + SEO.ld(x)).join("");
const M = (...st) => SEO.ldMrvice([{ naziv: "Početna", putanja: "/" }, ...st]);

/* ----------------------------------------------------------- pisanje fajlova */
const stanjePrije = fs.existsSync(STANJE) ? JSON.parse(fs.readFileSync(STANJE, "utf8")) : {};
const stanje = {}, napisano = [];
// Otisak stranice za lastmod: bez ?v= oznaka, jer izmjena CSS-a ne mijenja sadržaj stranice
const hash = s => crypto.createHash("md5").update(s.replace(/\?v=[0-9a-f]{8}/g, "")).digest("hex");
// adresa: putanja za sitemap ("/proizvodi/") ili null ako stranica ne ide u sitemap
function zapisi(fajl, sadrzaj, adresa) {
  const pun = r(fajl);
  fs.mkdirSync(path.dirname(pun), { recursive: true });
  const staro = fs.existsSync(pun) ? fs.readFileSync(pun, "utf8").replace(/\r\n/g, "\n") : null;
  if (staro !== sadrzaj) { fs.writeFileSync(pun, sadrzaj); napisano.push(fajl); }
  if (adresa) {
    const h = hash(sadrzaj), p = stanjePrije[adresa];
    stanje[adresa] = { hash: h, lastmod: p && p.hash === h ? p.lastmod : danas };
  }
}
// Ručno pisane stranice: zamijeni samo označene dijelove
function obnovi(fajl, dijelovi, adresa) {
  let c = fs.readFileSync(r(fajl), "utf8").replace(/\r\n/g, "\n");
  for (const [ime, html] of Object.entries(dijelovi)) {
    const re = ime === "SEO" ? /<!-- SEO -->[\s\S]*?<!-- \/SEO -->/ : new RegExp("<!-- HC:" + ime + " -->[\\s\\S]*?<!-- /HC:" + ime + " -->");
    if (!re.test(c)) throw new Error(`${fajl}: nema oznake za "${ime}"`);
    c = c.replace(re, () => ime === "SEO" ? "<!-- SEO -->\n" + html + "\n<!-- /SEO -->" : "<!-- HC:" + ime + " -->\n" + html + "\n<!-- /HC:" + ime + " -->");
  }
  zapisi(fajl, c, adresa);
}
const zajednicko = (stranica, aktivna, skripte) => ({
  resursi: H.resursi(), zaglavlje: H.zaglavlje(aktivna), podnozje: H.podnozje(stranica), skripte: H.skripte(skripte)
});
const S_OSNOVNE = ["js/sablon.js", "js/app.js"];
const S_OBRAZAC = ["podaci/postavke.js", "podaci/proizvodi.js", "js/sablon.js", "js/app.js"];

/* ---------------------------------------------------------- ručno pisane stranice */
const najtrazeniji = (() => {
  let l = D.NAJTRAZENIJI.map(id => D.PR.find(p => p.id === id)).filter(Boolean);
  if (!l.length) l = D.PR.filter(p => p.izdvojeno);
  if (!l.length) l = D.PR.slice(0, 4);
  return l.slice(0, 8);
})();
obnovi("index.html", {
  SEO: seoBlok({ ...SEO.seoStranice("pocetna"), putanja: "/" }, [SEO.ldFirma(), SEO.ldWebStranica(), SEO.ldPitanja(D.PITANJA)]),
  ...zajednicko("pocetna", "pocetna", ["podaci/proizvodi.js", "podaci/polica.js", "js/sablon.js", "js/app.js"]),
  kategorije: H.karticeKategorija(D.KAT),
  najtrazeniji: H.mreza(najtrazeniji),
  "broj-proizvoda": String(D.PR.length),
  pitanja: H.pitanja(D.PITANJA),
  poziv: H.pozivTraka()
}, "/");
obnovi("o-nama/index.html", {
  SEO: seoBlok({ ...SEO.seoStranice("o-nama"), putanja: URL.oNama }, [SEO.ldFirma(), M({ naziv: "O nama", putanja: URL.oNama })]),
  ...zajednicko("o-nama", "o-nama", S_OSNOVNE),
  mrvice: H.mrvice([{ naziv: "Početna", url: "/" }, { naziv: "O nama" }]),
  poziv: H.pozivTraka()
}, URL.oNama);
obnovi("kontakt/index.html", {
  SEO: seoBlok({ ...SEO.seoStranice("kontakt"), putanja: URL.kontakt }, [SEO.ldFirma(), M({ naziv: "Kontakt", putanja: URL.kontakt }), SEO.ldPitanja(D.PITANJA)]),
  ...zajednicko("kontakt", "kontakt", S_OBRAZAC),
  mrvice: H.mrvice([{ naziv: "Početna", url: "/" }, { naziv: "Kontakt" }]),
  pitanja: H.pitanja(D.PITANJA)
}, URL.kontakt);
obnovi("privatnost/index.html", {
  SEO: seoBlok({ ...SEO.seoStranice("privatnost"), putanja: URL.privatnost }, [M({ naziv: "Politika privatnosti", putanja: URL.privatnost })]),
  ...zajednicko("privatnost", "", S_OSNOVNE),
  mrvice: H.mrvice([{ naziv: "Početna", url: "/" }, { naziv: "Politika privatnosti" }])
}, URL.privatnost);

/* ------------------------------------------------------- generisane stranice */
zapisi("proizvodi/index.html", H.dokument({
  stranica: "proizvodi", aktivna: "proizvodi", skripte: ["podaci/proizvodi.js", "js/sablon.js", "js/app.js"],
  seo: seoBlok({ ...SEO.seoStranice("proizvodi"), putanja: URL.proizvodi }, [M({ naziv: "Svi proizvodi", putanja: URL.proizvodi })]),
  main: H.sviProizvodi()
}), URL.proizvodi);

for (const k of D.KAT) {
  const s = SEO.seoKategorije(k);
  zapisi("proizvodi/" + k.id + "/index.html", H.dokument({
    stranica: "kategorija", aktivna: "proizvodi", skripte: S_OSNOVNE,
    seo: seoBlok({ ...s, putanja: URL.kategorija(k) }, [M({ naziv: "Proizvodi", putanja: URL.proizvodi }, { naziv: k.naziv, putanja: URL.kategorija(k) })]),
    main: H.stranicaKategorije(k)
  }), URL.kategorija(k));
}

for (const p of D.PR) {
  const k = kategorija(p.kategorija), s = SEO.seoProizvoda(p), u = URL.proizvod(p);
  zapisi(u.slice(1) + "index.html", H.dokument({
    stranica: "proizvod", aktivna: "proizvodi", skripte: S_OBRAZAC,
    seo: seoBlok({ ...s, putanja: u, slika: p.slika, tip: "product" }, [
      SEO.ldProizvod(p, k, u),
      M({ naziv: "Proizvodi", putanja: URL.proizvodi }, { naziv: k.naziv, putanja: URL.kategorija(k) }, { naziv: p.naziv, putanja: u })
    ]),
    main: H.stranicaProizvoda(p)
  }), u);
}

zapisi("404.html", H.dokument({
  stranica: "404", aktivna: "", skripte: S_OSNOVNE,
  seo: seoBlok({ ...SEO.seoStranice("404"), noindex: true }),
  main: H.stranica404()
}), null);

/* --------------------------------------------- stare adrese (?id=) -> nove adrese */
// Cloudflare _redirects ne razlikuje ?id=..., pa ove dvije stranice preusmjeravaju JavaScriptom
function preusmjerenje(fajl, mapa) {
  const skripta = "(function(){var m=" + JSON.stringify(mapa) + ";var id=\"\";try{id=new URLSearchParams(location.search).get(\"id\")||\"\"}catch(e){}" +
    "var u=Object.prototype.hasOwnProperty.call(m,id)?m[id]:\"/proizvodi/\";" +
    "var c=document.querySelector('link[rel=\"canonical\"]');if(c)c.href=\"" + SEO.BAZA + "\"+u;location.replace(u+location.hash);})();";
  zapisi(fajl, "<!doctype html>\n<html lang=\"bs\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "<title>Preusmjeravanje | Herti Company</title>\n<link rel=\"canonical\" href=\"" + SEO.BAZA + "/proizvodi/\">\n" +
    "<script>" + skripta + "</script>\n<noscript><meta http-equiv=\"refresh\" content=\"0; url=/proizvodi/\"></noscript>\n</head>\n" +
    "<body>\n<p>Stranica je premještena. <a href=\"/proizvodi/\">Pogledajte sve proizvode</a>.</p>\n</body>\n</html>\n", null);
}
preusmjerenje("proizvod.html", Object.fromEntries(D.PR.map(p => [p.id, URL.proizvod(p)])));
preusmjerenje("kategorija.html", Object.fromEntries(D.KAT.map(k => [k.id, URL.kategorija(k)])));

/* ------------------------------------------------- uklanjanje obrisanih proizvoda */
const ocekivano = new Set(D.KAT.map(k => "proizvodi/" + k.id).concat(D.PR.map(p => URL.proizvod(p).slice(1, -1))));
const obrisano = [];
for (const kat of fs.readdirSync(r("proizvodi"), { withFileTypes: true }).filter(d => d.isDirectory())) {
  const kp = "proizvodi/" + kat.name;
  for (const pr of fs.readdirSync(r(kp), { withFileTypes: true }).filter(d => d.isDirectory())) {
    const pp = kp + "/" + pr.name;
    if (!ocekivano.has(pp) && fs.existsSync(r(pp, "index.html"))) { fs.rmSync(r(pp), { recursive: true }); obrisano.push(pp); }
  }
  if (!ocekivano.has(kp) && fs.existsSync(r(kp, "index.html")) && fs.readdirSync(r(kp)).length === 1) { fs.rmSync(r(kp), { recursive: true }); obrisano.push(kp); }
}

/* --------------------------------------------------------------- sitemap.xml */
const adrese = Object.keys(stanje);
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  adrese.map(a => "  <url><loc>" + SEO.aps(a) + "</loc><lastmod>" + stanje[a].lastmod + "</lastmod></url>").join("\n") + "\n</urlset>\n";
zapisi("sitemap.xml", sitemap, null);
fs.writeFileSync(STANJE, JSON.stringify(stanje, null, 2) + "\n");

/* ------------------------------------------------------------------ izvještaj */
console.log(`Gotovo: ${D.PR.length} proizvoda, ${D.KAT.length} kategorije, ${adrese.length} adresa u sitemap.xml.`);
console.log(napisano.length ? `Promijenjeno fajlova: ${napisano.length}` : "Nijedan fajl nije promijenjen.");
if (obrisano.length) console.log("Obrisane stranice proizvoda kojih više nema u katalogu:\n- " + obrisano.join("\n- "));
if (upozorenja.length) console.log("\nNapomene:\n- " + upozorenja.join("\n- "));
