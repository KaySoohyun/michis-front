# Registro de cambios

Cambios significativos / bugs corregidos en `ia-docs/init/changes.md` (los más recientes al final).

## 2026-08-24 — Fix: adopción con slots mal calculados y error repetido en todas las cards

Dos bugs de la pestaña ADOPTAR reportados al probar:

- **Slot incorrecto**: entrando directo a `/dashboard/adoptar` el `CatStore` estaba vacío (solo el dashboard lo carga), `firstFreeSlot()` devolvía 1 y el botón decía "ADOPTAR EN SLOT 1" aunque el libre real fuera otro → el backend rechazaba con "slot ocupado". Ahora `adoptar.component.ts` llama a `catStore.loadCats()` en `ngOnInit` si no hay michis cargados.
- **Error duplicado**: el error de adopción se renderizaba dentro de todas las cards porque `catStore.error()` es global. Ahora se guarda `lastAdoptAttempt` y el error solo se muestra en la card del gatito que se intentó adoptar.
- **Botón**: dejó de anunciar el slot ("ADOPTAR EN SLOT N" → "ADOPTAR"); la adopción siempre va al primer slot libre que resuelve el store ya corregido.
- Tests nuevos del componente (`adoptar.component.spec.ts`): botón sin slot, carga de michis al entrar directo, slot real según michis cargados, error solo en la card correspondiente. Suite 14/14 verde + build OK.

### Follow-up (mismo día): sin confirmación tras adoptar

Al adoptar con éxito, la suma del michi al store llenaba los slots y aparecía el banner "Tenés los 3 slots ocupados..." como único feedback — parecía un error aunque la adopción hubiera funcionado.

- `CatStore.adoptCat` ahora devuelve el observable (`tap` para actualizar estado, `catchError` que setea el error y completa) así el componente puede reaccionar al éxito sin duplicar la llamada HTTP.
- El componente guarda `adoptedKitten` y muestra un banner verde de confirmación ("¡Nova ya es parte de tu familia!") que **reemplaza** al aviso de slots llenos justo después de adoptar; ese aviso sigue apareciendo si se entra a la página con los slots ya ocupados.
- Test nuevo: éxito muestra confirmación y no el banner de slots. Suite 15/15 verde + build OK.

## 2026-08-24 — El detalle vive en el inicio: consolas apiladas sin página de detalle

Cambio estructural pedido "de a poco": el inicio muestra la **consola completa de cada michi** y desaparece la página de detalle.

- Nuevo componente compartido `cat-console.component.ts` (ex consola de `cat-detail`): status con iconos, imagen, diálogo y action bar en una card autocontenida. **Sin sección ACCESORIOS** (el lookup interno de comida para COMER sigue: la API exige un `inventoryItemId`). Sin botón LIBERAR por ahora (decisión del usuario).
- `dashboard.component.ts`: reemplaza el grid de cards por las consolas **en una sola fila** (`flex` con `gap-16` = 4rem, `flex-wrap` para pantallas chicas), cada consola de `w-96`; conserva skeletons/error/paneles de slot libre.
- Eliminados: ruta `/dashboard/cat/:id`, `cat-detail.component.ts` (+spec) y `cat-card` (VER ya no tiene a dónde navegar).
- `deriveCatStatus()` como función pura en `models/cat.model.ts`: store y cada consola derivan umbrales de estado de forma consistente (antes solo existía para el michi seleccionado).
- Consola en **dos filas**: la pantalla del michi arriba a lo ancho y el panel STATUS abajo con los medidores en grilla 2×2. Action bar y top bar sin cambios.
- **Diálogo eliminado** de la consola (componente `dialog-box` removido del repo).
- **Profile card** movida a la derecha (`fixed right-3 top-0`, sin margen superior).
- **Sin scroll en el inicio**: el padding superior de la página se eliminó, el header se compactó y las consolas tienen altura `calc(100dvh-8rem)`; dentro de cada consola la pantalla del michi absorbe el espacio sobrante (`flex-1 min-h-0 overflow-hidden`) y status/action quedan fijos.
- Top bar de la consola: la fecha (dd/MM/yyyy) fue reemplazada por el nivel (`LV.N`) **+ barra de EXP** compacta (mismo cálculo diario de `shared/level`); a la derecha queda solo la hora. El `level-badge` del panel STATUS se eliminó junto con su componente (quedaba duplicado).
- Spec nuevo de `CatConsoleComponent`: render, JUGAR→store, COMER usa el primer FOOD del inventario, aviso si no hay comida. Suite 23/23 + build OK.

