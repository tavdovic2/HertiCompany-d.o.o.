# SEO izvještaj – herticompany.ba

Grana: `seo` (napravljena od `main`, nije spojena u `main`). Datum: 19. 10. 2026.

## Sažetak

Najveći problem je riješen: stranice proizvoda i kategorija bile su prazne bez JavaScripta i imale su
adrese tipa `proizvod.html?id=…`. Sada su to gotove HTML stranice s čistim adresama
(`/proizvodi/kucna-hemija/deterdzent-za-posude-limun-500ml/`), punim tekstom, jedinstvenim naslovima i
opisima za Google i strukturiranim podacima. Sve se pravi iz istih podataka (`podaci/`) jednom komandom:

    node alati/generisi-stranice.js

Izgled i tekstovi stranica nisu mijenjani, osim gdje je to trebalo za SEO (navedeno ispod).

---

## 1. Šta je promijenjeno, po koracima

### Korak 1 – ključne riječi (`SEO/kljucne-rijeci.md`)
- Ključne riječi grupisane po stranici i namjeri (veleprodaja, domaćinstvo, traženje proizvođača, brend),
  s bosanskim, hrvatskim i srpskim varijantama (suđe/sudovi, tekući, tekućina, destilovana, kemija…).
- Važnost je **procjena** (visoka/srednja/niska), bez izmišljenih brojeva pretraga – treba je provjeriti
  u Google Search Console nakon objave.
- Važna zapažanja: kupci i dalje traže **„EXON“**; često se traži **„kanister“** (na stranici piše „galon“);
  tečnost za vjetrobran je sezonska.

### Korak 2 – meta tagovi i strukturirani podaci
- `podaci/seo.js`: jedinstven naslov (do 60 znakova) i opis (140–160 znakova) za svih 38 stranica, s
  pozivom na akciju. Provjereno: nema duplikata, sve dužine u granicama.
- Canonical s apsolutnom adresom, Open Graph i Twitter tagovi na svim stranicama;
  kod proizvoda `og:image` je fotografija proizvoda. 404 ima `noindex`.
- JSON-LD:
  - `LocalBusiness` (Herti Company d.o.o., adresa s poštanskim brojem 71250, telefon, e-mail, logo,
    brendovi, ranije ime EXON) na početnoj, O nama i Kontakt;
  - `WebSite` na početnoj (Google iz njega uzima ime stranice);
  - `Product` na svakom proizvodu (naziv, brend, opis, slika, kategorija, proizvođač) –
    **bez izmišljenih cijena, ocjena i recenzija**;
  - `BreadcrumbList` na svim stranicama ispod početne;
  - `FAQPage` na početnoj i Kontaktu.
  Provjereno: sav JSON je ispravan i nema duplih blokova ni na jednoj stranici.
- Male izmjene teksta zbog ključnih riječi: varijante u uvodima kategorija („za posuđe (suđe)“,
  „tečni (tekući) sapuni“, „tečnost (tekućina) za vjetrobranska stakla“) i novo često pitanje
  **„Prodajete li na veliko?“**. U `postavke.js` dodani pravni naziv i poštanski broj.

> **Važno o „Product“:** Google za proizvod bez cijene (`offers`) ili ocjena **ne prikazuje bogat
> rezultat** (cijena, zvjezdice). Oznaka i dalje pomaže da Google tačno razumije šta je na stranici
> (proizvod, brend, proizvođač). Isto važi za česta pitanja: od 2023. Google prikazuje FAQ proširenja
> uglavnom samo za državne i zdravstvene stranice, ali oznaka nije štetna.

### Korak 3 – tehnički SEO
- **Generator** `alati/generisi-stranice.js` (Node.js, bez dodatnih paketa) pravi:
  `/proizvodi/`, 3 kategorije `/proizvodi/<kategorija>/`, 30 proizvoda `/proizvodi/<kategorija>/<proizvod>/`,
  `404.html` i `sitemap.xml`. Sav tekst, tabela, mrvice, meta tagovi i JSON-LD su u HTML-u.
  Na ručno pisanim stranicama obnavlja samo dijelove između oznaka `<!-- HC:… -->`. Javlja greške u
  podacima (isti id, nepostojeća kategorija ili slika) i briše stranice obrisanih proizvoda.
