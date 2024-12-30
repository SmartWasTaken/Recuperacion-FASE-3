# GDD - LABRATS

![PORTADA](https://github.com/user-attachments/assets/6f8a6e2c-2bb6-4277-863f-e4bb4e89a232)
> Portada del juego

LABRATS es un juego arcade 1vs1 en el que ambos jugadores tomarán el rol de una rata o un científico. La rata deberá sobrevivir a los intentos del científico por acabar con ella.

  - Iván de Castilla Guitián, i.decastilla.2022@alumnos.urjc.es, @smartwastaken
  - Ismael Esteban Liberal, i.esteban.2022@alumnos.urjc.es, @ismaest
  - Javier San Juan Ledesma, j.sanjuan.2021@alumnos.urjc.es, @KaZeRHD
  - Xabier López Aguilera, x.lopez.2022@alumnos.urjc.es, @ReibaxL

> ## Guía de instalación para Windows
Aquí se recogen los pasos para la instalación del proyecto en Windows.

 	Descarga
Descarga LabRats-fase3.zip en la [pestaña de releases](https://github.com/ismaest/JER-24-25/releases).
 	
	Dependencias
- [Java 8](https://www.java.com/en/download/) (o una versión superior).

- [Java JDK 17](https://www.oracle.com/es/java/technologies/downloads/#jdk23-windows) (o una versión superior).

‎ 
	
 	Compilación
  Es necesario extraer el .zip en una carpeta y acceder a la carpeta "target" del proyecto, donde se encuentra el archivo **"labrats.jar"**. 
  Allí, se debe copiar la ruta del explorador de archivos.
  Posteriormente, abrir Símbolo del sistema y escribir cd en la terminal, seguido de la ruta previamente copiada.
  Tras esto, copiar el siguiente código en la consola: **java -jar labrats.jar**
 	
  	Ejecución
Para ejecutar el juego debemos conocer la IP del dispositivo que actuará como servidor. Para ello, escribimos "ipconfig" en la misma consola.
Al obtenerla, la escribiremos como enlace en nuestro navegador, seguida de :8080. De esta forma, el juego se ejecutará en nuestro navegador.


## ÍNDICE

```
1. Introducción
  1.1 Título del juego
  1.2 Concepto principal
  1.3 Características Principales
  1.4 Género
  1.5 Propósito y público objetivo
  1.6 Jugabilidad
  1.7 Estilo Visual
  1.8 Alcance
  1.9 Plataforma
  1.10 Licencia
  1.11 Análisis DAFO
  1.12 Metas del proyecto
  1.13 Fases de desarrollo
  1.14 Riesgos Técnicos y Desafíos

2. Diseño del juego
  2.1 Guion
  2.2 Mecánicas
  	2.2.1 Controles iniciales
  	2.2.2 Balance de roles	
  2.3 Estados
  2.4 Interfaces

3. Desarrollo del Juego
  3.1 Niveles
  3.2 Personajes
  3.3 Ítems
    3.3.1 Ayudas para La Rata
    3.3.2 Trampas para La Rata
  3.4 Logros

4. Apartado Artístico
  4.1 Música y Sonidos
  4.2 Arte y concept art
    4.2.1 Perspectiva de la cámara
    4.2.2 Paleta de colores
    4.2.3 Concept art

5. Equipo Autor
  5.1 Javier San Juan Ledesma
    5.1.1. Primera fase de desarrollo: Javier
    5.1.2. Segunda fase de desarrollo: Javier
    5.1.3. Tercera fase de desarrollo: Javier
  5.2 Iván De Castilla Guitián
    5.2.1. Primera fase de desarrollo: Iván
    5.2.2. Segunda fase de desarrollo: Iván
    5.2.3. Tercera fase de desarrollo: Iván
  5.3 Ismael Esteban Liberal
    5.3.1. Primera fase de desarrollo: Ismael
    5.3.2. Segunda fase de desarrollo: Ismael
    5.3.3. Tercera fase de desarrollo: Ismael
  5.4 Xabier López Aguilera
    5.4.1. Primera fase de desarrollo: Xabier
    5.4.2. Segunda fase de desarrollo: Xabier
    5.4.3. Tercera fase de desarrollo: Xabier

6. Funciones de red

7. Créditos

8. Anexos
  8.1. Futuras Características

```

> ## 1. Introducción

En este documento se detallan todos los requisitos y especificaciones del videojuego “Labrats”, creado para la asignatura Juegos en Red del grado en Diseño y Desarrollo de Videojuegos de la Universidad Rey Juan Carlos.

> ## **1.1 Título del juego**

El título del juego es “Labrats”. Se ha elegido este título a raíz de la ambientación elegida para el mismo, donde se nos presentan dos roles jugables: Unas ratas de laboratorio o un científico loco.

> ## **1.2 Concepto principal**

Un videojuego en el que dos jugadores deben competir el uno contra el otro en una especie de carrera de obstáculos. Mientras que uno de los jugadores debe llegar hasta la meta esquivando obstáculos mortales, el otro jugador es quien controla la activación de dichos obstáculos, con el objetivo de detener el avance del jugador contrario.


> ## **1.3 Características Principales**

Aquí se definen las principales características del juego:

  **- División del juego en niveles:** El juego contará con varios niveles, o carreras, para que los jugadores puedan elegir qué circuito quieren jugar.

  **- Frenetismo:** El juego será rápido y frenético, exigiendo a ambos jugadores que estén atentos el uno del otro para poder lograr sus objetivos personales.

  **- Diversión:** La idea principal del juego siempre está en divertir a los jugadores. El estilo desenfadado del juego y su inmediatez dan pie a partidas rápidas y divertidas donde la competitividad desemboca en momentos de diversión.

  **- Competitividad:** Uno de los componentes principales también es la competitividad entre jugadores, dado que, al fin y al cabo, solo puede ganar uno.

> ##  **1.4 Género**

Se trata de un juego de género Death Run, caracterizado por dividir a los jugadores en roles, teniendo generalmente uno de ellos escapar con vida como objetivo, mientras que el contrario debe activar trampas mortales para acabar con el primero. Debido a la propia característica del género, también se puede considerar como un juego multijugador. Además, se puede categorizar como juego 2D debido a la estética escogida.

> ## **1.5 Propósito y público objetivo**

Es un juego divertido y competitivo que busca un desafío para ambos jugadores, apto para todos los públicos por encima de los 7 años.

> ## **1.6 Jugabilidad**

La jugabilidad dependerá del rol que tome cada jugador en función de la partida. En caso de ser “La Rata” se deberá avanzar por el mapa saltando por diferentes plataformas evitando las trampas mortales. En el caso de tomar el rol del “El Científico” debes observar la trayectoria que sigue “La Rata” y activar las trampas por las que pase en el momento idóneo para terminar con su vida.

> ## **1.7 Estilo Visual**

Es un juego 2D con un estilo comiquero y de esbozo como si estuviera dibujado en un cuaderno.

> ## **1.8 Alcance**

Este proyecto se plantea únicamente como un prototipo jugable sin la posibilidad de ser ampliado hasta un producto final ni comercial.

> ## **1.9 Plataforma**

El juego estará disponible tan solo en ordenador. Se podrá jugar tanto de forma local, como en dos ordenadores de forma online.

> ## **1.10 Licencia**

La licencia del proyecto es Apache-2.0 license. También se incluye la biblioteca Phaser de código abierto para el desarrollo del videojuego.

> ## **1.11 Análisis DAFO**

Aquí se recoge el análisis DAFO realizado previo al comienzo del desarrollo del juego.
![DAFO](https://github.com/user-attachments/assets/23be39b4-e0c7-4482-b1da-6e2402f4d56b)
> Análisis DAFO

> ##  **1.12 Metas del proyecto**

Es un proyecto académico, realizado con el fin de profundizar en el tema de juegos en redes, y con la intención de aprender todo lo posible dentro de este área, para ampliar nuestro conocimientos y ser capaces de aplicarlos en nuestro futuro.

> ##  **1.13 Fases de desarrollo**

El desarrollo del videojuego se dividirá en 5 fases:

  **- Fase 1:** formación del equipo de desarrollo, elección de la temática del juego, diseño de las mecánicas e identificación y descripción de las funcionalidades principales. El objetivo de esta fase será la creación del GDD.

  **- Fase 2:** desarrollo de juego en local.

  **- Fase 3:** extensión del juego incluyendo un back-end que utilice tecnología REST.

  **- Fase 4:** extensión del juego utilizando REST y WebSockets.

  **- Fase 5 (opcional):** Mejoras finales / Publicación del juego


> ##  **1.14 Riesgos Técnicos y Desafíos**

A lo largo del desarrollo del juego, en cuanto a la adaptación de las diferentes fases, se ha considerado que se encontrarán posibles desafíos, y se ha tenido en cuenta una serie de riesgos técnicos, que se deberán de abordar a lo largo de dicho desarrollo.

Entre ellos, nos encontramos con desafíos como:

  - Dificultad para entender la teoría, y por lo tanto, dificultad al implementar el código para la realización del ejercicio.

  - Dificultad a la hora de implementar dicha teoría en base a la idea que se ha concretado.

  - Falta de tiempo para poder refinar aspectos más técnicos dentro de las mecánicas y la jugabilidad.


> ## 2. Diseño del juego


> ##  **2.1 Guion**

El juego transcurrirá en un laboratorio en el que un científico está experimentando con ratas para poner a prueba su inteligencia. Durante este experimento, este las coloca en un laberinto que cuenta con pruebas mortales, buscando poner a prueba la capacidad de deducción de estos animales.


> ##  **2.2 Mecánicas**

El juego se desarrolla en partidas rápidas, donde un jugador debe esquivar las trampas activadas por su rival. Un jugador se mueve por un escenario lleno de trampas, mientras que el otro avanza sin preocupación por un escenario con botones y otros mecanismos que puede utilizar para activar dichas trampas.

Las trampas tienen el objetivo de matar a las ratas, y estas deben esquivarlas para evitar morir. Si mueren menos de 3 ratas antes de llegar a la meta, ese jugador habrá ganado. Si por el contrario, el científico que activa las trampas logra matar 3 veces al contrario, él será el ganador.

	2.2.1 Controles
La Rata: <br>
	**- W:** Avanzar hacia arriba. <br>
	**- A:** Avanzar hacia la izquierda. <br>
 	**- D:** Avanzar hacia ala derecha. <br>
	**- S:** Avanzar hacia abajo. <br>

El Científico: <br>
	**- Flecha arriba:** Accionar la trampa que se corresponde con la posición en la que te encuentras. <br>
 	**- Flecha izquierda:** Desplazarse a la izquierda. <br>
	**- Flecha derecha:** Desplazarse a la derecha. <br>

	2.2.2 Balance de roles

Aquí se plantea el balance de roles para que el juego sea equitaativo y justo para ambos jugadores: <br>
	**- La Rata:** No sabe cuándo el científico accionará la trampa. Debe intentar engañarlo para forzarle a activar la trampa cuando él esté fuera de peligro. <br>
	**- El Científico:** Existe un retardo desde que se acciona el botón hasta que ocurre la acción, por lo tanto, este debe anticiparse a los movimientos de la rata, sabiendo que le puede engañar dicha rata. <br>


> ## **2.3 Estados**

Entre los diferentes estados del juego, se plantean:

  - Menú de inicio
  - Menú de pausa
  - Menú de configuración
  - Selección de rol
  - Juego
  - Pantalla de victoria/derrota
  - Créditos

> ## **2.4 Interfaces**
Aquí se recogen las diferentes interfaces del juego:

![inicio](https://github.com/user-attachments/assets/c4cac163-e82a-4279-80ad-6460dd49c21c)
> Pantalla de inicio.

![opciones](https://github.com/user-attachments/assets/746912f7-799b-42ce-9371-9edc2abcf1c6)
> Pantalla de opciones.

![carga](https://github.com/user-attachments/assets/94275833-f9c4-4b28-a0f5-c16fb9141c60)
> Pantalla de carga.

![menuTutorial](https://github.com/user-attachments/assets/504c3938-bc13-4afa-bba3-a71999bfe8b6)
> Pantalla de tutorial.

![gameBackground](https://github.com/user-attachments/assets/300955c1-ebce-48fe-befb-d91ae2ec92a4)
> Fondo sobre el que se coloca el nivel principal.

![juego](https://github.com/user-attachments/assets/a631c97a-2bca-4152-be0c-6b1ce14b3c52)
> Pantalla de juego.

![loseBackground](https://github.com/user-attachments/assets/ce1da9f6-9150-4145-a39d-df4bacf42276)
> Pantalla de victoria para el científico.

![winBackground](https://github.com/user-attachments/assets/99150b8f-03a9-4856-9cfa-3f9c1ea7bcef)
> Pantalla de victoria para la rata.

![credits](https://github.com/user-attachments/assets/fae96f76-2bd3-4a0c-873f-726587d9bf0c)
> Pantalla de créditos.


> ## 3. Desarrollo del Juego


> ## **3.1 Niveles**

> [!NOTE]
> Para este prototipo se ha decidido realizar un único nivel en el que se presenten todas las mecánicas del juego.
> Para futuros prototipos se incluirán más niveles.
 
Se van a diseñar dos carreras para dar a los jugadores un poco de variedad y que no se aburran rápidamente del juego. Dichas carreras contarán con trampas únicas y una estética propia.

  **- Laboratorio 1:** Se desarrolla dentro de un centro de control donde se evalúa el comportamiento de la rata y tiene que llegar a una trampilla (objetivo). Dicha rata deberá escapar del centro de control sorteando trampas que se encuentran dispuestas por toda la sala (objetos punzantes, sustancias químicas peligrosas, entre otras).

  **- Laboratorio 2:** Después de escapar por la trampilla del primer laboratorio, nos encontramos dentro del sótano que lleva directamente a las alcantarillas del laboratorio (objetivo). En el sótano nos encontramos con aparatos peligrosos que fueron diseñados con un fin pero que fueron descartados y guardados en dicho sótano.


> ## **3.2 Personajes**

El juego cuenta con dos personajes:

  - La Rata, que es el jugador que debe esquivar las trampas para sobrevivir. Cuenta con movimiento libre por el escenario y tres vidas en total.

    ![rata](https://github.com/user-attachments/assets/623009e2-1304-4977-b7df-405f106ff321)
    > Sprite utilizado para la rata.


  - El Científico, que es el jugador que activa las trampas del escenario. Solo será visible su mano, que tiene un movimiento limitado entre los tres botones disponibles a pulsar.

    ![hand](https://github.com/user-attachments/assets/b7dd86e8-686b-4c8a-9c31-3678e579b7b8)
    > Sprite de la mano del científico.
    

> ## **3.3 Ítems**
Aquí se recogen los diferentes objetos presentes en el juego. 

 	3.3.1 Ayudas para La Rata
  
  **- Clonación:** Cuando La Rata cae en alguna de las trampas, el jugador pierde una vida de las tres totales, teniendo que volver a empezar el laberinto. En el escenario podemos encontrar diferentes matraces de clonación que nos permiten aumentar nuestro número de vidas. (Figura 1) <br>
  
  **- Alcantarillas:** En el escenario hay repartidas varias alcantarillas que actuan como teletransportes entre diferentes puntos del mapa. Pueden ser útiles para avanzar por el mapa. (Figura 2) <br>

	3.3.2 Trampas para La Rata
 
 **- Inyección letal:** Aguja activable por el científico que, en caso de colisionar con la rata, termina con su vida de inmediato. (Figura 3)<br>
 
 **- Trampilla:** Trampilla activable que, en caso de activarse con una rata sobre ella, termina con su vida. (Figura 4) <br>
 
 **- El queso:** Diferentes quesos colocados por el escenario, aunque por defecto están escondidos y deben de ser activados por el científico. En caso de que la rata choque con un queso, se reducirá significativamente su velocidad de movimiento durante diez segundos. (Figura 5) <br>

![clon](https://github.com/user-attachments/assets/8d5a8f32-84a7-4239-b431-53dad5726c82)
> Sprite de la clonación (Figura 1)

![tpB](https://github.com/user-attachments/assets/181fa47a-27bf-4afd-a90b-0a7adfc80333)
> Sprite de la alcantarilla (Figura 2)

![needle](https://github.com/user-attachments/assets/ddc97365-5be9-491e-b32c-d53882928447)
> Sprite de la inyección letal (Figura 3)

![trapdoor](https://github.com/user-attachments/assets/089c7d4f-6a85-4459-b956-e82fd681e3d2)
> Sprite de la trampilla (Figura 4)

![cheeseOpen](https://github.com/user-attachments/assets/2af7b168-2f58-49cb-bb62-a6c23ad733c7)
> Sprite del queso (Figura 5)


> ## **3.4 Logros**


  - El Escapista: Escapa del laboratorio sin perder una rata.

  - Manny Manitas: Acaba con las 3 ratas en menos de 3 mins.

  - Tanto en la tierra como en el cielo: Revive 3 veces.

  - Houdini: Consigue que el científico no active una de las trampas.

  - Me gusta el queso, pero no tanto: Escapa del laboratorio en menos de 10 mins.

  - Ratatouille: Sé cocinar, no escapar (muere 3 veces sin clonación).

  - Victor Frank: Acaba con todas las ratas.

> ## **3.5 Diagrama UML**
![UML_JER drawio](https://github.com/user-attachments/assets/98b287cd-f24e-4665-ada3-130b980c9e8c)
> Diagrama de clases


> ## 4. Apartado Artístico


> ## **4.1 Música y Sonidos**

Los sonidos de ambiente serán propios de un laboratorio, como sonidos de máquinas probetas y otros instrumentos comúnmente encontrados en laboratorios.

Las ratas harán ruidos característicos con su movimiento, y, las trampas y los botones, también harán sonidos para dar feedback a los jugadores de lo que está sucediendo.

Se han utilizado sonidos externos con licencia "Creative Commons 0" para los siguientes eventos del juego: <br>
	- Movimiento de la mano <br>
 	- Muerte de la rata <br>
  	- Teletransporte entre alcantarillas <br>
        - Click en los botones <br>
	- Comer queso <br>
	- Curación con la clonación <br>
 	- Música de fondo <br>
  	- Caer en una trampa <br>


> ## **4.2 Arte y concept art**

Estilo comiquero y de esbozo como si estuviera dibujado en un cuaderno, basándonos en un estilo caricaturesco como el de Cuphead, Borderlands, entre otros. Pero teniendo en cuenta el minimalismo, no queremos hacerlo muy complicado, queremos hacerlo fácil de ver y entender. Por lo tanto, no tendrá colores tan llamativos y texturas tan bien hechas como las de los juegos mencionados anteriormente.

	4.2.1 Perspectiva de la cámara
 
 Se ha decidido que el juego cuente con una perspectiva cenital que muestre el mapa por completo para proporcionar a ambos jugadores toda la información presente en el juego en todo momento.

	4.2.2 Paleta de colores


> Paleta de colores principal

El negro y el blanco son los que van a predominar, manteniendo ese estilo comiquero y de esbozo.

> Paleta de colores de los menús

Para el diseño de menús, se ha decidido usar la siguiente paleta que mantiene la presencia de la paleta principal y añade tonos apagados para que no ganen demasiada importancia. <br>

![image](https://github.com/user-attachments/assets/76e6a3cf-675d-454e-a98f-1e08e4b8ab48)
> Paleta de colores de los menús del juego


	4.2.3 Concept art
Aquí se recogen los diferentes concepts arts previos al desarrollo del juego: 

![image](https://github.com/user-attachments/assets/2ee79e9d-9a6b-4bfc-8698-e28f74db81a0)
>Pantalla de inicio de sesión/registro

![MENU PRINCIPAL](https://github.com/user-attachments/assets/33678f96-d86a-4faf-b8e9-fdc64a9d1270)
> Menú Principal

![PAUSA](https://github.com/user-attachments/assets/1749d80f-314c-41a0-ba14-0de7622efd33)
> Menú de pausa

![CONFIGURACION](https://github.com/user-attachments/assets/45219d1b-4b2b-40c0-9027-0cc01f3bb83c)
> Menú de configuración

![SELECCION DE ROL](https://github.com/user-attachments/assets/e80c9d4c-b6c6-4baa-b47c-594c2abbcabe)
> Selección de Rol

![VICTORIA DERROTA](https://github.com/user-attachments/assets/51ba7636-8fd9-406f-9fc2-3a8aad2f3cd9)
> Pantalla de victoria/derrota

![CREDITOS](https://github.com/user-attachments/assets/22cf41cd-047c-4c67-9958-0eea79446f46)
> Pantalla de créditos

![JUEGO](https://github.com/user-attachments/assets/1741e759-afd5-468b-9c68-839305c35039)
> Escena de juego

	4.3 NOVEDADES ARTÍSTICAS
![rata](https://github.com/user-attachments/assets/7d707ebb-7589-496d-a621-7e32515bf6bf)
> Actualización del sprite de La Rata para mayor visibilidad

![btnVolver](https://github.com/user-attachments/assets/43d225cc-ecb5-4378-adbd-be2ded942929)
![btnAceptar](https://github.com/user-attachments/assets/35804070-39b7-4585-ae9d-3c9db4cbad61)
![btnMenu](https://github.com/user-attachments/assets/c61a0e23-f01e-405d-b74b-a6b1c3d876f5)
> Nuevos botones para nuevas funcionalidades en el juego



> ## 5. Equipo Autor

> ## **5.1 Javier San Juan Ledesma**

Artista y programador.
	
	5.1.1. Primera fase de desarrollo: Javier
Se ha encargado de detallar el aspecto visual y conceptual del videojuego, entre ellos, la paleta de colores, interfaces y estética del juego.
	
 	5.1.2. Segunda fase de desarrollo: Javier
Ha dibujado todo el arte del juego. Se ha encargado de la implementación de dicho arte, de la programación de la pantalla de créditos y de las pantallas de victoria/derrota.
	
	5.1.3. Tercera fase de desarrollo: Javier
Se ha encargado de preparar nuevos assets, así como crear y manejar la pantalla de inicio de sesión y las peticiones que hace el cliente al servidor en dicha pantalla. También ha creado el diagrama UML.

> ##  **5.2 Iván De Castilla Guitián**

Guionista, programación.

	5.2.1. Primera fase de desarrollo: Iván
Se ha encargado de diferentes aspectos dentro del gdd, entre ellos las metas, definir las fases de desarrollo, los logros, mecánicas concretas y roles de cada equipo, habiendo sido previamente elegidos por cada miembro del grupo de manera democrática.

	5.2.2. Segunda fase de desarrollo: Iván
Se ha encargado de la programación de interfaces, gestión de escenas, implementación de sonidos y música. Por otro lado, ha reescrito código para mayor legibilidad y optimización. También ha elaborado la presentación. 

	5.2.3. Tercera fase de desarrollo: Iván
Se ha encargado de programar la parte del servidor, manejando los controladores que reciben información de la partida, así como mostrar los usuarios conectados simultaneamente, así como la persistencia de datos. Además también ha modificado algunos elementos de la fase anterior.


> ## **5.3 Ismael Esteban Liberal**

Game Designer y programación.
	
	5.3.1. Primera fase de desarrollo: Ismael
Ha sido el autor de la idea principal del juego, y se ha centrado en gran parte de la introducción, guion, niveles del juego y personajes.

	5.3.2. Segunda fase de desarrollo: Ismael
Se ha encargado de programar las mecánicas del juego, movimiento de la mano y otras funciones como detectores de colisiones. También ha sido el encargado de actualizar el archivo 'readme.md' del proyecto y del diseño del nivel.

	5.3.3. Tercera fase de desarrollo: Ismael
Se ha encargado de implementar mejoras y arreglos con respecto a la práctica anterior, y de ayudar en la parte del cliente. Además de redactar el readme y preparar la presentación.



> ## **5.4 Xabier López Aguilera**

Game Designer y programación.

	5.4.1. Primera fase de desarrollo: Xabier
Se ha ocupado del análisis DAFO, los estados y parte de las interfaces. Dentro del apartado artístico, la música y los sonidos y de buscar gran parte de las referencias que vamos a utilizar para la realización de nuestro juego.

	5.4.2. Segunda fase de desarrollo: Xabier
 Ha programado las mecánicas del juego, reorganizado y reescrito código. También ha sido el encargado de colocar todos los elementos del escenario y comprobar su finalidad.
 
 	5.4.3. Tercera fase de desarrollo: Xabier
Se ha encargado de programar la parte del servidor, creando y manejando las clases UserService y User controller. Ha programado la lógica de calcular cuántos jugadores hay de forma simultánea, así como ayudar también en la persistencia de datos.

> ## 6. Funciones de red

- Crear un usuario (en caso de crear un usuario ya existente, el cliente da un aviso).
- Información sobre el estado de la partida (posición del ratón, posición de la mano...).
- Mostrar cuántos jugadores están conectados al servidor en ese momento.
- Información persistente sobre los usuarios creados en sesiones anteriores. Se almacenan en un .txt para ser recuperados más adelante.
 
> ## 7. Créditos

Aquí se listan los créditos del juego, como personas que han apoyado el desarrollo o assets de uso externos que deban de ser apropiadamente acreditados.

> ## 8. Anexos

En este apartado se mostrarán los anexos.

> ## **8.1. Futuras Características**

Para futuras fases de desarrollo se plantea diseñar más niveles para el juego, cumpliendo con la idea inicial. También se añadirá la función de multijugador en línea.
