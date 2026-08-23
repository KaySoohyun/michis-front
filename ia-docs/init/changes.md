# Registro de cambios

Cambios significativos / bugs corregidos en `ia-docs/init/changes.md` (los más recientes al final).

## 2026-08-22 — Feature 006: UI Tamagotchi Pixel Art completa

Se terminó la feature 006 (ver `ia-docs/features/006-tamagotchi-ui/`), dejando toda la interfaz en tema pixel/galaxia.

- **Consola (`/dashboard/cat/:id`)**: marco pixel, top-bar con fecha/nombre/hora vía `ClockService`, status panel de 4 stats en celdas (HAPPY con corazones), LV + EXP decorativa desde `birthDate`, caja de diálogo según estado, action-bar con ALIMENTAR/LIMPIAR/DORMIR/JUGAR y equipamiento de CLOTHING.
- **Shell sin navbar**: `shell.component.ts` renderiza `nav-rail` flotante (dock inferior en mobile) + `profile-card` flotante con avatar, nombre, monedas y logout. Login/register quedan fuera del shell (sin rail ni perfil).
- **Dashboard como selector compacto**: 3 slots por slotNumber, cada michi como `cat-card` pixel con mini-stats y LV; slots libres con botón ADOPTAR.
- **Tema pixel en todas las vistas autenticadas**: shop, inventory, trivia y ai-generator pasaron de cards blancas (`bg-white`/`text-gray-900`) a `pixel-frame` oscuro con botones y textos adaptados (resuelve el pendiente anotado el 2026-08-22: "navbar y cards siguen con fondo claro").
- **Login/register en tema pixel** — fondo galaxia, marco pixel y fuentes retrofit.
- **Bugfix build**: imports relativos rotos en `console/*` (`../../../../models`, `../../../../services/clock.service` → ahora `../../../../../...`) y `buttons` privado no accesible desde template en `action-bar` (ahora `protected`).
- **Skeleton** reestilizado a pixel para el loading del dashboard.
- `npm test` verde (3 archivos / 6 tests) y `npm run build` correcto.

## 2026-08-22 — Starfield galáctico (estrellas en el fondo)

Se agregaron estrellas al backdrop para reforzar la estética espacial, sobre el fondo Aurora existente.

- `styles.css`: dos capas de estrellas vía pseudo-elementos de `body` (`::before` / `::after`), `position: fixed`, `pointer-events: none`, pintadas detrás del contenido (sobre el backdrop Aurora):
  - Capa 1: estrellas pequeñas y tenues en tile de 260x240px, con algunas azuladas/violetas.
  - Capa 2: estrellas menos densas y más brillantes con glow suave, tile de 480x400px.
- Titileo sutil por opacidad (6s capa 1, 4s capa 2) y desactivado con `prefers-reduced-motion: reduce`.
- Sin cambios en componentes: aplica a todas las rutas (incluye login/register).

## 2026-08-22 — Fondo Aurora (dark theme)

Se aplicó el backdrop de referencia "Aurora" de `ia-docs/extras/background.md`, alineado a la paleta del spec (§9).

- `styles.css`: tokens de color semánticos en `@theme` (background, card, foreground, primary, secondary, accent, success, warning, danger) y fondo global en `body`: base `hsl(230 25% 7%)` con glows radiales violeta/azul/rosa (`background-attachment: fixed`).
- `shell.component.ts`: se quitó `bg-gray-50` para que el backdrop aurora sea visible.

Pendiente: navbar y cards siguen con fondo claro (`bg-white`), chocan con el tema oscuro; adaptarlos en un polish posterior.

## 2026-08-20 — Corrección de integración frontend ↔ backend

Se corrigió la integración del frontend con la API NestJS del backend (prefijo global `api/v1`, envoltorio `{ data }` y formas de respuesta reales).

- **Error NG0201 (AuthService sin provider):** se agregó `providedIn: 'root'` a `AuthService` y al resto de servicios (`UserService`, `CatService`, `CatStore`, `ShopService`, `InventoryService`, `UploadService`, `AiService`).
- **404 en registro/login:** el frontend llamaba a `/api/auth/*` pero el backend expone `/api/v1/auth/*`. Se cambió `environment.apiUrl` de `/api` a `/api/v1` y se eliminó el `/v1` duplicado en los servicios (antes resultaba `/api/v1/v1/...`).
- **Forma de respuesta:** el backend envuelve las respuestas en `{ data }` (`TransformInterceptor`). Se deserializó `response.data` en los servicios de cats, shop, inventory y ai.
- **Modelos alineados con el backend:**
  - `User`: ahora usa `displayName`, `coinBalance`, `avatarUrl` (login/registro/auth/me).
  - `Cat`: se eliminaron campos inexistentes (`level`, `experience`, `ownerId`, `createdAt`, `updatedAt`) y se agregaron los reales (`lore`, `avatarUrl`, `birthDate`, `isAlive`, `status`).
  - `Rarity`: se agregaron `UNCOMMON` y `EPIC` (faltaban).
  - `UserInventory`: `equipped` → `isEquipped`.
  - `BuyResponse`: `inventoryItem` → `purchasedItem`.
  - Trivia: `TriviaQuestion` usa `triviaId` y `correctAnswer` es string; `AnswerTriviaResponse` usa `wasCorrect`, `correctAnswer`, `rewardEarned`.
- **Componentes corregidos:**
  - `register.component` envía `displayName` en lugar de `name`.
  - `navbar` muestra `user().displayName`.
  - `cat-card`/`cat-detail` ya no muestran `level` (no existe en backend).
  - `cat-detail.onFeed` dejó de enviar un `inventoryItemId` vacío; ahora usa el primer ítem FOOD del inventario.
  - `inventory` se alineó a `isEquipped` y quedó de solo lectura (el equipamiento se hace desde el detalle del michi).
  - `trivia` alineada al contrato real (answer envía la opción como string).
