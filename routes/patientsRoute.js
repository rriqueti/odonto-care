import express from 'express';
import { catchError } from '../middlewares/ExceptionMiddleware.js';
import PatientController from '../controllers/patientController.js';

const router = express.Router();
const ctrl = new PatientController();

router.get('/patients', catchError((req, res) => ctrl.index(req, res)));

router.get('/patients/:id', catchError((req, res) => ctrl.getById(req, res)));

router.post('/patients', catchError((req, res) => ctrl.create(req, res)));

router.patch('/patients', catchError((req, res) => ctrl.update(req, res)));

router.delete('/patients', catchError((req, res) => ctrl.softDelete(req, res)));

export default router;
