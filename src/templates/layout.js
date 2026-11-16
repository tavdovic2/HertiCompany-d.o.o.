"use strict";
// Page shell: <head> assets, header, footer and the full HTML document.

const FONTS = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Poppins:wght@600;700&family=Montserrat:wght@800&display=swap";

const NAV = [
  { id: "home", name: "Početna", href: "home" },
  { id: "products", name: "Proizvodi", href: "products" },
  { id: "about", name: "O nama", href: "about" },
  { id: "contact", name: "Kontakt", href: "contact" }
];

module.exports = function layout(site, ui) {
  const { company, categories, hc, asset } = site;
  const { escapeHtml: esc, url, icons } = hc;
  const { phoneHref } = ui;
  const logo = `<img src="${url.image("logo-small.webp")}" alt="" width="52" height="52">`;
  const brand = (attrs = "") => `<a class="brand" href="/"${attrs}>${logo}<span>${esc(company.name)}</span></a>`;

  // Fonts load as media="print" so they never block rendering; theme.js switches them to "all"
  // (the CSP forbids onload="" attributes). theme.js runs before the stylesheet to avoid a flash of the wrong theme.
  const headAssets = () => [
    '<meta name="theme-color" content="#ffffff">',
    `<link rel="icon" type="image/png" href="${url.image("favicon.png")}">`,
    `<link rel="apple-touch-icon" href="${url.image("apple-touch-icon.png")}">`,
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    `<link rel="stylesheet" href="${FONTS}" media="print" data-fonts>`,
    `<noscript><link rel="stylesheet" href="${FONTS}"></noscript>`,
    `<script src="${asset("js/theme.js")}"></script>`,
    `<link rel="stylesheet" href="${asset("css/main.css")}">`
  ].join("\n");

  const scripts = list => list.map(file => `<script src="${asset(file)}" defer></script>`).join("\n");

  function header(active) {
    const links = NAV.map(n => `<a href="${url[n.href]}"${n.id === active ? ' aria-current="page"' : ""}>${n.name}</a>`).join("");
    return '<a class="skip-link" href="#content">Preskočite na sadržaj</a>\n' +
      '<header class="site-header"><div class="wrap">' +
      brand(` aria-label="${esc(company.name)} – početna stranica"`) +
      '<nav class="site-nav" id="site-nav" aria-label="Glavni meni">' + links +
      `<a class="btn btn-primary" href="${phoneHref}">${icons.phone}Pozovite ${esc(company.phone)}</a></nav>` +
      // main.js sets the icon and label to match the active theme
      `<button class="icon-btn theme-toggle" type="button" aria-label="Uključite tamnu temu" title="Uključite tamnu temu">${icons.moon}</button>` +
      `<a class="icon-btn" href="${url.products}#pretraga" aria-label="Pretražite proizvode">${icons.search}</a>` +
      `<a class="btn btn-primary btn-call" href="${phoneHref}">${icons.phone}${esc(company.phone)}</a>` +
      `<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="icon">${icons.menu}</span><span>Meni</span></button>` +
      "</div></header>";
  }

  function footer(page) {
    const legal = [`© ${site.year} ${esc(company.name)}. Sva prava zadržana.`];
    if (company.idNumber) legal.push("ID broj: " + esc(company.idNumber));
    if (company.vatNumber) legal.push("PDV broj: " + esc(company.vatNumber));
    legal.push(`<a href="${url.privacy}">Politika privatnosti</a>`);
    const inquiryHref = page === "product" ? "#upit" : url.contact + "#upit";
    return '<footer class="site-footer"><div class="wrap">' +
      `<div>${brand()}<p>Deterdženti, sapuni, šamponi i auto hemija iz naše fabrike u Kiseljaku. Bez minimalne narudžbe, s dostavom.</p></div>` +
      "<div><h2>Proizvodi</h2><ul>" +
      categories.map(c => `<li><a href="${url.category(c)}">${esc(c.name)}</a></li>`).join("") +
      `<li><a href="${url.products}">Svi proizvodi</a></li></ul></div>` +
      `<div><h2>Firma</h2><ul><li><a href="${url.about}">O nama</a></li><li><a href="${url.contact}">Kontakt</a></li><li><a href="${url.contact}#pitanja">Česta pitanja</a></li><li><a href="${url.privacy}">Politika privatnosti</a></li></ul></div>` +
      "<div><h2>Kontakt</h2><ul>" +
      `<li><a href="${phoneHref}"><strong>${esc(company.phone)}</strong></a></li>` +
      `<li><a href="mailto:${esc(company.email)}">${esc(company.email)}</a></li>` +
      `<li>${esc(company.address)}, ${esc(company.postalCode ? company.postalCode + " " : "")}${esc(company.city)}</li>` +
      (company.openingHours ? `<li>${esc(company.openingHours)}</li>` : "") +
      "</ul></div>" +
      '<div class="legal">' + legal.map(x => `<span>${x}</span>`).join("") + "</div>" +
      "</div></footer>\n" +
      '<div class="mobile-bar" role="navigation" aria-label="Brze akcije">' +
      `<a class="btn btn-outline" href="${phoneHref}">${icons.phone}Pozovite</a>` +
      `<a class="btn btn-primary" href="${inquiryHref}">Zatraži ponudu</a></div>`;
  }

  // o: { page, nav, head, main, scripts }
  const document = o =>
    "<!doctype html>\n" +
    '<html lang="bs">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    o.head + "\n" + headAssets() + "\n</head>\n" +
    `<body data-page="${o.page}">\n` +
    header(o.nav) + "\n" +
    '<main id="content">\n' + o.main + "\n</main>\n" +
    footer(o.page) + "\n" +
    scripts(o.scripts) + "\n" +
    "</body>\n</html>\n";

  // Legacy ?id= URLs: Cloudflare redirects cannot match query strings, so legacy-redirect.js resolves them.
  // The map is a non-executable JSON block, which the CSP allows.
  const redirectPage = (map, base) =>
    '<!doctype html>\n<html lang="bs">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    `<title>Preusmjeravanje | ${esc(company.name)}</title>\n<link rel="canonical" href="${base}${url.products}">\n` +
    `<script type="application/json" id="redirect-map" data-base="${base}">${JSON.stringify(map).replace(/</g, "\\u003c")}</script>\n` +
    `<script src="${asset("js/legacy-redirect.js")}"></script>\n<noscript><meta http-equiv="refresh" content="0; url=${url.products}"></noscript>\n</head>\n` +
    `<body>\n<p>Stranica je premještena. <a href="${url.products}">Pogledajte sve proizvode</a>.</p>\n</body>\n</html>\n`;

  return { document, redirectPage };
};
