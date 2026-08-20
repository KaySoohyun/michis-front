# Plan de implementación — Frontend Michis Intergalácticos

Roadmap por fases basado en el spec del proyecto. Cada fase se implementa como una o más features en `ia-docs/features/`.

---

## Fase 1 — Cimiento y Autenticación

### Objetivo
Infraestructura base funcional con login, registro y navegación protegida.

### Tareas
- Configurar Angular 22, Tailwind CSS 4, Vitest, path aliases.
- Crear estructura de carpetas (core, features, shared, stores).
- Implementar `HttpClient` con interceptores (auth, error).
- Crear modelos TypeScript: `User`, `ApiResponse`.
- Implementar `auth.store.ts` con signals (token, user, isAuthenticated).
- Implementar `auth.service.ts` (login, register, refresh, logout, loadProfile).
- Crear `auth.guard.ts` para rutas protegidas.
- Crear pantallas: `/login`, `/register` con Reactive Forms / Signal Forms.
- Configurar rutas lazy-loaded en `app.routes.ts`.
- Implementar layout base (navbar con monedas, nav links).
- Configurar proxy a backend NestJS.

### Criterios de aceptación
- Usuario puede registrarse y loguearse.
- Token se persiste en localStorage y se envía vía interceptor.
- Rutas protegidas redirigen a `/login` si no hay sesión.
- Layout base muestra nombre de usuario y monedas.
- Errores de red se muestran como toast en español.

---

## Fase 2 — Sistema de Michis

### Objetivo
Dashboard con cards de michis, detalle con stats y acciones de cuidado.

### Tareas
- Implementar `cat.store.ts` con signals (cats, selectedCat, slots).
- Implementar `cat-state.service.ts` (loadCats, feedCat, playWithCat, cleanCat, sleepCat, deleteCat).
- Crear componente `stat-bar` (barra de progreso con color dinámico).
- Crear componente `coin-display` (monedas con ícono).
- Crear componente `loading-spinner`.
- Crear `/dashboard`: grid de cat-cards (máx 3), indicador de slots disponibles.
- Crear componente `cat-card` (avatar, nombre, stats mini, estado visual).
- Crear `/cat/:id`: detalle con stat-bar completo, panel de acciones, lore, ítems equipados.
- Crear componente `actions-panel` (botones feed/play/clean/sleep con estados).
- Implementar decaimiento de stats en tiempo real (simulado con intervalo).
- Crear `/adopt`: formulario de adopción con nombre y selección de slot.
- Implementar guardia de máximo 3 michis.

### Criterios de aceptación
- Dashboard muestra cards de michis con stats mini.
- Se puede adoptar un michi nuevo (máx 3).
- Las acciones feed/play/clean/sleep actualizan stats optimísticamente.
- Stats decaen gradualmente mostrando estados críticos (rojo, parpadeo).
- Se puede eliminar un michi liberando el slot.

---

## Fase 3 — Tienda e Inventario

### Objetivo
Sistema económico completo: compra, inventario y equipamiento.

### Tareas
- Implementar `shop.store.ts` con signals (catalog, inventory, filters).
- Implementar `shop.service.ts` (getItems, buyItem, getInventory, equipItem).
- Crear `/shop`: grid de item-cards con filtros por tipo y rareza.
- Crear componente `item-card` (imagen, nombre, precio, rareza, stats boost).
- Crear componente `rarity-color` pipe (COMMON→gris, UNCOMMON→verde, RARE→azul, EPIC→púrpura, LEGENDARY→dorado).
- Implementar flujo de compra con validación de monedas.
- Crear `/inventory`: lista de ítems poseídos, botón equipar/desequipar.
- Crear componente `confirm-dialog` para compras.
- Integrar monedas en navbar (actualización en tiempo real).
- Bloquear compra si no hay suficientes monedas.

### Criterios de aceptación
- Tienda muestra catálogo filtrable por tipo y rareza.
- Se puede comprar ítems si hay suficientes monedas.
- Inventario muestra ítems poseídos con cantidad.
- Se pueden equipar/desequipar accesorios en michis.
- Monedas se actualizan tras compra en navbar y dashboard.

---

## Fase 4 — Integración de IA

### Objetivo
Generación de michis únicos y sistema de trivia con IA.

### Tareas
- Implementar `trivia.service.ts` (generateTrivia, submitAnswer).
- Crear `/trivia`: pregunta con 4 opciones, temporizador, recompensa.
- Crear componente `question-card` (pregunta, opciones, feedback).
- Implementar flujo de respuesta: correcta → monedas, incorrecta → explicación.
- Crear `/adopt`: integrar botón "Generar especie con IA" (POST /ai/generate-cat).
- Crear componente `ai-cat-generator` (tema input, resultado preview, confirmar adopción).
- Implementar historial de trivia del usuario (stats de aciertos).
- Mostrar dificultad y categoría de cada pregunta.
- Implementar estados de carga durante generación IA.

### Criterios de aceptación
- Trivia genera preguntas únicas con 4 opciones.
- Respuesta correcta otorga monedas según dificultad.
- Respuesta incorrecta muestra explicación educativa.
- Generador de michis IA crea especie completa con lore.
- Se puede adoptar un michi generado por IA.
- Historial de trivia muestra progreso del usuario.

---

## Fase 5 — Imágenes, Polish y Despliegue

### Objetivo
Subida de imágenes, animaciones, responsive y optimización final.

### Tareas
- Implementar `upload.service.ts` (uploadImage vía Cloudinary).
- Integrar subida de avatar de usuario y michi.
- Crear componente de preview de imagen con NgOptimizedImage.
- Implementar Angular Animations: transiciones de estado del michi (feliz, hambriento, dormido).
- Animaciones de entrada en dashboards y listas.
- Adaptar UI para mobile: cards responsive, navegación bottom en móvil.
- Implementar loading states (skeletons) en todas las pantallas.
- Implementar empty states con acciones sugeridas.
- Optimizar lazy loading y code splitting.
- Configurar build de producción (optimización, minificación).
- Testing: unit tests para servicios críticos (auth, cat-state, shop, trivia).
- Accessibility audit: pasar checks AXE en todas las pantallas.

### Criterios de aceptación
- Se pueden subir imágenes de avatar para usuario y michis.
- Animaciones de transición de estado del michi funcionan.
- UI es completamente responsive (mobile + desktop).
- Loading states y empty states están presentes.
- Build de producción optimizado.
- Tests unitarios cubren servicios críticos.
- Todos los componentes pasan checks AXE (WCAG AA).

---

## Estado actual

| Fase | Estado |
|------|--------|
| Fase 1 — Cimiento y Autenticación | Pendiente |
| Fase 2 — Sistema de Michis | Pendiente |
| Fase 3 — Tienda e Inventario | Pendiente |
| Fase 4 — Integración de IA | Pendiente |
| Fase 5 — Imágenes, Polish y Despliegue | Pendiente |
