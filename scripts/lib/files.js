"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const md5 = data => crypto.createHash("md5").update(data).digest("hex");

// Text files are read with LF line endings so output and hashes match on every platform.
const readText = file => fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name), target = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(source, target);
    else fs.copyFileSync(source, target);
  }
}

module.exports = { md5, readText, writeFile, copyDir };
