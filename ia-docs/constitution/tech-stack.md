# Tech stack y convenciones

_Cómo está construido el frontend y las reglas que todo el código debe respetar._

## Tecnologías

- **Framework:** Angular 22 (standalone components, signals, control flow `@if`/`@for`)
- **Lenguaje:** TypeScript 6 (strict mode, sin `any`)
- **Estado:** Angular Signals + `computed()` + stores con signals
- **Estilos:** Tailwind CSS 4 (utility-first)
- **Formularios:** Signal Forms (`@angular/forms/signals`) o Reactive Forms
- **Testing:** Vitest
- **Package manager:** npm
- **Backend:** NestJS (consumido vía HTTP, no incluido en este repo)
- **Despliegue frontend:** Vercel (free tier)

## Archivos / módulos clave

- `src/app/core/` — Guards, interceptores, modelos, servicio base de API.
- `src/app/features/` — Componentes de pantalla, cada feature lazy-loaded.
- `src/app/shared/` — Componentes reutilizables (stat-bar, coin-display, toast, etc.).
- `src/app/stores/` — Stores de signals globales (auth, cat, shop).
- `src/app/services/` — Servicios de negocio (auth, cat-state, shop, trivia, inventory, upload).

## Comandos

- `npm start` — Servidor de desarrollo (ng serve).
- `npm run build` — Build de producción.
- `npm test` — Ejecutar tests con Vitest.

## Modelo de datos / dominio

- **User** — Usuario con email, nombre, monedas, avatar.
- **Cat** — Michi con stats (hunger, energy, happiness, cleanliness), slot (1-3), species, personality, lore.
- **InventoryItem** — Ítem de tienda con tipo (FOOD/TOY/CLOTHING/MEDICINE/SPECIAL), rareza, precio, stats boost.
- **UserInventory** — Relación usuario-ítem con cantidad y estado equipado.
- **TriviaQuestion** — Pregunta de IA con 4 opciones, dificultad, categoría, recompensa.

## Convenciones

- Componentes standalone (no declarar `standalone: true`, es default en v22).
- `input()` / `output()` en lugar de decoradores `@Input` / `@Output`.
- `computed()` para estado derivado.
- `inject()` en lugar de inyección por constructor.
- `@Service()` para servicios singleton.
- Control flow nativo: `@if`, `@for`, `@switch`.
- No `ngClass` / `ngStyle`.
- Templates inline para componentes pequeños.
- Tests unitarios con Vitest, archivos `*.test.ts` junto al fuente.
- Contenido visible al usuario en español (argentino).
- Código, nombres y commits en inglés.
- Commits: `<type>(<scope>): <description>`.

## Estilo visual

- **Dark theme** (fondo azul oscuro, estilo cósmico/espalial).
- Paleta: violeta cósmico (primary), azul estelar (secondary), dorado (accent/monedas).
- Stats: verde (alta), ámbar (media), rojo (baja/crítica).
- Rareza de ítems: COMMON→gris, UNCOMMON→verde, RARE→azul, EPIC→púrpura, LEGENDARY→dorado.
- Tipografía display: Space Grotesk o similar. Body: Inter o Nunito Sans.
- Responsive: mobile-first con `sm:`, `md:`, `lg:`.

## Límites duros

- No instalar dependencias sin avisar al usuario.
- No usar `any` en TypeScript sin justificación explícita.
- No subir `.env*`, tokens ni API keys al repositorio.
- No exponer API keys de Gemini o Cloudinary al cliente.
- No usar NgModules (solo standalone components).
- No usar `*ngIf`, `*ngFor`, `*ngSwitch`, `ngClass`, `ngStyle`.
- No usar `@HostBinding` / `@HostListener`.
- No usar `new Date()` directamente en templates o lógica de componentes.
