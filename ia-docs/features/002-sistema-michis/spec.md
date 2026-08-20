# 002 · Sistema de Michis — Spec

## Resumen
Dashboard con gestión de michis: listado, detalle con stats, acciones de cuidado (alimentar, jugar, limpiar, dormir) y adopción.

## Endpoints
- `GET /api/v1/cats` → Listar michis del usuario (max 3)
- `POST /api/v1/cats` → Adoptar michi `{ name, slotNumber, species?, personality? }`
- `GET /api/v1/cats/:id` → Detalle `{ cat, status: { isHungry, isTired, isSad, isDirty } }`
- `POST /api/v1/cats/:id/feed` → Alimentar `{ inventoryItemId }`
- `POST /api/v1/cats/:id/play` → Jugar `{ happinessGained, energyLost }`
- `POST /api/v1/cats/:id/clean` → Limpiar `{ cleanlinessRestored }`
- `POST /api/v1/cats/:id/sleep` → Dormir `{ durationMinutes, energyRecovered }`
- `DELETE /api/v1/cats/:id` → Liberar michi

## Stats del michi
- `hunger` (0-100): se decae ~1/min
- `energy` (0-100): se decae ~0.5/min
- `happiness` (0-100): se decae ~0.8/min
- `cleanliness` (0-100): se decae ~0.3/min

## UI
- Dashboard: grid de cat-cards (max 3), botón "Adoptar" si hay slots
- Cat-card: avatar, nombre, barras de stats, estado (hungry/tired/sad/dirty)
- Cat-detail: stats detallados, acciones (feed/play/clean/sleep)
- Adopt form: nombre, selección de slot

## Componentes
- `CatCardComponent` — card con stats resumidos
- `StatBarComponent` — barra de progreso para un stat
- `CatDetailComponent` — vista detallada con acciones
- `AdoptFormComponent` — formulario de adopción
