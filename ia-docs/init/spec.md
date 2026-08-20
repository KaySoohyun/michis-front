# Spec del Frontend — Michis Intergalácticos

## 0. Resumen ejecutivo

Michis Intergalácticos es un juego de mascotas virtuales espacial donde los usuarios adoptan gatos alienígenas ("michis"), los cuidan, compran ítems en una tienda y responden preguntas de trivia cósmica generadas por IA.

Este documento define el **frontend Angular 22** de la aplicación: pantallas, componentes, estado, consumo de API y restricciones de diseño.

---

## 1. Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Angular 22 (standalone, signals, control flow `@if`/`@for`) |
| Estado | Angular Signals + `computed()` |
| HTTP | `HttpClient` + interceptores de auth/error |
| Formularios | Reactive Forms / Signal Forms (`@angular/forms/signals`) |
| Estilos | Tailwind CSS 4 |
| Animaciones | Angular Animations |
| Testing | Vitest |
| Package manager | npm |
| Lenguaje | TypeScript 6 (strict) |

---

## 2. Features y pantallas

### 2.1 Autenticación

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Login | `/login` | Formulario email + contraseña. |
| Registro | `/register` | Formulario email, contraseña, nombre opcional. |
| Perfil | `/profile` | Editar displayName, ver monedas, avatar. |

### 2.2 Dashboard

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Dashboard | `/dashboard` | Vista principal: cards de hasta 3 michis, monedas, acceso rápido a tienda y trivia. |

### 2.3 Adopción

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Adoptar | `/adopt` | Formulario de adopción: nombre del michi, selección de slot (1-3). Generación de especie vía IA opcional. |

### 2.4 Detalle de michi

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Detalle | `/cat/:id` | Stats del michi (hunger, energy, happiness, cleanliness), acciones (alimentar, jugar, limpiar, dormir), ítems equipados, lore. |

### 2.5 Tienda

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Tienda | `/shop` | Catálogo de ítems filtrable por tipo (FOOD, TOY, CLOTHING, MEDICINE, SPECIAL) y rareza. Botón de compra con validación de monedas. |
| Inventario | `/inventory` | Lista de ítems poseídos por el usuario, opción de equipar/desequipar. |

### 2.6 Trivia

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Trivia | `/trivia` | Pregunta de trivia cósmica con 4 opciones, temporizador visual, recompensa en monedas. |

---

## 3. Arquitectura de componentes

### 3.1 Patrón de componentes

- **Standalone components** (default en Angular 22, no declarar `standalone: true`).
- **`input()` / `output()`** en lugar de decoradores `@Input` / `@Output`.
- **`computed()`** para estado derivado.
- **`signal()`** para estado local reactivo.
- **Templates inline** para componentes pequeños; externos para componentes grandes (rutas relativas al `.ts`).
- Control flow nativo: `@if`, `@for`, `@switch` (no `*ngIf`, `*ngFor`).
- No `ngClass` / `ngStyle`: usar `class` y `style` bindings.
- **`inject()`** en lugar de inyección por constructor.
- **`@Service()`** en lugar de `@Injectable({providedIn: 'root'})` para servicios nuevos.

### 3.2 Formularios

- Preferir **Signal Forms** (`@angular/forms/signals`) para formularios nuevos.
- Cuando no se use Signal Forms, preferir **Reactive Forms** sobre Template-driven.
- Validación síncrona y asíncrona con mensajes en español.

### 3.3 Imágenes

- Usar `NgOptimizedImage` para todas las imágenes estáticas.
- No usar `NgOptimizedImage` con imágenes inline base64.

---

## 4. State management

### 4.1 Stores (signals globales)

| Store | Responsabilidad |
|-------|----------------|
| `auth.store.ts` | Token, usuario actual, estado de autenticación. |
| `cat.store.ts` | Lista de michis, michi seleccionado, slots disponibles. |
| `shop.store.ts` | Catálogo de ítems, inventario del usuario, monedas. |

### 4.2 Servicios

| Servicio | Responsabilidad |
|----------|----------------|
| `auth.service.ts` | Login, registro, refresh, logout, persistencia de token. |
| `cat-state.service.ts` | CRUD de michis, acciones (feed/play/clean/sleep), decaimiento de stats. |
| `shop.service.ts` | Compra de ítems, filtros de catálogo. |
| `trivia.service.ts` | Generación de preguntas, validación de respuestas, recompensas. |
| `inventory.service.ts` | Inventario del usuario, equipar/desequipar. |
| `upload.service.ts` | Subida de imágenes vía Cloudinary. |

### 4.3 Flujo de datos

```
Componente → signal/computed → servicio → HTTP interceptor → API NestJS
                                         ↑
                              Store (signals globales)
```

- Los stores mantienen el estado global con signals.
- Los servicios encapsulan la lógica de negocio y HTTP.
- Los interceptores manejan token JWT y errores globalmente.

---

## 5. Consumo de API

