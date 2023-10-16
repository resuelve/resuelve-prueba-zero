## Prueba de ingeniería intermedia
Esta prueba comprende una interconexión entre servidores para obtener resultados de un tercero y presentarlo como propio. Se pretende que el candidato contemple interconexiones entre servidores, manejo básico de autenticación, manejo de errores y soporte de servicios.

## Crear un Proxy con Autenticación y Límites de Llamadas por Hora

### Objetivo:

Crear un servidor proxy que redirija las solicitudes al servicio de [Chuck Norris Jokes](https://api.chucknorris.io/) y entregue las respuestas a los clientes, permitiendo el acceso sin restricciones de CORS. Además, implementar autenticación basada en claves y límites de llamadas por hora.

Considera la necesidad de crear una base de datos para guardar las llaves autorizadas, dependerá de ti si quieres hacer un CRUD para esta tabla o indicar la llave demo en el readme del proyecto. Si optas por no usar una base de datos, solo considera como entregar el mismo resultado (considera que es un demo, no se espera que sea escalable).

#### Requisitos:

- Crear un servidor Web con la tecnología que quieras.

- Configurar rutas en el servidor para manejar las solicitudes de los clientes.

- Implementar autenticación basada en claves: Cada solicitud debe incluir una clave API válida en el encabezado (por ejemplo, X-API-Key). El servidor debe verificar que la clave sea válida antes de redirigir la solicitud al servicio de Chuck Norris Jokes.

- Establecer límites de llamadas por hora: Cada clave API debe tener un límite de llamadas por hora. Si se excede el límite, el servidor debe responder con un error 429 (Demasiadas solicitudes).

- Cuando se recibe una solicitud en una ruta específica (por ejemplo, /jokes/random), el servidor debe realizar una solicitud HTTP al servicio de Chuck Norris Jokes en nombre del cliente.

- El servidor debe enviar la solicitud al servicio original, recibir la respuesta y reenviarla al cliente, manteniendo la estructura de la respuesta original del servicio.

- El servidor debe manejar cualquier encabezado CORS para permitir que los clientes realicen solicitudes desde dominios diferentes sin restricciones.

- El servidor proxy no debe exponer al cliente el origen original del servicio de Chuck Norris Jokes.

#### Ejemplo de Solicitud Cliente (con Clave API válida):

```javascript
GET /jokes/random
Headers:
X-API-Key: your-api-key
```

#### Ejemplo de Respuesta del Proxy (mismo formato que la respuesta original del servicio de Chuck Norris Jokes):

```json
{
  "categories": [],
  "created_at": "2020-01-05 13:42:19.314155",
  "id": "P-vC4QGnRyGg0YvS_U-_Zw",
  "updated_at": "2020-01-05 13:42:19.314155",
  "value": "Chuck Norris can unscramble an egg."
}
```

#### Ejemplo de Respuesta del Proxy (Error 429 - Demasiadas solicitudes):
```json
{
  "error": "Demasiadas solicitudes. Por favor, espere y vuelva a intentarlo más tarde."
}
```

### Consideraciones Adicionales:

- Documentación: Proporciona documentación sobre cómo usar el proxy, incluyendo las rutas disponibles y cómo obtener una clave API válida.
- Seguridad: Asegúrate de implementar medidas de seguridad para proteger las claves API y garantizar la integridad del servicio.
- Pruebas: Realiza pruebas para garantizar que el proxy funcione correctamente, incluyendo la gestión de claves API y límites de llamadas.
- Legado: Tu código lo vas a entregar como si otro desarrollador le vaya a dar seguimiento y mantenimiento, por lo tanto, debe incluir todo lo encesario para que esto ocurra sin necesidad de información extra.
- Distribución: Lo entregado debe estar listo para desplegarse en un servicio web. (amazon, google, etc). Cualquier adecuación que consideres necesaria será bien recibida.

#### Puntos extra:
Este desafío técnico te permitirá demostrar tus habilidades en la implementación de autenticación y límites de llamadas en un proxy, además de las habilidades anteriores relacionadas con el manejo de solicitudes y respuestas HTTP y la configuración de un proxy con CORS.

Es dificil determinar el nivel de un desarrollador en solo una prueba de código, así que es muy importante que aportes en la prueba la mayor cantidad de ejemplos de tus conocimientos. Sugerimos no usar frameworks pues es un reto muy sencillo y preferimos leer código creado por ti, que boilerplate genérico, sin embargo, si sí lo usas, solo asegúrate de demostrar tus habilidades en las secciones que si desarrollaste tu.

En si, la prueba solo pide muy pocas cosas, todo lo extra que puedas integrar (frontend, pruebas integrales, documentación de los endpoints, dockerfile, github actions, versiones, etc) será considerado a tu favor. ¡Buena suerte!
