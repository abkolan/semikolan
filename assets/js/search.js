/* semikolan.me — client-side search over /index.json. No dependencies. */
(function () {
  "use strict";

  var form = document.querySelector(".search-box");
  var input = document.getElementById("q");
  var results = document.getElementById("search-results");
  var status = document.getElementById("search-status");
  if (!form || !input || !results || !status) return;

  var INDEX = null;
  var loading = null;

  function loadIndex() {
    if (loading) return loading;
    loading = fetch(form.getAttribute("data-index"), { credentials: "same-origin" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        INDEX = data.map(function (d) {
          var tags = (d.tags || []).join(" ");
          return {
            doc: d,
            hay: {
              title: (d.title || "").toLowerCase(),
              tags: tags.toLowerCase(),
              desc: (d.description || "").toLowerCase(),
              body: (d.body || "").toLowerCase()
            }
          };
        });
        return INDEX;
      });
    return loading;
  }

  function tokenize(q) {
    return q.toLowerCase().split(/\s+/).filter(Boolean);
  }

  // Weighted field scoring: title > tags > description > body.
  function scoreDoc(entry, tokens) {
    var score = 0;
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      var hit = 0;
      if (entry.hay.title.indexOf(t) !== -1) hit += 8;
      if (entry.hay.tags.indexOf(t) !== -1) hit += 5;
      if (entry.hay.desc.indexOf(t) !== -1) hit += 3;
      if (entry.hay.body.indexOf(t) !== -1) hit += 1;
      // Whole-word title match is worth more than a substring.
      if (new RegExp("\\b" + escapeRe(t)).test(entry.hay.title)) hit += 4;
      if (hit === 0) return 0; // every token must appear somewhere (AND)
      score += hit;
    }
    return score;
  }

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Pull a ~24-word window around the first matching token in the body.
  function snippet(doc, tokens) {
    var text = doc.description || doc.body || "";
    if (!text) return "";
    var lower = text.toLowerCase();
    var at = -1;
    for (var i = 0; i < tokens.length; i++) {
      var p = lower.indexOf(tokens[i]);
      if (p !== -1 && (at === -1 || p < at)) at = p;
    }
    if (at === -1) return doc.description || text.slice(0, 160);
    var start = text.lastIndexOf(" ", Math.max(0, at - 90));
    if (start < 0) start = 0;
    var end = text.indexOf(" ", at + 90);
    if (end < 0) end = text.length;
    var frag = (start > 0 ? "…" : "") + text.slice(start, end).trim() + (end < text.length ? "…" : "");
    return frag;
  }

  function highlight(text, tokens) {
    var out = escapeHtml(text);
    tokens.forEach(function (t) {
      out = out.replace(new RegExp("(" + escapeRe(escapeHtml(t)) + ")", "gi"), "<mark>$1</mark>");
    });
    return out;
  }

  function render(query) {
    var tokens = tokenize(query);
    if (!tokens.length) {
      results.innerHTML = "";
      status.textContent = "";
      return;
    }
    if (!INDEX) {
      status.textContent = "Loading…";
      return;
    }
    var matches = [];
    for (var i = 0; i < INDEX.length; i++) {
      var s = scoreDoc(INDEX[i], tokens);
      if (s > 0) matches.push({ e: INDEX[i], s: s });
    }
    matches.sort(function (a, b) {
      if (b.s !== a.s) return b.s - a.s;
      return (b.e.doc.iso || "").localeCompare(a.e.doc.iso || "");
    });
    matches = matches.slice(0, 30);

    if (!matches.length) {
      results.innerHTML = "";
      status.textContent = "No results for “" + query + "”.";
      return;
    }
    status.textContent = matches.length + (matches.length === 1 ? " result" : " results") + " for “" + query + "”.";
    results.innerHTML = matches.map(function (m) {
      var d = m.e.doc;
      return (
        '<li class="entry essay">' +
        '<span class="hang">' + escapeHtml((d.section || "").toUpperCase()) +
        (d.date ? ' · ' + escapeHtml(d.date) : "") + '</span>' +
        '<h2 class="entry-title"><a href="' + encodeURI(d.url) + '">' +
        highlight(d.title, tokens) + '</a></h2>' +
        '<p class="entry-dek">' + highlight(snippet(d, tokens), tokens) + '</p>' +
        '</li>'
      );
    }).join("");
  }

  var timer = null;
  function onInput() {
    var q = input.value;
    updateUrl(q);
    if (!INDEX) {
      loadIndex().then(function () { render(q); }).catch(function () {
        status.textContent = "Search index failed to load.";
      });
    }
    clearTimeout(timer);
    timer = setTimeout(function () { render(q); }, 90);
  }

  function updateUrl(q) {
    if (!window.history || !window.history.replaceState) return;
    var url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q); else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); onInput(); });
  input.addEventListener("input", onInput);

  // Warm the index on first focus so the initial keystroke feels instant.
  input.addEventListener("focus", loadIndex, { once: true });

  // Seed from ?q= and autofocus.
  var initial = new URLSearchParams(window.location.search).get("q");
  if (initial) {
    input.value = initial;
    loadIndex().then(function () { render(initial); });
  }
  input.focus();
})();
