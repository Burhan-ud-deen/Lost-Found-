# Lost & Found — Citywide: Demo Walkthrough

This document walks through the prototype screen by screen. Screenshots are in
`docs/screenshots/`. Open `site/index.html` to follow along. All data is mock and
stored in the browser only.

## Quick start

1. Open `site/index.html`.
2. Click **I Lost Something** (or **I found something**).
3. On `login.html`, choose the **Sign up** tab, fill any details, and submit — the
   prototype accepts any credentials.
4. You are now logged in and can report, claim, and message.

To reset demo data: open the browser console on any page and run `localStorage.clear()`, then reload.

---

## Screen-by-screen

### 1. Home — `docs/screenshots/home.png`
Hero with the two primary actions (**I Lost Something** / **I Found Something**), a
search bar, a four-step "How it works" strip, a grid of recently reported items, and
a "Built on trust and privacy" feature section. Everything important is reachable in
one click.

> Mobile: `docs/screenshots/home-mobile.png` — navigation collapses to a menu button.

### 2. Search — `docs/screenshots/search.png`
`search.html` supports all eight filters from the brief: name/keywords, category,
city, area, date, color, and brand. Results update live and show a count. The example
screenshot is `search.html?q=phone`.

> Mobile: `docs/screenshots/search-mobile.png`.

### 3. Item details — `docs/screenshots/item-details.png`
`item.html?id=LF-1002` shows the Report ID, type and status badges, full field list
(color, brand, location, date, time, reporter), the description, a note explaining
why private verification matters, and **possible matches** with a confidence
percentage. Found items offer **Start verification**; lost items offer **I found
this**.

### 4. Possible matches — `docs/screenshots/matches.png`
`matches.html?a=LF-1001&b=LF-1002` compares a lost report against a found report
side by side. A confidence score sits at the top, and a comparison table marks each
field as a match (green) or a miss (red) across name, category, color, brand, city,
area, and date.

### 5. Ownership verification — `docs/screenshots/verification.png`
`verify.html?id=LF-1002` presents the private questions a claimant must answer. The
status stepper shows **Pending → Under Verification → Verified → Returned**. Answers
are scored against the finder's private hints: enough overlap marks the claim
**Verified**; otherwise it is sent to admin review. After verification, both parties
get a **Mark returned** action and safe-handover guidance.

### 6. My reports — `docs/screenshots/dashboard.png`
`dashboard.html` shows summary statistics and two tabs — **Reports I posted** and
**Claims I made** — each with status badges and actions (view, compare, open claim,
delete).

### 7. Admin — `docs/screenshots/admin.png`
`admin.html` gives administrators moderation tools: all reports (remove fake reports,
mark returned), all claims (verify, approve, reject), and a disputes & complaints
list.

### 8. Help & safety — `docs/screenshots/help.png`
`help.html` explains the process, defines each claim status, lists handover safety
tips, and answers common questions.

---

## Suggested demo narration (2–3 minutes)

1. **Home** — "One platform instead of scattered social-media posts."
2. Report a lost item → point out the generated **Report ID** and private hints field.
3. Open a matching **found** item → "View matches".
4. Show the **comparison** and confidence score.
5. **Start verification** → answer questions → status moves to **Verified**.
6. **My Reports** → show the claim's status and history.
7. **Admin** → show how a disputed case or fake report is handled.
8. **Help & safety** → close on trust, privacy, and safe handover.

The full claim lifecycle runs end to end in the browser with no backend.