- **Nove adrese:** O nama, Kontakt i Privatnost su sada `/o-nama/`, `/kontakt/`, `/privatnost/`
  (adrese bez `.html` su ono što Cloudflare Pages ionako servira). Sve unutrašnje veze – meni, podnožje,
  kartice, mrvice, polica, najtraženiji – vode na nove adrese.
- **Stare adrese ne vode u prazno:** `proizvod.html?id=…` i `kategorija.html?id=…` preusmjeravaju
  JavaScriptom na novu adresu (i postave canonical na nju); `proizvodi.html`, `o-nama.html`,
  `kontakt.html`, `privatnost.html` preusmjerava `_redirects` (301).
- **`sitemap.xml`:** 38 adresa, `lastmod` se mijenja samo kad se stranica stvarno promijeni
  (stanje u `alati/stanje-stranica.json`). `robots.txt` pokazuje na https://herticompany.ba/sitemap.xml.
- **JavaScript** (`js/app.js`) sada radi samo ponašanje: tema, meni, pretraga i filteri (skrivaju kartice
  koje su već u HTML-u), polica, obrazac. Pretraga radi i bez JavaScripta (obična forma `?q=`).
- **Naslovi:** tačno jedan `h1` na svakoj stranici, provjereno na svih 38.
- **Slike:** alt tekst na svim slikama; `width`/`height` svuda; prva slika na stranici proizvoda se učitava
  odmah (`fetchpriority="high"`), ostale lijeno. Nove manje slike: kartice 500 px
  (`slike/proizvodi/mala/`, skripta `alati/male-slike.py`) umjesto 1000 px, logo 104 px (4 KB) umjesto 320 px (61 KB).
- **Fontovi:** `preconnect` i `display=swap` su bili; sada se CSS fontova učitava **bez blokiranja prikaza**
  (najveći dobitak brzine).
- **`_headers`** (Cloudflare Pages): CSS, JS i podaci keširani godinu dana (adrese imaju `?v=<otisak>`,
  pa se nova verzija preuzme čim se fajl promijeni), slike 30 dana, HTML kratko (Cloudflare zadano);
  `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
- **`_redirects`:** stare adrese + interni fajlovi (`/SEO/`, `/alati/`, `UPUTSTVO.md`) se ne prikazuju posjetiocima.
- Uklonjen `.htaccess`. `UPUTSTVO.md` dopunjen (generator, pregled na računaru, objava na Cloudflare).
- **Provjera veza:** crawler bez JavaScripta prošao je svih 38 stranica i 69 resursa – nema mrtvih veza,
  nema stranica bez dolaznih linkova, sitemap i linkovi se poklapaju.

### Korak 4 – prijedlozi za više upita (`SEO/prijedlozi-za-vise-upita.md`)
12 prijedloga poredanih po učinku, s trudom – **nijedan nije urađen**. Prva tri: Viber dugme,
mjerenje upita (Cloudflare Web Analytics), podaci koji grade povjerenje (ID/PDV broj, e-mail na domeni,
radno vrijeme, fotografije fabrike).

---

## 2. Lighthouse (mobilni) – prije i poslije

Mjereno lokalno (Lighthouse 12, simulirani mobitel, isti računar i server s kompresijom za oba mjerenja).
Na Cloudflareu će brojevi biti malo drugačiji, ali odnos prije/poslije vrijedi.

| Stranica (prije → poslije) | SEO | Performance | Accessibility | Best Practices | LCP |
|---|---|---|---|---|---|
| Početna `index.html` → `/` | 100 → 100 | 89 → **99** | 96 → 96 | 100 → 100 | 3,0 s → **2,0 s** |
| Proizvodi `proizvodi.html` → `/proizvodi/` | 100 → 100 | 93 → **100** | 100 → 100 | 100 → 100 | 2,7 s → **1,8 s** |
| Kategorija `kategorija.html?id=kucna-hemija` → `/proizvodi/kucna-hemija/` | 100 → 100 | 90 → **100** | 100 → 100 | 100 → 100 | 3,1 s → **1,7 s** |
| Proizvod Limun 500 ml | 100 → 100 | 91 → **100** | 97 → 97 | 100 → 100 | 2,7 s → **1,6 s** |
| Proizvod GuMax 750 ml | 100 → 100 | 93 → **99** | 97 → 97 | 100 → 100 | 2,7 s → **1,6 s** |

- **SEO je bio 100 i prije**, jer Lighthouse izvršava JavaScript. On ne mjeri glavni problem koji je riješen:
  **bez JavaScripta** su stranice proizvoda i kategorija ranije bile prazne, a sada imaju sav tekst
  (provjereno posebno, s isključenim JavaScriptom).
- **Accessibility 96–97:** jedini uzrok je kontrast zelene boje linkova (#1f9a70, 3,55:1). Dizajn nije mijenjan;
  prijedlog #11 (tamnija zelena #17805c) to rješava.

---

## 3. Šta morate uraditi RUČNO nakon objave

**Cloudflare Pages i domena**
1. Cloudflare Pages: projekat povezan s GitHub repozitorijem, *Production branch* `main`,
   *Build command* prazno, *Build output directory* `/`.
2. Dodati domenu `herticompany.ba` (Custom domains), i `www.herticompany.ba` preusmjeriti na
   `https://herticompany.ba` (Cloudflare → Rules → Redirect Rules, 301).
