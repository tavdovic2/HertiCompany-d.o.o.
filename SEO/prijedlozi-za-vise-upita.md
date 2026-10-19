# Prijedlozi za više upita – Herti Company

> **Samo prijedlozi – ništa od ovoga nije urađeno u grani `seo`.** Izaberite šta želite, pa to radimo posebno.
>
> Pregledane stranice: početna, Svi proizvodi, kategorija, stranica proizvoda, Kontakt – na računaru i mobitelu.
> Cilj: više upita preko obrasca „Zatraži ponudu“ i više poziva na 060 312 1040.
> **Nemamo podatke o posjetama i upitima** (analitika još nije postavljena), pa su prijedlozi zasnovani
> na dobroj praksi za B2B kataloge, a ne na mjerenju. Zato je mjerenje (prijedlog 2) među prvima.

## Ukratko: gdje je stranica danas

| Oblast | Ocjena (1–10) | Komentar |
|---|---|---|
| Prvi ekran (hero) | 7 | Jasno šta firma radi; nema dugmeta za upit, samo pretraga |
| Tekst i poruke | 8 | Jasno, konkretno, „Vi“ oblik; malo informacija koje trgovine traže prije narudžbe |
| Povjerenje | 5 | Nema ID/PDV broja, e-mail je Gmail, nema fotografija fabrike ni kupaca |
| Pozivi na akciju i obrazac | 8 | Dugmad svuda, kratak obrazac (samo ime i telefon obavezni), traka na dnu mobitela |
| Izgled i brzina | 9 | Brzo (Lighthouse Performance 99–100), radi na mobitelu |
| **Ukupno** | **7/10** | Najveći prostor za napredak: povjerenje i informacije za kupce na veliko |

---

## Prijedlozi, od najvećeg očekivanog učinka

### 1. Viber (i WhatsApp) dugme pored telefona
**Zašto:** u BiH je Viber glavni kanal za poslovnu komunikaciju s dobavljačima. Mnogi neće ni zvati ni
popunjavati obrazac, ali će poslati poruku – posebno vlasnici trgovina i ugostitelji tokom radnog dana.
**Šta:** dugme „Pišite na Viber“ u zaglavlju (mobitel), na traci na dnu mobitela, na stranici proizvoda
(uz „Pozovite“) i na Kontaktu. Poruka može biti unaprijed popunjena: „Upit: Deterdžent za posuđe 5 L“.
**Uslov:** broj 060 312 1040 mora imati Viber/WhatsApp.
**Trud:** mali (1–2 sata).

### 2. Mjerenje: koliko ljudi dolazi i koliko šalje upit
**Zašto:** bez ovoga ne znamo šta radi. Mjerenje pokazuje koje stranice donose upite i koje ključne riječi
vrijede, pa se sve ostalo može poboljšavati na osnovu brojeva.
**Šta:** Cloudflare Web Analytics (besplatno, bez kolačića, pa ne treba ni baner za kolačiće) +
brojanje tri događaja: poslan obrazac, klik na telefon, klik na e-mail/Viber.
**Trud:** mali (1–2 sata). Poslije mjesec dana: pregled brojki.

### 3. Podaci koji grade povjerenje kod firmi
**Zašto:** trgovina ili firma prije prve narudžbe provjerava s kim posluje. Gmail adresa i prazni pravni
podaci izgledaju kao mala ili nova firma, iako je iza toga fabrika s dugom tradicijom (EXON).
**Šta:**
- Upisati **ID i PDV broj** i puni naziv „Herti Company d.o.o.“ (polja već postoje u `podaci/postavke.js`, prikazuju se u podnožju).
- **E-mail na domeni**, npr. `info@herticompany.ba` ili `prodaja@herticompany.ba` (Cloudflare Email Routing je besplatan i prosljeđuje na postojeći Gmail).
- **Radno vrijeme** (polje postoji) – kupac zna kad može zvati.
- **Prave fotografije**: fabrika, proizvodna linija, skladište, dostavno vozilo. Jedna dobra fotografija na O nama i na početnoj vrijedi više od teksta.

**Trud:** mali za podatke i e-mail (1 sat), srednji za fotografije (snimanje).

### 4. Informacije za kupce na veliko
**Zašto:** trgovine, ugostitelji i autopraonice prije upita žele znati osnovno. Ako to ne nađu, odlaze
dobavljaču kod kojeg piše, ili zovu samo „da pitaju“ i ne naruče.
**Šta:**
- Na svakom proizvodu, u specifikaciji: **komada u kartonu**, **kartona na paleti**, rok trajanja, EAN/barkod (trgovinama treba za kasu).
- Sekcija ili stranica **„Za trgovine i firme“**: kome prodajete (trgovine, HoReCa, autopraonice, firme za čišćenje), područje i dani dostave (npr. „Sarajevo i Srednja Bosna svake sedmice“), načini plaćanja (virman, avans, odgoda za stalne kupce – samo ono što je tačno), kako izgleda prva narudžba.
- Na stranici proizvoda kratko: „Cijena na upit – zavisi od količine. Odgovaramo istog radnog dana.“ (samo ako je tačno).

**Trud:** srednji (podatke daje firma, unos i prikaz 0,5–1 dan). Dobro je i za SEO („veleprodaja“, „za trgovine“).

