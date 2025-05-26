import AuthMiddleware from "../middlewares/authMiddleware.js";
import ProfessionalRepository from "../repositories/professionalRepository.js";
import { passwordCheck } from "../utils/hashUtils.js";
import { z } from "zod";

export default class AuthController {
  #professionalRepository;

  constructor() {
    this.#professionalRepository = new ProfessionalRepository();
  }

  async token(req, res) {
    let { email, password } = req.body;

    const credentials = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    if (credentials.safeParse({ email, password }).success) {

      let objAccesss = {
        email: credentials.safeParse({ email, password }).data.email,
        password: credentials.safeParse({ email, password }).data.password,
      }

      let user = await this.#professionalRepository.getPasswordByEmail(objAccesss.email);

      if (user != null) {
        let match = await passwordCheck(objAccesss.password, user.password);

        if (!match) return res.status(400).json({ msg: "Senha inválida!" });

        let authMiddleware = new AuthMiddleware();

        let token = authMiddleware.generateToken(user.idProfissional,
          user.email,
          user.nomeCompleto,
          user.tbCargo_idCargo,
          user.timestamp_cadastro);

        return res.status(200).json({
          token: token, id: user.idProfissional,
          email: user.email,
          nome: user.nomeCompleto,
          cargo: user.tbCargo_idCargo,
        });
      }
    }
  }
}
