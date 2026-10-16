# Uputstvo za katalog Herti Company

Ovo uputstvo je za radnike koji održavaju stranicu. Ne trebate biti programer.
Za sve izmjene treba Vam samo običan program za tekst, npr. **Notepad** na Windowsu
ili besplatni **Visual Studio Code**. Word nije dobar za ovo.

---

## 1. Gdje je šta

| Fajl ili folder | Šta je u njemu | Da li ga mijenjate |
|---|---|---|
| `podaci/proizvodi.js` | Svi proizvodi i kategorije | **Da**, ovdje dodajete i mijenjate proizvode |
| `podaci/postavke.js` | Telefon, e-mail, adresa, česta pitanja, ključ za slanje upita | **Da**, kad se promijeni kontakt |
| `slike/proizvodi/` | Fotografije proizvoda | **Da**, ovdje stavljate slike |
| `o-nama.html`, `privatnost.html`, `index.html` | Tekstovi stranica | Rijetko, samo tekst između oznaka |
| `css/`, `js/` | Izgled i logika stranice | **Ne** |

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
8. Sačuvajte fajl i otvorite stranicu da provjerite.

Stranica za novi proizvod pravi se sama. Nema ništa drugo za uraditi.

**Česte greške**
- Zaboravljen zarez `,` iza `}` između dva proizvoda.
- Navodnik `"` unutar teksta. Ako Vam treba, pišite `„ovako“` ili `\"`.
- Kvačice u `id` polju (č, ć, š, ž, đ). U nazivu i opisu kvačice su u redu.

Ako se nakon izmjene katalog ne prikazuje, greška je skoro uvijek zarez ili navodnik u zadnjem
promijenjenom bloku.

---

## 3. Kako dodati sliku proizvoda

1. Fotografiju snimite na bijeloj ili svijetloj pozadini, proizvod u sredini.
   Najbolje kvadratna slika, oko 1200 × 1200 piksela, JPG, ispod 300 KB.
2. Nazovite fajl kao `id` proizvoda, npr. `tecni-sapun-aloe-vera-500ml.jpg`.
3. Stavite fajl u folder `slike/proizvodi/`.
4. U `podaci/proizvodi.js`, kod tog proizvoda upišite:
   `slika: "slike/proizvodi/tecni-sapun-aloe-vera-500ml.jpg",`

Dok slike nema, stranica prikazuje nacrtanu bocu u boji kategorije s nazivom brenda i zapreminom.

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

## 5. Kako objaviti stranicu na herticompany.ba

Stranica je obična statička stranica, bez baze podataka. Radi na svakom hostingu.

1. Kod svog hosting provajdera otvorite **File Manager** ili se spojite FTP programom (npr. FileZilla).
2. Uđite u folder `public_html` (ili `www`).
3. Prebacite **sve fajlove i foldere** iz ovog paketa, tako da je `index.html` direktno u tom folderu.
4. Otvorite herticompany.ba i provjerite.

Nakon objave prijavite stranicu u **Google Search Console**
(https://search.google.com/search-console) i tamo dodajte `sitemap.xml`.
Kad dodate novi proizvod, dodajte i njegovu adresu u `sitemap.xml`
(kopirajte jedan red `<url>…</url>` i promijenite `id`).

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
- [ ] Politika privatnosti je objavljena (`privatnost.html`) – pregledati je jednom godišnje
- [ ] Upite iz e-maila čuvati samo onoliko koliko treba, pa brisati
- [ ] Pristup e-mailu herticompanydoo@gmail.com zaštititi jakom lozinkom i potvrdom u dva koraka

**Stranica**
- [ ] Stranica radi preko `https://` (SSL certifikat kod hosting provajdera, obično besplatan)
- [ ] Poslan probni upit i stigao na e-mail
- [ ] Provjereno na mobitelu: dugme „Pozovite“ otvara poziv na 060 312 1040
