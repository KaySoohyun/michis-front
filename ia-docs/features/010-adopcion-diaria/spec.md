# 010 · Adopción diaria: cards completas (gatito del día)

**Estado:** propuesta

## Qué hace

La pestaña ADOPTAR (`/dashboard/adoptar`) muestra la **rotación diaria** que trae el
backend (`GET /kittens`, feature 009 backend): máximo 4 gatitos por día, sin
repetidos, y cambia al día siguiente.

Cada mascota se presenta en una **card completa autocontenida**: foto, nombre,
especie y sus datos (descripción, personalidad, historia) **dentro de la card**, con
el botón `ADOPTAR` directamente en ella (sin anunciar el slot: la adopción siempre
va al primer slot libre que tenga el usuario). Se elimina el panel de perfil
aparte: ya no hay click → detalle, todo se ve de una.

## Por qué

Con solo 4 candidatos por día no hace falta un nivel de navegación (grid + panel);
mostrar todo en la card reduce los pasos para adoptar y aprovecha las fotos nuevas.
La rotación diaria le da motivo para volver mañana.

## Cambios frontend

1. **Assets**: copiar `michi1.png … michi17.png` de `/img-cat` raíz →
   `frontend/public/img-cat/` y eliminar los viejos (`g28.png`, `image*.png`)
   que ya no existen en el repo.
2. **Card rediseñada** (`adoptar.component.ts`):
   - foto cuadrada + nombre + especie,
   - datos visibles: descripción, personalidad, historia,
   - botón `ADOPTAR` con la lógica existente (primer slot libre real;
     deshabilitado + banner con los 3 slots ocupados; el error de adopción
     se muestra solo en la card del gatito intentado),
   - feedback de error de adopción dentro de la card.
3. **Baja del panel de perfil**: fuera `selectedKitten`, la X y su template; el
   grid pasa a 1 columna en mobile / 2 en desktop (cards más altas).
4. **Copy**: hint de rotación bajo el título, p. ej. "Hoy están estos 4; mañana
   llegan otros viajeros." (texto exacto se define al implementar).

## Criterios de aceptación

- [ ] La galería muestra como máximo 4 cards, todas de mascotas distintas.
- [ ] Cada card contiene foto, nombre, especie, descripción, personalidad,
      historia y botón de adoptar.
- [ ] Adoptar desde cualquier card crea el michi en el primer slot libre y
      refresca el dashboard; errores se muestran en la card.
- [ ] Con slots llenos: banner + todos los botones deshabilitados.
- [ ] No queda código ni referencias del panel de perfil anterior.
- [ ] Tema pixel/galaxia consistente, aria-labels, foco visible, targets ≥ 44 px.
- [ ] `npm test` y `npm run build` verdes.

## Fuera de alcance

- Lógica de rotación/dedup (la resuelve el backend, feature 009).
- Selector o recarga manual de lote ("ver otros michis hoy").
- Subir imágenes a Cloudinary (siguen siendo assets locales).
