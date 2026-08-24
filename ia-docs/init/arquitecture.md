# Arquitectura del Frontend — Michis Intergalácticos

## Estructura del proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                          # Singletons, guards, interceptores, modelos
│   │   │   ├── auth/
│   │   │   │   ├── auth.guard.ts          # Guard para rutas protegidas
│   │   │   │   ├── auth.interceptor.ts    # Adjunta Bearer token a requests
│   │   │   │   ├── error.interceptor.ts   # Manejo global de errores HTTP y 401
│   │   │   │   ├── auth.service.ts        # AuthService (user signal, login/register/logout)
│   │   │   │   ├── auth.service.spec.ts
│   │   │   │   └── auth.interceptor.ts
│   │   │
│   │   ├── features/                      # Módulos lazy-loaded por feature
│   │   │   ├── auth/                      # login, register (tema pixel, sin shell)
│   │   │   ├── dashboard/                 # Dashboard selector + cat-card + adopt-form
│   │   │   │   └── cat-detail/            # Consola Tamagotchi
│   │   │   │       └── console/
│   │   │   │           ├── console-top-bar/  # Fecha, nombre, hora (ClockService)
│   │   │   │           ├── status-meter/     # Barras de 5 celdas (hearts/squares)
│   │   │   │           ├── level-badge/      # LV + EXP decorativa desde birthDate
│   │   │   │           ├── dialog-box/       # Mensajes según estado del michi
│   │   │   │           └── action-bar/       # ALIMENTAR/LIMPIAR/DORMIR/JUGAR
│   │   │   ├── adoptar/                    # Galería diaria de gatitos (cards completas)
│   │   │   ├── shop/                      # Tienda (catálogo y compra)
│   │   │   ├── inventory/                 # Inventario del usuario
│   │   │   └── trivia/                    # Trivia cósmica con IA
│   │   │
│   │   ├── models/                        # Tipos e interfaces (cat, user, item, ai)
│   │   ├── services/                      # CatService, CatStore, ShopService,
│   │   │   │                              # InventoryService, AiService, UserService,
│   │   │   │                              # UploadService, ClockService
│   │   │
│   │   ├── shared/
│   │   │   ├── components/                # item-card, skeleton, stat-bar
│   │   │   └── layout/                    # shell (nav-rail + profile-card sin navbar)
│   │   │       ├── nav-rail/              # Rail flotante (dock inferior en mobile)
│   │   │       └── profile-card/          # Perfil flotante (avatar, monedas, logout)
│   │   │
│   │   ├── app.ts / app.html / app.config.ts / app.routes.ts
│   │
│   ├── environments/                      # environment.ts / environment.development.ts
│   ├── index.html                         # Fuentes retro (5 familias Google Fonts)
│   ├── main.ts
│   └── styles.css                         # Tokens Tailwind 4 + pixel-frame + starfield
│
├── angular.json
├── package.json
├── proxy.conf.json                        # /api → localhost:3000
└── tsconfig*.json
```

### Diseño (feature 006 — UI Tamagotchi Pixel Art)

El tema visual es pixel/retro sobre el backdrop galaxia:

- **Tokens** (`styles.css` `@theme`): `--color-background/card/foreground/...`, `--font-display` (VT323) y `--font-body` (Quantico) intercambiables vía CSS purá.
- **`.pixel-frame`**: marco escalonado con múltiples box-shadows (CSS puro, sin librerías).
- **`.pixelated`**: `image-rendering: pixelated` para pixel art nítido.
- **Starfield v2**: capas estáticas + 2 capas titilantes con fases distintas, respetando `prefers-reduced-motion`.
- **Accesibilidad**: aria-labels en todos los botones pixel, focus-visible, tap targets ≥ 44px, `role` semántico.

---

## Flujo de datos

### Señales y reactividad

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Componente  │────▶│   Signal()    │────▶│  Template   │
│  (evento)    │     │  (estado)     │     │  (render)   │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │
       ▼                    ▼
┌─────────────┐     ┌──────────────┐
│  Servicio    │────▶│  computed()  │
│  (lógica)    │     │  (derivado)  │
└─────────────┘     └──────────────┘
       │
       ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  HTTP Client │────▶│ Interceptor  │────▶│  API NestJS │
│  (request)   │     │ (auth/error) │     │  (backend)  │
└─────────────┘     └──────────────┘     └─────────────┘
```

### Patrón de flujo

1. **Componente** dispara acción (click, formulario).
2. **Servicio** recibe la acción, hace llamada HTTP.
3. **Store** (o servicio con signals) actualiza el estado.
4. **`computed()`** recalcula valores derivados.
5. **Template** se re-renderiza automáticamente vía signals.

