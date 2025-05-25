import { hashGenerate } from "../utils/hashUtils.js";

import ProfessionalEntity from "../entities/professionalEntity.js";
import ProfessionalRepository from "../repositories/professionalRepository.js";

export default class ProfessionalController {
  #professionalRepository;
  #professionalEntity;

  constructor() {
    this.#professionalRepository = new ProfessionalRepository();
    this.#professionalEntity = new ProfessionalEntity();
  }

  async create(req, res) {
    let { name, cpf, email, dateOfBirth, password, position, } = req.body;

    console.log("Dados recebidos:", req.body);

    let checkInputData = await this.#professionalEntity.dataValidate({ name, cpf, email, dateOfBirth, password });

    if (checkInputData.error || !position) return res.status(400).json({ error: checkInputData.error })

    let hashedPassword = await hashGenerate(password);

    let professionalUser = new ProfessionalEntity(
      0,
      name,
      cpf,
      email,
      dateOfBirth,
      hashedPassword,
      position,
    );

    let createdProfessional = await this.#professionalRepository.create(professionalUser);

    if (createdProfessional) return res.status(201).json({ msg: "Usuario criado!" });

    else throw new Error("Erro ao cadastrar usuario no banco de dados");
  }

  async perfil(req, res) {
    // let perfil = await this.#repoUsuario.perfil(req.usuarioLogado.id);
    // if (perfil)
    //   return res.status(200).json(perfil);

  }
}
