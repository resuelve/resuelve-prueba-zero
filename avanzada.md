## Prueba de ingeniería avanzada
Esta prueba conciste en generar una aplicación web que integre conocimientos de frontend y backend, así como presentación y despliegue del servicio. Se pretende analizar la capacidad del candidato de desenvolverse en ambientes desconocidos, con nuevos retos y problemáticas.

## Reto: Crear una aplicación web completa

### Objetivo:
Crear y entregar una aplicación web completa que integre los dos APIs generados en las pruebas básica y avanzada.

#### Requisitos:
- Se debe implementar una solución al problema descrito en la prueba intermedia, donde se debe crear un web service que implemente llaves de sesiones con un límite de llamadas por hora para entregar una respuesta.
- Se deben exponer tres endpoints:
  1) POST que entregue un cálculo de intereses compuestos igual al descrito en la prueba básica.
  2) GET que haga un proxy de [Chuck Norris Jokes](https://api.chucknorris.io/) igual al descrito en la prueba avanzada.
  3) GET que haga un proxy de un servicio climatológico que regrese la temperatura y condiciones de una localidad definida en la URL
- Se debe crear un frontend con cualquier tecnología para poder consumir los servicios creados en el backend

#### Consideraciones adicionales
- Manejo de errores: Asegúrate de manejar posibles errores, como entradas inválidas o valores faltantes en la solicitud.
- Documentación: Proporciona documentación sobre cómo usar el proxy, incluyendo las rutas disponibles y cómo obtener una clave API válida.
- Seguridad: Asegúrate de implementar medidas de seguridad para proteger las claves API y garantizar la integridad del servicio.
- Pruebas: Realiza pruebas para garantizar que el proxy funcione correctamente, incluyendo la gestión de claves API y límites de llamadas.
- Legado: Tu código lo vas a entregar como si otro desarrollador le vaya a dar seguimiento y mantenimiento, por lo tanto, debe incluir todo lo encesario para que esto ocurra sin necesidad de información extra.
- Distribución: Lo entregado debe estar listo para desplegarse en un servicio web. (amazon, google, etc). Cualquier adecuación que consideres necesaria será bien recibida.

#### Información extra
- Si bien esta prueba esta muy póbremente descrita (no se dan detalles puntuales de que o como implementar los webservices), se espera que el candidato sepa sortear y tomar las desiciones pertinentes para entregar un resultado congruente a su nivel.
- Se espera que el candidato investigue e implemente el tercer punto solicitado (endpoint climatológico) son la poca información proporcionada.

Es dificil determinar el nivel de un desarrollador en solo una prueba de código, así que es muy importante que aportes en la prueba la mayor cantidad de ejemplos de tus conocimientos. Sugerimos no usar frameworks pues es un reto muy sencillo y preferimos leer código creado por ti, que boilerplate genérico, sin embargo, si sí lo usas, solo asegúrate de demostrar tus habilidades en las secciones que si desarrollaste tu.

Recuerda que todo lo extra que puedas integrar (pruebas integrales, documentación de los endpoints, dockerfile, github actions, versiones, despliegue, etc) será considerado a tu favor. ¡Buena suerte!
