/* ==========================================================================
   POSTAVKE FIRME – Herti Company
   --------------------------------------------------------------------------
   Ovdje mijenjate kontakt podatke koji se prikazuju na CIJELOJ stranici
   (zaglavlje, podnožje, kontakt, dugmad "Pozovite nas").
   Mijenjajte samo tekst između navodnika " ".
   ========================================================================== */

window.FIRMA = {
  naziv: "Herti Company",
  // Puni pravni naziv – koristi se za Google (strukturirani podaci)
  pravniNaziv: "Herti Company d.o.o.",
  ranijiNaziv: "EXON",
  godinaPreuzimanja: "2026",

  adresa: "Ljetovik br. 1",
  mjesto: "Kiseljak",
  postanskiBroj: "71250",
  drzava: "Bosna i Hercegovina",

  // Telefon kako se PRIKAZUJE na stranici
  telefon: "060 312 1040",
  // Telefon za poziv (bez razmaka, s pozivnim brojem za BiH +387, bez prve nule)
  telefonPoziv: "+387603121040",

  email: "herticompanydoo@gmail.com",

  // Radno vrijeme – ostavite prazno "" ako ga ne želite prikazati
  radnoVrijeme: "",

  // Pravni podaci za podnožje (ID broj, PDV broj) – upišite kad budu spremni
  idBroj: "",
  pdvBroj: "",

  web: "https://herticompany.ba",

  /* ------------------------------------------------------------------------
     SLANJE UPITA NA E-MAIL (Web3Forms – besplatno)
     1. Otvorite https://web3forms.com
     2. Upišite e-mail herticompanydoo@gmail.com i kliknite "Create Access Key"
     3. Ključ stiže na e-mail. Zalijepite ga ispod između navodnika.
     Dok je ključ prazan, obrazac otvara e-mail program kupca s gotovim upitom.
     ------------------------------------------------------------------------ */
  web3formsKljuc: "ba348d7b-ba5a-4f59-8e2c-1257ffecfa34"
};

/* ==========================================================================
   ČESTA PITANJA – prikazuju se na početnoj i na stranici Kontakt.
   Da dodate pitanje, kopirajte jedan blok { pitanje: ..., odgovor: ... },
   zalijepite ga ispod zadnjeg i ne zaboravite zarez između blokova.
   ========================================================================== */

window.PITANJA = [
  {
    pitanje: "Postoji li minimalna narudžba?",
    odgovor: "Ne. Možete naručiti onoliko koliko Vam treba, od jednog komada do većih količina za trgovinu ili firmu."
  },
  {
    pitanje: "Prodajete li na veliko?",
    odgovor: "Da. Mi smo proizvođač, pa trgovinama, firmama, ugostiteljima i autopraonicama prodajemo direktno iz fabrike, na veliko i malo. Za veće količine pošaljite upit i dobićete ponudu."
  },
  {
    pitanje: "Da li vršite dostavu?",
    odgovor: "Da, dostava postoji. Uslove i rok dostave dogovaramo uz ponudu, a možete ih pitati i telefonom na 060 312 1040."
  },
  {
    pitanje: "Kako da dobijem cijenu?",
    odgovor: "Kod proizvoda kliknite \"Zatraži ponudu\", upišite količinu i pošaljite upit. Možete nas i pozvati, a cijenu Vam kažemo odmah."
  },
  {
    pitanje: "Kada ćete mi se javiti nakon upita?",
    odgovor: "Javljamo se u najkraćem roku, telefonom ili e-mailom, kako Vam više odgovara."
  },
  {
    pitanje: "Gdje se proizvode Vaši proizvodi?",
    odgovor: "Svi proizvodi iz kataloga su naši brendovi i prave se u našoj fabrici u Kiseljaku: Exall, Gut Waschen, EXO, Blitz, Exline, Butterfly i HC."
  },
  {
    pitanje: "Da li je Herti Company isto što i EXON?",
    odgovor: "Da, radi se o istoj fabrici. Početkom 2026. godine firmu je preuzeo novi vlasnik i od tada poslujemo pod imenom Herti Company, s proizvodima koje već poznajete."
  },
  {
    pitanje: "Kako se plaća narudžba?",
    odgovor: "Na stranici nema online plaćanja. Način plaćanja dogovaramo zajedno s ponudom."
  }
];
