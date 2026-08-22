# 006 · UI Tamagotchi Pixel Art

**Estado:** propuesta

## Qué hace

Rediseño completo de la interfaz con estética de consola portátil Tamagotchi en pixel art, sobre el fondo galaxia existente:

- **Pantalla principal (`/cat/:id`)** — la "consola":
  - Barra superior: fecha, nombre del michi y hora.
  - Panel lateral izquierdo **STATUS** con las 4 stats como barras de 5 cuadrados llenos/vacíos: HAPPY (corazones), HUNGRY, ENERGY, CLEAN.
  - Indicador **LV** derivado de `birthDate` (versión cosmética, sin backend) con barra EXP decorativa.
  - Caja de diálogo con mensajes random según estado del michi.
  - Menú inferior con **4 botones**: ALIMENTAR, LIMPIAR, DORMIR, JUGAR (íconos pixelados).
  - Equipar accesorios desde los ítems CLOTHING del inventario.
- **Rail lateral flotante** con acceso global: TIENDA, INVENTARIO, TRIVIA, ADOPTAR.
- **Sin navbar superior.** Reemplazo: card flotante de perfil con avatar preseleccionado (pixel art), nombre, email, monedas y botón cerrar sesión.
- **Dashboard** rediseñado como selector compacto de michis (hasta 3).
- Prueba de fuentes: se cargan las 5 de `extras/ui.md` y se alternan vía CSS para elegir 1-2 viéndolas en pantalla.
- Titileo parcial de estrellas (solo algunas titilan).

## Por qué

La estética Tamagotchi es la identidad natural del producto (mascota virtual que se cuida). Mapea 1:1 con el modelo existente (4 stats) **sin cambios de backend**: todo es frontend. La navegación flotante mantiene la pantalla limpia, que es el requisito central del diseño.

## Criterios de aceptación

- [ ] La consola muestra fecha, nombre, hora real y las 4 stats con cuadrados/corazones proporcionales al valor 0-100.
- [ ] LV se calcula client-side desde `birthDate`; la barra EXP es decorativa.
- [ ] La caja de diálogo muestra mensajes aleatorios coherentes con el estado (hambriento → sugerencia de comer, etc.), en español.
- [ ] Los 4 botones disparan feed/clean/sleep/play contra la API y reflejan el cambio en las barras.
- [ ] Se puede equipar/desequipar un ítem CLOTHING del inventario en el michi visible.
- [ ] El rail flotante navega a tienda, inventario, trivia y adoptar desde cualquier página autenticada.
- [ ] No existe navbar superior; la card de perfil muestra avatar, nombre, email, monedas y logout funcional.
- [ ] Las rutas públicas (login/register) no muestran ni rail ni card de perfil.
- [ ] Las 5 fuentes son intercambiables cambiando una variable CSS (para elegir en vivo).
- [ ] Solo algunas estrellas titilan; el resto queda estática.
- [ ] Responsive mobile-first: en mobile el rail pasa a dock inferior.
- [ ] WCAG AA: contraste, `aria-label` en todos los botones pixel, foco visible, tap targets 44px.
- [ ] `npm test` sigue pasando y se actualizan tests afectados.

## Fuera de alcance

- Sistema real de XP/niveles persistido (backend) → backlog.
- Sprites pixel-art definitivos: se usa placeholder ASCII/kaomoji del michi; los sprites van en otra feature cuando haya assets.
- Subida de avatar custom (Cloudinary ya existe, pero el perfil usa avatar preseleccionado).
- Nuevos endpoints o cambios de schema.
