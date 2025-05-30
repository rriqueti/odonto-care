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

  async index(req, res) {
    let result = await this.#professionalRepository.listActive();

    let users = result.map(p => p.toJSON());
    if (users.length > 0) {

      return res.status(200).json({ msg: 'Successfull return', users });
    }

    return res.status(404).json({ msg: 'Profissionais não encontrados' });

  }


  async create(req, res) {
    let { name, cpf, email, dateOfBirth, password, position, } = req.body;

    // console.log("Dados recebidos:", req.body);

    let checkInputData = await this.#professionalEntity.dataCreateValidate({ name, cpf, email, dateOfBirth, password });

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

  async update(req, res) {
    try {
      let { id, email, name, position, password } = req.body;
      let professional = await this.#professionalRepository.getById(id);

      if (!professional) {
        return res.status(404).json({ msg: 'Profissional não encontrado' });
      }

      let checkInputData = await this.#professionalEntity.dataUpdateValidate({ params: { id, name, position, password } });
      if (checkInputData.error) {
        return res.status(400).json({ error: checkInputData.error });
      }

      let hashedPassword = await hashGenerate(password);
      let updateResult = await this.#professionalRepository.update(email, name, hashedPassword, position, id);

      if (!updateResult) {
        return res.status(400).json({ msg: 'Solicitação inválida' });
      }

      return res.status(200).json({ msg: 'Alterado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno', detail: error.message });
    }
  }

  async perfil(req, res) {
    try {
      const { id } = req.params;
      const professional = await this.#professionalRepository.getById(id);
      if (!professional) return res.status(404).json({ msg: 'Profissional não encontrado' });
      return res.status(200).json({ user: professional.toJSON() });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno', detail: error.message });
    }
  }
}
