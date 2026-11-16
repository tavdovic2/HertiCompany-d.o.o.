// Page behaviour: theme toggle, mobile menu, product shelf, catalogue search and the inquiry form.
// Page content is pre-rendered by the build; catalog.js (generated) holds the data this file needs.
(function () {
  "use strict";

  const HC = window.HC;
  const { escapeHtml: esc, icons, url } = HC;
  const { company = {}, categories = [], products = [], shelf = {} } = HC.catalog || {};
  const page = document.body.getAttribute("data-page") || "";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const param = name => new URLSearchParams(location.search).get(name) || "";
  const findCategory = id => categories.find(c => c.id === id);
  const findProduct = id => products.find(p => p.id === id);
  const phoneLink = () => `<a href="tel:${company.phoneDial || ""}">${esc(company.phone)}</a>`;

  /* Header: theme toggle and mobile menu */
  function initHeader() {
    const toggle = $(".theme-toggle");
    if (toggle) {
      const apply = theme => {
        const dark = theme === "dark";
        const label = dark ? "Uključite svijetlu temu" : "Uključite tamnu temu";
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
        toggle.innerHTML = dark ? icons.sun : icons.moon;
        toggle.setAttribute("aria-label", label);
        toggle.title = label;
        const meta = $('meta[name="theme-color"]');
        if (meta) meta.content = dark ? "#0f1a2b" : "#ffffff";
      };
      apply(document.documentElement.getAttribute("data-theme"));
      toggle.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        apply(next);
        // Storage key kept from the first release so returning visitors keep their choice
        try { localStorage.setItem("herti-tema", next); } catch (e) { /* storage unavailable: theme still switches */ }
      });
    }

    const button = $(".nav-toggle"), nav = $("#site-nav");
    if (!button || !nav) return;
    button.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
      $(".icon", button).innerHTML = open ? icons.close : icons.menu;
      $("span:last-child", button).textContent = open ? "Zatvori" : "Meni";
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { button.click(); button.focus(); }
    });
  }

  /* Inquiry form */
  function initInquiryForm(root, preselected) {
    if (!root) return;
    const productOptions = '<option value="">Izaberite proizvod</option>' + categories.map(c =>
      `<optgroup label="${esc(c.name)}">` + products.filter(p => p.category === c.id).map(p =>
        `<option value="${esc(p.id)}">${esc(p.name + " – " + p.brand)}</option>`).join("") + "</optgroup>"
    ).join("");

    root.innerHTML =
      '<form class="inquiry-form" novalidate>' +
      '<fieldset><legend>Šta Vas zanima?</legend><div class="items"></div>' +
      `<button type="button" class="btn btn-subtle add-item">${icons.plus}Dodajte još jedan proizvod</button></fieldset>` +
      '<fieldset><legend>Vaši podaci</legend>' +
      '<div class="field-pair">' +
      '<div class="field"><label for="inquiry-name">Ime i prezime</label><input id="inquiry-name" name="name" autocomplete="name" required><span class="field-error">Upišite ime i prezime.</span></div>' +
      '<div class="field"><label for="inquiry-company">Firma ili trgovina <span class="optional">(nije obavezno)</span></label><input id="inquiry-company" name="company" autocomplete="organization"></div>' +
      '<div class="field"><label for="inquiry-phone">Broj telefona</label><input id="inquiry-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="npr. 061 234 567" required><span class="field-error">Upišite broj telefona da Vas možemo pozvati.</span></div>' +
      '<div class="field"><label for="inquiry-email">E-mail <span class="optional">(nije obavezno)</span></label><input id="inquiry-email" name="email" type="email" inputmode="email" autocomplete="email"><span class="field-error">Provjerite e-mail adresu – izgleda da nešto nedostaje.</span></div>' +
      "</div>" +
      '<div class="field"><label for="inquiry-city">Mjesto dostave <span class="optional">(nije obavezno)</span></label><input id="inquiry-city" name="city" autocomplete="address-level2" placeholder="npr. Sarajevo"></div>' +
      '<div class="field"><label for="inquiry-note">Napomena <span class="optional">(nije obavezno)</span></label><textarea id="inquiry-note" name="note" placeholder="Npr. pitanje o dostavi ili posebnom pakovanju."></textarea></div>' +
      "</fieldset>" +
      '<label class="honeypot" aria-hidden="true">Ne popunjavajte<input type="checkbox" name="botcheck" tabindex="-1"></label>' +
      `<label class="consent"><input type="checkbox" name="consent" required><span>Slažem se da Herti Company koristi moje podatke samo da odgovori na ovaj upit. Više u <a href="${url.privacy}" target="_blank">Politici privatnosti</a>.</span></label>` +
      '<button type="submit" class="btn btn-primary btn-lg btn-block">Pošaljite upit</button>' +
      '<p class="note">Upit ne obavezuje na kupovinu. Kontaktiraćemo Vas u najkraćem roku.</p>' +
      '<div class="form-status" role="status" aria-live="polite"></div>' +
      "</form>";

    const form = $("form", root), items = $(".items", form);
    let rowCount = 0;

    function updateRemoveButtons() {
      const rows = $$(".item-row", items);
      rows.forEach(r => { $(".remove-item", r).hidden = rows.length === 1; });
    }
    function addRow(productId) {
      rowCount++;
      const row = document.createElement("div");
      row.className = "item-row";
      row.innerHTML =
        `<div class="field"><label for="inquiry-product-${rowCount}">Proizvod</label><select id="inquiry-product-${rowCount}" name="product">${productOptions}</select><span class="field-error">Izaberite proizvod ili napišite u napomeni šta Vas zanima.</span></div>` +
        `<div class="field"><label for="inquiry-qty-${rowCount}">Količina</label><input id="inquiry-qty-${rowCount}" name="quantity" placeholder="npr. 20 kom"></div>` +
        `<button type="button" class="remove-item" aria-label="Uklonite ovaj proizvod iz upita">${icons.trash}</button>`;
      items.appendChild(row);
      if (productId) $("select", row).value = productId;
      $(".remove-item", row).addEventListener("click", () => { row.remove(); updateRemoveButtons(); });
      updateRemoveButtons();
      return row;
    }
    (preselected.length ? preselected : [""]).forEach(addRow);
    $(".add-item", form).addEventListener("click", () => { $("select", addRow("")).focus(); });

    root.focusFirstField = () => ($('[name="quantity"]', form) || $("#inquiry-name", form)).focus({ preventScroll: true });

    const clearError = e => { const f = e.target.closest(".field, .consent"); if (f) f.classList.remove("has-error"); };
    form.addEventListener("input", clearError);
    form.addEventListener("change", clearError);

    form.addEventListener("submit", e => {
      e.preventDefault();
      const status = $(".form-status", form);
      status.className = "form-status"; status.innerHTML = "";
      const name = $("#inquiry-name", form), phone = $("#inquiry-phone", form), email = $("#inquiry-email", form), note = $("#inquiry-note", form);
      const lines = $$(".item-row", items).map(r => {
        const p = findProduct($("select", r).value);
        return p ? { p, quantity: $('[name="quantity"]', r).value.trim() } : null;
      }).filter(Boolean);

      let valid = true, firstInvalid = null;
      const check = (ok, field, focusEl) => {
        field.classList.toggle("has-error", !ok);
        if (!ok) { valid = false; firstInvalid = firstInvalid || focusEl; }
      };
      const firstRow = $(".item-row .field", items);
      check(lines.length > 0 || note.value.trim().length > 0, firstRow, $("select", firstRow));
      check(name.value.trim().length > 1, name.closest(".field"), name);
      check(phone.value.replace(/\D/g, "").length >= 6, phone.closest(".field"), phone);
      check(!email.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), email.closest(".field"), email);
      const consent = $('[name="consent"]', form);
      check(consent.checked, $(".consent", form), consent);
      if (!valid) {
        const onlyConsent = !consent.checked && $$(".has-error", form).length === 1;
        status.className = "form-status is-error";
        status.innerHTML = "Provjerite označena polja.<p>" + (onlyConsent ? "Označite saglasnost da bismo mogli odgovoriti na upit." : "Crvenom bojom su označena polja koja treba popuniti.") + "</p>";
        firstInvalid.focus();
        return;
      }
      if ($('[name="botcheck"]', form).checked) return;

      const productLines = lines.map(l => "- " + l.p.name + " (" + l.p.brand + ")" + (l.quantity ? " – količina: " + l.quantity : ""));
      const subject = "Upit za ponudu: " + (lines.length ? lines[0].p.name + (lines.length > 1 ? " i još " + (lines.length - 1) : "") : "opšti upit");
      const message =
        "UPIT ZA PONUDU – herticompany.ba\n\n" +
        "Proizvodi:\n" + (productLines.length ? productLines.join("\n") : "- (nije izabran proizvod)") + "\n\n" +
        "Ime i prezime: " + name.value.trim() + "\n" +
        "Firma: " + ($("#inquiry-company", form).value.trim() || "-") + "\n" +
        "Telefon: " + phone.value.trim() + "\n" +
        "E-mail: " + (email.value.trim() || "-") + "\n" +
        "Mjesto dostave: " + ($("#inquiry-city", form).value.trim() || "-") + "\n\n" +
        "Napomena:\n" + (note.value.trim() || "-");

      const submit = $('button[type="submit"]', form);
      const showSuccess = (title, text) => {
        status.className = "form-status is-success";
        status.innerHTML = esc(title) + "<p>" + text + "</p>";
        status.setAttribute("tabindex", "-1");
        status.focus();
      };

      if (company.web3formsKey) {
        submit.disabled = true; submit.textContent = "Šaljemo upit…";
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: company.web3formsKey, subject, from_name: "Herti Company – web katalog",
            name: name.value.trim(), email: email.value.trim() || undefined, phone: phone.value.trim(), message
          })
        }).then(r => r.json()).then(d => {
          if (!d || !d.success) throw new Error("Web3Forms rejected the submission");
          form.reset();
          $$(".item-row", items).slice(1).forEach(r => r.remove());
          updateRemoveButtons();
          showSuccess("Hvala! Vaš upit je poslan.", "Kontaktiraćemo Vas u najkraćem roku. Ako je hitno, pozovite nas na " + phoneLink() + ".");
        }).catch(() => {
          status.className = "form-status is-error";
          status.innerHTML = "Upit nije poslan.<p>Provjerite internet vezu i pokušajte ponovo, ili nas pozovite na " + phoneLink() + ".</p>";
        }).then(() => { submit.disabled = false; submit.textContent = "Pošaljite upit"; });
      } else {
        location.href = "mailto:" + company.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
        showSuccess("Otvorili smo Vaš e-mail program s gotovim upitom.",
          "Kliknite „Pošalji“ u e-mail programu da upit stigne do nas. Ako se ništa nije otvorilo, pišite na " +
          `<a href="mailto:${esc(company.email)}">${esc(company.email)}</a> ili nas pozovite na ${phoneLink()}.`);
      }
    });
  }

  /* Home page: scrolling product shelf */
  // Item height as a share of the shelf height, by pack size
  function sizeScale(volume) {
    const m = String(volume).replace(",", ".").match(/([\d.]+)\s*(ml|l)/i);
    const ml = m ? parseFloat(m[1]) * (m[2].toLowerCase() === "l" ? 1000 : 1) : 1000;
    if (ml <= 750) return 0.68;
    if (ml <= 1000) return 0.8;
    if (ml <= 3000) return 0.9;
    return 1;
  }
  // Drawn bottles are cropped to their outline so they stand on the shelf like photos
  const BOTTLE_BOUNDS = { "Galon": [22, 28, 156, 223], "Boca s pumpicom": [46, 26, 110, 225] };
  function shelfItem(p, i, duplicate) {
    const size = shelf[p.id];
    let inner;
    if (size) {
      inner = `<img src="${url.shelfImage(esc(p.id))}" alt="${esc(p.name)}" width="${size[0]}" height="${size[1]}" loading="${i < 6 && !duplicate ? "eager" : "lazy"}" decoding="async">`;
    } else {
      const b = BOTTLE_BOUNDS[p.packaging] || [40, 10, 120, 241];
      inner = `<svg viewBox="${b.join(" ")}" width="${b[2]}" height="${b[3]}" role="img" aria-label="${esc(p.name)}">${HC.bottleSvg(p.packaging, p.brand, p.volume)}</svg>`;
    }
    return `<a class="shelf-item" data-category="${esc(p.category)}" href="${url.product(p)}" title="${esc(p.name)}" data-scale="${sizeScale(p.volume)}"${duplicate ? ' tabindex="-1"' : ""}>${inner}</a>`;
  }
  function initShelf(root) {
    if (!root || !products.length) return;
    // Interleave categories: household, personal care, car care, repeat
    const byCategory = categories.map(c => products.filter(p => p.category === c.id));
    const order = [];
    for (let i = 0; order.length < products.length; i++) byCategory.forEach(list => { if (list[i]) order.push(list[i]); });
    // The row is rendered twice; scrolling by -50 % is exactly one row, so the loop is seamless
    const row = duplicate => `<div class="shelf-row"${duplicate ? ' aria-hidden="true"' : ""}>` + order.map((p, i) => shelfItem(p, i, duplicate)).join("") + "</div>";
    root.innerHTML = '<div class="shelf" role="region" aria-label="Proizvodi Herti Company">' +
      '<div class="shelf-viewport"><div class="shelf-track">' + row(false) + row(true) + "</div></div>" +
      '<div class="shelf-line" aria-hidden="true"></div></div>';
    // Set via CSSOM because the CSP does not allow style="" attributes
    $$(".shelf-item", root).forEach(a => a.style.setProperty("--scale", a.getAttribute("data-scale")));

    // Constant speed regardless of row length: 0.2 shelf heights per second
    const track = $(".shelf-track", root), firstRow = $(".shelf-row", root);
    const setDuration = () => {
      const h = parseFloat(getComputedStyle(root).getPropertyValue("--shelf-h")) || 220;
      track.style.animationDuration = (firstRow.getBoundingClientRect().width / (h * 0.2)).toFixed(1) + "s";
    };
    setDuration();
    window.addEventListener("resize", setDuration);
  }

  /* Catalogue page: search and category filter over the pre-rendered cards */
  function initCatalog() {
    const input = $("#pretraga"), info = $(".results-info"), empty = $("#no-results");
    if (!input) return;
    let filter = param("kategorija");
    if (filter && !findCategory(filter)) filter = "";
    input.value = param("q");
    const searchText = {};
    products.forEach(p => {
      const c = findCategory(p.category) || {};
      searchText[p.id] = HC.normalize([p.name, p.brand, c.name, p.group, p.volume, p.volume.replace(/\s/g, ""), p.packaging, p.scent, p.purpose].join(" "));
    });

    function render() {
      const words = HC.normalize(input.value).split(/\s+/).filter(Boolean);
      let total = 0;
      $$(".category-section").forEach(section => {
        let inSection = 0;
        $$(".group-block", section).forEach(group => {
          let inGroup = 0;
          $$(".product-card", group).forEach(card => {
            const text = searchText[card.getAttribute("data-id")] || "";
            const visible = (!filter || section.getAttribute("data-category") === filter) && words.every(w => text.includes(w));
            card.hidden = !visible;
            if (visible) inGroup++;
          });
          group.hidden = !inGroup;
          inSection += inGroup;
        });
        section.hidden = !inSection;
        $(".count", section).textContent = HC.productCount(inSection);
        total += inSection;
      });
      $$(".filters button").forEach(b => b.setAttribute("aria-pressed", b.getAttribute("data-filter") === filter ? "true" : "false"));
      info.textContent = (words.length || filter) ? "Prikazano: " + HC.productCount(total) + " od " + products.length : "Prikazano svih " + products.length + " proizvoda";
      empty.hidden = total > 0;
      $("#no-results-term").textContent = input.value.trim();

      const u = new URL(location.href);
      const q = input.value.trim();
      if (q) u.searchParams.set("q", q); else u.searchParams.delete("q");
      if (filter) u.searchParams.set("kategorija", filter); else u.searchParams.delete("kategorija");
      history.replaceState(null, "", u.pathname + u.search + u.hash);
    }
    input.addEventListener("input", render);
    $("#search-form").addEventListener("submit", e => { e.preventDefault(); input.blur(); });
    $$(".filters button").forEach(b => b.addEventListener("click", () => { filter = b.getAttribute("data-filter"); render(); }));
    $("#clear-search").addEventListener("click", () => { input.value = ""; filter = ""; render(); input.focus(); });
    if (input.value || filter) render();
    if (location.hash === "#pretraga") input.focus();
  }

  /* Product page: inquiry form with the current product preselected */
  function initProductPage() {
    const root = $("#inquiry-form-root");
    // The product id is the last URL segment: /proizvodi/<category>/<product>/
    const id = location.pathname.split("/").filter(Boolean).pop();
    initInquiryForm(root, findProduct(id) ? [id] : []);
    $$('a[href="#upit"]').forEach(a => a.addEventListener("click", () => setTimeout(root.focusFirstField, 450)));
    if (location.hash === "#upit") setTimeout(() => { $("#upit").scrollIntoView(); root.focusFirstField(); }, 60);
  }

  initHeader();
  if (page === "home") initShelf($("#shelf"));
  if (page === "catalog") initCatalog();
  if (page === "product") initProductPage();
  if (page === "contact") {
    const id = param("proizvod");
    initInquiryForm($("#inquiry-form-root"), findProduct(id) ? [id] : []);
  }
})();
