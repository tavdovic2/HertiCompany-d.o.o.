"use strict";
// Reusable page fragments: product cards, breadcrumbs, FAQ, call-to-action blocks.

module.exports = function components(site) {
  const { company, products, hc } = site;
  const { escapeHtml: esc, url, icons, productCount } = hc;
  const phoneHref = "tel:" + company.phoneDial;

  // Cards use the 500 px thumbnail when one exists; the 1000 px image covers sharp screens.
  function productImage(p, { priority = false, large = false } = {}) {
    let content;
    if (p.image) {
      const full = url.productImage(p.image);
      const thumb = site.hasThumb(p) ? url.productThumb(p.image) : null;
      const sizes = large ? "(max-width: 860px) 92vw, 520px" : "(max-width: 560px) 92vw, (max-width: 860px) 45vw, 260px";
      content = `<img src="${esc(thumb || full)}"` +
        (thumb ? ` srcset="${esc(thumb)} 500w, ${esc(full)} 1000w" sizes="${sizes}"` : "") +
        ` alt="${esc(p.name + " – " + p.brand)}" width="1000" height="1000"` +
        (priority ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
    } else {
      content = `<svg class="bottle" viewBox="0 0 200 262" role="img" aria-label="${esc(p.name)}">${hc.bottleSvg(p.packaging, p.brand, p.volume)}</svg>`;
    }
    return `<div class="product-image${p.image ? " has-photo" : ""}" data-category="${esc(p.category)}">${content}</div>`;
  }

  const productCard = (p, heading = "h3") =>
    `<article class="product-card" data-id="${esc(p.id)}">${productImage(p)}` +
    `<div class="product-card-body"><span class="product-card-brand">${esc(p.brand)}</span>` +
    `<${heading}><a href="${url.product(p)}">${esc(p.name)}</a></${heading}>` +
    `<div class="tags"><span class="tag">${esc(p.volume)}</span><span class="tag">${esc(p.packaging)}</span></div>` +
    `<div class="product-card-footer"><a class="btn btn-outline" href="${url.product(p)}#upit">Zatraži ponudu</a></div>` +
    "</div></article>";

  const productGrid = (list, heading) => `<div class="product-grid">${list.map(p => productCard(p, heading)).join("")}</div>`;

  // items: [{ name, href }]; the last item is the current page
  const breadcrumbs = items => '<nav class="breadcrumbs" aria-label="Gdje se nalazite"><ol>' + items.map((item, i) =>
    "<li>" + (i === items.length - 1
      ? `<span aria-current="page">${esc(item.name)}</span>`
      : `<a href="${esc(item.href)}">${esc(item.name)}</a>`) + "</li>"
  ).join("") + "</ol></nav>";

  const faq = list => '<div class="faq">' + list.map(q =>
    `<details><summary>${esc(q.question)}</summary><p>${esc(q.answer)}</p></details>`).join("") + "</div>";

  const categoryCards = list => list.map(c => {
    const count = products.filter(p => p.category === c.id).length;
    return `<a class="category-card" data-category="${c.id}" href="${url.category(c)}">${icons[c.id]}` +
      `<h3>${esc(c.name)}</h3><p>${esc(c.intro)}</p>` +
      `<div class="category-card-footer"><span>${productCount(count)}</span><span>${icons.arrow}</span></div></a>`;
  }).join("");

  const ctaBanner = () =>
    '<div class="cta-banner"><div><h2>Trebate ponudu?</h2><p>Pozovite nas ili pošaljite upit. Bez minimalne narudžbe, s dostavom.</p></div>' +
    `<div class="btn-group"><a class="btn btn-primary btn-lg" href="${phoneHref}">${icons.phone}${esc(company.phone)}</a>` +
    `<a class="btn btn-outline btn-lg" href="${url.contact}#upit">Zatraži ponudu</a></div></div>`;

  // The form itself is rendered by main.js; without JavaScript the phone and e-mail remain.
  const inquiryFormRoot = () =>
    '<div id="inquiry-form-root"><noscript><p class="inquiry-form">Obrazac za upit radi uz uključen JavaScript. ' +
    `Pozovite nas na <a href="${phoneHref}">${esc(company.phone)}</a> ili pišite na <a href="mailto:${esc(company.email)}">${esc(company.email)}</a>.</p></noscript></div>`;

  const inquirySection = (title, text) =>
    `<div class="inquiry"><div class="inquiry-aside"><h2>${esc(title)}</h2><p>${text}</p>` +
    `<p>Radije razgovarate? Pozovite nas:</p><a class="phone-lg" href="${phoneHref}">${esc(company.phone)}</a>` +
    `<p>ili pišite na <a href="mailto:${esc(company.email)}">${esc(company.email)}</a></p></div>` +
    inquiryFormRoot() + "</div>";

  return { phoneHref, productImage, productCard, productGrid, breadcrumbs, faq, categoryCards, ctaBanner, inquiryFormRoot, inquirySection };
};