### Ejemplo: alimentar un michi

```typescript
// Componente
onFeed(inventoryItemId: string) {
  this.catState.feedCat(this.selectedCat()!.id, inventoryItemId);
}

// Servicio → Store
async feedCat(catId: string, itemId: string) {
  const { cat } = await firstValueFrom(
    this.http.post<{ cat: Cat }>(`${API_URL}/cats/${catId}/feed`, { inventoryItemId: itemId })
  );
  this.cats.update(list => list.map(c => c.id === catId ? cat : c));
}
```

---

## Routing

### Configuración de rutas

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'auth',                        // Login/register SIN shell ni guard
    children: [
      { path: 'login',    loadComponent: () => import('./features/auth/login/login.component') },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component') },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'dashboard',                   // Rutas autenticadas (canActivate)
    loadComponent: () => import('./shared/layout/shell/shell.component'),
    canActivate: [authGuard],
    children: [
      { path: '',            loadComponent: () => import('./features/dashboard/dashboard.component') },
      { path: 'cat/:id',     loadComponent: () => import('./features/dashboard/cat-detail/cat-detail.component') },
      { path: 'shop',        loadComponent: () => import('./features/shop/shop.component') },
      { path: 'inventory',   loadComponent: () => import('./features/inventory/inventory.component') },
      { path: 'trivia',      loadComponent: () => import('./features/trivia/trivia.component') },
      { path: 'adoptar', loadComponent: () => import('./features/dashboard/adoptar/adoptar.component') },
    ],
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' },
];
```

### Guard de auth

```typescript
// core/auth/auth.guard.ts
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated()
    ? true
    : (router.navigate(['/auth/login']), false);
};
```

### Shell (feature 006)

`ShellComponent` envuelve las rutas hijas de `/dashboard` y renderiza `app-nav-rail` + `app-profile-card` (no hay navbar superior). Login/register quedan fuera del shell, así no muestran rail ni perfil.

---

## Modelos / Tipos

### User

```typescript
interface User {
  id: string;
  email: string;
  displayName: string | null;
  coinBalance: number;
  avatarUrl: string | null;
  createdAt: string;
}
```

### Cat

```typescript
interface Cat {
  id: string;
  userId: string;
  slotNumber: 1 | 2 | 3;
  name: string;
  species: string;
  personality: string;
  lore: string | null;
  hunger: number;    // 0-100
  energy: number;    // 0-100
  happiness: number; // 0-100
  cleanliness: number; // 0-100
  avatarUrl: string | null;
  birthDate: string;
  lastFedAt: string | null;
  lastPlayedAt: string | null;
  isAlive: boolean;
  equippedItems: string[];
}

interface CatStatus {
  isHungry: boolean;
  isTired: boolean;
  isSad: boolean;
  isDirty: boolean;
  isCritical: boolean;
}
```

### Items

```typescript
type ItemType = 'FOOD' | 'TOY' | 'CLOTHING' | 'MEDICINE' | 'SPECIAL';
type Rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

interface InventoryItem {
  id: string;
  name: string;
  description: string | null;
  type: ItemType;
  statsBoost: Record<string, number>;
  price: number;
  imageUrl: string;
  rarity: Rarity;
  isActive: boolean;
}

interface UserInventory {
  id: string;
  userId: string;
  itemId: string;
  quantity: number;
  isEquipped: boolean;
  acquiredAt: string;
  item: InventoryItem;
}
```

### Trivia

```typescript
interface TriviaQuestion {
  question: string;
  options: [string, string, string, string];
  correctAnswer: string;
  explanation: string;
  rewardCoins: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'cosmic';
  category: 'astronomy' | 'feline' | 'space-exploration' | 'physics' | 'mythology';
}
```

---

## Dependencias principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| `@angular/core` | ^22.0.0 | Framework |
| `@angular/forms` | ^22.0.0 | Formularios (Reactive + Signal Forms) |
| `@angular/router` | ^22.0.0 | Enrutamiento SPA |
| `@angular/common` | ^22.0.0 | Directivas comunes, HTTP |
| `tailwindcss` | ^4.1.12 | Utility-first CSS |
| `@tailwindcss/postcss` | ^4.1.12 | Integración Tailwind con PostCSS |
| `typescript` | ~6.0.2 | Lenguaje tipado |
| `vitest` | ^4.0.8 | Testing |
| `rxjs` | ~7.8.0 | Programación reactiva (HTTP) |
| `prettier` | ^3.8.1 | Formato de código |

---

## Proxy de desarrollo

```json
// angular.json → serve.options.proxyConfig
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

Las llamadas a `/api/v1/*` se redirigen al backend NestJS en `localhost:3000` durante desarrollo.
