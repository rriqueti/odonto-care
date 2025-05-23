import express from "express";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import cors from "cors";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import http from "http";
const server = http.createServer(app);
import { errorHandler, catchError } from "./middlewares/ExceptionMiddleware.js";
dotenv.config();


import authRoute from "./routes/authRoute.js"


app.use(cors({
  origin: 'http://localhost:3000', // Ou use '*' durante dev
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true // se estiver usando cookies ou headers de autenticação
}));


app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
// app.use("/", catchError(professionalRoute));
app.use("/", catchError(authRoute));


app.use(errorHandler);

app.listen("5000", function () {
  console.log("backend em execução, localhost:5000/");
});
