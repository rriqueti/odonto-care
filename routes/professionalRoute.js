import express from 'express';
import ProfessionalController from '../controllers/professionalController.js';
import { catchError } from '../middlewares/ExceptionMiddleware.js';

const router = express.Router();

let ctrl = new ProfessionalController();

router.post('/professionals/create', catchError((req, res) => {
    // #swagger.tags = ["Usuarios"]
    // #swagger.summary = "End point para criar um usuario"
    ctrl.create(req, res);
}))


export default router;