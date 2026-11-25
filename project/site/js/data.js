/* ============================================================
   Lost & Found — Citywide : data layer (mock, localStorage)
   ============================================================ */
(function () {
  'use strict';

  var KEYS = {
    items: 'lf_items',
    claims: 'lf_claims',
    user: 'lf_user',
    notifications: 'lf_notifications',
    seeded: 'lf_seeded'
  };

  var CATEGORIES = [
    'Phone', 'Wallet', 'Bag', 'Documents', 'Keys',
    'Laptop', 'ID Card', 'Jewelry', 'Headphones', 'Other'
  ];

  var SEED_ITEMS = [
    {
      id: 'LF-1001', type: 'lost', name: 'Black Samsung Phone', category: 'Phone',
      emoji: '\u{1F4F1}', color: 'Black', brand: 'Samsung',
      city: 'Karachi', area: 'Clifton', location: 'Clifton Beach Road',
      date: '2026-08-20', time: '18:30',
      description: 'Black Samsung Galaxy S23 with matte case. Left on restaurant table near the beach.',
      keywords: 'phone samsung galaxy black matte case',
      hints: ['Small scratch on the top-left back corner', 'Wallpaper is a photo of a mountain at sunset', 'Case has a moon and stars pattern'],
      owner: 'Ali Raza', createdAt: '2026-08-20', status: 'open'
    },
    {
      id: 'LF-1002', type: 'found', name: 'Black Samsung Phone', category: 'Phone',
      emoji: '\u{1F4F1}', color: 'Black', brand: 'Samsung',
      city: 'Karachi', area: 'Clifton', location: 'Clifton Beach Road, parking area',
      date: '2026-08-20', time: '19:15',
      description: 'Found a black Samsung phone under a bench near the parking area. Phone is locked.',
      keywords: 'phone samsung galaxy black found bench parking',
      hints: ['Scratch on top-left back corner', 'Lock screen shows a mountain wallpaper', 'Matte black case'],
      owner: 'Sara Khan', createdAt: '2026-08-20', status: 'open'
    },
    {
      id: 'LF-1003', type: 'lost', name: 'Brown Leather Wallet', category: 'Wallet',
      emoji: '\u{1F45B}', color: 'Brown', brand: 'Handmade',
      city: 'Karachi', area: 'Gulshan', location: 'Gulshan-e-Iqbal Block 13',
      date: '2026-09-02', time: '14:00',
      description: 'Brown leather wallet with CNIC, student card, and some cash. Lost somewhere between bus stop and bank.',
      keywords: 'wallet brown leather cnic cards cash',
      hints: ['Wallet has a small keychain loop on the right side', 'Inside flap written "A.R." in pen', 'Contains a library card expiring 2027'],
      owner: 'Ali Raza', createdAt: '2026-09-02', status: 'open'
    },
    {
      id: 'LF-1004', type: 'found', name: 'Brown Leather Wallet', category: 'Wallet',
      emoji: '\u{1F45B}', color: 'Brown', brand: 'Handmade',
      city: 'Karachi', area: 'Gulshan', location: 'Gulshan-e-Iqbal, near Masjid road',
      date: '2026-09-03', time: '09:45',
      description: 'Found a brown leather wallet near the mosque entrance. Handed to shopkeeper pending owner.',
      keywords: 'wallet brown leather found mosque',
      hints: ['Keychain loop on right side', 'Ink marking inside flap', 'Has a library card'],
      owner: 'Imran Sheikh', createdAt: '2026-09-03', status: 'open'
    },
    {
      id: 'LF-1005', type: 'lost', name: 'Blue Backpack', category: 'Bag',
      emoji: '\u{1F392}', color: 'Blue', brand: 'Wildcraft',
      city: 'Karachi', area: 'University Road', location: 'NED University campus',
      date: '2026-09-10', time: '16:00',
      description: 'Blue Wildcraft backpack with laptop, charger, notebooks. Left in library study hall.',
      keywords: 'bag backpack blue wildcraft laptop library',
      hints: ['White enamel pin of a rocket on front pocket', 'Left strap has a tear repaired with tape', 'Contains a red notebook with physics notes'],
      owner: 'Hina Malik', createdAt: '2026-09-10', status: 'open'
    },
    {
      id: 'LF-1006', type: 'found', name: 'Blue Backpack', category: 'Bag',
      emoji: '\u{1F392}', color: 'Blue', brand: 'Wildcraft',
      city: 'Karachi', area: 'University Road', location: 'NED University, main gate',
      date: '2026-09-11', time: '10:00',
      description: 'Blue backpack found at main gate security. Laptop and notebooks inside.',
      keywords: 'bag backpack blue wildcraft found gate security',
      hints: ['Rocket pin on front pocket', 'Damaged left strap', 'Red notebook inside'],
      owner: 'Campus Security', createdAt: '2026-09-11', status: 'open'
    },
    {
      id: 'LF-1007', type: 'lost', name: 'Set of House Keys', category: 'Keys',
      emoji: '\u{1F511}', color: 'Silver', brand: 'Other',
      city: 'Karachi', area: 'DHA', location: 'DHA Phase 5, park',
      date: '2026-09-14', time: '19:30',
      description: 'Three keys on a blue carabiner with a small football keychain.',
      keywords: 'keys silver carabiner football keychain dha park',
      hints: ['Football keychain is red and white', 'One key has yellow paint mark', 'Carabiner is scratched'],
      owner: 'Faisal Ahmed', createdAt: '2026-09-14', status: 'open'
    },
    {
      id: 'LF-1008', type: 'lost', name: 'Student ID Card', category: 'ID Card',
      emoji: '\u{1F4C4}', color: 'White', brand: 'University',
      city: 'Karachi', area: 'Gulshan', location: ' cafeteria counter',
      date: '2026-09-15', time: '13:15',
      description: 'University student ID card in a transparent sleeve. Name: Hina Malik.',
      keywords: 'id card student university white hina',
      hints: ['Sleeve has a coffee stain on corner', 'Card photo shows a blue dupatta'],
      owner: 'Hina Malik', createdAt: '2026-09-15', status: 'open'
    },
    {
      id: 'LF-1009', type: 'found', name: 'Silver Watch', category: 'Jewelry',
      emoji: '\u{1F452}', color: 'Silver', brand: 'Casio',
      city: 'Karachi', area: 'Saddar', location: 'Saddar Bazaar, tea stall',
      date: '2026-09-18', time: '17:00',
      description: 'Silver Casio digital watch found on the counter at a tea stall in Saddar.',
      keywords: 'watch silver casio digital saddar found',
      hints: ['Back cover engraved with initials "M.A."', 'Strap has been shortened by two links', 'Display shows time zone set to Karachi'],
      owner: 'Tea Stall Owner', createdAt: '2026-09-18', status: 'open'
    },
    {
      id: 'LF-1010', type: 'lost', name: 'Laptop Charger', category: 'Laptop',
      emoji: '\u{1F50C}', color: 'Black', brand: 'Dell',
      city: 'Karachi', area: 'I.I. Chundrigar', location: 'Office tower lobby',
      date: '2026-09-21', time: '20:00',
      description: 'Dell 65W laptop charger with tangled cable, left in meeting room.',
      keywords: 'charger dell laptop black power adapter',
      hints: ['Cable wrapped with white tape near plug', 'Sticker of a cartoon cat on adapter body'],
      owner: 'Usman Tariq', createdAt: '2026-09-21', status: 'open'
    },
    {
      id: 'LF-1011', type: 'found', name: 'Black Headphones', category: 'Headphones',
      emoji: '\u{1F3A7}', color: 'Black', brand: 'Sony',
      city: 'Karachi', area: 'Airport', location: 'Jinnah Terminal, Gate 3 seating',
      date: '2026-09-23', time: '22:40',
      description: 'Black Sony over-ear headphones in a soft pouch, found at airport seating area.',
      keywords: 'headphones black sony airport found pouch',
      hints: ['Left ear cushion has a small tear', 'Pouch has boarding pass stub from 2025', 'Cable tie is a green rubber band'],
      owner: 'Airport Staff', createdAt: '2026-09-23', status: 'open'
    },
    {
      id: 'LF-1012', type: 'lost', name: 'Prescription Glasses', category: 'Other',
      emoji: '\u{1F453}', color: 'Black', brand: 'Ray-Ban',
      city: 'Karachi', area: 'Clifton', location: 'Clifton shopping area',
      date: '2026-09-25', time: '12:00',
      description: 'Black rectangular prescription glasses in a red hard case.',
      keywords: 'glasses black ray-ban spectacles red case clifton',
      hints: ['Right temple arm slightly bent', 'Case has a sticker of a smiley face', 'Lens has tiny chip on bottom edge'],
      owner: 'Nadia Iqbal', createdAt: '2026-09-25', status: 'open'
    }
  ];

  var SEED_CLAIMS = [
    {
      id: 'CLM-501', itemId: 'LF-1002', claimant: 'Ali Raza',
      status: 'verified',
      answers: ['scratch top-left back corner', 'mountain sunset', 'moon stars'],
      createdAt: '2026-08-21', updatedAt: '2026-08-22'
    },
    {
      id: 'CLM-502', itemId: 'LF-1004', claimant: 'Ali Raza',
      status: 'under-verification',
      answers: ['keychain loop', 'A.R.', 'library card'],
      createdAt: '2026-09-04', updatedAt: '2026-09-05'
    },
    {
      id: 'CLM-503', itemId: 'LF-1006', claimant: 'Hina Malik',
      status: 'pending',
      answers: ['', '', ''],
      createdAt: '2026-09-11', updatedAt: '2026-09-11'
    },
    {
      id: 'CLM-504', itemId: 'LF-1009', claimant: 'Unknown User',
      status: 'rejected',
      answers: ['wrong answer', 'wrong answer', 'wrong answer'],
      createdAt: '2026-09-19', updatedAt: '2026-09-20'
    }
  ];

  var SEED_NOTIFICATIONS = [
    { id: 'N1', kind: 'success', title: 'Claim verified', body: 'Your claim CLM-501 for LF-1002 is verified. Arrange safe handover.', time: '2026-08-22 11:20', unread: true },
    { id: 'N2', kind: 'info', title: 'Possible match found', body: 'Lost report LF-1003 may match found report LF-1004.', time: '2026-09-03 10:05', unread: true },
    { id: 'N3', kind: 'info', title: 'New message', body: 'Sara Khan sent you a message about LF-1002.', time: '2026-08-22 12:40', unread: false },
    { id: 'N4', kind: 'warn', title: 'Claim rejected', body: 'Claim CLM-504 did not pass verification. Admin can review on request.', time: '2026-09-20 15:00', unread: false },
    { id: 'N5', kind: 'success', title: 'Item returned', body: 'LF-1002 marked Returned Successfully by both parties.', time: '2026-08-24 17:30', unread: false }
  ];

  var SEED_THREADS = [
    {
      id: 'T1', with: 'Sara Khan', about: 'LF-1002',
      messages: [
        { from: 'them', who: 'Sara Khan', text: 'Hello, I saw your lost report for the Samsung phone. I think I found it.', time: '10:02' },
        { from: 'me', who: 'You', text: 'Thank you! Can you tell me anything about the phone case?', time: '10:05' },
        { from: 'them', who: 'Sara Khan', text: 'Please use the verification page for private details — safer for both of us.', time: '10:06' },
        { from: 'me', who: 'You', text: 'Agreed. Verification passed, let us meet at the Clifton Starbucks this evening.', time: '10:12' }
      ]
    },
    {
      id: 'T2', with: 'Imran Sheikh', about: 'LF-1004',
      messages: [
        { from: 'them', who: 'Imran Sheikh', text: 'I have your wallet. Nothing missing as far as I can tell.', time: '09:50' },
        { from: 'me', who: 'You', text: 'That is a relief. I am starting the verification now.', time: '09:55' }
      ]
    },
    {
      id: 'T3', with: 'Campus Security', about: 'LF-1006',
      messages: [
        { from: 'them', who: 'Campus Security', text: 'Backpack is safe with us. Bring your student ID to collect.', time: '11:15' }
      ]
    }
  ];

  /* ---------- storage helpers ---------- */

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* storage full or blocked — prototype still works in-memory */ }
  }

  function seed() {
    if (localStorage.getItem(KEYS.seeded)) return;
    write(KEYS.items, SEED_ITEMS);
    write(KEYS.claims, SEED_CLAIMS);
    write(KEYS.notifications, SEED_NOTIFICATIONS);
    localStorage.setItem(KEYS.seeded, '1');
  }

  function getItems() { seed(); return read(KEYS.items, []); }
  function saveItems(items) { write(KEYS.items, items); }
  function getItem(id) {
    return getItems().filter(function (it) { return it.id === id; })[0] || null;
  }
  function addItem(item) {
    var items = getItems();
    items.unshift(item);
    saveItems(items);
    return item;
  }
  function updateItem(id, patch) {
    var items = getItems();
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        for (var k in patch) items[i][k] = patch[k];
        break;
      }
    }
    saveItems(items);
  }
  function removeItem(id) {
    saveItems(getItems().filter(function (it) { return it.id !== id; }));
    saveClaims(getClaims().filter(function (c) { return c.itemId !== id; }));
  }

  function getClaims() { seed(); return read(KEYS.claims, []); }
  function saveClaims(claims) { write(KEYS.claims, claims); }
  function getClaim(id) {
    return getClaims().filter(function (c) { return c.id === id; })[0] || null;
  }
  function getClaimsFor(itemId) {
    return getClaims().filter(function (c) { return c.itemId === itemId; });
  }
  function addClaim(claim) {
    var claims = getClaims();
    claims.unshift(claim);
    saveClaims(claims);
    return claim;
  }
  function updateClaim(id, patch) {
    var claims = getClaims();
    for (var i = 0; i < claims.length; i++) {
      if (claims[i].id === id) {
        for (var k in patch) claims[i][k] = patch[k];
        claims[i].updatedAt = today();
        break;
      }
    }
    saveClaims(claims);
  }

  function getNotifications() { seed(); return read(KEYS.notifications, []); }
  function saveNotifications(list) { write(KEYS.notifications, list); }

  function getThreads() { seed(); return read('lf_threads', SEED_THREADS); }
  function saveThreads(list) { write('lf_threads', list); }

  function getUser() { return read(KEYS.user, null); }
  function setUser(u) { write(KEYS.user, u); }
  function clearUser() { try { localStorage.removeItem(KEYS.user); } catch (e) {} }

  function nextId(prefix, list, field) {
    var max = 1000;
    list.forEach(function (x) {
      var n = parseInt(String(x[field]).replace(/\D/g, ''), 10);
      if (!isNaN(n) && n > max) max = n;
    });
    return prefix + '-' + (max + 1);
  }

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  window.LF = {
    KEYS: KEYS,
    CATEGORIES: CATEGORIES,
    getItems: getItems,
    saveItems: saveItems,
    getItem: getItem,
    addItem: addItem,
    updateItem: updateItem,
    removeItem: removeItem,
    getClaims: getClaims,
    saveClaims: saveClaims,
    getClaim: getClaim,
    getClaimsFor: getClaimsFor,
    addClaim: addClaim,
    updateClaim: updateClaim,
    getNotifications: getNotifications,
    saveNotifications: saveNotifications,
    getThreads: getThreads,
    saveThreads: saveThreads,
    getUser: getUser,
    setUser: setUser,
    clearUser: clearUser,
    nextId: nextId,
    today: today,
    seed: seed
  };
})();
