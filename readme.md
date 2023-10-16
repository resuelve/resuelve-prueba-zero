## Prueba de ingeniería básica
En esta prueba intentaremos analizar tu capacidad de resolver un problema sencillo, tu método de trabajo, facilidad de desarrollo y conocimientos básicos de tecnología web.

## Desafío: Servidor REST para Cálculo de Intereses Compuestos

### Objetivo:
Crear un servidor REST que permita a los usuarios calcular los intereses compuestos de las deudas ingresadas en el request. El servidor debe aceptar solicitudes HTTP POST y devolver una respuesta con el monto total después de aplicar los intereses compuestos.

#### Requisitos:
1) Crear un servidor REST que escuche en un puerto específico (puede ser el 8080 o el que prefieras).

2) Definir una ruta POST /calcular-intereses que acepte un JSON en el cuerpo de la solicitud con los siguientes campos:
    - `principal`: La cantidad principal de la deuda.
    - `tasa_anual`: La tasa de interés anual en decimal (por ejemplo, 0.05 para el 5%).
    - `periodos`: El número de periodos en los que se calcularán los intereses compuestos.

3) Calcular el monto total después de aplicar los intereses compuestos utilizando la fórmula de interés compuesto:
`M = P(1 + r/n)^(nt)`
Donde:
    - **M** es el monto total después de los intereses.
    - **P** es el principal.
    - **r** es la tasa de interés anual.
    - **n** es el número de veces que los intereses se capitalizan por año (puede ser 1 para anual, 12 para mensual, etc.).
    - **t** es el número de años o periodos.

4) Devolver la respuesta al cliente en formato JSON, que incluye:
    - El monto total (M) después de aplicar los intereses compuestos.
    - Los detalles de la solicitud original, incluyendo el principal, la tasa y el número de periodos.

#### Ejemplo de solicitud:
```json
POST /calcular-intereses
{
  "principal": 1000,
  "tasa_anual": 0.05,
  "periodos": 3
}
```
#### Respuesta Esperada:
```json
{
  "monto_total": 1157.63,
  "detalles_solicitud": {
    "principal": 1000,
    "tasa_anual": 0.05,
    "periodos": 3
  }
}

```
#### Consideraciones adicionales:
- Manejo de errores: Asegúrate de manejar posibles errores, como entradas inválidas o valores faltantes en la solicitud.
- Documentación: Proporciona documentación sobre cómo usar el servicio REST, incluyendo ejemplos de solicitudes y respuestas.
- Pruebas: Realiza pruebas unitarias para asegurarte de que el cálculo de intereses compuestos funcione correctamente.
- Legado: Tu código lo vas a entregar como si otro desarrollador le vaya a dar seguimiento y mantenimiento, por lo tanto, debe incluir todo lo encesario para que esto ocurra sin necesidad de información extra.
- Distribución: Lo entregado debe estar listo para desplegarse en un servicio web. (amazon, google, etc). Cualquier adecuación que consideres necesaria será bien recibida.

#### Puntos extra:
Es dificil determinar el nivel de un desarrollador en solo una prueba de código, así que es muy importante que aportes en la prueba la mayor cantidad de ejemplos de tus conocimientos. Sugerimos no usar frameworks pues es un reto muy sencillo y preferimos leer código creado por ti, que boilerplate genérico, sin embargo, si sí lo usas, solo asegúrate de demostrar tus habilidades en las secciones que si desarrollaste tu.

En si, la prueba solo pide muy pocas cosas, todo lo extra que puedas integrar (frontend, pruebas integrales, documentación de los endpoints, dockerfile, github actions, versiones, etc) será considerado a tu favor.
