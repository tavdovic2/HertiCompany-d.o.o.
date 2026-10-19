# Uputstvo za katalog Herti Company

Ovo uputstvo je za radnike koji održavaju stranicu. Ne trebate biti programer.
Za izmjene treba Vam običan program za tekst, npr. besplatni **Visual Studio Code**
(Word nije dobar za ovo), i besplatni program **Node.js** (https://nodejs.org, verzija LTS).

> **Najvažnije pravilo:** nakon SVAKE izmjene u `podaci/`, `css/` ili `js/` pokrenite:
>
>     node alati/generisi-stranice.js
>
> Ovaj program od podataka pravi gotove stranice proizvoda i kategorija, `sitemap.xml`
> i oznake verzija za CSS i JS. Bez toga se izmjena neće vidjeti na stranici.
> Komandu kucate u terminalu otvorenom u glavnom folderu projekta
> (u Visual Studio Code: meni **Terminal → New Terminal**).

---

## 1. Gdje je šta

| Fajl ili folder | Šta je u njemu | Da li ga mijenjate |
|---|---|---|
| `podaci/proizvodi.js` | Svi proizvodi, kategorije i lista „Najtraženiji proizvodi“ | **Da**, ovdje dodajete i mijenjate proizvode |
| `podaci/postavke.js` | Telefon, e-mail, adresa, česta pitanja, ključ za slanje upita | **Da**, kad se promijeni kontakt |
| `podaci/seo.js` | Naslovi i opisi stranica za Google | Kad dodate proizvod (nije obavezno) |
| `slike/proizvodi/` | Fotografije proizvoda | **Da**, ovdje stavljate slike |
| `index.html`, `o-nama/`, `kontakt/`, `privatnost/` | Tekstovi tih stranica | Rijetko, samo tekst **van** oznaka `<!-- HC:… -->` i `<!-- SEO -->` |
| `proizvodi/`, `404.html`, `proizvod.html`, `kategorija.html`, `sitemap.xml` | Stranice koje pravi generator | **Ne** – svaka ručna izmjena se izbriše pri sljedećem pokretanju |
| `alati/` | Generator stranica i skripta za male slike | **Ne** |
| `_headers`, `_redirects` | Podešavanja za Cloudflare Pages (keširanje, stare adrese) | **Ne** |
| `css/`, `js/` | Izgled i logika stranice | **Ne** |
| `SEO/` | Ključne riječi, izvještaj i prijedlozi | Samo za čitanje |

---

## 2. Kako dodati novi proizvod

1. Otvorite `podaci/proizvodi.js`.
2. Pronađite proizvod koji je najsličniji novom (npr. drugi tečni sapun).
3. Označite i kopirajte cijeli njegov blok: od vitičaste zagrade `{` do `},`.
4. Zalijepite ga ispod tog proizvoda. Proizvodi se na stranici prikazuju **tačno ovim redoslijedom**.
5. Promijenite tekst između navodnika `" "`.
6. Polje `id` mora biti novo i jedinstveno: mala slova, bez kvačica, crtice umjesto razmaka.
   Primjer: `"tecni-sapun-lavanda-500ml"`
7. Ako je to isti proizvod u drugom pakovanju (npr. 5 L umjesto 1 L), upišite **istu** `linija`.
   Tada se na stranici sama pojave dugmad za sva pakovanja.
8. Sačuvajte fajl i pokrenite `node alati/generisi-stranice.js`.
   Program javlja grešku ako je nešto pogrešno upisano (npr. isti `id` dva puta).
9. (Nije obavezno, ali pomaže Googleu) u `podaci/seo.js` dodajte red s naslovom i opisom
   za Google. Ako ga ne dodate, napravi se automatski.
10. Pogledajte stranicu na svom računaru (poglavlje 5) i pošaljite izmjene na GitHub.

Stranica novog proizvoda dobije adresu `herticompany.ba/proizvodi/<kategorija>/<id>/`
i sama se doda u `sitemap.xml`. **Ne mijenjajte `id` postojećeg proizvoda** – time mu se mijenja adresa,
a Google i kupci imaju staru.

**Najtraženiji proizvodi na početnoj:** na vrhu `podaci/proizvodi.js` je lista `window.NAJTRAZENIJI`.
Upišite `id` proizvoda, redoslijed u listi je redoslijed na stranici.

**Česte greške**
- Zaboravljen zarez `,` iza `}` između dva proizvoda.
- Navodnik `"` unutar teksta. Ako Vam treba, pišite `„ovako“` ili `\"`.
- Kvačice u `id` polju (č, ć, š, ž, đ). U nazivu i opisu kvačice su u redu.

Ako se nakon izmjene katalog ne prikazuje, greška je skoro uvijek zarez ili navodnik u zadnjem
promijenjenom bloku.

---

## 3. Kako dodati sliku proizvoda

1. Fotografiju snimite na bijeloj ili svijetloj pozadini, proizvod u sredini.
   Postojeće slike su kvadratne, 1000 × 1000 piksela, WebP, proizvod zauzima oko 88 % visine.
   Novu sliku pripremite isto, da kartice budu ujednačene.
2. Nazovite fajl kao `id` proizvoda, npr. `tecni-sapun-aloe-vera-500ml.webp`.
3. Stavite fajl u folder `slike/proizvodi/`.
4. U `podaci/proizvodi.js`, kod tog proizvoda upišite:
   `slika: "slike/proizvodi/tecni-sapun-aloe-vera-500ml.webp",`
5. Napravite manju verziju za kartice (treba Python i Pillow: `pip install Pillow`):
   `python alati/male-slike.py`
6. Pokrenite `node alati/generisi-stranice.js`.

Dok slike nema, stranica prikazuje nacrtanu bocu u boji kategorije s nazivom brenda i zapreminom.
Na pokretnoj polici na početnoj novi proizvod je nacrtana boca dok se ne napravi slika bez pozadine
za `slike/proizvodi/polica/` (to radi programer).

---

## 4. Kako uključiti slanje upita na e-mail (jednom, 2 minute)

1. Otvorite **https://web3forms.com**
2. Upišite `herticompanydoo@gmail.com` i kliknite **Create Access Key**.
3. Ključ stiže na e-mail (provjerite i Spam).
4. Otvorite `podaci/postavke.js` i zalijepite ključ:
   `web3formsKljuc: "ovdje-ide-kljuc"`
5. Pošaljite jedan probni upit sa stranice i provjerite da je stigao.

Dok ključ nije upisan, obrazac otvara e-mail program kupca s već napisanim upitom.
Tako upit ne propada, ali kupac mora sam kliknuti „Pošalji“.

---

## 5. Pregled na svom računaru i objava

**Pregled prije objave.** Stranice koriste adrese od korijena (`/proizvodi/…`), pa se ne otvaraju
dvoklikom na fajl. U terminalu, u glavnom folderu projekta, pokrenite:

    npx serve .

(ili, ako imate Python: `python -m http.server 8000`) i otvorite adresu koju program ispiše,
npr. http://localhost:3000.

**Objava.** Stranica je na **Cloudflare Pages**, povezana s GitHub repozitorijem. Svaki `git push`
u granu `main` automatski objavi novu verziju za 1–2 minute. Nema build koraka: na GitHub idu
gotove stranice koje je napravio generator, zato ga **uvijek pokrenite prije slanja**.

`sitemap.xml` se pravi sam (generator). Google ga čita sa https://herticompany.ba/sitemap.xml.

---

## 6. Kako pisati opis novog proizvoda (glas brenda)

Herti Company zvuči kao **pouzdan domaći proizvođač**: jasno, konkretno, ljubazno.

**Tri pravila**
1. **Jasno.** Kratke rečenice i obične riječi. Kupac treba za 10 sekundi znati čemu proizvod služi.
2. **Konkretno.** Recite za šta je i za koga: „za restorane, kantine i urede“, a ne „za sve“.
3. **Pošteno.** Pišite samo ono što proizvod zaista radi. Bez „najbolji“, „100 %“, „uništava sve bakterije“
   ili „dermatološki testirano“, osim ako za to imamo dokaz.

**Uvijek**
- Obraćanje sa **Vi** (veliko V): „Javićemo Vam se“, „Zatražite ponudu“.
- Prednost prije osobine: „Čisto posuđe bez masnoće“, pa onda o čemu se radi.
- Kod većih pakovanja spomenite ko ih kupuje (ugostiteljstvo, firme, perionice, servisi).

| Koristimo | Izbjegavamo |
|---|---|
| čisto, svježe, praktično, ekonomično | revolucionarno, čudesno, savršeno |
| iz naše fabrike u Kiseljaku | vodeći, broj 1, najbolji |
| za domaćinstva, trgovine i firme | za sve i svakoga |
| zatražite ponudu, pozovite nas | kupi odmah, ne propusti |

**Primjer kratkog opisa (1–2 rečenice):**
> Tečni sapun za ruke Aloe Vera u bočici s pumpicom. Spreman za umivaonik u kupatilu, kuhinji ili lokalu.

---

## 7. Lista za provjeru prije objave (usklađenost)

Ovo je radna lista, a ne pravni savjet. Za konačnu provjeru obratite se pravniku ili
stručnjaku za hemikalije.

**Podaci o firmi na stranici**
- [ ] Upisati tačan pravni naziv firme (npr. „Herti Company d.o.o.“) u `postavke.js` i podnožje
- [ ] Upisati ID broj i PDV broj (`idBroj`, `pdvBroj` u `postavke.js`)
- [ ] Provjeriti adresu, telefon i e-mail

**Proizvodi**
- [ ] Nazivi, zapremine i pakovanja na stranici moraju odgovarati etiketi
- [ ] Vrsta pakovanja (boca, boca s pumpicom, galon) je unesena po pretpostavci: provjeriti svaki proizvod
- [ ] Ne navoditi tvrdnje koje nisu dokazane (dezinfekcija, „antibakterijski“, „hipoalergeno“, „ekološki“)
- [ ] Ako se neki proizvod prodaje kao biocid ili kozmetika, provjeriti dodatne propise za tu vrstu

**Podaci kupaca**
- [ ] Politika privatnosti je objavljena (`privatnost/index.html`) – pregledati je jednom godišnje
- [ ] Upite iz e-maila čuvati samo onoliko koliko treba, pa brisati
- [ ] Pristup e-mailu herticompanydoo@gmail.com zaštititi jakom lozinkom i potvrdom u dva koraka

**Stranica**
- [ ] Stranica radi preko `https://` (Cloudflare Pages ga uključuje sam)
- [ ] Poslan probni upit i stigao na e-mail
- [ ] Provjereno na mobitelu: dugme „Pozovite“ otvara poziv na 060 312 1040
