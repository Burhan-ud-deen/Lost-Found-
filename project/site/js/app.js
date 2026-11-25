/* ============================================================
   Lost & Found — Citywide : shared UI + logic
   ============================================================ */
(function () {
  'use strict';

  var NAV = [
    { href: 'index.html', label: 'Home', match: 'index' },
    { href: 'search.html', label: 'Search', match: 'search' },
    { href: 'lost.html', label: 'Lost Items', match: 'lost' },
    { href: 'found.html', label: 'Found Items', match: 'found' },
    { href: 'dashboard.html', label: 'My Reports', match: 'dashboard' },
    { href: 'messages.html', label: 'Messages', match: 'messages' },
    { href: 'admin.html', label: 'Admin', match: 'admin' },
    { href: 'help.html', label: 'Help', match: 'help' }
  ];

  var STATUS_META = {
    'open': { label: 'Open', cls: 'badge-pending' },
    'pending': { label: 'Pending', cls: 'badge-pending' },
    'under-verification': { label: 'Under Verification', cls: 'badge-verification' },
    'verified': { label: 'Verified', cls: 'badge-verified' },
    'returned': { label: 'Returned', cls: 'badge-returned' },
    'rejected': { label: 'Rejected', cls: 'badge-rejected' }
  };

  /* ---------- tiny helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function param(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function fmtDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function go(url) { location.href = url; }

  /* ---------- header / footer ---------- */
  function renderHeader(active) {
    var user = window.LF ? LF.getUser() : null;
    var items = NAV.map(function (n) {
      var cur = n.match === active ? ' aria-current="page"' : '';
      return '<li><a href="' + n.href + '"' + cur + '>' + n.label + '</a></li>';
    }).join('');

    var unread = 0;
    if (user && window.LF) {
      unread = LF.getNotifications().filter(function (n) { return n.unread; }).length;
    }
    var bell = user
      ? '<a class="btn btn-outline btn-sm nav-bell" href="notifications.html" aria-label="Notifications' +
        (unread ? ' (' + unread + ' unread)' : '') + '">\u{1F514}' +
        (unread ? '<span class="nav-badge">' + unread + '</span>' : '') + '</a>'
      : '';

    var actions = user
      ? bell +
        '<a class="btn btn-outline btn-sm" href="profile.html">' + esc(user.name.split(' ')[0]) + '</a>' +
        '<button class="btn btn-outline btn-sm" type="button" id="logout-btn">Log out</button>'
      : '<a class="btn btn-outline btn-sm" href="login.html">Log in</a>' +
        '<a class="btn btn-primary btn-sm" href="login.html?mode=register">Sign up</a>';

    var mobileActions = user
      ? bell +
        '<a class="btn btn-outline btn-sm" href="profile.html">' + esc(user.name.split(' ')[0]) + '</a>' +
        '<button class="btn btn-outline btn-sm" type="button" id="logout-btn-m">Log out</button>'
      : '<a class="btn btn-outline btn-sm" href="login.html">Log in</a>' +
        '<a class="btn btn-primary btn-sm" href="login.html?mode=register">Sign up</a>';

    var header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML =
      '<a class="skip-link" href="#main">Skip to main content</a>' +
      '<nav class="nav" aria-label="Main">' +
        '<a class="brand" href="index.html"><span class="mark" aria-hidden="true">\u{1F50D}</span>Lost &amp; Found <em>Citywide</em></a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links">\u{2630} Menu</button>' +
        '<ul class="nav-links" id="nav-links">' + items +
          '<li class="nav-mobile-actions">' + mobileActions + '</li>' +
        '</ul>' +
        '<div class="nav-actions">' + actions + '</div>' +
      '</nav>';
    document.body.insertBefore(header, document.body.firstChild);

    var toggle = $('.nav-toggle', header);
    var links = $('#nav-links', header);
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    var logout = function () {
      LF.clearUser();
      go('index.html');
    };
    var out = $('#logout-btn', header);
    if (out) out.addEventListener('click', logout);
    var outM = $('#logout-btn-m', header);
    if (outM) outM.addEventListener('click', logout);
  }

  function renderFooter() {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="footer-inner">' +
        '<div>' +
          '<h4>Lost &amp; Found — Citywide</h4>' +
          '<p>One centralized platform to report, search, verify, and recover lost items — safely and transparently.</p>' +
        '</div>' +
        '<div><h4>Browse</h4><ul>' +
          '<li><a href="search.html">Search items</a></li>' +
          '<li><a href="lost.html">Lost items</a></li>' +
          '<li><a href="found.html">Found items</a></li>' +
          '<li><a href="map.html">Map view</a></li>' +
        '</ul></div>' +
        '<div><h4>Report &amp; learn</h4><ul>' +
          '<li><a href="report-lost.html">I lost something</a></li>' +
          '<li><a href="report-found.html">I found something</a></li>' +
          '<li><a href="help.html">Help &amp; safety</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="footer-bottom">HCI UI/UX prototype — Lost &amp; Found Citywide. Demo data stored in your browser only.</div>';
    document.body.appendChild(footer);
  }

  /* ---------- status badge ---------- */
  function statusBadge(status) {
    var m = STATUS_META[status] || { label: status, cls: 'badge-pending' };
    return '<span class="badge ' + m.cls + '">' + esc(m.label) + '</span>';
  }

  function typeBadge(type) {
    return type === 'lost'
      ? '<span class="badge badge-lost">Lost</span>'
      : '<span class="badge badge-found">Found</span>';
  }

  /* ---------- item card ---------- */
  function itemCard(item) {
    return '' +
      '<article class="card">' +
        '<div class="item-photo ' + (item.type === 'found' ? 'found' : '') + '" role="img" aria-label="' + esc(item.name) + '">' + (item.emoji || '\u{1F50D}') + '</div>' +
        '<div class="card-body">' +
          '<div class="flex mb-16" style="margin-bottom:8px">' + typeBadge(item.type) + '<span class="badge badge-id">' + esc(item.id) + '</span></div>' +
          '<h3>' + esc(item.name) + '</h3>' +
          '<p>' + esc(truncate(item.description, 90)) + '</p>' +
          '<div class="meta">' +
            '<span>\u{1F4CD} ' + esc(item.area) + ', ' + esc(item.city) + '</span>' +
            '<span>\u{1F4C5} ' + fmtDate(item.date) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="card-footer">' +
          statusBadge(item.status === 'open' ? 'open' : item.status) +
          '<a class="btn btn-outline btn-sm" href="item.html?id=' + encodeURIComponent(item.id) + '">View details</a>' +
        '</div>' +
      '</article>';
  }

  function truncate(s, n) {
    s = String(s || '');
    return s.length > n ? s.slice(0, n - 1).trim() + '…' : s;
  }

  function renderGrid(el, items, emptyMsg) {
    if (!el) return;
    if (!items.length) {
      el.innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="ico" aria-hidden="true">\u{1F50D}</div>' +
        '<p>' + esc(emptyMsg || 'No items found.') + '</p>' +
        '<p><a href="report-lost.html">Report a lost item</a> or <a href="report-found.html">report a found item</a>.</p></div>';
      return;
    }
    el.innerHTML = items.map(itemCard).join('');
  }

  /* ---------- matching ---------- */
  var STOP = { 'a':1,'an':1,'the':1,'in':1,'on':1,'of':1,'at':1,'to':1,'and':1,'with':1,'for':1,'is':1,'it':1,'found':1,'lost':1 };

  function tokens(s) {
    return String(s || '').toLowerCase().split(/[^a-z0-9]+/)
      .filter(function (w) { return w.length > 2 && !STOP[w]; });
  }

  function scoreMatch(a, b) {
    var score = 0, max = 0;
    var pairs = [
      [a.category, b.category, 30],
      [a.brand, b.brand, 15],
      [a.color, b.color, 15],
      [a.city, b.city, 15],
      [a.area, b.area, 10],
      [a.date, b.date, 15]
    ];
    pairs.forEach(function (p) {
      if (!p[0] || !p[1]) return;
      max += p[2];
      if (String(p[0]).toLowerCase() === String(p[1]).toLowerCase()) score += p[2];
    });
    var ta = tokens([a.name, a.keywords, a.description].join(' '));
    var tb = tokens([b.name, b.keywords, b.description].join(' '));
    var overlap = ta.filter(function (t) { return tb.indexOf(t) !== -1; }).length;
    max += 30;
    score += Math.min(30, overlap * 8);
    return max ? Math.round((score / max) * 100) : 0;
  }

  function findMatches(item) {
    var other = item.type === 'lost' ? 'found' : 'lost';
    return LF.getItems()
      .filter(function (it) { return it.type === other && it.status === 'open' && it.id !== item.id; })
      .map(function (it) { return { item: it, score: scoreMatch(item, it) }; })
      .filter(function (m) { return m.score >= 40; })
      .sort(function (x, y) { return y.score - x.score; });
  }

  /* ---------- auth guard ---------- */
  function requireUser(redirectTo) {
    var u = LF.getUser();
    if (!u) {
      sessionStorage.setItem('lf_next', location.pathname.split('/').pop() + location.search);
      go(redirectTo || 'login.html');
      return null;
    }
    return u;
  }

  function currentUserOrGuest() {
    return LF.getUser() || { name: 'Guest User', email: 'guest@example.com', city: 'Karachi' };
  }

  /* ---------- misc ---------- */
  function toast(msg, kind) {
    var t = document.createElement('div');
    t.className = 'alert alert-' + (kind || 'success');
    t.setAttribute('role', 'status');
    t.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:400;box-shadow:0 8px 30px rgba(0,0,0,.2);max-width:90vw';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3500);
  }

  function markNotificationsRead() {
    var list = LF.getNotifications();
    list.forEach(function (n) { n.unread = false; });
    LF.saveNotifications(list);
  }

  function initTabs() {
    $$('.tabs').forEach(function (tabbar) {
      var buttons = $$('button', tabbar);
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          buttons.forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
          btn.setAttribute('aria-selected', 'true');
          var target = btn.dataset.tab;
          $$('.tabpanel').forEach(function (p) {
            p.classList.toggle('hidden', p.id !== target);
          });
        });
      });
    });
  }

  function addFavicon() {
    if (document.querySelector('link[rel="icon"]')) return;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
      '<rect width="32" height="32" rx="7" fill="#2563eb"/>' +
      '<circle cx="14" cy="14" r="6" fill="none" stroke="#fff" stroke-width="2.5"/>' +
      '<line x1="18.5" y1="18.5" x2="24" y2="24" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>' +
      '</svg>';
    var link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
    document.head.appendChild(link);
  }

  function init() {
    var active = document.body.dataset.page || '';
    addFavicon();
    renderHeader(active);
    renderFooter();
    initTabs();
    if (window.LF) LF.seed();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.App = {
    $: $, $$: $$, esc: esc, param: param, fmtDate: fmtDate, go: go,
    statusBadge: statusBadge, typeBadge: typeBadge,
    itemCard: itemCard, renderGrid: renderGrid, truncate: truncate,
    scoreMatch: scoreMatch, findMatches: findMatches,
    requireUser: requireUser, currentUserOrGuest: currentUserOrGuest,
    toast: toast, markNotificationsRead: markNotificationsRead
  };
})();
