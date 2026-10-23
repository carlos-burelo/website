# AGENTS.md — website (twwk.cc)

## 1. SSG FIRST (regla no negociable)

Todo es estático y se genera en build. Prohibido: SSR, server islands,
endpoints de runtime, cookies de sesión, `Astro.request/cookies`,
fetch en runtime. Cero JS de servidor en Cloudflare: solo
`[assets] directory="./dist"` en `wrangler.toml`.
Excepción: island interactiva solo si es imposible en CSS + `<script>`
progresivo, y debe degradar a HTML funcional sin JS.

## Stack

Astro 6 (static) + MDX + Tailwind 4 (vía `@tailwindcss/vite`) + sharp.
Deploy: Cloudflare Workers Static Assets. Build: `pnpm run build` → `dist/`.
`pnpm` siempre, nunca npm. `tgrep` para buscar código, no grep/rg.

## Estructura

- `src/pages/`: `index`, `blog/`, `snippets/`, `works/`, `resources/`
- `src/core/components/`: `layout/`, `cards/`, `sections/`, `elements/`, `mdx/`
- `src/core/{libs,constants,icons,theme}/`, `src/content/` (blog, works,
  snippets, `resources.json`), `src/content.config.ts`
- Aliases: `#components/*`, `#libs/*`. Usarlos siempre; prohibido `../../core`.

## Reglas

### Unificar, nunca duplicar

Un solo camino canónico por concepto. Nada de fallback, flags duales,
aliases legacy paralelos ni "por si acaso". Si hay dos formas, borrar la
peor. (Duplicados conocidos: tokens `--primary-color` vs `--t-*`,
`colors.css` vs `main.css @theme`, pre/code en 3 sitios, `:root` vs
`[data-theme=dark]` idénticos.)

### Cero código muerto

Prohibido commitear componentes sin imports, CSS comentado, layouts viejos
en comentarios, assets huérfanos en `public/` (todo lo de `public/` se copia
verbatim a `dist/` y pesa en el deploy). Borrar, no comentar.

### CSS: Tailwind 4 + un solo theme

Todo el diseño vive en `src/core/theme/main.css` (`@theme`, `@layer`,
`@utility`). Prohibido `<style is:global>` disperso en componentes y
prohibido `var(--*-color)` legacy: migrar a tokens `bg-bg-*` etc.
Keyframes van como `--animate-*` del theme.

### JS en cliente: mínimo y robusto

Sin handlers inline (`onclick=`), sin `innerHTML` con datos, sin
`getElementById` fuera de `astro:page-load` (ClientRouter hace swaps sin
re-ejecutar scripts). Búsqueda solo con índice en build-time (Pagefind),
nunca lógica inline con `define:vars`.

### SEO por página, no global genérico

Cada ruta define `title`, `description`, canonical, OG/Twitter y JSON-LD
vía props del layout. Prohibido hardcodear title/description en `root.astro`.
Toda página nueva entra al sitemap; blog genera RSS.

### Contenido

Colecciones con schema estricto (`description`, `tags`, `draft`,
`image: image()`). Imágenes fuente en AVIF/WebP, nunca PNG de MBs.
`alt` descriptivo siempre (prohibido `alt=""` en fotos de contenido),
`datetime` en ISO. `getStaticPaths` + `prerender: true` en toda ruta
dinámica.

### Deploys

`wrangler.toml` es solo assets estáticos. No añadir adapter ni `nodejs_compat`
sin justificación escrita. `public/_headers` debe cubrir todo asset
cacheable (`/_astro/*` immutable 1 año + fonts/imágenes explícitas) y
headers de seguridad globales. Tras cada `git commit`, correr `tgrep index .`.

## Deuda restante (2026-10-22: Astro 7.4.2, UI/ES unificado, hero editorial)

- Sin `og:image`: ningún layout emite imagen OG. Crear `public/og.png` 1200×630
  y cablearlo en `root.astro`.
- `gallery.astro`: los 3 `alt` son iguales ("Foto personal de Carlos Burelo").
  Describir cada foto real.
- Imágenes importadas desde `../../../../public/` (gallery, navbar, footer).
  Mover a `src/assets/` (recomendación Astro; `public/` es para archivos verbatim).
- `blog/next-project-architecture`: campo `category: "Proposal"` fuera del schema
  (zod lo ignora). Decidir: añadir al schema o borrarlo.
- Sin búsqueda (se eliminó `search-bar/modal/cmd`). Si se quiere, solo con índice
  en build-time, nunca lógica inline.
- `logo.svg`: trazos `#2A2A2A` casi invisibles sobre fondo claro en tema light.
  Regenerar logo con `fill="currentColor"` o versión por tema.
- Rutas: `/works` y `/snippets` quedaron en inglés aunque la UI ahora es
  100% español. Decidir: mantener (URLs estables) o migrar con redirects.
- `reveal` (scroll-driven) solo anima en Chromium/Firefox nuevos; Safari y
  fallback muestran contenido estático (diseño aceptable, no bug).

## Comandos

`pnpm dev` · `pnpm build` · `pnpm check` · `pnpm preview`
