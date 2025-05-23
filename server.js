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
import { Server } from "socket.io";
dotenv.config();
// import socketInit from './sockets/jogoSocket.js';
// const io = new Server(server);

// NÃO ESQUECER DE INCLUIR A ROTA NO SWAGGER.JS
import classficadosRoute from "./routes/classificadoRoute.js";
import usuarioRoute from "./routes/usuarioRoute.js";
import categoriaItemRouter from "./routes/categoriaItemRoute.js";
import authRoute from "./routes/authRoute.js";
import salvoRoute from "./routes/salvoRoute.js";
import filtroRoute from "./routes/filtroRoute.js";
import condicaoRoute from './routes/condicaoRoute.js'
import tipoImovelRoute from './routes/tipoImovelRoute.js'
import TipoClassificadoRoute from './routes/tipoClassificadoRoute.js'
import ModeloVeiculoRoute from './routes/modeloVeiculoRoute.js'
import CidadeRoute from './routes/cidadeRoute.js'

app.use(cors({
  origin: 'http://localhost:3000', // Ou use '*' durante dev
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true // se estiver usando cookies ou headers de autenticação
}));

// socketInit(io);

app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use("/", catchError(categoriaItemRouter));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
app.use("/", catchError(classficadosRoute));
app.use("/", catchError(usuarioRoute));
app.use("/", catchError(authRoute));
app.use("/", catchError(salvoRoute));
app.use("/", catchError(filtroRoute));
app.use("/", catchError(condicaoRoute));
app.use("/", catchError(tipoImovelRoute));
app.use("/", catchError(TipoClassificadoRoute));
app.use("/", catchError(ModeloVeiculoRoute));
app.use("/", catchError(CidadeRoute));

app.use(errorHandler);

app.listen("5001", function () {
  console.log("backend em execução");
});