### 5.1 Base URL

Todas las llamadas HTTP van a `/api/v1/...` (proxy configurado en `angular.json`).

### 5.2 Interceptor de auth

- Adjunta `Authorization: Bearer <token>` a cada request autenticado.
- En 401, intenta refresh una vez. Si falla, redirige a `/login`.

### 5.3 Interceptor de errores

- Errores 4xx/5xx se traducen a mensajes amigables en español.
- Se muestran vía componente toast/notification.

### 5.4 Endpoints consumidos

Ver `spec.md` del proyecto completo (sección C) para la lista completa de endpoints.

---

## 6. Routing

### 6.1 Rutas lazy-loaded

Cada feature se carga bajo demanda:

```typescript
// app.routes.ts
{
  path: 'login',
  loadComponent: () => import('./features/auth/login/login.component')
}
```

### 6.2 Guard de auth

- Rutas protegidas: `/dashboard`, `/cat/:id`, `/shop`, `/inventory`, `/trivia`, `/adopt`, `/profile`.
- Rutas públicas: `/login`, `/register`.
- Si el usuario no está autenticado y accede a una ruta protegida, redirige a `/login`.

---

## 7. Requisitos de accesibilidad (WCAG AA)

- Contraste de colores mínimo 4.5:1 para texto, 3:1 para texto grande.
- `aria-label` en todos los botones interactivos.
- `:focus-visible` con outline visible en elementos interactivos.
- Tap targets mínimo de 44px.
- Jerarquía de headings correcta (h1 → h2 → h3).
- Estados de error no depender solo de color (texto + ícono).
- Formularios con labels asociados y mensajes de error vinculados.
- Soporte para `prefers-reduced-motion: reduce`.
- Navegación completa por teclado.
- Pasar checks AXE en todos los componentes.

---

## 8. Estructura de carpetas

```
src/app/
├── core/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   ├── auth.interceptor.ts
│   │   └── error.interceptor.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── cat.model.ts
│   │   ├── item.model.ts
│   │   └── trivia.model.ts
│   └── services/
│       └── api.service.ts
├── features/
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   └── auth.routes.ts
│   ├── dashboard/
│   │   ├── dashboard.component.ts
│   │   ├── cat-card/
│   │   ├── cat-stats/
│   │   └── dashboard.routes.ts
│   ├── cat-detail/
│   │   ├── cat-detail.component.ts
│   │   ├── actions-panel/
│   │   ├── inventory-equip/
│   │   └── cat-detail.routes.ts
│   ├── shop/
│   │   ├── shop.component.ts
│   │   ├── item-card/
│   │   └── shop.routes.ts
│   ├── trivia/
│   │   ├── trivia.component.ts
│   │   ├── question-card/
│   │   └── trivia.routes.ts
│   ├── inventory/
│   │   ├── inventory.component.ts
│   │   └── inventory.routes.ts
│   ├── adopt/
│   │   ├── adopt.component.ts
│   │   ├── ai-cat-generator/
│   │   └── adopt.routes.ts
│   └── profile/
│       ├── profile.component.ts
│       └── profile.routes.ts
├── shared/
│   ├── components/
│   │   ├── coin-display/
│   │   ├── stat-bar/
│   │   ├── loading-spinner/
│   │   ├── toast-notification/
│   │   └── confirm-dialog/
│   ├── directives/
│   │   └── animate-on-change.directive.ts
│   └── pipes/
│       ├── rarity-color.pipe.ts
│       └── stat-label.pipe.ts
├── stores/
│   ├── auth.store.ts
│   ├── cat.store.ts
│   └── shop.store.ts
├── app.component.ts
├── app.config.ts
└── app.routes.ts
```

---

## 9. Paleta de colores (propuesta)

| Token | Valor | Uso |
|-------|-------|-----|
| `--primary` | `hsl(262, 83%, 58%)` | Violeta cósmico — botones principales, acentos |
| `--secondary` | `hsl(199, 89%, 48%)` | Azul estelar — enlaces, info |
| `--accent` | `hsl(45, 93%, 47%)` | Dorado — monedas, rareza LEGENDARY |
| `--success` | `hsl(142, 71%, 45%)` | Verde — stats altas, éxito |
| `--warning` | `hsl(38, 92%, 50%)` | Ámbar — stats medias, advertencias |
| `--danger` | `hsl(0, 84%, 60%)` | Rojo — stats críticas, errores |
| `--background` | `hsl(230, 25%, 7%)` | Azul muy oscuro — fondo principal (dark space) |
| `--card` | `hsl(230, 20%, 12%)` | Azul oscuro — fondos de tarjetas |
| `--foreground` | `hsl(0, 0%, 95%)` | Blanco hueso — texto principal |

---

## 10. Tipografía

- **Display/headings**: font space-themed (ej. `Space Grotesk` o `Orbitron`).
- **Body**: `Inter` o `Nunito Sans` para legibilidad.
