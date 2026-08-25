# KHC Kids — Tienda

Sitio estático (HTML + CSS + JS) de la boutique infantil **KHC Kids**.

## Estructura

```
/
├── khc-kids/          ← el sitio web (index.html, css/, js/, img/)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/data.js, js/app.js
│   ├── img/…
│   ├── logos-khc-kids.html
│   ├── diseno-tienda-khc-kids.html
│   └── *.pdf, *.xlsx, *.svg  (documentos del proyecto)
├── scripts/serve-like-vercel.js   ← simulador local de las reglas de vercel.json
└── vercel.json        ← enrutado para el despliegue
```

No hay build ni dependencias: es HTML/CSS/JS puro.

## Por qué existe `vercel.json`

El sitio vive dentro de la carpeta `khc-kids/`, **no** en la raíz del repositorio.
Sin configuración, Vercel sirve la raíz del repo, no encuentra un `index.html` ahí y
devuelve `404 NOT_FOUND`.

`vercel.json` reescribe las peticiones para que la raíz del dominio muestre
`khc-kids/index.html`:

- `/`                → `/khc-kids/index.html`
- `/css/…`, `/js/…`, `/img/…` → `/khc-kids/css/…`, etc.
- `/khc-kids/…` sigue funcionando igual (URLs canónicas)
- `cleanUrls: true` permite `/logos-khc-kids` sin `.html`

## Despliegue en Vercel

1. Importa este repositorio en Vercel.
2. **Framework Preset:** `Other`.
3. **Build Command:** déjalo vacío.
4. **Output Directory:** déjalo vacío.
5. **Root Directory:** debe quedar en la **raíz del repo** (`.`), *no* en `khc-kids`,
   porque `vercel.json` tiene que estar en la raíz del despliegue para surtir efecto.

Si antes configuraste Root Directory como `khc-kids`, puedes dejarlo así y el sitio
también funcionará; en ese caso `vercel.json` no se aplica (Vercel solo lo lee en la
raíz del despliegue) y las URLs quedarán bajo `/` directamente.

## Prueba local

```bash
node scripts/serve-like-vercel.js
# → http://localhost:4173
```

Este script sirve la raíz del repo y aplica los `rewrites` de `vercel.json` con la
misma semántica (primero archivo real, después rewrite), de modo que reproduce el
comportamiento de Vercel antes de desplegar.

Alternativa rápida sin enrutado (el sitio queda en `/khc-kids/`):

```bash
cd khc-kids && python3 -m http.server 8080
```
