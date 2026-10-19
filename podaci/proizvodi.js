/* ==========================================================================
   PROIZVODI – Herti Company
   --------------------------------------------------------------------------
   Ovo je JEDINI fajl koji trebate mijenjati da dodate ili promijenite proizvod.
   Stranica za svaki proizvod pravi se sama od ovih podataka.

   KAKO DODATI NOVI PROIZVOD
   1. Kopirajte cijeli blok jednog proizvoda – od { do },
   2. Zalijepite ga tamo gdje želite da se pojavi u katalogu
      (proizvodi se prikazuju TAČNO ovim redoslijedom).
   3. Promijenite tekst između navodnika " ".
   4. "id" mora biti jedinstven: mala slova, bez kvačica, riječi odvojene crticom.
      Primjer: "tecni-sapun-lavanda-500ml"

   POLJA
   id          – adresa stranice proizvoda (ne mijenjajte kod postojećih proizvoda)
   naziv       – puni naziv proizvoda
   brend       – Exall, Gut Waschen, EXO, Blitz, Exline, Butterfly, HC...
   kategorija  – "kucna-hemija", "licna-higijena" ili "auto-hemija"
   grupa       – podgrupa unutar kategorije (npr. "Pranje posuđa"), ili "" ako je nema
   linija      – isti proizvod u drugim pakovanjima ima ISTU liniju
                 (tako se na stranici prikazuje "Dostupno i u: 500 ml · 1000 ml · 5 L")
   zapremina   – npr. "500 ml", "1 L", "5 L"
   pakovanje   – "Boca", "Boca s pumpicom" ili "Galon"
   miris       – miris ako postoji, inače ""
   namjena     – za šta se koristi, jednom rečenicom
   kratakOpis  – 1–2 rečenice, prikazuje se na kartici i na vrhu stranice
   opis        – duži opis (nekoliko rečenica)
   prednosti   – lista kratkih tačaka, svaka u navodnicima, odvojene zarezom
   slika       – putanja do slike, npr. "slike/proizvodi/exall-limun-500ml.jpg"
                 (ostavite "" dok nema slike – tada se prikazuje prazno mjesto)

   NAJTRAŽENIJI – lista window.NAJTRAZENIJI odmah ispod ovog komentara određuje
                 koji se proizvodi prikazuju na početnoj u "Najtraženiji proizvodi"
                 i kojim redoslijedom. Upisuje se samo id proizvoda.
   ========================================================================== */

/* NAJTRAŽENIJI PROIZVODI – prikazuju se na početnoj, ovim redoslijedom.
   Da promijenite proizvod, upišite njegov id (iz liste ispod). */
window.NAJTRAZENIJI = [
  "deterdzent-za-ves-universal-gel-3l",
  "deterdzent-za-ves-ultra-sauber-5l",
  "sredstvo-za-podove-1000ml",
  "tecnost-za-pranje-stakla-750ml"
];

window.KATEGORIJE = [
  {
    id: "kucna-hemija",
    naziv: "Kućna hemija",
    naslov: "Kućna hemija – deterdženti i sredstva za čišćenje",
    uvod: "Deterdženti za posuđe (suđe) i veš, sredstvo za podove, univerzalno sredstvo i tečnost za stakla. Sve iz naše fabrike u Kiseljaku, za domaćinstva, trgovine, urede i ugostiteljstvo.",
    savjet: [
      "Za domaćinstvo su najpraktičnije boce od 500 ml i 1000 ml: lako se drže, stanu ispod sudopera i dovoljne su za svakodnevno korištenje.",
      "Galoni od 3 L i 5 L su za one koji troše više: restorane, kantine, urede, škole i firme za čišćenje. Iz galona se lako dopunjavaju manje boce, pa je kupovina ekonomičnija.",
      "Trgovinama preporučujemo kombinaciju manjih i većih pakovanja istog proizvoda, kako bi kupac sam izabrao veličinu koja mu odgovara."
    ],
    opisZaGoogle: "Deterdžent za posuđe, deterdžent za veš, sredstvo za podove i staklo. Proizvođač kućne hemije iz Kiseljaka. Bez minimalne narudžbe, dostava."
  },
  {
    id: "licna-higijena",
    naziv: "Lična higijena",
    naslov: "Lična higijena – tečni sapuni i šamponi",
    uvod: "Tečni (tekući) sapuni Exline u četiri mirisa i šamponi Butterfly s kamilicom i koprivom. Pakovanja od praktične bočice s pumpicom do galona od 5 L.",
    savjet: [
      "Bočica od 500 ml s pumpicom stoji spremna na umivaoniku: u kupatilu, kuhinji ili toaletu u lokalu.",
      "Boca od 1000 ml služi za dopunjavanje bočica s pumpicom, pa ne morate svaki put kupovati novu pumpicu.",
      "Galon od 5 L je za firme, škole, ordinacije, restorane i sve koji pune zidne dozatore. Mirise možete kombinovati po želji."
    ],
    opisZaGoogle: "Tečni sapun za ruke i šampon za kosu – Exline i Butterfly. Pakovanja 500 ml, 1000 ml i 5 L. Proizvođač iz Kiseljaka, dostava."
  },
  {
    id: "auto-hemija",
    naziv: "Auto hemija",
    naslov: "Auto hemija – njega i čišćenje vozila",
    uvod: "Sve za čisto vozilo iz jedne fabrike: sredstvo za motor, sjaj za gume, sredstvo za kožna sjedišta, autošampon s voskom, tečnost (tekućina) za vjetrobranska stakla i destilirana voda.",
    savjet: [
      "Za autopraonice i servise najisplativija su veća pakovanja, npr. tečnost za vjetrobran Blitz od 5 L i destilirana voda od 5 L.",
      "Za benzinske pumpe i trgovine dobro se prodaju manja pakovanja od 750 ml i 1 L, koja vozač može odmah upotrijebiti.",
      "Proizvodi se međusobno dopunjuju: autošampon za pranje, sjaj za gume za završni izgled i sredstvo za sjedišta za unutrašnjost."
    ],
    opisZaGoogle: "Auto hemija HC: tečnost za vjetrobran Blitz, autošampon s voskom, sjaj za gume, čišćenje motora i kožnih sjedišta, destilirana voda."
  }
];

