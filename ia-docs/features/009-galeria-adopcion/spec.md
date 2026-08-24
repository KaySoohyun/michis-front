# 009 · Galería de adopción (gatitos img-cat)

## Problema

La pestaña GENERAR creaba michis con IA. Se reemplaza por una galería de gatitos
reales con foto, servidos por el nuevo endpoint `GET /api/v1/kittens`
(backend feature 008). Es la única vía de adopción (continúa la 008).

## Cambios frontend

1. **Assets**: copiar los 9 PNG de `/img-cat` → `frontend/public/img-cat/`.
2. **Modelo** `KittenProfile`: `id, name, species, description, personality, lore,
   imageName: string | null, imageUrl: string | null`.
3. **`KittensService`**: `GET /kittens` (desenvuelve `{ data }`).
4. **Página ADOPTAR** (`/dashboard/adoptar`, reemplaza ai-generator):
   - Grid de tarjetas: foto (`imageUrl` si existe; si no `/img-cat/<imageName>`;
     fallback 🐱), nombre y especie.
   - Click en tarjeta → panel de perfil completo: description, personality, lore
     + botón `ADOPTAR EN SLOT N`.
   - Lógica de slots de la 008: primer slot libre real; banner + botón deshabilitado
     con los 3 slots ocupados.
   - Al adoptar: `POST /cats` con name/slotNumber/species/personality/lore del perfil;
     feedback y refresh del dashboard.
5. **Baja del generador IA**: eliminar `ai-cat-generator.component.ts`,
   `GeneratedCat` y métodos de generación en `AiService` (trivia intacta).
6. **Renombres**: ruta `ai-generator` → `adoptar`; label del nav-rail GENERAR → ADOPTAR;
   hint del dashboard "Adoptá en ✨ ADOPTAR".

## Criterios de aceptación

- [ ] La pestaña ADOPTAR muestra los 9 gatitos con su foto.
- [ ] El perfil muestra descripción, personalidad y lore antes de adoptar.
- [ ] Adoptar crea el michi en el primer slot libre y descuenta el slot.
- [ ] Con slots llenos: banner + botón deshabilitado.
- [ ] No queda código del generador IA ni referencias muertas.
- [ ] npm test + build verdes.

## Notas

- Las imágenes se sirven como assets estáticos locales mientras `imageUrl` esté vacío;
  cuando se suban a Cloudinary alcanza con actualizar el campo en la DB.
