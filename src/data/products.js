// Product catalogue, listed in display order.
// The id is part of the public URL (/proizvodi/<category>/<id>/) and must not change.
// Products sharing a `line` are the same product in different sizes.
// `image` is a file name in src/assets/images/products/ (empty shows a drawn bottle).
"use strict";

module.exports = [
  // kucna-hemija
  {
    id: "deterdzent-za-posude-limun-500ml",
    name: "Deterdžent za posuđe Limun 500 ml",
    brand: "Exall",
    category: "kucna-hemija",
    group: "Pranje posuđa",
    line: "exall-limun",
    volume: "500 ml",
    packaging: "Boca",
    scent: "Limun",
    purpose: "Ručno pranje posuđa, čaša i pribora za jelo",
    shortDescription: "Deterdžent za ručno pranje posuđa s mirisom limuna. Skida masnoću i ostatke hrane i ostavlja svjež miris u kuhinji.",
    description: "Exall Limun je deterdžent za svakodnevno ručno pranje posuđa. Pomaže da tanjiri, čaše, šerpe i pribor za jelo budu čisti i bez masnoće, a nakon ispiranja u kuhinji ostaje svjež miris limuna. Boca od 500 ml je praktična za svaku kuhinju i lako se drži u ruci.",
    benefits: [
      "Čisto posuđe bez masnoće – za tanjire, čaše, šerpe i pribor",
      "Svjež miris limuna u kuhinji",
      "Praktična boca od 500 ml za svako domaćinstvo",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "deterdzent-za-posude-limun-500ml.webp"
  },
  {
    id: "deterdzent-za-posude-limun-1000ml",
    name: "Deterdžent za posuđe Limun 1000 ml",
    brand: "Exall",
    category: "kucna-hemija",
    group: "Pranje posuđa",
    line: "exall-limun",
    volume: "1000 ml",
    packaging: "Boca",
    scent: "Limun",
    purpose: "Ručno pranje posuđa, čaša i pribora za jelo",
    shortDescription: "Veće pakovanje deterdženta za posuđe s mirisom limuna. Za domaćinstva koja često peru posuđe.",
    description: "Exall Limun u boci od 1000 ml je deterdžent za ručno pranje posuđa za domaćinstva u kojima se kuha svaki dan. Pomaže da posuđe bude čisto i bez masnoće, a u kuhinji ostaje svjež miris limuna. Veća boca znači rjeđu kupovinu i ekonomičnije korištenje.",
    benefits: [
      "Čisto posuđe bez masnoće za svakodnevno pranje",
      "Svjež miris limuna",
      "Veća boca – rjeđa kupovina i ekonomičnije korištenje",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "deterdzent-za-posude-limun-1000ml.webp"
  },
  {
    id: "deterdzent-za-posude-limun-5l",
    name: "Deterdžent za posuđe Limun 5 L",
    brand: "Exall",
    category: "kucna-hemija",
    group: "Pranje posuđa",
    line: "exall-limun",
    volume: "5 L",
    packaging: "Galon",
    scent: "Limun",
    purpose: "Ručno pranje posuđa u ugostiteljstvu, kantinama i uredima",
    shortDescription: "Galon deterdženta za posuđe s mirisom limuna. Za restorane, kantine, urede i dopunjavanje manjih boca.",
    description: "Exall Limun u galonu od 5 L je deterdžent za ručno pranje posuđa namijenjen mjestima gdje se posuđe pere cijeli dan: restoranima, kafićima, kantinama, vrtićima i uredima. Iz galona se lako dopunjavaju manje boce, pa je ovo najekonomičnije pakovanje Exall deterdženta.",
    benefits: [
      "Najekonomičnije pakovanje za veliku potrošnju",
      "Za restorane, kafiće, kantine, vrtiće i urede",
      "Lako dopunjavanje manjih boca",
      "Svjež miris limuna"
    ],
    image: "deterdzent-za-posude-limun-5l.webp"
  },
  {
    id: "deterdzent-za-posude-jabuka-500ml",
    name: "Deterdžent za posuđe Jabuka 500 ml",
    brand: "Exall",
    category: "kucna-hemija",
    group: "Pranje posuđa",
    line: "exall-jabuka",
    volume: "500 ml",
    packaging: "Boca",
    scent: "Jabuka",
    purpose: "Ručno pranje posuđa, čaša i pribora za jelo",
    shortDescription: "Deterdžent za ručno pranje posuđa s mirisom jabuke. Skida masnoću i ostavlja ugodan, svjež miris.",
    description: "Exall Jabuka je deterdžent za svakodnevno ručno pranje posuđa za one koji vole blaži, voćni miris. Pomaže da tanjiri, čaše, šerpe i pribor za jelo budu čisti i bez masnoće. Boca od 500 ml je praktična za svaku kuhinju.",
    benefits: [
      "Čisto posuđe bez masnoće – za tanjire, čaše, šerpe i pribor",
      "Ugodan, voćni miris jabuke",
      "Praktična boca od 500 ml za svako domaćinstvo",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "deterdzent-za-posude-jabuka-500ml.webp"
  },
  {
    id: "deterdzent-za-posude-jabuka-1000ml",
    name: "Deterdžent za posuđe Jabuka 1000 ml",
    brand: "Exall",
    category: "kucna-hemija",
    group: "Pranje posuđa",
    line: "exall-jabuka",
    volume: "1000 ml",
    packaging: "Boca",
    scent: "Jabuka",
    purpose: "Ručno pranje posuđa, čaša i pribora za jelo",
    shortDescription: "Veće pakovanje deterdženta za posuđe s mirisom jabuke. Za domaćinstva koja često peru posuđe.",
    description: "Exall Jabuka u boci od 1000 ml je deterdžent za ručno pranje posuđa za domaćinstva u kojima se kuha svaki dan. Pomaže da posuđe bude čisto i bez masnoće, uz ugodan voćni miris jabuke. Veća boca znači rjeđu kupovinu i ekonomičnije korištenje.",
    benefits: [
      "Čisto posuđe bez masnoće za svakodnevno pranje",
      "Ugodan, voćni miris jabuke",
      "Veća boca – rjeđa kupovina i ekonomičnije korištenje",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "deterdzent-za-posude-jabuka-1000ml.webp"
  },
  {
    id: "deterdzent-za-posude-jabuka-5l",
    name: "Deterdžent za posuđe Jabuka 5 L",
    brand: "Exall",
    category: "kucna-hemija",
    group: "Pranje posuđa",
    line: "exall-jabuka",
    volume: "5 L",
    packaging: "Galon",
    scent: "Jabuka",
    purpose: "Ručno pranje posuđa u ugostiteljstvu, kantinama i uredima",
    shortDescription: "Galon deterdženta za posuđe s mirisom jabuke. Za restorane, kantine, urede i dopunjavanje manjih boca.",
    description: "Exall Jabuka u galonu od 5 L je deterdžent za ručno pranje posuđa namijenjen mjestima s velikom potrošnjom: restoranima, kafićima, kantinama, vrtićima i uredima. Iz galona se lako dopunjavaju manje boce, pa je ovo najekonomičnije pakovanje.",
    benefits: [
      "Najekonomičnije pakovanje za veliku potrošnju",
      "Za restorane, kafiće, kantine, vrtiće i urede",
      "Lako dopunjavanje manjih boca",
      "Ugodan, voćni miris jabuke"
    ],
    image: "deterdzent-za-posude-jabuka-5l.webp"
  },
  {
    id: "deterdzent-za-ves-ultra-sauber-5l",
    name: "Deterdžent za veš Ultra Sauber 5 L",
    brand: "Gut Waschen",
    category: "kucna-hemija",
    group: "Pranje veša",
    line: "gut-waschen-ultra-sauber",
    volume: "5 L",
    packaging: "Galon",
    scent: "",
    purpose: "Pranje veša",
    shortDescription: "Tečni deterdžent za veš u velikom pakovanju od 5 L. Za porodice, perionice i sve koji peru često.",
    description: "Gut Waschen Ultra Sauber je tečni deterdžent za pranje veša u ekonomičnom galonu od 5 L. Namijenjen je domaćinstvima s puno veša, ali i perionicama, hotelima, apartmanima i firmama. Doziranje prilagodite količini i zaprljanosti veša, prema uputstvu na etiketi.",
    benefits: [
      "Veliko pakovanje od 5 L – za mnogo pranja",
      "Za porodice, perionice, hotele i apartmane",
      "Tečni deterdžent – lako se dozira",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "deterdzent-za-ves-ultra-sauber-5l.webp"
  },
  {
    id: "deterdzent-za-ves-universal-gel-3l",
    name: "Deterdžent za veš Universal Gel 3 L",
    brand: "Gut Waschen",
    category: "kucna-hemija",
    group: "Pranje veša",
    line: "gut-waschen-universal-gel",
    volume: "3 L",
    packaging: "Galon",
    scent: "",
    purpose: "Svakodnevno pranje veša",
    shortDescription: "Gel deterdžent za svakodnevno pranje veša u pakovanju od 3 L. Univerzalan izbor za domaćinstvo.",
    description: "Gut Waschen Universal Gel je deterdžent u obliku gela za svakodnevno pranje veša. Pakovanje od 3 L je dobra sredina između male boce i velikog galona, pa odgovara većini domaćinstava. Doziranje prilagodite količini i zaprljanosti veša, prema uputstvu na etiketi.",
    benefits: [
      "Gel koji se lako dozira",
      "Univerzalan izbor za svakodnevno pranje",
      "Pakovanje od 3 L – mjera za većinu domaćinstava",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "deterdzent-za-ves-universal-gel-3l.webp"
  },
  {
    id: "sredstvo-za-podove-1000ml",
    name: "Sredstvo za podove 1000 ml",
    brand: "Gut Waschen",
    category: "kucna-hemija",
    group: "Čišćenje površina i prostora",
    line: "gut-waschen-podovi",
    volume: "1000 ml",
    packaging: "Boca",
    scent: "",
    purpose: "Pranje podova u stanu, kući i poslovnom prostoru",
    shortDescription: "Sredstvo za pranje podova koje se razrjeđuje u vodi. Za čiste i svježe podove u kući i poslovnom prostoru.",
    description: "Gut Waschen sredstvo za podove namijenjeno je redovnom pranju podova u stanu, kući, uredu ili lokalu. Dodaje se u vodu za brisanje i pomaže da podovi budu čisti i svježi. Količinu za razrjeđivanje pročitajte na etiketi.",
    benefits: [
      "Čisti i svježi podovi uz redovno brisanje",
      "Razrjeđuje se u vodi – jedna boca traje dugo",
      "Za stanove, kuće, urede i lokale",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "sredstvo-za-podove-1000ml.webp"
  },
  {
    id: "univerzalno-sredstvo-za-ciscenje-limun-750ml",
    name: "Univerzalno sredstvo za čišćenje Limun 750 ml",
    brand: "EXO",
    category: "kucna-hemija",
    group: "Čišćenje površina i prostora",
    line: "exo-univerzalno-limun",
    volume: "750 ml",
    packaging: "Boca",
    scent: "Limun",
    purpose: "Čišćenje različitih površina u kući i poslovnom prostoru",
    shortDescription: "Univerzalno sredstvo za čišćenje s mirisom limuna. Jedna boca za više površina u kući.",
    description: "EXO univerzalno sredstvo s mirisom limuna služi za svakodnevno čišćenje različitih površina: kuhinjskih radnih ploha, stolova, vrata, kupatila i drugih perivih površina. Umjesto više različitih sredstava, imate jedno koje je uvijek pri ruci. Prije prve upotrebe na osjetljivoj površini isprobajte na manje vidljivom mjestu.",
    benefits: [
      "Jedno sredstvo za više površina u kući",
      "Svjež miris limuna nakon čišćenja",
      "Za kuhinju, kupatilo, stolove i vrata",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "univerzalno-sredstvo-za-ciscenje-limun-750ml.webp"
  },
  {
    id: "tecnost-za-pranje-stakla-750ml",
    name: "Tečnost za pranje stakla 750 ml",
    brand: "Blitz",
    category: "kucna-hemija",
    group: "Čišćenje površina i prostora",
    line: "blitz-staklo",
    volume: "750 ml",
    packaging: "Boca",
    scent: "",
    purpose: "Pranje prozora, ogledala, staklenih vrata i vitrina",
    shortDescription: "Tečnost za pranje prozora, ogledala i staklenih površina. Za sjajno staklo u kući, uredu i trgovini.",
    description: "Blitz tečnost za pranje stakla namijenjena je prozorima, ogledalima, staklenim vratima, vitrinama i izlozima. Nanesite na staklo i obrišite suhom krpom ili papirnim ubrusom. Odličan izbor za domaćinstva, urede i trgovine kojima je izlog prvi utisak.",
    benefits: [
      "Sjajni prozori, ogledala i vitrine",
      "Za kuće, urede, trgovine i izloge",
      "Jednostavno: nanesite i obrišite",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "tecnost-za-pranje-stakla-750ml.webp"
  },

  // licna-higijena
  {
    id: "tecni-sapun-aloe-vera-500ml",
    name: "Tečni sapun Aloe Vera 500 ml (pumpica)",
    brand: "Exline",
    category: "licna-higijena",
    group: "Tečni sapun",
    line: "exline-aloe-vera",
    volume: "500 ml",
    packaging: "Boca s pumpicom",
    scent: "Aloe Vera",
    purpose: "Pranje ruku",
    shortDescription: "Tečni sapun za ruke Aloe Vera u bočici s pumpicom. Spreman za umivaonik u kupatilu, kuhinji ili lokalu.",
    description: "Exline Aloe Vera je tečni sapun za svakodnevno pranje ruku. Bočica od 500 ml s pumpicom stoji spremna na umivaoniku, a jednim pritiskom dobijete dovoljno sapuna za pranje. Kada se isprazni, dopunite je iz boce od 1000 ml ili galona od 5 L.",
    benefits: [
      "Spreman za upotrebu – bočica s pumpicom",
      "Ugodan miris Aloe Vera",
      "Lako se dopunjava iz većeg pakovanja",
      "Za kupatilo, kuhinju, urede i lokale"
    ],
    image: "tecni-sapun-aloe-vera-500ml.webp"
  },
  {
    id: "tecni-sapun-aloe-vera-1000ml",
    name: "Tečni sapun Aloe Vera 1000 ml",
    brand: "Exline",
    category: "licna-higijena",
    group: "Tečni sapun",
    line: "exline-aloe-vera",
    volume: "1000 ml",
    packaging: "Boca",
    scent: "Aloe Vera",
    purpose: "Pranje ruku i dopunjavanje bočica s pumpicom",
    shortDescription: "Tečni sapun Aloe Vera u boci od 1000 ml. Za dopunjavanje bočica s pumpicom.",
    description: "Exline Aloe Vera u boci od 1000 ml je tečni sapun za ruke namijenjen dopunjavanju bočica s pumpicom. Tako ne kupujete svaki put novu pumpicu, a sapun Vam je uvijek pri ruci. Odgovara domaćinstvima i manjim uredima.",
    benefits: [
      "Ekonomično dopunjavanje bočica s pumpicom",
      "Ugodan miris Aloe Vera",
      "Manje plastike – pumpicu koristite više puta",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "tecni-sapun-aloe-vera-1000ml.webp"
  },
  {
    id: "tecni-sapun-aloe-vera-5l",
    name: "Tečni sapun Aloe Vera 5 L",
    brand: "Exline",
    category: "licna-higijena",
    group: "Tečni sapun",
    line: "exline-aloe-vera",
    volume: "5 L",
    packaging: "Galon",
    scent: "Aloe Vera",
    purpose: "Pranje ruku i punjenje dozatora u firmama i ustanovama",
    shortDescription: "Galon tečnog sapuna Aloe Vera. Za firme, škole, ordinacije, restorane i punjenje dozatora.",
    description: "Exline Aloe Vera u galonu od 5 L je tečni sapun za ruke namijenjen mjestima s mnogo ljudi: firmama, školama, vrtićima, ordinacijama, restoranima i trgovačkim centrima. Iz galona se pune zidni dozatori i bočice s pumpicom. Ovo je najekonomičnije pakovanje Exline sapuna.",
    benefits: [
      "Najekonomičnije pakovanje za veliku potrošnju",
      "Za firme, škole, vrtiće, ordinacije i restorane",
      "Za punjenje zidnih dozatora i bočica",
      "Ugodan miris Aloe Vera"
    ],
    image: "tecni-sapun-aloe-vera-5l.webp"
  },
  {
    id: "tecni-sapun-jorgovan-500ml",
    name: "Tečni sapun Jorgovan 500 ml (pumpica)",
    brand: "Exline",
    category: "licna-higijena",
    group: "Tečni sapun",
    line: "exline-jorgovan",
    volume: "500 ml",
    packaging: "Boca s pumpicom",
    scent: "Jorgovan",
    purpose: "Pranje ruku",
    shortDescription: "Tečni sapun za ruke s cvjetnim mirisom jorgovana, u bočici s pumpicom.",
    description: "Exline Jorgovan je tečni sapun za svakodnevno pranje ruku s nježnim cvjetnim mirisom. Bočica od 500 ml s pumpicom stoji spremna na umivaoniku u kupatilu, kuhinji ili toaletu u lokalu. Kada se isprazni, dopunite je iz boce od 1000 ml.",
    benefits: [
      "Spreman za upotrebu – bočica s pumpicom",
      "Nježan cvjetni miris jorgovana",
      "Lako se dopunjava iz većeg pakovanja",
      "Za kupatilo, kuhinju, urede i lokale"
    ],
    image: "tecni-sapun-jorgovan-500ml.webp"
  },
  {
    id: "tecni-sapun-jorgovan-1000ml",
    name: "Tečni sapun Jorgovan 1000 ml",
    brand: "Exline",
    category: "licna-higijena",
    group: "Tečni sapun",
    line: "exline-jorgovan",
    volume: "1000 ml",
    packaging: "Boca",
    scent: "Jorgovan",
    purpose: "Pranje ruku i dopunjavanje bočica s pumpicom",
    shortDescription: "Tečni sapun Jorgovan u boci od 1000 ml. Za dopunjavanje bočica s pumpicom.",
    description: "Exline Jorgovan u boci od 1000 ml je tečni sapun za ruke s cvjetnim mirisom, namijenjen dopunjavanju bočica s pumpicom. Tako ne kupujete svaki put novu pumpicu, a sapun Vam je uvijek pri ruci.",
    benefits: [
      "Ekonomično dopunjavanje bočica s pumpicom",
      "Nježan cvjetni miris jorgovana",
      "Manje plastike – pumpicu koristite više puta",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "tecni-sapun-jorgovan-1000ml.webp"
  },
  {
    id: "tecni-sapun-magnolija-500ml",
    name: "Tečni sapun Magnolija 500 ml (pumpica)",
    brand: "Exline",
    category: "licna-higijena",
    group: "Tečni sapun",
    line: "exline-magnolija",
    volume: "500 ml",
    packaging: "Boca s pumpicom",
    scent: "Magnolija",
    purpose: "Pranje ruku",
    shortDescription: "Tečni sapun za ruke s mirisom magnolije, u bočici s pumpicom.",
    description: "Exline Magnolija je tečni sapun za svakodnevno pranje ruku s elegantnim cvjetnim mirisom. Bočica od 500 ml s pumpicom stoji spremna na umivaoniku u kupatilu, kuhinji ili lokalu. Kada se isprazni, dopunite je iz boce od 1000 ml.",
    benefits: [
      "Spreman za upotrebu – bočica s pumpicom",
      "Elegantan cvjetni miris magnolije",
      "Lako se dopunjava iz većeg pakovanja",
      "Za kupatilo, kuhinju, urede i lokale"
    ],
    image: "tecni-sapun-magnolija-500ml.webp"
  },
  {
    id: "tecni-sapun-magnolija-1000ml",
    name: "Tečni sapun Magnolija 1000 ml",
    brand: "Exline",
    category: "licna-higijena",
    group: "Tečni sapun",
    line: "exline-magnolija",
    volume: "1000 ml",
    packaging: "Boca",
    scent: "Magnolija",
    purpose: "Pranje ruku i dopunjavanje bočica s pumpicom",
    shortDescription: "Tečni sapun Magnolija u boci od 1000 ml. Za dopunjavanje bočica s pumpicom.",
    description: "Exline Magnolija u boci od 1000 ml je tečni sapun za ruke s cvjetnim mirisom magnolije, namijenjen dopunjavanju bočica s pumpicom. Tako ne kupujete svaki put novu pumpicu, a sapun Vam je uvijek pri ruci.",
    benefits: [
      "Ekonomično dopunjavanje bočica s pumpicom",
      "Elegantan cvjetni miris magnolije",
      "Manje plastike – pumpicu koristite više puta",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "tecni-sapun-magnolija-1000ml.webp"
  },
  {
    id: "tecni-sapun-silky-rose-5l",
    name: "Tečni sapun Silky Rose 5 L",
    brand: "Exline",
    category: "licna-higijena",
    group: "Tečni sapun",
    line: "exline-silky-rose",
    volume: "5 L",
    packaging: "Galon",
    scent: "Silky Rose (ruža)",
    purpose: "Pranje ruku i punjenje dozatora u firmama i ustanovama",
    shortDescription: "Galon tečnog sapuna s mirisom ruže. Za firme, ugostiteljstvo i punjenje dozatora.",
    description: "Exline Silky Rose u galonu od 5 L je tečni sapun za ruke s mirisom ruže, namijenjen mjestima s velikom potrošnjom: firmama, hotelima, restoranima, školama i ordinacijama. Iz galona se pune zidni dozatori i bočice s pumpicom.",
    benefits: [
      "Najekonomičnije pakovanje za veliku potrošnju",
      "Ugodan miris ruže za toalete i kupatila",
      "Za punjenje zidnih dozatora i bočica",
      "Za firme, hotele, restorane i škole"
    ],
    image: "tecni-sapun-silky-rose-5l.webp"
  },
  {
    id: "sampon-kamilica-1000ml",
    name: "Šampon Kamilica 1000 ml",
    brand: "Butterfly",
    category: "licna-higijena",
    group: "Šampon",
    line: "butterfly-kamilica",
    volume: "1000 ml",
    packaging: "Boca",
    scent: "Kamilica",
    purpose: "Pranje kose",
    shortDescription: "Šampon za kosu s kamilicom u velikoj porodičnoj boci od 1000 ml.",
    description: "Butterfly Kamilica je šampon za svakodnevno pranje kose s blagim, poznatim mirisom kamilice. Boca od 1000 ml traje dugo, pa je praktična za cijelu porodicu, ali i za hotele, apartmane i frizerske salone.",
    benefits: [
      "Velika porodična boca od 1000 ml",
      "Blag, poznat miris kamilice",
      "Za porodice, apartmane, hotele i salone",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "sampon-kamilica-1000ml.webp"
  },
  {
    id: "sampon-kopriva-1000ml",
    name: "Šampon Kopriva 1000 ml",
    brand: "Butterfly",
    category: "licna-higijena",
    group: "Šampon",
    line: "butterfly-kopriva",
    volume: "1000 ml",
    packaging: "Boca",
    scent: "Kopriva",
    purpose: "Pranje kose",
    shortDescription: "Šampon za kosu s koprivom u velikoj porodičnoj boci od 1000 ml.",
    description: "Butterfly Kopriva je šampon za svakodnevno pranje kose s koprivom, biljkom koja se kod nas tradicionalno veže uz njegu kose. Boca od 1000 ml traje dugo, pa je praktična za cijelu porodicu, ali i za hotele, apartmane i frizerske salone.",
    benefits: [
      "Velika porodična boca od 1000 ml",
      "Šampon s koprivom za svakodnevnu njegu kose",
      "Za porodice, apartmane, hotele i salone",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "sampon-kopriva-1000ml.webp"
  },

  // auto-hemija
  {
    id: "sredstvo-za-ciscenje-motora-750ml",
    name: "Sredstvo za čišćenje motora 750 ml",
    brand: "HC",
    category: "auto-hemija",
    group: "",
    line: "hc-motor",
    volume: "750 ml",
    packaging: "Boca",
    scent: "",
    purpose: "Čišćenje motornog prostora vozila",
    shortDescription: "Sredstvo za čišćenje motora i motornog prostora od masnoće, ulja i prljavštine s ceste.",
    description: "HC sredstvo za čišćenje motora namijenjeno je uklanjanju masnoće, ulja i nakupljene prljavštine iz motornog prostora. Čist motor lakše je pregledati, a vozilo ostavlja bolji utisak pri prodaji ili servisu. Koristite na hladnom motoru i pratite uputstvo na etiketi.",
    benefits: [
      "Uklanja masnoću, ulje i prljavštinu iz motornog prostora",
      "Čist motor – lakši pregled i bolji utisak pri prodaji",
      "Za vozače, servise i autopraonice",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "sredstvo-za-ciscenje-motora-750ml.webp"
  },
  {
    id: "sjaj-za-gume-gumax-750ml",
    name: "Sjaj za gume GuMax 750 ml",
    brand: "HC",
    category: "auto-hemija",
    group: "",
    line: "hc-gumax",
    volume: "750 ml",
    packaging: "Boca",
    scent: "",
    purpose: "Završna njega i sjaj vanjskih strana guma",
    shortDescription: "Sjaj za gume GuMax daje gumama tamnu, uredno njegovanu boju nakon pranja vozila.",
    description: "HC GuMax je sredstvo za završnu njegu guma. Nanosi se na čiste i suhe bočne strane guma i daje im tamnu, sjajnu boju, pa cijelo vozilo izgleda urednije. Ne nanosite na gazni sloj gume i kočione dijelove.",
    benefits: [
      "Tamne, sjajne gume nakon pranja",
      "Završni detalj koji cijelo vozilo čini urednijim",
      "Za vozače, autopraonice i auto salone",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "sjaj-za-gume-gumax-750ml.webp"
  },
  {
    id: "sredstvo-za-ciscenje-koznih-sjedista-750ml",
    name: "Sredstvo za čišćenje kožnih sjedišta 750 ml",
    brand: "HC",
    category: "auto-hemija",
    group: "",
    line: "hc-koza",
    volume: "750 ml",
    packaging: "Boca",
    scent: "",
    purpose: "Čišćenje kožnih sjedišta i kožnih dijelova u vozilu",
    shortDescription: "Sredstvo za čišćenje kožnih sjedišta i kožnih dijelova unutrašnjosti vozila.",
    description: "HC sredstvo za kožna sjedišta namijenjeno je čišćenju sjedišta, volana i drugih kožnih dijelova u vozilu. Pomaže da unutrašnjost bude čista i uredna. Nanesite na mekanu krpu, a ne direktno na kožu, i prije prve upotrebe isprobajte na manje vidljivom mjestu.",
    benefits: [
      "Čista i uredna kožna sjedišta i volan",
      "Za njegu unutrašnjosti vozila",
      "Za vozače, autopraonice i servise",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "sredstvo-za-ciscenje-koznih-sjedista-750ml.webp"
  },
  {
    id: "autosampon-sa-voskom-1000ml",
    name: "Autošampon sa voskom 1000 ml",
    brand: "HC",
    category: "auto-hemija",
    group: "",
    line: "hc-autosampon",
    volume: "1000 ml",
    packaging: "Boca",
    scent: "",
    purpose: "Ručno pranje vozila",
    shortDescription: "Autošampon s voskom za ručno pranje vozila. Pere i istovremeno daje sjaj laku.",
    description: "HC autošampon s voskom služi za ručno pranje automobila, kombija i motocikala. Dodaje se u kantu s vodom, a vosak u sastavu pomaže da lak nakon pranja ima ljepši sjaj. Perite u hladu i ne puštajte da se šampon osuši na vozilu.",
    benefits: [
      "Pranje i sjaj u jednom koraku",
      "Za automobile, kombije i motocikle",
      "Boca od 1000 ml za mnogo pranja",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "autosampon-sa-voskom-1000ml.webp"
  },
  {
    id: "tecnost-za-vjetrobranska-stakla-blitz-1l",
    name: "Tečnost za vjetrobranska stakla Blitz 1 L",
    brand: "HC",
    category: "auto-hemija",
    group: "",
    line: "hc-blitz-vjetrobran",
    volume: "1 L",
    packaging: "Boca",
    scent: "",
    purpose: "Punjenje posude za pranje vjetrobranskog stakla",
    shortDescription: "Tečnost za vjetrobran Blitz u boci od 1 L. Za čisto staklo i bolju vidljivost u vožnji.",
    description: "HC Blitz je tečnost kojom se puni posuda za pranje vjetrobranskog stakla. Pomaže brisačima da skinu prašinu, mušice i prljavštinu s ceste, za bolju vidljivost i sigurniju vožnju. Boca od 1 L je zgodna za prtljažnik i brzo dolijevanje.",
    benefits: [
      "Čist vjetrobran i bolja vidljivost u vožnji",
      "Zgodna boca od 1 L za prtljažnik",
      "Za vozače, benzinske pumpe i trgovine",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "tecnost-za-vjetrobranska-stakla-blitz-1l.webp"
  },
  {
    id: "tecnost-za-vjetrobranska-stakla-blitz-3l",
    name: "Tečnost za vjetrobranska stakla Blitz 3 L",
    brand: "HC",
    category: "auto-hemija",
    group: "",
    line: "hc-blitz-vjetrobran",
    volume: "3 L",
    packaging: "Galon",
    scent: "",
    purpose: "Punjenje posude za pranje vjetrobranskog stakla",
    shortDescription: "Tečnost za vjetrobran Blitz u galonu od 3 L. Dovoljno za više punjenja.",
    description: "HC Blitz u galonu od 3 L je tečnost za punjenje posude za pranje vjetrobranskog stakla. Pomaže brisačima da skinu prašinu, mušice i prljavštinu s ceste. Galon je dovoljan za više punjenja, pa je praktičan za vozače koji puno putuju.",
    benefits: [
      "Čist vjetrobran i bolja vidljivost u vožnji",
      "Galon od 3 L – dovoljno za više punjenja",
      "Za vozače, benzinske pumpe i trgovine",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "tecnost-za-vjetrobranska-stakla-blitz-3l.webp"
  },
  {
    id: "tecnost-za-vjetrobranska-stakla-blitz-5l",
    name: "Tečnost za vjetrobranska stakla Blitz 5 L",
    brand: "HC",
    category: "auto-hemija",
    group: "",
    line: "hc-blitz-vjetrobran",
    volume: "5 L",
    packaging: "Galon",
    scent: "",
    purpose: "Punjenje posude za pranje vjetrobranskog stakla",
    shortDescription: "Tečnost za vjetrobran Blitz u galonu od 5 L. Za autopraonice, servise, flote vozila i česta putovanja.",
    description: "HC Blitz u galonu od 5 L je najekonomičnije pakovanje tečnosti za punjenje posude za pranje vjetrobranskog stakla. Namijenjen je autopraonicama, servisima, firmama s više vozila i vozačima koji puno putuju.",
    benefits: [
      "Najekonomičnije pakovanje tečnosti za vjetrobran",
      "Za autopraonice, servise i firme s više vozila",
      "Čist vjetrobran i bolja vidljivost u vožnji",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "tecnost-za-vjetrobranska-stakla-blitz-5l.webp"
  },
  {
    id: "destilirana-voda-1l",
    name: "Destilirana voda 1 L",
    brand: "HC",
    category: "auto-hemija",
    group: "",
    line: "hc-destilirana-voda",
    volume: "1 L",
    packaging: "Boca",
    scent: "",
    purpose: "Akumulatori, pegle na paru i druge namjene gdje treba voda bez minerala",
    shortDescription: "Destilirana voda u boci od 1 L. Za akumulatore, pegle na paru i sve gdje treba voda bez kamenca.",
    description: "HC destilirana voda je voda bez minerala koji stvaraju kamenac. Koristi se za dolijevanje akumulatora, za pegle na paru i druge uređaje kod kojih obična voda ostavlja naslage. Nije za piće.",
    benefits: [
      "Voda bez minerala – ne ostavlja kamenac",
      "Za akumulatore, pegle na paru i uređaje",
      "Zgodna boca od 1 L",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "destilirana-voda-1l.webp"
  },
  {
    id: "destilirana-voda-5l",
    name: "Destilirana voda 5 L",
    brand: "HC",
    category: "auto-hemija",
    group: "",
    line: "hc-destilirana-voda",
    volume: "5 L",
    packaging: "Galon",
    scent: "",
    purpose: "Akumulatori, pegle na paru i druge namjene gdje treba voda bez minerala",
    shortDescription: "Destilirana voda u galonu od 5 L. Za servise, radionice, autopraonice i veću potrošnju.",
    description: "HC destilirana voda u galonu od 5 L namijenjena je servisima, radionicama, autopraonicama i domaćinstvima s većom potrošnjom. Voda je bez minerala koji stvaraju kamenac, pa je pogodna za akumulatore, pegle na paru i druge uređaje. Nije za piće.",
    benefits: [
      "Voda bez minerala – ne ostavlja kamenac",
      "Ekonomično pakovanje za servise i radionice",
      "Za akumulatore, pegle na paru i uređaje",
      "Proizvedeno u našoj fabrici u Kiseljaku"
    ],
    image: "destilirana-voda-5l.webp"
  }
];
