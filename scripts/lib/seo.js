"use strict";
// Meta tags and JSON-LD structured data. Titles and descriptions come from src/data/seo.js.

const BRAND = "Herti Company";

module.exports = function seo(site) {
  const { company, products, seo: texts, hc } = site;
  const esc = hc.escapeHtml;
  const base = company.website.replace(/\/$/, "");
  const orgId = base + "/#firma";
  const absolute = path => base + "/" + String(path || "").replace(/^\//, "");
  const logo = absolute(hc.url.image("logo.png"));

  function truncate(text, max) {
    if (text.length <= max) return text;
    const cut = text.slice(0, max - 1);
    return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:–-]+$/, "") + "…";
  }
  const forPage = id => texts.pages[id] || { title: BRAND, description: "" };
  const forCategory = c => texts.categories[c.id] || { title: truncate(c.title, 44), description: truncate(c.seoDescription || c.intro, 160) };
  function forProduct(p) {
    if (texts.products[p.id]) return texts.products[p.id];
    let title = p.name + " – " + p.brand;
    if (title.length > 44) title = p.name;
    return { title: truncate(title, 44), description: truncate(p.shortDescription + " Proizvođač iz Kiseljaka. Zatražite ponudu.", 160) };
  }
  const fullTitle = t => (t && t !== BRAND ? t + " | " + BRAND : BRAND);

  // o: { title, description, path, image, type ("website" | "product"), noindex }
  function metaTags(o) {
    const title = fullTitle(o.title);
    const pageUrl = o.path != null ? absolute(o.path) : "";
    const image = o.image ? absolute(o.image) : logo;
    const tags = [`<title>${esc(title)}</title>`, `<meta name="description" content="${esc(o.description)}">`];
    if (o.noindex) tags.push('<meta name="robots" content="noindex">');
    else if (pageUrl) tags.push(`<link rel="canonical" href="${esc(pageUrl)}">`);
    tags.push(
      `<meta property="og:type" content="${o.type || "website"}">`,
      `<meta property="og:site_name" content="${BRAND}">`,
      '<meta property="og:locale" content="bs_BA">',
      `<meta property="og:title" content="${esc(title)}">`,
      `<meta property="og:description" content="${esc(o.description)}">`
    );
    if (pageUrl) tags.push(`<meta property="og:url" content="${esc(pageUrl)}">`);
    tags.push(
      `<meta property="og:image" content="${esc(image)}">`,
      `<meta name="twitter:card" content="${o.image ? "summary_large_image" : "summary"}">`,
      `<meta name="twitter:title" content="${esc(title)}">`,
      `<meta name="twitter:description" content="${esc(o.description)}">`,
      `<meta name="twitter:image" content="${esc(image)}">`
    );
    return tags.join("\n");
  }

  // "<" is escaped so the text can never close the <script> element
  const jsonLd = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

  function organization() {
    const o = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": orgId,
      name: company.legalName || company.name,
      alternateName: [company.name, company.formerName].filter(Boolean),
      description: "Proizvođač kućne hemije, sredstava za ličnu higijenu i auto hemije iz Kiseljaka. Prodaja na veliko i malo, bez minimalne narudžbe, s dostavom.",
      url: base + "/",
      logo,
      image: logo,
      telephone: company.phoneDial,
      email: company.email,
      address: { "@type": "PostalAddress", streetAddress: company.address, addressLocality: company.city, postalCode: company.postalCode, addressCountry: "BA" },
      areaServed: { "@type": "Country", name: "Bosna i Hercegovina" },
      brand: [...new Set(products.map(p => p.brand))].map(name => ({ "@type": "Brand", name }))
    };
    if (company.idNumber) o.taxID = company.idNumber;
    if (company.vatNumber) o.vatID = company.vatNumber;
    return o;
  }
  const website = () => ({
    "@context": "https://schema.org", "@type": "WebSite", "@id": base + "/#web",
    name: BRAND, url: base + "/", inLanguage: "bs", publisher: { "@id": orgId }
  });
  // items: [{ name, path }]; the last item is the current page
  const breadcrumbs = items => ({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: absolute(item.path) }))
  });
  // No offers, ratings or reviews: the site does not show prices or reviews.
  const product = (p, category, path) => ({
    "@context": "https://schema.org", "@type": "Product",
    "@id": absolute(path) + "#proizvod",
    name: p.name,
    description: p.description,
    image: p.image ? [absolute(hc.url.productImage(p.image))] : undefined,
    url: absolute(path),
    category: category.name + (p.group ? " > " + p.group : ""),
    brand: { "@type": "Brand", name: p.brand },
    manufacturer: { "@type": "Organization", "@id": orgId, name: company.legalName || company.name, url: base + "/" },
    countryOfOrigin: "BA"
  });
  const faq = list => ({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: list.map(q => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } }))
  });

  // Full <head> SEO block: meta tags followed by JSON-LD scripts
  const head = (meta, structured = []) => [metaTags(meta), ...structured.map(jsonLd)].join("\n");

  return {
    base, absolute, forPage, forCategory, forProduct, head,
    ld: { organization, website, breadcrumbs, product, faq }
  };
};
