import { Application, Router } from "./deps.js"
import storage from "./service/storage.js";
import config from "./config.js";

const router = new Router();
const app = new Application();

router
	.get("/", (context) => {
		context.response.body = "Bienvenido al ejemplo de Oak con Deno!";
	})
	.get("/v1/usuarios", async (context) => {
		context.response.body = await storage.getUsers();
	})
	.get("/v1/usuarios/:id", async (context) => {
		if (context.params && context.params.id && !isNaN(parseInt(context.params.id))) {
			const user = (await storage.getUserById(context.params.id))[0];
			if (!user) {
				context.response.status = 404;
				context.response.body = { error: `Usuario con id  ${context.params.id} no encontrado` };
			} else {
				context.response.body = user;
			}
		} else {
			context.response.status = 400;
			context.response.body = { error: "El id debe de ser un número" };
		}
	})
	.delete("/v1/usuarios/:id", async (context) => {
		if (context.params && context.params.id && !isNaN(parseInt(context.params.id))) {
			let isDeleted = await storage.deleteUser(context.params.id);
			if (isDeleted) {
				context.response.status = 204;
			} else {
				context.response.status = 404;
				context.response.body = { error: `Usuario con id  ${context.params.id} no encontrado` };
			}
		} else {
			context.response.status = 400;
			context.response.body = { error: "El id debe de ser un número" };
		}
	})
	.post("/v1/usuarios", async (context) => {
		if (!context.request.hasBody) {
			context.response.status = 400;
			context.response.body = { error: "El cuerpo de la solicitud no puede estar vacío" };
		} else {
			const { firstName, lastName, age } = (await context.request.body(true)).value
			const ageInt = parseInt(age);
			if (firstName && lastName && ageInt) {
				let addedUser = (await storage.addUser(firstName, lastName, ageInt))[0];
				context.response.status = 201;
				context.response.body = addedUser;
			} else {
				context.response.status = 400;
				context.response.body = { error: "Invalid payload's provided" };
			}
		}
	})
	.put("/v1/usuarios/:id", async (context) => {
		if (!context.params || !context.params.id ||
			isNaN(parseInt(context.params.id) || !context.request.hasBody)) {
			context.response.status = 400;
			context.response.body = { error: "Solicitud no válida" };
		} else {
			const result = await storage.getUserById(context.params.id);
			if (result.length < 1) {
				context.response.status = 404;
				context.response.body = { error: `Usuario con id  ${context.params.id} no encontrado` };
			} else {
				const id = context.params.id;
				const { firstName, lastName, age } = (await context.request.body()).value
				const ageInt = parseInt(age);
				if (firstName && lastName && ageInt) {
					context.response.status = 200;
					context.response.body = (await storage.updateUser(id, firstName, lastName, ageInt))[0];
				} else {
					context.response.status = 400;
					context.response.body = { error: "Invalid payload's provided" };
				}
			}
		}
	});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port: parseInt(config.api.port)});