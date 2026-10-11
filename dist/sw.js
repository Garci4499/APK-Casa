var C="casa-nueva-v1";var A=["./","index.html","manifest.webmanifest","icon.svg"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}))});
