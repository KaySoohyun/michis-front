# UI Michis galacticos

## Estilo

- Fondo color galaxia con estrellas
- Pixel art
- fonts:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Kode+Mono:wght@400..700&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=VT323&family=WDXL+Lubrifont+JP+N&display=swap" rel="stylesheet">

.vt323-regular {
  font-family: "VT323", monospace;
  font-weight: 400;
  font-style: normal;
}


.kode-mono-<uniquifier> {
  font-family: "Kode Mono", monospace;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}

.quantico-regular {
  font-family: "Quantico", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.quantico-bold {
  font-family: "Quantico", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.quantico-regular-italic {
  font-family: "Quantico", sans-serif;
  font-weight: 400;
  font-style: italic;
}

.quantico-bold-italic {
  font-family: "Quantico", sans-serif;
  font-weight: 700;
  font-style: italic;
}

.chakra-petch-light {
  font-family: "Chakra Petch", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.chakra-petch-regular {
  font-family: "Chakra Petch", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.chakra-petch-medium {
  font-family: "Chakra Petch", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.chakra-petch-semibold {
  font-family: "Chakra Petch", sans-serif;
  font-weight: 600;
  font-style: normal;
}

.chakra-petch-bold {
  font-family: "Chakra Petch", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.chakra-petch-light-italic {
  font-family: "Chakra Petch", sans-serif;
  font-weight: 300;
  font-style: italic;
}

.chakra-petch-regular-italic {
  font-family: "Chakra Petch", sans-serif;
  font-weight: 400;
  font-style: italic;
}

.chakra-petch-medium-italic {
  font-family: "Chakra Petch", sans-serif;
  font-weight: 500;
  font-style: italic;
}

.chakra-petch-semibold-italic {
  font-family: "Chakra Petch", sans-serif;
  font-weight: 600;
  font-style: italic;
}

.chakra-petch-bold-italic {
  font-family: "Chakra Petch", sans-serif;
  font-weight: 700;
  font-style: italic;
}


.wdxl-lubrifont-jp-n-regular {
  font-family: "WDXL Lubrifont JP N", sans-serif;
  font-weight: 400;
  font-style: normal;
}


## michis: pantalla inicial

Cada gato tiene su cajita con tres botones: Alimentar, jugar y limpiar.
A demas hay un cuadro de dialogo donde aparecen mensajes randoms.
Al medio de la cajita se encuentra el michi.

+------------------------------------+
|                                    |
|                                    |
|              ／l、                  |
|            （ﾟ､ ｡ ７                |
| ⠀           |,   ~ヽ               |
|             じしf_, )ノ             |
|                                    |
|                                    |
|                                    |
| +--------------------------------+ |
| |  el michi está enojado         | |
| |  proba alimentarlo             | |
| +--------------------------------+ |
|                                    |
|  +---------------+  +-----------+  |
|  |   alimentar   |  |   jugar   |  |
|  +---------------+  +-----------+  |
+------------------------------------+

- Se tienen que poder ver solo tres michis. No se permiten más por usuario.
- Tambien está la posibilidad de tener los stats del gato en el espacio de los botones y agregar un chevron como boton arriba que muestre una pequeñita barra lateral a la derecha, con botones: comida, jueguetes, limpieza, jugar. Si haces click en comida se abre otra barra lateral con las comidas que hay en el inventario. En juguetes pasa lo mismo. En limpieza se limpia la caja de arena que no se vendio. En jugar salen las opciones tambie: acicalar, etc que solo hacen una animacion en el gato pero le suben la energía.
Alimento sube corazon, atun ayuda al cuerpo. juguetes suben energía y limpieza sube corazon.
Solo tenemos dos stats: corazon y energía. Debería haber uno de vitamina y otro de magia pero no se bien como incluirlos.

- Interfaz de juego estilo Tamagotchi en pixel art. Barra superior con fecha, nombre del personaje, hora. Panel lateral izquierdo de STATUS con barras de estado (con 5 cuadrados llenos/vacios): HAPPY (corazones), HUNGRY, ENERGY, CLEAN (cuadrados rellenos). Indicador de nivel LV.07 con barra de experiencia EXP 120/200. Caja de diálogo con mensaje motivacional. Menú inferior con 4 botones de acción: FEED, CARE, GAME y STUDY cada uno con su ícono pixelado. Estética retro de consola portátil.