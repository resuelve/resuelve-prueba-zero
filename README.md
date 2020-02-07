# resuelve-prueba-zero

## Introducción

Prueba zero.

### Objetivos

Este readme describe los siguientes procesos:

* Build
* Test
* Deploy


## Requisitos

Para poder construir este proyecto debe tener los siguientes programas en tu local:

* docker
* make

## Build

Para construir la documentación correr:

```shell
$ make build
```

Use `docker images` para listar las imágenes locales.

### Dependencias

El Dockerfile incluido tiene instrucciones para configurar las siguientes
dependencias:

* nodejs
* tini

## Pruebas

Para correr la imagen use el siguiente comando:

```shell
$ make test
```

Ahora puede abrir en un navegador el siguiente URL http://localhost:8080.

## Liberación

Para actualizar la imágen en el registry use este comando para liberar la imagen
a dockerhub.

```shell
$ make release
```

## Limpieza

Para limpiar la construcción que se realizó se debe verificar que no este corriendo
el contenedor, para esto validamos con:

```shell
$ make clean
```

Y listo, puedes volver a empezar a construir tu imagen y correrla para hacer preubas.