window.PROIZVODI = [

  /* ======================= KUĆNA HEMIJA – Pranje posuđa ======================= */

  {
    id: "deterdzent-za-posude-limun-500ml",
    naziv: "Deterdžent za posuđe Limun 500 ml",
    brend: "Exall",
    kategorija: "kucna-hemija",
    grupa: "Pranje posuđa",
    linija: "exall-limun",
    zapremina: "500 ml",
    pakovanje: "Boca",
    miris: "Limun",
    namjena: "Ručno pranje posuđa, čaša i pribora za jelo",
    kratakOpis: "Deterdžent za ručno pranje posuđa s mirisom limuna. Skida masnoću i ostatke hrane i ostavlja svjež miris u kuhinji.",
    opis: "Exall Limun je deterdžent za svakodnevno ručno pranje posuđa. Pomaže da tanjiri, čaše, šerpe i pribor za jelo budu čisti i bez masnoće, a nakon ispiranja u kuhinji ostaje svjež miris limuna. Boca od 500 ml je praktična za svaku kuhinju i lako se drži u ruci.",
    prednosti: [
      "Čisto posuđe bez masnoće – za tanjire, čaše, šerpe i pribor",
      "Svjež miris limuna u kuhinji",
      "Praktična boca od 500 ml za svako domaćinstvo",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/deterdzent-za-posude-limun-500ml.webp"
  },
  {
    id: "deterdzent-za-posude-limun-1000ml",
    naziv: "Deterdžent za posuđe Limun 1000 ml",
    brend: "Exall",
    kategorija: "kucna-hemija",
    grupa: "Pranje posuđa",
    linija: "exall-limun",
    zapremina: "1000 ml",
    pakovanje: "Boca",
    miris: "Limun",
    namjena: "Ručno pranje posuđa, čaša i pribora za jelo",
    kratakOpis: "Veće pakovanje deterdženta za posuđe s mirisom limuna. Za domaćinstva koja često peru posuđe.",
    opis: "Exall Limun u boci od 1000 ml je deterdžent za ručno pranje posuđa za domaćinstva u kojima se kuha svaki dan. Pomaže da posuđe bude čisto i bez masnoće, a u kuhinji ostaje svjež miris limuna. Veća boca znači rjeđu kupovinu i ekonomičnije korištenje.",
    prednosti: [
      "Čisto posuđe bez masnoće za svakodnevno pranje",
      "Svjež miris limuna",
      "Veća boca – rjeđa kupovina i ekonomičnije korištenje",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/deterdzent-za-posude-limun-1000ml.webp"
  },
  {
    id: "deterdzent-za-posude-limun-5l",
    naziv: "Deterdžent za posuđe Limun 5 L",
    brend: "Exall",
    kategorija: "kucna-hemija",
    grupa: "Pranje posuđa",
    linija: "exall-limun",
    zapremina: "5 L",
    pakovanje: "Galon",
    miris: "Limun",
    namjena: "Ručno pranje posuđa u ugostiteljstvu, kantinama i uredima",
    kratakOpis: "Galon deterdženta za posuđe s mirisom limuna. Za restorane, kantine, urede i dopunjavanje manjih boca.",
    opis: "Exall Limun u galonu od 5 L je deterdžent za ručno pranje posuđa namijenjen mjestima gdje se posuđe pere cijeli dan: restoranima, kafićima, kantinama, vrtićima i uredima. Iz galona se lako dopunjavaju manje boce, pa je ovo najekonomičnije pakovanje Exall deterdženta.",
    prednosti: [
      "Najekonomičnije pakovanje za veliku potrošnju",
      "Za restorane, kafiće, kantine, vrtiće i urede",
      "Lako dopunjavanje manjih boca",
      "Svjež miris limuna"
    ],
    slika: "slike/proizvodi/deterdzent-za-posude-limun-5l.webp"
  },
  {
    id: "deterdzent-za-posude-jabuka-500ml",
    naziv: "Deterdžent za posuđe Jabuka 500 ml",
    brend: "Exall",
    kategorija: "kucna-hemija",
    grupa: "Pranje posuđa",
    linija: "exall-jabuka",
    zapremina: "500 ml",
    pakovanje: "Boca",
    miris: "Jabuka",
    namjena: "Ručno pranje posuđa, čaša i pribora za jelo",
    kratakOpis: "Deterdžent za ručno pranje posuđa s mirisom jabuke. Skida masnoću i ostavlja ugodan, svjež miris.",
    opis: "Exall Jabuka je deterdžent za svakodnevno ručno pranje posuđa za one koji vole blaži, voćni miris. Pomaže da tanjiri, čaše, šerpe i pribor za jelo budu čisti i bez masnoće. Boca od 500 ml je praktična za svaku kuhinju.",
    prednosti: [
      "Čisto posuđe bez masnoće – za tanjire, čaše, šerpe i pribor",
      "Ugodan, voćni miris jabuke",
      "Praktična boca od 500 ml za svako domaćinstvo",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/deterdzent-za-posude-jabuka-500ml.webp"
  },
  {
    id: "deterdzent-za-posude-jabuka-1000ml",
    naziv: "Deterdžent za posuđe Jabuka 1000 ml",
    brend: "Exall",
    kategorija: "kucna-hemija",
    grupa: "Pranje posuđa",
    linija: "exall-jabuka",
    zapremina: "1000 ml",
    pakovanje: "Boca",
    miris: "Jabuka",
    namjena: "Ručno pranje posuđa, čaša i pribora za jelo",
    kratakOpis: "Veće pakovanje deterdženta za posuđe s mirisom jabuke. Za domaćinstva koja često peru posuđe.",
    opis: "Exall Jabuka u boci od 1000 ml je deterdžent za ručno pranje posuđa za domaćinstva u kojima se kuha svaki dan. Pomaže da posuđe bude čisto i bez masnoće, uz ugodan voćni miris jabuke. Veća boca znači rjeđu kupovinu i ekonomičnije korištenje.",
    prednosti: [
      "Čisto posuđe bez masnoće za svakodnevno pranje",
      "Ugodan, voćni miris jabuke",
      "Veća boca – rjeđa kupovina i ekonomičnije korištenje",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/deterdzent-za-posude-jabuka-1000ml.webp"
  },
  {
    id: "deterdzent-za-posude-jabuka-5l",
    naziv: "Deterdžent za posuđe Jabuka 5 L",
    brend: "Exall",
    kategorija: "kucna-hemija",
    grupa: "Pranje posuđa",
    linija: "exall-jabuka",
    zapremina: "5 L",
    pakovanje: "Galon",
    miris: "Jabuka",
    namjena: "Ručno pranje posuđa u ugostiteljstvu, kantinama i uredima",
    kratakOpis: "Galon deterdženta za posuđe s mirisom jabuke. Za restorane, kantine, urede i dopunjavanje manjih boca.",
    opis: "Exall Jabuka u galonu od 5 L je deterdžent za ručno pranje posuđa namijenjen mjestima s velikom potrošnjom: restoranima, kafićima, kantinama, vrtićima i uredima. Iz galona se lako dopunjavaju manje boce, pa je ovo najekonomičnije pakovanje.",
    prednosti: [
      "Najekonomičnije pakovanje za veliku potrošnju",
      "Za restorane, kafiće, kantine, vrtiće i urede",
      "Lako dopunjavanje manjih boca",
      "Ugodan, voćni miris jabuke"
    ],
    slika: "slike/proizvodi/deterdzent-za-posude-jabuka-5l.webp"
  },

  /* ======================= KUĆNA HEMIJA – Pranje veša ======================= */

  {
    id: "deterdzent-za-ves-ultra-sauber-5l",
    naziv: "Deterdžent za veš Ultra Sauber 5 L",
    brend: "Gut Waschen",
    kategorija: "kucna-hemija",
    grupa: "Pranje veša",
    linija: "gut-waschen-ultra-sauber",
    zapremina: "5 L",
    pakovanje: "Galon",
    miris: "",
    namjena: "Pranje veša",
    kratakOpis: "Tečni deterdžent za veš u velikom pakovanju od 5 L. Za porodice, perionice i sve koji peru često.",
    opis: "Gut Waschen Ultra Sauber je tečni deterdžent za pranje veša u ekonomičnom galonu od 5 L. Namijenjen je domaćinstvima s puno veša, ali i perionicama, hotelima, apartmanima i firmama. Doziranje prilagodite količini i zaprljanosti veša, prema uputstvu na etiketi.",
    prednosti: [
      "Veliko pakovanje od 5 L – za mnogo pranja",
      "Za porodice, perionice, hotele i apartmane",
      "Tečni deterdžent – lako se dozira",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/deterdzent-za-ves-ultra-sauber-5l.webp"
  },
  {
    id: "deterdzent-za-ves-universal-gel-3l",
    naziv: "Deterdžent za veš Universal Gel 3 L",
    brend: "Gut Waschen",
    kategorija: "kucna-hemija",
    grupa: "Pranje veša",
    linija: "gut-waschen-universal-gel",
    zapremina: "3 L",
    pakovanje: "Galon",
    miris: "",
    namjena: "Svakodnevno pranje veša",
    kratakOpis: "Gel deterdžent za svakodnevno pranje veša u pakovanju od 3 L. Univerzalan izbor za domaćinstvo.",
    opis: "Gut Waschen Universal Gel je deterdžent u obliku gela za svakodnevno pranje veša. Pakovanje od 3 L je dobra sredina između male boce i velikog galona, pa odgovara većini domaćinstava. Doziranje prilagodite količini i zaprljanosti veša, prema uputstvu na etiketi.",
    prednosti: [
      "Gel koji se lako dozira",
      "Univerzalan izbor za svakodnevno pranje",
      "Pakovanje od 3 L – mjera za većinu domaćinstava",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/deterdzent-za-ves-universal-gel-3l.webp"
  },

  /* ============== KUĆNA HEMIJA – Čišćenje površina i prostora ============== */

  {
    id: "sredstvo-za-podove-1000ml",
    naziv: "Sredstvo za podove 1000 ml",
    brend: "Gut Waschen",
    kategorija: "kucna-hemija",
    grupa: "Čišćenje površina i prostora",
    linija: "gut-waschen-podovi",
    zapremina: "1000 ml",
    pakovanje: "Boca",
    miris: "",
    namjena: "Pranje podova u stanu, kući i poslovnom prostoru",
    kratakOpis: "Sredstvo za pranje podova koje se razrjeđuje u vodi. Za čiste i svježe podove u kući i poslovnom prostoru.",
    opis: "Gut Waschen sredstvo za podove namijenjeno je redovnom pranju podova u stanu, kući, uredu ili lokalu. Dodaje se u vodu za brisanje i pomaže da podovi budu čisti i svježi. Količinu za razrjeđivanje pročitajte na etiketi.",
    prednosti: [
      "Čisti i svježi podovi uz redovno brisanje",
      "Razrjeđuje se u vodi – jedna boca traje dugo",
      "Za stanove, kuće, urede i lokale",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/sredstvo-za-podove-1000ml.webp"
  },
  {
    id: "univerzalno-sredstvo-za-ciscenje-limun-750ml",
    naziv: "Univerzalno sredstvo za čišćenje Limun 750 ml",
    brend: "EXO",
    kategorija: "kucna-hemija",
    grupa: "Čišćenje površina i prostora",
    linija: "exo-univerzalno-limun",
    zapremina: "750 ml",
    pakovanje: "Boca",
    miris: "Limun",
    namjena: "Čišćenje različitih površina u kući i poslovnom prostoru",
    kratakOpis: "Univerzalno sredstvo za čišćenje s mirisom limuna. Jedna boca za više površina u kući.",
    opis: "EXO univerzalno sredstvo s mirisom limuna služi za svakodnevno čišćenje različitih površina: kuhinjskih radnih ploha, stolova, vrata, kupatila i drugih perivih površina. Umjesto više različitih sredstava, imate jedno koje je uvijek pri ruci. Prije prve upotrebe na osjetljivoj površini isprobajte na manje vidljivom mjestu.",
    prednosti: [
      "Jedno sredstvo za više površina u kući",
      "Svjež miris limuna nakon čišćenja",
      "Za kuhinju, kupatilo, stolove i vrata",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/univerzalno-sredstvo-za-ciscenje-limun-750ml.webp"
  },
  {
    id: "tecnost-za-pranje-stakla-750ml",
    naziv: "Tečnost za pranje stakla 750 ml",
    brend: "Blitz",
    kategorija: "kucna-hemija",
    grupa: "Čišćenje površina i prostora",
    linija: "blitz-staklo",
    zapremina: "750 ml",
    pakovanje: "Boca",
    miris: "",
    namjena: "Pranje prozora, ogledala, staklenih vrata i vitrina",
    kratakOpis: "Tečnost za pranje prozora, ogledala i staklenih površina. Za sjajno staklo u kući, uredu i trgovini.",
    opis: "Blitz tečnost za pranje stakla namijenjena je prozorima, ogledalima, staklenim vratima, vitrinama i izlozima. Nanesite na staklo i obrišite suhom krpom ili papirnim ubrusom. Odličan izbor za domaćinstva, urede i trgovine kojima je izlog prvi utisak.",
    prednosti: [
      "Sjajni prozori, ogledala i vitrine",
      "Za kuće, urede, trgovine i izloge",
      "Jednostavno: nanesite i obrišite",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/tecnost-za-pranje-stakla-750ml.webp"
  },

  /* ======================= LIČNA HIGIJENA – Tečni sapun ======================= */

  {
    id: "tecni-sapun-aloe-vera-500ml",
    naziv: "Tečni sapun Aloe Vera 500 ml (pumpica)",
    brend: "Exline",
    kategorija: "licna-higijena",
    grupa: "Tečni sapun",
    linija: "exline-aloe-vera",
    zapremina: "500 ml",
    pakovanje: "Boca s pumpicom",
    miris: "Aloe Vera",
    namjena: "Pranje ruku",
    kratakOpis: "Tečni sapun za ruke Aloe Vera u bočici s pumpicom. Spreman za umivaonik u kupatilu, kuhinji ili lokalu.",
    opis: "Exline Aloe Vera je tečni sapun za svakodnevno pranje ruku. Bočica od 500 ml s pumpicom stoji spremna na umivaoniku, a jednim pritiskom dobijete dovoljno sapuna za pranje. Kada se isprazni, dopunite je iz boce od 1000 ml ili galona od 5 L.",
    prednosti: [
      "Spreman za upotrebu – bočica s pumpicom",
      "Ugodan miris Aloe Vera",
      "Lako se dopunjava iz većeg pakovanja",
      "Za kupatilo, kuhinju, urede i lokale"
    ],
    slika: "slike/proizvodi/tecni-sapun-aloe-vera-500ml.webp"
  },
  {
    id: "tecni-sapun-aloe-vera-1000ml",
    naziv: "Tečni sapun Aloe Vera 1000 ml",
    brend: "Exline",
    kategorija: "licna-higijena",
    grupa: "Tečni sapun",
    linija: "exline-aloe-vera",
    zapremina: "1000 ml",
    pakovanje: "Boca",
    miris: "Aloe Vera",
    namjena: "Pranje ruku i dopunjavanje bočica s pumpicom",
    kratakOpis: "Tečni sapun Aloe Vera u boci od 1000 ml. Za dopunjavanje bočica s pumpicom.",
    opis: "Exline Aloe Vera u boci od 1000 ml je tečni sapun za ruke namijenjen dopunjavanju bočica s pumpicom. Tako ne kupujete svaki put novu pumpicu, a sapun Vam je uvijek pri ruci. Odgovara domaćinstvima i manjim uredima.",
    prednosti: [
      "Ekonomično dopunjavanje bočica s pumpicom",
      "Ugodan miris Aloe Vera",
      "Manje plastike – pumpicu koristite više puta",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/tecni-sapun-aloe-vera-1000ml.webp"
  },
  {
    id: "tecni-sapun-aloe-vera-5l",
    naziv: "Tečni sapun Aloe Vera 5 L",
    brend: "Exline",
    kategorija: "licna-higijena",
    grupa: "Tečni sapun",
    linija: "exline-aloe-vera",
    zapremina: "5 L",
    pakovanje: "Galon",
    miris: "Aloe Vera",
    namjena: "Pranje ruku i punjenje dozatora u firmama i ustanovama",
    kratakOpis: "Galon tečnog sapuna Aloe Vera. Za firme, škole, ordinacije, restorane i punjenje dozatora.",
    opis: "Exline Aloe Vera u galonu od 5 L je tečni sapun za ruke namijenjen mjestima s mnogo ljudi: firmama, školama, vrtićima, ordinacijama, restoranima i trgovačkim centrima. Iz galona se pune zidni dozatori i bočice s pumpicom. Ovo je najekonomičnije pakovanje Exline sapuna.",
    prednosti: [
      "Najekonomičnije pakovanje za veliku potrošnju",
      "Za firme, škole, vrtiće, ordinacije i restorane",
      "Za punjenje zidnih dozatora i bočica",
      "Ugodan miris Aloe Vera"
    ],
    slika: "slike/proizvodi/tecni-sapun-aloe-vera-5l.webp"
  },
  {
    id: "tecni-sapun-jorgovan-500ml",
    naziv: "Tečni sapun Jorgovan 500 ml (pumpica)",
    brend: "Exline",
    kategorija: "licna-higijena",
    grupa: "Tečni sapun",
    linija: "exline-jorgovan",
    zapremina: "500 ml",
    pakovanje: "Boca s pumpicom",
    miris: "Jorgovan",
    namjena: "Pranje ruku",
    kratakOpis: "Tečni sapun za ruke s cvjetnim mirisom jorgovana, u bočici s pumpicom.",
    opis: "Exline Jorgovan je tečni sapun za svakodnevno pranje ruku s nježnim cvjetnim mirisom. Bočica od 500 ml s pumpicom stoji spremna na umivaoniku u kupatilu, kuhinji ili toaletu u lokalu. Kada se isprazni, dopunite je iz boce od 1000 ml.",
    prednosti: [
      "Spreman za upotrebu – bočica s pumpicom",
      "Nježan cvjetni miris jorgovana",
      "Lako se dopunjava iz većeg pakovanja",
      "Za kupatilo, kuhinju, urede i lokale"
    ],
    slika: "slike/proizvodi/tecni-sapun-jorgovan-500ml.webp"
  },
  {
    id: "tecni-sapun-jorgovan-1000ml",
    naziv: "Tečni sapun Jorgovan 1000 ml",
    brend: "Exline",
    kategorija: "licna-higijena",
    grupa: "Tečni sapun",
    linija: "exline-jorgovan",
    zapremina: "1000 ml",
    pakovanje: "Boca",
    miris: "Jorgovan",
    namjena: "Pranje ruku i dopunjavanje bočica s pumpicom",
    kratakOpis: "Tečni sapun Jorgovan u boci od 1000 ml. Za dopunjavanje bočica s pumpicom.",
    opis: "Exline Jorgovan u boci od 1000 ml je tečni sapun za ruke s cvjetnim mirisom, namijenjen dopunjavanju bočica s pumpicom. Tako ne kupujete svaki put novu pumpicu, a sapun Vam je uvijek pri ruci.",
    prednosti: [
      "Ekonomično dopunjavanje bočica s pumpicom",
      "Nježan cvjetni miris jorgovana",
      "Manje plastike – pumpicu koristite više puta",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/tecni-sapun-jorgovan-1000ml.webp"
  },
  {
    id: "tecni-sapun-magnolija-500ml",
    naziv: "Tečni sapun Magnolija 500 ml (pumpica)",
    brend: "Exline",
    kategorija: "licna-higijena",
    grupa: "Tečni sapun",
    linija: "exline-magnolija",
    zapremina: "500 ml",
    pakovanje: "Boca s pumpicom",
    miris: "Magnolija",
    namjena: "Pranje ruku",
    kratakOpis: "Tečni sapun za ruke s mirisom magnolije, u bočici s pumpicom.",
    opis: "Exline Magnolija je tečni sapun za svakodnevno pranje ruku s elegantnim cvjetnim mirisom. Bočica od 500 ml s pumpicom stoji spremna na umivaoniku u kupatilu, kuhinji ili lokalu. Kada se isprazni, dopunite je iz boce od 1000 ml.",
    prednosti: [
      "Spreman za upotrebu – bočica s pumpicom",
      "Elegantan cvjetni miris magnolije",
      "Lako se dopunjava iz većeg pakovanja",
      "Za kupatilo, kuhinju, urede i lokale"
    ],
    slika: "slike/proizvodi/tecni-sapun-magnolija-500ml.webp"
  },
  {
    id: "tecni-sapun-magnolija-1000ml",
    naziv: "Tečni sapun Magnolija 1000 ml",
    brend: "Exline",
    kategorija: "licna-higijena",
    grupa: "Tečni sapun",
    linija: "exline-magnolija",
    zapremina: "1000 ml",
    pakovanje: "Boca",
    miris: "Magnolija",
    namjena: "Pranje ruku i dopunjavanje bočica s pumpicom",
    kratakOpis: "Tečni sapun Magnolija u boci od 1000 ml. Za dopunjavanje bočica s pumpicom.",
    opis: "Exline Magnolija u boci od 1000 ml je tečni sapun za ruke s cvjetnim mirisom magnolije, namijenjen dopunjavanju bočica s pumpicom. Tako ne kupujete svaki put novu pumpicu, a sapun Vam je uvijek pri ruci.",
    prednosti: [
      "Ekonomično dopunjavanje bočica s pumpicom",
      "Elegantan cvjetni miris magnolije",
      "Manje plastike – pumpicu koristite više puta",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/tecni-sapun-magnolija-1000ml.webp"
  },
  {
    id: "tecni-sapun-silky-rose-5l",
    naziv: "Tečni sapun Silky Rose 5 L",
    brend: "Exline",
    kategorija: "licna-higijena",
    grupa: "Tečni sapun",
    linija: "exline-silky-rose",
    zapremina: "5 L",
    pakovanje: "Galon",
    miris: "Silky Rose (ruža)",
    namjena: "Pranje ruku i punjenje dozatora u firmama i ustanovama",
    kratakOpis: "Galon tečnog sapuna s mirisom ruže. Za firme, ugostiteljstvo i punjenje dozatora.",
    opis: "Exline Silky Rose u galonu od 5 L je tečni sapun za ruke s mirisom ruže, namijenjen mjestima s velikom potrošnjom: firmama, hotelima, restoranima, školama i ordinacijama. Iz galona se pune zidni dozatori i bočice s pumpicom.",
    prednosti: [
      "Najekonomičnije pakovanje za veliku potrošnju",
      "Ugodan miris ruže za toalete i kupatila",
      "Za punjenje zidnih dozatora i bočica",
      "Za firme, hotele, restorane i škole"
    ],
    slika: "slike/proizvodi/tecni-sapun-silky-rose-5l.webp"
  },

  /* ======================= LIČNA HIGIJENA – Šampon ======================= */

  {
    id: "sampon-kamilica-1000ml",
    naziv: "Šampon Kamilica 1000 ml",
    brend: "Butterfly",
    kategorija: "licna-higijena",
    grupa: "Šampon",
    linija: "butterfly-kamilica",
    zapremina: "1000 ml",
    pakovanje: "Boca",
    miris: "Kamilica",
    namjena: "Pranje kose",
    kratakOpis: "Šampon za kosu s kamilicom u velikoj porodičnoj boci od 1000 ml.",
    opis: "Butterfly Kamilica je šampon za svakodnevno pranje kose s blagim, poznatim mirisom kamilice. Boca od 1000 ml traje dugo, pa je praktična za cijelu porodicu, ali i za hotele, apartmane i frizerske salone.",
    prednosti: [
      "Velika porodična boca od 1000 ml",
      "Blag, poznat miris kamilice",
      "Za porodice, apartmane, hotele i salone",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/sampon-kamilica-1000ml.webp"
  },
  {
    id: "sampon-kopriva-1000ml",
    naziv: "Šampon Kopriva 1000 ml",
    brend: "Butterfly",
    kategorija: "licna-higijena",
    grupa: "Šampon",
    linija: "butterfly-kopriva",
    zapremina: "1000 ml",
    pakovanje: "Boca",
    miris: "Kopriva",
    namjena: "Pranje kose",
    kratakOpis: "Šampon za kosu s koprivom u velikoj porodičnoj boci od 1000 ml.",
    opis: "Butterfly Kopriva je šampon za svakodnevno pranje kose s koprivom, biljkom koja se kod nas tradicionalno veže uz njegu kose. Boca od 1000 ml traje dugo, pa je praktična za cijelu porodicu, ali i za hotele, apartmane i frizerske salone.",
    prednosti: [
      "Velika porodična boca od 1000 ml",
      "Šampon s koprivom za svakodnevnu njegu kose",
      "Za porodice, apartmane, hotele i salone",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/sampon-kopriva-1000ml.webp"
  },

  /* ======================= AUTO HEMIJA ======================= */

  {
    id: "sredstvo-za-ciscenje-motora-750ml",
    naziv: "Sredstvo za čišćenje motora 750 ml",
    brend: "HC",
    kategorija: "auto-hemija",
    grupa: "",
    linija: "hc-motor",
    zapremina: "750 ml",
    pakovanje: "Boca",
    miris: "",
    namjena: "Čišćenje motornog prostora vozila",
    kratakOpis: "Sredstvo za čišćenje motora i motornog prostora od masnoće, ulja i prljavštine s ceste.",
    opis: "HC sredstvo za čišćenje motora namijenjeno je uklanjanju masnoće, ulja i nakupljene prljavštine iz motornog prostora. Čist motor lakše je pregledati, a vozilo ostavlja bolji utisak pri prodaji ili servisu. Koristite na hladnom motoru i pratite uputstvo na etiketi.",
    prednosti: [
      "Uklanja masnoću, ulje i prljavštinu iz motornog prostora",
      "Čist motor – lakši pregled i bolji utisak pri prodaji",
      "Za vozače, servise i autopraonice",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/sredstvo-za-ciscenje-motora-750ml.webp"
  },
  {
    id: "sjaj-za-gume-gumax-750ml",
    naziv: "Sjaj za gume GuMax 750 ml",
    brend: "HC",
    kategorija: "auto-hemija",
    grupa: "",
    linija: "hc-gumax",
    zapremina: "750 ml",
    pakovanje: "Boca",
    miris: "",
    namjena: "Završna njega i sjaj vanjskih strana guma",
    kratakOpis: "Sjaj za gume GuMax daje gumama tamnu, uredno njegovanu boju nakon pranja vozila.",
    opis: "HC GuMax je sredstvo za završnu njegu guma. Nanosi se na čiste i suhe bočne strane guma i daje im tamnu, sjajnu boju, pa cijelo vozilo izgleda urednije. Ne nanosite na gazni sloj gume i kočione dijelove.",
    prednosti: [
      "Tamne, sjajne gume nakon pranja",
      "Završni detalj koji cijelo vozilo čini urednijim",
      "Za vozače, autopraonice i auto salone",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/sjaj-za-gume-gumax-750ml.webp"
  },
  {
    id: "sredstvo-za-ciscenje-koznih-sjedista-750ml",
    naziv: "Sredstvo za čišćenje kožnih sjedišta 750 ml",
    brend: "HC",
    kategorija: "auto-hemija",
    grupa: "",
    linija: "hc-koza",
    zapremina: "750 ml",
    pakovanje: "Boca",
    miris: "",
    namjena: "Čišćenje kožnih sjedišta i kožnih dijelova u vozilu",
    kratakOpis: "Sredstvo za čišćenje kožnih sjedišta i kožnih dijelova unutrašnjosti vozila.",
    opis: "HC sredstvo za kožna sjedišta namijenjeno je čišćenju sjedišta, volana i drugih kožnih dijelova u vozilu. Pomaže da unutrašnjost bude čista i uredna. Nanesite na mekanu krpu, a ne direktno na kožu, i prije prve upotrebe isprobajte na manje vidljivom mjestu.",
    prednosti: [
      "Čista i uredna kožna sjedišta i volan",
      "Za njegu unutrašnjosti vozila",
      "Za vozače, autopraonice i servise",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/sredstvo-za-ciscenje-koznih-sjedista-750ml.webp"
  },
  {
    id: "autosampon-sa-voskom-1000ml",
    naziv: "Autošampon sa voskom 1000 ml",
    brend: "HC",
    kategorija: "auto-hemija",
    grupa: "",
    linija: "hc-autosampon",
    zapremina: "1000 ml",
    pakovanje: "Boca",
    miris: "",
    namjena: "Ručno pranje vozila",
    kratakOpis: "Autošampon s voskom za ručno pranje vozila. Pere i istovremeno daje sjaj laku.",
    opis: "HC autošampon s voskom služi za ručno pranje automobila, kombija i motocikala. Dodaje se u kantu s vodom, a vosak u sastavu pomaže da lak nakon pranja ima ljepši sjaj. Perite u hladu i ne puštajte da se šampon osuši na vozilu.",
    prednosti: [
      "Pranje i sjaj u jednom koraku",
      "Za automobile, kombije i motocikle",
      "Boca od 1000 ml za mnogo pranja",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/autosampon-sa-voskom-1000ml.webp"
  },
  {
    id: "tecnost-za-vjetrobranska-stakla-blitz-1l",
    naziv: "Tečnost za vjetrobranska stakla Blitz 1 L",
    brend: "HC",
    kategorija: "auto-hemija",
    grupa: "",
    linija: "hc-blitz-vjetrobran",
    zapremina: "1 L",
    pakovanje: "Boca",
    miris: "",
    namjena: "Punjenje posude za pranje vjetrobranskog stakla",
    kratakOpis: "Tečnost za vjetrobran Blitz u boci od 1 L. Za čisto staklo i bolju vidljivost u vožnji.",
    opis: "HC Blitz je tečnost kojom se puni posuda za pranje vjetrobranskog stakla. Pomaže brisačima da skinu prašinu, mušice i prljavštinu s ceste, za bolju vidljivost i sigurniju vožnju. Boca od 1 L je zgodna za prtljažnik i brzo dolijevanje.",
    prednosti: [
      "Čist vjetrobran i bolja vidljivost u vožnji",
      "Zgodna boca od 1 L za prtljažnik",
      "Za vozače, benzinske pumpe i trgovine",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/tecnost-za-vjetrobranska-stakla-blitz-1l.webp"
  },
  {
    id: "tecnost-za-vjetrobranska-stakla-blitz-3l",
    naziv: "Tečnost za vjetrobranska stakla Blitz 3 L",
    brend: "HC",
    kategorija: "auto-hemija",
    grupa: "",
    linija: "hc-blitz-vjetrobran",
    zapremina: "3 L",
    pakovanje: "Galon",
    miris: "",
    namjena: "Punjenje posude za pranje vjetrobranskog stakla",
    kratakOpis: "Tečnost za vjetrobran Blitz u galonu od 3 L. Dovoljno za više punjenja.",
    opis: "HC Blitz u galonu od 3 L je tečnost za punjenje posude za pranje vjetrobranskog stakla. Pomaže brisačima da skinu prašinu, mušice i prljavštinu s ceste. Galon je dovoljan za više punjenja, pa je praktičan za vozače koji puno putuju.",
    prednosti: [
      "Čist vjetrobran i bolja vidljivost u vožnji",
      "Galon od 3 L – dovoljno za više punjenja",
      "Za vozače, benzinske pumpe i trgovine",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/tecnost-za-vjetrobranska-stakla-blitz-3l.webp"
  },
  {
    id: "tecnost-za-vjetrobranska-stakla-blitz-5l",
    naziv: "Tečnost za vjetrobranska stakla Blitz 5 L",
    brend: "HC",
    kategorija: "auto-hemija",
    grupa: "",
    linija: "hc-blitz-vjetrobran",
    zapremina: "5 L",
    pakovanje: "Galon",
    miris: "",
    namjena: "Punjenje posude za pranje vjetrobranskog stakla",
    kratakOpis: "Tečnost za vjetrobran Blitz u galonu od 5 L. Za autopraonice, servise, flote vozila i česta putovanja.",
    opis: "HC Blitz u galonu od 5 L je najekonomičnije pakovanje tečnosti za punjenje posude za pranje vjetrobranskog stakla. Namijenjen je autopraonicama, servisima, firmama s više vozila i vozačima koji puno putuju.",
    prednosti: [
      "Najekonomičnije pakovanje tečnosti za vjetrobran",
      "Za autopraonice, servise i firme s više vozila",
      "Čist vjetrobran i bolja vidljivost u vožnji",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/tecnost-za-vjetrobranska-stakla-blitz-5l.webp"
  },
  {
    id: "destilirana-voda-1l",
    naziv: "Destilirana voda 1 L",
    brend: "HC",
    kategorija: "auto-hemija",
    grupa: "",
    linija: "hc-destilirana-voda",
    zapremina: "1 L",
    pakovanje: "Boca",
    miris: "",
    namjena: "Akumulatori, pegle na paru i druge namjene gdje treba voda bez minerala",
    kratakOpis: "Destilirana voda u boci od 1 L. Za akumulatore, pegle na paru i sve gdje treba voda bez kamenca.",
    opis: "HC destilirana voda je voda bez minerala koji stvaraju kamenac. Koristi se za dolijevanje akumulatora, za pegle na paru i druge uređaje kod kojih obična voda ostavlja naslage. Nije za piće.",
    prednosti: [
      "Voda bez minerala – ne ostavlja kamenac",
      "Za akumulatore, pegle na paru i uređaje",
      "Zgodna boca od 1 L",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/destilirana-voda-1l.webp"
  },
  {
    id: "destilirana-voda-5l",
    naziv: "Destilirana voda 5 L",
    brend: "HC",
    kategorija: "auto-hemija",
    grupa: "",
    linija: "hc-destilirana-voda",
    zapremina: "5 L",
    pakovanje: "Galon",
    miris: "",
    namjena: "Akumulatori, pegle na paru i druge namjene gdje treba voda bez minerala",
    kratakOpis: "Destilirana voda u galonu od 5 L. Za servise, radionice, autopraonice i veću potrošnju.",
    opis: "HC destilirana voda u galonu od 5 L namijenjena je servisima, radionicama, autopraonicama i domaćinstvima s većom potrošnjom. Voda je bez minerala koji stvaraju kamenac, pa je pogodna za akumulatore, pegle na paru i druge uređaje. Nije za piće.",
    prednosti: [
      "Voda bez minerala – ne ostavlja kamenac",
      "Ekonomično pakovanje za servise i radionice",
      "Za akumulatore, pegle na paru i uređaje",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    slika: "slike/proizvodi/destilirana-voda-5l.webp"
  }

];
