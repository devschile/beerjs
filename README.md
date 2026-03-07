# BeerJS Santiago 🍻

Landing page estática de la comunidad `BeerJS Santiago`.

- Sitio web: [beerjs.cl](https://www.beerjs.cl/)
- Repositorio: [github.com/devschile/beerjs](https://github.com/devschile/beerjs)

## Stack

- HTML5 con Tailwind CSS v3 via CDN (sin build step)
- Material Symbols (Google Fonts) para iconografía
- IBM Plex Mono y Public Sans como tipografías
- Netlify Forms para el formulario de suscripción (con honeypot y envío via fetch)
- browser-sync para desarrollo local con livereload

## Estructura

```
public/          # directorio publicado en Netlify
  index.html
  assets/
    css/styles.css
    js/tailwind.config.js
    js/newsletter.js
    img/favicon.svg
netlify.toml
package.json
```

## Desarrollo

```bash
npm install
npm run dev
```

Abre el navegador en `http://localhost:3000` y recarga automáticamente al guardar cambios en `public/`.

## Deploy

El proyecto se despliega en Netlify directamente desde el directorio `public/`. No requiere proceso de build.

## Licencia

MIT
