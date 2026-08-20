# Arquitectura del Frontend — Michis Intergalácticos

## Estructura del proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                          # Singletons, guards, interceptores, modelos
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts          # Guard para rutas protegidas
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts    # Adjunta Bearer token a requests
│   │   │   │   └── error.interceptor.ts   # Manejo global de errores HTTP
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts          # User, AuthResponse, LoginRequest
│   │   │   │   ├── cat.model.ts           # Cat, CatStatus, CatAction
│   │   │   │   ├── item.model.ts          # InventoryItem, UserInventory, ItemType, Rarity
│   │   │   │   └── trivia.model.ts        # TriviaQuestion, TriviaAnswer, TriviaHistory
│   │   │   └── services/
│   │   │       └── api.service.ts         # Base HTTP service con interceptors
│   │   │
│   │   ├── features/                      # Módulos lazy-loaded por feature
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── login.component.ts
│   │   │   │   ├── register/
│   │   │   │   │   └── register.component.ts
│   │   │   │   └── auth.routes.ts
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── cat-card/
│   │   │   │   │   └── cat-card.component.ts
│   │   │   │   └── dashboard.routes.ts
│   │   │   ├── cat-detail/
│   │   │   │   ├── cat-detail.component.ts
│   │   │   │   ├── actions-panel/
│   │   │   │   │   └── actions-panel.component.ts
│   │   │   │   ├── inventory-equip/
│   │   │   │   │   └── inventory-equip.component.ts
│   │   │   │   └── cat-detail.routes.ts
│   │   │   ├── shop/
│   │   │   │   ├── shop.component.ts
│   │   │   │   ├── item-card/
│   │   │   │   │   └── item-card.component.ts
│   │   │   │   └── shop.routes.ts
│   │   │   ├── inventory/
│   │   │   │   ├── inventory.component.ts
│   │   │   │   └── inventory.routes.ts
│   │   │   ├── trivia/
│   │   │   │   ├── trivia.component.ts
│   │   │   │   ├── question-card/
│   │   │   │   │   └── question-card.component.ts
│   │   │   │   └── trivia.routes.ts
│   │   │   ├── adopt/
│   │   │   │   ├── adopt.component.ts
│   │   │   │   ├── ai-cat-generator/
│   │   │   │   │   └── ai-cat-generator.component.ts
│   │   │   │   └── adopt.routes.ts
│   │   │   └── profile/
│   │   │       ├── profile.component.ts
│   │   │       └── profile.routes.ts
│   │   │
│   │   ├── shared/                        # Componentes, directivas y pipes reutilizables
│   │   │   ├── components/
│   │   │   │   ├── coin-display/
│   │   │   │   │   └── coin-display.component.ts
│   │   │   │   ├── stat-bar/
│   │   │   │   │   └── stat-bar.component.ts
│   │   │   │   ├── loading-spinner/
│   │   │   │   │   └── loading-spinner.component.ts
│   │   │   │   ├── toast-notification/
│   │   │   │   │   └── toast-notification.component.ts
│   │   │   │   └── confirm-dialog/
│   │   │   │       └── confirm-dialog.component.ts
│   │   │   ├── directives/
│   │   │   │   └── animate-on-change.directive.ts
│   │   │   └── pipes/
│   │   │       ├── rarity-color.pipe.ts
│   │   │       └── stat-label.pipe.ts
│   │   │
│   │   ├── stores/                        # Angular Signals Stores (estado global)
│   │   │   ├── auth.store.ts
│   │   │   ├── cat.store.ts
│   │   │   └── shop.store.ts
│   │   │
│   │   ├── app.component.ts              # Componente raíz
│   │   ├── app.config.ts                 # Configuración de providers
│   │   └── app.routes.ts                 # Definición de rutas principales
│   │
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   └── styles.scss                       # Estilos globales + Tailwind
│
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── .prettierrc
```

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
  { path: 'login',    loadComponent: () => import('./features/auth/login/login.component') },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component') },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard',  loadComponent: () => import('./features/dashboard/dashboard.component') },
      { path: 'adopt',      loadComponent: () => import('./features/adopt/adopt.component') },
      { path: 'cat/:id',    loadComponent: () => import('./features/cat-detail/cat-detail.component') },
      { path: 'shop',       loadComponent: () => import('./features/shop/shop.component') },
      { path: 'inventory',  loadComponent: () => import('./features/inventory/inventory.component') },
      { path: 'trivia',     loadComponent: () => import('./features/trivia/trivia.component') },
      { path: 'profile',    loadComponent: () => import('./features/profile/profile.component') },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
```

### Guard de auth

```typescript
// core/guards/auth.guard.ts
export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
```

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
