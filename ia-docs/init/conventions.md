# Convenciones del proyecto — Michis Intergalácticos (Frontend)

## Regla de documentación

Cada cambio significativo debe documentarse en `ia-docs/init/`:
- Nuevos componentes o servicios → actualizar `arquitecture.md`
- Cambios de convención → actualizar este archivo
- Bugs corregidos → agregar nota en `changes.md`

---

## Idioma

- Todo el contenido visible al usuario en **español (argentino)**.
- Mensajes de error, labels, botones, textos de UI → español.
- Nombres de variables, funciones, clases, archivos → **inglés**.
- Commits → inglés.

---

## Angular 22 patterns

### Componentes
- **Standalone siempre**. No declarar `standalone: true` explícitamente (es default en v22).
- **No declarar `changeDetection: ChangeDetectionStrategy.OnPush`** explícitamente (es default en v22).
- Usar `input()` y `output()` en lugar de decoradores `@Input` / `@Output`.
- Usar `computed()` para estado derivado.
- Usar `signal()` para estado local reactivo.
- Templates inline para componentes pequeños; externos para grandes (rutas relativas al `.ts`).
- Control flow nativo: `@if`, `@for`, `@switch` (nunca `*ngIf`, `*ngFor`, `*ngSwitch`).
- No usar `ngClass` → usar `class` bindings.
- No usar `ngStyle` → usar `style` bindings.
- No usar `@HostBinding` / `@HostListener` → usar objeto `host` en decorador.
- Usar `NgOptimizedImage` para imágenes estáticas (no funciona con base64 inline).

### Inyección de dependencias
- Usar `inject()` en lugar de inyección por constructor.
- Usar `@Service()` en lugar de `@Injectable({providedIn: 'root'})` para servicios nuevos.
- Servicios singleton: `providedIn: 'root'` o `@Service()`.

### Formularios
- Preferir **Signal Forms** (`@angular/forms/signals`) para formularios nuevos.
- Cuando no se use Signal Forms, preferir **Reactive Forms** sobre Template-driven.
- Validación con mensajes en español.

---

## TypeScript

- **Strict mode** habilitado.
- No usar `any`. Usar `unknown` cuando el tipo es incierto.
- Preferir type inference cuando el tipo es obvio.
- Interfaces/types en `src/app/core/models/`.
- Enums con convention UPPER_SNAKE_CASE.

---

## Tailwind CSS

- **Utility-first**. No hay CSS modules, styled-components ni CSS global custom.
- Usar tokens de color semánticos (custom properties) en lugar de valores hardcodeados.
- No usar `@apply` abusivamente; preferir utility classes directas en el template.
- Responsive: mobile-first (`sm:`, `md:`, `lg:`).

---

## Estructura de componentes

- Componentes de negocio: `src/app/features/<feature>/`.
- Componentes compartidos: `src/app/shared/components/`.
- Cada componente en su propia carpeta: `nombre/nombre.component.ts` (+ `.html` si es externo).
- Pueden existir `.spec.ts` o `.test.ts` junto al componente para tests unitarios.
- Directivas custom: `src/app/shared/directives/`.
- Pipes custom: `src/app/shared/pipes/`.

---

## Accesibilidad (a11y)

- **WCAG AA** mínimo en todas las pantallas.
- Pasar todos los checks **AXE** (`.axe-run` o integración en CI).
- `aria-label` en todos los botones interactivos.
- `:focus-visible` con outline visible en elementos interactivos.
- Tap targets mínimo de **44px**.
- Jerarquía de headings correcta (h1 → h2 → h3).
- Estados de error no depender solo de color (texto + ícono).
- Formularios con labels asociados y mensajes de error vinculados.
- Soporte para `prefers-reduced-motion: reduce`.
- Navegación completa por teclado.

---

## State management

- **Signals** para estado local del componente.
- **`computed()`** para estado derivado.
- **Stores** (signals globales) para estado compartido entre componentes.
- Transformaciones de estado puras y predecibles.
- No usar `mutate` en signals → usar `update` o `set`.
- Actualizaciones optimísticas donde sea apropiado (acciones de michi).

---

## Git

- Commits descriptivos en **inglés**.
- Formato: `<type>(<scope>): <description>` (ej. `feat(auth): add login form`).
- No commitear `node_modules/`, archivos de build ni `.env`.
- No commitear secretos, tokens ni API keys.

---

## Testing

- **Vitest** como framework de tests.
- Tests unitarios para servicios críticos: auth, cat-state, shop, trivia.
- Tests de componentes para flujos principales.
- Archivos de test: `*.test.ts` o `*.spec.ts` junto al archivo fuente.
- Ejecutar `npm test` antes de cada commit.

---

## Dependencias

- No instalar dependencias sin avisar al usuario.
- Verificar que la dependencia ya existe en `package.json` antes de usarla.
- Preferir soluciones nativas de Angular sobre librerías externas.

---

## Archivos de configuración

- `angular.json` — configuración de Angular CLI.
- `tsconfig.json` / `tsconfig.app.json` — TypeScript.
- `.prettierrc` — formato de código.
- `.editorconfig` — configuración de editor.
- `tailwind.config.js` (si aplica) o CSS config via PostCSS.
