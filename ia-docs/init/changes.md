# Registro de cambios

Cambios significativos / bugs corregidos en `ia-docs/init/changes.md`.

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