## 2026-08-24 — Fix + redesign: consola del michi en blanco y nuevo layout (extras/card-cat.md)

Al hacer click en VER la pantalla `/dashboard/cat/:id` quedaba en "Cargando michi..." para siempre. Tres causas combinadas:

- **`withComponentInputBinding()` faltante**: sin él, Angular no bindea parámetros de ruta a inputs del componente.
- **Nombre del input**: el componente declaraba `catId` pero la ruta define `:id`; el binding es por nombre exacto, así que el valor nunca llegaba. Ahora `catId = input.required<string>({ alias: 'id' })`.
- **Sin fetch propio**: la pantalla solo leía del store cacheado; si entraba directo por URL (o el store estaba vacío) no había llamada al backend y se quedaba colgada. Ahora `ngOnInit` llama a `GET /cats/:id` (`CatService.getCat`, ya existente), hace upsert del resultado en el store (`CatStore.upsertCat`) y muestra un error claro si falla, en vez de "Cargando..." infinito. La llamada al inventario que se veía en la red era la sección ACCESORIOS, no el bug.

Rediseño de la pantalla según el dibujo de `ia-docs/extras/card-cat.md`:

- **Panel STATUS** (izquierda): medidores con iconos ♥ FELIZ / 🍴 HAMBRE / ☾ SUEÑO / ✿ LIMPIO (`status-meter` ahora acepta input `icon`), separador y badge LV/EXP debajo.
- **Imagen del gato** (derecha): panel grande con `avatarUrl`; fallback ASCII si no tiene.
- **Diálogo** a lo ancho bajo la consola, con formato "{NOMBRE} DICE:" (`dialog-box`).
- **Action bar**: 5 botones cuadrados CHAT / COMER / JUGAR / DORMIR / ACICALAR usando los SVG de `public/icons/` (chat/comer/jugar/dormir/acicalar) vía `NgOptimizedImage`. Los labels reemplazan a Alimentar/Limpiar (mismas acciones internas). CHAT queda deshabilitado ("Próximamente"): la misión prohíbe chat social y conversar con el michi sería una feature nueva con su propio spec.
- **Foto real al adoptar**: `POST /cats` ahora acepta `avatarUrl` opcional y ADOPTAR envía `img-cat/<imageName>` del perfil elegido → los michis nuevos muestran su foto en la consola. Los ya adoptados siguen con el fallback ASCII.

Verificado: tests 20/20 + build OK (backend 24/24 + build OK con el cambio de DTO).

## 2026-08-24 — Fix: nivel de los michis no reflejaba la edad

Los michis mostraban LV.1 aunque ya tuvieran días de vida: la fórmula decorativa subía **1 nivel por semana** (`floor(días / 7) + 1`), y además estaba duplicada en `cat-card.component.ts` y `level-badge.component.ts`.

- Nuevo helper `src/app/shared/level.ts` (`daysAlive`, `levelFor`, `expProgress`, `MAX_EXP`): **1 nivel por día completo de vida** (recién adoptado → LV.1, un día después → LV.2, etc.) y EXP = avance dentro del día actual hacia el próximo nivel (0..200).
- `level-badge.component.ts` y `cat-card.component.ts` ahora usan el helper compartido (sin fórmulas duplicadas).
- Test nuevo: `src/app/shared/level.spec.ts` (nivel inicial, +1 por día, límites de EXP). Suite 20/20 verde + build OK.


## 2026-08-24 — Feature 010: Adopción diaria con cards completas

La pestaña ADOPTAR muestra la **rotación diaria** del backend (máx. 4 gatitos distintos por día, cambian al día siguiente) y cada mascota ahora es una **card autocontenida**: foto, nombre, especie, descripción, personalidad, historia y botón `ADOPTAR EN SLOT N` dentro de la misma card.

