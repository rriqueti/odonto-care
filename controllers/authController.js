import AuthMiddleware from "../middlewares/authMiddleware.js";
import ProfessionalRepository from "../repositories/ProfessionalRepository.js";
import { passwordCheck } from "../hash/hashUtils.js";
import { z } from "zod";

export default class AuthController {
  #professionalRepository;

  constructor() {
    this.#professionalRepository = new ProfessionalRepository();
  }

  async token(req, res) {
    let { email, password } = req.body;


    // corrigir esse zod aqui
    const emailValidation = z.string().email('Campo de e-mail inválido')

    const senhaSchema = z.string().min(3, "A senha deve ter pelo menos 3 caracteres")

    if (emailValidation && senhaSchema) {

      let passwordHash = await this.#professionalRepository.holdPassword(email)

      if (passwordHash != null) {
        let match = await passwordCheck(password, passwordHash);

        if (!match) {
          return res.status(400).json({ msg: "Usuario ou senha incorretos!" })
        }

        let validateAccess = await this.#professionalRepository.authValidate(email, passwordHash);

        if (!validateAccess) return res.status(400).json({ msg: "Senha inválida!" });

        if (validateAccess) {
          let authMiddleware = new AuthMiddleware();
          let token = authMiddleware.tokenGenerate(validateAccess[0].id, validateAccess[0].email, validateAccess[0].nome, validateAccess[0].datacadastro);
          return res.status(200).json({ token: token, email: validateAccess[0].email, nome: validateAccess[0].nome, data: validateAccess[0].datacadastro })

        }
      }
    }
  }
}
