#!/usr/bin/env node
/* Uso:
     node build.js                                  → versión de preparación (sin tope fijo)
     node build.js --budget 150 --name Lastras      → versión final con el tope escondido dentro
   Genera dist/index.html (app web/PWA y base para el APK) y dist/artifact.html (fragmento autocontenido). */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function arg(name, def) {
  const i = args.indexOf('--' + name);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : def;
}

const KEY = 'lastras-regalo-clave'; /* igual que en src/app.js */
function encode(obj) {
  const bytes = Buffer.from(JSON.stringify(obj), 'utf8');
  const k = Buffer.from(KEY, 'utf8');
  const out = Buffer.alloc(bytes.length);
  for (let i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ k[i % k.length];
  return out.toString('base64');
}

const src = (f) => fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
const css = src('style.css');
const catalog = src('catalog.js');
const app = src('app.js');

/* Fotos opcionales de cada estancia: pon fotos/cocina.jpg, salon.jpg, bano.jpg, dormitorio.jpg */
let photosScript = '';
const photos = {};
['cocina', 'salon', 'bano', 'dormitorio'].forEach((id) => {
  ['jpg', 'jpeg', 'png', 'webp'].forEach((ext) => {
    const f = path.join(__dirname, 'fotos', id + '.' + ext);
    if (!photos[id] && fs.existsSync(f)) {
      const mime = ext === 'jpg' ? 'jpeg' : ext;
      photos[id] = 'data:image/' + mime + ';base64,' + fs.readFileSync(f).toString('base64');
    }
  });
});
if (Object.keys(photos).length) {
  photosScript = '<script>window.ROOM_PHOTOS=' + JSON.stringify(photos) + ';</script>\n';
  console.log('Fotos de estancias: ' + Object.keys(photos).join(', '));
}
let giftScript = '';
const budget = arg('budget');
if (budget !== undefined) {
  const b = parseFloat(String(budget).replace(',', '.'));
  if (!(b > 0)) { console.error('El presupuesto debe ser un número mayor que 0'); process.exit(1); }
  const n = arg('name', 'Lastras');
  const r = arg('nonce', Math.random().toString(36).slice(2, 8));
  giftScript = '<script>window.GIFT={t:"' + encode({ b: b, n: n, r: r }) + '"};</script>\n';
  console.log('Versión final: tope ' + b + ' €, nombre ' + n + ', nonce ' + r);
} else {
  console.log('Versión de preparación (sin tope fijo)');
}

const fonts = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Figtree:wght@400;600;700&display=swap">';
const fragment =
  '<title>Casa nueva</title>\n' + fonts + '\n<style>\n' + css + '</style>\n' +
  '<div id="app"></div>\n' + photosScript + giftScript +
  '<script>\n' + catalog + '\n</script>\n<script>\n' + app + '\n</script>\n';

const dist = path.join(__dirname, 'dist');
fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(path.join(dist, 'artifact.html'), fragment);

const full =
  '<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
  '<meta name="theme-color" content="#F5C02B">\n' +
  '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n' +
  '<meta name="apple-mobile-web-app-title" content="Casa nueva">\n<meta name="apple-mobile-web-app-status-bar-style" content="default">\n' +
  '<meta name="referrer" content="no-referrer">\n' +
  '<link rel="manifest" href="manifest.webmanifest">\n<link rel="icon" href="icon.svg" type="image/svg+xml">\n' +
  '<style>html{padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n' +
  '</head>\n<body>\n' + fragment +
  '<script>if("serviceWorker"in navigator&&location.protocol.indexOf("http")===0){navigator.serviceWorker.register("sw.js").catch(function(){});}</script>\n' +
  '</body>\n</html>\n';
fs.writeFileSync(path.join(dist, 'index.html'), full);

fs.writeFileSync(path.join(dist, 'manifest.webmanifest'), JSON.stringify({
  name: 'Casa nueva', short_name: 'Casa nueva', lang: 'es', start_url: './index.html',
  display: 'standalone', background_color: '#ECEFF2', theme_color: '#F5C02B',
  icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }]
}, null, 2));

fs.writeFileSync(path.join(dist, 'icon.svg'),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#F5C02B"/>' +
  '<path d="M256 118 118 236h40v150h196V236h40z" fill="#15202B"/><rect x="226" y="270" width="60" height="116" rx="6" fill="#F5C02B"/>' +
  '<circle cx="270" cy="332" r="6" fill="#15202B"/></svg>');

fs.writeFileSync(path.join(dist, 'sw.js'),
  'var C="casa-nueva-v1";var A=["./","index.html","manifest.webmanifest","icon.svg"];\n' +
  'self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}))});\n' +
  'self.addEventListener("fetch",function(e){if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;' +
  'e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}))});\n');

console.log('Generado en dist/: index.html, artifact.html, manifest.webmanifest, sw.js, icon.svg');
