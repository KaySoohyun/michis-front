# 008 · Adopción solo desde el generador

## Problema

La adopción vive duplicada: el dashboard ofrece `+ ADOPTAR` (header) y botones `ADOPTAR`
en los slots libres (formulario manual nombre + slot), mientras que el generador cósmico
adopta michis creados con IA. El dueño quiere una sola vía de adopción: la pestaña GENERAR.

## Decisión

- La **única** forma de adoptar es la pestaña GENERAR (`/dashboard/ai-generator`),
  y solo con michis generados por IA. No hay carga manual sin IA.
- Se elimina el formulario manual (`AdoptFormComponent`) por ser código muerto.
- El dashboard pasa a ser solo un visor/gestor de michis existentes.

## Cambios

### Frontend

1. `dashboard.component.ts`
   - Quitar botón `+ ADOPTAR` del header.
   - Slots libres: mostrar `SLOT N — Libre` + hint con link a GENERAR
     ("Adoptá uno en ✨ GENERAR"), sin acciones de adopción.
   - Eliminar `showAdoptForm`, `canAdopt` y el import de `AdoptFormComponent`.
2. Borrar carpeta `adopt-form/`.
3. `ai-cat-generator.component.ts`
   - Si los 3 slots están ocupados: banner de aviso y `ADOPTAR ESTE MICHI` deshabilitado.
   - Slot destino = primer slot libre real (menor número de `[1..3]` sin gato).
     Corrige el bug actual `3 - slot + 1`: al liberar un slot intermedio con otros
     ocupados, adoptaba sobre un slot ocupado.

## Criterios de aceptación

- [ ] El dashboard no muestra ningún botón ni formulario de adopción.
- [ ] Los slots libres invitan a ir a GENERAR (link navegable).
- [ ] `/dashboard/ai-generator` es la única vía de adopción (solo michis IA).
- [ ] Con 0 slots libres el generador avisa y deshabilita la adopción.
- [ ] Al liberar el slot 1 teniendo slots 2 y 3 ocupados, la nueva adopción va al slot 1.
- [ ] `npm test` y `npm run build` en verde.

## Fuera de alcance

- Backend: la validación de slots ya existe server-side; no cambia.
