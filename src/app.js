(function () {
  'use strict';

  var CATALOG = window.CATALOG || [];
  var ROOMS = [
    { id: 'cocina', name: 'Cocina', sub: 'Para cocinar y comer', color: 'var(--c-cocina)' },
    { id: 'salon', name: 'Salón', sub: 'Para estar y recibir', color: 'var(--c-salon)' },
    { id: 'bano', name: 'Baño', sub: 'Para lavarse y ordenar', color: 'var(--c-bano)' },
    { id: 'dormitorio', name: 'Dormitorio', sub: 'Para descansar', color: 'var(--c-dormitorio)' }
  ];

  /* Ilustraciones de cada estancia (se sustituyen por fotos si hay window.ROOM_PHOTOS) */
  var W = 'rgba(255,255,255,.92)', D = 'rgba(20,28,36,.78)', S = 'rgba(20,28,36,.16)', M = 'rgba(255,255,255,.55)';
  var SCENES = {
    cocina:
      '<rect x="0" y="92" width="160" height="28" fill="' + S + '"/>' +
      '<rect x="8" y="16" width="52" height="28" rx="2" fill="' + W + '"/><rect x="64" y="16" width="52" height="28" rx="2" fill="' + W + '"/>' +
      '<rect x="8" y="58" width="108" height="34" rx="2" fill="' + W + '"/><rect x="8" y="54" width="108" height="6" fill="' + D + '"/>' +
      '<line x1="62" y1="62" x2="62" y2="92" stroke="' + S + '" stroke-width="2"/><circle cx="56" cy="70" r="2" fill="' + D + '"/><circle cx="68" cy="70" r="2" fill="' + D + '"/>' +
      '<rect x="22" y="44" width="22" height="10" rx="2" fill="' + M + '"/><path d="M80 54 q8 -14 16 0z" fill="' + M + '"/>' +
      '<rect x="124" y="30" width="30" height="62" rx="3" fill="' + W + '"/><line x1="124" y1="58" x2="154" y2="58" stroke="' + S + '" stroke-width="2"/><rect x="146" y="38" width="3" height="14" rx="1" fill="' + D + '"/><rect x="146" y="64" width="3" height="18" rx="1" fill="' + D + '"/>',
    salon:
      '<rect x="0" y="94" width="160" height="26" fill="' + S + '"/>' +
      '<rect x="102" y="14" width="44" height="40" rx="2" fill="' + M + '"/><line x1="124" y1="14" x2="124" y2="54" stroke="' + S + '" stroke-width="2"/><line x1="102" y1="34" x2="146" y2="34" stroke="' + S + '" stroke-width="2"/>' +
      '<rect x="14" y="52" width="82" height="30" rx="8" fill="' + W + '"/><rect x="8" y="58" width="16" height="32" rx="6" fill="' + W + '"/><rect x="86" y="58" width="16" height="32" rx="6" fill="' + W + '"/>' +
      '<rect x="22" y="82" width="68" height="10" rx="3" fill="' + W + '"/><rect x="26" y="92" width="4" height="6" fill="' + D + '"/><rect x="82" y="92" width="4" height="6" fill="' + D + '"/>' +
      '<rect x="30" y="58" width="16" height="14" rx="3" fill="' + M + '"/>' +
      '<rect x="112" y="82" width="36" height="5" rx="2" fill="' + W + '"/><rect x="116" y="87" width="3" height="10" fill="' + D + '"/><rect x="141" y="87" width="3" height="10" fill="' + D + '"/>' +
      '<line x1="152" y1="96" x2="152" y2="58" stroke="' + D + '" stroke-width="2"/><path d="M144 58 h16 l-3 -10 h-10z" fill="' + W + '"/>',
    bano:
      '<rect x="0" y="94" width="160" height="26" fill="' + S + '"/>' +
      '<rect x="10" y="50" width="86" height="40" rx="14" fill="' + W + '"/><rect x="6" y="46" width="94" height="8" rx="4" fill="' + W + '"/>' +
      '<rect x="22" y="90" width="4" height="6" fill="' + D + '"/><rect x="80" y="90" width="4" height="6" fill="' + D + '"/>' +
      '<path d="M112 20 v-6 q0 -4 6 -4 h8" fill="none" stroke="' + D + '" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="132" cy="12" r="3" fill="' + D + '"/><path d="M126 30 l-2 10 m6 -8 l0 10 m6 -10 l2 10" stroke="' + M + '" stroke-width="2" stroke-linecap="round"/>' +
      '<rect x="108" y="56" width="42" height="8" rx="3" fill="' + W + '"/><rect x="118" y="64" width="22" height="26" rx="3" fill="' + W + '"/>' +
      '<ellipse cx="80" cy="102" rx="26" ry="5" fill="' + M + '"/>',
    dormitorio:
      '<rect x="0" y="96" width="160" height="24" fill="' + S + '"/>' +
      '<rect x="14" y="30" width="96" height="34" rx="4" fill="' + W + '"/>' +
      '<rect x="10" y="60" width="104" height="26" rx="5" fill="' + W + '"/><rect x="10" y="72" width="104" height="14" rx="3" fill="' + M + '"/>' +
      '<rect x="20" y="48" width="30" height="14" rx="5" fill="' + M + '"/><rect x="56" y="48" width="30" height="14" rx="5" fill="' + M + '"/>' +
      '<rect x="12" y="86" width="5" height="10" fill="' + D + '"/><rect x="107" y="86" width="5" height="10" fill="' + D + '"/>' +
      '<rect x="120" y="68" width="30" height="28" rx="2" fill="' + W + '"/><line x1="120" y1="82" x2="150" y2="82" stroke="' + S + '" stroke-width="2"/>' +
      '<rect x="131" y="73" width="8" height="2" fill="' + D + '"/><rect x="131" y="87" width="8" height="2" fill="' + D + '"/>' +
      '<path d="M128 68 l4 -12 h10 l4 12z" fill="' + M + '"/>' +
      '<rect x="124" y="14" width="26" height="30" rx="2" fill="' + M + '"/>'
  };
  function roomArt(id) {
    var ph = window.ROOM_PHOTOS && window.ROOM_PHOTOS[id];
    if (ph) return '<img class="art-photo" alt="" src="' + ph + '">';
    return '<svg class="art" viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + SCENES[id] + '</svg>';
  }
  var KEY = 'lastras-regalo-clave';
  var CONFETTI = ['#F29A2E', '#3F6FD9', '#2FB39C', '#E5617C', '#F5C02B'];

  /* ───────── código del regalo (lo ve solo quien lo prepara) ───────── */
  function xor(bytes) {
    var k = new TextEncoder().encode(KEY);
    var out = new Uint8Array(bytes.length);
    for (var i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ k[i % k.length];
    return out;
  }
  function encode(obj) {
    var b = xor(new TextEncoder().encode(JSON.stringify(obj)));
    var s = '';
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return btoa(s);
  }
  function decode(token) {
    try {
      var s = atob(token);
      var b = new Uint8Array(s.length);
      for (var i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
      return JSON.parse(new TextDecoder().decode(xor(b)));
    } catch (e) { return null; }
  }

  /* ───────── almacenamiento con respaldo en memoria ───────── */
  var mem = {};
  function store(key, val) {
    if (val === undefined) {
      try { var v = window.localStorage.getItem(key); if (v !== null) return v; } catch (e) {}
      return mem[key] === undefined ? null : mem[key];
    }
    mem[key] = val;
    try {
      if (val === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, val);
    } catch (e) {}
    return val;
  }
  function readJSON(key) {
    var raw = store(key);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  /* ───────── estado ───────── */
  var gift = (window.GIFT && window.GIFT.t) ? decode(window.GIFT.t) : null;
  var isAdmin = !gift;
  var cfg = gift || null;
  var saved = isAdmin ? readJSON('lastras-admin') : null;
  var adminCfg = saved || { n: 'Lastras', b: 150, r: newNonce() };
  var cartKey = 'lastras-cesta-' + (gift ? gift.r : 'admin');
  var doneKey = gift ? 'lastras-lista-' + gift.r : null;
  /* cesta: { idProducto: unidades }  ·  state.n = unidades que se están ajustando en la ficha */
  var state = { view: 'home', room: null, store: 'todas', sel: null, n: 1, confirm: false, done: null };
  var cart = {};

  function cleanCart(raw) {
    var out = {};
    if (raw && typeof raw === 'object') Object.keys(raw).forEach(function (k) {
      var q = parseInt(raw[k], 10);
      if (CATALOG[k] && q > 0) out[k] = q;
    });
    return out;
  }
  cart = cleanCart(readJSON(cartKey));
  function saveCart() { store(cartKey, JSON.stringify(cart)); }

  if (gift) {
    var d = readJSON(doneKey);
    if (d && d.items) {
      var items = cleanCart(d.items);
      if (Object.keys(items).length) { state.done = items; state.view = 'result'; }
    }
  } else {
    state.view = 'setup';
  }

  function newNonce() { return Math.random().toString(36).slice(2, 8); }

  /* ───────── utilidades ───────── */
  var root = document.getElementById('app');
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function money(n) {
    var whole = Math.abs(n - Math.round(n)) < 0.005;
    return n.toLocaleString('es-ES', { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 }) + ' €';
  }
  function budget() { return cfg ? cfg.b : adminCfg.b; }
  /* ───────── cesta y tope (todo en céntimos para no arrastrar decimales) ───────── */
  function cents(n) { return Math.round(n * 100); }
  function spentC() {
    var t = 0;
    Object.keys(cart).forEach(function (k) { t += cents(CATALOG[k].price) * cart[k]; });
    return t;
  }
  function remainingC() { return cents(budget()) - spentC(); }
  function cartCount() {
    var t = 0;
    Object.keys(cart).forEach(function (k) { t += cart[k]; });
    return t;
  }
  /* Cuántas unidades MÁS de este producto caben con lo que queda */
  function fits(p) { return Math.max(0, Math.floor(remainingC() / cents(p.price))); }
  function inCart(p) { return cart[p.id] || 0; }
  function qtyBadge(p, big) {
    var n = fits(p), k = inCart(p), out = '';
    if (n > 1) out += '<span class="qty' + (big ? ' big' : '') + '" title="Con lo que te queda caben ' + n + ' más">×' + n + '</span>';
    if (k > 0) out += '<span class="incart' + (big ? ' big' : '') + '">✓ ' + k + ' en tu lista</span>';
    return out;
  }
  function who() { return (cfg ? cfg.n : adminCfg.n) || 'Lastras'; }
  function roomById(id) { return ROOMS.filter(function (r) { return r.id === id; })[0]; }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function shuffled(arr, seed) {
    var a = arr.slice(), r = rng(seed);
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function inRoom(roomId, max) {
    return CATALOG.filter(function (p) { return p.room === roomId && p.price <= max; });
  }
  function imgSources(p, size) {
    if (p.store === 'IKEA') {
      return size === 'l' ? [p.img + '?f=l', p.img + '?f=m', p.img + '?f=xxs'] : [p.img + '?f=m', p.img + '?f=xxs'];
    }
    return [p.img];
  }
  function imgTag(p, size) {
    return '<img src="' + esc(imgSources(p, size)[0]) + '" alt="' + esc(p.model + ' ' + p.desc) +
      '" loading="lazy" referrerpolicy="no-referrer" data-id="' + p.id + '" data-size="' + size + '" data-n="0">';
  }
  function toast(msg) {
    var old = document.querySelector('.toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2200);
  }
  function copyText(text) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      ta.remove();
      toast(ok ? 'Copiado' : 'No se pudo copiar. Selecciónalo y cópialo a mano');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('Copiado'); }, fallback);
    } else fallback();
  }

  /* ───────── vistas ───────── */
  function previewBar() {
    if (!isAdmin || state.view === 'setup') return '';
    return '<div class="preview-bar"><span>Vista previa · tope ' + esc(money(adminCfg.b)) +
      '</span><button type="button" data-act="setup">Volver a preparar</button></div>';
  }

  function viewSetup() {
    var token = encode({ b: adminCfg.b, n: adminCfg.n, r: adminCfg.r });
    var rows = ROOMS.map(function (r) {
      return '<li><span class="dot" style="--sw:' + r.color + '"></span>' + esc(r.name) +
        ': <strong data-count="' + r.id + '">' + inRoom(r.id, adminCfg.b).length + '</strong> / ' +
        CATALOG.filter(function (p) { return p.room === r.id; }).length + '</li>';
    }).join('');
    return '<main class="app setup">' +
      '<header class="hello"><p class="kicker">Solo para ti</p><h1>Prepara el regalo</h1>' +
      '<p class="lead">Elige el tope de precio. Lastras solo verá productos de ese precio o menos y nunca verá la cifra.</p></header>' +
      '<form class="panel" id="setup-form" autocomplete="off">' +
      '<div class="field"><label for="f-name">Nombre de tu amigo</label><input id="f-name" type="text" maxlength="30" value="' + esc(adminCfg.n) + '"></div>' +
      '<div class="field"><label for="f-budget">Presupuesto máximo (€)</label><input id="f-budget" type="number" inputmode="decimal" min="1" step="1" value="' + esc(adminCfg.b) + '">' +
      '<p class="hint">Productos que caben en cada habitación con este tope:</p><ul class="cover" id="cover">' + rows + '</ul></div>' +
      '<button class="btn primary" type="submit">Probar como ' + esc(adminCfg.n) + '</button>' +
      '</form>' +
      '<section class="panel"><h2 style="font-size:1.2rem">Dejarlo fijo antes de enviarlo</h2>' +
      '<p class="hint">Esta pantalla de preparación solo aparece cuando la app no lleva un código. Para la versión que recibirá ' + esc(adminCfg.n) + ', genera la app con este código y no podrá cambiar el tope ni verlo.</p>' +
      '<div class="code" id="token-box">' + esc(token) + '</div>' +
      '<button class="btn quiet" type="button" data-act="copy-token">Copiar código</button></section>' +
      '</main>';
  }

  function viewHome() {
    var chips = ROOMS.map(function (r) {
      return '<button class="chip" type="button" data-act="room" data-room="' + r.id + '">' +
        '<span class="swatch" style="--sw:' + r.color + '">' + roomArt(r.id) + '</span>' +
        '<span class="strip"><span class="name">' + esc(r.name) + '</span><span class="sub">' + esc(r.sub) + '</span></span></button>';
    }).join('');
    return previewBar() + '<main class="app">' +
      '<header class="hello"><p class="kicker">Casa nueva</p>' +
      '<h1>Buenas, <span class="who">' + esc(who()) + '</span>. ¿Qué necesitas para tu casa?</h1>' +
      '<p class="lead">Tus amigos te regalan cosas para la casa. Entra en una habitación y ve añadiendo a tu lista lo que más falta te haga. El <b>×</b> de cada producto te dice cuántos te caben todavía. Cuando termines la lista, ya no se puede cambiar.</p></header>' +
      '<div class="chips">' + chips + '</div></main>' + cartBar();
  }

  function viewRoom() {
    var room = roomById(state.room);
    var all = shuffled(CATALOG.filter(function (p) { return p.room === room.id; }), hash(room.id))
      .filter(function (p) { return inCart(p) > 0 || fits(p) >= 1; });
    var stores = [];
    all.forEach(function (p) { if (stores.indexOf(p.store) < 0) stores.push(p.store); });
    if (state.store !== 'todas' && stores.indexOf(state.store) < 0) state.store = 'todas';
    var items = state.store === 'todas' ? all : all.filter(function (p) { return p.store === state.store; });

    var filters = '';
    if (stores.length > 1) {
      filters = '<div class="filters" role="group" aria-label="Filtrar por tienda">' +
        ['todas'].concat(stores).map(function (s) {
          return '<button type="button" data-act="store" data-store="' + esc(s) + '" aria-pressed="' + (state.store === s) + '">' +
            (s === 'todas' ? 'Todas las tiendas' : esc(s)) + '</button>';
        }).join('') + '</div>';
    }
    var cards = items.map(function (p) {
      return '<button class="card' + (inCart(p) ? ' has' : '') + '" type="button" data-act="open" data-id="' + p.id + '">' +
        '<span class="photo">' + imgTag(p, 'm') + qtyBadge(p) + '</span>' +
        '<span class="meta"><span class="model">' + esc(p.model) + '</span><span class="desc">' + esc(p.desc) +
        '</span><span class="store">' + esc(p.store) + '</span></span></button>';
    }).join('');
    return previewBar() + '<main class="app">' +
      '<div class="bar"><button class="back" type="button" data-act="home">← Habitaciones</button>' +
      '<div class="room-title"><span class="dot" style="--sw:' + room.color + '"></span><h2>' + esc(room.name) + '</h2></div></div>' +
      filters +
      (items.length ? '<div class="grid">' + cards + '</div>' : '<p class="empty">Con lo que te queda ya no cabe nada más aquí. Mira tu lista u otra habitación.</p>') +
      '</main>' + cartBar() + sheet();
  }

  function cartBar() {
    var n = cartCount();
    if (!n || state.sel !== null) return '';
    var total = cents(budget()) || 1;
    var pct = Math.min(100, Math.round(spentC() / total * 100));
    return '<div class="cartbar"><div class="cb-info"><strong>Tu lista · ' + n + (n === 1 ? ' cosa' : ' cosas') + '</strong>' +
      '<span class="meter" aria-hidden="true"><i style="width:' + pct + '%"></i></span></div>' +
      '<button class="btn primary" type="button" data-act="list">Ver lista</button></div>';
  }

  function sheet() {
    if (state.sel === null) return '';
    var p = CATALOG[state.sel], k = inCart(p), max = k + fits(p);
    var n = Math.min(Math.max(state.n, 0), max);
    return '<div class="scrim" data-act="close-sheet"><div class="sheet" role="dialog" aria-modal="true" aria-label="' + esc(p.model) + '">' +
      '<span class="photo">' + imgTag(p, 'l') + (max > 1 ? '<span class="qty big">×' + max + '</span>' : '') + '</span>' +
      '<div><p class="store">' + esc(p.store) + '</p><h3>' + esc(p.model) + '</h3><p class="desc">' + esc(p.desc) + '</p>' + '</div>' +
      '<div class="stepper" role="group" aria-label="Unidades"><button type="button" data-act="step" data-d="-1" aria-label="Una menos"' + (n <= 0 ? ' disabled' : '') + '>−</button>' +
      '<output aria-live="polite">' + n + '</output>' +
      '<button type="button" data-act="step" data-d="1" aria-label="Una más"' + (n >= max ? ' disabled' : '') + '>+</button></div>' +
      '<p class="qty-note">' + (max > 1 ? 'Con lo que te queda te caben <b>' + max + '</b> de estos.' : 'Es lo último que te cabe de este producto.') + '</p>' +
      '<div class="actions"><button class="btn primary" type="button" data-act="save-item" data-id="' + p.id + '">' +
      (n === 0 ? (k ? 'Quitar de mi lista' : 'Cerrar') : (k ? 'Actualizar mi lista' : 'Añadir a mi lista')) + '</button>' +
      '<button class="btn quiet" type="button" data-act="close-sheet-btn">Seguir mirando</button></div></div></div>';
  }

  function ids() { return Object.keys(cart).map(Number).sort(function (a, b) { return a - b; }); }

  function lineHtml(p, q, opts) {
    return '<li class="line"><span class="photo">' + imgTag(p, 'm') + '</span>' +
      '<span class="lmeta"><span class="model">' + esc(p.model) + '</span><span class="desc">' + esc(p.desc) + '</span>' +
      '<span class="store">' + esc(p.store) + '</span></span>' +
      (opts.edit
        ? '<span class="stepper small"><button type="button" data-act="lstep" data-id="' + p.id + '" data-d="-1" aria-label="Una menos">−</button><output>' + q + '</output>' +
          '<button type="button" data-act="lstep" data-id="' + p.id + '" data-d="1" aria-label="Una más"' + (fits(p) < 1 ? ' disabled' : '') + '>+</button></span>'
        : '<span class="lq">×' + q + '</span>') +
      (opts.link ? '<a class="lnk" target="_blank" rel="noopener" href="' + esc(p.url) + '">Ver en la tienda</a>' : '') + '</li>';
  }

  function viewList() {
    var list = ids();
    var body = list.length
      ? '<ul class="lines">' + list.map(function (id) { return lineHtml(CATALOG[id], cart[id], { edit: true }); }).join('') + '</ul>'
      : '<p class="empty">Tu lista está vacía. Entra en una habitación y añade lo que te haga falta.</p>';
    var actions = '<div class="actions"><button class="btn quiet" type="button" data-act="home">Seguir mirando</button>' +
      (list.length ? (state.confirm
        ? '<p class="warn">Al terminar la lista ya no se puede cambiar. ¿Seguro?</p>' +
          '<button class="btn primary" type="button" data-act="finish-yes">Sí, terminar mi lista</button>' +
          '<button class="btn quiet" type="button" data-act="finish-no">Todavía no</button>'
        : '<button class="btn primary" type="button" data-act="finish">Terminar mi lista</button>') : '') + '</div>';
    return previewBar() + '<main class="app listview"><div class="bar"><button class="back" type="button" data-act="home">← Habitaciones</button>' +
      '<div class="room-title"><h2>Tu lista</h2></div></div>' + body + actions + '</main>';
  }

  function shareText(items) {
    var parts = Object.keys(items).map(Number).sort(function (a, b) { return a - b; }).map(function (id) {
      var p = CATALOG[id], q = items[id];
      return '- ' + (q > 1 ? q + ' × ' : '') + p.model + ' (' + p.desc + '), ' + p.store + ': ' + p.url;
    });
    return who() + ' ha elegido para su casa nueva:\n' + parts.join('\n');
  }

  function viewResult() {
    var items = state.done;
    var list = Object.keys(items).map(Number).sort(function (a, b) { return a - b; });
    return previewBar() + '<main class="app result">' +
      '<p class="kicker">Has elegido</p><h1>Tu lista de la casa nueva</h1>' +
      '<ul class="lines">' + list.map(function (id) { return lineHtml(CATALOG[id], items[id], { link: true }); }).join('') + '</ul>' +
      '<div class="actions">' +
      '<a class="btn primary" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(shareText(items)) + '">Avisar a los amigos por WhatsApp</a>' +
      '<button class="btn" type="button" data-act="copy-msg">Copiar la lista</button>' +
      (isAdmin ? '<button class="btn quiet" type="button" data-act="again">Probar otra vez</button>' : '') +
      '</div></main>';
  }

  function render() {
    var html = state.view === 'setup' ? viewSetup()
      : state.view === 'home' ? viewHome()
      : state.view === 'room' ? viewRoom()
      : state.view === 'list' ? viewList()
      : viewResult();
    root.innerHTML = html;
    if (state.view !== 'room' || state.sel === null) window.scrollTo(0, 0);
  }

  function confetti() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var box = document.createElement('div');
    box.className = 'confetti'; box.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 70; i++) {
      var s = document.createElement('i');
      s.style.left = (Math.random() * 100) + '%';
      s.style.setProperty('--cc', CONFETTI[i % CONFETTI.length]);
      s.style.setProperty('--d', (1.8 + Math.random() * 1.6) + 's');
      s.style.setProperty('--delay', (Math.random() * 0.6) + 's');
      s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      s.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 4200);
  }

  /* ───────── eventos ───────── */
  function readForm() {
    var n = document.getElementById('f-name').value.trim() || 'Lastras';
    var b = parseFloat(String(document.getElementById('f-budget').value).replace(',', '.'));
    if (!(b > 0)) b = adminCfg.b;
    return { n: n, b: Math.round(b * 100) / 100, r: adminCfg.r };
  }
  function saveAdmin() { store('lastras-admin', JSON.stringify(adminCfg)); }

  root.addEventListener('input', function (e) {
    if (state.view !== 'setup') return;
    if (e.target.id !== 'f-budget' && e.target.id !== 'f-name') return;
    var f = readForm();
    ROOMS.forEach(function (r) {
      var el = root.querySelector('[data-count="' + r.id + '"]');
      if (el) el.textContent = inRoom(r.id, f.b).length;
    });
    var box = document.getElementById('token-box');
    if (box) box.textContent = encode(f);
  });

  root.addEventListener('submit', function (e) {
    e.preventDefault();
    if (state.view !== 'setup') return;
    adminCfg = readForm(); saveAdmin(); cart = {}; saveCart();
    state.view = 'home'; state.done = null; state.sel = null;
    render();
  });

  root.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');
    if (act === 'close-sheet' && e.target !== el) return; /* clic dentro de la hoja */
    if (act === 'room') { state.room = el.getAttribute('data-room'); state.store = 'todas'; state.view = 'room'; render(); }
    else if (act === 'home') { state.view = 'home'; state.sel = null; render(); }
    else if (act === 'store') { state.store = el.getAttribute('data-store'); render(); }
    else if (act === 'open') {
      state.sel = parseInt(el.getAttribute('data-id'), 10);
      var q0 = inCart(CATALOG[state.sel]);
      state.n = q0 || 1;
      render();
    }
    else if (act === 'close-sheet' || act === 'close-sheet-btn') { state.sel = null; render(); }
    else if (act === 'step') {
      var pp = CATALOG[state.sel], mx = inCart(pp) + fits(pp);
      state.n = Math.min(mx, Math.max(0, state.n + parseInt(el.getAttribute('data-d'), 10)));
      render();
    }
    else if (act === 'save-item') {
      var sp = CATALOG[parseInt(el.getAttribute('data-id'), 10)], cap = inCart(sp) + fits(sp);
      var nn = Math.min(cap, Math.max(0, state.n));
      if (nn > 0) cart[sp.id] = nn; else delete cart[sp.id];
      saveCart(); state.sel = null; render();
    }
    else if (act === 'list') { state.view = 'list'; state.confirm = false; render(); }
    else if (act === 'lstep') {
      var lp = CATALOG[parseInt(el.getAttribute('data-id'), 10)], d = parseInt(el.getAttribute('data-d'), 10);
      var next = inCart(lp) + d;
      if (d > 0 && fits(lp) < 1) return;
      if (next > 0) cart[lp.id] = next; else delete cart[lp.id];
      saveCart(); state.confirm = false; render();
    }
    else if (act === 'finish') { state.confirm = true; render(); }
    else if (act === 'finish-no') { state.confirm = false; render(); }
    else if (act === 'finish-yes') {
      if (!cartCount()) return;
      state.done = JSON.parse(JSON.stringify(cart)); state.view = 'result'; state.confirm = false;
      if (gift) store(doneKey, JSON.stringify({ items: state.done }));
      render(); confetti();
    }
    else if (act === 'copy-msg') { copyText(shareText(state.done)); }
    else if (act === 'again') { cart = {}; saveCart(); state.done = null; state.view = 'home'; render(); }
    else if (act === 'setup') { state.view = 'setup'; state.sel = null; render(); }
    else if (act === 'copy-token') { copyText(encode(readForm())); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && state.sel !== null) { state.sel = null; render(); }
  });

  /* imágenes: probar tamaños alternativos y, si falla, mostrar un recuadro con el nombre */
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG') return;
    var p = CATALOG[parseInt(img.getAttribute('data-id'), 10)];
    if (!p) return;
    var n = parseInt(img.getAttribute('data-n'), 10) + 1;
    var list = imgSources(p, img.getAttribute('data-size'));
    if (n < list.length) { img.setAttribute('data-n', n); img.src = list[n]; return; }
    var ph = document.createElement('span');
    ph.className = 'ph';
    var room = roomById(p.room);
    ph.style.setProperty('--ph', room ? room.color : 'var(--photo-bg)');
    ph.textContent = p.model;
    img.replaceWith(ph);
  }, true);

  render();
})();
