#!/usr/bin/env node
"use strict";
// Minimal static server for dist/, close to Cloudflare Pages behaviour:
// /path/ -> /path/index.html, 404.html for unknown paths, rules from _headers and _redirects.

const http = require("http");
const fs = require("fs");
const path = require("path");

const DIST = path.resolve(__dirname, "..", "dist");
const PORT = Number(process.env.PORT) || 8080;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon"
};

if (!fs.existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

// "/assets/*" matches "/assets/x"; ":splat" in the target is replaced with the matched part
function match(pattern, pathname) {
  if (pattern.endsWith("*")) return pathname.startsWith(pattern.slice(0, -1)) ? pathname.slice(pattern.length - 1) : null;
  return pattern === pathname ? "" : null;
}

const lines = file => fs.existsSync(file) ? fs.readFileSync(file, "utf8").split(/\r?\n/).filter(l => l.trim() && !l.startsWith("#")) : [];

const redirects = lines(path.join(DIST, "_redirects")).map(l => {
  const [from, to, status = "302"] = l.trim().split(/\s+/);
  return { from, to, status: Number(status) };
});

const headerRules = [];
for (const line of lines(path.join(DIST, "_headers"))) {
  if (!/^\s/.test(line)) headerRules.push({ pattern: line.trim(), headers: [] });
  else {
    const i = line.indexOf(":");
    headerRules[headerRules.length - 1].headers.push([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
  }
}
// HTTPS-only directives would break plain http://localhost
const localValue = (name, value) =>
  name === "Content-Security-Policy" ? value.replace(/;\s*upgrade-insecure-requests/, "") : value;

function send(res, status, file, pathname) {
  const headers = { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream" };
  for (const rule of headerRules) {
    if (match(rule.pattern, pathname) === null) continue;
    for (const [name, value] of rule.headers) if (name !== "Strict-Transport-Security") headers[name] = localValue(name, value);
  }
  res.writeHead(status, headers);
  fs.createReadStream(file).pipe(res);
}

http.createServer((req, res) => {
  const { pathname, search } = new URL(req.url, "http://localhost");
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { decoded = pathname; }

  for (const r of redirects) {
    const splat = match(r.from, decoded);
    if (splat === null) continue;
    res.writeHead(r.status, { Location: r.to.replace(":splat", splat) + search });
    return res.end();
  }

  const file = path.join(DIST, decoded);
  if (!file.startsWith(DIST)) { res.writeHead(400); return res.end(); }
  // Cloudflare does not serve its own config files
  if (/^\/_(headers|redirects)$/.test(decoded)) return send(res, 404, path.join(DIST, "404.html"), decoded);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!decoded.endsWith("/")) { res.writeHead(308, { Location: decoded + "/" + search }); return res.end(); }
    if (fs.existsSync(path.join(file, "index.html"))) return send(res, 200, path.join(file, "index.html"), decoded);
  } else if (fs.existsSync(file)) {
    return send(res, 200, file, decoded);
  }
  send(res, 404, path.join(DIST, "404.html"), decoded);
}).listen(PORT, () => console.log(`Serving dist/ at http://localhost:${PORT}`));
