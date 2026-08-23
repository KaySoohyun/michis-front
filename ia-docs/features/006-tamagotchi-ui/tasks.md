# 006 · UI Tamagotchi Pixel Art — Tareas

## Etapa 1 — Fundamentos visuales

- [x] Cargar las 5 fuentes (VT323, Kode Mono, Quantico, Chakra Petch, WDXL Lubrifont JP N) en `index.html`
- [x] Tokens `--font-display` / `--font-body` intercambiables en `styles.css`
- [x] Utilidades pixel: `.pixel-frame`, `image-rendering: pixelated`
- [x] Starfield v2: base estática + 2 capas titilantes con fases distintas

## Etapa 2 — Shell nuevo

- [x] `profile-card` component (avatar preseleccionado, nombre, email, monedas, logout)
- [x] `nav-rail` component (michis, tienda, inventario, trivia, generar; dock en mobile)
- [x] `shell.component.ts`: sin navbar; rail + perfil solo en rutas autenticadas

## Etapa 3 — Consola (`/cat/:id`)

- [x] `console-frame` (marco pixel)
- [x] `console-top-bar` (fecha, nombre, hora vía servicio de reloj)
- [x] `status-panel` (4 barras de 5 celdas; HAPPY con corazones)
- [x] `level-badge` (LV desde birthDate + EXP decorativa)
- [x] `dialog-box` (mensajes random según estado, español)
- [x] `action-bar` (alimentar/limpiar/dormir/jugar → CatService)
- [x] Equipar/desequipar CLOTHING desde la consola
- [x] Placeholder del michi (kaomoji/ASCII pixelado)

## Etapa 4 — Selector y ajustes

- [x] Dashboard como selector compacto de michis (3 slots, esta vez con cards pixel)
- [x] Login/register adaptados al tema (pixel, sin rail ni perfil)
- [x] Tests actualizados (`npm test` verde)
- [x] Actualizar `ia-docs/init/arquitecture.md`, `changes.md` y `roadmap.md`

## Validación

- [x] Consola muestra stats en vivo y responde a las 4 acciones
- [x] Rail navega a las 5 secciones desde cualquier página autenticada
- [x] Perfil muestra datos reales y logout funciona
- [x] Fuentes alternables por variable CSS
- [x] Solo algunas estrellas titilan
- [x] Responsive mobile (dock inferior) y desktop
- [x] Checks AXE / WCAG AA en consola, rail y perfil