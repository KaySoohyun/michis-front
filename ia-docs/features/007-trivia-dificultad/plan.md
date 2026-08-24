# 007 · Trivia con selector de dificultad — Plan (frontend)

## Etapa 1 — Estado de la pantalla
- Signal `selectedDifficulty: 'easy' | 'medium' | 'hard' | 'cosmic' | null` como máquina de estados:
  - `null` → selector; elegida → carga primera pregunta con `?difficulty=`.
  - X → reset a selector (limpia pregunta/resultado en AiService).

## Etapa 2 — Selector
- Vista con 4 botones pixel (easy/medium/hard/cosmic), cada uno con nombre, rango de monedas (5-10 / 15-25 / 30-50 / 75-100) e ícono.
- Accesibilidad: aria-labels, foco visible, tap targets ≥ 44 px.

## Etapa 3 — Juego y resultados
- Header de juego con la X para volver al selector.
- Fallo → muestra solución + explicación + 0 monedas; SIGUIENTE pide otra pregunta de la misma dificultad (la fallida puede reaparecer: lo maneja el backend).
- Acierto → monedas visibles al instante (refrescar UserService siempre al acertar) + explicación.

## Etapa 4 — Tests + docs
- Tests del componente: selector renderiza 4 niveles, elección dispara request con difficulty, X vuelve al selector.
- Actualizar `arquitecture.md` si cambia algo estructural + `changes.md`.
