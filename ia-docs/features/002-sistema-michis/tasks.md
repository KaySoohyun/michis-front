# 002 · Sistema de Michis — Tareas

## Etapa 1 — Services y modelos

- [x] Actualizar src/app/models/cat.model.ts con stats completos (hunger, energy, happiness, cleanliness, etc.)
- [x] Crear src/app/services/cat.service.ts
- [x] Crear src/app/services/cat.store.ts

## Etapa 2 — Componentes de UI

- [x] Crear src/app/shared/components/stat-bar/stat-bar.component.ts
- [x] Crear src/app/features/dashboard/cat-card/cat-card.component.ts
- [x] Crear src/app/features/dashboard/cat-detail/cat-detail.component.ts

## Etapa 3 — Adopción y routing

- [x] Crear src/app/features/dashboard/adopt-form/adopt-form.component.ts
- [x] Actualizar app.routes.ts con rutas de cats
- [x] Actualizar dashboard.component.ts con CatStore

## Etapa 4 — Decaimiento de stats

- [x] Implementar decaimiento periódico en CatStore
- [x] Agregar estados visuales a cat-card y cat-detail

## Validación

- [ ] `npm start` arranca sin errores
- [ ] Dashboard muestra cat-cards o "No tienes michis"
- [ ] Adoptar michi crea nuevo michi en slot disponible
- [ ] Cat-detail muestra stats y permite acciones
- [ ] Stats se decrementan con el tiempo