- **Assets**: copiados los 17 gatitos nuevos (`michi1..17`) a `public/img-cat/` y borradas las imágenes viejas (`g28.png`, `image*.png`) que ya no existen en el repo.
- **`adoptar.component.ts`**: eliminado el panel de perfil aparte (`selectedKitten`, botón X); grid pasa a 1 columna mobile / 2 desktop; hint de rotación bajo el título ("hoy están estos N; mañana llegan otros"); estado vacío cuando no hay gatitos; error de adopción se muestra en la card.
- Verificado: tests 10/10 y build OK con las 17 imágenes en `dist/frontend/browser/img-cat/`.

## 2026-08-23 — Galería de adopción (009 frontend / 008 backend)

La pestaña de adopción ya no genera michis con IA: muestra una galería con los 9 gatitos reales del refugio (`img-cat`), servidos por el nuevo endpoint `GET /api/v1/kittens`.

- **Assets**: fotos copiadas a `public/img-cat/` (estáticos; `imageUrl` del perfil queda vacío hasta pasar a Cloudinary — `KittensService.imageUrl()` prioriza `imageUrl`, luego `img-cat/<imageName>`, fallback 🐱).
- **Modelo/servicio**: `KittenProfile` (id, name, species, description, personality, lore, imageName, imageUrl) y `KittensService` (desenvuelve `{ data }`, signals de loading/error).
- **Página ADOPTAR** (`/dashboard/adoptar` reemplaza `ai-generator`): grid de tarjetas con foto/nombre/especie; click abre perfil completo (descripción, personalidad, historia, con X para cerrar); botón `ADOPTAR EN SLOT N` con la lógica de slots de la 008 (primer slot libre real; banner + botón deshabilitado con slots llenos). Al adoptar envía `lore` al `POST /cats`.
- **Baja del generador**: eliminados `ai-cat-generator.component.ts`, `GeneratedCat`, `GenerateCatRequest` y `AiService.generateCat/lastGeneratedCat/clearGeneratedCat`. La trivia no cambia.
- **Renombres**: nav-rail GENERAR → ADOPTAR (✨), hint de slots libres "Adoptá en ✨ ADOPTAR", `CreateCatRequest.lore?`.
- Verificado: tests 10/10, build OK y fotos presentes en `dist/frontend/browser/img-cat/`.

## 2026-08-23 — Feature 007: Trivia con selector de dificultad

`/trivia` ahora abre con un selector de dificultad (easy 5-10, medium 15-25, hard 30-50, cosmic 75-100 monedas) y todas las preguntas se piden con `?difficulty=` elegido; la categoría sigue random.

- `trivia.component.ts`: máquina de estados con signal `selectedDifficulty` (null → selector, elegida → juego). El selector muestra 4 botones pixel con rango de recompensas e íconos, sin llamar a la API al entrar.
- **X** en el marco de juego (44x44, aria-label "Volver al selector de dificultad") vuelve al selector y limpia pregunta/resultados desde cualquier estado.
- Al fallar: se revela solución + explicación con 0 monedas y una nota indicando que la pregunta puede reaparecer más adelante (el backend ya no excluye las fallidas del sorteo, ver feature 007 del backend). SIGUIENTE pide otra pregunta de la misma dificultad.
- Acierto: refresca monedas siempre (`userService.loadCoins()`), antes solo lo hacía si el saldo era exactamente 0.
- Tests nuevos del componente (selector, difficulty enviada, X, reintento post-fallo): suite 10/10 verde + build OK.

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

## 2026-08-23 — Adopción solo desde el generador

La adopción quedó limitada a la pestaña GENERAR (`/dashboard/ai-generator`); el dashboard ya no ofrece ninguna vía de adopción.

- `dashboard.component.ts`: se quitaron el botón `+ ADOPTAR` del header y los botones `ADOPTAR` de los slots libres. Los slots libres ahora muestran el hint "Adoptá en ✨ GENERAR" con link al generador.
- Se eliminó `adopt-form/` (`AdoptFormComponent`): no hay adopción manual sin IA.
- `ai-cat-generator.component.ts`:
  - Con los 3 slots ocupados se muestra un aviso y `ADOPTAR EN SLOT N` queda deshabilitado.
  - El slot destino es el primer slot libre real; corrige el cálculo anterior (`3 - disponibles + 1`) que adoptaba sobre un slot ocupado al haber liberado un slot intermedio.
  - El botón muestra el slot destino (`ADOPTAR EN SLOT 2`, etc.).

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
