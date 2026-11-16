"use strict";
const fs = require("fs");
const path = require("path");

const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function loadData(dataDir) {
  const load = file => {
    try {
      return require(path.join(dataDir, file));
    } catch (e) {
      throw new Error(`Cannot load src/data/${file}: ${e.message}`);
    }
  };
  const { company, featured, faq } = load("settings.js");
  return { company, featured, faq, categories: load("categories.js"), products: load("products.js"), seo: load("seo.js") };
}

// Returns { errors, warnings }. Errors stop the build; warnings are printed.
function validate(data, imagesDir) {
  const errors = [], warnings = [];
  const ids = new Set();
  const categoryIds = new Set(data.categories.map(c => c.id));

  for (const c of data.categories) {
    if (!ID_PATTERN.test(c.id)) errors.push(`Category "${c.name}": invalid id "${c.id}" (lowercase letters, digits and hyphens only).`);
  }
  for (const p of data.products) {
    if (!ID_PATTERN.test(p.id)) errors.push(`Product "${p.name}": invalid id "${p.id}" (lowercase letters, digits and hyphens only).`);
    if (ids.has(p.id)) errors.push(`Duplicate product id: ${p.id}`);
    ids.add(p.id);
    if (!categoryIds.has(p.category)) errors.push(`Product ${p.id}: unknown category "${p.category}".`);
    if (p.image && !fs.existsSync(path.join(imagesDir, "products", p.image))) errors.push(`Product ${p.id}: image products/${p.image} not found.`);
    if (p.image && !fs.existsSync(path.join(imagesDir, "products", "thumbs", p.image))) warnings.push(`Product ${p.id}: no thumbnail in products/thumbs/ (cards use the full image).`);
    if (!data.seo.products[p.id]) warnings.push(`Product ${p.id}: no entry in src/data/seo.js (title and description are derived).`);
  }
  for (const id of data.featured) {
    if (!ids.has(id)) warnings.push(`Featured product "${id}" does not exist and is skipped.`);
  }
  return { errors, warnings };
}

module.exports = { loadData, validate };
