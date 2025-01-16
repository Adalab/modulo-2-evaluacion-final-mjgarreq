# Módulo 2: Ejercicio de evaluación final

Este es el ejercicio de evaluación final del **módulo 2**. En esta ocasión se ha realizado el ejercicio mediante el framework de Vite (he realizado previamente la instalación del Adalab Web Starter Kit).

El objetivo de este ejercicio era desarrollar una aplicación web de búsqueda de series de anime y en la cual pidéramos marcar o desmarcar las series como favoritas y guardarlas en el Local Storage.

## EJERCICIOS

1. Estructura
Nos encontramos con una estructura básica ya que, al abrir la página, vemos un título, un campo de búsqueda y dos botones (Buscar y Reset).

2. Búsqueda
La usuaria debe introducir el nombre de un anime y, al hacer click en el botón "Buscar", mediante una petición a la API `https://docs.api.jikan.moe/`, se pinta en el html todas las series sobre ese anime (vemos la imagen y el título de cada una).

3. Favoritos
Una vez tenemos la lista de búsqueda, la usuaria puede hacer click sobre las series que más le interen, y, al hacer click, aparece un listado a la izquierda con las series favoritas marcadas, mientras que en el listado de la derecha se remarca la serie favorita con un borde. El listado de series favoritas se mantiene estático aunque la usuaria busque otro anime.

4. Almacenamiento
El listado de series favoritas se almacena en el LocalStorage, por lo que si se recarga la página sigue apareciendo en pantalla.

## BONUS

1. Borrar de favoritos

   - Al hacer click sobre el botón con una "X" de la lista de "Favoritos", desaparece ese anime de favoritos y también se le quita el borde en la lista de "Resultados búsqueda".

   - Al hacer click sobre la serie favorita en el listado de la derecha (donde aparece con un borde), la serie se desmarca y desaparece del listado de la izquierda de "Favoritos".

   - Al hacer click sobre el botón del final del listado de "Favoritos", se borra toda la lista de series que estén almacenadas ahí (también se limpian del LocalStorage).

2. Botón reset

Al hacer click sobre el botón "Reset", la página vuelve a su estado inical (borra la lista de "Favoritos" (también del Local Storage), borra la lista de "Resultados búsqueda" y borra el valor que hubiera en el campo de búsqueda).

3. Afinar maquetación

Hemos añadido un display grid a la lista de "Resultados de búsqueda" para que, cuando aparezca la lista de "Favoritos", las series de búsqueda se vean en distintas columnas (dependiendo del tamaño de la pantalla), y aparece el bloque de las series con un borde de un color distinto.

Con respecto a la lista de "Favoritos" hemos reducido el tamaño de la imagen, y aparece con un sombreado.


### Guía de inicio rápido

Para poder arrancar el proyecto necesitas seguir los siguientes pasos:

1. Instalar las dependencias ejecutando el siguiente comando:

```
npm install
```
2. Para visualizar el proyecto, ejecutar alguno de los siguientes comandos: 
```
npm start
``` 
o 
```
npm run dev
```

### Guía para publicar el proyecto en GitHub Pages:

Para poder generar la versión de producción usaremos un atajo mediante el comando `npm run deploy`, que convierte nuestros archivos scss en archivos legibles para el navegador, y se guardan en la carpeta docs (donde tenemos la versión de producción), además de hacerse el push automático.


#### AUTORA
MªJosé García Requena
