# Casa nueva · regalo para Lastras

App con cuatro habitaciones (cocina, salón, baño y dormitorio). En cada una se ven productos reales de IKEA, Leroy Merlin y JYSK. Lastras elige uno, no puede cambiarlo, y le sale en grande con nombre y foto. Hay un tope de precio que solo conoces tú.

## 1. Probarla en el ordenador

Abre `dist/index.html` con el navegador (doble clic). Es la **versión de preparación**: pide el nombre y el tope, te dice cuántos productos caben en cada habitación y te deja probar el recorrido completo como si fueras él. Aquí sí ves la cifra, en una barra negra arriba. Las fotos se cargan desde las webs de las tiendas, así que hace falta internet.

## 2. Generar la versión final con el tope escondido

Necesitas Node 18 o superior.

```
node build.js --budget 150 --name Lastras
```

La carpeta `dist/` queda con la app final. No tiene pantalla de preparación, no muestra la cifra en ningún sitio y filtra todo el catálogo por ese tope. El tope va dentro del código ofuscado: sirve para que tu amigo no lo vea, no para frenar a alguien que desmonte el APK.

## 3. Convertirla en APK

**Opción A, con GitHub (la más directa).**
1. Crea un repositorio **privado** en GitHub y sube esta carpeta.
2. Entra en Actions, elige "Construir APK" y pulsa Run workflow.
3. Escribe el tope y el nombre. Al terminar (unos 5-10 minutos), descarga `casa-nueva-apk` desde Artifacts. Dentro está `app-debug.apk`.
4. Pásalo al móvil de Lastras. Android pedirá permiso para instalar apps de fuera de la tienda.

Este flujo no está probado desde aquí (no tengo el SDK de Android). Si falla algún paso, el log de Actions dice cuál.

**Opción B, con PWABuilder.** Sube la carpeta `dist/` generada en el paso 2 a cualquier alojamiento web (Netlify, GitHub Pages…) y pega la dirección en pwabuilder.com para que te dé el APK.

**Opción C, sin APK.** Con `dist/` alojado, Lastras abre el enlace en el móvil y elige "Añadir a pantalla de inicio". Se comporta como una app.

## 4. Cambiar el catálogo

Los productos están en `src/catalog.js`, uno por línea. Tras editar, vuelve a ejecutar `node build.js` con el tope.

- Los precios son de octubre de 2026 y cambian. Comprueba el precio en la tienda antes de comprar.
- Las fotos se cargan desde la web de cada tienda. Si una no carga, la app enseña un recuadro de color con el nombre.
- Home Depot no existe en España. Leroy Merlin está incluido. Brico Depot no se pudo incluir porque su web no daba enlaces de producto.
- Al elegir, sale un botón para avisar a los amigos por WhatsApp con el producto y el enlace. Así sabéis qué comprar.

## Archivos

- `src/catalog.js`: productos
- `src/app.js`, `src/style.css`: la app
- `build.js`: genera `dist/`
- `capacitor.config.json`, `package.json`, `.github/workflows/apk.yml`: empaquetado a APK

## Fotos de las habitaciones (opcional)
La pantalla de inicio trae ilustraciones propias de cada estancia. Si prefieres fotos reales, mete en la carpeta `fotos/` los archivos `cocina.jpg`, `salon.jpg`, `bano.jpg` y `dormitorio.jpg` (también vale png/webp, mejor apaisadas 4:3 y de menos de 300 KB) y vuelve a ejecutar `node build.js ...`. Se incrustan solas.

## iPhone
Un iPhone no instala APK. Hay dos caminos:

**A) Versión web instalable (recomendada, gratis, sin cuenta de Apple Developer)**
1. En el repositorio: *Settings → Pages → Source: GitHub Actions*. (Pages en repos privados exige plan de pago de GitHub; con repo público funciona gratis, y el tope va cifrado dentro de la página.)
2. *Actions → Publicar versión web → Run workflow*, con presupuesto y nombre.
3. El enlace aparece al terminar el trabajo. Lastras lo abre en **Safari** → Compartir → **Añadir a pantalla de inicio**. Se abre como una app.

**B) .ipa (equivalente al APK)**
*Actions → Construir IPA (iPhone) → Run workflow*. Baja `casa-nueva-ipa`. Es un .ipa **sin firmar**: hay que firmarlo al instalarlo, con AltStore o Sideloadly (Apple ID gratuito, caduca a los 7 días) o con una cuenta de Apple Developer (99 €/año) y TestFlight.
