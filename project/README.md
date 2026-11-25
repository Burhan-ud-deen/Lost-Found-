# Lost & Found — Citywide

A website UI/UX prototype for a **citywide lost-and-found platform**. People report
lost or found items, the system suggests possible matches, ownership is confirmed
through private verification, and both parties confirm the return — all in one place
instead of scattered social media posts and notice boards.

Human-Computer Interaction (HCI) course project, 6th semester.

---

## Run it

No build step, no server, no dependencies. Open the site in any modern browser:

```
site/index.html
```

The prototype stores all demo data in the browser `localStorage`. To reset it,
clear site data for the page (or run `localStorage.clear()` in the console) and
reload. Fonts load from Google Fonts; the site still works fully offline with the
system font fallback.

Recommended demo path:

1. `index.html` → **I Lost Something** → `login.html` (any credentials work) → submit a report.
2. Copy the generated **Report ID**, open **View matches**.
3. Open a *found* item → **Start verification** → answer the private questions.
4. Watch the status move **Pending → Under Verification → Verified → Returned**.
5. Check **My Reports** (`dashboard.html`), **Messages**, **Notifications**, and the **Admin** dashboard.

---

## Structure

```
project/
├── lost-and-found.html          earlier single-file concept (kept for reference)
├── docs/
│   ├── 01-assignment-brief.txt  original assignment text
│   ├── 02-assignment-arranged.txt
│   ├── 03-ucd-research.txt      user-centred design research
│   ├── 04-walkthrough.md        screen-by-screen demo script
│   ├── screenshots/             rendered screenshots of key screens
│   └── specs/2026-10-14-lost-and-found-citywide-design.md
└── site/                        the prototype
    ├── index.html               home
    ├── login.html               log in / sign up (tabs)
    ├── search.html              8-filter search
    ├── lost.html / found.html   item listings
    ├── report-lost.html / report-found.html
    ├── item.html                item details + matches (+ ?id=)
    ├── matches.html             side-by-side comparison (+ ?a= & ?b=)
    ├── verify.html              private ownership verification (+ ?id=)
    ├── messages.html            secure messaging
    ├── dashboard.html           my reports & claims
    ├── notifications.html
    ├── admin.html               moderation dashboard
    ├── map.html                 area-based map view (mock)
    ├── profile.html
    ├── help.html                help & safety
    ├── css/styles.css           design system
    └── js/
        ├── data.js              seed data + localStorage store
        └── app.js               shared UI: nav, cards, matching, guards
```

There is no backend. `js/data.js` seeds 12 realistic reports; `localStorage` keys
are prefixed `lf_`. `js/app.js` injects the shared header and footer and provides
the matching score used by `matches.html` and `item.html`.

---

## Design notes

- **Palette:** blue for trust (`#2563eb`), white, green for successful recovery
  (`#16a34a`); amber = pending, red = rejected/lost.
- **Claim lifecycle:** `Pending → Under Verification → Verified → Returned`, with
  `rejected` and admin escalation paths.
- **Privacy:** items carry private `hints` used only for verification. Hints are
  visible on the public claim screen **only** inside a clearly-labelled demo
  reveal box.
- **Accessibility:** semantic landmarks, one `h1` per page, labelled form fields,
  visible focus rings, a skip link, `aria-live` on dynamic regions, and a
  `prefers-reduced-motion` fallback. Target: WCAG 2.1 AA.
- **Responsive:** mobile-first; navigation collapses to a menu under 768px.

## Known limitations (prototype scope)

- No real backend, authentication, or persistence beyond the browser.
- Matching is a heuristic string/field score, not machine learning.
- The map is an illustrative static layout, not live GPS.
- Admin actions mutate local demo data only.
