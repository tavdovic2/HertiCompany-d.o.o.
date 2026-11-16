"use strict";
const fs = require("fs");
const { md5 } = require("./files");

// Tracks a content hash per URL so <lastmod> only changes when a page actually changes.
// Asset version strings (?v=...) are ignored: a CSS or JS update does not change page content.
function createSitemap(statePath, today) {
  const previous = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, "utf8")) : {};
  const state = {};

  function track(urlPath, html) {
    const hash = md5(html.replace(/\?v=[0-9a-f]{8}/g, ""));
    const prev = previous[urlPath];
    state[urlPath] = { hash, lastmod: prev && prev.hash === hash ? prev.lastmod : today };
  }

  const xml = absolute =>
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    Object.entries(state).map(([urlPath, s]) => `  <url><loc>${absolute(urlPath)}</loc><lastmod>${s.lastmod}</lastmod></url>`).join("\n") +
    "\n</urlset>\n";

  // Returns true when the state file changed
  function save() {
    const json = JSON.stringify(state, null, 2) + "\n";
    if (fs.existsSync(statePath) && fs.readFileSync(statePath, "utf8").replace(/\r\n/g, "\n") === json) return false;
    fs.writeFileSync(statePath, json);
    return true;
  }

  return { track, xml, save, size: () => Object.keys(state).length };
}

module.exports = { createSitemap };
