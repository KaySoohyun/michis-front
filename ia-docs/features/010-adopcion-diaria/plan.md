# 010 · Adopción diaria — Plan (frontend)

## Pasos

### 1. Assets

- Copiar `michi1..17` desde `/img-cat` raíz → `frontend/public/img-cat/`.
- Borrar `g28.png`, `image1.png`, `image1-9.png`, `image1-37.png`, `image18.png`,
  `image19.png`, `image28.png`, `image29.png`, `image30.png`.

### 2. Card autocontenida en `adoptar.component.ts`

- Template de card:
  - header: foto cuadrada (`kittensService.imageUrl`, fallback 🐱) + nombre + especie,
  - `<dl>` con DESCRIPCIÓN / PERSONALIDAD / HISTORIA,
  - botón `ADOPTAR EN SLOT {{ firstFreeSlot() }}` (misma lógica y estados que hoy),
  - error de `catStore` renderizado dentro de la card.
- Eliminar: señal `selectedKitten`, panel de perfil, botón X.
- Grid: `grid-cols-1 md:grid-cols-2` (cards más grandes), quitar `lg:grid-cols-3`.
- Hint bajo el título sobre la rotación diaria.

### 3. Verificación visual/a11y

- Tema pixel (`pixel-frame`, fuentes display/body), contraste, aria-labels,
  foco visible, tap targets ≥ 44 px.

### 4. Docs

- `ia-docs/init/arquitecture.md`: actualizar descripción de adoptar (cards
  completas, rotación diaria).
- `ia-docs/init/changes.md`: nota de la feature.
- `constitution/roadmap.md`: mover 010 a Hecho al terminar.

## Verificación

```bash
npm test          # suite verde
npm run build     # build OK con las nuevas imágenes en dist
```
