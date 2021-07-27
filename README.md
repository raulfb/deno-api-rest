# deno-oak-api
El objetivo del proyecto es crear una API REST con Deno y Oak.

## Requisitos

Antes de nada instale Deno. Deno puede instalarse usando el siguiente comando:

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Una vez instalado Deno creamos la base de datos de prueba. En mi caso cree la base de datos "usuariosDeno" con la tabla users:

```
CREATE TABLE IF NOT EXISTS users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(512) NOT NULL,
  last_name VARCHAR(512) NOT NULL,
  age INTEGER NOT NULL
) engine=InnoDB;
```
Insertamos unos usuarios de prueba:
```
INSERT IGNORE INTO users VALUES(1, "Raul", "Franco", 25);
INSERT IGNORE INTO users VALUES(2, "Ceferino", "Martinez", 35);
INSERT IGNORE INTO users VALUES(3, "Lucia", "Sanchez", 20);
```

A continuación generamos el archivo .env a partir de example.env:

```
DATABASE_HOST=database_host
DATABASE_USERNAME=database_username
DATABASE_PASSWORD=database_password
DATABASE_NAME=database_name
API_PORT=api_port

```

## Arrancar api 

Para rrancar la api ejecutamos el siguiente comando:
```bash
deno run --allow-net --allow-env --allow-read  index.js
```
## Endpoints

- `GET /` - muestra la página de bienvenida
- `GET /v1/usuarios` - devuelve una lista de todos los usuarios
- `GET /v1/usuarios/:id` - obtiene un usuario por id
- `POST /v1/usuarios` - crea un nuevo usuario
- `PUT /v1/usuarios/:id` - actualiza un usuario existente
- `DELETE /v1/usuarios/:id` - elimina un usuario por id 

### Curls Endpoints

- `GET /` - `curl -X GET "http://127.0.0.1:3000/" `
- `GET /v1/usuarios/` - `curl -X GET "http://127.0.0.1:3000/v1/usuarios/" `
- `GET /v1/usuarios/:id` - `curl -X GET "http://127.0.0.1:3000/v1/usuarios/" `
- `GET /v1/usuarios/:id` - `curl -X GET "http://127.0.0.1:3000/v1/usuarios/1" `
- `DELETE/v1/usuarios/:id` - `curl -H 'Accept: application/json' -X DELETE "http://127.0.0.1:3000/v1/usuarios/1"`