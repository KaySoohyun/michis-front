# 006 · UI Tamagotchi Pixel Art — Plan

## Enfoque

Todo frontend. Se reestructura el shell: se elimina la navbar y se reemplaza por un rail flotante + card de perfil. La vista de detalle del michi se convierte en la "consola" Tamagotchi compuesta por componentes pequeños standalone (top-bar, status-panel, dialog-box, action-bar). El estilo pixel se logra con CSS puro (bordes escalonados, `image-rendering: pixelated`, fuentes retro) sin librerías nuevas.

## Implementación

### Etapa 1 — Fundamentos visuales
1. Cargar las 5 Google Fonts en `index.html` y definir tokens `--font-display` / `--font-body` en `styles.css` para alternarlas.
2. Agregar utilidades pixel en `styles.css`: clase `.pixel-border` (borde escalonado con box-shadow), `image-rendering`, escala de cuadrados de stats.
3. Starfield v2: capas base estáticas + 2 capas dispersas titilando con fases distintas.

### Etapa 2 — Shell nuevo
4. `profile-card` component: avatar preseleccionado, nombre, email, monedas, logout.
5. `nav-rail` component: TIENDA / INVENTARIO / TRIVIA / ADOPTAR con íconos pixel; dock inferior en mobile.
6. Actualizar `shell.component.ts`: quita navbar, agrega rail + profile-card solo para rutas autenticadas.

### Etapa 3 — Consola (`/cat/:id`)
7. `console-frame`: marco de consola con borde pixel.
8. `console-top-bar`: fecha, nombre, hora (reloj vía servicio, no `new Date()` en template).
9. `status-panel`: 4 barras de 5 celdas (HAPPY con corazones); mapea stats 0-100 → celdas llenas.
10. `level-badge`: LV desde `birthDate` + EXP decorativa.
11. `dialog-box`: mensajes random según estado, rotación periódica.
12. `action-bar`: ALIMENTAR/LIMPIAR/DORMIR/JUGAR contra CatService existente.
13. Equipar: sección de ítems CLOTHING del inventario dentro de la consola (equip/desequip).

### Etapa 4 — Selector y ajustes
14. Rediseñar dashboard como selector compacto (cards mini de michis + slots libres).
15. Ajustar login/register al tema pixel (sin rail/perfil).
16. Actualizar tests afectados y documentación (`arquitecture.md`, `changes.md`).

## Decisiones

- **CSS puro para pixel art** — evita dependencias nuevas (límite duro del proyecto). Bordes "escalonados" con múltiples box-shadows.
- **LV cosmético client-side** — decisión del usuario (versión A): nivel = días vivo agrupados; sin tocar schema ni API.
- **Reloj encapsulado en servicio** — respeta el límite "no `new Date()` en templates/lógica de componentes" y queda testeable con fake clocks en tests.
- **Rail flotante en vez de navbar** — requisito de limpieza visual; en mobile se convierte en dock inferior (patrón thumb-friendly).
- **Equipar dentro de la consola** — el endpoint necesita `catId`; mostrar los CLOTHING ahí evita una pantalla intermedia.

## Riesgos

- **Legibilidad VT323 en textos chicos** — mitigación: VT323 solo display/números; cuerpo con Quantico o Chakra Petch hasta decidir.
- **Presupuesto de fuentes (5 familias)** — mitigación: es transitorio para elegir; al cerrar la elección se dejan 1-2 y se revisa el budget de Angular.
- **Contraste AA sobre fondo galaxia** — mitigación: paneles de consola con fondo opaco oscuro propio, no translúcido.
