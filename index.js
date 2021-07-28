import { Application } from "./deps.js"
import config from "./config/config.js";
import router from './routes/v1.js'

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
console.log("api iniciada en: http://localhost:"+ config.api.port)
await app.listen({port: parseInt(config.api.port)});