### 5. Lista za upit: više proizvoda u jednom upitu
**Zašto:** kupci na veliko naručuju 5–20 artikala odjednom. Sada mogu dodati više proizvoda samo unutar
obrasca, birajući iz padajuće liste. Lista za upit (kao korpa, ali bez cijena i plaćanja) to olakšava.
**Šta:** dugme „Dodaj u upit“ na svakoj kartici i proizvodu, mala oznaka u zaglavlju („Upit: 4“),
na kraju jedan obrazac s količinama za sve. Lista se čuva u pregledniku.
**Trud:** srednji do veći (1–2 dana).

### 6. Dugme za upit u prvom ekranu i „ranije EXON“
**Zašto:** na početnoj je u prvom ekranu samo pretraga. Posjetilac koji je došao naručiti (npr. iz Googlea
za „kućna hemija veleprodaja“) treba odmah vidjeti put do ponude. Stari kupci traže „EXON“ i trebaju odmah
prepoznati da su na pravom mjestu.
**Šta:**
- Ispod pretrage, sporedno dugme: **„Zatražite ponudu za trgovinu ili firmu“** → `/kontakt/#upit`.
- Kratka linija u heru: „Ranije EXON – isti proizvodi iz iste fabrike u Kiseljaku.“

**Trud:** mali (1 sat). **A/B ideja:** dugme „Zatražite ponudu“ prema „Pozovite 060 312 1040“ kao glavno dugme u heru.

### 7. Dokazi da drugi već kupuju
**Zašto:** „Već nas biraju…“ smanjuje rizik prve narudžbe.
**Šta (samo istinito, uz dozvolu kupaca):** broj trgovina/partnera, godine proizvodnje, 2–3 kratke izjave
kupaca s imenom i mjestom (npr. vlasnik autopraonice iz Sarajeva), logotipi poznatih kupaca ili
lanaca gdje se proizvodi prodaju.
**Trud:** srednji (prikupljanje izjava).

### 8. Katalog za štampu / PDF
**Zašto:** nabavljač često prosljeđuje katalog šefu ili ga štampa. Link „Preuzmite katalog“ je i razlog
za kontakt.
**Šta:** jedna stranica `/katalog/` koju generator već može napraviti iz podataka (svi proizvodi, pakovanja,
kontakt), s izgledom za štampu i „Sačuvaj kao PDF“.
**Trud:** mali do srednji (pola dana).

### 9. „Gdje kupiti“ za domaćinstva
**Zašto:** domaćinstvo koje treba jednu bocu vjerovatno neće slati upit fabrici – i odlazi. Ako znaju gdje
kupiti, kupuju vaš proizvod umjesto konkurencije (i trgovine to vide kao podršku).
**Šta:** lista trgovina/marketa po gradovima gdje se proizvodi mogu kupiti.
**Trud:** srednji (lista od prodaje).

### 10. Sezonska istaknuta ponuda: Blitz za zimu (oktobar–februar)
**Zašto:** tečnost za vjetrobran se traži sezonski; autopraonice i pumpe se snabdijevaju prije zime.
**Šta:** traka ili kartica na početnoj „Zimska tečnost za vjetrobran Blitz – naručite za sezonu“ od oktobra
do februara (kroz listu `NAJTRAZENIJI` ili posebno polje).
**Trud:** mali (1 sat).

### 11. Čitljivost linkova u tekstu
**Zašto:** zelena boja linkova (#1f9a70) na bijeloj ima kontrast 3,55:1; preporuka je 4,5:1. Lighthouse zbog
toga daje Accessibility 96–97 umjesto 100. Slabovidnim i na suncu na mobitelu linkovi se slabije vide.
**Šta:** tamnija zelena **#17805c** (4,9:1) – jedna vrijednost u `css/stil.css`, izgled ostaje isti.
**Trud:** vrlo mali (5 minuta).

### 12. Sitnice u obrascu i poslije slanja
**Šta:**
- Polje „Količina“: primjer prilagođen pakovanju („npr. 10 galona“ kod galona, „npr. 2 kartona“).
- Poruka poslije slanja: „Javljamo se danas do 16 h“ (konkretno, ako je tačno) + dugme Viber/telefon za hitno.
- Na Kontaktu iznad obrasca: „Odgovaramo u roku od X sati radnim danima.“

**Trud:** mali (1–2 sata).

---

## Brzi potezi (ispod 1 sata svaki)

1. Upisati ID broj, PDV broj i radno vrijeme u `podaci/postavke.js` i pokrenuti generator.
2. Promijeniti boju linkova u #17805c.
3. Dodati Viber dugme (ako broj ima Viber).
4. Dodati sporedno dugme „Zatražite ponudu za trgovinu ili firmu“ i liniju „Ranije EXON“ u hero.
5. Uključiti Cloudflare Web Analytics.

## Šta mjeriti poslije izmjena

- Broj poslanih obrazaca i klikova na telefon/Viber, sedmično.
- Koje stranice proizvoda imaju najviše upita (to su i prvi kandidati za bolje fotografije i opise).
- Za A/B testove treba dovoljno posjeta; dok ih nema, bolje je mijenjati jednu stvar mjesečno i porediti mjesece.
