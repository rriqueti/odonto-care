import express from 'express';
import ProfessionalController from '../controllers/ProfessionalController.js';
const router = express.Router();

let ctrl = new ProfessionalController();

router.post('/usuarios', (req,res) => {
    // #swagger.tags = ["Usuarios"]
    // #swagger.summary = "End point para criar um usuario"
    ctrl.create(req,res);
})


export default router;