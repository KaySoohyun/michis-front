# 002 · Sistema de Michis — Plan

## Etapa 1 — Services y modelos
- Crear `CatService` con métodos CRUD y acciones
- Crear `CatStore` (signals) para estado centralizado de michis
- Actualizar `CatModel` con stats completos

## Etapa 2 — Componentes de UI
- `StatBarComponent` — barra de progreso reutilizable
- `CatCardComponent` — card con stats y estado
- `CatDetailComponent` — vista detallada con acciones de cuidado

## Etapa 3 — Adopción y routing
- `AdoptFormComponent` — formulario de adopción
- Configurar rutas lazy: dashboard, cat/:id, adopt
- Integrar CatStore en dashboard

## Etapa 4 — Decaimiento de stats
- Implementar decaimiento periódico en CatStore
- Actualizar UI con estados visuales (colores, iconos)
