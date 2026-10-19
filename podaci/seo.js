/* ==========================================================================
   SEO – naslovi i opisi za Google (title i meta description)
   --------------------------------------------------------------------------
   naslov – do 60 znakova, prikazuje se kao plavi naslov u Googleu.
            " | Herti Company" se dodaje sam, ne pišite ga.
   opis   – 140–160 znakova, prikazuje se ispod naslova u Googleu.
   Ključne riječi su u SEO/kljucne-rijeci.md.

   Ako novi proizvod ovdje nema svoj red, naslov i opis se naprave sami
   od naziva i kratkog opisa proizvoda. Nakon izmjene pokrenite:
   node alati/generisi-stranice.js
   ========================================================================== */

window.SEO = {
  stranice: {
    pocetna: {
      naslov: "Proizvođač kućne hemije i sapuna, Kiseljak",
      opis: "Herti Company (ranije EXON) iz Kiseljaka proizvodi deterdžente, tečne sapune, šampone i auto hemiju. Prodaja na veliko i malo, dostava. Zatražite ponudu."
    },
    proizvodi: {
      naslov: "Katalog: kućna hemija, sapuni i auto hemija",
      opis: "Svih 30 proizvoda iz naše fabrike u Kiseljaku: deterdženti za posuđe i veš, tečni sapuni, šamponi i auto hemija, od 500 ml do 5 L. Zatražite ponudu."
    },
    "o-nama": {
      naslov: "O nama: fabrika u Kiseljaku, ranije EXON",
      opis: "Herti Company je fabrika kućne hemije, sapuna i auto hemije u Kiseljaku, ranije poznata kao EXON. Isti proizvodi, novo ime. Upoznajte nas i pošaljite upit."
    },
    kontakt: {
      naslov: "Kontakt i upit za ponudu, Kiseljak",
      opis: "Pozovite 060 312 1040 ili pošaljite upit za ponudu. Herti Company, Ljetovik br. 1, 71250 Kiseljak. Prodaja na veliko i malo, bez minimalne narudžbe."
    },
    privatnost: {
      naslov: "Politika privatnosti",
      opis: "Kako Herti Company koristi podatke iz obrasca za upit: samo za odgovor, ponudu i dostavu. Podatke ne prodajemo i ne dajemo za reklame. Vaša prava i kontakt."
    },
    "404": {
      naslov: "Stranica nije pronađena",
      opis: "Stranica nije pronađena. Pogledajte sve proizvode Herti Company ili nas pozovite na 060 312 1040."
    }
  },

  kategorije: {
    "kucna-hemija": {
      naslov: "Kućna hemija na veliko: deterdženti",
      opis: "Deterdžent za posuđe (suđe) i veš, sredstvo za podove i tečnost za staklo, od 500 ml do galona od 5 L. Proizvođač iz Kiseljaka. Zatražite ponudu."
    },
    "licna-higijena": {
      naslov: "Tečni sapun 5 L i šamponi na veliko",
      opis: "Tečni (tekući) sapun Exline u četiri mirisa i Butterfly šamponi, od bočice s pumpicom do galona od 5 L za dozatore. Domaći proizvođač. Zatražite ponudu."
    },
    "auto-hemija": {
      naslov: "Auto hemija na veliko: Blitz, HC",
      opis: "Tečnost za vjetrobran Blitz, destilirana voda, autošampon s voskom, sjaj za gume i sredstvo za motor. Za autopraonice, servise i vozače. Zatražite ponudu."
    }
  },

  proizvodi: {
    "deterdzent-za-posude-limun-500ml": {
      naslov: "Deterdžent za posuđe Limun 500 ml – Exall",
      opis: "Exall deterdžent za posuđe (suđe) s mirisom limuna, boca od 500 ml. Skida masnoću i ostatke hrane. Domaći proizvođač iz Kiseljaka. Zatražite ponudu."
    },
    "deterdzent-za-posude-limun-1000ml": {
      naslov: "Deterdžent za posuđe Limun 1 L – Exall",
      opis: "Exall Limun u boci od 1000 ml: deterdžent za ručno pranje posuđa (suđa) za domaćinstva i lokale. Proizvođač iz Kiseljaka, i na veliko. Zatražite ponudu."
    },
    "deterdzent-za-posude-limun-5l": {
      naslov: "Deterdžent za posuđe 5 L Limun – Exall",
      opis: "Exall Limun u galonu od 5 L: deterdžent za suđe za restorane, kantine i urede, i za dopunjavanje boca. Veleprodaja iz fabrike u Kiseljaku. Zatražite ponudu."
    },
    "deterdzent-za-posude-jabuka-500ml": {
      naslov: "Deterdžent za posuđe Jabuka 500 ml – Exall",
      opis: "Exall deterdžent za posuđe (suđe) s mirisom jabuke, boca od 500 ml. Skida masnoću i ostavlja svjež miris. Proizvođač iz Kiseljaka. Zatražite ponudu."
    },
    "deterdzent-za-posude-jabuka-1000ml": {
      naslov: "Deterdžent za posuđe Jabuka 1 L – Exall",
      opis: "Exall Jabuka u boci od 1000 ml: deterdžent za ručno pranje posuđa (suđa) za kuću, kafiće i urede. Domaća proizvodnja, prodaja i na veliko. Zatražite ponudu."
    },
    "deterdzent-za-posude-jabuka-5l": {
      naslov: "Deterdžent za posuđe 5 L Jabuka – Exall",
      opis: "Exall Jabuka u galonu od 5 L: deterdžent za suđe za restorane, kafiće i kantine, i za dopunjavanje boca. Veleprodaja iz fabrike u Kiseljaku. Zatražite ponudu."
    },
    "deterdzent-za-ves-ultra-sauber-5l": {
      naslov: "Tečni deterdžent za veš 5 L – Gut Waschen",
      opis: "Gut Waschen Ultra Sauber, tečni (tekući) deterdžent za veš u galonu od 5 L. Za porodice, perionice, hotele i firme. Proizvođač iz BiH. Zatražite ponudu."
    },
    "deterdzent-za-ves-universal-gel-3l": {
      naslov: "Deterdžent za veš, gel 3 L – Gut Waschen",
      opis: "Gut Waschen Universal Gel, tečni deterdžent za veš (rublje) u pakovanju od 3 L, za svakodnevno pranje. Domaći proizvođač iz Kiseljaka. Zatražite ponudu."
    },
    "sredstvo-za-podove-1000ml": {
      naslov: "Sredstvo za pranje podova 1 L – Gut Waschen",
      opis: "Gut Waschen sredstvo za podove, 1000 ml, razrjeđuje se u vodi. Za čiste i svježe podove u kući, uredu i lokalu. Proizvođač iz Kiseljaka. Zatražite ponudu."
    },
    "univerzalno-sredstvo-za-ciscenje-limun-750ml": {
      naslov: "Univerzalno sredstvo za čišćenje EXO 750 ml",
      opis: "EXO univerzalno sredstvo za čišćenje s mirisom limuna, 750 ml. Jedna boca za više površina u kući i poslovnom prostoru. Domaći proizvođač. Zatražite ponudu."
    },
    "tecnost-za-pranje-stakla-750ml": {
      naslov: "Tečnost za pranje stakla 750 ml – Blitz",
      opis: "Blitz tečnost (tekućina) za staklo, 750 ml: za prozore, ogledala, staklena vrata i vitrine u kući, uredu i trgovini. Proizvođač iz BiH. Zatražite ponudu."
    },
    "tecni-sapun-aloe-vera-500ml": {
      naslov: "Tečni sapun Aloe Vera 500 ml s pumpicom",
      opis: "Exline tečni (tekući) sapun za ruke Aloe Vera u bočici s pumpicom od 500 ml, za kupatilo, kuhinju i lokal. Domaći proizvođač iz Kiseljaka. Zatražite ponudu."
    },
    "tecni-sapun-aloe-vera-1000ml": {
      naslov: "Tečni sapun Aloe Vera 1 L – Exline",
      opis: "Exline tečni (tekući) sapun Aloe Vera u boci od 1000 ml, za dopunjavanje bočica s pumpicom. Proizvođač iz Kiseljaka, prodaja i na veliko. Zatražite ponudu."
    },
    "tecni-sapun-aloe-vera-5l": {
      naslov: "Tečni sapun 5 L Aloe Vera za dozatore",
      opis: "Exline tečni (tekući) sapun Aloe Vera u galonu od 5 L, za firme, škole, ordinacije i restorane i punjenje dozatora. Veleprodaja iz Kiseljaka. Zatražite ponudu."
    },
    "tecni-sapun-jorgovan-500ml": {
      naslov: "Tečni sapun Jorgovan 500 ml s pumpicom",
      opis: "Exline tečni (tekući) sapun za ruke s cvjetnim mirisom jorgovana, bočica s pumpicom od 500 ml. Domaći proizvođač iz Kiseljaka, i na veliko. Zatražite ponudu."
    },
    "tecni-sapun-jorgovan-1000ml": {
      naslov: "Tečni sapun Jorgovan 1 L – Exline",
      opis: "Exline tečni (tekući) sapun Jorgovan u boci od 1000 ml, za dopunjavanje bočica s pumpicom. Proizvođač iz Kiseljaka, prodaja na veliko i malo. Zatražite ponudu."
    },
    "tecni-sapun-magnolija-500ml": {
      naslov: "Tečni sapun Magnolija 500 ml s pumpicom",
      opis: "Exline tečni (tekući) sapun za ruke s mirisom magnolije, bočica s pumpicom od 500 ml. Domaći proizvođač iz Kiseljaka, prodaja i na veliko. Zatražite ponudu."
    },
    "tecni-sapun-magnolija-1000ml": {
      naslov: "Tečni sapun Magnolija 1 L – Exline",
      opis: "Exline tečni (tekući) sapun Magnolija u boci od 1000 ml, za dopunjavanje bočica s pumpicom. Proizvođač iz Kiseljaka, prodaja na veliko i malo. Zatražite ponudu."
    },
    "tecni-sapun-silky-rose-5l": {
      naslov: "Tečni sapun 5 L ruža za dozatore – Exline",
      opis: "Exline Silky Rose, tečni (tekući) sapun s mirisom ruže u galonu od 5 L, za firme, hotele i ugostiteljstvo i punjenje dozatora. Veleprodaja. Zatražite ponudu."
    },
    "sampon-kamilica-1000ml": {
      naslov: "Šampon za kosu kamilica 1 L – Butterfly",
      opis: "Butterfly šampon za kosu s kamilicom u velikoj porodičnoj boci od 1000 ml. Domaći proizvođač iz Kiseljaka, prodaja na veliko i malo. Zatražite ponudu."
    },
    "sampon-kopriva-1000ml": {
      naslov: "Šampon za kosu kopriva 1 L – Butterfly",
      opis: "Butterfly šampon za kosu s koprivom u velikoj porodičnoj boci od 1000 ml. Domaći proizvođač iz Kiseljaka, prodaja na veliko i malo. Zatražite ponudu."
    },
    "sredstvo-za-ciscenje-motora-750ml": {
      naslov: "Sredstvo za čišćenje motora 750 ml – HC",
      opis: "HC sredstvo za čišćenje (pranje) motora i motornog prostora od masnoće, ulja i prljavštine s ceste, 750 ml. Za servise, praonice i vozače. Zatražite ponudu."
    },
    "sjaj-za-gume-gumax-750ml": {
      naslov: "Sjaj za gume GuMax 750 ml – HC",
      opis: "HC GuMax sjaj za gume, 750 ml: gumama daje tamnu, uredno njegovanu boju nakon pranja vozila. Za autopraonice, servise i vozače. Zatražite ponudu."
    },
    "sredstvo-za-ciscenje-koznih-sjedista-750ml": {
      naslov: "Sredstvo za čišćenje kožnih sjedišta – HC",
      opis: "HC sredstvo za čišćenje kožnih sjedišta i kožnih dijelova unutrašnjosti vozila, 750 ml. Za autopraonice, servise i vozače. Domaći proizvođač. Zatražite ponudu."
    },
    "autosampon-sa-voskom-1000ml": {
      naslov: "Autošampon s voskom 1 L – HC",
      opis: "HC autošampon (auto šampon) s voskom, 1000 ml, za ručno pranje vozila: pere i istovremeno daje sjaj laku. Za autopraonice i vozače. Zatražite ponudu."
    },
    "tecnost-za-vjetrobranska-stakla-blitz-1l": {
      naslov: "Tečnost za vjetrobran Blitz 1 L",
      opis: "Blitz tečnost (tekućina) za vjetrobransko staklo u boci od 1 L, za čisto staklo i bolju vidljivost u vožnji. Domaći proizvođač iz BiH. Zatražite ponudu."
    },
    "tecnost-za-vjetrobranska-stakla-blitz-3l": {
      naslov: "Tečnost za vjetrobran Blitz 3 L",
      opis: "Blitz tečnost (tekućina) za vjetrobran i brisače u galonu od 3 L, dovoljno za više punjenja. Za vozače koji puno putuju. Domaći proizvođač. Zatražite ponudu."
    },
    "tecnost-za-vjetrobranska-stakla-blitz-5l": {
      naslov: "Tečnost za vjetrobran Blitz 5 L na veliko",
      opis: "Blitz tečnost (tekućina) za vjetrobran i brisače u galonu od 5 L, za autopraonice, servise, flote vozila i česta putovanja. Veleprodaja. Zatražite ponudu."
    },
    "destilirana-voda-1l": {
      naslov: "Destilirana voda 1 L za akumulator i peglu",
      opis: "HC destilirana (destilovana) voda u boci od 1 L, za akumulatore, pegle na paru i sve gdje treba voda bez kamenca. Domaći proizvođač iz BiH. Zatražite ponudu."
    },
    "destilirana-voda-5l": {
      naslov: "Destilirana voda 5 L na veliko – HC",
      opis: "HC destilirana (destilovana) voda u galonu od 5 L, za servise, radionice, autopraonice i veću potrošnju: akumulatori, pegle na paru. Zatražite ponudu."
    }
  }
};
