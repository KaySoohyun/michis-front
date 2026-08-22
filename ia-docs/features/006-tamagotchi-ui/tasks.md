# 006 · UI Tamagotchi Pixel Art — Tareas

## Etapa 1 — Fundamentos visuales

- [ ] Cargar las 5 fuentes (VT323, Kode Mono, Quantico, Chakra Petch, WDXL Lubrifont JP N) en `index.html`
- [ ] Tokens `--font-display` / `--font-body` intercambiables en `styles.css`
- [ ] Utilidades pixel: `.pixel-border`, `image-rendering: pixelated`
- [ ] Starfield v2: base estática + 2 capas titilantes con fases distintas

## Etapa 2 — Shell nuevo

- [ ] `profile-card` component (avatar preseleccionado, nombre, email, monedas, logout)
- [ ] `nav-rail` component (tienda, inventario, trivia, adoptar; dock en mobile)
- [ ] `shell.component.ts`: sin navbar; rail + perfil solo en rutas autenticadas

## Etapa 3 — Consola (`/cat/:id`)

- [ ] `console-frame` (marco pixel)
- [ ] `console-top-bar` (fecha, nombre, hora vía servicio de reloj)
- [ ] `status-panel` (4 barras de 5 celdas; HAPPY con corazones)
- [ ] `level-badge` (LV desde birthDate + EXP decorativa)
- [ ] `dialog-box` (mensajes random según estado, español)
- [ ] `action-bar` (alimentar/limpiar/dormir/jugar → CatService)
- [ ] Equipar/desequipar CLOTHING desde la consola
- [ ] Placeholder del michi (kaomoji/ASCII pixelado)

## Etapa 4 — Selector y ajustes

- [ ] Dashboard como selector compacto de michis
- [ ] Login/register adaptados al tema (sin rail ni perfil)
- [ ] Tests actualizados (`npm test` verde)
- [ ] Actualizar `ia-docs/init/arquitecture.md` y `changes.md`

## Validación

- [ ] Consola muestra stats en vivo y responde a las 4 acciones
- [ ] Rail navega a las 4 secciones desde cualquier página autenticada
- [ ] Perfil muestra datos reales y logout funciona
- [ ] Fuentes alternables por variable CSS
- [ ] Solo algunas estrellas titilan
- [ ] Responsive mobile (dock inferior) y desktop
- [ ] Checks AXE / WCAG AA en consola, rail y perfil
