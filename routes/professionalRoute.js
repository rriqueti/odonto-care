import express from 'express';
import ProfessionalController from '../controllers/professionalController.js';
import { catchError } from '../middlewares/ExceptionMiddleware.js';

const router = express.Router();
const ctrl = new ProfessionalController();

// Listar profissionais
router.get('/professionals', catchError((req, res) => ctrl.index(req, res)));

// Criar profissional
router.post('/professionals', catchError((req, res) => ctrl.create(req, res)));

// Editar profissional
router.patch('/professionals', catchError((req, res) => ctrl.update(req, res)));

// Buscar perfil de profissional por id
router.get('/professionals/:id', catchError((req, res) => ctrl.perfil(req, res)));

// Soft delete de profissional
router.delete('/professionals', catchError((req, res) => ctrl.softDelete(req, res)));

export default router;
