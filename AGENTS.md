# AGENTS.md - Frontend

Sistema SaaS multi-tenant de soporte, con agentes, supervisores, administradores, auditores, base de conocimiento, asistencia LLM responsable y fuerte énfasis en seguridad, PII, auditoría y prevención de fuga de información.

## Stack

- **Angular 22** (SPA)
- **Angular Router**
- **Angular Signals + Signal Forms**
- **Tailwind CSS 4**
- **TypeScript 6**
- **Vitest** para tests
- **npm** como package manager

No hay base de datos en el frontend. Consumo de APIs del backend vía HTTP.

## Comandos

```bash
npm start       # servidor de desarrollo (ng serve)
npm run build   # build de producción
npm test        # ejecutar tests
```

## Estructura del proyecto

```
src/
  app/
    components/
    services/
    models/
```

## Convenciones

- Todo el contenido visible en español.
- Seguir `ia-docs/init/conventions.md` para reglas detalladas.
- Documentar todos los cambios en `ia-docs/init/changes.md`.
- Seguir el archivo `ia-docs/init/best-practices.md`.

## No hagas

- No instalar dependencias sin avisar.
- No usar `any` en TypeScript sin justificarlo.

## Herramientas

- **Context7**: Usar `context7_resolve-library-id` y `context7_query-docs` para consultar documentación actualizada de cualquier librería o framework antes de implementar.
- **frontend-design**: Usar la skill `frontend-design` para tareas de UI/visual. Cargar con `skill("frontend-design")` antes de diseñar o implementar componentes visuales.
- **typescript-best-practices**: Usar la skill `typescript-best-practices` para autocompletado, tipos estrictos y prevención de bugs silenciosos.

## Flujo de trabajo

1. **Spec primero:** para cada feature, crear `ia-docs/features/NN-nombre/` con `spec.md`, `plan.md` y `tasks.md`. Esperar a que el usuario revise y dé OK antes de tocar código.
2. **Implementar solo con OK:** una vez aprobado el spec, implementar las tareas de `tasks.md` de a una.
3. **Una tarea a la vez; al terminar**, decir qué se cambió para que el usuario lo revise.
4. **Si no estás seguro al 80%,** preguntar. No inventar.
5. **Al terminar,** marcar las tareas en `tasks.md`, mover la feature a "Hecho" en `roadmap.md` y actualizar documentación.

## Datos de la app

- **Entorno:** Single Page Application (SPA) construida con **Angular 22**.
- **Backend/API:** Consumo de APIs del backend NestJS vía HTTP.
- Accesibilidad: aria-labels, focus-visible, roles semánticos.

Cómo usarla:
1. **Antes de implementar**, leer `ia-docs/constitution/` para no contradecirla.
2. **Para una feature nueva**, crear `ia-docs/features/NN-nombre/` (siguiente número libre) con `spec.md` → `plan.md` → `tasks.md`.
3. **Esperar OK del usuario** antes de escribir código.
4. **Al terminar**, marcar las tareas en `tasks.md` y mover la feature a "Hecho" en `constitution/roadmap.md`.
5. La constitución manda: si una feature choca con `mission.md` o `tech-stack.md` (p. ej. pide un build o una dependencia) se replantea la feature, no la constitución.

---

# Guías de Desarrollo - Angular

Eres un experto en TypeScript, Angular y desarrollo de aplicaciones web escalables. Escribe código funcional, mantenible, performant y accesible siguiendo las mejores prácticas de Angular y TypeScript.

## TypeScript Best Practices

- Use strict type checking
- Prefiere type inference cuando el tipo es obvio
- Evita el tipo `any`; usa `unknown` cuando el tipo es incierto

## Angular Best Practices

- Usa siempre standalone components sobre NgModules
- NO debes poner `standalone: true` dentro de decoradores Angular. Es el default en Angular v20+.
- NO pongas `changeDetection: ChangeDetectionStrategy.OnPush` explícitamente. `OnPush` es el default en Angular v22+.
- Usa signals para state management
- Implementa lazy loading para rutas de features
- NO uses los decoradores `@HostBinding` y `@HostListener`. Pon host bindings dentro del objeto `host` del decorador `@Component` o `@Directive`
- Usa `NgOptimizedImage` para todas las imágenes estáticas.
  - `NgOptimizedImage` no funciona con imágenes inline base64.

## Accessibility Requirements

- DEBE pasar todos los checks AXE.
- DEBE seguir todos los mínimos WCAG AA, incluyendo focus management, color contrast y atributos ARIA.

### Components

- Mantén componentes pequeños y enfocados en una única responsabilidad
- Usa las funciones `input()` y `output()` en lugar de decoradores
- Usa `computed()` para estado derivado
- Prefiere templates inline para componentes pequeños
- Prefiere Signal Forms (`@angular/forms/signals`) para formularios nuevos. Son estables en Angular v22+ y proveen estado basado en signals, acceso type-safe a campos y validación basada en schemas
- Cuando no uses Signal Forms, prefiere Reactive forms sobre Template-driven
- NO uses `ngClass`, usa `class` bindings en su lugar
- NO uses `ngStyle`, usa `style` bindings en su lugar
- Cuando uses templates/styles externos, usa rutas relativas al archivo TS del componente.

## State Management

- Usa signals para estado local del componente
- Usa `computed()` para estado derivado
- Mantén transformaciones de estado puras y predecibles
- NO uses `mutate` en signals, usa `update` o `set` en su lugar

## Templates

- Mantén templates simples y evita lógica compleja
- Usa control flow nativo (`@if`, `@for`, `@switch`) en lugar de `*ngIf`, `*ngFor`, `*ngSwitch`
- Usa el async pipe para manejar observables
- No asumas que globals como (`new Date()`) están disponibles.

## Services

- Diseña servicios con una única responsabilidad
- Usa la opción `providedIn: 'root'` para servicios singleton
- Prefiere el decorador `@Service` sobre `@Injectable({providedIn: 'root'})` para servicios singleton nuevos (Angular v22+)
- Usa la función `inject()` en lugar de inyección por constructor
