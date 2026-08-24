# 007 · Trivia con selector de dificultad — Tareas (frontend)

## Etapa 1 — Estado de la pantalla

- [x] `selectedDifficulty` como máquina de estados (null → selector)

## Etapa 2 — Selector

- [x] 4 botones pixel (easy/medium/hard/cosmic) con rango de monedas e íconos
- [x] aria-labels + tap targets ≥ 44px

## Etapa 3 — Juego y resultados

- [x] X (h-11 w-11) para volver al selector; limpia pregunta y estado
- [x] Fallo → revela solución + explicación, 0 monedas, nota de que puede reaparecer; SIGUIENTE pide otra de la misma dificultad
- [x] Acierto → `loadCoins()` siempre

## Etapa 4 — Tests + docs

- [x] 4 tests del componente (selector, difficulty en request, X, SIGUIENTE)
- [x] `npm test` verde (10/10) y `npm run build` OK
- [x] `changes.md` actualizado

## Validación

- [x] El selector aparece al entrar a /trivia sin llamar a la API
- [x] Todas las preguntas van con la dificultad elegida
- [x] La X vuelve al selector desde juego/resultados
