import express from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import AuthenticationController from "../controllers/authController.js";
import ProfessionalController from "../controllers/professionalController.js";

const router = express.Router();

let auth = new AuthMiddleware();
let ctrl = new AuthenticationController();
let user = new ProfessionalController();


router.post("/auth/token", (req, res) => {
  // #swagger.tags = ['Autenticação']
  // #swagger.summary = "Gera um JWT para validação de acesso"

  ctrl.token(req, res);
});

router.get("/auth/perfil", auth.validar, (req, res) => {
  /* #swagger.security = [{
       "bearerAuth": []
   }] */
  // #swagger.tags = ['Autenticação']
  // #swagger.summary = "Lista as informações do perfil logado"

  user.perfil(req, res);
})

export default router;
