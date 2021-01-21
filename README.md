![Veiled](./assets/media/headers/h_title_bg.png)

**Emiliagos Aarabels (EAa) [2º GDV]**

- Emile de Kadt ([edekadt@ucm.es](mailto:edekadt@ucm.es))
- Aarón Nauzet Moreno Sosa ([aarmor01@ucm.es](mailto:aarmor01@ucm.es))
- Abel Moro Paje ([abelmoro@ucm.es](mailto:abelmoro@ucm.es))
- Iago Quintas Diz ([iquintas@ucm.es](mailto:iquintas@ucm.es))

[ENLACE A PIVOTAL](https://www.pivotaltracker.com/n/projects/2467983)

![Descripción](./assets/media/headers/h_descripcion.png)

_**Veiled**_ es un juego de exploración en el que el jugador controla a María en su búsqueda por alcanzar la iluminación definitiva. Durante la exploración, la protagonista llevará una venda puesta, que no le permitirá ver de manera correcta el mundo que le rodea. Así, a lo largo de los eventos, María obtendrá fe, lo que le podrá permitir avanzar en los niveles (y por tanto en su búsqueda). Además, la cordura de la protagonista obligará al jugador a manejar correctamente el uso/desuso de la venda.

![Game screen](./assets/media/game_screen.png)

![Mecánicas](./assets/media/headers/h_mecanicas.png)

### Movimiento

La protagonista se moverá en **8 direcciones**, siendo la velocidad de movimiento de aproximadamente de 3 casillas por segundo.

### Barra de cordura

El personaje tendrá un medidor que representa su **cordura**. Funcionará a modo de barra de vida, pues al agotarse toda la barra, el jugador se verá obligado a hacer un evento, tras el cual podrá, o bien recuperar un poco de cordura y continuar, o bien tener que reiniciar desde el último punto de guardado (iglesia).

A lo largo de la partida, la cantidad de cordura especifica tendrá una serie de efectos en el jugador, como comenzar a percibir alucinaciones visuales y sonoras (que irán empeorando cuanto menor sea la cordura), además de pequeños impedimentos sensoriales, con el fin de recordarle que no puede mantenerse todo el rato sin venda.

El progreso de la barra sigue una escala logarítmica tanto en positivo como en negativo, tal que cuando está baja las pérdidas son reducidas y cuando esté alta los incrementos son reducidos.

![Cordura](./assets/media/features/sanity.gif)

### Percepción

#### Venda

El jugador tendrá puesta constantemente una **venda** , que le impide ver el mapa salvo un radio de 1 casilla alrededor del personaje (el rango de sonido de sus pasos). Aun así, es posible quitarse la venda, lo que permitirá ver mayor parte del mapa y percibir colores, pero hará que disminuya la barra de cordura hasta que vuelva a ponérsela (y no incrementa al volver a ponérsela).

Con respecto a la alteración de la visión en base a la cordura, a menos de 60% de cordura, el rango de detección de estímulos no visuales (sonidos) se limitará estrictamente al radio de detección. Por encima de este nivel, el radio define el límite de detección clara, con un efecto de difumado a todo lo que haya más allá de este punto. Este cambio tiene que ocurrir lo suficientemente rápido para ser visible.

A menos de 35% de cordura, todos estos mismos objetos se seguirán detectando, pero no se podrán identificar a simple vista en pantalla; se indicará que hay algo sin especificar el qué.

Cuando la cordura esté por debajo del 10%, no se podrá interactuar con las memorias. Se seguirá viendo en pantalla las localizaciones de estas, pero todavía sin mostrar detalle.

#### Estímulos

A lo largo del mapa, habrá una serie de **estímulos sensoriales** (sonido, olfato) que, en algunas zonas del mapa, generarán una señal según el tipo de sentido al que apele. Esto permitirá distinguir zonas especificas del mapa, como, por ejemplo, la granja.

### Fe

La **fe** sirve como principal medidor de progreso del juego. Además, en cada nivel habrá un medidor de fe conseguida a lo largo del mismo (estilo barra True Jedi del Lego Star Wars)

Después de cada nivel, se indica la fe obtenida y cuantas "misiones" has hecho en la pantalla de nivel completado.

Además, según tu nivel de fe obtenida, algunos eventos en los niveles siguientes tendrán nuevas opciones (acortar el evento principal, pero obteniendo la misma fe, por ejemplo).

### Eventos

En el mapa, habrá esparcidos una serie de **eventos de texto** (por interactuar con un objeto, con una silueta, o aleatoriamente) que permitirán responder desde con 2 a 4 opciones. Hay distintos tipos:

- **Eventos localizados:** Se encuentran en un punto concreto del mapa, se lanzan mediante interacción o posición.
  - Principales: Serán aquellos que avanzarán la trama principal de juego, y, por tanto, del nivel. Estos serán activados por los diferentes NPCs del nivel (hermano, marido, etc), y serán recordados por la silueta, un ente que aparece solo al tener la venda puesta, y que recordará al jugador que evento debe hacer. Esta linea de eventos concluirá en un gran incremento de fe y desbloqueará el siguiente nivel.
  - Secundarios: sirven para expandir la historia, obtener recompensas (cordura, fe, consumibles)

- **Eventos no localizados:** se lanzan en cualquier punto del mapa sin necesidad de interacción.

  - Trigger: se lanzan al cumplir ciertos objetivos, por ejemplo, alcanzar un _threshold_ de cordura.
  - Informativo: se lanzan para informar al jugador ya sea de un aspecto jugable (tutoriales, consejos, etc) o de historia (conversaciones).

Así, cada uno tiene un indicador de que tipo es: de avanzar en la historia, de desafío, para conseguir un objeto.... Además, algunas de estas opciones pueden tener requisitos para ser respondidas, como tener un objeto clave o tener cierto nivel de cordura.

### NPCs

Los niveles contarán con varios NPCs interactuables, que recorren un camino prestablecido, y que al interactuar con ellos activarán algún tipo de evento, ya sea principal, secundario o simplemente dialogo.

![Veiledsss](./assets/media/features/npc.gif)

### Objetos

A lo largo de la partida se podrán conseguir **objetos** , que afecten a las características del jugador (número de casillas visibles, cantidad de cordura...). Estos se podrán obtener siendo encontrados en el mapa o bien como recompensa tras un evento. Cada uno tendrá una descripción que indicará que hace cada uno. Se dividen en:

- **Claves** : Necesarios para avanzar en uno de los posibles eventos y llegar al siguiente nivel. (Ejemplo: Hacha que permite talar el árbol para llegar a la siguiente zona).
- **Consumibles** : De un solo uso, permiten recuperar cordura o tener efectos beneficiosos temporales. (Ejemplo: Caleidoscopio que disminuye el gasto de cordura con la venda quitada). También pueden lanzar eventos secundarios.

![Dinámicas](./assets/media/headers/h_dinamicas.png)

### Objetivo y conflictos

El **objetivo** del juego es ir completando los eventos principales del nivel (indicados por la silueta), para así poder ir avanzando en los distintos niveles y llegar a alcanzar la iluminación

Explorar con la venda puesta será más difícil, pero no drenará la cordura. Algunos objetos o pistas serán imposibles de encontrar con la venda puesta. Sin embargo, explorar sin la venda será mucho más rápido y eficiente, pero más arriesgado, ya que perderás cordura.

Conforme se llena y vacía la barra de cordura, los cambios en la visión están destinados a que el jugador no comience ningún objetivo nuevo cuando esté muy bajo de cordura, y se centre en restaurarla.

A lo largo del nivel la barra fluctúa bastante a lo largo de una jugada completa. La principal forma de obtener este efecto es una escala logarítmica que gobierna los cambios de nivel de la barra, de tal forma que cuando esté casi llena, la progresión se hace muy lenta, y cuando esté baja, se hace más rápida. Esto tiene dos consecuencias principales: comenzar el objetivo principal del nivel requiere tener la venda puesta durante un tiempo (para no perder cordura); y, aunque haya un nivel bajo de cordura, no implica una partida perdida, pues la escala permitirá recuperar cordura rápidamente.

### Comportamiento esperado

La búsqueda de pistas y objetos que te ayuden implica más exploración, la cual puede ser realizada con o sin venda.

Cuando el jugador entre en un nivel, primero empezará a explorar un poco, probablemente encontrando y completando por el camino algún objetivo secundario. En algún momento encontrará la silueta del nivel, y ocurrirá una de dos cosas: o el jugador tendrá suficiente cordura para emprender el objetivo, en cual caso lo hará, o no la tendrá en cual caso se acordará de la posición de la silueta mientras vuelve a buscar incrementos de cordura.

Cuando complete el objetivo principal, el jugador puede quedarse por el nivel, completando algún objetivo secundario que quiera o necesite (si encuentra y completa muy rápido el objetivo principal, es posible que no tenga suficiente fe para progresar al siguiente nivel). Para proceder al siguiente nivel, habrá que volver al punto de comienzo con la cantidad de fe requerida.

El juego tiene una dificultad baja y una longitud relativamente corta. Se espera que cualquier jugador pueda completar el juego en menos de 2 horas (?).

![Contenido](./assets/media/headers/h_contenido.png)

### Niveles

#### Preludio
El jugador se encuentra en la habitación del padre, ya en su lecho de muerte. Ahí, será guiado por una serie de instrucciones para que se adapte a los controles mientras avanza una "pequeña" historia con el padre antes de morir.

#### Pueblo
El jugador continuara explorando su pueblo natal interactuando con personajes de su infancia. El nivel estará compuesto por una zona residencial y algunos edificios clave como la casa del doctor o la estación de tren.
![pueblo](./assets/media/level_01.png)

#### Epílogo
Tras un pequeño salto temporal, María llega a la catedral, donde el obispo le cuenta la reciente muerte de su hija. Tras hacer un paralelismo con su situación, se lee la carta de su padre. A mitad de la carta, llena de dolor, sale corriendo de la catedral, corriendo por un pasillo en el que se tiene que enfrentar a los susurros con los que ha hablado, hasta llegar al final del pasillo y encontrar la iluminación.

### Historia

María busca recuperar su fe en la misericordia de Dios, y en el proceso aprenderá a aceptar su nuevo don y a ver la belleza del mundo por un nuevo medio.

Comenzará en su pueblo natal, justo al presenciar la muerte de su padre. A lo largo del juego, se adentrará en lugares progresivamente más desconocidos para ella, a la par que coge más confianza con su vista, permitiendo que su cordura se drene más lento mientras tenga la venda quitada. Al final de cada capítulo, se enfrentará a una silueta, una memoria de aspecto indefinido, de su pasado cegado. La silueta le guiará a través de una serie de eventos que le llevarán a una revelación personal.

Al final del juego habrá un último paso hacia la iluminación en la que debe pasar por un «camino de lamentos» con la venda quitada todo el tiempo.

### Eventos

Ejemplo de una evento de texto sencillo

![Evento de texto](./assets/media/features/text_event.gif)

### NPCs

#### PRELUDIO (Tutorial)

| Sprite | Nombre | Evento |
|--------|--------|--------|
| ![alt text](./assets/media/features/npcs/dad.gif)| Padre | Permite continuar el tutorial del preludio |

#### PUEBLO

| Sprite | Nombre | Evento |
|--------|--------|--------|
| ![alt text](./assets/media/features/npcs/brother.gif)| Hermano | Permite continuar el tutorial del preludio |
| ![alt text](./assets/media/features/npcs/doctor.gif)| Doctor | Permite continuar el tutorial del preludio |
| ![alt text](./assets/media/features/npcs/elder.gif)| Anciana | Permite continuar el tutorial del preludio |
| ![alt text](./assets/media/features/npcs/foreigner.gif)| Extranjero | Permite continuar el tutorial del preludio |
| ![alt text](./assets/media/features/npcs/glasses.gif)| SEÑOR??? | Permite continuar el tutorial del preludio |
| ![alt text](./assets/media/features/npcs/kid.gif)| Niño | Permite continuar el tutorial del preludio |
| ![alt text](./assets/media/features/npcs/lumberjack.gif)| Leñador | Permite continuar el tutorial del preludio |
| ![alt text](./assets/media/features/npcs/painter.gif)| Pintora | Permite continuar el tutorial del preludio |
| ![alt text](./assets/media/features/npcs/seller.gif)| Vendedor | Permite continuar el tutorial del preludio |

### Items

- **PRELUDIO (Tutorial)**

| Sprite | Nombre | Utilidad |
|--------|--------|--------|
| ![alt text](./assets/sprites/items/item_photo.png)| Foto | Permite continuar el tutorial del preludio |
| ![alt text](./assets/sprites/items/item_pendant.png)| Colgante | Aumenta la fe (+60) |

- **CLAVE**

| Sprite | Nombre | Utilidad |
|--------|--------|--------|
| ![alt text](./assets/sprites/items/item_avoiddeath.png)| Figura tallada | Te Permite sobrevivir al evento de muerte |
| ![alt text](./assets/sprites/items/item_baston.png)| Baston | Permite terminar el evento del vagabundo | 
| ![alt text](./assets/sprites/items/item_booze.png)| Botella | Permite terminar el evento de anciano |
| ![alt text](./assets/sprites/items/item_emptybucket.png)| Cubo vacio | Permite iniciar el evento del pozo |
| ![alt text](./assets/sprites/items/item_waterbucket.png)| Cubo con agua | Permite terminar el evento del pozo |
| ![alt text](./assets/sprites/items/item_flower.png)| Flor | Permite terminar el evento del cementerio |
| ![alt text](./assets/sprites/items/item_food.png)| Comida | Permite terminar el evento del niño |
| ![alt text](./assets/sprites/items/item_glasses.png)| Gafas | Permite terminar HMMMMMM  |
| ![alt text](./assets/sprites/items/item_sketch.png)| Boceto | HMMMMMMMM |
| ![alt text](./assets/sprites/items/item_moneybag.png)| Bolsa con monedas | Permite comprar un consumible a HMMMMMMMM |

- **CONSUMIBLES**

| Sprite | Nombre | Utilidad |
|--------|--------|--------|
| ![alt text](./assets/sprites/items/item_potion.png)| Poción | Recupera cordura (+30) |
| ![alt text](./assets/sprites/items/item_kaleidoscope.png)| Caleidoscopio | Reduce el gasto de cordura con la venda quitada (50%) |
| ![alt text](./assets/sprites/items/item_stamp.png)| Estampita | Aumenta la fe (+10) |
| ![alt text](./assets/sprites/items/item_blessing.png)| Bendición | Aumenta bastante la fe (+30) |
| ![alt text](./assets/sprites/items/item_blindfold.png)| Venda de tela | Aumenta la cordura máxima (+30) |
| ![alt text](./assets/sprites/items/item_sacredfire.png)| Fuego sagrado | Tu cordura maxima disminuye (-30), pero aumenta bastante tu fe |
| ![alt text](./assets/sprites/items/item_lessdeath.png)| Láudano | Menos probabiblidad de morir durante la opcion RNG del evento de muerte |

![Estética](./assets/media/headers/h_estetica.png)

El juego usa una estética minimalista, con pixel art para el mapa y los personajes y gráficos de vectores para el resto (interfaz, iconos, etc), perspectiva ortogonal y una paleta apagada.

Tileset "Interior 16x" en [OpenGameArt.org](https://opengameart.org/content/interior-tileset-16x16) creado por Bonsaiheldin para el nivel del preludio.

Tileset "Slates" en [OpenGameArt.org](https://opengameart.org/content/slates-32x32px-orthogonal-tileset-by-ivan-voirol) creado por Ivan Voirol para el nivel del pueblo.

Personajes creados con [Character Generator](https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Character-Generator).

Resto del arte creado por nosotros, puedes consultar los archivos fuente en este mismo [repositorio](https://github.com/SrVonPsikerfy/Veiled/tree/main/assets/media/source).

Música Menu Principal: In The Light - David Renda

![Controles](./assets/media/headers/h_controles.png)

Para jugar solo se necesitará el **teclado** , siendo el movimiento controlado con las teclas WASD, el uso de la venda será controlado con Espacio, la E servirá para interactuar con los elementos del entorno, Q para abrir el inventario. Para los menus y eventos, se podrá interactuar utilizando el ratón, clicando en las posibles opciones que se presentan.

![Keybinds](./assets/media/keybinds.png)

![Interfaz y Menús](./assets/media/headers/h_interfaz.png)

### Menús

El juego ofrece tres menús al jugador: uno **principal** otro de **pausa** y un último de **opciones/controles**.

- El **menú principal** se muestra al iniciar el juego y desde él se puede inciar la partidad desde el principio, seleccionar el nivel desde el que empezar o entrar al menú de opciones.
- El **menú de pausa** se accede durante la partida y es similar al menú principal, incluyendo una opción para volver a este o para reanudar la partida.
- El **menú de opciones** es accesible mediante los dos anteriores y además de resumir los controles del juego permite reducir o aumentar el volumen de los sonidos y música del mismo.

### Interfaz

La interfaz en la pantalla de juego es muy minimalista compuesta solo de la barra de ¿CORDURA?, contador de fe, pequeños _tooltips_ al acercarse a ciertos objetos con los que el jugador puede interactuar.

Además de la interfaz principal contara con un overlay simple de inventario donde se mostrarán lo objetos recolectados por el juagador durante la partida.

![Inventario](./assets/media/features/inventory.gif)

![API](./assets/media/headers/h_arquitectura.png)

![Game API](./assets/media/game_API.png)

![Referencias](./assets/media/headers/h_referencias.png)

- *La venda, Miguel de Unamuno, 1899. (Temática principal)*
- *Zelda: Link's Awakening (mundo)*
- *Into the Breach (mapa en cuanto a apariencia)*
- *Stardew Valley (mapa en cuanto a distribución)*
- *Perception (Mecánica de visión)*
- *Lego Games (Fe)*
- *La Voluntad – Azorín (Barra de Cordura)*
