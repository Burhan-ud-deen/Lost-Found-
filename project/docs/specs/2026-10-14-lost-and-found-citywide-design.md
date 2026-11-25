# Lost & Found — Citywide: Design Specification

**Date:** 2026-10-14
**Type:** Website UI/UX prototype (HCI course project)
**Status:** Implemented in `site/`

## 1. Goal

Design and build a complete, demonstrable user journey for a citywide lost-and-found
platform — from losing or finding an item to a verified, confirmed return — with a
strong focus on privacy, security, accessibility, and trust. The deliverable is a
working interactive prototype, not only a static visual mock.

## 2. Users

General public, students, employees, travelers and tourists, shop and business
owners, public transport users, security staff, and community administration. The
interface must work for people with different levels of technical experience.

## 3. Approach chosen

Multi-page static website: one HTML file per screen, shared `styles.css` and two
scripts (`data.js`, `app.js`), mock data in `localStorage`.

Rejected alternatives:

- **React + Vite SPA** — needs a build step; heavier than a UI/UX prototype requires.
- **Single enhanced HTML file** — stays one very large file, hard to review per screen.

## 4. Screens

| Screen | File | Purpose |
|--------|------|---------|
| Home | `index.html` | Hero, lost/found calls to action, search, how-it-works, recent items |
| Log in / Sign up | `login.html` | Tabbed auth; any credentials accepted (prototype) |
| Search | `search.html` | Filters: name/keywords, category, city, area, date, color, brand |
| Lost items | `lost.html` | Grid of lost reports |
| Found items | `found.html` | Grid of found reports |
| Report lost | `report-lost.html` | Full report form with private hints |
| Report found | `report-found.html` | Full report form, warns against public private details |
| Item details | `item.html?id=` | Report ID, fields, possible matches, claim entry |
| Possible matches | `matches.html?a=&b=` | Side-by-side comparison with match confidence |
| Verification | `verify.html?id=` | Private Q&A, status stepper, handover, return |
| Messages | `messages.html` | Secure per-thread messaging |
| My reports | `dashboard.html` | Reports and claims with status |
| Notifications | `notifications.html` | Match, claim, and message alerts |
| Admin | `admin.html` | Review reports/claims, remove fakes, disputes |
| Map | `map.html` | Area-based item map (mock) |
| Profile | `profile.html` | Account details and edit |
| Help & safety | `help.html` | Guide, status meanings, safety, FAQ |

## 5. Core flows

1. **Report** a lost or found item → receive a unique Report ID (`LF-XXXX`).
2. **Match** — reports are compared on category, brand, color, city, area, date,
   and keyword overlap; a confidence percentage is shown.
3. **Verify** — the claimant answers private questions set by the finder. Answers
   are assessed; sufficient overlap marks the claim verified, otherwise it goes to
   admin review.
4. **Return** — after verification, both parties message, meet safely, and confirm
   the return. Status becomes **Returned Successfully** and leaves active search.

Claim status lifecycle: `Pending → Under Verification → Verified → Returned`
(with `rejected` and admin escalation as side paths).

## 6. Data model (mock)

- **Item:** `id, type(lost|found), name, category, emoji, color, brand, city, area,
  location, date, time, description, keywords, hints[], owner, createdAt, status`
- **Claim:** `id, itemId, claimant, status, answers[], createdAt, updatedAt`
- **Thread:** `id, with, about, messages[{from, who, text, time}]`
- Persisted under `localStorage` keys prefixed `lf_`; seeded on first load.

## 7. Visual design

Blue `#2563eb` (trust), white, green `#16a34a` (recovery); amber for pending, red
for rejected/lost. Inter typeface with system fallback. Card-based listings, large
item icons/photo area, clear status badges, responsive grid.

## 8. Accessibility

Semantic landmarks, single `h1` per page, labelled inputs, `aria-current` on active
navigation, focus-visible rings, skip-to-content link, `aria-live` regions for
filtered results and the verification result, and reduced-motion support. Target
WCAG 2.1 AA contrast.

## 9. Non-goals

Real authentication, a backend/database, live geolocation, real-time messaging
delivery, file uploads, and production-grade anti-fraud detection.
