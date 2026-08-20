# 004 · Integración de IA — Spec

## Resumen
Generación de michis únicos con lore vía Gemini AI y trivial cósmico educativo.

## Endpoints
- `POST /api/v1/ai/generate-cat` → `{ theme?, difficulty? }` → michi con lore, stats, apariencia
- `GET /api/v1/ai/generate-trivia` → `?difficulty=medium&category=astronomy` → pregunta con 4 opciones
- `POST /api/v1/ai/trivia/answer` → `{ triviaId, answer }` → resultado + monedas
- `GET /api/v1/ai/trivia/history` → historial del usuario

## UI
- AI Cat Generator: formulario para generar michi con tema y rareza, preview del resultado
- Trivia: pregunta con 4 opciones, feedback, recompensa en monedas
