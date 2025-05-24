import express from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import AuthenticationController from "../controllers/authController.js";
import ProfessionalController from "../controllers/professionalController.js";

const router = express.Router();

let auth = new AuthMiddleware();
let ctrl = new AuthenticationController();
let user = new ProfessionalController();

router.get("/auth", (req, res) => {
  return res.status(200).json({ message: "API de autenticação" });
});

router.post("/auth/token", (req, res) => {
  // #swagger.tags = ['Autenticação']
  // #swagger.summary = "Gera um JWT para validação de acesso"

  ctrl.token(req, res);
});

export default router;