3. Otvoriti nekoliko adresa i provjeriti: `/`, `/proizvodi/`, jedan proizvod, `/proizvod.html?id=destilirana-voda-5l`
   (mora preusmjeriti), `/nepostojece/` (stranica 404), `/SEO/kljucne-rijeci.md` (mora vratiti na početnu).

**Google**
4. **Google Search Console** (https://search.google.com/search-console): dodati svojstvo *Domain*
   `herticompany.ba` (potvrda DNS zapisom u Cloudflareu), pa u *Sitemaps* poslati `sitemap.xml`.
5. U Search Consoleu *URL Inspection*: zatražiti indeksiranje za početnu, `/proizvodi/` i 3 kategorije.
6. **Rich Results Test** (https://search.google.com/test/rich-results): provjeriti početnu, Kontakt i
   jedan proizvod – očekivano: LocalBusiness, Breadcrumb, Product (bez upozorenja koja blokiraju; upozorenje
   da nedostaje `offers`/`review` je očekivano, jer cijena namjerno nema).
7. **Google profil firme** (Google Business Profile, https://business.google.com):
   - naziv: Herti Company d.o.o.; primarna kategorija: *Proizvođač hemikalija* ili *Proizvođač deterdženata*
     (izabrati najbližu ponuđenu), dodatne: *Veleprodaja*;
   - adresa Ljetovik br. 1, 71250 Kiseljak; telefon 060 312 1040; web: `https://herticompany.ba`;
   - radno vrijeme; fotografije fabrike i proizvoda; kratak opis (može se uzeti iz O nama);
   - ako postoji stari profil „EXON“, preuzeti ga i promijeniti naziv umjesto pravljenja novog.

**Ostalo**
8. **Bing Webmaster Tools** (https://www.bing.com/webmasters): uvesti stranicu iz Google Search Consolea
   (jedan klik) – pokriva i Bing i DuckDuckGo.
9. Poslati jedan **probni upit** sa stranice i provjeriti da je stigao (Web3Forms).
10. **Nakon mjesec dana:** Search Console → *Učinak* → *Upiti*: uporediti stvarne upite sa
    `SEO/kljucne-rijeci.md`, ažurirati listu i naslove/opise u `podaci/seo.js` za stranice s mnogo
    prikaza a malo klikova. Ponoviti nakon 3 mjeseca i prije zimske sezone (auto hemija).
11. Kad budu poznati: upisati **ID i PDV broj** i **radno vrijeme** u `podaci/postavke.js` i pokrenuti generator
    (ulaze i u podnožje i u strukturirane podatke).

---

## 4. Kako pregledati granu `seo` prije spajanja u `main`

1. Na računaru: `git switch seo`, pa u glavnom folderu `npx serve .` (ili `python -m http.server 8000`)
   i otvoriti adresu koju ispiše (npr. http://localhost:3000). Stranice se više ne otvaraju dvoklikom na fajl,
   jer koriste adrese od korijena (`/proizvodi/…`).
2. Na GitHubu: https://github.com/tavdovic2/HertiCompany-d.o.o./compare/main...seo –
   vide se sve izmjene, commit po commit (4 koraka + ovaj izvještaj).
3. Ako je Cloudflare Pages već povezan s repozitorijem, za granu `seo` sam napravi **preview** adresu
   (npr. `seo.<projekat>.pages.dev`) – tu se `_redirects` i `_headers` mogu provjeriti na pravom Cloudflareu.
4. Kad je sve u redu: na GitHubu otvoriti *Pull request* `seo` → `main` i spojiti ga
   (ili lokalno `git switch main && git merge seo && git push`).
