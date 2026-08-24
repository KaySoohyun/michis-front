# Plan · 008 Adopción solo desde el generador

Pasos:

1. `dashboard.component.ts`: quitar adopción (header, slots, signal, imports) y agregar
   hint con `routerLink` a `/dashboard/ai-generator` en slots libres.
2. Borrar `src/app/features/dashboard/adopt-form/`.
3. `ai-cat-generator.component.ts`:
   - computed `firstFreeSlot` (menor slot libre de 1..3) y `hasFreeSlots`.
   - Banner "no hay slots" + botón deshabilitado cuando corresponda.
4. Verificación: `npm test`, `npm run build`, smoke manual de rutas.
5. Docs: `changes.md`, `roadmap.md` y cierre de `tasks.md`.
