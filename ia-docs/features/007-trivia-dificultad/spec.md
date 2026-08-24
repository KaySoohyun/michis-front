# 007 · Trivia con selector de dificultad y reintento — Spec (frontend)

**Estado:** propuesta

## Qué hace

La pantalla `/trivia` arranca en un **selector de dificultad**: easy, medium, hard o cosmic (con el rango de monedas de cada uno). Al elegir, se juegan preguntas **solo de esa dificultad** hasta que el usuario vuelva al selector.

- Botón **X** (esquina superior del marco de juego) visible mientras se juega: vuelve al selector de dificultad y descarta la pregunta en curso.
- Al **acertar**: pantalla de éxito con monedas ganadas + explicación (como hoy) y botón SIGUIENTE → otra pregunta random de la misma dificultad.
- Al **fallar**: se revela respuesta correcta + explicación (como hoy), pero la pregunta **NO se marca como resuelta**: puede volver a aparecer más adelante en sorteos random. SIGUIENTE trae otra pregunta de la misma dificultad.
- La categoría sigue siendo aleatoria; solo se envía `difficulty` al backend.

## Por qué

Hoy la trivia mezcla dificultades al azar y una pregunta fallida desaparece para siempre (el banco la excluye por vista). El jugador no puede elegir un nivel desafiante ni volver a intentar lo que falló.

## Criterios de aceptación

- [ ] Al entrar a `/trivia` se ve el selector con las 4 dificultades y su rango de monedas (easy 5-10, medium 15-25, hard 30-50, cosmic 75-100).
- [ ] Elegida una dificultad, todas las preguntas siguientes son de ese nivel (`?difficulty=` en cada request).
- [ ] La X vuelve al selector desde cualquier estado (jugando, resultado) sin romper el estado global de monedas.
- [ ] Fallo muestra solución + explicación, otorga 0 monedas, y la pregunta puede reaparecer en el futuro (la maneja el backend).
- [ ] Acierto suma monedas visibles al instante.
- [ ] Tema pixel/galaxia consistente, aria-labels, foco visible, tap targets ≥ 44 px.
- [ ] `npm test` y `npm run build` en verde.

## Fuera de alcance

- Selector de categoría (sigue random).
- Persistir la dificultad elegida entre sesiones.
- Cambios visuales fuera de la pantalla trivia.
