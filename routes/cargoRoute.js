import express from 'express';
import { catchError } from '../middlewares/ExceptionMiddleware.js';

const router = express.Router();


let ctrl = new CargoController();

router.get('/cargos', catchError((req, res) => {
    // #swagger.tags = ["Cargos"]
    // #swagger.summary = "Listar os cargos"
    ctrl.index(req, res)
}))