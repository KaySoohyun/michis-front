# Misión

## Qué construimos

**Michis Intergalácticos** es el frontend de un juego de mascotas virtuales espaciales. Los usuarios adoptan gatos alienígenas ("michis"), los cuidan (alimentar, jugar, limpiar, dormir), compran ítems en una tienda cósmica y responden preguntas de trivia generadas por IA.

1. **Adopción y cuidado de michis** — Adoptar hasta 3 gatos alienígenas, gestionar sus stats (hunger, energy, happiness, cleanliness) que decaen con el tiempo.
2. **Tienda e inventario** — Comprar ítems (comida, juguetes, ropa, medicina, especiales) con monedas ganadas, equipar accesorios a los michis.
3. **Trivia cósmica** — Responder preguntas de astronomía, física y cultura felina generadas por Gemini AI, ganando monedas como recompensa.

## Para quién

- **Jugadores casuales** que disfrutan de juegos de mascotas virtuales con estética espacial.
- **Amantes de los gatos** que quieren adoptar especies alienígenas creativas.
- **Curiosos** que quieren aprender astronomía y física de forma divertida vía trivia.

## Principios

- **Diversión primero** — La app debe ser entretenida, visualmente atractiva y con feedback inmediato.
- **Accesibilidad** — WCAG AA en todas las pantallas, navegable por teclado, compatible con `prefers-reduced-motion`.
- **Contenido en español** — Todo lo visible al usuario en español (argentino), con tono amigable y divertido.
- **Performance** — Lazy loading de features, images optimizadas, carga rápida.
- **Seguridad** — API keys nunca en el cliente, tokens JWT manejados vía interceptores.

## Qué NO es

- No es un juego multiplayer ni tiene elementos sociales (no hay chat, no hay rankings compartidos).
- No es una app móvil nativa; es una SPA web responsiva.
- No es una tienda real; las monedas y transacciones son virtuales dentro del juego.
- No tiene sistema de billing ni pagos reales.
