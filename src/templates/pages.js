"use strict";
// Main content of the generated pages: catalogue, category, product and 404.

module.exports = function pages(site, ui) {
  const { company, categories, products, hc } = site;
  const { escapeHtml: esc, url, icons, productCount, groupProducts } = hc;
  const { phoneHref, productImage, productGrid, breadcrumbs, categoryCards, ctaBanner, inquirySection } = ui;
  const findCategory = id => categories.find(c => c.id === id);

  function catalog() {
    const filters = '<div class="filters" role="group" aria-label="Prikaži kategoriju"><button type="button" data-filter="" aria-pressed="true">Sve kategorije</button>' +
      categories.map(c => `<button type="button" data-filter="${c.id}" aria-pressed="false">${esc(c.name)}</button>`).join("") + "</div>";
    const sections = categories.map(c => {
      const inCategory = products.filter(p => p.category === c.id);
      if (!inCategory.length) return "";
      return `<section class="category-section" data-category="${c.id}" aria-labelledby="heading-${c.id}">` +
        `<div class="group-head"><h2 id="heading-${c.id}"><a href="${url.category(c)}" class="link-plain">${esc(c.name)}</a></h2><span class="count">${productCount(inCategory.length)}</span></div>` +
        groupProducts(inCategory).map(g => '<div class="group-block">' +
          (g.name ? `<div class="group-head group-head-sub"><h3>${esc(g.name)}</h3></div>` : "") +
          productGrid(g.products, g.name ? "h4" : "h3") + "</div>").join("") +
        "</section>";
    }).join("");
    return '<div class="wrap">' + breadcrumbs([{ name: "Početna", href: "/" }, { name: "Svi proizvodi" }]) +
      `<div class="pt-24"><h1>Svi proizvodi</h1><p class="lead">${productCount(products.length)} iz naše fabrike u Kiseljaku, poredano po kategorijama. Upišite šta tražite ili izaberite kategoriju.</p></div>` +
      '<div class="catalog-tools">' +
      `<form class="search" role="search" id="search-form" action="${url.products}" method="get"><label><span class="visually-hidden">Pretražite proizvode</span>${icons.search.replace("<svg", '<svg class="search-icon"')}` +
      '<input id="pretraga" name="q" type="search" placeholder="Npr. sapun, staklo, 5 L, Exall" autocomplete="off"></label></form>' +
      filters + `<p class="results-info" aria-live="polite">Prikazano svih ${products.length} proizvoda</p></div>` +
      '<div id="product-list">' + sections +
      '<div class="empty-state" id="no-results" hidden><h2>Nismo pronašli „<span id="no-results-term"></span>“</h2>' +
      "<p>Provjerite kako je riječ napisana ili pokušajte kraći pojam, npr. „sapun“ ili „5 L“. Možete nas i pozvati, rado ćemo pomoći.</p>" +
      `<div class="btn-group"><button type="button" class="btn btn-primary" id="clear-search">Prikažite sve proizvode</button><a class="btn btn-outline" href="${phoneHref}">${icons.phone}Pozovite ${esc(company.phone)}</a></div></div>` +
      "</div></div>";
  }

  function category(c) {
    const inCategory = products.filter(p => p.category === c.id);
    const others = categories.filter(x => x.id !== c.id);
    return `<div class="category-hero" data-category="${c.id}"><div class="wrap">` +
      breadcrumbs([{ name: "Početna", href: "/" }, { name: "Proizvodi", href: url.products }, { name: c.name }]) +
      `<div><div><h1>${esc(c.title)}</h1><p class="lead">${esc(c.intro)}</p>` +
      `<p><strong>${productCount(inCategory.length)}</strong>. Bez minimalne narudžbe, s dostavom.</p></div>${icons[c.id]}</div></div></div>` +
      '<div class="wrap">' +
      groupProducts(inCategory).map(g =>
        (g.name ? `<div class="group-head"><h2>${esc(g.name)}</h2><span>${productCount(g.products.length)}</span></div>` : '<div class="h-36"></div>') +
        productGrid(g.products, g.name ? "h3" : "h2")).join("") +
      "</div>" +
      '<section class="block tinted mt-72"><div class="wrap tips"><div><h2>Koje pakovanje izabrati?</h2><p class="muted">Kratak savjet za domaćinstva, trgovine i firme.</p></div><ul>' +
      c.tips.map(t => `<li>${esc(t)}</li>`).join("") + "</ul></div></section>" +
      `<section class="block"><div class="wrap"><div class="section-head"><h2>Pogledajte i druge kategorije</h2></div><div class="related-grid category-grid">${categoryCards(others)}</div></div></section>` +
      `<div class="wrap">${ctaBanner()}</div>`;
  }

  // Other products from the same category: same group first, one size per product line, at most four
  function relatedProducts(p) {
    const sameGroup = products.filter(x => x.category === p.category && x.line !== p.line && (!p.group || x.group === p.group));
    const rest = products.filter(x => x.category === p.category && x.line !== p.line && !sameGroup.includes(x));
    const seenLines = new Set();
    return sameGroup.concat(rest).filter(x => !seenLines.has(x.line) && seenLines.add(x.line)).slice(0, 4);
  }

  function product(p) {
    const c = findCategory(p.category);
    const sizes = products.filter(x => x.line && x.line === p.line);
    const related = relatedProducts(p);
    const specs = [
      ["Brend", p.brand], ["Kategorija", c.name], ["Grupa", p.group], ["Zapremina", p.volume],
      ["Pakovanje", p.packaging], ["Miris", p.scent], ["Namjena", p.purpose], ["Proizvođač", company.name + ", " + company.city]
    ].filter(row => row[1]);
    const mailto = `mailto:${company.email}?subject=${encodeURIComponent("Upit: " + p.name)}`;
    const sizeList = sizes.length > 1
      ? '<div class="sizes"><h2>Dostupna pakovanja</h2><ul>' + sizes.map(x => "<li>" + (x.id === p.id
        ? `<span aria-current="true">${esc(x.volume)}</span>`
        : `<a href="${url.product(x)}">${esc(x.volume)}</a>`) + "</li>").join("") + "</ul></div>"
      : `<div class="sizes"><h2>Pakovanje</h2><ul><li><span aria-current="true">${esc(p.volume)}</span></li></ul></div>`;

    return '<div class="wrap">' +
      breadcrumbs([{ name: "Početna", href: "/" }, { name: "Proizvodi", href: url.products }, { name: c.name, href: url.category(c) }, { name: p.name }]) +
      '<div class="product-hero">' + productImage(p, { priority: true, large: true }) +
      "<div>" +
      `<div class="product-brand"><span>${esc(p.brand)}</span><span aria-hidden="true">/</span><a href="${url.category(c)}">${esc(c.name)}</a></div>` +
      `<h1>${esc(p.name)}</h1><p class="lead">${esc(p.shortDescription)}</p>` +
      sizeList +
      '<div class="product-actions"><a class="btn btn-primary btn-lg" href="#upit">Zatraži ponudu</a>' +
      `<div class="product-actions-row"><a class="btn btn-outline" href="${phoneHref}">${icons.phone}Pozovite</a>` +
      `<a class="btn btn-subtle" href="${esc(mailto)}">${icons.mail}Pošaljite e-mail</a></div></div>` +
      '<p class="note">Bez minimalne narudžbe. Dostava postoji, uslove dogovaramo uz ponudu.</p>' +
      "</div></div></div>" +

      `<section class="block tinted"><div class="wrap product-details"><div><h2>O proizvodu</h2><p>${esc(p.description)}</p>` +
      '<h3 class="mt-28">Zašto ga kupci biraju</h3><ul class="check-list">' +
      p.benefits.map(b => `<li>${icons.check}<span>${esc(b)}</span></li>`).join("") + "</ul>" +
      '<p class="note mt-22">Prije upotrebe pročitajte uputstvo na etiketi. Čuvati van domašaja djece.</p></div>' +
      '<div><table class="spec-table"><caption>Specifikacija</caption><tbody>' +
      specs.map(([label, value]) => `<tr><th scope="row">${esc(label)}</th><td>${esc(value)}</td></tr>`).join("") +
      "</tbody></table>" +
      '<div class="b2b-box"><h3>Kupujete za trgovinu ili firmu?</h3>' +
      "<p>Nema minimalne narudžbe, robu dostavljamo, a na upit odgovaramo u najkraćem roku.</p>" +
      '<a class="btn btn-primary" href="#upit">Zatraži ponudu</a></div></div></div></section>' +

      '<section class="block" id="upit"><div class="wrap">' +
      inquirySection("Zatražite ponudu za ovaj proizvod", "Proizvod je već upisan. Dodajte količinu i svoj broj telefona, a mi Vam šaljemo cijenu i uslove dostave u najkraćem roku.") +
      "</div></section>" +

      (related.length
        ? `<section class="block tinted"><div class="wrap"><div class="section-head"><h2>Iz iste kategorije</h2><a class="btn btn-outline" href="${url.category(c)}">Sva ${esc(c.name.toLowerCase())}</a></div>${productGrid(related)}</div></section>`
        : "");
  }

  const notFound = () =>
    '<div class="wrap not-found"><p class="not-found-code" aria-hidden="true">404</p><h1>Stranica nije pronađena</h1>' +
    '<p class="lead">Moguće je da je adresa pogrešno upisana ili da je proizvod u međuvremenu promijenjen. Svi proizvodi su na jednom mjestu.</p>' +
    `<div class="btn-group"><a class="btn btn-primary btn-lg" href="${url.products}">Pogledajte sve proizvode</a><a class="btn btn-outline btn-lg" href="${phoneHref}">${icons.phone}Pozovite nas</a></div></div>`;

  return { catalog, category, product, notFound };
};
