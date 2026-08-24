# Roadmap

Orden y estado de las features. Cada entrada apunta a su carpeta en `features/`.

## Hecho ✅

1. **001 · Cimiento y Autenticación** — Infraestructura base Angular 22, Tailwind, login, registro, rutas protegidas.
2. **002 · Sistema de Michis** — Dashboard, cat-cards, detalle con stats, acciones de cuidado, adopción.
3. **003 · Tienda e Inventario** — Catálogo de ítems, compra, inventario, equipamiento de accesorios.
4. **004 · Integración de IA** — Trivia cósmica, generación de michis únicos con Gemini AI.
5. **005 · Imágenes, Polish y Despliegue** — Cloudinary upload, skeleton loading, testing unitario.
6. **006 · UI Tamagotchi Pixel Art** — Consola retro (status panel, LV cosmético, caja de diálogo, action-bar), rail flotante, profile-card sin navbar, dashboard como selector compacto, login/register en tema pixel.
7. **007 · Trivia con selector de dificultad** — Selector easy/medium/hard/cosmic con recompensas, X para volver al selector, fallo no resuelve la pregunta (puede reaparecer).
8. **008 · Adopción solo desde el generador** — El dashboard deja de adoptar (hint a GENERAR en slots libres); se elimina el formulario manual y el generador bloquea la adopción con slots llenos, eligiendo siempre el primer slot libre real.
9. **009 · Galería de adopción** — La pestaña ADOPTAR (`/dashboard/adoptar`) muestra los 9 gatitos reales de `img-cat` (endpoint `GET /kittens` del backend) con su perfil completo; se elimina el generador IA de michis.
10. **010 · Adopción diaria** — Cards autocontenidas (foto + datos + botón ADOPTAR en la misma card) con la rotación diaria del backend: máximo 4 gatitos distintos por día; assets actualizados a los 17 `michi1..17`.

## Siguiente 🔜

- **Sistema real de XP/niveles persistido** — ver backlog.

## Backlog / ideas 💡

- **Sistema real de XP/niveles** — Persistir EXP por acciones en backend y desbloqueos.
- **Sprites pixel-art del michi** — Reemplazar placeholder ASCII por sprites animados cuando haya assets.

> Cada feature nueva se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código.
