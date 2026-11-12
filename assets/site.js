/* Builds the shared header, footer and product cards from config.js.
   You normally won't need to edit this file. */
(function () {
  var S = window.SITE || {};
  var NAV = [
    { href: "index.html", label: "Home" },
    { href: "workbook.html", label: "AI Workbook" },
    { href: "about.html", label: "About" },
    { href: "faq.html", label: "FAQ" },
    { href: "about.html#contact", label: "Contact" }
  ];
  var LEGAL = [
    { href: "refund.html", label: "Refund Policy" },
    { href: "privacy.html", label: "Privacy Policy" },
    { href: "terms.html", label: "Terms & Conditions" }
  ];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var here = (location.pathname.split("/").pop() || "index.html");

  // ---------- Header ----------
  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<div class="container nav-wrap">' +
        '<a class="brand" href="index.html">' +
          (S.logo
            ? '<img class="logo-img" src="' + esc(S.logo) + '" alt="' + esc(S.name) + ' home">'
            : '<span class="brand-name">' + esc(S.name) + '</span>') +
        '</a>' +
        '<button class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>' +
        '<nav id="main-nav" class="main-nav" aria-label="Main">' +
          NAV.map(function (n) {
            var active = n.href === here ? ' aria-current="page"' : "";
            return '<a href="' + n.href + '"' + active + ">" + n.label + "</a>";
          }).join("") +
        "</nav>" +
      "</div>";
    var btn = header.querySelector(".nav-toggle");
    var nav = header.querySelector(".main-nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ---------- Footer ----------
  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<div class="container footer-grid">' +
        "<div>" +
          '<p class="footer-brand">' + esc(S.name) + "</p>" +
          '<p class="muted">' + esc(S.tagline) + "</p>" +
          '<p class="muted">Email: <a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a></p>" +
        "</div>" +
        "<div><p class=\"footer-head\">Explore</p><ul>" +
          NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
        "</ul></div>" +
        "<div><p class=\"footer-head\">Policies</p><ul>" +
          LEGAL.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
        "</ul></div>" +
        "<div><p class=\"footer-head\">Follow</p><ul>" +
          (S.social || []).map(function (s) {
            return '<li><a href="' + esc(s.url) + '" rel="noopener">' + esc(s.label) + "</a></li>";
          }).join("") +
        "</ul></div>" +
      "</div>" +
      '<div class="container footer-bottom muted">&copy; ' + new Date().getFullYear() + " " + esc(S.name) + ". All rights reserved.</div>";
  }

  // ---------- Fill simple text placeholders ----------
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    if (S[key] != null) el.textContent = S[key];
  });
  document.querySelectorAll("[data-email-link]").forEach(function (el) {
    el.href = "mailto:" + S.email;
    el.textContent = S.email;
  });
  document.title = document.title.replace("{name}", S.name || "");

  // ---------- Product cards ----------
  function productById(id) {
    return (S.products || []).filter(function (p) { return p.id === id; })[0];
  }

  document.querySelectorAll("[data-products]").forEach(function (grid) {
    grid.innerHTML = (S.products || []).map(function (p) {
      var soon = p.status !== "available";
      var link = p.page ? '<a class="btn btn-ghost" href="' + esc(p.page) + '">Learn more</a>' : "";
      var buy = soon
        ? '<span class="badge badge-soon">Coming soon</span>'
        : '<a class="btn btn-primary" data-buy="' + esc(p.id) + '" href="#">Buy now</a>';
      return (
        '<article class="card product-card">' +
          (p.image
            ? '<img class="card-img" src="' + esc(p.image) + '" alt="' + esc(p.title) + ' cover" loading="lazy">'
            : '<div class="ph ph-card" role="img" aria-label="Product cover image placeholder"><span>Product cover</span></div>') +
          '<div class="card-body">' +
            '<p class="eyebrow">' + esc(p.audience) + "</p>" +
            "<h3>" + esc(p.title) + "</h3>" +
            "<p>" + esc(p.description) + "</p>" +
            '<p class="meta">' + esc(p.format) + (p.price && !soon ? " · <strong>" + esc(p.price) + "</strong>" : "") + "</p>" +
            '<div class="card-actions">' + buy + link + "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  });

  // ---------- Buy buttons ----------
  // Any element with data-buy="product-id" goes to that product's checkout link.
  document.querySelectorAll("[data-buy]").forEach(function (b) {
    var p = productById(b.getAttribute("data-buy"));
    if (p && p.buyUrl) {
      b.href = p.buyUrl;
    } else {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        showNotice("Checkout isn’t connected yet. Add your payment link for this product in assets/config.js (buyUrl).");
      });
    }
  });
  document.querySelectorAll("[data-price]").forEach(function (el) {
    var p = productById(el.getAttribute("data-price"));
    if (p) el.textContent = p.price;
  });

  // ---------- Contact form (opens the visitor's email app) ----------
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var from = form.elements.email.value.trim();
      var msg = form.elements.message.value.trim();
      if (!name || !from || !msg) { showNotice("Please fill in your name, email and message."); return; }
      var body = msg + "\n\n— " + name + " (" + from + ")";
      var href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Website message from " + name) +
                 "&body=" + encodeURIComponent(body);
      location.href = href;
      showNotice("Your email app should open with the message ready to send. If it doesn’t, email us directly at " + S.email + ".");
    });
  }

  // ---------- Small on-page notice ----------
  function showNotice(text) {
    var n = document.getElementById("notice");
    if (!n) {
      n = document.createElement("div");
      n.id = "notice";
      n.setAttribute("role", "status");
      document.body.appendChild(n);
    }
    n.textContent = text;
    n.classList.add("show");
    clearTimeout(n._t);
    n._t = setTimeout(function () { n.classList.remove("show"); }, 6000);
  }
})();
